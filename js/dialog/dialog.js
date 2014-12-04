define([
    "jquery"
],function($){
    var dialog = {};

    dialog.alert = function(message){
        var msg = message,
            _html = "",
            doc = document,
            body = doc.body,
            wrap;

        _html = '<div class="dialog-outer" data-alert="alert">' +
                    '<div class="dialog-title">' +
                      '<span>对话框</span>' +
                      '<span class="dialog-close">&times;</span>' +
                    '</div>' +
                    '<div class="dialog-content" id="d-content">内容</div>' +
                        '<div class="dialog-btn">' +
                             '<button class="dialog-ok" style="display: none;">确定</button>' +
                             '<button class="dialog-cancel">取消</button>' +
                     '</div>' +
                '</div>';

        //创建最外层元素
        wrap = doc.createElement("div");
        wrap.innerHTML = _html;

        //作为body后第一个元素插入
        body.insertBefore(wrap, body.firstChild);


        var i,
            eles,
            elesLen,
            obj = {},
            name;

        //得到所有元素
        eles = wrap.getElementsByTagName("*");
        elesLen = eles.length;

        var content = document.getElementById("d-content");
        content.innerHTML = msg


        var truthEle  = $(wrap).find(".dialog-outer");
        var dMask =".d-mask",
            bodyWidth,
            hCenter,
            vTop;

        $("body").append("<div class='d-mask'></div>");

        //居中，滚动条的20个像素
        bodyWidth = $(document).width();
        hCenter = (bodyWidth- truthEle.width())/2;
        vTop = $(document).scrollTop() + 20; //滚动条滚动的距离

        truthEle.css({
            top: vTop,
            left: hCenter
        });

        for(i=0; i<elesLen; i++){
            name = eles[i].className.split("-")[1];
            obj[name] = eles[i];
        }

        obj["close"].onclick = function(){
            //wrap.style.display = "none";
            $(wrap).remove();
            $(dMask).remove();
        }

        obj["cancel"].onclick = function(){
            //wrap.style.display = "none";
            $(wrap).remove();
            $(dMask).remove();
        }








    }
    return dialog;
});


