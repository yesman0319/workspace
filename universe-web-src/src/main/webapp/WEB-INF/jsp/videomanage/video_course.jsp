<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>${videocourses.name} - 视频课程</title>
    <link rel="stylesheet" href="${cdnPath}/css/common.css"/>
    <link rel="stylesheet" href="${cdnPath}/css/video_course.css"/>
    <!--<link rel="stylesheet" href="../js/lib/jcrop/jquery.Jcrop.min.css"/>-->
    	<%@include file="../include/pub.jsp"%>
</head>
<body>
<jsp:include page="../include/header.jsp"></jsp:include>
<div class="layout">
	<div class="main">
			<p class="location">
				<a class="user_href" href="${basePath }">精英计划</a> > 
				<a class="list_href" href="${basePath }/courses/list">视频课程</a> > 
				<a class="down_href" href="${basePath }/courses/${videocourses.id}">${videocourses.name}</a>
				<input type="hidden" id="courseId" value="${videocourses.id}"/>
				<input type="hidden" id="goodId" value="${videocourses.goodId}"/>
				<input type="hidden" id="premissionId" value="${videocourses.premissionId}"/>
				<input type="hidden" id="price" value="${videocourses.price}"/>
				<input type="hidden" id="hasBuy" value="${videocourses.hasBuy}"/>
				<input type="hidden" id="lastPartsId" value="${videocourses.lastPartId}"/>
				<input type="hidden" id="hasDone" value="${hasDone}"/>
				<input type="hidden" id="publishStatus" value="${videocourses.publishStatus}"/>
				
           </p>
		<div class="top_title">
			<img src="${videocourses.coverPhoto }" class="top_title_img"/>
			<div class="top_title_desc">
				<div class="desc_l">
					<p class="title_name">${videocourses.name}</p>
					<p class="lecturer">讲师：
					<c:if test="${videocourses.teacher==null}">暂无</c:if>
        	 		<c:if test="${videocourses.teacher!=null}">${videocourses.teacher.nameCn } </c:if>
        	 		</p>
					<span class="lesson_price">
					<c:if test="${videocourses.price=='免费'}"></c:if>
					<c:if test="${videocourses.price!='免费'}"><i class="brmb_icon"></i> ${videocourses.price}元</c:if>
					</span>
					<p class="btns">
						<a href="javascript:;" class="buy_btn" id="watch_btn" style="display: none">继续观看</a>
						<a href="javascript:;" class="buy_btn" id="del_join_btn" style="display: none">加入课程</a>
						<a href="javascript:;" class="buy_btn" id="free_join_btn" style="display: none">加入课程</a>
						<a href="javascript:;" class="buy_btn" id="buy_btn" style="display: none">购买课程</a>
