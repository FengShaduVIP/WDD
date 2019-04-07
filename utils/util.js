const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()
  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

var p = function (data) {
  var urlData = ""
  if (data == null || data == "") {
    return urlData
  } else {
    urlData = "?" + data
    return urlData
  }
}

/**
 * 检验手机格式
 */
var checkPhone = function (a) {
  var patrn = /^((?:13|14|15|16|17|18|19)\d{9}|0(?:10|2\d|[3-9]\d{2})[1-9]\d{6,7})$/;
  if (!patrn.exec(a)) return false;
  return true;
}

module.exports = {
  formatTime: formatTime,
  p: p,
  checkPhone: checkPhone
}



