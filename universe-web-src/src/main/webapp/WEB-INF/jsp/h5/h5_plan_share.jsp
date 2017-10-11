<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html> 
	<head>
		<meta charset="UTF-8">
		<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"	name="viewport">
		<meta content="yes" name="apple-mobile-web-app-capable">
		<meta content="black" name="apple-mobile-web-app-status-bar-style">
		<meta content="telephone=no" name="format-detection">
		<meta content="email=no" name="format-detection">
		<title>${plan.name }</title>
		<%@include file="../include/pub.jsp"%>
		<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
		<link rel="stylesheet" href="${cndPath}/css/reset.css" />
		<link rel="stylesheet" href="${cndPath}/css/plan_detail.css" />
		 <style type="text/css">
    	*{ 
	    font-size:14px; 
	}
    </style>
	</head>
	<body>
		<div class="download_tips">
			<span>下载精英计划APP, 查看更多学习计划</span>
			
			<a href="<%=com.xiaoma.universe.common.utils.PropertiesUtils.getString("APP_DOWNLOAD_URL")%>" class="download_btn">下载</a>	 
		</div>
		<div class="banner">
			<img src="${plan.imageAppDetail }" alt="TPO模考计划"/>
		</div>
		<div class="content">
			<ul class="content_nav">
				<li class="active">
					<a href="#tab0" class="tab">简介</a>
				</li>
				<li>
					<span class="cutLine"></span>
					<a href="#tab1" class="tab">练习</a>
				</li>
				<c:if test="${audioList!=null && audioList.size()>0 }">
				<li>
					<span class="cutLine"></span>
					<a href="#tab2" class="tab">音频</a>
				</li>
				</c:if>
				<c:if test="${videoList!=null && videoList.size()>0 }">
				<li>
					<span class="cutLine"></span>
					<a href="#tab3" class="tab">视频</a>
				</li>
				</c:if>
			</ul>
			<div class="jianjie tContent" style="display: ;">
				<div class="courses_plan">
					<h3>${plan.name }</h3>
					<span class="people_num">
						<i class="people_icon"></i>
						<span id="people_count">${plan.learnNumber }</span>人在学
					</span>
					<span class="course_duration">
						<i class="duration_icon"></i>
						<span id="duration_count">${plan.totalDay }</span>天练习
					</span>
					<span class="teacher_name">
						<i class="people_icon"></i>
						讲师:<span id="teacher_name">
						<c:if test="${plan.teacher==null}">暂无</c:if>
        	 			  <c:if test="${plan.teacher!=null}">${plan.teacher.nameCn } </c:if>
						</span>
					</span>
				</div>
				<ul class="plan_desc">
					<li>
						<p class="plan_desc_title"></p>
						<span class="desc_words">${plan.planSummaryShare }
						</span>
					</li>
					 
				</ul>
			</div>
			<div class="lianxi tContent" style="display: none;">
			<c:if test="${prepList.size()>0 }">
				<ul class="mod listening">
					<li class="mod_title">
						<div class="iconBox"><b class="preview_icon"></b></div>
						<div class="mod_desc">
							<h2>预习</h2>
							<span>共${prepList.size() }道题 预计需要${prepTime}分钟</span>
						</div>
					</li>
					  <c:forEach items="${prepList }" var="exerciseVO" varStatus="status">
                       	 <li>
							<div class="iconBox"><i class="havent_icon"></i></div>
							<p class="mod_name">${exerciseVO.moduleName }</p>
						</li>
	                   </c:forEach> 
	                  
				</ul>
			</c:if>
			
			<c:if test="${listeningList.size()>0 }">
				<ul class="mod listening">
					<li class="mod_title">
						<div class="iconBox"><b class="listening_icon"></b></div>
						<div class="mod_desc">
							<h2>听力</h2>
							<span>共${listeningList.size() }道题 预计需要${listeningTime}分钟</span>
						</div>
					</li>
					  <c:forEach items="${listeningList }" var="listening" varStatus="status">
                       	 <li>
							<div class="iconBox"><i class="havent_icon"></i></div>
							<p class="mod_name">${listening.moduleName }</p>
						</li>
	                   </c:forEach> 
	                  
				</ul>
			</c:if>
			<c:if test="${speakingList.size()>0 }">
				<ul class="mod spoken">
					<li class="mod_title">
						<div class="iconBox"><b class="spoken_icon"></b></div>
						<div class="mod_desc">
							<h2>口语</h2>
							<span>共${speakingList.size() }道题 预计${speakingTime}分钟完成</span>
						</div>
					</li>
					  <c:forEach items="${speakingList }" var="speaking" varStatus="status">
                       	 <li>
							<div class="iconBox"><i class="havent_icon"></i></div>
							<p class="mod_name">${speaking.moduleName }</p>
						</li>
	                   </c:forEach> 
	                  
				</ul>
			</c:if>
			<c:if test="${readingList.size()>0 }">
				<ul class="mod reading">
					<li class="mod_title">
						<div class="iconBox"><b class="reading_icon"></b></div>
						<div class="mod_desc">
							<h2>阅读</h2>
							<span>共${readingList.size() }道题 预计${readingTime}分钟完成</span>
						</div>
					</li>
					  <c:forEach items="${readingList }" var="reading" varStatus="status">
                       	 <li>
							<div class="iconBox"><i class="havent_icon"></i></div>
							<p class="mod_name">${reading.moduleName }</p>
						</li>
	                   </c:forEach> 
	                  
				</ul>
			</c:if>
			<c:if test="${writingList.size()>0 }">
				<ul class="mod writing_icon">
					<li class="mod_title">
						<div class="iconBox"><b class="reading_icon"></b></div>
						<div class="mod_desc">
							<h2>写作</h2>
							<span>共${writingList.size() }道题 预计${writingTime}分钟完成</span>
						</div>
					</li>
					  <c:forEach items="${writingList }" var="writing" varStatus="status">
                       	 <li>
							<div class="iconBox"><i class="havent_icon"></i></div>
							<p class="mod_name">${writing.moduleName }</p>
						</li>
	                   </c:forEach> 
	                  
				</ul>
			</c:if> 
			</div>
			<c:if test="${audioList!=null && audioList.size()>0 }">
			<div class="audios tContent" style="display: none;">
				<ul class="mod section" id="audio_mod">
				   <c:forEach items="${audioList}" var="audio" varStatus="i">
				   <c:choose>
				      <c:when test="${audioStatus eq 1 || audioStatus eq 6}">
						<li class="can_hear" data-audio="${audio.audioUrl}">  <!--已购买-->		
							<div class="margin-div"></div>
							<div class="a_right">
								<span class="audio_name"><i class="horn_icon"></i>${audio.name}</span>
								<span class="audio_duration">${audio.duration}</span>
							</div>						
						</li>
						</c:when>
					   <c:when test="${audioStatus ne 1 && audioStatus ne 6 && audio.type==1}">
						<li class="can_hear" data-audio="${audio.audioUrl}">  <!--可试听-->		
							<div class="margin-div"></div>
							<div class="a_right">
								<span class="audio_name"><i class="horn_icon"></i>${audio.name}</span>
								<span class="audio_status">可试听</span>
								<span class="audio_duration">${audio.duration}</span>
							</div>						
						</li>
						</c:when>
						<c:otherwise>
						<li class="cant_hear">  <!--未购买-->		
							<div class="margin-div"></div>
							<div class="a_right">
								<span class="audio_name"><i class="horn_icon"></i>${audio.name}</span>
								<span class="audio_duration">${audio.duration}</span>
							</div>						
						</li>
						</c:otherwise>
				    </c:choose>
					</c:forEach>
				</ul>
				<div id="wrapper" style="display:none"><!--音频播放器插件-->
					<audio id="myAudio" src="${cdnPath}/i/a.mp3" preload="auto" controls>
					</audio>
					<b id="a_prev"></b>
					<b id="a_next"></b>
				</div>
			</div>
			</c:if>
			<c:if test="${videoList!=null && videoList.size()>0 }">
			<div class="videos tContent" style="display: none;">
				<ul class="mod section">
					 
					
					<c:forEach items="${videoList }" var="video" varStatus="status">  
                              <c:choose>
									<c:when  test="${video.canSee=='1' && video.hasSee=='1'}">  
									
                             			 <li class="can_see"> 
										 <div class="iconBox"><i class="done_icon"></i></div>
										<div class="v_right"><a href="#">
											<span class="section_name">${video.name}</span>
											<span class="video_duration">${video.duration}</span></a>
										</div>	
										</li>
									</c:when>
									 
									 <c:when  test="${video.canSee=='1' && video.hasSee=='0'}">  
									
                             			 <li class="can_see"> 
										 <div class="iconBox"><i class="on_icon"></i></div>
										<div class="v_right"><a href="#">
											<span class="section_name">${video.name}</span>
											<span class="video_duration">${video.duration}</span></a>
										</div>	
										</li>
									</c:when>
									
									 <c:when  test="${video.canSee=='2' }">   
									 <li class="can_see">
										 <div class="iconBox"><i class="havent_icon"></i></div>
										<div class="v_right"><a href="#">
											<span class="section_name">${video.name}</span>
											<span class="video_status">可试看</span>
											<span class="video_duration">${video.duration}</span></a>
										</div>
										</li>
									</c:when>
									
									<c:otherwise> 
									<li class="cant_see"> 
					                          <div class="iconBox"><i class="havent_icon"></i></div>
											<div class="v_right">
												<a href="#"><span class="section_name">${video.name}</span>
												<span class="video_duration">${video.duration}</span></a>
											</div>
											</li>
									</c:otherwise>
								</c:choose>
								
					            
			</c:forEach>
			</c:if>
