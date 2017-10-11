<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta charset="UTF-8">
<meta
	content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"
	name="viewport">
<meta content="yes" name="apple-mobile-web-app-capable">
<meta content="black" name="apple-mobile-web-app-status-bar-style">
<meta content="telephone=no" name="format-detection">
<meta content="email=no" name="format-detection">
<title>精英计划-登录</title>
<%@include file="../include/pub.jsp"%>
<link rel="stylesheet" href="${cdnPath}/css/h5/h5_reset.css"/>
<link rel="stylesheet" href="${cdnPath}/css/h5/h5_fast_login.css"/>
<script type="text/javascript">
	var basePath = "${basePath}";	
    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?22fe330b8bf5f3b6daef2ad6864536cc";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
</script>
</head>
<body>
		<div class="logoBox">
			<img src="${cdnPath}/i/h5/tflogo.png">
		</div>
		<ul class="login">
			<li class="phoneNum">
				<div class="left">
					<i class="phone_icon"></i>
					<input type="hidden"  id="backUrl" value="${backUrl }"  />
				</div>
				<div class="right">
					<input type="text" name="phone"  id="phone" class="phoneNum" placeholder="请输入手机号码" />
					
				</div>
			</li>
			<li class="graphicCode">
				<div class="left">
					<i class="graphic_icon"></i>
				</div>
				<div class="right">
					<input type="text" name="graphic"  id="graphic" placeholder="请输入图形验证码" />
					<img src="#" id="graphic_img" onclick="getGraphicCode();" />
				</div>
			</li>
			<li class="checkCode">
				<div class="left">
					<i class="lock_icon"></i>
				</div>
				<div class="right">
					<input type="text" name="checkCode"  id="checkCode" class="checkCode" disabled="disabled" placeholder="请输入验证码"  style="background: #fff;"/>
					<span class="codeSpan negative"  onclick="getCode();" id="get_code">获取验证码</span>
				</div>
			</li>
		</ul>
		<div class="loginTips">
			未注册过的手机将自动创建精英计划账号
		</div>
		<div class="checkTips" ></div>
		<a href="javascript:;" class="login_btn" onclick="submit();">登录</a>
		<a href="${basePath}/h5/show/register.html?backUrl=${backUrl}" class="signIn">注册账号</a>
		<a href="${basePath}/h5/show/login.html?successURL=${backUrl}" class="signIn">已有账号</a>
	</body>
	<script> 
	window.xiaoma_codeImage = "${imageCodeUrl}"; 
	</script>
	<script src="${cdnPath}/js/h5/h5_fast_login.js" type="text/javascript"></script>
	
</html>