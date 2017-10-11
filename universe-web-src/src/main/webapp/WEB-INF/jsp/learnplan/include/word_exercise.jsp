<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<%@ taglib prefix="padding" uri="/padding" %>
 
<link rel="stylesheet" href="../css/common.css" />
<link rel="stylesheet" href="../css/preview.css" />
    	
 <!--中间内容模块开始-->
		<div class="pre-box">
			<p class="pre-title">
				<img src="../i/preview/list-pic.png"> <!--正式路径还用这个就可以 》》》   src="${basePath}/i/list-pic.png"  -->
				<span class="pre-list-title">${currentExercise.moduleName }&nbsp;${currentExercise.originName }</span>
				<span  class="pre-card-title" style="display: none;">${currentExercise.moduleName }&nbsp;${currentExercise.originName }</span>
				 
			</p>
			<div class="pre-banner">
				<a id="wordListLenVal_list" class="bleft">
					单词列表&nbsp;<span class="vocaNum">${wordTotal}</span>个
				</a>
				
				<a id="wordListLenVal" class="bleft"> 
				</a>
				
				<img src="../i/preview/card_img.png"  id="pre-cards" class="switch-btn"/><!--点击进入卡片练习-->
				<img src="../i/preview/wordlist_img.png" id="pre-lists" class="switch-btn" style="display:none"/><!--点击进入列表练习-->
			</div>
			<!--词汇列表-->
			<ul class="pre-main">
				   <c:forEach items="${words }" var="word" varStatus="status">
				   <li class="pre-mian-list" data-id="${word.id }">
					 <a href="javascript:;">		
								<div class="voca-wrap">
									<span class="vocab">${word.wordEn }</span>
									<span class="soundmark">${word.wordSymbol }</span>
								</div>
								
								<span class="shiyi">${word.wordValue }</span>
								<c:if test="${not empty word.audioUrl}">
									<i class="horn_icon">
										<audio class="pre-audio" src="${word.audioUrl }" preload="auto">您的浏览器不支持audio标签</audio>
									</i>
								</c:if>
								
					</a>
				</li>
			</c:forEach> 
				 
				<!--列表页完成-->
				<p id="wordListFinish" class="list-btn-box" style="display: none;">
					没有单词啦，点击<a href="#" id="list-done-btn">完成</a>代表您已经完成学习
				</p>
				
				<!-- 分页部分 -->
				<padding:padding pagintInfo="${paddingInfo}" /> 
    
			</ul>
			
			<!--词汇卡片-->
			<div class="pre-main-card" style="display: none;">
				<div class="cbanner"> 
					<i id="card-horn-audo" class="card-horn">
						<audio id="card-audio" src="#" preload="auto">您的浏览器不支持audio标签</audio>
					</i>
					
					<img src="../i/preview/switch_off.png" id="cardoff" class="c-switch"/>
					<img src="../i/preview/switch_on.png" id="cardon" class="c-switch" style="display: none;"  />
				</div>
				<div id="word_card_bg" class="card-bd">
					<ul>
						<li id="prev-btn"><i class="larrow_icon"></i></li>
						<li id="next-btn"><i class="rarrow_icon"></i></li>
					</ul>
					<p id="word_en" class="c-voca" style="display: none;">N/A</p>
					<p id="word_soundmark" class="c-soundmark" style="display: none;">N/A</p>
					<a class="c-shiyi-btn">显示释义</a>
					<p id="word_cn" class="c-shiyi" style="display: none;">N/A</p>
				</div>
				<div id="wordCardFinish" class="card-btn-box" style="display: none;">
					<button  id="card-done-btn">完成</button>
				</div>
			</div>
			
		</div>
		<!--中间内容模块结束-->
		<script>
		
			var wordDataList = ${wordDataList};
			$(function(){
				var groupId = "${currentExercise.levelOne}";
				var xm_planDayId = "${dayInfo.dayId}";
				var xm_exerciseId = "${currentExercise.id}"; 
				var date=new Date($.ajax({async: false}).getResponseHeader("Date"));
				var xm_startTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
				var xm_endTime;

				var $switchOn = $("#cardon"),
					$showShiyiBtn = $(".c-shiyi-btn"),
					$switchOff = $("#cardoff"),
				    showMark = 1;//1为off  2为显示on
				var $card = $("#pre-cards"),$list = $("#pre-lists"); 
				var $audioBox = $(".horn_icon");//音频单词列表
				var audioList = document.getElementsByTagName("audio");//原生js遍历所有音频节点
				var $audio = $(".pre-audio");//JQ所有音频节点
				var $cardAudio = $("#card-audio");//卡片页音频节点
				var curIndex=0;
				var cardCurIndex=0;
				var totalPage = ${paddingInfo.totalPage};
				var pageNow = ${paddingInfo.currentPage};
				$(".switch-btn").on("click",onSwitchBtnClick); //列表页切换单词卡
				$(".c-switch").on("click",onCSwitchClick); //卡片页on/off开关
				$(".card-horn").on("click",onCardAudioPlayClick);//卡片页音频点击
				$(".pre-mian-list").on("click",goToCard);//列表页点击每一列进入对应卡片;
				$("#prev-btn").on("click",onPrevBtnClick); 
				$("#next-btn").on("click",onNextBtnClick); 
				$("#word_card_bg").mouseover(onMouseOver); 
				$("#word_card_bg").mouseout(onMouseOut); 
				$("#list-done-btn").on("click",onWordFinishBtnClick);
				$("#card-done-btn").on("click",onWordFinishBtnClick);
				if(totalPage == pageNow){
					$("#wordListFinish").show();
				}else{
					$("#wordListFinish").hide();
				}
				
				audioInit();//初始化音频播放
				cardInit();		
				//listPlay(0);

				function onWordFinishBtnClick(){
					var date=new Date($.ajax({async: false}).getResponseHeader("Date"));
					xm_endTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
					 
					$.ajax({
						url: window.xiaoma.basePath+"/plan/proxy?proxyurl=${apiUrl}/word/result/save",
						type: 'post',
						contentType: "application/json",
						data: JSON.stringify({
							"wordGroupId":groupId,
							"planDayId":xm_planDayId,
							"exerciseId":xm_exerciseId,
							"startTime":xm_startTime,
							"endTime":xm_endTime
						}),
						success:function(json) { 
							console.log(json);
							exerciseApi.updateListItem();
							window.location.href = window.xiaoma.basePath+"/exercises/inplan?planid=${planid }&dayid=${dayInfo.dayId  }&exerciseid=${currentExercise.id }"
						}
					}); 
				}
				
				function onMouseOver(){ 
					if(cardCurIndex<=0){ 
						$("#prev-btn").hide();
					}else{ 
						$("#prev-btn").show(); 
					}
					if(cardCurIndex>=(wordDataList.length-1)){ 
						$("#next-btn").hide();
					}else{
						$("#next-btn").show();  
					}
				}
				function onMouseOut(){  
						$("#prev-btn").hide(); 
						$("#next-btn").hide();
				}
				
				function goToCard(e){
					var _target = e.target || e.srcElement;
					var thisId = $(this).data("id");
					if(_target.nodeName == "I"){
						return;
					}
					setOneCardById(thisId);
					$card.hide().next().show();
					$(".pre-main").hide().next().show();
					setTimeout(function(){
						setOneCard(cardCurIndex);
						$("#card-audio").attr("autoplay","autoplay").parent().addClass("cplaying");
						$cardAudio.on("ended",function(){
							$(".card-horn").removeClass("cplaying");
						})
					},1000)
				}
				function setOneCardById(id){
					for(var i=0;i<wordDataList.length;i++){
						var word = wordDataList[i];
						if(word.id == id){
							setOneCard(i);
							break;
						}
					} 
				}
				function setOneCard(index){
					var obj = wordDataList[index];
					cardCurIndex = index;
					$("#wordListLenVal").show();
					$("#wordListLenVal_list").hide();
					if(obj){
						var $word_en = $("#word_en");
						var $word_soundmark = $("#word_soundmark");
						var $word_cn = $("#word_cn");  
						var $cardAudio = $("#card-audio");//卡片页音频节点
						$word_en.text(obj.wordEn);
						$word_soundmark.text(obj.wordSymbol);
						$word_cn.text(obj.wordValue);
						$cardAudio.attr("src",obj.audioUrl);
						if(obj.audioUrl==null || obj.audioUrl==""){
							$("#card-horn-audo").hide();
						}else{
							$("#card-horn-audo").show();
						}
						$("#wordListLenVal").text(""+(cardCurIndex+1)+"/"+wordDataList.length);
					}
					if(showMark == 1){
						$(".card-bd p").hide();
						$showShiyiBtn.show();
					}else{
						$(".c-shiyi").hide();
						$showShiyiBtn.show();
					}
					if(cardCurIndex>=(wordDataList.length-1)){
						$("#wordCardFinish").show();
					}else{
						$("#wordCardFinish").hide();
					} 
				}

				function onPrevBtnClick(){
					if(cardCurIndex<=0){
						return;
					}
					cardCurIndex--;
					setOneCard(cardCurIndex);
					setTimeout(function(){
						$("#card-audio").attr("autoplay","autoplay").parent().addClass("cplaying");
						$cardAudio.on("ended",function(){
							$(".card-horn").removeClass("cplaying");
						})
					},1000)
				}
				function onNextBtnClick(){
					if(cardCurIndex>=(wordDataList.length-1)){
						return;
					}
					cardCurIndex++;
					setOneCard(cardCurIndex);
					setTimeout(function(){
						$("#card-audio").attr("autoplay","autoplay").parent().addClass("cplaying");
						$cardAudio.on("ended",function(){
							$(".card-horn").removeClass("cplaying");
						})
					},1000)
				}
				
				//卡片页释义隐藏显示
				function cardInit(){
					if(showMark == 1){
						$switchOn.hide().prev().show();
						$(".card-bd p").hide();
						$showShiyiBtn.click(function(){
							$(".card-bd p").show();
							$showShiyiBtn.hide();
						})
					}else if(showMark == 2){
						$switchOn.show().prev().hide();
						$(".card-bd p").show();
						$(".c-shiyi").hide();
						$showShiyiBtn.click(function(){
							$(".c-shiyi").show();
							$showShiyiBtn.hide();
						})
					} 
				}
				//单词显示开关
				function onCSwitchClick(){
					if(showMark == 1){
						$switchOn.show().prev().hide();
						$(".card-bd p").show();
						$(".c-shiyi").hide();
						$showShiyiBtn.show();
						showMark = 2;
					}else{
						$switchOn.hide().prev().show();
						$(".card-bd p").hide();
						$showShiyiBtn.show();
						showMark = 1;
					} 
				}
				//切换列表或卡片
				function onSwitchBtnClick(){ 
					stopAudioplay();
					var $this = $(this);
					if(($this).attr("id") == "pre-cards"){
						$card.hide().next().show();
						$(".pre-main").hide().next().show();
						$(".pre-list-title").hide().next().show();
						setTimeout(function(){
							//点击进入卡片练习，给音频添加自动播放属性
							setOneCard(cardCurIndex);
							$("#card-audio").attr("autoplay","autoplay").parent().addClass("cplaying");
							$cardAudio.on("ended",function(){
								$(".card-horn").removeClass("cplaying");
							})
						},1000)
						$("#wordListLenVal").show();
						$("#wordListLenVal_list").hide();
						
					}else{ 
						$list.hide().prev().show();
						$(".pre-main-card").hide().prev().show();
						$(".pre-list-title").show().next().hide();
						$("#card-audio").removeAttr("autoplay");//移除自动播放属性
						$(".card-horn").removeClass("cplaying");
						$("#wordListLenVal").hide();
						$("#wordListLenVal_list").show();
						//listPlay(curIndex);
					}
				}

					function listPlay(index) {
						var audioObj;
						$("#wordListLenVal").hide();
						$("#wordListLenVal_list").show();
						if(index < 0 || index > ($audioBox.length - 1)) {
							return;
						}else{
							audioObj = $audioBox.eq(index);
						}
						if(audioObj.hasClass("playing")) {
							audioObj.removeClass("playing").find(".pre-audio")[0].pause();
						} else {
							if(index != curIndex) { //判断点击的当前音频是否和上次点击的同一个
								stopAudioplay();
							}
							audioObj.addClass("playing").find(".pre-audio")[0].play(); 
						}
						curIndex = index;
					}
				//初始化音频点击播放	
				function audioInit(){ 
					$.each($audioBox,function(index,value){
						var $this = $(this);
				    	$this.click(function(){
				    		listPlay(index);
				    	})
				   });
				    $.each($audio,function(index,value){
						var $this = $(this); 
			    		$audio.eq(index).on("ended", function() {
			    			var audioObj = $audio.eq(index);
			    			audioObj.parent().removeClass("playing");
						}) 
				    });
				}
				//卡片页音频播放
				function onCardAudioPlayClick(){
					var _this = $(this);
					if(_this.hasClass("cplaying")){
						$cardAudio[0].load();
					}else{
						$cardAudio[0].play();
						_this.addClass("cplaying");
						$cardAudio.on("ended",function(){
							_this.removeClass("cplaying");
						})
					}
				}
				
				//停止所有音频播放
				function stopAudioplay(){
					for(var j=0;j<audioList.length;j++){
		                audioList[j].load(); 
		            }
					$(".horn_icon").removeClass("playing");
				}
			
				function zeroFn(n){
					n=n<10?"0"+n:n;
					return n;
				}
				
			})
			//h5分享
			$("#exercise-share").show();
		</script>
 