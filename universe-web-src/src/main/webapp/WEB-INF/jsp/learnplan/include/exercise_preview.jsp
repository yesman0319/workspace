<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%> 
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>

<%@ taglib uri="/padding" prefix="padding"%>
 
<link rel="stylesheet" href="../css/common.css" />
<link rel="stylesheet" href="../css/exercise_preview.css" />
    	
 <!--中间内容模块开始-->
		<div class="exercise-pre-box">
			<p class="exercise-pre-title">
				<img src="../i/preview/list-pic.png">
				<span class="pre-list-title">学习指导   ${groupName }</span>
			</p>
			<div id="exercise-pre-main">
				<!-- <div class="exercise-pre-intro ep-mod">产品简介
					<h2>产品简介</h2>
					<p>
						通过多年教学经验，精心整理历年真题中90道最高频、最容易“没思路”的题目，
						让你体验前所未有的高质高效刷题。独家详解小马托福10个经典段子，
						从语音、表达、内容三个层次帮你扎实全面掌握段子，熟练运用，彻底帮你告别口语低分。
					</p>
				</div>
				<div class="exercise-pre-shine ep-mod">产品亮点
					<h2>产品亮点</h2>
					<ul>
						<li>1、选题精当，有代表性；</li>
						<li>2、讲解细致，重点突出；</li>
						<li>3、授人以渔，以一当十。</li>
					</ul>
				</div>
				<div class="exercise-pre-befit ep-mod">适合学员
					<h2>适合学员</h2>
					<ul>
						<li>1、发音不好的同学。</li>
						<li>2、从未接触过段子的同学。</li>
						<li>3、背过许多段子却不知如何运用的同学。</li>
						<li>4、托福独立口语尚未拿到Good的所有同学。</li>
						<li>5、刷考前机经不过瘾，又没时间刷完历年真题的同学。</li>
					</ul>
				</div>
				<div class="exercise-pre-banner ep-mod">课前预习图片
					<img src="../i/info/ban1.png" />
				</div>
				<div class="exercise-pre-content ep-mod">课程内容
					<h2>课程内容</h2>
					<ul>
						<li>1、10个段子，10个细致全面的音频讲解；</li>
						<li>2、喵老师独家标注版段子文本；</li>
						<li>3、6天段子素材朗读背诵练习，共10个；</li>
						<li>4、15天独立口语真题练习，每天6道，共90道。</li>
					</ul>
				</div> -->
				${content }
				<input type="hidden" id="previewId" value="${id }"/>
				<button id="ep-btn" class="ep-btn"  onclick="haveLearned()">已阅</button>
			</div>
		</div>
		<!--中间内容模块结束-->
<script type="text/javascript">
	function getTime(){ 
		return new Date($.ajax({url: window.xiaoma.basePath+"/gettime",async: false}).getResponseHeader("Date"));
	}
	function zeroFn (n){
	    n=n<10?"0"+n:n;
	    return n;
	}
	var xm_date=getTime(); 
	var xm_startTime=zeroFn(xm_date.getFullYear())+"-"+zeroFn((xm_date.getMonth()+1))+"-"+zeroFn(xm_date.getDate())+" "+zeroFn(xm_date.getHours())+":"+zeroFn(xm_date.getMinutes())+":"+zeroFn(xm_date.getSeconds());
	var xm_date=null; 
	function haveLearned(){
		var data = new Object();
		data.planDayId="${dayid}";
		data.exerciseId="${exerciseid}";
		data.startTime=xm_startTime;
		var xm_date_end=getTime();
		data.endTime= zeroFn(xm_date_end.getFullYear())+"-"+zeroFn((xm_date_end.getMonth()+1))+"-"+zeroFn(xm_date_end.getDate())+" "+zeroFn(xm_date_end.getHours())+":"+zeroFn(xm_date_end.getMinutes())+":"+zeroFn(xm_date_end.getSeconds());
		var xm_date_end=null; 
		var info = JSON.stringify(data);
		var token = "${token }";
		$.ajax({
			url: "/preparation/save",
			type: "POST",
			async: false,
			cache: false,
			data: {
				"token": token,
				"info": info,
			},
			success: function(data) {
				$("#ep-btn").addClass("have-learned")
			},
			error: function(data) {
			}
		});
	}
</script>
 