<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!doctype html>
<html lang="en" xmlns:gs="http://www.gensee.com/gsml">
<head>
<meta charset="UTF-8">
<meta content="width=device-width,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
<meta content="yes" name="apple-mobile-web-app-capable">
<meta content="black" name="apple-mobile-web-app-status-bar-style">
<meta content="telephone=no" name="format-detection">
<meta content="email=no" name="format-detection">
<title>${courseName}-直播分享</title>
<%@include file="../include/pub.jsp"%>
<link rel="stylesheet" href="${cdnPath}/css/h5/h5_reset.css" type="text/css">
<link rel="stylesheet" href=".${cdnPath}/css/h5/font-awesome.min.css" type="text/css">
<link rel="stylesheet" href="${cdnPath}/css/h5/h5_live.css" type="text/css">
<link rel="stylesheet" href="${cdnPath}/css/live_bootstrap.css" type="text/css">
<script src="${basePath}/js/live/course_bootstrap.js"></script>
<script src="${basePath}/js/live/json2.min.js"></script> 
<script src="${basePath}/js/live/gssdk.js"></script>
<script src="${cdnPath}/js/live/tester.js"></script>
<script type="text/javascript">
var basePath = "${bathPath}";
var canSee = "${canSee}";
if(canSee == "false"){
	toLocation();
}

 function toLocation(){	
	 alert("${errorMsg},请您离开本页面");
	 window.location.href = basePath + "/h5/livelessions.html";
}
</script>

</head>
<body>
<div class="wrap">
<section>
	<div class="center">
		<h1 class="download" >下载精英计划APP，观看更多视频~ <span><a href="<%=com.xiaoma.universe.common.utils.PropertiesUtils.getString("APP_DOWNLOAD_URL")%>">下载</a></span></h1>
		<div id="showVideo" >
			<div style="height: 320px;" >
				<c:choose>
					<c:when test="${status == 3 }">
						<div class="logo">
							<img src="${cdnPath }/i/live-logo.jpg">
						</div>
						<div class="autoPlay">
							<p>即将播放</p>
							<img src="${cdnPath }/i/live-icon.png">
						</div>
					</c:when>
					<c:when test="${status == 2 }">
						<gs:video-live site="${host }" ctx="webcast" ownerid="${sign }" authcode="${password }"  compress="false" />
					</c:when>
					<c:otherwise>
						<gs:video-vod site="${host }" ctx="webcast"	ownerid="${sign }" authcode="${password }"/>
					</c:otherwise>
				</c:choose>
			</div>
			<div class="hearing" >
				<h1>${courseName }</h1>
				<p>主讲老师：${teacherName }</p>
				<p><fmt:formatDate value="${startTime}" pattern="HH:mm"/>-<fmt:formatDate value="${endTime}" pattern="HH:mm"/></p>
				
				<div class="vid" >				
				<c:choose>
					<c:when test="${status == 3 }">
						<div class="logo">
							<img src="${cdnPath }/i/live-logo.jpg">
						</div>
						<div class="autoPlay">
							<p>即将播放</p>
							<img src="${cdnPath }/i/live-icon.png">
						</div>
					</c:when>					
					<c:when test="${status == 2 }">
						<gs:doc site="${host }" ctx="webcast"	ownerid="${sign }" authcode="${password }" compress="false" fullscreen="true" />
					</c:when>
					<c:otherwise>
						<gs:doc site="${host }" ctx="webcast" ownerid="${sign }" fullscreen="true"  compress="false" />
					</c:otherwise>
				</c:choose>
				</div>
				<button class="btn" id="svid">切换</button>
			</div>
		</div>
		
		<div id="hiddenVideo" style="display:none">
			<div style="height: 320px;">
			<c:choose>
				<c:when test="${status == 3 }">
					<div class="logo">
						<img src="${cdnPath }/i/live-logo.jpg">
					</div>
					<div class="autoPlay">
						<p>即将播放</p>
						<img src="${cdnPath }/i/live-icon.png">
					</div>
				</c:when>
				<c:when test="${status == 2 }">
					<gs:doc site="xiaoma.gensee.com" ctx="webcast"
						ownerid="${sign }" authcode="${password }" compress="false" fullscreen="true" />
				</c:when>
				<c:otherwise>
					<gs:doc site="${host }" ctx="webcast" ownerid="${sign }" fullscreen="true" />
				</c:otherwise>
			</c:choose>
			</div>
			<div class="hearing">
				<h1>${courseName }</h1>
				<p>主讲老师：${teacherName }</p>
				<p>${dateStr }</p>
				<div class="vid" >
				<c:choose>
					<c:when test="${status == 3 }">
						<div class="logo">
							<img src="${cdnPath }/i/live-logo.jpg">
						</div>
						<div class="autoPlay">
							<p>即将播放</p>
							<img src="${cdnPath }/i/live-icon.png">
						</div>
					</c:when>
					<c:when test="${status == 2 }">
						<gs:video-live site="${host }" ctx="webcast"
							ownerid="${sign }" authcode="${password }" completed="onCompleted" compress="false"/>
					</c:when>
					<c:otherwise>
						<gs:video-vod site="${host }" ctx="webcast"
							ownerid="${sign }" authcode="${password }"/>
					</c:otherwise>
				</c:choose>
				</div>
				<button class="btn" id="hvid">切换</button>
			</div>
		</div>
		
		<c:if test="${not empty courseDetails }">
		<div class="videos">
			<h1>
				<p>相关视频</p>
			</h1>
			<ul>
				<c:forEach items="${courseDetails }" var="item">
				<li onclick="live('${item.id}', 1)">								
					<img src="${cdnPath }/i/live-play.png">
					<div>
						<p>${item.name }</p>
						<p><fmt:formatDate value="${item.startTime}" pattern="HH:mm"/>-<fmt:formatDate value="${item.endTime}" pattern="HH:mm"/></p>
					</div>
				</li>
				</c:forEach>
			</ul>
		</div>
		</c:if>
	</div>
