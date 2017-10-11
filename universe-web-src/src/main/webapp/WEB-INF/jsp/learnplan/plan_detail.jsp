<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>${plan.name}-精英计划</title>
    <base target="_blank" />
    <%@include file="../include/pub.jsp"%> 
    <link rel="stylesheet" href="${cdnPath}/css/common.css"/>
    <link rel="stylesheet" href="${cdnPath}/css/plan.css"/> 
    <style type="text/css">
    	*{ 
	    font-size:14px; 
	}
    </style>
</head>
<body>
<jsp:include page="../include/header.jsp"></jsp:include>
 
<div class="small_pic" data-top="false" style="background:${plan.imageColor};">
    <div class="small_con" >
        <h2>${plan.name}<span class="student"><i class="stu_i"></i><span class="stu_num">${plan.learnPersonsCount}</span>人在学</span>
        
        <c:choose> 
        			<%-- 已经下架--%>
					<c:when test="${plan.isPublish!=1}"> 
					</c:when>
					<%-- 免费计划  没加入
					<c:when test="${plan.userStatus==1}">
						<a href="${basePath }/plan/user/experience?planid=${plan.id}" target="_self"><span class="status">加入计划</span></a>
					</c:when>
					--%>
					<%-- 免费计划  加入没删除--%>
					<c:when test="${plan.userStatus==12}">
						<a href="${basePath }/exercises/inplan?planid=${plan.id}&dayid=${plan.currentDayId}" target="_blank"  target="_blank" ><span class="status">继续练习</span></a>
					</c:when>
					<%-- 免费计划  加入，删除
					<c:when test="${plan.userStatus==2}">
						<a href="${basePath }/plan/user/experience?planid=${plan.id}" target="_self"><span class="status">加入计划</span></a>
					</c:when>--%>
					<%-- 收费计划  没体验，没加入--%>
					<c:when test="${plan.userStatus==3}">
						 
						<span class="status" id="buyplan2"> 购买计划</span>
					</c:when>
					
					<%-- 体验中没过期 没删除 --%>
					<c:when test="${plan.userStatus==4}">
						<span class="status" id="buyplan2"> 购买计划</span>
					</c:when>
					<%-- 体验中没过期  删除
					<c:when test="${plan.userStatus==5}">
						<a href="${basePath }/plan/user/experience?planid=${plan.id}" target="_self"><span class="status">加入计划</span></a>
					</c:when>--%>
		 			<%-- 体验中已经过期 或者体验中没删除--%>
					<c:when test="${plan.userStatus==6}">
						<span class="status" id="buyplan2"> 购买计划</span>
					</c:when>
					
					<%-- 					体验中已经过期 已删除--%>
					<c:when test="${plan.userStatus==7}">
						<span class="status" id="buyplan2"> 购买计划</span>
					</c:when>
						<%-- 					购买，没删除--%>
					<c:when test="${plan.userStatus==13}">
							<a href="${basePath }/exercises/inplan?planid=${plan.id}&dayid=${plan.currentDayId}" target="_blank" ><span class="status">继续练习</span></a>
					</c:when>
					<%-- 购买，删除
					<c:when test="${plan.userStatus==8}">
						<a href="${basePath }/plan/user/experience?planid=${plan.id}" target="_self"><span class="status">加入计划</span></a>
					</c:when>--%>
					<%-- 					购买已经过期 没删除--%>
					<%-- <c:when test="${plan.userStatus==9}">
						<span class="status" id="buyplan2"> 购买计划</span>
					</c:when> --%>
					<%-- 					购买已经过期 删除 没体验过--%>
					<%-- <c:when test="${plan.userStatus==10}">
						<span class="status" id="buyplan2"> 购买计划</span> 
					</c:when> --%>
					 <%-- 					购买已经过期 删除 体验过--%>
					<%-- <c:when test="${plan.userStatus==11}">
						<span class="status" id="buyplan2"> 购买计划</span>
					</c:when>
					 <c:when test="${plan.userStatus==14}">
						 <span class="status" >等待开始</span>
					</c:when>
					<c:otherwise>
					 
					<span class="status" id="buyplan2"> 购买计划</span> 
					</c:otherwise> --%>
				</c:choose>
        
