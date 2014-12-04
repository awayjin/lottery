define(function(){
    var $,//定义快捷方式
        WIN = {};


    $ = WIN;

    $.eventUtil = {
        getEvent: function(event){
            return event ? event : window.event;
        },

        getTarget: function(event){
            return   event.target || event.srcElement;
        },

        /*
         element: 引用元素
         type: 事件类型
         handler: 回调函数
         */
        addHandler: function(element, type, handler){
            if(element.addEventListener){
                element.addEventListener(type, handler, false);
            }else if(element.attachEvent){
               element.attachEvent("on"+type, handler);
            }
            return $;
        }
    };

    $._template = '<div class="dialog-alert" data-alert="alert">' +
        '<div class="alert-title">' +
        '<span>对话框</span>' +
        '<span class="close">&times;</span>' +
        '</div>' +
        '<div class="alert-content">内容</div>' +
        '<div class="alert-btn">' +
        '<button class="btn-ok">确定</button>' +
        '<button class="btn-cancel">取消</button>' +
        '</div>' +
        '</div>'


    return WIN;
});