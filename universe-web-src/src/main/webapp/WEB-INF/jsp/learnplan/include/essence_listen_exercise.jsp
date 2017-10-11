<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

    
    <link rel="stylesheet" href="${basePath}/css/common.css"/>
    <link href="${basePath}/css/jpalyer/jplayer.blue.monday.css" rel="stylesheet"/>
    <link rel="stylesheet" href="${basePath}/css/essence-listen.css"/>
    <%-- <script type="text/javascript" src="${basePath}/js/lib/jplayer/jquery.jplayer.min.js"></script> --%>
    <script type="text/javascript" src="${basePath}/js/lib/jplayer/jquery.jplayer.js"></script>
    <script type="text/javascript" src="${basePath}/js/lib/jplayer/jplayer.playlist.min.js"></script>
 <div class="ess-layout" style="overflow:hidden;">
    <div class="ess-left fl">
       <span id="playHeadFlag" style="display:none;">0</span>
        <h2 class="ess-left-question"><img class="ess-que-pic" src="${basePath}/i/preview/list-pic.png" alt=""/> ${currentExercise.moduleName }&nbsp;${currentExercise.originName }</h2>

        <div class="ess-left-tab">
            <ul class="ess-tab-list">
                <li><a class="ess-tab-list-a" href="javascript:;">句子精听</a></li>
                <li><a class="ess-tab-list-a" href="javascript:;">段落精听</a></li>
                <li><a class="ess-tab-list-a" href="javascript:;">全文精听</a></li>
                <li class="ess-diction"><a class="ess-tab-list-a" href="javascript:;">听写模式</a></li>
            </ul>
            <ul class="ess-see fr">
                <li id="seeOriginal" class="ess-see-original" data-see="0">原文</li>
                <li id="seeTrans" class="ess-see-translation" data-see="0">译文</li>
            </ul>
        </div>
        <div class="ess-see-con">
            <i class="ess-see-con-triangle"></i>
            <div class="ess-left-content">
                <div class="ess-tip-con">
                    <p class="ess-hide-tip">原文已被隐藏，点击右上角【<span class="green font16">原文</span>】按钮可查看</p>

                    <div class="ess-tip-key">
                        <!--<p class="ess-tip-key-t1 fl">快捷键:</p>-->
                        <p class="ess-tip-key-text fl">快捷键：&nbsp;&nbsp;按<span>空格键</span>播放或暂停,按<span>[</span>播放上一句或上一段,按<span>]</span>播放下一句或下一段,按<span>\</span>播放当前句或当前段
                            听写模式时,按<span>Tab</span>键进入下一个单词填写区
                        </p>

                    </div>
                </div>
                <!--有内容-->
                <div id="articleCon" class="ess-article-con">
                    <div class="article-item">
                     <c:forEach items="${paragraphList }" var="paragraph" varStatus="status">
					  <h3 id="articleCon_paragraph_${paragraph.paragraphNumber }" class="article-item-para">第${paragraph.paragraphNumberStr }段</h3>
	                    <ul class="sentence-list">
	                    	 <c:forEach items="${paragraph.sentenceList }" var="sentence" varStatus="status">  
	                    	  <p id="en_articleCon_paragraph_${paragraph.paragraphNumber }_sentence_${sentence.sentenceId }"  class="article-item-en"><b class="article-item-en-num">${sentence.sentenceNumber }.</b>
	                    	  ${sentence.contentEn }
	                    	  </p>
	                    	  <p id="cn_articleCon_paragraph_${paragraph.paragraphNumber }_sentence_${sentence.sentenceId }" class="article-item-ch">${sentence.contentCn }</p>
							</c:forEach> 
	                    </ul>
					</c:forEach> 
				 
                    </div>
                </div>
                <!--听写模式-->
                <div id="dictionCon" class="ess-diction-content">
                <c:forEach items="${paragraphList }" var="paragraph" varStatus="status"> 
	                    	 <div class="diction-para">
	                    	 <c:forEach items="${paragraph.sentenceList }" var="sentence" varStatus="status">  
	                    	  		<div  id="ess_dicContainer_sentence_${sentence.sentenceId }"  class="diction-item">
				                        <h3 class="diction-item-para">第${paragraph.paragraphNumberStr }段&nbsp;第${sentence.sentenceNumber }句</h3>
				
				                        <!--<p class="diction-item-en">The green will look even greener next to the red. </p>-->
				                        <div class="diction-word-box">
				                        	 <c:forEach items="${sentence.wordList }" var="word" varStatus="status">  
				                        	 	<span class="diction-word">
					                                <input type="text" class="pannel-answer" readonly/>
					                                <input type="text" class="pannel-word"/>
					                                 <i class="word-tags" >
					                                <b class="is-words-show" style="display:none">提示</b>
					                                <b class="is-words-hide" style="display:none">${word }</b>
					                                </i>
					                            </span> 
	                    					</c:forEach>  
				                            
				                        </div>
				
				                        <p class="diction-item-ch">${sentence.contentCn }</p>
				
				                    </div>
				                     
	                    	  </c:forEach>  
	                    	  </div>
					</c:forEach>
					
                </div>
            </div>
        
        <!--japlayer插件-->
        <div class="ess-play">
            <div id="jquery_jplayer_1" class="jp-jplayer"></div>
            <div id="jp_container_1" class="jp-audio" role="application" aria-label="media player">
                <div class="jp-type-playlist">
                    <div class="jp-gui jp-interface">
                        <div class="jp-progress">
                            <div class="jp-seek-bar">
                                <div class="jp-play-bar">
                                </div>
                            </div>
                        </div>
                        <div class="ess-play-control">
                            <a href="javascript:;" class="play-btn fl" isPlay="0"></a>
                            <a id="preBtn" href="javascript:;" class="pre-btn fl">
                                <span class="pre-btn-tip">
                                    <i class="pre-btn-drop"></i>
                                    <span class="btn-tip-text">上一句</span>                                    
                                </span>
                            </a>
                            <a id="nextBtn" href="javascript:;" class="next-btn fl">
                                 <span class="next-btn-tip">
                                    <i class="next-btn-drop"></i>
                                     <span class="btn-tip-text">下一句</span>  
                                </span>
                            </a>

                            <div class="show-time fl">
                                <div class="jp-current-time" role="timer" aria-label="time">&nbsp;</div>
                                /
                                <div class="jp-duration" role="timer" aria-label="duration">&nbsp;</div>
                            </div>
                            <a href="javascript:;" class="rate fr">&times;<span class="cur-rate">1.0</span>

                                <div class="rate-value-box">
                                    <i class="drop"></i>
                                    <ul class="rate-list" id="rate-list">
                                        <li class="rate-li">&times;<span class="rate-li-value">0.5</span></li>
                                        <li class="rate-li">&times;<span class="rate-li-value">0.8</span></li>
                                        <li class="rate-li">&times;<span class="rate-li-value">1.0</span></li>
                                        <li class="rate-li">&times;<span class="rate-li-value">1.2</span></li>
                                    </ul>
                                </div>
                            </a>

                            <a href="javascript:;" class="again-play fr" id="againPlay">
                            <span class="again-play-tip">
                                    <i class="next-btn-drop"></i>
                                      <span class="btn-tip-text">播放当前句</span>  
                                </span>
                            </a>
                        </div>


                    </div>
                    <!--音频列表-->
                    <div class="jp-playlist" style="display:none;">
                        <ul>
                            <li>&nbsp;</li>
                        </ul>
                    </div>
                    <div class="jp-no-solution">
                        <span>Update Required</span>
                        To play the media you will need to either update your browser to a recent version or update your
                        <a href="http://get.adobe.com/flashplayer/" target="_blank">Flash plugin</a>.
                    </div>
                </div>
            </div>

        </div>
    </div>
    </div> 
    <div class="ess-right fl">
        <h2 class="right-title">句子列表</h2>

        <div id="senList" class="right-list-con">
            <ul class="ess-right-list">
                
                
                 <c:forEach items="${paragraphList }" var="paragraph" varStatus="status">
                 <li class="ess-right-list-item">
				    <h3 class="list-item-paragraph">第${paragraph.paragraphNumberStr }段</h3>
                    <ul class="sentence-list">
                    	 <c:forEach items="${paragraph.sentenceList }" var="sentence" varStatus="status">  
	                        <li class="sentence-item" data-start="${sentence.audioStart}" data-end="${sentence.audioEnd }" onclick="clickSentence(${sentence.audioStart},${sentence.audioEnd },this)">
	                            ●&nbsp;第<span class="sentence-item-num">${sentence.sentenceNumber }</span>句
	                            <i class="icon-sound"></i>
	                        </li> 
						</c:forEach> 
                    </ul>
                    </li> 
				</c:forEach>  
				                
                 
            </ul>
        </div>
    </div>



