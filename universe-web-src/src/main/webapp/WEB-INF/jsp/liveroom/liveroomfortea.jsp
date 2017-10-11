<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <base href="<%=basePath%>">
		<meta charset="utf-8" />
		<meta name="viewport" content="target-densitydpi=320,width=640,user-scalable=no">
		<title>精英计划</title>
		<link rel="bookmark"  type="image/x-icon"  href="img2/xiaotu.jpg"/>
        <link rel="shortcut icon" href="img2/xiaotu.jpg"/>
		<link rel="stylesheet" type="text/css" href="css/main.css" media="all">
	</head>
<body>
	<c:forEach var="item" items="${list}">
		${item.name}
	</c:forEach>
</body>
	<script src="js/jquery.js"></script>
	<script>
    </script>
</html>
