var io = require('./libs/socket.io');
var EventEmitter = require('./libs/EventEmitter.min');
/*******************************************************************
 * 实时消息
 * @constructor
 *******************************************************************/
function RemoteClient() {
  if (!window.WebSocket) {
    console.warn("This browser does not support WebSocket.");
  }
}
RemoteClient.prototype = new EventEmitter();
RemoteClient.prototype.connect = function (server, instance, room) {
  this.count = 5;
  var that = this;
  var manager = {
    path: instance,
    secure: true,
    transports: ['websocket'],// ['websocket', 'polling']
    reconnection: true,              //启动自动连接
    reconnectionAttempts: this.count,         //最大重试连接次数
    reconnectionDelay: 2000,         //最初尝试新的重新连接等待时间
    reconnectionDelayMax: 10000,      //最大等待重新连接,之前的2倍增长
    timeout: 20000                   //
  };

  that.server = server;
  Object.assign(this, manager);
  if (room) {
    manager.query = {roomid: room};
  }
  console.log('webclient connect', server, instance);
  this.connected = false;
  this.socket = io.connect(server, manager);
  //连接时触发
  this.socket.on("connect", function () {
    that.connected = true;
    console.log("socket io", server, "socket io connected success");
    that.emit('open', that.socket);
  });

  //连接时发生错误
  this.socket.on("connect_error", function (err) {
    that.connected = false;
    console.error("socket io", "connect error");
  });

  //连接时超时
  this.socket.on("connect_timeout", function () {
    that.connected = false;
    console.log("socket io", "connect_timeout");
  });

  //断开连接时触发
  this.socket.on('disconnect', function () {
    that.connected = false;
    that.emit('disconnect', that.connected);
    console.log("socket io", 'disconnect');
  });

  //成功重连后触发,num连接尝试次数
  this.socket.on('reconnect', function (num) {
    console.log("socket io", 'reconnect', num);
  });

  //试图重新连接时触发
  this.socket.on('reconnect_attempt', function () {
    console.log("socket io", 'reconnect attempt');
  });

  //试图重新连接中触发, num连接尝试次数
  this.socket.on('reconnecting', function (num) {
    that.emit('reconnect', num, manager.reconnectionAttempts);
    console.log("socket io", 'reconnecting', num);
  });

  //重联尝试错误,err
  this.socket.on('reconnect_error', function (err) {
    that.connected = false;
    console.error("socket io", 'reconnect error');
  });

  //重连失败
  this.socket.on('reconnect_failed', function () {
    that.connected = false;
    that.emit('close');
    console.log("socket io", 'reconnect failed');
  });

  this.socket.on('error', function (err) {
    that.connected = false;
    that.emit('error');
    console.error("socket io", 'error');
  });

  //私有的消息处理
  this.socket.on('data', function (obj, response) {
    var text = "";
    if (obj['event']) {
      that.emit(obj['event'], obj.data);
    } else {
      text = "无效格式的数据" + JSON.stringify(obj);
      console.warn('已忽略的服务消息', JSON.stringify(obj));
    }

    if (typeof response == 'function' && text) {
      response(text);
    }
  });
};
RemoteClient.prototype.send = function (event, data) {
  var that = this;
  return new Promise(function (resolve, reject) {
    if (that.connected) {
      that.socket.emit(event, data, function (json) {
        resolve(json);
      });
    }
  });
};

/**
 * 关闭远程消息
 */
RemoteClient.prototype.close = function () {
  if (this.socket) {
    this.socket.close();
  }
};

RemoteClient.prototype.login = function (options) {
  return this.send('login', options);
};

//数据共享事件,暴露给外部使用
RemoteClient.prototype.broadcast = function (event, data) {
  return this.send('share', {event: event, data: data});
};

module.exports = RemoteClient;
