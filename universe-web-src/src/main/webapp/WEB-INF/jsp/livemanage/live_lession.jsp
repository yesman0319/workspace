<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!doctype html>
<html lang="en" xmlns:gs="http://www.gensee.com/gsml">
<head>
	<meta charset="UTF-8" />
	<title>直播课 - 精英计划</title>
	<%@include file="../include/pub.jsp"%>
	<link rel="stylesheet" href="${cdnPath}/css/common.css"/>
    <link rel="stylesheet" href="${cdnPath}/css/live_course.css"/>
    <!--展示互动  -->   
	<script src="${cdnPath}/js/live/course_bootstrap.js"></script>
	<script src="${cdnPath}/js/live/gssdk.js"></script>
	<script src="${cdnPath}/js/live/json2.min.js"></script>
	<script src="${cdnPath}/js/live/tester.js"></script>
<!-- 	<link
	href="http://static.gensee.com/webcast/static/sdk/css/bootstrap.css"
	type="text/css" rel="stylesheet"> -->
    	<script>
		if (typeof JSON !== 'undefined') {
			JSON.stringify = undefined;
		}
		$('#eventslog').animate({scrollTop:$('#eventslog').height()},480);
		//$('.chat').animate({scrollTop:$('.chat').height()},500);
	</script>
