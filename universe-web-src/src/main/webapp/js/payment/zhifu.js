/**
 * Created by admin on 2016/5/13.
 */
window.onload=function(){
	
    var h=document.body.scrollHeight;
    var div = document.createElement("div");
    div.id="tanchuang";
    div.style.height=h+"px";
    div.style.display="none";
    document.body.appendChild(div);

    var tanchuang = document.getElementById("tanchuang");
    var navA = document.getElementById("nav").getElementsByTagName("a");
    var box = document.getElementById("box-cen").getElementsByTagName("section");
    var cg = document.getElementById("cg");
    var cx = document.getElementById("cx");
    var success = document.getElementById("success"); 
    var cols = document.getElementById("cols");
    var ztishi = document.getElementById("ztishi");

    var cols1 = document.getElementById("cols1");
    var jx = document.getElementById("jx");
    var chaoshi = document.getElementById("chaoshi");
    var fanhui = document.getElementById("fanhui");
    var tishi = document.getElementById("tishi");
    var wx_pic = document.getElementById("wx_pic");
    var zfb_pic = document.getElementById("zfb_pic");
    var zfb_right = document.getElementById("zfb_right");

    var orderid = document.getElementById("orderid").value;//本地订单号
	var order_price = document.getElementById("price").value;//订单价格
	var goodid = $("#goodid").val();
	var goodattrid = $("#goodattrid").val();
	var jsonStr = encodeURIComponent($("#jsonStr").val());
	//var supportPaymentTypes = encodeURIComponent($("#supportPaymentTypes").val());

	
	//统计
	analytics.Ana("order",document.getElementById("userId").value,orderid);
	
	for(var i=0;i<navA.length;i++){
        navA[i].index=i;
        navA[i].onclick=function(){
        	
            for(var i=0;i<navA.length;i++){
                navA[i].className="";
                box[i].style.display="none";
                success.style.display="none";
            }
            this.className="on";
            box[this.index].style.display="block";

            if(this.innerHTML=="支付宝"){
            	//调用支付宝 支付
            	var resultCode = "";
            	$.ajax({
            	    url: "/web/product/pay/ali/web/dmf?orderid="+orderid+"&totalPrice="+order_price+"&jsonStr="+jsonStr, 
            	    type: "get", 
            	    dataType:"json",
            	    async:false, //设置成同步
            	    success: function (data) {
            	    	//console.log(data)
            	    	if(data.status==0){  //请求  支付宝 成功
            	    		resultCode = data.message;
            	    		var img = document.createElement("img");
                            var div = document.createElement("div");
                            var h2 = document.createElement("h2");
                            var span = document.createElement("span");

                            var imgs = document.createElement("img");
                            var divs = document.createElement("div");
                            
                            document.getElementById("paytype").value = 'ali'; //设置支付类型
                            
                            imgs.src="/i/payment/pic4.jpg";
                            divs.id="btns";
                            divs.style.fontSize="18px";    
                            divs.innerHTML="登录支付宝支付";                         
                            
                            img.style.marginLeft=150+"px";
                            span.innerHTML="打开手机支付宝扫一扫继续支付";
                            span.style.width=100+"px";
                            h2.id="zhifubao";
                            div.style.background="#0fb3f5";
                            div.style.marginLeft=150+"px";
                            h2.appendChild(span);
                            div.appendChild(h2);
                            img.src="/web/product/pay/qrcode?code_url="+resultCode; //当面付，扫码支付
                            zfb_pic.appendChild(img);
                            zfb_pic.appendChild(div);
                            zfb_right.appendChild(imgs);
                            zfb_right.appendChild(divs);
                            document.getElementById('btns').onclick=function(){
                            	tanchuang.style.display="block";   //添加遮掩，阴影
                            	tishi.style.display="block";       //弹窗
                            	window.clearInterval(timer);
                            	window.open(data.interfacehost+"/pay/ali/web/jsdz?orderid="+orderid+"&totalPrice="+order_price+"&jsonStr="+jsonStr);
                            } //即时到账   
            	    	}else if(data.status==1){
            	    		alert(data.message);   //打印错误信息
            	    	}
            	    },
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
    		                }else{
    		                	alert("网络或其他未知问题，请求失败，请稍后重新下单！"); 
    		                }
    	            }
            	});
            }else{
            	document.getElementById("paytype").value = 'wx'; //设置支付方式
            }
        }
        /*tishi.style.display="block";
         tanchuang.style.display="block";*/
    }
    
}

