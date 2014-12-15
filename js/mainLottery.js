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
    var setup = {
            data: data, //数据初始化
            endPoint: 3, //终结点，就所中的奖品号
            number: 2, //抽奖次数
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
                        number: 0,
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
    lottery(setup);
});
