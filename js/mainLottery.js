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
        endPoint: 3, //终结点
        number: 0 //抽奖次数
//        data: data
//        url: "./par.php"
    };

//    dialog.alert();

    lottery(obj);

    /*var url = obj.url+"?name="+obj.number;
    $.post(url, function(num){
        console.log(num)
        if(num >= 1){
            obj.number = parseInt(num);
            //初始化抽奖
            lottery(obj);
        }

    });*/






});

