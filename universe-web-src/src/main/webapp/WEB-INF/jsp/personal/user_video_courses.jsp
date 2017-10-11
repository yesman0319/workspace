<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>个人中心-视频课程</title>
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
                   href="javascript:;">视频课程</a>
                </p>

               <ul class="list">
               		<c:forEach items="${list}" var="list" >
	               		<li>
							<a href="javascript:;">
								<input type="hidden"  value="${list.id}"/>
           					 	<input type="hidden" value="${list.partsId}"/>
								<img src="${list.coverPhoto}" class="plan_img" />
							</a>
							<div class="desc">
								<div class="left">
									<input type="hidden"  value="${list.id}"/>
           					 		<input type="hidden" value="${list.partsId}"/>
									<h3 class="plan_title">${list.name}</h3>
									<a href="javascript:;" class="video_num">
										<b style="background: url(../i/video_icon.png) no-repeat center;"></b>
										&nbsp;已看<span id="video_num">${list.count}</span>个视频</a>
									<input type="hidden"  value="${list.id}"/>
           					 		<input type="hidden" value="${list.partsId}"/>
           					 		<c:if test="${list.isOverDue==0}"><p><a href="javascript:;" class="continue">继续观看</a></p></c:if>
									<c:if test="${list.isOverDue==1}"><p>已过期</p></c:if>
									<c:if test="${list.isOverDue==2}"><p>等待开始</p></c:if>
								</div>
								<div class="middle">
									<p class="price">
									<c:if test="${list.price!='免费'}">
										<i class="rmb_icon"></i>
									</c:if>
										${list.price}
									</p>
									<c:if test="${list.lessionName!=null&&list.lessionName!=''}">		
										<input type="hidden"  value="${list.id}"/>
	           					 		<input type="hidden" value="${list.partsId}"/>
	           					 		<c:if test="${list.isOverDue!=2}">
											<a href="javascript:;" class="study_progress" >
												<b style="background: url(../i/plan_icon.png) no-repeat center;"></b>
												&nbsp;已学至&nbsp;${list.lessionName}</a>
										</c:if>
									</c:if>
								</div>
									<div class="right" style="width:175px">
										<p class="delete" title="${list.id}"></p>
											<c:if test="${list.isOverDue!=2}">
												<c:if test="${list.lastWatch!=null&&list.lastWatch!=''}">		
													<p class="date">
														上次观看时间&nbsp;:&nbsp;<span id="last_time" >${list.lastWatch}<span>
													</p>
												</c:if>
											</c:if>
									</div>

							</div>	
						</li>
               		</c:forEach>
				</ul>
				<c:if test="${list!=null && fn:length(list) > 0}">
					<div style="margin-top:20px;width:810px;text-align:center;">
						<%@ taglib uri="/padding" prefix="padding"%>
						<padding:padding pagintInfo="${paddingInfo}" /> 
	                </div>
                </c:if>
            </div>
        </div>
    </div>
</div>
<jsp:include page="../include/footer.jsp"></jsp:include>
<script type="text/javascript" src="${cdnPath}/js/lib/Jcrop/jquery.Jcrop.min.js"></script>
<script charset="utf-8" type="text/javascript" src="${cdnPath}/js/userProfile/user_video_course.js"></script>
</body>
</html>