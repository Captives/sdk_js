var AgoraRTC = require('./libs/AgoraRTCSDK-2.3.1');
/*******************************************************************
 * 视频
 *
 * @constructor 依赖 AgoraRTCSDK-2.3.1.js
 *******************************************************************/
function VideoClient(APPID) {
  var that = this;
  this.token = null;
  this.channel = null;
  this.streamList = {};
  this.appid = APPID || window.APPID;

  if (!AgoraRTC.checkSystemRequirements()) {
    console.error("browser is no support webRTC");
    that.emit('error', 'NO_SUPPORT');
  }

  this.client = AgoraRTC.createClient({mode: 'interop'});
  var client = this.client;
  console.log("VIDEO CLIENT::", this.appid);
  //远程音视频流已添加回调事件(stream-added)
  client.on('stream-added', function (evt) {
    var stream = evt.stream;
    var uid = stream.getId();
    console.log("New stream added: ", uid);
    console.log("Subscribe ", stream);
    client.subscribe(stream, function (err) {
      console.log("Subscribe stream failed", uid, err);
    });
  });
  //远程音视频流已订阅回调事件(stream-subscribed)
  client.on('stream-subscribed', function (evt) {
    var stream = evt.stream;
    var uid = stream.getId();
    that.streamList[uid] = stream;
    console.log("Subscribe remote stream successfully: ", stream.getId(), stream.hasVideo(), stream.hasAudio(), stream.getAttributes());
    var data = that.getToken(uid);
    that.emit('stream', data.id, data.type, data.token, stream.hasVideo(), stream.hasAudio());
  });
  //远程音视频流已删除回调事件(stream-removed)
  client.on('stream-removed', function (evt) {
    var stream = evt.stream;
    var uid = stream.getId();
    var data = that.getToken(uid);
    that.emit('removed', data.id, data.type, data.token);
    stream.stop();
    delete that.streamList[uid];
    console.log("Remote stream is removed " + stream.getId());
  });

  //对方用户已离开会议室回调事件(peer-leave)
  client.on('peer-leave', function (evt) {
    var stream = evt.stream;
    if (stream) {
      var uid = evt.uid;
      var data = that.getToken(uid);
      that.emit('removed', data.id, data.type, data.token);
      stream.stop();
      delete that.streamList[uid];
      console.log(uid, " leaved from this channel");
    }
  });

  //用户已取消视频通话静音
  client.on('unmute-video', function (evt) {
    var uid = evt.uid;
    var data = that.getToken(uid);
    console.log("unmute video:", uid, data);
  });

  //用户已被踢且被封禁
  client.on('client-banned', function (evt) {
    var uid = evt.uid;
    var attr = evt.attr;
    console.log(" user banned:" + uid + ", banntype:" + attr);
    alert(" user banned:" + uid + ", banntype:" + attr);
  });

  client.on('active-speaker', function (evt) {
    var uid = evt.uid;
    var data = that.getToken(uid);
    console.log("update active speaker: client", uid, data);
  });
  var channelKey = "";
  client.on('error', function (err) {
    that.emit('error', err.reason);
    console.log("Got error msg:", err.reason, 'https://document.agora.io/cn/faq/faq/error_web.html');
    if (err.reason === 'DYNAMIC_KEY_TIMEOUT') {
      client.renewChannelKey(channelKey, function () {
        console.log("Renew channel key successfully");
      }, function (err) {
        console.error("Renew channel key failed: ", err);
      });
    }
  });
};

VideoClient.prototype = new EventEmitter();
//解析token
VideoClient.prototype.getToken = function (token) {
  token = token + "";
  var result = {token: token};
  if (token && token.length >= 5) {
    result = {token: token, type: Number(token.substr(0, 1)), id: Number(token.substr(4, token.length - 1))};
  } else {
    console.warn('无效token', token);
  }
  return result;
};

/**
 * 初始化
 * @param CLASSID
 * @returns {*|t}
 */
VideoClient.prototype.init = function () {
  var that = this;
  return new Promise(function (resolve, reject) {
    if (!that.appid) {
      alert("AgoraRTC appid must not be empty" + that.appid);
      console.error("AgoraRTC appid must not be empty", that.appid);
      reject("AgoraRTC appid must not be empty" + that.appid);
    } else {
      //初始化
      that.client.init(that.appid, function () {
        console.log("INIT::", that.appid);
        resolve();
      }, function (info) {
        var err = info;
        console.error("INIT ERROR::", err);
        switch (err) {
          case 'SERVICE_NOT_AVAILABLE':
            err = '服务不可用, APPID:' + that.appid;
            break;
          case 'CONNECT_GATEWAY_ERROR':
            err = '无法连接 Web 服务器';
            break;
          case 'INVALID_OPERATION':
            err = '请联系技术支持!';
            break;
          case 'INVALID_KEY':
          case 'INVALID_DYNAMIC_KEY':
          case 'DYNAMIC_KEY_TIMEOUT':
            err = '请联系技术支持,续费视频服务!';
            break;
        }
        reject(err, info);
      });
    }
  });
};
/**
 * 连接
 * @param CLASSID
 * @returns {*|t}
 */
