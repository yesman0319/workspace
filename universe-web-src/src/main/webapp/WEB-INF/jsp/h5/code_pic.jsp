<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>商品二维码分享页面</title>
    <%@include file="../include/pub.jsp"%>
    <link rel="stylesheet" href="${cdnPath}/css/common.css"/>
    <link rel="stylesheet" href="${cdnPath}/css/public.css">
    <link rel="stylesheet" href="${cdnPath}/css/zhifu.css">

</head>
<body>
<article>
    <div class="center-zhifu">
        <div style="height: 30px;"></div>

        <div class="wrap-zhifu">

            <div class="box-cen" id="box-cen">
                <section>
                    <div class="box-w">
                        <div class="box-w-left" id="wx_pic">
                            <img src="${cdnPath}/web/product/pay/share/qrcode?code_url=${codeUrl}" alt="">
                            <div><h2><span>请使用微信扫描二维码分享</span></h2></div>
                        </div>
                        <div class="box-w-right">
                            <img src="${cdnPath}/i/payment/pic6.jpg" alt="">
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </div>
</article>
</html>