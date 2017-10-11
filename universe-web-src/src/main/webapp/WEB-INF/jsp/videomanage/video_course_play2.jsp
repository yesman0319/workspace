<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html lang="en" xmlns:gs="http://www.gensee.com/gsml">
<head>
    <meta charset="UTF-8">
    <title>${video.name } - 视频播放</title>
    <%@include file="../include/pub.jsp"%>
	<link rel="stylesheet" href="${cdnPath}/css/common.css"/>
    <link rel="stylesheet" href="${cdnPath}/css/video_course_play.css"/>
    <!--展示互动  -->  
	<script src="${cdnPath}/js/live/course_bootstrap.js"></script>
	<script src="${cdnPath}/js/live/gssdk.js"></script>
	<script src="${cdnPath}/js/live/json2.min.js"></script>
	<script src="${cdnPath}/js/live/tester.js"></script>
</head>
<body>
<jsp:include page="../include/header.jsp"></jsp:include>
<input type="hidden" id="querytype" value="${querytype}"/>
<div class="layout">
	<div class="main">
		<p class="location">
			<a class="user_href" href="${basePath}">精英计划</a> > 
			<a class="list_href" href="${basePath }/courses/list">视频课程</a> > 
			<a class="user_href" href="${basePath }/plans/${planId}">${planname }</a> > 
			<a class="down_href" href="#">
				<c:if test="${video.name!=null}">${video.name}</c:if>
				<c:if test="${video.name==null}">${videosForPlan[0].name}</c:if>
			</a>
     </p>
     		<div class="video_course_left">
 				<div class="video_title">
     				<h3 id="video_title">				
     				<c:if test="${video.name!=null}">${video.name}</c:if>
					<c:if test="${video.name==null}">${videosForPlan[0].name}</c:if>
					</h3>
 				</div>
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
	     			<div class="video_control">
	     				<a href="javascript:;" class="exchange">互换</a>
	     			</div>
     			</c:if>
     		</div>	
     		<div class="video_course_right">
     			<c:if test="${type eq 1}">
	     			<div class="file_area" id="videoTwo">
	     				<gs:video-vod site="${video.host }" ctx="webcast" uname=""
							ownerid="${video.broadcastId }" authcode="${video.password}"/>
	     			</div>
     			</c:if>
     			<div class="video_course_crumb">
 					<b class="video_course_icon"></b>
 					<span class="course_title">${planname }</span>
     			</div>
     			<div class="courses_box">
		     			<ul class="courses">
		     				<c:forEach items="${videosForPlan}" var="lessions">
			     				<li 
			     				<c:if test="${lessions.lessionId eq onPlayLessionId}">class="onplay"</c:if>
			     				<c:if test="${lessions.hasSee==0 &&lessions.canSee==2}">class="weibofang cantry_see"</c:if>
			     				<c:if test="${lessions.hasSee==0 &&lessions.canSee==1}">class="weibofang can_see"</c:if>
			     				<c:if test="${lessions.hasSee==0 &&lessions.canSee==0}">class="weibofang cant_see"</c:if>
			     				<c:if test="${lessions.hasSee==1 &&lessions.canSee==1}">class="yibofang"</c:if>
			     				<c:if test="${lessions.hasSee==1 &&lessions.canSee==0}">class="yibofang expires"</c:if>
			     				<c:if test="${lessions.hasSee==1 &&lessions.canSee==2}">class="yibofang cantry_see"</c:if>
			     				>
		     						
			     				<a href="${basePath }/courses/${planId }/${courseId}/${lessions.lessionId}/${lessions.videoId}?planname=${planname }" class="videowatch"  <c:if test="${lessions.canSee==0 }"> onclick="return false;"</c:if>> 
			     					<i class="course_icon" ></i>
			     					<span class="course_name" title="${lessions.name}">${lessions.name}</span>
			     					<c:if test="${lessions.canSee==2}"> <span class="try_see">可试看</span></c:if>
			     					<span class="duration">${lessions.duration}</span>
			     				</a></li>
		     				</c:forEach>
		     			</ul>
     			</div>
     		</div>
     </div>
</div>
<jsp:include page="../include/footer.jsp"></jsp:include>
<script type="text/javascript" src="${cdnPath }/js/lib/Jcrop/jquery.Jcrop.min.js"></script>
<script charset="utf-8" type="text/javascript" src="${cdnPath }/js/userProfile/userProfile.js"></script>

<script type="text/javascript">
	$(function(){
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
		$(".exchange").click(function(){
			var str=$("#videoOne").html();
			var stt=$("#videoTwo").html();
			$("#videoOne").html(stt);
			$("#videoTwo").html(str);
			$("#eventslog").html("");
		});
	})
	</script>
</body>
</html>