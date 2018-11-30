function formatTimeValue(value) {
  var tag = "-";
  if (value >= 0) {
    tag = "";
  }

  // default format: hours:minutes:seconds
  value = Math.round(Math.abs(value));
  var hours = Math.floor(value / 3600) % 24;
  var minutes = Math.floor(value / 60) % 60;
  var seconds = value % 60;
  var result = "";

  if (hours != 0)
    result = hours + ":";

  if (result && minutes < 10)
    result += "0" + minutes + "";
  else
    result += minutes + "";

  if (seconds < 10)
    result += ":0" + seconds;
  else
    result += ":" + seconds;

  return tag + result;
};

function formatTimeToString(time, fmt) {
  var date = new Date();
  date.setTime(time * 1000);

  fmt = fmt || "yyyy-MM-dd HH:mm:ss";
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, //小时
    "H+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    "S": date.getMilliseconds() //毫秒
  };
  var week = {
    "0": "/u65e5",
    "1": "/u4e00",
    "2": "/u4e8c",
    "3": "/u4e09",
    "4": "/u56db",
    "5": "/u4e94",
    "6": "/u516d"
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[date.getDay() + ""]);
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
};

module.exports = {formatTimeValue, formatTimeToString};