var timer=window.setInterval(ajaxstatus, 5000);
//定义请求支付结果参数，5秒钟请求一次
function ajaxstatus() {
	
	var orderid = document.getElementById("orderid").value;//本地订单号
	var order_price = document.getElementById("price").value;//订单价格
	var paytype = document.getElementById("paytype").value;
	var outOrderId = document.getElementById("outOrderId").value;
	var callBack = document.getElementById("callBack").value;	
	$.ajax({
	    url: "/web/product/pay/result?orderid="+orderid,  //调用商城查询支付结果，现改为调用 计划卡片平台查询支付结果
	    type: "get",
	    dataType:"json", 
	    success: function (data) {
	     	if(data.status==0){//支付成功
	     		window.clearInterval(timer);
	     		location.href="/web/product/pay/resultjsp?order_id="+orderid+"&goodid="+goodid+"&order_price="+order_price+"&pay_result=success&pay_type="+paytype+"&out_order_id="+outOrderId+"&call_back="+callBack+"&supportPaymentTypes="+$("#supportPaymentTypes").val();
	     	}
	    }
	});
 }


//查询即时到账支付结果
function payResultForJSDZ(){
	
	var orderid = document.getElementById("orderid").value;//本地订单号
	var order_price = document.getElementById("price").value;//订单价格
	var paytype = document.getElementById("paytype").value;  //支付宝 或 微信
	var good_id = document.getElementById("goodid").value;
	var outOrderId = document.getElementById("outOrderId").value;
	var callBack = document.getElementById("callBack").value;
	
	$.ajax({
		url: "/web/product/pay/result?orderid="+orderid,  //调用商城查询支付结果，现改为调用 计划卡片平台查询支付结果
	    type: "get",
	    dataType:"json",
	    async: false,
	    success: function (data) {
	     	if(data.status==0){//支付成功
	     		location.href="/web/product/pay/resultjsp?order_id="+orderid+"&goodid="+good_id+"&order_price="+order_price+"&pay_result=success&pay_type="+paytype+"&out_order_id="+outOrderId+"&call_back="+callBack+"&supportPaymentTypes="+$("#supportPaymentTypes").val();
	     	}else{ //支付失败
	     		location.href="/web/product/pay/resultjsp?order_id="+orderid+"&goodid="+good_id+"&order_price="+order_price+"&pay_result=error&pay_type="+paytype+"&out_order_id="+outOrderId+"&call_back="+callBack+"&supportPaymentTypes="+$("#supportPaymentTypes").val();
	     	} 
	    }
	});
}

cg.onclick=function(){
	payResultForJSDZ();
    tishi.style.display="none";
    tanchuang.style.display="none";
    
}

cx.onclick=function(){
	var timer=window.setInterval(ajaxstatus, 5000);
    tishi.style.display="none";
    tanchuang.style.display="none";
}
cols.onclick=function(){
    tishi.style.display="none";
    tanchuang.style.display="none";
    setTimeout(function(){
        tanchuang.style.display="block";
        ztishi.style.display="block"
    },1000)
}
cols1.onclick=function(){
    ztishi.style.display="none";
    tanchuang.style.display="none";
}
//继续 支付
jx.onclick=function(){
	ztishi.style.display="none";
    tanchuang.style.display="none";
}

fanhui.onclick=function(){
	var goodid = document.getElementById("goodid").value;
	var callBack = document.getElementById("callBack").value;
	var outOrderId = document.getElementById("outOrderId").value;
	
    location.href="/web/product/pay/get?goodId="+goodid+"&outOrderId="+outOrderId+"&callBack="+callBack+"&jsonStr="+jsonStr; 
}


	
/*距离当前时间10分钟后，失效，动态显示倒计时*/
var endTime= new Date();
    endTime = endTime.setTime(endTime.getTime()+10*60*1000 - 5000);
function GetRTime(){
  var nowTime= new Date();
  var t =endTime - nowTime.getTime();
  
  var m=0;
  var s=0;
  if(t>=0){
    m=Math.floor(t/1000/60%60);
    s=Math.floor(t/1000%60);
  }else{//到时
	  window.clearInterval(GetRTime);
	  var chaoshi2 = document.getElementById("chaoshi");
	  var tanchuang2 = document.getElementById("tanchuang");
	  var box2 = document.getElementById("box-cen").getElementsByTagName("section");
	  var navA2 = document.getElementById("nav").getElementsByTagName("a");
	  for(var i=0;i<navA2.length;i++){
          box2[i].style.display="none";
      }
	  tanchuang2.style.display="block";
	  chaoshi2.style.display="block";
  }
  document.getElementById("wxmm").innerHTML = m;
  document.getElementById("wxss").innerHTML = s;
  document.getElementById("tbmm").innerHTML = m;
  document.getElementById("tbss").innerHTML = s;
}
setInterval(GetRTime,0);
