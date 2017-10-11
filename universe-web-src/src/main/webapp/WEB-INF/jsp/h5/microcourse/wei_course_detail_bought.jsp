<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
    <title>${courseVO.title }</title>
    <link rel="stylesheet" href="${cndPath}/css/reset.css" />
    <link rel="stylesheet" href="${cndPath}/css/wei-course-myList.css" />
</head>
<body>
<jsp:include page="wei_download.jsp"></jsp:include>
    <header><img src="${courseVO.imageDetail }" alt=""/>
        <div>
            <p>${courseVO.title }</p>
            <p>${courseVO.introductionBase }</p>
        </div>
    </header>
    <div class="wrap">
    	<c:forEach items="${results }" var="result" varStatus="status">
    	<a style="display:block;"	href="${basePath}/h5/microcourse/article/${result.id }" target="_self">
                 <div class="item">
                 <c:choose>
						<c:when  test="${result.userlearnCount<=0}">   
	                         <h2><span>•</span>${result.title }</h2>
						</c:when> 
			        	<c:otherwise>  
			        		 <h2 class="marked"><span>•</span>${result.title }</h2>
						</c:otherwise>
					</c:choose>
			       
			        <p class="nav-bar">
			            <span>${result.updateTimeStr }</span>
			            <span>${result.learnPersonCount }</span>人读过
			        </p>
				<div class="con">
					<img src="${result.imageList }" alt="" />
				</div>
				<p class="desc">${result.introductionBase }</p>
			        <span class="readMore">阅读全文</span>
			    </div>     
			    </a>  
		</c:forEach> 
	 
</div>

</body>
</html>