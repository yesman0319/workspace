<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>精英计划--支付页面</title>
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
        <h1>钱包充值<span>¥ ${order_price}</span></h1>
        <div class="bianhao">
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;订单编号: <span style="font-size:20px;">${order_id}</span></p>
            <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;支付金额: <span style="font-size:20px;">¥ ${order_price}</span> </p>
        </div>

        <div style="height: 30px;"></div>

        <div class="wrap-zhifu">
            <nav id="nav">
                <a href="javascript:;" class="on">微信支付</a>
                <a href="javascript:;">支付宝</a>
            </nav>

            <div class="box-cen" id="box-cen">
                <section>
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

                <section style="display: none;">
                    <p style="font-size:15px;">您正在使用支付宝交易，交易将在  <span id="tbmm" style="font-size:15px;"></span>分钟<span id="tbss" style="font-size:15px;"></span>秒   后关闭，请及时付款</p>
                    <div class="box-w">
                        <div class="box-w-left" style="width: 500px;" id="zfb_pic">

                        </div>
                        <div class="box-w-right" id="zfb_right">

                        </div>
                    </div>
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

<input type="hidden" id="goodid" value="${good_id}">  
<input type="hidden" id="goodattrid" value="${good_attrid}"> 
<input type="hidden" id="orderid" value="${order_id}">
<input type="hidden" id="price" value="${order_price}">
<input type="hidden" id="callBack" value="${callBack}">
<input type="hidden" id="outOrderId" value="${outOrderId}">
<input type="hidden" id="error" value="${error}">
<input type="hidden" id="userId" value="${user_id}">
<input type="hidden" id="paytype" value="wx"><!--默认支付方式 wx-->
<script src="${cdnPath}/js/payment/zhifu.js"></script>
</body>
<script>
    
    var error = document.getElementById("error").value;
   	if(error != null && error != ""){
   		alert(error);
   	}
   	
</script>
</html>