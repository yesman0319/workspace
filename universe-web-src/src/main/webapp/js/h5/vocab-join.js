var countdownTime = null;//倒计时时间;
var spendTime = 0;//记录用时;
var curQuestionIndex = 0;//当前题下标;
var isTimeOut = false; //是否时间到;
var doneQuestion;//记录做的个数;
var groupID;
var dataJson;//请求的数据
var interval;//倒计时计时器 
var basePath = BaseUrl.host;
var audios = document.getElementById("myAudio");

var getParamPromise = new Promise(function(resolve,reject){
	var href = window.location.href;
	var params = href.split("?")[1];
	if(params){
		for(var i=0;i<params.split("&").length;i++){
			if(params.split("&")[i].indexOf("params") > -1){
				var target = params.split("&")[i];
				var valuesObj = JSON.parse(Base64.decode((target.split("=")[1])));
				groupID = valuesObj.groupID;
				countdownTime = parseInt(valuesObj.estimateTime);
				break;
			}
		}
	}
	return resolve();
})
getParamPromise.then(function(){
	$.ajax({
		type:"get",
//		url:BaseUrl.path + 'dictation/group/1293',
		url:BaseUrl.path + 'dictation/group/'+groupID,
		dataType:"json",
	}).then(function(data){
		dataJson = data;
	},function(fail){
		console.log(fail);
	});
})

$(function(){
	//点击go按钮动画结束 开始做题
	$("#goJoin").click(function(){
		audios.src = dataJson.questions[curQuestionIndex].audioUrl;
		audios.play();
		audios.pause();
		$(this).css("animation-name","fadeOutRight")
				.prev().css("animation-name","fadeOutRight");
		$(this).on("animationend",function(){
			$("#init-page").hide();
			goNextQuestion();
			var clock = new CircleProgress({
				countdown:countdownTime,
				progressWidth:"3px"
			})
		})
	})
})

/*var dataJson = {
	"sequence_number" : 1293,
  	"group_id" : 1293,
  	"questions" : [ 
	  	{
		    "sequence_number" : "1",
		    "audioUrl" : "../../../img/word.mp3",
		    "id" : 10795,
		    "sample" : "a b le",
		    "stem" : "能干的",
		    "wrongOptions":"aaa,bbb"
	  	},
	  	{
	    	"sequence_number" : "2",
	    	"audioUrl" : "../../../img/word.mp3",
	    	"id" : 10796,
	    	"sample" : "ab r o ad",
	    	"stem" : "在国外",
	    	"wrongOptions":"aaa,bbb"
	  	}
  	],
  "results" : {
    "group_level" : 0,
    "group_id" : 1293,
    "group_sequence_number" : 1293,
    "rate" : 0.0,
    "avg_speed" : 0.0,
    "wrong_results" : [ ],
    "zip_url" : "http://universetoefl.b0.upaiyun.com/yztuofu/dictationmp3new/202.zip"
  }
}*/

//sample字段拆分数组重新随机乱序
function sortWords(curQuestion,i){
	var randomTop;//随机top值;
	var newSampleArr = [];
	curQuestion.newCorrectSampleArr = curQuestion.sample.split(" ");
	curQuestion.newWrongSampleArr = curQuestion.wrongOptions.split(",");
	var itemsLength = curQuestion.sample.split(" ").length + curQuestion.wrongOptions.split(",").length;
	if(itemsLength <= 3 ){
		randomTop = 50;
	}else if(itemsLength > 3 && itemsLength < 7 ){
		randomTop = 40;
		$(".options").css("padding","20px");
	}else{
		randomTop = 30;
	}
	curQuestion.sample.split(" ").forEach((item,index) => {
		var obj = {};
		obj.item = item;
		obj.index = index;
		obj.isWordItems = true;
		obj.topMove = Math.round(Math.random()*randomTop-randomTop/2); 
		obj.leftMove = Math.round(Math.random()*40-20); 
		newSampleArr.push(obj);
	})
	curQuestion.sortedSample
	//再次追加干扰选项
	curQuestion.wrongOptions.split(",").forEach((item,index) => {
		var obj = {};
		obj.item = item;
		obj.index = 999;
		obj.isWordItems = false;
		obj.topMove = Math.round(Math.random()*randomTop-randomTop/2); 
		obj.leftMove = Math.round(Math.random()*40-20); 
		newSampleArr.push(obj);
	})
	curQuestion.sortedSample = newSampleArr.sort(function(a,b){ return Math.random()>.5 ? -1 : 1;});//添加sortedSample字段;
	curQuestion.correctWord = curQuestion.sample.split(" ").join("");//添加correctWord字段;
//	curQuestion.sequence_number = index + 1;
}

