<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/padding" prefix="padding"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>学习计划-精英计划</title> 
    <%@include file="../include/pub.jsp"%>   
    <link rel="stylesheet" href="${cdnPath}/css/common.css"/>
    <!--<link rel="stylesheet" href="${cdnPath}/css/userProfile.css"/>-->
    <link rel="stylesheet" href="${cdnPath}/css/plan_list.css"/>
</head>
<body>
<jsp:include page="../include/header.jsp"></jsp:include>
<div class="planlist_tag">
	<div class="inner_wrap">
		<p class="location"><a href="${basePath}/index.html" target="_self">精英计划</a>&nbsp;&gt;
	        <a class="cur" href="${basePath}/plans">学习计划</a>
	    </p> 
	    <ul>
	    	<li class="plantag_item  <c:if test="${lId == 0 }">active</c:if>"  >
	    		<a href="/plans">全部</a>
	    	</li>
	    	<c:forEach var="label" items="${labels }">
		    	<li class="plantag_item <c:if test='${label.id == lId }'>active</c:if>" >
		    		<a href="/plans?labelId=${label.id }&lId=${label.id }">${label.name }</a>
		    	</li>
	    	</c:forEach>
	    </ul>
	</div>
	
</div>
<div class="layout">
    <!--面包屑-->
    <div class="new-hot">
    	<span class="plantag_type  <c:if test='${newType == 1 }'>active</c:if>" onclick="go(1)">最新
    	</span>
    	<span class="plantag_type <c:if test='${hotType == 1 }'>active</c:if>" onclick="go(2)">最热
    	</span>
    </div>
    <ul class="plan_list" style="overflow:hidden">
		<c:forEach items="${plans }" var="plan" varStatus="status">
			<li class="plan_item"><a href="${basePath}/plans/${plan.id }" target="_blank"><img
					src="${plan.imageWebList}" alt="学习计划" /></a>
				<p>
					<span class="plan_name">${plan.name }</span>
					<span class="lecturer">讲师：
					  <c:if test="${plan.teacher==null}">暂无</c:if>
    	 			  <c:if test="${plan.teacher!=null}">${plan.teacher.nameCn } </c:if>
					</span>
					<c:choose>
						<c:when test="${plan.isPay== 1}">
							<span class="price">&yen;${plan.localPrice}</span>
						</c:when>
						<c:otherwise>
							<span class="free">免费</span>
						</c:otherwise>
					</c:choose>

					<span class="study_num fr"><i class="audio"></i>${plan.learnNumber}人在学</span>
				</p>
			</li>

		</c:forEach> 
    </ul>  
    <padding:padding pagintInfo="${paddingInfo}" /> 
</div>
<jsp:include page="../include/footer.jsp"></jsp:include>
</body>
<script>
	/* selectTag("plantag_item");
	selectTag("plantag_type");

	function selectTag(ele){
		$("."+ele).each(function(i,v){
			if(i == 0){
				v.classList.add("active");
			}
			v.onclick = function(){
				$(v).addClass("active").siblings().removeClass("active");
			}
		})
	} */
	function go(type){
		if(type == 1){
			window.location.href="/plans?newType=1&labelId=${lId}&lId=${lId}";
		}else{
			window.location.href="/plans?hotType=1&labelId=${lId}&lId=${lId}";
		}
	}
	
</script>
</html>