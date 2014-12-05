define([
//    "./lib/jquery"
    "jquery",
//    "data",
    "dialog"
], function($, /*data,*/ dialog){
//    var $$ = window.Roulette = function(obj){

    /**
     * @function Roulette
     * params {object} {}对象字面量
     * param.endPoint 终结点
     * */
    var Roulette = function(obj){
        return new Roulette.prototype.init(obj);
    };
    Roulette.fn = Roulette.prototype = {
        init: function(obj){

            //设置默认参数
            var params = {
                number: 1, //抽奖次数,默认1次
                endPoint: Math.round(Math.random() * 10), //所中奖品
                ruleObj: ".rule-txt", //抽奖规则包裹元素，添加天这个元素里面
//                ruleData: data.ruleData //抽奖规则
                wrap: ".lottery-draw",
                lotteryBg: "#e4015f", //轮盘默认背景颜色 #e4015f
                verify: false //后台验证。默认关闭
            };

            //合并参数
            $.fn.extend(params, obj);

            this.wrap = params.wrap;
            this.lotteryWrap = params.lotteryWrap
            this.number = params.number; //抽奖次数
            this.endPoint = params.endPoint

            this.mask = '<div class="lottery-prize-active"></div>'; //遮罩层
            this.imgMask = ".lottery-draw-img";
            this.startBtn = "#btnrun";
            this.active = ".lottery-prize-active"; //活动层;
            this.ruleWrap = ".lot-draw-intro"; //抽奖规则背景框;

//            this.ruleObj = params.ruleObj;
//            this.data = params.data || data;

            this.url = params.url;
            this.verify = params.verify;


            //数据和抽奖规则初始化
//            this.dom(this.data);

//            this.start();
        },

        //DOM初始化
        dom: function(data){

            var rule = data.ruleData,//规则
                prize = data.prize, //奖品
                prizeBox = this.imgMask,
                img = "";

            for(var i=0; i<prize.length; i++){
                img = "<img src='"+prize[i]["src"]+"' alt='"+prize[i]["data-text"]+"'> ";
                $(prizeBox).eq(i).append(img);
            }

            $(this.wrap).css("background-color", data.wrapBg);
            $(this.ruleWrap).css("background-color", data.ruleBg);
            $(this.wrap + " a").css("color", data.linkColor);
            $(this.wrap + " a").css("color", data.linkColor);

            //抽奖规则
            $(this.ruleObj).empty().append(rule);

            //开始按钮 换背景图片
            $(this.startBtn).css({"background-image": "url("+data.startBg+")"});

            //数据加载完成后显示抽奖
            $(this.wrap).show();

        },

        start: function(){

            //遮罩层相关
            var  that = this,
                mask = that.mask,
                imgMask = that.imgMask,
                active = that.active,
                start = that.startBtn,
                verify = that.verify,

                number = parseInt(that.number),
                url = that.url,

                timeId, //用它存放setinterval,不用扣得太细，因为只要用到setinterval最后就得用     window.clearInterval(t);去释放他
                index = 1,//这个用来记录当前循环的次数，比如点了抽奖要转四圈，每转一圈有10个奖品，那一共就要循环10*圈数
                circles = 1,//抽奖要转的圈数
                currentCircle = 1, //记录当前是第几圈setInterval的第二个参数，通过操纵他来实现变速
                speed = 0,//转动的速度,用它作为
                endPoint = that.endPoint; //最后停止的位置，即选中了谁

            function startup() {
                $(active).remove();
                $(start).attr("disabled", true);
                /////随机生成圈数，要跑几圈，不要太少了，太少了看着就不舒服。这里是生成4-14以内的随机整数
                circles = Math.round(Math.random() * 10 + 5);
                /////终结点，生成1-10之内的随机数,因为你一圈有10个奖品
                endPoint = this.endPoint;


                ////当前的圈数
                currentCircle = 1;
                ////速度，谁的太高了会很慢
                speed = 800;
                ////当前循环的次数
                index =1;
                /////取得放奖品的<td>的数组
                var goods = document.getElementsByName("roundelgoods");
                ////存放奖品的<td>的数组
                var drawturn = [];



                ////开始循环
                timeId= setInterval(autoScroll,speed);
            }

///循环奖品方法
            function autoScroll() {
                if (index > 1) {
                    if ((index % 10) == 1) {
                        $(imgMask).eq(9).find(active).remove();
                    } else {
                        var bb = index - (10*(currentCircle -1)) -1;
                        $(imgMask).eq(bb-1).find(active).remove();
                    }
                }

                var aa = index - (10*(currentCircle-1));
                $(imgMask).eq(aa-1).append(mask);

                if ((index % 10) == 0) {
                    currentCircle++;
                }
                index++;
                if (currentCircle == 1) {
                    window.clearInterval(timeId);
                    speed -= 80;
                    timeId = setInterval(autoScroll, speed);
                }else if (currentCircle == (circles-1) ) {//倒数二圈的时候开始减速
                    window.clearInterval(timeId);
                    speed += 60;
                    timeId = setInterval(autoScroll, speed);
                }


                console.log(endPoint, that.endPoint)
                if (circles == currentCircle && ((index - 1) % 10) == that.endPoint) {
                    window.clearInterval(timeId);
                    $(start).attr("disabled", false);
                    //后台验证
                    if(url !== undefined){
                        $.ajax({
                            async: true,
                            url: url,
                            data: endPoint,
                            success: function(d){
                                dialog.alert(d);
                            }
                        });
                    }else{
                        window.clearInterval(timeId);
                        dialog.alert("恭喜抽中了" + that.endPoint + "号奖品");
                    }
                    return;

                }

            }


             startup();

        },

        hi: function(){

        }

    };
    Roulette.fn.init.prototype = Roulette.fn;

    return Roulette;
});