<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>${video.coursesName} - 讨论区</title>
     <%@include file="../include/pub.jsp"%>
    <link rel="stylesheet" href="${cdnPath }/css/common.css"/>
    <link rel="stylesheet" href="${cdnPath}/css/discussion.css"/>
</head>
<body>
<!-- start 导航 -->
<%@include file="../include/header.jsp"%>
<!-- end 导航 -->
<div class="layout">
    <!--面包屑-->
    <div class="main">
        <p class="location">
            <a class="user_href" href="${basePath}">精英计划</a> >
            <a class="list_href" href="${basePath }/courses/list">视频课程</a> >
            <a class="user_href" href="${basePath}/courses/${video.videoId}">${video.coursesName}</a> >
            <a class="down_href"  href="javascript:void(0)" onclick="location.reload()" >讨论区</a>
        </p>
        <!--start  微课程  -->
        <div class="top_title">
        
				<!--参数  -->        
        		<input type="hidden"  value="${video.videoId}"/>
        		<input type="hidden"  value="${nodeId}"/>
        
            <img src="${video.coverPhoto }" class="top_title_img"/>
            <div class="top_title_desc">
                <div class="desc_l">
                    <p class="title_name">${video.coursesName}</p>
					<span class="lesson_price">
						<i class="brmb_icon"></i> ${video.price}元
					</span>
                    <p class="btns">
                        <a href="${basePath}/courses/${video.videoId}" class="buy_btn" target="_blank">查看课程</a>
                    </p>
                </div>
                <div class="desc_r">
                    <a href="javascript:;">
                        <b class="join_icon"></b>
                        <span id="join_num">${video.totalView}</span> 人加入
                    </a>
                    <span class="cutline">|</span>
                    <a href="javascript:;">
                        <b class="video_icon"></b>
                        <span id="lesson_num">${video.totalClass}</span> 节课程
                    </a>
