<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>消息中心</title>
     <%@include file="../include/pub.jsp"%>
    <link type="text/css" rel="stylesheet" href="${cdnPath}/css/common.css"/>
    <link rel="stylesheet" href="${cdnPath}/css/personal_center.css" />
    <link rel="stylesheet" href="${cdnPath}/js/lib/Jcrop/jquery.Jcrop.min.css"/>  
        <link type="text/css" rel="stylesheet"  href="${cdnPath}/css/common.css"/>
    <link type="text/css" rel="stylesheet" href="${cdnPath}/css/notices.css"/>
</head>
<body>
<%@include file="../include/header.jsp"%>
<div class="n-layout">
	 <h2>全部通知<span id="messageCount" style="font-size:18px"><span id="messageReadAll" class="n-h-ed fr">全部标为已读</span></h2>
    <p id="noMessage" class="no-msg none">暂无任何通知</p>
    <div class="n-con">
     <ul class="n-list" id="message_List" >
          
     </ul>
        <div class="more">
            <a id="moreBtn" href="javascript:;" class="moreBtn">点击加载更多</a>
        </div>
    </div>
</div>

<jsp:include page="../include/footer.jsp"></jsp:include>

<div id="Tips" class="payResult_modal" style="display: none;">
    <div class="payResult_dialog">
        <h2>温馨提示<span class="close_btn closeBtn"></span>
        </h2>
        <p id="tips_content"class="payResult_tips">提示内容</p>
        <a href="javascript:;" class="pay_confirm closeBtn"> 知道啦</a>
    </div>
</div>
<script type="text/javascript" src="${cdnPath}/js/lib/Jcrop/jquery.Jcrop.min.js"></script> 
<script type="text/javascript">

var user_id=${sessionScope.userInfo.id};
var message_api_url = window.xiaoma.messageApi; 
var next_url=message_api_url+"/message/"+user_id+"?page=1&page_size=20";
var porxy_url =  window.xiaoma.basePath+"/plan/proxy?proxyurl=";
var lastDate=null;
var messageData={};

var getzf=function(n){
	n=n<10?"0"+n:n;
	return n;
}

function getTimeStr(val){  
        var oDate = new Date(val),  
        oYear = oDate.getFullYear(),  
        oMonth = oDate.getMonth()+1,  
        oDay = oDate.getDate(),  
        oHour = oDate.getHours(),  
        oMin = oDate.getMinutes(),  
        oSen = oDate.getSeconds(),  
        oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSen);//最后拼接时间  
        return oTime;  
}

function showTip(id){
	
	var data = messageData[id];
	var dataText = "";
	if(data!=null){
		dataText = data.contentInfo.text;
	}
	
	var url = porxy_url+message_api_url+"/message/read/"+user_id+"/"+id;
	$.ajax({
		url: url,
		type: 'get', 
		success:function(json) {  
        	$("#messageItemId"+id).find("*").addClass("d6");
        	refreshMessage();
		}
	});	
	
	$("#tips_content").text(dataText);
	$("#Tips").show();	
}
function refreshMessage(){
	console.log("页面刷新");
	if(lastDate==null)
		return;
	
	//http://test.api.liuyang.com/notice/message/{userid}/{timestamp}
	var url = porxy_url+message_api_url+"/message/"+user_id+"/"+lastDate;
	$.ajax({
		url: url,
		type: 'get', 
		success:function(json) {   
        	var obj=JSON.parse(json);
        	var unreadCount = obj.unreadCount;
        	
        	if(unreadCount>0){
				//$("#noMessage").show();
				//$("#messageReadAll").show();
				$("#notices-count").text(unreadCount);
				$("#notices-count").show(); 
			}else{
				//$("#messageReadAll").hide();
				//$("#noMessage").show();
				$("#notices-count").hide();
			}
        	
        	dataBackPre(obj);
		}
	});	
}
function planClick(id){
	var url = porxy_url+message_api_url+"/message/read/"+user_id+"/"+id;
	$.ajax({
		url: url,
		type: 'get', 
		success:function(json) {  
        	$("#messageItemId"+id).find("*").addClass("d6");
        	refreshMessage();
		}
	});	
	var messageObj=messageData[id];
	var url = window.xiaoma.basePath+"/plans/"+messageObj.contentInfo.extraData.plnaId;
	window.open(url); 
}

