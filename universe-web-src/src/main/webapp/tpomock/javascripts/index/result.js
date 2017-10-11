(function() {
    $.extend(xm, {
        initPage: function() {
            //结果页全局变量
            xm.type=0;
            xm.resultId=0;
            xm.tpoId=0;
            xm.page=0;
            xm.pageSize=10;
            xm.myuser=0;
            //初始化
            $('.loadBox').hide();
            //防止重复提交表单变量
            xm.timer5 = null;
            //获取用户的token
            xm.initForm();
            var recordArr=[];
        },
        initForm: function() { 
            $(".g-read").addClass("f-dn");
            console.log($("#studentId").val());
           
            xm.myuser=$("#studentId").val();
            console.log("sdjfoidskjfsdofs"+xm.myuser)
            var rurl="";
            if(xm.myuser==0){
               rurl=xm.baseURL + "/mkResult/result.action?page="+xm.page+"&pageSize="+xm.pageSize;
            }else{
               rurl=xm.baseURL + "/mkResult/result.action?page="+xm.page+"&pageSize="+xm.pageSize+"&userId="+xm.myuser;
            }
            // 获取结果数据
            $.ajax({
                type: "GET",
                url: rurl,
                dataType : "json",
                success: function(data) {
                	 var userId = data.userId;
                        $("#checkScore").attr("user",userId);
	                datastr="";
			          datastr+="<div class='mock-topic f-cb'>" +
				          				"<ul class='time_list'>";
			                                  if(data.date.length!=0){
			                                   for(var j=0;j<data.date.length;j++){
			                                	   var item=data.date[j];
					          						datastr+="<li><a class='finds' tpoId='"+item.mkResult.mkTpoId+"' type='"+item.mkResult.type+"' resultId='"+item.mkResult.id+"' myuser='"+userId+"'>"+formatDateTime(item.mkResult.createdAt)+" (模考：</span><span>"+item.mkTpo.name+"</span>)</a></li>";
			                                   }
			                                  }else{
			                                	  datastr+="<li>无</li>"; 
			                                  }
				          			  datastr+="</ul>" +
				          		"</div>"	
                   $("#content").html(datastr);
                   
                   $(".finds").each(function(){
                	  $(this).click(function(){
                		  xm.tpoId= $(this).attr('tpoId');
                    	  xm.type=$(this).attr('type');
                          xm.resultId=$(this).attr('resultId');
                          xm.myuser=$(this).attr("myuser")
                          xm.answerShow();
                          $(".g-read").removeClass("f-dn");
                          $(".m-mock").addClass("f-dn");
                         
                	  })
                   }) 
                   console.log(data);
                   var total = data.total;
                   var page = data.page;
                   var pageSize = data.pageSize;
                   var pageCount = pageCount();
            	   $(".first").html("<a href='javascript:first("+page+","+pageSize+");'>首页</a>") ;
            	   $(".prev").html ("<a href='javascript:pre("+page+","+pageSize+");'>上一页</a>")
            	   $(".next").html ("<a href='javascript:next("+page+","+pageSize+");'>下一页</a>");
            	   $(".last").html ("<a href='javascript:last("+pageCount+","+pageSize+");'>尾页〉</a>");
            	   $(".oks").html("<a class='ok' href='javascript:goTO("+pageSize+","+pageCount+")';>确定</a>")
            	   if(pageCount!=0)
            	   $(".goTO").val(page);
            	   $(".total_count").text(pageCount);
            	   console.log(page  +"kdfkl"+ pageCount)
                   if(page==1){
                	   $(".first").html("首页");
                	   $(".prev").html("上一页");
                   }
            	   if( page>pageCount || page==pageCount){
                	   $(".last").html("尾页");
                	   $(".next").html("下一页");
                   }
                   
                  //总页数
                   function pageCount(){   
                       var count = 0;   
                       if ( total%pageSize != 0 ) count = 1;    
                       return parseInt(total/pageSize) + count;   
                   }
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {   
                    console.log(XMLHttpRequest.status);  
                    console.log(XMLHttpRequest.readyState);  
                    console.log(textStatus);
                    if(XMLHttpRequest.status==401){
                    	alert("未登录,请登录后看记录");
                    }
                }
            });
        },
        answerShow: function() {
        	 $.ajax({
                 type: "GET",
                 url: xm.baseURL + "/mkResult/answer.action?type="+xm.type+"&tpoId="+xm.tpoId+"&resultId="+xm.resultId+"&userId="+xm.myuser,
                 dataType : "json",
                 success: function(result) {
//                     RBox = $(".wrap .switch-box"), // 阅读题容器
//                     LBox = $(".listening_wrap .audio-main"), // 听力题容器
//                     SBox = $(".speaking-topic .speaking-wrap"), // 口语题容器
//                     WBox = $(".Articlewriting"), // 写作题容器
                     integratedWBox = $(".alone-box"),
                     independentWBox = $(".overall-box");
                 // 阅读答案数据
                 // 拖拽题答案    
                 if(result.mockResult.type==1 || result.mockResult.type==5){
	                 for(var i = 0; i < result.reading.length; i++){
	                	 var resultRArr =result.reading;
	                     if(resultRArr[i].passageNum==1){
	                         var contStr = "";
	                         contStr += "<tr>" +
	                                    "<td class='f-tal'>" + resultRArr[i].question + "</td>";
	                                    if(resultRArr[i].originalAnswer!=resultRArr[i].answer){
	                                    	contStr+="<td style='color:red'>" + resultRArr[i].originalAnswer + "</td>";
	                                    }else{
	                                    	contStr+= "<td>" + resultRArr[i].originalAnswer + "</td>";
	                                    }
	                                    contStr+="<td>" + resultRArr[i].answer + "</td>" +
	                                    "</tr>";
	                         $(".read-table-01 tbody").append(contStr);
	                     }
	                     if(resultRArr[i].passageNum==2){
	                         var contStr = "";
	                         contStr += "<tr>" +
				                         "<td class='f-tal'>" + resultRArr[i].question + "</td>";
			                             if(resultRArr[i].originalAnswer!=resultRArr[i].answer){
			                             	contStr+="<td style='color:red'>" + resultRArr[i].originalAnswer + "</td>";
			                             }else{
			                             	contStr+= "<td>" + resultRArr[i].originalAnswer + "</td>";
			                             }
			                             contStr+="<td>" + resultRArr[i].answer + "</td>" +
	                                    "</tr>";
	                         $(".read-table-02 tbody").append(contStr);
	                     }
	                     if(resultRArr[i].passageNum==3){
	                         var contStr = "";
				             contStr += "<tr>" +
				                         "<td class='f-tal'>" + resultRArr[i].question + "</td>";
			                             if(resultRArr[i].originalAnswer!=resultRArr[i].answer){
			                             	contStr+="<td style='color:red'>" + resultRArr[i].originalAnswer + "</td>";
			                             }else{
			                             	contStr+= "<td>" + resultRArr[i].originalAnswer + "</td>";
			                             }
			                             contStr+="<td>" + resultRArr[i].answer + "</td>" +
	                                    "</tr>";
	                         $(".read-table-03 tbody").append(contStr);
	                     }
	                 }
                 }
                 if(result.mockResult.type==2 || result.mockResult.type==5){
	                 for(var i = 0; i < result.listening.length; i++){
	                      var resultLArr=result.listening;
	                     if(resultLArr[i].sectionCode==1 && resultLArr[i].subjectType==1 && resultLArr[i].subjectCode==1){
	                         var contStr = "";
	                         contStr += "<tr>" +
				                         "<td class='f-tal'>" + resultLArr[i].question + "</td>";
			                             if(resultLArr[i].originalAnswer!=resultLArr[i].answer){
			                             	contStr+="<td style='color:red'>" + resultLArr[i].originalAnswer + "</td>";
			                             }else{
			                             	contStr+= "<td>" + resultLArr[i].originalAnswer + "</td>";
			                             }
			                             contStr+="<td>" + resultLArr[i].answer + "</td>" +
	                                    "</tr>";
	                         $(".listen-table-01 tbody").append(contStr);
	                     }
	                     if(resultLArr[i].sectionCode==1 && resultLArr[i].subjectType==2 && resultLArr[i].subjectCode==1){
	                         var contStr = "";
	                         contStr += "<tr>" +
				                         "<td class='f-tal'>" + resultLArr[i].question + "</td>";
			                             if(resultLArr[i].originalAnswer!=resultLArr[i].answer){
			                             	contStr+="<td style='color:red'>" + resultLArr[i].originalAnswer + "</td>";
			                             }else{
			                             	contStr+= "<td>" + resultLArr[i].originalAnswer + "</td>";
			                             }
			                             contStr+="<td>" + resultLArr[i].answer + "</td>" +
	                                    "</tr>";
	                         $(".listen-table-02 tbody").append(contStr);
	                     }
	                     if(resultLArr[i].sectionCode==1 && resultLArr[i].subjectType==2 && resultLArr[i].subjectCode==2){
	                         var contStr = "";
	                         contStr += "<tr>" +
				                         "<td class='f-tal'>" + resultLArr[i].question + "</td>";
			                             if(resultLArr[i].originalAnswer!=resultLArr[i].answer){
			                             	contStr+="<td style='color:red'>" + resultLArr[i].originalAnswer + "</td>";
			                             }else{
			                             	contStr+= "<td>" + resultLArr[i].originalAnswer + "</td>";
			                             }
			                             contStr+="<td>" + resultLArr[i].answer + "</td>" +
	                                    "</tr>";
	                         $(".listen-table-03 tbody").append(contStr);
	                     }
	                     if(resultLArr[i].sectionCode==2 && resultLArr[i].subjectType==1 && resultLArr[i].subjectCode==2){
	                         var contStr = "";
	                         contStr += "<tr>" +
				                         "<td class='f-tal'>" + resultLArr[i].question + "</td>";
			                             if(resultLArr[i].originalAnswer!=resultLArr[i].answer){
			                             	contStr+="<td style='color:red'>" + resultLArr[i].originalAnswer + "</td>";
			                             }else{
			                             	contStr+= "<td>" + resultLArr[i].originalAnswer + "</td>";
			                             }
			                             contStr+="<td>" + resultLArr[i].answer + "</td>" +
	                                    "</tr>";
	                         $(".listen-table-04 tbody").append(contStr);
	                     }
	                     if(resultLArr[i].sectionCode==2 && resultLArr[i].subjectType==2 && resultLArr[i].subjectCode==3){
	                         var contStr = "";
	                         contStr += "<tr>" +
				                         "<td class='f-tal'>" + resultLArr[i].question + "</td>";
			                             if(resultLArr[i].originalAnswer!=resultLArr[i].answer){
			                             	contStr+="<td style='color:red'>" + resultLArr[i].originalAnswer + "</td>";
			                             }else{
			                             	contStr+= "<td>" + resultLArr[i].originalAnswer + "</td>";
			                             }
			                             contStr+="<td>" + resultLArr[i].answer + "</td>" +
	                                    "</tr>";
	                         $(".listen-table-05 tbody").append(contStr);
	                     }
	                     if(resultLArr[i].sectionCode==2 && resultLArr[i].subjectType==2 && resultLArr[i].subjectCode==4){
	                         var contStr = "";
	                         contStr += "<tr>" +
				                         "<td class='f-tal'>" + resultLArr[i].question + "</td>";
			                             if(resultLArr[i].originalAnswer!=resultLArr[i].answer){
			                             	contStr+="<td style='color:red'>" + resultLArr[i].originalAnswer + "</td>";
			                             }else{
			                             	contStr+= "<td>" + resultLArr[i].originalAnswer + "</td>";
			                             }
			                             contStr+="<td>" + resultLArr[i].answer + "</td>" +
	                                    "</tr>";
	                         $(".listen-table-06 tbody").append(contStr);
	                     }
	                 }
                 }
                 // 口语答案数据
                 if(result.mockResult.type==4 || result.mockResult.type==5){
	                 var speakCcntStr = "";
	                 for(var i = 0; i < result.speaking.length; i++){
	                     speakCcntStr += '<h3 class="table-tit">Question ' + (i + 1) + '</h3>' +
	                     '<div id="jp_container_' + (i + 1) + '" class="box-bd m-audio jp-audio f-cb" role="application" aria-label="media player">' +
	                         '<div class="jp-type-single">' +
	                             '<div class="jp-gui jp-interface">' +
	                                 '<div class="jp-controls f-fl">' +
	                                     '<button class="u-btn u-btn-play JS_write_play jp-play" role="button" tabindex="0">play</button>' +
	                                 '</div>' +
	                                 '<div class="m-progress jp-progress f-fl">' +
	                                     '<div class="prog-box jp-seek-bar">' +
	                                         '<div class="prog-range jp-play-bar"><i class="prog-icon"></i></div>' +
	                                     '</div>' +
	                                 '</div>' +
	                                 '<div class="audio-time jp-time-holder f-fl">' +
	                                     '<div class="time-txt jp-current-time" role="timer" aria-label="time">00:00</div> /' +
	                                     '<div class="time-txt jp-duration" role="timer" aria-label="duration">00:00</div>' +
	                                 '</div>' +
	                             '</div>' +
	                         '</div>' +
	                     '</div>';
	                 }
	                 $(".speak-tab").append(speakCcntStr);
	                 recordArr = result.speaking;
	                 xm.speakPlayer();
                 }
                 // 写作答案数据
                 if(result.mockResult.type==3 || result.mockResult.type==5){
	                 for (var i = 0; i < result.writing.length; i++) {
	                	 var resultWArr=result.writing;
	                     if(resultWArr[i].type == 1){
	                    	 console.log(resultWArr[i].writeAnswer);
	                         independentWBox.find(".write-ques").html(resultWArr[i].question);
	                         independentWBox.find(".write-answer").html(resultWArr[i].writeAnswer.replace(/\n/g, '<br />'));
	                     }
	                     if(resultWArr[i].type == 2){
	                         integratedWBox.find(".write-ques").html(resultWArr[i].question);
	                         integratedWBox.find(".write-answer").html(resultWArr[i].writeAnswer.replace(/\n/g, '<br />'));
	                     }
	                 }
                 }
                 },
                 error: function(XMLHttpRequest, textStatus, errorThrown) {   
                     console.log(XMLHttpRequest.status);  
                     console.log(XMLHttpRequest.readyState);  
                     console.log(textStatus);
                 }
             });
        },
        speakPlayer: function() {
            $("#jquery_jplayer_1").jPlayer({
                ready: function () {
                    $(this).jPlayer("setMedia", {
                        mp3: recordArr[0].speakUrl
                    });
                },
                play: function() {
                    $(this).jPlayer("pauseOthers");
                },
                swfPath: "../swf",
                supplied: "mp3, wav",
                cssSelectorAncestor: "#jp_container_1",
                wmode: "window",
                globalVolume: true,
                useStateClassSkin: true,
                autoBlur: false,
                smoothPlayBar: false,
                keyEnabled: true
            });
            $("#jquery_jplayer_2").jPlayer({
                ready: function () {
                    $(this).jPlayer("setMedia", {
                        mp3: recordArr[1].speakUrl
                    });
                },
                play: function() {
                    $(this).jPlayer("pauseOthers");
                },
                swfPath: "../swf",
                supplied: "mp3, wav",
                cssSelectorAncestor: "#jp_container_2",
                wmode: "window",
                globalVolume: true,
                useStateClassSkin: true,
                autoBlur: false,
                smoothPlayBar: false,
                keyEnabled: true
            });
            $("#jquery_jplayer_3").jPlayer({
                ready: function () {
                    $(this).jPlayer("setMedia", {
                        mp3: recordArr[2].speakUrl
                    });
                },
                play: function() {
                    $(this).jPlayer("pauseOthers");
                },
                swfPath: "../swf",
                supplied: "mp3, wav",
                cssSelectorAncestor: "#jp_container_3",
                wmode: "window",
                globalVolume: true,
                useStateClassSkin: true,
                autoBlur: false,
                smoothPlayBar: false,
                keyEnabled: true
            });
            $("#jquery_jplayer_4").jPlayer({
                ready: function () {
                    $(this).jPlayer("setMedia", {
                        mp3: recordArr[3].speakUrl
                    });
                },
                play: function() {
                    $(this).jPlayer("pauseOthers");
                },
                swfPath: "../swf",
                supplied: "mp3, wav",
                cssSelectorAncestor: "#jp_container_4",
                wmode: "window",
                globalVolume: true,
                useStateClassSkin: true,
                autoBlur: false,
                smoothPlayBar: false,
                keyEnabled: true
            });
            $("#jquery_jplayer_5").jPlayer({
                ready: function () {
                    $(this).jPlayer("setMedia", {
                        mp3: recordArr[4].speakUrl
                    });
                },
                play: function() {
                    $(this).jPlayer("pauseOthers");
                },
                swfPath: "../swf",
                supplied: "mp3, wav",
                cssSelectorAncestor: "#jp_container_5",
                wmode: "window",
                globalVolume: true,
                useStateClassSkin: true,
                autoBlur: false,
                smoothPlayBar: false,
                keyEnabled: true
            });
            $("#jquery_jplayer_6").jPlayer({
                ready: function () {
                    $(this).jPlayer("setMedia", {
                        mp3: recordArr[5].speakUrl
                    });
                },
                play: function() {
                    $(this).jPlayer("pauseOthers");
                },
                swfPath: "../swf",
                supplied: "mp3, wav",
                cssSelectorAncestor: "#jp_container_6",
                wmode: "window",
                globalVolume: true,
                useStateClassSkin: true,
                autoBlur: false,
                smoothPlayBar: false,
                keyEnabled: true
            });
        },
    })
})();
    var formatDateTime = function (date) {
    	var date = new Date(date);
        var y = date.getFullYear();  
        var m = date.getMonth() + 1;  
        m = m < 10 ? ('0' + m) : m;  
        var d = date.getDate();  
        d = d < 10 ? ('0' + d) : d;  
        var h = date.getHours();  
        var minute = date.getMinutes();  
        minute = minute < 10 ? ('0' + minute) : minute;  
        return y + '-' + m + '-' + d+' '+h+':'+minute;  
    }
    
    //分页相关的js 代码
  //下一页 
   function next(page,pageSize){
      xm.page=page+1;
      xm.pageSize=pageSize;
      xm.initForm();
    } 
   //上一页
   function pre(page,pageSize){   
       xm.page=page-1;
       xm.pageSize=pageSize;
       xm.initForm();
   }    
   //第一页
   function first(page,pageSize){
	   xm.page=1;
	   xm.pageSize=pageSize;
	   xm.initForm();
   }        
   //最后一页
   function last(pageCount,pageSize){   
	   xm.page=pageCount;
	   xm.pageSize=pageSize;
	   xm.initForm();
   } 
   //跳转
   function goTO(pageSize,pageCount){
	   var p=$(".goTO").val();
	   if(p<1 || p>pageCount){
		   xm.page=pageCount;
		   xm.pageSize=pageSize;
		  
	   }else{
		   xm.page=p;
		   xm.pageSize=pageSize;
	   }
	   xm.initForm();
   }
   $("#checkScore").click(function(){
	    var id=  $(this).attr("user");
		$("#messagetip").html("复制你的id号"+id+"发送给老师检查");
		 $(".mask-bg").show();
        $(".m-pop-massage").show();
  })
   $("#findResult").click(function(){
	   xm.initForm();
   })
   $(".JS_pop_close").click(function() {
         $(".m-pop-massage").hide();
        $(".mask-bg").hide(); 
   });
   