<%--         <c:choose> --%>
<%--     				<c:when test="${plan.isPay!=1 && plan.userStatus!=6}"> --%>
<%-- 						<a href="${basePath }/plan/user/experience?planid=${plan.id}" target="_self"><span class="status">加入计划</span></a> --%>
<%-- 					</c:when> --%>
					
<%-- 					<c:when test="${plan.userStatus==6||plan.userStatus==1||plan.userStatus==3}"> --%>
<%-- 						<a href="${basePath }/exercises/inplan?planid=${plan.id}&dayid=${plan.currentDayId}" target="_blank" ><span class="status">继续练习</span></a> --%>
<%-- 					</c:when>  --%>
					
<%-- 					<c:otherwise> --%>
<%-- 					<span class="status" id="buyplan1"> 购买计划</span> --%>
<%-- 					<c:if test="${plan.userStatus!=2&&plan.userStatus!=4 }">  --%> 
<%-- 					</c:if> --%>
<%-- 					</c:otherwise> --%>
<%-- 		</c:choose>   --%>

        </h2>
    </div>
</div>
 
		<div class="big_pic">
			<div class="big_con">
				<img src="${plan.bigImage}" alt="学习计划" />
				<div class="position_wrapper">
					<h2>
						${plan.name}<span class="student"><i></i><span class="stu_num">${plan.learnPersonsCount}</span>人在学&nbsp;|&nbsp;
			            <span class="share" id="share_btn12"><i class="share_i" ></i>分享</span></span>
			            <p class="lecturer">讲师： 
			            <c:if test="${teacher==null}">暂无 </c:if>
			        	 <c:if test="${teacher!=null}">${teacher.nameCn } </c:if>
			            </p>
		            </h2>
					<p class="price_con">
						<c:choose>
							<c:when test="${plan.isPay==1}">
								<span class="mon">&yen;</span><span class="price">${plan.localPrice}</span>
							</c:when>
							<c:otherwise> 
								<span class="mon"></span><span class="price" style="font-size:33px;"></span>
							</c:otherwise>
						</c:choose>
					</p>
					<c:choose>
						<%-- 已经下架--%>
						<c:when test="${plan.isPublish!=1}"> 
						</c:when>
						<%-- 免费计划  没加入
						<c:when test="${plan.userStatus==1}">
							<a href="${basePath }/plan/user/experience?planid=${plan.id}" target="_self"><span class="status">加入计划</span></a>
						</c:when>--%>
						<%-- 免费计划  加入没删除--%>
						<c:when test="${plan.userStatus==12}">
							<a href="${basePath }/exercises/inplan?planid=${plan.id}&dayid=${plan.currentDayId}" target="_blank" >
								<span class="status">继续练习</span>
							</a>	
							<span class="have_learn">上次已学至第${plan.currentDayNumber}节</span>       
							         
						</c:when>
						<%-- 免费计划  加入，删除
						<c:when test="${plan.userStatus==2}">
							<a href="${basePath }/plan/user/experience?planid=${plan.id}" target="_self"><span class="status">加入计划</span></a>
						</c:when>--%>
						<%-- 收费计划  没体验，没加入--%>
						<%-- <c:when test="${plan.userStatus==3}">
							<span class="status" id="buyplan1"> 购买计划</span>
	 					</c:when> --%>
						
						<%-- 体验中没过期 没删除 --%>
						<%-- <c:when test="${plan.userStatus==4}">
							<span class="status" id="buyplan1"> 购买计划</span>
							
		                    <span class="have_learn">上次已学至第${plan.currentDayNumber}节</span>
						</c:when> --%>
						<%-- 体验中没过期  删除
						<c:when test="${plan.userStatus==5}">
							<a href="${basePath }/plan/user/experience?planid=${plan.id}" target="_self"><span class="status">加入计划</span></a>
						</c:when>--%>
			 			<%-- 体验中已经过期 或者体验中没删除--%>
					<%-- 	<c:when test="${plan.userStatus==6}">
							<span class="status" id="buyplan1"> 购买计划</span>
						</c:when> --%>
						
						<%-- 					体验中已经过期 已删除--%>
						<%-- <c:when test="${plan.userStatus==7}">
							<span class="status" id="buyplan1"> 购买计划</span>
						</c:when> --%>
							<%-- 					购买，没删除--%>
						<c:when test="${plan.userStatus==13}">
								<a href="${basePath }/exercises/inplan?planid=${plan.id}&dayid=${plan.currentDayId}"><span class="status">继续练习</span></a>
								
		                        <span class="have_learn">上次已学至第${plan.currentDayNumber}节</span>
						</c:when>
						<%-- 购买，删除
						<c:when test="${plan.userStatus==8}">
							<a href="${basePath }/plan/user/experience?planid=${plan.id}" target="_self"><span class="status">加入计划</span></a>
						</c:when>--%>
						<%-- 					购买已经过期 没删除--%>
						<%-- <c:when test="${plan.userStatus==9}">
							<span class="status" id="buyplan1"> 购买计划</span>
						</c:when> --%>
						<%-- 					购买已经过期 删除 没体验过--%>
						<%-- <c:when test="${plan.userStatus==10}">
							<span class="status" id="buyplan1"> 购买计划</span>
	 					</c:when> --%>
						 <%-- 					购买已经过期 删除 体验过--%>
						<%-- <c:when test="${plan.userStatus==11}">
							<span class="status" id="buyplan1"> 购买计划</span>
						</c:when> --%>
						  <%-- 					购买了时间还没有到--%>
						<%-- <c:when test="${plan.userStatus==14}">
							 <span class="status" >等待开始</span>
						</c:when>
						<c:otherwise>
						<span class="status" id="buyplan1"> 购买计划</span> 
				 		</c:otherwise> --%>
					</c:choose>
				</div>
			</div>
		</div>

	</div>

