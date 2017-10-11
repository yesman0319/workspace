<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>个人中心</title>
     <%@include file="../include/pub.jsp"%>
    <link type="text/css" rel="stylesheet" href="${cdnPath}/css/common.css"/>
    <link rel="stylesheet" href="${cdnPath}/css/personal_center.css" />
    <link rel="stylesheet" href="${cdnPath}/js/lib/Jcrop/jquery.Jcrop.min.css"/>  
</head>
<body>
<%@include file="../include/header.jsp"%>
<div class="layout bar">
	<div class="main">
		<div class="leftSide mod">
			<div class="info">
				<div class="avatar">
					<img src="${not empty taUserInfo.avatar ?  taUserInfo.avatar : cdnPath.concat('/i/plan/def_ava.png') }" alt="头像"/>
				</div>				
				<p class="nicknames">${taUserInfo.nickname}<c:if test="${empty taUserInfo.nickname and not empty taUserInfo.username}">${fn:substring(taUserInfo.username,0,3)}****${fn:substring(taUserInfo.username,7,-1)}</c:if></p>
			</div>
			
			<ul class="details">
				<li>
					<b style="background: url(${cdnPath}/i/plan_icon.png) no-repeat center;"></b>
					<a href="javascript:;" class="items">参与计划</a>
					<span class="num">
						<span class="count">${myPlanMap.takePartInPlanNumber}</span>  个 
					</span>
				</li>
				<li>
					<b style="background: url(${cdnPath}/i/days_icon.png) no-repeat center;"></b>
					<a href="javascript:;" class="items">练习天数</a>
					<span class="num">
						<span class="count">${myPlanMap.insistDays}</span>  天 
					</span>
				</li>
				<li>
					<b style="background: url(${cdnPath}/i/time_icon.png) no-repeat center;"></b>
					<a href="javascript:;" class="items">练习时长</a>
					<span class="num">					
						<span class="count">${myPlanMap.hasDoneTimeNum}</span>  ${myPlanMap.hasDoneTimeStr}<c:if test="${empty myPlanMap.hasDoneTimeStr}">时</c:if>
					</span>
				</li>
				<li>
					<b style="background: url(${cdnPath}/i/paper_icon.png) no-repeat center;"></b>
					<a href="javascript:;" class="items">练习题数</a>
					<span class="num">
						<span class="count">${myPlanMap.hasDoneNumber}</span>  题 
					</span>
				</li>
			</ul>
		</div>			
		<div class="rightSide">
		<div class="plan mod">
			<h2 class="title">
				<div class="greenBar"></div>
				<span class="wota">Ta</span>的学习计划
			</h2>
			<ul class="list">
				<c:forEach var="item" items="${planList.rows}">
					<li>
						<a href="${cdnPath}/plans/${item.planId}" target="_blank"><img src="${item.imageWebList}" width="84" height="54"/></a>
						<div class="desc">
							<div class="left">
								<a class="plan_title" href="${cdnPath}/plans/${item.planId}" target="_blank">${item.name}</a>
								<a class="test" target="_blank">
									<b style="background: url(${cdnPath}/i/paper_icon.png) no-repeat center;"></b>
									&nbsp;${item.userStatitic.totalExerciseCount}题</a>
								<span  class="time">
									<b style="background: url(${cdnPath}/i/time_icon.png) no-repeat center;"></b>
									&nbsp;预计${item.userStatitic.estimateTimeStr }</span>
							</div>
							<div class="right">
								<p class="date"><fmt:formatDate  value="${item.updateTime}"  pattern="yyyy-MM-dd" /></p>
								<p class="add">加入计划</p>
							</div>
						</div>	
					</li>
				</c:forEach>
				<c:if test="${empty myPlanMap.customPlanVOS or fn:length(myPlanMap.customPlanVOS) == 0}"><div class="nothingAll">没有任何动态</div></c:if>			
			</ul>
		</div>
			
			<div class="video mod">
				<h2 class="title">
					<div class="greenBar"></div>
					<span class="wota">Ta</span>观看的视频
				</h2>
				<ul class="list">
					<c:forEach var="item" items="${videoCourseList}">
					<li>
						<a id="video_box" href="${cdnPath}/courses/${item.courseId}/${item.partId}?type=iscontinue&lessionId=${item.lessionId}&videoId=${item.videoId}"  target="_blank">						
							<img src="${item.imgUrl }" width="85" height="55"/>
						</a>
						<div class="desc">
							<div class="left">
								<a class="plan_title" href="${cdnPath}/courses/${item.courseId}/${item.partId}?type=iscontinue&lessionId=${item.lessionId}&videoId=${item.videoId}" target="_blank">${item.lessionName }</a>
								<a class="resource" target="_blank">
									<b style="background: url(${cdnPath}/i/video_icon.png) no-repeat center;"></b>
									&nbsp;${item.courseName }</a>
							</div>
							<div class="right">
								<p class="date">${item.timeStr }</p>
							</div>
						</div>	
					</li>
					</c:forEach>
					<c:if test="${empty videoCourseList or fn:length(videoCourseList) == 0}"><div class="nothingAll">没有任何动态</div></c:if>								
				</ul>
			</div>
			
			<div class="record mod">
				<h2 class="title">
					<div class="greenBar"></div>
					<span class="wota">Ta</span>练习记录
				</h2>
				<ul class="list">
					<c:forEach var="item" items="${exerciseHistoryList}">
						<li>
							<div class="tingli_icon">
								<a href="${basePath}/exercises/notinplan?planid=${item.planId}&dayid=${item.planDayId}&exerciseid=${item.planDayExerciseId}" target="_blank"><img src="${cdnPath}/i/tingli_icon (1).png" /></a>
							</div>
							<div class="desc">
								<div class="left">
									<a href="${basePath}/exercises/notinplan?planid=${item.planId}&dayid=${item.planDayId}&exerciseid=${item.planDayExerciseId}" target="_blank" class="plan_title">${item.moduleName} ${item.originName }</a>
									<a target="_blank" class="resource">
									<b style="background: url(${cdnPath}/i/paper_icon.png) no-repeat center;"></b>
										&nbsp;${item.planName}</a>
								</div>
								
								<div class="right">
									<p class="date">${item.timeStr}</p>
								</div>
							</div>	
						</li>
					</c:forEach>
					<c:if test="${empty exerciseHistoryList or fn:length(exerciseHistoryList) == 0}"><div class="nothingAll">没有任何动态</div></c:if>		
				</ul>
			</div>
			<div class="download mod">
				<h2 class="title">
					<div class="greenBar"></div>
					<span class="wota">Ta</span>的下载
				</h2>
				<ul class="list">
					<c:forEach var="item" items="${downloadHistoryList }">
						<li>
							<div class="tingli_icon">
								<a href='<c:url value="/docs/${item.infoId}"/>' target="_blank"><i class="${item.fileType}"></i></a>
							</div>
							<div class="desc">
								<div class="left">
									<a class="plan_title" href='<c:url value="/docs/${item.infoId}"/>' target="_blank">${item.infoName}</a>									
										<a target="_blank" class="resource">
											<b style="background: url(${cdnPath}/i/paper_icon.png) no-repeat center;"></b>
											&nbsp;${item.infoDescription}<c:if test="${empty  item.infoDescription}">暂无简介</c:if></a>
										
								</div>
								<div class="right">
									<p class="date">${item.timeStr}</p>
								</div>
							</div>	
						</li>
					</c:forEach>
					<c:if test="${empty downloadHistoryList or fn:length(downloadHistoryList) == 0}"><div class="nothingAll">没有任何动态</div></c:if>					
				</ul>
			</div>
		</div>
	</div>
</div>
<jsp:include page="../include/footer.jsp"></jsp:include>
<script type="text/javascript" src="${cdnPath}/js/lib/Jcrop/jquery.Jcrop.min.js"></script>
</body>
</html>