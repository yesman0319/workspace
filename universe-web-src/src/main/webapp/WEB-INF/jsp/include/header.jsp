<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="header">
    <div class="width">
        <a href="<c:url value="/index.html"/>"><img class="fl logo" src="<c:url value="/i/logo.png"/>" alt="精英计划"/></a>
        <ul class="fl nav">
            <%-- <li><a href="<c:url value="/index.html"/>" class="${defaultActive}">首页</a></li>
            <li><a href="<c:url value="/plans"/>" class="${planActive}"> 学习计划</a></li>
            <li><a href="<c:url value="/tpomock/html/index"/>" class="${tpomockActive}">模考</a></li>
            <li><a href="<c:url value="/docs"/>" class="${infoActive}">资料</a></li>
            <li><a href="<c:url value="/replays"/>"  class="${relayActive}">回放</a></li> --%>
        </ul>
        <c:if test="${not empty sessionScope.userInfo}">
	        <div class="user_nav fr">
	        	<%-- <div class="notices" style="float: left; margin-left: -80px;">
	                <a href="${basePath}/personal/messages" target="_blank" class="notices-icon">
	                   <i id="notices-count" class="notices-count">${sessionScope.messageCount}</i>
	                </a>
	            </div> --%>
	            <div class="user_avater fl"><img                     
	            	<c:if test="${userInfo.avatar==null||userInfo.avatar==''}">src="${cdnPath}/i/plan/def_ava.png"</c:if>
                    <c:if test="${userInfo.avatar!=null&&userInfo.avatar!=''}">src="<c:url value="${userInfo.avatar}"/>"</c:if> 
                 alt="头像"/></div>
	            <div class="nickname fl">
	            	<span class="text">
	                    <c:if test="${sessionScope.userInfo.nickname!=null and sessionScope.userInfo.nickname!=''}">${sessionScope.userInfo.nickname}</c:if>
                        <c:if test="${sessionScope.userInfo.nickname==null or sessionScope.userInfo.nickname==''}">${sessionScope.userInfo.phone}</c:if>
                    </span><span class="drop"></span>
	                <ul class="navList">
	                    <li><a href="<c:url value="/personal/plans"/>" target="_blank">个人中心</a></li>
	                    <li class="exit"><a href="<c:url value="/logout"/>" >退出</a></li>
	                </ul>
	            </div> 
	        </div>
        </c:if>
        <c:if test="${empty sessionScope.userInfo}">
	         <div class="fr lg" >
	            <a href="<c:url value="/login"/>" class="login fl" target="_self"><span>登录</span></a>
	            <a href="<c:url value="/register"/>" class="register fl" target="_self"><span>注册</span></a>
	        </div>
        </c:if>
    </div>
</div>
<script type="text/javascript">
 
function refreshMessageCount(){ 
	var porxy_url =  window.xiaoma.basePath+"/plan/proxy?proxyurl=";
	var user_id="${sessionScope.userInfo.id}";
	if(user_id==="")
		return;

	var message_api_url =window.xiaoma.messageApi; 
	var url = porxy_url+message_api_url+"/message/unread/"+user_id;

	
	$.ajax({
		url: url,
		type: 'get', 
		success:function(json) {   
        	var obj=JSON.parse(json);
        	var unreadCount = obj.count;
        	
        	if(unreadCount>0){ 
				$("#notices-count").text(unreadCount);
				$("#notices-count").show(); 
			}else{ 
				$("#notices-count").hide();
			}
        	 
		}
	});	
}
	 /* $(document).ready(function(){   
		 refreshMessageCount();
	    	setInterval("refreshMessageCount();",30000); //每隔15秒执行一次 
	    }); */
</script>