<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta
	content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"
	name="viewport">
<meta content="yes" name="apple-mobile-web-app-capable">
<meta content="black" name="apple-mobile-web-app-status-bar-style">
<meta content="telephone=no" name="format-detection">
<meta content="email=no" name="format-detection">
<title>口语练习 ${groupName}</title>
<%@include file="../include/pub.jsp"%>
<link rel="stylesheet" href="${cdnPath}/css/h5/h5_reset.css"
	type="text/css">
<link rel="stylesheet" href=".${cdnPath}/css/h5/font-awesome.min.css"
	type="text/css">
<link rel="stylesheet" href="${cdnPath}/css/h5/h5_spoken.css"
	type="text/css">
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
		<!--     <header>
       <div class="head">
      <p><img src="/common/images/spoken-arrow.png" alt=""></p>
      <h1>练习报告</h1>
      <p><img src="/common/images/spoken-fenxiang.png" alt=""></p>
      </div>
      </header> -->
		<section>
			<div class="center">
				<a href="<%=com.xiaoma.universe.common.utils.PropertiesUtils.getString("APP_DOWNLOAD_URL")%>">
				<h1 class="download">
						下载精英计划APP，观看更多视频~ <span>下载</span>
					</h1>
				</a>
				<ul>
					<c:if test="${not empty spokens }">
						<c:forEach items="${spokens}" var="item" varStatus="index">
							<li>
								<h1>
									<span>${item.en }</span>
									<c:if test="${not empty item.userAudioUrl}">
										<img src="${cdnPath }/i/h5/spoken-horn.png" alt=""
											class="tupian">
										<img src="${cdnPath }/i/h5/spoken-horn.gif" alt=""
											class="dongpian" style="display: none">
									</c:if>
									<c:if test="${empty item.userAudioUrl}">
										<img src="${cdnPath }/i/h5/icon_weilian.png" alt=""
											style="width: 30px; height: 30px; right: 10px; top: 15px;">
									</c:if>
								</h1> <audio style="display: none" id="autoplay${index.index}"
									src="${item.userAudioUrl}"> Your browser does not
									support HTML5 video.
								</audio>
							</li>
						</c:forEach>
					</c:if>
				</ul>
			</div>
		</section>

		<div class="bg">
			<p>
				我已在精英计划坚持练习<span>${days}天</span>，累计<span>${time}</span>。和我一起加油吧！
			</p>
			<a
				href="<%=com.xiaoma.universe.common.utils.PropertiesUtils.getString("APP_DOWNLOAD_URL")%>"><button>马上去练习</button></a>
		</div>
	</div>
</body>
	<script type="text/javascript"
		src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
	<script type="text/javascript" src="${cdnPath}/js/h5/h5_share.js"></script>
	<script type=text/javascript>
		var picList = document.getElementsByClassName("tupian");
		var picDList = document.getElementsByClassName("dongpian");
		var audioList = document.getElementsByTagName("audio");
		for (var i = 0; i < picList.length; i++) {

			/*点击播放*/
			var cur = picList[i];
			cur.onclick = function(e) {
				var that = this;
				//关闭所有播放源
				for (var j = 0; j < audioList.length; j++) {
					audioList[j].pause();
					for (var k = 0; k < picList.length; k++) {
						picList[k].style.display = "block";
						picDList[k].style.display = "none";
					}
				}
				var nex = that.nextElementSibling;
				var par = that.parentNode;
				var audio = par.nextElementSibling;
				//console.log(nex,par,audio);
				that.style.display = "none";
				nex.style.display = "block";
				audio.play();
				audio.onended = function() {
					that.style.display = "block";
					nex.style.display = "none";
				}
			}
			/*点击暂停*/
			picDList[i].onclick = function() {
				for (var k = 0; k < picList.length; k++) {
					picList[k].style.display = "block";
					picDList[k].style.display = "none";
					audioList[k].pause();
				}

			}

		}
		
		var basePath = "${bathPath}";
		var lineLink = window.location.href;//这个是分享的网址
		var imgUrl = "${cdnPath}"+"/i/ic_share.png";//这里是分享的时候的那个图片
		var descContent = "交作业啦！我在精英计划做了一篇口语练习，欢迎指教！";
		var share_title = "口语练习 " +  "${shareTitle}";
		$(function(){
			share(lineLink,imgUrl,descContent,share_title);
		});	
		
	</script>
<%--<script src="/common/js/jquery.js"></script>--%>
<%--<script>--%>
<%--function musicb(num){--%>
<%--$("#tupian"+num).hide();--%>
<%--$("#tupian"+num).css({"display":"none"});--%>
<%--$("#dongpian"+num).css("display","block");--%>
<%--$("#autoplay"+num)[0].play();--%>
<%--$("#autoplay"+num).on("ended",function(){--%>
<%--$("#tupian"+num).css({"display":"block"});--%>
<%--$("#dongpian"+num).css("display","none");--%>
<%--})--%>
<%--}--%>
<%--</script>--%>
</html>