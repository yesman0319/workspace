<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/padding" prefix="padding"%>

<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>视频课程-精英计划</title> 
    <%@include file="../include/pub.jsp"%>   
    <link rel="stylesheet" href="${cdnPath}/css/common.css"/>
    <link rel="stylesheet" href="${cdnPath}/css/userProfile.css"/>
    <link rel="stylesheet" href="${cdnPath}/css/video_course_list.css"/>
</head>
<body>
<jsp:include page="../include/header.jsp"></jsp:include>
<div class="layout">
    <!--面包屑-->
    <p class="location"><a href="/index.html">精英计划</a>&nbsp;&gt;
        <a class="cur" href="javascript:window.location.reload()">视频课程</a>
    </p>
    <ul class="video_list">
  		<c:forEach var="item" items="${videoCourseList}">
       		 <li class="video_item" >
       	 		<a href="<c:url value="/courses/${item.id }"/>" target="_blank" title="${item.name}" >
	                <img <c:if test="${item.coverPhoto==null||item.coverPhoto=='' }"> src="../i/index/universe-icon.jpg"</c:if>    <c:if test="${item.coverPhoto!=null&&item.coverPhoto!='' }"> src="${item.coverPhoto }"</c:if>      alt="视频课程"/>
	            	<div class="v_list_modal">
	            		<b class="videobtn"></b>
	            	</div>
	             </a>
	       <p>
            	<a href="javascript:;" class="video_name">${item.name}</a>
            	<p class="lecturer">讲师：
            		<c:if test="${item.teacher==null}">暂无</c:if>
        	 		<c:if test="${item.teacher!=null}">${item.teacher.nameCn } </c:if>
            	</p>
                <c:if test="${item.price!=null}">
               		<span class="price">&yen;${item.price}</span>
                </c:if>
                <c:if test="${item.price==null}">
                	<span class="free">免费</span>
                </c:if>
                <span class="study_num fr"><i class="stu_count"></i>${item.totalView}人在学</span>
            </p>
               </a>
           </li>
      	</c:forEach>    
    </ul>
    <padding:padding pagintInfo="${paddingInfo}" /> 
</div>
<jsp:include page="../include/footer.jsp"></jsp:include>
</body>
</html>