</head>
<body>
	<div class="layout">
		<div class="main_center">
			<div class="live_player">
				<div class="video_title">
     				<h3 id="video_title">${detail.planName} - <span id="course_part">${detail.name}</span></h3>
     				<i class="share_icon" id="share_btn"></i>
     			</div>
     			<div class="video_box" id="videoOne">
     				<c:if test="${permission eq 'no'}">
     					<div class="screen"></div>
     				</c:if>
     				<c:if test="${permission eq 'yes' }">
     					 <gs:doc site="${detail.host}" ctx="webcast" ownerid="${sign }"  authcode="${detail.roomPwd }"  uname="${user.nickname }" 
							compress="false" fullscreen="true" /> 
     				</c:if>
     			</div>
     			<div class="video_control">
     				<a href="javascript:;" class="exchange" >互换</a>
     			</div>
			</div>
		</div>
		<div class="layout_left">
 			<div class="live_course_title">
 				<b class="live_course_icon"></b>
 				今日直播课
 			</div>
 			<ul class="courses_content">
		 				<!--start  直播课列表  -->
				 			<c:if test="${empty lists }">
				 			 			<li class="huifang">
											<p class="courses_content_l">
												<!-- <span class="courses_content_chapter">TPO29</span> -->
						 						<span class="courses_content_part">今日暂无直播课</span>
											</p>
						 				</li>
				 			</c:if>
				 			 <c:if test="${ not empty lists}">
				 				 <c:forEach items="${lists }" var="list" >
				 				 <li <c:if test="${list.status eq 1 }">class="huifang"</c:if><c:if test="${list.status eq 2 }">class="zhibozhong"</c:if><c:if test="${list.status eq 3 }">class="weikaishi"</c:if>>
				 				 	<p class="courses_content_l">
				 						<span class="courses_content_part">${list.name }</span>
				 						<c:if test="${list.status eq 1 }"><a href="javascript:;" class="live_status" style="cursor: not-allowed;">回放</a></c:if>
				 						<c:if test="${list.status eq 2 }"><a href="${basePath }/live/${list.id}.html" class="live_status">直播中</a></c:if>
				 						<c:if test="${list.status eq 3 }"><a href="javascript:;" class="live_status" style="cursor: not-allowed;">未开始  </a></c:if>
									</p>
				 					<p class="live_info">
				 						<i class="duration_icon"></i><span class="live_time"><fmt:formatDate value="${list.startTime}" pattern="HH:mm"/>-<fmt:formatDate value="${list.endTime}" pattern="HH:mm"/></span> 
				 						<i class="teacher_icon"></i><span class="course_teacher">${list.teacherName }</span>
				 					</p>
				 				</li>
				 				 </c:forEach>
				 			 </c:if>
		 			<!--end     直播课列表  -->
 			</ul>
 			<div class="qrcode_box">
 				<p>微信 "扫一扫" , 分享直播列表</p>
 				<img src="${basePath}/h5/qrcode.html?code_url= ${basePath}/h5/livelessions.html?source=weixin%26medium=weixinfriend%26campaign=${listCampaign}%26campaignContent=uid${user.id}"  class="qrcode"/>
 			</div>
		</div>
		<div class="layout_right">
		${permission}
				<c:if test="${permission eq 'no' }">
						<div class="file_area">
			 				<b class="file_icon"></b>
			 				<p>视频</p>
			     		</div>
			     		<div class="discussion_title">
							<b class="discussion_icon"></b>
			 				讨论区
			     		</div>
			     		<ul class="discussion_area">
			     			<li>
			     				<div class="comment">
			     					<span class="nickname1">宇宙超人</span>：
			     					<span class="comment_time">12:23:56</span>
			     				</div>
			     				<p class="comment_content">
			     					满载一船星辉，在星辉斑斓里放歌
			     				</p>
			     			</li>
			     			<li class="me">
			     				<div class="comment">
			     					<span class="nickname1">我</span>： 
			     					<span class="comment_time">12:23:56</span>
			     				</div>
			     				<p class="comment_content">
			     					满载一船星辉，在星辉斑斓里放歌
			     				</p>
			     			</li>
			     		</ul>
			     		<div class="input_box">
			     			<textarea type="textarea" placeholder="在此处说话~"/></textarea>
			     			<a href="javascript:;" class="send_btn">
				     			发送
				     		</a>
			     		</div>
			</c:if>
			<c:if test="${permission eq 'yes'}">
				<div id="videoTwo">
	     					<gs:video-live
						uname="${user.nickname }"  site="${detail.host}"
						ctx="webcast" ownerid="${sign }"
						authcode="${detail.roomPwd }" compress="false"/>
	     		</div>
	     		<div class="discussion_title">
					<b class="discussion_icon"></b>
	 				讨论区
	     		</div>
		     		<ul class="discussion_area"  id="eventslog" >
		     		</ul>
	     		<div class="input_box">
	     			<textarea type="textarea" placeholder="在此处说话~"   id="chatMessage"/></textarea>
	     			<a href="javascript:;" class="send_btn" id="sendMsg" >
		     			发送
		     		</a>
	     		</div>
			</c:if>
		</div>
		<div class="share_qrcode_modal">
			<div class="share_dialog">
				<h2>
 					分享到微信
 					<span class="close_btn"></span>
				</h2>
				<%-- <img src="${cdnPath}/i/live/share_qrcode.png" class="share_qrcode" /> --%>
				
				<img src="${basePath}/h5/qrcode.html?code_url= ${basePath}/h5/livelession/${detail.id}.html?status=2%26source=weixin%26medium=weixinfriend%26campaign=${detailCampaign}%26campaignContent=uid${user.id}" alt="" class="share_qrcode" >
				<ul class="share_tips" >
					<li>1. 打开微信，"扫一扫"二维码</li>
					<li>2. 点击弹出页面右上角的分享按钮</li>
				</ul>
			</div>
 		</div>
 		<div class="nickname_dialog_modal">
			<div class="nickname_dialog">
				<h2>
 					填写昵称
 					<span class="close_btn"></span>
				</h2>
				<p class="nickname_ipt">
					<span>昵称&nbsp;</span><input type="text" name="nickname" id="nickname"  value="${user.nickname }"/>
				</p>
				<div class="warn_tips">
					<i class="warn_icon"></i>
					昵称不能为空
				</div>
				<a href="javascript:;" class="submit"  id="nicknameSubmit">
					提交
				</a>
			</div>
			
 		</div>
	</div>
	<!--购买计划-->
	<c:if test="${permission eq 'no'}">
		<div id="payPlan_modal">
			    <div id="payPlan_dialog">
			        <h2>
			            产品购买
			        </h2>
			        <span id="payPlan_tips">该直播课需购买&nbsp;<span style="color: #39c075;font-size:18px;">${planName}</span>&nbsp;后观看</span>
			        <p class="btns">
