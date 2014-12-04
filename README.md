<h1>
js跑马灯 轮播抽奖效果
</h1>
<a href="http://www.codegoing.com/lottery/" target="_blank">查看效果地址</a>

<p>用到的库 require.js jquery.js</p>
<p>可配置，可控制终将的是哪个。数据(抽奖图片),逻辑(js),视图(html)分离.</p>
<p>模块化</p>
<p>还不太完善,有时间慢慢改善</p>
<pre>
mainLottery.js
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
 //    "./lib/jquery"
     "jquery",
     "data",
     "dialog"
 ], function($, data, dialog){
 //    var $$ = window.Roulette = function(obj){

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

</pre>