//下一题
function goNextQuestion(){
	var questionData = dataJson.questions[curQuestionIndex];
	if(curQuestionIndex == dataJson.questions.length){
		clearInterval(interval);
		showResultPage(dataJson.questions.length);
		return;
	}else{
		sortWords(questionData,curQuestionIndex);
		$(".options").html(
			template("options-tmpl",questionData)
		);
		$(".result").html(
			template("result-tmpl",questionData)
		);
		$(".stem").html(
			template("stem-tmpl",questionData)
		);
		progressUpdate(questionData.sequence_number,dataJson.questions.length);
	}
	var dropIndex = 0;//投放区的当前答案字母的下标;
	var	droppableArr = [];//存储可拖放元素的数组;
	var dragIndex;//正在拖拽元素的下标;
	var dragText;//正在拖拽元素的内容;
	// 初始化拖拽项
	[].slice.call(document.querySelectorAll('#dragble li')).forEach(function(el) {
		new Draggable(el,droppableArr,{
			draggabilly : {containment: document.body },
			onStart : function() {
			},
			onEnd : function( wasDropped ) {
			}
		} );
	} );
	// 初始化接收的对象
	droppableArr.push(new Droppable(document.getElementById('drop-area'),{
		onDrop : function(instance, draggableEl){
			dragIndex = $(draggableEl).data("index");//当前词的下标
			dragText = $(draggableEl).find("span").text();
			if(dragIndex == dropIndex){
				dropIndex++;//拖拽正确,当前词结果显示;
				$(draggableEl).replaceWith("<a>");
				$(instance.el).find("li").eq(dragIndex)
					.find(".text-line").hide()
					.next().text(dragText).show();
				if(dropIndex == questionData.newCorrectSampleArr.length){//本题结束
					curQuestionIndex++;
					//答完每一题后展示动画播放语音
					$("#animate-stem").show().html(template("animate-stem-tmpl",questionData))
					$("#animate-stem .check").on("animationend",function(){
						if(questionData.audioUrl){
							audios.src = questionData.audioUrl;
							audios.play();							
						}else{
							setTimeout(function(){
								$("#animate-stem").hide();
							},1200);
						}
					});
					$("#myAudio").on("ended",function(){
						setTimeout(function(){
							$("#animate-stem").hide();
							goNextQuestion()//下一题;
						},500);
					});
					$("#animate-stem .animated-result").on("animationend",function(){
						$(this).css({
							"opacity":"1",
							"transform": "scale(1.5)"
						})
					});
				}
			}else{
				$(droppableArr[0].el).addClass("shake").on("animationend",function(){
					$(droppableArr[0].el).removeClass("shake");
					goNextQuestion();
				});
				return;
			}
		}
	} ) );
}
//结果页
function showResultPage(doneNum){
	var obj = {};
	if(doneNum == dataJson.questions.length){
		obj.description = "非常棒!";
		obj.fa = "fa-thumbs-o-up";
	}else{
		obj.description = "继续努力!";
		obj.fa = "fa-smile-o"
	}
	obj.doneNum = doneNum;
	obj.spendTime = Utils.format_time(spendTime,true);
	$("#result-page").html(
		template("resultPage",obj)
	).show();
	$(".detail p").on("animationend",function(){
		$(this).css("opacity","1");
	})
}