<%-- 			            <a href="${basePath}/" id="pay_plan">
			                购买计划
			            </a> --%>
			            <a href="${basePath}/plans/${planId}" id="check_plan">
			                购买计划
			            </a>
			        </p>
			    </div>
		</div>
	</c:if>
	<script type="text/javascript">
	var userInfo = "${user}";
	</script>
	<script type="text/javascript">
	
	$(function(){
	//动态设置video_box的高度
		window.onload = function(){
			var innerHeight = parseInt($(".live_player").css("height"));
			var videoHeight = innerHeight - 131;
			$(".video_box").css("height",videoHeight+"px");
			//右侧平评论区域
			var totalHeight = $(".layout_right").innerHeight();
			var topHeight = $("#videoTwo").innerHeight() +　$(".discussion_title").innerHeight();
			var bottomHeight = $(".input_box").innerHeight();
			$(".discussion_area").css("height",(totalHeight - topHeight - bottomHeight - 15) + "px");
		}
		window.onresize = function(){
			var innerHeight = parseInt($(".live_player").css("height"));
			var videoHeight = innerHeight - 131;
			$(".video_box").css("height",videoHeight+"px");
			//右侧平评论区域
			var totalHeight = $(".layout_right").innerHeight();
			var topHeight = $("#videoTwo").innerHeight() +　$(".discussion_title").innerHeight();
			var bottomHeight = $(".input_box").innerHeight();
			$(".discussion_area").css("height",(totalHeight - topHeight - bottomHeight - 15) + "px");
		}
		
		
		
	//播放按钮切换
		$("#play_btn").click(function(){
			$(this).toggleClass("pause_icon");
		});
		$("#volume_btn").click(function(){
			$(this).toggleClass("mute_icon");
		});
		$("#full_btn").click(function(){
			$(this).toggleClass("scale_icon");
		});
		
	//点击扫描弹出二维码
		$("#share_btn").click(function(){
			$(".share_qrcode_modal").show();
		})
	//点击弹出昵称填写框
		$(".send_btn").click(function(){
			//$(".nickname_dialog_modal").show();
			send();
		})
	//点击关闭按钮清除蒙版
		$(".close_btn").click(function(){
			$(this).parent().parent().parent().hide();
		})
		
		//检查是否有昵称，如果没有弹出输入框
		function checkNickName(){
			var nickname = $("#nickname").val();
				if(nickname == null || $.trim(nickname) == ""){
					return false
				}
				return true;
			}
	
	//更新昵称
		$("#nicknameSubmit").click(function(){
			var nickname = $("#nickname").val();
			if(nickname == null || $.trim(nickname) == ""){
				alert("请输入昵称")
				return;
			}
			var url = '${basePath}' + "/livelession/nickname.html";
			$.post(url,
					  {
				 		'nickname' : nickname
					  },
					  function(data){
						  if(data){
							  if(data.success){
								  window.location.reload();
							  }
						  }
					  });
			
			$(".nickname_dialog_modal").hide();
		});
	
	//回车提交
			$(document).keypress(function(e){ 
					if(e.ctrlKey && e.which == 13 || e.which == 10 || e.which == 13) { 
					send();
					e.preventDefault();//屏蔽enter对系统作用。按后增加\r\n等换行
					} 
				});
	
	
		$("#sendMsg").keypress(function(e){
	        var eCode = e.keyCode ? e.keyCode : e.which ? e.which : e.charCode;
	        if (eCode == 13){
	        	send();
	        }else{
	        	return;
	        }
		});
		
		var wg1 = GS.createChannel();

		wg1.bind("onPublicChat", handler);

		function handler(event) {
			if (event.target.id == wg1.id) {
			} else {
				var nickname = $("#nickname").val();
				var color = "#000000";
				if(event.data.sender == nickname) {
					event.data.sender =nickname;
					color = "#17bd2f";
				}
				logEvent("WIDGET", event, color);
			}
		}
		
		function send() {
			
			if(!checkNickName()){
				$(".nickname_dialog_modal").show();
				return;
			}
			
			var type = "submitChat";
			var msg = $("#chatMessage").val();
			if(msg == "" || msg == '') {
				alert("请输入要发送的内容");
				return;
			}
			msg = msg.replace(/[\r\n]/g,"");
			try {
				msg = '{"content":"' + msg + '"}';  
				msg = eval("(" + msg + ")");
			} catch (e) {
				alert("数据内容格式错误-" + e);
				throw e;
			}
			
			var i = wg1.send(type, msg, function(e) {
				logEvent("CHANNEL", {
					type : "我：",
					data : e,
					target : {}
				}, '#17bd2f')
			});
			$("#chatMessage").val("");
		}
		
		//窗口互换
		$(".exchange").click(function(){
			var str=$("#videoOne").html();
			var stt=$("#videoTwo").html();
			$("#videoOne").html(stt);
			$("#videoTwo").html(str);
			//$("#eventslog").html("");
		});
		
	})
		
		
	</script>
</body>
</html>