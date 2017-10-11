<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="/padding" prefix="padding"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>机经专题</title>
    <link rel="stylesheet" href="${cdnPath}/css/common.css"/>
    <link rel="stylesheet" href="${cdnPath}/css/camp/camp-teacher.css"/>
    <%@include file="../include/pub.jsp"%>
</head>
<body>
	<div class="camp-wrapper">
		<div class="banner">
			<div class="hd">
				<div class="title">听力训练营第一期：如何提高听力能力</div>
				<p>
					<span id="live-clock" class="time-pos">
				        <img class="time-icon" src="${basePath}/i/time.png">
				        <a href="#" id="timeBtnStaus">计时</a> :
				        <a id="liveTimer" class="live-time">00:00:00</a>
			        </span>
			        <button id="start-live">开始直播</button>
			        <button id="stop-live" style="display: none;">停止直播</button>
				</p>
			</div>
		</div>
		<div class="camp-content">
			<div class="chat-room"  ng-app="campApp" ng-controller="main">
				<div class="message-box">
					<h3>{{rongyunDemo}}</h3>
					<h4>{{carname}}</h4>
				</div>
				<div class="input-box">
					
					<div class="editor-main">
						<ul class="tool-bar">
							<li id="ed-emoji">
								<a href="#">表情</a></li>
							<!--<li id="ed-pic">
								<a href="#">图片</a>	
							</li>-->
							<li id="ed-file">
								<a href="#">文件</a>	
							</li>
							<li id="ed-record">
								<a href="#">录音</a>
							</li>
							<button id="forbid">发起禁言</button>
						</ul>
						<div id="editor" class="mod" style="display: block;">
		                    <div contenteditable="true" id="ed-input"></div>
							<a href="#" id="send">发送</a>
						</div>
	                    <div id="recorder" class="mod">
							<div id="flashcontent"></div>
							<p id="recordTipP">点击开始录音</p>
							<p id="recordTimerP" style="display:none;"><span id="recordTimer">00:00</span>/<span id="recordTotalLength">00:45</span></p>
							<div id="recorder-box">
								<img id="start" src="${cdnPath}/i/share/ic-record-start.png" alt="点击录音" />
								<img id="playing" src="${cdnPath}/i/share/ic-recording.png" alt="播放中" style="display: none;"/>
								<img id="pause" src="${cdnPath}/i/share/ic-record-stop-play.png" alt="暂停" style="display: none;" />
								<img id="recording" src="${cdnPath}/i/share/ic-record-stop.gif" alt="录音中" style="display: none;" />
							</div>
							<div id="button-box">
								<button id="reRecord">重录</button>
								<button id="saveRecord">发送</button>
							</div>
							<form id="uploadForm" name="uploadForm" action="#">
						      	<input id="audio_length" name="audio_length" value="" type="hidden">
						    </form>
						</div>
						<div id="emojis" class="mod" style="display: none;"></div>
	                </div>
					
				</div>
			</div>
			<div class="file-area">
				<div class="live-status">
					<table border="1">
						<tr>
							<th>总人数</th>
							<th>直播人数</th>
							<th>做题人数</th>
						</tr>
						<tr>
							<td>200</td>
							<td>100</td>
							<td>200</td>
						</tr>
					</table>
				</div>
				<ul class="fpic fitem">
					<h4>图片</h4>
					<li>
						<img class="ui-widget-content" src="${cdnPath}/i/index/plan1.png" />
					</li>
					<li>
						<img class="ui-widget-content" src="${cdnPath}/i/index/plan2.png" />
					</li>
					<li>
						<img class="ui-widget-content" src="${cdnPath}/i/index/plan3.png" />
					</li>
					<li>
						<img class="ui-widget-content" src="${cdnPath}/i/index/plan4.png" />
					</li>
				</ul>
				<ul class="fsection fitem">
					<h4>文字</h4>
					<li class="ui-widget-content">
						精英计划训练营精英计划训练营精英计划训练营精英计划训练营
						精英计划训练营精英计划训练营精英计划训练营精英计划训练营
						精英计划训练营精英计划训练营精英计划训练营精英计划训练营
					</li>
					<li class="ui-widget-content">
						精英计划训练营精英计划训练营精英计划训练营精英计划训练营
						精英计划训练营精英计划训练营精英计划训练营精英计划训练营
						精英计划训练营精英计划训练营精英计划训练营精英计划训练营
					</li>
				</ul>
				<ul class="faudio fitem">
					<h4>音频</h4>
					<li class="ui-widget-content">
						<div class="audio-box playing">
                            <span class="arrowSpan"></span>
                            <i class="laba"></i>
                            <span class="audioLength">34"</span>
                            <audio style="display: none" src="http://universetoefl.b0.upaiyun.com/yztuofu/audio/20170223/AFFA5D4958D54D81B1C757FD09F6B4E8.mp3"></audio>
                        </div>
					</li>
					<li class="ui-widget-content">
						<div class="audio-box">
                            <span class="arrowSpan"></span>
                            <i class="laba"></i>
                            <span class="audioLength">34"</span>
                            <audio style="display: none" src="http://universetoefl.b0.upaiyun.com/yztuofu/audio/20170223/AFFA5D4958D54D81B1C757FD09F6B4E8.mp3"></audio>
                        </div>
					</li>
					<li class="ui-widget-content">
						<div class="audio-box">
                            <span class="arrowSpan"></span>
                            <i class="laba"></i>
                            <span class="audioLength">34"</span>
                            <audio style="display: none" src="http://universetoefl.b0.upaiyun.com/yztuofu/audio/20170223/AFFA5D4958D54D81B1C757FD09F6B4E8.mp3"></audio>
                        </div>
					</li>
					<li class="ui-widget-content">
						<div class="audio-box">
                            <span class="arrowSpan"></span>
                            <i class="laba"></i>
                            <span class="audioLength">34"</span>
                            <audio style="display: none" src="http://universetoefl.b0.upaiyun.com/yztuofu/audio/20170223/AFFA5D4958D54D81B1C757FD09F6B4E8.mp3"></audio>
                        </div>
					</li>
				</ul>
			</div>
		</div>
	</div>
<!--<scrip type="text/javascript" src="lib/dist/RongIMWidget.js"></script>-->
<!--<script src="http://cdn.static.runoob.com/libs/angular.js/1.4.6/angular.min.js"></script>-->
<script src="http://cdn.ronghub.com/RongIMLib-2.2.5.min.js"></script>
<script src="http://cdn.ronghub.com/RongEmoji-2.2.5.min.js"></script>
<script src="${basePath}/j/lib/jqueryUI/jquery-ui.js"></script>  
<script src="${basePath}/j/lib/flashwavrecorder/swfobject.js"></script>
<script src="${basePath}/j/lib/flashwavrecorder/recorder.js"></script>
<script src="${basePath}/js/camp/camp-teacher.js"></script>
<script type="text/javascript">
	RongIMClient.init("pgyu6atqpfouu");//初始化sdk
	RongIMLib.RongIMEmoji.init();//初始化表情包
	
	var emojis = RongIMLib.RongIMEmoji.emojis;
	
	$("#emojis").html(emojis);
	$(".RC_Expression").click(function(){
		var emojiName = $(this).parent().attr("name");
		console.log(emojiName)
	})
</script>
</body>
</html>