function CommentClick(id){
	var url = porxy_url+message_api_url+"/message/read/"+user_id+"/"+id;
	$.ajax({
		url: url,
		type: 'get', 
		success:function(json) {  
        	$("#messageItemId"+id).find("*").addClass("d6");
        	refreshMessage();
		}
	});	
	var messageObj=messageData[id]; 
	var extraData = messageObj.contentInfo.extraData;
	var url = window.xiaoma.basePath+"/comment/"+extraData.type+"/"+extraData.answerId+"?questionId="+extraData.questionId+"&shareId="+extraData.shareId;
	window.open(url); 
}

function videoClick(id){ 

	var url = porxy_url+message_api_url+"/message/read/"+user_id+"/"+id;
	$.ajax({
		url: url,
		type: 'get', 
		success:function(json) {  
        	$("#messageItemId"+id).find("*").addClass("d6");
        	refreshMessage();
		}
	});	
	var messageObj=messageData[id]; 
	var url = window.xiaoma.basePath+"/courses/"+messageObj.contentInfo.extraData.courseId;
	window.open(url); 
}

function forumReplyClick(id){ 

	var url = porxy_url+message_api_url+"/message/read/"+user_id+"/"+id;
	$.ajax({
		url: url,
		type: 'get', 
		success:function(json) {  
        	$("#messageItemId"+id).find("*").addClass("d6");
        	refreshMessage();
		}
	});	
	var messageObj=messageData[id]; 
	var extraData = messageObj.contentInfo.extraData;
	//http://test.www.liuyang.com/topic/replys?topicId=281&videoId=1&nodeId=3
	
	var url = window.xiaoma.basePath+"/topic/replys?topicId="+extraData.topicId+"&videoId="+extraData.videoId+"&nodeId="+extraData.nodeId;
	window.open(url); 
}

function deleteMessage(id){
	var url = porxy_url+message_api_url+"/message/"+id;
	$.ajax({
		url: url,
		type: 'delete', 
		success:function(json) {  
        	$("#messageItemId"+id).remove() ;
		}
	});
}


function dataBackPre(obj){ 
	var results = obj.results;
	
	if(results!=null){
		$.each(results.reverse(),function(index,val,arr){
			if(lastDate==null){
				lastDate = val.createTime/1000;
			}
			if(val.createTime/1000>lastDate){
				lastDate = val.createTime/1000;
			}
			messageData[val.id] = val;
			var strHtml="";
			  if(val.originType==1){//计划     
				  strHtml = getPlanHtml(val);
			  }else if(val.originType==2){//视频
				  strHtml = getVideoHtml(val);
			  }else if(val.originType==3){//微课程
				  strHtml = getMicroCoursesHtml(val); 
			  }else if(val.originType==4){// 讨论区
				  strHtml = getForumHtml(val); 
			  }else if(val.originType==5){//评论
			 	  strHtml = getCommentHtml(val);
			  }else{
				  strHtml = getDefaultHtml(val);  
			  }
			  if(strHtml!==""){ 
		   		$("#message_List").prepend(strHtml);
		      }
			});
	}  
	
}

function dataBack(obj){
	next_url = obj.next;
	var results = obj.results;
	if(next_url==""){
		$("#moreBtn").hide();
	}
	
	if(results!=null){
		$.each(results,function(index,val,arr){
			if(lastDate==null){
				lastDate = val.createTime/1000;
			}
			if(val.createTime/1000>lastDate){
				lastDate = val.createTime/1000;
			}
			messageData[val.id] = val;
			 var strHtml="";
			  if(val.originType==1){//计划     
				  strHtml = getPlanHtml(val);
			  }else if(val.originType==2){//视频
				  strHtml = getVideoHtml(val);
			  }else if(val.originType==3){//微课程
				  strHtml = getMicroCoursesHtml(val); 
			  }else if(val.originType==4){// 讨论区
				  strHtml = getForumHtml(val); 
			  }else if(val.originType==5){//评论
			 	  strHtml = getCommentHtml(val);
			  }else{
				  strHtml = getDefaultHtml(val);  
			  }
			  if(strHtml!==""){ 
		   		$("#message_List").append(strHtml);
		      }
			});
	} 
	
	 
}

