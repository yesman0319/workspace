'use strict';
define(['jquery', 'baseCookie', 'app/baseURL', 'lib/store', 'lib/math.uuid'], function ($, BaseCookie, URL) {
    var timerSignOn = null; //非h5支持
    var ws = null; //websocket
    var initInfo = function () {
        //新导航active定位
        var localTmp = document.location.href;
        if (localTmp.indexOf('home') != -1 || localTmp.indexOf('exercise') != -1 || localTmp.indexOf('jinjie') != -1 || localTmp.indexOf('chongci') != -1) {
            $("#learnNav").addClass('active')
        } else if (localTmp.indexOf('courselist.html') != -1) {
            $("#mycourseNav").addClass('active')
        } else if (localTmp.indexOf('teachers.html') != -1) {
            $("#onetooneNav").addClass('active')
        } else if (localTmp.indexOf('studyabroad.html') != -1) {
            $("#abordNav").addClass('active')
        }
        //else if (localTmp.indexOf('member') != -1) {
        //    $("#memberNav").addClass('active')
        //}
        /*新导航开始*/
        /*$(document).on('click', '#learnNav', function () {
         window.location.href = "../html/home.html";
         })*/
        $(document).on('mouseover', '#learnNav', function () {
            var localTmp = window.location.href;
            if (localTmp.indexOf('exercise') != -1) {
                $('#jiChuNav').addClass('secondActive')
            } else if (localTmp.indexOf('jinJie') != -1) {
                $('#jinJieNav').addClass('secondActive')
            } else if (localTmp.indexOf('chongCi') != -1) { //冲刺
                $('#chongCiNav').addClass('secondActive')
            }
            $("#secondNav").slideDown("fast")
        })
        $(document).on('mouseout', 'body', function (e) {
            e = window.event || e; // 兼容IE7
            var obj = $(e.srcElement || e.target);
            if (!$(obj).is("#learnLi,#learnNav,#secondNav,.secondLi")) {
                $('#secondNav').hide()
            }
        });
        /*新导航end*/
        BaseCookie.get()
        if (BaseCookie.getToken() != "" && BaseCookie.getToken() != "xiaoma") {
            $('#exitNav').bind('click', function () {
                exit()
            })
            $('#uc').bind('click', function () {
                $("#uc_token").val(BaseCookie.getToken());
                $("#userCenterForm").submit();
            })


            var
                nav = "Nav",
                dis = function (ele, bol) {
                    $('#' + ele + nav).css({
                        display: bol
                    })
                },
                exit = function () {
                    var reg = /person.html/g
                    window.location.href = ""
                    dis("user", "none")
                    dis("lg", "block")
                    BaseCookie.clearAll()
                    //清除单点登录计时器
                    if (timerSignOn) {
                        clearTimeout(timerSignOn)
                    } else {
                        ws.close();
                    }
                    /*if (reg.exec(document.location.href) && reg.exec(document.location.href)[0] == "person.html") {
                     window.location.href = "../html/home.html"
                     }else {
                     window.location.href = document.location.href
                     }*/

                    var toHomePageArray = ["person.html", "mycoupon.html", "mycourse.html", "onetooneInfo.html"]
                    var tag = false;
                    for (var i = 0; i < toHomePageArray.length; i++) {
                        if (document.location.href.indexOf(toHomePageArray[i]) > -1) {
                            tag = true;
                            break;
                        }
                    }
                    if (tag && document.location.href.indexOf('/xiaoma/') == -1) {
                        window.location.href = "../html/home.html"
                    } else if (tag && document.location.href.indexOf('/xiaoma/') > -1) {
                        window.location.href = "../../html/xiaoma/home.html"
                    } else {
                        window.location.href = document.location.href
                    }
                },
                initEvent = function () {
                    $(document).on('#exitNav', 'click', function () {
                        exit()
                    })
                    $(document).on('#uc', 'click', function () {
                        $("#uc_token").val(BaseCookie.getToken());
                        $("#userCenterForm").submit();
                    })

                    $(document).on('mouseover', '#nameNav', function () {
                        // $("#userInfoid").toggle()
                        $("#userInfoid").slideDown("fast")
                    })
                    $(document).on('mouseout', 'body', function (e) {
                        e = window.event || e; // 兼容IE7
                        var obj = $(e.srcElement || e.target);
                        if ($(obj).is("#nameNavDiv,#nameNavDiv *,#userInfoid, #userInfoid *")) {
                            // alert('内部区域');
                            $("#nameSanJiao").attr('class', 'caret1')
                        } else {
                            $("#nameSanJiao").attr('class', 'caret')
                            $("#userInfoid").css("display", "none");
                        }
                    });
                },
                init = function () {
                    $.ajax({
                        url: '/action/user/getUserProfile.action',
                        headers: {
                            'token': BaseCookie.getToken()
                        },
                        type: 'get',
                        success: function (json) {
                            var result = json.result;
                            if (result.openId.length > 11) {
                                $("#nameNav").html(result.openId.substring(0, 11) + "...")
                                $("#nameNav").attr("title", result.openId)

                                $("#sideNickname").html(result.openId.substring(0, 11) + "...")
                                $("#sideNickname").attr("title", result.openId)
                            } else {
                                $("#nameNav").html(result.openId)
                                $("#nameNav").attr("title", result.openId)

                                $("#sideNickname").html(result.openId)
                                $("#sideNickname").attr("title", result.openId)
                            }
                            if (result.avatar) {
                                $('#person').attr("src", result.avatar)
                            } else {
                                $('#person').attr("src", "../i/i1.png")
                            }
                        }
                    })
                },
            //单点登录
                getSignOn = function () {
                    window.WebSocket = window.WebSocket || window.MozWebSocket;
                    if (!$.cookie("TOEFL_UUID")) {
                        $.cookie("TOEFL_UUID", Math.uuid(), {
                            expires: 1,
                            path: '/'
                        });
                    }
                    if (window.WebSocket) {


                        // 支持html5  用websocket
                        ws = new WebSocket(URL.baseURLWebSocket);
                        ws.onopen = function () {
                            ws.send(JSON.stringify({
                                "token": BaseCookie.getToken(),
                                "tag": $.cookie("TOEFL_UUID"),
                                "action": "single_landing"
                            }));
                        }
                        ws.onmessage = function (evt) {
                            if (evt.data == 2) {
                                alert("检测到您的帐号在另一台设备上登录，请您重新登录")
                                exit()
                            }
                        };
                    } else {
                        // 不支持  用ajax
                        var ajaxSignOn = function () {

                            $.ajax({
                                url: URL.baseURL9 + 'single_landings/check_landing',
                                headers: {
                                    Authorization: BaseCookie.getToken()
                                },
                                data: {
                                    tag: $.cookie("TOEFL_UUID"), // BaseCookie.getUuid(),
                                    from: 3
                                },
                                // async: false,
                                type: 'get',
                                success: function (json) {
                                    if (json.is_landing == 2) {
                                        alert('检测到您的帐号在另一台设备上登录，请您重新登录')
                                        exit()
                                    }
                                }
                            })
                            timerSignOn = window.setTimeout("ajaxSignOn()", 3 * 1000);
                        }
                        window.ajaxSignOn = ajaxSignOn;
                        ajaxSignOn()
                    }
                }

            init()
            initEvent()
            dis("user", "block")
            dis("lg", "none")
            // 单点登录
            getSignOn()
            // $('#' + 'name' + nav).text(BaseCookie.getNickname())
        } else {
            $("#lgNav").css("display", "block")
        }
        var initEventAll = function () {
            /*新导航开始*/
            /*$(document).on('click', '#learnNav', function () {
             window.location.href = "../html/home.html";
             })*/
            $(document).on('mouseover', '#learnNav', function () {
                var localTmp = window.location.href;
                if (localTmp.indexOf('exercise') != -1) {
                    $('#jiChuNav').addClass('secondActive')
                } else if (localTmp.indexOf('jinJie') != -1) {
                    $('#jinJieNav').addClass('secondActive')
                } else if (localTmp.indexOf('chongCi') != -1) { //冲刺
                    $('#chongCiNav').addClass('secondActive')
                }
                $("#secondNav").slideDown("fast")
            })
            $(document).on('mouseout', 'body', function (e) {
                e = window.event || e; // 兼容IE7
                var obj = $(e.srcElement || e.target);
                if (!$(obj).is("#learnLi,#learnNav,#secondNav,.secondLi")) {
                    $('#secondNav').hide()
                }
            });
            $(document).on('click', '#jiChuNav', function () {
                window.location.href = "../../html/exercise.html";
            })
            $(document).on('click', '#jinJieNav', function () {
                window.location.href = "../../html/jinjie.html";
            })
            $(document).on('click', '#chongCiNav', function () {
                window.location.href = "../../html/chongci.html";
            })
            /*新导航end*/
        }
        initEventAll()
    }

    var highLightNav = function () {
        var ele = store.get('eleNav')
        if (!ele) {
            ele = "homeNav"
        }
        $('#' + ele).addClass('navActive')
        store.remove("eleNav")
    }

    var isEmpty = function (param) {
        if (null == param || "" == param) {
            return true
        } else {
            return false
        }
    }

    initInfo()
    // window.getSignOn = getSignOn;
    // highLightNav()

    return {
        highLightNav: highLightNav,
        initInfo: initInfo
    }
})