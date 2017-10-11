<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="/padding" prefix="padding"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>机经专题</title>
    <link rel="stylesheet" href="${cdnPath}/css/common.css"/>
    <link rel="stylesheet" href="${cdnPath}/css/jijing/jijing_exam.css"/>
    <%@include file="../include/pub.jsp"%>
</head>
<body>
<jsp:include page="../include/header.jsp"></jsp:include>
<div class="layout">
	<!--面包屑-->
    <p class="location"><a href="javascript:;">精英计划</a>&nbsp;&gt;
        <a class="cur" href="javascript:;">历年真题</a>
    </p>
    <div class="years-examination">
    	<div class="exam-top">
    		<p class="exam-title">历年真题筛选</p>
    		<ul class="jj_type">
	    		<li class="statement">类型 : </li>
	    		<li class="jj_type_item sItems <c:if test='${type==1}'>selected</c:if>" value="1">口语</li>
	    		<li class="jj_type_item sItems <c:if test='${type==2}'>selected</c:if>" value="2">写作</li>
	    	</ul>
	    	<ul class="jj_date">
	    		<li class="statement">日期 : </li>
	    		<c:forEach items="${ydata}" var="y">
	    		<li class="jj_date_item">
	    		   	<span class="select_year sItems <c:if test='${y.year==year}'>selected</c:if>">${y.year}<i class="triangle"></i></span>
	    			<div class="month_item">
	    				<span class="select_month sItems <c:if test='${month==0}'>selected</c:if>" id="0">全部</span>
	    				<c:forEach items="${y.monthData}" var="m">
	    					<span class="select_month sItems <c:if test='${m.month==month}'>selected</c:if>" id="${m.month}">${m.month}月</span>
	    				</c:forEach>
	    			</div>
	    		</li>
	    		</c:forEach>
	    	</ul>
    	</div>
    	<div class="exam-bottom">
    		<ul>
    		   <c:forEach items="${questions}" var="que">
    			<li class="exam_detail done">
    				<a href="${cdnPath}/jijing/exercise?type=${que.type}&questionId=${que.id}&name=${que.name}&country=${que.country}&groupType=${que.groupType}">
    					<p class="exam_content">
    						<c:if test="${que.islearn==1}"><span class="done_tag">已练</span></c:if>
    						<span class="content-wrap">
    							${que.content}
    						</span>
    						<span class="ellipsis">....</span>
    					</p>
    					<div class="exam_info">
    						<div class="exam_info_left">
    							<span class="exam_date">${que.name}</span>
    							<span class="exam_place">${que.country}</span>
    							<span class="ab">${que.groupType}卷</span>
    						</div>
    						<div class="exam_info_right">
    							<i class="user_icon"></i>
    							${que.studyCount}人已练
    						</div>
    					</div>
    				</a>
    			</li>
    		    </c:forEach>
    		</ul>
    		  
			<padding:padding pagintInfo="${paddingInfo}" /> 
    	</div>
    </div>
    <div class="prediction">
    	<p class="exam-title">机经预测</p>
    	<ul class="recommond_jj">
    	 <c:forEach items="${plans}" var="plan">
    		<li>
    			<div class="recom_default"> 
    				1月14日口语机经抢鲜版
    			</div>
    			<div class="recom_hover">
    				<a href="/plans/${plan.planId}"><img src="${plan.imageWebList}" alt="学习计划"/></a>
    				<div class="recom_hover_info">
    					<p class="title">
    						<a href="/plans/${plan.planId}">${plan.planName}</a>
    					</p>
    					<p class="study_num">
    						<i class="user_icon"></i>${plan.learnNumber}人在学
    					</p>
    					<p class="price">
    						<i class="price_icon"></i>
    						${plan.localPrice}
    					</p>
    				</div>
    			</div>
       		</li>
        </c:forEach>
       		<a id="check_more" href="/plans">查看更多></a>
    	</ul>
    </div>
</div>
		
<jsp:include page="../include/footer.jsp"></jsp:include>
<script type="text/javascript">
	$(function(){
		var jj_year,jj_month,jj_type;
		var basePath = window.location.href.split("?")[0]; 
		var param = window.location.href.split("?")[1];
		var eleArray = ["jj_type_item","select_year","select_month","recommond_jj li"];
		for(n = 0;n < eleArray.length;n++){
			selectExamItems(eleArray[n]);
			init(eleArray[n]);
		}
		//初始化部分样式和筛选参数赋值;
		function init(ele){
			if(ele == "recommond_jj li"){
				$("."+ele).first().addClass("choiced");
			}else{
				$(".select_year.selected").next().show();
			}
			if(param){//重新取href中的参数
				jj_type = param.split("&")[0].split("=")[1];
				jj_year = param.split("&")[1].split("=")[1];
				jj_month = param.split("&")[2].split("=")[1];
			}else{//第一次默认参数
				jj_type = 1;
				jj_year = $(".select_year").first().text();
				jj_month = 0;
			}
			
		}
		//二级条件筛选
		function selectExamItems(ele){
			$("."+ele).each(function(i,v){
				if(ele == "recommond_jj li"){
					v.onmouseover = function(){
						$("."+ele).removeClass("choiced").eq(i).addClass("choiced");
					}	
				}else{
					v.onclick = function(){
						$("."+ele).removeClass("selected").eq(i).addClass("selected");
						if(ele == "select_year"){
							$(".month_item").hide().eq(i).show();
						}
						if(ele == "jj_type_item"){
							jj_type = v.value;
						}else if(ele == "select_year"){
							jj_year = v.innerText;
							if($(v).next().find(".select_month").length < jj_month){
								jj_month = 0;
							}
						}else if(ele == "select_month"){
							jj_month = v.id;
						}
						window.location.href = basePath + "?type="+jj_type+"&year="+jj_year+"&month="+jj_month+"&studyType=0";
					}
				}
				
			})	
		}
		
		//增加省略号
		$(".content-wrap").each(function(i,v){
			var wrapWidth = $(v).width();
			$(".ellipsis").eq(i).css("left",(wrapWidth + 5) + "px");
		})
				
	})
</script>
</body>
</html>