<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>  
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<!DOCTYPE HTML >
<html>
  <head>
    <base href="<%=basePath%>">
	<meta charset="UTF-8">
	<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
	<meta content="yes" name="apple-mobile-web-app-capable">
	<meta content="black" name="apple-mobile-web-app-status-bar-style">
	<meta content="telephone=no" name="format-detection">
	<meta content="email=no" name="format-detection">
	<script type="text/javascript" src="js/lib/jquery-3.1.1.min.js"></script>
    <script type="text/javascript">
    ${redisUrl}
    //页面初始化
    $(document).ready(function(){
    	<%-- window.location="<%=request.getContextPath() %>${redisUrl}"; --%>
    	var url = "${redisUrl}";
    	if(url==null||url=="")
    	{
    		alert("系统错误，请联系管理员");
    		return false;
    	}
    	window.location=url;
    });
    </script>
  </head>
<body >
</body>
</html>
