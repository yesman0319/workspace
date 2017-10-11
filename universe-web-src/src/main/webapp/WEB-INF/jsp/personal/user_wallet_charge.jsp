<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">    
  	 <%@include file="../include/pub.jsp"%>
    <script type="text/javascript">	 
    $(function(){  
		$.cookie('BUY_GOOD_ID', '${good.id}');
		$.cookie('ATTR_ID', '${attr_id}');
		$.cookie('ATTR_VAlUE', '${attr_value}');
		$.cookie('LEARN_START_TIME', '');
		$.cookie('CHECK_PRICE', '${check_price}');
		$.cookie('BUY_GOOD_NAME', '${good.goodName}'); 
		$.cookie('OUT_ORDER_ID', '${out_order_id}');
		$.cookie('CALL_BACK', ''); 		
		$.cookie('RECOMMENT_PERSION', ''); // 推荐人	
		$.cookie('COUPON_ID', ''); 
		$.cookie('BUY_GOOD_PAYMENT_TYPES', '${good.supportPaymentTypes}'); 
		window.location.href='<c:url value="/web/product/pay/wx"/>';		
    });	
    </script> 
</head>
<body></body>
</html>