<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="/padding" prefix="padding"%>

<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>个人中心</title>   
    <%@include file="../include/pub.jsp"%>
    <link rel="stylesheet" href="${cdnPath}/css/common.css"/>
    <link rel="stylesheet" href="${cdnPath}/css/userProfile.css"/>
    <link rel="stylesheet" href="${cdnPath}/js/lib/Jcrop/jquery.Jcrop.min.css"/>
</head>
<body>
<%@include file="../include/header.jsp"%>
<div class="layout">
    <div class="main">
		<%@include file="../include/leftMenu.jsp"%>
        <div class="right" id="right_box">
            <!--视频课程-->
            <div class="rightSide video_div fl" style="">
                <p class="location"><a class="user_href" href="javascript:;">个人中心</a>><a class="down_href"
                   href="javascript:;">学习计划</a>
                </p>

                <ul class="list">
                
                <c:forEach items="${plans }" var="plan" varStatus="status">
				 <li>
						<a href="${basePath}/plans/${plan.planId }" ><img src="${plan.listImage}" class="plan_img" /></a>
						<div class="desc">
							<div class="left">
								<a href="${basePath}/plans/${plan.planId }" ><h3 class="plan_title">${plan.name}</h3></a>
								<a href="javascript:;" class="test_time">
									<b style="background: url(${cdnPath}/i/time_icon.png) no-repeat center;"></b>
									&nbsp;${plan.lastDoTimeLong}</a>
								<p>
								<c:choose>
									<c:when test="${plan.userStatus==1 || plan.userStatus==3 || plan.userStatus==6}">  
										<a href="${basePath}/exercises/inplan?planid=${plan.planId }&dayid=${plan.currentDayId }" class="continue">继续学习</a>
									</c:when>
									 
									<c:otherwise> 
									</c:otherwise>
								</c:choose>
								</p>
							</div>
							<div class="middle"> 
								<p class="price">
									<c:choose> 
									<c:when test="${plan.isPay== 0}"> 
                            			 免费
									</c:when>
									<c:otherwise>
										<i class="rmb_icon"></i>
										${plan.localPrice}
									</c:otherwise>
								</c:choose>
									
								</p>
								<a href="javascript:;" class="study_progress">
									<b style="background: url(${cdnPath}/i/plan_icon.png) no-repeat center;"></b>
									&nbsp;已学至&nbsp;第${plan.currentDayNumber }节&nbsp;&nbsp; ${plan.currentDayName }</a>
							</div>
							<div class="right" style="width:196px;">
								<p class="delete" onclick="deletePlan('${basePath}/plan/user/delete?planid=${plan.id }')" title="删除"></p>
								<p class="date">
									上次练习时间&nbsp;:&nbsp;<span id="last_time">${plan.lastDoTime==null?"":plan.lastDoTime }<span>
								</p>
							</div>
						</div>	
					</li>

			</c:forEach> 
			
					 
				</ul>
				 
    			<padding:padding pagintInfo="${paddingInfo}" /> 
            </div>
            </div>
        </div>
    </div>
</div>
<jsp:include page="../include/footer.jsp"></jsp:include>
<script type="text/javascript" src="${cdnPath}/js/lib/Jcrop/jquery.Jcrop.min.js"></script>
<script charset="utf-8" type="text/javascript" src="${cdnPath}/js/userProfile/userProfile.js"></script>
<script type="text/javascript">
	 function deletePlan(delurl){
		 if(confirm("是否确认删除"))
			{ 
				window.location.href=delurl;
			}
	 }
	$(function() { 
		$("#menu_myplan").addClass("cur");
		 
	});
</script> 
</body>
</html>