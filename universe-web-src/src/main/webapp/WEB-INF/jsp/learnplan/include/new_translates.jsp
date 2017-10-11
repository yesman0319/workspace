<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>默写</title>
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
<link rel="stylesheet" href="/common/css/specifics.css" type="text/css">
<link rel="stylesheet" href="/css/new_translate.css" type="text/css">
<script type="text/javascript" src="/common/js/translate_app.js"></script>
<body>

<div id="que">
    <div class="content-wrap">
        <div class="right-part1">
        	<c:if test="${not empty translates }">
			<c:forEach items="${translates }" var="item" varStatus="index">
			<c:if test="${index.index==0 }">
          		<h1 class="top-title"><img src="/common/images/t_pic9.jpg" alt=""><span>默写  ${groupName}</span>
	                <span id="timerTranslate" class="timerTranslate">00:00:00</span><img class="clock" src="../../i/time.png" alt=""></h1>
          		</c:if>       
			<input type="hidden" id="groupId_${index.index }" value="${item.groupId }"/>
			<input type="hidden" id="questionId_${index.index }" value="${item.questionId }"/>
        	<div class="right-cen" id="ywy_${index.index }" style="<c:if test='${index.index!=0 }'>display:none</c:if>">
        	         	 
        		<div class="inner_1_${index.index }">	               
	                <p class="sort-show">${index.index+1 }/${fn:length(translates)}<span class="ss-tips">请背诵下面的句子或段落,随后进行默写</span></p>
	                <div class="right-text">
	                    <p>${item.english }</p>
	                </div>
	                
	                 <button id="btn" class="on_${index.index } on" onclick="beginWrite(${index.index })">开始默写</button>
        		</div>
                 <div class="inner_2_${index.index }" style="display:none;">
                 <p class="sort-show">${index.index+1 }/${fn:length(translates)}<span id="notpass_tip_${index.index }" class="ss-tips" style="display:none;">全部正确后才能进入下一个</span></p>
	                <div class="right-text">
	                    <p>${item.chinese }</p>
	                    <c:if test="${!empty item.tip }">
		                    <p>提示：${item.tip }</p>
	                    </c:if>
	                </div>
	                <p class="right-yw" id="yw_${index.index }">你的默写：</p>
	                <!--<textarea class="right-textarea" id="right-textarea_${index.index }" onpaste="return false"></textarea>-->
	                <div class="right-textarea" id="right-textarea_${index.index }">
	                	
	                </div>
	                <p id="rtTips_${index.index }" class="rt-tips">请输入内容</p>	
	                <div class="right-key" style="display: none" id="right-key_${index.index }">
	                		<p id="daan_${index.index }" style="visibility: hidden;"></p>
	                    <!--<h1>你的默写：</h1>
	                    <p id="daan_${index.index }"></p>
	                    <h1>原文：</h1>
	                    <p id="yuanwen_${index.index }">${item.english }</p>-->
	                    <button id="btns" class="next_${index.index }" onclick="nextQue(${index.index })">下一个</button>
	                    <button id="redo_${index.index }" class="redo_btn" onclick="redo(${index.index })">再练一次</button>
	                    <button id="btns1" class="record_${index.index }" style="display:none" onclick="recordAll(${index.index })">提交</button>
	                </div>
	                <button id="btn" class="on_${index.index } on" onclick="lookAnswer(${index.index })">查看结果</button>
                 </div>
            </div>
        	</c:forEach>
        	</c:if>
        </div>
    </div>
</div>
<div id="recordAll" style="display:none">
	<div class="content-wrap">
		<div class="right-part1">
       		<div class="right-cen">
       			<c:if test="${not empty translates }"> 
          		<h1 class="h1s"><img src="/common/images/t_pic9.jpg" alt="">练习报告</h1>
          		<div class="result-show">
          		<img id="flag" src="../../i/newimg-0.png" alt="">
          		<p class="rate-info">正确率：<span class="rate" id="rate"></span>平均速度：<span class="speed" id="speed"></span>词/秒</p>
          		<img id="bigFlag" src="../i/i23.png" alt="">
          		<p class="rate-tips">正确率是按照译文全对数量计算的</p>
          		</div> 
          		
<%-- 				<c:forEach items="${translates }" var="item" varStatus="index"> --%>
					
