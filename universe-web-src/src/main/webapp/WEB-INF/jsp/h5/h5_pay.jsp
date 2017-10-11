<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>订单支付</title>
		<%@include file="../include/pub.jsp"%>
		<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
		<meta name="format-detection" content="telephone=no" />
		<link rel="stylesheet" href="${cdnPath}/css/h5/h5_shopping_reset.css" />
		<link rel="stylesheet" href="${cdnPath}/css/h5/h5_shopping_pay.css" />		 
		<link rel="stylesheet" href="${cdnPath}/css/h5/h5_coupons.css" />		

	</head>   
	<body>
		<div class="top" id="top">
			<div class="userLeft">
				<p class="userName">
					当前登录账号：<span id="userName">${phoneNum}</span>
				</p>
				<p class="tips">
					购买后请使用该账号登录精英计划app进行学习
				</p>
			</div>
			<a href="/h5/product/pay/users" class="changeUser">
				切换用户
			</a>
		</div>
		<div class="orderBox" id="orderBox">
			<ul class="orderName">
				<li class="mody">
					<h2>${good.goodName}</h2>
					<p class="prev-box">
						<i class="prev_price_icon"></i>
						<span class="prevPrice" id="prev_price">${good.marketPrice}</span> <!--原价|市场售价-->
					</p>
				</li>
				<li  class="mody">
					<p id="teacherName">讲师：${good.teacherInfo.nameCn}</p>  <!--教师名称-->
					<p class="nowPrice">
						<i class="price_icon"></i><span id="now_price">${good.localPrice}</span> <!--现价-->
					</p>
					<c:if test="${good.promotionMessage != null}"><div class="activity">${good.promotionMessage}</div></c:if> <!--活动名称，描述-->
				</li>
			</ul>
			<div class="duration mod" id="attrlist">
				<h3>课程时长</h3>
				<ul>
				    <!-- 商品的时长，1个月，2个月，3个月 -->
					<c:forEach items="${good.goodAttrList}" var="ga" varStatus="status">
						    <c:choose>
							   <c:when test="${status.index == 0}"> <!--设置li样式，默认选中第一个，根据循环次数判断-->
							      <li class="selected" ><a href="javascript:;" id="${ga.id}" name="${ga.price}" title="${ga.marketPrice}" class="${ga.supportPaymentTypes}">${ga.attrValue}</a></li>
							   </c:when>
							   <c:otherwise>
							      <li><a href="javascript:;" id="${ga.id}" name="${ga.price}" title="${ga.marketPrice}" class="${ga.supportPaymentTypes}">${ga.attrValue}</a></li>
							   </c:otherwise>
							</c:choose>
				     </c:forEach>
				   </ul>
				   <!-- 商品的时长     结束-->
			</div>
			
			<div class="startime mod" id="userTimeList">
				<h3>开始上课时间</h3>
				<ul>
					<c:forEach items="${good.goodUseTimeList}" var="usertimes" varStatus="status">
					    <c:choose>
						   <c:when test="${status.index == 0}"> <!--设置li样式，默认选中第一个，根据循环次数判断-->
						      <li  class="selected"><a href="javascript:;" name="<fmt:formatDate value="${usertimes.userTime}" pattern="yyyy-MM-dd"/>"><fmt:formatDate value="${usertimes.userTime}" pattern="yyyy-MM-dd"/></a></li>
						   </c:when>
						   <c:otherwise>
						      <li><a href="javascript:;" class="" name="<fmt:formatDate value="${usertimes.userTime}" pattern="yyyy-MM-dd"/>"><fmt:formatDate value="${usertimes.userTime}" pattern="yyyy-MM-dd"/></a></li> 
						   </c:otherwise>
						</c:choose>
			        </c:forEach>
				</ul>
			</div>
			<div class="store_count mod">
				库存 : <span id="stockNum">${good.stockNum}</span>
			</div>
			<div class="goods_info mod">
				<h3>商品信息</h3>
				<ul>
					<!--简介说明-->
                    <c:forEach items="${good.goodTypeAttrList}" var="typeAttrMessage">
					    <li class="gLi">
		                   <p class="gTitle">${typeAttrMessage.attrName}</p>
		                  <%--  <div class="gDetail">${typeAttrMessage.attrValues}</div> --%>
		                   <c:if test="${fn:contains(typeAttrMessage.attrValues, 'http')}"><img alt="" src="${typeAttrMessage.attrValues}"/></c:if>
		                   <c:if test="${fn:contains(typeAttrMessage.attrValues, 'http') == false}"><div class="gDetail">${typeAttrMessage.attrValues}</div></c:if>
		               </li>
			        </c:forEach>
				</ul>
			</div>
			
		</div>
		
		
		<!--<div class="recommend" id="recommend">
			<h3>推荐人</h3>
			<input type="text" placeholder="填写推荐人" id="recommentPersion"/>
		</div>   20170207取消推荐人-->
		<div class="coupons">
			<a href="javascript:;" target="_Self">
				<h3>优惠券</h3>
				<p onclick="showCoupons()" id="coupon-nums-p">
				    <c:if test = "${couponNum == 0}" >暂无可用 ></c:if>
					<c:if test = "${couponNum != 0}" ><span id="coupon-nums">${couponNum}张可用<span id="r-arrow"> > </span></span></c:if>
					<span id="nonuse-coupons" style="display: none">不使用优惠券 ></span><!--不使用优惠券后显示-->
				</p>
				<div class="cutline"></div>
			</a>			
		</div>
		<div class="orderPrice" id="orderPriceDiv">
			<h3>待支付</h3>
			<p>
				<i class="price_icon"></i><span id="orderPrice">${good.localPrice}</span>
			</p>
		</div>
		<div class="topay" id="topay">
			<p>请选择支付方式</p>
			<ul class="payWay" id="payType">
			    <li id="myWalletPayLi">
					<b class="mwallet_icon"></b>
					<div class="mwallet">
						<span>我的钱包</span>
						<span id="wallet-balance">
							余额:&nbsp;&nbsp;<i class="price_icon" style="vertical-align: 0px;"></i>${wallet.balance}
						</span><!--钱包余额-->
						<span class="checkbox checked" id="mwallet"></span>
					</div>
				</li>
				<li id="wxPayLi" value="wx">
					<b class="wx_icon"></b>
					<div class="wx">
						<span>微信支付</span>
						<span class="checkbox" id="wx"></span>
					</div>
				</li>
				<li id="aliPayLi" value="ali">
					<b class="ali_icon"></b>
					<div class="ali">
						<span>支付宝支付</span>
						<span class="checkbox" id="ali"></span>
					</div>
				</li>
			</ul>
		</div>
	      <!-- 优惠券 开始 -->
			<div id="coupons-page" style="visibility: hidden;">
				<ul class="pay_coupons_nav">
					<li class="active">
						<a class="coupon_tab">可用优惠券( <span class="payCouponNum" id="usable_num">0</span> )</a>
					</li>
					<li>
						<span class="cutLine"></span>
						<a class="coupon_tab">不可用优惠券( <span class="payCouponNum" id="unusable_num">0</span> )</a>
					</li>
				</ul>
				<ul class="coupons-ul" id="exits_coupons">   <!--可用优惠券-->
					<div id="cancel_coupons">不使用优惠券</div>
			        <c:forEach items="${couponList}" var="coupon">
			            <c:if test="${coupon.resultStatus == 0}">
	                        <li class="c-usable" id="${coupon.id}" title="${coupon.facePrice}">
								<span class="c-price">${coupon.facePrice}</span>
								<p class="c-range">${coupon.couponName}</p>
								<p class="c-endtime"><span id="c-endtime"><fmt:formatDate value="${coupon.beginTime}" pattern="yyyy-MM-dd"/></span> — <span id="c-endtime"><fmt:formatDate value="${coupon.endTime}" pattern="yyyy-MM-dd"/></span></p>
								<b class="choicedimg"></b>
							</li> 
						</c:if>  
				    </c:forEach> 
				    <div class="no-coupons" id="no_exits_coupons"><!--没有可用优惠券时显示此div-->
						<img src="${cdnPath}/i/wappay_test/coupons0.png" />
						<p>暂无可用优惠券</p>
					</div>
					<a id="queding" onclick="toBuyPage()">确定</a>
					<a id="fanhui" onclick="goBackBuyPage()" style="display: none;">返回</a>
		       	</ul>
		       	<ul class="coupons-ul" id="inexistent_coupons"><!--不可用优惠券-->
					<c:forEach items="${couponList}" var="coupon">
                        <c:if test="${coupon.resultStatus != 0 and coupon.resultStatus != 1 and coupon.resultStatus != 2}">
	                        <li class="c-usable" id="${coupon.id}" title="${coupon.facePrice}">
								<span class="c-price">${coupon.facePrice}</span>
								<p class="c-range">${coupon.couponName}</p>
								<p class="c-endtime"><fmt:formatDate value="${coupon.beginTime}" pattern="yyyy-MM-dd"/></span> — <span id="c-endtime"><fmt:formatDate value="${coupon.endTime}" pattern="yyyy-MM-dd"/></span></p>
								<p class="unmatch-tips">所结算的商品不能使用该优惠券</p>
							</li> 
						</c:if>  
				    </c:forEach> 
					<div class="no-coupons" id="no_inexistent_coupons"><!--没有不可用优惠券时显示此div-->
						<img src="${cdnPath}/i/wappay_test/coupons0.png" />
						<p>暂无不可用优惠券</p>
					</div>
		       	</ul>
			</div>
			<!-- 优惠券 结束 --> 
		 
		<a href="javascript:;" class="payBtn" id="tobuy" onclick="buy()">确认支付</a>
		<!--<a href="javascript:;" class="payBtn negative" onclick="buy()">确认支付</a> 不可支付的样式> -->
		
        
        <!--支付成功提示-->
		<div class="paySuccess" id="success" style="display:none ;">
			<p class="success_tips">
				<i class="queren_icon"></i>
				<span>订单支付成功</span>
			</p>
			<p class="total_price">
				<i class="price_icon"></i>
				<span id="paidPagePrice">${totalFee}</span>
			</p>
			<p class="total_price">
				<i><font style="font-size:14;color:#fc6d13;">订单号：</font><span id="succssOrderId" style="font-size:14;color:#fc6d13;"></span></i>
			</p>
		</div>
        
        
        <!--余额不足提示框-->
		<div id="yu-e-tips" class="modal" style="color: #f7001d;display: none;">
			<div class="dialog"style="max-height: 133px;"> 
				<p class="tips_words">余额不足</p>
				<p class="tips_detail" style=" font-size: 14px;">
					请在精英计划APP上充值后，再购买
				</p>
				<ul>
					<li  id="cancel-charge" class="wait"><a>取消</a></li>
					<li id="go-charge" class="wait"><a href="#">知道了</a></li>
				</ul>
			</div>
		</div>
		
		<!--钱包支付时提示框-->
		<div id="wallet-pay-tips" class="modal" style="display: none;">
			<div class="dialog" style="max-height: 140px;"> 
				<p class="tips_words">使用钱包支付</p>
				<p class="tips_detail" style="height: 50px; padding: 5px 0px 10px 0px;">
					<span id="need-pay"></span>
					<span id="w-balance">当前余额: ${wallet.balance}元</span>
				</p>
				<ul>
					<li  id="cancel-pay" class="wait"><a href="javascript:;">取消</a></li>
					<li id="confirm-pay"><a href="javascript:;" onclick="walletPay()">确定</a></li>
				</ul>
			</div>
		</div>
        
        
		
		<!-- 异常信息  -->
        <input type="hidden" id="error" value="${error}">
        <input type="hidden" id="code" value="${code}">
        <input type="hidden" id="orderId" value="${orderId}">
        <input type="hidden" id="userId" value="${userId}">
        <input type="hidden" id="marketPrice" value="${good.marketPrice}">
        <input type="hidden" id="couponNum" value="${couponNum}">
        <!-- ---------------- ---------------------------------------------------------------------------------------------------------------------------->
        
        <span id="aliPayForm"></span>
       <!--  <form id="alipaysubmit" name="alipaysubmit" action="https://mapi.alipay.com/gateway.do?_input_charset=UTF-8" method="get"><input type="hidden" name="_input_charset" value="UTF-8"/><input type="hidden" name="subject" value="aaa"/><input type="hidden" name="sign" value="vG/6PVMzIHcyFfcKyy+eO3UqAnNCdUAUNGQ2apke6g/SBMsCEEJnAIW3BbI72vjUjmlTOGAx5nXpLHabD17eDMzKRZPU18ZCMw/9r6TVTpPdbWDW85/zkoptCgoS2n59h2wUwD9HXOuD3wdE4vjBkIGa3uQjxO6+qXlhq2/dxq4="/><input type="hidden" name="notify_url" value="https://test.api.liuyang.com/mall/pay/ali/notify"/><input type="hidden" name="payment_type" value="1"/><input type="hidden" name="out_trade_no" value="111"/><input type="hidden" name="partner" value="2088901979651463"/><input type="hidden" name="service" value="alipay.wap.create.direct.pay.by.user"/><input type="hidden" name="total_fee" value="0.01"/><input type="hidden" name="return_url" value="http://www.test.liuyang.com/orders/jsdz/resultjsp"/><input type="hidden" name="sign_type" value="RSA"/><input type="hidden" name="seller_id" value="2088901979651463"/><input type="hidden" name="show_url" value="http://test.www.liuyang.com/goods?goodId=1&outOrderId=1111111111111&callBack=http://test.callback.com"/><input type="submit" value="确认" style="display:none;"></form><script>document.forms['alipaysubmit'].submit();</script> -->
        <!-- 11111 -->
	</body>

   <script type="text/javascript">
       
       var checkedCouponId = "";   //选中的优惠券id
	   var checkedCouponPrice = "0.00"; //选中的优惠券金额
       
       window.onload = function(){
			
    	    //*****库存****如果当前库存为0，则隐藏购买按钮 ****//
			var stockNum = document.getElementById("stockNum").innerHTML;
			if(stockNum != null && Number(stockNum) == 0){
				document.getElementById("tobuy").className = "payBtn negative";
			}
    	   
    	    var aLi = document.getElementsByClassName("gLi");
			var goodsDiv = document.getElementsByClassName("goods_info");
			
			
		var gStr = document.getElementsByClassName("gDetail")[0];
		if(gStr != null && gStr != "undefined"){
			var originalStr = gStr.innerHTML;
			if(aLi != null && aLi != "undefined" && aLi != "" && aLi.length>0){
				if(aLi[0].innerText == "" || aLi[0].innerText == null){
					document.getElementsByClassName("goods_info")[0].style.display = "none";
				}
				for(var i=0;i<aLi.length;i++){
					aLi[i].style.display = "none"
				}
				aLi[0].style.display = "block";
				replaceStr();
				goodsDiv[0].onclick = function(){
					if(aLi[1].style.display == "none"){
						for(var i=0;i<aLi.length;i++){
							aLi[i].style.display = "block";
						}
						gStr.innerHTML = originalStr;
					}else{
						for(var i=0;i<aLi.length;i++){
							aLi[i].style.display = "none";
						}
						aLi[0].style.display = "block";
						replaceStr();
					}
				}
				
				function replaceStr(){
					if(window.innerWidth >= 375){
						var gStrLen = gStr.innerHTML.substring(0,70) + "...";
					}else if(window.innerWidth >= 414){
						var gStrLen = gStr.innerHTML.substring(0,80) + "...";				
					}else{
						var gStrLen = gStr.innerHTML.substring(0,60) + "...";
					}
					gStr.innerHTML = gStrLen;
				}
			}
		}
		  //***************设置默认选中第一个优惠券***********
		   var exitsCouponLists = $("#exits_coupons li");
		   if(null != exitsCouponLists && exitsCouponLists.length != 0){
			   exitsCouponLists[0].className = "c-usable choiced";
			   checkedCouponId = exitsCouponLists[0].id;
			   checkedCouponPrice = exitsCouponLists[0].title;
			   
			    document.getElementById("coupon-nums-p").innerHTML = "-"+checkedCouponPrice + ">";
				document.getElementById("orderPrice").innerHTML = fomatFloat(document.getElementById("now_price").innerHTML - checkedCouponPrice,2);
				
				if(document.getElementById("orderPrice").innerHTML <= 0){
					document.getElementById("orderPrice").innerHTML=0;
				}
		   }else{
			    checkedCouponId = "";       
			    checkedCouponPrice = "0.00";
		   }
       
	   }
       <!-- end -->
   
       var selectedAttrId = null;   //选中的属性id（1个月，2个月，3个月）
       var selectedLearnStartTime = null; //选中的开始学习时间
      
       //---调用微信支付所用参数
       var appId=null;
       var timeStamp=null;
       var nonceStr=null;
       var packages=null;
       var paySign=null;
       var openId = null;
       var code = document.getElementById("code").value;
       var selectedPayType = "mwallet";     //选中的付款方式,默认选中钱包
       var ua = window.navigator.userAgent.toLowerCase();
        
       /* var error = document.getElementById("error").value;
	    if(error != null && error != ""){
	    	alert(error);
	    } */
	    
	    <!------------------------------------------------课程类型  1个月，2个月，3个月 和 价格----------------------------------->
	    var attrlist = document.getElementById("attrlist").getElementsByTagName("li");
	    var price = document.getElementById("orderPrice").innerHTML;  
	    var prevPrice = document.getElementById("marketPrice").value;
	    
	    //初次加载页面时 
	    if(null != attrlist && attrlist.length != 0){  //如果有课程类型  1个月，2个月，3个月等
	    	var atag = attrlist[0].getElementsByTagName("a")[0];
	    	
	        document.getElementById("orderPrice").innerHTML = fomatFloat(Number(price)+Number(atag.name),2);         //总价=商品浮动价+基价 ，折扣价格，实际售价
	    	document.getElementById("now_price").innerHTML =  fomatFloat(Number(price)+Number(atag.name),2);         //总价=商品浮动价+基价 ，折扣价格，实际售价
	    	document.getElementById("prev_price").innerHTML = fomatFloat(Number(prevPrice)+Number(atag.title),2);   //市场售价，原价
	    	
	    	atag.style.color = "#00b451";
	        // $.cookie('ATTR_VAlUE', attrlist[0].title);            //初始化 选中 第一个时长 ，如“1个月”
	        //$.cookie('ATTR_ID', attrlist[0].id);                  //选中的 选中 第一个"时长id" 
	    	selectedAttrId = atag.id;
	    	checkUsePay(atag);  //判断 支付方式
	    }else{ //没有配置支付方式
	    	if(ua.match(/MicroMessenger/i) == 'micromessenger'){
		        document.getElementById("aliPayLi").style.display="none";       //如果是在微信中打开，则隐藏支付宝
		   }else{
			    document.getElementById("wxPayLi").style.display="none";        //如果不是在微信中打开，则隐藏微信支付
		   }
		    document.getElementById("attrlist").style.display="none";
	   }
	    
	    //选择不同的页面时   时长 1个月，2个月，3个月等
		for(var i=0;i<attrlist.length;i++){
			attrlist[i].onclick=function(){
		        for(var i=0;i<attrlist.length;i++){
		        	attrlist[i].className="";
		        	attrlist[i].getElementsByTagName("a")[0].style.color="";
		        }
		        this.className="selected";
		        this.getElementsByTagName("a")[0].style.color = "#00b451";
		        document.getElementById("orderPrice").innerHTML = fomatFloat(Number(price)+Number(this.getElementsByTagName("a")[0].name),2);       //总价=商品浮动价+基价  ，折扣价格，实际售价
		        document.getElementById("now_price").innerHTML =  fomatFloat(Number(price)+Number(this.getElementsByTagName("a")[0].name),2);       //总价=商品浮动价+基价  ，折扣价格，实际售价
		        document.getElementById("prev_price").innerHTML = fomatFloat(Number(prevPrice)+Number(this.getElementsByTagName("a")[0].title),2);  //市场售价，原价
		        
		        // 点击不同属性修改优惠券价格
                document.getElementById("orderPrice").innerHTML = fomatFloat(document.getElementById("now_price").innerHTML - checkedCouponPrice,2);
				if(document.getElementById("orderPrice").innerHTML <= 0){
					document.getElementById("orderPrice").innerHTML=0;
				}
		        
		        //$.cookie('ATTR_VAlUE', this.title);                //选中的 时长 ，如“2个月”
		        //$.cookie('ATTR_ID', this.id);                      //选中的 "时长id"
		        selectedAttrId = this.getElementsByTagName("a")[0].id;
		        checkUsePay(this.getElementsByTagName("a")[0]);  //判断 支付方式
		    }
		}
	    
	    function checkUsePay(atag){
	    	 //判断使用的支付方式
	        if(atag.className != null && atag.className != "undefined" && atag.className != ""){  
	        	 
	        	 if(ua.match(/MicroMessenger/i) == 'micromessenger'){
	    	        document.getElementById("aliPayLi").style.display="none";       //如果是在微信中打开，则隐藏支付宝
	    	     }else{
	    		    document.getElementById("wxPayLi").style.display="none";        //如果不是在微信中打开，则隐藏微信支付
	    	     }
	        	 
	        	//判断 钱包 支付
	        	if(atag.className.indexOf("1900") == -1){  //没有钱包支付方式
					 $("#myWalletPayLi").hide(); 
					 if(selectedPayType == "mwallet" && ua.match(/MicroMessenger/i) == 'micromessenger'){
						 selectedPayType = "wx";
						 document.getElementById("wx").className = "checkbox checked";
						 document.getElementById("ali").className = "checkbox";
						 document.getElementById("mwallet").className = "checkbox";
					 }else{
						 selectedPayType = "ali";
						 document.getElementById("ali").className = "checkbox checked";
						 document.getElementById("wx").className = "checkbox"; 
						 document.getElementById("mwallet").className = "checkbox";
					 }
				}else{ //有钱包支付
					document.getElementById("wx").className ="checkbox";
					document.getElementById("ali").className = "checkbox";
					document.getElementById("mwallet").className = "checkbox checked";
					selectedPayType = "mwallet";
					$("#myWalletPayLi").show();
				}
				
				//判断 支付宝支付
				if(atag.className.indexOf("1901") == -1){
					 $("#aliPayLi").hide();  
				}else if(ua.match(/MicroMessenger/i) != 'micromessenger'){
					 $("#aliPayLi").show();  
				}
				
				//判断 微信支付
				if(atag.className.indexOf("1902") == -1){
	        		 $("#wxPayLi").hide();  
	        	}else if(ua.match(/MicroMessenger/i) == 'micromessenger'){
	        		 $("#wxPayLi").show();  
	        	}
	        }else{
	        	if(ua.match(/MicroMessenger/i) == 'micromessenger'){
			        document.getElementById("aliPayLi").style.display="none";       //如果是在微信中打开，则隐藏支付宝
			    }else{
				    document.getElementById("wxPayLi").style.display="none";        //如果不是在微信中打开，则隐藏微信支付
			    }
	        }
	    	 
	    }
		
	    <!----------------------------------------------------开始使用时间------------------------------------------------------>
		var userTimeList = document.getElementById("userTimeList").getElementsByTagName("li");
	    if(null != userTimeList && userTimeList.length != 0){ 
	    	//$.cookie('LEARN_START_TIME', userTimeList[0].name);   //初始化 选中第一个 “开始使用时间”
	    	var userTimeATag = userTimeList[0].getElementsByTagName("a")[0];
	    	userTimeATag.style.color = "#00b451";
	    	selectedLearnStartTime = userTimeATag.name;
	    }else{
	    	document.getElementById("userTimeList").style.display="none";
	    }
		
		for(var i=0;i<userTimeList.length;i++){
			userTimeList[i].onclick=function(){
		        for(var i=0;i<userTimeList.length;i++){
		        	userTimeList[i].className="";
		        	userTimeList[i].getElementsByTagName("a")[0].style.color="";
		        }
		        this.className="selected";
		        //$.cookie('LEARN_START_TIME', this.name);          //选中的 “开始使用时间”
		        this.getElementsByTagName("a")[0].style.color = "#00b451";
		        selectedLearnStartTime = this.getElementsByTagName("a")[0].name;
		    }
		}
		
		<!----------------------------------------------------支付方式------------------------------------------------------>
		$(".payWay li").click(function(){//选择支付方式并且赋值给selectedPayType;
			var $checkBox = $(this).find(".checkbox");
			$(".checkbox").removeClass("checked");
			$checkBox.addClass("checked");
			selectedPayType = $checkBox.attr("id");
		})
		
		
		//点击  购买
		function buy(){
			
			//如果按钮不可点，直接返回
			if(document.getElementById("tobuy").className == "payBtn negative"){
			   return;	
			}
			
			//var recommentPersion = document.getElementById("recommentPersion").value;  //推荐人
			var totalPrice = document.getElementById("orderPrice").innerHTML;
			/* if(totalPrice <= 0){
				alert("付款价格<=0,可能选择不可用的优惠券引起的，请重新选择 ");
				return;
			} */
			document.getElementById("paidPagePrice").innerHTML = totalPrice;
			if(totalPrice <= 0){
				 $.ajax({
						url: "/web/product/pay/coupon/buy",  //调用商城H5 wx支付  http://test.api.liuyang.com/mall/pay/h5/wx  
					    type: "post", 
					    data:{"goodId":'${good.id}',"attrId":selectedAttrId,
					    	"recommentPersion":"","learnStartTime":selectedLearnStartTime,"totalPrice":0,"couponId":checkedCouponId},
					    async:false,
					    contentType:"application/x-www-form-urlencoded",
					    dataType:"json",
					    success: function (data) {
					    	//如果有错误信息，则打印错误信息
					    	if(data.error != null){
					    		alert(data.error);
					    		return ;
					    	}
					    	//******判断库存*****如果没有库存，则提示 被抢完了 然后刷新页面 ****/
					    	var stockMessage = data.noStock;
					    	if(stockMessage != null && stockMessage != ""){
					    		alert(stockMessage);
					    		document.getElementById("tobuy").className = "payBtn negative";
					    		document.getElementById("stockNum").innerHTML = "0";
					    		return;
					    	}
					    	 //******判断库存*****如果没有库存，则提示 被抢完了 然后刷新页面 ****/
					    	/*
					    	appId = data.appId;
					    	timeStamp = data.timeStamp;
					    	nonceStr = data.nonceStr;
					    	packages = data.package;
					    	paySign = data.paySign; 
					    	document.getElementById("orderId").value = data.orderId; */
					 
					    	location.href="/h5/product/pay/ali/returnjsp?total_fee=0&out_trade_no="+data.orderId;
					    }
					});
				 return;
			}
			
			if(selectedPayType == "wx"){    //微信支付
				//if(packages == null){
				    $.ajax({
							url: "/h5/product/pay/wx",  //调用商城H5 wx支付  http://test.api.liuyang.com/mall/pay/h5/wx  
						    type: "post", 
						    data:{"code":code,"goodId":'${good.id}',"attrId":selectedAttrId,"outOrderId":'${outOrderId}',"callBack": '${callBack}',"recommentPersion":"","learnStartTime":selectedLearnStartTime,"totalPrice":totalPrice,"couponId":checkedCouponId,"openId":openId},
						    dataType:"json",
						    async:false,
						    success: function (data) {
						    	
						    	//如果有错误信息，则打印错误信息
						    	if(data.error != null){
						    		alert(data.error);
						    		return ;
						    	}
						    	
						    	//******判断库存*****如果没有库存，则提示 被抢完了 然后刷新页面 ****/
						    	var stockMessage = data.noStock;
						    	if(stockMessage != null && stockMessage != ""){
						    		alert(stockMessage);
						    		document.getElementById("tobuy").className = "payBtn negative";
						    		document.getElementById("stockNum").innerHTML = "0";
						    		return;
						    	}
						    	//******判断库存*****如果没有库存，则提示 被抢完了 然后刷新页面 ****/
						    	
						    	openId = data.openId;
						    	appId = data.appId;
						    	timeStamp = data.timeStamp;
						    	nonceStr = data.nonceStr;
						    	packages = data.package;
						    	paySign = data.paySign; 
						    	document.getElementById("orderId").value = data.orderId;
						    	wxPay(); //调用微信支付客户端
						    }
						});
				//}
				                   //调用微信支付
			}else if(selectedPayType == "ali"){                         //支付宝支付
				$.ajax({
					url: "/h5/product/pay/ali",  //调用商城H5 ali支付  http://test.api.liuyang.com/mall/pay/h5/ali  
				    type: "post",
				    dataType:"json",
				    data:{"goodId":'${good.id}',"attrId":selectedAttrId,"outOrderId":'${outOrderId}',"callBack": '${callBack}',"recommentPersion":"","learnStartTime":selectedLearnStartTime,"totalPrice":totalPrice,"couponId":checkedCouponId},
				    async:false,
				    success: function (data) {
				    	
				    	//如果有错误信息，则，提示错误信息
				    	if(data.error != null){
				    		alert(data.error);
				    		return ;
				    	}
				    	
				    	//******判断库存*****如果没有库存，则提示 被抢完了 然后刷新页面 ****/
				    	var stockMessage = data.noStock;
				    	if(stockMessage != null && stockMessage != ""){
				    		alert(stockMessage);
				    		document.getElementById("tobuy").className = "payBtn negative";
				    		document.getElementById("stockNum").innerHTML = "0";
				    		return;
				    	}
				    	//******判断库存*********/
				    	
				    	document.getElementById("orderId").value = data.orderId;
				    	var aliPayForm = data.aliPayHtmlText;
				   		//字符串以"结尾，去掉"
				   		/* aliPayForm=aliPayForm.substr(1,aliPayForm.length-2);
				   		aliPayForm=aliPayForm.replace(/\\/g,""); */
				    	document.getElementById("aliPayForm").innerHTML=aliPayForm;
				    	document.forms['alipaysubmit'].submit(); //发送支付请求
				    }
				});
			}else{
				 //钱包 支付 弹出框
				 //1：判断余额
				 var wallet = '${wallet.balance}';
				 if(wallet == null || wallet==""){
					 wallet=0;
				 }
				 if(wallet-totalPrice< 0){
					 $("#yu-e-tips").show();
				 }else{// 2：如果够支付
				   document.getElementById("need-pay").innerHTML = "购买需支付"+totalPrice+"元";
				   $("#wallet-pay-tips").show();  //显示 确定购买 信息
				 }
			}
			
			//统计
			analytics.Ana("order",document.getElementById("userId").value,document.getElementById("orderId").value);
	    }
		
		
		//钱包支付
		function walletPay(){
			//var recommentPersion = document.getElementById("recommentPersion").value;  //推荐人
			var totalPrice = document.getElementById("orderPrice").innerHTML;
			$.ajax({
				url: "/h5/product/pay/wallet",  //调用商城H5 ali支付  http://test.api.liuyang.com/mall/pay/h5/ali  
			    type: "post",
			    dataType:"json",
			    data:{"goodId":'${good.id}',"attrId":selectedAttrId,"recommentPersion":"","learnStartTime":selectedLearnStartTime,"totalPrice":totalPrice,"couponId":checkedCouponId},
			    async:false,
			    success: function (data) {
			    	//如果有错误信息，则，提示错误信息
			    	if(data.status == "0"){
			    		alert(data.message);
			    		return ;
			    	}
			    	
			    	//******判断库存*****如果没有库存，则提示 被抢完了 然后刷新页面 ****/
			    	var stockMessage = data.noStock;
			    	if(stockMessage != null && stockMessage != ""){
			    		alert(stockMessage);
			    		document.getElementById("tobuy").className = "payBtn negative";
			    		document.getElementById("stockNum").innerHTML = "0";
			    		return;
			    	}
			    	
			    	//******判断库存*********/
			    	document.getElementById("orderId").value = data.orderId;
			    	location.href="/h5/product/pay/ali/returnjsp?total_fee="+totalPrice+"&out_trade_no="+data.orderId;  //跳转到支付成功页面
			    }
			});
		}
		
		
		//弹出优惠券信息
		 function showCoupons(){
	        	document.getElementById("coupons-page").style.display="block";
	        	/*if('${couponNum}' == '0'){
	        		document.getElementById("exits_coupons").style.display="none";
	        		document.getElementById("no_coupons").style.display="block";
	        	} */
	   }
		//优惠券选中点击
		$(".c-usable").click(function(){
			var $this = $(this);
			if($this.parent().attr("id") == "inexistent_coupons"){
				return; //可不用的优惠券点击返回不执行;
			}
			checkedCouponId = this.id;
			checkedCouponPrice = this.title; 
			if($this.hasClass("choiced")){
				//$this.removeClass("choiced"); //屏蔽 选中后 再点击 取消选中 
			}else{
				$(".c-usable").removeClass("choiced");
				$this.addClass("choiced");
			}
		})
		//不使用优惠券
		$("#cancel_coupons").click(function(){
			$(".c-usable").removeClass("choiced");
			$("#nonuse-coupons").show().prev().hide();
			//$("#coupons-page").hide();
			checkedCouponId = null;
		})
		//设置优惠券适用范围的高度自适应
		$(".c-range").each(function(i,v){
			if($(".c-range").eq(i).innerHeight() >= 20){
				var positionTop = parseInt($(".c-range").eq(i).css("top"));
				$(".c-range").eq(i).css("top",positionTop-8);
			}
		})
		$("#coupons-page").hide().css("visibility","visible");
		$("#inexistent_coupons").hide();
		//设置优惠券数量以及判断数量小于0的样式
		$(".coupons-ul").each(function(index,value){
			var $couponLi = $(".coupons-ul").eq(index).find("li");
			var payCouponCount = $couponLi.length;
			$(".pay_coupons_nav").find(".payCouponNum").eq(index).text(payCouponCount);
			if($couponLi && payCouponCount > 0){
				$(".coupons-ul").eq(index).find(".no-coupons").hide();
			}else{
				if(index == 0){
					$("#queding").hide();
					$("#fanhui").show();
					$("#cancel_coupons").hide();   //  无优惠券时，隐藏不使用优惠券的按钮
				}
				$(".coupons-ul").eq(index).find(".no-coupons").show();
			}
		})
		//优惠券 确认选中 ul
		function toBuyPage(){
			var checkedCoupons = null;
			var couponsList = document.getElementById("exits_coupons").getElementsByTagName("li");
			for(var i=0;i<couponsList.length;i++){
				if(couponsList[i].className == 'c-usable choiced'){
					checkedCoupons = "";
				}
			}
			if(checkedCoupons == null){
				document.getElementById("orderPrice").innerHTML = document.getElementById("now_price").innerHTML;
				document.getElementById("coupon-nums-p").innerHTML = "不使用优惠券 >";//$("#couponNum").val()+"张可用 >";
			    checkedCouponId = null;
				checkedCouponPrice = "0.00"; 
			}else{
				document.getElementById("coupon-nums-p").innerHTML = "-"+checkedCouponPrice +" >";
				document.getElementById("orderPrice").innerHTML = fomatFloat(document.getElementById("now_price").innerHTML - checkedCouponPrice,2);
				
				if(document.getElementById("orderPrice").innerHTML <= 0){
					document.getElementById("orderPrice").innerHTML=0;
				}
		    }
			 document.getElementById("coupons-page").style.display="none";
  	    }
		//返回按钮
		function goBackBuyPage(){
			$("#coupons-page").hide();
		}		
		//四舍五入，保留两位小数
	    function fomatFloat(src,pos){       
	         return Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);       
	    }
		
		//***************监听上一步，返回点击事件***********
		$(function(){
			var bool=false;  
            setTimeout(function(){  
                  bool=true;  
            },1500);  
			pushHistory();
			window.addEventListener("popstate", function(e) {
				var planId = '${planId}';
				if(bool && planId != null && planId != 0)  
                {  
				  location.href = "/h5/plan/share/"+planId+".html";//点击上一步返回时，直接返回到计划页面
                }else{
                  WeixinJSBridge.call('closeWindow');
                }
		}, false);
		function pushHistory() {
		    var state = {
		        title: "订单支付",
		        url: "#"
		    };
		   window.history.pushState(state, "订单支付", "#");
		}
		});
		//***************监听上一步，返回点击事件***********
		
		//设置优惠券展示页高度
		var windowHeight = $(window).innerHeight() - 105;
		$(".coupons-ul").height(windowHeight);
		
		//优惠券tab切换
		$(".pay_coupons_nav li").click(function(){
			var index = $(this).index();
			$(".pay_coupons_nav li").removeClass();	
			$(this).addClass("active");
			$(".coupons-ul").hide().eq(index).show();
		})
		
		//提示框点击隐藏
		$(".wait").click(function(){
			$(".modal").hide();
		})
		/* $(".modal").click(function(){
			$(this).hide();
		}) */
		
   </script> 
   <script type="text/javascript" src="${cdnPath}/js/h5/h5_pay.js"></script> 
</html>
