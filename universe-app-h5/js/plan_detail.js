$(function(){
	var $tabLi =  $(".content_nav li");
	var tabLiWidth;
	var $windowWidth = $(window).width()
//设置tab切换宽度
	window.onload = function(){
		if(window.innerWidth >= 1200){
			tabLiWidth = 1200/$tabLi.length;
		}else{
			tabLiWidth = parseInt(window.innerWidth/$tabLi.length);
		}
		$tabLi.css("width",tabLiWidth);
	}
	window.onresize = function(){
		if(window.innerWidth >= 1200){
			tabLiWidth = 1200/$tabLi.length;
		}else{
			tabLiWidth = parseInt(window.innerWidth/$tabLi.length);
		}
		$tabLi.css("width",tabLiWidth);
	}
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
})



	