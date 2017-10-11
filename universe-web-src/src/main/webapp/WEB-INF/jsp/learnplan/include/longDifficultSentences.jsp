<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<link rel="stylesheet" href="${basePath}/css/longDifficultSentences.css"/>


<!--中间内容模块开始-->
<div class="layout none" id="main">
    <h2 class="ex-t" id="groupName">长难句 TPO14-1</h2>

    <div class="con doing1">
        <div class="ex-h">
            <span class="num">第1句/共5句</span>
            <span class="step">Step1划分句子</span>
            <span class="fr ex-d"></span>
        </div>
        <div class="ex-main">
            <div class="ex-tishi">提示：
                <div class="ex-tishi-con">
                <p class="ex-tishi-t" id="tsList">
                </p>                    
                </div>
            </div>
            <div id="sandbox">
               <!--  <p id="content" class="ex-sen">Sensitivity to physical laws is thus an important consideration for the maker of applied-art objects.</p> -->
            </div>

        </div>
        <p id="trans" class="translation">译文：因此，对物理定律的敏感性是一个重要的考虑因素</p>
        <div class="btn-box">
            <a href="javascript:;" class="see-trans" id="seeTrans1">查看译文</a>
            <a href="javascript:;" class="reset" id="remove">清除答案</a>
        </div>
        <div class="bottom-btn">
            <a id="nextBtn1" href="javascript:;" class="next-btn gray-btn" title="做完题后才能进行下一步哦！">下一步</a>
        </div>
    </div>
    <div class="con dfSenResult1 none">
        <div class="ex-h">
            <span class="num">第1句/共5句</span>
            <span class="step">Step1划分句子</span>
        </div>
        <p class="re-t"></p>
        <div class="answer an-my">我的答案：
            <p class="ex-sen myAnswer">
                <!-- <span class="orange-bg orange-font">Sensitivity to physical laws is</span>
                <span class="orange-bg orange-font">thus an important consideration</span>
                <span class="orange-bg">for the maker of applied-art objects.</span> -->
             </p>
             <p class="ex-sen comAnswer"></p>
        </div>
        <div class="answer">正确答案：
            <p class="ex-sen rightAnswer">
               <!--  <span class="orange-bg">Sensitivity to physical laws</span>
                <span class="orange-bg">is thus an important consideration</span>
                <span class="orange-bg">for the maker of applied-art objects.</span> -->
            </p>
        </div>
        <div class="bottom-btn">
            <a id="nextBtn2" href="javascript:;" class="next-btn orange-btn">下一步</a>
        </div>
    </div>
    <div class="con doing2 none">
        <div class="ex-h">
            <span class="num">第1句/共5句</span>
            <span class="step">Step2重组句子</span>
        </div>
        <div class="df-steps" >
            <ul class="df-steps-list" id="stepsList" >
               <!--  <li class="df-steps-li"><span class="s-default"></span></li> -->
            </ul>
        </div>
        <p class="translation" id="trans2">译文：因此，对物理定律的敏感性是一个重要的考虑因素</p>
        <div class="btn-box">
            <a href="javascript:;" class="see-trans" id="seeTrans2">查看译文</a>
            <a href="javascript:;" class="reset" id="reset">清除答案</a>
        </div>
        <hr class="split"/>
        <div class="sentences">备选句子
            <ul class="sen-list" id="senList">
                <!-- <li class="sen-li" data-sort="0">is thus</li> -->
            </ul>
        </div>
        <div class="bottom-btn">
            <a id="nextBtn3" href="javascript:;" class="next-btn gray-btn" title="做完题后才能进行下一步哦！">下一步</a>
        </div>
    </div>
    <div class="con dfSenResult2 none">
        <div class="ex-h">
            <span class="num">第1句/共5句</span>
            <span class="step">Step2重组句子</span>
        </div>
        <p class="re-t"></p>
        <div class="answer an-my">我的答案：
            <p class="ex-sen myAnswer">
                <!-- <span class="orange-bg">Sensitivity to</span> -->
            </p>
        </div>
        <div class="answer">正确答案：
            <p class="ex-sen rightAnswer">
                <!-- <span class="orange-bg">Sensitivity to</span> -->
            </p>
        </div>
        <div class="bottom-btn">
            <a id="nextBtn4" href="javascript:;" class="next-btn orange-btn">下一句</a>
        </div>
    </div>
</div>
<div id="longResult" class="result none">
    <h2 class="ex-t">练习报告</h2>
    <div class="score">
        <span class="rate">正确率：90%</span>
        <span class="avgSpeed">平均速度：4.09S/题</span>
    </div>
    <ul class="result-list">
        <!-- <li class="result-list-li">
            <p class="r-p1">第1句</p>
            <p class="r-p2">step1：<span class="isPass1"></span></p>
            <div class="answer mt15">我的答案：
                <p class="ex-sen myAnswer"></p>
                <p class="ex-sen comAnswer"></p>
            </div>
            <p class="mt15">step2：<span class="isPass1"></span></p>
            <div class="answer mt15">我的答案：
                <p class="ex-sen"></p>
            </div>
            <div class="answer mt15">正确答案：
            <p class="ex-sen rightAnswer"></p>
            </div>
            <hr class="li-split"/>
        </li> -->
    </ul>
    <div class="bottom-btn">
        <a id="lDFAgain" href="javascript:;" class="re-btn againBtn">再来一遍</a>
        <a id="lDFError" href="javascript:;" class="re-btn errorBtn">重做错题</a>
    </div>