<!-- 					<li class="can_see">	可看     已看过					 -->
<!-- 						<div class="iconBox"><i class="done_icon"></i></div> -->
<!-- 						<div class="v_right"><a href="#"> -->
<!-- 							<span class="section_name">音译互辩 Unit2-4</span> -->
<!-- 							<span class="video_duration">1小时2分钟</span></a> -->
<!-- 						</div>					 -->
<!-- 					</li> -->
<!-- 					<li class="can_see">	可看    正在看					 -->
<!-- 						<div class="iconBox"><i class="on_icon"></i></div> -->
<!-- 						<div class="v_right"><a href="#"> -->
<!-- 							<span class="section_name">音译互辩 Unit2-4</span> -->
<!-- 							<span class="video_duration">1小时2分钟</span></a> -->
<!-- 						</div>					 -->
<!-- 					</li> -->
<!-- 					<li class="can_see">	可看    可试看					 -->
<!-- 						<div class="iconBox"><i class="havent_icon"></i></div> -->
<!-- 						<div class="v_right"><a href="#"> -->
<!-- 							<span class="section_name">音译互辩 Unit2-4</span> -->
<!-- 							<span class="video_status">可试看</span> -->
<!-- 							<span class="video_duration">1小时2分钟</span></a> -->
<!-- 						</div>					 -->
<!-- 					</li> -->
<!-- 					<li class="cant_see">  不可看		 -->
<!-- 						<div class="iconBox"><i class="havent_icon"></i></div> -->
<!-- 						<div class="v_right"> -->
<!-- 							<a href="#"><span class="section_name">记忆复记忆复写 Unit2-4</span> -->
<!-- 							<span class="video_duration">58分钟</span></a> -->
<!-- 						</div>						 -->
<!-- 					</li> -->
				</ul>
			</div>
		</div>	
		
		<c:choose>
					 <%-- 免费已经加入或收费已经购买  --%>
					<c:when test="${plan.userStatitic!=null && (plan.userStatitic.userStatus==1 || plan.userStatitic.userStatus==5 || plan.userStatitic.userStatus==6)}">
						<div class="freeft footer" style="display: ;">
						<c:if test="${plan.isPay!=1}"> 
							<span class="price"></span>
						</c:if>
						<c:if test="${plan.isPay==1}"> 
							<p class="price">
								<i class="price_icon"></i>
								<span id="price">${plan.localPrice }</span>
							</p>
						</c:if>
						<a href="javascript:;" class="add_plan have_add">已加入该计划</a><!-- or 已加入该计划  添加类名:have_add -->
					</div>
					</c:when>
					 <%-- 免费 没加入  --%>
					<c:when test="${plan.isPay!=1}">
						<div class="freeft footer" >
							<span class="price">免费</span>
							<a href="${basePath}/h5/plan/share/experience/${plan.id }.html" class="add_plan">加入计划</a>
						</div>
					</c:when>
					  <%-- 收费已经体验  --%>
					 <c:when test="${plan.isPay==1 && (plan.userStatitic.userStatus==3 || plan.userStatitic.userStatus==4)}">
						<div class="buyft footer" >
							<p class="price" style="width:60%;">
								<i class="price_icon"></i>
								<span id="price">${plan.localPrice }</span>
							</p> 
							<a href="${basePath}/h5/plan/share/buy/${plan.id }.html" class="pay_btn" style="width:40%;">购买计划</a>
						</div>
					</c:when>
					
					<c:otherwise> 
						<div class="buyft footer">
							<p class="price" style="width:60%;">
								<i class="price_icon"></i>
								<span id="price">${plan.localPrice }</span>
							</p>	 
							<a href="${basePath}/h5/plan/share/buy/${plan.id }.html" class="pay_btn"  style="width:40%;">购买计划</a>
						</div>
					</c:otherwise>
				</c:choose>
				
		
		
		<!--模态提示框-->
		<div id="divtip1" class="modal">
			<div class="dialog"> 
				<c:choose> 
					<%-- 没登陆，免费 --%>
					<c:when test="${user==null && plan.isPay!=1}"> 
						<!--模态提示框--> 
						<p class="tips_words">提示</p>
						<p class="tips_detail">
							加入计划后可以练习
						</p>
						<ul>
							<li  id="shaohou1" class="wait"><a href="javascript:;">稍后再说</a></li>
							<li class="download"><a href="${basePath}/h5/plan/share/experience/${plan.id }.html">加入计划</a></li>
						</ul>
					</c:when> 
					 <%-- 没登陆，收费  --%>
					<c:when test="${user==null && plan.isPay==1}"> 
						<%--模态提示框 --%> 
						<p class="tips_words">提示</p>
						<p class="tips_detail">
							购买入计划后可以练习
						</p>
						<ul>
							<li  id="shaohou1" class="wait"><a href="javascript:;">稍后再说</a></li>
							<li class="download"><a href="${basePath}/h5/plan/share/buy/${plan.id }.html">购买计划</a></li>
						</ul>
					</c:when> 
					 <%-- 登陆，收费 /免费 加入或购买 --%>
					<c:when test="${user!=null && plan.userStatitic!=null && plan.userStatitic.userStatus!=0}"> 
						<%--模态提示框 --%> 
						<p class="tips_words">提示</p>
						<p class="tips_detail">
							<c:if test="${user!=null }">练习已成功加入<span class="userId">${nickname }</span>账户，</c:if>请登录APP端进行练习	
						</p>
						<ul>
							<li  id="shaohou1" class="wait"><a href="javascript:;">稍后再说</a></li>
							<li class="download"><a href="<%=com.xiaoma.universe.common.utils.PropertiesUtils.getString("APP_DOWNLOAD_URL")%>">立即下载</a></li>
						</ul> 
					</c:when>
					
					 <%-- 登陆，收费  没购买 --%>
					<c:when test="${user!=null && plan.isPay==1 && plan.userStatitic!=null && plan.userStatitic.userStatus==0}"> 
						<%--模态提示框 --%> 
						<p class="tips_words">提示</p>
						<p class="tips_detail">
							购买计划后可以练习
						</p>
						<ul>
							<li  id="shaohou1" class="wait"><a href="javascript:;">稍后再说</a></li>
							<li class="download"><a href="${basePath}/h5/plan/share/buy/${plan.id }.html">购买计划</a></li>
						</ul> 
					</c:when>
					
					 <%-- 登陆，免费，没加入 --%>
					<c:when test="${user!=null && plan.isPay!=1 && plan.userStatitic!=null && plan.userStatitic.userStatus==0}"> 
						<%--模态提示框 --%> 
						<p class="tips_words">提示</p>
						<p class="tips_detail">
							加入计划后可以练习
						</p>
						<ul>
							<li  id="shaohou1" class="wait"><a href="javascript:;">稍后再说</a></li>
							<li class="download"><a href="${basePath}/h5/plan/share/experience/${plan.id }.html">加入计划</a></li>
						</ul> 
					</c:when>
					<c:otherwise> 
						 <p class="tips_words">提示</p>
						<p class="tips_detail"> 请登录APP端进行练习	
						</p>
						<ul>
							<li  id="shaohou1" class="wait"><a href="javascript:;">稍后再说</a></li>
							<li class="download"><a href="<%=com.xiaoma.universe.common.utils.PropertiesUtils.getString("APP_DOWNLOAD_URL")%>">立即下载</a></li>
						</ul>
					</c:otherwise>
				</c:choose> 
			</div>
		</div>
		
		<%--模态提示框--%>
		<div id="divtip2"  class="modal">
			<div class="dialog">  
				<p class="tips_words">已加入该计划</p>
				<p class="tips_detail">
					<c:if test="${user!=null }">练习已成功加入<span class="userId">${nickname }</span>账户，</c:if>请登录APP端进行练习	
				</p>
				<ul>
					<li  id="shaohou2" class="wait"><a href="javascript:;">稍后再说</a></li>
					<li class="download"><a href="<%=com.xiaoma.universe.common.utils.PropertiesUtils.getString("APP_DOWNLOAD_URL")%>">立即下载</a></li>
				</ul>
			</div>
		</div>
		
		 
		<input id="showtiptype" hidden="true" value="${showExperienceTip }">
	</body>
	<script src="${cdnPath}/js/h5/lib/audioplayer.js"></script>
	<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
	<script type="text/javascript" src="${cdnPath}/js/h5/h5_share.js"></script>
	
	<script type="text/javascript">
		var $tabLi =  $(".content_nav li");
		var tabLiWidth;
		var $windowWidth = $(window).width()
		//设置tab切换宽度
		window.onload = function(){
			if(window.innerWidth >= 1200){
				tabLiWidth = 1200/$tabLi.length;
			}else{
				tabLiWidth = parseInt(window.innerWidth/$tabLi.length);
			}
			$tabLi.css("width",tabLiWidth);
		}
		window.onresize = function(){
			if(window.innerWidth >= 1200){
				tabLiWidth = 1200/$tabLi.length;
			}else{
				tabLiWidth = parseInt(window.innerWidth/$tabLi.length);
			}
			$tabLi.css("width",tabLiWidth);
		}
		//tab切换
		$(".content_nav li").click(function(){
			var index = $(this).index();
			$(".content_nav li").removeClass();	
			$(this).addClass("active");
			$(".tContent").hide().eq(index).show();
		})
	//模态提示框
