<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html lang="en" xmlns:gs="http://www.gensee.com/gsml">
<head>
    <meta charset="UTF-8">
    <title>${broadcast.name} - 精英计划</title>
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
<!-- start 导航 -->
<%@include file="../include/header.jsp"%>
<!-- end 导航 -->
<div class="layout">
	<div class="main">
	<!--面包屑-->
		<p class="location">
			<a class="user_href" href="${basePath }">精英计划</a> > 
			<a class="user_href" href="${basePath }/replays">回放课</a> >
			<a class="down_href"  href="${basePath}/replays/${broadcast.id}.html">${broadcast.name}</a>
     	</p>
     		<div class="video_course_left">
     			<div class="video_title">
     				<h3 id="video_title">${broadcast.planName} - <span id="course_part">${broadcast.name}</span> </h3>
     				<i class="share_icon" id="share_btn"></i>
     			</div>
     			<div class="video_box" id="videoOne">
     				 <gs:doc site="${broadcast.host }" ctx="webcast" uname=""
							ownerid="${broadcast.broadcastId }" authcode="${broadcast.password}"
							compress="false" fullscreen="true" />
     			</div>
     			<div class="video_control">
     				<a href="javascript:;" class="exchange">互换</a>
     			</div>
     		</div>
     		<!--http://xiaoma.gensee.com/webcast/site/vod/play-bf276d50313442b0aa5daba5d11f5aae?token=918507  -->
     		<div class="video_course_right">
     			<div id="videoTwo" style="width: 500px;">
 				<gs:video-vod site="${broadcast.host }" ctx="webcast" uname=""
							ownerid="${broadcast.broadcastId }" authcode="${broadcast.password}"  bar="true"/>
     		</div>
     			<div class="playback_video_course_crumb">
 					<b class="video_course_icon"></b>
 					<span class="pre_course">回放课</span>
 					( <span class="playback_time">${dateTime }</span> )
     			</div>
     			<ul class="playback_courses">
     				<c:if test="${empty lists }">
					 		<li>
						 			<a href="javaxcript:;">
		     						<p class="playback_course_r onplay" >
			     						<span class="playback_course_part">暂无回放课程</span>
		     						</p>
		     					</a>
	     					</li>
				 	</c:if>
				 	 <c:if test="${ not empty lists}">
					 	 <c:forEach items="${lists }" var="list" >
						 	 	<li>
			     					<a href="${basePath}/replays/${list.id}.html">
			     						<p class="playback_course_r  <c:if test="${broadcast.id eq list.id}"> onplay</c:if>">
			     							<!-- <span class="playback_course_name">TPO 29</span> -->
				     						<span class="playback_course_part">${list.name}</span>
			     						</p>
				     					<p class="playback_video_info">
				     						<i class="duration_icon"></i><span class="playback_duration"><fmt:formatDate value="${list.startTime}" pattern="HH:mm"/>-<fmt:formatDate value="${list.endTime}" pattern="HH:mm"/></span> 
				     						<i class="teacher_icon"></i><span class="course_teacher">${list.teacherName }</span>
				     					</p>
			     					</a>
	     					</li>
					 	 </c:forEach>
				 	</c:if>
     			</ul>
     		</div>
     </div>
</div>
		<div class="share_qrcode_modal">
			<div class="share_dialog">
				<h2>
 					分享到微信
 					<span class="close_btn"></span>
				</h2>
				<%-- <img src="${cdnPath}/i/live/share_qrcode.png" class="share_qrcode" /> --%>
				<img src="${basePath}/h5/qrcode.html?code_url= ${basePath}/h5/replay/${broadcast.id}.html?source=weixin%26medium=weixinfriend%26campaign=${detailCampaign}%26campaignContent=uid${user.id}" alt="" class="share_qrcode" >
				<ul class="share_tips" >
					<li>1. 打开微信，"扫一扫"二维码</li>
					<li>2. 点击弹出页面右上角的分享按钮</li>
				</ul>
			</div>
 		</div>
<!-- start footer  -->
<%@include file="../include/footer.jsp"%>
<!-- start footer  -->
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
		
		//点击扫描弹出二维码
		$("#share_btn").click(function(){
			$(".share_qrcode_modal").show();
		})
		//点击关闭按钮清除蒙版
		$(".close_btn").click(function(){
			$(this).parent().parent().parent().hide();
		})
		
		
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