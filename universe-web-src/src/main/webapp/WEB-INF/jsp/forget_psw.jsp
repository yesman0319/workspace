<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>忘记密码</title>
    <style type="text/css">
        *{  margin: 0;
            padding: 0;
            font-size: 12px;
            font-family: 微软雅黑;}
    </style>
    <link rel="stylesheet" href="../css/forget_psw.css"/>
</head>
<body>
<div class="forget">
    <div><hr/><p class="title">&nbsp;&nbsp;忘记密码&nbsp;&nbsp;</p> <hr/></div>
    <div class="layout">
        <p class="warn">没有找到使用该邮箱注册的用户</p>
        <div class="user">
            <span class="err_msg">错误信息</span>
            <input type="text" class="email"/>
        </div>
        <a href="javascript:;" class="sendCode">发送短信验证码</a>
    </div>
</div>
</body>
<script type="text/javascript" src="../js/lib/jquery/1.11.1.js"></script>
<script type="text/javascript">
    $(function(){
        $(".email").focus(function(){
            $(".err_msg").css("display","none");
            $(this).css("border-color","#3aa2e4");
        });
        $(".sendCode").click(function(){//点击发送短信验证码
            var userName=$.trim($(".email").val()).replace(/ +/g, "");
            var regPhone = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/;
            if(userName===""){
                $(".email").val("").css("border-color","#ff5a5a");
                $(".err_msg").text("手机号不能为空！").css({
                    "display":"block",
                    "color":"#ff5a5f"
                });
            }else if(!regPhone.test(userName)){
                $(".email").val("").css("border-color","#ff5a5a");
                $(".err_msg").text("手机号格式不正确！").css({
                    "display":"block",
                    "color":"#ff5a5f"
                });
            }else{//手机号格式正确 发送 验证码
                $(".email").css("border-color","#39c075");
            }
        });
    });

</script>
</html>