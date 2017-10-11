<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head lang="en">
	<meta charset="UTF-8">
	<jsp:include page="./include/pub.jsp"></jsp:include>
	<title>精英计划-首页</title>
	<link type="text/css" rel="stylesheet" href="${cdnPath}/css/common.css"/>
	<link rel="stylesheet" href="${cdnPath}/css/index.css"/>
</head>
<body>
<jsp:include page="./include/header.jsp"></jsp:include>
<div class="layout">
    <%-- <div class="banner"><img src="${cdnPath}/i/index/ban.png" alt="精英计划"/></div> --%>
    <div class="user_status">
    	<div class="user_con hvr-underline-from-center">
           	<c:if test="${not empty sessionScope.userInfo}">     
                <div class="ava status_mod">
                    <img class="fl" 
                    <c:if test="${empty userInfo.avatar}">src="${cdnPath}/i/plan/def_ava.png"</c:if>
                    <c:if test="${not empty  userInfo.avatar}">src="<c:url value="${userInfo.avatar}"/>"</c:if>
                    alt="我的头像"/>
                    <span class=" fl nickname">
					    <c:if test="${not empty userInfo.nickname}">${userInfo.nickname}</c:if>
        				<c:if test="${empty  userInfo.nickname}">${userInfo.phone}</c:if>
					</span>
                </div>
                <div class="ex_his status_mod">
                    <div class="ex_item">
                        <p class="total_box"><span class="t36">${myPlanMap.exerciseDays}</span>天</p>
                        <span class="t14">已练天数</span>
                    </div>
                   <%--  <div class="ex_item" style="display: none">
                        <p class="total_box"><span class="t36">${myPlanMap.insistDays}</span>天</p>
                        <span class="t14">坚持练习</span>
                    </div> --%>
                    <span class="spit"></span>
                    <div class="ex_item">	                    
                        <p class="total_box"><span class="t36">${myPlanMap.hasDoneTimeNum}</span>${myPlanMap.hasDoneTimeStr}<c:if test="${empty myPlanMap.hasDoneTimeStr}">时</c:if></p>
                        <span class="t14">已练时间</span>
                    </div>
                    <%-- <span class="spit"></span>
                    <div class="ex_item">
                        <p class="total_box"><span class="t36">${myPlanMap.hasDoneNumber}</span>题</p>
                        <span class="t14">已练习</span>
                    </div> --%>
                </div>
                <div class="ex_continue status_mod">
				<c:if test="${myPlanMap.userDefaultPlanId != 0}">
                	<a id="ex_continue_button" class="ex_continue_button" href="/plans/${myPlanMap.userDefaultPlanId}">开始练习</a>
				</c:if>
                </div>
            </c:if>
            <c:if test="${empty  sessionScope.userInfo}">                            
            	<div class="register_box">您处于未登录状态，<a href="<c:url value="/login"/>" class="goRegister" target="_blank">去登录</a></div>
            </c:if>
        </div>
   	</div>
    <div class="layout_con">
    	<ul class="plan_tag">
    		<li>
    			<a href="/index.html" class="hvr-radial-out <c:if test='${labelId == 0}'>active</c:if>">全部</a> 
    		</li>
    		<c:forEach items="${yztfPlanLabelList}" var="yztfPlanLabel"> 
	    		<li>
	    			<a href="/index.html?labelId=${yztfPlanLabel.id}" class="hvr-radial-out <c:if test='${yztfPlanLabel.id == labelId }'>active</c:if>">${yztfPlanLabel.name}</a>
	    		</li>
    		</c:forEach>
    		
    	</ul>
        <div class="learn_plan">
            <!--<h2>学习计划<a href="<c:url value="/plans"/>" class="more fr" target="_blank">更多<span>&gt;</span></a></h2>-->
            <ul class="plan_list">
            	<c:forEach var="item" items="${planList}">
	                <li class="plan_item" value="${item.id}" >
	                    <a class="hvr-grow-shadow" href="<c:url value="/plans/${item.id}"/>" target="_blank" title="${item.name}">
	                    	<div class="bgicon_wrapper">
	                    		<i class="plan_bgicon cihui" style="background-image:url('${item.imageWebList}')"></i>
	                    	</div>
	                    	<!--<img src="${item.imageWebList}" alt="学习计划"/>-->
	                    	<!--<i class="sale <c:if test="${item.isPay==1}">pay</c:if><c:if test="${item.isPay==0}">free</c:if>"></i>-->
		                    <p class="plan_name_wrapper" style="background:#${item.imageWebColor}">
		                    	<span class="plan_name" title="${item.name}">${item.name}</span>
		                    </p>
		                    <div class="go_tips">
		                    	<span><i class="fa fa-hand-o-right"></i>开始练习<i class="fa fa-hand-o-left"></i></span>
		                    </div>
	                    </a>
	                </li>
                </c:forEach>
            </ul>
        </div>
    </div>
</div>
<jsp:include page="./include/footer.jsp"></jsp:include>
</body>
</html>