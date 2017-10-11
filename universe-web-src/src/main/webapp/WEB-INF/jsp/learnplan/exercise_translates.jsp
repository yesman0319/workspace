<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
 
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?22fe330b8bf5f3b6daef2ad6864536cc";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script> 
<!--<script type="text/javascript" src="${cdnPath}/common/js/jquery-1.11.1.min.js"></script>-->
<script type="text/javascript" src="${cdnPath}/common/js/translate_app.js"></script> 
 <div id="que">
    <div class="exercise-content-wrap">
        <div class="exercise-right-part1">
        	<c:if test="${not empty translates }">
			<c:forEach items="${translates }" var="item" varStatus="index">
			<input type="hidden" id="groupId_${index.index }" value="${item.groupId }"/>
			<input type="hidden" id="questionId_${index.index }" value="${item.questionId }"/>
        	<div class="right-cen" id="ywy_${index.index }" style="<c:if test='${index.index!=0 }'>display:none</c:if>">
                <h1><img src="${cdnPath}/common/images/t_pic9.jpg" alt=""><span>${currentExercise.moduleName}&nbsp; ${currentExercise.originName}</span></h1>
                <p>第${index.index+1 }句/共${fn:length(translates)}句</p>
                <div class="right-text">
                    <p>${item.chinese }</p>
                    <p>提示：${item.tip }</p>
                </div>
                <p class="right-yw" id="yw_${index.index }">请在下面输入你的译文:</p>
                <textarea class="right-textarea" id="right-textarea_${index.index }"></textarea>

                <div class="right-key" style="display: none" id="right-key_${index.index }">
                    <h1><img src="${cdnPath}/common/images/t_pic10.jpg" alt=""><span style="color: #00b652">你的答案:</span></h1>
                    <p id="daan_${index.index }"></p>
                    <h1><img src="${cdnPath}/common/images/t_pic11.jpg" alt=""><span style="color: #179ce1">参考答案:</span></h1>
                    <p>${item.english }</p>
                    <button id="btns" class="next_${index.index }" onclick="nextQue(${index.index })">下一句</button>
                    <button id="btns1" class="record_${index.index }" style="display:none" onclick="lookAll(${index.index })">查看做题记录</button>
                </div>
                <button id="btn" class="on_${index.index } on" onclick="lookAnswer(${index.index })">查看参考答案</button>
            </div>
        	</c:forEach>
        	</c:if>
        </div>
    </div>
    </div> 
<div id="recordAll" style="display:none">
	<div class="exercise-content-wrap">
		<div class="exercise-right-part1">
       		<div class="right-cen">
       			<c:if test="${not empty translates }">
				<c:forEach items="${translates }" var="item" varStatus="index">
				<c:if test="${index.index==0 }">
          		<h1 class="h1s" style="font-size:18px;font-weight:bold;height:10px"><img src="${cdnPath}/common/images/t_pic9.jpg" alt="" style="margin-top:0px">练习报告</h1>
          		</c:if>
               	<div class="right-bor">
               		<h1><span>第${index.index+1 }句/共${fn:length(translates)}句</span></h1>
                   	<div class="right-text">
                  		<p>${item.chinese }</p>
                       	<p>提示：${item.tip }</p>
                   	</div>

                   	<div class="right-key">
                   		<h1><img src="${cdnPath}/common/images/t_pic10.jpg" alt=""><span style="color: #00b652">你的答案:</span></h1>
                       	<p id="recordAnswer_${index.index }">${item.userAnswer}</p>
                       	<h1><img src="${cdnPath}/common/images/t_pic11.jpg" alt=""><span style="color: #179ce1">参考答案:</span></h1>
                       	<p>${item.english }</p>
                   	</div>
               	</div>
               	</c:forEach>
               	</c:if>
                <button id="once" class="once">再来一遍</button>
            </div>
        </div>
    </div>  
    
    <input type="hidden" id="redourl" value="${basePath}/exercises/inplan?planid=${planid }&dayid=${dayInfo.dayId  }&exerciseid=${currentExercise.id}" />
    
<!-- <form id="translateForm" action="/translate/list" method="post"> -->
<!-- 	<input type="hidden" id="groupUnitId" name="groupUnitId" value=""/> -->
<!-- 	<input type="hidden" id="token" name="token" value=""/> -->
<!-- </form> -->
<script type="text/javascript">
var zeroFn=function(n){
	n=n<10?"0"+n:n;
	return n;
}

function getTime(){ 
	return new Date($.ajax({url: window.xiaoma.basePath+"/gettime",async: false}).getResponseHeader("Date"));
}
var planid = ${dayInfo.planId};
var plandayid = ${dayInfo.dayId};
var exerciseid =  ${currentExercise.id};

var date=getTime();
var startTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
 
var endTime =  "";

$("#once").bind("click",function(){
	var url = $("#redourl").val();
	window.location.href=url+"&result=0"; 
})
function lookAnswer(index) {
	var text = $("#right-textarea_"+index).val();
	if(text == '' || text == "") {
		alert("请输入您的译文");
		return;
	}
	$("#right-key_"+index).css("display","block");
	$("#right-textarea_"+index).css("display","none");
	$("#yw_"+index).css("display","none");
	$("#daan_"+index).html(text);
	$("#recordAnswer_"+index).html(text);
	$(".on_"+index).css("display","none");
	var len = "${fn:length(translates)}";
	if(index+1 >= len) {
		$(".next_"+index).css("display","none");
		$(".record_"+index).css("display","block");
		var date=getTime();
		endTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
		recordAll();
	}
}
function nextQue(index) {
	var i = index+1;
	$("#ywy_"+index).css("display","none");
	$("#ywy_"+i).css("display","block");
}
var  saveCount = 0;//句子翻译保存问题，多次保存，看看还有问题吗。
function recordAll() {
	saveCount++;
	var len = "${fn:length(translates)}";
	var groupId = $("#groupId_0").val();
	
	var data = new Object();
	data.groupId = groupId;
	data.exerciseId =  exerciseid;
	data.planDayId =  plandayid;
	data.startTime =  startTime;
	data.endTime =  endTime;
	if(!endTime || endTime==""){
		var date=getTime();
		endTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
		data.endTime = endTime;
	}
	var results=[];
	for(var i=0;i<len;i++) {
		var text = $("#daan_"+i).html();
		var queId = $("#questionId_"+i).val();
		// {"answer":"I am teacher,you are student,so you must listen to me","questionId":"126","groupId":"13"} ,
		var result = new Object();	
		result.answer = text;
		result.questionId = queId;
		result.groupId = groupId;
		results.push(result);
	}
	data.results=results;
	
	var info = JSON.stringify(data);
	 
	var token = "${token }";
	$.ajax({
		url: exerciseApi.learnApi+"/translate/result/save.action",
		type: "POST",
		async: false,
		cache: false,
		contentType:"application/json",
		data:info,
		success: function(data) {
		},
		error: function(data) {
			if(saveCount<=3){ 
				var t1 = window.setTimeout(recordAll,1000); 
			}
		}
	});
}
function lookAll(){
	$("#que").css("display","none");
	$("#recordAll").css("display","block");
}

var result = "${result}";
if(result==1){
	$("#que").css("display","none");
	$("#recordAll").css("display","block");
}
</script> 