VideoClient.prototype.connect = function (classid, token) {
  var that = this;
  var channel = "td" + classid;//强制转换为字符串
  token = Number(token) || 0;
  return new Promise(function (resolve, reject) {
    if (!that.appid) {
      alert("AgoraRTC appid must not be empty" + that.appid);
      console.error("AgoraRTC appid must not be empty", that.appid);
      reject("AgoraRTC appid must not be empty" + that.appid);
    } else {
      //加入频道
      that.client.join(that.appid, channel, token, function (uid) {
        that.token = uid;
        that.channel = channel;
        var data = that.getToken(uid);
        console.log("JOIN 成功", that.appid, channel, uid, data.id, data.type, data.token);
        resolve(data.token, data.id, data.type);
      }, function (info) {
        var err = info;
        console.error("JOIN ERROR::", err);
        switch (err) {
          case 'INVALID_PARAMETER':
            err = '无效 Token#' + token;
            break;
          case 101:
            err = '视频服务ID无效 <br> APPID:' + that.appid;
            break;
          case 102:
            err = '课程ID无效 <br> ID:' + classid;
            break;
          case 2002:
            err = '进入教室失败,刷新重试';
            break;
          case 109:
          case 110:
            err = '请联系技术支持,续费视频服务!';
            break;
        }
        reject(err, info);
      });
    }
  });
};
/**
 * 发布视频流
 * @param stream
 */
VideoClient.prototype.publish = function (stream) {
  var that = this;
  return new Promise(function (resolve, reject) {
    var data = that.getToken(stream.getId());
    that.client.publish(stream, function (err) {
      console.error("Publish local stream error: ", err);
      reject(err);
    });
    //本地音视频已上传回调事件(stream-published)
    that.client.on('stream-published', function (evt) {
      console.log("Publish local stream successfully");
      resolve();
    });
  });
};
//查询指定用户的视频流
VideoClient.prototype.getStream = function (token) {
  var stream = this.streamList[token];
  if (stream) {
    return stream;
  } else {
    console.warn('指定token的媒体流已经丢失', token);
  }
};
//播放媒体流
VideoClient.prototype.player = function (token, element) {
  var element = element || 'videodisplay' + token;
  var dom = '#' + element;
  if ($(dom).length > 0) {
    $(dom).empty();
    var stream = this.getStream(token);
    if (stream) {
      stream.play(element);
    } else {
      console.warn('指定token的媒体流已经丢失或未获取...', token, element);
    }
  } else {
    console.warn("播放容器异常", element, $(dom).length, token);
  }
  $('.resize-sensor, #bar_' + token).remove();
};

VideoClient.prototype.stopPlayer = function (token, element) {
  console.log('Current Stream List', token, this.streamList);
  // var stream = this.getStream(token);
  // if(stream){
  //     this.stop(stream);
  // }
  var element = element || 'video' + token;
  $('#' + element).empty();
};

VideoClient.prototype.toggleVideo = function (token, enabled) {
  var stream = this.getStream(token);
  if (enabled) {
    stream.enableVideo();
  } else {
    stream.disableVideo();
    console.log('视频图像已经关闭', JSON.stringify(this.getToken(token)));
  }
};
VideoClient.prototype.toggleAudio = function (token, muted) {
  var stream = this.getStream(token);
  if (stream) {
    if (muted) {
      stream.disableAudio();
      console.log('视频声音已经关闭', JSON.stringify(this.getToken(token)));
    } else {
      stream.enableAudio();
    }
  }
};
/**
 * 停止视频流
 * @param stream
 */
VideoClient.prototype.stop = function (stream) {
  var that = this;
  if (stream) {
    var data = that.getToken(stream.getId());
    this.client.unpublish(stream, function (err) {
      console.error("Unpublish local stream failed", err);
    });
  }
};
/**
 * 退出
 * @returns {*|t}
 */
VideoClient.prototype.exit = function () {
  var that = this;
  return new Promise(function (resolve, reject) {
    that.streamList = {};
    that.client.leave(function () {
      console.log("Leavel channel successfully");
      resolve();
    }, function (err) {
      console.error("Leave channel failed");
      reject(err);
    });
  });
};
/*******************************************************************
 * 设备
 *******************************************************************/
function Device() {
  this.cameras = [];
  this.microphones = [];
  this.audios = [];
  this.cameraItem = null;//当前使用的camera
  this.microphoneItem = null;//当前使用的microphone
  this.saveCameraItem = null;//保存的camera
  this.saveMicrophoneItem = null;//保存的microphone
};
Device.prototype = new EventEmitter();

