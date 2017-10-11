<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!--即时到账  成功支付后的 提示信息-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>支付结果</title>
     <%@include file="../include/pub.jsp"%>
    <link rel="stylesheet" href="${cdnPath}/css/common.css"/>
    <link rel="stylesheet" href="${cdnPath}/css/public.css">
    <link rel="stylesheet" href="${cdnPath}/css/head-footer.css">
    <link rel="stylesheet" href="${cdnPath}/css/zhifu.css">   

    <script>
       <!--百度统计代码-->
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
        <div style="height: 30px;"></div>
        <div class="wrap-zhifu">
            <nav id="nav">
                <a href="javascript:;">微信支付</a>
                <a href="javascript:;" class="on">支付宝</a>
            </nav>

            <div class="box-cen" id="box-cen">
                <section style="display:none">
                    <p>您正在使用微信交易，交易将在44分钟后关闭，请及时付款</p>
                    <div class="box-w">
                        <div class="box-w-left" id="wx_pic">
                            <img src="${cdnPath}/i/payment/pic3.jpg" alt="">
                            <div><h2><span>请使用微信扫一扫扫描二维码支付</span></h2></div>
                        </div>
                        <div class="box-w-right">
                            <img src="${cdnPath}/i/payment/pic6.jpg" alt="">
                        </div>
                    </div>
                </section>

                <section style="display: none;">
                    <p>您正在使用支付宝交易，交易将在44分钟后关闭，请及时付款</p>
                    <div class="box-w">
                        <div class="box-w-left" style="width: 500px;" id="zfb_pic">

                        </div>
                        <div class="box-w-right" id="zfb_right">

                        </div>
                    </div>
                </section>

                <div id="success" style="display:block">
                    <h3><img src="${cdnPath}/i/payment/pic17.jpg" alt=""><span style="width:300px; font-size:20px;">恭喜您已成功支付!</span></h3>
                    <!-- <p style="margin-top: 90px;line-height: 30px;"><span>您的订单已经成功支付</span></p>
                    <p><span>您的会员状态即将更新为VIP</span></p>
                    <p><span>您可以续费延长会员服务</span></p>
                    <p><span>如果您的状态未更改或者还不能使用会员专属服务,</span></p>
                    <p style="background: none; position: absolute;top: 220px;"><span>请联系您的专属老师</span></p> -->
                </div>
            </div>

            <div style="height: 74px;"></div>

        </div>
    </div>
</article>

<!-- start footer  -->
  <%@include file="../include/footer.jsp"%>
<!-- start footer  -->


</body>
</html>