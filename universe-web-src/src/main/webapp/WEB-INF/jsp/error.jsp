<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">  
    <jsp:include page="./include/pub.jsp"></jsp:include> 
    <title>无权限</title>  
        <link rel="stylesheet" href="${cdnPath}/css/common.css"/>
    <style type="text/css">
        html {
            height: 100%;
            width: 100%;
        }
        body {
            height: 100%;
            width: 100%;
            background: #ceefec;
            overflow-x:hidden;
        }
        .center{
            padding-left:390px;
            width:470px;
            height:252px;
            line-height:252px;
            margin:50px auto;
            background:url("${cdnPath}/i/error2.png") no-repeat;
        }
        .center p{
            width:470px;
            text-align:center;
            height:126px;
            line-height:200px;
            font-size:30px;
            color:#59a4ae;

        }
        .center div{
            height:126px;
            line-height:126px;
            width:470px;
            text-align:center;
        }
        .center div a{
            display:inline-block;
            height:38px;
            line-height:38px;
            text-align:center;
            width:114px;
            border:1px solid #00b551;
            color:#00b551;
            font-size:14px;
            border-radius:50px;
        }
        .center div .prev{
            margin-right:40px;
        }
        .footer1{
            position:fixed;
            bottom:0;
        }
    </style>
    <script type="text/javascript">
    	function goback(){
        	var isexit = document.referrer;
        	//alert(isexit);
        	if(isexit==null||isexit=="")
        	{
        		window.location.href="<c:url value="/index.html"/>";
        	}
        	else
        	{
        		window.history.go(-1);
        	}
        }
</script>
</head>
<body>
<jsp:include page="./include/header.jsp"></jsp:include>
<div class="layout">
    <div class="center">
    <p>您没有权限查看此页面哦！</p>
    <div><a href="javascript:;" class="prev" onclick="goback()">返回上级页面</a><a href="<c:url value="/index.html"/>">返回首页</a></div>
</div>
</div>
<jsp:include page="./include/footer.jsp"></jsp:include>
</body>
</html>