<div class="layout">
    <!--面包屑-->
    <p class="location"><a href="${basePath}/index.html" target="_self">精英计划</a>&gt;
        <a href="${basePath}/plans"  target="_self">学习计划</a>&gt;
        <a class="cur" href="${basePath}/plans/${plan.id}" target="_self">${plan.name}</a></p>
    <div>
        <div class="main fl">
        	<c:choose> 
        			<%-- 已经下架--%>
					<c:when test="${plan.isPublish!=1}"> 
					</c:when>
        <%-- 免费计划  没加入--%>
					<c:when test="${plan.userStatus==1}">
						 
					</c:when>
					<%-- 免费计划  加入没删除--%>
					<c:when test="${plan.userStatus==12}">
						 
					</c:when>
					<%-- 免费计划  加入，删除--%>
					<c:when test="${plan.userStatus==2}">
						 
					</c:when>
					<%-- 收费计划  没体验，没加入--%>
					<c:when test="${plan.userStatus==3}">
						 
					</c:when>
					
<%-- 					体验中没过期 没删除 --%>
					<c:when test="${plan.userStatus==4}">
<!-- 						<div id="tishi" class="tishi" >  -->
<%--         				<p>您现在处于体验期，结束时间为<fmt:formatDate value="${plan.experienceEndTime}" pattern="yyyy-MM-dd HH:mm:ss"/></p> --%>
<!--         				<span class="close" onclick="onTipCloseClick()">&times;</span>  -->
<!--         				</div> -->
					</c:when>
<%-- 					体验中没过期  删除--%>
					<c:when test="${plan.userStatus==5}">
<!-- 						<div id="tishi" class="tishi" >  -->
<!--         				<p>体验已结束,您可以购买学习计划继续练习</p> -->
<!--         				<span class="close" onclick="onTipCloseClick()">&times;</span>  -->
<!--         				</div> -->
					</c:when>
		 <%-- 					体验中已经过期 --%>
					<c:when test="${plan.userStatus==6}">
<!-- 						<div id="tishi" class="tishi" >  -->
<!--         				<p>体验已结束,您可以购买学习计划继续练习</p> -->
<!--         				<span class="close" onclick="onTipCloseClick()">&times;</span>  -->
<!--         				</div> -->
					</c:when>
					
					<%-- 					体验中已经过期 已删除--%>
					<c:when test="${plan.userStatus==7}">