function getMicroCoursesHtml(messageObj){
	var titleList = messageObj.contentInfo.titleList;
	var clickIndex = messageObj.contentInfo.clickTitleIndex;
	if(titleList==null)
		return "";
	
	var url = window.xiaoma.basePath+"/courses/"+messageObj.contentInfo.extraData.courseId;
	var strHtml = "";
	strHtml=strHtml + "<li id=\"messageItemId"+ messageObj.id +"\" class=\"n-item\">";
	if(messageObj.isRead!=1){
		strHtml=strHtml + "<p class=\"ni-t\">";
		$.each(titleList,function(index,val,arr){
			if(index==clickIndex){
				strHtml=strHtml + "&nbsp;<a onclick=\"showTip("+messageObj.id+")\" class=\"ni-t-text\" >"+ val +"</a>&nbsp;"; 
			}else{ 
				strHtml=strHtml+val;
			}
			}); 
		
		strHtml=strHtml + "<span class=\"ni-t-time\">"+ getTimeStr(messageObj.createTime) +"</span><span class=\"laji\" onclick=\"deleteMessage("+messageObj.id+")\"></span>"
		strHtml=strHtml + "</p>"; 
	}else{
		strHtml=strHtml + "<p class=\"ni-t d6\">";
		$.each(titleList,function(index,val,arr){
			if(index==clickIndex){
				strHtml=strHtml + "&nbsp;<a onclick=\"showTip("+messageObj.id+")\"  class=\"ni-t-text d6\" >"+ val +"</a>&nbsp;"; 
			}else{ 
				strHtml=strHtml+val;
			}
			}); 
		
		strHtml=strHtml + "<span class=\"ni-t-time d6\">"+ getTimeStr(messageObj.createTime) +"</span><span class=\"laji\" onclick=\"deleteMessage("+messageObj.id+")\"></span>"
		strHtml=strHtml + "</p>";  
	}
	strHtml=strHtml + "</li>";
	
	return strHtml; 
}

function getDefaultHtml(messageObj){
	var titleList = messageObj.contentInfo.titleList;
	var clickIndex = messageObj.contentInfo.clickTitleIndex;
	if(titleList==null)
		return "";
	 
	var strHtml = "";
	strHtml=strHtml + "<li id=\"messageItemId"+ messageObj.id +"\" class=\"n-item\">";
	if(messageObj.isRead!=1){
		strHtml=strHtml + "<p class=\"ni-t\">";
		$.each(titleList,function(index,val,arr){
			if(index==clickIndex){
				strHtml=strHtml + "&nbsp;<a onclick=\"showTip("+messageObj.id+")\" class=\"ni-t-text\" >"+ val +"</a>&nbsp;"; 
			}else{ 
				strHtml=strHtml+val;
			}
			}); 
		
		strHtml=strHtml + "<span class=\"ni-t-time\">"+ getTimeStr(messageObj.createTime) +"</span><span class=\"laji\" onclick=\"deleteMessage("+messageObj.id+")\"></span>"
		strHtml=strHtml + "</p>"; 
	}else{
		strHtml=strHtml + "<p class=\"ni-t d6\">";
		$.each(titleList,function(index,val,arr){
			if(index==clickIndex){
				strHtml=strHtml + "&nbsp;<a onclick=\"showTip("+messageObj.id+")\"  class=\"ni-t-text d6\" >"+ val +"</a>&nbsp;"; 
			}else{ 
				strHtml=strHtml+val;
			}
			}); 
		
		strHtml=strHtml + "<span class=\"ni-t-time d6\">"+ getTimeStr(messageObj.createTime) +"</span><span class=\"laji\" onclick=\"deleteMessage("+messageObj.id+")\"></span>"
		strHtml=strHtml + "</p>";  
	}
	strHtml=strHtml + "</li>";
	
	return strHtml; 
}

function getVideoHtml(messageObj){
	var titleList = messageObj.contentInfo.titleList;
	var clickIndex = messageObj.contentInfo.clickTitleIndex;
	if(titleList==null)
		return "";
	
	var url = window.xiaoma.basePath+"/courses/"+messageObj.contentInfo.extraData.courseId;
	var strHtml = "";
	strHtml=strHtml + "<li id=\"messageItemId"+ messageObj.id +"\" class=\"n-item\">";
	if(messageObj.isRead!=1){
		strHtml=strHtml + "<p class=\"ni-t\">";
		$.each(titleList,function(index,val,arr){
			if(index==clickIndex){
				strHtml=strHtml + "&nbsp;<a href=\"javascript:;\" class=\"ni-t-text\"  onclick=\"videoClick("+messageObj.id+")\">"+ val +"</a>&nbsp;"; 
			}else{ 
				strHtml=strHtml+val;
			}
			}); 
		
		strHtml=strHtml + "<span class=\"ni-t-time\">"+ getTimeStr(messageObj.createTime) +"</span><span class=\"laji\" onclick=\"deleteMessage("+messageObj.id+")\"></span>"
		strHtml=strHtml + "</p>"; 
	}else{
		strHtml=strHtml + "<p class=\"ni-t d6\">";
		$.each(titleList,function(index,val,arr){
			if(index==clickIndex){
				strHtml=strHtml + "&nbsp;<a href=\"javascript:;\" class=\"ni-t-text d6\"  onclick=\"videoClick("+messageObj.id+")\">"+ val +"</a>&nbsp;"; 
			}else{ 
				strHtml=strHtml+val;
			}
			}); 
		
		strHtml=strHtml + "<span class=\"ni-t-time d6\">"+ getTimeStr(messageObj.createTime) +"</span><span class=\"laji\" onclick=\"deleteMessage("+messageObj.id+")\"></span>"
		strHtml=strHtml + "</p>";  
	}
	strHtml=strHtml + "</li>";
	
	return strHtml;
}