<!--                     <span class="cutline">|</span>
                    <a href="javascript:;" class="share_btn">
                        <b class="share_icon"></b>
                        分享
                    </a> -->
                </div>
            </div>
        </div>
 <!--end  微课程  -->
 
  <!--start  微课程  -->
        <div class="wrap">
            <div class="content fl">
            <!--没有回复  -->
	            <c:if test="${empty datas }">
	                <div class="no-discussion">
	                    <img src="${cdnPath}/i/discussion/icon-no-dis.png" alt="" />
	                    <p class="no-dis-tip">目前没有人发起讨论哦~</p>
	                </div>
	            </c:if>
	            <!--有回复  -->
	            <c:if test="${not empty datas }">
                <ul class="post-list">
                	<c:forEach items="${datas}" var="data">
                		<!--置顶 -->
                		<c:if test="${data.isTop eq 1 }">
		                		<li class="post-list-li">
				                        <div class="post-t">
				                            <span class="post-num fl">${data.replyCount}</span>
				                            <span class="post-top fl">置顶</span>
				                     <a class="post-list-li-a"  target="_blank" href="${basePath}/topic/replys?topicId=${data.topicId}&videoId=${videoId}&nodeId=${nodeId}">
				                            <span class="post-title fl">${data.title}</span>
			                        </a>			                        
				                            <span class="post-name fr">${data.nickName}</span>
				                        </div>
				                        <hr class="split"/>
	                    		</li>
                		</c:if>
                		<c:if test="${data.isTop  eq 0 }">
									<li class="post-list-li">
					                        <div class="post-t">
					                            <span class="post-num fl">${data.replyCount}</span>
					                        <a class="post-list-li-a" target="_blank" href="${basePath}/topic/replys?topicId=${data.topicId}&videoId=${videoId}&nodeId=${nodeId}" >
					                            <span class="post-title fl">${data.title}</span>
					                           </a>
					                            <span class="post-name fr">${data.nickName}</span>
					                        </div>
					                        <div class="replay-con">
					                            <span class="replay-title fl">${data.content }</span>
					                         	<span class="replay-time fr">${data.replyTimeStr }</span>
					                            <span class="replay-name fr">${data.replyNickName }</span>
					                        </div>
					                        <!--图片  -->
					                     <c:if test="${not empty data.images }">
						                        <div class="post-pic">
						                            <ul class="post-pic-list">
						                            <c:forEach items="${data.images}" var="image" begin="0"    end="2"    step="1">
						                                <li class="post-pic-li"><img class="post-pic-li-pic show-pic" src="${image }" alt=""/></li>
						                                </c:forEach>
						                            </ul>
						                            <!--图片轮播  -->
						                            <c:if test="${fn:length(data.images) > 3 }"><span class="pic-count">共${fn:length(data.images) }张</span></c:if>
							                            <div class="media-disp">
							                                <div class="media_pic_control">
							                                    <span class="j-retract fl">
							                                        <i class="icon-retract"></i>
							                                        收起
							                                    </span>
							                                    <span class="j-page fr">
							                                        第
							                                        <i class="j-page-cur current_index"  id="current_index_${data.topicId}">1</i>
							                                        张/共
							                                        <i class="j-page-total">${fn:length(data.images) }</i>
							                                        张
							                                    </span>
							                                </div>
							                                
							                                <c:forEach items="${data.images}" var="image" varStatus="stat">  
								                               <c:if test="${stat.first}">
									                               	<div class="media_bigpic">
									                                    <div class="media_bigpic_wrap">
									                                        <img src="${image }" alt="${data.topicId }" class="j-retract-img" />
									                                    </div>
									                                    <div class="media_bigpic_display_pre bigPicPre none"></div>
									                                    <c:if test="${fn:length(data.images) == 1 }">
									                                    <div class="media_bigpic_display_next bigPicNext none"></div>
									                                    </c:if>
									                                     <c:if test="${fn:length(data.images) > 1 }">
									                                    <div class="media_bigpic_display_next bigPicNext"></div>
									                                    </c:if>
								                                	</div>
								                               </c:if>
								                                <c:if test="${stat.last}">
									                              		<div class="media_bigpic">
										                                    <div class="media_bigpic_wrap">
										                                        <img src="${image }" alt="${data.topicId }" class="j-retract-img"  />
										                                    </div>
										                                    <div class="media_bigpic_display_pre bigPicPre"></div>
										                                    <div class="media_bigpic_display_next bigPicNext none"></div>
										                                </div>
								                               </c:if>
								                               
								                               <c:if test="${!stat.last && !stat.first}">
									                               	<div class="media_bigpic">
								                                    <div class="media_bigpic_wrap">
								                                        <img src="${image }" alt="${data.topicId }" class="j-retract-img"  />
								                                    </div>
								                                    <div class="media_bigpic_display_pre bigPicPre"></div>
								                                    <div class="media_bigpic_display_next bigPicNext"></div>
								                                </div>
								                               </c:if>
							                                </c:forEach>
							                                
