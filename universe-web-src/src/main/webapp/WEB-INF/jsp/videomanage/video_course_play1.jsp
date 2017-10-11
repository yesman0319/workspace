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
			<a class="user_href" href="${basePath }/courses/${partsDetailForWeb.courseId}">${partsDetailForWeb.courseName}</a> > 
			<a class="down_href" href="#">${video.name}</a>
     </p>
     		<div class="video_course_left">
 				<div class="video_title">
     				<h3 id="video_title">${video.name }</h3>
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
	     			<div style="width: 500px;height: 150px"  id="videoTwo">
	     				<gs:video-vod site="${video.host }" ctx="webcast" uname=""
							ownerid="${video.broadcastId }" authcode="${video.password}"/>
	     			</div>
     			</c:if>
     			<div class="video_course_crumb">
 					<b class="video_course_icon"></b>
 					<span class="course_title">${partsDetailForWeb.courseName}</span>
 					<p class="wrap">
 						<span>${partsDetailForWeb.groupName}</span>
 						<span> > </span>
 						<span class="video_course_location">${partsDetailForWeb.name}</span>
 					</p>
     			</div>
     			<div class="courses_box">
	     			<c:forEach items="${listVideoSections}" var="sections">
		     			<ul class="courses">
		     				<li class="chapter">${sections.name}</li>
		     				<c:forEach items="${sections.listLessionsDetailForWeb }" var="lessions">
			     				<li 
			     				<c:if test="${lessions.id eq onPlayLessionId}">class="onplay"</c:if>
			     				<c:if test="${lessions.hasSee=='未看过'&&lessions.canSee=='可以试看'}">class="weibofang cantry_see"</c:if>
			     				<c:if test="${lessions.hasSee=='未看过'&&lessions.canSee=='有权观看'}">class="weibofang can_see"</c:if>
			     				<c:if test="${lessions.hasSee=='未看过'&&lessions.canSee=='无权观看'}">class="weibofang cant_see"</c:if>
			     				<c:if test="${lessions.hasSee=='已看过'&&lessions.canSee=='有权观看'}">class="yibofang"</c:if>
			     				<c:if test="${lessions.hasSee=='已看过'&&lessions.canSee=='无权观看'}">class="yibofang expires"</c:if>
			     				<c:if test="${lessions.hasSee=='已看过'&&lessions.canSee=='可以试看'}">class="yibofang cantry_see"</c:if>
			     				>
			     				<input type="hidden" value="${lessions.videoId}"/>
			     				<input type="hidden" value="${lessions.id}"/>
			     				<input type="hidden" value="${lessions.hasSee}"/>
			     				<input type="hidden" value="${lessions.canSee}"/>
		     						
			     				<a href="javascript:;" class="videowatch"> 
			     					<i class="course_icon" ></i>
			     					<span class="course_name" title="${lessions.name}">${lessions.name}</span>
			     					<c:if test="${lessions.canSee=='可以试看'}"> <span class="try_see">可试看</span></c:if>
			     					<span class="duration">${lessions.duration}</span>
			     				</a></li>
		     				</c:forEach>
		     			</ul>
	     			</c:forEach>
     			</div>
     		</div>
     </div>
</div>
<jsp:include page="../include/footer.jsp"></jsp:include>
<script type="text/javascript" src="${cdnPath }/js/lib/Jcrop/jquery.Jcrop.min.js"></script>
<script charset="utf-8" type="text/javascript" src="${cdnPath }/js/userProfile/userProfile.js"></script>
<script charset="utf-8" type="text/javascript" src="${cdnPath }/js/videomanage/video_course_play.js"></script>

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