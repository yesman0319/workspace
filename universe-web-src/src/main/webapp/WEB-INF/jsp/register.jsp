<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>个人注册</title>
    <link rel="stylesheet" href="../css/common.css"/>
    <link rel="stylesheet" href="../css/login.css"/>
</head>
<body>
<jsp:include page="./include/header.jsp"></jsp:include>
<div class="main">
    <div class="w">
        <div class="leftSide fl">
            <div class="phone">
                <h2>精英计划移动端下载</h2>
                <img class="bg" src="../i/login_iphone.png" alt="精英计划移动端下载"/>
                <div class="down_img">
                    <div class="ios" style="display:block;"><img src="../i/code_ios.png" alt="ios下载"/></div>
                    <div class="ad"><img src="../i/code_ios.png" alt="android下载"/></div>
                </div>
                <div class="down">
                    <a id="btn_ios" class="btn_ios fl cur" href="javascript:;"><i class="i_ios"></i><span>IOS</span></a>
                    <a id="btn_ad" class="btn_ad fl" href="javascript:;"><i class="i_ad"></i><span>Android</span></a>
                </div>
            </div>
        </div>
        <div class="rightSide fl">
            <div class="login_container">
                <h2>用户注册</h2>
                <div class="login">
                    <form action="" method="post" autocomplete="off">
                        <div class="form_item user_phone">
                            <label for="login_phone" class="form_label label_phone"></label>
                            <span class="warn phone_msg">请输入手机号</span>
                            <input type="text" id="login_phone" class="form_input" name="phone" />
                        </div>
                        <div class="form_item user_code">
                            <label for="login_code" class="form_label label_code"></label>
                            <span class="warn code_msg">请输入验证码</span>
                            <input type="text" id="login_code" class="form_input" name="code"/>
                            <a id="get_code" class="get_code" href="javascript:;"><span class="time"></span><span class="text">获取验证码</span></a>
                        </div>
                        <div class="form_item user_passWord">
                            <label for="register_psw" class="form_label label_psw"></label>
                            <span class="warn passWord_msg">请输入密码</span>
                            <input type="text" id="register_psw" class="form_input" name="passWord"/>
                        </div>
                        <a class="btn_login" href="javascript:;"><span>注册</span></a>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
<jsp:include page="./include/footer.jsp"></jsp:include>
<script type="text/javascript" src="../js/lib/jquery/1.11.1.js"></script>
<script type="text/javascript" src="../js/login/login.js"></script>
</body>
</html>