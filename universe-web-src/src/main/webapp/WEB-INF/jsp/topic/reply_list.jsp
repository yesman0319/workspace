<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>话题详情</title>
     <%@include file="../include/pub.jsp"%>
    <link rel="stylesheet" href="${cdnPath }/css/common.css"/>
    <link rel="stylesheet" href="${cdnPath}/css/discussion-details.css"/>
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
            <a class="user_href" href="${basePath}/topic/topics?nodeId=${nodeId}&videoId=${videoId}">讨论区</a>>
            <a class="down_href"  href="javascript:void(0)" onclick="location.reload()">话题详情</a>
        </p>
         <!--start  微课程  -->
        <div class="top_title">
        
				<!--参数  -->        
        		<input type="hidden"  value="${video.videoId}"/>
        		<input type="hidden"  value="${nodeId}"/>
        
            <img src="${video.coverPhoto}" class="top_title_img"/>
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
         <div class="wrap">
            <div class="content fl">
                <div class="mypost">
                    <img class="myava" src="${topicDeatil.avatar}" alt=""/>
                    <div class="post-con">
                        <p class="post-name">${topicDeatil.nickName}</p>
                        <span class="post-time"><fmt:formatDate value="${topicDeatil.createTime}" type="both"  pattern="yyyy-MM-dd HH:mm" /></span>
                        <h3 class="post-title">${topicDeatil.title}</h3>
                     					                            <!--音频start-->
			           <c:if test="${not empty topicDeatil.audioUrl}">
                     		<div class="con playaudio" onclick="play(1,${topicDeatil.topicId})"  id="play_topic_${topicDeatil.topicId}">
	                            <span class="drop"></span>
	                            <audio id="audio_topic_${topicDeatil.topicId }"   style="display: none" src="${topicDeatil.audioUrl}" ></audio>
	                            <i class="lb"></i>
	                            <span class="t">${topicDeatil.durationStr}</span>
	                            <span class="audioTime" style="display: none;">${topicDeatil.duration}</span>
                        </div>
                        </c:if>
                        <div class="p-content">
                           ${topicDeatil.content}
                        </div>
                        <c:if test='${topicDeatil.del == "1"}'>
	                       <span class="delete-post" id="deletePost" >删除
			                        <div class="comment-delete-dialog">
			                            <p class="comment-delete-dialog-tip">确认删除这个讨论？</p>
			                            <div class="comment-delete-dialog-button">
			                                <a href="javascript:;" class="comment-delete-dialog-ok fl" onclick="delTopic(${topicDeatil.topicId});">确认</a>
			                                <a href="javascript:;" class="comment-delete-dialog-cancel fl">取消</a>
			                            </div>
			                            <i class="comment-delete-drop"></i>
			                        </div>
                        </span>
                        </c:if>
                       
                    </div>

                </div>
                <div class="all-comment">
                    <h2>全部回复（${topicDeatil.replyCount }）</h2>
                       <c:if test="${topicDeatil.replyCount eq 0 }">
		                    <div class="no-comment">
		                        <img src="../i/discussion/icon-no-dis.png" alt=""/>
		                        <p class="no-dis-tip">目前没有人回复哦~</p>
		                    </div>
                    	</c:if>
                    	<c:if test="${counts != 0 }">
			                    	<ul class="all-comment-list">
			                    	<c:forEach items="${datas}" var="data">
			                        <li class="comment-list-li">
			                            <img class="all-comment-ava" src="${data.avatar }" alt="头像" >
			                            <span class="all-commenter"><span class="all-comment-name">${data.nickName}</span></span>
			                            <!--音频start-->
			                            <c:if test="${not empty data.audioUrl}">
			                            <div class="con playaudio"  onclick="play(2,${data.replyId});"  id="play_reply_${data.replyId }">
			                                <span class="drop"></span>
			                                <audio id="audio_reply_${data.replyId }" style="display: none" src="${data.audioUrl}" ></audio>
			                                <i class="lb"></i>
			                                <span class="t">${data.durationStr}</span>
			                                 <span class="audioTime" style="display: none;">${data.duration}</span>
			                            </div>
			                            </c:if>
			                            <!--音频end-->
			                            <div class="replay-content" >${data.content}</div>
			                            <div class="comment-footer">
									<c:if test='${data.del == "1"}'>
				                        <span class="comment-footer-btn fr deleteReplay">删除
					                        <div class="comment-delete-dialog replay-delete">
					                            <p class="comment-delete-dialog-tip">确认删除这条回复？</p>
					                            <div class="comment-delete-dialog-button">
					                                <a href="javascript:;" class="comment-delete-dialog-ok fl" onclick="delReply(${data.replyId});">确认</a>
					                                <a href="javascript:;" class="comment-delete-dialog-cancel fl">取消</a>
					                            </div>
					                            <i class="comment-delete-drop"></i>
					                        </div>
				                        </span>
			                        </c:if>
				                        <span class="replay-time fr"><fmt:formatDate value="${data.createTime}" type="both"  pattern="yyyy-MM-dd HH:mm" /></span>
			                            </div>
			                        </li>
			                        </c:forEach>
			                    </ul>
                    	</c:if>
                    
                    <!--分页-->
                      <!--页码  -->
		 		<c:if test="${not empty datas && totalPage != 1}">
		           <%@include file="page.jsp"%>
		        </c:if>
                </div>
                
                <!--编辑区  -->
                
                <div class="editor">
                    <div class="ed-content-con" id="show_focus" >
                        <div  style="overflow-y:scroll; overflow-x:hidden; " contenteditable="true"  id="edContent" class="ed-content"     <c:if test="${forbid }"> disabled="disabled"</c:if> > 
                        <c:if test="${forbid }"> 您可能存在违规操作，已被禁言，可联系客服申请恢复</c:if>
                        </div>
                    </div>
                    <div class="ed-se">
                    		 <c:if test="${empty forbid || !forbid }">
                        	<a href="javascript:;" class="ed-se-pic none"  id="aId"></a>
                        	<!-- <input style="display: none;"   id="upload"  type="file" name="upfile" accept="image/jpeg,image/jpg,image/png,image/bmp"> -->
                        	</c:if>
                        <c:if test="${empty forbid || !forbid }"> <a id="save_btn"  href="javascript:;" class="ed-post-btn fr" onclick="saveReply();">发布</a></c:if>
                        <span class="ed-se-tip fr"  id="show_content"></span>
                    </div>
                    <div class="post-succeed" style="display: none;" id="show_success">发布成功!</div>
                    <div class="post-failed" style="display: none;" id="show_error">发布失败!</div>
                </div>
            </div>
            <div class="side fl">
                <h2 id="startDis"><i class="icon-nes1"></i>回复</h2>
                <c:if test="${not empty hotTopics }">
                <span class="aboutDis">相关讨论</span>
                	<c:forEach items="${hotTopics}" var="topic">
                		<a target="_blank" href="${basePath}/topic/replys?nodeId=${nodeId}&videoId=${videoId}&topicId=${topic.topicId}"><p class="about-articles">${topic.title}</p></a>
                	</c:forEach>
                </c:if>
            </div>
        </div>
    </div>
