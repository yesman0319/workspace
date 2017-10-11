<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
  
    <div class="fix_foot">

        <div class="m">
            <div class="tip" 
             <c:choose>
				<c:when test="${show_tip}">  
				</c:when>
				 
				<c:otherwise>
					style="display:none;"
				</c:otherwise>
			</c:choose>
		>
                <h2>欢迎使用精英计划 <span class="darkClose">&times; </span></h2>

                <p class="tip_text">点击这里可以看到本节所有练习题哦！加油吧！</p>
                <span class="triangle"></span>
            </div>
            <span class="show"></span>
            <span class="m_name">${dayInfo.dayName }</span>

            <div class="bar"><p class="moveBar" style="left:${doneCount/totalCount*100*(1-1/totalCount)}%;width:${1/totalCount*100 }%;"></p></div>
            <c:if test="${nextExercise!=null }"><a class="next_btn" href="${basePath}/exercises/inplan?planid=${planid }&dayid=${dayInfo.dayId }&exerciseid=${nextExercise.id }">下个练习</a></c:if>
            
        </div>

    </div>
     