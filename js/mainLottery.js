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
    "data",
    "dialog"
], function($, lottery, data, dialog){

    //抽奖配置参数
    var obj = {
        endPoint: 3, //终结点，就所中的奖品号
        number: 1, //抽奖次数
        //抽奖完成后的回调函数
        success: function(params){
            var prize = $(params.imgMask).eq(params.endPoint).find("img").attr("alt")
            dialog.alert("恭喜抽中了" + prize + "号奖品");
        },
        //点击开始
        clickStart: function(pararms){
            if(pararms.number > 0){
                pararms.number--;
                pararms.start();//开始
            }else{
                dialog.alert({
                    number: obj.number,
                    prizeText: "您的抽奖次数已经用完!"
                });
            }
        },
        //点击继续抽奖按钮
        continue: function(params){
            $(".dialog-outer").parent("div").remove();
            $(".d-mask").remove();
            params.clickStart(params);
        }
    };

    //初始化数据
    lottery(obj).dom(data);

    //点击抽奖按钮
//    $("#btnrun").on("click", function(){
//        if(obj.number > 0){
//            lottery(obj).start(); //动画开始
//            obj.number--
//        }else{
//            dialog.alert({
//                number: obj.number,
//                prizeText: "您的抽奖次数已经用完!"
//            });
//        }
//    });


     //点击继续抽奖按钮
//    $(document).on("click", ".dialog-ok", function(){
//        $(".dialog-outer").parent("div").remove();
//        $(".d-mask").remove();
//        $("#btnrun").click();
//    });


});

