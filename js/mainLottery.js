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
        number: 1 //抽奖次数
//        ,data: data
//        url: "./par.php"
    };

    //初始化数据
    var lottery = lottery(obj);
    lottery.dom(data);

    //点击抽奖按钮
    $("#btnrun").on("click", function(){
        if(obj.number > 0){
            lottery.start(); //动画开始
            obj.number--
        }else{
            dialog.alert({
                number: obj.number,
                prizeText: "您的抽奖次数已经用完!"
            });
        }
    });


     //点击继续抽奖按钮
    $(document).on("click", ".dialog-ok", function(){
        $(".dialog-outer").parent("div").remove();
        $(".d-mask").remove();
        $("#btnrun").click();
    });


});

