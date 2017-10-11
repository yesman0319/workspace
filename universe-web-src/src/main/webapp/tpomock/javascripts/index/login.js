(function() {
    $.extend(xm, {
        /**
         * 初始化页面
         */
        initPage: function() {
            xm.loginForm();
            xm.registKeyEvent();
            $("#user_email").on("change", function() {
                xm.validNumber();
            });
            $("#user_password").on("change", function() {
                xm.validPassword();
            });
            $(".submitBtn").on("click", function() {
                xm.submit();
            });
            // $(".header .logo img").on("click",function (){
            //  window.location.href="../index.html";
            // });
        },
        /**
         * 注册键盘事件
         */
        registKeyEvent: function() {
            document.onkeydown = function(ev) {
                ev = ev || event;
                if (ev.keyCode == 13) {
                    xm.submit();
                }
            }
        },
        /**
         * 表单提交
         */
        submit: function() {
            var validNumber = xm.validNumber();
            var validPassword = xm.validPassword();
            var data = {};
            data.name = $("#user_email").val();
            data.password = encode64($("#user_password").val());
            data.loginFrom = $("#loginFrom").val();
            data.device = "AAA";
            if (validNumber && validPassword) {
                $.ajax({
                    url: xm.baseURL + "/tpo/service/user/login?browser=browser",
                    // cache: true,
                    type: "POST",
                    contentType: 'application/json;charset=UTF-8',
                    data: JSON.stringify(data),
                    dataType: 'json',
                    success: function(response, rpstatus) {
                        //                          xm.showSuccessPanel();
                        if (response.user) {
                            Utils.saveCookie("username", response.user.name);
                            Utils.saveCookie("token", response.user.token);
                            Utils.saveCookie("userid", response.user.id);
                            if (localStorage.obj) {
                                $.ajax({
                                    url: xm.baseURL + "/tpo/service/mock/tpos/save/" + response.user.id + "/listeningandreadinganswer",
                                    type: "POST",
                                    contentType: 'application/json;charset=UTF-8',
                                    data: localStorage.obj,
                                    dataType: 'json',
                                    // headers: {"token" : token},
                                    success: function(data) {
                                        window.location.href = "finishtest.html?tpoId=" + localStorage.tpoId;
                                        //  localStorage.clear();
                                    },
                                    error: function(i) {}
                                });
                            } else {
                                xm.loginForm();
                                window.location.href = "tpomock.html";
                            }
                        } else if (response.status === 0) {
                            alert(response.message);
                        }
                    },
                    error: function(response) {
                        alert("error");
                    }
                });
            } else {
                //xm.validNickName();
                //xm.validNumber();
                //xm.validPassword();
                //xm.validRePassword();
                //alert("信息输入有误，请核对后提交");
            }
        },
        /**
         *重置表单
         */
        loginForm: function() {
            $("#user_email").val("");
            $("#user_password").val("");
        },

        /**
         *验证账号
         */
        validNumber: function(opreation) {
            var number = $("#user_email").val();
            var emailReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
            var mobileReg = /^[1][34578]\d{9}$/;
            if ($.trim(number) === "") {
                $("#num").addClass("error");
                $("#numTip").html('帐号不能为空');
                return false;
            } else if (!emailReg.test($.trim(number)) && !mobileReg.test($.trim(number))) {
                $("#num").addClass("error");
                $("#numTip").html('帐号格式不正确');
                return false;
            } else {
                $("#num").removeClass("error");
                $("#numTip").html('');
                return true;
            }
        },
        /**
         *验证密码
         */
        validPassword: function() {
            var password = $("#user_password").val();
            var passwordReg = /^().{6,16}$/;
            if ($.trim(password) == "") {
                $("#passwordTip").html('密码不能为空');
                return false;
            } else if (!passwordReg.test($.trim(password))) {
                $("#passwordTip").html('密码格式不正确');
                return false;
            } else {
                $("#passwordTip").html('');
                return true;
            }
        },
        /**
         *显示注册成功面板并延时跳转到登录页面
         */
        showSuccessPanel: function() {
            window.location.href = "../index.html";
        }
    });

})();
