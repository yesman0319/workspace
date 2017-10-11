<%@ page pageEncoding="UTF-8"%>
<%@ page import="com.xiaoma.universe.common.contant.Contant" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<% 
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()+ path;
    String cdnPath=Contant.STATIC_PAGE_URL;
    String learnApi = Contant.LEARN_API_URL;
    String messageApi = Contant.MESSAGE_API_URL;
    String titleUrl=basePath+"?"+request.getQueryString();
    String basePathNoPort = request.getScheme() + "://" + request.getServerName();
    pageContext.setAttribute("basePath", basePath);
    pageContext.setAttribute("basePathNoPort", basePathNoPort);
    pageContext.setAttribute("path", path);   
    pageContext.setAttribute("titleUrl", titleUrl);
    pageContext.setAttribute("cdnPath", basePath);
    pageContext.setAttribute("learnApi", learnApi);
    pageContext.setAttribute("messageApi", messageApi);
%>
<link rel="icon" href="${basePath}/favicon.ico" type="image/x-icon" />
<link rel="shortcut icon"  href="${basePath}/favicon.ico" type="image/x-icon" >
<link rel="bookmark"  href="${basePath}/favicon.ico" type="image/x-icon">
<script type="text/javascript" src="${cdnPath}/js/lib/jquery-3.1.1.min.js"></script>
<link type="text/css" rel="stylesheet" href="${cdnPath}/common/css/font-awesome.min.css" />
<script type="text/javascript" src="${cdnPath}/js/lib/jquery/1.11.1.js"></script>
<script type="text/javascript" src="${cdnPath}/js/lib/jquery/jquery.cookie.js"></script>
<script src="${cdnPath}/js/lib/base64.js"></script>
<script type="text/javascript" src="<%=Contant.ANALYTICS_JS_URL%>?_=<%=System.currentTimeMillis()%>"></script>
<script type="text/javascript">
	if(!window.xiaoma){window.xiaoma={};}
	window.xiaoma.cndPath="${cdnPath}";
	window.xiaoma.basePath="${basePath}";
	window.xiaoma.path="${path}";
	window.xiaoma.learning="${learnApi}";
	window.xiaoma.messageApi="${messageApi}";
  $(function(){
        $(".header .user_nav").find(".nickname").mouseenter(function(e){
            $(this).parent().find(".navList").stop().slideDown(300);
        }).mouseleave(function(){
            $(this).find(".navList").stop().slideUp(300);
        });       
    });
</script> 
<script>
   (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-85692398-1', 'auto');
  ga('send', 'pageview'); 

</script>