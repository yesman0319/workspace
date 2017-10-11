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
	<!--<meta name="viewport" content="target-densitydpi=320,width=640,user-scalable=no">-->
	<title>激活VIP卡</title>
	<link rel="bookmark"  type="image/x-icon"  href="img2/xiaotu.jpg"/>
    <link rel="shortcut icon" href="img2/xiaotu.jpg"/>
	<link rel="stylesheet" type="text/css" href="css/main.css" media="all">
	<link rel="stylesheet" type="text/css" href="css/h5/vip_card.css" />
</head>
<body>
	<div id="init-page">
		<div class="top-title">激活我的小马过河VIP卡</div>
		<input type="hidden" name="id"  id="id"  />
		<input type="hidden" name="gopage"  id="gopage"  value="${ gopage}"/>
		<ul id="business">
			<li>
				<span class="front-name">卡号 :</span>
				<input type="text" name="cardNumber"  id="cardNumber" placeholder="请输入VIP卡号" />
				<span id="card-error" class="error-tips"></span>
			</li>
			<li>
				<span class="front-name">卡金额 :</span>
				<input type="text" name="denomination"  id="denomination" placeholder="输入卡号后自动显示" disabled="disabled" style="background: #fff;" />
			</li>
		    <li style="border: none;">
				<span class="front-name">VIP卡激活码 :</span>
				<input type="text" name="activationCode"  id="activationCode"  placeholder="刮开VIP卡背面涂层" style="width: 44%;" />
				<span id="activation-error" class="error-tips"></span>
			</li>
		</ul>
		<div class="loginTips">
			未注册过的手机将自动创建精英计划账号
		</div>
		<ul id="credit">
			<li>
				<span class="front-name">用户手机号 :</span>
				<input type="text" name="activeStudentPhone"  id="activeStudentPhone" placeholder="请输入手机号" />
				<a id="sendpwd" onclick="getCode();">获取验证码</a>
			</li>
			<li>
				<span class="front-name">验证码 :</span>
				<input type="text" name="checkCode"  id="checkCode"  placeholder="请获取验证码后输入" disabled="disabled" style="background: #fff;" />
			</li>
			<li>
				<span class="front-name">身份证号 :</span>
				<input type="text" name="buyUserIdentity"  id="buyUserIdentity" placeholder="请输入身份证号" />
			</li>
		</ul>
		<div id="errorMsg"></div>
	  	<div id="confirm-btn">确认激活</div>
	</div>
	<div id="success-page" style="display: none;"> 
		<p>
			激活成功，该卡金额已充值到账户<span id="activephone"></span>，
			请登陆<a href="<%=com.xiaoma.universe.common.utils.PropertiesUtils.getString("APP_DOWNLOAD_URL")%>" id="download_btn"">精英计划客户端</a>查看账户余额。
		</p>
	</div>
	
