<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>支付结果</title>
    
    <%@include file="../include/pub.jsp"%>
    <link rel="stylesheet" href="${cdnPath}/css/common.css"/>
    <link rel="stylesheet" href="${cdnPath}/css/public.css">
    <link rel="stylesheet" href="${cdnPath}/css/zhifu.css">  
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
        <h1>支付结果</h1>
        <div class="bianhao">
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;订单编号: <span style="font-size:20px;">${order_id}</span></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;支付金额: <span style="font-size:20px;">¥ ${order_price}</span> </p>
        </div>

        <div style="height: 30px;"></div>

        <div class="wrap-zhifu">
            <nav id="nav">
                <a href="javascript:;" class="on" <c:if test="${!fn:contains(param.supportPaymentTypes,'1902')}">style="display: none;"</c:if>>微信支付</a>
                <a href="javascript:;" id = "bodys" <c:if test="${!fn:contains(param.supportPaymentTypes,'1901')}">style="display: none;"</c:if>>支付宝</a>
                <a href="javascript:;" id = "wallet" <c:if test="${!fn:contains(param.supportPaymentTypes,'1900')}">style="display: none;"</c:if>>钱包支付</a>
            </nav>

            <div class="box-cen" id="box-cen">
                <section style="display:none">
                    <p>您正在使用微信交易，交易将在44分钟后关闭，请及时付款</p>
                    <div class="box-w">
                        <div class="box-w-left" id="wx_pic">
                            <img src="${cdnPath}/i/payment/pic3.jpg" alt="">
                            <div><h2><span style="font-size:20px;">请使用微信扫一扫扫描二维码支付</span></h2></div>
                        </div>
                        <div class="box-w-right">
                            <img src="${cdnPath}/i/payment/pic6.jpg" alt="">
                        </div>
                    </div>
                </section>

                <section style="display: none;" id = "se2" >
                    <p>您正在使用支付宝交易，交易将在44分钟后关闭，请及时付款</p>
                    <div class="box-w">
                        <div class="box-w-left" style="width: 500px;" id="zfb_pic">

                        </div>
                        <div class="box-w-right" id="zfb_right">

                        </div>
                    </div>
                </section>

                <div id="success">
                    <h3><img src="${cdnPath}/i/payment/pic17.jpg" alt=""><span style="width:300px;font-size: 20px">恭喜您已成功支付!</span></h3>
                   <!--  <p style="margin-top: 90px;line-height: 30px;"><span>您的订单已经成功支付</span></p>
                    <p><span>您的会员状态即将更新为VIP</span></p>
                    <p><span>您可以续费延长会员服务</span></p>
                    <p><span>如果您的状态未更改或者还不能使用会员专属服务</span></p>
                    <p style="background: none; position: absolute;top: 220px;"><span>请联系您的专属老师</span></p> -->
                </div>
                
                <div id="nothing">
                    <h3><img src="${cdnPath}/i/payment/nothing.jpg" alt=""><span style="font-size:20px;">支付失败</span></h3>
                    <p style="margin-top: 90px;line-height: 30px;"><span>返回<a href="${cdnPath}/web/product/pay/get?goodId=${good_id}&outOrderId=${out_order_id}&callBack=${call_back}">购买页面</a>重新下单购买</span></p>
                    <p><span>有其他疑问，请联系您的专属老师</span></p>
                </div>
                
            </div>

            <div style="height: 74px;"></div>
        </div>
    </div>
</article>
<input type="hidden" id="pay_result" value="${pay_result}">
<input type="hidden" id="pay_type" value="${pay_type}">

 <!-- start footer  -->
  <%@include file="../include/footer.jsp"%>
 <!-- start footer  -->

<script>
var h=document.body.scrollHeight;
var div = document.createElement("div");
div.id="tanchuang";
div.style.height=h+"px";
div.style.display="none";
document.body.appendChild(div);
var tanchuang = document.getElementById("tanchuang");
var navA = document.getElementById("nav").getElementsByTagName("a");
var box = document.getElementById("box-cen").getElementsByTagName("section");
var success = document.getElementById("success");
var error = document.getElementById("nothing");
var pay_result = document.getElementById("pay_result").value;
var pay_type = document.getElementById("pay_type").value;

var bodys = document.getElementById("bodys");
var wallet = document.getElementById("wallet");

//_hmt.push(['_trackEvent', 'trade', 'success', '手机号-产品名字', 金额]);
for(var i=0;i<navA.length;i++){
    navA[i].index=i;
    if(pay_type=="ali"){
    	for(var i=0;i<navA.length;i++){
	        navA[i].className="";           
	     }
    	bodys.className="on";           
    }
    
    if(pay_type=="wallet"){
    	for(var i=0;i<navA.length;i++){
	        navA[i].className="";           
	     }
    	wallet.className="on";           
    }
    
    if(pay_result == "success"){
    	if(i == 0){   //避免统计两次
	    	//统计
	     	analytics.Ana("order",'${user_id}','${order_id}','','${order_price}');
    	}
  	
		success.style.display="block";
		error.style.display="none";
	}else{
		error.style.display="block";
		success.style.display="none";
	}   
}
</script>
</body>
</html>