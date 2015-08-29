define([
//    "./lib/jquery"
    "jquery"
//    ,"data"
//    ,"dialog"
], function ($) {
//    var $$ = window.Roulette = function(obj){


    var Roulette = function (obj) {
        return new Roulette.prototype.init(obj);
    };

    Roulette.fn = Roulette.prototype = {
        init: function (obj) {

            //设置默认参数
            var params = {
                //  number: 3, //抽奖次数,默认1次
                endPoint: Math.round(Math.random() * 10), //所中奖品
                ruleObj: ".rule-txt", //抽奖规则包裹元素，添加天这个元素里面
//                ruleData: data.ruleData //抽奖规则
                wrap: ".lottery-draw",
                lotteryBg: "#e4015f", //轮盘默认背景颜色 #e4015f
                verify: false, //后台验证。默认关闭
                continueFunc: function () {
                }
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

            this.ruleObj = params.ruleObj;
            this.data = params.data || data;
            this.url = params.url;
            this.verify = params.verify;

            this.success = params.success; //抽奖完成回调函数
            this.clickStart = params.clickStart; //点击开始回调函数
            this.continueFunc = params.continueFunc; //继续抽奖回调函数


            //数据和抽奖规则初始化
            this.dom(this.data);

            var that = this;
            //开始
            $(this.startBtn).click(function () {
                that.clickStart(that);
            });

            //继续抽奖
            $(document).on("click", ".dialog-ok", function () {
                that.continueFunc(that)
            });

        },

        //DOM初始化
        dom: function (data) {

            var rule = data.ruleData,//规则
                prize = data.prize, //奖品
                prizeBox = this.imgMask,
                img = "";

            for (var i = 0; i < prize.length; i++) {
                img = "<img src='" + prize[i]["src"] + "' alt='" + prize[i]["alt"] + "'> ";
                $(prizeBox).eq(i).append(img);
            }

            $(this.wrap).css("background-color", data.wrapBg);
            $(this.ruleWrap).css("background-color", data.ruleBg);
            $(this.wrap + " a").css("color", data.linkColor);
            $(this.wrap + " a").css("color", data.linkColor);

            //抽奖规则
            $(this.ruleObj).empty().append(rule);

            //开始按钮 换背景图片
            $(this.startBtn).css({"background-image": "url(" + data.startBg + ")"});

            //数据加载完成后显示抽奖
            $(this.wrap).show();

            return this;
        },

        posIndex: function () {

        },

        start: function () {

            var that = this,
                mask = this.mask,
                imgMask = this.imgMask,
                active = this.active,
                start = this.startBtn,
                cycleSuccess = this.success,

                timeId, //用它存放setinterval,不用扣得太细，因为只要用到setinterval最后就得用     window.clearInterval(t);去释放他
                index = 1,//这个用来记录当前循环的次数，比如点了抽奖要转四圈，每转一圈有10个奖品，那一共就要循环10*圈数
                circles = Math.round(Math.random() * 10 + 5),//抽奖要转的圈数
                currentCircle = 1, //记录当前是第几圈setInterval的第二个参数，通过操纵他来实现变速
                speed = 200,//转动的速度,用它作为
                endPoint = that.endPoint; //最后停止的位置，即选中了谁


            //删除活动层
            //$(active).remove();
            $(start).attr("disabled", true); //禁用点击按钮以免多次点击

            autoScroll();

            //查找活动层的位置
            function indexActive() {
                var iIndex = 0;
                $(imgMask).each(function () {
                    if ($(this).find(active).length > 0) {
                        iIndex = $(this).index();
                    }
                });
                return iIndex
            }

            //循环奖品方法
            function autoScroll() {
                if (index > 1) {
                    if ((index % 10) == 1) {
                        $(imgMask).eq(9).find(active).remove();
                    } else {
                        var bb = index - (10 * (currentCircle - 1)) - 1;
                        $(imgMask).eq(bb - 1).find(active).remove();
                    }
                }

                //继续抽奖从上次的终结点开始
                if ($(active).length > 0) {
                    var iIndex = indexActive();
                    if (iIndex != 0) {
                        $(active).remove();
                        if (iIndex == 9) {
                            $(imgMask).eq(0).append(mask);
                        } else {
                            //iIndex+1要在这里，不然最终终结点会不对的
                            $(imgMask).eq(iIndex + 1).append(mask);
                        }
                    }
                } else {
                    var aa = index - (10 * (currentCircle - 1));
                    $(imgMask).eq(aa - 1).append(mask);
                }


                if ((index % 10) == 0) {
                    currentCircle++;
                }
                index++;
//                if (currentCircle == 1) {
                if (currentCircle == 1) {
                    window.clearInterval(timeId);
//                    speed -= 80;
                    speed = 80;
                    timeId = setInterval(autoScroll, speed);
                } else if (currentCircle == (circles - 1)) {// circles-1倒数二圈的时候开始减速
                    window.clearInterval(timeId);
                    speed += 60;
                    timeId = setInterval(autoScroll, speed);
                }

                if (circles == currentCircle && ((index - 1) % 10) == that.endPoint) {
                    window.clearInterval(timeId);
                    $(start).attr("disabled", false);
                    cycleSuccess(that);
                    return;
                }

            }

            return this;
        }
    };

    Roulette.fn.init.prototype = Roulette.fn;

    return Roulette;
});
