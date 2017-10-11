var courseutil=function(){
	var init=function(){
		var price = $("#price").val();
		var hasBuy = $("#hasBuy").val();
		var hasDone = $("#hasDone").val();
		var premissionId = $("#premissionId").val();
		var tips = $("#tips_content").text();
		var publishStatus = $("#publishStatus").val();
		if(publishStatus==0)
		{
			$("#hasdown_btn").show();
			$(".tips").hide();
			$(".lock_modal p").html("");
		}
		else
		{
			if(hasBuy=="已购买")
			{
				$("#watch_btn").show();
				$("#studyto").show();
			}
			if(hasBuy=="已删除")
			{
				$("#del_join_btn").show();
				$(".lock_modal p").html("加入课程后观看");
			}
			if(hasBuy=="未购买")
			{
				if(price=="免费")
				{
					$("#free_join_btn").show();
					$(".lock_modal p").html("加入课程后观看");
/*					$("#tips_content").text("欢迎您使用本课程,请您加入后观看 ");*/
				}
				else
				{
					if(tips!=null&&tips!=""&&tips.indexOf("使用时间")>=0)
					{
						$("#wait_btn").show();
						$(".lock_modal p").html("等待开始");
					}
					else
					{
						$("#buy_btn").show();
						$("#free_btn").show();
					}
				}
			}
			if(hasBuy=="未开始")
			{
				$("#del_join_btn").show();
				$(".lock_modal p").html("加入课程后观看");
			}
		}
		
		if((hasDone!=null&&hasDone!="")&&(premissionId==null||premissionId==""))
		{
			$("#payResult_wait").hide();
			$("#payResult_fail").show();
		}
		if(tips!=null&&tips!=""&&tips.indexOf("开始时间")>=0)
		{
			$("#payResult_fail").hide();
		}
		$("#watch_btn").on("click",function(){
			$("#hasDone").val("");
			var courseId = $("#courseId").val();
			var lastPartsId = $("#lastPartsId").val();
        	var curWwwPath = window.document.location.href;  
    	    var pathName = window.document.location.pathname;  
    	    var pos = curWwwPath.indexOf(pathName);  
    	    var localhostPath = curWwwPath.substring(0, pos);  
			url = localhostPath+"/courses/"+courseId+"/"+lastPartsId+"?type=iscontinue";
			window.location.href=url;
		});
		$("#free_btn").on("click",function(){
			$("#hasDone").val("");
			var courseId = $("#courseId").val();
			var lastPartsId = $("#lastPartsId").val();
			var courseId = $("#courseId").val();
			var lastPartsId = $("#lastPartsId").val();
        	var curWwwPath = window.document.location.href;  
    	    var pathName = window.document.location.pathname;  
    	    var pos = curWwwPath.indexOf(pathName);  
    	    var localhostPath = curWwwPath.substring(0, pos);  
			url = localhostPath+"/courses/"+courseId+"/"+lastPartsId+"?type=isfree";
			window.location.href=url;
			
		});
		$(".video_box").on("click",function(){
			var cansee = $(this).attr("data-cansee");
			var partId = $(this).parent().attr("title");
			var hasBuy = $("#hasBuy").val();
			var courseId = $("#courseId").val();
			if(cansee=="需要购买后观看")
			{
				$("#hasDone").val("");
				return false;
			}
			else if(hasBuy=="未购买"||hasBuy=="已删除")
			{
				$("#hasDone").val("");
            	var curWwwPath = window.document.location.href;  
        	    var pathName = window.document.location.pathname;  
        	    var pos = curWwwPath.indexOf(pathName);  
        	    var localhostPath = curWwwPath.substring(0, pos);  
				url = localhostPath+"/courses/"+courseId+"/"+partId+"?type=isfree";
				window.location.href=url;
			}
			else
			{
				$("#hasDone").val("");
            	var curWwwPath = window.document.location.href;  
        	    var pathName = window.document.location.pathname;  
        	    var pos = curWwwPath.indexOf(pathName);  
        	    var localhostPath = curWwwPath.substring(0, pos);  
				url = localhostPath+"/courses/"+courseId+"/"+partId+"?type=iscommon";
				window.location.href=url;
			}

		});
		
		
		$(".video_type").on("click",function(){
			var cansee = $(this).prev().attr("data-cansee");
			var partId = $(this).parent().attr("title");
			var hasBuy = $("#hasBuy").val();
			var courseId = $("#courseId").val();
			if(cansee=="需要购买后观看")
			{
				$("#hasDone").val("");
				return false;
			}
			else if(hasBuy=="未购买"||hasBuy=="已删除")
			{
				$("#hasDone").val("");
            	var curWwwPath = window.document.location.href;  
        	    var pathName = window.document.location.pathname;  
        	    var pos = curWwwPath.indexOf(pathName);  
        	    var localhostPath = curWwwPath.substring(0, pos);  
				url = localhostPath+"/courses/"+courseId+"/"+partId+"?type=isfree";
				window.location.href=url;
			}
			else
			{
				$("#hasDone").val("");
            	var curWwwPath = window.document.location.href;  
        	    var pathName = window.document.location.pathname;  
        	    var pos = curWwwPath.indexOf(pathName);  
        	    var localhostPath = curWwwPath.substring(0, pos);  
				url = localhostPath+"/courses/"+courseId+"/"+partId+"?type=iscommon";
				window.location.href=url;
			}

		});
		
		
		$("#free_join_btn").on("click",function(){
			var courseId = $("#courseId").val();
			var goodId = $("#goodId").val();
			$.ajax({
	            type: "get",
	            url: "/courses/freejoin",
	            data:{
					courseId:courseId,
					goodId:goodId
					},
	            dataType:"json",
	            error: function(jqXHR, error, errorThrown) {
	                var status_code = jqXHR.status
		                if(status_code==401)
		                {
		                	var curWwwPath = window.document.location.href;  
	                	    var pathName = window.document.location.pathname;  
	                	    var pos = curWwwPath.indexOf(pathName);  
	                	    var localhostPath = curWwwPath.substring(0, pos);  
		        			var url = localhostPath+"/login";
		        			window.location.href=url;
		                }
	                },
	                success: function(data) {
						if(data=="success")
						{
							window.location.reload();
						}
				}
			});
		});
		$("#del_join_btn").on("click",function(){
			var courseId = $("#courseId").val();
			var goodId = $("#goodId").val();
			var premissionId = $("#premissionId").val();
			
			$.ajax({
	            type: "get",
	            url: "/courses/deljoin",
	            data:{
					courseId:courseId,
					goodId:goodId,
					premissionId:premissionId
					},
	            dataType:"json",
	            error: function(jqXHR, error, errorThrown) {
	                var status_code = jqXHR.status
		                if(status_code==401)
		                {
		                	var curWwwPath = window.document.location.href;  
	                	    var pathName = window.document.location.pathname;  
	                	    var pos = curWwwPath.indexOf(pathName);  
	                	    var localhostPath = curWwwPath.substring(0, pos);  
		        			var url = localhostPath+"/login";
		        			window.location.href=url;
		                }
	                },
	                success: function(data) {
					var result = data.result;
					var id = data.id;
					if(data=="success")
					{
						window.location.reload();
					}
	              }
			});
		});
		
		$("#buy_btn").on("click",function(){
			
			$.ajax({
	            type: "get",
	            url: "/courses/session",
	            dataType:"json",
	                success: function(data) {
	                	if(data=="success")
	                	{
	            			$("#payResult_wait").show();
	            			$("#payResult_fail").hide();
	            			$("#hasDone").val("done");
	            			var courseId = $("#courseId").val();
	            			var goodId = $("#goodId").val();
	            			var curWwwPath = window.document.location.href;  
	            	 	    var pathName = window.document.location.pathname;  
	            	 	    var pos = curWwwPath.indexOf(pathName);  
	            	 	    var localhostPath = curWwwPath.substring(0, pos);  
	            			var url = localhostPath+"/courses/buy?courseId="+courseId+"&goodId="+goodId;
	                        var a = $("<a href="+url+" target='_blank'>Apple</a>").get(0);
	                        var e = document.createEvent('MouseEvents');
	                        e.initEvent( 'click', true, true );
	                        a.dispatchEvent(e);		
	                	}
	                	else
	                	{
		                	var curWwwPath = window.document.location.href;  
	                	    var pathName = window.document.location.pathname;  
	                	    var pos = curWwwPath.indexOf(pathName);  
	                	    var localhostPath = curWwwPath.substring(0, pos);  
		        			var url = localhostPath+"/login";
		        			window.location.href=url;
	                	}
	              }
			});
	
		});
		
		$("#hasPay").on("click",function(){
			var courseId = $("#courseId").val();
			var curWwwPath = window.document.location.href;  
	 	    var pathName = window.document.location.pathname;  
	 	    var pos = curWwwPath.indexOf(pathName);  
	 	    var localhostPath = curWwwPath.substring(0, pos);  
			var url = localhostPath+"/courses/"+courseId+"?hasDone=done";
			window.location.href=url;
		});
		
		//点击关闭按钮清除蒙版
		$(".close_btn").click(function(){
			$(this).parent().parent().parent().hide();
		});
		$(".close").on("click",function(){
			$(this).parent().hide();
		});
	};

	return{
		init:init
	};
}();

function showBuyTip()
{
	var goodId = $("#goodId").val();
	//获取当前网址
	var curWwwPath=window.document.location.href;
	//获取主机地址之后的目录如
	var pathName=window.document.location.pathname;
	var pos=curWwwPath.indexOf(pathName);
	//获取主机地址
	var localhostPaht=curWwwPath.substring(0,pos); 
	var url = localhostPaht+"/courses/buy?goodId="+goodId
    var a = $("<a href="+url+" target='_blank'>Apple</a>").get(0);
    var e = document.createEvent('MouseEvents');
    e.initEvent( 'click', true, true );
    a.dispatchEvent(e);
	$("#payResult_wait").show();
	$("#payResult_fail").hide();
}

$(function(){
	courseutil.init();
});
