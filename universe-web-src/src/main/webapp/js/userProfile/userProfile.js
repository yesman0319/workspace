$(function(){
    jQuery.extend({
        handleError: function (s, xhr, status, e) {
            if (s.error) {
                s.error.call(s.context || s, xhr, status, e);
            }
            if (s.global) {
                (s.context ? jQuery(s.context) : jQuery.event).trigger("ajaxError", [xhr, s, e]);
            }
        },
        httpData: function (xhr, type, s) {
            var ct = xhr.getResponseHeader("content-type"),
    xml = type == "xml" || !type && ct && ct.indexOf("xml") >= 0,
    data = xml ? xhr.responseXML : xhr.responseText;
            if (xml && data.documentElement.tagName == "parsererror")
                throw "parsererror";
            if (s && s.dataFilter)
                data = s.dataFilter(data, type);
            if (typeof data === "string") {
                if (type == "script")
                    jQuery.globalEval(data);
                if (type == "json")
                    data = window["eval"]("(" + data + ")");
            }
            return data;
        }
    });
	//$(".show").hide();
	
	
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
	if(urlParser.length > 1 && (curLi = $("a[href='#" + urlParser[1] + "']")).length > 0) {
		var curNum = urlParser[1].substring(3);
		$(".menu>li>a").removeClass("cur");
		curLi.addClass("cur");
		$(".rightSide").css("display", "none").eq(curNum).css("display", "block");
	}
	
    var type=$("#type").val();
    if(type=="resetart")
    {
    	$($(".tab_list").children().get(1)).click();
    }
    else if(type=="resetpw")
    {
    	$($(".tab_list").children().get(2)).click();
    }
    else
    {
    	$($(".tab_list").children().get(0)).click();
    }
})


$("#mn1").click(function () {
    if (!placeholderSupport()) {   // 判断浏览器是否支持 placeholder
        $('[placeholder]').focus(function () {
            var input = $(this);
            if (input.val() == input.attr('placeholder')) {
                input.val('');
                input.removeClass('placeholder');
            }
        }).blur(function () {
            var input = $(this);
            if (input.val() == '' || input.val() == input.attr('placeholder')) {
                input.addClass('placeholder');
                input.val(input.attr('placeholder'));
            }
        }).blur();
    }
    ;
    $(this).css("display", "none");
    $(".x1").css("display", "block");
});
$("#nnn").click(function () {
    $(this).parent().css("display", "none");
    $("#nnx").css("display", "block");
});
$(".mq").click(function () {
    $(this).addClass("on");
    $(this).siblings(".mq").removeClass("on");
    $(".xxx" + $(this).attr("id")).css("display", "block")
        .siblings().css("display", "none");
});

$("#pyzm").click(function(){
	var phone = $("#phoneId").val();
	if(phone == "" || phone == null){
		$("#phoneError").html("手机号不能为空");
		return;
	}
	if(!(/^1[34578]\d{9}$/.test(phone))){
		$("#phoneError").html("手机号不存在");
		return;
	}
	$(this).hide();
	$("#pyzmm").show().html("60秒");
	pYzmdjs(60);
    var phone = $("#phoneId").val();
	$.ajax({
        type: "get",
        url: "/personal/sendpmark",
        data:{
        	phone:phone
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
                if (data.message == "success") {
                	console.log("发送成功");
                } else if(data.message == "fail" || data.message == "" || data.message == null) {
                	pYzmdjs(0);
                    alert(data.message);
                    return;
                }
		}
	});
});

$("#yzm").click(function () {
    $(this).css("display", "none");
    $("#yzmm").css("display", "block").html("60秒");
    yzmdjs(60);
    var phone = $("#phone").html();
	$.ajax({
        type: "get",
        url: "/personal/sendmark",
        data:{
        	phone:phone
			},
        dataType:"json",
        error: function(jqXHR, error, errorThrown) {
            var status_code = jqXHR.status
                if(status_code==401)
                {
            	    var pathName = window.document.location.pathname;  
            	    var pos = curWwwPath.indexOf(pathName);  
            	    var localhostPath = curWwwPath.substring(0, pos);  
        			var url = localhostPath+"/login";
        			window.location.href=url;
                }
            },
            success: function(data) {
                if (data.message == "success") {
                	console.log("发送成功");
                } else {
                	pYzmdjs(0);
                    alert("系统错误，请刷新重试。");
                    return;
                }
		}
	});
});

var tt;//倒计时;
function yzmdjs(m) {
    if (m != 0) {
    	$("#yzmm").html(m + "秒");
    tt = setTimeout(function () {
            yzmdjs(m - 1)
        }, 1000);
    } else {
    	$("#yzm").show();
        $("#yzmm").hide();
        clearTimeout(tt);
    }
}
function pYzmdjs(m) {
    if (m != 0) {
    	$("#pyzmm").html(m + "秒");
    tt = setTimeout(function () {
            pYzmdjs(m - 1)
        }, 1000);
    } else {
    	$("#pyzm").show();
        $("#pyzmm").hide();
        clearTimeout(tt);
    }
}

