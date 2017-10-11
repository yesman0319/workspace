<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

 <!DOCTYPE html>
<html>
<head>
    <title>${moduleName}-精英计划</title>
    
    <%@include file="../include/pub.jsp"%>
    
    <meta charset="utf-8"/>
    
    <link href="${cdnPath}/c/src/table.css" rel="stylesheet" type="text/css">
	<link rel="stylesheet" href="${cdnPath}/common/css/translate.css" type="text/css">
    <link href="${cdnPath}/c/g13.css" rel="stylesheet" type="text/css">
    <link href="${cdnPath}/c/g24.css" rel="stylesheet" type="text/css">
    <link href="${cdnPath}/c/g16.css" rel="stylesheet" type="text/css">
    <link href="${cdnPath}/c/g24.css" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="${cdnPath}/c/bootstrap.min.css">
    <link rel="stylesheet" href="${cdnPath}/c/common.css" type="text/css"/>
    <link rel="stylesheet" href="${cdnPath}/c/plan_details.css" type="text/css"/>
    <%@include file="../learnplan/inc/playSound.jsp"%>
    <script type="text/javascript">
        var _hmt = _hmt || [];
        (function () {
            var hm = document.createElement("script");
            hm.src = "//hm.baidu.com/hm.js?22fe330b8bf5f3b6daef2ad6864536cc";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    </script>


</head>
<body class="w1000">
<input id="moduleid" hidden="true" value="${moduleid}" />  
<%@include file="../learnplan/include/exercise_pub.jsp"%>
  
<div class="wrap">
    <div class="content">
        <div class="content-wrap mid" style="margin-top:110px;width:1160px;"> 
             <div id="content" class="main mid">
             </div> 
        </div>
    </div>
</div>

<script type="text/javascript" src="${basePath}/j/app/exercise/exerciseEventManager.js"></script> 
<script type="text/javascript">

	var exerciseApi = {};
	var token = "${token}";
		exerciseApi.xiaomaToken = "bearer "+token;
		exerciseApi.updateListItem = function(){
			
		}
    exerciseEventManager.addEventListener("mainLoadEnd",mainLoadEnd);
    exerciseApi.isLogin = ${islogin==true};
    exerciseApi.learnApi = window.xiaoma.basePath+"/plan/proxy?proxyurl=${apiUrl}/";//20160906;
    exerciseApi.saveSpeakApi = window.xiaoma.basePath+"/exercises/speak/answer?proxyurl=${apiUrl}/";//20160906;
    exerciseApi.xiaomaToken = "bearer"; 

	var moduleName = "${moduleName}";
	var originName="${name}";
	var result = "${result}";
	var planid = "";
	var plandayid = "";
	var exerciseid = "";
	var groupID = 0;
	var sequenceNumber=0;
	var questionID=0;
	var questionType = 0;//1-conversation;//1-conversation tpo
	var moduleID = ${moduleID};
	
	var questionType = null;
	if(moduleID == 17){//17  机经口语 完成
		questionID = ${questionID};
		questionType = 1;
	} else if(moduleID == 18){//18  机经写作  完成 
		questionID = ${questionID};
		questionType = 2;
	}
    exerciseApi.shareUrl="${basePath }/jijing/more/"+questionType+"/"+ questionID +".html?name="+originName;

    function mainLoadEnd(){
      if(moduleID == 17){//17  机经口语 完成
			questionID = ${questionID};
			if("1"==result){
				exerciseApi.Speak.gotoHisResult(questionID,plandayid,exerciseid,1,moduleName+" "+originName);//questionId 当前单元 planDayId  exerciseId 
			}else{ 
				exerciseApi.Speak.showSpeak(questionID,plandayid,exerciseid,1,moduleName+" "+originName);//questionId 当前单元 planDayId  exerciseId 
			}
		}else if(moduleID == 18){//18  机经写作  完成
			questionID = ${questionID};
			if("1"==result){
				 exerciseApi.JJWrite.gotoHisResult(questionID,plandayid,exerciseid,2,moduleName+" "+originName); 
			}else{ 
				 exerciseApi.JJWrite.showJJWrite(questionID,plandayid,exerciseid,2,moduleName+" "+originName); 
			}
		}
  }
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
</script>
<script data-main="${basePath}/j/app/exercise/main" src="${basePath}/j/lib/requirejs/2.1.15.js"></script>

</body>
</html>