</div>
<div class="layout" id="layout">
    <h2 class="ex-t">长难句 TPO14-1</h2>

    <div class="con doing1">
        <div class="ex-h">
            <span class="num">第1句/共5句</span>
            <span class="step">Step1划分句子</span>
            <span class="fr ex-d">点击单词对以下句子划分成分</span>
        </div>
        <div class="ex-main">
            <div class="ex-tishi">提示：
                <div class="ex-tishi-con">
                    <p class="ex-tishi-t">1. 句子分为3部分</p>
                    <p class="ex-tishi-t">2. 主语单独为一部分，把consideration和它的后置定语断开。</p>
                </div>
            </div>
            <div>
                <p class="ex-sen">Sensitivity to physical laws is thus an important consideration for the maker of applied-art objects.</p>
            </div>

        </div>
        <p class="translation">译文：因此，对物理定律的敏感性是一个重要的考虑因素</p>
        <div class="btn-box">
            <a href="javascript:;" class="see-trans" >查看译文</a>
            <a href="javascript:;" class="reset">清除答案</a>
        </div>
        <div class="bottom-btn mbottom">
            <a href="javascript:;" class="next-btn gray-btn " title="做完题后才能进行下一步哦！">下一步</a>
        </div>
    </div>
    <div class="con dfSenResult1 none">
        <div class="ex-h">
            <span class="num">第1句/共5句</span>
            <span class="step">Step1划分句子</span>
        </div>
        <p class="re-t wrong">回答错误！</p>
        <div class="answer an-my">我的答案：
                <p class="ex-sen"><span class="orange-bg orange-font">Sensitivity to physical laws is</span>
                    <span class="orange-bg orange-font">thus an important consideration</span>
                    <span class="orange-bg">for the maker of applied-art objects.</span></p>
        </div>
        <div class="answer">正确答案：
                <p class="ex-sen"><span class="orange-bg">Sensitivity to physical laws</span>
                    <span class="orange-bg">is thus an important consideration</span>
                    <span class="orange-bg">for the maker of applied-art objects.</span>
                </p>
         </div>
        <div class="bottom-btn mbottom">
            <a href="javascript:;" class="next-btn orange-btn " title="做完题后才能进行下一步哦！">下一步</a>
        </div>
    </div>
    <div class="con doing2 none">
        <div class="ex-h">
            <span class="num">第1句/共5句</span>
            <span class="step">Step2重组句子</span>
        </div>
       <div class="df-steps" >
          <ul class="df-steps-list" >
               <li class="df-steps-li"><span class="s-default"></span></li>
               <li class="df-steps-li"><span class="s-default"></span></li>
               <li class="df-steps-li"><span class="s-default"></span></li>
               <li class="df-steps-li"><span class="s-default"></span></li>
               <li class="df-steps-li"><span class="s-default"></span></li>
               <li class="df-steps-li"><span class="s-default"></span></li>
           </ul>
       </div>
        <p class="translation">译文：因此，对物理定律的敏感性是一个重要的考虑因素</p>
        <div class="btn-box">
            <a href="javascript:;" class="see-trans">查看译文</a>
            <a href="javascript:;" class="reset">清除答案</a>
        </div>
        <hr class="split"/>
        <div class="sentences">备选句子
        <ul class="sen-list">
            <li class="sen-li" data-sort="0">is thus</li>
            <li class="sen-li" data-sort="1">for the maker of</li>
            <li class="sen-li" data-sort="2">Sensitivity to</li>
            <li class="sen-li" data-sort="3">the physical laws</li>
            <li class="sen-li" data-sort="4">applied-art objects</li>
            <li class="sen-li" data-sort="5">physical laws</li>
            <li class="sen-li" data-sort="6">an important consideration</li>
        </ul>
        </div>
        <div class="bottom-btn mbottom">
            <a href="javascript:;" class="next-btn gray-btn " title="做完题后才能进行下一步哦！">下一步</a>
        </div>
    </div>
    <div class="con dfSenResult2 none">
        <div class="ex-h">
            <span class="num">第1句/共5句</span>
            <span class="step">Step2重组句子</span>
        </div>
        <p class="re-t rightAn">回答正确！</p>
        <div class="answer an-my">我的答案：
            <p class="ex-sen">
                <span class="orange-bg">Sensitivity to</span>
                <span class="orange-bg">physical laws</span>
                <span class="orange-bg">is thus</span>
                <span class="orange-bg">an important consideration</span>
                <span class="orange-bg">for the maker of</span>
                <span class="orange-bg">applied-art objects.</span>
            </p>
        </div>
        <div class="answer">正确答案：
            <p class="ex-sen">
                <span class="orange-bg">Sensitivity to</span>
                <span class="orange-bg">physical laws</span>
                <span class="orange-bg">is thus</span>
                <span class="orange-bg">an important consideration</span>
                <span class="orange-bg">for the maker of</span>
                <span class="orange-bg">applied-art objects.</span>
            </p>
        </div>
        <div class="bottom-btn mbottom">
            <a href="javascript:;" class="next-btn orange-btn" title="做完题后才能进行下一步哦！">下一句</a>
        </div>
    </div>