<!-- 						<div id="tishi" class="tishi" >  -->
<!--         				<p>体验已结束,您可以购买学习计划继续练习</p> -->
<!--         				<span class="close" onclick="onTipCloseClick()">&times;</span>  -->
<!--         				</div> -->
					</c:when>
						<%-- 					购买，没删除--%>
					<c:when test="${plan.userStatus==13 && useEndTip}">
						<div id="tishi" class="tishi" >
        				<p>您购买的学习计划即将到期，到期时间为<fmt:formatDate value="${plan.useEndTime}" pattern="yyyy-MM-dd HH:mm:ss"/></p>
        				<span class="close" onclick="onTipCloseClick()">&times;</span>
        				</div>
					</c:when>
					<%-- 					购买，删除--%>
					<c:when test="${plan.userStatus==8}">
						<div id="tishi" class="tishi" >
        				<p>您已删除此学习计划，加入后可继续练习，到期时间为<fmt:formatDate value="${plan.useEndTime}" pattern="yyyy-MM-dd HH:mm:ss"/></p>
        				<span class="close" onclick="onTipCloseClick()">&times;</span>
        				</div>
					</c:when>
					<%-- 					购买已经过期 没删除--%>
					<c:when test="${plan.userStatus==9}">
						<div id="tishi" class="tishi" >
        				<p>学习计划已过期，您可以再次购买后继续练习</p>
        				<span class="close" onclick="onTipCloseClick()">&times;</span>
        				</div>
					</c:when>
					<%-- 					购买已经过期 删除 没体验过--%>
					<c:when test="${plan.userStatus==10}">
						<div id="tishi" class="tishi" >
        				<p>您已删除此学习计划</p>
        				<span class="close" onclick="onTipCloseClick()">&times;</span>
        				</div>
					</c:when>
					 <%-- 					购买已经过期 删除 体验过--%>
					<c:when test="${plan.userStatus==11}">
						<div id="tishi" class="tishi" >
        				<p>您已删除此学习计划</p>
        				<span class="close" onclick="onTipCloseClick()">&times;</span>
        				</div>
					</c:when>
					 
					  <%-- 					购买已经过期 删除 体验过--%>
					<c:when test="${plan.userStatus==11}">
						<div id="tishi" class="tishi" >
        				<p>您已删除此学习计划</p>
        				<span class="close" onclick="onTipCloseClick()">&times;</span>
        				</div>
					</c:when>
					
					 <%-- 					购买了时间还没有到--%>
					<c:when test="${plan.userStatus==14}">
						<div id="tishi" class="tishi" >
        				<p>您购买的学习计划还未开始，开始时间为<fmt:formatDate value="${plan.useStartTime}" pattern="yyyy-MM-dd HH:mm:ss"/></p>
        				<span class="close" onclick="onTipCloseClick()">&times;</span>
        				</div>
					</c:when>
					
					<c:otherwise>
					 
					</c:otherwise>
				</c:choose>
<%--         	<c:choose>  --%>
<%-- 					<c:when test="${plan.userStatus==6}">   --%>
<!--         				<div id="tishi" class="tishi" style="display:none;"> -->
<!--         				<p>免费计划</p> -->
<!--         				<span class="close" onclick="onTipCloseClick()">&times;</span></div> -->
<%-- 					</c:when> --%>
					
<%-- 					<c:when test="${plan.userStatus==1}">  --%>
<!--         				<div id="tishi" class="tishi" > -->
<%--         				<p>您购买的学习计划即将到期，到期时间为<fmt:formatDate value="${plan.useEndTime}" pattern="yyyy-MM-dd HH:mm:ss"/></p> --%>
<!--         				<span class="close" onclick="onTipCloseClick()">&times;</span></div> -->
<%-- 					</c:when> --%>
					
<%-- 					<c:when test="${plan.userStatus==2}">  --%>
<!-- 						<div id="tishi" class="tishi" >  -->
<!--         				<p>您购买的学习计划已经到期，您可以购买计划继续练习</p> -->
<!--         				<span class="close" onclick="onTipCloseClick()">&times;</span></div> -->
<%-- 					</c:when> --%>
					
