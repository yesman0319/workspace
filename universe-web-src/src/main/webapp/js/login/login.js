$(function () {
    var uName = "", uPsw = "", uPhone = "", uCode = "", uPassWord = "";
    //var warnMsg = {"name": "用户名", "psw": "密码", "phone": "手机号", "code": "验证码", "passWord": "密码"};
    $(".form_input").each(function (index, item) {
        $(item).bind({
            focus: function () {
                $(this).css("border-color", "#3aa2e4");
                $(this).parent().find(".form_label").css({
                    "border-right-color": "#3aa2e4"
                });
                $(this).parent().find(".warn").css("display", "none");
                if (this.id === "login_name") {
                    $(this).parent().find(".form_label").css({
                        "background": "url('../i/u_name.png') 1px 1px no-repeat"
                    });
                } else if (this.id === "login_psw") {
                    $(this).parent().find(".form_label").css({
                        "background": "url('../i/u_psw.png') 1px 1px no-repeat"
                    });
                } else if (this.id === "login_phone") {
                    $(this).parent().find(".form_label").css({
                        "background": "url('../i/u_phone.png') 1px 1px no-repeat"
                    });
                } else if (this.id === "login_code") {
                    $(this).parent().find(".form_label").css({
                        "background": "url('../i/u_code.png') 1px 1px no-repeat"
                    });
                } else if (this.id === "register_psw") {
                    $(this).parent().find(".form_label").css({
                        "background": "url('../i/u_psw.png') 1px 1px no-repeat"
                    });
                }
            },
            blur: function () {
                $(this).css("border-color", "#bdbdbd");
                $(this).parent().find(".form_label").css("border-right-color", "#bdbdbd");
                if (this.id === "login_name") {//输入的是用户名
                    uName = $.trim($("#login_name").val()).replace(/ +/g, "");
                    validName(this, uName);
                } else if (this.id === "login_psw") {//输入的是密码
                    uPsw = $.trim($("#login_psw").val()).replace(/ +/g, "");
                    if (uName != "") {//在用户名不为空的情况下验证密码
                        if (uPsw == "") {
                            $(this).val("");
                            $(this).css("border-color", "#ff5a5a");
                            $(this).parent().find(".form_label").css({
                                "border-right-color": "#ff5a5a",
                                "background": "url('../i/u_psw_wrong.png') 1px 1px no-repeat"
                            });
                            $(this).parent().find(".warn").text("密码不能为空！").css({
                                "display": "block",
                                "color": "#ff5a5a"
                            });
                            return 0;
                        }
                    }
                } else if (this.id === "login_phone") {//输入的是电话
                    uPhone = $.trim($("#login_phone").val()).replace(/ +/g, "");
                    validName(this, uPhone);
                } else if (this.id === "login_code") {//输入的是验证码
                    uCode = $.trim($("#login_code").val()).replace(/ +/g, "");
                    if (uCode === "") {
                        $(this).val("");
                        $(this).css("border-color", "#ff5a5a");
                        $(this).parent().find(".form_label").css({
                            "border-right-color": "#ff5a5a",
                            "background": "url('../i/u_code_wrong.png') 1px 1px no-repeat"
                        });
                        $(this).parent().find(".warn").text("验证码不能为空！").css({
                            "display": "block",
                            "color": "#ff5a5a"
                        });
                        return 0;
                    }
                }
                else if (this.id === "register_psw") {
                    uPassWord = $.trim($("#login_psw").val()).replace(/ +/g, "");
                    if (uPassWord == "") {
                        //验证密码
                        return 0;
                    }
                }
            },
            keyup: function (e) {
                //处理e兼容IE
                e = e || window.event;
                if (this.id === "login_name") {
                    if (e.keyCode === 13) {
                        $(this).blur();
                        $("#login_psw").focus();
                    }
                } else if (this.id === "login_psw") {
                    //提交代码
                }
            }
        });
    });
    /*登录*/
    $("#btn_login").click(function () {
        //uName  uPsw  提交 验证用户名 密码  密码加密处理
        // $.md5(pwd)
    });
    /*验证用户名 手机号 */
    function validName(ele, userMsg) {
        /*用户名必须是手机号/邮箱*/
        var regEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        var regPhone = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/;
        if (ele.id === "login_name") {
            if (regEmail.test(userMsg) || regPhone.test(userMsg)) {//用户名格式正确
                $(ele).css("border-color", "#39c075");
                $(ele).parent().find(".form_label").css({
                    "border-right-color": "#39c075",
                    "background": "url('../i/u_name_right.png') 1px 1px no-repeat"
                });
                $(ele).parent().find(".form_label").css("border-right-color", "#39c075");
                return 1;
            } else if (userMsg === "") {
                $(ele).parent().find(".warn").text("用户名不能为空！").css({"display": "block", "color": "#ff5a5a"});
            } else {
                $(ele).parent().find(".warn").text("用户名格式不正确！").css({"display": "block", "color": "#ff5a5a"});
            }
            $(ele).parent().find(".form_label").css({
                "border-right-color": "#ff5a5a",
                "background": "url('../i/u_name_wrong.png') 1px 1px no-repeat"
            });
            $(ele).val("");
            $(ele).css("border-color", "#ff5a5a");
            return 0;
        } else if (ele.id === "login_phone") {
            if (regPhone.test(userMsg)) {//手机号格式正确
                $(ele).css("border-color", "#39c075");
                $(ele).parent().find(".form_label").css({
                    "border-right-color": "#39c075",
                    "background": "url('../i/u_phone_right.png') 1px 1px no-repeat"
                });
                $(ele).parent().find(".form_label").css("border-right-color", "#39c075");
                return 1;
            } else if (userMsg === "") {
                $(ele).parent().find(".warn").text("手机号不能为空！").css({"display": "block", "color": "#ff5a5a"});
            } else {
                $(ele).parent().find(".warn").text("手机号格式不正确！").css({"display": "block", "color": "#ff5a5a"});
            }
            $(ele).parent().find(".form_label").css({
                "border-right-color": "#ff5a5a",
                "background": "url('../i/u_phone_wrong.png') 1px 1px no-repeat"
            });
            $(ele).val("");
            $(ele).css("border-color", "#ff5a5a");
            return 0;
        }
    }

    $("#btn_ios").click(function () {
        $(this).addClass("cur");
        $("#btn_ad").removeClass("cur");
        $(".ios").css("display", "block");
        $(".ad").css("display", "none");
    });
    $("#btn_ad").click(function () {
        $(this).addClass("cur");
        $("#btn_ios").removeClass("cur");
        $(".ios").css("display", "none");
        $(".ad").css("display", "block");
    });
    /*获取验证码*/
    $("#get_code").bind("click", getCode);
    function getCode() {
        $("#get_code").unbind("click", getCode);
        $(this).find("span").css({"text-decoration": "none", "color": "#dbdbdb"});
        $(this).find(".text").text("s后重新获取");
        $(this).find(".time").text("120");
        var curTime = 120;
        var timer = window.setInterval(function () {
            curTime--;
            if (curTime > 0) {
                $(".time").text(curTime);
            } else {
                timer = null;
                $("#get_code").bind("click", getCode);
                $(".get_code").find("span").css({"text-decoration": "underline", "color": "#39c075"});
                $(".text").text("获取验证码");
                $(".time").text("");
            }
        }, 1000);

    }

});