function getCommentHtml(messageObj){
	var titleList = messageObj.contentInfo.titleList;
	var clickIndex = messageObj.contentInfo.clickTitleIndex;
	if(titleList==null)
		return "";
	 
	var strHtml = "";
	strHtml=strHtml + "<li id=\"messageItemId"+ messageObj.id +"\" class=\"n-item\">";
	if(messageObj.isRead!=1){
		strHtml=strHtml + "<p class=\"ni-t\">";
		$.each(titleList,function(index,val,arr){
			if(index==clickIndex){
				strHtml=strHtml + "&nbsp;<a href=\"javascript:;\" class=\"ni-t-text\"  onclick=\"CommentClick("+messageObj.id+")\">"+ val +"</a>&nbsp;"; 
			}else{ 
				strHtml=strHtml+val;
			}
			}); 
		
		strHtml=strHtml + "<span class=\"ni-t-time\">"+ getTimeStr(messageObj.createTime) +"</span><span class=\"laji\" onclick=\"deleteMessage("+messageObj.id+")\"></span>"
		strHtml=strHtml + "</p>"; 

		strHtml=strHtml + "<p class=\"ni-s\">"+messageObj.contentInfo.extraData.modelName+":"+messageObj.contentInfo.extraData.groupName+"</p>";
	}else{
		strHtml=strHtml + "<p class=\"ni-t d6\">";
		$.each(titleList,function(index,val,arr){
			if(index==clickIndex){
				strHtml=strHtml + "&nbsp;<a href=\"javascript:;\" class=\"ni-t-text d6\"  onclick=\"CommentClick("+messageObj.id+")\">"+ val +"</a>&nbsp;"; 
			}else{ 
				strHtml=strHtml+val;
			}
			}); 
		
		strHtml=strHtml + "<span class=\"ni-t-time d6\">"+ getTimeStr(messageObj.createTime) +"</span><span class=\"laji\" onclick=\"deleteMessage("+messageObj.id+")\"></span>"
		strHtml=strHtml + "</p>";  

		strHtml=strHtml + "<p class=\"ni-s d6\">"+messageObj.contentInfo.extraData.modelName+":"+messageObj.contentInfo.extraData.groupName+"</p>";
	}
	strHtml=strHtml + "</li>";
	
	return strHtml;
}

function getPlanHtml(messageObj){
	var titleList = messageObj.contentInfo.titleList;
	var clickIndex = messageObj.contentInfo.clickTitleIndex;
	if(titleList==null)
		return "";
	 
	var strHtml = "";
	strHtml=strHtml + "<li id=\"messageItemId"+ messageObj.id +"\" class=\"n-item\">";
	if(messageObj.isRead!=1){
		strHtml=strHtml + "<p class=\"ni-t\">";
		$.each(titleList,function(index,val,arr){
			if(index==clickIndex){
				strHtml=strHtml + "&nbsp;<a href=\"javascript:;\" class=\"ni-t-text\"  onclick=\"planClick("+messageObj.id+")\">"+ val +"</a>&nbsp;"; 
			}else{ 
				strHtml=strHtml+val;
			}
			}); 
		
		strHtml=strHtml + "<span class=\"ni-t-time\">"+ getTimeStr(messageObj.createTime) +"</span><span class=\"laji\" onclick=\"deleteMessage("+messageObj.id+")\"></span>"
		strHtml=strHtml + "</p>"; 
	}else{
		strHtml=strHtml + "<p class=\"ni-t d6\">";
		$.each(titleList,function(index,val,arr){
			if(index==clickIndex){
				strHtml=strHtml + "&nbsp;<a href=\"javascript:;\" class=\"ni-t-text d6\"  onclick=\"planClick("+messageObj.id+")\">"+ val +"</a>&nbsp;"; 
			}else{ 
				strHtml=strHtml+val;
			}
			}); 
		
		strHtml=strHtml + "<span class=\"ni-t-time d6\">"+ getTimeStr(messageObj.createTime) +"</span><span class=\"laji\" onclick=\"deleteMessage("+messageObj.id+")\"></span>"
		strHtml=strHtml + "</p>";  
	}
	strHtml=strHtml + "</li>";
	
	return strHtml;
}

