<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <%@include file="../include/pub.jsp"%> 
    <title>题目分享页-${title }</title>
        <link rel="stylesheet" href="${cdnPath}/css/common.css"/>
    <link rel="stylesheet" href="${cdnPath}/css/share_speak.css"/>
</head>
<body>
<jsp:include page="../include/header.jsp"></jsp:include>
<div class="layout">
    <div class="main fl">
        <div class="h">${title }<span class="title">${name}</span><i class="share_icon" param='${basePath}/h5/speakingswritings/${type }/${questionId}.html?uid=${uid}%26source=weixin%26medium=weixinfriend%26campaign=${shareTitle}<c:if test="${uid>0 }">%26campaignContent=uid${uid}</c:if>'></i></div>
        <div class="question">
            <h2>问题</h2>
            <p class="question_con">${vo.content }</p>
            <button class="btn" onclick="javascript:window.location.href='${basePath}/jijing/exercise?type=${type}&questionId=${questionId }';">练习该题</button>
        </div>
        <div class="share">
            <h2>发布记录<span class="count">（${counts }条）</span></h2>
            <c:if test="${empty vo.list }">
              <h2 style="border-top-color: white;text-align: center;"><span style="" class="count">目前还没有同学分享哦~</span> </h2>
            </c:if>
             <c:if test="${not empty vo.list }">
		            <ul class="share_list">
			           		<c:forEach items="${vo.list }" var="list"  varStatus="index">
				                <li>
				                    <div class="action">
				                        <div class="ava">
				                        	<c:if test="${not empty list.avatar && list.avatar != '' }">
				                        		<img src="${list.avatar}"   alt="头像"/>
				                        	</c:if>
				                        	<c:if test="${empty list.avatar || list.avatar == '' }">
				                        		<img src="http://newbbs.b0.upaiyun.com/avater/avater.png"   alt="头像"/>
				                        	</c:if>
				                        </div>
				                         <div class="action-info">
						                         <span class="action-info-name">
						                         		 <c:if test="${fn:length(list.nickname) > 7}">
																	${fn:substring(list.nickname, 0, 7)}
																 </c:if>
																<c:if test="${fn:length(list.nickname) <= 7}">
																	${list.nickname}
													</c:if>
						                         </span>
						                          <p class="his_time">${list.timeStr }</p>
						                          <div class="con audioDiv"  title="${index.index}"  id="playImg${index.index}">
							                            <span class="drop"></span>
							                            <i class="lb"></i>
							                            <span class="t audioLength">${list.audio_length }"</span>
							                            <audio style="display: none" id="autoplay${index.index}" src="${list.content}" ></audio>
							                        </div>
				                         </div>
                                    <a href="javascript:;"   id="show_praise_${list.share_id}"  flag="${list.is_praise}"  onclick="praise(${list.share_id}, ${list.is_praise});"    class="<c:if test='${list.is_praise eq 1 }'> supported</c:if> <c:if test='${list.is_praise != 1 }'> support</c:if>">
                                    	<i class="support-icon"></i>
                                    	<span class="support-num"   id="praise_num_${list.share_id }">${list.praise_amount }</span>
                                    </a>
			                        <a target="_blank"   href="${basePath}/comment/${type}/${list.answerId}?questionId=${question_id}&shareId=${list.share_id}&planId=${planId}"    class="comment"><i class="comment-icon"></i><span class="comment-num">${list.commentCount }</span></a>
			                        <a href="javascript:;" class="share_btn" param="${basePath}/h5/speakingswritings/${type}/${question_id}/${list.share_id}.html?<c:if test='${uid>0}'>%26campaignContent=uid${uid}</c:if>" ></a>
<%-- 				                        <span class="support">
					                        <i id="show_praise_${list.share_id}"  flag="${list.is_praise}"  class="heart  <c:if test='${list.is_praise eq 1 }'> like</c:if>"   onclick="praise(${list.share_id}, ${list.is_praise});"  ></i>
					                        <span id="praise_num_${list.share_id }" >${list.praise_amount }</span>
				                        </span> --%>
				                    </div>
				                </li>
		           			 </c:forEach>
		            </ul>
            </c:if>
            <!-- start 分页  -->
             <c:if test="${totalPage != 0 }">
           <%@include file="../livemanage/replay_page.jsp"%>
             </c:if>
           <!-- end 分页  -->
             </div>
    </div>

<c:if test="${not empty plan }">
		    <div class="side fl">
		        <h2 class="plan">所属学习计划</h2>
		        <div class="con"  onclick="javascript:window.location.href='${basePath}/plans/${planId}';"  style="cursor: pointer;">
		            <!--学习计划无图选择默认图，有图从数据库读取-->
		            <img class="plan_pic fl"  src="${plan.imageWebList}"   onerror="javascript:this.src='http://static01.xiaoma.com/universe-web/img/plan_detail/plan_default.png';" alt="pic"  alt="学习计划"/>
		            <div class="plan_desc fl">
		                <h2>${plan.name }</h2>
		                <p><i class="ic_num"></i><span class="num">${plan.learnNumber }</span>人在学</p>
		                <p><i class="ic_count"></i><span class="count">${plan.totalExercises }</span>题</p>
		            </div>
		        </div>
		    </div>
  </c:if>
</div>

<div class="share_qrcode_modal">
    <div class="share_dialog">
        <h2>
            分享到微信
            <span class="close_btn"></span>
        </h2>
        <img id="share_img"  class="share_qrcode">
        <ul class="share_tips">
            <li>1. 打开微信，"扫一扫"二维码</li>
            <li>2. 点击弹出页面右上角的分享按钮</li>
        </ul>
    </div>
