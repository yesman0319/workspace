<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>500错误页面</title>
 <%@include file="include/pub.jsp"%>
 <link rel="stylesheet" href="${cdnPath}/css/common.css"/>
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
<style>
 body{ margin:0px;;}
</style>
<body>
	<%@include file="include/header.jsp"%>
	<div style="width:100%; height:1185px; background:#c5e7cd url(${cdnPath}/i/500.png) center no-repeat;">
	<div style="width:100%; height:1185px;text-align: center;font-size: 50px;color: red;}">${message}</div></div>
	<%@include file="include/footer.jsp"%>
</body>
</html>