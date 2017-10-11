<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
		<meta content="yes" name="apple-mobile-web-app-capable">
		<meta content="black" name="apple-mobile-web-app-status-bar-style">
		<meta content="telephone=no" name="format-detection">
		<meta content="email=no" name="format-detection">
		<title>精英计划-写作详情</title>
		<%@include file="../include/pub.jsp"%>
		<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
		<link rel="stylesheet" href="${cdnPath }/css/reset.css" />
		<link rel="stylesheet" href="${cdnPath }/css/practice.css" />
	</head>
	<body>
		<div class="questions">
			<h2>Questions</h2>
			<span id="question" >				
				${vo.question }
			</span>
		</div>
		<div class="d_detail">
			<div class="d_info">
				<div class="d_user">
					<img class="d_avatar"  src="${vo.avatar }"/>
					<span class="d_nickname">${vo.nickname}</span>
				</div>
				<div class="d_total">
					<span class="d_count">${wordCount}</span>词
				</div>
			</div>
			
			
			<p class="d_content">
				${vo.content }
			</p>
		</div>
	</body>	
	<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
	<script type="text/javascript" src="${cdnPath}/js/h5/h5_share.js"></script>
	<script type="text/javascript">
		var basePath = "${bathPath}";
		var lineLink = "${shareUrl}";//这个是分享的网址
		var imgUrl = "${cdnPath}"+"/i/ic_share.png";//这里是分享的时候的那个图片
		var descContent = "我正在精英计划练习${title}，快来跟我一起练习";
		var share_title = "${shareTitle}"; 
		
		$(function(){
			share(lineLink,imgUrl,descContent,share_title);
		});
	</script>
</html>
