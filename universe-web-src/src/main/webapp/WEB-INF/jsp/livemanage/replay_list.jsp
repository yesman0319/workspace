<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>回放课 - 精英计划</title>
     <%@include file="../include/pub.jsp"%>
    <link rel="stylesheet" href="${cdnPath}/css/common.css"/>
     <link rel="stylesheet" href="${cdnPath}/css/replay.css"/>
</head>
<body>
<!-- start 导航 -->
<%@include file="../include/header.jsp"%>
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
						                            <p class="time"><fmt:formatDate value="${item.startTime}" pattern="HH:mm"/>-<fmt:formatDate value="${item.endTime}" pattern="HH:mm"/></p>
						                            <p class="title">${item.name }</p>
						                            <p class="course">${item.planName }</p>
						                            <p class="teacher">${item.teacherName }</p>
						                            <p class="see"><a href="#"  onclick="check(${item.id},${item.planId},'${item.planName }');">课程回放</a><span>></span></p>
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
         <c:if test="${not empty datas}">
           <%@include file="replay_page.jsp"%>
        </c:if>
           <!-- end 分页  -->
             
        </div>
        
       <!--start 推荐的学习计划  -->
      <c:if test="${not empty plans }">
       		        <div class="side fl">
			            <div class="plan">
			               <h2>学习计划推荐</h2>
			                <c:forEach items="${plans}" var="plan">
			                	 <div class="con" >
				                    <img class="plan_pic fl" src="${plan.imageWebList }" alt="学习计划"   onclick="window.open('${basePath}/plans/${plan.id}')" style="cursor: pointer;">
				                    <div class="plan_desc fl" >
				                        <h2 onclick="window.open('${basePath}/plans/${plan.id}')" style="cursor: pointer;">${plan.name}</h2>
				                        <p><i class="ic_num"></i><span class="num">${plan.learnNumber }</span>人在学</p>
				                        <p><i class="ic_count"></i><span class="count">${plan.totalExerciseNumber }</span>题</p>
				                    </div>
			                	</div>
			                </c:forEach>
			            </div>
        		</div>
       </c:if> 
       
               <%-- <div class="side fl">
            <div class="plan">
               <h2>学习计划推荐</h2>
                <div class="con">
                   <img class="plan_pic fl" src="${cdnPath}/i/info/plan_default.png" alt="学习计划">
                   <div class="plan_desc fl">
                     <h2>21天考前冲刺</h2>
                     <p><i class="ic_num"></i><span class="num">2554</span>人在学</p>
                     <p><i class="ic_count"></i><span class="count">265</span>题</p>
                    </div>
               </div>
                <div class="con">
                    <img class="plan_pic fl" src="${cdnPath}/i/info/plan_default.png" alt="学习计划">
                    <div class="plan_desc fl">
                        <h2>21天考前冲刺</h2>
                        <p><i class="ic_num"></i><span class="num">2554</span>人在学</p>
                        <p><i class="ic_count"></i><span class="count">265</span>题</p>
                    </div>
                </div>
            </div>
        </div> --%>
       
       
       <!--end 推荐的学习计划     -->
    </div>
</div>
<div id="payPlan_modal" style="display: none; z-index:100;">
			    <div id="payPlan_dialog">
			        <h2>
			            产品购买<span class="close_btn"></span>
			        </h2>
			        <span id="payPlan_tips">该回放课需购买&nbsp;<span style="color: #39c075;font-size:18px;" id="show_plan_name"></span>&nbsp;后观看</span>
			        <p class="btns">
			            <a href="#" id="check_plan">
			                购买计划
			            </a>
			        </p>
			        <p style="text-align:center; padding-top:15px;">
			        	注:若学习计划有时间限定，您只能观看此计划有效时间内的回放课
			        </p>
			    </div>
</div>
<!-- start footer  -->
<%@include file="../include/footer.jsp"%>
<!-- start footer  -->
</body>

<script type="text/javascript">
var basePath = "${basePath}";
var userId = "${sessionScope.userInfo.id}";
function pageback(page){
	window.location.href= window.xiaoma.path + "/replays?page="+page;
}

//检查权限
function check(id, planId, planName){
	//console.dir(userId);
	//检查用户是否登录
	if(userId == "" || userId == null || userId == "0"){
		window.location.href= basePath + "/login?backurl=replays";
		return;
	}
	
	//请求权限
   $.post(basePath + "/replay/permission/"+id+".html",{},
		   function(data){
		     if(data.code == 200){
		    	 window.location.href = basePath + "/replays/" + id + ".html";
		    	 return;
		     }else if(data.code == 401){
		    	 window.location.href= basePath + "/login?backurl=replays";
		    	 return;
		     }else if(data.code == 403){
		    	 //弹窗
		    	 $("#show_plan_name").html(planName);
		    	 var url = basePath + "/plans/" +planId;
		    	 $("#check_plan").attr("href", url);
		    	 $("#payPlan_modal").show();
		    	 return;
		     }
		     alert("服务器出错，请稍后！");
		   },
		   "json");
	}


	//点击关闭按钮清除蒙版
	$(".close_btn").click(function(){
		$(this).parent().parent().parent().hide();
		 $("#show_plan_name").html("");
    	 $("#check_plan").attr("href", "");
	})


</script>
</html>