//底部进度条更新
function progressUpdate(cur,total){
	var value;
	cur = cur - 1;
	cur == 0?value = 0:value = (cur*100/total).toFixed(0);
	$(".load-bar").width(value + "%")
	var data = {
		  	"value" : value,
		  	"total" : total,
		  	"cur" : cur
		};
	$(".progress .detail").html(
		template("progress-tmpl",data)
	)
}


//圆形计时器组件
function CircleProgress(opts){
	//可选参数（默认参数）
	this.defaults = {
		progressWidth:"2px",//进度条宽度
		progressColor:"#fff",//进度条颜色
		circleBgColor:"rgba(0,0,0,.2)",//圆形底部颜色
		countdown:61,//倒计时时间
	}
	this.opts = $.extend(this.defaults, opts,true);
	this.init();
}
CircleProgress.prototype = {
	//模板
	template(){
		var circleBox = '   <div id="circleProgress" class="circle_process">'+
						'		<div class="wrapper right">'+
						'			<div class="rightcircle"></div>'+
						'		</div>'+
						'		<div class="wrapper left">'+
						'		    <div class="leftcircle"></div>'+
						'		</div>'+
						'		<div id="circle-timer"><span>00:00</span></div>'+
						'	</div>';
		return circleBox;
	},
	//创建圆形
	countDown(){
		var that = this;
		var countdownTime = this.opts.countdown;
		$("#circleProgress .wrapper>div").css("animation-duration",countdownTime+"s").addClass("circle");
		$("#circle-timer>span").html(Utils.format_time(countdownTime));
		interval = setInterval(function(){
			countdownTime--;
			spendTime++;
			$("#circle-timer>span").html(Utils.format_time(countdownTime));
			if(countdownTime <= 0){
				showResultPage(curQuestionIndex);
				clearInterval(interval);
			}
		},1000)
	},
	init(){
		var that = this;
		$("#circleWrapper").html(this.template());
		this.countDown();
		//设置外层盒子的样式
		$(".circle_process").css({
			"background":this.opts.circleBgColor
		})
		//设置内部需要旋转的样式
		$("#circleProgress .rightcircle").css({
			"border-width":this.opts.progressWidth,
			"border-top-color":that.opts.progressColor,
			"border-right-color":that.opts.progressColor
		});
		$("#circleProgress .leftcircle").css({
			"border-width":this.opts.progressWidth,
			"border-bottom-color":that.opts.progressColor,
			"border-left-color":that.opts.progressColor
		});
		
	}
	
}
function wxShare(){
	$("head").append('<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js"><\/script>');
	$("head").append('<script src="../../../js/h5/h5_share.js"><\/script>');
	var share_url = window.location.href;
	var imgUrl = "../../../i/home-pic1.png";
	var descContent = "快来试一试吧";
	var share_title = "精英计划用户向你分享了词语拼接小练习。"
	share(share_url,imgUrl,descContent,share_title);
}
wxShare();

var Utils = (function(){
	function getzf(n){
		return n<10?"0"+n:n;
	};
	return{
		format_time(time,isStr){
			var mm=getzf(parseInt(time/60,10));
			var ss=getzf(parseInt(time%60,10));
			if(isStr){
				if(time >= 60){
					return mm+"分"+ss+"秒";
				}else{
					return ss+"秒";
				}
			}else{
				if(time >= 60){
					return mm+":"+ss;
				}else{
					return "00:" + ss;
				}
			}
			return "00:00";
		}
	}
}());


/*function threeCountDown(num){
	if (num != 0) {
    	$("#ready-count-tips").html(num);
    ss = setTimeout(function () {
            threeCountDown(num - 1)
        }, 1000);
    } else {
    	$("#tips-modal").remove();
    	initChallenge();
    }
}*/

//document.getElementById('content').innerHTML = html;