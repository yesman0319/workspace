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
    <div class="layout_con">
    	<c:if test="${not empty  livelessionList}">
        <div class="play">
            <div class="play_con fl">
                <div style="height:224px;overflow:hidden;">
                    <h2>近期直播课<!--  a href="javascript:;" class="more fr">更多<span>&gt;</span></a--></h2>
                    <ul class="play_list">
                    	<c:forEach var="item" items="${livelessionList}">
	                        <li class="play_item">
	                            <div class="date fl">
	                                <span class="day cur">${item.position }</span>
	                                <span class="hours cur"><fmt:formatDate value="${item.startTime}" pattern="HH:mm"/>-<fmt:formatDate value="${item.endTime}" pattern="HH:mm"/></span>
	                            </div>
	                            <div class="t1 fl">
	                                <span class="green"></span>
	                                <div class="t2">
	                                    <p class="tab">
	                                        <span class="h" title="【${item.categoryName}】${item.name}">【${item.categoryName}】${item.name}</span>
	                                        <span class="teacher"><i class="t_icon"></i>${item.teacherName}</span>
	                                        <c:if test="${item.status==2}">
	                                        	<span class="student"><i class="audio"></i><span class="stu_num">${item.viewNum}</span>人听课</span>                                 
	                                        	<a href="${basePath}/live/${item.id}.html" target="_blank">  <span class="btn  start">直播中</span></a>
	                                        </c:if>
	                                         <c:if test="${item.status ==3 || item.status == 4}">
	                                         	<span class="btn" style="cursor: inherit;">未开始</span>
	                                         </c:if>                                  
	                                    </p>
	                                    <hr class="xu"/>
	                                </div>
	                            </div>
	                        </li>
                        </c:forEach>                   
                    </ul>
                </div>
            </div>
            <div class="user_con fl">
               <c:if test="${not empty sessionScope.userInfo}">     
	                <div class="ava">
	                    <img class="fl" 
	                    <c:if test="${empty userInfo.avatar}">src="${cdnPath}/i/plan/def_ava.png"</c:if>
	                    <c:if test="${not empty  userInfo.avatar}">src="<c:url value="${userInfo.avatar}"/>"</c:if>
	                    alt="我的头像"/>
	                    <span class=" fl nickname">
						    <c:if test="${not empty userInfo.nickname}">${userInfo.nickname}</c:if>
            				<c:if test="${empty  userInfo.nickname}">${userInfo.phone}</c:if>
						</span>
	                </div>
	                <div class="ex_his">
	                    <div class="ex_item">
	                        <p class="total_box"><span class="t36">${myPlanMap.insistDays}</span>天</p>
	                        <span class="t14">坚持练习</span>
	                    </div>
	                    <span class="spit"></span>
	                    <div class="ex_item">	                    
	                        <p class="total_box"><span class="t36">${myPlanMap.hasDoneTimeNum}</span>${myPlanMap.hasDoneTimeStr}<c:if test="${empty myPlanMap.hasDoneTimeStr}">时</c:if></p>
	                        <span class="t14">累计练习</span>
	                    </div>
	                    <span class="spit"></span>
	                    <div class="ex_item">
	                        <p class="total_box"><span class="t36">${myPlanMap.hasDoneNumber}</span>题</p>
	                        <span class="t14">已练习</span>
	                    </div>
	                </div> 
                </c:if>
                <c:if test="${empty  sessionScope.userInfo}">                            
                	<div class="register_box">您处于未登录状态，<a href="<c:url value="/login"/>" class="goRegister" target="_blank">去登录</a></div>
                </c:if>
            </div>
        </div>
        </c:if>
        <div class="learn_plan">
            <h2>学习计划<a href="<c:url value="/plans"/>" class="more fr" target="_blank">更多<span>&gt;</span></a></h2>
            <ul class="plan_list">
            	<c:forEach var="item" items="${planList}">
	                <li class="plan_item" value="${item.id}" >
	                    <a href="<c:url value="/plans/${item.id}"/>" target="_blank" title="${item.name}"><img src="${item.imageWebList}" alt="学习计划"/><i class="sale <c:if test="${item.isPay==1}">pay</c:if><c:if test="${item.isPay==0}">free</c:if>"></i>
	                    <p><span class="plan_name" title="${item.name}">${item.name}</span><span class="study_num fr"><i class="audio"></i>${item.learnNumber}人在学</span></p>
	                    <p class="lecturer">讲师：
	                    <c:if test="${item.teacher==null}">暂无</c:if>
        	 			  <c:if test="${item.teacher!=null}">${item.teacher.nameCn } </c:if>
	                    </p>
	                    </a>
	                </li>
                </c:forEach>
            </ul>
        </div>
        <div class="main">
            <div class="leftSide fl">
                <div class="down">
                    <h2>资料下载<a href="<c:url value="/docs"/>" class="more fr" target="_blank">更多<span>&gt;</span></a></h2>
                    <ul class="down_list"> 
                    <c:forEach var="category" items="${categoryList }">
                    	<c:if test="${category.id==2 or category.id ==1 or category.id ==3 }">
                    		
	                      <li class="down_list_li"><img src="${cdnPath}<c:if test="${category.id==3}">/i/index/down1.png</c:if><c:if test="${category.id==1}">/i/index/down2.png</c:if><c:if test="${category.id==2}">/i/index/down3.png</c:if>" alt="机经资料下载"/>
	                      		<c:forEach var="item" items="${category.infoList}" varStatus="var">
	                      			<c:if test="${var.index==0}">
			                            <div class="tit">
			                                <a href='<c:url value="/docs/${item.id}"/>' target="_blank" title="${item.name}">
			                                	<c:set var="docLength" value="${fn:length(item.name)}"/>
			                                	<c:if test="${docLength>10}">			                               
					                                <p class="f20" style="margin-top:30px;height:25px;line-height:25px;">${fn:substring(item.name, 0, 10)}</p>
					                                <p class="f20" style="margin-right: 45px;height:25px;line-height:25px;">${fn:substring(item.name, 10, docLength)}</p>
				                               </c:if>
				                               <c:if test="${docLength < 11}">
				                               		<p class="f20" style="height:110px;line-height:110px;" >${item.name}</p>		                               
				                               </c:if>
			                                </a>
			                            </div>
			                             <ul class="desc_list">
		                            </c:if>
			                       <c:if test="${var.index!=0}">
			                            <li class="desc_list_li">●&nbsp;&nbsp;<a href='<c:url value="/docs/${item.id}"/>' target="_blank" title="${item.name}">${item.name}</a></li>			                           
			                        </c:if>
		                        </c:forEach>
		                        	</ul>
	                        </li>
	                        </c:if>
                        </c:forEach>                   
                </div>
                <div class="learn_audio">
                    <h2>视频课程
                   	 <c:if test="${show!=null&&show=='0' }"> <a href="<c:url value="/courses/list"/>" class="more fr" id="more_video" target="_blank">更多<span>&gt;</span></a> </c:if> 
                    </h2>
                    <ul class="audio_list">
                    	<c:forEach var="item" items="${videoCourseList}">
	                    	 <li class="audio_list_li" value="${item.id }" >
	                    	 	<a href="<c:url value="/courses/${item.id }"/>" target="_blank" title="${item.name}" >
		                            <img src="${item.coverPhoto }" alt="视频课程" />
		                            <div class="dark">
		                                <i class="audio_rou"></i>
		                            </div>
		                            <p class="audio_tit" >${item.name}</p>
		                            <p class="text"><i class="audio"></i><span class="learn_num">${item.totalView}</span>人在学<span class="lecturer fr">讲师：
		                            <c:if test="${item.teacher==null}">暂无</c:if>
        	 			 			<c:if test="${item.teacher!=null}">${item.teacher.nameCn } </c:if>
		                            </span></p>
	                            </a>
	                        </li>
                    	</c:forEach>                    
                    </ul>
                </div>

            </div>
            <div class="rightSide fl">
            	<c:if test="${not empty  recommendExerciseList}">
	                <div class="key">
	                    <!--<h2>练习推荐<a href="javascript:;" class="more fr">更多<span>&gt;</span></a></h2>-->
	                    <h2>练习推荐</h2>
	                    <ul class="key_item">
	                    	<c:forEach var="item" items="${recommendExerciseList}">
		                        <li>
		                            <p class="item_sort">${item.moduleName}<span class="item_title">${item.groupName}<c:if test="${item.moduleId==17 || item.moduleId==18}"> <c:if test="${item.category ==1 }">小范围</c:if><c:if test="${item.category ==2 }">大范围</c:if></c:if>-${item.sequenceNumber}</span></p>
		                            <a href="${basePath}/exercises/notinplan?planid=${item.planId}&dayid=${item.planDayId}&exerciseid=${item.planDayExerciseId}" class="check_out" target="_blank"><p class="item_content">${item.content}</p></a>
		                        </li>
	                        </c:forEach>                        
	                    </ul>
	                    <hr class="line"/>
	                </div>
                </c:if>
                <div class="other">
                    <h2>大家都在做</h2>
                    <ul class="other_list">
                    	<c:forEach var="item" items="${peoplePracticingList }">
	                    	<li class="other_li">
	                            <div class="d1 fl"><a href="<c:url value="/user/${item.userId}.html"/>" target="_blank" title="${item.nickName}<c:if test="${empty item.nickName and not empty item.userName}">${fn:substring(item.userName,0,3)}****${fn:substring(item.userName,7,-1)}</c:if>"><img src="${item.userPicture}" alt="我的头像"/></a></div>
	                            <div class="d2 fl">
	                                <p class="uName">${item.nickNameStr}<c:if test="${empty item.nickName and not empty item.userName}">${fn:substring(item.userName,0,3)}****${fn:substring(item.userName,7,-1)}</c:if></p>
	                                <p class="lesson">在学习<a href="${basePath}/exercises/notinplan?planid=${item.planId}&dayid=${item.planDayId}&exerciseid=${item.planDayExerciseId}" target="_blank" title="${item.moduleName}${item.originName}"><span class="lesson_name fr">${item.moduleName}${item.originName}</span></a></p>
	                            </div>
	                            <div class="d3 fl">
	                                <span class="time">${item.timeStr}</span>
	                            </div>
	                        </li>
                    	</c:forEach>                    
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>
<jsp:include page="./include/footer.jsp"></jsp:include>
</body>
</html>