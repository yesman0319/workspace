<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>确认订单</title>
    <link rel="stylesheet" href="../css/common.css"/>
    <link rel="stylesheet" href="../css/order.css"/>
</head>
<body>
<jsp:include page="./include/header.jsp"></jsp:include>
<div class="main">
    <div class="w">
        <div class="leftSide fl">
            <h2>请确认商品基本信息后进行付款</h2>
            <div class="product">
                <p class="desc">100分冲刺计划</p>
                <p class="pro"><span class="yuan">&yen;</span><span class="price">2450</span></p>
            </div>
            <div class="product">
                <h3>学习计划基本信息</h3>
                <div class="lesson" style="margin-top:48px;"><span style="display:block;float:left;font-size:18px;color:#232323;">课程类型：</span>
                   <ul class="lesson_list">
                       <li><a href="javascript:;" class="lessonDesc cur"><span>1课程</span><i class="icon_cur"></i></a></li>
                       <li><a href="javascript:;" class="lessonDesc"><span>2课程</span><i class="icon_cur" style="display: none;"></i></a></li>
                       <li><a href="javascript:;" class="lessonDesc"><span>3课程</span><i class="icon_cur" style="display:none;"></i></a></li>
                   </ul>
                </div>
                <div class="lesson" style="margin-top:30px;padding-bottom:38px;"><span style="display:block;float:left;font-size:18px;color:#232323;">开始时间：</span>
                    <ul class="lesson_list">
                        <li><a href="javascript:;" class="lessonDate cur"><span>2016-2-14</span></a></li>
                        <li><a href="javascript:;" class="lessonDate"><span>2016-7-28</span></a></li>
                        <li><a href="javascript:;" class="lessonDate"><span>2016-12-14</span></a></li>
                        <li><a href="javascript:;" class="lessonDate"><span>2016-12-18</span></a></li>
                    </ul>
                </div>
            </div>
            <div class="buy">
                <p>应付：<span>&yen;2450</span></p>
                <p><a href="javascript:;" class="btn_buy">购买</a></p>
            </div>
        </div>
        <div class="rightSide fr">
            <div class="bg">
                <img src="../i/order_bg.png" alt="学习计划"/>
                <p class="count">
                    <i class="icon_stu"></i><span class="stu_count">学习人数：<span id="stu">5</span>人</span>
                    <i class="icon_tit"></i><span class="tit_count">总题数：<span id="title">124</span>题</span>
                </p>
            </div>

        </div>
    </div>
</div>
<jsp:include page="./include/footer.jsp"></jsp:include>
</body>
</html>