<!--                	<div class="right-bor"> -->
<%--                		<h1><span>第${index.index+1 }句/共${fn:length(translates)}句</span></h1> --%>
<!--                    	<div class="right-text list-right-text"> -->
<%--                   		<p class="padding0"><span>${index.index+1}.&nbsp;</span>${item.chinese }</p> --%>
<%--                        	<p>提示：${item.tip }</p> --%>
<!--                    	</div> -->

<!--                    	<div class="right-key"> -->
<!--                    		<h1 class="line45" style="margin:0!important;">你的默写:</h1> -->
<%--                        	<p id="recordAnswer_${index.index }" class="padding0"> --%>
<%-- 	                       	<c:if test="${result==1 }"> --%>
<%-- 		                		${item.userAnswer } --%>
<%-- 		                	</c:if> --%>
<!-- 	                	</p> -->
<!--                        	<h1 class="line45" style="margin:0!important;">原文:</h1> -->
<%--                        	<p id="listAnswer_${index.index }" class="padding0">${item.english }</p> --%>
<!--                    	</div> -->
<!--                	</div> -->
<%--                	</c:forEach> --%>
               	</c:if>
                <button id="once" class="again">再来一遍</button>
            </div>
        </div>
    </div>
</div>

 <input type="hidden" id="redourl" value="${basePath}/exercises/inplan?planid=${planid }&dayid=${dayInfo.dayId  }&exerciseid=${currentExercise.id}" />
    
