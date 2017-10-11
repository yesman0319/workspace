<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <%@include file="../include/pub.jsp"%>
    <title>资料下载 - 精英计划</title>
    <link rel="stylesheet" href="${cdnPath}/css/common.css"/>
    <link rel="stylesheet" href="${cdnPath}/css/info.css"/>
</head>
<body>
<%@include file="../include/header.jsp"%>
<div class="layout">
    <div class="inner">
        <div class="banner">
            <div class="ban_left fl">
                <div class="title"><a href="${cdnPath}/docs/list">托福备考资料</a></div>
                <div>
                    <ul class="sort">
                        <c:forEach items="${categoryList}" var="ctg">
                        <li><a class="sort_list_item ${ctg.imgageUrl}" href="${cdnPath}/docs/list?categoryId=${ctg.id}"><i class="sort_icon"></i><span>${ctg.name}</span></a></li>
                        </c:forEach>
                    </ul>
                </div>
            </div>
            <div class="ban_right fl"><img src="../i/info/ban1.png" alt="精英计划"/></div>
        </div>
        <div class="top_nav">
            <div class="top_left fl">
                <span class="hot_title">今日首推</span>
                <input type="hidden" id="downId" value="${tinfo.id}">
                <input type="hidden" id="fileUrl" value="${tinfo.fileUrl}">
                <a class="hot" href="${cdnPath}/docs/list?categoryId=${tcate.id}">【${tcate.name}】${tinfo.name}</a>
                <a class="load" href="${cdnPath}/docs/${tinfo.id}">去下载</a>
            </div>
            <div class="top_right fl">
                <span class="label fl">标签</span>
                <ul class="label_list fl">
                <c:forEach items="${labelList}" var="ll" varStatus="i">
                    <c:if test="${i.index < 6}"><li><a class="slabel" href="${cdnPath}/docs/list?label=${ll.name}">${ll.name}</a></li></c:if>
                 </c:forEach>
                </ul>
                <a class="more" href="${cdnPath}/docs/list">更多&gt</a>
            </div>
        </div>
        <div class="main">
            <div class="main_left fl">
              <c:forEach items="${infoVolist}" var="ifl" varStatus="i">
                <c:if test="${i.index%2==0}">
                   <div class="item">
                    <div class="list _left fl">
                        <h2><i class="icon_s ${ifl.imgageUrl}_s"></i><a href="${cdnPath}/docs/list?categoryId=${ifl.id}">${ifl.name }</a></h2>
                        <ul class="article_list">
                            <c:forEach items="${ifl.infoList}" var="info">
                            <li><i class="icon_format ${info.fileContentType}"></i><a class="topic" href="${cdnPath}/docs/${info.id}">${info.name}</a><span class="date fr"><fmt:formatDate value="${info.createTime}" pattern="yyyy-MM-dd"/></span></li>
                            </c:forEach>
                        </ul>
                    </div>
                    </c:if>
                    <c:if test="${i.index%2>0}">
                    <div class="list _right fl">
                           <h2><i class="icon_s ${ifl.imgageUrl}_s"></i><a href="${cdnPath}/docs/list?categoryId=${ifl.id}">${ifl.name }</a></h2>
                        <ul class="article_list">
                            <c:forEach items="${ifl.infoList}" var="info">
                            <li><i class="icon_format ${info.fileContentType}"></i><a class="topic" href="${cdnPath}/docs/${info.id}">${info.name}</a><span class="date fr"><fmt:formatDate value="${info.createTime}" pattern="yyyy-MM-dd"/></span></li>
                            </c:forEach>
                        </ul>
                    </div>
                    </div>
                </c:if>
                </c:forEach>
            </div>
            <div class="main_right fl">
                <h2>下载排行榜：</h2>
                <ul class="load_list">
                    <c:forEach items="${dinfoList}" var="df" varStatus="index">
                    <c:if test="${index.index==0}"><li><span class="subtitle first">1</span><a class="topic" href="${cdnPath}/docs/${df.id}">${df.name}</a><span class="num1 fr">${df.download}次</span></li></c:if>
                    <c:if test="${index.index==1}"><li><span class="subtitle second">2</span><a class="topic" href="${cdnPath}/docs/${df.id}">${df.name}</a><span class="num2 fr">${df.download}次</span></li></c:if>
                    <c:if test="${index.index==2}"><li><span class="subtitle third">3</span><a class="topic" href="${cdnPath}/docs/${df.id}">${df.name}</a><span class="num3 fr">${df.download}次</span></li></c:if>
                   <c:if test="${index.index>2}"><li><span class="subtitle">${index.index+1}</span><a class="topic" href="${cdnPath}/docs/${df.id}">${df.name}</a><span class="num fr">${df.download}次</span></li></c:if>
                    </c:forEach>
                </ul>
            </div>
        </div>
    </div>


</div>
<%@include file="../include/footer.jsp"%>
</body>
<script type="text/javascript">
</script>
</html>