</div>
<!--中间内容模块结束-->
<div class="fix_foot">
    <div class="m">
        <div class="tip" style="display: none;">
            <h2>欢迎使用精英计划 <span class="darkClose">&times; </span></h2>

            <p class="tip_text">点击这里可以看到本节所有练习题哦！加油吧！</p>
            <span class="triangle"></span>
        </div>
        <span class="show"></span>
        <span class="m_name">口语</span>

        <div class="bar"><p class="moveBar"></p></div>
        <a class="next_btn" href="javascript:;">下个练习</a>
    </div>
</div>
<div id="mask" class="mask">
    <div class="guide g1">
        <div class="mark m1">Sensitivity to physical laws
            <div class="t-box">鼠标滑过单词，划分句子第1个成分
            <i class="icon-drop"></i>
                <a href="javascript:;" class="m-btn m-btn-left">Skip</a>
                <a href="javascript:;" class="m-btn m-btn-right" data-step="g2">Next</a>
            </div>
        </div>
    </div>
    <div class="guide g2 none">
        <div class="mark m2">is thus an important consideration
            <div class="t-box">鼠标滑过单词，划分句子第2个成分
                <i class="icon-drop"></i>
                <a href="javascript:;" class="m-btn m-btn-left">Skip</a>
                <a href="javascript:;" class="m-btn m-btn-right" data-step="g3">Next</a>
            </div>
        </div>
    </div>
    <div class="guide g3 none">
        <div class="mark m3">
            <div class="t-box">全部划分完成后，点击这里进行下一步
                <i class="icon-drop"></i>
                <a href="javascript:;" class="m-btn m-btn-left">Skip</a>
                <a href="javascript:;" class="m-btn m-btn-right" data-step="g4">Next</a>
            </div>
        </div>
    </div>
    <div class="guide g4 none">
        <div class="mark m4">
            <div class="t-box">点击这里进入句子重组部分
                <i class="icon-drop"></i>
                <a href="javascript:;" class="m-btn m-btn-left">Skip</a>
                <a href="javascript:;" class="m-btn m-btn-right" data-step="g5">Next</a>
            </div>
        </div>
    </div>
    <div class="guide g5 none">
        <div class="mark m5">is thus
            <div class="t-box">点击备选句子，选择填空
                <i class="icon-drop"></i>
                <a href="javascript:;" class="m-btn m-btn-left">Skip</a>
                <a href="javascript:;" class="m-btn m-btn-right" data-step="g6">Next</a>
            </div>
        </div>
    </div>
    <div class="guide g6 none">
        <div class="mark m6">Sensitivity to
            <div class="t-box">点击这里，清除答案
                <i class="icon-drop"></i>
                <a href="javascript:;" class="m-btn m-btn-left">Skip</a>
                <a href="javascript:;" class="m-btn m-btn-right" data-step="g7">Next</a>
            </div>
        </div>
    </div>
    <div class="guide g7 none">
        <div class="mark m7">
            <div class="t-box">空格全部填写后，点击这里进行下一步
                <i class="icon-drop"></i>
                <a href="javascript:;" class="m-btn m-btn-left">Skip</a>
                <a href="javascript:;" class="m-btn m-btn-right" data-step="g8">Next</a>
            </div>
        </div>
    </div>
    <div class="guide g8 none">
        <div class="mark m8">
            <div class="t-box">点击这里，进行下一句
                <i class="icon-drop"></i>
                <a href="javascript:;" class="m-btn m-btn-left m-btn-done">Done</a>
               <!-- <a href="javascript:;" class="m-btn m-btn-right">Next</a>-->
            </div>
        </div>
    </div>
</div>
 
