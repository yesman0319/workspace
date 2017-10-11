<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
 
<div class="banner">
    <div class="inner">
        ${dayInfo.planName}
        <div class="action">
            <div class="action_item share" id="exercise-share" style="display: none;">
        		<hr class="spit"/>
                <i></i>
                <span>分享练习</span>
            </div>
            <hr class="spit"/>
            <div class="action_item app">
                <i></i>
                <span>App练习</span>
                <div class="QR-download">
                    <p id="app-text">精英计划APP下载</p>
                    <p id="app-type">iPhone / Android</p> 
                    <img src="${basePath}/h5/qrcode.html?code_url= ${app_down_url}" alt="" class="share_qrcode" >
                </div>
            </div>
            <hr class="spit"/>
            <a href="${basePath }/plans/${planid}">
            <div class="action_item end">
                <i></i>
                <span>结束练习</span>
            </div></a>
            <hr class="spit"/>
        </div>
    </div>
</div>
<div class="side1">
        <h2 style="margin:0;">计划列表 </h2>
        <ul class="plan_list">
            <li class="plan_li">
                <div class="h1">
                    <h3><span class="ex_part">第${dayInfo.dayNumber }节</span><span class="article_tit">${dayInfo.dayName }</span><span class="locked"
                                                                                                    style="display:none;"></span><span
                            class="close">&and;</span><span class="open">&or;</span></h3>

                    <p class="complete"><i></i>已完成<span class="scale">${doneCount }/${totalCount }</span>题</p>
                </div>
                <ul class="details_list" style="display: block;">
                
                
                
               <c:if test="${kindExercises.size()>0 }">
               		<c:forEach items="${kindExercises }" var="exercises" varStatus="status">
	                    <li class="details_li">
	                        <div class="h2">●<span class="ex_name">${exercises.name }</span><span class="ex_time">（预计${exercises.estimateTime }分钟）</span></div>
	                        <ul class="ex_list">
	                        <c:forEach items="${exercises.exerciseList }" var="exerciseVO" varStatus="status">
	                        	<li id="exerciseItem_${exerciseVO.id }" class="ex_li">
	                        	 
	                        			 <a class="ex_li_a"  href ="${basePath}/exercises/inplan?planid=${planid }&dayid=${dayInfo.dayId  }&exerciseid=${exerciseVO.id }<c:if test="${exerciseVO.isDone>0}">&result=1</c:if>">
	              
	                        	 <c:choose>
				    				<c:when test="${exerciseVO.reachTheStandard>0}"> 
	                        			<i class="cir_ok" id="listItem_${exerciseVO.id }"></i>
									</c:when> 
									<c:otherwise> 
	                        			<i class="cir_gray" id="listItem_${exerciseVO.id }"></i>
									</c:otherwise>
								</c:choose>  
	                        	<c:choose>
				    				<c:when test="${exerciseVO.isDoing>0}"> 
	                        			<span class="desc doing" title="${exerciseVO.moduleName }&nbsp;${exerciseVO.originName }" >${exerciseVO.moduleName }&nbsp;${exerciseVO.originName }</span>
									</c:when> 
									<c:otherwise> 
	                        			<span class="desc" title="${exerciseVO.moduleName }&nbsp;${exerciseVO.originName }" >${exerciseVO.moduleName }&nbsp;${exerciseVO.originName }</span>
									</c:otherwise>
	                        	 </c:choose>  
	                        	 </a>
	                        	 <c:if test="${exerciseVO.isMustDo>0 }"><span class="definiteMark">必做</span></c:if>
	                        	 
	                        	</li>
	                        </c:forEach> 
	                        </ul>
	                    </li>
	                </c:forEach> 
               </c:if>
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
                
