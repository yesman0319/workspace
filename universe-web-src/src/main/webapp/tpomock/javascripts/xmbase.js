/**
 * 百度统计代码
 */
var _hmt = _hmt || [];
(function() {
    if (window.location.href.indexOf("xiaomayasi") >= 0) {
        var hm = document.createElement("script");

        hm.src = "//hm.baidu.com/hm.js?30e342ab5fda376039df663c9e6b7b83";

        var s = document.getElementsByTagName("script")[0];

        s.parentNode.insertBefore(hm, s);
    }

})();

//var script = document.createElement('script');
//script.src="http://qzonestyle.gtimg.cn/qzone/openapi/qc_loader.js" ;
//script.setAttribute("data-appid","101183329");
//script.setAttribute("data-redirecturi","");
//if (script.readyState) { //IE
//    script.onreadystatechange = function(){
//　       if (script.readyState == "loaded" || script.readyState == "complete") {
//  　　        script.onreadystatechange = null;
//  　　        //initQCLogin && initQCLogin();
//        }
//    };
//}
//else { //Others
//    script.onload = function(){
//       // initQCLogin();
//    };
//}
//document.getElementsByTagName('head')[0].appendChild(script);
//$(function (){
//  QC.Login({
//       //btnId：插入按钮的节点id，必选
//       btnId:"qqLoginBtn",
//       //用户需要确认的scope授权项，可选，默认all
//       scope:"all",
//       //按钮尺寸，可用值[A_XL| A_L| A_M| A_S|  B_M| B_S| C_S]，可选，默认B_S
//       size: "C_S"
//   }, function(reqData, opts){//登录成功
//       //根据返回数据，更换按钮显示状态方法
//      if(QC.Login.check()){//如果已登录
//          QC.Login.getMe(function(openId, accessToken){
//              var datas={userInfo:reqData,openId:openId,accessToken:accessToken};
//              if(datas){
//                  xm.thirdLogin(datas,1);
//              }
//              return;
//               var dom = document.getElementById(opts['btnId']),
//               _logoutTemplate=[
//                  //头像
//                  '<span onclick="javaScritp:alert(1);"><img src="{figureurl}" class="{size_key}"/></span>',
//                  //昵称
//                  '<span>{nickname}</span>',
//                  //退出
//                  '<span><a href="javascript:QC.Login.signOut();">退出</a></span>'
//               ].join("");
//               dom && (dom.innerHTML = QC.String.format(_logoutTemplate, {
//                 nickname : QC.String.escHTML(reqData.nickname), //做xss过滤
//                 figureurl : reqData.figureurl
//               }));
//              alert(["当前登录用户的", "openId为："+openId, "accessToken为："+accessToken].join("\n"));
//          });
//          //这里可以调用自己的保存接口
//          //...
//      }
//   }, function(opts){//注销成功
//         alert('QQ登录 注销成功');
//   });
//});
//function initQCLogin(){
//  return;
//  QC.Login({
//       //btnId：插入按钮的节点id，必选
//       btnId:"qqLoginBtn",
//       //用户需要确认的scope授权项，可选，默认all
//       scope:"all",
//       //按钮尺寸，可用值[A_XL| A_L| A_M| A_S|  B_M| B_S| C_S]，可选，默认B_S
//       size: "C_S"
//   }, function(reqData, opts){//登录成功
//       //根据返回数据，更换按钮显示状态方法
//      if(QC.Login.check()){//如果已登录
//          QC.Login.getMe(function(openId, accessToken){
//              var datas={userInfo:reqData,openId:openId,accessToken:accessToken};
//              if(datas){
//                  xm.thirdLogin(datas,1);
//              }
//              return;
//               var dom = document.getElementById(opts['btnId']),
//               _logoutTemplate=[
//                  //头像
//                  '<span onclick="javaScritp:alert(1);"><img src="{figureurl}" class="{size_key}"/></span>',
//                  //昵称
//                  '<span>{nickname}</span>',
//                  //退出
//                  '<span><a href="javascript:QC.Login.signOut();">退出</a></span>'
//               ].join("");
//               dom && (dom.innerHTML = QC.String.format(_logoutTemplate, {
//                 nickname : QC.String.escHTML(reqData.nickname), //做xss过滤
//                 figureurl : reqData.figureurl
//               }));
//              alert(["当前登录用户的", "openId为："+openId, "accessToken为："+accessToken].join("\n"));
//          });
//          //这里可以调用自己的保存接口
//          //...
//      }
//   }, function(opts){//注销成功
//         alert('QQ登录 注销成功');
//   });
//}


