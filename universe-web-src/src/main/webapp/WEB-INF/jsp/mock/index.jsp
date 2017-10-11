<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<c:set var="sysTime" value="<%=System.currentTimeMillis() %>"/>
<!doctype html>
<html>
<head>
<%@include file="../include/pub.jsp"%>
<meta charset="utf-8">
<title>TPO在线模拟--精英计划中心</title>
<link rel="stylesheet" href="../stylesheets/public.css">
<link rel="stylesheet" href="../../css/common.css"/>
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
<style>
.s_tabs{top:39px;width:104px;min-height:123px;background:#f3f3f3;position:absolute;border:1px solid #d0d0d0;border-top:none;text-align:center;z-index:999;font-size:13px;}
.s_tabs li{height:41px;line-height:41px;cursor:pointer;width:96px;}
.pop_level2{margin-left:307px;margin-top:21px;background-color:#3b3b3b;color:#fff;}
.s_tabs li:hover{background:#000;color:#509bfd !important;}
.caret{margin-left:-43px;display:inline-block;width:0;height:0;margin-left:2px;vertical-align:middle;border-top:4px solid;border-right:4px solid transparent;border-left:4px solid transparent;}
.back{position:absolute;background:rgb(0, 0, 0) none repeat scroll 0% 0%;width:55px;height:32px;line-height:31px;top:59px;float:right;left:1110px;}
</style>
<body>
<%@include file="../include/header.jsp"%>
<div class="m-mock f-cb">
    <div class="mock-type f-cb">
        <div class="mock-tit">类型：</div>
        <ul class="mock-box f-cb">
            <li><a data-type="complete">整套</a></li>
            <li><a class="on" data-type="reading">阅读</a></li>
            <li><a data-type="listening">听力</a></li>
            <li><a data-type="speaking">口语</a></li>
            <li><a data-type="writing">写作</a></li>
            <li><a style="margin-left: 574px" href="${basePath }/tpomock/html/result"><i class="practice"></i>模考记录</a></li>
        </ul>
    </div>
    <div class="mock-topic f-cb">
        <div class="mock-tit">选择TPO：</div>
        <ul class="mock-box f-cb">
           <c:forEach items="${tpolist}" var="tpo" varStatus="i">
            <li><a <c:if test='${i.index==0}'>class="on" id="firstId"</c:if> data-tpoid="${tpo.id}">${tpo.seqNum}</a></li>
           </c:forEach>
        </ul>
    </div>
    <div class="mock-on f-cb">
        <div class="mock-tit">选择TPO：</div>
        <ul class="mock-box mock-choice f-cb">
            <li>
                <span class="mock-chapt">TPO 34</span>
                <span class="mock-section">阅读</span>
            </li>
        </ul>
    </div>
    <div class="clear"></div>
    <a class="mock-btn JS_startMock" target="_blank">开始模考</a>
</div>
<!-- 遮罩层 -->
<div class="mask-bg"></div>
<div class="m-pop m-pop-02 m-pop-login">
    <div class="pop-hd">
        <i class="pop-tit-icon"></i>
        <h3 class="pop-tit">Warning！</h3>
        <i class="pop-close JS_pop_close"></i>
    </div>
    <div class="pop-bd">
        <div class="pop-cnt"><div class="pop-icon"></div>非登录用户不能保存记录！</div>
        <div class="pop-btn">
            <!-- <a class="JS_pop_login" href="http://test.exercise.liuyang.com/html/login.html"><span>去登录</span></a> -->
            <a class="JS_pop_login" href="javascript:;"><span>去登录</span></a>
            <a class="JS_pop_mock" href="javascript:;" target="_blank"><span>继续</span></a>
        </div>
    </div>
</div>
<jsp:include page="../include/footer.jsp"></jsp:include>
<script src="../javascripts/util.js?_=${sysTime}" ></script>
<script src="../javascripts/xmbase.js?_=${sysTime}"></script>
<script src="../javascripts/index/index.js?_=${sysTime}"></script>
</body>
</html>
