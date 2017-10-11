<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>精英计划--支付页面</title>
    <%@include file="../include/pub.jsp"%>
    <link rel="stylesheet" href="${cdnPath}/css/common.css?_=<%=System.currentTimeMillis()%>"/>
    <link rel="stylesheet" href="${cdnPath}/css/public.css?_=<%=System.currentTimeMillis()%>">
    <link rel="stylesheet" href="${cdnPath}/css/zhifu.css?_=<%=System.currentTimeMillis()%>"> 
    <!--百度统计代码-->
    <script>
		var _hmt = _hmt || [];
		(function() {
		  var hm = document.createElement("script");
		  hm.src = "//hm.baidu.com/hm.js?22fe330b8bf5f3b6daef2ad6864536cc";
		  var s = document.getElementsByTagName("script")[0]; 
		  s.parentNode.insertBefore(hm, s);
		})();
    </script> 

</head>
<body>

<!-- start 导航 -->
<%@include file="../include/header.jsp"%>
<!-- end 导航 -->

<article>
    <div class="center-zhifu">
        <h1>${good_name}</h1>
        <div class="bianhao">
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;订单编号: <span style="font-size:20px;">${order_id}</span></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;支付金额: <span style="font-size:20px;">¥ ${order_price}</span> </p>
        </div>

        <div style="height: 30px;"></div>

        <div class="wrap-zhifu">
            <nav id="nav">
            	<c:forEach var="item" items="${supportPaymentTypeList}" varStatus="stat">
            		<c:if test="${stat.index == 0 }"><c:set var="defaultPaymentType" value="${item.type}" /></c:if>            	   	
               		<a href="javascript:;" <c:if test="${stat.index == 0 }">class="on"</c:if>>${item.name}</a>
               </c:forEach>               
            </nav>

            <div class="box-cen" id="box-cen">
                <section <c:if test="${defaultPaymentType!='1902' }">style="display: none;"</c:if>>
                    <p style="font-size:15px;">您正在使用微信交易，交易将在  <span id="wxmm" style="font-size:15px;"></span>分钟<span id="wxss" style="font-size:15px;"></span>秒  后关闭，请及时付款</p>
                    <div class="box-w">
                        <div class="box-w-left" id="wx_pic">
                            <img src="${cdnPath}/web/product/pay/qrcode?code_url= ${code_url}" alt="">
                            <div><h2><span>请使用微信扫一扫扫描二维码支付</span></h2></div>
                        </div>
                        <div class="box-w-right">
                            <img src="${cdnPath}/i/payment/pic6.jpg" alt="">
                        </div>
                    </div>
                </section>

                <section style="display: none;" >
                    <p style="font-size:15px;">您正在使用支付宝交易，交易将在  <span id="tbmm" style="font-size:15px;"></span>分钟<span id="tbss" style="font-size:15px;"></span>秒   后关闭，请及时付款</p>
                    <div class="box-w">
                        <div class="box-w-left" style="width: 500px;" id="zfb_pic">

                        </div>
                        <div class="box-w-right" id="zfb_right">

                        </div>
                    </div>
                </section>
				
				<section <c:if test="${defaultPaymentType!='1900' }">style="display: none;"</c:if>>
                    <div class="wallet-balance-show">
						钱包余额：
						<span class="wallet-picon">&yen;</span>
						<span id="wallet-balance-show">${wallet.balance}</span>
					</div>
					<div id="wallet-balance-tip" <c:if test="${not empty order_price and order_price < wallet.balance }">style="display: none;"</c:if>>
						<i class="shutdown_icon"></i>
						<a href="/personal/wallet.html?page_size=10" >余额不足，去充值 > </a>
					</div>
					<a href="javascript:;" id="pay-wallet" class="pay-wallet<c:if test="${ !walletPay or order_price> wallet.balance }"> pay-negative</c:if>" onclick="walletPay()" >确认支付</a><!--  小于支付额不可点击样式添加 class="pay-negative"  -->
				</section>
                
                <div id="success">
                    <h3><img src="${cdnPath}/i/payment/pic17.jpg" alt=""><span style="font-size: 20px">恭喜您已成功支付!</span></h3>
                   <!-- <p style="margin-top: 90px;line-height: 30px;"><span>您的订单已经成功支付</span></p>
                     <p><span>您的会员状态即将更新为VIP</span></p>
                    <p><span>您可以续费延长会员服务</span></p>
                    <p><span>如果您的状态未更改或者还不能使用会员专属服务,</span></p> -->
                    <p style="background: none; position: absolute;top: 220px;"><span>请联系您的专属老师</span></p>
                </div>
            </div>

            <div style="height: 74px;"></div>

        </div>
    </div>
