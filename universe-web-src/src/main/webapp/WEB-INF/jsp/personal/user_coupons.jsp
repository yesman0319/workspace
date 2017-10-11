<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>个人中心-我的优惠券</title>
     <%@include file="../include/pub.jsp"%>
    <link rel="stylesheet" href="${cdnPath}/css/common.css"/>
    <link rel="stylesheet" href="${cdnPath}/css/userProfile.css"/>
    <link rel="stylesheet" href="${cdnPath}/js/lib/Jcrop/jquery.Jcrop.min.css"/>
    <style type="text/css">
	   .no-coupons{
		text-align: center;
		padding: 200px 0 55px 0;
		display: none;
	   }
	   .no-coupons img{
		width: 35px;
		height: 25px;
	  }
	   .no-coupons p{
		font-size: 16px;
		color: #767676;
		margin-top: 10px;
	  }
	  .no-coupons p span{
		font-size: 16px;
		color: #767676;
	  }
    </style>
</head>
<body>
<%@include file="../include/header.jsp"%>
<div class="layout">
    <div class="main">
		<%@include file="../include/leftMenu.jsp"%>
        <div class="right" id="right_box">
            <div class="rightSide coupons-div fl">
                <p class="location"><a class="user_href" href="">个人中心</a>><a class="down_href"
                   href="">我的优惠券</a>
                </p>
				<div class="coupons-div">
					<ul>
					 <c:forEach items="${couponList}" var="coupon">
		                 <c:if test="${coupon.status == 1 or coupon.status == 2}">
	                          <li class="c-usable">
								<span class="c-price">
									<i class="c-price-icon0"></i>
									${coupon.facePrice}
								</span>
								<div class="c-usable-range">${coupon.couponName}</div>
								<div class="c-start-time">生效时间 : <span><fmt:formatDate value="${coupon.beginTime}" pattern="yyyy-MM-dd"/></span></div>
								<div class="c-end-time">到期时间 : <span><fmt:formatDate value="${coupon.endTime}" pattern="yyyy-MM-dd"/></span></div>
							  </li>
						  </c:if>
						  <c:if test="${coupon.status == 0 and coupon.isUsed == 0}">
	                          <li class="c-unusable">
								<span class="c-price">
									<i class="c-price-icon1"></i>
									${coupon.facePrice}
								</span>
								<div class="c-usable-range">${coupon.couponName}</div>
								<div class="c-start-time">生效时间 : <span><fmt:formatDate value="${coupon.beginTime}" pattern="yyyy-MM-dd"/></span></div>
								<div class="c-end-time">过期时间 : <span><fmt:formatDate value="${coupon.endTime}" pattern="yyyy-MM-dd"/></span></div>
								<div class="c-use-time">使用时间 : <span><fmt:formatDate value="${coupon.userTime}" pattern="yyyy-MM-dd"/></span></div>
							  </li>
						  </c:if>
						  <c:if test="${coupon.status == 0 and coupon.isUsed == 1}">
	                          <li class="c-overdue">
								<span class="c-price">
									<i class="c-price-icon1"></i>
									${coupon.facePrice}
								</span>
								<div class="c-usable-range">${coupon.couponName}</div>
								<div class="c-start-time">生效时间 : <span><fmt:formatDate value="${coupon.beginTime}" pattern="yyyy-MM-dd"/></span></div>
								<div class="c-end-time">过期时间 : <span><fmt:formatDate value="${coupon.endTime}" pattern="yyyy-MM-dd"/></span></div>
							  </li>
						  </c:if>   
			         </c:forEach> 
					</ul>
					
					  <!--没有优惠券时显示此div-->
					  <div class="no-coupons" id="no_coupons">
						<p>暂时没有优惠券哦~</p>
			          </div>
				</div>
            </div>
        </div>
    </div>
</div>
<input type="hidden" id="couponNum" value="${fn:length(couponList)}"/>
<jsp:include page="../include/footer.jsp"></jsp:include>
<script type="text/javascript" src="${cdnPath}/js/lib/Jcrop/jquery.Jcrop.min.js"></script>
<script charset="utf-8" type="text/javascript" src="${cdnPath}/js/userProfile/userProfile.js"></script>
<script type="text/javascript">
if($("#couponNum").val() == 0){
	document.getElementById("no_coupons").style.display="block";
}
</script>
</body>
</html>