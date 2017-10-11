<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>支付成功</title>
		<%@include file="../include/pub.jsp"%>
		<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
		<link rel="stylesheet" href="${cdnPath}/css/h5/h5_shopping_reset.css" />
		<link rel="stylesheet" href="${cdnPath}/css/h5/h5_shopping_pay.css" />	
		<script type="text/javascript">
			analytics.Ana("order","${sessionScope.userInfo.id}","${out_trade_no}","","${total_fee}");
		</script>	
	</head>
	<body>		
		<!--订单支付成功-->
		<div class="paySuccess" style="display: ;">
			<p class="success_tips">
				<i class="queren_icon"></i>
				<span>订单支付成功</span>
			</p>
			<p class="total_price">
				<i class="price_icon"></i>
				<span>${total_fee}</span>
			</p>
			<p class="total_price">
				<i><font style="font-size:14;color:#fc6d13;">订单号：</font><span id="succssOrderId" style="font-size:14;color:#fc6d13;">${out_trade_no}</span></i>
			</p>
			
		</div>
	</body>
</html>
