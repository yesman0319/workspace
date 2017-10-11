'use strict';

define(['jquery', 'baseCookie', 'app/baseFinal', 'app/baseURL'], function ($, BaseCookie, Final, URL) {

    var tokenTmp;
    var tokenTmp1 = "xiaoma";

    var init = function (conf) {
        BaseCookie.get()
        tokenTmp = BaseCookie.getToken();
        initEvent()
    }

    var initEvent = function () {
        $(document).on('click', '#feedback', function () {
            $('#feedContent').val('')
            $("#feedErr").text('')
            BaseCookie.get()
            tokenTmp = BaseCookie.getToken();
            if (isEmpty(tokenTmp)) {
                tokenTmp = tokenTmp1
            }
            showDialog()
        })
        $(document).on('focus', '#feedContent', function () {
            $("#feedErr").text('')
        })
        $(document).on('click', '#cancleFeed', function () {
            $('#feedbackModal').modal('hide')
            $('#feedContent').val('')
            $("#feedErr").text('')
        })
        $(document).on('click', '#saveFeed', function () {
            if (isEmpty($("#feedContent").val().trim())) {
                $("#feedErr").text('您的反馈不能为空!').css('color', 'red').css('font-size', '12px')
            } else {
                $.ajax({
                    url: URL.baseURL + 'feedbacks',
                    headers: {
                        "Authorization": tokenTmp
                    },
                    data: {
                        content: $("#feedContent").val(),
                        contact: $.cookie(Final.TOEFL_OPEN_ID)
                    },
                    type: 'post',
                    success: function (json) {
                        $("#feedErr").text('感谢您的反馈，我们会及时处理!\t3秒后，将退出反馈页面！').css('color', 'green').css('font-size', '12px')
                        setTimeout("$('#feedbackModal').modal('hide')", 3000)
                    }
                })
            }
        })
        //添加右侧返回顶部
        $(document).on('mouseover', '#app', function (e) {
            $("#app").attr("src", '../../i/home-img4-1.png')
        })
        $(document).on('mouseout', '#app', function (e) {
            $("#app").attr("src", '../../i/home-img4.png')
        })
        $(document).on('click', '#app', function () {
            window.open("../html/downloadApp.html")
        })
        $(document).on('mouseover', '#tfIcon', function (e) {
            $("#tfIcon").attr("src", '../../i/home-img6-1.png')
            $("#tfTip").css("display", "block")
        })
        $(document).on('mouseout', '#tfIcon', function (e) {
            $("#tfIcon").attr("src", '../../i/home-img6.png')
            $("#tfTip").css("display", "none")
        })

        //返回顶部
        $(document).on('mouseover', '#topIcon', function (e) {
            $("#topIcon").attr("src", '../../i/home-img5-1.png')
        })
        $(document).on('mouseout', '#topIcon', function (e) {
            $("#topIcon").attr("src", '../../i/home-img5.png')
        })
        $(document).on('click', '#topIcon', function (e) {
            $('body,html').animate({
                scrollTop: 0
            }, 200)
        })
        $(document).on('scroll', window, function (e) {
            if ($(window).scrollTop() >= 100) {
                $('#topDiv').fadeIn(300);
            } else {
                $('#topDiv').fadeOut(200);
            }
        })
        $(document).ready(function () {
            window.onresize = function () {
                var w = $(window).width()
                if (w < 1300) {
                    $(".return-top").addClass("return-right");
                    $(".home-points").addClass("home-points-right");
                }
                if (w > 1300) {
                    $(".return-top").removeClass("return-right");
                    $(".home-points").removeClass("home-points-right");
                }

                /*   if (w < 1100) {
                 $(".return-top").css({"left":"auto","right":"10px"});
                 }
                 if (w > 1100) {
                 $(".return-top").css({"left":"50%","margin-left":"580px"});
                 }*/
            }
        })
    }

    var showDialog = function () {
        if ($.cookie(Final.TOEFL_ID)) {
            $('#feedbackModal').modal({
                backdrop: 'static'
            })
        } else {
            $('#dialogLogin').modal({
                backdrop: 'static'
            })
        }
    }

    var isEmpty = function (param) {
        if (null == param || "" == param || tokenTmp1 == param) {
            return true
        } else {
            return false
        }
    }

    init()
})