<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>视频课程-视频播放</title>
    <link rel="stylesheet" href="${cdnPath}/css/common.css"/>
    <link rel="stylesheet" href="${cdnPath}/css/video_course_play.css"/>
    <!--<link rel="stylesheet" href="../js/lib/jcrop/jquery.Jcrop.min.css"/>-->
    	<%@include file="../include/pub.jsp"%>
</head>
<body>
<jsp:include page="../include/header.jsp"></jsp:include>
<div class="layout">
	<div class="main">
		<p class="location">
		${partsDetailForWeb.lastWatchId}
			<a class="user_href" href="javascript:;">精英计划</a> > 
			<a class="user_href" href="javascript:;">${partsDetailForWeb.courseName}</a> > 
			<a class="down_href" href="javascript:;">${partsDetailForWeb.groupName}</a>
     </p>
     		<div class="video_course_left">
 				<div class="video_title">
     				<h3 id="video_title">综合口语 TPO31 - <span id="course_part">音译互辩 TPO39</span></h3>
     				<i class="share_icon" id="share_btn"></i>
 				</div>
     			<div class="video_box">
     				<video src=""></video>
     			</div>
     			<div class="video_control">
     				<div id="duration_bar">
     					<a href="javascript:;" id="play_loaction"></a>
     					<div id="progress_bar"></div>
     				</div>
     				<i class="play_icon" id="play_btn"></i>
     				<i class="volume_icon" id="volume_btn"></i>
     				<i class="loop_icon" id="loop_btn"></i>
     				<i class="full_icon" id="full_btn"></i>
     			</div>
     		</div>
     		
     		
     		
     		<div class="video_course_right">
     			<div class="video_course_crumb">
 					<b class="video_course_icon"></b>
 					<span class="course_title">${partsDetailForWeb.courseName}</span>
 					<p class="wrap">
 						<span>${partsDetailForWeb.groupName}</span>
 						<span> > </span>
 						<span class="video_course_location">${partsDetailForWeb.name}</span>
 					</p>
     			</div>
     			
     			<c:forEach items="${listVideoSections}" var="sections">
	     			<ul class="courses">
	     				<li class="chapter">${sections.name}</li>
	     				<c:forEach items="${sections.listLessionsDetailForWeb }" var="lessions">
		     				<li class="livideo"
		     				<c:if test="${lessions.hasSee=='未看过'&&lessions.canSee=='可以试看'}">class="weibofang cantry_see"</c:if>
		     				<c:if test="${lessions.hasSee=='未看过'&&lessions.canSee=='有权观看'}">class="weibofang can_see"</c:if>
		     				<c:if test="${lessions.hasSee=='未看过'&&lessions.canSee=='无权观看'}">class="weibofang cant_see"</c:if>
		     				<c:if test="${lessions.hasSee=='已看过'&&lessions.canSee=='有权观看'}">class="yibofang"</c:if>
		     				<c:if test="${lessions.hasSee=='已看过'&&lessions.canSee=='无权观看'}">class="yibofang expires"</c:if>
		     				<c:if test="${lessions.hasSee=='已看过'&&lessions.canSee=='可以试看'}">class="weibofang cantry_see"</c:if>
		     				><a href="javaxcript:;"> 
		     					<i class="course_icon" ></i>
		     					<span class="course_name">${lessions.name}</span>
		     					<c:if test="${lessions.canSee=='可以试看'}"> <span class="try_see">可试看</span></c:if>
		     					<span class="duration">${lessions.duration}</span>
		     				</a></li>
	     				</c:forEach>
	     			</ul>
     			</c:forEach>
     		</div>
     </div>
</div>
<jsp:include page="../include/footer.jsp"></jsp:include>
<script type="text/javascript" src="${cdnPath}/js/lib/Jcrop/jquery.Jcrop.min.js"></script>
<script charset="utf-8" type="text/javascript" src="${cdnPath}/js/userProfile/userProfile.js"></script>
</body>
</html>