/**获取设备**/
Device.prototype.getDevice = function () {
  this.cameraItem = this.getCameraDevice();
  this.microphoneItem = this.getMicrophoneDevice();
  console.log('当前使用的是', this.cameraItem, this.microphoneItem);
  var c = this.cameraItem ? (this.cameraItem.label || this.cameraItem.name) : '未查询到';
  var m = this.microphoneItem ? (this.microphoneItem.label || this.microphoneItem.name) : '未查询到';
};

Device.prototype.change = function (cam, mic, callback) {
  this.cameraItem = cam || this.cameraItem;
  this.microphoneItem = mic || this.microphoneItem;
  if (this.cameraItem || this.microphoneItem) {
    callback(this.cameraItem ? this.cameraItem.deviceId : null, this.microphoneItem ? this.microphoneItem.deviceId : null);
  } else {
    console.warn('摄像头和麦克风参数错误');
  }
};
/***
 * 修改摄像头
 * @param deviceId
 */
Device.prototype.changeCamera = function (cam, callback) {
  if (cam) {
    var name = this.cameraItem ? "从" + (this.cameraItem.label || this.cameraItem.name) : '';
    this.cameraItem = cam;
    callback(cam.deviceId);
  } else {
    console.warn('无效的设备Microphone');
  }
};
/***
 *  修改麦克风
 * @param deviceId
 */
Device.prototype.changeMicrophone = function (mic, callback) {
  if (mic) {
    var name = this.microphoneItem ? "从" + (this.microphoneItem.label || this.microphoneItem.name) : '';
    this.microphoneItem = mic;
    callback(mic.deviceId);
  } else {
    console.warn('无效的设备Microphone');
  }
};
/**获取用户保存的摄像头,如果用户未保存，则返回系统默认的摄像头,无设备返回null**/
Device.prototype.getCameraDevice = function () {
  if (this.cameras.length == 0) {
    return null;
  }
  //获取数据库保存的摄像头设备
  var temp_recItem = this.seachCameraDeviceByItem(this.saveCameraItem);
  if (temp_recItem != null) {
    console.info("使用的是数据库保存的摄像头", JSON.stringify(temp_recItem));
    return temp_recItem;
  }
  //用户未设置，找寻用户系统默认摄像头
  var item_sys = this.getSysDefaultCamera();
  if (item_sys != null) {
    console.info("使用的是系统默认摄像头", JSON.stringify(item_sys));
    return item_sys;
  }
  return null;
};
/**获取用户保存的麦克风,如果用户未保存，则返回系统默认的麦克风,无设备返回null**/
Device.prototype.getMicrophoneDevice = function () {
  if (this.microphones.length == 0) {
    return null;
  }
  var temp_recItem = this.seachMicroponeDeviceByItem(this.saveMicrophoneItem);
  if (temp_recItem != null) {
    console.info("使用的是数据库保存的麦克风", JSON.stringify(temp_recItem));
    return temp_recItem;
  }
  //用户未设置，找寻用户系统默认麦克风
  var item_sys = this.getSysDefaultMicrophone();
  if (item_sys != null) {
    console.info("使用的是系统默认麦克风", JSON.stringify(item_sys));
    return item_sys;
  }
  return null;
};
/**
 * 根据指定的设备从现有列表中搜索设备是否存在
 * @param item    需要查询的设备
 * @return 查询匹配的结果
 */
Device.prototype.seachCameraDeviceByItem = function (item) {
  if (item == null) {
    return null;
  }
  //匹配
  for (var i = 0; i < this.cameras.length; i++) {
    var cam = this.cameras[i];
    if ([item.label, item.name].indexOf(cam.label) != -1 || item.deviceId == cam.deviceId) {
      return cam;
    }
  }
  return null;
};
/**
 * 根据指定的设备从现有列表中搜索设备是否存在
 * @param item    需要查询的设备
 * @return 查询匹配的结果
 */
Device.prototype.seachMicroponeDeviceByItem = function (item) {
  if (item == null) {
    return null;
  }
  //匹配
  for (var i = 0; i < this.microphones.length; i++) {
    var mic = this.microphones[i];
    if ([item.label, item.name].indexOf(mic.label) != -1 || item.deviceId == mic.deviceId) {
      return mic;
    }
  }
  return null;
};
/**获取系统默认的摄像头**/
Device.prototype.getSysDefaultCamera = function () {
  if (this.cameras.length != 0) {
    return this.cameras[0];
  }
  return null;
};
/**获取系统默认的麦克风**/
Device.prototype.getSysDefaultMicrophone = function () {
  if (this.microphones.length != 0) {
    return this.microphones[0];
  }
  return null;
};

module.exports = VideoClient;
