<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
    <title>${articleVO.title }</title>
    <link rel="stylesheet" href="${cndPath}/css/reset.css" />
    <link rel="stylesheet" href="${cndPath}/css/wei-course-details.css" />
</head>
<body>
<jsp:include page="wei_download.jsp"></jsp:include>
<header><img src="${articleVO.imageDetail }" alt=""/></header>
<div class="wrap">
    <h2>${articleVO.title }</h2>
    <p class="update-time">${articleVO.updateTimeStr }</p>
    <c:if test="${audioVO!=null}">
	    <div class="container"> 
	        <div id="audioPlay">
	            <img src="${cndPath}/img/wei-course/wei-stop.png" alt=""/>
	            <audio src="${audioVO.playUrl }"></audio>
	        </div>
	        <div>
	            <p>${articleVO.title }</p>
	            <p>
	                <span>${audioVO.durationStr }</span><span>${audioVO.fileSize }</span>
	            </p>
	        </div>
	    </div>
    </c:if>
    
    <article>
        ${articleVO.content }
    </article>   
</div>
<c:if test="${recommendVideoList.size()>0 || recommendPlanList.size()>0}">
<p class="recommend">课程推荐</p>
</c:if>
<c:if test="${recommendVideoList.size()>0 }">
<ul class="recommend-list">
		<c:forEach items="${recommendVideoList }" var="video" varStatus="status"> 
			<li>
			    <a href="${basePath}/courses/h5/${video.id }.html">
				<img src="${video.coverPhoto }" alt="" />
				<span>${video.name}</span>
				</a>
			</li>
		</c:forEach>
</ul>
</c:if>
<c:if test="${recommendPlanList.size()>0 }">
<div class="plan-pic">
		<c:forEach items="${recommendPlanList }" var="plan" varStatus="status">
			 <div> 
			    <a href="${basePath}/h5/plan/share/${plan.planId }.html">
		        <img src="${plan.imageAppList }" alt=""/>
		        <span>${plan.planName }</span>
                 </a>
		    </div> 
		</c:forEach> 
</div>
</c:if>
<c:if test="${userStatus.status!=1}">
<br/>
<br/>
<br/>
<br/>
<br/>
<footer>
    <div>
            <span class="price">
                <i>&yen;</i>
                <span>${goodInfo.localPrice }</span>
            </span>

    </div>
    <a href="${basePath}/h5/microcourse/courses/${articleVO.courseId}/buy">订阅</a>
</footer>
</c:if>

<script type="text/javascript">
    var playBtn=document.getElementById("audioPlay");
    if(playBtn){
    	var myAudio=playBtn.getElementsByTagName("audio")[0];
        var myImg=playBtn.getElementsByTagName("img")[0];
        playBtn.addEventListener("click",function(e){
          if(myAudio.paused){//暂停
              myAudio.play();
              myImg.setAttribute('src','${cndPath}/img/wei-course/wei-play.png');
          }else{
              myAudio.pause();
              myImg.setAttribute('src','${cndPath}/img/wei-course/wei-stop.png');
          }
        });
        myAudio.addEventListener("ended",function(){
            myImg.setAttribute('src','${cndPath}/img/wei-course/wei-stop.png');
        });
    }
    
</script>
</body>
</html>