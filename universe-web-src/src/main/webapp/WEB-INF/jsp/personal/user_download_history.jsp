<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>个人中心-下载历史</title>
     <%@include file="../include/pub.jsp"%>
    <link rel="stylesheet" href="${cdnPath}/css/common.css"/>
    <link rel="stylesheet" href="${cdnPath}/css/userProfile.css"/>
    <link rel="stylesheet" href="${cdnPath}/js/lib/Jcrop/jquery.Jcrop.min.css"/>
</head>
<body>
<%@include file="../include/header.jsp"%>
<div class="layout">
    <div class="main">
		<%@include file="../include/leftMenu.jsp"%>
        <div class="right" id="right_box">
            <!--视频课程-->
            <div class="rightSide video_div fl" style="">
                <p class="location"><a class="user_href" href="">个人中心</a>><a class="down_href"
                   href="">下载历史</a>
                </p>
                  <div class="list">
                    <p class="h">
                        <span class="name fl">名称</span>
                        <span class="num fl">共计<span class="count">${total}</span>份资料</span>
                        <span class="down_date fr">下载时间</span>
                    </p>
                    <ul>
                        <c:forEach items="${dhlist}" var="ud">
                        <li class="list_li"><i class="${ud.fileType}"></i><a class="article" href="javascript:;">${ud.infoName}</a>
                        <span class="up_date"><fmt:formatDate value="${ud.downloadTime}" pattern="yyyy-MM-dd"/></span></li>
						</c:forEach>
                    </ul>
                </div>
                <c:if test="${total>pageSize}">
                <div style="margin-top:20px;width:810px;text-align:center;">
                <div class="page">
                    <span class="first" onclick="turnPage(1)">首页</span>
                    <span class="prev" onclick="turnPage(${page-1})">上一页</span>
                     <ul class="page_list">
                       <c:if test="${totalPage <=6}" > 
                           <c:forEach begin="1" end="${totalPage}" step="1" var="i">
                                <li><a href="" class="<c:if test='${page==i}'>${pageActive}</c:if>" onclick="turnPage(${i});return false">${i}</a></li>
                            </c:forEach>
                       </c:if>
                       <c:if test="${totalPage>6}"> 
                           <c:if test="${page<5}">
	                           <c:forEach begin="1" end="5" step="1" var="i">
	                                <li><a href="" class="<c:if test='${page==i}'>${pageActive}</c:if>"  onclick="turnPage(${i});return false">${i}</a></li>
	                            </c:forEach>
	                            <li class="omit_left">...</li>
                            </c:if>
	                       <c:if test="${page>=5 && page<totalPage-3}"> 
	                           <li class="omit_left">...</li>
	                           <c:forEach begin="${page-1}" end="${page+2}" step="1" var="i">
	                                <li><a href class="<c:if test='${page==i}'>${pageActive}</c:if>"  onclick="turnPage(${i});return false">${i}</a></li>
	                            </c:forEach>
	                            <li class="omit_left">...</li>
	                       </c:if>  
	                       <c:if test="${page>totalPage-4}"> 
	                           <li class="omit_left">...</li>
	                           <c:forEach begin="${totalPage-4}" end="${totalPage}" step="1" var="i">
	                                <li><a href="" class="<c:if test='${page==i}'>${pageActive}</c:if>" onclick="turnPage(${i});return false">${i}</a></li>
	                            </c:forEach>
	                       </c:if>
                       </c:if> 
                    </ul>
                    <a href="" onclick="turnPage(${page+1});return false"><span class="next">下一页</span></a>
                    <a href="" onclick="turnPage(${page+1});return false"><span class="last" onclick="turnPage(${totalPage})">末页</span></a>
                    <a href="" onclick="turnPage(${page+1});return false"><span class="page_count">共<span class="total_count">${totalPage}</span>页</span></a>
                    <label class="cur_page">当前<input class="goTO" type="text" value="${page}"/>页</label>
                    <a class="ok" href="" onclick="turnPage($('.goTO').val());return false">确定</a>
                    </div>
                    </div>
                 </c:if> 
            </div>
        </div>
    </div>
</div>
<jsp:include page="../include/footer.jsp"></jsp:include>
<script type="text/javascript" src="${cdnPath}/js/lib/Jcrop/jquery.Jcrop.min.js"></script>
<script charset="utf-8" type="text/javascript" src="${cdnPath}/js/userProfile/userProfile.js"></script>
<script type="text/javascript">
function turnPage(page){
	var value = $("#searchName").val();
	var cateId=$("#cateId").val();
	var label=$("#label").val();
	var sort=$("#sort").val();
	var islike=value==""?false:true;
	window.location.href="<c:url value="/personal/docs?&page="/>"+page;
}
</script>
</body>
</html>