<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html> 
	<head>
		<meta charset="UTF-8">
		<meta content="yes" name="apple-mobile-web-app-capable">
		<meta content="black" name="apple-mobile-web-app-status-bar-style">
		<meta content="telephone=no" name="format-detection">
		<meta content="email=no" name="format-detection">
		<title>词汇挑战-总排行榜</title>
		<%@include file="../../include/pub.jsp"%>
		<link rel="stylesheet" href="${cndPath}/css/reset.css" />
		<link rel="stylesheet" href="${cndPath}/css/h5/vocabulary_share.css" />
	</head>
    <body>
     	<%-- <div class="download_tips" style="background: rgba(0,0,0,1);position: fixed;">
			<span>下载精英计划APP, 查看更多学习计划</span>			
			<a href="<%=com.xiaoma.universe.common.utils.PropertiesUtils.getString("APP_DOWNLOAD_URL")%>" class="download_btn">下载</a>
		</div> --%> 
		<div id="all-result-page">
			<div id="all-result-banner">
				<img src="${cndPath}/img/vol-challenge/all-result-icon.png" />总排行榜
			</div>
			<article id="my-all-rank">
				<img class="left-avtar" src="${headImgUrl }" />
				<div class="right-detail">
					<p id="my-grade">我的排名
						<span>
							<c:if test="${rankvo.rank == 0 }">
								无
							</c:if>
							<c:if test="${rankvo.rank !=0 }">
								${rankvo.rank }
							</c:if>
						</span>
					</p>
					<c:if test="${rankvo.rank != 0 }">
						<p class="finish-count">
							<i class="rank-icon" id="finish-icon"></i>完成<span>${rankvo.rightCount}</span>个单词
						</p>
						<p class="doing-detail">
							<i class="rank-icon" id="rate-icon"></i>正确率<span>${rankvo.rate}</span>%&nbsp;&nbsp;&nbsp;
							<i class="rank-icon" id="speed-icon"></i>速度<span>${rankvo.avgSpeed}</span>秒/题
						</p>
					</c:if>
				</div>
			</article>
			

			<c:if test="${fn:length(rankvo.list)>=1}">
				<section class="top-three" id="first-one"><!--第一名-->
					<div class="left-avtar">
						<img src="${rankvo.list[0].weixinHeadimgurl}" />
						<i class="crown"></i>
					</div>
					<div class="middle-detail">
						<p class="user-name">${rankvo.list[0].weixinNickname}</p>
						<p class="finish-count">
							完成<span>${rankvo.list[0].rightCount}</span>个单词
						</p>
						<p class="doing-detail">
							正确率<span>${rankvo.list[0].rate}</span>%&nbsp;&nbsp;&nbsp;
							速度<span>${rankvo.list[0].avgSpeed}</span>秒/题
						</p>
					</div>
					<div class="right-icon">
						<img src="${cndPath}/img/vol-challenge/the_first.png" />
					</div>
				</section>
			</c:if>
			
			<c:if test="${fn:length(rankvo.list)>=2}">
				<section class="top-three" id="second-one"><!--第二名-->
					<div class="left-avtar">
						<img src="${rankvo.list[1].weixinHeadimgurl}" />
						<i class="crown"></i>
					</div>
					<div class="middle-detail">
						<p class="user-name">${rankvo.list[1].weixinNickname}</p>
						<p class="finish-count">
							完成<span>${rankvo.list[1].rightCount}</span>个单词
						</p>
						<p class="doing-detail">
							正确率<span>${rankvo.list[1].rate}</span>%&nbsp;&nbsp;&nbsp;
							速度<span>${rankvo.list[1].avgSpeed}</span>秒/题
						</p>
					</div>
					<div class="right-icon">
						<img src="${cndPath}/img/vol-challenge/the_second.png" />
					</div>
				</section>
			</c:if>
			
			
			<c:if test="${fn:length(rankvo.list)==3}">
				<section class="top-three" id="third-one"><!--第三名-->
					<div class="left-avtar">
						<img src="${rankvo.list[2].weixinHeadimgurl}" />
						<i class="crown"></i>
					</div>
					<div class="middle-detail">
						<p class="user-name">${rankvo.list[2].weixinNickname}</p>
						<p class="finish-count">
							完成<span>${rankvo.list[2].rightCount}</span>个单词
						</p>
						<p class="doing-detail">
							正确率<span>${rankvo.list[2].rate}</span>%&nbsp;&nbsp;&nbsp;
							速度<span>${rankvo.list[2].avgSpeed}</span>秒/题
						</p>
					</div>
					<div class="right-icon">
						<img src="${cndPath}/img/vol-challenge/the_third.png" />
					</div>
				</section>
			</c:if>
			
			<c:if test="${fn:length(rankvo.listOther)>0}">
				<ul class="normal-result"><!--普通排名-->
					<c:forEach items="${rankvo.listOther}" var="other" varStatus="status">
						<li>
							<img  class="left-avtar" src="${other.weixinHeadimgurl }" />
							<div class="middle-detail">
								<p class="user-name">${other.weixinNickname }</p>
								<p class="doing-detail">
									完成<span>${other.rightCount }</span>个单词&nbsp;
									正确率<span>${other.rate }</span>%&nbsp;
									速度<span>${other.avgSpeed }</span>秒/题
								</p>
							</div>
							<div class="right-num">
								${status.count+3}
							</div>
						</li>
					</c:forEach>
				</ul>		
			</c:if>				
		</div>
 	</body>
	<script src="${cdnPath}/js/h5/lib/flexible.js"></script>
	<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
	<script type="text/javascript" src="${cdnPath}/js/h5/h5_share.js"></script>
	<script>
		var basePath = window.xiaoma.basePath;
		var imgUrl = "${cdnPath}"+"/i/ic_share.png";//这里是分享的时候的那个图片
		var descContent ="你的好友正在等你哟"; 
		var share_title = "精英计划${rankvo.weixinNickname}向你发起了英语词汇挑战，立即去应战";
		var shareId = "${rankvo.shareId}";
		var share_url=basePath+"/h5/wordschallenge/share/"+shareId+"?hasDone=0";		
		
		var lineLink = window.location.href;//这个是分享的网址
		var share_url="${basePathNoPort}"+"/h5/wordschallenge/share/"+shareId+"?hasDone=0";		
		console.log(lineLink);
		console.log(share_url);
		$(function(){
			
			share(share_url,imgUrl,descContent,share_title);
		})
		
	</script>
</html>