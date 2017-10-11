<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
<meta content="yes" name="apple-mobile-web-app-capable">
<meta content="black" name="apple-mobile-web-app-status-bar-style">
<meta content="telephone=no" name="format-detection">
<meta content="email=no" name="format-detection">
<title>句子翻译练习报告分享</title>
<%@include file="../include/pub.jsp"%>
<link rel="stylesheet" href="${cdnPath}/css/h5/h5_reset.css" type="text/css">
<link rel="stylesheet" href=".${cdnPath}/css/h5/font-awesome.min.css" type="text/css">
<link rel="stylesheet" href="${cdnPath}/css/h5/h5_translate.css" type="text/css">
<script>
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
 <div class="wrap">
<!-- 		<header>
			<div class="head">
				<p><img src="/common/images/spoken-arrow.png" alt=""></p>
				<h1>练习报告</h1>
			</div>
		</header> -->
<section> 
	<div class="center">
		<h1 class="download">下载精英计划APP，观看更多视频~ <span><a href="<%=com.xiaoma.universe.common.utils.PropertiesUtils.getString("APP_DOWNLOAD_URL")%>">下载</a></span></h1>
		<ul>
			<c:if test="${not empty translates }">
			<c:forEach items="${translates }" var="item" varStatus="ind">
			<li>
				<h1>${ind.index+1 }、${item.chinese }</h1>
				<p style="padding-bottom: 20px">
					<img src="${cdnPath }/i/h5/translate-icon1.png">
					<span>${item.userAnswer }</span>
				</p>
				<p>
					<img src="${cdnPath }/i/h5/translate-icon2.png">
					<span>${item.english }</span>
				</p>
			</li>
			</c:forEach>
			</c:if>
		</ul>
	</div>

	<div class="bg">
		<p>我已在精英计划坚持练习<span>${days}天</span>，累计<span>${time}</span>。 <br />和我一起加油吧！</p>
		<button onclick="location.href='<%=com.xiaoma.universe.common.utils.PropertiesUtils.getString("APP_DOWNLOAD_URL")%>';">马上去练习</button>
	</div>
</section>
</div>
</body>
<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script type="text/javascript" src="${cdnPath}/js/h5/h5_share.js"></script>
<script type="text/javascript">
	
	var basePath = "${bathPath}";
	var lineLink = window.location.href;//这个是分享的网址
	var imgUrl = "${cdnPath}"+"/i/ic_share.png";//这里是分享的时候的那个图片
	var descContent = "我来交句子翻译作业啦，请多指教！";
	var share_title = "精英计划句子翻译"; 
	$(function(){
		share(lineLink,imgUrl,descContent,share_title);
	});
	
</script>
</html>