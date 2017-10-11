(function() {
    $.extend(xm, {
        /**
         * 初始化页面
         */
        initPage: function() {
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
            var loginData = {};
            loginData.name = $("#user_email").val();
            loginData.password = encode64($("#user_password").val());
            loginData.loginFrom = 'PC';
            loginData.device = "AAA";
            var registData = {};
            registData.name = $("#user_email").val();
            registData.password = encode64($("#user_password").val());
            registData.nickname = $("#user_username").val();
            registData.registerFrom = $("#registerFrom").val();
            if (validNumber && validPassword) {
                $.ajax({
                    type: 'POST',
                    url: 'http://192.168.1.22:9090/mock1/tpo/service/user/register',
                    contentType: 'application/json;charset=UTF-8',
                    data: JSON.stringify(registData),
                    dataType: 'json',
                    success: function(data) {
                        if (data.status == 1) {
                            $.ajax({
                                url: "http://192.168.1.22:9090/mock1/tpo/service/user/login?browser=browser",
                                // cache: true,
                                type: "POST",
                                contentType: 'application/json;charset=UTF-8',
                                data: JSON.stringify(loginData),
                                dataType: 'json',
                                success: function(response, rpstatus) {
                                    if (response.user) {
                                        Utils.saveCookie("username", response.user.name);
                                        // Utils.saveCookie("isLogin",true);
                                        Utils.saveCookie("token", response.user.token);
                                        Utils.saveCookie("userid", response.user.id);
                                        window.location.href = "tpomock.html";
                                    } else if (response.status === 0) {
                                        alert(response.message);
                                    }
                                },
                                error: function(response) {
                                    alert("error");
                                }
                            });
                        } else {
                            alert(data.message)
                        }
                    },
                    error: function(data) {}
                })
            }
        },
        /**
         *验证账号
         */
        validNumber: function(opreation) {
            var number = $("#user_email").val();
            var emailReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
            var mobileReg = /^[1][34578]\d{9}$/;
            if ($.trim(number) === "") {
                $("#emailTip").html('帐号不能为空');
                return false;
            } else if (!emailReg.test($.trim(number)) && !mobileReg.test($.trim(number))) {
                $("#emailTip").html('帐号格式不正确');
                return false;
            } else {
                $("#emailTip").html('');
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
                $("#pwdTip").html('密码不能为空');
                return false;
            } else if (!passwordReg.test($.trim(password))) {
                $("#pwdTip").html('密码格式不正确');
                return false;
            } else {
                $("#pwdTip").html('');
                return true;
            }
        },
    });

})();