</body>
	<script src="js/jquery.js"></script>
	<script src="${cdnPath}/js/h5/lib/flexible.js"></script>
	<script>
	var activationMark = false; //验证结果标识
	//vip卡号失去焦点判断
	$("#cardNumber").blur(function(){
		$("#id").val("");
		  var cardNumber  =$("#cardNumber").val().trim();
		  if(cardNumber==null||cardNumber=="")
		  {
		  	$("#card-error").html("请输入VIP卡号");
		  	activationMark =false;
			return;
		  }
		  else
		  {
			var request = basePath +  "/h5/vip/getbycardno?cardNumber="+cardNumber;
			$.ajax({
				url: request,
				type: "GET", 
				dataType: 'json',//here
				async: true,
				success: function(msg) {
					var message = msg.message;
					if(message!=null&&message=="ok")
					{
						activationMark = true;
						var denomination = msg.vipCard.denomination;
						var id = msg.vipCard.id;
						//验证通过，返回金额
						$("#denomination").val(denomination);
						$("#id").val(id);
						$("#card-error").html("");
					}
					else
					{
						//验证失败
						console.log(msg.message);
					    $("#card-error").html("vip卡号错误");
					    activationMark =false;
						return;
					}
				},
				error: function(msg) {}
			});
		  }
		});
	//激活码失去焦点判断
	$("#activationCode").blur(function(){
	  	var id  =$("#id").val();
	  	var activationCode  =$("#activationCode").val();
	  	if(activationCode==null||activationCode=="")
	  	{
	  		$("#activation-error").html("激活码不能为空");
	  		activationMark =false;
			return;
	  	}
	  	else
	  	{
			var request = basePath +  "/h5/vip/checkbycardno?id="+id+"&activationCode="+activationCode;
			$.ajax({
				url: request,
				type: "GET", 
				dataType: 'json',//here
				async: true,
				success: function(msg) {
					var denomination = msg.denomination;
					var message = msg.message;
					if(message!=null&&message=="ok")
					{
						//验证通过
						activationMark = true;
						$("#activation-error").html("");
					}
					else
					{
						//验证失败
					    $("#activation-error").html("*激活码错误");
					    activationMark =false;
						return;
					}
				},
				error: function(msg) {}
			});
	  	}
	});
	//手机号码失去焦点判断
	$("#activeStudentPhone").blur(function(){
		validactiveStudentPhone($(this));
	})
	//身份证号码失去焦点判断
	$("#buyUserIdentity").blur(function(){
		validbuyUserIdentity($(this));
	})
	var basePath = "${basePath}";	
	
	/**获取验证码**/
	function getCode() {
		activeStudentPhone = $.trim($("#activeStudentPhone").val()).replace(/ +/g, "");   
		var check = validactiveStudentPhone($("#activeStudentPhone"));
		if(!check){
			return;
		}
		var request = basePath +  "/h5/checkcode.html?type=1&phone="+activeStudentPhone;
		$.ajax({
			url: request,
			type: "GET", 
			dataType: 'json',//here
			async: true,
			success: function(msg) {
				if(msg.success){
					$("#checkCode").removeAttr("disabled");
					//移除点击事件
					$('#sendpwd').removeAttr('onclick').addClass("negative");
					var curTime = 60;
					$('#sendpwd').html("({0})重新获取".format("60"));
					var timer = window.setInterval(function () {
						curTime--;
						if (curTime > 0) {
							$('#sendpwd').html("({0})重新获取".format(curTime));
						} else {
							window.clearInterval(timer); 
							$('#sendpwd').attr('onclick', 'getCode();').removeClass("negative");
							$('#sendpwd').html('获取验证码');
						}
					}, 1000);
				}else{
					$('#sendpwd').attr('onclick', 'getCode();');
					$("#errorMsg").html(msg.message);
				}
			},
			error: function(msg) {}
		});
	}
	/*验证用户名 手机号 */
	function validPhoneCode(ele) {
		var regactivePhoneCode = /^[0-9]{6}$/; //验证规则 
		var PhoneCode = $.trim($(ele).val().replace(/ +/g, ""));
		$(ele).val(PhoneCode)
		if(PhoneCode == ""||PhoneCode == null){
			$("#errorMsg").html("请输入验证码");
			activationMark =false;
		}else if (!regactivePhoneCode.test(PhoneCode)) {//手机号格式不正确
			$("#errorMsg").html("验证码格式不正确");
			activationMark =false;
		} else{
			activationMark = true;
			$("#errorMsg").html("");
		}
	}
	/*验证用户名 手机号 */
	function validactiveStudentPhone(ele) {
		var regactiveStudentPhone = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则 
		var activeStudentPhone = $.trim($(ele).val().replace(/ +/g, ""));
		$(ele).val(activeStudentPhone)
		if(activeStudentPhone == ""||activeStudentPhone == null){
			$("#errorMsg").html("手机号不能为空");
			activationMark =false;
			return false;
		}
		if (!regactiveStudentPhone.test(activeStudentPhone)) {//手机号格式不正确
			$("#errorMsg").html("手机号格式不正确");
			activationMark =false;
			return false;
		} 
		$("#errorMsg").html("");
		activationMark = true;
		return true;
	}
	/*验证用户名 身份证号 */
	function validbuyUserIdentity(ele) {
		var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
		var check = true; 
		var buyUserIdentity = $.trim($(ele).val()).replace(/ +/g, "");
		$(ele).val(buyUserIdentity);
		if(buyUserIdentity == ""){
			$("#errorMsg").html("身份证号不能为空");
			activationMark =false;
			return false;
		}
		if (!reg.test(buyUserIdentity)) {//手机号格式不正确
			$("#errorMsg").html("身份证号格式不正确");
			activationMark =false;
			return false;
		}
		$("#errorMsg").html("");
		activationMark = true;
		return true;
	}
	
	$(":text").blur(function(){
		var errorCount = 0;
		$(":text").each(function(i,v){
			var eachVal = v.value;
			if(eachVal == null || eachVal == ""){
				errorCount++;
				return;
			}
		})
		if(errorCount <= 0 && activationMark){
			$("#confirm-btn").attr("onclick","submit();").addClass("active")
		}
	})	
	
	function submit(){
		var cardNumber = $("#cardNumber").val();
		var activationCode = $("#activationCode").val();
		var buyUserIdentity = $("#buyUserIdentity").val();
		var activeStudentPhone = $("#activeStudentPhone").val();
		var checkCode =$("#checkCode").val();
		var id =$("#id").val();
		$.ajax({
			url: basePath +  "h5/vip/usecard",
			type: "POST", 
			dataType: 'json',//here
			data:{
				cardNumber:cardNumber,
				activationCode:activationCode,
				buyUserIdentity:buyUserIdentity,
				activeStudentPhone:activeStudentPhone,
				checkCode:checkCode,
				id:id
			},
			async: true,
			success: function(msg) {
				var message = msg.message;
				var gopage = msg.gopage
				if(gopage!=null&&gopage==2)
				{
					//成功
					$("#init-page").hide();
					$("#success-page").show();
					$("title").html("激活成功");
					var phone = msg.vipCard.activeStudentPhone;
					$("#activephone").html(phone);
				}
				else
				{
					$("#errorMsg").html(message);
				}
			},
			error: function(msg) {
				$("#errorMsg").html(msg.message);
			}
		});
	}
	//字符串替换
	String.prototype.format=function()  
	{  
	  if(arguments.length==0) return this;  
	  for(var s=this, i=0; i<arguments.length; i++)  
	    s=s.replace(new RegExp("\\{"+i+"\\}","g"), arguments[i]);  
	  return s;  
	};  
    </script>
</html>
