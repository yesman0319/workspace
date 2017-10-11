<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<div style="margin-top:20px;width:100%;text-align:center;">
                <div class="page">
                    <span class="first" onclick="turnPage(1)">首页</span>
                     <c:if test="${page > 1}"> 
                    <span class="prev" onclick="turnPage(${page-1})">上一页</span>
                     </c:if>
                     <ul class="page_list">
                       <c:if test="${totalPage <=6}" > 
                           <c:forEach begin="1" end="${totalPage}" step="1" var="i">
                                <li><a class='<c:if test="${curPage == i}">pageActive</c:if>'  href="javascript:turnPage(${i});">${i}</a></li>
                            </c:forEach>
                       </c:if>
                       <c:if test="${totalPage>6}">
                           <c:if test="${page<5}">
	                           <c:forEach begin="1" end="5" step="1" var="i">
	                                <li><a class='<c:if test="${curPage == i}">pageActive</c:if>'  href="javascript:turnPage(${i});">${i}</a></li>
	                            </c:forEach>
	                            <li class="omit_left">...</li>
                            </c:if>
	                       <c:if test="${page>=5 && page<totalPage-3}"> 
	                           <li class="omit_left">...</li>
	                           <c:forEach begin="${page-1}" end="${page+2}" step="1" var="i">
	                                <li><a class='<c:if test="${curPage == i}">pageActive</c:if>'  href="javascript:turnPage(${i});">${i}</a></li>
	                            </c:forEach>
	                            <li class="omit_left">...</li>
	                       </c:if>  
	                       <c:if test="${page>totalPage-4}"> 
	                           <li class="omit_left">...</li>
	                           <c:forEach begin="${totalPage-4}" end="${totalPage}" step="1" var="i">
	                                <li><a class='<c:if test="${curPage == i}">pageActive</c:if>'  href="javascript:turnPage(${i});">${i}</a></li>
	                            </c:forEach>
	                       </c:if>
                       </c:if> 
                    </ul>
                     <c:if test="${page < totalPage}"> 
                    	<span class="next" onclick="turnPage(${page+1})">下一页</span>
                    </c:if>
                    <span class="last" onclick="turnPage(${totalPage})">末页</span>
                    <span class="page_count">共<span class="total_count">${totalPage}</span>页</span>
                    <label class="cur_page">当前<input class="goTO" type="text" value="${page}"/>页</label>
                    <a class="ok" href="javascript:onclick:turnPage($('.goTO').val());">确定</a>
                </div>
 </div>
<script type="text/javascript">
	function turnPage(page){
		if(page == null || page == ""){
			page = "1";
		}
		pageback(page);
	}
</script>