<!-- 							                                <div class="media_bigpic">
							                                    <div class="media_bigpic_wrap">
							                                        <img src="../i/index/plan1.png" alt="" class="j-retract-img"/>
							                                    </div>
							                                    <div class="media_bigpic_display_pre bigPicPre none"></div>
							                                    <div class="media_bigpic_display_next bigPicNext"></div>
							                                </div>
							                                <div class="media_bigpic">
							                                    <div class="media_bigpic_wrap">
							                                        <img src="http://universestatic.b0.upaiyun.com/img/1482401125538.png" alt="" class="j-retract-img"/>
							                                    </div>
							                                    <div class="media_bigpic_display_pre bigPicPre"></div>
							                                    <div class="media_bigpic_display_next bigPicNext"></div>
							                                </div>
							                                <div class="media_bigpic">
							                                    <div class="media_bigpic_wrap">
							                                        <img src="../i/index/ban.png" alt="" class="j-retract-img"/>
							                                    </div>
							                                    <div class="media_bigpic_display_pre bigPicPre"></div>
							                                    <div class="media_bigpic_display_next bigPicNext none"></div>
							                                </div> -->
							                            </div>
						                            
						                            
						                            
						                        </div>
					                        </c:if>					                       
					                        <hr class="split"/>
					                  </li>
                		</c:if>
                	</c:forEach>
                </ul>
                </c:if>
                 <!--end  讨论的帖子  -->
                 
                 <!--页码  -->
		 		<c:if test="${not empty datas && totalPage != 1}">
		           <%@include file="page.jsp"%>
		        </c:if>
		        
		        <!--编辑区  -->
                <div class="editor">
                    <div class="ed-input-con">
                        <input type="text" id="edTitle" class="ed-title" placeholder="请输入标题，4-30字之内"  maxlength="30"  />
                    </div>
                    <p class="ed-title-tip" id="show_title"></p>
                    <div class="ed-content-con" >
                        <div  style="overflow-y:scroll;  overflow-x:hidden; "   contenteditable="true"   id="edContent" class="ed-content"   <c:if test="${forbid }"> disabled="disabled"</c:if> >
                        </div>
                    </div>
                    <div class="ed-se">
                    	<!--图片上传 -->
                    	<c:if test="${empty forbid || !forbid }">
	                       <a href="javascript:;" class="ed-se-pic none"  id="aId" ></a>
	                        	<!-- <input style="display: none;"   id="upload"  type="file" name="upfile" accept="image/jpeg,image/jpg,image/png,image/bmp"> -->
	                        <a id="save_btn"  href="javascript:;" class="ed-post-btn fr" onclick="saveTopic();">发布</a>
                        </c:if>
                        <span class="ed-se-tip fr" id="show_content"> <c:if test="${forbid }"> 您可能存在违规操作，已被禁言，可联系客服申请恢复</c:if></span>
                    </div>
                    <div class="post-succeed" id="show_success" style="display: none;">发布成功</div>
                    <div class="post-failed" id="show_error">发布失败!</div>
                </div>
            </div>
            <div class="side fl">
                <h2 id="startDis"><i class="icon-pen"></i>发起讨论</h2>
                <p class="wel">欢迎分享，在这里可以发表你的学习体验，学习想法，关于计划的疑惑，讲师和同学会和你一起讨论哦</p>
            </div>
        </div>
    </div>
</div>

<!-- start footer  -->
<%@include file="../include/footer.jsp"%>
<!-- start footer  -->

<div id="postTip" class="payResult_modal">
    <div class="payResult_dialog">
        <h2>温馨提示<span class="close_btn closeBtn"></span>
        </h2>
        <span class="payResult_tips">您的账号已被禁言，暂时不能发起讨论</span>
        <a href="javascript:;" class="pay_confirm closeBtn"> 知道了</a>
    </div>
</div>

<!-- 多图上传 -->
<div id="upload_win" class="payResult_modal none">
   <div class="uploadWrapper">
   
       <div class="uploadTitle"  >
           <span class="uploadText">多图上传</span>
           <span id="uploadClose" class="uploadClose fr"></span>
       </div>
       
       <div class="uploadSel"  id="add_one_show">
           <img src="../i/discussion/icon-pic-up.png" alt=""/>
           <div class="selCon">
               <a href="javascript:;" class="selBtn" id="add_image1">选择图片</a>
               <input style="display: none;"   id="upload"  type="file" name="upfile"   multiple="multiple" accept="image/jpeg,image/jpg,image/png,image/bmp">
               <span style="color: red" class="upload_error"></span>
           </div>
       </div>
       
       <div	id="show_input">
				       
       </div>
       
       <div class="uploadContainer" style="display:none;" id="add_more_show">
           <p class="picCount">共<span class="picCountNum" id="total_counts">0</span>张，可再上传<span class="picCountNum" id="remain_counts">10</span>张</p>
           <ul class="uploadList" id="uploadList">
               <li class="uploadList-li"  id="add_image2"  > 
                   <div class="upload"></div>
                   <div class="uploading none">上传中...</div>
               </li> 
           </ul>
           <div class="add">
            <span style="color: red" class="upload_error"></span>
               <a href="javascript:;" class="addBtn grayBtn" onclick="addAll();" id="addAllBtn">添加</a>
           </div>
       </div>

   </div>
</div>


</body>
<script type="text/javascript" src="${cdnPath}/js/userProfile/ajaxfileupload.js"></script>
<script type="text/javascript">
	var basePath = "${basePath}";
	
