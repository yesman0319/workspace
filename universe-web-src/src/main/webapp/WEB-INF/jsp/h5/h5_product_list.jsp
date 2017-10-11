<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>商品列表</title>
    <meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
    <link rel="stylesheet" href="${cdnPath}/css/h5/product_reset.css"/>
    <link rel="stylesheet" href="${cdnPath}/css/h5/product-list.css"/>
</head>
<body>
<div class="content">
    <ul class="list">
        <c:forEach items="${goodList}" var="ga" varStatus="status">
	        <li class="product">
	            <!--商品图片-->
	            <a href="${cdnPath}/h5/product/pay/share/${ga.id}?campaignContent=uid${userId}&source=weixin" class="" id="${ga.id}">
	               <c:choose>
				       <c:when test="${!empty ga.imgUrl}">
				          <img src="${ga.imgUrl}" alt="${ga.goodName}"/>
				       </c:when>
				       <c:otherwise>
				              <img src="${cdnPath}/img/product-list/list_pic1.jpg" alt="${ga.goodName}"/>
				       </c:otherwise>
                   </c:choose>
	            </a>
	            <!--商品图片-->
	             
	            <p class="title"><a class="title-a"  href="${cdnPath}/h5/product/pay/share/${ga.id}?campaignContent=uid${userId}&source=weixin" class="" id="${ga.id}">${ga.goodName}</a></p>
	            <div class="info">
	            	<p id="teacherName">讲师：${ga.teacherInfo.nameCn}</p>
	                <p>&yen;<span class="price">${ga.localPrice}</p>
	            </div>
	        </li>
        </c:forEach>
    </ul>
</div>
<input type="hidden" id="userId" value="${userId}">
</body>
</html>