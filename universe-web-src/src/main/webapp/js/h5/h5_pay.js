function onBridgeReady(){	
    WeixinJSBridge.invoke(
        'getBrandWCPayRequest', {
            "appId" : appId,                   //公众号名称，由商户传入     
            "timeStamp":timeStamp,         //时间戳，自1970年以来的秒数     
            "nonceStr" : nonceStr,         //随机串     
            "package" : packages,     
            "signType" : "MD5",         //微信签名方式:     
            "paySign" : paySign               //微信签名 
        	},
        function(res){
           // 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返
           if(res.err_msg == "get_brand_wcpay_request:ok"){
        	    //支付成功
           }
       }
   ); 
 }

function wxPay(){  
	if (typeof WeixinJSBridge == "undefined"){
	   if( document.addEventListener ){
	         document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
	     }else if (document.attachEvent){
	         document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
	        document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
	    }
	 }else{
	   onBridgeReady();
	 }
}


var timer=window.setInterval(ajaxstatus, 1000);
//定义请求支付结果参数，3秒钟请求一次
function ajaxstatus() {
	var orderId = document.getElementById("orderId").value;//本地订单号
	var totalPrice = document.getElementById("orderPrice").innerHTML;
	var userId = document.getElementById("userId").value;
	if(orderId != null && orderId != "undefined" && orderId != ""){
		$.ajax({
		    url: "/web/product/pay/result?orderid="+orderId,  //调用商城查询支付结果，现改为调用 计划卡片平台查询支付结果
		    type: "get",
		    dataType:"json", 
		    success: function (data) {
		     	if(data.status==0){//支付成功
		     		window.clearInterval(timer);
		     		//location.href='${paidRedirect}';
		     		/*document.getElementById("success").style.display="block";
		     		document.getElementById("succssOrderId").innerHTML = orderId;
		     		
		     		document.getElementById("top").style.display="none";
		     		document.getElementById("orderBox").style.display="none";
		     		document.getElementById("recommend").style.display="none";
		     		document.getElementById("orderPriceDiv").style.display="none";
		     		document.getElementById("topay").style.display="none";
		     		document.getElementById("confirm").style.display="none";*/
		     		
		     		location.href="/h5/product/pay/ali/returnjsp?total_fee="+totalPrice+"&out_trade_no="+orderId;
		     		/*//统计
		            analytics.Ana("order",userId,orderId,totalPrice);*/
		     	}
		    }
		});
	}
}