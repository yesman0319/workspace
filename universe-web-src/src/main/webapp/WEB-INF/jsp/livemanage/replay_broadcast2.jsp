<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html lang="en" xmlns:gs="http://www.gensee.com/gsml">
<head>
    <meta charset="UTF-8">
    <title>回放课</title>
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
		<p class="location">
			<a class="user_href" href="javascript:;">精英计划</a> > 
			<a class="user_href" href="javascript:;">xx视频课程</a> > 
			<a class="down_href" href="javascript:;">基础阶段</a>
     	</p>
     		<div class="video_course_left">
     			<div class="video_title">
     				<h3 id="video_title">综合口语 TPO31 - <span id="course_part">音译互辩 TPO39</span></h3>
     				<i class="share_icon" id="share_btn"></i>
     			</div>
     			<div class="video_box">
     				<gs:video-vod site="${broadcast.host }" ctx="webcast" uname=""
							ownerid="${broadcast.broadcastId }" authcode="${broadcast.password}"  bar="true"/>
     			</div>
     			<div class="video_control">
     				<div id="duration_bar">
     					<a href="javascript:;" id="play_loaction"></a>
     					<div id="progress_bar"></div>
     				</div>
     				<i class="play_icon" id="play_btn" ></i>
     				<i class="volume_icon" id="volume_btn"></i>
     				<i class="loop_icon" id="loop_btn"></i>
     				<i class="full_icon" id="full_btn"></i>
     			</div>
     		</div>
     		<div class="video_course_right">
     			<div class="file_area">
     				<b class="file_icon"></b>
     				<p>文件区</p>
     			</div>
     			<div class="playback_video_course_crumb">
 					<b class="video_course_icon"></b>
 					<span class="pre_course">回放课</span>
 					( <span class="playback_time">2016-07-28</span> )
     			</div>
     			<ul class="playback_courses">
     				<li>
     					<a href="javaxcript:;">
     						<p class="playback_course_r onplay">
     							<span class="playback_course_name">TPO 29</span>
	     						<span class="playback_course_part">task 1.3.5</span>
     						</p>
	     					<p class="playback_video_info">
	     						<i class="duration_icon"></i><span class="playback_duration">10:00-11:30</span> 
	     						<i class="teacher_icon"></i><span class="course_teacher">占老师</span>
	     					</p>
     					</a>
     				</li>
     				<li>
     					<a href="javaxcript:;">
     						<p class="playback_course_r">
     							<span class="playback_course_name">TPO 29</span>
	     						<span class="playback_course_part">task 1.3.5</span>
     						</p>
	     					<p class="playback_video_info">
	     						<i class="duration_icon"></i><span class="playback_duration">10:00-11:30</span> 
	     						<i class="teacher_icon"></i><span class="course_teacher">占老师</span>
	     					</p>
     					</a>
     				</li>
     				<li class="lastChild">
     					<a href="javaxcript:;">
     						<p class="playback_course_r">
     							<span class="playback_course_name">TPO 29</span>
	     						<span class="playback_course_part">task 1.3.5</span>
     						</p>
	     					<p class="playback_video_info">
	     						<i class="duration_icon"></i><span class="playback_duration">10:00-11:30</span> 
	     						<i class="teacher_icon"></i><span class="course_teacher">占老师</span>
	     					</p>
     					</a>
     				</li>
     			</ul>
     		</div>
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
		
		
		
		
		//播放按钮切换
		var play_num = 0;
		$("#play_btn").click(function(e){
				if(play_num++ % 2 == 0){ 
				//doSomething 
					pauseVideo();
				}else{ 
				//doOtherSomething 
					playVideo();
				} 
				e.preventDefault(); //阻止元素的默认动作（如果存在） 
		});
		
		//静音切换
		var volume_num = 0;
		$("#volume_btn").click(function(e){
			if(volume_num++ % 2 == 0){ 
				submitMute(true);
				}else{ 
				submitMute(false);
				} 
				e.preventDefault(); //阻止元素的默认动作（如果存在） 
		});
		
		$("#full_btn").click(function(){
			//$(this).toggleClass("scale_icon");
			onModuleFocus();
		});
		
		//窗口互换
		$(".exchange").click(function(){
			var str=$("#videoOne").html();
			var stt=$("#videoTwo").html();
			$("#videoOne").html(stt);
			$("#videoTwo").html(str);
			$("#eventslog").html("");
		});
		
		var wg1 = GS.createChannel();
		
		//暂停视频
		function pauseVideo(){
			$("#play_btn").addClass("pause_icon");
			 wg1.send("pause", {
			 });
		}
		//开始视频
		function playVideo(){
			$("#play_btn").removeClass("pause_icon");
			 wg1.send("play", {
			 });
		}
		
		//静音   参数"mute": [true | false]
		function submitMute(flag){
			if(flag){
				$("#volume_btn").addClass("mute_icon");
			}else{
				$("#volume_btn").removeClass("mute_icon");
			}
			 wg1.send("submitMute", {
				 "mute": [flag]
			 });
		}
		
		
		//监听文件的总时长
		/* wg1.bind("onFileDuration", function (event) {
			 alert(event.data.duration);
			 }); */
		
		wg1.bind("onPlay", function (event) {
			 alert(event.data.timestamp);
			 });
		
		

		
	})
	
	</script>

</body>
</html>