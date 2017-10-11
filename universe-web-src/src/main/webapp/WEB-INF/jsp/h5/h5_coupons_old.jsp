<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>优惠券</title>
		<%@include file="../include/pub.jsp"%>
		<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
		<link rel="stylesheet" href="${cdnPath}/css/h5/h5_shopping_reset.css" />
		<link rel="stylesheet" href="${cdnPath}/css/h5/h5_coupons.css" />		
 
	</head>   
	<body>
		<ul class="coupons-ul" id="exist_coupons">
		        <c:forEach items="${couponList}" var="coupon">
		                 <c:if test="${coupon.status == 1 or coupon.status == 2}">
	                          <li class="c-usable">
									<span class="c-price">${coupon.facePrice}</span>
									<p class="c-range">${coupon.couponName}</p>
									<p class="c-endtime">有效期至 : <span id="c-endtime"><fmt:formatDate  type="date" value="${coupon.endTime}" pattern="yyyy-MM-dd"/></span></p>
							  </li>
						  </c:if>
						  <c:if test="${coupon.status == 0 and coupon.isUsed == 0}">
	                          <li class="c-unusable">
									<span class="c-price">${coupon.facePrice}</span>
									<p class="c-range">${coupon.couponName}</p>
									<p class="c-endtime">有效期至 : <span id="c-endtime"><fmt:formatDate  type="date" value="${coupon.endTime}" pattern="yyyy-MM-dd"/></span></p>
							  </li>
						  </c:if>
						  <c:if test="${coupon.status == 0 and coupon.isUsed == 1}">
	                          <li class="c-overdue">
									<span class="c-price">${coupon.facePrice}</span>
									<p class="c-range">${coupon.couponName}</p>
									<p class="c-endtime">有效期至 : <span id="c-endtime"><fmt:formatDate  type="date" value="${coupon.endTime}" pattern="yyyy-MM-dd"/></span></p>
							  </li>
						  </c:if>   
			    </c:forEach> 
        </ul>
         
        <input type="hidden" id="couponNum" value="${fn:length(couponList)}"/>
		<!--没有优惠券时显示此div-->
		<div class="no-coupons" id="no_coupons">
			<img src="${cdnPath}/i/wappay_test/coupons0.png" />
			<p>还没有优惠券哦~</p>
		</div>
		
	</body>
   <script type="text/javascript">
		if('${noCoupon}' == 'y'){
			$("#exist_coupons").hide();
		    $("#no-coupons").show();
		}
		
		if($("#couponNum").val() == 0){
			document.getElementById("no_coupons").style.display="block";
		}
		//毫秒转string日期年月日
		function getMyDate(str){  
            var oDate = new Date(str),  
            oYear = oDate.getFullYear(),  
            oMonth = oDate.getMonth()+1,  
            oDay = oDate.getDate(),  
            oHour = oDate.getHours(),  
            oMin = oDate.getMinutes(),  
            oSen = oDate.getSeconds(),  
            oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSen);//最后拼接时间  
            return oTime;  
        }; 
   </script> 
</html>