</article>

<!-- start footer  -->
<%@include file="../include/footer.jsp"%>
<!-- start footer  -->

<div id="tishi">
    <h1>支付提示<span id="cols">×</span></h1>
    <p>请您在新打开的页面完成支付</p>
    <p><span>完成支付前请不要关闭此窗口</span></p>
    <p><span>支付失败后，可以联系您的专属老师帮忙查询</span></p>
    <div class="btns">
        <div id="cg">支付完成</div>
        <div id="cx">重新选择支付方式</div>
    </div>
</div>

<div id="ztishi">
    <h1>支付提示<span id="cols1">×</span></h1>
    <p><span>已扣款成功,但没有成功提示</span></p>
    <b>由于网络传输延迟，订单信息可能尚未更新，请勿重复支付</b>
    <b>如果您已付款，请及时联系老师<b>
    <p><span>未扣款成功</span></p>
    <b>您可以<span id="jx">继续支付</span></b>
</div>

<div id="chaoshi">
    <h1>支付超时</h1>
    <p>在规定时间内您未支付或支付未成功，订单已关闭，请返回购买页面重新购买并支付</p>
    <button id="fanhui">返回购买页面</button>
</div>
<input type="hidden" id="supportPaymentTypes" value="${supportPaymentTypes}">
<input type="hidden" id="jsonStr" value="${jsonStr}">
<input type="hidden" id="goodid" value="${good_id}">  
<input type="hidden" id="goodattrid" value="${good_attrid}"> 
<input type="hidden" id="orderid" value="${order_id}">
<input type="hidden" id="price" value="${order_price}">
<input type="hidden" id="callBack" value="${callBack}">
<input type="hidden" id="outOrderId" value="${outOrderId}">
<input type="hidden" id="error" value="${error}">
<input type="hidden" id="userId" value="${user_id}">
<input type="hidden" id="walletBalance" value="${wallet.balance}">
<input type="hidden" id="paytype" value="wx"><!--默认支付方式 wx-->
<script src="${cdnPath}/js/payment/zhifu.js?_=<%=System.currentTimeMillis()%>"></script>
</body>
<script>
    
    var error = document.getElementById("error").value;
   	if(error != null && error != ""){
   		alert(error);
   	}
   	function walletPay(){
   		    var walletBalance = document.getElementById("walletBalance").value;
   		    var price = document.getElementById("price").value;   		 	
   		    if(walletBalance==null||walletBalance == ""||price==null||price==""){
   		    	alert("支付金额或钱包余额获取失败,请返回重试");
   		    	return;
   		    }
   		    
   		    if(walletBalance - price < 0){
   		       $("#wallet-balance-tip").show();
   		       return;
   		    }
   		    
   			var orderId = $("#orderid").val();//本地订单号
   			var goodId = $("#goodid").val();
   			var price = $("#price").val();
   			if(orderId != null && orderId != "undefined" && orderId != ""){
   				window.clearInterval(timer);
   				$.ajax({
   				    url: "/web/product/pay/wallet?orderId="+orderId,  //调用商城查询支付结果，现改为调用 计划卡片平台查询支付结果
   				    type: "get",
   				    dataType:"json", 
   				    success: function (data) {
   				    	if(data.status == "0"){
   				    		alert(data.message);
   				    		return ;
   				    	}
   				        location.href="/web/product/pay/resultjsp?order_id="+orderId+"&goodid="+goodId+"&order_price="+price+"&pay_result=success&pay_type=wallet&out_order_id="+orderId+"&supportPaymentTypes="+$("#supportPaymentTypes").val();
   				    }
   				});
   		}
   	}
   	
</script>
</html>