/**
 * @Roulette function
 * @name jQuery跑马灯抽奖
 * @description
 * @param {object} js对象字面量{}
 *
 */

!function(){
   var $$ = window.Roulette = function(obj){
       return new Roulette.prototype.init(obj);
   };
    Roulette.fn = Roulette.prototype = {
        sex: "nan",
        init: function(obj){
            var params = {};
            for(var i in obj){

            }

            this.age = obj;
            this.mask = '<div class="lottery-prize-active"></div>'; //遮罩层
            this.imgMask = ".lottery-draw-img";
            this.startBtn = document.getElementById("btnrun");
            this.active = ".lottery-prize-active"; //活动层;


            this.start();
        },
        start: function(){

            //遮罩层相关
            var  that = this,
                mask = that.mask,
                imgMask = that.imgMask,
                active = that.active,
                start = that.startBtn,

                timeId, //用它存放setinterval,不用扣得太细，因为只要用到setinterval最后就得用     window.clearInterval(t);去释放他
                index = 1,//这个用来记录当前循环的次数，比如点了抽奖要转四圈，每转一圈有10个奖品，那一共就要循环10*圈数
                circles = 1,//抽奖要转的圈数
                currentCircle = 1, //记录当前是第几圈setInterval的第二个参数，通过操纵他来实现变速
                speed = 0,//转动的速度,用它作为
                endPoint = that.endPoint; //最后停止的位置，即选中了谁

            function startup() {
                $(start).attr("disabled", true);
                /////随机生成圈数，要跑几圈，不要太少了，太少了看着就不舒服。这里是生成4-14以内的随机整数
                circles = Math.round(Math.random() * 10 + 5);
                /////终结点，生成1-10之内的随机数,因为你一圈有10个奖品
                endPoint = Math.round(Math.random() * 10);

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

                if (circles == currentCircle && ((index - 1) % 10) == endPoint) {
                    window.clearInterval(timeId);
                    $(start).attr("disabled", false);
                    alert("恭喜抽中了" + endPoint + "号奖品");
                    return;
                }

            }


            this.startBtn.onclick = function(){
                this.style.display = true;
                $(active).remove();
                startup();
            }


        }
    };
    Roulette.fn.init.prototype = Roulette.fn;



}();









