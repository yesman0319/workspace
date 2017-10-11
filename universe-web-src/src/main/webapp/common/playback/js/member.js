function getCourseUrl(courseId){
	//alert(courseId);
	if(token == null || token == ""){
		openWin("请先登录，再查看回放课视频");
		return;
	}	
	$.ajax({
		url: "/playbackcourse/members.action",
		data:{"fromType":'WEB',"systemId":1},
		type: "POST",
		dataType:'json',
		success: function(result){			
			if(result.status == "0"){			
				openWin("很抱歉，您不能观看直播，请联系老师");
				return;
			}else{
				location.href="/playbackcourse/play.action?id="+courseId;
			}	 					    	    					
   	    }		
	});
}

function videomember(){
	$.ajax({
		url: "/playbackcourse/members.action",
		data:{"fromType":'WEB',"systemId":1},
		type: "POST",
		dataType:'json',
		success: function(result){			
			if(result.status == "0"){				
				openWin("很抱歉，您不能观看直播，请联系老师");
				return;
			}					    	    					
   	    }		
	});
	//window.setTimeout("videomember()",5 * 1000);
}

function openWin(txt){
	$("#show_txt").html(txt);
	$(".kecheng").css({
		"display":"block",
		"position":"absolute",
		"left":$(window).width()*.5-$(".kecheng").width()*.5 - width,
		"top":$(window).height()*.5+$(window).scrollTop()-$(".kecheng").height()*.5,
		"z-index":999
	})
	$(".mb").css({
		"display":"block",
		"opacity":"0.8",
		"width":$(window).width(),
		"height":$(document).height(),
		"position":"absolute",
		"background":"#f7f7f7",
		"left":"0px",
		"top":"0px",
		"z-index":99
	})
}

$(".kecheng .kc_inner h3 div.kc_close").click(function(){
	$(".kecheng").css({"display":"none"});
	$(".mb").css({"display":"none"});
});
	
$("#close_show").click(function(){
	$(".kecheng").css({"display":"none"});
	$(".mb").css({"display":"none"});
});

if(token != "null" && token != "" && token != null ) {
	$("#kthy1").html("点击下载");
	$("#kthy2").html("点击下载");
	$("#kthy3").html("点击下载");
	$("#kthy4").html("点击下载");	
	$("#loginToken").css("display","block");
	$("#noLoginToken").css("display","none");
} else {
	$("#loginToken").css("display","none");
	$("#noLoginToken").css("display","block");
}