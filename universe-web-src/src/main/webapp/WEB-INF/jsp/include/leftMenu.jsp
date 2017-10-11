<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

        <div class="leftSide fl">
            <div class="user_info ">
            	<div class="avatar">
           		    <img class="avatar" 
           		    	<c:if test="${userInfo.avatar==null||userInfo.avatar==''}">src="${cdnPath}/i/plan/def_ava.png"</c:if>
                    	<c:if test="${userInfo.avatar!=null&&userInfo.avatar!=''}">src="<c:url value="${userInfo.avatar}"/>" </c:if>
           		    alt="头像"/>
            		<a href="/personal/userinfo?type=resetart" class="changeAvatar_modal">更换头像</a>
            	</div>
                <div class="info fl mt10">
                    <span class="nickyname">
                        <c:if test="${userInfo.nickname!=null and userInfo.nickname!=''}">${userInfo.nickname}</c:if>
                        <c:if test="${userInfo.nickname==null or userInfo.nickname==''}">${userInfo.phone}</c:if>
					</span>
                    <p class="mt8"><i class="file_icon"></i><a class="change_file" href="/personal/userinfo?type=resetinfo">修改资料</a></p>
                    <p class="mt8"><i class="psw_icon"></i><a class="change_psw" href="/personal/userinfo?type=resetpw">账号密码</a></p>
                </div>
            </div>
            <ul class="menu">
                <li><a id="menu_myplan" class="menu_list" href="${basePath }/personal/plans"><i class="plan"></i>学习计划</a></li>
                <!--<li><a class="menu_list ${videocourseActive}" href="${basePath}/personal/videocourse"><i class="video"></i>视频课程</a></li>-->
                <li><a id="menu_exercise_history" class="menu_list" href="${basePath }/personal/exercises"><i class="practice"></i>练习历史</a></li>
                <!--<li><a class="menu_list ${downloadHistory}" href="${basePath }/personal/docs"><i class="down_his"></i>下载历史</a></li>-->
                <!--<li><a class="menu_list ${coupons}" href="${basePath }/coupons?fromType=web"><i class="coupons"></i>我的优惠券<span id="coupon-num"></span></a></li>-->
           		<!--<li><a class="menu_list ${walletActive}" href="${basePath }/personal/wallet.html?page_size=10"><i class="wallet"></i>我的钱包</a></li>-->
           		<!--<li><a class="menu_list" href="javascript:${basePath }/personal/docs;"><i class="kaoshen"></i>考神陪读</a></li>-->

            </ul>
            <a href="/logout" class="exit">退出登录</a>
            
            <script type="text/javascript">
            //***  查询可用优惠券数量  开始 ***/
	            $.ajax({
					url: "/coupons/numbers",
				    type: "get",
				    dataType:"json",
				    async:false,
				    success: function (data) {
				    	if(data.couponNum != 0){
				    		$("#coupon-num").html(" ("+data.couponNum+")");
				    	}
				    }
				});
            //***  查询可用优惠券数量 结束  ***/
            </script>
        </div>
