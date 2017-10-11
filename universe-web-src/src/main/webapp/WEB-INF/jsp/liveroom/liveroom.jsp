<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %> 
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <base href="<%=basePath%>">
		<meta charset="utf-8" />
		<meta name="viewport" content="target-densitydpi=320,width=640,user-scalable=no">
		<title>精英计划</title>
		<link rel="bookmark"  type="image/x-icon"  href="img2/xiaotu.jpg"/>
        <link rel="shortcut icon" href="img2/xiaotu.jpg"/>
		<link rel="stylesheet" type="text/css" href="css/main.css" media="all">
		<link rel="stylesheet" type="text/css" href="css/h5/liveroom_login.css" />
	</head>
<body>
	<div class="info" id="test">
		<form  id="myForm" action="<%=basePath%>/liveroom/teacher/login" method="post">
			<input type="hidden" value="${errorMessage }">
			<input type="hidden" id="backUrl" value="/wechat/index">
			<input type="hidden" id="wechatcode" name="wechatcode" value="${wechatcode}"/>
			<input type="hidden" id="openid" name="openid" value="${openid}"/>
			<div class="input-wrapper">
				<section>
					<input type="text" name="phone"  id="phone" placeholder="请输入手机号码" />
				</section>
				<section>
					<input class="left-input" type="text" name="graphic"  id="graphic" placeholder="请输入图形验证码" />
					<img src="#" id="graphic_img" onclick="getGraphicCode();" />
				</section>
				<section>
					<input class="left-input" type="text" name="checkCode"  id="checkCode" placeholder="请输入验证码" />
					<div class="tc t24" id="sendpwd" onclick="getCode();">获取验证码</div>
				</section>
				<p id="errorMsg" class="checkTips">
					${errorMsg }
				</p>
			  	<a id="send" onclick="submit();">绑定手机号</a>
			</div>
		</form>	
	</div>
	
</body>
	<script src="js/jquery.js"></script>
	<script src="js/common_mod.js"></script><!--常复用的方法-->
	<script>
	var basePath = "${basePath}";	
	window.xiaoma_codeImage = "${imageCodeUrl}";
	var urls = window.location.href;
	var captchaUuid = generateUUID();
	var gWidth =  $("#graphic_img").width();
	var gHeight =  $("#graphic_img").height();
	getGraphicCode();	
	
	if(/student/g.test(urls)){
		var actionUrl = $("#myForm").attr("action");
		actionUrl = actionUrl.replace(/teacher/g,"student");
		$("#myForm").attr("action",actionUrl);
	}

	$("input").on("focus",function(){
		$(".checkTips").html("");
	})
	
	/**获取验证码**/
	function getCode() {
		var uCaptcha = $("#graphic").val();
		var uPhone = $.trim($("#phone").val()).replace(/ +/g, "");   
		var check = validPhone("#phone",".checkTips");
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
				console.log(msg);
				if(msg.success){
					//移除点击事件
					var curTime = 60;
					$('#sendpwd').html("({0})重新获取".format("60")).addClass("grey").removeAttr('onclick');
					var timer = window.setInterval(function () {
						curTime--;
						if (curTime > 0) {
							$('#sendpwd').html("({0})重新获取".format(curTime));
						} else {
							window.clearInterval(timer); 
							$('#sendpwd').html('获取验证码').removeClass("grey").attr('onclick', 'getCode();');
						}
					}, 1000);
				}else{
					$('#sendpwd').attr('onclick', 'getCode();');
					$(".checkTips").html(msg.message);
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
	function submit(){
		var phone = $("#phone").val();
		var checkCode = $("#checkCode").val();
		var weChatCode = $("#wechatcode").val();
		if(phone == null || phone == "" || $.trim(phone) == "") {
			$(".checkTips").html("手机号不能为空");
			return;
		}
			var check = validPhone("#phone",".checkTips");
			if(!check){
				$(".checkTips").html("手机号格式不正确");
				return;
			}
			
		if(checkCode == null || checkCode == "" || $.trim(checkCode) == "") {
			$(".checkTips").html("验证码不能为空");
			return;
		}
		$("#myForm").submit();
		/* var backUrl = $("#backUrl").val();
		$('#login_btn').removeAttr('onclick');
		  $.post(basePath+"/wechat/login",{"checkCode":checkCode,"phone":phone,"backUrl":backUrl,"weChatCode":weChatCode},
				  function(data){
			  console.dir("data = "+ data);
			  if(data.success){
				  windows.location.href = basePath + "/wechat/index";
				  return;
			  }else{
				  windows.location.href = basePath + "/wechat/index";
				  return;
			  }
				  },
				  "json");//这里返回的类型有：json,html,xml,text
		  		//恢复点击事件
		  		$('#login_btn').attr('onclick', 'submit();');
				} */
		}
				
		function refresh(){
			$("#myForm").submit();
		}
    </script>
</html>