/*过滤掉高度小于90px的元素--start---*/
window.onload=function(){
    $.each($(".post-pic").find(".show-pic"),function(index,value){
        var img = new Image();
        img.src = value.src;
        if(img.height<90){console.log(img.height);
            $(value).parent().remove();
        }
    })
    $.each($(".post-pic .post-pic-list"),function(index1,value1){
       if($(value1).find("li").length==0){
           $(value1).parent().remove();
       }
    });
    
    //上传图片
    $("#upload").on("change", uploadFilesNew);
    
    $("#aId").removeClass("none");
    
}
/*过滤掉高度小于90px的元素--end---*/
$("#postTip .closeBtn").click(function(){
    $("#postTip").hide();
})

	var videoId = "${videoId}";
	var nodeId = "${nodeId}";
	var forbid = "${forbid }";
	
	
	//初始化编辑区
	$("#edTitle").val("");
	$("#edContent").html("");
	
	var userId = "${sessionScope.userInfo.id}";
	function pageback(page){
		window.location.href= window.xiaoma.path + "/topic/topics?page="+page+"&videoId="+videoId+"&nodeId="+nodeId;
	}
	
	$("#startDis").click(function(){
		
		 if(forbid == "true"){
			 $("#postTip").show();
		 }else{
			if(userId == "" || userId == null || userId == "0"){
				window.location.href= basePath + "/login?backurl=/topic/topics?page=1%26videoId="+videoId+"%26nodeId="+nodeId;
				return;
			}
			 $("#edTitle").focus();
			 $('body,html').animate({ scrollTop: $('body,html').height()}); 
		 }
		
		
		/* $.post(basePath + "/topic/forbiduser",{},
				   function(data){
				     if(data.success){
				    	if(data.forbid){
				    		 $("#edTitle").attr("disabled",true); 
				 	        $("#edContent").attr("disabled",true); 
				 	       $("#postTip").show();
				    	}else{
				    		   $("#edTitle").attr("disabled",false); 
				   	        $("#edContent").attr("disabled",false); 
				   	        $("#edTitle").focus();
				    	}
				     }else{
				    	 	console.dir(data);
				    	 	if(data.flag == "nologin"){
				    	 		window.location.href= basePath + "/login?backurl=/topic/topics?page=1&videoId="+videoId+"&nodeId="+nodeId;
				    	 		return;
				    	 	}else{
				    	 		alert("服务器出错，请联系客服");
				    	 		return;
				    	 	}
				     }
				     return;
				   },
				   "json"); */
	});
	
	//限制字符数量
	function limitNum(txt, num) {
		var len = 0;
		for (var i = 0; i < txt.length; i++) {
			if (txt.charCodeAt(i) > 127 || txt.charCodeAt(i) == 94) {
				len += 2;
			} else {
				len++;
			}
		}
		
		if (len >= num) {
			return true;
		}
		return false;
	}
	
	/*  发布帖子*/
	function saveTopic(){
		
		if(userId == "" || userId == null || userId == "0"){
			window.location.href= basePath + "/login?backurl=/topic/topics?page=1%26videoId="+videoId+"%26nodeId="+nodeId;
			return;
		}
		
		$("#show_title").html("");
		$("#show_content").html("");
		$("#show_success").hide();
		$("#show_error").hide();
		//检查参数
		var title= $("#edTitle").val();
		if(title == null ||  $.trim(title) == ""){
			$("#show_title").html("标题不能为空");
			 $("#edTitle").focus();
			return;
		}
		if(!limitNum(title, 8)){
			$("#show_title").html("请输入标题，4-30字之内");
			return;
		}
		var content=$("#edContent").html();
		
		disableSave();
		
		$.post(basePath + "/topic/topics",{"nodeId":nodeId, "title":title, "content":content},
				   function(data){
				     if(data.success){
				 	        $("#show_success").show();
				 	       window.location.reload();
				 	       return;
				     }else{
				    	 	console.dir(data);
				    	 	if(data.flag == "nologin"){
				    	 		window.location.href= basePath + "/login?backurl=/topic/topics?page=1%26videoId="+videoId+"%26nodeId="+nodeId;
				    	 		return;
				    	 	}else if(data.flag == "sensitive"){
				    	 		if(data.position == "title"){
				    	 			$("#show_title").html("标题包含敏感词，请检查重发");
				    	 		}else{
				    	 			$("#show_content").html("内容包含敏感词，请检查重发");
				    	 		}
				    	 	}else if(data.flag == "forbid"){
				    	 		 $("#postTip").show();
				    	 	}else if(data.flag == "error"){
				    	 		  $("#show_error").show();
					    	 		$("#show_content").html(data.message);
				    	 	}else{
				    	 		  $("#show_error").show();
				    	 		$("#show_content").html("系统错误，请稍后重试");
				    	 	}
				    	 	ableSave();
				    	 		return;
				     }
				   },
				   "json");
	}

	/*上传图片 */
	 $("#aId").click(function(){
    	//$("#upload").click();
		 if(userId == "" || userId == null || userId == "0"){
				window.location.href= basePath + "/login?backurl=/topic/topics?page=1%26videoId="+videoId+"%26nodeId="+nodeId;
				return;
			}
    	  $("#upload_win").show();
    });
    
	
    function uploadFiles(e) {
		console.log("触发上传文件的功能");
		$("#playUrl").html("");
		
		 var file = e.currentTarget.files[0];
		
		   if(file == null || file == ""){
			   $("#show_content").html("请选择要上传图片");
				return;
		   }
		   var name = e.currentTarget.files[0].name;
		   if (name.lastIndexOf('.')==-1){    //如果不存在"."    
			    $("#show_content").html("路径不正确");
				return;
			}
		   //image/jpeg,image/jpg,image/png
		   var AllExcelExt="|.jpeg|.jpg|.png|.bmp|";  
			var extName = name.substring(name.lastIndexOf(".")).toLowerCase();//（把路径中的所有字母全部转换为小写）
			if(AllExcelExt.indexOf(extName+"|")==-1){  
				   $("#show_content").html("只能|.jpeg|.jpg|.png|.bmp|");
				return;
			}
			
			//判断文件大小
			var size  = file.size;
			if(size == 0){
				  $("#show_content").html("图片大小不能为空");
				 return;  
			}
			var fileSizeNum = size / 1024;
			if(fileSizeNum > 5 * 1024){
			 $("#show_content").html("图片大小超过5M");
			 return;  
			}
			
			 $("#show_content").html("");		//提示消失
		    
		$.ajaxFileUpload({
					url : basePath + '/topic/upload?t='
							+ new Date().getTime() + "&uploadPath=/comment/",
					secureuri : false,
					fileElementId : "upload",
					dataType : 'application/json',
					type : 'POST',
					success : function(data, success) {
						console.dir("data = " + data);
						data  = JSON.parse(data);
						if (data.success == "success") {
							console.log("上传图片成功, fileUrl = "
									+ data.url);
							//放到输入框中
							//var img = '<br/><img alt="图片" style="max-width: 80%" src="'+data.url+'"/>'
							var img = '<br/><br/><img alt="图片"  src="'+data.url+'"/>'
							$("#edContent").append($(img));
						}else{
							if(data.flag == "large"){
								 $("#show_content").html("图片大于5M");
							}else{
								 $("#show_content").html("上传图片失败");
							}
						}
						//<input style="display: none;" id="upload"  type="file" name="upfile" accept="image/jpeg,image/jpg,image/png,image/bmp">
						$("#upload")
								.replaceWith(
										' <input style="display: none;" id="upload"  type="file" name="upfile"  accept="image/jpeg,image/jpg,image/png,image/bmp">');
						$("#upload").on("change",
								uploadFiles);
					},
					error : function(data, status, e) {
						console.log("data = " + data);
						//更改属性
						console.log("上传图片失败原因：e + " + e);
						console.log("上传图片详情原因：data + " + data);
						$("#upload")
						.replaceWith(
								' <input style="display: none;" id="upload"  type="file" name="upfile" accept="image/jpeg,image/jpg,image/png,image/bmp">');
						$("#upload").on("change",
								uploadFiles);
						 $("#show_content").html("上传图片失败");
						return;
					}
				});
	}
    
    /*  提交按钮失效*/
    function disableSave(){
    	$("#save_btn").addClass("ed-btn-gray");
    	$("#save_btn").text("发布中");
    	$("#save_btn").removeAttr("onclick");
    }
   /* 提交按钮生效 */
    function ableSave(){
    	$("#save_btn").removeClass("ed-btn-gray");
    	$("#save_btn").text("发布");
    	$("#save_btn").attr("onclick","saveTopic();");
    }
    
   //图片相关
       
    
    
    var upload_num = 0;
	var imageUrls = new Array(1);
	
	
	function closeWin(){
        $("#upload_win").hide();
        upload_num = 0;
    	imageUrls = new Array(1);
		$("#add_one_show").show();
		$("#add_more_show").hide();
		var nodes = $("#add_image2").siblings();
		if(nodes.length > 0){
			for(var i=0; i<nodes.length; i++){
				nodes[i].remove();
			}
		}
	}
	
    /*关闭弹窗*/
    $("#uploadClose").click(function(){
    	closeWin();
    });
    /*上传图片 */
	 $("#add_image1").click(function(){
   	$("#upload").click();
   });
    /*上传图片 */
	 $("#add_image2").click(function(){
   	$("#upload").click();
   });

	 function uploadFilesNew(e) {
		 
			if(upload_num >= 10){
				$("#add_image2").hide();
				return;
			}
		 $(".upload_error").html("");		//提示消失
			console.log("触发上传文件的功能");
			
			 var files = e.currentTarget.files;
			 if((files.length + upload_num) >10){
				  $(".upload_error").html("上传总图片不能大于10张");
					return;
			 }
			 if(files.length <= 0){
				  $(".upload_error").html("请选择要上传图片");
					return;
			 }
			 for(var i = 0; i < files.length; i++){
				 console.log("fileName = " + files[i].name);
				 var file = files[i];
				 if(file == null || file == ""){
					 $(".upload_error").html("图片不能为空");
						return;
				   }
				   var name = e.currentTarget.files[0].name;
				   if (name.lastIndexOf('.')==-1){    //如果不存在"."    
					   $(".upload_error").html("路径不正确");
						return;
					}
				   //image/jpeg,image/jpg,image/png
				   var AllExcelExt="|.jpeg|.jpg|.png|.bmp|";  
					var extName = name.substring(name.lastIndexOf(".")).toLowerCase();//（把路径中的所有字母全部转换为小写）
					if(AllExcelExt.indexOf(extName+"|")==-1){  
						$(".upload_error").html("图片格式不正确");
						return;
					}
					
					//判断文件大小
					var size  = file.size;
					if(size == 0){
						$(".upload_error").html("图片不能为空");
						return;
					}
					var fileSizeNum = size / 1024;
					if(fileSizeNum > 5 * 1024){
						$(".upload_error").html("图片大小不能超过5M");
						return;
					}
			 }
					
				$("#add_one_show").hide();
				$("#add_more_show").show();
				$("#add_image2").hide();
				var imageIds = new Array(files.length);
				for(var j = 0; j < files.length; j++){
						var image_id = "image_" + generateUUID();
						var liStr='<li class="uploadList-li"  id='+image_id+ '>'+
		                '<div class="upload none"></div>'+
		                '<div class="uploading">上传中...</div>'+
		                '<div class="uploaded none" >'+
		                    '<a href="javascript:;" class="pic-item">'+
		                        '<img src="" alt="" class="pic-complete"/>'+
		                        '<div class="upload-mask none"><i class="deletePic" onclick="delImage(\''+image_id+'\')"></i></div>'+
		                    '</a>'+
		                '</div>'+
		            '</li> ';
		            $(liStr).insertBefore( $("#add_image2"));
					imageIds[j] = image_id;
					upload_num ++;
				}
			 
				 noAddAllCss();
				
					$.ajaxFileUpload({
						url : basePath + '/topic/uploads?t='
								+ new Date().getTime() + "&uploadPath=/comment/",
						secureuri : false,
						fileElementId : "upload",
						dataType : 'application/json',
						type : 'POST',
						success : function(data, success) {
							console.dir("data = " + data);
							data  = JSON.parse(data);
							if (data.success == "success") {
								var urls = data.urls;
								console.dir(urls);
								for(var m=0; m<urls.length; m++){
									$("#" + imageIds[m] + " .uploading").hide();
									$("#" + imageIds[m] + " img").attr("src", urls[m]); 
									$("#" + imageIds[m] + " .uploaded").show();
								}
							}else{
								if(data.flag == "large"){
									 $(".upload_error").html("图片大于5M");
								}else{
									 $(".upload_error").html("上传图片失败");
								}
							}
							//<input style="display: none;" id="upload"  type="file" name="upfile" accept="image/jpeg,image/jpg,image/png,image/bmp">
							$("#upload")
									.replaceWith(
											' <input style="display: none;" id="upload"  type="file" multiple="multiple"  name="upfile" accept="image/jpeg,image/jpg,image/png,image/bmp">');
							$("#upload").on("change",
									uploadFilesNew);
							
							addAllCss();
							$("#add_image2").show();
						},
						error : function(data, status, e) {
							console.log("data = " + data);
							//更改属性
							console.log("上传图片失败原因：e + " + e);
							console.log("上传图片详情原因：data + " + data);
							$("#upload")
							.replaceWith(
									' <input style="display: none;" id="upload"  type="file" name="upfile"   multiple="multiple"  accept="image/jpeg,image/jpg,image/png,image/bmp">');
							$("#upload").on("change",
									uploadFilesNew);
							 $(".upload_error").html("上传图片失败");
							 $("#add_image2").show();
							return;
						}
					});
					
					$("#total_counts").html(upload_num);
					$("#remain_counts").html(10 - upload_num);
		}
    
	 
	 //删除节点
	 function delImage(id){
		 $("#"+id).remove();
		 upload_num--;
		 $("#total_counts").html(upload_num);
			$("#remain_counts").html(10 - upload_num);
			if(upload_num < 10){
				$("#add_image2").show();
			}
			if(upload_num < 1){
				noAddAllCss();
			}
	 }
	 
	 function generateUUID() {
		 var d = new Date().getTime();
		 var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
		   var r = (d + Math.random()*16)%16 | 0;
		   d = Math.floor(d/16);
		   return (c=='x' ? r : (r&0x3|0x8)).toString(16);
		 });
		 return uuid;
		 };
		 
	function addAll(){
		var imgs = $("#uploadList img");
		console.dir(imgs)
		var str = "";
		if(imgs && imgs.length > 0){
			for(var i = 0; i<imgs.length; i++){
				var src = $(imgs[i]).attr("src");
				if(i == 0){
				str += '<br/><br/><img alt=\'图片\' style=\'max-width: 80%\' src=\''+src+'\'/>'
				}else{
					str += '<br/><img alt=\'图片\' style=\'max-width: 80%\' src=\''+src+'\'/>'
				}
			}
			$("#edContent").append($(str));
			closeWin();
		}
		noAddAllCss();
	}	 
	
	//移除添加样式
	function noAddAllCss(){
		$("#addAllBtn").addClass("grayBtn");
		$("#addAllBtn").removeAttr("onclick");
	}
	
	//增加添加样式
	function addAllCss(){
		$("#addAllBtn").removeClass("grayBtn");
		$("#addAllBtn").attr("onclick", "addAll()");
	}
	
	/*看大图*/
    $(".post-pic-li").click(function(){
        var curIndex=$(this).index();
        console.log("curIndex = " + curIndex);
        $(this).parent().hide().parent().find(".media-disp").show().find(".media_bigpic").hide().eq(curIndex).show();
        $(this).parent().parent().parent().find(".j-page-cur").html(curIndex+1);
    })
    /*收起按钮*/
    $(".j-retract").click(function(){
        $(this).parent().parent().hide().parent().find(".post-pic-list").show();
    })
    /*前一张*/
    $(".bigPicPre").click(function(){
    	  var prevIndex=$(this).parent().prev().index();
    	  console.log("prev = " + prevIndex);
        $(this).parent().parent().find(".media_bigpic").hide();
        $(this).parent().prev().show();
        var imgId = $(this).attr("alt");
        $(this).parent().parent().parent().find(".j-page-cur").html(prevIndex);
    })
    $(".bigPicNext").click(function(){
 	 var nextIndex= $(this).parent().next().index();
    	console.log("next = " + nextIndex); 
        $(this).parent().parent().find(".media_bigpic").hide();
        $(this).parent().next().show();
        $(this).parent().parent().parent().find(".j-page-cur").html(nextIndex);
    })
    /*点击图片收起*/
    $(".j-retract-img").click(function(){
        $(this).parent().parent().parent().hide().parent().find(".post-pic-list").show();
        var imgId = $(this).attr("alt");
        //$(this).parent().parent().parent().html(0);
    })
    
	
</script>
</html>