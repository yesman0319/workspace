<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
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
<link rel="stylesheet" href="${cdnPath}/css/h5/font-awesome.min.css"/>
<link rel="stylesheet" href="${cdnPath}/css/h5/h5_reset.css"/>
<link rel="stylesheet" href="${cdnPath}/css/h5/h5_login.css"/>
<link rel="stylesheet" href="${cdnPath}/css/live_course.css"/>
<script src="${cdnPath}/js/lib/math.uuid.js"></script>
</head>
<body>
<div class="wrap">
<section>
	<div class="center">
		<div class="logos">
			<div>
				<img src="${cdnPath}/i/h5/tflogo.png">
				<h1>精英计划</h1>
			</div>
		</div>

		<div class="matter">
			<label>
				<img src="${cdnPath}/i/h5/login-user.png">
				<input type="text" id="loginName" name="loginName">
			</label>
			<label>
				<img src="${cdnPath}/i/h5/login-pwd.png">
				<img src="${cdnPath}/i/h5/login-pwds.png">
				<input type="password" id="password" name="password">
				<input type="hidden" id="successURL" name="successURL" value="${successURL}"/>	
			</label>
		</div>

		<div class="eroll">
			<p id="err">${error }</p>
		</div>
		<!-- <div class="pwd">
			<p><input type="checkbox"> <span>记住我的登录状态</span></p><a href="#">忘记密码</a>
		</div> -->
		<div class="btns">
			<button id="login_btn" class="btn" onclick="submit();">登录</button>
			<p class="ps">还没有精英计划账号？<a style="color: green;text-decoration:underline;" href="${basePath}/h5/show/register.html?backUrl=${successURL}" class="signIn">注册账号</a></p>
			<button class="btn"  onclick="location.href='<%=com.xiaoma.universe.common.utils.PropertiesUtils.getString("APP_DOWNLOAD_URL")%>';">下载APP</button>
		</div>
	</div>
</section>
</div>
</body>
<script type="text/javascript">
var basePath = "${basePath}";

$("input").focus(function(){
	$("#err").hide();
	});


	function submit(){
		//alert(121);
		var ln = $("#loginName").val();
		var pd = $("#password").val();	
		if(ln == '') {
			$("#err").html("请输入账号");
			return;
		}
		if(pd == '') {
			$("#err").html("请输入密码");
			return;
		}
		
		var successURL = $("#successURL").val();
		 $('#login_btn').removeAttr('onclick');
		  $.post(basePath+"/h5/login.html",{"loginName":ln,"password":pd,"successURL":successURL},
				  function(data){
				   if(data.success){
					   //调用注册或者登录事件
					   analytics.Ana("login",data.user.id, data.user.username,successURL);
					   //window.location.href=successURL;					  
				   }else{
					   $("#err").html(data.error);
						$("#err").show();
				   }
				  },
				  "json");//这里返回的类型有：json,html,xml,text
		  		//恢复点击事件
		  		$('#login_btn').attr('onclick', 'submit();');
		
	}
</script>
<!--百度统计代码-->
<script>
    var _hmt = _hmt || [];
    (function() {
        var hm = document.createElement("script");
        hm.src = "//hm.baidu.com/hm.js?22fe330b8bf5f3b6daef2ad6864536cc";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
    })();
</script>
</html>