// 		$(".add_plan").click(function(){
// 			$(".modal").show();
// 		})
		$("#shaohou1").click(function(){
			$("#divtip1").hide();
		})
		$("#shaohou2").click(function(){
			$("#divtip2").hide();
		})
	//音频列表部分	
		$(function() {
			var curAudioIndex = 0;//当前播放的li下标
			var audioLength = $(".can_hear").length;//可播放的个数
			$('audio').audioPlayer();//初始化音频播放器
			$.each($(".can_hear"),function(i,v){
				v.value = i;
			})
			//点击当前音频列
			$(".can_hear").click(function(){
				$("#wrapper").show();
				var $this = $(this);
				curAudioIndex = $this.attr("value");
				var audioSrc = $this.data("audio");	
				playAudio(audioSrc);
			})
			$("#myAudio").on("ended",function(){
				$("#audio_mod").find("li").removeClass("active-playing");
			})
			//向前按钮
			$("#a_prev").click(function(){
				if(curAudioIndex <= 0){
					return;
				}
				curAudioIndex--;
				var audioSource = $(".can_hear").eq(curAudioIndex).data("audio");
				playAudio(audioSource);
			})
			//向后按钮
			$("#a_next").click(function(){
				if(curAudioIndex >= audioLength - 1){
					return;
				}
				curAudioIndex++;
				var audioSource = $(".can_hear").eq(curAudioIndex).data("audio");
				playAudio(audioSource);
			})
			//播放音频
			function playAudio(source){
				stopAudioPlay();
				$("#myAudio").attr("src",source);
				$(".audioplayer").addClass("audioplayer-playing");
				$("#myAudio")[0].play();
				$(".can_hear").removeClass("active-playing").eq(curAudioIndex).addClass("active-playing");
			}
			//停止播放
			function stopAudioPlay(){
		    	if($(".audioplayer").hasClass("audioplayer-playing")){
		    		$(".audioplayer").removeClass("audioplayer-playing");
		    		$("#myAudio")[0].load();
		    	}else{
		    		$("#myAudio")[0].load();
		    	}
			}
		});
	 
		var showtip = $("#showtiptype").val();
		if(showtip=="1"){
			$("#divtip2").show();
		}

		$(".mod_name").click(function(){
			$("#divtip1").show(); 
		})
		
		$(".can_see").click(function(){
			$("#divtip1").show(); 
		})
		$(".cant_see").click(function(){
			$("#divtip1").show(); 
		})
		var basePath = "${bathPath}";
		var lineLink = window.location.href;//这个是分享的网址
		var imgUrl = "${cdnPath}"+"/i/ic_share.png";//这里是分享的时候的那个图片
		var descContent = "我正在精英计划学习${plan.name },快来跟我一起学习";
		var share_title = "${plan.name }-精英计划"; 
		
		$(function(){
			share(lineLink,imgUrl,descContent,share_title);
		});
	</script>
</html>