<%-- 					<c:when test="${plan.userStatus==3}">  --%>
<!-- 						<div id="tishi" class="tishi" >  -->
<%--         				<p>您现在处于体验期，结束时间为<fmt:formatDate value="${plan.experienceEndTime}" pattern="yyyy-MM-dd HH:mm:ss"/></p> --%>
<!--         				<span class="close" onclick="onTipCloseClick()">&times;</span> </div> -->
<%-- 					</c:when> --%>
					
<%-- 					<c:when test="${plan.userStatus==4}">  --%>
<!-- 						<div id="tishi" class="tishi" >        				 -->
<!--         				<p>体验已结束,您可以购买计划继续练习</p> -->
<!--         				<span class="close" onclick="onTipCloseClick()">&times;</span></div>  -->
<%-- 					</c:when> --%>
					
<%-- 					<c:when test="${plan.userStatus==5}">  --%>
<!-- 						<div id="tishi" class="tishi" >       -->
<%--         				<p>您的使用时间还没到，开始时间为<fmt:formatDate value="${plan.useStartTime}" pattern="yyyy-MM-dd HH:mm:ss"/></p> --%>
<!--         				<span class="close" onclick="onTipCloseClick()">&times;</span> </div> -->
<%-- 					</c:when> --%>
<%-- 					<c:otherwise> --%>
<!-- 						<div id="tishi" class="tishi" style="display:none;"> -->
<!--         				<p>无</p> -->
<!--         				<span class="close" onclick="onTipCloseClick()">&times;</span></div> -->
<%-- 					</c:otherwise> --%>
<%-- 				</c:choose>  --%>
			<div class="p_introduct">
                <h2>${plan.name}</h2>
                <div class="introduction">
                	<span>${plan.planSummary }</span>
                	<div id="show_div" style="display: none;">
                		 ${plan.planSummary }
                	</div>
                	<a id="show_btn" style="display: none;">展开&nbsp;&or;</a>
                	<a id="hidden_btn" style="display: none;">收起&nbsp;&and;</a>
                </div>
                
            </div>
        	 <c:if test="${livelessions!=null && livelessions.size()>0}"> 
            <div class="today">
                <h2>今日直播课</h2>
                <ul class="audio_list">
                <c:forEach items="${livelessions }" var="livelession" varStatus="status">
				<li>
                        <i class="audio"></i>
                        <span class="tit">${livelession.name }</span> 
                        <span class="t1">
                            <i class="clock_big"></i>
                            <span class="time">${livelession.startEndTime  }</span>
                        </span> 
                         <c:choose>
									<c:when  test="${livelession.playing  }"> 
                            			<a href="${basePath}/live/${livelession.id}.html" class="play" target="_blank">${livelession.actionName  }<span class="mark">&gt;</span></a>
                      	
									</c:when>
									 
									<c:otherwise>
										<span class="play">${livelession.actionName  }</span> 
									</c:otherwise>
								</c:choose>
                         
                      	 <hr class="line"/>
                    </li>

			</c:forEach>
			 
                </ul>
            </div>
            </c:if> 
            <c:if test="${audioList!=null && audioList.size()>0}"> 
             <div class="yinpin_box">
                <h2>音频<a href="${basePath}/course/audio/${plan.id}" class="more fr">更多<span>&gt;</span></a></h2>
                <ul class="yinpin_box_ul">
                <c:forEach items="${audioList}" var="audio" varStatus="status">
                    <li>
                        <a href="${basePath}/course/audio/${plan.id}?audioId=${audio.id}" class="yinpin_link">
                            <i class="icon_yinpinPlan fl"></i>
                            <span class="yinpin_title fl">${audio.name}</span>
                            <c:if test="${audioStatus ne 1 && audioStatus ne 6 }">
                            <c:if test="${audio.type==1}"><span class="yinpin_free fl">可试听</span></c:if>
                            <c:if test="${audio.type!=1}"><i class="lock fr"></i></c:if>
                            </c:if>
                             <c:if test="${audioStatus eq 1 || audioStatus eq 6 || audio.type==1}">
                              <span class="show fr">立即播放></span>
                             </c:if>
                        </a>
                    </li>
                </c:forEach>
                </ul>
            </div>
            </c:if>
             <c:if test="${videoList!=null && videoList.size()>0}"> 
            <div class="audio_box">
                <h2>视频<a href="${basePath}/courses/${plan.id}/${videoUserStatus.defaultCourseId}/${videoUserStatus.defaultLessionId}/${videoUserStatus.defaultVideoId}?planname=${plan.name}" class="more fr">更多<span>&gt;</span></a></h2>
                <ul class="audio_box_ul">
                <c:forEach items="${videoList }" var="video" varStatus="status">
			 		 <li>
                        
                              <c:choose>
									<c:when  test="${video.canSee=='2'  }">   
										 <a href="${basePath}/courses/${plan.id}/${video.courseId}/${video.lessionId}/${video.videoId}?planname=${plan.name}" class="audio_link">
				                            <i class="icon_audioPlan fl"></i>
				                            <span class="audio_title fl">${video.name}</span>
				                            <span class="audio_free fl">可试看</span> 
				                            <span class="show fr">立即观看></span>
				                        </a>
									</c:when>
									 
									 <c:when  test="${video.canSee=='1'  }">   
										  <a href="${basePath}/courses/${plan.id}/${video.courseId}/${video.lessionId}/${video.videoId}?planname=${plan.name}" class="audio_link">
				                            <i class="icon_audioPlan fl"></i>
				                            <span class="audio_title fl">${video.name}</span>  
				                            <span class="show fr">立即观看></span>
				                        </a>
									</c:when>
									
									<c:otherwise> 
					                            <i class="icon_audioPlan fl"></i>
					                            <span class="audio_title fl">${video.name}</span> 
					                            <i class="lock fr"></i>  
									</c:otherwise>
								</c:choose>
								
					            </li>
			</c:forEach>
			 
                </ul>
            </div>
            </c:if>
            
            
                     
            <div class="plan">
                <h2>计划安排</h2>
                <ul class="plan_list">
                <c:if test="${plan.isFollowTime==1 && planDayList2.size()>0}"> 
	                <p class="weijieshu">未结束</p>
                </c:if>
	                <c:forEach items="${planDayList2 }" var="day" varStatus="status">
				 	<li <c:if test="${!day.unlock  }">title="已锁定，暂时不能练习"</c:if>>
				 		<c:if test="${day.unlock  }"><a href="${basePath }/exercises/inplan?planid=${plan.id}&dayid=${day.id}"></c:if>
                        <div class="left fl">
