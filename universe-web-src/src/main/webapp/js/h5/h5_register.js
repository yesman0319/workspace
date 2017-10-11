	
	var i = 0;
	var usableMark;//图形验证码布尔值
	var captchaUuid = generateUUID();
	var gWidth =  $("#graphic_img").width();
	var gHeight =  $("#graphic_img").height();
	
	getGraphicCode();
	
	$("label").on("click",function(){
		i++;
		$(this).toggleClass("selected");
		$(".register_btn").toggleClass("uncheck");
		if(i % 2 == 0){
		$('#register_btn').removeAttr('onclick');
		}else{
		$('#register_btn').attr('onclick', 'submit();');
		}
	})
	
	
	$("input").focus(function(){
		$(".checkTips").html("");
	});
	$("#graphic").blur(function(){
		usableMark = validCode("#graphic");
	})
	
	function submit(){
		var phone = $("#phone").val();
		var password = $("#password").val();	
		var checkCode = $("#checkCode").val();	
		if(phone == null || phone == "" || $.trim(phone) == "") {
			$(".checkTips").html("手机号不能为空");
			return;
		}
			var check = validPhone($("#phone"));
			if(!check){
				$(".checkTips").html("手机号格式不正确");
				return;
			}
			
		if(checkCode == null || checkCode == "" || $.trim(checkCode) == "") {
			$(".checkTips").html("验证码不能为空");
			return;
		}
		
		if(password == null || password == "" || $.trim(password) == "") {
			$(".checkTips").html("密码不能为空");
			return;
		}
		
		var backUrl = $("#backUrl").val();
		$('#register_btn').removeAttr('onclick');
		$.post(basePath+"/h5/register.html",{"checkCode":checkCode,"password":password,"phone":phone,"backUrl":backUrl},
			function(data){
			    if(data.success){
				   analytics.Ana("register",data.user.id, data.user.username,backUrl);
				   //window.location.href=backUrl;
			    }else{
				    $(".checkTips").html(data.message);
			    }
			},"json");//这里返回的类型有：json,html,xml,text
	  		//恢复点击事件
	  		$('#register_btn').attr('onclick', 'submit();');
	}
	
	/**获取验证码**/
	function getCode() {
		if(!usableMark){//图形验证码未通过，不能发送手机验证码
			return;
		}
		uPhone = $.trim($("#phone").val()).replace(/ +/g, "");
		var check = validPhone($("#phone"));
		var uCaptcha = $("#graphic").val();
		if(!check){
			return;
		}
		var request = basePath +  "/h5/checkcode.html?type=1&phone="+uPhone+"&tag="+captchaUuid+"&imagecode="+uCaptcha;
		$.ajax({
			url: request,
			type: "GET", 
			dataType: 'json',//here
			async: true,
			success: function(msg) {
				if(msg.success){
					//验证码输入框可输入
					$("#checkCode").removeAttr("disabled");
					//移除点击事件
					$('#get_code').removeAttr('onclick').html("({0})重新获取".format("60")).addClass("negative");
					var curTime = 60;
					var timer = window.setInterval(function () {
						curTime--;
						if (curTime > 0) {
							$('#get_code').html("({0})重新获取".format(curTime));
						} else {
							window.clearInterval(timer); 
							$('#get_code').attr('onclick', 'getCode();').html('获取验证码').removeClass("negative");
						}
					}, 1000);
				}else{
					$('#get_code').attr('onclick', 'getCode();');
					$(".checkTips").html(msg.message);
					getGraphicCode();
				}
			},
			error: function(msg) {}
		});
	}
	/**获取图形验证码**/
	function getGraphicCode(){
		captchaUuid = generateUUID();
		var gURl = window.xiaoma_codeImage+"/"+gWidth+"/"+gHeight+"/"+captchaUuid;
		$("#graphic_img").attr("src",gURl);
		$("#graphic").val("")//重新获取图形码并清空input内容
	}
	
	/*验证用户名 手机号 */
	function validPhone(ele) {
		/*用户名必须是手机号/邮箱*/
		var regEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		//var regPhone = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/;
		var regPhone = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
		uPhone = $.trim($(ele).val()).replace(/ +/g, "");
		$(ele).val(uPhone)
		
		if(uPhone == ""){
			$(".checkTips").html("手机号不能为空");
			return false;
		}
		if (!regPhone.test(uPhone)) {//手机号格式不正确
			$(".checkTips").html("手机号格式不正确");
			return false;
		} 
		return true;
	}
	/*验证 图形验证码 */
	function validCode(ele) {
		var reg = /^[0-9A-Za-z]{4}$/; //验证规则
		var ugCode = $.trim($(ele).val()).replace(/ +/g, "");
		$(ele).val(ugCode)
		if(ugCode == "" || ugCode == null){
			$(".checkTips").html("图形验证码不能为空");
			$('#get_code').addClass("negative");
			return false;
		}
		if (!reg.test(ugCode)) {
			$(".checkTips").html("图形验证码格式不正确");
			$('#get_code').addClass("negative");
			return false;
		}
		//可发送验证码
		$('#get_code').removeClass("negative");
		return true;
	}
	//字符串替换
	String.prototype.format=function()  
	{  
	  if(arguments.length==0) return this;  
	  for(var s=this, i=0; i<arguments.length; i++)  
	    s=s.replace(new RegExp("\\{"+i+"\\}","g"), arguments[i]);  
	  return s;  
	};  
	//生成全局唯一标识
	function generateUUID() {
		var d = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		  var r = (d + Math.random()*16)%16 | 0;
		  d = Math.floor(d/16);
		  return (c=='x' ? r : (r&0x3|0x8)).toString(16);
		});
		return uuid;
	};

	
	
	
	
	
	
	
	
	
	
	
	
	
	/*
	var uName = "", uPsw = "", uPhone = "", uCode = "", uPassWord = "";
	var foColor = "#3aa2e4";//获取焦点 蓝色
	var rigColor = "#39c075";//信息无误
	var wroColor = "#ff5a5a";//信息错误
	var warnMsg = {"name": "用户名", "psw": "密码", "phone": "手机号", "code": "验证码", "passWord": "密码"};
	$(".form_input").each(function (index, item) {
		$(item).bind({
			focus: function () {
				$(this).css("border-color", "#3aa2e4");
				$(this).parent().find(".form_label").css({
					"border-right-color": "#3aa2e4"
				});
				$(this).parent().find(".warn").css("display", "none");
				if (this.id === "username") {
					$(this).parent().find(".form_label").css({
						"background": "url("+window.xiaoma_auth.basePath+"'/i/u_name.png') 1px 1px no-repeat"
					});
				} else if (this.id === "password") {
					$(this).parent().find(".form_label").css({
						"background": "url("+window.xiaoma_auth.basePath+"'/i/u_psw.png') 1px 1px no-repeat"
					});
				} else if (this.id === "phone") {
					$(this).parent().find(".form_label").css({
						"background": "url("+window.xiaoma_auth.basePath+"'/i/u_phone.png') 1px 1px no-repeat"
					});
				} else if (this.id === "checkCode") {
					$(this).parent().find(".form_label").css({
						"background": "url("+window.xiaoma_auth.basePath+"'/i/u_code.png') 1px 1px no-repeat"
					});
				} else if (this.id === "password") {
					$(this).parent().find(".form_label").css({
						"background": "url("+window.xiaoma_auth.basePath+"'/i/u_psw.png') 1px 1px no-repeat"
					});
				}
			},
			blur: function () {
				$(this).css("border-color", "#bdbdbd");
				$(this).parent().find(".form_label").css("border-right-color", "#bdbdbd");
				if (this.id === "password") {//输入的是密码
					validPassword($("#password")); 
				} else if (this.id === "phone") {//输入的是电话 
					validPhone($("#phone"));
				} else if (this.id === "checkCode") {//输入的是验证码
					validCode($("#checkCode"));
				} 
			},
			keyup: function (e) {
				//处理e兼容IE
				e = e || window.event;
				if (this.id === "username") {
					if (e.keyCode === 13) {
						$(this).blur();
						$("#password").focus();
					}
				} else if (this.id === "password") {
					//提交代码
				}
			}
		});
	});
 
	注册
	$("#btn_register").click(function () {
		var check = validPhone($("#phone"));
		if(!check){
			return;
		} 
		check = validPassword($("#password")); 
		if(!check){
			return;
		}
		check = validCode($("#checkCode"));
		if(!check){
			return;
		}
		
		//$("#password").val($.md5(uPsw));
		$("#password").val(uPsw);
		myForm.action = window.xiaoma_auth.basePath+"/user/registerphone";
		myForm.submit();
 
	});
	
	验证 验证码 
	function validCode(ele) {
		var check = true; 
		uCode = $.trim($(ele).val()).replace(/ +/g, "");
		if (uCode === "") {
			$(ele).val("");
			$(ele).css("border-color", "#ff5a5a");
			$(ele).parent().find(".form_label").css({
				"border-right-color": "#ff5a5a",
				"background": "url("+window.xiaoma_auth.basePath+"'/i/u_code_wrong.png') 1px 1px no-repeat"
			});
			$(ele).parent().find(".warn").text("验证码不能为空！").css({
				"display": "block",
				"color": "#ff5a5a"
			});
			check = false;
		}
		return check; 
	}
	
	验证 密码 
	function validPassword(ele) {
		uPsw = $.trim($(ele).val()).replace(/ +/g, "");

		var check = true; 
		if(uPsw.length<6){
			$(ele).val("");
			$(ele).parent().find(".warn").text("密码不能少于6位！")
			check = false;
		}
		if (uPsw == "") {
			$(ele).val(""); 
			$(ele).parent().find(".warn").text("密码不能为空！");
			check = false;
		}
		if(!check){
			$(ele).css("border-color", "#ff5a5a");
			$(ele).parent().find(".form_label").css({
				"border-right-color": "#ff5a5a",
				"background": "url("+window.xiaoma_auth.basePath+"'/i/u_psw_wrong.png') 1px 1px no-repeat"
			});
			$(ele).parent().find(".warn").css({
				"display": "block",
				"color": "#ff5a5a"
			});
		}
		return check;
	}
	
	验证用户名 手机号 
	function validPhone(ele) {
		用户名必须是手机号/邮箱
		var regEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		var regPhone = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/;
		var check = true; 
		  
		uPhone = $.trim($(ele).val()).replace(/ +/g, "");
		$(ele).val(uPhone)
		
		if (regPhone.test(uPhone)) {//手机号格式正确
			$(ele).css("border-color", "#39c075");
			$(ele).parent().find(".form_label").css({
				"border-right-color": "#39c075",
				"background": "url("+window.xiaoma_auth.basePath+"'/i/u_phone_right.png') 1px 1px no-repeat"
			});
			$(ele).parent().find(".form_label").css("border-right-color", "#39c075");
			check = true;
		} else if (uPhone === "") {
			$(ele).parent().find(".warn").text("手机号不能为空！").css({"display": "block", "color": "#ff5a5a"});
			check = false;
		} else { 
			$(ele).parent().find(".warn").text("手机号格式不正确！").css({"display": "block", "color": "#ff5a5a"});
			check = false;
		}
		if(!check){
			$(ele).parent().find(".form_label").css({
				"border-right-color": "#ff5a5a",
				"background": "url("+window.xiaoma_auth.basePath+"'/i/u_phone_wrong.png') 1px 1px no-repeat"
			});
			$(ele).val("");
			$(ele).css("border-color", "#ff5a5a");
		}
		return check; 
	}

	$("#btn_ios").click(function () {
		$(this).addClass("cur");
		$("#btn_ad").removeClass("cur");
		$(".ios").css("display", "block");
		$(".ad").css("display", "none");
	});
	$("#btn_ad").click(function () {
		$(this).addClass("cur");
		$("#btn_ios").removeClass("cur");
		$(".ios").css("display", "none");
		$(".ad").css("display", "block");
	});
	获取验证码
	$("#get_code").bind("click", getCode);
	function getCode() {
		uPhone = $.trim($("#phone").val()).replace(/ +/g, "");
		var check = validPhone($("#phone"));
		if(!check){
			return;
		}
		
		var request = window.xiaoma_auth.basePath+"/user/code/send?phoneNum=" + uPhone;
		$.ajax({
			url: request,
			type: "POST", 
			async: true,
			success: function(msg) {
//				var obj = $.parseJSON(msg); 
//				if (obj.status == 1) {
//					$("#errorMsg").css("color", "red").text(obj.message)
//					return false
//				} else {
//
//				}
				
				$("#get_code").unbind("click", getCode);
				console.log("aaa");
				$(this).find("span").css({"text-decoration": "none", "color": "#dbdbdb"});
				$(this).find(".text").text("s后重新获取");
				$(this).find(".time").text("120");
				var curTime = 120;
				var timer = window.setInterval(function () {
					curTime--;
					if (curTime > 0) {
						$(".time").text(curTime);
					} else {
						timer = null;
						$("#get_code").bind("click", getCode);
						$(".get_code").find("span").css({"text-decoration": "underline", "color": "#39c075"});
						$(".text").text("获取验证码");
						$(".time").text("");
					}
				}, 1000);
			},
			error: function(msg) {
				var obj = $.parseJSON(msg.responseText);
				if(obj){
					$("#errorMsg").css("color", "red").text(obj.message);
				}else{
					$("#errorMsg").css("color", "red").text("连接不上服务器，请稍后重试");
				}
				
			}
		});
	 

	}
*/
