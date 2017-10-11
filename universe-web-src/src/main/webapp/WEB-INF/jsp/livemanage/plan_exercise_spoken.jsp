<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>口语练习</title>
<link rel="stylesheet" href="/common/css/spoken_public.css" type="text/css">
<link rel="stylesheet" href="/common/css/spoken_font-awesome.css" type="text/css">
<link rel="stylesheet" href="/common/css/spoken.css" type="text/css">
<style>
.bar{height: 4px;width: 636px;border: 1px solid #AAA;border-radius: 10px;position: absolute;top: 46%;left: 70px;}
.bar .finesh {height: 100%;width: 0px;background-color: #00b652;border-radius: 5px;}
</style>
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?22fe330b8bf5f3b6daef2ad6864536cc";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>
</head>
<body>
<jsp:include page="../include/header.jsp" flush="true"></jsp:include>
     <div class="content-wrap">
    <div class="right-part1">
     <div class="right-cen">
           <div id="questionAll" >
               <c:if test="${not empty spokens }">
                <input type="hidden" id="spokenCount" name="spokenCount" value="${fn:length(spokens)}"></input>
                <input type="hidden" id="token" name="token" value="${token}"></input>
               <c:forEach items="${spokens}" var="item" varStatus="index">
                <div id="spoken${index.index}" name="spoken${index.index}" style="<c:if test="${index.index!=0 }">display: none</c:if>">
                <input type="hidden" id="nums${index.index}" name="nums" value="${index.index}"></input>
                    <h1><img src="/common/images/t_pic9.jpg" alt=""><span>${groupName}</span></h1>
                    <p>第${index.index+1}句/共${fn:length(spokens)}句</p>
                    <p>${item.en}</p>
                    <div class="right-bot">
                        <p><img src="/common/images/sp1.jpg" alt="">示范录音:</p>
                        <div class="right-audio">
                            <audio id="videos${index.index}" src="${item.audioUrl}">
                                  Your browser does not support HTML5 video.
                            </audio>
                            <button id="autoPlay${index.index}" class="fa fa-play autoPlay"></button>
                            <button id="stopPlay${index.index}" class="fa fa-pause stopPlay"></button>
                            <!-- <div id="shijian"></div> -->
                            <div id="bar" class="bar">
                                <div id="finish${index.index}" class="finesh"></div>
                            </div>
                        </div>
                        <p><img src="/common/images/sp2.jpg" alt="">我的录音:</p>
                        <div class="zhezhao"></div>
                        <div class="right-myaudio" id="pic1${index.index}">
                            <img src="/common/images/repeat-pic7.png" alt="" id="record${index.index}"  >
                            <img src="/common/images/repeat-pic6.gif" alt="" id="start${index.index}" >
                            <img src="/common/images/repeat-pic4.png" alt="" id="suspend${index.index}" >
                            <img src="/common/images/repeat-pic3.png" alt="" id="startPlay${index.index}" onclick="startPlay(${index.index})">
                        </div>
                        <div class="right-myaudio" id="pic2${index.index}" style="display:none;">
                            <img src="/common/images/repeat-pic7.png" alt="" id="records${index.index}" >
                            <img src="/common/images/repeat-pic6.gif" alt="" id="starts${index.index}" >
                            <img src="/common/images/repeat-pic4.png" alt="" id="suspends${index.index}" >
                            <img src="/common/images/repeat-pic3.png" alt="" id="startPlays${index.index}">
                        </div>
                        <p id="sub${index.index}" class="bb" style="color:red; position: absolute; left:341px;"> </p>
                        <div class="right-btn">
                            <button id="btna${index.index}" class="btn1" >重录</button>
                            <button id="btnb${index.index}" class="btn2" onclick="netque(${index.index})">下一题</button>
                            <button id="btnc${index.index}" class="btn3" disabled='disabled' style="color:#ccc;cursor:default">下一题</button>
                            <button id="btnd${index.index}" class="btn4" onclick="lookReqult()">查看结果</button>
                        </div>                     
                    </div>
                </div>
                </c:forEach>
              </c:if>
            </div>
            
            <div id="answerAll" >
                <c:if test="${not empty spokens }">
                <input type="hidden" id="spokenCount" name="spokenCount" value="${fn:length(spokens)}"></input>
                <input type="hidden" id="token" name="token" value="${token}"></input>
                <input type="hidden" id="groupId" name="groupId" value="${groupId}"></input>
                	<div class="right-particulars">
                		<h1>做题记录详情${groupName}</h1>
                	</div>
                    <c:forEach items="${spokens}" var="item" varStatus="index">
                    <h1><img src="/common/images/t_pic9.jpg" alt=""><span>第${index.index+1}句/共${fn:length(spokens)}句</span></h1>
                   <div id="answer${index.index}" name="answer${index.index}">
                   <input type="hidden" id="questionId${index.index}" value="${item.questionId}"/>
                    <input type="hidden" id="questionSeq${index.index}" value="${item.questionSeq}"/>
                    <p class="ps">${item.en }</p>
                    <div class="right-bot">
                        <p><img src="/common/images/sp1.jpg" alt="">示范录音:</p>
                        <div class="right-audio">
                            <audio id="video1_${index.index}" src="${item.audioUrl}" class="s">
                                  Your browser does not support HTML5 video.
                            </audio>
                            <button id="autoPlay_${index.index}" class="fa fa-play autoPlay tishi" ></button>
                            <button id="stopPlay_${index.index}" class="fa fa-pause stopPlay tishi1"></button>
                            <!-- <div id="shijian"></div> -->
                            <div id="bar_${index.index}" class="bar1">
                                <div id="finish_${index.index}" class="finesh"></div>
                            </div>
                        </div>
                        <p><img src="/common/images/sp2.jpg" alt="">我的录音:</p>
                        <div class="right-audio">
                            <audio id="video2_${index.index}" src="" class="s">
                                  Your browser does not support HTML5 video.
                            </audio>
                            <button id="autoPlay2_${index.index}" class="fa fa-play autoPlay my"></button>
                            <button id="stopPlay2_${index.index}" class="fa fa-pause stopPlay my1"></button>
                            <!-- <div id="shijian"></div> -->
                            <div id="bar2_${index.index}" class="bar2">
                                <div id="finish2_${index.index}" class="finesh"></div>
                            </div>
                        </div>
                        </div>
                        </div>
                        </c:forEach>
                        </c:if>
                        <div class="dashed"></div>
                    <button id="once" class="once" onclick="anagain()">再来一遍</button>
              </div> 
        </div>
        </div>
        </div>
<div style="clear:both;"></div>	
<jsp:include page="../include/footer.jsp" flush="true"></jsp:include>
<script src="/common/js/jquery.js"></script>
<script src="/common/js/audio1.js"></script>
<script src="/common/plugins/recoder/swfobject.js"></script>
<script src="/common/plugins/recoder/recorder.js"></script>
<script src="/common/js/speak.js"></script>
<script "text/javascript">
changes(0);
$("#questionAll").css("display","block");
$("#answerAll").css("display","none")
function changes(num){
var obj1 =({
    myVid : 'videos'+num,
    finish : 'finish'+num,
    autoPlay : 'autoPlay'+num,
    stopPlay : 'stopPlay'+num,
    record : 'record'+num,
    start : 'start'+num,
    btnb : 'btnb'+num,
    records : 'records'+num,
    starts : 'starts'+num,
    btnd : 'btnd'+num,
    suspend : 'suspend'+num,
    suspends : 'suspends'+num,
    startPlay : 'startPlay'+num,
    startPlays : 'startPlays'+num,
    btnc : 'btnc'+num,
    pic1 : 'pic1'+num,
    pic2 : 'pic2'+num,
    btna : 'btna'+num,
    nums : 'nums'+num,
    click : 'onclick'
});
var obj=new Audios(obj1)
obj.spok();

}

 $(".right-audio .autoPlay").on("click",function(e){
	var e = e || window.event;
	var tag = e.target || e.srcElement;
	$(this).siblings("audio")[0].play();
	$(this).hide();
	$(this).siblings("button").show();
	$(".zhezhao").show();	
	$(".autoPlay").attr('disabled',"true")
    $(".autoPlay").css({"color":"#666","cursor":"default"})
    xx = setInterval(function(){ 
 	   ss(tag);     
     },1000);
	
})     
   		
		
    function ss(tag){		
		var zj = $(tag).parents(".right-audio");
		var au=zj.find("audio")[0];
		var fi=zj.find(".finesh")[0];
		var s=au.duration;
		var m = au.currentTime;
		var surplus = s - m;
		var surplusMin =  parseInt(surplus/60); 
		var surplusSecond = parseInt(surplus%60);	
		if (surplusSecond < 1 ) {  //如果分钟后面的秒数小于10  则让surplusSecond = surplusMin ：surplusSecond
			surplusSecond = "0"+"surplusSecond"
		}; 
		setTimeout(function(){
			progressValue = m/s*636;   //定义滚动条  每秒走多少
			fi.style.width = progressValue + 'px' //设置id为finish的样式 实现滚动 
			if(surplus == 0){
				$(".right-audio .stopPlay").hide();
				$(".right-audio .autoPlay").show();
				$(".right-audio .autoPlay").css({"color":"#00b54e","cursor":"default"});
				$(".my").css({"color":"#539bff","cursor":"default"})
				$(".autoPlay").removeAttr("disabled");
				$(".zhezhao").hide();
				fi.style.width=0+'px';
				clearInterval(xx);
			
			}
		},100)
		
	}
    
$(".right-audio .stopPlay").on("click",function(){
	$(this).siblings("audio")[0].pause();
	$(this).hide();
	$(this).siblings("button").show();
	$(".zhezhao").hide();
	$(".autoPlay").removeAttr("disabled")
	$(".tishi").css({"color":"#00b54e","cursor":"pointer"})
	$(".my").css({"color":"#539bff","cursor":"default"})
}) 

function startPlay(num){
        $(".autoPlay").removeAttr("disabled")
        $(".right-audio .autoPlay").css({"color":"#00b652","cursor":"pointer"})
        $(".my").css({"color":"#539bff","cursor":"default"})
        $("#startPlay"+num).hide();
        $("#suspend"+num).show()
        $("#btnc"+num).hide();
        $("#btnb"+num).show()
     }

function netque(num){
	var s= num+1;
	$("#spoken"+num).css("display","none");
	$("#spoken"+s).css("display","block");
	changes(s);
}

function anagain(){
	location.reload();
}
</script>
</body>
</html>