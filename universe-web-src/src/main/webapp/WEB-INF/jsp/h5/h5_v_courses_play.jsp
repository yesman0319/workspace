<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html lang="en" xmlns:gs="http://www.gensee.com/gsml">
<head>
<meta charset="UTF-8">
<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
<meta content="yes" name="apple-mobile-web-app-capable">
<meta content="black" name="apple-mobile-web-app-status-bar-style">
<meta content="telephone=no" name="format-detection">
<meta content="email=no" name="format-detection">
<title>${videoparts.name}</title>
<%@include file="../include/pub.jsp"%>
    <!--展示互动  -->  
	<script src="${cdnPath}/js/live/course_bootstrap.js"></script>
			<title>音译互辩 Unit2-4</title>
	<script src="${cdnPath}/js/live/gssdk.js"></script>
	<script src="${cdnPath}/js/live/json2.min.js"></script>
	<script src="${cdnPath}/js/live/tester.js"></script>
	<link rel="stylesheet" href="${cdnPath }/css/reset.css" />
	<link rel="stylesheet" href="${cdnPath }/css/plan_detail.css" />
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?22fe330b8bf5f3b6daef2ad6864536cc";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>
	<body>
		<div class="v_box">
     			<div class="video_box"  id="videoOne">
						<c:if test="${not empty video.playUrl && type eq 2}">
     						<script id="playUrl" src='${fn:substringBefore(video.playUrl,"&width=")}&width=875&height=700&playerid=${fn:substringAfter(video.playUrl,"&playerid=")}' type="text/javascript"></script>
						</c:if>
						<c:if test="${type eq 1}">
							 <gs:doc site="${video.host }" ctx="webcast" uname=""
								ownerid="${video.broadcastId }" authcode="${video.password}"
								compress="false" fullscreen="true" />
						</c:if>
     			</div>
     			<c:if test="${type eq 1}">
	     			<div id="video_control">
	     				<div id="exchange_box">
	     				<gs:video-vod site="${video.host }" ctx="webcast" uname=""
							ownerid="${video.broadcastId }" authcode="${video.password}"/>
	     				</div>
	     				<a href="javascript:;" id="exchange">互换</a>
	     			</div>
     			</c:if>
		</div>
		<div class="videos tContent">
			<ul class="mod section">
				<c:forEach items="${videoparts.listVideoSections }" var="sections">
					<li class="section_title">
						${sections.name }
					</li>
					<c:forEach items="${sections.lessionsDetailForApp }" var="lessions">
							<li <c:if  test="${lessions.canSee==0 }">class="can_see"</c:if>
							    <c:if  test="${lessions.canSee==2 }">class="cant_see"</c:if>
							    <c:if  test="${lessions.canSee==1 }">class="try_see"</c:if>
							>		
								<div class="iconBox"><i class="<c:if  test='${lessions.hasSee==0 }'>done_icon</c:if>  <c:if  test='${lessions.hasSee==1 }'>havent_icon</c:if>	<c:if test='${lessions.id==onPlayLessionId }'>on_icon</c:if>"
													>
													</i></div>
								<div class="v_right"><a title="${lessions.canSee }" class="watchVideo" href="/courses/h5/watch/${videoparts.id}/${lessions.id}/${lessions.videoId}.html">
									<span class="section_name">${lessions.name }</span>
									<c:if  test="${lessions.canSee==1 }"><span class="video_status">可试看</span></c:if>
									<span class="video_duration">${lessions.duration }</span></a>
								</div>					
							</li>
					
					</c:forEach>
				</c:forEach>
			</ul>
		</div>
		<!--模态提示框-->
<%-- 		<div class="modal" style="display: ;">
			<div class="dialog">
				<p class="tips_words">已加入该计划</p>
				<p class="tips_detail">
					练习已成功加入<span class="userId">183****1098</span>账户，请登录APP端进行练习	
				</p>
				<ul>
					<li class="wait"><a href="javascript:;">稍后再说</a></li>
					<li class="download"><a href="<%=com.xiaoma.universe.common.utils.PropertiesUtils.getString("APP_DOWNLOAD_URL")%>">立即下载</a></li>
				</ul>
			</div>
		</div> --%>
	</body>
		<script type="text/javascript">
	
		var basePath = "${bathPath}";
		var lineLink = window.location.href;//这个是分享的网址
		var imgUrl = "${cdnPath}"+"/i/ic_share.png";//这里是分享的时候的那个图片
		var descContent = "我来交句子翻译作业啦，请多指教！";
		var share_title = "精英计划句子翻译"; 
		$(function(){
			$(".watchVideo").on("click",function(){
				var canSee = $(this).attr("title");
				if(canSee!=null&&canSee=='2')
				{
					return false;
				}
			});
			//动态设置video_box的高度
			window.onload = function(){
				var innerHeight = parseInt($(".live_player").css("height"));
				var videoHeight = innerHeight - 131;
				$(".video_box").css("height",videoHeight+"px");
			}
			window.onresize = function(){
				var innerHeight = parseInt($(".live_player").css("height"));
				var videoHeight = innerHeight - 131;
				$(".video_box").css("height",videoHeight+"px");
			}
			
			//窗口互换
			$("#exchange").click(function(){
				var str=$("#videoOne").html();
				var stt=$("#exchange_box").html();
				$("#videoOne").html(stt);
				$("#exchange_box").html(str);
				$("#eventslog").html("");
			});
		});
	
</script>
</html>
