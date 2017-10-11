<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>精英计划-欢迎登录</title>
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
                <h2>用户登录</h2>
                <div class="login">
                    <form action="" method="post" autocomplete="off">
                        <div class="form_item user_name">
                            <label for="login_name" class="form_label label_name"></label>
                            <span class="warn name_msg">请输入用户名</span>
                            <input autocomplete="off" type="text" id="login_name" class="form_input" name="name"/>
                        </div>
                        <div class="form_item user_phone">
                            <label for="login_psw" class="form_label label_psw"></label>
                            <span class="warn psw_msg">请输入密码</span>
                            <input autocomplete="off" type="password" id="login_psw" class="form_input" name="psw"/>
                        </div>
                        <div class="for3">
                            <input type="checkbox" name="rePsw" id="rem_psw" checked/>
                            <label for="rem_psw" ><span>记住登录状态</span></label>
                            <span class="forget fr"><a href="">忘记密码？</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="register.html">立即注册</a></span>
                        </div>
                        <a id="btn_login" class="btn_login" href="javascript:;"><span>登录</span></a>
                    </form>
                    <p class="other_way_login">
                    	其他登录方式 <a href="javascript:;" id="wx_login"></a>
                    </p>
                    <div class="wx_qrcode">
                    	<p class="qrcode_title">微信登陆</p>
                    	<div class="qrcode_box"></div>
                    	<p>请使用微信扫描二维码登录</p>
                    	<p>"精英计划"</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<jsp:include page="./include/footer.jsp"></jsp:include>
<script type="text/javascript" src="../js/lib/jquery/1.11.1.js"></script>
<script type="text/javascript" src="../js/lib/jquery/jQuery.md5.js"></script>
<script type="text/javascript" src="../js/login/login.js"></script>

</body>
</html>