</div>
<div class="error-tips" id="errorTips">
    <img src="../i/discussion/post-delete.png" alt=""/>
    <p class="et-text">很抱歉，您发布的讨论已被删除</p>
    <a class="goToIndex" href="http://www.yuzhoutuofu.com">返回首页</a>
</div>

<!-- start footer  -->
<%@include file="../include/footer.jsp"%>
<!-- start footer  -->

<div id="postTip" class="payResult_modal" >
    <div class="payResult_dialog">
        <h2>温馨提示<span class="close_btn closeBtn"></span>
        </h2>
        <span class="payResult_tips">您的账号已被禁言，暂时不能进行回复</span>
        <a href="javascript:;" class="pay_confirm closeBtn"> 知道了</a>

    </div>
</div>



<!-- 多图上传 -->
<div id="upload_win" class="payResult_modal node">
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
			<ul class="uploadList none;" id="uploadList">
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



<script type="text/javascript" src="${cdnPath}/js/userProfile/ajaxfileupload.js"></script>
<script type="text/javascript">
    $(function(){
        /*删除帖子*/
        $("#deletePost").click(function(){
            if($(this).find(".comment-delete-dialog").css("display")=="none"){
                $(this).find(".comment-delete-dialog").css("display","block");
            }else{
                $(this).find(".comment-delete-dialog").css("display","none");
            }
        });
        /*删除回复*/
        $(".deleteReplay").click(function(){
            if($(this).find(".replay-delete").css("display")=="none"){
                $(this).find(".replay-delete").css("display","block");
            }else{
                $(this).find(".replay-delete").css("display","none");
            }
        })
        /*回复*/
        $("#postTip .closeBtn").click(function(){
            $("#postTip").hide();
        })
        
        //上传图片
        //$("#upload").on("change", uploadFiles);
        $("#upload").on("change", uploadFilesNew);
        
        $("#aId").removeClass("none");
        
    })
    
    var videoId = "${videoId}";
	var topicId = "${topicId}";
	var userId = "${sessionScope.userInfo.id}";
	var forbid = "${forbid }";
	var basePath = "${basePath}";
	
	 $("#startDis").click(function(){
		 if(forbid == "true"){
			 $("#postTip").show();
     		//$('body,html').animate({ scrollTop: $('body,html').height()});
		 }else{
			 $("#edContent").focus();
			 $('body,html').animate({ scrollTop: $('body,html').height()});
		 }
     })
    
    //http://localhost:8080/topic/replys?topicId=1&videoId=1
   function pageback(page){
		window.location.href= window.xiaoma.path + "/topic/replys?page="+page+"&topicId="+topicId+"&videoId="+videoId;
	}
    
    //回帖
    function saveReply(){
		
		
		if(userId == "" || userId == null || userId == "0"){
			window.location.href= basePath + "/login?backurl=/topic/replys?page=1%26videoId="+videoId+"%26topicId="+topicId;
			return;
		}
		
		$("#show_content").html("");
		$("#show_success").hide();
		$("#show_error").hide();
		//检查参数
		var content=$("#edContent").html();
		if(content == null ||  $.trim(content) == ""){
			$("#show_content").html("内容不能为空");
			 $("#edContent").focus();
			 $('body,html').animate({ scrollTop: $('body,html').height()}); 
			return;
		}
		
		disableSave();
		
		$.post(basePath + "/topic/replys",{"topicId":topicId, "content":content},
				   function(data){
				     if(data.success){
				 	        $("#show_success").show();
				 	       window.location.reload();
				 	       return;
				     }else{
				    	 	console.dir(data);
				    	 	if(data.flag == "nologin"){
				    	 		window.location.href= basePath + "/login?backurl=/topic/replys?page=1%26videoId="+videoId+"%26topicId="+topicId;
				    	 		return;
				    	 	}else if(data.flag == "sensitive"){
				    	 			$("#show_content").html("内容包含敏感词，请检查重发");
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
    
    
    $("#aId").click(function(){
    	//$("#upload").click();
		/*  if(userId == "" || userId == null || userId == "0"){
			 window.location.href= basePath + "/login?backurl=/topic/replys?page=1%26videoId="+videoId+"%26topicId="+topicId;
				return;
			} */
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
			 $("#show_content").html("");	//提示消失
		    
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
										' <input style="display: none;" id="upload"  type="file" name="upfile" accept="image/jpeg,image/jpg,image/png,image/bmp">');
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
    
    /* 删除回帖 */
    function delReply(replyId){
    	if(replyId == null || replyId == "" || replyId == "0"){
    		return;
    	}
    	
    	$.post(basePath + "/topic/replys/"+replyId,{},
				   function(data){
				     if(data.success){
				 	       window.location.reload();
				 	       return;
				     }else{
				    	 	console.dir(data);
				    	 	if(data.flag == "nologin"){
				    	 		window.location.href= basePath + "/login?backurl=/topic/replys?page=1&videoId="+videoId+"&topicId="+topicId;
				    	 		return;
				    	 	} if(data.flag == "error"){
				    	 		  $("#show_content").html(data.message);
					  				return;
					    	 	}else{
					    	 		alert("系统错误，请稍后重试");
					    	 		return;
					    	 	}
				    	 		return;
				     }
				   },
				   "json");
    	
    }
    
    
    
    function delTopic(topicId){
    	if(topicId == null || topicId == "" || topicId == "0"){
    		return;
    	}
    	
    	$.post(basePath + "/topic/topics/"+topicId,{},
				   function(data){
				     if(data.success){
				 	       window.location.reload();
				 	       return;
				     }else{
				    	 	console.dir(data);
				    	 	if(data.flag == "nologin"){
				    	 		window.location.href= basePath + "/login?backurl=/topic/replys?page=1&videoId="+videoId+"&topicId="+topicId;
				    	 		return;
				    	 	}else if(data.flag == "error"){
				    	 		  $("#show_content").html("请选择要上传图片");
				  				return;
				    	 	}else{
				    	 		alert("系统错误，请稍后重试");
				    	 		return;
				    	 	}
				     }
				   },
				   "json");
    	
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
    	$("#save_btn").attr("onclick","saveReply();");
    }
   
   
   //多图上传
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
   
	var playing_id = 0;
	var playing_type = 0;
	var play_num = 0;
	var is_play = 0;//0表示之前没有播放的
	//播放音频
	function play(type,id){
		console.log("playing_id = " + playing_id);
		console.log("playing_type = " + playing_type);
		console.log("is_play = " + is_play);
		if(type != "1" && type !="2"){
			return;
		}
		if(id == "0" || id == null || id == ""){
			return;
		}
		
		if(is_play == 1){		//之前播放状态
					if(playing_id == id && playing_type == type){		//对同一个音频操作
						if(type ==1){
							document.getElementById("audio_topic_" + id).pause();
							 $("#play_topic_" + id).removeClass("play");
						}else if(type == 2){
							document.getElementById("audio_reply_" + id).pause();
							 $("#play_reply_" + id).removeClass("play");
						}
						is_play = 0;
					}else{
						//停止之前的
						if(playing_type ==1){
							var audio = document.getElementById("audio_topic_" + playing_id);
							audio.pause();
							audio.currentTime = 0.0; 
							 $("#play_topic_" + playing_id).removeClass("play");
						}else if(playing_type == 2){
							var audio  = document.getElementById("audio_reply_" + playing_id);
							audio.pause();
							audio.currentTime = 0.0; 
							 $("#play_reply_" + playing_id).removeClass("play");
						}
						
						//新播放
						if(type ==1){
							var audioDom = document.getElementById("audio_topic_" + id);
							audioDom.play();
							 $("#play_topic_" + id).addClass("play");
							
							 //音频播放完成后的执行操作
								audioDom.onended = function() {
									$("#play_topic_" + id).removeClass("play");
								}
						}else if(type == 2){
							var audioDom = document.getElementById("audio_reply_" + id);
							audioDom.play();
							 $("#play_reply_" + id).addClass("play");
							 
							//音频播放完成后的执行操作
								audioDom.onended = function() {
									$("#play_reply_" + id).removeClass("play");
								}
						}
						playing_type = type;
						playing_id = id;
					}
		}else if(is_play == 0){
			if(playing_id != id || playing_type != type){		//对同一个音频操作
				//停止之前的
				if(playing_type ==1){
					var audio = document.getElementById("audio_topic_" + playing_id);
					audio.pause();
					audio.currentTime = 0.0; 
					 $("#play_topic_" + playing_id).removeClass("play");
				}else if(playing_type == 2){
					var audio  = document.getElementById("audio_reply_" + playing_id);
					audio.pause();
					audio.currentTime = 0.0; 
					 $("#play_reply_" + playing_id).removeClass("play");
				}
			}
			//播放新的
			if(type ==1){
				var audioDom = document.getElementById("audio_topic_" + id);
				audioDom.play();
				 $("#play_topic_" + id).addClass("play");
				 
				//音频播放完成后的执行操作
				audioDom.onended = function() {
					$("#play_topic_" + id).removeClass("play");
				}
			}else if(type == 2){
				var audioDom = document.getElementById("audio_reply_" + id);
				audioDom.play();
				 $("#play_reply_" + id).addClass("play");
				
				 //音频播放完成后的执行操作
					audioDom.onended = function() {
						$("#play_reply_" + id).removeClass("play");
					}
			}
			playing_id = id;
			playing_type = type;
			is_play = 1;
		}
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
	
	
	$(function(){
		//语音长度
		/* $(".playaudio").each(function(index,item){
			var timeLen = $(this).find(".audioTime").html();
			//var audioLen = timeLen*3+"px";
			var audioLen = timeLen*50+"px";
			console.log("audioLen = " + audioLen);
			$(this).css("width",audioLen);
		})	 */
	});
    
    </script>
</body>
</html>