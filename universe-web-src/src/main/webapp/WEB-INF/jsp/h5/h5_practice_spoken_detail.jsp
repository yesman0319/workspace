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
		<title>作业详情</title>
		<%@include file="../include/pub.jsp"%>
		<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
		<link rel="stylesheet" href="${cdnPath }/css/reset.css" />
		<link rel="stylesheet" href="${cdnPath }/css/practice.css" />
	</head>
	
	<body>
		<div class="top_layout">
			<div class="a_recorder">
				<div class="audiojsZ newaudio " id="audiojs_wrapper0">
		          	<audio id="myMusic" src="${videoUrl}" preload="auto"></audio>
		         	<div class="play-pauseZ"><p class="playZ"></p>
		              	<p class="pauseZ"></p>
		             	<p class="loadingZ"></p>
		            	<p class="errorZ"></p>
		          	</div>
		          	<div class="newscrubberZ scrubberZ">
		             	<div class="progressZ" style="width: 0px;"></div>
		              	<div class="loadedZ" style="width: 100%;"></div>
		          	</div>
					<div class="timeZ"><em class="playedZ">00:00</em>| <strong class="durationZ"></strong></div>
					<div class="error-messageZ"></div>
					<div class="change-voice" style="display:none;"></div>
		        	<div class="sound setsound" style="margin-left:0;margin-right: 30px;cursor:pointer;display:none;">
		            <div class="play-voice" style="width:100%;"></div>
		               <div class="voice-bigger"></div>
		            </div>
		       </div>
			</div>
			</div>
		<div class="commtent_line">
				全部评论
		</div>
		<div class="main">
			<ul class="content c_content">
			<c:if test="${ empty comment || empty comment.comments }">
								<p class="not_more">
										没有更多评论...
								</p>
				</c:if>
		<c:if test="${not empty comment && not empty comment.comments }">
			<c:forEach items="${comment.comments }" var="item">
				<c:if test="${item.role == 1}">
								<li class="teachers" id="comment_"${item.id }>
				</c:if>
				<c:if test="${item.role != 1}">
						<li class="students" >
				</c:if>
				<div class="avatar">
										<c:if test="${not empty item.avatar && item.avatar != '' }">
				                        		<img src="${item.avatar}"   alt="头像"/>
				                        </c:if>
				                        <c:if test="${empty item.avatar || item.avatar == '' }">
				                        		<img src="http://newbbs.b0.upaiyun.com/avater/avater.png"   alt="头像"/>
				                        </c:if>
				</div>
													<div class="desc c_desc">
									<div class="left">
										<p class="nickname">${item.nickname }<c:if test="${item.role eq 1}"><span class="teacher_tag">宇宙老师</span></c:if></p>
										<c:if test="${not empty item.commentAudio && item.commentAudio != ''  }">
											<div class="c_audioDiv"  title="${item.id}" >
												<span class="audioTime">${item.audioLength}</span>"
												<span class="playImg "  id="playImg${item.id }"></span>
												<audio style="display: none" id="autoplay${item.id}" src="${item.commentAudio}" ></audio>
											</div>
										</c:if>
									</div>
									<div class="comment_time">
										<fmt:formatDate value="${item.createdAt}" pattern="MM-dd HH:mm"/>
									</div>
								</div>
								<c:if test="${not empty item.commentTxt && item.commentTxt != ''  }">
									<div class="comment_content">
										<span>
											${item.commentTxt}
										</span>			
										<p>
											<span class="showHid_btn">展开</span>
										</p>
									</div>
								</c:if>
							</li>
				</c:forEach>
		</c:if>
			</ul>
			<!--暂时不做分页  -->
			<!-- <div class="load_more">点击加载更多...</div> -->
		</div>
		<div class="download_tips c_download_tips">
			<span>下载精英计划APP, 查看更多学习计划</span>			
			<a href="<%=com.xiaoma.universe.common.utils.PropertiesUtils.getString("APP_DOWNLOAD_URL")%>" class="download_btn">下载</a>
		</div>
	</body>
	
	<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
	<script type="text/javascript" src="${cdnPath}/js/h5/h5_share.js"></script>
	<script src="${cdnPath}/j/lib/audiojs/audio.min.js"></script>
	<script type="text/javascript">
		var basePath = "${bathPath}";
		var lineLink = "${shareUrl}";//这个是分享的网址
		var imgUrl = "${cdnPath}"+"/i/ic_share.png";//这里是分享的时候的那个图片
		var descContent = "我正在精英计划练习${title}，快来跟我一起练习";
		var share_title = "${shareTitle}"; 
		var videoLength = "${videoLength}";
		
		$(function(){
			share(lineLink,imgUrl,descContent,share_title);
		});
		
		var audioDivs = document.getElementsByClassName("c_audioDiv");
		var  playImg = audioDivs;
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
							console.log("新播放播放 -id = " + id + ", playNum = " + play_num);
							
							//删除所有的播放样式
				 			$(".audioDiv").removeClass("playing");
							
							//增加播放样式
							$("#playImg" + id).addClass("playing");
							
							audio.play();
							
							//音频播放完成后的执行操作
							audio.onended = function() {
								$("#playImg" + id).removeClass("playing");
							}
						}else{
							console.log("新暂停 -id = " + id + ", playNum = " + play_num);
							//删除所有的播放样式
				 			$(".audioDiv").removeClass("playing");
				 			
							audio.pause();
						}
						
					}else{
						if( play_num++ % 2 == 0){
							console.log("原来的播放播放 -id = " + id + ", playNum = " + play_num);
							$("#playImg" + id).addClass("playing");
							audio.play();
							audio.onended = function() {
								$("#playImg" + id).removeClass("playing");
							}
						}else{
							console.log("暂停 -id = " + id + ", playNum = " + play_num);
								$("#playImg" + id).removeClass("playing");
								audio.pause();
						}
					}
			} 
		}
		
		 
			$(function(){
				//语音长度
				$(".c_audioDiv").each(function(index,item){
					var timeLen = $(this).find(".audioTime").html();
					//var audioLen = timeLen*3+"px";
					var audioLen = timeLen*3+"px";
					console.log("audioLen = " + audioLen);
					$(this).css("width",audioLen);
				})	
				
				
				//初始化音频播放器控件
				var initAudioControl=function(eleId){
					audiojs.events.ready(function () {
						var objAudit = document.getElementById(eleId);
						ctlAudio = audiojs.create(objAudit, {
							css: false,
							createPlayer: {
								markup: false,
								playPauseClass: 'play-pauseZ',
								scrubberClass: 'scrubberZ',
								progressClass: 'progressZ',
								loaderClass: 'loadedZ',
								timeClass: 'timeZ',
								durationClass: 'durationZ',
								playedClass: 'playedZ',
								errorMessageClass: 'error-messageZ',
								playingClass: 'playingZ',
								loadingClass: 'loadingZ',
								errorClass: 'errorZ'
							}
						});
					});
				};
				
				initAudioControl("myMusic");
				
			});
			
			
			$(function(){
				//点击展开收起 
				var	$sh_btn = $(".showHid_btn");
				var $commentSpan = $(".comment_content>span");
				$.each($commentSpan,function(index,value){
					var $this = $(this);
					if($this.innerHeight() <= 81){
						$sh_btn.eq(index).hide();
					}else{
						$sh_btn.eq(index).show();
						$this.addClass("ellipsis");
						$this.css({"max-height":"81px","overflow":"hidden"});
						$sh_btn.eq(index).click(function(){
							var _this = $(this);
							if(_this.html() == "展开"){
								$this.css("max-height","999px").removeClass("ellipsis");
								_this.html("收起");
							}else{
								$this.css("max-height","81px").addClass("ellipsis");
								_this.html("展开");
							}
						})
					}
				})
			})
	</script>
</html>
