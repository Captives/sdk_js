function EventEmitter() {
  this.events = {};
}
//绑定事件函数
EventEmitter.prototype.on = function(eventName, callback) {
  this.events[eventName] = this.events[eventName] || [];
  this.events[eventName].push(callback);
};

//解除绑定事件函数
EventEmitter.prototype.off = function(eventName) {
  delete this.events[eventName];
};

//触发事件函数
EventEmitter.prototype.emit = function(eventName, _) {
  var events = this.events[eventName],
    args = Array.prototype.slice.call(arguments, 1),i, m;

  if (!events) {
    return;
  }

  for (i = 0, m = events.length; i < m; i++) {
    events[i].apply(null, args);
  }
};

module.exports = EventEmitter;
