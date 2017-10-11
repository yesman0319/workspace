<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>个人中心-账户设置</title>
     <%@include file="../include/pub.jsp"%>
    <link rel="stylesheet" href="${cdnPath}/css/common.css"/>
    <link rel="stylesheet" href="${cdnPath}/css/userProfile.css"/>
    <link rel="stylesheet" href="${cdnPath}/js/lib/Jcrop/jquery.Jcrop.min.css"/>
</head>
<body>
<%@include file="../include/header.jsp"%>
<div class="layout">
    <div class="main">
		<%@include file="../include/leftMenu.jsp"%>
        <div class="right" id="right_box">
        <input type="hidden" id="type" value="${type}"/>
            <!--账户设置-->
            <div class="rightSide setting_div fl" >
                <p class="location"><a class="user_href" href="javascript:;">个人中心</a>><a class="setting_href"  href="javascript:;">账户设置</a>
                </p>
                <div class="tab">
                    <ul class="tab_list">
                        <li class="cur_tab">基本资料</li>
                        <li>头像设置</li>
                        <li>账号密码</li>
                    </ul>
                </div>
                <div class="xx">
                    <!--基本资料-->
                    <div class="set xxx1" >
                        <div class=" fl" style="position:absolute;top: 60px; left: 55px;font-size:16px;">昵称</div>
                        <div class=" fl" style="position:absolute;top: 60px; left: 127px;font-size:16px;">
							${userInfo.nickname}
                            <div class=" fl tu" id="nnn"
                                 style="position:absolute;top: 2px; right: -80px; color: #cccccc;font-size:16px;text-decoration: underline;cursor:pointer;">
                                <img src="${cdnPath}/i/user/pen.png"  style="position:absolute;left: -30px; top: 0px; width: 25px; height: 20px;"/>
                                修改
                            </div>
                        </div>
                        <div id="nnx" style="display: none">
                            <input class="input" id="nickname" value=""
                            style="width: 177px; top: 57px; left: 125px; font-size: 16px;" maxlength="12"/>

                            <div class="btnx" id="bconfirm"
                                 style="top: 59px; left: 330px;"
                                 onclick="updateProfile();">确认
                            </div>
                            <div class="btnx" id="bcancle"
                                 style="top: 59px; left: 450px;">取消
                            </div>
                        </div>

                        <div class="btnx" style="top: 407px; left: 135px; display: none">确认</div>
                        <div class="btnx" style="top: 407px; left: 255px; display: none">取消</div>
                    </div>
                    <!--头像设置-->
                    <div class="set" style="display:none;">
                        <div class="up">
                            <div class="up_ava fl oldAvatar"><img src="${userInfo.avatar}"></div>
                            <div class="up_area fl">
                                <h3>上传新头像</h3>
                                <p class="support">支持jpg、png、jpeg、bmp，图片大小5M以内</p>
								<label class="btn ava_btn" for="ava_file">
									更换头像
									<input id="ava_file" class="ava_file" type="file" name="myfiles" onchange="return ajaxFileUpload()" accept="image/*"/>
								</label>
                            </div>
                        </div>
                        <div class="show" style="display:none;">
                            <div class="ava_big fl">
                                <!--<img src="../i/user/ava_l.png" alt="我的头像"/>-->
                                <img src="${cdnPath}/i/user/ava_l.png" id="target" alt="Preview" />
								<input type="hidden" id="img" />
								 <input type="hidden" id="fileExt" />
                                <div id="preview-pane">
                                    <div class="preview-container">
                                        <img src="${cdnPath}/i/user/ava_l.png" class="jcrop-preview" alt="Preview" />
                                    </div>
                                    <div class="preview-container1">
                                        <img src="" class="jcrop-preview1" alt="Preview" />
                                    </div>
                                </div>
                            </div>
                            <div class="up_area fl">
                                <h3>预览效果</h3>
                                <!--<p class="pic">-->
                                    <!--<img src="../i/user/ava_m.png" alt="" class="fl ava_m"/>-->
                                    <!--<img src="../i/user/ava_s.png" alt="" class="fl ava_s"/>-->
                                <!--</p>-->
                                <div class="btns">
                                    <a href="javascript:;" id="save" class="btn fl save">保存</a>
                                    <a href="javascript:;" id="cancel" class="btn fl cancel">取消</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--账号密码-->
                    <div class="set xxx2" style="display: none">
                    	<table class="accountTable" border="0" cellspacing="" cellpadding="">
                    		<tr>
                    			<td class="col1">
                    				<div class=" gd t22 tl">手机号</div>
                    			</td>
                    			<td class="col2">
                    			<c:if test="${not empty userInfo.phone}">
                    				<div id="phone" class=" gd t22 tl">${userInfo.phone}</div>
                    			</c:if>
                    			<c:if test="${empty userInfo.phone}">
                    			    <div id="bindPhone" class=" gd t22 tl">绑定手机</div>
                    			</c:if>
                        			<!--未绑定手机的时候 使用此标签 <div id="bindPhone" class=" gd t22 tl">绑定手机</div>-->
                        			<div class="bpinputBox" style="display: none;">
                        				<div class="phoneCheck">
                        					<input id="phoneId" class="pswinput" placeholder="请输入手机号" />
                        					<span id="phoneError"></span>
                        				</div>
                        				<div class="phoneCheck" style="position: relative;">
                        					<input id="phoneCodeId" class="pswinput" placeholder="请输入验证码" />
                        					<div id="pyzm"  style="color: #39c075;cursor:pointer;text-decoration: underline;">
				                            	  发送验证码
				                            </div>
				                            <div id="pyzmm"></div>
                        					<span id="codeError"></span>
                        				</div>
                        				<div class="btnxBox">
			                            	<div id="bpconfirm" onclick="bindPhone()">立即绑定</div>
			                            	<div id="bpcancle">取消</div>
			                            </div>
                        			</div>
                    			</td>
                    		</tr>
                    		<tr>
                    			<td class="col1">
                    				<div class=" gd t22 tl">微信账号</div>
                    			</td>
                    			<td class="col2">
                        			<div id="wx_account">
                        				<c:if test="${empty userInfo.weixin_nickname }">未绑定微信</c:if>
                        				<c:if test="${not empty  userInfo.weixin_nickname }">${userInfo.weixin_nickname}</c:if>
                        			</div>
                    			</td>
                    		</tr>
                    		<tr>
                    			<td class="col1">
                    				<div class=" gd t22 tl">账号密码</div>
                    			</td>
                    			<td class="col2 pswTd">
                    			    <c:if test="${not empty userInfo.phone}">
		                    			<div class=" gd t18 tl" id="mn1" style="color:#00bb51; text-decoration: underline;cursor:pointer;">
				                         	   修改密码
				                       	</div>
			                       	</c:if>
			                        <c:if test="${empty userInfo.phone}">
		                    			<div class=" gd t18 tl" >
				                         	   未绑定手机号不能修改密码
				                       	</div>
			                       	</c:if>
			                        <div class="x1" style="display: none;">
			                        	<div class="codeNumBox">
			                        		<input class="pswinput" id="codeNum"
			                                   style="font-size: 14px;" placeholder="输入验证码"/>
				                            <div class=" gd t18 tl" id="yzm"  style="color: #39c075;cursor:pointer;text-decoration: underline;">
				                            	  发送验证码
				                            </div>
				                            <div class=" gd t18 tl" id="yzmm"></div>
			                        	</div>
			                            <input class="pswinput" id="pass"  style="width: 198px;font-size: 14px;" type="password"  placeholder="输入新密码"/> 
			                            <input class="pswinput" id="nextPass" style="width: 198px;font-size: 14px;" type="password"  placeholder="再次输入"/>
			                            <div class=" gd t18 tc" id="error"></div>
			                            <div class="btnxBox">
			                            	<div id="pconfirm" onclick="tijiao()">确认</div>
			                            	<div id="pcancle">取消</div>
			                            </div>
			                        </div>
		                        </td>
                    		</tr>
                    	</table>              
                    </div>
                </div>
                <div class="info_modal">
					<div class="info_dialog">
						<h2>
		 					提示
		 					<span class="close_btn"></span>
						</h2>
						<div class="info_tips" id="info_tips">
							<p>恭喜您，绑定成功</p>
							<p>初始登录密码为手机号后6位，请及时修改密码</p>
							<!--<p>修改成功！</p>使用此弹框并用此标签-->
						</div>
						<a href="javascript:;" id="info_confirm">
							知道了
						</a>
					</div>
		 		</div>
            </div>
        </div>
    </div>
</div>
<jsp:include page="../include/footer.jsp"></jsp:include>
<script type="text/javascript" src="${cdnPath}/js/lib/Jcrop/jquery.Jcrop.min.js"></script>
<script type="text/javascript" src="${cdnPath}/js/userProfile/ajaxfileupload.js"></script>
<script type="text/javascript" src="${cdnPath}/js/userProfile/userProfile.js"></script>
</body>
</html>