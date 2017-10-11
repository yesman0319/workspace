var leftmenuutil=function(){
	var init=function(){
		$(".list a").on('click',function(){
			var courseId = $($(this).children().get(0)).val();
			var partId = $($(this).children().get(1)).val();
			var lessionId = $($(this).children().get(2)).val();
			var videoId = $($(this).children().get(3)).val();
        	var curWwwPath = window.document.location.href;  
    	    var pathName = window.document.location.pathname;  
    	    var pos = curWwwPath.indexOf(pathName);  
    	    var localhostPath = curWwwPath.substring(0, pos);  
			url = localhostPath+"/courses/"+courseId+"/"+partId+"?type=iscontinue&lessionId="+lessionId+"&videoId="+videoId;
			window.location.href=url;
		});
	};

	return{
		init:init
	};
}();

$(function(){
	leftmenuutil.init();
});
