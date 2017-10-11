<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>帖子不存在</title>
     <%@include file="../include/pub.jsp"%>
    <link rel="stylesheet" href="${cdnPath }/css/common.css"/>
    <link rel="stylesheet" href="${cdnPath}/css/discussion-details.css"/>
</head>
<body>
<!-- start 导航 -->
<%@include file="../include/header.jsp"%>
<!-- end 导航 -->
<div class="error-tips" id="errorTips" style="display: block;">
    <img src="../i/discussion/post-delete.png" alt=""/>
    <p class="et-text">很抱歉，您发布的讨论已被删除</p>
    <a class="goToIndex" href="${basePath}">返回首页</a>
</div>

<!-- start footer  -->
<%@include file="../include/footer.jsp"%>
<!-- start footer  -->

<div id="postTip" class="payResult_modal">
    <div class="payResult_dialog">
        <h2>温馨提示<span class="close_btn closeBtn"></span>
        </h2>
        <span class="payResult_tips">您的账号已被禁言，暂时不能进行回复</span>
        <a href="javascript:;" class="pay_confirm closeBtn"> 知道了</a>

    </div>
</div>
</body>
</html>