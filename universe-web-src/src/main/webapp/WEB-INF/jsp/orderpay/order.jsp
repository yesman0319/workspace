<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt" %> 
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>

<head>
<title>确认订单</title>
    <%@include file="../include/pub.jsp"%>
    <link rel="stylesheet" href="${cdnPath}/css/common.css"/>
    <link rel="stylesheet" href="${cdnPath}/css/order_confirm.css"/>     
    <!--百度统计代码-->
    <script>
		var _hmt = _hmt || [];
		(function() {
		  var hm = document.createElement("script");
		  hm.src = "//hm.baidu.com/hm.js?22fe330b8bf5f3b6daef2ad6864536cc";
		  var s = document.getElementsByTagName("script")[0]; 
		  s.parentNode.insertBefore(hm, s);
		})();
    </script>
</head>

<body>
<!-- start 导航 -->
<%@include file="../include/header.jsp"%>
<!-- end 导航 -->

<div class="layout">
    <div class="main fl">
        <div class="box1">
            <!--商品图片-->
	            <c:choose>
				       <c:when test="${!empty good.imgUrl}">
				          <img src="${good.imgUrl}" alt="${good.goodName}"/>
				       </c:when>
				       <c:otherwise>
				              <img src="${cdnPath}/i/index/plan6.png" alt="${good.goodName}"/>
				       </c:otherwise>
	            </c:choose>
             <!--商品图片-->
            
            <div class="desc">
                <h1>${good.goodName}<p class="lecturer">讲师：${good.teacherInfo.nameCn}</p></h1>
                
                <div class="con">
                    
                    <!-- 商品的时长，1个月，2个月，3个月 -->
                    <div class="desc_item" id="attrlist"> 
                        <span class="item_name fl">课程时长：</span>
                        <ul class="item_list fl">
                            <c:forEach items="${good.goodAttrList}" var="ga" varStatus="status">
							    <c:choose>
								   <c:when test="${status.index == 0}"> <!--设置li样式，默认选中第一个，根据循环次数判断-->
								     <li><a href="javascript:;" class="active" id="${ga.id}" name="${ga.price}" title="${ga.attrValue}">${ga.attrValue}</a></li>
								   </c:when>
								   <c:otherwise>
								    <li><a href="javascript:;" class="" id="${ga.id}" name="${ga.price}" title="${ga.attrValue}">${ga.attrValue}</a></li>
								   </c:otherwise>
								</c:choose>
				           </c:forEach>
                        </ul>
                    </div>
                    <!-- 商品的时长     结束-->
                    
                    <!-- 商品开始使用日期 -->
                    <div class="desc_item" id="userTimeList">
                        <span class="item_name fl">开始时间：</span>
                        <ul class="item_list fl">
                            <c:forEach items="${good.goodUseTimeList}" var="usertimes" varStatus="status">
							    <c:choose>
								   <c:when test="${status.index == 0}"> <!--设置li样式，默认选中第一个，根据循环次数判断-->
								     <li><a href="javascript:;" class="active" name="<fmt:formatDate value="${usertimes.userTime}" pattern="yyyy-MM-dd"/>"><fmt:formatDate value="${usertimes.userTime}" pattern="yyyy-MM-dd"/></a></li>
								   </c:when>
								   <c:otherwise>
								     <li><a href="javascript:;" class="" name="<fmt:formatDate value="${usertimes.userTime}" pattern="yyyy-MM-dd"/>"><fmt:formatDate value="${usertimes.userTime}" pattern="yyyy-MM-dd"/></a></li> 
								   </c:otherwise>
								</c:choose>
			               </c:forEach>
                        </ul>
                    </div>
                    <!--商品开始使用日期     结束-->
                    
                </div>
               <div>
             </div>
            </div>
        </div>
        <div class="box2">
            <h2><p>课程介绍</p></h2>
            <ul class="box2_list">
             <!--计划简介，适合对象，使用目标-->
               <c:forEach items="${good.goodTypeAttrList}" var="typeAttrMessage">
					    <li>
		                   <p class="title">${typeAttrMessage.attrName}</p>
		                   <c:if test="${fn:contains(typeAttrMessage.attrValues, 'http')}"><center><img style="width:97%;" alt="" src="${typeAttrMessage.attrValues}"/></center></c:if>
		                   <c:if test="${fn:contains(typeAttrMessage.attrValues, 'http') == false}"><div class="para">${typeAttrMessage.attrValues}</div></c:if>
		               </li>
			    </c:forEach>
            </ul>
        </div>
    </div>
    
    <div class="side fl">
        <h2><p>请确认商品信息</p></h2>
        <div class="box3">
            <div class="it ite">商品名称：<span class="course_name">${good.goodName}</span></div>
            <div class="it">商品单价：<span class="course_price" id="price">${good.localPrice}</span><span class="it_yuan">&yen;</span></div>
            <div class="it item">优&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;惠：<span class="course_cou" id="course_cou">-</span></div>
            <div class="order-coupon" id="couponList">
                <p class="it">使用优惠券：</p>
                <!--没有优惠券时显示-->
                <div class="no-coupon" id="NoCoupon">无可用优惠券</div>
               
                <!--有优惠券时显示-->
                <c:forEach items="${couponList}" var="coupon">
					     <div class="order-coupon-item">
		                    <span class="coupon-item-ic" id="${coupon.id}" title="${coupon.facePrice}"></span>
		                    <span class="coupon-item-price"><i>&yen;</i>${coupon.facePrice}</span>
		                    <span class="coupon-item-title" title="${coupon.couponName}">${coupon.couponName}</span>
		                    <span class="coupon-item-date"><fmt:formatDate value="${coupon.endTime}" pattern="yyyy-MM-dd"/>到期</span>
                          </div>
			    </c:forEach>
            </div>
        </div>
        <div class="it total">应付总额：<span class="total_price" id="shouldpay">${good.localPrice}</span><span class="total_yuan">&yen;</span></div>
        <div class="button"><button id="buy">立即支付</button></div>
    </div>
