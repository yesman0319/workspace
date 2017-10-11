<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>${info.name} - 精英计划</title>
     <%@include file="../include/pub.jsp"%>
    <link rel="stylesheet" href="${cdnPath}/css/common.css"/>
    <link rel="stylesheet" href="${cdnPath}/css/info_detail.css"/>
</head>
<body>
<%@include file="../include/header.jsp"%>
<div class="layout">
    <div class="main">
        <!--面包屑-->
        <p class="location">
            <a href="${cdnPath}/">精英计划</a>&gt;
            <a href="${cdnPath}/docs">资料</a>&gt;
            <a href="${cdnPath}/docs/list?categoryId=${cate.id}">${cate.name}</a>&gt;
            <a class="cur" href="#">${info.name}</a>${ssss}
        </p>
        <div class="bd">
            <!--文章-->
            <div class="left fl">
                <div class="head"><input type="hidden" value="${info.id}" id="downId" name="downId"/>
                                  <input type="hidden" value="${info.type}" id="isfree" name="isfree"/>
                                   <input type="hidden" value="${flag}" id="isbuy" name="isbuy"/>
                    <i class="${info.fileContentType}"></i>
                    <h2 class="title1">${info.name}</h2>
                    <p class="doc-value">上传时间：<span class="date"><fmt:formatDate value="${info.createTime}" pattern="yyyy/MM/dd"/></span><i>|</i>文件类型：<span
                            class="format">${info.fileContentType}</span><i>|</i>下载次数：<span class="num">${info.download}</span>次<i>|</i>文件大小：<span
                            class="size">${info.fileSize}</span><i>|</i>资料简介
                            <c:if test="${fn:length(info.description)>0}"><span class="open">&or;</span><span class="close" style="display:none;">&and;</span></c:if>
                    <div class="desc">
                        <div style="position:relative;">
                            <p>${info.description}</p>
                            <span class="tri"></span>
                        </div>
                    </div>
                    </p>
                </div>
                <hr class="line"/>
                <!--WORD-->
       <div class="wrap">
                    <!--功能简介-->
          <div style="display:<c:if test='${info.fileContentType ne "rar"}'>none</c:if>">
                        <!--文章没有图片默认detail_default.png 有图从数据库读取-->
                        <img class="fl pic" style="margin-right:30px;" src="${cdnPath}/i/info/detail_default.png" alt="托福机经资料"/>
                        <h2>功能简介</h2>
                        <p class="fun_con">
                             ${info.description}
                        </p>
                        <c:if test="${fn:length(info.description)>115}"><p class="spre">展开<span class="ic_spre">&or;</span></p>
                        <p class="spre_desc" style="display:none;">收起<span class="ic_spre">&and;</span></p></c:if>
                        <div style="clear:both;"></div>
                        <hr class="xu"/>
                        <div style="height:200px;"></div>
                   </div>
         <c:if test='${info.fileContentType ne "rar"}'>
           <!--文章内容-->
	         <div style="position:absolute;clear:both;margin-left:-58px;margin-top:-30px;">
		        <a id="viewerPlaceHolder" style="width:786px;height:1110px;display:block"></a>
	         </div>
	         </c:if>
	         <div style="margin-top:1110px;height:1px;width:auto"></div>
	     <%--       <div class="article" style="display:<c:if test='${info.type==0}'>none</c:if>;margin-top:1110px;">
                    <div class="goOn">
                       <a class="load_btn"  href="" onclick="downloadInfo();return false">下载</a>
                         <p class="inner">
                         	<input class="cur_page" type="text" value="1"/>/
                          	<span class="total_page"></span>
                        </p>
                   </div>
                   <div class="end" style="display: none">
                       <p>阅读已结束，点击后即可下载</p>
                       <a class="load1" onclick="downloadInfo()">下载</a>
                   </div>
	            </div>
            <!--需要下载才可以预览资料提示去购买-->
                <div class="article article_buy" style="display:<c:if test='${info.type==1}'>none</c:if>;margin-top:1110px;" >
                        <div class="goOn" >
                            <p class="orange">需购买学习计划后才可下载</p>
                            <a class="load_btn" href="" onclick="downloadInfo();return false">下载</a>
                            <p class="inner">
                         		 <input class="cur_page" type="text" value="1"/>/
                          			<span class="total_page"></span>
                            </p>
                        </div>
                        <div class="end" style="display: none">
                            <p>阅读已结束，需购买学习计划后才可下载</p>
                            <a class="load1" onclick="downloadInfo()">下载</a>
                        </div>
                </div>
              </c:if> --%>
        </div>
     </div>
          <!--右侧资料推荐-->
           
            <div class="right fl">
                <!--不需要付费可以直接查看的资料对应右侧-->
                <div class="aside" style="display:<c:if test='${info.type==0}'>none</c:if>;">
                    <h2>相关资料推荐</h2>
                    <ul class="aside_list">
                       <c:forEach items="${dinfoList}" var="df">
                        <li>
                            <i class="ic_${df.fileContentType}"></i>
                           <a href="${cdnPath}/docs/${df.id}"><h3>${df.name}</h3></a> 
                            <p>下载：<span>${df.download}次</span>&nbsp;&nbsp;&nbsp;&nbsp;上传：<span><fmt:formatDate value="${df.createTime}" pattern="yyyy/MM/dd"/></span></p>
                        </li>
                        </c:forEach>
                    </ul>
                </div>
                <!--需要付费才可以查看的资料对应右侧-->
                <div class="plan" style="display:<c:if test='${info.type==1}'>none</c:if>;">
                    <h2>所属学习计划</h2>
                    <!--第一种显示方式-->
                    <c:forEach items="${plans}" var="plan" varStatus="i">
                    <c:if test="${i.index==0}"><input type="hidden" id="planId" value="${plan.id}"/></c:if>
                    <a href="${cdnPath}/plans/${plan.id}"><div class="con">
                        <!--学习计划无图选择默认图，有图从数据库读取-->
                        <img class="plan_pic fl" src="${plan.imageWebList}" alt="学习计划"/>
                        <div class="plan_desc fl">
                            <h2>${plan.name}</h2>
                            <p><i class="ic_num"></i><span class="num">${plan.learnNumber}</span>人在学</p>
                            <p><i class="ic_count"></i><span class="count">${plan.totalExercises}</span>题</p>
                        </div>
                    </div></a>
                    </c:forEach>
                    <!--第二种显示方式-->
                    <div class="con1" style="display:none;">
                        <img src="${cdnPath}/i/info/plan1_default.png" alt="学习计划"/>

                        <div class="con1_desc">
                            <p><i class="ic_num"></i><span class="num">2554</span>人在学</p>

                            <p><i class="ic_count"></i><span class="count">265</span>题</p>
                        </div>
                    </div>
                </div>
            </div>
      </div>
   </div>
   <!--    遮罩层 -->
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
            <a class="JS_pop_login" href="${cdnPath}/login"><span>去登录</span></a>
            <a class="JS_pop_mock"  target="_blank"><span>继续</span></a>
        </div>
    </div>