function getForumHtml(messageObj){
	//类型（1：回帖通知，2禁言，3删帖，4删评论）
	var content = messageObj.contentInfo;
	var extraData = messageObj.contentInfo.extraData;
	if(extraData.type=="1"){
		return getForumReplyHtml(messageObj);
	}else if(extraData.type=="2"){
		return getForumDenyHtml(messageObj);
	}else if(extraData.type=="3"){
		return getForumDeleteHtml(messageObj);
	}else if(extraData.type=="4"){
		return getForumDeleteHtml(messageObj);
	}else{
		  strHtml = getDefaultHtml(val);  
	  }
	
}

function getForumDenyHtml(messageObj){
	var titleList = messageObj.contentInfo.titleList;
	var clickIndex = messageObj.contentInfo.clickTitleIndex;
	if(titleList==null)
		return "";
	 
	var strHtml = "";
	strHtml=strHtml + "<li id=\"messageItemId"+ messageObj.id +"\" class=\"n-item\">";
	if(messageObj.isRead!=1){
		strHtml=strHtml + "<p class=\"ni-t\">";
		$.each(titleList,function(index,val,arr){
			if(index==clickIndex){
				strHtml=strHtml + "&nbsp;<a href=\"javascript:;\" class=\"ni-t-text\"  onclick=\"showTip("+messageObj.id+")\" >"+ val +"</a>&nbsp;"; 
			}else{ 
				strHtml=strHtml+val;
			}
			}); 
		
		strHtml=strHtml + "<span class=\"ni-t-time\">"+ getTimeStr(messageObj.createTime) +"</span><span class=\"laji\" onclick=\"deleteMessage("+messageObj.id+")\"></span>"
		strHtml=strHtml + "</p>";  
	}else{
		strHtml=strHtml + "<p class=\"ni-t d6\">";
		$.each(titleList,function(index,val,arr){
			if(index==clickIndex){
				strHtml=strHtml + "&nbsp;<a href=\"javascript:;\" class=\"ni-t-text d6\"  onclick=\"showTip("+messageObj.id+")\" >"+ val +"</a>&nbsp;"; 
			}else{ 
				strHtml=strHtml+val;
			}
			}); 
		
		strHtml=strHtml + "<span class=\"ni-t-time d6\">"+ getTimeStr(messageObj.createTime) +"</span><span class=\"laji\" onclick=\"deleteMessage("+messageObj.id+")\"></span>"
		strHtml=strHtml + "</p>";   
	}
	strHtml=strHtml + "</li>";
	
	return strHtml;
}
function getForumReplyHtml(messageObj){
	var titleList = messageObj.contentInfo.titleList;
	var clickIndex = messageObj.contentInfo.clickTitleIndex;
	if(titleList==null)
		return "";
	 
	var strHtml = "";
	strHtml=strHtml + "<li id=\"messageItemId"+ messageObj.id +"\" class=\"n-item\">";
	if(messageObj.isRead!=1){
		strHtml=strHtml + "<p class=\"ni-t\">";
		$.each(titleList,function(index,val,arr){
			if(index==clickIndex){
				strHtml=strHtml + "&nbsp;<a href=\"javascript:;\" class=\"ni-t-text\"  onclick=\"forumReplyClick("+messageObj.id+")\" >"+ val +"</a>&nbsp;"; 
			}else{ 
				strHtml=strHtml+val;
			}
			}); 
		
		strHtml=strHtml + "<span class=\"ni-t-time\">"+ getTimeStr(messageObj.createTime) +"</span><span class=\"laji\" onclick=\"deleteMessage("+messageObj.id+")\"></span>"
		strHtml=strHtml + "</p>"; 
		strHtml=strHtml + "<p class=\"ni-s\"> 讨论区："+messageObj.contentInfo.extraData.originName +"</p>";
	}else{
		strHtml=strHtml + "<p class=\"ni-t d6\">";
		$.each(titleList,function(index,val,arr){
			if(index==clickIndex){
				strHtml=strHtml + "&nbsp;<a href=\"javascript:;\" class=\"ni-t-text d6\"  onclick=\"forumReplyClick("+messageObj.id+")\" >"+ val +"</a>&nbsp;"; 
			}else{ 
				strHtml=strHtml+val;
			}
			}); 
		
		strHtml=strHtml + "<span class=\"ni-t-time d6\">"+ getTimeStr(messageObj.createTime) +"</span><span class=\"laji\" onclick=\"deleteMessage("+messageObj.id+")\"></span>"
		strHtml=strHtml + "</p>";  
		strHtml=strHtml + "<p class=\"ni-s d6\"> 讨论区："+messageObj.contentInfo.extraData.originName +"</p>";
	}
	strHtml=strHtml + "</li>";
	
	return strHtml;
}
function getForumDeleteHtml(messageObj){
	var titleList = messageObj.contentInfo.titleList;
	var clickIndex = messageObj.contentInfo.clickTitleIndex;
	if(titleList==null)
		return "";
	 
	var strHtml = "";
	strHtml=strHtml + "<li id=\"messageItemId"+ messageObj.id +"\" class=\"n-item\">";
	if(messageObj.isRead!=1){
		strHtml=strHtml + "<p class=\"ni-t\">";
		$.each(titleList,function(index,val,arr){
			if(index==clickIndex){
				strHtml=strHtml + "&nbsp;<a href=\"javascript:;\" class=\"ni-t-text\"  onclick=\"showTip("+messageObj.id+")\" >"+ val +"</a>&nbsp;"; 
			}else{ 
				strHtml=strHtml+val;
			}
			}); 
		
		strHtml=strHtml + "<span class=\"ni-t-time\">"+ getTimeStr(messageObj.createTime) +"</span><span class=\"laji\" onclick=\"deleteMessage("+messageObj.id+")\"></span>"
		strHtml=strHtml + "</p>"; 
		strHtml=strHtml + "<p class=\"ni-s\"> 讨论区："+messageObj.contentInfo.extraData.originName +"</p>";
	}else{
		strHtml=strHtml + "<p class=\"ni-t d6\">";
		$.each(titleList,function(index,val,arr){
			if(index==clickIndex){
				strHtml=strHtml + "&nbsp;<a href=\"javascript:;\" class=\"ni-t-text d6\"  onclick=\"showTip("+messageObj.id+")\" >"+ val +"</a>&nbsp;"; 
			}else{ 
				strHtml=strHtml+val;
			}
			}); 
		
		strHtml=strHtml + "<span class=\"ni-t-time d6\">"+ getTimeStr(messageObj.createTime) +"</span><span class=\"laji\" onclick=\"deleteMessage("+messageObj.id+")\"></span>"
		strHtml=strHtml + "</p>";  
		strHtml=strHtml + "<p class=\"ni-s d6\"> 讨论区："+messageObj.contentInfo.extraData.originName +"</p>";
	}
	strHtml=strHtml + "</li>";
	
	return strHtml;
}
function getMoreData(){
	var url;
	if(next_url==""){
		return;
	}else{
		url=porxy_url+next_url;
	}
	$.ajax({
		url: url,
		type: 'get', 
		success:function(json) { 
			var obj=JSON.parse(json);
			console.log(json);
			dataBack(obj);
			var count  = obj.counts;
			if(count>0){
				$("#noMessage").hide(); 
				$("#messageReadAll").show(); 
			}else{
				$("#messageReadAll").hide();
				$("#noMessage").show(); 
			}  
		}
	});
}
$("#Tips .closeBtn").click(function(){
    $("#Tips").hide();
})

$("#moreBtn").click(function(){ 
	getMoreData();
})
 
$("#messageReadAll").click(function(){   
	var url = porxy_url+message_api_url+"/message/read/"+user_id;
	$.ajax({
		url: url,
		type: 'get', 
		success:function(json) {  
        	$(".n-item").find("*").addClass("d6");;
        	$("#notices-count").text("0");
        	$("#notices-count").hide();
		}
	});
	
})
 //页面初始化
    $(document).ready(function(){    
    	message_api_url = window.xiaoma.messageApi; 
    	next_url=message_api_url+"/message/"+user_id+"?page=1&page_size=20";
    	porxy_url =  window.xiaoma.basePath+"/plan/proxy?proxyurl=";
    	
    	getMoreData();
    	setInterval("refreshMessage();",30000); //每隔15秒执行一次 
    });
</script>
</body>
</html>