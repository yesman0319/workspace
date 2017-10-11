$(function() {
	setHeightWidth();
	$(window).resize(function() {
		setHeightWidth();
	});

	var more=$("#Tool .more");
	more.click(function(){
		var mthis=$(this),id="#"+mthis.attr("id")+"ore";
		mthis.children("span").toggleClass("open");     
		$(id).slideToggle(400);
	});

	var ToolLi=$("#Tool li");
	ToolLi.not(more).click(function(){
		ToolLi.removeClass("on");
		ToolLi.removeClass("system_icon");
		$(this).addClass("system_icon on");
	});

	var headimg=$(".LogoRight .headimg");
	var imgme=headimg.next(".me");
	headimg.click(function(){
		if(imgme.css('width') == '240px'){
			imgme.animate({width:0},300);
	    }else{
	    	imgme.animate({width:240},300);
		}
	});

	$("#J_pagInput").focus(function(){
		$("#J_pagInput").addClass("focus");
		$("#J_pagBtn").animate({width:38, opacity: 'show'},300);    
	});

	$("#J_table tr").mouseover(function(){
		$(this).addClass("mouseover");     
	});
	
	$("#J_table tr").mouseout(function(){
		$("#J_table tr").removeClass();     
	});
});

function setHeightWidth() {
	var winheight = $(window).height(),
	    winwidth = $(window).width(),
        height=winheight-65,
        ToolRightwidth=winwidth-200;
	$('#Tool').css('height',  height);
	$('#ToolRight').css('height', height);
	var POPlist=$('#ToolRight').hasClass("POPlist");
	if(!POPlist){
		$('#ToolRight').css('width', ToolRightwidth);
	}
}

String.prototype.trim = function () {
   return this .replace(/^\s\s*/, '' ).replace(/\s\s*$/, '' );
};

//输入框获得焦点去除默认值：
$('#login-form input').focus(function(){
	var it=$(this), itid=it.attr("id");
	var value=it.val().trim();
    if(value =='请输入用户名'){
    	it.val("");
    }else if(itid == 'password'){
    	it.next("label").addClass("hide");
    }else if(value =='请输入验证码' || value =='验证码错误'){
    	it.val("");
    }
    it.removeClass("ok error");	
	it.addClass("inputfouse");

});


$('#login-form #username').blur(function(){
	var it=$(this), username=$("#login-form #username"), value=$.trim(it.val());
	if(value == ''){
		it.val("请输入用户名");
		it.removeClass("inputfouse");
		return false;
	}else{
		username.removeClass("error inputfouse");
		username.addClass("ok");
	}
});


$('#login-form label').click(function(){
	$(this).addClass("hide");
	$('#login-form #password').focus();	
});

$('#login-form #password').blur(function (){
	var it=$(this), passwordinfo=$("#login-form #password"),value=$.trim(it.val());
	if(value == ''){
		it.next("label").removeClass("hide");
		it.removeClass("inputfouse");
		return false;
	}else{
		passwordinfo.removeClass("error inputfouse");
		passwordinfo.addClass("ok");	    	   	
	}
	   
});


$('#login-form #verify').blur(function(){
	var it=$(this), verifyinfo=$("#login-form #verify"),value=$.trim(it.val());

	if(value ==''){
		it.val("请输入验证码");
		it.removeClass("inputfouse");
		return false;
	}else{
		verifyinfo.removeClass("error inputfouse");
		verifyinfo.addClass("ok");	    	   	
	}
	   
});
