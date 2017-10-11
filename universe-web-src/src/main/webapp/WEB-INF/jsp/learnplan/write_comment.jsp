<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>题目分享页-写作</title>
    <%@include file="../include/pub.jsp"%>
    <link rel="stylesheet" href="${cdnPath}/css/common.css"/>
    <link rel="stylesheet" href="${cdnPath}/css/share-write-comment.css"/>
</head>
<body>
<%@include file="../include/header.jsp"%>
<div class="layout">
    <div class="main fl">
        <div class="answer">
            <div class="student-info">
                <div class="student-info-ava fl"><img src="${question.avatar}" alt=""/></div>
                <div class="student-info-question fl">
                    <p class="student-info-name">${question.nickname}</p>
                    <p class="student-info-question-name"><span class="student-info-time">${shareTime}</span>题目：${quegroup.moduleName}  ${quegroup.groupName} 第${quegroup.sequence_number}题</p>
                </div>
            </div>
             <input type="hidden" id="type" name="type" value="${type}"/>
             <input type="hidden" id="answerId" name="answerId" value="${answerId}"/>
             <input type="hidden" id="questionId" name="questionId" value="${questionId}"/>
             <input type="hidden" id="beUserId" name="beUserId" value="${question.user_id}"/> 
             <input type="hidden" id="shareId" name="shareId" value="${shareId}"/>
             <p class="question_con">${question.content}</p>
            <div class="answer-hot">
                <div class="answer-time fl">做题时长：<span>${question.spendTime2}</span></div>
                <div class="answer-length fl">单词个数：<span>${question.wordCount}</span></div>
                <span class="comment fr"><i class="comment-icon"></i><span class="comment-num">${question.commentCount}</span></span>
                <span class="support fr"><i class="support-icon"></i><span class="support-num">${question.praise_amount}</span></span>
            </div>

        </div>
        <c:if test="${not empty commentList}">
        <div class="all-comment">
            <h2>全部评论</h2>
            <ul class="all-comment-list">
                <c:forEach items="${commentList}" var="comm">
                <li class="comment-list-li">
                    <img class="all-comment-ava" src="${comm.avatar}" alt=""/>
                    <span class="all-commenter"><span class="all-comment-name">${comm.nickname}</span><c:if test="${comm.role==1}"><span class="comment-teacher">宇宙老师</span></c:if></span>
                   <c:if test="${not empty comm.commentAudio}"> <div class="con audiocon">
                      <audio class="commaudio" src="${comm.commentAudio}" preload="auto"></audio>
                      <!--  <span class="drop"></span>-->
                        <i class="lb"></i>
                        <span class="t">${comm.audioTime}</span>
                    </div></c:if>
                    <p class="comment-content">${comm.commentTxt}</p>
                    <div class="comment-footer">
                        <span class="comment-footer-time fl">${comm.time}</span>
                       <c:if test="${comm.isMyself==1}"> <span class="comment-footer-btn fr">删除
                        <div class="comment-delete-dialog">
                            <p class="comment-delete-dialog-tip">确认删除这条评论录音？</p>
                            <div class="comment-delete-dialog-button">
                                <a onclick="del(${comm.id})"class="comment-delete-dialog-ok fl">确认</a>
                                <a href="javascript:;" class="comment-delete-dialog-cancel fl">取消</a>
                            </div>
                            <i class="comment-delete-drop"></i>
                        </div>
                        </span></c:if>
                    </div>
                </li>
               </c:forEach>
            	<c:if test="${commentList!=null && fn:length(commentList) > 0}">
					<div style="margin-top:20px;width:810px;text-align:center;">
						<%@ taglib uri="/padding" prefix="padding"%>
						<padding:padding pagintInfo="${paddingInfo}" /> 
	                </div>
                </c:if>        
        </div>
        </c:if>
        <c:if test="${empty commentList}">
        <div class="no-comment">
            <img class="no-comment-bg" src="${cdnPath}/i/share/ic-no-comment.png" alt=""/>
            <p class="no-comment-text">暂时没有评论哦~</p>
        </div>
        </c:if>
        <div class="comment-wrap">
            <div class="comment-wrap-inner">
                <img class="comment-wrap-ava" src="${headpig}" alt=""/>
                <textarea name="" id="commTxt" cols="30" rows="10" class="comment-wrap-text" placeholder="最多输入1000个字"></textarea>
                <!--<span class="comment-wrap-text-num">432/1000</span>-->
                <div class="comment-publish-status" style="display:none">发布成功!</div>
                <div class="comment-wrap-footer">
                    <div class="comment-wrap-audio">录音</div>
                    <span class="comment-wrap-tip" style="display:none" id="reminds"></span>
                    <a onclick="saveComment()" class="comment-wrap-publish-btn">发布评论</a>

                </div>
                <div class="comment-record-wrap">
                    <i class="comment-record-wrap-drop"></i>
                    <i id="recordDelete" class="comment-record-wrap-delete"></i>
                    <div class="recorder-wrap">
                        <p class="recorder-wrap-time" id="myrecord"></p>
                        <div class="right-myaudio">
                            <img class="record-start" src="${cdnPath}/i/share/ic-record-start.png" alt="" >
                            <img class="recording" src="${cdnPath}/i/share/repeat-pic6.gif" alt="" style="display:none;">
                            <img class="record-stop" src="${cdnPath}/i/share/ic-record-stop.png" alt="" style="display:none;">
                            <img class="record-stop-play" src="${cdnPath}/i/share/ic-record-stop-play.png" alt="" style="display:none;">
                            <div id="recordDialog" class="comment-delete-dialog">
                                <p class="comment-delete-dialog-tip">确定要放弃录音吗？</p>
                                <div class="comment-delete-dialog-button">
                                    <a onclick="delAudio()" class="comment-delete-dialog-ok fl">确认</a>
                                    <a id="auddel" class="comment-delete-dialog-cancel fl">取消</a>
                                </div>
                                <i class="comment-delete-drop"></i>
                            </div>
                        </div>
                        <p class="recorder-wrap-tip" id="audioTip">点击开始录音</p>
                        <a class="recorder-repeat-btn" href="javascript:;" style="display:none;">重录</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <c:if test="${not empty plan}">
    <div class="side fl">
        <h2 class="plan">所属学习计划</h2>
       <a href="${cdnPath}/plans/${plan.id}"><div class="con">
            <!--学习计划无图选择默认图，有图从数据库读取-->
            <img class="plan_pic fl" src="${plan.imageWebList}" alt="学习计划"/>

            <div class="plan_desc fl">
                <h2>${plan.name}</h2>

                <p><i class="ic_num"></i><span class="num">${plan.learnNumber}</span>人在学</p>

                <p><i class="ic_count"></i><span class="count">${plan.totalExercises}</span>题</p>
            </div>
        </div></a> 
    </div></c:if>
