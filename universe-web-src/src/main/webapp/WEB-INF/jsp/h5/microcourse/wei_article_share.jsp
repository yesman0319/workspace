<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
    <title>${articleVO.title }</title>
    <link rel="stylesheet" href="${cndPath}/css/reset.css" />
    <link rel="stylesheet" href="${cndPath}/css/wei-course-share.css" />
</head>
<body>
<div id="weixCon" class="wrap">
	<div class="sh-top">
	    <img class="ava" src="${userinfo.avatar }" alt=""/>
	    <p class="payer"><span>${userinfo.nickname }</span>花钱请你读</p>
	</div>
	<div class="sh-main">
	    <img class="share-bg" src="${cndPath}/img/wei-course/share-bg.png" alt=""/>
	    <p class="title">微课专栏名称:${articleVO.title }</p>
	    <time>${articleVO.updateTimeStr }</time>
	    <a class="try-btn" href="${basePath}/h5/microcourse/article/usershare/${user}/${article}/read"></a>
	</div>
	<p class="tip">限量10个名额，速速领取</p> 
</div>
<div id="notweixCon" class="mark">
    <img src="${cndPath}/img/wei-course/share-point.png" alt=""/>
    <p>请在微信客户端打开链接</p>
</div>

<script type="text/javascript" src="${cndPath}/js/lib/jquery-1.11.1.js"></script>
<script type="text/javascript">
 
$(function(){ 
	var ua = navigator.userAgent.toLowerCase();
	var notweixCon = $("#notweixCon");
	var weixCon = $("#weixCon");
	
	if(ua.match(/MicroMessenger/i)=="micromessenger") {
		notweixCon.hide();
		weixCon.show();
	} else {
		notweixCon.show();
		weixCon.hide();
	}
})


</script>
</body>
</html>