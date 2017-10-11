
//tab切换
	$(".content_nav li").click(function(){
		var index = $(this).index();
		$(".content_nav li").removeClass();	
		$(this).addClass("active");
		$(".tContent").hide().eq(index).show();
	})
//模态提示框
	$(".add_plan").click(function(){
		$(".modal").show();
	})
	$(".dialog").find("li").click(function(){
		$(".modal").hide();
	})
