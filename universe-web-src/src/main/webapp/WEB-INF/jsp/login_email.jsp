<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>忘记密码</title>
    <style type="text/css">
        * {
            margin: 0;
            padding: 0;
            font-size: 12px;
            font-family: 微软雅黑;
        }

        a {
            text-decoration: none;
        }
    </style>
    <link rel="stylesheet" href="../css/forget_psw.css"/>
</head>
<body>
<div class="forget">
    <div>
        <hr/>
        <p class="title">登录</p>
        <hr/>
    </div>
    <div class="layout1">
        <p class="warn">没有找到使用该邮箱注册的用户</p>

        <div class="user user_phone">
            <span class="err_msg">请输入手机号</span>
            <input type="text" name="phone" class="text" id="phone"/>
        </div>
        <div class="user">
            <span class="err_msg">请输入验证码</span>
            <input type="text" name="code" class="text" id="code"/>
        </div>
        <div class="user">
            <span class="err_msg">请输入密码</span>
            <input type="password" name="password" class="text" id="psw"/>
        </div>
        <div class="user">
            <span class="err_msg">请再次输入密码</span>
            <input type="password" name="password" class="text" id="rePsw"/>
        </div>

        <a href="javascript:;" class="reset" id="reset">重置</a>

        <!--<div>-->
            <!--<a href="javascript:;" class="forget_psw">忘记密码</a>-->
            <!--<a href="javascript:;" class="re_code">重新发送验证码</a>-->
            <!--<a href="javascript:;" class="other_log">我要使用第三方登录</a>-->
        <!--</div>-->
    </div>
</div>

</body>
<script type="text/javascript" src="../js/lib/jquery/1.11.1.js"></script>
<script type="text/javascript">
    $(function () {
        var regPhone = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/;
        $(".text").each(function (index, item) {
            $(item).bind({
                        focus: function () {
                            $(this).css("border-color", "#3aa2e4").parent().find("span").css("display", "none");
                        },
                        blur: function () {
                            var val = $.trim($(this).val()).replace(/ +/g, "");
                            if (this.id.toLowerCase() === "phone") {
                                if (val === "") {
                                    $(this).parent().find("span").text("手机号不能为空！").css({
                                        "display": "block",
                                        "color": "#ff5a5a"
                                    });
                                } else if (!regPhone.test(val)) {
                                    $("#phone").val("").css("border-color", "#ff5a5a");
                                    $(this).parent().find("span").text("手机号格式不正确！").css({
                                        "display": "block",
                                        "color": "#ff5a5f"
                                    })
                                }else{//输入正确的手机号
                                    $("#phone").css("border-color", "#39c075");
                                }
                            }
                            if (this.id.toLowerCase() === "code") {
                                if (val === "") {
                                    $(this).parent().find("span").text("验证码不能为空！").css({
                                        "display": "block",
                                        "color": "#ff5a5a"
                                    });
                                }
                            }
                            if (this.id.toLowerCase() === "psw") {
                                if (val === "") {
                                    $(this).parent().find("span").text("密码不能为空！").css({
                                        "display": "block",
                                        "color": "#ff5a5a"
                                    });
                                }
                            }
                            if (this.id.toLowerCase() === "repsw") {
                                if (val === "") {
                                    $(this).parent().find("span").text("密码不能为空！").css({
                                        "display": "block",
                                        "color": "#ff5a5a"
                                    });
                                }
                            }
                        },
                        keyup: function (e) {
                            //处理e兼容IE
                            e = e || window.event;
                            if (this.id.toLowerCase() === "phone") {
                                if (e.keyCode === 13) {
                                    $(this).blur();
                                    $("#code").focus();
                                }
                            }
                            if (this.id.toLowerCase() === "code") {
                                if (e.keyCode === 13) {
                                    $(this).blur();
                                    $("#psw").focus();
                                }
                            }
                            if (this.id.toLowerCase() === "psw") {
                                if (e.keyCode === 13) {
                                    $(this).blur();
                                    $("#rePsw").focus();
                                }
                            }
                            if (this.id.toLowerCase() === "rePsw") {
                                if (e.keyCode === 13) {
                                    $(this).blur();
                                    // 所有输入符合条件后    提交
                                }


                            }
                        }
                    }
            );

        });
        $("#reset").click(function(){//重置

        })

    });
</script>
</html>