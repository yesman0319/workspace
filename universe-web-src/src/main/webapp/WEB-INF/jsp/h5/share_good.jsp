<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>${good.goodName}</title>
		<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
		<%@include file="../include/pub.jsp"%>
		<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
		<link rel="stylesheet" href="${cdnPath}/css/h5/h5_shopping_reset.css" />
		<link rel="stylesheet" href="${cdnPath}/css/h5/goods_show.css" />	
		<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
        <script type="text/javascript" src="${cdnPath}/js/h5/h5_share.js"></script>
		
	</head>
	<body>
	    <!--商品图片-->
		<div class="goodsPic">
                <c:choose>
			       <c:when test="${!empty good.imgUrl}">
			          <img src="${good.imgUrl}" alt="${good.goodName}"/>
			       </c:when>
			       <c:otherwise>
			              <img src="${cdnPath}/img/practice/book_img.png" alt="${good.goodName}"/>
			       </c:otherwise>
                </c:choose>
		</div>
		<!--商品图片-->
		
		<div class="gContent">
			<div class="gName mod">
				<h2>${good.goodName}</h2>
				<div id="teacherName">讲师:${good.teacherInfo.nameCn}</div>
				
				<div class="priceChange">
					<p class="nowPrice">
						<i class="price_icon"></i><span id="now_price">${minPrice}</span>
					</p>
					<span class="prevPrice" id="prev_price">${marketPrice}</span>
				</div>	
				<a class="show-qrcode" href="javascript:;">
					<img src="${cdnPath}/i/wappay_test/show_qrcode.png" />
				</a>
			</div>
			<div class="gInfo mod">
				<!--<h3>商品信息</h3>-->
				<ul>
					<!--简介说明-->
                    <c:forEach items="${good.goodTypeAttrList}" var="typeAttrMessage">
					    <li class="gLi">
		                   <p class="gTitle">${typeAttrMessage.attrName}</p>
		                   <c:if test="${fn:contains(typeAttrMessage.attrValues, 'http')}"><img alt="" src="${typeAttrMessage.attrValues}"/></c:if>
		                   <c:if test="${fn:contains(typeAttrMessage.attrValues, 'http') == false}"><div class="gDetail">${typeAttrMessage.attrValues}</div></c:if>
		                </li>
			        </c:forEach>
				</ul>
			</div>
		</div>
		<div id="margin-bottom"></div><!--底部兼容ios fixed问题 margin-bottom div-->
		
		<!--在浏览器打开提示蒙版-->
		<div id="hide" style="display: none;">
			<img src="http://static.yuzhoutuofu.com/images/hide.png" alt="指引箭头"/>
			 <p>点击右上角,请用浏览器打开</p>
		</div>
		
		<c:if test="${error != null}">
		 <a href="${cdnPath}/h5/product/pay/lists" class="goBuy a_demo_two">${error}</a> 
		</c:if>
		
		<c:if test="${good.goodStatus==0}">
			<!--立即购买-->
		    <a href="#" class="goBuy a_demo_two" onclick="buy()">立即购买</a>
		    <div class="qrcode-modal">
	    	<div class="qr-code-box">
	    		<span class="qrcode-close"></span>
	    		<img src="${cdnPath}/web/product/pay/share/qrcode?code_url=${codeUrl}" alt="二维码">
	    	</div>
		    </div>
	    </c:if>
	    
	</body>
	
	<script type="text/javascript">
	    
	function buy(){
	    //验证是否是在微信浏览器中打开
	    var sellPrice = document.getElementById('now_price').innerHTML;
	    var ua = window.navigator.userAgent.toLowerCase();
	    if(ua.match(/MicroMessenger/i) == 'micromessenger' && parseFloat(sellPrice) > 2000){  //如果是微信打开且价格 超过 2000，则提示用其他浏览器 打开
	    	$("#hide").show();
	    }else{
	    	location.href="${cdnPath}/h5/product/pay/${good.id}?callBack=1&outOrderId=1";
	    }
	}
	    
		var basePath = "${bathPath}";
		var lineLink = window.location.href;//这个是分享的网址
		var imgUrl = "${cdnPath}"+"/i/ic_share.png";//这里是分享的时候的那个图片
		var descContent = "精英计划-${good.goodName}";
		var share_title = "精英计划-${good.goodName}"; 
		var closeBtn = document.querySelector(".qrcode-close");
		var showQrcode = document.querySelector(".show-qrcode");
		var qrcodeModal = document.querySelector(".qrcode-modal");
		$(function(){
			share(lineLink,imgUrl,descContent,share_title);
		});
		
		closeBtn.onclick = function(){
			qrcodeModal.style.display = "none";
		}
		showQrcode.onclick = function(){
			qrcodeModal.style.display = "block";
		}
		
	</script>
</html>
