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
         <!--练习历史-->
        <div class="right" id="right_box">
            <div class="rightSide practice_div fl" >
                <p class="location"><a class="user_href" href="javascript:;">个人中心</a>><a class="down_href"
                                                                                         href="javascript:;">练习历史</a>
                </p>
 
				<ul class="list">
					 
					 <c:forEach items="${exerciseList }" var="exercise" varStatus="status"> 
				  <li>
						<div class="tingli_icon">
							 <img src="${cdnPath}/i/tingli_icon (1).png" /> 
						</div>
						<div class="desc">
							<div class="left">
								<h3>${exercise.moduleName }&nbsp;${exercise.originName }</h3>
								 
									<b style="background: url(${cdnPath}/i/paper_icon.png) no-repeat center;"></b>
									&nbsp;${exercise.planName } 
							</div>
							<div class="middle">
								<a href="${basePath }/exercises/notinplan?planid=${exercise.planId}&dayid=${exercise.planDayId}&exerciseid=${exercise.id }&result=1" class="check_out">查看结果</a>
								<a href="javascript:;" class="delete_record"  onclick="deleteHistory('${basePath}/exercises/delete?planid=${exercise.planId}&dayid=${exercise.planDayId}&exerciseid=${exercise.id }')" title="删除" >删除记录</a>
							</div>
							<div class="right">
								<span class="day"><fmt:formatDate value="${exercise.startTime }" pattern="yyyy-MM-dd HH:mm"/></p></span>
							</div>
						</div>	
					</li> 

			</c:forEach> 
				</ul>	
                <div style="margin-top:20px;width:810px;text-align:center;">
                 
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
	function deleteHistory(delurl){
		 if(confirm("是否确认删除"))
			{ 
				window.location.href=delurl;
			}
	}
	$(function() { 
		$("#menu_exercise_history").addClass("cur");
		
		 
	});
</script> 
</body>
</html>