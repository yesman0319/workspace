var leftmenuutil=function(){
	var init=function(){
		$(".continue").on('click',function(){
			var courseId = $(this).parent().prev().prev().val();
			var lastPartsId = $(this).parent().prev().val();
        	var curWwwPath = window.document.location.href;  
    	    var pathName = window.document.location.pathname;  
    	    var pos = curWwwPath.indexOf(pathName);  
    	    var localhostPath = curWwwPath.substring(0, pos);  
			url = localhostPath+"/courses/"+courseId+"/"+lastPartsId+"?type=iscontinue";
			window.location.href=url;
		});
//		$(".study_progress").on('click',function(){
//			var courseId = $(this).prev().prev().val();
//			var lastPartsId = $(this).prev().val();
//        	var curWwwPath = window.document.location.href;  
//    	    var pathName = window.document.location.pathname;  
//    	    var pos = curWwwPath.indexOf(pathName);  
//    	    var localhostPath = curWwwPath.substring(0, pos);  
//			url = localhostPath+"/courses/"+courseId+"/"+lastPartsId+"?type=iscontinue";
//			window.location.href=url;
//		});
		
		$(".plan_img").on('click',function(){
			var courseId = $(this).prev().prev().val();
			var lastPartsId = $(this).prev().val();
        	var curWwwPath = window.document.location.href;  
    	    var pathName = window.document.location.pathname;  
    	    var pos = curWwwPath.indexOf(pathName);  
    	    var localhostPath = curWwwPath.substring(0, pos);  
			url = localhostPath+"/courses/"+courseId;
			window.location.href=url;
		});
		$(".plan_title").on('click',function(){
			var courseId = $(this).prev().prev().val();
			var lastPartsId = $(this).prev().val();
        	var curWwwPath = window.document.location.href;  
    	    var pathName = window.document.location.pathname;  
    	    var pos = curWwwPath.indexOf(pathName);  
    	    var localhostPath = curWwwPath.substring(0, pos);  
			url = localhostPath+"/courses/"+courseId;
			window.location.href=url;
		});
		$(".delete").on('click',function(){
			if(confirm("是否确认删除"))
			{
				var courseId = $(this).attr("title");
				$.ajax({
		            type: "get",
		            url: "/courses/del",
		            data:{
		            	courseId:courseId
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
							else
							{
								alert("删除失败，请重试");
							}
					}
				});
			}
		});
	};

	return{
		init:init
	};
}();

$(function(){
	leftmenuutil.init();
});
