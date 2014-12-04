define(function(){
    var obj = {
        wrapBg: "#000", //#e4015f #ff2f78
        ruleBg: "#999",
        startBg: "images/lottery_start.jpg", //开始按钮图片
        linkColor: "#fff"//链接颜色

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

