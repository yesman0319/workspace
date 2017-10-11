<%@ page  contentType="text/html; charset=UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
      <%@include file="../include/pub.jsp"%>
    <link rel="stylesheet" href="${cdnPath}/css/common.css"/>
    <link rel="stylesheet" href="${cdnPath}/css/info_list.css"/>
    <title id="title">资料下载 - 精英计划</title>
</head>
<body>
<%@include file="../include/header.jsp"%>
<div class="layout">
    <div class="main">
        <div class="left fl">
            <div class="con search_wrap">
                <div class="search_th">
                    <h2>筛选项：</h2>
                     <input type="hidden" id="cateId" value="${categoryId}"></input>
                     <input type="hidden" id="label" value="${label}"></input>
                     <input type="hidden" id="islike" value="${islike}"></input>
                     <input type="hidden" id="total" value="${total}"></input>
                     <input type="hidden" id="pageSize" value="${pageSize}"></input>
                     <input type="hidden" id="sort" value="${sort}"></input>
                     <input type="hidden" id="page" value="${page}"></input>
                    <ul>
                        <li class="" id="selectCategory"></li>
                        <li class="" id="selectLabel" ></li>
                    </ul>
                    <div class="search_group fr">
                        <input class="search" maxlength="5" type="text" placeholder="请输入关键词"  value="${name}" id="searchName"/>
                        <a class="search_btn"><img src="${cdnPath}/i/info/search.png" alt="搜索" onclick="search()"/></a>
                    </div>
                </div>
                <div class="search_td sort">
                    <h2>分类：</h2>
                    <ul>
                        <li class="sort_li" category="null" disabled="disabled" ><a class="cur" id="de_sort">不限</a></li>
                        <c:forEach items="${categoryList}" var="cg" varStatus="i">
                              <li class="sort_li" category="${cg.id}"><a>${cg.name}</a></li>
                        </c:forEach>
                    </ul>
                    <a class="more_btn fr" data-click="false">更多&nbsp;<span>&or;</span></span></a>
                </div>
                <div class="search_td label">
                    <h2>标签：</h2>
                    <ul>
                        <li class="label_li"><a class="cur" id="de_label">不限</a></li>
                         <c:forEach items="${labelList}" var="lg" varStatus="i">
                             <li class="label_li"><a>${lg.name}</a></li>
                        </c:forEach> 
                    </ul>
                    <a class="more_btn fr" data-click="false">更多&nbsp;<span>&or;</span></span></a>
                </div>
            </div>
            <div class="con list">
                <p class="h"><span class="all fl">全部</span>
                    <a class="fr date showcolor" num="create_time" href="" onclick="orders(1);return false">上传时间<i class="sort"></i></a>
                    <a class="fr load showcolor"  num="download"   href="" onclick="orders(2);return false">下载量<i class="sort"></i></a>
                </p>
                <ul>
                <c:forEach items="${infoList}" var="il" varStatus="i">
                    <li class="list_li"><i class="${il.fileContentType}"></i><a class="article" href="${cdnPath}/docs/${il.id}">${il.name}</a><span class="up_date"><fmt:formatDate value="${il.createTime}" pattern="yyyy-MM-dd"/></span><span class="load_count">${il.download}</span></li>
                </c:forEach>
                </ul>
            </div>
            <div style="margin-top:20px;width:100%;text-align:center;">
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
        </div>
        <div class="main_right fl">
            <div>
<!--                 <h2>相关练习推荐：</h2>
                <ul class="recommend_list">
                    <li><span class="dot"></span><a class="go" href="">TPO真题TPO真题TPO真题托福机经托福机经</a><span class="go_ex fr">去练习&gt;</span></li>
                    <li><span class="dot"></span><a class="go" href="">托福经典加试托福经典加试托</a><span class="go_ex fr">去练习&gt;</span></li>
                    <li><span class="dot"></span><a class="go" href="">TPO真题TPO真题</a><span class="go_ex fr">去练习&gt;</span></li>
                    <li><span class="dot"></span><a class="go" href="">托福经典加试托福经</a><span class="go_ex fr">去练习&gt;</span></li>
                    <li><span class="dot"></span><a class="go" href="">记忆复写经典加试</a><span class="go_ex fr">去练习&gt;</span></li>
                </ul>
                <hr class="line"/> -->
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
 <input type="hidden" value="${cdnPath}" id="basePath">
<%@include file="../include/footer.jsp"%>
<script type="text/javascript" src="${cdnPath}/js/info/infolist.js">></script>
</body>
</html>