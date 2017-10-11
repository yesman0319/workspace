var courseutil=function(){
	var init=function(){
		$(".videowatch").on("click",function(){
			var hasSee = $(this).prev().prev().val();
			var canSee = $(this).prev().val();
			var videoId = $(this).prev().prev().prev().prev().val();
			var lessionId = $(this).prev().prev().prev().val();
			var querytype = $("#querytype").val();
			if(canSee=="无权观看")
			{
				return false;
			}
			else
			{
            	var curWwwPath = window.document.location.href;  
        	    var pathName = window.document.location.pathname;  
        	    var pos = curWwwPath.indexOf(pathName);  
        	    var localhostPath = curWwwPath.substring(0, pos);  
        	    
        	    
        	    var url = localhostPath+pathName+"?type="+querytype+"&videoId="+videoId+"&lessionId="+lessionId;
        	    window.document.location.href=url;
			}
		});
	};

	return{
		init:init
	};
}();

$(function(){
	courseutil.init();
});
