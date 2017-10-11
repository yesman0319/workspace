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
		<title>精英计划-${title }</title>
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
					${vo.content}
				</span>
			</div>
			<ul class="content">
				<c:if test="${not empty vo.list }">
					<c:forEach items="${vo.list }" var="list" varStatus="index">
						<li>
						<a href="${basePath}/h5/speaking/comments/${type}/${list.answerId}.html?videoUrl=${list.content}&videoLength=${list.audio_length}&shareTitle=${shareTitle}&nickname=${list.nickname}&avatar=${list.avatar}&shareUrl=${shareUrl}">
								<div class="avatar">
									<img  src="${list.avatar}"/>
								</div>
								</a>
								<div class="desc">
									<div class="left">
										<p class="nickname">${list.nickname }</p>
										<div class="audioDiv"  title="${index.index}">
											<span class="audioTime">${list.audio_length }</span>
											<span class="playImg" id="playImg${index.index}"></span>
											<!--<img src="../img/practice/play_img.png" class="playImg" />-->
											<audio style="display: none" id="autoplay${index.index}" src="${list.content}" ></audio>
										</div>
									</div>
									<a href="${basePath}/h5/speaking/comments/${type}/${list.answerId}.html?videoUrl=${list.content}&videoLength=${list.audio_length}&shareTitle=${shareTitle}&nickname=${list.nickname}&avatar=${list.avatar}&shareUrl=${shareUrl}">
										<div class="rightc">
											<p><i class="comment"></i></p>
											<p class="commentCount">${list.commentCount }</p>
										</div>
									<div class="right">
										<p><i class="zan"></i></p>
										<p>
											<span class="zanCount">${list.praise_amount }</span>赞
										</p>
									</div>
									</a>						
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
	var audioDivs = document.getElementsByClassName("audioDiv");
	var  playImg = document.getElementsByClassName("playImg");
	var audioList = document.getElementsByTagName("audio");
	
	var current_id = -1;
	//当前播放的id
	var play_num = 0;
	
	 for (var i = 0; i < audioDivs.length; i++) {
		/*点击播放*/
		var audioDiv = audioDivs[i];
		audioDiv.onclick = function(e) {
				var that = this;
				var id = this.getAttribute("title");
		 		var audio = document.getElementById("autoplay" + id);
				
				//关闭上一个播放源
				if(current_id != -1){
				 document.getElementById("autoplay" + current_id).pause();
				 $(".playImg").removeClass("playing");
				}
		 		
				if(id != current_id){  	//新播放录音
					play_num = 0;
					current_id = id;
					
					if( play_num++ % 2 == 0){
						//console.log("新播放播放 -id = " + id + ", playNum = " + play_num);
						//关闭所有播放源
						for (var j = 0; j < audioList.length; j++) {
							audioList[j].pause();
						}
						//删除所有的播放样式
			 			for (var k = 0; k < playImg.length; k++) {
			 				$(".playImg").removeClass("playing");
						} 
						
						//增加播放样式
						$("#playImg" + id).addClass("playing");
						audio.play();
						audio.onended = function() {
							$("#playImg" + id).removeClass("playing");
						}
					}else{
						//console.log("新暂停 -id = " + id + ", playNum = " + play_num);
						//删除所有的播放样式
			 			for (var k = 0; k < playImg.length; k++) {
			 				$(".playImg").removeClass("playing");
						} 
			 			audio.pause();
					}
					
				}else{
					if( play_num++ % 2 == 0){
						//console.log("原来的播放播放 -id = " + id + ", playNum = " + play_num);
						$("#playImg" + id).addClass("playing");
						audio.play();
						audio.onended = function() {
							$("#playImg" + id).removeClass("playing");
						}
					}else{
						//console.log("暂停 -id = " + id + ", playNum = " + play_num);
							$("#playImg" + id).removeClass("playing");
							audio.pause();
					}
				}
		} 
	}
	
	
	
	
		var basePath = "${bathPath}";
		var lineLink = window.location.href;//这个是分享的网址
		var imgUrl = "${cdnPath}"+"/i/ic_share.png";//这里是分享的时候的那个图片
		var descContent = "我正在精英计划练习${title}，快来跟我一起练习";
		var share_title =  "${shareTitle}"; 
		
		$(function(){
		
			//语音长度
			$(".audioDiv").each(function(index,item){
				var timeLen = $(this).find(".audioTime").html();
				var audioLen = timeLen*3+"px";
				$(this).css("width",audioLen);
			})	
			
				share(lineLink,imgUrl,descContent,share_title);
		});
		
		
	</script>
</html>
