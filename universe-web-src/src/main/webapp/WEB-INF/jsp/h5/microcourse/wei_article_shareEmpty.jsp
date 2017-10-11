<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
    <title>${articleVO.title }</title>
    <link rel="stylesheet" href="${cndPath}/css/reset.css" />
    <link rel="stylesheet" href="${cndPath}/css/wei-course-shareEmpty.css" />
</head>
<body>
<header>
    <img src="${cndPath}/img/wei-course/share-cry.png" alt=""/>
    <div class="tips">
        <p>免费名额已抢完</p>

        <p>爱我别走，试读别的看看</p>
    </div>
</header>
<div class="empty-con">
    <h2>${articleVO.title }</h2>
    <time>${articleVO.updateTimeStr }</time>
    <p>该文免费阅读名额已抢完，这么好的文章还有几百篇</p>
</div>
<div class="wrap">
<c:forEach items="${results }" var="result" varStatus="status"> 
	 	 <div class="item">
	
	            <h2>${result.title }</h2>
	            <p class="nav-bar">
	                <span>试读</span>
	                <span>${result.updateTimeStr }</span>
	                <span>${result.learnPersonCount }</span>人读过
	            </p>
	            <a class="con"  href="${basePath}/h5/microcourse/article/${result.id }" target="_self">
	               <img src="${result.imageList }" alt=""/>
	            </a>
	            <p class="desc">${result.introductionBase }</p>
	            <a class="readMore" href="${basePath}/h5/microcourse/article/${result.id }" target="_self">阅读全文</a>
	    </div>     
 </c:forEach>  
</div>
<div class="more-con">
    <a href="${basePath}/h5/microcourse/courses/${articleVO.courseId}" class="more">了解更多</a>
</div>
</body>
</html>