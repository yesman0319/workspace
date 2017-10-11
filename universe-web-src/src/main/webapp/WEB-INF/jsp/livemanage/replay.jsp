<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>精英计划 | 视频回放列表</title>
     <%@include file="../include/pub.jsp"%>
    <link rel="stylesheet" href="${cdnPath}/css/common.css"/>
     <link rel="stylesheet" href="${cdnPath}/css/replay.css"/>
</head>
<body>
<!-- start 导航 -->
<!-- end 导航 -->
<div class="layout">
    <!--面包屑-->
    <p class="location"><a href="${basePath}">精英计划</a>&nbsp;&gt;
        <a class="cur" href="${basePath}/replays">回放课</a>
    </p>
    <div class="wrap">
        <div class="main fl">
        <!-- start 数据 -->
        <c:if test="${ not empty datas}">
        		<c:forEach items="${datas }" var="map" varStatus="s">
		        		<div class="list">
				               	<h2>${weeks[map.key]}&nbsp;${map.key}</h2>
				                <ul class="listUl">
				        			<c:if test="${not empty map.value }">
					        			<c:forEach items="${map.value }" var="item" >
					        				 <li>
						                        <div class="con">
						                            <p class="time"><fmt:formatDate value="${item.startTime}" pattern="HH:mm"/>-<fmt:formatDate value="${item.startTime}" pattern="HH:mm"/></p>
						                            <p class="title">${item.name }</p>
						                            <p class="course">${item.planName }</p>
						                            <p class="teacher">${item.teacherName }</p>
						                            <p class="see">课程回放<span>></span></p>
						                        </div>
						                    </li>
						        		</c:forEach>
						        	</c:if>
				                </ul>	
			            </div>
        		</c:forEach>
        </c:if>
        <c:if test="${empty datas}">
        暂无回放课
        </c:if>
         <!-- end 数据 --> 
           <!-- start 分页  -->
           <%@include file="replay_page.jsp"%>
           <!-- end 分页  -->
             
        </div>
        
       <!--start 推荐的学习计划  -->
      <%--  <c:if test="${not empty plans }">
       		        <div class="side fl">
			            <div class="plan">
			               <h2>学习计划推荐</h2>
			                <c:forEach items="${plans}" var="plan">
			                	 <div class="con">
				                    <img class="plan_pic fl" src="${cdnPath}/i/info/plan_default.png" alt="学习计划">
				                    <div class="plan_desc fl">
				                        <h2>${plan.name}</h2>
				                        <p><i class="ic_num"></i><span class="num">2554</span>人在学</p>
				                        <p><i class="ic_count"></i><span class="count">265</span>题</p>
				                    </div>
			                	</div>
			                </c:forEach>
			            </div>
        		</div>
       </c:if> --%>
       
               <div class="side fl">
            <div class="plan">
               <h2>学习计划推荐</h2>
                <div class="con">
                   <img class="plan_pic fl" src="${basePath}/i/info/plan_default.png" alt="学习计划">
                   <div class="plan_desc fl">
                     <h2>21天考前冲刺</h2>
                     <p><i class="ic_num"></i><span class="num">2554</span>人在学</p>
                     <p><i class="ic_count"></i><span class="count">265</span>题</p>
                    </div>
               </div>
                <div class="con">
                    <img class="plan_pic fl" src="${basePath}/i/info/plan_default.png" alt="学习计划">
                    <div class="plan_desc fl">
                        <h2>21天考前冲刺</h2>
                        <p><i class="ic_num"></i><span class="num">2554</span>人在学</p>
                        <p><i class="ic_count"></i><span class="count">265</span>题</p>
                    </div>
                </div>
            </div>
        </div>
       
       
       <!--end 推荐的学习计划     -->
    </div>
</div>
<!-- start footer  -->
<!-- start footer  -->
</body>
<script type="text/javascript">
function pageback(page){
	window.location.href= window.xiaoma.path + "/replays?page="+page;
}
</script>
</html>