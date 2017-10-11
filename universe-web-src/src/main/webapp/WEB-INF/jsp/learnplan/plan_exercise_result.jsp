<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

 <!DOCTYPE html>
<html>
<head>
    <title>${currentExercise.moduleName }-精英计划</title>
    
    <%@include file="../include/pub.jsp"%>
    
    <meta charset="utf-8"/>
    	
	<link rel="stylesheet" href="${cdnPath}/common/css/translate.css" type="text/css">
	<!--<link rel="stylesheet" href="${cdnPath}/common/css/specifics.css" type="text/css">   20160930 口语练习样式重叠--> 
    <link href="${cdnPath}/c/g13.css" rel="stylesheet" type="text/css">
    <link href="${cdnPath}/c/g24.css" rel="stylesheet" type="text/css">
    <link href="${cdnPath}/c/g16.css" rel="stylesheet" type="text/css">
    <link href="${cdnPath}/c/g24.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="${cdnPath}/c/bootstrap.min.css">
    <link rel="stylesheet" href="${cdnPath}/c/common.css" type="text/css"/>
    <link rel="stylesheet" href="${cdnPath}/c/plan_details.css" type="text/css"/>
    
	
	

	    <!-- <link rel="shortcut icon" type="image/x-icon" href="../../i/icon-8.png" media="screen" /> -->
    <!--#include file="./inc/playSound.shtml"-->
    <%@include file="./inc/playSound.jsp"%>
     
    <script type="text/javascript">
        var _hmt = _hmt || [];
        (function () {
            var hm = document.createElement("script");
            hm.src = "//hm.baidu.com/hm.js?22fe330b8bf5f3b6daef2ad6864536cc";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    </script>
    <style type="text/css">
        img {
            display: inline-block;
        }
        
        .finish{height: 100%;background-color: #00b652;border-radius: 5px;}
    </style>


</head>
<body class="w1000">
<!--<header>-->
<!--&lt;!&ndash;#include file="./inc/nav.shtml"&ndash;&gt;-->
<!--</header>-->
<input id="moduleid" hidden="true" value="${moduleid }" />  
<input id="groupid" hidden="true" value="${groupid }" /> 

<div class="banner">
    <div class="inner">
        ${currentExercise.moduleName }
        <div class="action">
            <hr class="spit"/>
            <div class="action_item app">
                <i></i>
                <span>App练习</span>
                <div class="QR-download">
                    <p id="app-text">精英计划APP下载</p>
                    <p id="app-type">iPhone / Android</p> 
                    <img src="${basePath}/h5/qrcode.html?code_url= ${app_down_url}" alt="" class="share_qrcode" >
                </div>
            </div>
            <hr class="spit"/>
            <a href="${basePath }/plans/${planid}">
            <div class="action_item end">
                <i></i>
                <span>结束练习</span>
            </div></a>
            <hr class="spit"/>
        </div>
    </div>
</div>
 
<div class="wrap">
    <div class="content">
        <div class="content-wrap mid" style="margin-top:110px;width:1160px;">
 
             <div id="content" class="main mid">
                 	<!-- 口语练习 -->
                 <c:if test="${currentExercise.moduleId==21}">
                 <%@include file="exercise_spoken.jsp"%>
                 </c:if>
				
				<!-- 翻译 -->
				<c:if test="${currentExercise.moduleId==20}">
                 <%@include file="exercise_translates.jsp"%>
                 </c:if>
                 <!-- 单词预习 -->
				<c:if test="${currentExercise.moduleId==29}">
                 <%@include file="include/word_exercise.jsp"%>
                 </c:if>
                 <!-- 精听 -->
				<c:if test="${currentExercise.moduleId==30}">
                 <%@include file="include/essence_listen_exercise.jsp"%>
                 </c:if>
                 
                 <!-- 听写填空 -->
				<c:if test="${currentExercise.moduleId==32}">
                 <%@include file="include/dictation_exercise.jsp"%>
                 </c:if>
             </div> 

        </div>
        <!--#include file="./inc/downTop.shtml"-->
         <%@include file="./inc/downTop.jsp"%>
    </div>
    <!--#include file="./inc/dialogLogin.shtml"--> 
 
    
    <div id="morePlan">
        <div class="save_layout">
            <h2>提示<span class="moreClose"></span></h2>
            <p class="p1">在学习计划中有更多练习题哦~</p>
            <div class="button">
                <a href="${basePath }/plans" class="btnbtn">去看看</a>
                <a href="javascript:;" id="moreCancel" class="btnbtn" style="margin-left:20px;">取消</a>
            </div>
        </div>
    </div>
    <div id="goToApp_modal" >
    <div class="save_layout">
        <h2 class="modal_title">提示<span class="moreClose appClose"></span></h2>
        <p class="p">此练习题待开发，请到精英计划APP上练习</p>
        <p class="button">
            <a href="javascript:;" class="btnbtn appClose" >确定</a>
        </p>
    </div>
	</div>
    <div id="save_success">
        <div class="save_layout">
            <h2>提示<span class="saveClose"></span></h2>

            <p class="p1">保存成功！</p>

            <p>更多练习在<span id="show_plan_name" style="color: #39c075;font-size:18px;">${dayInfo.planName}</span></span>学习计划</p>

            <div class="button">
                <a href="${basePath }/plans/${planid}" id="check_plan" class="btnbtn">查看计划</a>
                <a href="javascript:;" id="cancel" class="btnbtn" style="margin-left:20px;">取消</a>
            </div>
        </div>
    </div>
    <div class="dark" 
    	 <c:choose>
			<c:when test="${show_tip}"> 
   				 style="display:block;"
			</c:when>
			 
			<c:otherwise>
				style="display:none;"
			</c:otherwise>
		</c:choose>
    
    ></div>
    <!--#include file="./inc/quan.shtml"-->
    <%@include file="./inc/quan.jsp"%>
</div>

<!--#include file="./inc/playSoundcontainer.shtml"-->
<%@include file="./inc/playSoundcontainer.jsp"%>

<div id="fade" class="black_overlay" style="display:none;"></div>
 <!-- 某些练习不用引用 -->
	<c:if test="${currentExercise.moduleId!=30 && currentExercise.moduleId!=20 && currentExercise.moduleId!=21 && currentExercise.moduleId!=29}">
         
<script data-main="${basePath}/j/app/exercise/main" src="${basePath}/j/lib/requirejs/2.1.15.js"></script>
    </c:if>
     
<script type="text/javascript" src="${cdnPath}/j/app/exercise/exerciseEventManager.js"></script> 
<script type="text/javascript">

var exerciseApi = {}; 
var token = "${token}";
exerciseApi.xiaomaToken = "bearer "+token;
exerciseApi.updateListItem= function(){
 
}
    window.setTimeout(function(){
        /*左侧菜单测试测试start*/
        $("#side").find("#ex_fanyi").click(function(){
            $("#content").children().css("display","none");
            $("#content").find("#translate").css("display","block");
        });
        $("#ex_spoken").click(function(){
            $("#content").children().css("display","none");
            $("#content").find("#spoken").css("display","block");
        }); 
        //阅读词汇
        $("#side8").click(function() {
            exerciseApi.Volcabulary.showVolcabulary(1);
        });

        $("#side8").dblclick(function() {
            exerciseApi.Volcabulary.gotoHisResult("",0.99,1);
        });



        //exerciseApi.Dication.showDictation(200,1);
        $("#side3").click(function() {
            exerciseApi.Dication.showDictation(200,1);
        });

        $("#side3").dblclick(function() {
            exerciseApi.Dication.gotoHisResult(200);
        });
        var test = $("#side3");
		console.log(test);
        /*测试end*/
    },5000);

    exerciseEventManager.addEventListener("mainLoadEnd",mainLoadEnd);
    exerciseApi.isLogin = ${islogin==true};
    exerciseApi.learnApi = window.xiaoma.basePath+"/plan/proxy?proxyurl=${apiUrl}/";//20160906;
    exerciseApi.saveSpeakApi = window.xiaoma.basePath+"/exercises/speak/answer?proxyurl=${apiUrl}/";//20160906;
    
    exerciseApi.xiaomaToken = "bearer"; 
	//exerciseApi.isLogin = false; 
	var planStatus = ${dayInfo.planStatus };
	if(planStatus==12 || planStatus==13 || planStatus==14){//用户是否购买计划，影响完成按钮的弹出窗体
		exerciseApi.isInPlan = true;
	}else{
		exerciseApi.isInPlan = false;
	}
	
	var moduleName = "${currentExercise.moduleName }";
	var originName = "${currentExercise.originName }"; 
	var result = "${result}";
	var planid = ${dayInfo.planId};
	var plandayid = ${dayInfo.dayId};
	var exerciseid =  ${currentExercise.id};
	var groupID = 0;
	var sequenceNumber=0;
	var questionID=0;
	var questionType = 0;//1-conversation;//1-conversation tpo
	var moduleID = ${currentExercise.moduleId};
	var levelone = ${currentExercise.levelOne==null?0:currentExercise.levelOne};
	var leveltwo = ${currentExercise.levelTwo==null?0:currentExercise.levelTwo};
	var levelthree = ${currentExercise.levelThree==null?0:currentExercise.levelThree};
	
	var questionType = null;
	if(moduleID == 8){//8  独立口语 完成
		questionID = levelone;
		questionType = 3;
	} else if(moduleID == 17){//17  机经口语 完成
		questionID = levelthree;
		questionType = 1;
	} else if(moduleID == 18){//18  机经写作  完成 
		questionID = levelthree;
		questionType = 2;
		 
	}else if(moduleID == 14){//14 独立写作 完成
		questionID = levelone;
		questionType = 4;

	}
	
	exerciseApi.shareUrl="${basePath }/exercise/speakingswritings/"+questionType+"/"+ questionID +".html?exercise_id="+exerciseid+"&plan_id="+planid+"&day_id="+plandayid;
	exerciseApi.isFromPlan = false;//判断用户的来源  正常从练习计划开始做题的  还是从别人的计划中做题的 
    
    
    function mainLoadEnd(){
    	
		 
		//听力
		if(moduleID == 1){//1 听写(dictation_groups) 
			groupID = leveltwo; 
			if("1"==result){
				exerciseApi.Dication.gotoHisResult(groupID,plandayid,exerciseid,moduleName+" "+originName);
			}else{ 
				exerciseApi.Dication.showDictation(groupID,plandayid,exerciseid,moduleName+" "+originName);
			}
		}else if(moduleID == 2){//2 复述  不知道哪个
			groupID = leveltwo; 
			$("#goToApp_modal").show();
		
		}else if(moduleID == 3){//3 跟读----把上边的 跟读注释掉 此模块改成跟读 不知道哪个
			groupID = leveltwo; 
			$("#goToApp_modal").show();
		
		}else if(moduleID == 4){//4 音义互辨(词)  完成
			sequenceNumber = leveltwo;
			groupID = levelthree; 
			if("1"==result){
				exerciseApi.Listen.gotoHisResult(groupID,plandayid,exerciseid,moduleName+" "+originName);
			}else{ 
				exerciseApi.Listen.showListen(groupID,plandayid,exerciseid,moduleName+" "+originName);
			}
		}else if(moduleID == 16){//16 音义互辨(句子) 貌似去掉了
			sequenceNumber = leveltwo;
			groupID = levelthree; 
			//$("#goToApp_modal").show();
			if("1"==result){
				exerciseApi.Listen.gotoHisResult(groupID,plandayid,exerciseid,moduleName+" "+originName,"2");
			}else{ 
				exerciseApi.Listen.showListen(groupID,plandayid,exerciseid,moduleName+" "+originName,"2");
			}
			
		}else if(moduleID == 5){//5 听力(进阶)  完成
			sequenceNumber = levelone;
			questionID = leveltwo; 
			questionType = levelthree;
			
			if("1"==result){
				exerciseApi.TpoListen.gotoHisResult(questionID,plandayid,exerciseid,1,moduleName+" "+originName,originName);//questionId 当前单元 planDayId  exerciseId type
			}else{
				exerciseApi.TpoListen.showTpoListen(questionID,plandayid,exerciseid,1,moduleName+" "+originName,originName);//questionId 当前单元 planDayId  exerciseId type
			}
		}else if(moduleID == 22){//22 TPO听力 完成
			sequenceNumber = levelone;
			questionID = leveltwo; 
			questionType = levelthree;
			if("1"==result){
				exerciseApi.TpoListen.gotoHisResult(questionID,plandayid,exerciseid,3,moduleName+" "+originName,originName);//questionId 当前单元 planDayId  exerciseId type
			}else{
				exerciseApi.TpoListen.showTpoListen(questionID,plandayid,exerciseid,3,moduleName+" "+originName,originName);//questionId 当前单元 planDayId  exerciseId type
			}
		}else if(moduleID == 6){//6 朗读
			sequenceNumber = levelone;
			questionID = leveltwo;  
			$("#goToApp_modal").show();
			
		}else if(moduleID == 7){//7综合口语 完成
			questionID = leveltwo;
			if("1"==result){
				exerciseApi.Speak.gotoHisZongheResult(questionID,plandayid,exerciseid,moduleName+" "+originName);//questionId 当前单元 planDayId  exerciseId 
			}else{ 
				exerciseApi.Speak.showZongheSpeak(questionID,plandayid,exerciseid,moduleName+" "+originName);//questionId 当前单元 planDayId  exerciseId 
			}
			
		}else if(moduleID == 8){//8  独立口语 完成
			questionID = levelone;
			
			if("1"==result){
				exerciseApi.Speak.gotoHisResult(questionID,plandayid,exerciseid,3,moduleName+" "+originName);//questionId 当前单元 planDayId  exerciseId 
			}else{ 
				exerciseApi.Speak.showSpeak(questionID,plandayid,exerciseid,3,moduleName+" "+originName);//questionId 当前单元 planDayId  exerciseId 
			}
		}else if(moduleID == 15){//15  背诵			 	
			questionID = levelone;
			sequenceNumber = leveltwo;
			$("#goToApp_modal").show();
			
		}else if(moduleID == 17){//17  机经口语 完成
			questionID = levelthree;
			
			if("1"==result){
				exerciseApi.Speak.gotoHisResult(questionID,plandayid,exerciseid,1,moduleName+" "+originName);//questionId 当前单元 planDayId  exerciseId 
			}else{ 
				exerciseApi.Speak.showSpeak(questionID,plandayid,exerciseid,1,moduleName+" "+originName);//questionId 当前单元 planDayId  exerciseId 
			}
		}else if(moduleID == 9){//9 词汇 完成
			groupID = leveltwo; 
			sequenceNumber = levelone;
			if("1"==result){
				exerciseApi.Volcabulary.gotoHisResult(groupID,plandayid,exerciseid,moduleName+" "+originName);
			}else{ 
				 exerciseApi.Volcabulary.showVolcabulary(groupID,plandayid,exerciseid,moduleName+" "+originName)
			}
		}else if(moduleID == 10){//10 语法 完成
			groupID = leveltwo; 
			sequenceNumber = levelthree;
			if("1"==result){
				exerciseApi.Grammar.gotoHisResult(groupID,plandayid,exerciseid,moduleName+" "+originName);
			}else{ 
				exerciseApi.Grammar.showGrammar(groupID,plandayid,exerciseid,moduleName+" "+originName,moduleID);
			}
		}else if(moduleID == 11){//11 阅读(进阶) 完成
			sequenceNumber = levelone;
			questionID = leveltwo; 
			if("1"==result){
				exerciseApi.Jinjie.gotoHisResult(questionID,plandayid,exerciseid,2,moduleName+" "+originName,originName);//questionId 当前单元 planDayId  exerciseId type
			}else{ 
				exerciseApi.Jinjie.showJinjie(questionID,plandayid,exerciseid,2,moduleName+" "+originName,originName);//questionId 当前单元 planDayId  exerciseId type
			}
			//写作
		}else if(moduleID == 12){//12 综合填空 完成
			sequenceNumber = levelone;
			questionID = leveltwo; 
			if("1"==result){
				exerciseApi.TpoWrite.gotoHisResult(questionID,plandayid,exerciseid,moduleName+" "+originName);//questionId 当前单元 planDayId  exerciseId;
			}else{ 
				exerciseApi.TpoWrite.showTpoWrite(questionID,plandayid,exerciseid,moduleName+" "+originName);//questionId 当前单元 planDayId  exerciseId
			}
		}else if(moduleID == 18){//18  机经写作  完成
			sequenceNumber = leveltwo;
			groupID = levelone; 
			questionID = levelthree;
			if("1"==result){
				 exerciseApi.JJWrite.gotoHisResult(questionID,plandayid,exerciseid,2,moduleName+" "+originName); 
			}else{ 
				 exerciseApi.JJWrite.showJJWrite(questionID,plandayid,exerciseid,2,moduleName+" "+originName); 
			}
		}else if(moduleID == 13){//13   记忆复写 完成
			groupID = levelone;  
			if("1"==result){ 
				exerciseApi.Rewrite.gotoHisResult(groupID,plandayid,exerciseid,moduleName+" "+originName);//questionId 当前单元 planDayId  exerciseId type
			}else{ 

				exerciseApi.Rewrite.showRewrite(groupID,plandayid,exerciseid,moduleName+" "+originName);//groupId 当前单元 exerciseId
			}
			
		}else if(moduleID == 14){//14 独立写作 完成
			questionID = levelone;
			if("1"==result){ 
				exerciseApi.JJWrite.gotoHisResult(questionID,plandayid,exerciseid,4,moduleName+" "+originName);//questionId 当前单元 planDayId  exerciseId type
			}else{ 
				exerciseApi.JJWrite.showJJWrite(questionID,plandayid,exerciseid,4,moduleName+" "+originName);//questionId 当前单元 planDayId  exerciseId type
			}

		}else if(moduleID == 19){//19 综合写作 完成
			sequenceNumber = levelone;
			questionID = leveltwo; 
			if("1"==result){ 
				exerciseApi.ZongHeWrite.gotoHisZongheResult(questionID,plandayid,exerciseid,moduleName+" "+originName);//questionId 当前单元 planDayId  exerciseId type
			}else{ 
				exerciseApi.ZongHeWrite.showZongheWrite(questionID,plandayid,exerciseid,moduleName+" "+originName);//questionId 当前单元 planDayId  exerciseId type
			}
		}else if(moduleID == 20){				//导入句子翻译  jsp完成


		}else if(moduleID == 21){//口语练习 jsp完成

		}else if(moduleID == 23){//tpo阅读按照类型分类 完成
			sequenceNumber = leveltwo;
			questionID = levelone; 
			if("1"==result){ 
				exerciseApi.TpoRead.gotoHisResult(questionID,plandayid,exerciseid,moduleName+" "+originName,originName);//questionId 当前单元 planDayId  exerciseId type
			}else{ 
				exerciseApi.TpoRead.showTpoRead(questionID,plandayid,exerciseid,moduleName+" "+originName,originName);//questionId 当前单元 planDayId  exerciseId type
			}
		} else if(moduleID == 31){//口语练习 jsp完成
	    	groupID = levelone;  
			if("1"==result){ 
				exerciseApi.TemplateRewrite.gotoHisResult(groupID,plandayid,exerciseid,moduleName+" "+originName);//questionId 当前单元 planDayId  exerciseId type
			}else{ 

				exerciseApi.TemplateRewrite.showRewrite(groupID,plandayid,exerciseid,moduleName+" "+originName);//groupId 当前单元 exerciseId
			}
		}else if(moduleID == 35){//听写测试模块
			groupID = leveltwo; 
			if("1"==result){
				exerciseApi.ListenWrite.gotoHisResult(groupID,plandayid,exerciseid,moduleName+" "+originName);
			}else{ 
				exerciseApi.ListenWrite.showDictation(groupID,plandayid,exerciseid,moduleName+" "+originName);
			}
	   } 
    	//练习选择
//     	$(".desc").click(function (e) {
//     		var delurl = $(this).attr("title");
// 			window.location.href=delurl;
//         });
    	
    	
			var test = $("#side3");
			console.log(test);
        //阅读词汇
			//阅读词汇
	        $("#side8").click(function() {
	            exerciseApi.Volcabulary.showVolcabulary(50);//groupId 当前单元
	        });

	        $("#side8").mousedown(function(e) {
	            if(3 == e.which) {
	                exerciseApi.Volcabulary.gotoHisResult(50);//groupID
	            }
	        });
	        //音义互辩
	        $("#side10").click(function() {
	            exerciseApi.Listen.showListen(41);//groupId 当前单元
	        });
	        $("#side10").mousedown(function(e) {
	            if(3 == e.which) {
	                exerciseApi.Listen.gotoHisResult(41);//groupID
	            }
	        });
	        //记忆复写
	        $("#side4").click(function() {
	            exerciseApi.Rewrite.showRewrite(1,1);//groupId 当前单元
	        });
	        $("#side4").mousedown(function(e) {
	            if(3 == e.which) {
	                exerciseApi.Rewrite.gotoHisResult(1,1);//groupID flag
	            }
	        });


	        //听写---缺少接口
	        //exerciseApi.Dication.showDictation(200,1);
	        $("#side3").click(function() {
	            exerciseApi.Dication.showDictation(200);
	        });

	        $("#side3").mousedown(function() {
	            if(3 == e.which) {
	                exerciseApi.Dication.gotoHisResult(200);
	            }

	        });
    }
    $(function () {
    	
        //side高度
//        var sideWidth = $(window).height() - $(".banner").outerHeight() - $(".fix_foot").outerHeight() - parseFloat($(".side1").css("padding-top"));
        var sideWidth = $(window).height() - $(".banner").outerHeight() - $(".fix_foot").outerHeight();
        $(".side1").css("height", sideWidth);
        window.onresize = function () {
//            var sideWidth = $(window).height() - $(".banner").outerHeight() - $(".fix_foot").outerHeight() - parseFloat($(".side1").css("padding-top"));
            var sideWidth = $(window).height() - $(".banner").outerHeight() - $(".fix_foot").outerHeight();
            $(".side1").css("height", sideWidth);
        };
        //列表
        $(".plan_list .h1").click(function (e) {
            var that = this;
            if ($(that).find(".locked").css("display") == "none") {
                if ($(that).next().css("display") == "none") {
                    $(".plan_list .plan_li").find(".details_list").stop().slideUp();
                    $(".plan_list .h1").find(".close").each(function () {
                        if ($(this).parent().find(".locked").css("display") == "none") {
                            $(this).hide();
                            $(this).parent().find(".open").show();
                        }
                    });
                    $(that).find(".open").hide();
                    $(that).find(".close").show();
                    $(that).next().stop().slideDown();
                } else {
                    $(".plan_list .plan_li").find(".details_list").stop().slideUp();
                    $(".plan_list .h1").find(".close").each(function () {
                        if ($(this).parent().find(".locked").css("display") == "none") {
                            $(this).hide();
                            $(this).parent().find(".open").show();
                        }
                    });
                }
            }
        });
        //蒙版及左侧菜单提示
        $(".darkClose").click(function () {
            $(this).parent().parent().css("display", "none");
            $(".dark").css("display", "none");
        });
        $(".show").click(function () {
            if ($(".dark").css("display") == "none") {
                if (parseFloat($(".side1").css("left")) < 0) {
                    $(".side1").stop().animate({left: "0"}, 500);
                } else {
                    $(".side1").stop().animate({left: "-308"}, 500);
                }
            }
        });

        /*口语练习*/
        //进度条
        var spokenTimer=null;
        function spokenBar(str){
            var audio=$(str).find("#spokenAudio")[0];
            var duration=audio.duration,curTime=audio.currentTime;
            var totalS=$(str).find("#bar").css("width");
            var curS=parseFloat(totalS)*curTime/duration;
            $(str).find("#bar").find(".finish").css("width",curS);
        }

        //播放音频
        $("#spoken").find(".control").click(function(){
            var audio=$("#spoken").find("#spokenAudio")[0];
            var that=this;
            if($(that).attr("data-play")==0){//未播放时点击
                spokenTimer=window.setInterval(function(){
                    spokenBar("#spoken");
                },1000);
                $(that).attr("data-play","1");
                $(that).find("img").attr("src","${cdnPath}/i/al/playing.png");
                audio.play();
            }else if($(that).attr("data-play")==1){//播放中点击
                window.clearInterval(spokenTimer);
                $(that).attr("data-play","2");
                $(that).find("img").attr("src","${cdnPath}/i/al/stop.png");
                audio.pause();
            }else{//暂停时点击
                spokenTimer=window.setInterval(function(){
                    spokenBar("#spoken");
                },1000);
                $(that).attr("data-play","1");
                $(that).find("img").attr("src","${cdnPath}/i/al/playing.png");
                audio.play();
            }
            $(audio).bind("ended",function(){
                window.clearInterval(spokenTimer);
                $("#spoken").find("#bar").find(".finish").css("width",0);
                $(that).attr("data-play","0");
                $(that).find("img").attr("src","${cdnPath}/i/al/start.png");
            });
        });
        //录音
        $("#spoken #startRecord").click(function(){
            $(this).hide();
            $("#spoken #recording").css("display","inline-block");
        });
        $("#spoken #recording").click(function(){
            $(this).hide();
            $("#spoken .right-btn").find("button").hide();
            $("#spoken .right-btn").find("button").eq(0).show();
            $("#spoken .right-btn").find("button").eq(1).show();
            //$("#spoken .right-btn").find("button").eq(2).show();

            $("#spoken #playRecord").css("display","inline-block");
        });
        $("#spoken #playRecord").click(function(){
            $(this).hide();
            $("#spoken #playingRecord").css("display","inline-block");
            $("#spoken .right-btn").find("button").eq(1).hide();
            $("#spoken .right-btn").find("button").eq(2).show();
        });
        $("#spoken #playingRecord").click(function(){
            $(this).hide();
            $("#spoken #playRecord").css("display","inline-block");
            $("#spoken .right-btn").find("button").eq(2).hide();
            $("#spoken .right-btn").find("button").eq(1).show();
        });
        //重录
        $("#spoken .right-btn").find(".btn_1").click(function(){
            $("#spoken .repeat_record").find("img").hide();
            $("#spoken #startRecord").show();
            $("#spoken .right-btn").find("button").hide();
            $("#spoken .right-btn").find("button").eq(2).show();
        });
        //下一题
        $("#spoken .right-btn").find(".btn_2").click(function(){
            $("#spoken .repeat_record").find("img").hide();
            $("#spoken #startRecord").show();
            $("#spoken .right-btn").find("button").hide();
            $("#spoken .right-btn").find("button").eq(2).show();
        });

        /*练习--习作*/
        //查看参考答案
        $("#translate #see_ans").click(function(){
            $(this).hide();
            $("#translate .right-key").show();
            $("#translate .right_textarea").hide();
        });
        $("#translate .right-key").find("#next_btn").click(function(){
            $("#translate .right-key").hide();
            $("#translate #see_ans").show();
            $("#translate .right_textarea").show();
        })

		var goupid = $("#groupid").val();
		var moduleid = $("#moduleid").val();
		if(goupid){
			 
		}
		 /*练习--习作*/
        //查看参考答案
        $("#aaaaaaaaaaaaaaa").click(function(){ 
        	exerciseApi.Dication.showDictation(200,1);
        	//var test2 = main.Dication;
        });
		//var test = Dication;
		
    })
    
        //关闭保存成功提示
        $("#save_success .saveClose").click(function(){
            $("#save_success").hide();
        });
        $("#save_success #cancel").click(function(){
            $("#save_success").hide();
        });
        //关闭完成按钮后弹窗
        $("#morePlan .moreClose").click(function(){
            $("#morePlan").hide();
        });
        $("#morePlan #moreCancel").click(function(){
            $("#morePlan").hide();
        });
        /*未开发 提示弹框  */
        $("#goToApp_modal").on("click",".appClose",function(){
        	var isexit = document.referrer;
        	if(isexit==null||isexit=="")
        	{
	        	$("#goToApp_modal").hide();
        	}
        	else
        	{
        		if(isexit.indexOf("/sso/login")>=0)
        		{
        			window.location.href = "/index.html";
        		}
        		else{
        			window.location.href = isexit;
        		}
        	
        	}
        })

</script>