//index.js
//获取应用实例
var indexUtil = require("../../utils/indexUtil.js")
const app = getApp()

Page({
  data: {
    isHavePhoneNum:true,
    phoneNum: null,//输入的手机号
    duoduoNum:null,//微商识别码
    textValue: null,
    awardDetail: null,
    sixNum: 6,
    eightNum: 8,
    speed: 120,
    times: 0, //转动次数
    cycle: 10, //转动基本次数：即至少需要转动多少次再进入抽奖环节
    awardNum: -1,//抽奖次数
    priceNum: 8,//后台返回中奖号码
    isCanSelect: false,//是否可以点击抽奖按钮
    times: 0, //转动次数
    showModalStatus: false,//是否显示弹窗
    indexSelect: null,//被选中的奖品index
    isRunning: false,//是否正在抽奖
    circleList: [],//圆点数组
    awardList: [],//转盘数组
    awardTextList: [],//后台奖品列表
    awardLogList: [],//抽奖记录
    awardRuleList: [],//活动规则
    colorCircleFirst: '#FFDF2F',//圆点颜色1
    colorCircleSecond: '#FE4D32',//圆点颜色2
    colorAwardDefault: '#FFFFFF',//奖品默认颜色
    colorAwardSelect: '#DE2A2C',//奖品选中颜色
  },
  initCircleData: function () {
    var _this = this;
    this.setData({
      circleList: indexUtil.circleData()
    })
    setInterval(function () {
      if (_this.data.colorCircleFirst == '#fb9e01') {
        _this.setData({
          colorCircleFirst: '#ffffff',
          colorCircleSecond: '#fb9e01',
        })
      } else {
        _this.setData({
          colorCircleFirst: '#fb9e01',
          colorCircleSecond: '#ffffff',
        })
      }
    }, 500)//设置圆点闪烁的效果
  },
  //初始化页面数据
  initGetData: function () {
    var _this = this;
    this.setData({
      awardList: indexUtil.awardListData(_this)
    })
  },
  onLoad: function () {
    this.initCircleData();
    this.initGetData();
  },
  //查询活动规则
  queryRuleList: function () {
    var _this = this;
    var awardId = "";
    call.getData('webpublic/queryRuleList?awardId=' + awardId, function (r) {
      var ruleList = r.data;
      var ruleListObj = [{
        name: 'div',
        attrs: {
          class: 'div_class',
          style: 'line-height: 35px;padding:10px 10px; color: red; margin-top:10px;'
        },
        children: []
      }]
      for (var i = 0; i < ruleList.length; i++) {
        var item = ruleList[i];
        var rule = {
          name: 'li',
          children: [{
            type: 'text',
            text: item.context,
          }]
        }
        ruleListObj[0].children.push(rule);
      }
      _this.setData({
        awardRuleList: ruleListObj
      })
    }, this.fail);
  },
  //设置手机号码
  listenerPhoneInput: function (e) {
    this.data.phoneNum = e.detail.value;
  },
  //开始抽奖
  startGame: function () {
    if (this.data.isRunning) return
    var _this = this;
    var _data = this.data;
    if (_data.awardNum < 1) {
      // var typeText = (_data.phoneNum == null) ? "请先点击我要抽奖" : "您目前无抽奖机会哦^-^";
      // wx.showModal({
      //   content: typeText,
      //   showCancel: false,//去掉取消按钮
      //   success: function (res) {
      //     if (res.confirm) {
      //       _this.setData({
      //         isCanSelect: false
      //       })
      //     }
      //   }
      // })
      // return;
    }
    this.setData({
      isRunning: true
    })
    var indexSelect = 1;
    var timer = setInterval(function () {
      if (_data.times > _data.cycle + 10 && _data.priceNum * 1 - 1 == _data.indexSelect) {
        clearInterval(timer)
        //var awardTextList = _data.awardTextList;
        _this.setData({
          //textValue: awardTextList[_data.indexSelect].id,
          //awardDetail: awardTextList[_data.indexSelect].name,
          isRunning: false,
          times: 0,
          speed: 120,
          showModalStatus: true
        });
      } else {
        if (_data.times < _data.cycle) {
          _this.setData({
            speed: _data.speed - 10
          })
        } else if (_data.times === _data.cycle) {
          if (_data.priceNum == "" || _data.priceNum == null || _data.priceNum == undefined) {
            var index = Math.random() * 8 | 0; //静态演示，随机产生一个奖品序号，实际需请求接口产生
            if (index > 4) {
              _this.setData({
                priceNum: _data.sixNum
              })
            } else {
              _this.setData({
                priceNum: _data.eightNum
              })
            }
          }
        } else {
          if (_data.times > _data.cycle + 10 &&
            ((_data.priceNum == 0 && _data.indexSelect == 7) || _data.priceNum == _data.indexSelect - 1)) {
            _this.setData({
              speed: _data.speed + 10
            })
          } else {
            _this.setData({
              speed: _data.speed + 20
            })
          }
        }
        if (_data.speed < 20) {
          _this.setData({
            speed: 20
          })
        };
        indexSelect++;
        indexSelect = indexSelect % 8;
        _this.setData({
          indexSelect: indexSelect,
          times: _data.times + 1
        })
      }
    }, _data.speed);
  },
  //弹窗部分 代码
  closeAwardDialog:function(){
    var _this = this;
    this.setData({
      showModalStatus: false
    });
  },
  closeModal: function (event) {
    var _this = this;
    if (_this.checkPhone(_this.data.phoneNum)) {
      _this.checkPhoneNum();
    } else {
      wx.showModal({
        content: "请输入正确格式手机号码",
        showCancel: false,//去掉取消按钮
        success: function (res) {
          if (res.confirm) {
            
          }
        }
      })
      return;
    }
    
    
  },
  showInputPhone: function () {
    if (this.data.isRunning) return
    //显示输入手机号弹窗
    this.setData({
      showModalType: 0,
      showModalStatus: true
    });
  },
  //请求后台查询手机号 参与次数
  checkPhoneNum: function (e) {
    var phoneNum = this.data.phoneNum;
    call.getData('webpublic/checkAwardTimes?phoneNum=' + phoneNum, this.doAwardAction, this.fail);
  },
  doAwardAction: function (data) {
    var _this = this;
    console.log("data", data)
    if (data.data) {
      _this.setData({
        awardNum: data.times,
        priceNum: (data.priceNum) ? data.priceNum : null,
        showModalStatus: false,//是否显示弹窗
        isCanSelect: true
      });
    } else {
      wx.showModal({
        content: "该抽奖号码未参与活动，不能进行抽奖。",
        showCancel: false,//去掉取消按钮
        success: function (res) {
          if (res.confirm) {
            _this.setData({
              priceNum: null,
              showModalStatus: false,
              isCanSelect: false
            })
          }
        }
      })
      return;
    }
  },
  fail: function () {

  },
  //跳转页面
  toRulesPage: function () {
    if (this.data.isRunning) return
    this.queryRuleList();
    this.setData({
      showModalType: 2,
      showModalStatus: true
    });
  },
  //跳转页面
  toAwardPage: function () {
    var _this = this;
    if (this.data.isRunning) return
    //查询获奖记录数据
    call.getData('webpublic/awardLoglist', function (r) {
      _this.setData({
        awardLogList: r.list
      })
    }, this.fail);

    this.setData({
      showModalType: 3,
      showModalStatus: true
    });
  },
  checkPhone: function (a) {
    var patrn = /^((?:13|14|15|16|17|18|19)\d{9}|0(?:10|2\d|[3-9]\d{2})[1-9]\d{6,7})$/;
    if (!patrn.exec(a)) return false;
    return true;
  }

})
