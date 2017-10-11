var leftmenuutil=function(){
	var init=function(){
		/*左侧菜单切换*/
		$(".menu>li").each(function () {
		    $(this).on("click", function () {
		        $(".menu>li>a").removeClass("cur");
		        $(this).find("a").addClass("cur");
		        $(".rightSide").css("display", "none").eq($(this).index()).css("display", "block");
		    });
		});
		/*账户设置菜单切换*/
		$(".tab_list>li").each(function (){
		    $(this).click(function () {
		        $(".tab_list>li").removeClass("cur_tab");
		        $(this).addClass("cur_tab");
		        $(".set").css("display", "none").eq($(this).index()).css("display", "block");
		    });
		});
		//处理url，重现上一次点击
		var curLi;
		var urlParser = window.location.href.split("#");
		alert(urlParser);
		if(urlParser.length > 1 && (curLi = $("a[href='#" + urlParser[1] + "']")).length > 0) {
			var curNum = urlParser[1].substring(3);
			$(".menu>li>a").removeClass("cur");
			curLi.addClass("cur");
			$(".rightSide").css("display", "none").eq(curNum).css("display", "block");
		}
	};

	return{
		init:init
	};
}();

$(function(){
	leftmenuutil.init();
});
