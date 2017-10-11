<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no"	name="viewport">
<meta content="yes" name="apple-mobile-web-app-capable">
<meta content="black" name="apple-mobile-web-app-status-bar-style">
<meta content="telephone=no" name="format-detection">
<meta content="email=no" name="format-detection">
<title>精英计划-播放列表</title>
<%@include file="../include/pub.jsp"%>
<link rel="stylesheet" href="${cdnPath}/css/h5/h5_reset.css" type="text/css">
<link rel="stylesheet" href=".${cdnPath}/css/h5/font-awesome.min.css" type="text/css">
<link rel="stylesheet" href="${cdnPath}/css/h5/h5_shart.css" type="text/css">
</head>
<body>
	<div class="wrap">
		<section>
		<div class="center">
			<c:if test="${not empty courseMap }">
				<c:forEach items="${courseMap }" var="item">
					<c:if test="${not empty item.value }">
						<div class="times">
							<h1>${item.key }</h1>
						</div>
						<div class="videos">
							<ul>
								<c:forEach items="${item.value }" var="val">
									<li>
										<img src="${cdnPath }/i/live-play.png">
										<div>
											<p>${val.name }</p>
											<p><fmt:formatDate value="${val.startTime}" pattern="HH:mm"/>-<fmt:formatDate value="${val.endTime}" pattern="HH:mm"/></p>
										</div> 
										<c:choose>
											<c:when test="${item.key == '昨天' }">
												<span class="huifang"  onclick="live('${val.id}', 1);" >回放</span>
											</c:when>
											<c:when test="${item.key == '今天' }">
												<c:if test="${val.status == 1 }">
													<span class="weizhibo"  >已结束</span>
												</c:if>
												<c:if test="${val.status == 2 }">
													<span class="zhibo" onclick="live('${val.id}',2);"  >直播中</span>
												</c:if>
												<c:if test="${val.status == 3 }">
													<span class="weizhibo">未开始</span>
												</c:if>
											</c:when>
											<c:when test="${item.key == '明天' }">
												<span class="yugao">预告</span>
											</c:when>
										</c:choose>
									</li>
								</c:forEach>
							</ul>
						</div>
					</c:if>
				</c:forEach>
			</c:if>
		</div>
		</section>
		<h1 class="download"  onclick="location.href='<%=com.xiaoma.universe.common.utils.PropertiesUtils.getString("APP_DOWNLOAD_URL")%>';">
			下载精英计划APP，观看更多视频~ <span><a>下载</a> </span>
		</h1>
	</div>
</body>
<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script type="text/javascript" src="${cdnPath}/js/h5/h5_share.js"></script>
<script type="text/javascript">
	
	/* function live(host, sign, password, typeId, teacherName, courseName,
			dateStr, status) {
		//var userToken = $.cookie("TOEFL_TOKEN");
		//if(userToken){alert("请");}
		var token = "${token}";
		var url = "/h5/live?token=" + token + "&host=" + host + "&sign=" + sign
				+ "&password=" + password + "&typeId=" + typeId
				+ "&teacherName=" + teacherName + "&courseName=" + courseName
				+ "&dateStr=" + dateStr + "&status=" + status;
		window.open(url);
	} */
	
	function live(id, status){
		if(id == null || id == "0" || id == ""){
			return ;
		}
		window.open("${basePath}/h5/livelession/" + id + ".html?status="+status);
	}
	
	var basePath = "${bathPath}";
	var lineLink = window.location.href;//这个是分享的网址
	var imgUrl = "${cdnPath}"+"/i/ic_share.png";//这里是分享的时候的那个图片
	var descContent = "精英计划-直播列表";
	var share_title = "精英计划-直播列表"; 
	
	$(function(){
		share(lineLink,imgUrl,descContent,share_title);
	});
	
</script>
</html>