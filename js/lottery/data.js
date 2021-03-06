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
        { "src": "images/lottery_01.jpg", "alt": "全棉时1代全棉柔斤一盒"},
        { "src": "images/lottery_02.jpg", "alt": "全棉时2柔斤一盒"},
        { "src": "images/lottery_03.jpg", "alt": "全棉时3柔斤一盒"},
        { "src": "images/lottery_04.jpg", "alt": "全棉时4棉柔斤一盒"},
        { "src": "images/lottery_05.jpg", "alt": "全棉时5代全棉柔斤一盒"},

        { "src": "images/lottery_06.jpg", "alt": "全棉时6代全棉柔斤一盒"},
        { "src": "images/lottery_07.jpg", "alt": "全棉时7代全棉柔斤一盒"},
        { "src": "images/lottery_08.jpg", "alt": "全棉时8代全棉柔斤一盒"},
        { "src": "images/lottery_09.jpg", "alt": "全棉时9代全棉柔斤一盒"},
        { "src": "images/lottery_10.jpg", "alt": "全棉时10代全棉柔斤一盒"}
    ];




    return obj;
});