</div>



<jsp:include page="../include/footer.jsp"></jsp:include>
</body>
<script type="text/javascript">

$(".share_icon").click(function(){
	 var param = $(this).attr("param");
	 var param = basePath + "/h5/qrcode.html?code_url=" + param;
	 share(param);
    $(".share_qrcode_modal").show();
});
//点击关闭按钮清除蒙版
$(".close_btn").click(function(){
	$("#share_img").attr("src", "");
    $(this).parent().parent().parent().hide();
})

function share(param){
	 $("#share_img").attr("src", param);
}

$(".share_btn").click(function(){
	 var param = $(this).attr("param");
	 var param = basePath + "/h5/qrcode.html?code_url=" + param;
	 share(param);
   $(".share_qrcode_modal").show();
});

var audioDivs = document.getElementsByClassName("audioDiv");
var  playImg = audioDivs;
var audioList = document.getElementsByTagName("audio");

var current_id = -1;
//当前播放的id
var play_num = 0;

 for (var i = 0; i < audioDivs.length; i++) {
	/*点击播放*/
	var audioDiv = audioDivs[i];
	audioDiv.onclick = function(e) {
			var that = this;
			var id = this.getAttribute("title");
	 		var audio = document.getElementById("autoplay" + id);
			
			//关闭上一个播放源
			if(current_id != -1){
			 document.getElementById("autoplay" + current_id).pause();
			 $(".playImg").removeClass("playing");
			}
	 		
			if(id != current_id){  	//新播放录音
				play_num = 0;
				current_id = id;
				
				if( play_num++ % 2 == 0){
					//console.log("新播放播放 -id = " + id + ", playNum = " + play_num);
					//关闭所有播放源
					for (var j = 0; j < audioList.length; j++) {
						audioList[j].pause();
					}
					
					//删除所有的播放样式
		 			$(".audioDiv").removeClass("play");
					
					//增加播放样式
					$("#playImg" + id).addClass("play");
					audio.play();
					//音频播放完成后的执行操作
					audio.onended = function() {
						$("#playImg" + id).removeClass("play");
					}
				}else{
					//console.log("新暂停 -id = " + id + ", playNum = " + play_num);
					//删除所有的播放样式
		 			$(".audioDiv").removeClass("play");
		 			
					audio.pause();
				}
				
			}else{
				if( play_num++ % 2 == 0){
					//console.log("原来的播放播放 -id = " + id + ", playNum = " + play_num);
					$("#playImg" + id).addClass("play");
					audio.play();
					audio.onended = function() {
						$("#playImg" + id).removeClass("play");
					}
				}else{
					//console.log("暂停 -id = " + id + ", playNum = " + play_num);
						$("#playImg" + id).removeClass("play");
						audio.pause();
				}
			}
	} 
}
	
 
	var type = "${type}";
	var question_id = "${questionId}";
	var plan_id = "${planId}";
	var day_id = "${dayId}";
	var exercise_id = "${exerciseId}";
	function pageback(page){
   	 var url = "/exercise/speakingswritings/${type}/${questionId}.html?exercise_id=${exerciseId}&plan_id=${planId}&day_id=${dayId}&page=" + page ;
    	window.location.href= window.xiaoma.path + url
    }
	
	
	$(function(){
		//语音长度
		$(".audioDiv").each(function(index,item){
			var timeLen = $(this).find(".audioLength").html();
			timeLen = timeLen.replace("\"","");
			var audioLen = timeLen*3+"px";
			$(this).css("width",audioLen);
		})	
	});
	
	
	 /**
     *点赞操作（）
     */
     var basePath = "${basePath}";
     function praise(share_id, is_praise){
    	 if(share_id == null || share_id == "" || share_id == "0"){
    		 return;
    	 }
    	 
    	 //是否点赞的标志
    	 var flag = $("#show_praise_" + share_id).attr("flag");
    		 		console.log("flag = " + flag);
    	 var isPraise = 0;
    	 if(flag == "0"){
    		 isPraise = 1;
    	 }else{
    		 isPraise = 2;
    	 }
    	console.log("isPraise = " + isPraise);
    	
    	//点赞的数量
    	var num = parseInt($("#praise_num_" + share_id).html());
    	console.log("PraiseNum = " + num);
    	 
    	 $.post(basePath + "/exercise/praises", {"shareId": share_id, "type": isPraise },
    			   function(data){
    		 console.log("data = " + data);
    		 		if(data == "success"){		//点赞
    			    	if(isPraise == 1){
    			    		$("#show_praise_" + share_id).addClass("supported").removeClass("support");
    			    		 $("#show_praise_" + share_id).attr("flag", 1);
    			    		 $("#praise_num_" + share_id).html(num+1);
    			    		return;
    			    	}else{							//取消点赞
    			    		$("#show_praise_" + share_id).removeClass("supported").addClass("support");
    			    		$("#show_praise_" + share_id).attr("flag", 0);
    			    		$("#praise_num_" + share_id).html(num-1);
    			    		return;
    			    	}
    			    }else if(data == "nologin"){
    			    	//http://localhost/exercise/speakingswritings/4/66.html?exercise_id=4269&plan_id=54&day_id=398
    			    	var backUrl = basePath + "/exercise/speakingswritings/${type}/${questionId}.html?exercise_id=${exerciseId}%plan_id=${planId}%day_id=${dayId}%page=${page}" ;
    			    	window.location.href=basePath + "/login?backurl="+backUrl;
    			    	return;
    			    }
    			   }, "text");
     }
	
</script>
</html>