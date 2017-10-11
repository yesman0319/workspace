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
		<title>精英计划-${title}</title>
		<%@include file="../include/pub.jsp"%>
		<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
		<link rel="stylesheet" href="${cdnPath }/css/reset.css" />
		<link rel="stylesheet" href="${cdnPath }/css/practice.css" />
	</head>
	<body>
		<div class="download_tips">
			<span>下载精英计划APP, 查看更多学习计划</span>			
			<a href="<%=com.xiaoma.universe.common.utils.PropertiesUtils.getString("APP_DOWNLOAD_URL")%>" class="download_btn">下载</a>
		</div>
		<div class="questions">
			<h2>Questions</h2>
			<span id="question" >				
				${vo.content }
			</span>
		</div>
		<ul class="content">
			<c:if test="${not empty vo.list }">
				<c:forEach items="${vo.list }" var="list">
					<li>
						<div class="avatar">
							<img  src="${list.avatar }"/>
						</div>
						<div class="desc">
							<div class="left">
								<p class="nickname">${list.nickname }</p>
								<div class="writeDiv">
									<a href="${basePath}/h5/writingdetail.html?question=${vo.content}&questionId=${vo.question_id}&answerId=${list.answerId}&type=${type}&shareTitle=${shareTitle}&shareId=${list.share_id}&shareUrl=${shareUrl}"  title="userId">
									<c:if test="${fn:length(list.content) > 110}">
										${fn:substring(list.content, 0, 110)}......
									 </c:if>
									<c:if test="${fn:length(list.content) <= 110}">
										${list.content}
									 </c:if>
									</a>
								</div>
							</div>
							<a href="${basePath}/h5/writingdetail.html?question=${vo.content}&questionId=${vo.question_id}&answerId=${list.answerId}&type=${type}&shareTitle=${shareTitle}&shareId=${list.share_id}&shareUrl=${shareUrl}"  title="userId">
							<div class="rightc">
								<p><i class="comment"></i></p>
								<p class="commentCount">${list.commentCount }</p>						
							</div>
							</a>
							<div class="right">
								<p><i class="zan"></i></p>
								<p>
									<span class="zanCount">${list.praise_amount }</span>赞
								</p>
							</div>
						</div>
					</li>
				</c:forEach>
			</c:if>
		</ul>
		
		<!--进入练习 按钮-->
		<a href="<%=com.xiaoma.universe.common.utils.PropertiesUtils.getString("APP_DOWNLOAD_URL")%>" class="goPractice">进入练习</a>
	</body>	
	<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
	<script type="text/javascript" src="${cdnPath}/js/h5/h5_share.js"></script>
	<script type="text/javascript">
		var basePath = "${bathPath}";
		var lineLink = window.location.href;//这个是分享的网址
		var imgUrl = "${cdnPath}"+"/i/ic_share.png";//这里是分享的时候的那个图片
		var descContent = "我正在精英计划练习${title}，快来跟我一起练习";
		var share_title = "${shareTitle}"; 
		
		$(function(){
			share(lineLink,imgUrl,descContent,share_title);
		});
		
		
		function openDetail(answerId, type, shareTitle, nickname, avatar, content, question, shareUrl){
			window.location.href = "${basePath}/h5/writingdetail.html?answerId="+answerId +"&type="+ type + "&shareTitle="+shareTitle +"&nickname=" + nickname +"&avatar=" + avatar +"&content="+ content + "&question="+content + "&shareUrl="+shareUrl;
		}
		
	</script>
</html>