</div>
    <!--全文可免费阅读出现此提示-->
     <c:if test='${info.type==1 or flag eq true}'><div class="page_footer" style="display:;"><p><c:if test='${info.fileContentType ne "rar"}'><span class="cur_page">1</span>/<span class="total_page">1</span></c:if>
     <a class="load1" onclick="downloadInfo();return false">下载</a></p></div></c:if>
    <input type="hidden" value="${cdnPath}" id="basePath">
    <!--购买计划才可以出现此提示-->
    <c:if test='${info.type==0 and flag eq false}'><div class="page_footer page_footer_buy" style="display:;"><p><c:if test='${info.fileContentType ne "rar"}'><span class="cur_page">1</span>/<span class="total_page">1</span></c:if>
    <span class="text">需要购买学习计划后才可下载</span><a class="load1" href="${cdnPath}/plans/${planId}">去购买</a></p></div></c:if>
    <div id="goToBuy_modal" style="display:none;">
    <div class="modal_box">
        <h2 class="modal_title">提示<span class="modal_close"></span></h2>
        <span class="modal_tips">需要购买才能继续查看，去购买？</span>
        <p class="modal_btns">
            <a href="${cdnPath}/plans/${planId}" class="ok">去购买</a>
            <a href="" class="cancel">取消 </a>
        </p>
    </div>
</div>
    
    <%@include file="../include/footer.jsp"%>  
    <script type="text/javascript" src="${cdnPath}/js/paperflash/flexpaper_flash.js"></script>  
    <script src="http://pv.sohu.com/cityjson?ie=utf-8"></script>
    <script type="text/javascript" src="${cdnPath}/js/info/detail.js"></script>
    <script type="text/javascript">
    var fp = new FlexPaperViewer(
		 '${cdnPath}/js/paperflash/FlexPaperViewer',
		 'viewerPlaceHolder', { config : {
		 SwfFile : '${info.fileUrl}?_upt=${swt}',
		 Scale : 0.6, 
		 ZoomTransition : 'easeout',
		 ZoomTime : 0.5,
		 ZoomInterval : 0.2,
		 FitPageOnLoad : true,
		 FitWidthOnLoad : true,
		 PrintEnabled : false,
		 PrintToolsVisible: false,
		 FullScreenAsMaxWindow : false,
		 ProgressiveLoading : false,
		 MinZoomSize : 0.2,
		 MaxZoomSize : 5,
		 SearchMatchAll : false,
		 InitViewMode : 'Portrait',
		 ViewModeToolsVisible : false,
		 ZoomToolsVisible : false,
		 NavToolsVisible : false,
		 CursorToolsVisible : false,
		 SearchToolsVisible : false,
		 localeChain: 'zh_CN'
		 }
		 });
	
	function checkLook(){
			if($("#isfree").val()==1)
				return;
			if($("#isbuy").val()=='true')
				return;
		     $("#goToBuy_modal").show();
	}
	$("#goToBuy_modal").find(".modal_close").click(function(){
		location=location;
		$("#goToBuy_modal").hide();
	})
    </script>
</body>
</html>