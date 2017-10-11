<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html> 
	<head>
		<meta charset="UTF-8">
		<meta content="yes" name="apple-mobile-web-app-capable">
		<meta content="black" name="apple-mobile-web-app-status-bar-style">
		<meta content="telephone=no" name="format-detection">
		<meta content="email=no" name="format-detection">
		<title>词汇挑战</title>
		<%@include file="../../include/pub.jsp"%>
		<link rel="stylesheet" href="${cndPath}/css/reset.css" />
		<link rel="stylesheet" href="${cndPath}/css/h5/vocabulary_share.css" />
	</head>
    <body>
    	<div id="accpet-challenge" style="display: ;"><!--发起挑战页面-->
			<section id="user-infor">
				<p id="user-avatar">
					<c:if test="${ empty user.avatar}">
						<img  src="http://newbbs.b0.upaiyun.com/avater/avater.png" />
					</c:if>
					<c:if test="${! empty user.avatar}">
						<img  src="${user.avatar}" />
					</c:if>
				</p>
				
				<p id="user-nickname">
					<c:if test="${ empty user.nickname}">
						${ user.phone }
					</c:if>
					<c:if test="${ ! empty user.nickname}">
						${ user.nickname }
					</c:if>
				</p>
			</section>
			<article>
				<span>${user.nickname }</span>发起了词汇挑战攻击
			</article>
			<button id="go-challenge">立即应战</button>
			<a id="all-result" href="/h5/wordschallenge/result?shareId=${shareId }&unionId=${unionId }&headImgUrl=${headImgUrl}&nickname=${nickname}">查看总排行榜</a>
		</div>
		<div id="do-challenge" style="display: none;"><!--接受挑战并开始做题页面-->
			<div id="challenge-details">
				<ul>
					<li id="finished">
						<p>已完成</p>
						<p id="finished-num">5</p>
					</li>
					<li id="progress-box">
						<p id="time-count">20s</p>
						<div id="total-progress">
							<div id="done-progress"></div>
						</div>
					</li>
					<li id="unfinished">
						<p>未完成</p>
						<p id="unfinished-num">4</p>
					</li>
				</ul>
			</div>
			<c:forEach items="${sharevo.listDetail }" var="que">
				<section class="vol-question">
					 <c:if test="${empty que.wordsQuestionPO.image}">
						<p class="vol-word"style="margin-top:0.5rem; margin-bottom:1.5rem;" >${que.wordsQuestionPO.word }</p>
					</c:if>
					
					<c:if test="${!empty que.wordsQuestionPO.image}">
						<p class="vol-word">${que.wordsQuestionPO.word }</p>
						<div class="vol-stemimg">
							<img src="${que.wordsQuestionPO.image }" alt="图片示例">
						</div>
					</c:if>
					
					
					<ul class="vol-options-box">
						<input class="correct-data" type="hidden" value="${que.meaning }" />
						<input class="questionid-data" type="hidden" value="${que.id }" />
						<c:forEach items="${que.wordsQuestionPO.options }" var="option">
							<li>
								<span class="vol-options">${option.options }</span>
								<span class="vol-mean">${option.optionsWord }</span>
							</li>
						</c:forEach>
					</ul>
				</section>
			</c:forEach>
		</div>
		
		<div id="friends-result" style="display: none;"><!--朋友圈结果页-->
<%-- 			<div class="download_tips">
				<span>下载精英计划APP, 查看更多学习计划</span>			
				<a href="<%=com.xiaoma.universe.common.utils.PropertiesUtils.getString("APP_DOWNLOAD_URL")%>" class="download_btn">下载</a>
			</div> --%>
			<div class="vol-banner">
				<p id="my-rank">${sharevo.rank}</p>
				<p id="rank-compare">
					打败精英计划<span id="ranking-compare">${sharevo.precent}</span>%用户
					<a href="/h5/wordschallenge/result?shareId=${shareId }&unionId=${unionId }&headImgUrl=${headImgUrl}&nickname=${nickname}" target="_blank">查看总排名</a>
				</p>