</div>
<%@include file="../include/footer.jsp"%>
<div class="share_qrcode_modal">
    <div class="share_dialog">
        <h2>
            分享到微信
            <span class="close_btn"></span>
        </h2>
        <img src="${cdnPath}/i/live/share_qrcode.png" class="share_qrcode">
        <ul class="share_tips">
            <li>1. 打开微信，"扫一扫"二维码</li>
            <li>2. 点击弹出页面右上角的分享按钮</li>
        </ul>
    </div>
</div>
</body>
<script src="${cdnPath}/common/plugins/recoder/swfobject.js"></script>
<script src="${cdnPath}/js/plan/recorder.js"></script>
<script src="${cdnPath}/js/plan/comment.js"></script>
<script src="${cdnPath}/js/lib/audiojs/audio.min.js"></script>
<script type="text/javascript">
var beginTime= 0,recordTimer=null;
var recorderFlag=false;
var uploadmp3=0;
$(function(){
	var $audios = $(".commaudio"); //audio标签
    var $audioBox = $(".audiocon");//语音外层盒子
    var audioList=document.getElementsByTagName("audio");
    var audiocount="";
    /*进度条*/
    var spokenTimer=null;
    function spokenBar(str){
        var audio=$(str).find("#myAudio")[0];
        var duration=audio.duration,curTime=audio.currentTime;
        var totalS=$(str).find(".answer-audio-bar").parent().css("width");
        var curS=parseFloat(totalS)*curTime/duration;
        $(str).find(".answer-audio-bar").css("width",curS);
    }
    /*本人播放录音*/
    //他人录音播放 
    $.each($audioBox,function(index,value){
    	var $this = $(this);
    	console.log($this+" = "+index);
    	$this.click(function(){
    		if($this.hasClass("play")){
    			$this.removeClass("play").find(".commaudio")[0].pause();
    		}else{
    			for(var j=0;j<audioList.length;j++){
	                audioList[j].pause();             
	            }
    			$audioBox.removeClass("play");
    			$("#audiojs_wrapper0").removeClass("playingZ");
	    		$this.addClass("play").find(".commaudio")[0].play();
	    		$audios.eq(index).on("ended",function(){
	    			$this.removeClass("play");
	    		})
    		}
    	})
    })
    /*评论删除按钮*/
    $(".comment-footer-btn").click(function(){
        if($(this).find(".comment-delete-dialog").css("display")=="none"){
            $(this).find(".comment-delete-dialog").css("display","block");
        }else{
            $(this).find(".comment-delete-dialog").css("display","none");
        }
    });
    /*录音*/
    $(".comment-wrap-footer").find(".comment-wrap-audio").click(function(){
        if($(".comment-record-wrap").css("display")=="none"){
            $(".comment-record-wrap").css("display","block");
        }
    })
    $("#auddel").click(function(){
        $("#recordDialog").css("display","none");
    })
    
    /*删除录音*/
    $("#recordDelete").click(function(){
        $("#recordDialog").css("display","block");
    })
    $(".record-start").click(function(){
    	record();
    	if(!recorderFlag){
    		$("#audioTip").text("请点击“允许”进行录音")
    	}
    })
     $(".recording").click(function(){
     	$("#audioTip").text("音频上传中...");
    	stop();
    	uploadmp3=1;
    	window.clearInterval(recordTimer);
    	upload(function(){
    		$("#audioTip").text("音频上传成功可以发布了！")
    	    setTimeout(function(){
            	 $("#audioTip").text("");
            	 uploadmp3=0;
            },2000)
    	});
    	$(".recording").css("display","none");
    	$(".record-stop-play").css("display","block");
    	$(".recorder-repeat-btn").css("display","inline-block");
    })
    $(".record-stop-play").click(function(){
    	play();
    	$("#myrecord").text("");
    	$(".record-stop-play").css("display","none");
    	$(".record-stop").css("display","block");
    	$("#audioTip").html("");
    })
    $(".record-stop").click(function(){
    	stop();
    	$(".record-stop").css("display","none");
    	$(".record-stop-play").css("display","block");
    	$("#audioTip").html("");
    })
    $(".recorder-repeat-btn").click(function(){
      	stop();
      	beginTime=0;
      	$("#myrecord").text("");
      	$(".recorder-repeat-btn").css("display","none")
     	$(".record-stop-play").css("display","none");
     	$(".record-stop").css("display","none");
    	$(".record-start").css("display","block");
    	$(".recording").css("display","none");
    	$("#audioTip").html("点击开始录音");
    })
    
    //初始化音频播放器控件
    var initAudioControl=function(eleId){
        audiojs.events.ready(function () {
            var objAudit = document.getElementById(eleId);
            ctlAudio = audiojs.create(objAudit, {
                css: false,
                createPlayer: {
                    markup: false,
                    playPauseClass: 'play-pauseZ',
                    scrubberClass: 'scrubberZ',
                    progressClass: 'progressZ',
                    loaderClass: 'loadedZ',
                    timeClass: 'timeZ',
                    durationClass: 'durationZ',
                    playedClass: 'playedZ',
                    errorMessageClass: 'error-messageZ',
                    playingClass: 'playingZ',
                    loadingClass: 'loadingZ',
                    errorClass: 'errorZ'
                }
            });
        });
    };
    initAudioControl("myMusic"); 
})
    function del(id){
    	 $.ajax({
             type: "DELETE",
             url: "${cdnPath}/comment/"+id,
             dataType: "json",
             success: function(data){
                if(data=="true"){
                	location=location;
                }
             }
         });
    }
    function delshow(){
    	$(".comment-publish-status").css("display","");
    	 setTimeout("delClose()",2000)
    }
    function delClose(){
    	$(".comment-publish-status").css("display","none");
    	location=location;
    }
    function saveComment(){
    	if(uploadmp3==1){
    		$("#reminds").html("音频上传中,请等待上传成功后发布");
    		return;
    	}
    	if(recordArr=="" &&　$("#commTxt").val()==""){
    		$("#reminds").html("不可发布空白信息,请输入评论或录音");
    		$("#reminds").css("display","block");
    		return;
    	}
     	var txt = $("#commTxt").val().replace(/[\n\,\，\。\！\；\：\.\?\:\!\;\u4e00-\u9fa5]/g," ");
 	    var array = txt.split(" ");
	 	if(array.length>1000){
	 		$("#reminds").html("最多可输入1000字");
	 		$("#reminds").css("display","block");
	 		return;
	 	}
        var data={
          	     "type":$("#type").val(),
                "answerId":$("#answerId").val(),
                "questionId":$("#questionId").val(),
                "commentAudio":recordArr,
                "audioLength":beginTime,
                "commentTxt":$("#commTxt").val(),
                "beUserId":$("#beUserId").val(),
                "shareId":$("#shareId").val()
           };
      	 $.ajax({
            type: "POST",
            url: "${cdnPath}/comment",
            data:data,
            dataType: "json",
            success: function(data){
               if(data=="true"){
            	   delshow();
            	   beginTime=0;
               }
               if(data=="login"){
            	   location.href="${cdnPath}/login";
               }
            }
        });
       }
    function delAudio(){
    	recordArr="";
      	try{
      		stop();
      	}catch(e){
      		
      	}
      	beginTime=0;
    	window.clearInterval(recordTimer); 
     	$(".record-stop-play").css("display","none");
     	$(".record-stop").css("display","none");
    	$(".record-start").css("display","block");
    	$(".recording").css("display","none");
    	$("#myrecord").text("");
    	$("#audioTip").text("点击开始录音");
    	$(".recorder-repeat-btn").css("display","none")
    	$("#recordDialog").css("display","none");
        $(".comment-record-wrap").css("display","none");
    }
</script>
</html>