<script type="text/javascript">
    $(document).ready(function () {

        new jPlayerPlaylist({
            jPlayer: "#jquery_jplayer_1",
            cssSelectorAncestor: "#jp_container_1"
        }, [
            {
                title: "",
                mp3: "${audio_url}"
            }

        ], {
            swfPath: "${basePath}/js/lib/jplayer",
            supplied: "mp3",
            wmode: "window",
            autoBlur: false,
            smoothPlayBar: true,
            keyEnabled: true
        });
        
    });
    
	    function zeroFn(n){
			n=n<10?"0"+n:n;
			return n;
		}
	    
	    var xm_questionId = "${currentExercise.levelOne}";
		var xm_planDayId = "${dayInfo.dayId}";
		var xm_exerciseId = "${currentExercise.id}";  
		var date_startTime=getTime();
		var date_endTime=getTime();
		var xm_startTime=zeroFn(date_startTime.getFullYear())+"-"+zeroFn((date_startTime.getMonth()+1))+"-"+zeroFn(date_startTime.getDate())+" "+zeroFn(date_startTime.getHours())+":"+zeroFn(date_startTime.getMinutes())+":"+zeroFn(date_startTime.getSeconds());
		var xm_endTime;
        
    	/*定时器*/
        var playerTimer = null;
        /*定义全局变量 开始时间 结束时间*/
        var _beginTime = 0;
        var _endTime = $("#senList").find(".ess-right-list-item:first").find(".sentence-item:first").attr("data-end");;
        /*4种模式  0:句子精听；1：段落精听；2:全文精听；3：听写*/
        var _listenPattern=0;
        var _paraNum= 1,_senNum=1;/*第一段第二句*/
        var topSTT = 0;
		var curSenLengthT = 0;
        
        
        var _currentSentenceId=0;
        var sentenceList = ${sentenceList};
        function rightScroll(){
			var itemTop=$(".ess-right-list-item").eq(_paraNum-1).find(".sentence-item").eq(_senNum-1).offset().top;
            var essTop=$(".ess-right").offset().top+$(".ess-right").get(0).offsetHeight*0.5; 
            var essDiff=itemTop-essTop;
            if(essDiff!=0){
            $.each($(".sentence-item"),function(index,value){
            	var $this = $(this);
            	if($this.hasClass("ess-right-playing") || $this.hasClass("ess-right-playing-stop")){
            		curSenLength = index + 1;
            	}
            })
            	topST = (44*curSenLength+(55*_paraNum));
                $(".ess-right").scrollTop(topST-200);
            }
		}
        setInterval(rightScroll,2000);

        
        function getTime(){ 
        	return new Date($.ajax({url: window.xiaoma.basePath+"/gettime",async: false}).getResponseHeader("Date"));
        }
      	// 提交答案 sentenceId句子id，time 句子听的时长度
        function sentenceListenEnd(sentenceId){
        	date_endTime=getTime();
			xm_endTime=zeroFn(date_endTime.getFullYear())+"-"+zeroFn((date_endTime.getMonth()+1))+"-"+zeroFn(date_endTime.getDate())+" "+zeroFn(date_endTime.getHours())+":"+zeroFn(date_endTime.getMinutes())+":"+zeroFn(date_endTime.getSeconds());
			var sentenceObj=null;
			 $.each(sentenceList,function(index,val){  
                     if(sentenceId==val.sentenceId){
                    	 sentenceObj = val;
                     }  
             });
			
			 if(sentenceObj==null){
				 return;
			 } 
			var time = date_endTime.getTime()/1000-date_startTime.getTime()/1000;
			var timeTemp = (parseFloat(sentenceObj.audioEnd)-parseFloat(sentenceObj.audioStart));
			if(timeTemp<=0)
				return;
			var parent = time/timeTemp;
			if(parent<0.6){//听的时间没有达到60%
				return;
			}
			var resultArr = [];
			var result = {};
			result.isListened = 1;
			result.sentenceId = sentenceId;
			resultArr.push(result);
			if(sentenceObj.isListened!=1){
				$.ajax({
					url: window.xiaoma.basePath+"/plan/proxy?proxyurl=${apiUrl}/intensivelistening/results",
					type: 'post',
					contentType: "application/json",
					data: JSON.stringify({
						"wordGroupId":xm_questionId,
						"planDayId":xm_planDayId,
						"exerciseId":xm_exerciseId,
						"startTime":xm_startTime,
						"endTime":xm_endTime,
						"questionId":xm_questionId,
						"time":time,
						"results":resultArr
					}),
					success:function(json) { 
						//console.log(json);
						date_startTime=getTime();
						xm_startTime=zeroFn(date_startTime.getFullYear())+"-"+zeroFn((date_startTime.getMonth()+1))+"-"+zeroFn(date_startTime.getDate())+" "+zeroFn(date_startTime.getHours())+":"+zeroFn(date_startTime.getMinutes())+":"+zeroFn(date_startTime.getSeconds());
						sentenceObj.isListened=1
						}
				}); 
			}
			
		}
        
        //模拟数据
        
        $('#jquery_jplayer_1').jPlayer({
            timeupdate: function(event) {
                var time = event.jPlayer.status.currentTime;
                time=time.toFixed(1);
                $.each(sentenceList,function(index,val){
                    if(parseFloat(val.audioStart)<=time&&time<=parseFloat(val.audioEnd)){
                        _paraNum= val.paragraphNumber;
                        _senNum=val.sentenceNumber;
                        if($("#playHeadFlag").text()==1){
                        	$("#playHeadFlag").text("0");
                        	var activeSentence=$("#senList").find(".ess-right-list-item").eq(_paraNum-1).find(".sentence-item").eq(_senNum-1);
                        	var start=time;
                        	var end=$(activeSentence).attr("data-end");
                        	clickSentence(start,end,$(activeSentence));
                        	
                        }
                        
                        if(_currentSentenceId>0 && _currentSentenceId!=val.sentenceId){
                        	sentenceListenEnd(_currentSentenceId);
                        	}
                        _currentSentenceId = val.sentenceId;
                        
                    }
                });
                
                
                /*右侧句子列表*/
                $("#senList").find(".ess-right-list-item").find(".sentence-item").removeClass("ess-right-playing ess-right-playing-stop");
                if($(".play-btn").attr("isPlay")=="0"){
                	$("#senList").find(".ess-right-list-item").eq(_paraNum-1).find(".sentence-item").eq(_senNum-1).addClass("ess-right-playing-stop");	
                }else{
                	$("#senList").find(".ess-right-list-item").eq(_paraNum-1).find(".sentence-item").eq(_senNum-1).addClass("ess-right-playing");
                }
                
                
	            $("#articleCon").find(".article-item-en").css("display","none").removeClass("green");
            	$("#articleCon").find(".article-item-ch").css("display","none").removeClass("green");
                if(_listenPattern===0){//句子精听
                	$("#articleCon").find(".article-item").find(".article-item-para").css("display","none");
                	if($("#seeOriginal").attr("data-see")=="1"){
                       $("#articleCon").find(".sentence-list").eq(_paraNum-1).find(".article-item-en").eq(_senNum-1).css("display","block").addClass("green");
                	}
                    if($("#seeTrans").attr("data-see")=="1"){
                       $("#articleCon").find(".sentence-list").eq(_paraNum-1).find(".article-item-ch").eq(_senNum-1).css("display","block").addClass("green");
                    }
                }else if(_listenPattern===3){//听写模式
                	 $(".ess-tip-con").css("display","none");
                     $("#articleCon").css("display","none");
                     $("#dictionCon").css("display","block");
                     $("#dictionCon").find(".diction-para").css("display","none").eq(_paraNum-1).css("display","block").find(".diction-item").css("display","none").eq(_senNum-1).css("display","block");
                     /* if($("#jquery_jplayer_1").data("jPlayer").status.paused){
                    	$("#dictionCon").find(".diction-para").eq(_paraNum-1).find(".diction-item").eq(_senNum-1).find(".pannel-word:first").focus();
                     }  */
                     
                     
                     /*设置input宽度*/
                     $.each($("#dictionCon").find(".diction-para").eq(_paraNum-1).find(".diction-item").eq(_senNum-1).find(".is-words-hide"),function(index,value){
                         var wordLength=$(this).text().length;
                         $(this).parent().parent().css("width",(wordLength*10+20));
                     })
                }
                else{
	                    if(_listenPattern===1){//段落精听
	                        if($("#seeOriginal").attr("data-see")=="1"){
	                        	$("#articleCon").find(".article-item-para").css("display","none").eq(_paraNum-1).css("display","block");                         
	                        	$("#articleCon").find(".sentence-list").eq(_paraNum-1).find(".article-item-en").css("display","block").eq(_senNum-1).addClass("green");
	                        }
	                        if($("#seeTrans").attr("data-see")=="1"){
	                        	$("#articleCon").find(".article-item-para").css("display","none").eq(_paraNum-1).css("display","block");                         
	                        	$("#articleCon").find(".sentence-list").eq(_paraNum-1).find(".article-item-ch").css("display","block").eq(_senNum-1).addClass("green");
	                        }

                        }else if(_listenPattern===2){//全文精听
	                    	$("#articleCon").find(".article-item-para").css("display","block");
	                    	if($("#seeOriginal").attr("data-see")=="1"){                        	 
	                            $("#articleCon").find(".sentence-list").find(".article-item-en").css("display","block");
	                            $("#articleCon").find(".sentence-list").eq(_paraNum-1).find(".article-item-en").eq(_senNum-1).addClass("green");
	                        }
	                        if($("#seeTrans").attr("data-see")=="1"){
	                        	$("#articleCon").find(".sentence-list").find(".article-item-ch").css("display","block");
	                        	$("#articleCon").find(".sentence-list").eq(_paraNum-1).find(".article-item-ch").eq(_senNum-1).addClass("green");
	                        }
                        }
	                    /*保持在中间位置*/
	                    if($("#seeOriginal").attr("data-see")=="1"){
	                    	var tmpSenTop=$("#articleCon").find(".sentence-list").eq(_paraNum-1).find(".article-item-en").eq(_senNum-1).offset().top;
	                    	var tmpConTop=$("#articleCon").offset().top+0.5*$("#articleCon").get(0).offsetHeight;
	                    	/* if($("#articleCon").find(".sentence-list").eq(_paraNum-1).find(".article-item-en").eq(_senNum-1).offset().top>($("#articleCon").offset().top+0.5*$("#articleCon").get(0).offsetHeight)){
	 	                       $(".ess-left-content").scrollTop($("#articleCon").find(".sentence-list").eq(_paraNum-1).find(".article-item-en").eq(_senNum-1).offset().top-$("#articleCon").offset().top-0.5*$("#articleCon").get(0).offsetHeight+40);
	                    	} */
	                    	if(tmpSenTop-tmpConTop){
		 	                       $(".ess-left-content").scrollTop(tmpSenTop-tmpConTop+40);
		                    }else{
		                    	$(".ess-left-content").scrollTop(0);
		                    }
	                    	
	                    }else if($("#seeTrans").attr("data-see")=="1"){
	                    	var tmpSenChTop=$("#articleCon").find(".sentence-list").eq(_paraNum-1).find(".article-item-ch").eq(_senNum-1).offset().top;
	                    	var tmpConTop=$("#articleCon").offset().top+0.5*$("#articleCon").get(0).offsetHeight	                    		
	                    	/* if($("#articleCon").find(".sentence-list").eq(_paraNum-1).find(".article-item-ch").eq(_senNum-1).offset().top>($("#articleCon").offset().top+0.5*$("#articleCon").get(0).offsetHeight)){
		 	                   $(".ess-left-content").scrollTop($("#articleCon").find(".sentence-list").eq(_paraNum-1).find(".article-item-ch").eq(_senNum-1).offset().top-$("#articleCon").offset().top-0.5*$("#articleCon").get(0).offsetHeight+40); */
		 	                if(tmpSenChTop>tmpConTop){
		 	                   $(".ess-left-content").scrollTop(tmpSenChTop-tmpConTop+40);
	                    	}else{
	                    		$(".ess-left-content").scrollTop(0);
	                    		}
	                    }
	                    
                    }
                }             
          
        });



        /*start播放开始时间number;
         end播放结束时间  number */
        function selectPlay(start,end) { 
             start=parseFloat(start);
        	 $(".play-btn").attr("isPlay", "1");
             $(".play-btn").addClass("play-btn1");
            if (end === "" || end === undefined) {
                 $("#jquery_jplayer_1").jPlayer("play"); 
            } else {
                window.clearInterval(playerTimer);
                playerTimer = null;
                $("#jquery_jplayer_1").jPlayer("play", start);
                $(".play-btn").attr("isPlay", "1");
                $(".play-btn").addClass("play-btn1");
                var count = 0, duration = ((end - start).toFixed(1)) * 10;
                if (duration > 0) {
                    playerTimer = window.setInterval(function () {
                        if (count <duration) {
                            count = count + 1;
                        } else {
                            $("#jquery_jplayer_1").jPlayer("pause",parseFloat(_beginTime));
                            $(".play-btn").attr("isPlay", "0");
                            window.clearInterval(playerTimer);
                            $(".play-btn").removeClass("play-btn1");
                            playerTimer = null;
                            count = null;
                            duration = null;
                            $(".ess-right-playing").addClass("ess-right-playing-stop").removeClass("ess-right-playing");
                        }
                    }, 100)
                } else {
                    $("#jquery_jplayer_1").jPlayer("play");
                }
            }
        }

        /*播放/暂停按钮*/
        $(".play-btn").on("click",play);
        function play(){
            /*当前播放进度*/
            var currentTime = $("#jquery_jplayer_1").data("jPlayer").status.currentTime;
            if ($(".play-btn").attr("isPlay") === "0") {//暂停中，播放视频
                window.clearInterval(playerTimer);
                playerTimer = null;
                $(".play-btn").attr("isPlay", "1");
                $(".play-btn").addClass("play-btn1");
                selectPlay(currentTime, _endTime);
                $(".ess-right-playing-stop").addClass("ess-right-playing").removeClass("ess-right-playing-stop");
            } else {//播放中，暂停视频
                /*清除定时器并且暂停*/
                window.clearInterval(playerTimer);
                playerTimer = null;
                $(".play-btn").attr("isPlay", "0");
                $(".play-btn").removeClass("play-btn1");
                $("#jquery_jplayer_1").jPlayer("pause");
                $("#senList").find(".ess-right-list-item").eq(_paraNum-1).find(".sentence-item").eq(_senNum-1).addClass("ess-right-playing-stop").removeClass("ess-right-playing");
            }
        }
        /*重听*/
         $("#againPlay").on("click", function () {
        	 var againSentence=$("#senList").find(".ess-right-list-item").eq(_paraNum-1).find(".sentence-item").eq(_senNum-1);
        	 var start=0,end=0;
           if(_listenPattern==1){
        	   start=$(againSentence).parent().find('li:first').attr("data-start");
           	   end=$(againSentence).parent().find('li:last').attr("data-end");
           }else{
        	   start=$(againSentence).attr("data-start");
        	   if(_listenPattern==2){
        		   end=_endTime;
        	   }else{
        		   end=$(againSentence).attr("data-end");        		   
        	   }
           }
           selectPlay(start,end);
        }); 
        $("#nextBtn").on("click",function(){
        	
        	if(_listenPattern==1){//按段
        		if(_paraNum==$("#senList").find(".ess-right-list-item").length){//最后一段
            		_paraNum=1;
            	}else{
            		_paraNum+=1;
            	}
        		_senNum=1;
        	}else{
        		if(_paraNum==$("#senList").find(".ess-right-list-item").length&&_senNum==$("#senList").find(".ess-right-list-item").eq(_paraNum-1).find(".sentence-item").length){//是最后一最后一句
            		_paraNum=1;
            		_senNum=1;
            	}else if(_senNum==$("#senList").find(".ess-right-list-item").eq(_paraNum-1).find(".sentence-item").length){//当前段的最后一句
            		_paraNum+=1;
            		_senNum=1;
            	}else{
            		 _senNum+=1;
            	}       		
        	}
        	 $("#senList").find(".ess-right-list-item").eq(_paraNum-1).find(".sentence-item").eq(_senNum-1).click();
        	
        })
        $("#preBtn").on("click",function(){
        	if(_listenPattern==1){//按段
        		if(_paraNum==1){//第一段
            		_paraNum=1;
            	}else{
            		_paraNum-=1;
            	}
        		_senNum=1;
        	}else{
        		if(_paraNum==1&&_senNum==1){//第一段第一句
            		_paraNum=1;
            		_senNum=1;
            	}else if(_senNum==1){//当前段的第一句
            		_paraNum-=1;
            		_senNum=$("#senList").find(".ess-right-list-item").eq(_paraNum-1).find(".sentence-item").length;
            	}else{
            		 _senNum-=1;
            	}            	 
        	}
        	$("#senList").find(".ess-right-list-item").eq(_paraNum-1).find(".sentence-item").eq(_senNum-1).click();
        })
        /*快速 慢速*/
        $("#rate-list").find(".rate-li").click(function () {
            var audioElm = $("#jp_audio_0")[0];
            var speed = $(this).find("span").text();
            $(".rate").find(".cur-rate").text(speed);
            audioElm.playbackRate = speed;
        });

        /*模式切换*/
        $(".ess-tab-list").find("li").each(function (index, value) {
            $(value).on("click", function () {
                $(".ess-see-con").find(".ess-see-con-triangle").removeClass().addClass("ess-see-con-triangle ess-see-con-triangle" + index);
                $(".ess-tip-con").css("display","block");
                $("#articleCon").css("display","none");
                $("#dictionCon").css("display","none");
                $("#seeOriginal").attr("data-see","0").removeClass("hover");
                $("#seeTrans").attr("data-see","0").removeClass("hover");
                $("#articleCon").find(".article-item-para").css("display","none");
                $("#articleCon").find(".article-item-en").css("display","none").removeClass("green");
                $("#articleCon").find(".article-item-ch").css("display","none").removeClass("green");
                _listenPattern=index;
                if(_listenPattern===1){//上一段下一段
                    $("#preBtn").find(".pre-btn-tip").find(".btn-tip-text").text("上一段");
                    $("#nextBtn").find(".next-btn-tip").find(".btn-tip-text").text("下一段");
                    $("#againPlay").find(".again-play-tip").find(".btn-tip-text").text("播放当前段");
                }else{
                    $("#preBtn").find(".pre-btn-tip").find(".btn-tip-text").text("上一句");
                    $("#nextBtn").find(".next-btn-tip").find(".btn-tip-text").text("下一句");
                    $("#againPlay").find(".again-play-tip").find(".btn-tip-text").text("播放当前句");
                }
                var curSentence=$("#senList").find(".ess-right-list-item").eq(_paraNum-1).find(".sentence-item").eq(_senNum-1);
                var currentTime = $("#jquery_jplayer_1").data("jPlayer").status.currentTime;
                if(_listenPattern==0){
                	_beginTime=$(curSentence).attr("data-start");
                	_endTime=$(curSentence).attr("data-end");
                }else if(_listenPattern==1){
                	_beginTime=$(curSentence).parent().find('li:first').attr("data-start");
                	_endTime=$(curSentence).parent().find('li:last').attr("data-end");
                }else if(_listenPattern==2){
                	_beginTime=0;
                	_endTime=$("#senList").find(".ess-right-list-item:last").find(".sentence-item:last").attr("data-end");
                }else if(_listenPattern===3){
                	_beginTime=$(curSentence).attr("data-start");
                	_endTime=$(curSentence).attr("data-end");
                    $(".ess-tip-con").css("display","none");
                    $("#articleCon").css("display","none");
                    $("#dictionCon").css("display","block");
                    $("#dictionCon").find(".diction-para").css("display","none").eq(_paraNum-1).css("display","block").find(".diction-item").css("display","none").eq(_senNum-1).css("display","block");
                    /* if($("#jquery_jplayer_1").data("jPlayer").status.paused){
                   	    $("#dictionCon").find(".diction-para").eq(_paraNum-1).find(".diction-item").eq(_senNum-1).find(".pannel-word:first").focus()
                    }  */
                    /*设置input宽度*/
                    $.each($("#dictionCon").find(".diction-para").eq(_paraNum-1).find(".diction-item").eq(_senNum-1).find(".is-words-hide"),function(index,value){
                         var wordLength=$(this).text().length;
                         $(this).parent().parent().css("width",(wordLength*10+20));
                     })          
                }
                var tmpTimeArr=[];
                tmpTimeArr=$(".jp-duration").text().split(":");
                var tmpDuration=parseFloat(tmpTimeArr[0])*60+parseFloat(tmpTimeArr[1]);
                if(_endTime>tmpDuration){            	
                	_endTime=tmpDuration;
                }
                if(!$("#jquery_jplayer_1").data("jPlayer").status.paused){
                	selectPlay(currentTime,_endTime);
                }
            })
            
        })
       /*看原文*/
        $("#seeOriginal").on("click",seeOriginal);
        /*看译文*/
        $("#seeTrans").on("click",seeTrans);

        function seeOriginal(){
                if($(this).attr("data-see")=="0"){
                    $(this).attr("data-see","1").addClass("hover");
                    $(".ess-tip-con").css("display","none");
                    $("#dictionCon").css("display","none");
                    $("#articleCon").css("display","block");
                    $("#articleCon").find(".article-item-para").css("display","none");
                    $("#articleCon").find(".article-item-en").css("display","none").removeClass("green");
                    switch (_listenPattern){
                        case 0:
                            $("#articleCon").find(".sentence-list").eq(_paraNum-1).find(".article-item-en").eq(_senNum-1).css("display","block").addClass("green");
                            break;
                        case 1:
                            $("#articleCon").find(".article-item-para").eq(_paraNum-1).css("display","block");
                            $("#articleCon").find(".sentence-list").eq(_paraNum-1).find(".article-item-en").css("display","block").eq(_senNum-1).addClass("green");
                            break;
                        case 2:
                            $("#articleCon").find(".article-item-para").css("display","block");
                            $("#articleCon").find(".sentence-list").find(".article-item-en").css("display","block").eq(_senNum-1).addClass("green");
                            break;
                        default:
                            $(".ess-tip-con").css("display","none");
                            $("#articleCon").css("display","none");
                            $("#dictionCon").css("display","block");
                            $(".diction-word").find(".pannel-word").css("display","none");
                            $(".diction-word").find(".pannel-answer").each(function (index, val) {
                                $(this).val($(this).next().next().find(".is-words-hide").text()).css("display","block").parent().addClass("diction-word-see");
                                if($.trim($(this).val().toLowerCase())===$(this).next().val().toLowerCase()){
                                    $(this).addClass("green");
                                }
                            })

                    } 
                }else{
                    $(this).attr("data-see","0").removeClass("hover");
                    switch (_listenPattern){
                    case 0:
                    	$("#articleCon").find(".sentence-list").find(".article-item-en").css("display","none").removeClass("green");
                        if($("#seeTrans").attr("data-see")=="0"){
                        	$(".ess-tip-con").css("display","block");
                            $("#articleCon").css("display","none");
                        }
                        break;
                    case 1:
                        $("#articleCon").find(".sentence-list").eq(_paraNum-1).find(".article-item-en").css("display","none").removeClass("green");
                        if($("#seeTrans").attr("data-see")=="0"){
                        	$("#articleCon").find(".article-item-para").eq(_paraNum-1).css("display","none");
                        	$(".ess-tip-con").css("display","block");
                            $("#articleCon").css("display","none");
                        }
                        break;
                    case 2:
                        $("#articleCon").find(".sentence-list").find(".article-item-en").css("display","none").removeClass("green");
                        if($("#seeTrans").attr("data-see")=="0"){
                        	$("#articleCon").find(".article-item-para").css("display","none");
                        	$(".ess-tip-con").css("display","block");
                            $("#articleCon").css("display","none");
                        }
                        break;
                    default:
                    	 $(".ess-tip-con").css("display","none");
                    $("#articleCon").css("display","none");
                    $("#dictionCon").css("display","block");
                    $(".diction-word").find(".pannel-word").css("display","block").prev().css("display","none").parent().removeClass("diction-word-see");

                    }
              }
        }
        function seeTrans(){
            if($(this).attr("data-see")=="0"){
                $(this).attr("data-see","1").addClass("hover");
                $(".ess-tip-con").css("display","none");
                $("#dictionCon").css("display","none");
                $("#articleCon").css("display","block");
                $("#articleCon").find(".article-item-para").css("display","none");
                $("#articleCon").find(".article-item-ch").css("display","none").removeClass("green");
                switch (_listenPattern){
                    case 0:
                        $("#articleCon").find(".sentence-list").eq(_paraNum-1).find(".article-item-ch").eq(_senNum-1).css("display","block").addClass("green");
                        break;
                    case 1:
                    	$("#articleCon").find(".article-item-para").eq(_paraNum-1).css("display","block");
                        $("#articleCon").find(".sentence-list").eq(_paraNum-1).find(".article-item-ch").css("display","block").eq(_senNum-1).addClass("green");
                        break;
                    case 2:
                    	 $("#articleCon").find(".article-item-para").css("display","block");
                         $("#articleCon").find(".sentence-list").find(".article-item-ch").css("display","block").eq(_senNum-1).addClass("green");
                         break;
                    default:
                        $(".ess-tip-con").css("display","none");
                        $("#articleCon").css("display","none");
                        $("#dictionCon").css("display","block");
                        $("#dictionCon").find(".diction-item-ch").css("display","block");
                }
            }else{
                $(this).attr("data-see","0").removeClass("hover");
                switch(_listenPattern){
                case 0:
                	$("#articleCon").find(".sentence-list").find(".article-item-ch").css("display","none").removeClass("green");
                	if($("#seeOriginal").attr("data-see")=="0"){
                    	$(".ess-tip-con").css("display","block");
                        $("#articleCon").css("display","none");
                    }
                    break;
                case 1:
                    $("#articleCon").find(".sentence-list").eq(_paraNum-1).find(".article-item-ch").css("display","none").eq(_senNum-1).removeClass("green");
                    if($("#seeOriginal").attr("data-see")=="0"){
                    	$("#articleCon").find(".article-item-para").eq(_paraNum-1).css("display","none");
                    	$(".ess-tip-con").css("display","block");
                        $("#articleCon").css("display","none");
                    }
                    break;
                case 2:
                	 $("#articleCon").find(".sentence-list").find(".article-item-ch").css("display","none").removeClass("green");
                     if($("#seeOriginal").attr("data-see")=="0"){
                     	$("#articleCon").find(".article-item-para").css("display","none");
                     	$(".ess-tip-con").css("display","block");
                         $("#articleCon").css("display","none");
                     }
                     break;
                	
                default:
                	$(".ess-tip-con").css("display","none");
	                $("#articleCon").css("display","none");
	                $("#dictionCon").css("display","block");
	                $("#dictionCon").find(".diction-item-ch").css("display","none");
                }
            }
        }

        /*点击某个句子*/
        function clickSentence (start,end,that){
        	$("#senList").find(".sentence-item").removeClass("ess-right-playing ess-right-playing-stop");      	
            var curSentence=that;
            $(curSentence).addClass("ess-right-playing");
            var currentTime = start;
            if(_listenPattern==0||_listenPattern==3){
            	_beginTime=$(curSentence).attr("data-start");
            	_endTime=$(curSentence).attr("data-end");
            }else if(_listenPattern==1){
            	_beginTime=$(curSentence).parent().find('li:first').attr("data-start");
            	_endTime=$(curSentence).parent().find('li:last').attr("data-end");
            }else if(_listenPattern==2){
            	_beginTime=0;
            	_endTime=$("#senList").find(".ess-right-list-item:last").find(".sentence-item:last").attr("data-end");
            }else if(_listenPattern===3){
            	_beginTime=$(curSentence).attr("data-start");
            	_endTime=$(curSentence).attr("data-end");
            }
            var tmpTimeArr=[];
            tmpTimeArr=$(".jp-duration").text().split(":");
            var tmpDuration=parseFloat(tmpTimeArr[0])*60+parseFloat(tmpTimeArr[1]);
            if(_endTime>tmpDuration){            	
            	_endTime=tmpDuration;
            }
            selectPlay(currentTime,_endTime); 
        }
        
        /*快捷键*/
        $(document).keydown(function(event){
            if(event.keyCode===32){//空格
                play();
            }else if(event.keyCode==219){// [ 上一句
            	$("#preBtn").click();
            }else if(event.keyCode===221){// ] 下一句
            	$("#nextBtn").click();
            }else if(event.keyCode===220){// \重听
            	 $("#againPlay").click();
            }

        });
            /*听写获得焦点*/
        $(".diction-word").find(".pannel-word").focus(function(){
            if(!$(this).hasClass("green")){
                $(this).removeClass("wrong");
                $(this).next().css("display","block");
            }
        }).blur(function(){
            if($.trim($(this).val().toLowerCase())===$(this).next().find(".is-words-hide").text().toLowerCase()){
                $(this).attr("readonly",true).addClass("green").removeClass("wrong");
                $(this).next().css({
                    "display":"none"
                });
            }else{
               if($.trim($(this).val().toLowerCase())!==""){
                   $(this).addClass("wrong");
               }else{
                   $(this).next().css({
                       "display":"none"
                   });
               }
            }
        })


    



</script>
 