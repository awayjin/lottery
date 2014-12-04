<h1>
js跑马灯 轮播抽奖效果
</h1>
<a href="http://www.codegoing.com/lottery/" target="_blank">查看效果地址</a>

<p>用到的库 require.js jquery.js</p>
<p>可配置，可控制终将的是哪个。数据(抽奖图片),逻辑(js),视图(html)分离.</p>
<p>模块化</p>
<p>还不太完善,有时间慢慢改善</p>
<pre>

<h3>mainLottery.js</h3>

 require.config({
     baseUrl: "js",
     paths: {
         jquery: "lib/jquery",
         lottery: "lottery/lottery",
         data: "lottery/data",
         dialog: "dialog/dialog"
     }
 });

 require([
     "jquery",
     "lottery",
     "data"
 ], function($, lottery, data){
     //抽奖配置参数
     var obj = {
         endPoint: 3, //终结点，就所中的奖品号
         number: 1 //抽奖次数
 //        data: data //数据
 //        url: "./par.php" //是否后台验证
     };
     lottery(obj);
 });

<h3>lottery.js</h3>
 define([
     "jquery",
     "data",
     "dialog"
 ], function($, data, dialog){
     /**
      * @function Roulette
      * params {object} {}对象字面量
      * param.endPoint 终结点
      * */
     var Roulette = function(obj){
         return new Roulette.prototype.init(obj);
     };

     Roulette.fn = Roulette.prototype = { .... }

     Roulette.fn.init.prototype = Roulette.fn;

     return Roulette;
 })


<h3>data.js</h3>
define(function(){
    var obj = {
        wrapBg: "#e4015f", //#e4015f #ff2f78 #000
        ruleBg: "#ff2f78",
        startBg: "images/lottery_start.jpg", //开始按钮图片
        linkColor: "#000"//链接颜色

    };
    //抽奖规则
    obj.ruleData = "<p>1、实付金额消费满80元，获得1次机会<\/p>"
                    + "<p>2、给予全五分好评获得1次机会<\/p>"
                    + "<p>3、收藏店铺可获得1次抽奖机会<\/p>"
                    + "<p>4、分享引来1个流量获得1次抽奖机会<\/p>"
                    + "<p> 8、所有进店者可免费获得1次抽奖机会<\/p>";

    //奖品
    obj.prize = [
        { "src": "images/lottery_01.jpg", "alt": "全棉时代全棉柔斤一盒"},
        { "src": "images/lottery_02.jpg", "alt": "全棉时代全棉柔斤一盒"},
        { "src": "images/lottery_03.jpg", "alt": "全棉时代全棉柔斤一盒"},
        { "src": "images/lottery_04.jpg", "alt": "全棉时代全棉柔斤一盒"},
        { "src": "images/lottery_05.jpg", "alt": "全棉时代全棉柔斤一盒"},

        { "src": "images/lottery_06.jpg", "alt": "全棉时代全棉柔斤一盒"},
        { "src": "images/lottery_07.jpg", "alt": "全棉时代全棉柔斤一盒"},
        { "src": "images/lottery_08.jpg", "alt": "全棉时代全棉柔斤一盒"},
        { "src": "images/lottery_09.jpg", "alt": "全棉时代全棉柔斤一盒"},
        { "src": "images/lottery_10.jpg", "alt": "全棉时代全棉柔斤一盒"}
    ];
    return obj;
});
</pre>