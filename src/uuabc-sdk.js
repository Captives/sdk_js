Object.assign(window, module.exports = {
  EventEmitter: require('./js/EventEmitter'),
  formatTimeValue: require('./js/FormatTime').formatTimeValue,
  formatTimeToString: require('./js/FormatTime').formatTimeToString
});
