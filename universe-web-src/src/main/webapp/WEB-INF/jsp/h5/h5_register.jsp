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
<link rel="stylesheet" href="${cdnPath}/css/h5/h5_register.css"/>
</head>
<body>
		<div class="logoBox">
			<img src="${cdnPath}/i/h5/tflogo.png">
		</div>
		<ul class="register">
			<li class="phoneNum">
				<div class="left">
					<i class="phone_icon"></i>
					<input type="hidden" name="backUrl" id="backUrl" value="${backUrl}"  />
				</div>
				<div class="right">
					<input type="text" name="phone" id="phone" placeholder="请输入手机号码" />
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
					<input type="text" name="checkCode" id="checkCode" disabled="disabled" style="background: #fff;" placeholder="请输入验证码" />
					<span class="codeSpan negative" onclick="getCode();" id="get_code">获取验证码</span>
				</div>
			</li>
			<li class="psw">
				<div class="left">
					<i class="lock_icon"></i>
				</div>
				<div class="right" style="border: none;">
					<input type="password" name="password"  id="password" placeholder="请输入6-12位密码" id="psw" />
				</div>
			</li>
		</ul>
		<div class="checkTips"></div>
		<div class="agreement">
			<label for="agreement" class="">
				<!--<input type="checkbox" checked="checked" name="agreement" id="agreement"/>-->
			</label>
			已阅读精英计划<a href="${basePath}/protocol.html">用户协议</a>
		</div> 
			<a href="javascript:;" class="register_btn uncheck" id="register_btn"  onclick="submit();">注册</a>
	</body>
	<script>
    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?22fe330b8bf5f3b6daef2ad6864536cc";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
    window.xiaoma_codeImage = "${imageCodeUrl}"; 
</script>
<script type="text/javascript">
var basePath = "${basePath}";
</script>
<script src="${cdnPath}/js/h5/h5_register.js"></script>

<!--百度统计代码-->

</html>