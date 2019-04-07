
/**
 * 转动圆点位置数组
 */
const initCircleData = function(){
  var leftCircle = 7.5;
  var topCircle = 7.5;
  var circleList = [];
  for (var i = 0; i < 24; i++) {
    if (i == 0) {
      topCircle = 15;
      leftCircle = 15;
    } else if (i < 6) {
      topCircle = 7.5;
      leftCircle = leftCircle + 102.5;
    } else if (i == 6) {
      topCircle = 15
      leftCircle = 620;
    } else if (i < 12) {
      topCircle = topCircle + 94;
      leftCircle = 620;
    } else if (i == 12) {
      topCircle = 565;
      leftCircle = 620;
    } else if (i < 18) {
      topCircle = 570;
      leftCircle = leftCircle - 102.5;
    } else if (i == 18) {
      topCircle = 565;
      leftCircle = 15;
    } else if (i < 24) {
      topCircle = topCircle - 94;
      leftCircle = 7.5;
    } else {
      return
    }
    circleList.push({ topCircle: topCircle, leftCircle: leftCircle });
  }
  return circleList;
}



const initAwardListData = function (_this){
  const awardImages = [
    "../../img/1.png",
    "../../img/2.png",
    "../../img/3.png",
    "../../img/4.png",
    "../../img/5.png",
    "../../img/6.png",
    "../../img/7.png",
    "../../img/8.png"
  ];//奖品图片数组
  //奖品item设置
  var awardList = [];
  //间距,怎么顺眼怎么设置吧.
  var topAward = 25;
  var leftAward = 25;
  for (var j = 0; j < 8; j++) {
    if (j == 0) {
      topAward = 25;
      leftAward = 25;
    } else if (j < 3) {
      topAward = topAward;
      //166.6666是宽.15是间距.下同
      leftAward = leftAward + 166.6666 + 15;
    } else if (j < 5) {
      leftAward = leftAward;
      //150是高,15是间距,下同
      topAward = topAward + 150 + 15;
    } else if (j < 7) {
      leftAward = leftAward - 166.6666 - 15;
      topAward = topAward;
    } else if (j < 8) {
      leftAward = leftAward;
      topAward = topAward - 150 - 15;
    }
    var imageAward = awardImages[j];
    awardList.push({ index: j, topAward: topAward, leftAward: leftAward, imageAward: imageAward });
  }
  return awardList;
}

module.exports.circleData = initCircleData
module.exports.awardListData = initAwardListData