<!-- 						<a href="javascript:;" id="free_btn" class="free_btn" style="display: none">免费体验</a> -->
						<a href="javascript:;" id="wait_btn" class="buy_btn" style="display: none">等待开始</a>
						<a href="javascript:;" id="hasdown_btn" class="buy_btn" style="display: none">已下架</a>
						<c:if test="${videocourses.lessionName!=null&&videocourses.lessionName!=''}">
							<span id="studyto" style="display:none;position: relative;left: 15px;height: 19px; font-size: 14px; color: #767676;">已经学至${videocourses.lessionName}</span>
						</c:if>
					</p>
				</div>
				<div class="desc_r">
					<a href="javascript:;">
						<b class="join_icon"></b>
						<span id="join_num">${videocourses.totalView}</span> 人加入
					</a>
					<span class="cutline">|</span>
					<a href="javascript:;">
						<b class="video_icon"></b>
						<span id="lesson_num">${videocourses.totalClass}</span> 节课程
					</a>
					<span class="cutline">|</span>
					<a href="javascript:;" id="share_btn">
						<i class="share_icon" ></i>
					</a>
				</div>
			</div>
		</div>
		<div class="content_box">
			<div class="content_left">
				<c:if test="${videocourses.tips!=null&&videocourses.tips!=''}">
				<div class="tips">
					<span id="tips_content">
						${videocourses.tips}
					</span>
					<i class="close"></i>
				</div>
				</c:if>
				<c:forEach items="${listvideogroups}" var="groups">
					<ul class="jichu section">
					<h2>
						<p class="greenBar"></p>
						${groups.name}
					</h2>
					<c:forEach items="${groups.listVideoParts}" var="parts">
						<li title="${parts.id}" >
							<div class="video_box" data-cansee="${parts.canSee}" >
								<a href="javascript:;"><img src="${ parts.imgUrl}" /></a>
								<div class="lock_modal">		
									<c:if test="${parts.canSee=='需要购买后观看'}"><i class="lock_icon"></i><p>${parts.canSee}</p></c:if>
									<c:if test="${parts.canSee!='需要购买后观看'}">${parts.canSee}</c:if>
								</div>
							</div>
							<p class="video_type" data-cansee="${parts.canSee }" title="${parts.name}">${parts.name}</p>
							<p class="video_num">
								<b class="video_icon"></b>
								<span id="video_num">${parts.totalViews}</span> 个视频
							</p>
							<input type="hidden" id="${parts.id}_lastWatchId" value="${parts.lastWatchId}"/>
						</li>
					</c:forEach>
					
				</ul>
				</c:forEach>
			</div>
			<div class="content_right">
			<!--讨论区入口  -->
				<c:if test="${not empty node }">
					<a style="outline: none;"  target="_blank" href="${basePath}/topic/topics?videoId=${videocourses.id}&nodeId=${node.nodeId}"><div id="goToDis"><i class="icon-in"></i>进入讨论区</div></a>
				</c:if> 
			
				<h2>				
					<p class="greenBar"></p>
					课程简介
				</h2>
				<div class="introduction">
					<span>${videocourses.infoWeb}</span>
                	<div id="v_show_div" style="display: none;">
                		${videocourses.infoWeb}
                	</div>
                	<a id="v_show_btn" style="display: none;">展开&nbsp;&or;</a>
                	<a id="v_hidden_btn" style="display: none;">收起&nbsp;&and;</a>
				</div>
				<c:if test="${!empty  listvideocourses}">
				<h2>
					<p class="greenBar"></p>
					该课程的同学还加入了
				</h2>
				<ul class="join_list">
					<c:forEach items="${listvideocourses}" var="courses">
						<li class="item">
						<a href="${basePath }/courses/${courses.id}">
							<img src="${courses.coverPhoto }" />
						</a>
							<div class="desc">
								<a href="${basePath }/courses/${courses.id}">
								<p class="lesson_name">
									${courses.name }
								</p>
								</a>
								<p>
									<b class="join_icon"></b>
									<span id="join_num">${courses.totalView }</span> 人加入
								</p>
								<p>
									<b class="video_icon"></b>
									<span id="video_num">${courses.totalClass }</span> 个视频
								</p> 
							</div>
					</li>
					</c:forEach>
				</ul>
				</c:if>
			</div>
		</div>
	</div>
	 		<!--支付成功或失败提示框-->	
 		<div id="payResult_wait" class="payResult_modal">
			<div class="payResult_dialog">
				<h2>
 					产品购买
 					<span class="close_btn"></span>
				</h2> 
					<span class="payResult_tips">请在新打开的页面完成支付</span>
					<a  id="hasPay" href="javascript:;" class="pay_confirm"> 已完成支付</a>
			</div>	
 		</div> 
 		
 		<!--支付成功或失败提示框-->	
 		<div id="payResult_fail" class="payResult_modal">
			<div class="payResult_dialog">
				<h2>
 					产品购买
 					<span class="close_btn"></span>
				</h2>
					<span class="payResult_tips">未完成支付，请尝试重新支付</span>
					<a href="javascript:;" onClick="showBuyTip()" class="pay_confirm"> 重新支付</a> 
			 
			</div>	
 		</div>
</div>
		<div class="share_qrcode_modal" >
			<div class="share_dialog">
				<h2>
 					分享到微信
 					<span class="close_btn"></span>
				</h2>
				<%-- <img src="${cdnPath}/i/live/share_qrcode.png" class="share_qrcode" /> --%>
				<img src="${basePath}/h5/qrcode.html?code_url= ${basePath}/courses/h5/${videocourses.id}.html${shareValue}" alt="" class="share_qrcode" >
				<ul class="share_tips" >
					<li>1. 打开微信，"扫一扫"二维码</li>
					<li>2. 点击弹出页面右上角的分享按钮</li>
				</ul>
			</div>
 		</div>
<jsp:include page="../include/footer.jsp"></jsp:include>
<script type="text/javascript" src="${cdnPath}/js/lib/Jcrop/jquery.Jcrop.min.js"></script>
<script charset="utf-8" type="text/javascript" src="${cdnPath}/js/userProfile/userProfile.js"></script>
<script charset="utf-8" type="text/javascript" src="${cdnPath}/js/videomanage/video_course.js"></script>
<script type="text/javascript">
	
	$(function(){
	//动态设置video_box的高度
		//点击扫描弹出二维码
		$("#share_btn").click(function(){
			$(".share_qrcode_modal").show();
		});
		//点击关闭按钮清除蒙版
		$(".close_btn").click(function(){
			$(this).parent().parent().parent().hide();
		});
		
		//展开收起按钮
        var $sBtn = $("#v_show_btn");
        var $hBtn = $("#v_hidden_btn");
        var $spanBox = $(".introduction>span");
        var $showDiv = $("#v_show_div");
        var $introContent = $spanBox.text();
		if($introContent.length >= 145){
			$spanBox.text($introContent.substring(0,143) + "...");
			$sBtn.show();
			$sBtn.click(function(){
				$sBtn.hide().next().show();
				$spanBox.hide().next().show();
			})
			$hBtn.click(function(){
				$spanBox.text($introContent.substring(0,143) + "...").show();
				$showDiv.hide().next().show();
				$hBtn.hide();
			})
			$(".introduction").css("padding-bottom","30px");
		}else{
			$spanBox.text($introContent);
		}	
	})
	</script>
</body>
</html>