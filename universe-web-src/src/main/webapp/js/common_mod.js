//倒计时
function countDowntimer(num) {
    if (num != 0) {
    	durationTimer++;
    	$("#time-count").html(num + "s");
    ss = setTimeout(function () {
            countDowntimer(num - 1)
        }, 1000);
    } else {
    	postAnswer();
    }
}
//获取请求头时间戳
function getResponseTime(){
	var date=new Date($.ajax({async: false}).getResponseHeader("Date"));
	xm_startTime=getzf(date.getFullYear())+"-"+getzf((date.getMonth()+1))+"-"+getzf(date.getDate())+" "+getzf(date.getHours())+":"+getzf(date.getMinutes())+":"+getzf(date.getSeconds());
	return date;
}
//时间戳转string日期年月日
function getMyTime(str,format){  
    var oTime, 
    oDate = new Date(str),
    oYear = oDate.getFullYear(),  
    oMonth = oDate.getMonth()+1,  
    oDay = oDate.getDate(),  
    oHour = oDate.getHours(),  
    oMin = oDate.getMinutes(),  
    oSen = oDate.getSeconds();  
    if(format == "ymd"){
    	oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay)
    }else if(format == "ymdhms"){
    	 oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSen);//最后拼接时间  
    }else if(format == "mdhms"){
    	 oTime = getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSen);
    }else if(format == "hms"){
    	 oTime = getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSen); 
    }
    return oTime;  
};
//时间戳转string日期，更简洁的转化方法
function getLocalTime(timeStamp) { 
	return new Date(parseInt(timeStamp)).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " "); 
} 



//开始计时
function startTimer() {
	var fn = function() {
		if ($("#testTimer2").length <= 0) {
			console.log("not find target");
		}	
		if (!durationTime && durationTime<0) {
			durationTime = 1; //计算剩余的毫秒数
		} else {
			durationTime++;
		}

		var ts = durationTime;
		xm_spendTime = durationTime;
		//var dd = parseInt(ts / 60 / 60 / 24, 10); //计算剩余的天数
		var hh = parseInt(ts / 60 / 60 % 24, 10); //计算剩余的小时数
		var mm = parseInt(ts / 60 % 60, 10); //计算剩余的分钟数
		var ss = parseInt(ts % 60, 10); //计算剩余的秒数
		//dd = getzf(dd);
		hh = getzf(hh);
		mm = getzf(mm);
		ss = getzf(ss);
		currentTestTimeStr = hh + ":" + mm + ":" + ss;
		$("#testTimer2").html(currentTestTimeStr);
	};
	if (testTimerID) return;
	testTimerID = window.setInterval(fn, 1000);
};
//格式化时间
function format_time(time){
	var mm=getzf(parseInt(time/60,10));
	var ss=getzf(parseInt(time%60,10));
	if(time > 60){
		return mm+":"+ss;
	}else{
		return ss;
	}
	return "00:00";
}
function clearTimer() {
	durationTime = 0; //计时时间间隔（单位秒）
	currentTestTimeStr = '00:00:00'; //重置计时时间
	window.clearInterval(testTimerID);
	testTimerID = undefined;
};
//小数点后两位百分比 0.45 =》 45.00%
function percentNum(num) {
	return (Math.round(num * 10000) / 100.00)+"%";
//	return num.toFixed(2)  //10 =》 10.00
};
//补零
function getzf(n){
	n=n<10?"0"+n:n;
	return n;
};
//html转义
function html_encode(str) {   
  	var s = "";   
	if (str.length == 0) return "";   
	s = str.replace(/&/g, "&gt;");   
	s = s.replace(/</g, "&lt;");   
	s = s.replace(/>/g, "&gt;");   
	s = s.replace(/ /g, "&nbsp;");   
	s = s.replace(/\'/g, "&#39;");   
	s = s.replace(/\"/g, "&quot;");   
	s = s.replace(/\n/g, "<br>");   
	return s;   
}   
//匹配字符长度：汉字2 字母1
String.prototype.getlen = function() {  
  	var len = 0;  
  	for (var i=0; i<this.length; i++) {  
	    if (this.charCodeAt(i)>127 || this.charCodeAt(i)==94) {  
	       	len += 2;  
	    } else {  
	   		len ++;  
	 	}  
	}  
  	return len;  
}
//字符串替换
String.prototype.format=function(){  
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
//判断浏览器终端
window.browser={
    versions:function(){
        var u = navigator.userAgent, 
            app = navigator.appVersion;
        return {
            trident: u.indexOf('Trident') > -1, //IE内核
            presto: u.indexOf('Presto') > -1, //opera内核
            webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1,//火狐内核
            mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
            android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
            iPhone: u.indexOf('iPhone') > -1 , //是否为iPhone或者QQHD浏览器
            iPad: u.indexOf('iPad') > -1, //是否iPad
            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
            weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
            qq: u.match(/\sQQ/i) == " qq" //是否QQ
        };
    }(),
    language:(navigator.browserLanguage || navigator.language).toLowerCase()
}
/*//判断是否IE内核
if(browser.versions.trident){ alert("is IE"); }
//判断是否webKit内核
if(browser.versions.webKit){ alert("is webKit"); }
//判断是否移动端
if(browser.versions.mobile||browser.versions.android||browser.versions.ios){ alert("移动端"); }
*/



/*正则验证*/
//验证用户名 手机号 
function validPhone(validEle,tipsEle) {
	/*用户名必须是手机号/邮箱*/
	var regEmail = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
	//var regPhone = /^13[0-9]{9}$|14[0-9]{9}|15[0-9]{9}$|18[0-9]{9}$/;
	var regPhone = /^1[3|4|5|7|8][0-9]{9}$/; //验证规则
	var check = true; 
	  
	var uPhone = $.trim($(validEle).val()).replace(/ +/g, "");
	$(validEle).val(uPhone)
	if(uPhone == ""){
		$(tipsEle).html("手机号不能为空");
		return false;
	}
	if (!regPhone.test(uPhone)) {//手机号格式不正确
		$(tipsEle).html("手机号格式不正确");
		return false;
	} 
	return true;
}
