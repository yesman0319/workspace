<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no">
		<title>我的直播间</title>
		<link rel="stylesheet" href="/css/reset.css" />
		<link rel="stylesheet" href="/css/mui/mui.css"/>
		<!--<link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">-->
		<link rel="stylesheet" href="/common/font-awesome-4.7.0/css/font-awesome.css" />
	</head>
	<body>
		<!--下拉刷新容器-->
		<div id="refreshContainer" class="mui-content mui-scroll-wrapper">
		  <div class="mui-scroll">
		    <!--数据列表-->
		    <ul class="mui-table-view mui-table-view-chevron">
				<c:forEach  var="item" items="${liveTopicVo.list }">
					<li class="mui-table-view-cell mui-media">
				        <a href="/liveroom/student/${item.roomId}/${item.courseId}/${item.id}">
				            <img class="mui-media-object mui-pull-left" src="${item.backImgUrl}">
				            <div class="mui-media-body">
				              ${item.name}
				                <p class='mui-ellipsis'>${item.mainTitle}</p>
				            </div>
				        </a>
			    	</li>
				</c:forEach>

		    </ul>
		  </div>
		</div>
		<script src="/js/lib/mui/mui.min.js"></script>
		<script>
			mui.init({
			  pullRefresh : {
			    container:"#refreshContainer",//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
			    up : {
			      		height:30,//可选.默认50.触发上拉加载拖动距离
//			      		auto:true,//可选,默认false.自动上拉加载一次
			      		contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
			      		contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
			      		callback :pullfresh //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
			    	}
			  	}
			});
			//重置上拉加载
			//mui('#refreshContainer').pullRefresh().refresh(true);
			function pullfresh(){
				this.endPullupToRefresh(true);
//				$.ajax({
//					type:"get",
//					url:"",
//					async:true,
//					dataType:"json",
//					success:function(data){
//						if(data.length <= 0){
//							endPullupToRefresh(true);
//						}
//					}
//				});
				
			}
			mui('body').on('tap','a',function(){
			    window.top.location.href=this.href;
			});
		</script>
	</body>
</html>