<%--                         <c:if test="${day.unlock  }"><a href="${basePath }/exercises/inplan?planid=${plan.id}&dayid=${day.id}"></c:if> --%>
                            <p class="ex_title">
		                         <c:choose>
									<c:when test="${day.iconType== 3}"> 
                            			<i class="wan"></i>
									</c:when>
									<c:when test="${day.iconType== 2}"> 
                            			<i class="wan way"></i>
									</c:when>
									<c:otherwise>
										<i class="wan notStart"></i>
									</c:otherwise>
								</c:choose>
                            	<span class="h1">${day.dayNumName }</span><span class="h2">${day.dayName }</span>
                            </p>

                            <p class="ex_detail"><i class="book"></i><span>${day.exercisesString }</span><i class="clock_small"></i><span>${day.timeString }</span>
                            </p>
                            <c:if test="${day.unlock  }"></a></c:if>
                        </div>
                       <div class="right fr" <c:if test="${!day.unlock  }">  style="display:none;"</c:if>>
                       <c:if test="${day.unlock  }"><a href="${basePath }/exercises/inplan?planid=${plan.id}&dayid=${day.id}"></c:if><span>开始练习&gt;</span> <c:if test="${day.unlock  }"></a></c:if></div>
                        <c:if test="${!day.unlock  }"><div class="fr lock"></div></c:if>
						<c:if test="${day.unlock  }"></a></c:if>
                    </li> 
				</c:forEach>
				<!--跟时间走的计划 区分 未结束（还没开始和正在练的）和已结束（练完的）-->
				<c:if test="${plan.isFollowTime==1 && planDayList1.size()>0}"> 
	                 <p class="yijieshu">已结束</p>
                </c:if>
                
	               
                 <c:forEach items="${planDayList1 }" var="day" varStatus="status">
				 	<li <c:if test="${!day.unlock  }">title="已锁定，暂时不能练习"</c:if>>
				 		<c:if test="${day.unlock  }"><a href="${basePath }/exercises/inplan?planid=${plan.id}&dayid=${day.id}"></c:if>
                        <div class="left fl">