$("#bpcancle").click(function(){
	$(".bpinputBox").hide();
	$("#bindPhone").show();
	$(".phoneCheck").find("input").val("");
	pYzmdjs(0);
})

$("#bcancle").click(function () {
    $("#nnn").parent().css("display", "block");
    $("#nnx").css("display", "none");
});

$("#pcancle").click(function () {
    $("#mn1").css("display", "block");
    $(".x1").css("display", "none");
    $("#codeNum").val("");
    $("#pass").val("").next().val("");
    yzmdjs(0);
});

function updateProfile() {
    var nickname = $("#nickname").val();
    if (nickname.trim() == '' || nickname.trim() == "") {
        alert("请输入您的昵称。");
        return;
    }
    var  checkNum = /^(.){2,12}$/;
    if (!checkNum.test(nickname.trim())) {
        alert("密码格式不正确，应为：2-12个字符,汉字,字母或特殊符号");
        return;
    }
    
	$.ajax({
        type: "get",
        url: "/personal/updateProfile",
        data:{
        	nickname:nickname
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
                if (data.message == 0) {
                    window.location.reload();
                } else {
                    alert("系统错误，请刷新重试。");
                    return;
                }
		}
	});
}

$("#phoneId").focus(function(){
	$("#phoneError").html("");
})
$("#phoneCodeId").focus(function(){
	$("#codeError").html("");
})
$("#nextPass").focus(function(){
	$("#error").html("");
})
$("#codeNum").focus(function(){
	$("#error").html("");
})
function bindPhone(){
	var phone = $("#phoneId").val();
	var code = $("#phoneCodeId").val();
	if(phone == "" || phone == null){
		$("#phoneError").html("手机号不能为空");
		return;
	}
	if(!(/^1[34578]\d{9}$/.test(phone))){
		$("#phoneError").html("手机号不存在");
		return;
	}
	if(code == "" || code == null){
		$("#codeError").html("验证码不能为空");
		return;
	}
	$.ajax({
        type: "get",
        url: "/personal/bindingphone",
        data:{
        		codeNum: code,phone:phone
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
                if (data.message == "success") {
                	var txt = "<p>恭喜您，绑定成功</p><p>初始登录密码为手机号后6位，请及时修改密码</p>";
                	modalDialog(txt,function(){
                		window.location.reload();
                	},5000);
                    
                } else {
                	$("#codeError").html(data.message);
//                  alert(data.message);
                    $("#phoneCodeId").val("");
                    pYzmdjs(0);
                    return;
                }
		}
	});
	
}
function tijiao() {
    var code = $("#codeNum").val();
    var pass = $("#pass").val();
    var nextPass = $("#nextPass").val();
    var phone = $("#phone").html();
    if (code == '') {
        $("#error").html("验证码不能为空");
        return;
    }
    if (pass == '') {
        $("#error").html("请输入修改密码");
        return;
    }
    if (nextPass == '') {
        $("#error").html("请再次确认修改的密码");
        return;
    }
    if (pass.length < 6 || pass.length > 16) {
        $("#error").html("密码在6位和16位之间，请重新输入");
        return;
    }
    if (pass != nextPass) {
        $("#error").html("密码不一致，请重新输入");
        return;
    }
    var  checkNum = /^[a-zA-Z0-9!@#$\%^&*\(\)_\+]{6,16}$/;

    if(!checkNum.test(pass))
    {
        $("#error").html("密码不一致，请重新输入");
        return;
    }
    
	$.ajax({
        type: "get",
        url: "/personal/updatePassword",
        data:{
        		password: pass, nextPass: nextPass, codeNum: code,phone:phone
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
                if (data.message == "success") {
                	var txt = "<p>修改成功</p>";
                	modalDialog(txt,function(){
                		window.location.reload();
                	},3000);
                } else {
                	$("#error").html(data.message);
                	$("#codeNum").val("");
                    yzmdjs(0);
                    return;
                }
		}
	});
}

$("#bindPhone").click(function(){
	$(this).hide();
	$(".bpinputBox").show();
})

//点击关闭按钮清除蒙版
	$(".close_btn").click(function(){
		$(".info_modal").hide();
	})
	$("#info_confirm").click(function(){
		$(".info_modal").hide();
	})
//提示框
function modalDialog(tipsText,callback,duration){
	$(".info_modal").show();
	$("#info_tips").html(tipsText);
	//手动点击确认移除提示框
	$(".close_btn").click(function(){
		$(".info_modal").hide();
		if(callback != null){
			callback();
		}
	});
	$("#info_confirm").click(function(){
		$(".info_modal").hide();
		if(callback != null){
			callback();
		}
	});
	//置顶时间清除蒙版
	setTimeout(function(){
		$(".info_modal").hide();
		if(callback != null){
			callback();
		}
	},duration);
}


function placeholderSupport() {
    return 'placeholder' in document.createElement('input');
}

function ajaxFileUpload(){
	//执行上传文件操作的函数
	$.ajaxFileUpload({
		url:'/personal/ajaxFileUpload',
		secureuri:false,                       //是否启用安全提交,默认为false 
		type: 'post',
		fileElementId:'ava_file',           //文件选择框的id属性
		dataType:'application/json',                       //服务器返回的格式,可以是json或xml等
		success:function(data){        //服务器响应成功时的处理函数
			var json = JSON.parse(data);
			var result = json.result;
			if(result=="success")
			{
				var img=json.img;
				var src = img;
				$("#img").val(img);
				$("img[alt='Preview']").attr("src",src);
				  $.each($(".jcrop-holder"),function(index,value){
				        if(index==0){
				           $(this).children("div").children("div").find("img").attr("src",src);
				        }
				    });
				  $(".show").show();
			}
			else if("large"==result)
			{
				alert("上传失败，图片过大");
			}
			else
			{
				alert("上传失败，请重新上传");
			}
		}
	});
}


/*头像设置*/
$(function(){
    var jcrop_api,
        boundx,
        boundy,
    // Grab some information about the preview pane
        $preview = $('#preview-pane'),
        $pcnt = $('#preview-pane .preview-container'),
        $pcnt1 = $('#preview-pane .preview-container1'),
        $pimg = $('#preview-pane .preview-container img'),
        $pimg1 = $('#preview-pane .preview-container1 img'),
        xsize = $pcnt.width(),
        xsize1 = $pcnt1.width(),
        ysize = $pcnt.height();
        ysize1 = $pcnt1.height();
    $('#target').Jcrop({
        onChange: updatePreview,
        onSelect: updatePreview,
        aspectRatio: xsize / ysize
    },function(){
        // Use the API to get the real image size
        var bounds = this.getBounds();
        boundx = bounds[0];
        boundy = bounds[1];
        // Store the API in the jcrop_api variable
        jcrop_api = this;
        // Move the preview into the jcrop container for css positioning
        $preview.appendTo(jcrop_api.ui.holder);
    });

    function updatePreview(c)
    {
        if (parseInt(c.w) > 0)
        {
            var rx = xsize / c.w;
            var rx1 = xsize1 / c.w;
            var ry = ysize / c.h;
            var ry1 = ysize1 / c.h;
            $pimg.css({
                width: Math.round(rx * boundx) + 'px',
                height: Math.round(ry * boundy) + 'px',
                marginLeft: '-' + Math.round(rx * c.x) + 'px',
                marginTop: '-' + Math.round(ry * c.y) + 'px'
            });
            $pimg1.css({
                width: Math.round(rx1 * boundx) + 'px',
                height: Math.round(ry1 * boundy) + 'px',
                marginLeft: '-' + Math.round(rx1 * c.x) + 'px',
                marginTop: '-' + Math.round(ry1 * c.y) + 'px'
            });
        }
    }
    /*保存截图*/
    $('#save').click(function(c){
           //x y 坐标;w h 宽度 高度
        /*获取选框尺寸*/
        var objSize=jcrop_api.tellSelect();
        //console.log(objSize);
        var w = objSize.w;
        var h = objSize.h;
        var x = objSize.x;
        var y = objSize.y;
        var img =  $("#img").val();
        var fileExt =  $("#fileExt").val();

        if(w == 0 || h == 0 ){
            alert("您还没有选择图片的剪切区域,不能进行剪切图片!");
            return;
        }
//        alert("你要剪切图片的X坐标: "+x + ",Y坐标: " + y + ",剪切图片的宽度: " + w + ",高度：" + h );
        if(confirm("确定按照当前大小剪切图片吗")){
            function loadHeadUrl(data){console.log(data);
                //alert(data.headUrl);
                alert(data.retMsg);
                $("#img_headUrl").attr("src",data.headUrl);
                $("#headUrl").val(data.headUrl);
            }
			$.ajax({
	            type: "get",
	            url: "/personal/upyun",
	            data:{
					w:w,
					h:h,
					x:x,
					y:y,
					img:img,
					fileext:fileExt
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
	                    if (data.message == 0) {
	                        window.location.reload();
	                    } else {
	                        alert("系统错误，请刷新重试。");
	                        return;
	                    }
	    		}
			});
        }
    });
    /*取消截图*/
    $("#cancel").click(function(){
        jcrop_api.release();
        $(".show").hide();
    })
});
