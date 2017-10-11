<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>${courseVO.title }</title>
    <meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
    <link rel="stylesheet" href="${cndPath}/css/reset.css" />
    <link rel="stylesheet" href="${cndPath}/css/wei-course-index.css" />
</head>
<body>
<jsp:include page="wei_download.jsp"></jsp:include>
<div class="wrap">
    <header><img src="${courseVO.imageDetail }" alt=""/>
    <div>
        <p>${courseVO.title }</p>
        <p>${courseVO.introductionBase }</p>
    </div>
    </header>
    <div class="main">
        <section>
            <h2>微课简介<span class="order-count">${courseVO.learnPersonCount }人订阅</span></h2>
            ${courseVO.introductionDetail }
        <hr/>
        <section>
            <h2>最近更新</h2>
            <c:forEach items="${newArticle }" var="result" varStatus="status"> 
	            <dl>
	                <dt>${result.title }</dt>
	                <dd>${result.updateTimeStr }</dd>
	                <dd>${result.introductionBase }</dd>
	
	            </dl>     
		</c:forEach>  
        </section>
    </div>
    <footer>
     <c:choose>
		<c:when  test="${courseVO.publishFlag>0}">   
                      <div>
	            <span class="price">
	                <i>&yen;</i>
	                <span>${goodInfo.localPrice }</span>
	            </span>
	        </div>
	        <a href="${basePath}/h5/microcourse/courses/free/${courseVO.courseId}" target="_self">试读</a>
	        <a href="${basePath}/h5/microcourse/courses/${courseVO.courseId}/buy"  target="_self">订阅</a>
		</c:when> 
       	<c:otherwise>  
       		<span class="sold-out"> 已经下架</span>
		</c:otherwise>
	</c:choose>
					
       
    </footer>
</div>

</body>
</html>