<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="format-detection" content="telephone=no" />
		<title>优惠券</title>
		<%@include file="../include/pub.jsp"%>
		<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
		<link rel="stylesheet" href="${cdnPath}/css/h5/h5_shopping_reset.css" />
		<link rel="stylesheet" href="${cdnPath}/css/h5/h5_coupons.css" />		
 
	</head>   
	<body>
		<ul class="coupons_nav">
			<li class="active">
				<a class="coupon_tab">未使用( <span class="couponCount" id="use_num">0</span> )</a>
			</li>
			<li>
				<span class="cutLine"></span>
				<a class="coupon_tab">已使用( <span class="couponCount" id="unuse_num">0</span> )</a>
			</li>
			<li>
				<span class="cutLine"></span>
				<a class="coupon_tab">已过期( <span class="couponCount" id="overdue_num">0</span> )</a>
			</li>
		</ul>
		<ul class="coupons-ul" id="exist_coupons">
	        <c:forEach items="${couponList}" var="coupon"><!--未使用-->
                <c:if test="${coupon.status == 1 or coupon.status == 2}">
                    <li class="c-usable">
						<span class="c-price">${coupon.facePrice}</span>
						<p class="c-range">${coupon.couponName}</p>
						<p class="c-endtime"><span id="c-endtime"><fmt:formatDate value="${coupon.beginTime}" pattern="yyyy-MM-dd"/></span> — <span id="c-endtime"><fmt:formatDate  type="date" value="${coupon.endTime}" pattern="yyyy-MM-dd"/></span></p>
					</li>
				</c:if>
		    </c:forEach>
		    <div class="no-coupons" id="no_exits_coupons"><!--没有未使用优惠券时显示此div-->
				<img src="${cdnPath}/i/wappay_test/coupons0.png" />
				<p>暂无未使用优惠券</p>
			</div>
        </ul>
        <ul class="coupons-ul" id="unused_coupons"><!--已使用-->
        	<c:forEach items="${couponList}" var="coupon">
				<c:if test="${coupon.status == 0 and coupon.isUsed == 0}">
	                <li class="c-unusable">
						<span class="c-price">${coupon.facePrice}</span>
						<p class="c-range">${coupon.couponName}</p>
						<p class="c-endtime"><span id="c-endtime"><fmt:formatDate value="${coupon.beginTime}" pattern="yyyy-MM-dd"/></span> — <span id="c-endtime"><fmt:formatDate  type="date" value="${coupon.endTime}" pattern="yyyy-MM-dd"/></span></p>
					</li>
				</c:if>
			</c:forEach>
			<div class="no-coupons" id="no_unused_coupons"><!--没有已使用优惠券时显示此div-->
				<img src="${cdnPath}/i/wappay_test/coupons0.png" />
				<p>暂无已使用优惠券</p>
			</div>
        </ul>
        <ul class="coupons-ul" id="overdue_coupons"><!--已过期-->
        	<c:forEach items="${couponList}" var="coupon">
				<c:if test="${coupon.status == 0 and coupon.isUsed == 1}">
	                <li class="c-overdue">
						<span class="c-price">${coupon.facePrice}</span>
						<p class="c-range">${coupon.couponName}</p>
						<p class="c-endtime"><span id="c-endtime"><fmt:formatDate value="${coupon.beginTime}" pattern="yyyy-MM-dd"/></span> — <span id="c-endtime"><fmt:formatDate  type="date" value="${coupon.endTime}" pattern="yyyy-MM-dd"/></span></p>
					</li>
				</c:if>
			</c:forEach>
			<div class="no-coupons" id="no_overdue_coupons"><!--没有已过期优惠券时显示此div-->
				<img src="${cdnPath}/i/wappay_test/coupons0.png" />
				<p>暂无已过期优惠券</p>
			</div>
        </ul>
         
        <input type="hidden" id="couponNum" value="${fn:length(couponList)}"/>
		
	</body>
   <script type="text/javascript">
		setCouponStyle()
		/*if('${noCoupon}' == 'y'){
			$("#exist_coupons").hide();
		    $("#no-coupons").show();
		}*/
		/*if($("#couponNum").val() == 0){
			document.getElementById("no_coupons").style.display="block";
		}*/
		//优惠券tab切换
		$(".coupons_nav li").click(function(){
			var index = $(this).index();
			$(".coupons_nav li").removeClass();	
			$(this).addClass("active");
			$(".coupons-ul").hide().eq(index).show();
		})
		//设置优惠券适用范围的高度自适应
		function setCouponStyle(){
			$(".c-range").each(function(i,v){
				if($(".c-range").eq(i).innerHeight() >= 20){
					var positionTop = parseInt($(".c-range").eq(i).css("top"));
					$(".c-range").eq(i).css("top",positionTop-8);
				}
			})
			$("#unused_coupons").hide();
			$("#overdue_coupons").hide();
		}
		//设置优惠券数量以及判断数量小于0的样式
		$(".coupons-ul").each(function(index,value){
			var $couponLi = $(".coupons-ul").eq(index).find("li");
			var couponCount = $couponLi.length;
			$(".coupons_nav").find(".couponCount").eq(index).text(couponCount);
			if($couponLi && couponCount > 0){
				$(".coupons-ul").eq(index).find(".no-coupons").hide();
			}else{
				$(".coupons-ul").eq(index).find(".no-coupons").show();
			}
		})
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
