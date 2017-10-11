var initfunc=function(){
	var init=function(){
		var nickname = $(".ava span").text();
		if(nickname==null||$.trim(nickname)=="")
		{
			$(".register_box").show();
		}
		$(".audio_list_li").on('click',function(){
			var id = $(this).val();
			window.location.href="/courses/"+id;
		});
		$(".goRegister").on("click",function(){
			window.location.href="/login";
		});	
		$(".plan_item").on('click',function(){
			var id = $(this).val();
			window.location.href="/plans/"+id;
		});	
	};
	return{
		init:init
	};
}();



$(function(){	
	//initfunc.init();
});