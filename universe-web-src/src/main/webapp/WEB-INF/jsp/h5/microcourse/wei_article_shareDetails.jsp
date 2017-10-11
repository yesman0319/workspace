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
    <link rel="stylesheet" href="${cndPath}/css/wei-course-shareDetails.css" />
</head>
<body>
<header><img src="${cndPath}/img/wei-course/cup.png" alt=""/>
    <a href="javascript:;" class="see-list" id="seeList">看看谁抢到了</a>
    <p class="ranking">第${numberUser }名</p>
</header>
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
<footer>
    <a href="${basePath}/h5/microcourse/courses/${articleVO.courseId}">去订</a>
</footer>
<div class="mark" id="mark">
    <div class="list-con">
        <div class="list-wrapper">
            <p>抢到的好友</p>
            <ul class="list">
                 <c:forEach items="${userList }" var="user" varStatus="status"> 
	            	<li><img class="list-ava" src="${user.weixinHeadimgurl}" alt=""/>
	                <span class="list-name">${user.weixinNickname}</span>
	                <time><fmt:formatDate value="${user.createTime}" pattern="yyyy-MM-dd HH:mm:ss"/></time>
	                </li>
				</c:forEach>
            </ul>
        </div>
        <a href="javascript:;" class="close-list" id="closeList"><img src="${cndPath}/img/wei-course/share-close.png" alt=""/></a>
    </div>

</div>
</body>
<script type="text/javascript" src="${cndPath}/js/lib/jquery-1.11.1.js"></script>
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
    
   

    $("#seeList").click(function(){
        $("#mark").show();
        $('html').css({"height":"100%","overflow":"hidden"});
        $('body').css({"height":"100%","overflow":"hidden"});
    });
    $("#closeList").click(function(){
        $('html').css({"overflow":"auto"});
        $('body').css({"overflow":"auto"});
        $("#mark").hide();
    });


   /*  //文档浏览底部分页栏显示 fix效果自适应
    $(function(){
        var offSetTop = $("footer").offset().top+parseFloat($("footer").css("height"));
        var innerHeight = $(window).height();
        if(offSetTop< innerHeight){
            $("footer").css("bottom","0");
        }
        else{
            $("footer").css("position","static");
        }
    })
 */
</script>
</html>