<%--                         <c:if test="${day.unlock  }"><a href="${basePath }/exercises/inplan?planid=${plan.id}&dayid=${day.id}"></c:if> --%>
                            <p class="ex_title">
		                         <c:choose>
									<c:when test="${day.iconType== 3}"> 
                            			<i class="wan"></i>
									</c:when>
									<c:when test="${day.iconType== 2}"> 
                            			<i class="wan way"></i>
									</c:when>
									<c:otherwise>
										<i class="wan notStart"></i>
									</c:otherwise>
								</c:choose>
                            	<span class="h1">${day.dayNumName }</span><span class="h2">${day.dayName }</span>
                            </p>

                            <p class="ex_detail"><i class="book"></i><span>${day.exercisesString }</span><i class="clock_small"></i><span>${day.timeString }</span>
                            </p>
                            <c:if test="${day.unlock  }"></a></c:if>
                        </div>
                       <div class="right fr" <c:if test="${!day.unlock  }">  style="display:none;"</c:if>>
                       <c:if test="${day.unlock  }"><a href="${basePath }/exercises/inplan?planid=${plan.id}&dayid=${day.id}"></c:if><span>开始练习&gt;</span> <c:if test="${day.unlock  }"></a></c:if></div>
                        <c:if test="${!day.unlock  }"><div class="fr lock"></div></c:if>
						<c:if test="${day.unlock  }"></a></c:if>
                    </li> 
				</c:forEach>
				

                </ul> 
                
            </div>
            
            
        </div>
        <div class="side fl">
<!--             <div class="teacher"> -->
<%--                 <p class="desc fl">${plan.planSummary }</p> --%>

<!--                 <div class="ava fl"> -->
<%--                     <img src="${plan.teacherAvatar}" alt=""/> --%>
<%--                     <span class="t_name">${plan.teacherName }</span> --%>
<!--                 </div> -->
<!--             </div> -->
            <!--<div class="ex_history">-->
            <!--<i class="clock"></i>-->
            <!--累计练习<span class="day">21</span>天，<span class="hour">20</span>小时-->
            <!--<a href="javascript:;">查看练习历史&gt;</a>-->
            <!--</div>-->
            <c:if test="${plan.userStatus!=1  && plan.userStatus!=2 && plan.userStatus!=3 && plan.userStatus!=5 &&  plan.userStatus!=7 && plan.userStatus!=8 && plan.userStatus!=10 && plan.userStatus!=11 && plan.userStatus!=15}"> 
	            <div class="exercise">
	                <h2>练习情况</h2>
	
	                <div class="ex">
	                    <div class="exe e1">
	                        <p class="detail bold"><span class="green">${plan.hasDoneDay  }/${plan.totalDay  }节</span></p>
	                        <span class="tit">已完成</span>
	                    </div>
	                    <div class="exe e2">
	                        <p class="detail bold"><span class="green">${plan.hasDoneExercises  }题</span></p>
	                        <span class="tit">已做练习</span>
	                    </div>
	                    <div class="exe e3">
	                        <p class="detail bold"><span class="green">${plan.hasDoneTime  }</span><span class="bold"></span></p>
	                        <span class="tit">总用时</span>
	                    </div>
	                    <!--<div class="e4" style="width:190px;">
	                     
	                        <span class="tit">上次已学至第${plan.currentDayNumber}节</span>
	                    </div>-->
	                </div>
	            </div>
            </c:if>
            <div class="others">
                <h2>大家都在练</h2>
                <ul class="others_list">
                <c:forEach items="${planUsers }" var="user" varStatus="status">
				  <a href="${basePath }/user/${user.userid}.html"><li><img src="${user.avatar}" alt="头像"/>
                        <p class="other_name">${user.nickname}</p></li></a>
				</c:forEach> 
                </ul>
            </div> 
			<c:if test="{informationList!=null && informationList.size()>0}">
            <div class="resource">
                <h2>相关资料推荐</h2>
                <ul class="resource_list">
                <c:forEach items="${informationList }" var="information" varStatus="status">
				 	 <li>
                        <i class="ic_${information.icon}"></i> 
                        <a href="${basePath}/docs/${information.informationId}" target="_blank"><h3>${information.name}</h3></a>
                        <p>下载：<span>${information.downloadCount}次</span>&nbsp;&nbsp;&nbsp;&nbsp;上传：<span>${information.uploadData }</span></p>
                    </li>
				</c:forEach>
				
                     
                </ul>
            </div>
            </c:if>
        </div>
    </div>
    
    <div class="share_qrcode_modal">
			<div class="share_dialog">
				<h2>
 					分享到微信
 					<span class="close_btn"></span>
				</h2>
				<%-- <img src="${cdnPath}/i/live/share_qrcode.png" class="share_qrcode" /> --%>
				<img src="${basePath}/h5/qrcode.html?code_url= ${basePath}/h5/plan/share/${plan.id}.html${shareValue}" alt="" class="share_qrcode" >
				<ul class="share_tips" >
					<li>1. 打开微信，"扫一扫"二维码</li>
					<li>2. 点击弹出页面右上角的分享按钮</li>
				</ul>
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
					<a href="${basePath}/plans/${plan.id }?buyend=1" class="pay_confirm" target="_self"> 已完成支付</a>
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
					<a  onClick="showBuyTip()" class="pay_confirm"> 重新支付</a> 
			 
			</div>	
 		</div>
	</div>
