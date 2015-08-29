require.config({
    baseUrl: "js",
    //urlArgs: "busts=" +  (new Date()).getTime(),
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
            //number:4, //抽奖次数
            endPoint: 2, //终结点，就所中的奖品号
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
            continueFunc: function(params){
                $(".dialog-outer").parent("div").remove();
                $(".d-mask").remove();
                params.clickStart(params);
            }
    };


    $.ajax({
        url: "js/lottery/data.php",
        async: false,
        success: function(r){
            // 配置抽奖功能
            setup.number = parseInt(r);
           // console.log(2, setup, setup.number);
        }
    });
    //初始化数据
    lottery(setup);

   // console.log(3, setup);


    // 收藏到浏览器
    $(".collect-lottery").click(function () {
        var sURL = window.location;
        var sTitle = document.title;
        var ua = navigator.userAgent.toLowerCase();

        try {
            window.external.addFavorite(sURL, sTitle);
        } catch (e) {
            try {
                window.sidebar.addPanel(sTitle, sURL, "");
            } catch (e) {
                dialog.alert({
                    number: 0,
                    prizeText: '您的浏览器不支持,请按 Ctrl+D 手动收藏!'
                });
            }
        }
    });

    // 分享
    $(".share-lottery").click(function () {
        var valLink = $(".valLink");
        var width = $(document).width();
        var height = $(document).height()
        valLink.mouseover(function () {
            $(this).select();
        }).val(window.location);


        $('body').append("<div class='d-mask d-mask2'></div>").css({
           "z-index": 100,
            position: 'fixed',
            width: '100%',
            height: '100%'
        });
        var wrap = $(".dialog-outer-2");
        var mask = $(".d-mask")

        wrap.show().css({
            position: "absolute",
            top: $(window).scrollTop +50,
            left:(width -330)/2
        }).find(".dialog-close").click( function() {
            wrap.hide();
            $(".d-mask2").remove();
        });
        $(".dialog-btn").css({"position": "relative", "top": -10});

    });

    // 我的奖品
    $(".my-prize").click(function () {
        var inviteWrap = $(".invite-wrap");
        posLock(inviteWrap);
    });

    function posLock (obj) {
        var width = $(document).width();

        $('body').append("<div class='d-mask d-mask3'></div>").css({
            "z-index": 100,
            position: 'fixed',
            width: '100%',
            height: '100%'
        });
        var wrap = obj;
        var mask = $(".d-mask")

        wrap.show().css({
            position: "absolute",
            top: $(window).scrollTop() +50,
            left:(width -330)/2
        }).find(".dialog-close").click( function() {
            wrap.hide();
            $(".d-mask3").remove();
        });
    }

});