<script type="text/javascript">
var newTranslates = ${newTranslatesData};
var r = "${result}";
var answers = [];
if(r == 1){//结果页面
	$.each($("#recordAll .right-bor"),function(index,value){
		function getPianScoreResult(userInput) {
	        var userContent = userInput.replace(reg, " ").replace(/\s+/g, " ").trim().split(' ');       
	        allStage=$("#listAnswer_"+index).text().replace(/\s+/g, " ").trim().split(' ');
	        
	        //结果数组
	        pianStrArray = [];
	        var totalAnswerArray = new Array();
	        for (var i = 0; i < allStage.length; i++) {
	            var answerArray = allStage[i].replace(reg, " ").replace(/\s+/g, " ").trim().split(' ');
	            totalAnswerArray = totalAnswerArray.concat(answerArray);
	        }
	        //计算结果
	        var rt = new Array();  
	        //拼接结果字符串
	        var point = -1;
	        for (var i = 0; i < allStage.length; i++) {
	            var ss = allStage[i];
	            var start = 0;
	            var end = 0;
	            var pianStr = "";
	            for (var j = point + 1; j < rt.length; j++) {
	                end = ss.indexOf(rt[j], start);
	                if (end == -1||ss.trim().replace(reg, "").length!=rt[j].length) {
	                    break;
	                } else {
	                    point = j;
	                }
	                if (ss.substring(start, end).trim().replace(reg, "") != "") {
	                    pianStr += "<font style='color:#ff3c1f;font-size:16px;'>" + ss.substring(start, end) + "</font>";
	                } else {
	                    pianStr += ss.substring(start, end);
	                }
	                pianStr += rt[j];
	                start = end + rt[j].length;
	            }
	            if (ss.substring(start).trim().replace(reg, "") != "") {
	                pianStr += "<font style='color:#ff3c1f;font-size:16px;'>" + ss.substring(start) + "</font>";
	            } else {
	                pianStr += ss.substring(start);
	            }
	            pianStrArray.push(pianStr);

	        }
	        var duanScore=rt.length== parseInt(totalAnswerArray.length)?1:0;
	        return duanScore;
	    };
		var resultText=$.trim($(value).find("#recordAnswer_"+index).text());
		getPianScoreResult(resultText);
		strPian=""
		for(var i=0;i<pianStrArray.length;i++){
			strPian+=" "+pianStrArray[i];
		} 
		$("#listAnswer_"+index).html(strPian);
		
	})
	
	
	$("#rate").html(changeTwoDecimal_f("${translatesVO.rate*100}")+"%");
	$("#speed").html("${translatesVO.avgSpeed}");
	var nRate="${translatesVO.rate}";
	var level="${translatesVO.pointLevel}";
	if(level==0){
		$("#flag").attr("src","../../i/newimg-0.png");
	}else if(level==1){
		$("#flag").attr("src","../../i/newimg-4.png");
	}else if(level==2){
		$("#flag").attr("src","../../i/newimg-1.png");
	}else if(level==3){
		$("#flag").attr("src","../../i/newimg-2.png");
	}else if(level==4){
		$("#flag").attr("src","../../i/newimg-3.png");
	}
	if(nRate<0.5){
		$("#bigFlag").attr("src","../i/i23.png");
	}else if(nRate >= 0.5 && nRate <= 0.8){
		$("#bigFlag").attr("src","../i/i22.png");
	}else if(nRate >= 0.8 && nRate <1 ){
		$("#bigFlag").attr("src","../i/i21.png");
	}else if(nRate ==1){
		$("#bigFlag").attr("src","../i/i24-1.png");
	} 
}
	function compareAnswer(answer,standardAnswer){
		var obj;
		$.ajax({
			url: window.xiaoma.basePath+"/plan/proxy?proxyurl=${apiUrl}/new/sentence/compare",
			type: 'post', 
			async: false,
			cache: false,
			data:  {
				"answer":answer,
				"standardAnswer":standardAnswer 
			},
			success:function(json) { 
			 console.log(json);
			 obj = JSON.parse(json);
			}
		}); 
		return obj;
	}
	//符合指定正则表达式的字符串不处理
	function dealCharacter(strSample, regx) {
		var dicts = [];
		var arr = strSample.match(regx);
		var reg_noline = /[^A-Z0-9a-z'\-\|]/g;

		//用|代替匹配的（D.C.）等
		for (var i = 0, len = arr.length; i < len; i++) {
			strSample = strSample.replace(arr[i], '|');
		}
		//去掉乱七八糟的东西
		strSample = strSample.replace(reg_noline, " ").replace(/\s+/g, " ");

		var arrClean = strSample.split('|');
		var strClean = '';
		for (var j = 0, len = arrClean.length; j < len; j++) {
			//把（D.C.）等再拼接上
			if (j < arr.length) {
				strClean += arrClean[j] + arr[j];
			} else {
				strClean += arrClean[j];
			}
		}
		dicts = strClean.trim().split(' ');
		return dicts;
	}

function changeTwoDecimal_f(x) {
    var f_x = parseFloat(x);
    if (isNaN(f_x)) {
        alert('function:changeTwoDecimal->parameter error');
        return false;
    }
    var f_x = Math.round(x * 100) / 100;
    var s_x = f_x.toString();
    var pos_decimal = s_x.indexOf('.');
    if (pos_decimal < 0) {
        pos_decimal = s_x.length;
        s_x += '.';
    }
    while (s_x.length <= pos_decimal + 2) {
        s_x += '0';
    }
    return s_x;
}

function getTime(){ 
	return new Date($.ajax({url: window.xiaoma.basePath+"/gettime",async: false}).getResponseHeader("Date"));
}
function zeroFn (n){
    n=n<10?"0"+n:n;
    return n;
}
var xm_date=getTime();        
xm_startTime=zeroFn(xm_date.getFullYear())+"-"+zeroFn((xm_date.getMonth()+1))+"-"+zeroFn(xm_date.getDate())+" "+zeroFn(xm_date.getHours())+":"+zeroFn(xm_date.getMinutes())+":"+zeroFn(xm_date.getSeconds());
xm_date=null;
var reg = /[^A-Z0-9a-z'\-]/g;
var pianStrArray; //和用户答案对比后的范文结果数组
var strPian=""; //和用户答案对比后的范文结果字符串
var rightCount=0;//正确的题目
xm_timer=null,//计时定时器
xm_spendTime=0;//做题时间

var allStage;
/*开始计时  */
xm_timer = setInterval(function(){
	xm_spendTime ++;
    if ($("#timerTranslate").length <= 0) {
        console.log("not find target");
    }
    var checkTime = function(i) {
        if (i < 10) {
            i = "0" + i;
        }
        return i;
    };
    var hh = parseInt(xm_spendTime / 60 / 60 % 24, 10);
    var mm = parseInt(xm_spendTime / 60 % 60, 10);
    var ss = parseInt(xm_spendTime % 60, 10);
    hh = checkTime(hh);
    mm = checkTime(mm);
    ss = checkTime(ss);
    $("#timerTranslate").html(hh + ":" + mm + ":" + ss);
},1000);


$("#once").bind("click",function(){
	var url = $("#redourl").val();
	window.location.href=url+"&result=0"; 
})
function beginWrite(index) {
	$(".inner_1_"+index).css("display","none");
	$(".inner_2_"+index).css("display","block");
	buildLines(newTranslates,index);
}

function buildLines(newTranslates,index){
	var lineArr = getLineArr(newTranslates,index);
	var htm = 	'<span class="dic-build">'+
				'	<input text="text" spellcheck="false" class="build-input" />'+
				'	<input text="text" value='+lineArr[0]+' spellcheck="false" class="build-ans-input" />'+
				'</span>';	
	for(var i=1;i<lineArr.length;i++){
	 	htm += 	'<span class="dic-build">'+
				'	<input text="text" spellcheck="false" class="build-input" />'+
				'	<input text="text" value='+lineArr[i]+' spellcheck="false" class="build-ans-input" />'+
				'</span>';	
	}
	$(".right-textarea").html(htm);
	//失去焦点判断每一个空的对错
	$("#right-textarea_"+index+" .build-input").blur(function(){
		$this = $(this);
		var $userAns = $this.val().trim();
		var $originAns = $this.next().val().trim();
		if($userAns != "" && $userAns == $originAns){
			$this.addClass("rrr"); 
		}
	})
	//计算需生成的输入框数量
	function getLineArr(obj,index) {
		var reg = /[^A-Z0-9a-z'\-]/g;
		if (obj) {
			var dicts = [];
			var strSample = obj.result[index].english;
			//匹配（D.C.）这种格式和900,888,000.123这种格式,wfl
			var reg_DC_Number = /(([a-zA-Z]+\.){2})|(((\d{1,3}(,\d{3})*)|(\d+))(\.\d+)?)/g;
			if (reg_DC_Number.test(strSample)) {
				dicts = dealCharacter(strSample, reg_DC_Number);
			} else {
				dicts = strSample.replace(reg, " ").replace(/\s+/g, " ").trim().split(' ');
			}
	
			return dicts;
		}
	};
}

function getPianScore(userInput,standardAnswer) { 
    var userContent = userInput.trim()
    
    var resultCompare = compareAnswer(userContent,standardAnswer);
    
    var result = resultCompare.result; 
    //计算结果 
    //拼接结果字符串 
    var pianStrHtml="";;
    for (var i = 0; i < result.length; i++) {
        var ss = result[i]; 
        var pianStr = "";
        if(ss.isCorrect==1){
            pianStr += "" + ss.content  + ""; 
        }else{ 
        	allright = false;
            pianStr += "<font style='color:#ff3c1f;font-size:16px;'>" + ss.content  + "</font>";  
        }
        pianStrHtml = pianStrHtml+pianStr;

    } 
    var obj = {};
    obj.pass=resultCompare.pass;
    obj.total = resultCompare.total;
    obj.correct = resultCompare.correct;
    obj.showHtml = pianStrHtml;
    return obj;
};

function lookAnswer(index) {
	var Result = getResult();
	var text = Result.answerText;
	$("#right-key_"+index).show();
	$("#rtTips_"+index).hide();
	$(".on_"+index).hide();
	$("#yw_"+index).hide();
	$("#daan_"+index).html(text);
	$("#recordAnswer_"+index).html(text);
	
	/*获取该题目是否正确  全部正确才算正确*/
	var answerdata = newTranslates.result[index].english.trim();
	var answerResult = getPianScore(text,answerdata);  
	var len = "${fn:length(translates)}";
	
	if(Result.wrongNum <= 0){
		answers.push(answerResult);
		rightCount++;
		if(index+1 == len) {
			$(".next_"+index).hide();
			$(".record_"+index).show();
			$("#redo_"+index).hide(); 
		}else{
			$(".next_"+index).show();
			$(".record_"+index).hide();
			$("#redo_"+index).hide(); 
		}
	}else{
		//提示，全部通过才能坐下一题
		$("#notpass_tip_"+index).show();
		$("#redo_"+index).show(); 
		$(".next_"+index).hide();
		$(".record_"+index).hide();
	}	
	$("#yuanwen_"+index).html(answerResult.showHtml);
	$("#listAnswer_"+index).html(answerResult.showHtml);
	function getResult(){
		var obj = {};
		var wordsArr = [];
		obj.wrongNum = 0;
 	 	$("#right-textarea_"+index+" .build-input").each(function(index,value){
 	 		$(value).css("padding-top","28px").next().css("visibility","visible");
	 		wordsArr.push($(value).val().trim());
	 		if($(value).hasClass("rrr")){
	 			
			}else{
				$(value).css("color","#f00");
				obj.wrongNum++;
			}
	 	})
	 	obj.answerText = wordsArr.join(" ").trim();
	 	return obj;
	}
}
function nextQue(index) {
	var i = index+1;
	$("#ywy_"+index).css("display","none");
	$("#ywy_"+i).css("display","block");
} 

function redo(index) { 
	$("#right-key_"+index).css("display","none");
	$("#right-textarea_"+index).css("display","block");
	$("#rtTips_"+index).hide();
	$(".on_"+index).show();
	$("#yw_"+index).css("display","block");
	$("#daan_"+index).html("");
	$("#recordAnswer_"+index).html("");
	
	$("#right-textarea_"+index).val("");//清空上次默写的内容
	
	//提示，全部通过才能坐下一题
	$("#notpass_tip_"+index).hide();
	$("#redo_"+index).hide(); 
	$(".next_"+index).hide();
	$(".record_"+index).hide();
	$(".inner_1_"+index).css("display","block");
	$(".inner_2_"+index).css("display","none");


	var answerdata = newTranslates.result[index].english;
	$("#yuanwen_"+index).html(answerdata);
	$("#listAnswer_"+index).html("");
	   
} 

function recordAll() {
	var xm_date=getTime();        
    xm_endTime=zeroFn(xm_date.getFullYear())+"-"+zeroFn((xm_date.getMonth()+1))+"-"+zeroFn(xm_date.getDate())+" "+zeroFn(xm_date.getHours())+":"+zeroFn(xm_date.getMinutes())+":"+zeroFn(xm_date.getSeconds());
    xm_date=null;
	var len = "${fn:length(translates)}";
	var groupId = $("#groupId_0").val();
	
 
	var data = new Object();
	data.groupId = groupId; 
	data.planDayId="${dayInfo.dayId}";
	data.exerciseId="${currentExercise.id}";
	data.startTime=xm_startTime;
	data.endTime=xm_endTime;
	var str = "";
	 
	for(var i=0;i<len;i++) {
		var text = $("#daan_"+i).html();
		var queId = $("#questionId_"+i).val();
		
		var answerResult = answers[i];
		var result = new Object();	
		result.answer = text;
		result.questionId = queId;
		result.pass = answerResult.pass;
		result.correct = answerResult.correct;
		result.total = answerResult.total;
		/* result.groupId = groupId; */
		var res = JSON.stringify(result);
		str += res + ",";
	}
	var info = JSON.stringify(data);
	info = info.substring(0,info.length-1) + ',"results":[' + str.substring(0,str.length-1) + ']}';
	
	var token = "${token }";
	$.ajax({
		url: window.xiaoma.basePath+"/plan/proxy?proxyurl=${apiUrl}/new/sentence/save",
		type: "POST",
		async: false,
		cache: false, 
		contentType:"application/json",
		data:   info, 
		success: function(json) { 
			var backdata= $.parseJSON(json);
			$("#rate").html(changeTwoDecimal_f(backdata.rate*100)+"%");
			$("#speed").html(backdata.avgSpeed);
			var level=backdata.pointLevel;
			var nRate=backdata.rate;
			if(level==0){
				$("#flag").attr("src","../../i/newimg-0.png");
			}else if(level==1){
				$("#flag").attr("src","../../i/newimg-4.png");
			}else if(level==2){
				$("#flag").attr("src","../../i/newimg-1.png");
			}else if(level==3){
				$("#flag").attr("src","../../i/newimg-2.png");
			}else if(level==4){
				$("#flag").attr("src","../../i/newimg-3.png");
			}
			if(nRate<0.5){
				$("#bigFlag").attr("src","../i/i23.png");
			}else if(nRate >= 0.5 && nRate <= 0.8){
				$("#bigFlag").attr("src","../i/i22.png");
			}else if(nRate >= 0.8 && nRate <1 ){
				$("#bigFlag").attr("src","../i/i21.png");
			}else if(nRate ==1){
				$("#bigFlag").attr("src","../i/i24-1.png");
			} 
		},
		error: function(data) {
		}
	});
	
	$("#que").css("display","none");
	$("#recordAll").css("display","block");
}

var result = "${result}";
if(result==1){
	$("#que").css("display","none");
	$("#recordAll").css("display","block");
}
</script>
</body>
</html>