</section>
</div>
 <script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
<script type="text/javascript" src="${cdnPath}/js/h5/h5_share.js"></script>
<script type="text/javascript">
	/* var userToken = $.cookie("TOEFL_TOKEN");	
	function live(host, sign, password, typeId, teacherName, courseName,
			dateStr, status, token) {		
		//var token = "5260842899ee44ff8c5e4b6d391a729a";//"${token}";
		var url = "/h5/live?token=" + token + "&host=" + host + "&sign=" + sign
				+ "&password=" + password + "&typeId=" + typeId
				+ "&teacherName=" + teacherName + "&courseName=" + courseName
				+ "&dateStr=" + dateStr + "&status=" + status;
		window.open(url);
	} */
	
	
	$("#svid").bind("click",function(){		
		//alert("1="+$(".gs-sdk-widget").height());
		$("#showVideo").css("display","none");
		$("#hiddenVideo").css("display","block");
	});
		
	$("#hvid").bind("click",function(){		
		//alert("2="+$(".gs-sdk-widget").height());
		$("#showVideo").css("display","block");
		$("#hiddenVideo").css("display","none");
		
	});
	
	function live(id, status){
		if(id == null || id == "0" || id == ""){
			return ;
		}
		window.open("${basePath}/h5/livelession/" + id + ".html?status="+status);
	}
	

	/* var wg1 = GS.createChannel();
	//开始视频
	function playVideo(){
		$("#play_btn").removeClass("pause_icon");
		 wg1.send("play", {
		 });
	} */
	
	var lineLink = window.location.href;//这个是分享的网址
	var imgUrl = "${cdnPath}"+"/i/ic_share.png";//这里是分享的时候的那个图片
	var descContent = "精英计划-${courseName}直播课";
	var share_title = "精英计划-${courseName}直播课"; 
	
	
	$(function(){
		//playVideo();
		share(lineLink,imgUrl,descContent,share_title);
	}); 
</script>
</body>
<!--百度统计代码-->
<script>
</script>
</html>