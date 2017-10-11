<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<%@ taglib uri="/padding" prefix="padding"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>个人中心-我的钱包</title>
     <%@include file="../include/pub.jsp"%>
    <link rel="stylesheet" href="${cdnPath}/css/common.css"/>
    <link rel="stylesheet" href="${cdnPath}/css/userProfile.css"/>
    <link rel="stylesheet" href="${cdnPath}/js/lib/Jcrop/jquery.Jcrop.min.css"/>
    <style type="text/css">

    </style>
</head>
<body>
<%@include file="../include/header.jsp"%>
<div class="layout">
    <div class="main">
		<%@include file="../include/leftMenu.jsp"%>
        <div class="right" id="right_box">
            <div class="rightSide wallet-div fl">
            	<p class="location"><a class="user_href" href="javascript:;">个人中心</a>><a class="down_href"
	               href="javascript:;">我的钱包</a>
	            </p>
				<div class="wallet-balance">
					
					<div class="wallet-balance-show">
						钱包余额：
						<span class="wallet-picon">&yen;</span>
						<span id="wallet-balance-show"><fmt:formatNumber value="${userWallet.balance }" pattern="#0.00"/></span>
					</div>
					<a id="wallet-charge-btn">
						充值
					</a>
				</div>
            	<div class="wallet-show-page">
					<table class="charge-records" border="1">
						<tr>
							<th>时间</th>
							<th>金额</th>
							<th>备注</th>
						</tr>
						<c:forEach var="item" items="${walletDetailList}">
							<c:if test="${item.inout==0 }">
							<tr class="for-charge">
								<td><fmt:formatDate value="${item.createDate}" pattern="yyyy-MM-dd HH:mm:ss"/></td>
								<td class="charge-money">
									+<span>${item.amount}</span>
								</td>
								<td class="charge-remark">
									${item.detail}
								</td>
							</tr>
							</c:if>
							<c:if test="${item.inout==1 }">
							<tr class="for-buying">
								<td class="charge-time"><fmt:formatDate value="${item.createDate}" pattern="yyyy-MM-dd HH:mm:ss"/></td>
								<td class="charge-money">
									-<span>${item.amount}</span>
								</td>
								<td class="charge-remark">
									${item.detail}
								</td>
							</tr>
							</c:if>
						</c:forEach>
						
						<tr class="no-records-tips" style="display: none;"> <!--没有充值记录时 显示此tr标签-->
							<td colspan="3">暂无记录</td>
						</tr>
						
					</table>
					
					<!-- 分页部分 -->
					<padding:padding pagintInfo="${paddingInfo}" /> 
                </div>
             	<div class="wallet-charge-page" style="display: none;">
             		<p class="charge-title">请选择充值金额</p>
             		<ul class="charge-range">
             			<c:forEach var="item" items="${userWallet.goods}">
             				<li data-value="${item.id}"><span class="wallet-picon">&yen;</span><fmt:formatNumber value="${item.localPrice}" pattern="#0.00"/></li>
             			</c:forEach>             			
             		</ul>
             		<div id="charge-tip" style="display: none;">请选择充值金额</div>
             		<div class="charge-btns">
             			<a id="confirm-charge" href="javascript:;">立即充值</a>
             			<a id="cancel-charge">取消</a>
             		</div>             		
             	</div>
             	
             	<!--支付成功或失败提示框-->	
		 		<div id="payResult_wait" class="payResult_modal" style="display: none;">
					<div class="payResult_dialog">
						<h2>
		 					产品购买
		 					<span class="close_btn"></span>
						</h2> 
							<span class="payResult_tips">请在新打开的页面完成支付</span>
							<a href="javascript:;" onClick="paySuccess();" class="pay_confirm" target="_self"> 已完成支付</a>
					</div>	
		 		</div> 
		 		
		 		<!--支付成功或失败提示框-->	
		 		<div id="payResult_fail" class="payResult_modal" style="display: none;">
					<div class="payResult_dialog">
						<h2>
		 					产品购买
		 					<span class="close_btn"></span>
						</h2>
							<span class="payResult_tips">未完成支付，请尝试重新支付</span>
							<a href="javascript:;" onClick="showBuyTip();" class="pay_confirm"> 重新支付</a> 
					 
					</div>	
		 		</div>
			</div>
             	
            </div>
        </div>
    </div>
</div>
<jsp:include page="../include/footer.jsp"></jsp:include>
<script type="text/javascript" src="${cdnPath}/js/lib/Jcrop/jquery.Jcrop.min.js"></script>
<script charset="utf-8" type="text/javascript" src="${cdnPath}/js/userProfile/userProfile.js"></script>
<script type="text/javascript">
	var chargeValue = "";//选中充值的参数
	var $walletSelect = $(".charge-range li");//各个充值面额
	//充值选择
	$walletSelect.click(function(){
		$walletSelect.removeClass("selectd");
		$(this).addClass("selectd");
		$("#charge-tip").hide();
		chargeValue = $(this).data("value");
		console.log(chargeValue);
	});
	//去充值按钮
	$("#wallet-charge-btn").click(function(){
		$(this).hide();
		$(".wallet-show-page").hide().next().show();		
	});
	//取消充值
	$("#cancel-charge").click(function(){
		$walletSelect.removeClass("selectd");
		$(".wallet-charge-page").hide().prev().show();
		$("#wallet-charge-btn").show();
		$("#charge-tip").hide();
		chargeValue = "";
	});
	//立即充值
	$("#confirm-charge").click(function(){
		if(chargeValue==""){
			$("#charge-tip").show();
			return ;
		}
		window.open('<c:url value="/wallet/charge.html"/>?good_id='+chargeValue);
		$("#payResult_fail").hide();
		$("#payResult_wait").show();
		
	});
	//点击关闭按钮清除蒙版
	$(".close_btn").click(function(){
		$(this).parent().parent().parent().hide();
	});
	function showBuyTip(){
		var out_order_id=$.cookie("OUT_ORDER_ID");
		var good_id=$.cookie("BUY_GOOD_ID");
		window.open('<c:url value="/wallet/charge.html"/>?good_id='+good_id+"&out_order_id="+out_order_id);		
	}
	
	function paySuccess(){
		var out_order_id=$.cookie("OUT_ORDER_ID");
		window.location.href='<c:url value="/personal/wallet.html"/>?out_order_id='+out_order_id+"&page_size=10";
	}
	$(function(){  
	 <c:if test="${paySuccess ==0 }">
		$("#payResult_fail").show();
		$("#payResult_wait").hide();
	</c:if>  
	});	
</script>
</body>
</html>