$(function() {
    //按钮点击后禁用按钮1.5s防止重复提交
    $("input[type='button']").bind("click", function() {
        $(this).attr("disabled", true);
        var self = this;
        window.setTimeout(function() {
            $(self).removeAttr("disabled");
            $(self).get(0).disabled = false;
        }, 1500);
    });
    // $(".submit").bind("click",function (){
    //  $(this).attr("disabled",true);
    //  var self=this;
    //  window.setTimeout(function (){
    //      $(self).removeAttr("disabled");
    //      $(self).get(0).disabled=false;
    //  },10);https://test.api.liuyang.com/learning
    // });
});
(function() {
    if (!window.xm || !xm) {
        xm = window.xm = {};
    }
    $.extend(xm, {
        baseURL: window.xiaoma.basePath+"/plan/proxy?proxyurl="+window.xiaoma.learning,
        baseMAIN: ".liuyang.com",
        baseEXERCISE:"test.exercise.liuyang.com",
        //baseURL: "http://tpoint.liantpo.com",
        debug: true,
        log: function(val) {
            if (xm.debug && window.console) {
                console.log(val);
            } else if (xm.debug && !window.console) {
                window.console = {};
                window.console.log = function() {
                    return;
                }
                window.console.log(val);
            }
        },
        trim: function(str) {
            return str.replace(/\s+/g, "");
        },
        //退出登录
        exitLogin: function() {
            if (xm.username) {
                $.ajax({
                    url: "",
                    type: "POST",
                    dataType: "JSON",
                    headers: {
                        "token": Utils.getCookie("token")
                    },
                    success: function(response, rpstatus) {
                        xm.isLogin = false;
                        if (rpstatus === "success") {
                            if (response.status == 1) {
                                Utils.delCookie("username");
                                Utils.delCookie("token");
                                Utils.delCookie("userid");
                                localStorage.clear();
                                window.location.href = "tpomock.html";
                                //Utils.startTimer(response.examTime);
                            }
                        }
                    },
                    error: function(response) {
                        xm.log("checkLoginManage error");
                    }
                });
            }
        },
        showTipMsg: function(id, message, direction, hideTime) {
            if (!id || !message) {
                return;
            };
            if (!direction) {
                direction = "bottom";
            }
            var follow = document.getElementById(id);
            if (follow) {
                if (!xm.d) {
                    xm.d = dialog({
                        align: direction,
                        content: message
                    });
                } else {
                    xm.d.content(message);
                }
                xm.d.show(follow);
                var time = 1000;
                if (hideTime && hideTime > 0) {
                    time = hideTime;
                }
                window.setTimeout(function() {
                    xm.d.close();
                }, time);
            }
        },
        showDialog: function(cfg) {
            if (!cfg) {
                return;
            }
            var title = cfg.title || '  ';
            var content = cfg.content || '';
            var icon = cfg.icon || "./image/index/checkemsu_03.png";
            var okValue = cfg.okValue;
            var okCall = cfg.okCall || function() {};
            var cancelValue = cfg.cancelValue;
            var cancelCall = cfg.cancelCall || function() {};

            var config = {};
            config.title = title;
            if (okValue) {
                config.okValue = okValue;
                config.ok = okCall;
            }
            if (cancelValue) {
                config.cancelValue = cancelValue;
                config.cancel = cancelCall;
            }
            config.content = '<div class="content"><img src=' + icon + '><p>' + content + '</p></div>';
            var d = dialog(config);
            d.showModal();
            return;
        },
        //弹出window模拟窗口层
        showWindow: function(show_div, bg_div) {
            document.getElementById(show_div).style.display = 'block';
            document.getElementById(bg_div).style.display = 'block';
            var bgdiv = document.getElementById(bg_div);
            bgdiv.style.width = document.body.scrollWidth;
            // bgdiv.style.height = $(document).height();
            $("#" + bg_div).height($(document).height());
        },
        //关闭window模拟窗口层
        closeWindow: function(show_div, bg_div) {
            document.getElementById(show_div).style.display = 'none';
            document.getElementById(bg_div).style.display = 'none';
        },
        getEmailServerAddress: function(val) {
            var emailServerAddress = "";
            var emailHash = {
                'qq.com': 'http://mail.qq.com',
                'gmail.com': 'http://mail.google.com',
                'sina.com': 'http://mail.sina.com.cn',
                '163.com': 'http://mail.163.com',
                '126.com': 'http://mail.126.com',
                'yeah.net': 'http://www.yeah.net/',
                'sohu.com': 'http://mail.sohu.com/',
                'tom.com': 'http://mail.tom.com/',
                'sogou.com': 'http://mail.sogou.com/',
                '139.com': 'http://mail.10086.cn/',
                'hotmail.com': 'http://www.hotmail.com',
                'live.com': 'http://login.live.com/',
                'live.cn': 'http://login.live.cn/',
                'live.com.cn': 'http://login.live.com.cn',
                '189.com': 'http://webmail16.189.cn/webmail/',
                'yahoo.com.cn': 'http://mail.cn.yahoo.com/',
                'yahoo.cn': 'http://mail.cn.yahoo.com/',
                'eyou.com': 'http://www.eyou.com/',
                '21cn.com': 'http://mail.21cn.com/',
                '188.com': 'http://www.188.com/',
                'foxmail.com': 'http://www.foxmail.com',
                'outlook.com': 'http://www.outlook.com'
            };
            if (val) {
                var _mail = val.split('@')[1]; //获取邮箱域
                emailServerAddress = emailHash[_mail];
            };
            return emailServerAddress;
        }
    });
})();
