'use strict';

define(['jquery', 'app/baseURL', 'baseCookie'], function ($, URL, BaseCookie) {

    var timer = null;
    var tokenTmp;

    var init = function (conf) {
        BaseCookie.get();
        tokenTmp = BaseCookie.getToken();
        getMessage();
        initEvent();
    };

    var initEvent = function () {
        // $(document).on('click', '#messageTip', messageTipFun)
        // $(document).on('click', '.messageTip', messageTipFun)
    }

    // var messageTipFun = function() {
    // 	window.location.href = "../html/person.html?type=2"
    // }

    var getMessage = function () {
        if (!isEmpty(tokenTmp)) {
            $.ajax({
                url: URL.baseURL + 'messages/unread',
                headers: {
                    Authorization: tokenTmp
                },
                data: {
                    from: 'pc'
                },
                async: false,
                type: 'get',
                success: function (json) {
                    if (json.unread != 0) {
                        // $("#messageTip").html(json.unread)
                        $(".messageTip").html(json.unread)
                    }
                }
            })
        }
        timer = window.setTimeout("getMessage()", 5 * 60 * 1000);
    }

    var isEmpty = function (param) {
        if (null == param || "" == param) {
            return true
        } else {
            return false
        }
    }

    window.getMessage = getMessage;

    return {
        init: init
    }
})