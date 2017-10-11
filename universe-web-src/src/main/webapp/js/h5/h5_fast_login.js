	var usableMark;//图形验证码布尔值
	var captchaUuid = generateUUID();
	var gWidth =  $("#graphic_img").width();
	var gHeight =  $("#graphic_img").height();
	
	getGraphicCode();	
	
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
		
		var backUrl = $("#backUrl").val();
		$('#login_btn').removeAttr('onclick');
		$.post(basePath+"/h5/fastlogin.html",{"checkCode":checkCode,"phone":phone,"backUrl":backUrl},
			function(data){
			    if(data.success){
				   //调用注册或者登录事件
				   if(data.newUser == "yes"){
					 //  alert("yes");
					   analytics.Ana("register",data.user.id, data.user.username,backUrl);
				   }else{
					  // alert("login");
					   analytics.Ana("login",data.user.id, data.user.username,backUrl);
				   }
				   //window.location.href = backUrl;
			   }else{
				   $(".checkTips").html(data.message);
			    }
			},
			"json");//这里返回的类型有：json,html,xml,text
	  		//恢复点击事件
	  		$('#login_btn').attr('onclick', 'submit();');
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
					getGraphicCode();//失败重新获取图形码
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
	
	//字符串替换
	String.prototype.format=function()  
	{  
	  if(arguments.length==0) return this;  
	  for(var s=this, i=0; i<arguments.length; i++)  
	    s=s.replace(new RegExp("\\{"+i+"\\}","g"), arguments[i]);  
	  return s;  
	};  