<!--  				<p id="check-all-result">
					恭喜获得<span id="tContent"></span>词汇福袋人人领
					<a id="gettea">抢福袋喽</a>
				</p> -->
			</div>
			
			
			<c:if test="${fn:length(sharevo.threeList)>=1}">
				<section class="top-three" id="first-one"><!--第一名-->
					<div class="left-avtar">
						<img src="${sharevo.threeList[0].weixinHeadimgurl}" />
						<i class="crown"></i>
					</div>
					<div class="middle-detail">
						<p class="user-name">${sharevo.threeList[0].weixinNickname}</p>
						<p class="finish-count">
							完成<span>${sharevo.threeList[0].rightCount}</span>个单词
						</p>
						<p class="doing-detail">
							正确率<span>${sharevo.threeList[0].rate}</span>%&nbsp;&nbsp;&nbsp;
							速度<span>${sharevo.threeList[0].avgSpeed}</span>秒/题
						</p>
					</div>
					<div class="right-icon">
						<img src="${cndPath}/img/vol-challenge/the_first.png" />
					</div>
				</section>
			</c:if>
			
  			<c:if test="${fn:length(sharevo.threeList)>=2}">
				<section class="top-three" id="second-one"><!--第二名-->
					<div class="left-avtar">
						<img src="${sharevo.threeList[1].weixinHeadimgurl}" />
						<i class="crown"></i>
					</div>
					<div class="middle-detail">
						<p class="user-name">${sharevo.threeList[1].weixinNickname}</p>
						<p class="finish-count">
							完成<span>${sharevo.threeList[1].rightCount}</span>个单词
						</p>
						<p class="doing-detail">
							正确率<span>${sharevo.threeList[1].rate}</span>%&nbsp;&nbsp;&nbsp;
							速度<span>${sharevo.threeList[1].avgSpeed}</span>秒/题
						</p>
					</div>
					<div class="right-icon">
						<img src="${cndPath}/img/vol-challenge/the_second.png" />
					</div>
				</section>
			</c:if>
			
			
			<c:if test="${fn:length(sharevo.threeList)==3}">
				<section class="top-three" id="third-one"><!--第三名-->
					<div class="left-avtar">
						<img src="${sharevo.threeList[2].weixinHeadimgurl}" />
						<i class="crown"></i>
					</div>
					<div class="middle-detail">
						<p class="user-name">${sharevo.threeList[2].weixinNickname}</p>
						<p class="finish-count">
							完成<span>${sharevo.threeList[2].rightCount}</span>个单词
						</p>
						<p class="doing-detail">
							正确率<span>${sharevo.threeList[2].rate}</span>%&nbsp;&nbsp;&nbsp;
							速度<span>${sharevo.threeList[2].avgSpeed}</span>秒/题
						</p>
					</div>
					<div class="right-icon">
						<img src="${cndPath}/img/vol-challenge/the_third.png" />
					</div>
				</section>
			</c:if> 
			
 			<c:if test="${fn:length(sharevo.otherList)>0}">
				<ul class="normal-result"><!--普通排名-->
					<c:forEach items="${sharevo.otherList}" var="other" varStatus="status">
						<li>
							<img  class="left-avtar" src="${other.weixinHeadimgurl }" />
							<div class="middle-detail">
								<p class="user-name">${other.weixinNickname }</p>
								<p class="doing-detail">
									完成<span>${other.rightCount }</span>个单词&nbsp;
									正确率<span>${other.rate }</span>%&nbsp;
									速度<span>${other.avgSpeed }</span>秒/题
								</p>
							</div>
							<div class="right-num">
								${status.count+3}
							</div>
						</li>
					</c:forEach>
				</ul>		
			</c:if>	 
		</div>
		<div id="tips-modal">
			<div id="ready-count-tips">3</div>
		</div>
		<div id="dialog-tips-modal">
			<div id="dialog-tips">
				<p>完成</p>
				<p>正在计算结果</p>
			</div>
		</div>
		<div id="teachers-modal">
			<div id="teachers-qrcode">
				<p>扫码领取福袋</p>
				<div id="qrcode-wrap">
					<img id="tea-qrcode" src="#" />
				</div>
				<img id="close-qrcode" src="${cndPath}/img/wei-course/share-close.png" alt=""/>
			</div>
			
		</div>
 	</body>
	<script src="${cdnPath}/js/h5/lib/flexible.js"></script>
	<script type="text/javascript" src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"></script>
	<script type="text/javascript" src="${cdnPath}/js/h5/h5_share.js"></script>
	<script>
		var QuestionIndex = 0; //当前的下标
		var questionLength = $(".vol-question").length;//题的个数
		var selectOptions;//每一题的选项
		var correctAnswer;//正确答案;
		var selectFlag = true;
		var hasPostFlag = false;//即将提交占用标识;
		var doingRecord = [];//做题记录
		var vocabObj = {};//提交答案参数
		var correctNum = 0;//正确的题数
		var tt,ss;
		var durationTimer = 0;//做题用时
		var userNickName = "${nickname}";
		var userHeadImgUrl = "${headImgUrl}";
		var unionId = "${unionId}";
		var shareId = "${shareId}";
		var hasDone = "${sharevo.hasDone }";//0:已经做,1:未做过
		var basePath = window.xiaoma.basePath;
		
		var imgUrl = "${cdnPath}"+"/i/ic_share.png";//这里是分享的时候的那个图片
		var descContent ="你的好友正在等你哟"; 
		var share_title = "精英计划${user.nickname}向你发起了英语词汇挑战，立即去应战";
		var rateId = "${sharevo.rateId}";
		var teaId = "${sharevo.teaId}";
		
		var lineLink = window.location.href;//这个是分享的网址
		var share_url="${basePathNoPort}"+"/h5/wordschallenge/share/"+shareId+"?hasDone=0";			
		console.log(lineLink);
		console.log(share_url);
		$(function(){
			
			share(share_url,imgUrl,descContent,share_title);
			
			isShowResultPage();
			
			//立即挑战
			$("#go-challenge").click(function(){
				$("#tips-modal").show();
				threeCountDown(3) //3秒钟倒计时
				$("#accpet-challenge").hide().next().show();
				$(".vol-question").hide().eq(0).show();
			})
			//点击答题
			$(".vol-options-box").each(function(ii,vv){
				selectOptions = $(".vol-options-box").eq(ii).find("li");
				correctAnswer = $(".correct-data").eq(ii).val();
				doingRecord[ii] = $(".questionid-data").eq(ii).val() + "-";
				selectOptions.each(function(jj,item){
					if(selectOptions.eq(jj).find(".vol-mean").text() == correctAnswer){
						$(item).addClass("gg");
						return;
					}
				})
				selectOptions.click(function(){
					var $this = $(this);
					var selectResult = $this.find(".vol-mean").text();//选中的答案
					if(selectFlag){
						doingRecord[QuestionIndex] += selectResult;//记录做题结果
						if(selectResult != $(".correct-data").eq(QuestionIndex).val()){
							$this.addClass("rr").parent().addClass("hasSelect");
						}else{
							$this.parent().addClass("hasSelect");
							correctNum++;
						}
					}else{
						return;
					}
					selectFlag = false;
					tt = setTimeout(nextVolQuestion,1000)
				})
			})
			//初始化做题页面
			function initChallenge(){
				$(".vol-question").css("visibility","visible");
				countDowntimer(questionLength*3);
				$("#finished-num").text(QuestionIndex);
				$("#unfinished-num").text(questionLength);
				progressStatus(0);
			}
			function nextVolQuestion(){
				clearTimeout(tt);
				QuestionIndex++;
				$("#finished-num").text(QuestionIndex);
				$("#unfinished-num").text(questionLength - QuestionIndex);
				progressStatus(QuestionIndex/questionLength*100);
				
				if(QuestionIndex >= questionLength){
					//最后一题提交答案
					postAnswer();
				}else{
					selectFlag = true;
					$(".vol-question").hide().eq(QuestionIndex).show().addClass("lightSpeedIn").on("animationend",function(){
						$(this).removeClass("lightSpeedIn");
					});
				}
			}
			//提交答案
			function postAnswer(){
				if(hasPostFlag){
					return;
				}
				hasPostFlag = true;
				clearTimeout(ss);//清除计时器
				vocabObj.weixinNickname = userNickName;
				vocabObj.weixinHeadimgurl = userHeadImgUrl;
				vocabObj.weixinUnionid = unionId;
				vocabObj.shareId = shareId;
				vocabObj.results = doingRecord.join(";");
				vocabObj.time = durationTimer;
				$.ajax({
					type:"post",
					url:"/h5/wordschallenge/post/result",
					async:false,
					data:vocabObj,
					beforeSend:function(){
						//等待计算结果蒙版
						$("#dialog-tips-modal").show();
					},
					success: function(data){
						//history.go(0);
						var url="/h5/wordschallenge/share/"+shareId+"?hasDone=1";
						window.document.location.href=url;
					},
					error:function(){
						clearTimeout(ss);//清除计时器
						console.log("error")
					}
				});
			}
			//进入朋友圈结果页
			function isShowResultPage(){
				//是否做过，并判断进入朋友圈结果页
				if(hasDone == 0){
					$("#do-challenge").hide();
					$("#accpet-challenge").hide();
					$("#friends-result").show();
					$.ajax({ //请求老师微信二维码
						type:"get",
						url:"/h5/wordschallenge/gettearandom",
						async:false,
						dataType:'json', 
						data:{
							rateId:rateId,
							teaId:teaId
						},
						success: function(data){
							$("#tContent").text(data.teaContent);
							$("#qrcode-wrap").css({"background":"url("+data.teaUrl+") no-repeat","background-size":"cover"})
							$("#tea-qrcode").attr("src",data.teaUrl);
						},
						error:function(){
						}
					});
				}
			}
			//完成进度条
			function progressStatus(value){
				$("#done-progress").width(value + "%")
			}
			
			//倒计时
			function countDowntimer(num) {
			    if (num != 0) {
			    	durationTimer++;
			    	$("#time-count").html(num + "s");
			    ss = setTimeout(function () {
			            countDowntimer(num - 1)
			        }, 1000);
			    } else {
			    	postAnswer();
			    }
			}
			function threeCountDown(num){
				if (num != 0) {
			    	$("#ready-count-tips").html(num);
			    ss = setTimeout(function () {
			            threeCountDown(num - 1)
			        }, 1000);
			    } else {
			    	$("#tips-modal").remove();
			    	initChallenge();
			    }
			}
			//点击获取老师二维码
			$("#gettea").on("click",function(){
				$("#teachers-modal").show();
			});
			$("#close-qrcode").click(function(){
				$("#teachers-modal").hide();
			})
				
			
		});
		
		
	</script>
</html>