<%--                 <c:if test="${prepList.size()>0 }">
	                    <li class="details_li">
	                        <div class="h2">●<span class="ex_name">预习</span><span class="ex_time">（预计${prepTime }分钟）</span></div>
	                        <ul class="ex_list">
	                        <c:forEach items="${prepList }" var="exerciseVO" varStatus="status">
	                        	<li id="exerciseItem_${exerciseVO.id }" class="ex_li">
	                        	 
	                        			 <a class="ex_li_a"  href ="${basePath}/exercises/inplan?planid=${planid }&dayid=${dayInfo.dayId  }&exerciseid=${exerciseVO.id }<c:if test="${exerciseVO.isDone>0}">&result=1</c:if>">
	              
	                        	 <c:choose>
				    				<c:when test="${exerciseVO.reachTheStandard>0}"> 
	                        			<i class="cir_ok" id="listItem_${exerciseVO.id }"></i>
									</c:when> 
									<c:otherwise> 
	                        			<i class="cir_gray" id="listItem_${exerciseVO.id }"></i>
									</c:otherwise>
								</c:choose>  
	                        	</i>
	                        	<c:choose>
				    				<c:when test="${exerciseVO.isDoing>0}"> 
	                        			<span class="desc doing" title="${exerciseVO.moduleName }&nbsp;${exerciseVO.originName }" >${exerciseVO.moduleName }&nbsp;${exerciseVO.originName }</span>
									</c:when> 
									<c:otherwise> 
	                        			<span class="desc" title="${exerciseVO.moduleName }&nbsp;${exerciseVO.originName }" >${exerciseVO.moduleName }&nbsp;${exerciseVO.originName }</span>
									</c:otherwise>
	                        	 </c:choose>  
	                        	 </a>
	                        	 <c:if test="${exerciseVO.isMustDo>0 }"><span class="definiteMark">必做</span></c:if>
	                        	 
	                        	</li>
	                        </c:forEach> 
	                        </ul>
	                    </li>
                    </c:if>
                    
                	<c:if test="${listeningList.size()>0 }">
	                    <li class="details_li">
	                        <div class="h2">●<span class="ex_name">听力</span><span class="ex_time">（预计${listeningTime }分钟）</span></div>
	                        <ul class="ex_list">
	                        <c:forEach items="${listeningList }" var="exerciseVO" varStatus="status">
	                        	<li id="exerciseItem_${exerciseVO.id }" class="ex_li">
	                        	 
	                        			 <a class="ex_li_a"  href ="${basePath}/exercises/inplan?planid=${planid }&dayid=${dayInfo.dayId  }&exerciseid=${exerciseVO.id }<c:if test="${exerciseVO.isDone>0}">&result=1</c:if>">
	              
	                        	 <c:choose>
				    				<c:when test="${exerciseVO.reachTheStandard>0}"> 
	                        			<i class="cir_ok" id="listItem_${exerciseVO.id }"></i>
									</c:when> 
									<c:otherwise> 
	                        			<i class="cir_gray" id="listItem_${exerciseVO.id }"></i>
									</c:otherwise>
								</c:choose>  
	                        	</i>
	                        	<c:choose>
				    				<c:when test="${exerciseVO.isDoing>0}"> 
	                        			<span class="desc doing" title="${exerciseVO.moduleName }&nbsp;${exerciseVO.originName }" >${exerciseVO.moduleName }&nbsp;${exerciseVO.originName }</span>
									</c:when> 
									<c:otherwise> 
	                        			<span class="desc" title="${exerciseVO.moduleName }&nbsp;${exerciseVO.originName }" >${exerciseVO.moduleName }&nbsp;${exerciseVO.originName }</span>
									</c:otherwise>
	                        	 </c:choose>  
	                        	 </a>
	                        	  <c:if test="${exerciseVO.isMustDo>0 }"><span class="definiteMark">必做</span></c:if>
	                        	</li>
	                        </c:forEach> 
	                        </ul>
	                    </li>
                    </c:if>
                    
                    <c:if test="${speakingList.size()>0 }">
	                    <li class="details_li">
	                        <div class="h2">●<span class="ex_name">口语</span><span class="ex_time">（预计${speakingTime }分钟）</span></div>
	                        <ul class="ex_list">
	                        <c:forEach items="${speakingList }" var="exerciseVO" varStatus="status">
	                        	<li id="exerciseItem_${exerciseVO.id }" class="ex_li"> 
	                        			<a class="ex_li_a"  href ="${basePath}/exercises/inplan?planid=${planid }&dayid=${dayInfo.dayId  }&exerciseid=${exerciseVO.id }<c:if test="${exerciseVO.isDone>0}">&result=1</c:if>">
	              
	                        	 <c:choose>
				    				<c:when test="${exerciseVO.reachTheStandard>0}"> 
	                        			<i class="cir_ok" id="listItem_${exerciseVO.id }"></i>
									</c:when> 
									<c:otherwise> 
	                        			<i class="cir_gray" id="listItem_${exerciseVO.id }"></i>
									</c:otherwise>
								</c:choose>  
	                        	</i>
	                        	<c:choose>
				    				<c:when test="${exerciseVO.isDoing>0}"> 
	                        			<span class="desc doing" title="${exerciseVO.moduleName }&nbsp;${exerciseVO.originName }" >${exerciseVO.moduleName }&nbsp;${exerciseVO.originName }</span>
									</c:when> 
									<c:otherwise> 
	                        			<span class="desc" title="${exerciseVO.moduleName }&nbsp;${exerciseVO.originName }" >${exerciseVO.moduleName }&nbsp;${exerciseVO.originName }</span>
									</c:otherwise>
	                        	 </c:choose>  
	                        	 </a>
	                        	  <c:if test="${exerciseVO.isMustDo>0 }"><span class="definiteMark">必做</span></c:if>
	                        	</li>
	                        </c:forEach> 
	                        </ul>
	                    </li>
                    </c:if>
                    
                     <c:if test="${readingList.size()>0 }">
	                    <li class="details_li">
	                        <div class="h2">●<span class="ex_name">阅读</span><span class="ex_time">（预计${readingTime }分钟）</span></div>
	                        <ul class="ex_list">
	                        <c:forEach items="${readingList }" var="exerciseVO" varStatus="status">
	                        	<li id="exerciseItem_${exerciseVO.id }" class="ex_li">
	                        	 
	                        			  <a class="ex_li_a"  href ="${basePath}/exercises/inplan?planid=${planid }&dayid=${dayInfo.dayId  }&exerciseid=${exerciseVO.id }<c:if test="${exerciseVO.isDone>0}">&result=1</c:if>">
	                        	 
	                        	 <c:choose>
				    				<c:when test="${exerciseVO.reachTheStandard>0}"> 
	                        			<i class="cir_ok" id="listItem_${exerciseVO.id }"></i>
									</c:when> 
									<c:otherwise> 
	                        			<i class="cir_gray" id="listItem_${exerciseVO.id }"></i>
									</c:otherwise>
								</c:choose>  
	                        	</i>
	                        	<c:choose>
				    				<c:when test="${exerciseVO.isDoing>0}"> 
	                        			<span class="desc doing" title="${exerciseVO.moduleName }&nbsp;${exerciseVO.originName }" >${exerciseVO.moduleName }&nbsp;${exerciseVO.originName }</span>
									</c:when> 
									<c:otherwise> 
	                        			<span class="desc" title="${exerciseVO.moduleName }&nbsp;${exerciseVO.originName }" >${exerciseVO.moduleName }&nbsp;${exerciseVO.originName }</span>
									</c:otherwise>
	                        	 </c:choose>
	                        	 </a>  
	                        	  <c:if test="${exerciseVO.isMustDo>0 }"><span class="definiteMark">必做</span></c:if>
	                        	</li>
	                        </c:forEach> 
	                        </ul>
	                    </li>
                    </c:if>
                    
                    
                    <c:if test="${writingList.size()>0 }">
	                    <li class="details_li">
	                        <div class="h2">●<span class="ex_name">写作</span><span class="ex_time">（预计${writingTime }分钟）</span></div>
	                        <ul class="ex_list">
	                        <c:forEach items="${writingList }" var="exerciseVO" varStatus="status">
	                        
	                        	<li id="exerciseItem_${exerciseVO.id }" class="ex_li">
	                        	 
	                        			 <a class="ex_li_a"  href ="${basePath}/exercises/inplan?planid=${planid }&dayid=${dayInfo.dayId  }&exerciseid=${exerciseVO.id }<c:if test="${exerciseVO.isDone>0}">&result=1</c:if>">
	                        	 
	                        	 <c:choose>
				    				<c:when test="${exerciseVO.reachTheStandard>0}"> 
	                        			<i class="cir_ok" id="listItem_${exerciseVO.id }"></i>
									</c:when> 
									<c:otherwise> 
	                        			<i class="cir_gray" id="listItem_${exerciseVO.id }"></i>
									</c:otherwise>
								</c:choose>  
	                        	</i>
	                        	<c:choose>
				    				<c:when test="${exerciseVO.isDoing>0}"> 
	                        			<span class="desc doing" title="${exerciseVO.moduleName }&nbsp;${exerciseVO.originName }" >${exerciseVO.moduleName }&nbsp;${exerciseVO.originName }</span>
									</c:when> 
									<c:otherwise> 
	                        			<span class="desc" title="${exerciseVO.moduleName }&nbsp;${exerciseVO.originName }" >${exerciseVO.moduleName }&nbsp;${exerciseVO.originName }</span>
									</c:otherwise>
	                        	 </c:choose>  
	                        	 </a>
	                        	 <c:if test="${exerciseVO.isMustDo>0 }"><span class="definiteMark">必做</span></c:if>
	                        	</li>
	                        </c:forEach> 
	                        </ul>
	                    </li>
                    </c:if>  --%>
                </ul>
            </li>
              
        </ul>
    </div>
 