</div> 

<jsp:include page="../include/footer.jsp"></jsp:include>
<script type="text/javascript">

// <input id="planid" hidden="true" value="${plan.id}" /> 
// 	<input id="isBuyEnd" hidden="true" value="${isBuyEnd}" /> 
	var planidVal = "${plan.id}";
	var isBuyEndVal = "${isBuyEnd}";
	function showBuyTip(){
		var planid = planidVal;
		var url = window.xiaoma.basePath+"/plan/user/buy?planid="+planid;
		window.open(url); 
		$("#payResult_fail").hide();
		$("#payResult_wait").show();
	}

	function onTipCloseClick() {
		$("#tishi").hide();
	}

	$(function() {
		var isBuyEnd = isBuyEndVal; 
		if(isBuyEnd=="1"){ 
			$("#payResult_fail").show(); 
		}
		

		$("#buyplan1").click(showBuyTip);
		$("#buyplan2").click(showBuyTip); 
		
		$("#share_btn12").click(function() {
			$(".share_qrcode_modal").show();
		})
		//点击关闭按钮清除蒙版
		$(".close_btn").click(function(){
			$(this).parent().parent().parent().hide();
		})
			 
		$(window).scroll(function () {
            var h1 = $(".header").outerHeight() + $(".big_pic").outerHeight();
            if ($(window).scrollTop() >= h1) {
                if ($(".small_pic").attr("data-top") == "false") {
                    $(".small_pic").attr("data-top","true").stop().slideDown(800);
                }
            }
            if($(window).scrollTop()<h1){
                if ($(".small_pic").attr("data-top") == "true") {
                    $(".small_pic").attr("data-top","false").stop().slideUp(800);
                }
            }
        });
        
		// $("#show_div").find("*").attr("style",""); 
			
		
        //展开收起按钮
        var $sBtn = $("#show_btn");
        var $hBtn = $("#hidden_btn");
        var $spanBox = $(".introduction>span");
        var $showDiv = $("#show_div");
        var $introContent = $spanBox.text();
		if($introContent.length >= 115){
			$spanBox.text($introContent.substring(0,107) + "...");
			$sBtn.show();
			$sBtn.click(function(){
				$sBtn.hide().next().show();
				$spanBox.hide().next().show();
			})
			$hBtn.click(function(){
				$spanBox.text($introContent.substring(0,107) + "...").show();
				$showDiv.hide().next().show();
				$hBtn.hide();
			})
		}else{
			$spanBox.text($introContent);
		}	
			
		
	});
</script>
</body>
</html>










