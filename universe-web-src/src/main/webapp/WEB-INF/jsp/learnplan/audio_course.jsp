<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="/padding" prefix="padding"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>音频列表页面</title>
    <%@include file="../include/pub.jsp"%>  
    <link rel="stylesheet" href="${cdnPath}/css/common.css"/>
    <link rel="stylesheet" href="${cdnPath}/css/audio-course.css"/>
</head>
<body>
<jsp:include page="../include/header.jsp"></jsp:include>
<div class="wrap">
 <div class="main">
     <h2>${plan.name}</h2>
     <p class="nav">
         <span class="nav-name">音频</span><span class="nav-time">时长</span>
     </p>
     <div>
         <ul class="audio-list" id="audioList">
           <c:forEach items="${audioList}" var="audio" varStatus="i">
	             <li class="can_hear <c:if test='${i.index%2==0}'>gray</c:if> 
	             <c:if test='${audioStatus ne 1 && audioStatus ne 6 && audio.type ne 1}'>not-buy</c:if>" data-audio="${audio.audioUrl}" id="yy${audio.id}">
	             <a href="#">
	                 <i class="ic-play fl"></i>
	                 <span class="li-num fl">${i.index+1}</span>
	                 <span class="li-title fl">${audio.name}</span>
	                 <c:if test="${audio.type==1 && audioStatus ne 1 && audioStatus ne 6}"><span class="li-free fl">可试听</span></c:if>
	                 <span class="li-time fr">${audio.duration}</span>
	             </a>
	            </li>
           </c:forEach>
         </ul>
     </div>
 </div>
  <div class="play-box" id="audioBox" data-flag=0>
      <div id="wrapper"><!--音频播放器插件-->
          <a href="javascript:;" id="a_prev"></a>
          <a href="javascript:;" id="a_next"></a>
          <span class="split">/</span>
          <audio id="myAudio" preload="auto" controls src="${cdnPath}/i/a.mp3"></audio>
      </div>
  </div>
</div>  
<jsp:include page="../include/footer.jsp"></jsp:include>
<script type="text/javascript" src="${cdnPath}/js/h5/lib/audioplayer.js"></script>
<script>
$(function() {
    var curAudioIndex = 0;//当前播放的li下标
    var audioLength = $(".can_hear").length-1;//可播放的个数
    $('audio').audioPlayer();//初始化音频播放器
    //点击当前音频列
    $(".can_hear").click(function(){
        if(!$(this).hasClass("not-buy")){
            if($("#audioBox").attr("data-flag")==0){
                var offSetTop = $(".footer1").offset().top;
                var innerHeight = window.innerHeight;
                var scrollTop = $(document).scrollTop();
                var fixedBottom;
                if(offSetTop - innerHeight < scrollTop){
                    fixedBottom = scrollTop - offSetTop + innerHeight+"px";
                }
                else{
                    fixedBottom=0;
                }
                $("#audioBox").attr("data-flag",1).animate({bottom:fixedBottom},1000);
            }
            var $this = $(this);
            var curIndex = $this.index();
            var audioSrc = $this.data("audio");
            var audioTitle=$this.find(".li-title").text();
            curAudioIndex = curIndex;
            stopAudioPlay();
            $(".can_hear").removeClass("playing");
            $this.addClass("active-playing");
            playAudio(audioSrc,audioTitle);
        }
    });
 /*页面默认播放*/
    var ss=${audioId};
    if(ss>0){
      $("#yy"+ss).click();
    }
    
    $("#myAudio").on("ended",function(){
        $(".can_hear").removeClass("playing");
    }).on("pause",function(){
        stopAudioPlay();
    }).on("play",function(){
        $(".audioplayer").addClass("audioplayer-playing");
        $.each($(".can_hear"),function(index,value){
            if($(this).hasClass("stop")){
                $(this).addClass("playing")
            }
            $(this).removeClass("stop");
        });
    });
    //向前按钮
    $("#a_prev").click(function(){
        curAudioIndex=curAudioIndex <= 0?0:curAudioIndex-1;
        while($(".can_hear").eq(curAudioIndex).hasClass("not-buy")){
            curAudioIndex=curAudioIndex <= 0?0:curAudioIndex-1;
        }
        var audioSource = $(".can_hear").eq(curAudioIndex).data("audio");
        var audioTitle=$(".can_hear").eq(curAudioIndex).find(".li-title").text();
        playAudio(audioSource,audioTitle);
    })
    //向后按钮
    $("#a_next").click(function(){
        curAudioIndex=curAudioIndex>= audioLength?0:curAudioIndex+1;
        while($(".can_hear").eq(curAudioIndex).hasClass("not-buy")){
            curAudioIndex=curAudioIndex>= audioLength?0:curAudioIndex+1;
        }
        var audioSource = $(".can_hear").eq(curAudioIndex).data("audio");
        var audioTitle=$(".can_hear").eq(curAudioIndex).find(".li-title").text();
        playAudio(audioSource,audioTitle);
    })
    //播放音频
    function playAudio(source,title){
        stopAudioPlay();
        $("#myAudio").attr("src",source);
        $(".audioplayer").addClass("audioplayer-playing");
        $("#myAudio")[0].play();
        $(".can_hear").removeClass("playing");
        $(".can_hear").removeClass("playing stop").eq(curAudioIndex).addClass("playing");
        $(".audioplayer-volume-button").text(title);
    }
    //停止播放
    function stopAudioPlay(){
        $(".audioplayer").removeClass("audioplayer-playing");
        $.each($(".can_hear"),function(index,value){
            if($(this).hasClass("playing")){
                $(this).addClass("stop")
            }
            $(this).removeClass("playing");
        });
        $("#myAudio")[0].pause();
    }

    //文档浏览底部分页栏显示 fix效果自适应
    window.onscroll = function(){
        var offSetTop = $(".footer1").offset().top;
        var innerHeight = window.innerHeight;
        var scrollTop = $(document).scrollTop();
        var fixedBottom;
        if($("#audioBox").attr("data-flag")==1){
            if(offSetTop - innerHeight < scrollTop){
                fixedBottom = scrollTop - offSetTop + innerHeight;
                $("#audioBox").css("bottom",fixedBottom+"px");
            }
            else{
                $("#audioBox").css("bottom","0");
            }

        }

    }
    window.onresize=function(){
        window.onscroll();
    }

});
</script>
</body>
</html>