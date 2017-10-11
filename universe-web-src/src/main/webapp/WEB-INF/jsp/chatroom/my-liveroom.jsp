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
		<%@include file="../include/pub.jsp"%>   
		<link rel="stylesheet" href="/css/reset.css" />
		<link rel="stylesheet" href="/css/mui/mui.css"/>
		<link rel="stylesheet" href="/css/chatroom/my-liveroom.css"/>
		<!--<link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">-->
		<link rel="stylesheet" href="/common/font-awesome-4.7.0/css/font-awesome.css" />
	</head>
	<body>
		<div class="mui-content">
			<div class="banner">
				<img class="bg" src="/img/chatroom/bg-2.png" alt="背景" />
				<div class="my-info">
					<img class="lm-head" src="${liveRoomVo.avatar }" alt="直播间头像" />
					<div class="info-box">
						<p class="lm-name">${liveRoomVo.teaName }的直播间</p>
						<p>
							<span id="flow-num">${liveRoomVo.fansNum }</span>人关注
						</p>
					</div>
				</div>
			</div>
			<!--<div class="create-topic">
				<a href="#">
					<i class="fa fa-file"></i>
					新建话题
				</a>
				<a href="#">
					<i class="fa fa-cubes"></i>
					新建系列课
				</a>
			</div>-->
			<div class="my-course">
				<div style="padding: 10px 10px;">
					<div id="segmentedControl" class="mui-segmented-control mui-segmented-control-inverted mui-segmented-control-positive">
						<a class="mui-control-item mui-active" href="#item1">话题</a>
						<a class="mui-control-item" href="#item2">系列课</a>
						<a class="mui-control-item" href="#item3">介绍</a>
					</div>
				</div>
				<div>
					<div id="item1" class="mui-control-content mui-active">
						<ul class="topics">
							<c:forEach var="item" items="${liveRoomVo.listTopics }">
								<li>
									<a class="topic" data-type="${item.liveStatus }" href="/liveroom/teacher/${item.roomId}/${item.courseId}/${item.id}">
										<div class="left">
											<img src="${item.backImgUrl}" />
											<!-- <mark>免费</mark> -->
										</div>
										<div class="right">
											<p class="title">${item.name}</p>
											<p class="status">
												<c:choose>
													<c:when test="${item.liveStatus==0}" >
														<span><i class="fa fa-spotify"></i>未开始</span>
													</c:when>	
													<c:when test="${item.liveStatus==1}" >
														<span class="living"><i class="fa fa-stack-overflow"></i>进行中</span>
													</c:when>	
													<c:otherwise>
														<span><i class="fa fa-spotify"></i>已结束</span>
													</c:otherwise>
												</c:choose> 
												<span class="start-time">
													<fmt:formatDate type="both"  value="${item.startTime}" />
												</span>
											</p>
											<p class="detail">
												<span class="audience-num">
													<i class="fa fa-user"></i>
													${item.viewNum}人次
												</span>
												<span class="tool">
													<i class="fa fa-cog"></i>
													操作
												</span>
											</p>
										</div>
									</a>
								</li>
								
							</c:forEach>

						</ul>
					</div>
					<div id="item2" class="mui-control-content">
						<c:forEach var="item" items="${liveRoomVo.listCourses }">
							<dl>
								<dd>
									<a href="/liveroom/teacher/${item.roomId}/${item.id}">
										<img src="${item.backImgUrl }" />
									</a>
								</dd>
								<dt>
									<p class="course-name">${item.name }</p>
									<p class="course-related">
										<span class="sub-num">${item.fansNum }</span>人已关注
										<a class="course-setting fa fa-bars"></a>
									</p>
								</dt>
							</dl>
						</c:forEach>
					</div>
					<div id="item3" class="mui-control-content">
						${liveRoomVo.introduction }
					</div>
				</div>
			</div>
			
		</div>
		<script src="/js/lib/mui/mui.min.js"></script>
		<script>
			/*$(".topic").each(function(index,value){
				var type = $(value).data("type");
				if(type==0){
					console.log(type);
					$(value).attr("href","javascript:;");
				}
			});*/
		</script>
	</body>
</html>


