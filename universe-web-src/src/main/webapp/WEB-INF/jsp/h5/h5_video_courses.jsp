<%@ page language="java" contentType="text/html; charset=UTF-8"	pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no" name="viewport">
<meta content="yes" name="apple-mobile-web-app-capable">
<meta content="black" name="apple-mobile-web-app-status-bar-style">
<meta content="telephone=no" name="format-detection">
<meta content="email=no" name="format-detection">
<title>视频课程</title>
<%@include file="../include/pub.jsp"%>
		<link rel="stylesheet" href="${cdnPath }/css/reset.css" />
		<link rel="stylesheet" href="${cdnPath }/css/plan_detail.css" />
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
		<div class="download_tips">
			<span>下载精英计划APP, 查看更多学习计划</span>			
			<a href="<%=com.xiaoma.universe.common.utils.PropertiesUtils.getString("APP_DOWNLOAD_URL")%>" class="download_btn">下载</a>
		</div>
		<input type="hidden" id="courseId" value="${videocourses.id }"/>
		<input type="hidden" id="goodId" value="${videocourses.goodId }"/>
		<input type="hidden" id="lastPartId" value="${videocourses.lastPartId }"/>
		<input type="hidden" id="btnFlag" value="${videocourses.btnFlag }"/>
		<div class="banner">
			<img src="${videocourses.coverPhoto }" alt="${videocourses.name }"/>
		</div>
		<div class="content">
			<ul class="content_nav">
				<li class="active">
					<a href="javascript:;" class="tab">简介</a>
				</li>
				<li>
					<span class="cutLine"></span>
					<a href="javascript:;" class="tab">视频</a>
				</li>
			</ul>
			<div class="jianjie tContent" style="display: ;">
				<div class="courses_plan">
					<h3>${videocourses.name }</h3>
					<span class="people_num">
						<i class="people_icon"></i>
						<span id="people_count">${videocourses.totalView }</span>人在学
					</span>
					<span class="course_duration">
						<i class="duration_icon"></i>
						<span id="duration_count">${videocourses.totalClass }</span>节视频
					</span>
					<span class="teacher-name">
						<i class="people_icon"></i>
						讲师:<span id="teacher-name">
						<c:if test="${videocourses.teacher==null}">暂无</c:if>
        	 			<c:if test="${videocourses.teacher!=null}">${videocourses.teacher.nameCn } </c:if>
						</span>
					</span>
				</div>
				<ul class="plan_desc">
					<h2>
						<p class="greenBar"></p>
					课程简介
					</h2>
					<li>
						<span class="desc_words">${videocourses.infoH5 }
						</span>
					</li>
				</ul>
			</div>

			<div class="v_course tContent" style="display: none;">
				<c:forEach items="${videocourses.listVideoGroups }" var="groups"> 
				<div class="modd">
					<div class="h2_title">
						${groups.name }
						<!--<i class="d_arrows_icon"></i>  暂时不需要下拉箭头-->
					</div>		
					<ul>
						<c:forEach items="${groups.listParts }" var="parts">
							<li>
								<a class="partswatch" data-cansee="${parts.canSee}" href="/courses/h5/parts/${parts.id}.html?goodId=${videocourses.goodId}&status=${parts.canSee}">
									<img src="${parts.imgUrl}" />						
									<p class="v_course_name">
										${parts.name}
									</p>
									 
								</a>
							</li>
						</c:forEach>
					</ul>
				</div>
				</c:forEach>
			</div>
			</div>
			<c:if test="${videocourses.btnFlag==0}">
				<div class="buyft footer">
					<p class="price" style="width: 70%;">
						<i class="price_icon"></i>
						<span id="price">免费</span>
					</p>	
					<a href="/courses/h5/freejoin?goodId=${videocourses.goodId }&courseId=${videocourses.id }" class="pay_btn">加入课程</a>
				</div>
			</c:if>
			
			<c:if test="${videocourses.btnFlag==1 }">
			</c:if>
			
			<c:if test="${videocourses.btnFlag==2 }">
				<div class="buyft footer">
					<p class="price" style="width: 70%;">
						<i class="price_icon"></i>
						<span id="price">免费</span>
					</p>	
					<a href="/courses/h5/deljoin?premissionId=${videocourses.premissionId }&courseId=${videocourses.id }" class="pay_btn">加入课程</a>
				</div>
			</c:if>
			
			<c:if test="${videocourses.btnFlag==3 }">
				<div class="buyft footer">
					<p class="price" style="width: 70%;">
						<i class="price_icon"></i>
						<span id="price">${videocourses.price}</span>
					</p>	
					<%-- <a href="/courses/h5/parts/${videocourses.lastPartId }.html?goodId=${videocourses.goodId}" class="tiyan">免费体验</a> --%>
					<a href="/h5/product/pay/${videocourses.goodId }" class="pay_btn">购买课程</a>
				</div>
			</c:if>
			
			<c:if test="${videocourses.btnFlag==4 }">
			</c:if>
			
			<c:if test="${videocourses.btnFlag==5 }">
				<div class="buyft footer">
					<p class="price" style="width: 70%;">
						<i class="price_icon"></i>
						<span id="price">${videocourses.price}</span>
					</p>	
					<a href="/courses/h5/deljoin?premissionId=${videocourses.premissionId }&courseId=${videocourses.id }" class="pay_btn">加入课程</a>
				</div>
			</c:if>
			
			<c:if test="${videocourses.btnFlag==6 }">
				<div class="buyft footer">
					<p class="price" style="width: 70%;">
						<i class="price_icon"></i>
						<span id="price">${videocourses.price}</span>
					</p>	
					<a href="/h5/product/pay/${videocourses.goodId }" class="pay_btn">购买课程</a>
				</div>
			</c:if>
			
			<c:if test="${videocourses.btnFlag==7 }">
				<div class="buyft footer">
					<p class="price" style="width: 70%;">
						<i class="price_icon"></i>
						<span id="price">${videocourses.price}</span>
					</p>	
					<%-- <a href="/courses/h5/parts/${videocourses.lastPartId }.html?goodId=${videocourses.goodId}" class="tiyan">免费体验</a> --%>
					<a href="/h5/product/pay/${videocourses.goodId }" class="pay_btn">购买课程</a>
				</div>
			</c:if>
			
			<c:if test="${videocourses.btnFlag==8 }">
				<div class="buyft footer">
					<p class="price" style="width: 70%;">
						<i class="price_icon"></i>
						<span id="price" >${videocourses.price}</span>
					</p>	
					<a href="javascript:;" class="pay_btn">已购买</a>
				</div>
			</c:if>
			
			<c:if test="${videocourses.btnFlag==9 }">
				<div class="buyft footer">
					<p class="price" style="width: 70%;">
						<i class="price_icon"></i>
						<span id="price">${videocourses.price}</span>
					</p>	
					<a href="/courses/h5/deljoin?premissionId=${videocourses.premissionId }&courseId=${videocourses.id }" class="pay_btn">加入课程</a>
				</div>
			</c:if>
			<!--模态提示框-->
 			<div class="modal">
				<div class="dialog">
					<p class="tips_words">加入该课程</p>
					<p class="tips_detail">
						请加入后观看该课程
					</p>
					<ul>
						<li class="close"><a href="javascript:;">关闭</a></li>
					</ul>
				</div>
			</div>
		</div>
		<script>
			$(function(){
			//tab切换
				$(".content_nav li").click(function(){
					var index = $(this).index();
					$(".content_nav li").removeClass();	
					$(this).addClass("active");
					$(".tContent").hide().eq(index).show();
				})
			//模态提示框
/* 				$(".add_plan").click(function(){
					$(".modal").show();
				})
				$(".dialog").find("li").click(function(){
					$(".modal").hide();
				})
				$(".tiyan").on('click',function(){
					var lastPartId = $("#lastPartId").val();
					window.location.href = "/courses/h5/parts/"+lastPartId+".html";
				}); */
				
				/*$(".d_arrows_icon").click(function(){
					var $this = $(this);
					if($this.parent().next().children().length <= 4){
						return;
					}else{
						$this.toggleClass("u_arrows_icon");
						if($this.hasClass("u_arrows_icon")){
							console.log($this.parent().next())
							$this.parent().next().css("max-height","9999px");
						}else{
							$this.parent().next().css("max-height","");
						}
					}
				})----暂时不需要控制下拉箭头*/
			})
		</script>
	</body>
	<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
	<script type="text/javascript" src="${cdnPath}/js/h5/h5_share.js"></script>
	<script type="text/javascript">
		var courseName = "${videocourses.name }"
		var basePath = "${bathPath}";
		var lineLink = window.location.href;//这个是分享的网址
		var imgUrl = "${cdnPath}"+"/i/ic_share.png";//这里是分享的时候的那个图片
		var descContent = "我正在精英计划"+courseName+"学习课程，快来跟我一起学习";
		var share_title = courseName+"课程-精英计划"; 
		$(function(){
			share(lineLink,imgUrl,descContent,share_title);
			$(".partswatch").on('click',function(){
				var cansee = $(this).attr("data-cansee");
				var btnFlag =$("#btnFlag").val();
				if(cansee==3)
				{
					$(".modal").show();
					return false;
				}
				if(cansee==4)
				{
					$(".tips_detail").html("等待开始");
					$(".modal").show();
					return false;
				}
			});
			$(".close").on('click',function(){
				$(".modal").hide();
			});
		});
	
</script>
</html>
