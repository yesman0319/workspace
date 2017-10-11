<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<%@ taglib uri="/padding" prefix="padding"%>
 
<link rel="stylesheet" href="../css/common.css" />
<link rel="stylesheet" href="../css/dictation_exercise.css" />  	
 <!--答题页面-->
   	 	<div class="right-part1" id="dic-question">
	    	<p id="dic-hd" class="p1 bold black mleft25">
		        <img src="${basePath}/i/list-pic.png" style="margin-left:-6px;margin-right:10px;">
				<span id="xm-title"></span>
		        <span id="dic-clock" class="time-pos">
			        <img src="${basePath}/i/time.png">
			        <a href="#" id="timeBtnStaus">计时</a>
			        <a class="Dictime" href="#">：</a><a id="testTimer2" class="Dictime" href="#">00:00:00</a>
		        </span>
	    	</p>
	    	<hr class="mleft25">
	    	<p class=" margin30 mleft25 " id="seqNum">1/1</p>
	    	<div class="audiojsZ newaudio " id="audiojs_wrapper0" style="width: 682px;">
		        <audio id="myMusic" src="${audio_url}" preload="auto"></audio>
		        <div class="play-pauseZ"><p class="playZ"></p>
		            <p class="pauseZ"></p>
		            <p class="loadingZ"></p>
		            <p class="errorZ"></p>
		        </div>
		        <div class="newscrubberZ scrubberZ" style="width:496px!important;">
		            <div class="progressZ" style="width: 0px;"></div>
		            <div class="loadedZ" style="width: 375px;"></div>
		        </div>
		        <div class="timeZ"><em class="playedZ">00:00</em>| <strong class="durationZ">00:00</strong></div>
		        <div class="error-messageZ"></div>
		        <div class="change-voice" style="display:none;"></div>
		        <div class="sound setsound" style="margin-left:0;margin-right: 30px;cursor:pointer;display:none;">
		            <div class="play-voice" style="width:100%;"></div>
		            <div class="voice-bigger"></div>
		        </div>
	      	</div>
		    <div id="answer" class="dic-pra" style="margin-top:50px;"></div>
		    <p class="gram-p2" style="margin-left:-10px;">
			    <span id="lookDicAnswer" href="#" class="see" style="color:#5499ff;">查看答案</span>
			    <span style="padding-left:15px;"><a id="clearDicAnswer"  class="see" style="color:#5499ff;">清除填空</a></span>
		    </p>
		    <div class="one-button2">
		    	<button id="nextNewDic" type="button" class="btn1 btn btn-primary active" >下一题<button>
		    </div>
	    </div>
	    <!--答题页面 结束-->
	     
	    <!--结果页面-->
	    <div class="right-part1" id="dic-result">
	    	<p id="dic-hd" class="p1 bold black mleft25">
		        <img src="${basePath}/i/list-pic.png" style="margin-left:-6px;margin-right:10px;">
				<span>练习报告</span>
	    	</p>
	    	<hr class="mleft25">
			<div class="practice-result">
				<img src="${basePath}/i/i22.png" class="result-img1">
				<!-- ../i/i23.png <50  ../i/i21.png 80-99  ../i/i24.png 100 -->
				<div class="i25 correctWrong">
					<p class="font12"><img id="cup-img" src="${basePath}/i/newimg-1.png"></p>
						<!--renderDicData.imgUrl = '../i/newimg-0.png'; 没有红旗河奖杯
							renderDicData.imgUrl = '../i/newimg-4.png'; 奖杯
		    				renderDicData.imgUrl = '../i/newimg-1.png'; 奖杯+1面红旗		
							renderDicData.imgUrl = '../i/newimg-2.png'; 奖杯+2面红旗
							renderDicData.imgUrl = '../i/newimg-3.png'; 奖杯+3面红旗-->
					<span id="isBest" class="font12 re_orange">本次练习:</span>
					<span id="rate" class="font12 re_orange  mright10">正确率： %</span>
					<span id="avg_speed" class="font12 marginTop re_orange mright10">平均速度：2.65s/空</span>
				</div>
				<p class="dic-colortip" id="color_sample">  颜色示例：
					<span>
					    <a href="##" rel="prev" class="dic-ball-blue dic-roundstyle"></a>
					          全对
					</span>
				    <span>
				        <a href="##" rel="prev" class="dic-borange dic-roundstyle"></a>
				                    部分正确
				    </span>
				    <span>
				    <a href="##" rel="prev" class="dic-bred dic-roundstyle"></a>
				                     全错
				    </span>
				</p>
				<p class="dic-tip" id="dic_percent_tip">正确率是按照做对的空格计算的哦</p>
			</div>
			<nav id="circleNav" class="pagination4 center">
	  		</nav>
	  		<div class="two-button2">
	        	<button type="button" class="btn9 btn btn-primary active " id="dic-new-repeat" >再练一遍</button>
        		<button type="button" class="btn2 btn btn-primary active" id="dic-new-onlywrong">重做错题</button>
				<button type="button" class="btn btn-primary btn1" id="showMorePlan">完成</button>
     		</div>
	    </div>
	    <!--结果页面 结束-->
		<script src="${basePath}/j/lib/audiojs/audio.min.js"></script>
		<script>
		$(function () {
			
			var isShowTimer = false;
			var curQuestionIndex = 0;
			var currentTestTimeStr;//当前时间字符串
			var testTimerID;//计时器
			var durationTime = 0;
			var userDoneRecords = [];//记录每一道题
			var wrongArray = [];//每一道题的错题
			var	doingWrong = {};//
			var	markWrongIng = false;//只做错题标记
			var isCorrectMark = false;
			var totalInput = 0;//记录所有输入框的个数
			var totalRightInput = 0;//记录所有正确的个数
			var questionNum = 0; //习题排序号
			var questionCount = 0; //习题总数
			var xm_startTime,xm_endTime;
			var curGroupId,curGroup_level,questionId;
			var jsonQuestions;//读题的数据
			var $dicInput,$dicAnsInput;
			var xm_dic_rate,
				xm_planDayId,
				xm_title,
				xm_exerciseId;
				
			var moduleName = "${currentExercise.moduleName }";
			var originName = "${currentExercise.originName }"; 
			var result = "${result}";
			var planid = ${dayInfo.planId};
			var plandayid = ${dayInfo.dayId};
			var exerciseid =  ${currentExercise.id}; 
			var moduleID = ${currentExercise.moduleId};
			var levelone = ${currentExercise.levelOne==null?0:currentExercise.levelOne};
			   
			if("1"=="${result}"){ 
				gotoDictationResult(levelone,plandayid,exerciseid,moduleName+" "+originName);//questionId 当前单元 planDayId  exerciseId type
			}else{ 
				showNewDictation(levelone,plandayid,exerciseid,moduleName+" "+originName);//groupId 当前单元 exerciseId
			}
			
			$('.time-pos').on('click',showHideDicTimer);//显示隐藏计时器
			$('#clearDicAnswer').on('click',clearDicAnswer);//清空答案
			$('#lookDicAnswer').on('click',lookDicAnswer);//查看答案
			$("#dic-new-repeat").on('click',doDicRepeat);//
			$("#dic-new-onlywrong").on('click',doOnlyWrong);//只做错题
			$("#nextNewDic").on("click",nextNewDication);
			initAudioControl("myMusic");
			//进入答题页
			function showNewDictation(groupId,planDayId,exerciseId,title){
				curGroupId = groupId; 
				xm_planDayId=planDayId;
				xm_exerciseId=exerciseId;
				xm_title=title;  //20160926
				$.ajax({
					url:  window.xiaoma.basePath+'/plan/proxy?proxyurl='+window.xiaoma.learning+'/spelling/group/' + groupId,
					type: 'GET',
					dataType: 'json',
					async: false,
					success: function(data){
						jsonQuestions = data; //读题存储下来
						console.log(jsonQuestions);
						questionCount = jsonQuestions.questions.length;
						setDictation(curQuestionIndex);//设置填空题
						showQuestionPage();
					}	
				})
				
			}
			
			//设置每一题
			function setDictation(index,qId) {
				var reg = /\[[\s*0-9\s*]*\]/g;
				var sampleWords = jsonQuestions.questions[index].spellingAnswer;
				var audioUrl = jsonQuestions.questions[index].audioUrl;
					questionNum = jsonQuestions.questions[index].sequence_number;
				var html =  '<a class="dic-word">'+
							'	<input text="text" class="dic-word-ipt" />'+
							'	<input text="text" class="dic-ans-word" />'+
							'</a>';	
				$("#seqNum").text((index+1)+"/"+jsonQuestions.questions.length);//设置第几题
				$("#myMusic").attr("src",audioUrl);//设置音频地址
				$("#answer").html(jsonQuestions.questions[index].sampleQuestion.replace(reg,html));//设定指定的输入框
				$dicInput = $(".dic-word-ipt");//填写框
			 	$dicAnsInput = $(".dic-ans-word");//答案示例框
				for(var i=0;i<sampleWords.length;i++){
					var inputSampleWord = sampleWords[i].content;
					$dicAnsInput.eq(i).attr("value",inputSampleWord);
				}
				//判断每一个空的对错
				$(".dic-word-ipt").blur(function(){
					$this = $(this);
					var $userAns = $this.val().trim();
					var $originAns = $this.next().val().trim();
					if($userAns != "" && $userAns.toLowerCase() == $originAns.toLowerCase()){
						$this.next().addClass("rrr"); 
					}else{
						$this.next().addClass("www"); 
					}
				})
				if (markWrongIng) {
					//如果是做错题的话，下一题id从错题列表里取
//					nextQuestionId = doingWrong[questionNum].next_question_id;
					curQuestionIndex = doingWrong[questionNum].next_question_num - 1;
					//做错题情况下，设置questionCount为最后一道题的questionNum
					for (var key in doingWrong) {
						questionCount = key;
					}
				}
				//最后一题下一题为提交
				if(index + 1 == questionCount){
					$("#nextNewDic").text("提交");
				}else{
					$("#nextNewDic").text("下一题");
				}
			};
			
			//进入结果页
			function gotoDictationResult(groupId,planDayId,exerciseId,title) {
				curGroupId = groupId; 
				xm_planDayId=planDayId;
				xm_exerciseId=exerciseId;
				xm_title = title;
				$('body,html').animate({
					scrollTop: 0
				}, 100);
				$.ajax({
					url: window.xiaoma.basePath+'/plan/proxy?proxyurl='+window.xiaoma.learning+'/spelling/group/' + curGroupId,
					type: 'GET',
					dataType: 'json',
					async: false,
					success: function(json) {
						showResultPage();//显示结果页，隐藏答题页
						jsonQuestions = json; //读题存储下来
						questionId = jsonQuestions.questions[curQuestionIndex].id;
						questionCount = jsonQuestions.questions.length;
						$("#xm-title").html(xm_title);
						wrongArray = [];
						wrongArray = $.map(json.results.wrong_results, function(val, index) {
							//1:全对
							if (val.is_correct != 1) {
								return val;
							}
						});
						var recordsArr = [];
						$.each(json.questions,function(index,value){
							var recordsObj = {};
							recordsObj.question_sequence_number = value.sequence_number;
							recordsObj.is_correct = 1;
							$.each(wrongArray,function(index2,value2){
								if(value2.question_sequence_number  == value.sequence_number){
									recordsObj.is_correct = value2.is_correct
								}					
							})
							recordsArr.push(recordsObj);
						})		
						var renderDicData = {};
						renderDicData.records = json.results.wrong_results; 
						renderDicData.groupSeqNum = json.results.group_sequence_number; 
						renderDicData.avg_speed = json.results.avg_speed; 
						renderDicData.rate = json.results.rate
						//设置小旗子图片
						if (json.results.group_level == 0) {
							renderDicData.imgUrl = '../i/newimg-0.png';
						} else if (json.results.group_level == 1) {
							renderDicData.imgUrl = '../i/newimg-4.png';
						} else if (json.results.group_level == 2) {
							renderDicData.imgUrl = '../i/newimg-1.png';
						} else if (json.results.group_level == 3) {
							renderDicData.imgUrl = '../i/newimg-2.png';
						} else if (json.results.group_level == 4) {
							renderDicData.imgUrl = '../i/newimg-3.png';
						}
						//设置及格图片
						if (json.results.rate < 50) {
							renderDicData.imgRateUrl = '../i/i23.png';
							$("#dic-new-onlywrong").show();
						}
						if (50 <= json.results.rate && json.results.rate < 80) {
							renderDicData.imgRateUrl = '../i/i22.png';
							$("#dic-new-onlywrong").show();
						}
						if (80 <= json.results.rate && json.results.rate < 100) {
							renderDicData.imgRateUrl = '../i/i21.png';
							$("#dic-new-onlywrong").show();
						}
						if (json.results.rate == 100) {
							renderDicData.imgRateUrl = '../i/i24.png';
							$("#dic-new-onlywrong").hide();
						}
						//设置对错的标号
						var circleHtml = [],classn;
						for(var i=0;i<recordsArr.length;i++){
							if(recordsArr[i].is_correct == 1){
								classn = " dic-ball-blue";
							}else if(recordsArr[i].is_correct == 3){
								classn = " dic-borange";
							}else{
								classn = " dic-bred";
							}
						var htm =   '<span class="page">'+
				      			    	'<a href="javascript:;" rel="prev" class="colorCircle'+classn+'">'+(i+1)+'</a>'+
				     		    	'</span>';
							circleHtml.push(htm);
						}
						$("#circleNav").html(circleHtml.join(""));//错题标号
						$("#rate").text("正确率："+renderDicData.rate+"%");//正确率
						$("#avg_speed").text("平均速度："+ renderDicData.avg_speed +"s/空");//平均速度
						$("#cup-img").attr("src",renderDicData.imgUrl);//奖杯图片
						$(".result-img1").attr("src",renderDicData.imgRateUrl);//及格图片
						$("#isBest").text("最好成绩:");
					}
				});
		
			};
			
			function isFromPlan(){
				if(!exerciseApi.isFromPlan){
					$("#showMorePlan").show();
				}else{
					$("#showMorePlan").hide();
				}
			}
			function nextNewDication(){
					//最后一题
					if(questionNum == questionCount){
						doRecord();
						curQuestionIndex = 0;
						//暂停audio播放
				    	stopAudioPlay();
						if(!markWrongIng){
							var date=new Date($.ajax({async: false}).getResponseHeader("Date"));
							xm_endTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
							date=null;
							xm_dic_rate = percentNum(totalRightInput/totalInput);
							var spend_time = Math.round(durationTime);
							spend_time = spend_time < 1 ? 1 : spend_time;
							//本地计算平均速度公式中
							var avg_speed = spend_time / totalInput;
							var digitRound = function(digit, length) {
								length = length ? parseInt(length) : 0;
								if (length <= 0) return Math.round(digit);
								digit = Math.round(digit * Math.pow(10, length)) / Math.pow(10, length);
								return digit;
							};
							if (avg_speed <= 10 && avg_speed > 0) {
								avg_speed = digitRound(avg_speed.toString(), 2).toString() + 's'
							} else if (avg_speed <= 60) {
								avg_speed = Math.round(avg_speed.toString()).toString() + 's'
							} else if (avg_speed <= 3600) {
								var avg_string1 = avg_speed / 60;
								avg_speed = digitRound(avg_string1, 1).toString() + 'min'
							} else if (avg_speed > 3600) {
								var avg_string2 = avg_speed / 3600;
								avg_speed = Math.round(avg_string2).toString() + 'h'
							}
							$.ajax({
								url: window.xiaoma.basePath+'/plan/proxy?proxyurl='+window.xiaoma.learning+'/spelling/results',
								type: 'POST',
								async: false,
								contentType: "application/json; charset=utf-8",
								data: JSON.stringify({
									group_id: curGroupId,
									rate: xm_dic_rate,
									wrong_results: userDoneRecords,
									spend_time: spend_time,
									word_amount: totalInput,
									"planDayId":xm_planDayId,
									"exerciseId":xm_exerciseId,
									"startTime":xm_startTime,
									"endTime":xm_endTime
								}),
								headers: {
									fromType:"web"
								},
								success: function(json) {
									var renderDicData = {};
									//设置及格图片
									if (xm_dic_rate < 50) {
										renderDicData.imgUrl = '../i/newimg-0.png';
										renderDicData.imgRateUrl = '../i/i23.png';
										$("#dic-new-onlywrong").show();
									}else if (50 <= xm_dic_rate && xm_dic_rate < 80) {
										renderDicData.imgRateUrl = '../i/i22.png';
										renderDicData.imgUrl = '../i/newimg-1.png';
										$("#dic-new-onlywrong").show();
									}else if (80 <= xm_dic_rate && xm_dic_rate < 100) {
										renderDicData.imgRateUrl = '../i/i21.png';
										renderDicData.imgUrl = '../i/newimg-2.png';
										$("#dic-new-onlywrong").show();
									} else if (xm_dic_rate == 100) {
										renderDicData.imgRateUrl = '../i/i24.png';
										renderDicData.imgUrl = '../i/newimg-3.png';
										$("#dic-new-onlywrong").hide();
									}
									//设置对错的标号
									var circleHtml = [],classn;
									for(var i=0;i<userDoneRecords.length;i++){
										if(userDoneRecords[i].is_correct == 1){
											classn = " dic-ball-blue";
										}else if(userDoneRecords[i].is_correct == 3){
											classn = " dic-borange";
										}else{
											classn = " dic-bred";
										}
										var htm =   '<span class="page">'+
							      			    		'<a href="javascript:;" rel="prev" class="colorCircle'+classn+'">'+(i+1)+'</a>'+
							     		    		'</span>';
										circleHtml.push(htm);
									}
									
									renderDicData.rate = xm_dic_rate;
									renderDicData.avg_speed = avg_speed;
									$("#circleNav").html(circleHtml.join(""));//错题标号
									$("#rate").text("正确率："+renderDicData.rate+"%");//正确率
									$("#avg_speed").text("平均速度："+ avg_speed+"/空");//平均速度
									$("#cup-img").attr("src",renderDicData.imgUrl);//奖杯图片
									$(".result-img1").attr("src",renderDicData.imgRateUrl);//及格图片
									$("#isBest").text("本次练习:");
									showResultPage();//显示结果页，隐藏答题页
									exerciseApi.updateListItem();
								}
							});
						}else{
							//设置对错的标号
							var circleHtml = [],classn;
							for(var i=0;i<userDoneRecords.length;i++){
								if(userDoneRecords[i].is_correct == 1){
									classn = " dic-ball-blue";
								}else if(userDoneRecords[i].is_correct == 3){
									classn = " dic-borange";
								}else{
									classn = " dic-bred";
								}
								var htm =   '<span class="page">'+
					      			    		'<a href="javascript:;" rel="prev" class="colorCircle'+classn+'">'+(userDoneRecords[i].question_sequence_number)+'</a>'+
					     		    		'</span>';
								circleHtml.push(htm);
							}
							$("#circleNav").html(circleHtml.join(""));//错题标号
							showResultPage();//显示结果页，隐藏答题页
						}
					}else{
						doRecord();
						if(!markWrongIng){
							curQuestionIndex++;
						}
						setDictation(curQuestionIndex);
					}
					
			}
			
			//记录每道题
			function doRecord(){
				var curObj = {};//存储每道题的信息obj
				var rightInputCount = 0;//填空正确的个数
				var inputAnswer = [];//每个空的内容
				$.each($dicAnsInput,function(i,v){
					if($dicAnsInput.eq(i).hasClass("rrr")){
						rightInputCount++;
					}
					inputAnswer.push($dicInput.eq(i).val())
				})
				totalInput += $dicInput.length;
				totalRightInput += rightInputCount;
				if(rightInputCount == 0){
					isCorrectMark = 2;//全部错误
				}else if(rightInputCount == $dicAnsInput.length){
					isCorrectMark = 1;//全部正确 
				}else{
					isCorrectMark = 3;//部分正确
				}
				curObj.is_correct = isCorrectMark;
				curObj.answer = inputAnswer.join("|");
				curObj.question_sequence_number = questionNum;
				userDoneRecords.push(curObj);
				if(isCorrectMark != 1){
//					curObj.question_id = questionId;
					wrongArray.push(curObj);
				}
			}

			
			
			//查看答案
			function lookDicAnswer() {
				if($("#lookDicAnswer").text() == "查看答案"){
					$("#lookDicAnswer").text("隐藏答案");
					$.each($dicAnsInput,function(i,v){
						$dicAnsInput.eq(i).show().attr("readonly","readonly").prev().hide();
						if($dicAnsInput.eq(i).hasClass("rrr")){
							$dicAnsInput.eq(i).addClass("dic-right");
						}else{
							$dicAnsInput.eq(i).addClass("dic-wrong");
						}
					})
				}else{
					hiddenAnswer();
				}
			};
			//隐藏答案
			function hiddenAnswer(){
				$dicAnsInput.hide().removeClass("dic-wrong dic-right").removeAttr("readonly");
				$dicInput.show();
				$("#lookDicAnswer").text("查看答案");
			}
			//清除答案
			function clearDicAnswer(){
				$dicAnsInput.removeClass("www rrr dic-wrong dic-right").hide();
				$dicInput.val("").show()
				$("#lookDicAnswer").text("查看答案");
			}
			//计时器
			function showHideDicTimer() {
				$(".Dictime").fadeToggle("fast", function() {
					if ($('.Dictime').is(':hidden')) {
						$("#timeBtnStaus").html("显示");
						isShowTimer = false;
					} else {
						$("#timeBtnStaus").html("计时");
						isShowTimer = true;
					}
				});
			};
				
			function showResultPage(){
				if(!markWrongIng){
					$(".practice-result").show();
				}else{
					$(".practice-result").hide();
				}
				if($dicAnsInput != undefined){
					$.each($dicAnsInput,function(i,v){
						$dicAnsInput.eq(i).removeClass("www rrr dic-wrong dic-right").hide();
						$dicInput.eq(i).val("").show()
						$("#lookDicAnswer").text("查看答案");
					})
				}
				if(wrongArray.length == 0){
					$("#dic-new-onlywrong").hide();
				}else{
					$("#dic-new-onlywrong").show();
				}
				isFromPlan();
				$("#dic-result").show();
				$("#dic-question").hide();
			}
			function showQuestionPage(){
				$("#xm-title").html(xm_title);
				if(!markWrongIng){
					startTimer();
					$(".time-pos").show();
					$("#rate").show();//正确率
					$("#avg_speed").show();//平均速度
					$("#cup-img").show();//奖杯图片
					$(".result-img1").show();//及格图片
				}else{
					$(".time-pos").hide();
					$("#rate").hide();//正确率
					$("#avg_speed").hide();//平均速度
					$("#cup-img").hide();//奖杯图片
					$(".result-img1").hide();//及格图片
				}
				$("#dic-result").hide();
				$("#dic-question").show();
				totalRightInput = 0;
				totalInput = 0;
			}	
		
			
			//只做错题
			function doOnlyWrong() {
				markWrongIng = true;
				curQuestionIndex = 0;
				showQuestionPage();
				userDoneRecords = [];
				doingWrong = {};
				//把上次的错题信息转存到doingWrong上,wrongArray继续记录当前的错题
				$.each(wrongArray, function(index, item) {
					var obj = {};
					obj.question_num = item.question_sequence_number;
					if (wrongArray[index + 1]) {
						//下一题的序号
						obj.next_question_num = wrongArray[index + 1].question_sequence_number;
					}
					doingWrong[item.question_sequence_number] = obj;
				});
				wrongArray = [];
				//取得重做错题的第一道题的信息
				for (var v in doingWrong) {
					questionNum = v;
					curQuestionIndex = questionNum - 1; // 20160918 取得错题第一个下标
					break;
				}
				setDictation(curQuestionIndex);
			};
			//再练一遍
			function doDicRepeat() {
				curQuestionIndex = 0;
				markWrongIng = false;
				userDoneRecords = [];
				wrongArray = [];
				showNewDictation(curGroupId,xm_planDayId,xm_exerciseId,xm_title)
			};
			
			//开始计时
			function startTimer() {
				clearTimer();
				stopAudioPlay();
				var fn = function() {
					if ($("#testTimer2").length <= 0) {
						console.log("not find target");
					}	
					if (!durationTime && durationTime<0) {
						durationTime = 1; //计算剩余的毫秒数
					} else {
						durationTime++;
					}
		
					var ts = durationTime;
					xm_spendTime = durationTime;
					//var dd = parseInt(ts / 60 / 60 / 24, 10); //计算剩余的天数
					var hh = parseInt(ts / 60 / 60 % 24, 10); //计算剩余的小时数
					var mm = parseInt(ts / 60 % 60, 10); //计算剩余的分钟数
					var ss = parseInt(ts % 60, 10); //计算剩余的秒数
					//dd = zeroFn(dd);
					hh = zeroFn(hh);
					mm = zeroFn(mm);
					ss = zeroFn(ss);
					currentTestTimeStr = hh + ":" + mm + ":" + ss;
					$("#testTimer2").html(currentTestTimeStr);
				};
				if (testTimerID) return;
				testTimerID = window.setInterval(fn, 1000);
				var date=new Date($.ajax({async: false}).getResponseHeader("Date"));
				xm_startTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
				date=null;
			};
			//初始化音频播放器控件
			function initAudioControl(eleId){
				audiojs.events.ready(function () {
					var objAudit = document.getElementById(eleId);
					audiojs.create(objAudit, {
						css: false,
						createPlayer: {
							markup: false,
							playPauseClass: 'play-pauseZ',
							scrubberClass: 'scrubberZ',
							progressClass: 'progressZ',
							loaderClass: 'loadedZ',
							timeClass: 'timeZ',
							durationClass: 'durationZ',
							playedClass: 'playedZ',
							errorMessageClass: 'error-messageZ',
							playingClass: 'playingZ',
							loadingClass: 'loadingZ',
							errorClass: 'errorZ'
						}
					});
				})
			};
			function percentNum(num) {
				return (Math.round(num * 10000) / 100.00); //小数点后两位百分比
			};
			function zeroFn(n){
				n=n<10?"0"+n:n;
				return n;
			};
			function clearTimer() {
				durationTime = 0; //计时时间间隔（单位秒）
				currentTestTimeStr = '00:00:00'; //重置计时时间
				window.clearInterval(testTimerID);
				testTimerID = undefined;
			};
			function stopAudioPlay(){
				var $audioDiv = $(".audiojsZ");
		    	if($audioDiv.hasClass("playingZ")){
		    		$audioDiv.removeClass("playingZ");
		    		$("#myMusic")[0].pause();
		    	}
			}
		     $(document).on('click','#showMorePlan',function(){
		            $('#morePlan').show();
		     });
			});
		</script>
 