<script type="text/javascript" src="${basePath}/js/lib/TextHighlighter.js"></script>
<script type="text/javascript">
$(function(){
	var hasTip=${hasTip};
	var groupQuestion = ${groupQuestion};
	var xm_groupId = "${currentExercise.levelOne}";
	var xm_planDayId = "${dayInfo.dayId}";
	var xm_exerciseId = "${currentExercise.id}";
	var xm_startTime='', xm_endTime='',xm_spendTime=0,xmTimer=null;
	var xm_groupId=groupQuestion.id;
	
	
	var date=getTime();
    xm_startTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
    
    $("#groupName").html("长难句  "+groupQuestion.groupName);
    var seIndex=0,totalCount=groupQuestion.questions.length;//当前问题索引   问题总个数
    var questionId="";
    var userAnswer1=[],userAnswer2=[];//step1问题答案,step2问题答案，
    var userResults=[],userResult={};//保存每次提交答案后的返回信息
    var longErrorArr=[];//错题集合
    var longErrorErrArr=[];//重做错题中错题集合
    var errorFlag=0;//做错题标记
    
    
	if(groupQuestion.results){//做过题
		$("body").css("overflow-y","scroll");
		$("#mask").hide();
    	$("#layout").hide();
        $("#main").hide();
        $("#longResult").show();     
        $("#longResult .rate").text("正确率："+groupQuestion.results.rate+"%");
    	$("#longResult .avgSpeed").text("平均速度："+groupQuestion.results.avg_speed+"S/题");
    	//错题集合
    	$.each(groupQuestion.results.questionresults,function(index,value){
    		if(value.resultOrganizing.isPass==0||value.resultSplit.isPass==0){
    			var errId=value.questionId;
    			$.each(groupQuestion.questions,function(index1,value1){
        			if(value1.id==errId){
        				longErrorErrArr.push(index1);
        				return false;
        			}
        		})
    		}
    	})
    	if(longErrorErrArr.length==0){
    		$("#lDFError").hide();
    	}else{
     		$("#lDFError").show();
     	}
    	/*结果页面*/
    	var resultStr="";    	
    	$.each(groupQuestion.questions,function(index,value){
    		resultStr+="<li class='result-list-li'><p class='r-p1'>第"+(index+1)+"句</p><p class='r-p2'>step1：<span class='isPass1'></span></p><div class='answer mt15'>我的答案：<p class='ex-sen myAnswer'></p><p class='ex-sen comAnswer'></p></div>";
    		resultStr+="<p class='r-p2 mt15'>step2：<span class='isPass2'></span></p><div class='answer mt15'>我的答案：<p class='ex-sen myAnswer2'></p></div><div class='answer mt15'>正确答案：<p class='ex-sen rightAnswer'></p></div>";
    		if(index==groupQuestion.questions.length-1||groupQuestion.questions.length==1){
            	resultStr+="</li>";
            }else{
            	resultStr+="<hr class='li-split'/></li>";
            }
    	});
    	$("#longResult .result-list").html(resultStr);
    	$.each(groupQuestion.results.questionresults,function(index,value){
    		var myAnswers1="",myAnswers2="",rightAnswers="";
    		/* 正确答案 */
    		$.each(value.resultSplit.answers,function(index1,value1){
    			if(value1.is_correct==0){
    				myAnswers1+=value1.content;	
    				rightAnswers+=value1.content;
    			}else if(value1.is_correct==1){
    				myAnswers1+="<span>"+value1.content+"</span>";
    				rightAnswers+="<span class='orange-bg'>"+value1.content+"</span>";
    			}else if(value1.is_correct==2){
    				myAnswers1+="<span class='orange-font'>"+value1.content+"</span>";
    				rightAnswers+="<span class='orange-bg'>"+value1.content+"</span>";
    			}	        		
    		});
    		var str="";//原始句子
    		var tmpId=value.questionId;
    		$.each(groupQuestion.questions,function(a,b){
    			if(b.id==tmpId){
    				str=b.sentence;
    				return false;
    			}
    				
    		})
    		var newSenStr="";
    		var indexArr=value.resultSplit.userSelects;//用户划分index集合
    		for(j=0;j<indexArr.length;j++){
    			 if(j==0){
    				if(indexArr[j].startIndex>0){
    					newSenStr+="<span style='color: transparent;'>"+str.substring(0,indexArr[j].startIndex)+"</span>";
        			}
    			}else{
    				if(indexArr[j].startIndex>indexArr[j-1].endIndex){
    					newSenStr+="<span style='color: transparent;'>"+str.substring(indexArr[j-1].endIndex,indexArr[j].startIndex)+"</span>";
    				}    				
    			}   			
    			newSenStr+=getNewSen(str,indexArr[j].startIndex,indexArr[j].endIndex);
    			 if(j==indexArr.length-1){
					if(indexArr[j].endIndex<str.length){
						newSenStr+="<span style='color: transparent;'>"+str.substring(indexArr[j].endIndex)+"</span>";
					}
				} 
    		}
    		function getNewSen (sen,start,end){
    			return ("<span class='orange-bg' style='color: transparent;'>"+sen.substring(start,end)+"</span>");    			
    		} 
    		
    		$("#longResult .result-list-li").eq(index).find(".myAnswer").html(newSenStr).css("color","transparent").find(".highlighted").css("color","transparent");
    		$("#longResult .result-list-li").eq(index).find(".comAnswer").html(myAnswers1);
    		$("#longResult .result-list-li").eq(index).find(".rightAnswer").html(rightAnswers);    		
    		if(value.resultSplit.isPass){
    			$("#longResult .isPass1").eq(index).addClass("rightAn").html("正确");//结果页面
    		}else{
    			$("#longResult .isPass1").eq(index).addClass("wrong").html("错误");//结果页面
    		}      		
    		$.each(value.resultOrganizing.answers,function(index2,value2){
    			if(value2.is_correct==0){
    				myAnswers2+=value2.content;	
    			}else if(value2.is_correct==1){
    				myAnswers2+="<span class='orange-bg'>"+value2.content+"</span>";
    			}else if(value2.is_correct==2){
    				myAnswers2+="<span class='orange-bg orange-font'>"+value2.content+"</span>";
    			}	        		
    		})
    		/* 结果页面 */
    		$("#longResult .result-list-li").eq(index).find(".myAnswer2").html(myAnswers2);
    		
    		if(value.resultOrganizing.isPass){
    			$("#longResult .isPass2").eq(index).addClass("rightAn").html("正确");//结果页面
    		}else{
    			$("#longResult .isPass2").eq(index).addClass("wrong").html("错误");//结果页面
    		}
    		
    		
    		
    	})
    	
        
	}else{//没有做过题目
		renderDate(seIndex);
		if(!hasTip){//是第一次打开
	    	//$.cookie('xm_lDsen',"1",{ expires: 30});	    	
	    	$("#mask").on("click",".m-btn-left",function(e){
	            $("#mask").hide();
	            $("body").css("overflow-y","scroll");
	            $("#layout").hide();
	            $("#main").show();
	            xmTimer=window.setInterval(function(){
	            	xm_spendTime++;
	            },1000);
	        }).on("click",".m-btn-right",function(e){
	            var nextStep=$(this).attr("data-step");
	            $("#mask .guide").hide();
	            if(nextStep=="g4"){
	                $("#layout .con").hide();
	                $("#layout .dfSenResult1").show();
	            }else if(nextStep=="g5") {
	                $("#layout .con").hide();
	                $("#layout .doing2").show();
	            }else if(nextStep=="g8"){
	                $("#layout .con").hide();
	                $("#layout .dfSenResult2").show();
	            }
	            $("#mask ."+nextStep).show();
	        })
	    }else{/*跳过提示*/
	    	$("#mask").hide();
	    	$("#layout").hide();
	        $("#main").show();
	        $("body").css("overflow-y","scroll");
	        xmTimer=window.setInterval(function(){
	        	xm_spendTime++;
	        },1000);
	    } 
	}
       
    
	
	
	
    
    
    function renderDate(index,flag){//索引，是否是重做错题
    	var sentenceIndex="";
    	if(flag){
    		//sentenceIndex=longErrorArr[index];
    		sentenceIndex=index;
    	}else{
    		sentenceIndex=index;
    	}
    	userAnswer2=groupQuestion.questions[sentenceIndex].segmentationList;
    	var strDes=sentenceIndex==0?"选中一个或多个单词将句子进行划分":"";
    	$("#main .doing1 .ex-d").html(strDes);
    	questionId=groupQuestion.questions[sentenceIndex].id
    	userResult.questionId=questionId;
    	var seNum=groupQuestion.questions[sentenceIndex].sequenceNumber;
    	$("#main .num").html("第"+seNum+"句/共"+totalCount+"句");
    	/*提示  */
    	var curQuestion=groupQuestion.questions[sentenceIndex],tsListStr=curQuestion.hint;
    	tsListStr=tsListStr.replace(/\n/g,"<br/>");    	
    	$("#tsList").html(tsListStr);
    	/*划分句子*/
    	var strSen="<p id='content' class='ex-sen'>"+curQuestion.sentence+"</p>";
    	$("#sandbox").html(strSen);
    	/*译文 */
    	try{
    		$("#trans").html(curQuestion.translation);
    		$("#trans2").html(curQuestion.translation);    		
    	}catch(e){}    	
    	/*重组句子*/
    	var segStr="";
    	for(var i=0;i<curQuestion.segmentationList.length;i++){
    		var curSegment=curQuestion.segmentationList[i];
    		if(curSegment.type==1){
    			segStr+="<li class='df-steps-li'><span class='s-default'></span></li>";
    		}    		
    	}
    	$("#stepsList").html(segStr);
    	/*备选句子 */
    	var choiceStr="";
    	for(var i=0;i<curQuestion.segmentationChoiceList.length;i++){
    		var curChoiceStr=$.trim(curQuestion.segmentationChoiceList[i]);
    		if(curChoiceStr!=""){
    			choiceStr+="<li class='sen-li' data-sort="+i+">"+curChoiceStr+"</li>";    		   	
    		}    		
    	}
    	$("#senList").html(choiceStr);
    	if(sentenceIndex==groupQuestion.questions.length-1||sentenceIndex==longErrorArr.length-1){
    		$("#main #nextBtn4").text("提交");
    	}else{
    		$("#main #nextBtn4").text("下一句");
    	}
    	/*结果页面*/
    	var resultStr="";
    	if(flag){//做错题
    		$.each(longErrorArr,function(index,value){
    		    var tmpSequenceNum=groupQuestion.questions[value].sequenceNumber;
        		resultStr+="<li class='result-list-li'><p class='r-p1'>第"+tmpSequenceNum+"句</p><p class='r-p2'>step1：<span class='isPass1'></span></p><div class='answer mt15'>我的答案：<p class='ex-sen myAnswer'></p><p class='ex-sen comAnswer'></p></div>";
        		resultStr+="<p class='r-p2 mt15'>step2：<span class='isPass2'></span></p><div class='answer mt15'>我的答案：<p class='ex-sen myAnswer2'></p></div><div class='answer mt15'>正确答案：<p class='ex-sen rightAnswer'></p></div>";
                if(sentenceIndex==longErrorArr.length||longErrorArr.length==1){
                	resultStr+="</li>";
                }else{
                	resultStr+="<hr class='li-split'/></li>";
                }
        	})
    	}else{    		
    		$.each(groupQuestion.questions,function(index,value){
        		resultStr+="<li class='result-list-li'><p class='r-p1'>第"+(index+1)+"句</p><p class='r-p2'>step1：<span class='isPass1'></span></p><div class='answer mt15'>我的答案：<p class='ex-sen myAnswer'></p><p class='ex-sen comAnswer'></p></div>";
        		resultStr+="<p class='r-p2 mt15'>step2：<span class='isPass2'></span></p><div class='answer mt15'>我的答案：<p class='ex-sen myAnswer2'></p></div><div class='answer mt15'>正确答案：<p class='ex-sen rightAnswer'></p></div>";
                if(sentenceIndex==groupQuestion.questions.length-1||groupQuestion.questions.length==1){
                	resultStr+="</li>";
                }else{
                	resultStr+="<hr class='li-split'/></li>";
                }
        	})
    	}
    	
    	if(sentenceIndex==0||sentenceIndex==longErrorArr[0]){
    		$("#longResult .result-list").html(resultStr);
    	}
    	/*划分句子下一步*/
        $("#sandbox #content").on("mouseup",function(){
            window.setTimeout(function(){
            	if($("#content .highlighted").length>0){
            		$("#nextBtn1").removeClass("gray-btn").addClass("orange-btn").removeAttr("title");
            	}
            },0)
        	
        })
        /*清空查看译文的历史*/
        $("#trans,#trans2").hide();
        $("#seeTrans1,#seeTrans2").text("查看译文");
    	
    }
    
    
    
    /*查看/隐藏译文*/
    $("#seeTrans1").on("click",function(){
        if($("#trans").css("display")==="none"){
            $("#trans").show();
            $(this).text("隐藏译文");
        }else{
            $("#trans").hide();
            $(this).text("查看译文");
        }
    });
    $("#seeTrans2").on("click",function(){
        if($("#trans2").css("display")==="none"){
            $("#trans2").show();
            $(this).text("隐藏译文");
        }else{
            $("#trans2").hide();
            $(this).text("查看译文");
        }
    });

    /*划分*/
    var removeBtn = document.getElementById('remove');
    var sandbox = document.getElementById('sandbox');
    var hltr = new TextHighlighter(sandbox);
    removeBtn.addEventListener('click', function () {
        hltr.removeHighlights();
        $("#nextBtn1").removeClass("orange-btn").addClass("gray-btn").attr("title","做完题后才能进行下一步哦！");
    });
    /*重组句子*/
    $("#senList").on("click",".sen-li",function(e){
        var tmpStr=$(this).html(),dataSort=$(this).attr("data-sort");
        if($("#stepsList .s-default").length>0){
            var $ele=$("#stepsList").find(".s-default").eq(0);
            $ele.removeClass("s-default").addClass("steps-selected").html(tmpStr).attr("data-sort",dataSort);
            $(this).hide();
            $ele.click(function(tmpStr,dataSort){
                tmpStr =$(this).html();
                dataSort=$(this).attr("data-sort");
                $(this).html("").removeClass("steps-selected").addClass("s-default").attr("data-sort","");
                $("#senList").find(".sen-li").each(function(index,value){
                    if($(value).attr("data-sort")==dataSort){
                        $(value).show();
                        return false
                    }
                })
                if($("#stepsList .s-default").length!=0){
                    $("#nextBtn3").removeClass("orange-btn").addClass("gray-btn").attr("title","做完题后才能进行下一步哦！");
                }
            });
            if($("#stepsList .s-default").length==0){
                $("#nextBtn3").removeClass("gray-btn").addClass("orange-btn").removeAttr("title");
            }
        }
    });
    /*清除答案*/
    $("#reset").on("click",function(){
        $("#stepsList").find(".steps-selected").click();
    });
    
    $("#nextBtn1").on("click",nextFn1);
    $("#nextBtn2").on("click",function(){
    	$("#main .con").hide();
    	$("#main .doing2").show();
    });
    $("#nextBtn3").on("click",nextFn3);  
    $("#nextBtn4").on("click",nextFn4);//提交答案
    //再来一遍
    $("#lDFAgain").on("click",lDFAgain);
    //重做错题
    $("#lDFError").on("click",lDFError);
    function lDFAgain(){
    	//重置全局变量
    	errorFlag=0;
		var date=getTime();
	    xm_startTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
	    xm_spendTime=0;
	    xmTimer=window.setInterval(function(){
        	xm_spendTime++;
        },1000); 
	    seIndex=0,totalCount=groupQuestion.questions.length;
	    questionId="";
	    userResults=[],userAnswer1=[],userAnswer2=[];
	    userResult={};    
	    longErrorArr=[];
	    longErrorErrArr=[];
	    $("#longResult").hide();
    	$("#main").show().find(".con").hide();
    	$("#main .doing1").show();
	    renderDate(seIndex); 
    }
    function lDFError(){
    	//重置全局变量   	
    	errorFlag=1;
		var date=getTime();
	    xm_startTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
	    xm_spendTime=0;
	    xmTimer=window.setInterval(function(){
        	xm_spendTime++;
        },1000); 
	    seIndex=0,totalCount=groupQuestion.questions.length;
	    questionId="";
	    userResults=[],userAnswer1=[],userAnswer2=[];
	    userResult={};
	    longErrorArr=longErrorErrArr;
	    longErrorErrArr=[];//
		//错题集合longErrorArr
		
		 
    	$("#longResult").hide();
    	$("#main").show().find(".con").hide();
    	$("#main .doing1").show();
    	if(longErrorArr.length>0){
	    	$("#longResult").hide();
	    	$("#main").show().find(".con").hide();
	    	$("#main .doing1").show();	 
	    	if(seIndex<longErrorArr.length){
	    		renderDate(longErrorArr[seIndex],errorFlag);
	    	}	    	    
	    }
    	   	
    }
    function nextFn4(){
    	var _this=this;
    	userResults.push(userResult);
    	
    	if(userResult.resultOrganizing.isPass==0||userResult.resultSplit.isPass==0){
    		var errId=userResult.questionId;
    		$.each(groupQuestion.questions,function(index,value){
    			if(value.id==errId){
    				//longErrorArr.push(index);
    				longErrorErrArr.push(index);
    				return false;
    			}
    		})
    	}
    	/* else{
    		if(longErrorArr.length>0){//删除做对的题目
    			var errId=userResult.questionId;
    			for(var j=0;j<longErrorArr.length;j++){
    				for(i=0;i<groupQuestion.questions.length;i++){
    					var tmpQ=groupQuestion.questions[i];
    					if(tmpQ.id==errId){
        					longErrorArr.splice(j,1);
    					}
    				}
    			}
    		}  
    	}*/
    	
    	userResult={};
    	if($(_this).text()=="下一句"){
    		seIndex++;
    		$("#longResult").hide();
        	$("#main").show().find(".con").hide();
        	$("#main .doing1").show();
    		renderDate(seIndex);
    		$("#nextBtn1").removeClass("orange-btn").addClass("gray-btn").attr("title","做完题后才能进行下一步哦！");
        	$("#nextBtn3").removeClass("orange-btn").addClass("gray-btn").attr("title","做完题后才能进行下一步哦！");
    	}else{//提交
    		if(errorFlag){//错题提交    			
    			window.clearInterval(xmTimer);
    			$("#main").hide();
 	        	$("#longResult").show();
 	        	$("#longResult .score").hide();
 	        	if(longErrorErrArr.length==0){
 	        		$("#lDFError").hide();
 	        	}else{
 	        		$("#lDFError").show();
 	        	}
    		}else{
    			var param={};
        		window.clearInterval(xmTimer);
        		var date=getTime();
        	    xm_endTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
        		param.group_id=xm_groupId;
        		param.planDayId=xm_planDayId;
        		param.exerciseId=xm_exerciseId;
        		param.startTime=xm_startTime;
        		param.endTime=xm_endTime;
        		param.spend_time=xm_spendTime;
        		param.results=userResults;
        		$.ajax({
        	        url:window.xiaoma.basePath+"/plan/proxy?proxyurl=${apiUrl}/difficultSentence/results/save",
        	        type:'POST',
        	        data: JSON.stringify(param),
        	        contentType: "application/json",
        	        success: function (json,str) {
        	        	json=$.parseJSON(json);
        	        	$("#main").hide();
        	        	$("#longResult").show();
        	        	$("#longResult .score").show();
        	        	$("#longResult .rate").text("正确率："+json.rate+"%");
        	        	$("#longResult .avgSpeed").text("平均速度："+json.avg_speed+"S/题");
        	        	if(longErrorErrArr.length==0){
        	        		$("#lDFError").hide();
        	        	}else{
         	        		$("#lDFError").show();
         	        	}
        	        },
        	        error: function () {	            
        	        }
        	    })
    		}
    		
    		
    	}
    }
    function nextFn3(){
    	var _this=this;
		if($(_this).hasClass("gray-btn")){
			return;
		}
    	$("#nextBtn3").removeClass("orange-btn").addClass("gray-btn").attr("title","做完题后才能进行下一步哦！");
		var tmpIndex=0;
		for(var i=0;i<userAnswer2.length;i++){
			if(userAnswer2[i].type==1){
				userAnswer2[i].content=$("#stepsList .steps-selected").eq(tmpIndex).html();
				tmpIndex++;
			}
		}
		var param={};
		param["questionId"]=questionId;
	    param["userAnswer"]=userAnswer2;
	    $.ajax({
	        url:window.xiaoma.basePath+"/plan/proxy?proxyurl=${apiUrl}/difficultSentence/results/compare/organizing",
	        type:'POST',
	        data: JSON.stringify(param),
	        contentType: "application/json",
	        success: function (json,str) {
	        	json=$.parseJSON(json);
	        	userResult.resultOrganizing=json;
	        	str=$("#content").html()
	        	$("#main .con").hide();
	        	$("#main .dfSenResult2").show();
	        	var str=""
	        	$.each(json.userAnswer,function(index,value){
	        		str+="<span class='orange-bg'>"+value+"</span> "
	        	})	        	
	        	renderDfResult2(json,str);	        	
	        },
	        error: function () {	            
	        }
	    })
    }
    function renderDfResult2(data,str){
    	var myAnswers="",rightAnswers="";
		$.each(data.answers,function(index,value){
			if(value.is_correct==0){
				myAnswers+=value.content;	
				rightAnswers+=value.content;
			}else if(value.is_correct==1){
				myAnswers+="<span class='orange-bg'>"+value.content+"</span>";
				rightAnswers+="<span class='orange-bg'>"+value.content+"</span>";
			}else if(value.is_correct==2){
				myAnswers+="<span class='orange-bg orange-font'>"+value.content+"</span>";
				rightAnswers+="<span class='orange-bg'>"+value.content+"</span>";
			}	        		
		})
		$("#main .dfSenResult2 .myAnswer").html(myAnswers);
		//$("#main .dfSenResult2 .rightAnswer").html(rightAnswers);
		/* 结果页面 */
		$("#longResult .result-list-li").eq(seIndex).find(".myAnswer2").html(myAnswers);
		
		if(data.isPass){
			$("#main .dfSenResult2 .re-t").removeClass("wrong").addClass("rightAn").html("回答正确！");
			$("#longResult .isPass2").eq(seIndex).addClass("rightAn").html("正确");//结果页面
		}else{
			$("#main .dfSenResult2 .re-t").removeClass("rightAn").addClass("wrong").html("回答错误！");
			$("#longResult .isPass2").eq(seIndex).addClass("wrong").html("错误");//结果页面
		}
    }
	function nextFn1(){
		userAnswer1=[];
		var _this=this;
		if($(_this).hasClass("gray-btn")){
			return;
		}
		$("#nextBtn1").removeClass("orange-btn").addClass("gray-btn").attr("title","做完题后才能进行下一步哦！");
		$.each($("#sandbox #content .highlighted"),function(index,value){
			userAnswer1.push($("#content .highlighted").eq(index).html());
		});
		
		var param={};
	    param["questionId"]=questionId;
	    param["userAnswer"]=userAnswer1;
		$.ajax({
	        url:window.xiaoma.basePath+"/plan/proxy?proxyurl=${apiUrl}/difficultSentence/results/compare/split",
	        type:'POST',
	        data: JSON.stringify(param),
	        contentType: "application/json",
	        success: function (json) {
	        	json=$.parseJSON(json);
	        	userResult.resultSplit=json;
	        	$("#main .con").hide();
	        	$("#main .dfSenResult1").show();	
	        	var str=$("#main .doing1 #content").html();
	        	renderDfResult1(json,str);	        	
	        },
	        error: function () {	            
	        }
	    });
	    
	}
	function renderDfResult1(data,str){
		var myAnswers="",rightAnswers="";
		/* 正确答案 */
		$.each(data.answers,function(index,value){
			if(value.is_correct==0){
				myAnswers+=value.content;	
				rightAnswers+=value.content;
			}else if(value.is_correct==1){
				myAnswers+="<span>"+value.content+"</span>";
				rightAnswers+="<span class='orange-bg'>"+value.content+"</span>";
			}else if(value.is_correct==2){
				myAnswers+="<span class='orange-font'>"+value.content+"</span>";
				rightAnswers+="<span class='orange-bg'>"+value.content+"</span>";
			}	        		
		})
		/*我的答案  */
		$("#main .dfSenResult1 .myAnswer").html(str).css("color","transparent").find(".highlighted").css("color","transparent");		
		$("#main .dfSenResult1 .comAnswer").html(myAnswers);
		$("#main .dfSenResult1 .rightAnswer").html(rightAnswers);
		$("#main .dfSenResult2 .rightAnswer").html(rightAnswers);
		/* 结果 页面 */
		
		$("#longResult .result-list-li").eq(seIndex).find(".myAnswer").html(str).css("color","transparent").find(".highlighted").css("color","transparent");
		$("#longResult .result-list-li").eq(seIndex).find(".comAnswer").html(myAnswers);
		$("#longResult .result-list-li").eq(seIndex).find(".rightAnswer").html(rightAnswers);
		
		if(data.isPass){
			$("#main .dfSenResult1 .re-t").removeClass("wrong").addClass("rightAn").html("回答正确！");
			$("#longResult .isPass1").eq(seIndex).addClass("rightAn").html("正确");//结果页面
		}else{
			$("#main .dfSenResult1 .re-t").removeClass("rightAn").addClass("wrong").html("回答错误！");
			$("#longResult .isPass1").eq(seIndex).addClass("wrong").html("错误");//结果页面
		}
		
	
			
	}
    function zeroFn(n){
        n=n<10?"0"+n:n;
        return n;
    };
    function getTime(){ 
    	return new Date($.ajax({url: window.xiaoma.basePath+"/gettime",async: false}).getResponseHeader("Date"));
    }


})
</script>
 