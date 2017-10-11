<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/padding" prefix="padding"%>

<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>商品列表-精英计划</title> 
    <%@include file="../include/pub.jsp"%>   
    <link rel="stylesheet" href="${cdnPath}/css/common.css"/>
    <link rel="stylesheet" href="${cdnPath}/css/product_list.css"/>
</head>
<body>
<jsp:include page="../include/header.jsp"></jsp:include>
<div class="layout">
    <!--
    <p class="location"><a href="${basePath}/index.html" target="_self">精英计划</a>&nbsp;&gt;
        <a class="cur" href="${basePath}/goods">商品列表</a>
    </p> 面包屑-->
    <ul class="plan_list" style="overflow:hidden">
			<c:forEach items="${goodList }" var="good" varStatus="status">
				<li class="plan_item">
					<!--商品图片-->
		            <a href="${cdnPath}/web/product/pay/get?goodId=${good.id}" class="" id="${good.id}" title="${good.goodName}">
			               <c:choose>
						       <c:when test="${!empty good.imgUrl}">
						          <img src="${good.imgUrl}" alt="${good.goodName}"/>
						       </c:when>
						       <c:otherwise>
						              <img src="${cdnPath}/img/product-list/list_pic1.jpg" alt="${good.goodName}"/>
						       </c:otherwise>
		                    </c:choose>
				            <!--商品图片-->
							<p>
								<span class="plan_name">${good.goodName}</span>
								<span class="price">&yen;${good.localPrice}</span>
							</p>
					 </a>
				</li>
		</c:forEach> 
    </ul>  
</div>
<padding:padding pagintInfo="${paddingInfo}" /> 
<jsp:include page="../include/footer.jsp"></jsp:include>
</body>
</html>