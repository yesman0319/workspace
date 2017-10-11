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
	</head>
<style>
.tban{top:230px; left:0%; height:674px;background:url(img/ka.png) no-repeat center; left:100%}
.cban{ position:absolute; height:260px; width:246px; top:390px; left:50%; margin-left:-123px;}
#wwwt1{left:0%}
.cx{ position:relative; height:44px; width:226px; line-height:44px; font-size:26px; text-align:left; padding-left:20px; border-radius:5px; color:#696969; background:#f5f5f5; margin-bottom:20px;}
.bbb{ position:absolute; width:44px; height:44px; border-radius:50px; background:#f5f5f5; line-height:44px; left:-64px; top:0px; font-size:26px; text-align:center}
.xt{ background:#1fd06d; color:#fff;}
.xe{ background:#e32e34; color:#fff;}
input{
	position: absolute;
	width: 165px;
	height: 52px;
	padding: 0px;
	padding-left: 10px;
	border: none;
	margin: 0;
	font-size: 22px;
	line-height: 52px;
	background: none;
	border-radius: 5px;
	position: absolute;
}
#sendpwd{
	top: 620px;
	left: 391px;
	width: 150px;
	height: 52px;
	color: #e32e34;
	line-height: 52px;
}
#send{
	top: 823px;
	left: 101px;
	width: 443px;
	height: 52px;
	color: #e32e34;
	line-height: 52px;
}
input:focus,input:visited,
input:active,select:focus,select:visited,
select:active{ border:none;outline:none}
#test{ height:1080px; background:url(<%=basePath%>img/bg.gif); position:absolute; top:0px; left:0px; overflow:hidden}
.info{ display:none;width:640px; height:auto}
.on1{ display:block}
.menu{ position:relative; height:66px; width:640px;}
.mele{ position:relative; width:50%; height:66px; float:left; font-size:30px; text-align:center; color:#696969; background:#f0f1f5; line-height:66px;}
.mon{ color:#fff; background:#e32e34}
.t{ width:580px; height:auto; margin:auto; color:#6f6f6f}
.t2{ width:580px; padding-left:30px; padding-right:30px; height:auto;  color:#6f6f6f}
.zinfo{ display:none;}
.zon{ display:block}
.wuliao{ text-align:center; margin-top:50px;}
.sharep{width:640px; border-top:1px solid #b2b2b2; margin-top:30px;}
.shareele{ width:470px; height:108px; border-bottom:1px solid #b2b2b2; padding-left:140px; padding-right:30px; line-height:108px; position:relative;}
.sharet{ position:absolute; height:88px; width:88px; top:10px; left:30px;}
</style>
<body>
	<form  id="myForm" action="<%=basePath%>/wechat/login" method="post">
	
		<input type="hidden" value="${errorMessage }">
		<input type="hidden" id="backUrl" value="/wechat/index">
		<input type="hidden" id="wechatcode" name="wechatcode" value="${wechatcode}"/>
		<input type="hidden" id="openid" name="openid" value="${openid}"/>
	<div id="showCode" class="info on1" >
	<div class="menu">
    	<div class="mele mon" to="erweima">我的二维码</div>
        <div class="mele" to="share">分享成功的朋友</div>
    </div>
    <div class="zinfo tc zon" id="erweima">
	    <div>
				<div class="t t32 tc" style=" line-height:70px; margin-top:15px;"><b>邀请好友得私人定制课程优惠券</b></div>
				<br>
				<div class="t t24 tl" style="line-height:40px;font-size: 18px;text-align:center">
	        	恭喜您成为精英计划第<span><b style="color:#FF0000">${count}</b></span>名杀托党
					<br>杀托大战一触即发
					
					<br><br>快来邀请好友扫描你的<b style="color:#FF0000">专属二维码</b>
					<br>
<!-- 					<br>&nbsp;&nbsp;邀请5人，获得<b style="color:#FF0000">9元</b>优惠券
					<br>&nbsp;&nbsp;邀请10人，获得<b style="color:#FF0000">98.1元</b>优惠券
					<br>&nbsp;&nbsp;邀请15人，获得考神陪练<b style="color:#FF0000">10小时全额</b>优惠券 -->
					<br>
						<div >
							<p style="color:  red ">推荐好友关注公众号</p>并<p style="color:  red">首次</p>下单购买任意课程
							<br>
							<br>每推荐一位新用户
							<br>即可获得99元课程券一张
							<br>可0元换购99元（含）以下任意课程
							<br>课程券可在“我的优惠券”中查看
						</div>
					<br>
				</div>	
					<br>
		        <div class="t t28 tc" style=" line-height:60px; color:#000">长按分享或保存专属二维码</div>
	        </div>
	        <div style="text-align: center">
	       		 <img src="${myUrl }" style="width:580px;"/><!--二维码图片-->
	        </div>
	        <div class="t t26 tl" style="height:28px; line-height:28px; margin-top:30px;;text-align:center">
	        	如果您的二维码已过期，请更新
	            <img src="<%=basePath%>img/fush.png" id="shuaxin"  onclick="refresh();" style="margin-left:20px;"/><!--刷新按钮-->
	        </div>
	        </div>
	    </div>
    <div class="zinfo" id="share">
    	<div class="t2 t24" style="margin-top:10px; background:#f0f1f5; height:46px; line-height:46px; " >
        	通过专属二维码成功成为会员的好友
        </div>
        <div class="wuliao t24">共 <span class="t30 ti" style="color:#e32e34;">${fn:length(shareLog)}</span> 位成为会员</div>
        
        <div class="sharep">
	 		<c:forEach items="${shareLog }" var="shareLog">
				<div class="shareele">
	            	<img class="sharet" src="${shareLog.headImgUrl}"/>
	               <span class="t24">${shareLog.nickName}</span>
	            </div>
			</c:forEach>
        </div>
    </div>

<div class="info" id="test"><!--显示在class中加on1-->
	<input type="text" name="phone"  id="phone" style="top: 621px; left: 101px; width: 271px;" placeholder="请输入手机号码" />
    <input type="text" name="checkCode"  id="checkCode"   style="top: 711px; left: 101px; width: 430px;"placeholder="请输入验证码" />
    <input type="text" name="errorMsg"  id="errorMsg"  value="${errorMsg }" style="top: 761px; left: 101px; width: 430px; color: red" readonly="readonly"/>
    <div class="gd tc t24" id="sendpwd" onclick="getCode();">获取验证码</div>
  	<div class="gd" id="send" onclick="submit();"></div>
  	
</div>
	</form>
</body>
	<script src="js/jquery.js"></script>
	<script>
	$(".mele").click(function(){
		$(".mele").removeClass("mon");
		$(this).addClass("mon");
		$(".zinfo").removeClass("zon");
		$("#"+$(this).attr("to")).addClass("zon");	
	})
	
	
 	$(function(){
		var img = '${myUrl}';
		if(img!=null&&img!="")
		{
			$("#test").hide();
			$("#showCode").show();
		}
		else
		{
			$("#test").show();
			$("#showCode").hide();
		}

	}) 
	
	var basePath = "${basePath}";	
	
	/**获取验证码**/
	function getCode() {
		uPhone = $.trim($("#phone").val()).replace(/ +/g, "");   
		var check = validPhone($("#phone"));
		if(!check){
			return;
		}
		$(".checkTips").hide();
		var request = basePath +  "/h5/checkcode.html?type=1&phone="+uPhone;
		$.ajax({
			url: request,
			type: "GET", 
			dataType: 'json',//here
			async: true,
			success: function(msg) {
				if(msg.success){
					//移除点击事件
					$('#sendpwd').removeAttr('onclick');
					var curTime = 60;
					$('#sendpwd').html("({0})重新获取".format("60"));
					var timer = window.setInterval(function () {
						curTime--;
						if (curTime > 0) {
							$('#sendpwd').html("({0})重新获取".format(curTime));
						} else {
							window.clearInterval(timer); 
							$('#sendpwd').attr('onclick', 'getCode();');
							$('#sendpwd').html('获取验证码');
						}
					}, 1000);
				}else{
					$('#sendpwd').attr('onclick', 'getCode();');
					$(".checkTips").html(msg.message);
					$(".checkTips").show();
				}
			},
			error: function(msg) {}
		});
	}
	
	/*验证用户名 手机号 */
	function validPhone(ele) {
		/*用户名必须是手机号/邮箱*/
		var regEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
		//var regPhone = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/;
		var regPhone = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
		var check = true; 
		  
		uPhone = $.trim($(ele).val()).replace(/ +/g, "");
		$(ele).val(uPhone)
		
		if(uPhone == ""){
			$(".checkTips").html("手机号不能为空");
			$(".checkTips").show();
			return false;
		}
		
		
		if (!regPhone.test(uPhone)) {//手机号格式不正确
			$(".checkTips").html("手机号格式不正确");
			$(".checkTips").show();
			return false;
		} 
		
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
	
	function submit(){
		var phone = $("#phone").val();
		var checkCode = $("#checkCode").val();
		var weChatCode = $("#wechatcode").val();
		if(phone == null || phone == "" || $.trim(phone) == "") {
			$(".checkTips").html("手机号不能为空");
			$(".checkTips").show();
			return;
		}
			var check = validPhone($("#phone"));
			if(!check){
				$(".checkTips").html("手机号格式不正确");
				$(".checkTips").show();
				return;
			}
			
		if(checkCode == null || checkCode == "" || $.trim(checkCode) == "") {
			$(".checkTips").html("验证码不能为空");
			$(".checkTips").show();
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
