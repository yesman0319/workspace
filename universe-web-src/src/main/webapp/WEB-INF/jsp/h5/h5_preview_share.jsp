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
		<title>${groupName}</title>
		<%@include file="../include/pub.jsp"%>
		<link rel="stylesheet" href="${cndPath}/css/reset.css" />
		<link rel="stylesheet" href="${cndPath}/css/h5/preview_share.css" />
	</head>
    <body>
    	<div class="download_tips">
			<span>下载精英计划APP, 查看更多学习计划</span>
			<a href="<%=com.xiaoma.universe.common.utils.PropertiesUtils.getString("APP_DOWNLOAD_URL")%>" class="download_btn">下载</a>	 
		</div>
		<section>共${length }个单词</section>
		<ul id="preview-list">
			<c:forEach var="item" items="${rows }">
				<li>
					<p id="preview-word">${item.wordEn}</p>
					<p id="preview-paraphrase">${item.wordCh}</p>
					<c:if test="${! empty item.audioUrl}">
						<i class="horn-icon">
							<audio class="pre-audio" src="${item.audioUrl}">您的浏览器不支持audio标签</audio>
						</i>
					</c:if>
				</li>
			</c:forEach>
		</ul>
 	</body>
 	<script src="${cdnPath}/js/h5/lib/flexible.js"></script>
	<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
	<script type="text/javascript" src="${cdnPath}/js/h5/h5_share.js"></script>
	<script>
	var basePath = window.xiaoma.basePath;
	var lineLink = window.location.href;//这个是分享的网址
	var imgUrl = "${cdnPath}/i/ic_share.png";//这里是分享的时候的那个图片
	var descContent ="你的好友正在等你哟"; 
	var share_title = "精英计划${user.nickname}给你分享了词汇预习${groupName}";

		$(function(){
			share(lineLink,imgUrl,descContent,share_title);
			
			var $audioList = $("#preview-list li");//单词列表项
			var audioList = document.getElementsByTagName("audio");//原生js遍历所有音频节点
			var curIndex;
			
			$audioList.on("click",audioPlay);
			
			//单词点击播放
			function audioPlay(){
				var $this = $(this);
				stopAudioplay();
				$this.find(".horn-icon").addClass("playing").find("audio")[0].play();
				$("audio").on("ended",function(){
	    			$(".horn-icon").removeClass("playing");
		    	})
			}
			//停止所有音频播放
			function stopAudioplay(){
				for(var j=0;j<audioList.length;j++){
	                audioList[j].load(); 
	            }
				$(".horn-icon").removeClass("playing");
			}
		})
		
	</script>
</html>