</div>
<div id="payTip">
    <div class="tip-layout">
        <span class="tip-status"></span>
        <p class="tip-text">支付成功啦啦啦啦啦啦啦 ${couponError}</p>
    </div>
</div> 
<!-- 异常信息  -->
<input type="hidden" id="error" value="${error}">
<input type="hidden" id="selectedCouponPrice" value="">
<input type="hidden" id="categoryId" value="${categoryId}">
<input type="hidden" id="callBackPrams" value="${callBackPrams}">

<input type="hidden" id="categoryType" value="${categoryType}">

<!-- start footer  -->
<%@include file="../include/footer.jsp"%>
<!-- start footer  -->

<script type="text/javascript">
	 function planDetail(){
		var categoryType = document.getElementById("categoryType").value;
		var callBackPrams = document.getElementById("callBackPrams").value;
		$("#payTip").find(".tip-layout ").hide();
		if(categoryType != null){
				if(callBackPrams != null){
					var cbp = callBackPrams.split(",");
					if(cbp != null && cbp.length >0){
						for(var i=0;i<cbp.length;i++){
							var cp = cbp[i];
							if(categoryType == 3){
								location.href="/plans/"+cp;
							}else if(categoryType == 4){
								location.href="/courses/"+cp;
							}
							return;
						}
					}
				}
		}
	}  
	function nowPage(){
		/* $("#payTip").find(".tip-layout ").hide();  */
		location.href="/web/product/pay/get?goodId=${good.id}&categoryType="+document.getElementById("categoryType").value;
		
	}  
	var couponBuyStatus = "${couponStatus}";
	 if(couponBuyStatus == -1){
		 window.setTimeout(nowPage,3000); 
		$("#payTip").find(".tip-layout ").removeClass("tip-layout-success").find(".tip-text").text("${couponError}");
		$("#payTip").show(); 
	}else if(couponBuyStatus == 1){
		window.setTimeout(planDetail,3000); 
		$("#payTip").find(".tip-layout ").addClass("tip-layout-success").find(".tip-text").text("支付成功！");
		$("#payTip").show();
	} 
	 couponBuyStatus=null;
    var error = document.getElementById("error").value;
    if(error != null && error != ""){
    	alert(error);
    	window.history.back(-1); 
    }
    
    var attrlist = document.getElementById("attrlist").getElementsByTagName("a");
    var price = document.getElementById("price").innerHTML;
    
    //初次加载页面时 
    if(null != attrlist && attrlist.length != 0){  //如果有课程类型  1个月，2个月，3个月等
    	document.getElementById("price").innerHTML = Number(price)+Number(attrlist[0].name);  //总价=商品总价+基价
        document.getElementById("shouldpay").innerHTML = Number(price)+Number(attrlist[0].name);  //总价=商品总价+基价
        $.cookie('ATTR_VAlUE', attrlist[0].title);            //初始化 选中 第一个时长 ，如“1个月”
        $.cookie('ATTR_ID', attrlist[0].id);                  //选中的 选中 第一个"时长id" 
    }else{
    	$.cookie('ATTR_VAlUE', '');
    	$.cookie('ATTR_ID', ''); 
    	document.getElementById("attrlist").style.display="none";
    }
    
    //初次加载页面时   时长 1个月，2个月，3个月等
	for(var i=0;i<attrlist.length;i++){
		attrlist[i].onclick=function(){
	        for(var i=0;i<attrlist.length;i++){
	        	attrlist[i].className=""
	        }
	        this.className="active";
	        
	        document.getElementById("price").innerHTML = fomatFloat(Number(price)+Number(this.name),2);      //总价=商品总价+基价
	        /* document.getElementById("shouldpay").innerHTML =  */
	        var p=fomatFloat(Number(price)+Number(this.name)-$("#selectedCouponPrice").val(),2);  //总价=商品总价+基价
	        if(p <= 0){
		  	    document.getElementById("shouldpay").innerHTML = 0;
	  	    }else{
		  	    document.getElementById("shouldpay").innerHTML = p;
	  	    }
	        $.cookie('ATTR_VAlUE', this.title);                //选中的 时长 ，如“2个月”
	        $.cookie('ATTR_ID', this.id);                      //选中的 "时长id"
	    }
	}
	
	var userTimeList = document.getElementById("userTimeList").getElementsByTagName("a");
    if(null != userTimeList && userTimeList.length != 0){ 
    	$.cookie('LEARN_START_TIME', userTimeList[0].name);   //初始化 选中第一个 “开始使用时间”
    }else{
    	$.cookie('LEARN_START_TIME', '');
    	document.getElementById("userTimeList").style.display="none";
    }
	
	for(var i=0;i<userTimeList.length;i++){ 
		userTimeList[i].onclick=function(){
	        for(var i=0;i<userTimeList.length;i++){
	        	userTimeList[i].className="";
	        }
	        this.className="active";
	        $.cookie('LEARN_START_TIME', this.name);          //选中的 “开始使用时间”
	    }
	}
	
	//***************优惠券**********开始*******************
	    var couponList =  $('.order-coupon-item');
	    if(null != couponList && couponList.length != 0){     //如果有优惠券
	  	    $.cookie('COUPON_ID', couponList[0].getElementsByTagName("span")[0].id); //获取第一个优惠券的id
	  	    couponList[0].getElementsByTagName("span")[0].className="coupon-item-ic selected"; //选中第一个优惠券
	  	    document.getElementById("selectedCouponPrice").value=couponList[0].getElementsByTagName("span")[0].title;
	  	    document.getElementById("course_cou").innerHTML = "-"+couponList[0].getElementsByTagName("span")[0].title;
	  	    var p = fomatFloat(document.getElementById("shouldpay").innerHTML -  couponList[0].getElementsByTagName("span")[0].title,2);
	  	    if(p <= 0){
		  	    document.getElementById("shouldpay").innerHTML = 0;
	  	    }else{
		  	    document.getElementById("shouldpay").innerHTML = p;
	  	    }
	  	    
	  	    document.getElementById("NoCoupon").style.display="none"; //如果有优惠券，则隐藏无优惠券的提示
	     }else{
		    document.getElementById("NoCoupon").style.display="block";  //如果有优惠券，则显示无优惠券的提示
	    }
	    
	    
	    for(var i=0;i<couponList.length;i++){
	    	couponList[i].getElementsByTagName("span")[0].onclick=function(){
	    		if(this.className == "coupon-item-ic selected"){  //取消选中
		        	this.className = "coupon-item-ic";
		        	$.cookie('COUPON_ID', "");
		        	document.getElementById("selectedCouponPrice").value = "";
		        	document.getElementById("course_cou").innerHTML = "";
		        	document.getElementById("shouldpay").innerHTML = document.getElementById("price").innerHTML;
		        	return ;
		        }
	    		
	    		for(var k=0;k<couponList.length;k++){
		        	couponList[k].getElementsByTagName("span")[0].className="coupon-item-ic";
		        }
		        
		        this.className="coupon-item-ic selected";
		        
		        $.cookie('COUPON_ID', this.id); //获取选中的优惠券id
		        
		        document.getElementById("selectedCouponPrice").value = this.title;
		        document.getElementById("course_cou").innerHTML = "-"+this.title;
		  	    var p =	fomatFloat(document.getElementById("price").innerHTML -  this.title,2);
		  	    if(p <= 0){
			  	    document.getElementById("shouldpay").innerHTML = 0;
		  	    }else{
			  	    document.getElementById("shouldpay").innerHTML = p;
		  	    }
		    }
		}
	    
	    
	    //四舍五入，保留两位小数
	    function fomatFloat(src,pos){       
	         return Math.round(src*Math.pow(10, pos))/Math.pow(10, pos);       
	    }
     //***************优惠券**********结束 *******************
  
	//点击  购买 时，调到微信支付
	buy.onclick=function(){
		var p =  document.getElementById("shouldpay").innerHTML;
		if(p <= 0){
			$.cookie('BUY_GOOD_NAME', '${good.goodName}');         //商品名称
			$.cookie('BUY_GOOD_ID', '${good.id}');                 //商品id
			$.cookie('OUT_ORDER_ID', '${outOrderId}');             //外部订单号  计划卡片或视频课程
			$.cookie('CALL_BACK', '${callBack}');                  //回调函数
			$.cookie('RECOMMENT_PERSION', '${recommentPersion}');                 // 推荐人
			$.cookie('CHECK_PRICE', document.getElementById("shouldpay").innerHTML);  // 应付款
			$.cookie('BUY_GOOD_PAYMENT_TYPES', '${good.supportPaymentTypes}'); 
	    	location.href="/web/product/pay/coupon/buy?categoryType="+document.getElementById("categoryType").value;
		}else{
			$.cookie('BUY_GOOD_NAME', '${good.goodName}');         //商品名称
			$.cookie('BUY_GOOD_ID', '${good.id}');                 //商品id
			$.cookie('OUT_ORDER_ID', '${outOrderId}');             //外部订单号  计划卡片或视频课程
			$.cookie('CALL_BACK', '${callBack}');                  //回调函数
			$.cookie('RECOMMENT_PERSION', '${recommentPersion}');                 // 推荐人
			$.cookie('CHECK_PRICE', document.getElementById("shouldpay").innerHTML);  // 应付款
			$.cookie('BUY_GOOD_PAYMENT_TYPES', '${good.supportPaymentTypes}'); 
	    	location.href="/web/product/pay/wx";
		}
    } 
	
</script>
</body>
</html>