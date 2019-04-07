var call = require("../utils/request.js")
var u = require("../utils/util.js")
var _time = Date.parse(new Date())
//获取公告
var noticeList = function (params) {
  return call.getData("webpublic/awardLoglist" + u.p(params.data), params.fnc, params.fail)
}
//获取奖品列表
var awardList = function (params) {
  return call.getData("webpublic/awardlist" + u.p(params.data), params.fnc, params.fail)
}
//查询手机号抽奖次数
var checkPhoneTimes = function (params) {
  return call.getData("webpublic/checkPhoneTimes" + u.p(params.data), params.fnc, params.fail)
}
//点击抽奖按钮开始抽奖


//点击确认领取 保存数据库 发送服务消息



module.exports = {
  noticeList: noticeList,
  awardList: awardList
}

