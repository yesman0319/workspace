/**
 * Created by SaE on 2015/4/8.
 * 进阶练习-机经写作
 */
define(['common/render', 'xml2json', 'app/baseURL', 'baseCookie'], function (Render, xml2json, URL, BaseCookie) {

    var xm_questionId="",
        xm_planDayId='',
        xm_exerciseId='',
        xm_startTime='',
        xm_endTime='',
        xm_type='',
        xm_title='',
        xm_timer=null,//计时定时器
        xm_spendTime=0;//做题时间
    var JJWrite = (function () {
        //私有变量
        var _tokenTmp = "xiaoma";

        var obj = {
            $wrap: '',
            token: '',
            tokenTmp: function () {
                return _tokenTmp;
            },
            currentQuestions: [],
            TMPL: {
                yuce_list: 'app/jinjie/tmpl_jjwrite_yuce_list', //机经写作-机经预测列表
                zhenti_list: 'app/jinjie/tmpl_jjwrite_zhenti_list', //机经写作-历年真题列表
                yuce_child_list:'app/jinjie/tmpl_jjwrite_yuce_child_list',//选项卡下面列表
                zhenti_child_list: 'app/jinjie/tmpl_jjwrite_zhenti_child_list',
                doing: 'app/jinjie/tmpl_jjwrite_doing',//机经写作-做题页
                result: 'app/jinjie/tmpl_jjwrite_result'//机经写作-用户做题记录列表页
            }
        };
        obj.getToken = function () {
            BaseCookie.get();
            obj.token = BaseCookie.getToken();
            if (null == obj.token || "" == obj.token) {
                obj.token = obj.tokenTmp();
            }
        };
        return obj;
    }());

    /*通用Ajax方法*/
    JJWrite.sendAjax = function (param) {
        var promise = $.Deferred();
        if (!param) {
            return null;
        }
        !param.type && (param.type = 'get');
        !param.contentType && (param.contentType = 'application/json');
        !param.data && (param.data = '');
        !param.headers && (param.headers = '');

        $.ajax({
            url: param.url,
            type: param.type,
            contentType: param.contentType,
            data: param.data,
            headers: param.headers,
            success: function (json) {
                promise.resolve(json);
            },
            error: function () {
                promise.reject();
            }
        });
        return promise;
    };


    JJWrite.init = function (conf) {
        var _this = JJWrite;
        var _conf = $.extend({
            wrap: ''
        }, conf || {});
        _this.$wrap = $(_conf.wrap);
        _this.getToken();

        _this.initEvent();
    };

    JJWrite.initEvent = function () {
        var $document = $(document);
        $(document).on('click','#showMorePlan',function(){
            $('#morePlan').show();
        });
        $(document).on('click','#share_btn',function(){
            window.location.href=exerciseApi.shareUrl;
        });
        //$(document).on('trigger_side66', '#side66', JJWrite.menuToggle)
        //$document.on('click', '#side66', JJWrite.menuToggle);
        //$document.on('click', '#side661', JJWrite.loadYuCeList);
       // $document.on('click', '#side662', JJWrite.loadZhenTiList);

        $document.on('click', '.jjWrite-set_share', JJWrite.serShare);//发布
        $document.on('click', '.jjWrite-set_cancel', JJWrite.serCancel)//展开发布按钮        
        $document.on('click', '.jjWrite-set_cancel-btn', JJWrite.serCancelBtn);//取消发布
        $document.on('click', '#jj_start_btn',function(e){
            e=e||window.event;
            var tar=e.target||e.srcElement;
            $(tar).toggle();
            if($("#ans-div3").css("display")=="none"){
                $("#ans-div3").show();                
            }else{
              $("#ans-div3").hide();
            }
            //开始计时
            xm_timer = setInterval(function(){
            	xm_spendTime ++;
                if ($("#testTimerjjWrite").length <= 0) {
                    console.log("not find target");
                }
                var checkTime = function(i) {
                    if (i < 10) {
                        i = "0" + i;
                    }
                    return i;
                };
                var hh = parseInt(xm_spendTime / 60 / 60 % 24, 10);
                var mm = parseInt(xm_spendTime / 60 % 60, 10);
                var ss = parseInt(xm_spendTime % 60, 10);
                hh = checkTime(hh);
                mm = checkTime(mm);
                ss = checkTime(ss);
                $("#testTimerjjWrite").html(hh + ":" + mm + ":" + ss);
            },1000);
            
            
        });

        $document.on('click', '.yuceTab', JJWrite.loadOneYearYuceList);//切换年份选项卡
        $document.on('click', '.jjWriteTab', JJWrite.loadOneYearZhenTiList);//切换年份选项卡
        $document.on('click', '.jjwrite', JJWrite.Doing.showAnswerBefore);//显示做题页面
        $document.on('click', '.expand', JJWrite.Doing.expandOrCollapse);//折叠/展开
        $document.on('click', '#jjWriteDoAgain', JJWrite.Doing.doAgain);//重做
        $document.on('click','#jjWriteSubmit',JJWrite.Doing.Submit);//提交
        $document.on('keyup', '#jjWriteAnswer', JJWrite.Doing.checkLengthNew);
        $document.on('click','.navjjlist',JJWrite.Doing.navigatorTolist);//导航条
        //$document.on('click','#jjWriteSpre',JJWrite.spreFn);//答案展开收起
        //$document.on('click', '.navjjwrite', function () {
        //    $('#leftDiv').hide();
        //    $('#side661').click();
        //    $('#side').show();
        //});
        $document.on('click','.playthevideo',function(){
            JJWrite.Doing.playDemoVideo($(this).attr('data-source'));
        });//播放视频
        $document.off('click','#btnNextQuestion').on('click','#btnNextQuestion',function(){
            var params = {},
                next_status = $(this).attr("next_status");
            params.questionId = $(this).attr("qid");
            params.come = $(this).attr('come');
            //0:无做题记录，1：有做题记录，2：最后一题
            if(next_status==0){
                params.type=0;
            }else if(next_status==1){
                params.type=1;
            }else{
                alert('已经是最后一题了！');
                return;
            }
            JJWrite.Doing.showAnswerPage(params);
        });

    };
    //发布
    JJWrite.serShare=function(e){
        e=e||window.event;
        var tar= e.target|| e.srcElement;
        if(tar.tagName.toLowerCase()=="i"){
        	tar=tar.parentNode;
        }
        var result_id=$(tar).attr("data-result_id");
        var question_id=$(tar).attr("data-question_id");
        var _success1=function(json){
           json= $.parseJSON(json);
           //$(tar).attr("id","set_cancel").text("取消发布").prev().text("[已发布]")
           //$(tar).removeClass("jjWrite-set_share").addClass("jjWrite-set_cancel").html("已发布<i class='jjWriteSetShare-icon'></i>");
           $(tar).hide().next().show();
        }
        $.ajax({
            url: URL.xiaomaURL + 'speakingswritings/shares/'+xm_type+'/'+question_id+'/'+result_id,
            type: 'post',
            headers: {
                "Authorization": exerciseApi.xiaomaToken
            },
            success: _success1
        });
    };
    //
    JJWrite.serCancel=function(e){
    	e=e||window.event;
        var tar= e.target|| e.srcElement;
        if(tar.tagName.toLowerCase()=="i"){
        	tar=tar.parentNode;
        }
        var $cancelBtn=$(tar).parent().find(".jjWrite-set_cancel-btn");
        if($cancelBtn.css("display")=="block"){
        	$cancelBtn.hide();
        	$(tar).find("i").removeClass("jjWriteSetShare-icon-click");
        }else{
        	$cancelBtn.show();
        	$(tar).find("i").addClass("jjWriteSetShare-icon-click");
        }
        
        
    }
    //取消发布
    JJWrite.serCancelBtn=function(e){
        e=e||window.event;
        var tar= e.target|| e.srcElement;
        var result_id=$(tar).attr("data-result_id");
        var question_id=$(tar).attr("data-question_id");
        var _success2=function(json){
            json= $.parseJSON(json);
            //$(tar).attr("id","set_share").text("发布").prev().text("[未发布]")
            //$(tar).hide().prev().removeClass("jjWrite-set_cancel").addClass("jjWrite-set_share").html("<i class='jjWriteSetShare-icon'></i>发布");
            $(tar).hide().prev().hide().prev().show();
        }
        $.ajax({
            url: URL.xiaomaURL + 'speakingswritings/shares/'+xm_type+'/'+question_id+'/'+result_id,
            type: 'delete',
            headers: {
                "Authorization": exerciseApi.xiaomaToken
            },
            success: _success2
        });
    };
   /* JJWrite.spreFn=function(){//答案展开收起
    	if($(this).text().indexOf("展开")>=0){
    		//$(this).html("收起<span style='color:#6bc04b;font-size:16px;'>&and;</span>").prev().css({"display":"block","height":"auto"});
    		$(this).html("收起").prev().css({"display":"block","height":"auto"});
    	}else{
    		//$(this).html("展开<span style='color:#6bc04b;font-size:16px;'>&or;</span>").prev().css({"display":"-webkit-box","height":"66px"});
    		$(this).html("展开").prev().css({"display":"-webkit-box","height":"66px"});
    	}
    }*/

    /**
     * 机经口语子菜单展示
     */
    JJWrite.menuToggle = function () {
        $('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
        $("#side661").addClass('sidebarLight');
        $("#jj_write_menu_div").toggle();
        if ($('#jj_write_menu_div').css('display') == "none") {
            $("#imgJJWrite").attr("src", "../../i/side-ang1.png");
        } else {
            $("#imgJJWrite").attr("src", "../../i/side-ang.png");
        }
        $("#side661").click(); //默认定位机经预测
    };

    /**
     机经预测列表
     */
    JJWrite.loadYuCeList = function () {
        $('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
        $("#side661").addClass('sidebarLight');

        JJWrite.getToken();
        //question_type：1:口语，2：写作
        var param = {
            url: URL.baseURL5 + "jijing_questions/web_yuce",
            headers: {
                Authorization: JJWrite.token
            },
            data: {
                question_type: 2
            }
        };
        var promise = JJWrite.sendAjax(param);
        promise.then(function (json) {
            var renderData = {};renderData.xm_title=xm_title;
            renderData.title=json.group_title;
            //json.group_messages.unshift({group_id:0,group_title:json.group_title});
            renderData.groups = json.group_messages;
            renderData.questions = json.jijing_questions;
            renderData.come = 'wjj';//机经预测
            //json.jijing_questions.sort(function(v1,v2){
            //    return v1.question_sequence_number-v2.question_sequence_number;
            //});
            JJWrite.currentQuestions = json.jijing_questions; //保存当前下载题目
            //JJWrite.currYearGroupId = json.jijing_groups[0].group_id;
            JJWrite.currentTitle=json.group_title;

            Render.render({
                wrap: JJWrite.$wrap,
                tmpl: {
                    tmplName: JJWrite.TMPL.yuce_list,
                    tmplData: renderData
                },
            	afterRender:function(){
            		$(".yuceTab").eq(1).trigger("click");
            		$(".sim-a").eq(0).trigger("click");
                }
            	
            });
        });

    };
    /**
     机经预测（各年份选项卡切换）
     */
    JJWrite.loadOneYearYuceList = function () {
        var groupId = $(this).attr('gid'),
            groupTitle = $(this).attr('gtitle');
        JJWrite.getToken();
        //设置焦点选项卡
        $('.tabWrite li').removeClass('current');
        $(this).parent('li').addClass('current');

        //获取某一年下所有的试题
        var paramZhenti = {
            url: URL.baseURL5 + "jijing_questions/web_yuce",
            headers: {
                Authorization: JJWrite.token
            },
            data: {
                group_id: groupId,
                question_type: 2
            }
        };
        promise = JJWrite.sendAjax(paramZhenti);
        promise.then(function (json) {
            var renderData = {};renderData.xm_title=xm_title;
            renderData.questions = json.jijing_questions;
            //机经预测
            renderData.come = 'wjj';
            JJWrite.currentQuestions = json.jijing_questions; //保存当前下载题目
            JJWrite.currentTitle=groupTitle;
            Render.render({
                wrap: $('#jjWriteYuceContent'),
                tmpl: {
                    tmplName: JJWrite.TMPL.yuce_child_list,
                    tmplData: renderData
                },
                afterRender:function(){$(".jjwrite").eq(0).trigger("click");}
            });
        }, function (error) {
        });
    };

    /**
     历年真题列表
     */
    JJWrite.loadZhenTiList = function () {
        $('.sidebar-ul').find('a.sidebarLight').removeClass('sidebarLight');
        $("#side662").addClass('sidebarLight');

        JJWrite.getToken();
        //获取年份列表
        //1:口语，2：写作
        var param = {
            url: URL.baseURL5 + "jijing_questions/web_zhenti",
            headers: {
                Authorization: JJWrite.token
            },
            data: {
                question_type: 2
            }
        };
        var jijing_groups, renderData = {};renderData.xm_title=xm_title;
        var promise = JJWrite.sendAjax(param);
        promise.then(function (json) {
            jijing_groups = json.group_messages;
            if (json.group_messages && json.group_messages.length > 0) {
                renderData.groups = jijing_groups;
                //历年真题
                renderData.come = "wsl";
                //某一年下所有的试题
                renderData.questions = json.jijing_questions;
                JJWrite.currentQuestions = json.jijing_questions;
                JJWrite.currYearGroupId = jijing_groups[0].group_id;
                JJWrite.currentTitle=jijing_groups[0].group_title;

                Render.render({
                    wrap: JJWrite.$wrap,
                    tmpl: {
                        tmplName: JJWrite.TMPL.zhenti_list,
                        tmplData: renderData
                    }
                });

            }
        }, function (error) {
        });
    };

    /**
     历年真题（各年份选项卡切换）
     */
    JJWrite.loadOneYearZhenTiList = function () {
        var groupId = $(this).attr('gid'),
            groupTitle = $(this).attr('gtitle');
        JJWrite.getToken();
        //设置焦点选项卡
        $('.tabWrite li').removeClass('current');
        $(this).parent('li').addClass('current');

        //获取某一年下所有的试题
        var paramZhenti = {
            url: URL.baseURL5 + "jijing_questions/web_zhenti",
            headers: {
                Authorization: JJWrite.token
            },
            data: {
                group_id: groupId,
                question_type: 2
            }
        };
        promise = JJWrite.sendAjax(paramZhenti);
        promise.then(function (json) {
            var renderData = {};renderData.xm_title=xm_title;
            renderData.questions = json.jijing_questions;
            //历年真题
            renderData.come = 'wsl';
            JJWrite.currentQuestions = json.jijing_questions; //保存当前下载题目
            JJWrite.currentTitle=groupTitle;
            Render.render({
                wrap: $('#jjWriteZhentiContent'),
                tmpl: {
                    tmplName: JJWrite.TMPL.zhenti_child_list,
                    tmplData: renderData
                }
            });
        }, function (error) {
        });
    };

    /**
     * 做题部分
     */
    JJWrite.Doing = JJWrite.Doing || {preWord:null};

    JJWrite.Doing.showAnswerBefore = function () {
        var params = {};
        params.questionId = $(this).attr("qid");
        params.type = $(this).attr("type");
        params.come = $(this).attr('come');
        JJWrite.Doing.showAnswerPage(params);
    };

    /**
     * 显示用户答题页面
     **/
    JJWrite.Doing.showAnswerPage = function (params) {

        var questionId = params.questionId;
        var type = params.type;
        //var come = params.come;

        var from = "exercise";
       // var cText;
        //cText = "机经预测";
        //if (come == "wjj") {
        //    cText = "机经预测";
        //} else {
        //    cText = "历年真题";
        //}20160921全部是机经预测

        var param = {
            //url: URL.baseURL5 + 'jijing_questions/web_question_message',
            url: URL.xiaomaURL + 'speakingswritings/questions/'+xm_type+'/'+questionId,
            headers: {
                Authorization: exerciseApi.xiaomaToken
            }
        };
        var promise = JJWrite.sendAjax(param);
        promise.then(function (json) {
            if (json && json.error) {
                alert(json.error);
            } else {
                json= $.parseJSON(json);
                var renderData = {};renderData.xm_title=xm_title;
                //renderData.come = come;
                //renderData.cText = cText;
                renderData.question_id = questionId;
                renderData.question_sequence_number = json.sequence_number;
                renderData.question_content = json.content;
                renderData.answers = json.answers;
                if(json.results){
               	 //日期格式、做题时长
                   $.each(json.results,function(index,value){
                      var tmpDate=new Date(value.created_at);
                       tmpDate=zeroFn(tmpDate.getFullYear())+"-"+zeroFn((tmpDate.getMonth()+1))+"-"+zeroFn(tmpDate.getDate())+" "+zeroFn(tmpDate.getHours())+":"+zeroFn(tmpDate.getMinutes())+":"+zeroFn(tmpDate.getSeconds());
                       value.cur_created_at=tmpDate;
                       
                       var tmpSpendTime=value.spend_time;
                       if(tmpSpendTime==0){
                    	   value.spend_time="暂无";
                       }else{
                    	   var tmpH=Math.floor(tmpSpendTime/3600);
                           var tmpM=Math.floor((tmpSpendTime-tmpH*3600)/60);
                           var tmpS=tmpSpendTime-tmpH*3600-tmpM*60;
                           value.spend_time=zeroFn(tmpH)+":"+zeroFn(tmpM)+":"+zeroFn(tmpS);
                       }
                       
                       
                   });
                   $.each(json.results,function(index,value){
                   	value.content=value.content.replace(/\n/ig,"<br/>");
                   })
                   renderData.results=json.results;
               }
               
                
                //答案范例
                /*renderData.sample_content=(json.sample&&json.sample.content)?[json.sample.content.replace(/\n/g,'<br/>')]:[];
                renderData.question_analysis=json.analysis?[json.analysis]:[];*/
                /*if(json.analysisAudio.length!=0){
                	renderData.analysisAudio=json.analysisAudio[0];
                	renderData.question_analysis=(renderData.analysisAudio&&renderData.analysisAudio.content)?[renderData.analysisAudio.content]:[];
                }*/
                //讲解视频
                renderData.question_analysis=[];
                if(json.analysisVideo.length!=0){
                	
                	$.each(json.analysisVideo,function(index,value){
                		if(value.content){
                			renderData.question_analysis.push(value.content);
                		}
                	})
                	/*renderData.analysisVideo=json.analysisVideo[0];
                	renderData.question_analysis=(renderData.analysisVideo&&renderData.analysisVideo.content)?[renderData.analysisVideo.content]:[]; */               	
                }
                // 文本范例
                renderData.sample_content=[]
                if(json.analysisText.length!=0){
                	$.each(json.analysisText,function(index,value){
                		if(value.content){
                			//renderData.sample_content.push(value.content.replace(/\n/g,'<br/>'));
                			renderData.sample_content.push(value.content);
                		}
                	})
                	
                	/*renderData.analysisText=json.analysisText[0];
                	renderData.sample_content=(renderData.analysisText&&renderData.analysisText.content)?[renderData.analysisText.content.replace(/\n/g,'<br/>')]:[];*/
                	
                }
                
                showDoQuestion();


                //右侧列表
               /* renderData.questions = JJWrite.currentQuestions;
                renderData.rightPartTitle=JJWrite.currentTitle;
                $.each(renderData.questions, function (i, n) {
                    n.question_content = (n.question_content && n.question_content.length > 43) ? n.question_content.substring(0, 43) : n.question_content;
                });*/
               //$("#side").css("display", "none"); //隐藏左边导航

               function showDoQuestion(){
            	 //做题页
                   Render.render({
                       wrap: JJWrite.$wrap,
                       tmpl: {
                           tmplName: JJWrite.TMPL.doing,
                           tmplData: renderData
                       },
                       afterRender:function(){
                           //var date=new Date($.ajax({async: false}).getResponseHeader("Date"));
                    	   var date=getTime();
                           xm_startTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
                           //if(renderData.sample_content.length==0&&renderData.question_analysis.length==0){
                           /*if(json.analysisAudio.length==0&&json.analysisVideo.length==0&&json.analysisText.length==0){
                               $('div.h202').hide();
                           }*/
                           showHiddenAnalysisJJWrite();
                           $(".share_con .p2").each(function(index,value){
                    		   $(value).html($(value).text());
                    	   })
                    	   if(params.type==1||params.type==3){
                               if(!exerciseApi.isInPlan){//未加入计划
                                   $("#save_success").show();
                               }
                           }
                       }
                   });
               }
               
               
              /* var showDoResult = function(){
              	 //结果页
            	   renderData.next_question_id=json.next_question_id;
                   renderData.next_sequence_number=json.next_sequence_number;
                   renderData.next_status=json.next_status;
                   renderData.isFromPlan=exerciseApi.isFromPlan;

                   if(params.type==1||params.type==3){
                       if(!exerciseApi.isInPlan){//未加入计划
                           $("#save_success").show();
                       }
                   }

                   //结果页
                   Render.render({
                       wrap: JJWrite.$wrap,
                       tmpl: {
                           tmplName: JJWrite.TMPL.result,
                           //tmplName:JJWrite.TMPL.doing,
                           tmplData: renderData
                       },
                       afterRender:function(){
                           if(renderData.sample_content.length==0&&renderData.question_analysis.length==0){
                               $('div.h202').hide();
                           }
                    	   $(".share_con .p2").each(function(index,value){
                    		   $(value).html($(value).text());
                    	   })
                       }
                   });

                 }20160921我的答案
              var _success=function(data){
                    data= $.parseJSON(data);
                    if(data.results){
                    	// 日期格式
                        $.each(data.results,function(index,value){
                           var tmpDate=new Date(value.created_at);
                            tmpDate=zeroFn(tmpDate.getFullYear())+"-"+zeroFn((tmpDate.getMonth()+1))+"-"+zeroFn(tmpDate.getDate())+" "+zeroFn(tmpDate.getHours())+":"+zeroFn(tmpDate.getMinutes())+":"+zeroFn(tmpDate.getSeconds());
                            value.cur_created_at=tmpDate;
                        });
                        $.each(data.results,function(index,value){
                        	value.content=value.content.replace(/\n+/g,"<br/>");
                        })
                        renderData.results=data.results;
                    }
                    showDoQuestion();
                    
                   if(type==3){
                       showDoQuestion();
                   }else if (renderData.results.length>0) {
                       showDoResult();
                   } else {
                       showDoQuestion();
                   }
               };
               $.ajax({
                    url: URL.xiaomaURL + 'speakingswritings/results/'+xm_type+'/'+questionId,
                    type: 'get',
                    headers: {
                        "Authorization": exerciseApi.xiaomaToken
                    },
                    success: _success,
                    error: function (jqXHR, textStatus, errorThrown) {
                        错误信息处理
                    	 renderData.results = [];
                    	 showDoQuestion();
                        if(type==3){
                            showDoQuestion();
                        }else if (renderData.results.length>0) {
                            showDoResult();
                        } else {
                            showDoQuestion();
                        }

                    }
               });
*/


            }
        });
    };

    /*保存*/
    JJWrite.Doing.Submit = function () {
    	var strAnswer = $('#jjWriteAnswer').val();
        var questionId = $('#jjResultContent').attr('qid');
    	if(!JJWrite.Doing.validWordsCount(strAnswer,200,"than")||!JJWrite.Doing.validWordsCount(strAnswer,700,"less")){
           $("#jj-tipCount").show();
           return;
         }
        //var date=new Date($.ajax({async: false}).getResponseHeader("Date"));
    	var date=getTime();
        xm_endTime=zeroFn(date.getFullYear())+"-"+zeroFn((date.getMonth()+1))+"-"+zeroFn(date.getDate())+" "+zeroFn(date.getHours())+":"+zeroFn(date.getMinutes())+":"+zeroFn(date.getSeconds());
        date=null;
      
       /* if (!JJWrite.Doing.validWordsCount(strAnswer,200,"than")) {
            $('#tipModel').modal({
                backdrop: 'static'
            });
            return;
        }
        if(!JJWrite.Doing.validWordsCount(strAnswer,700,"less")){
            $('#tipModel').modal({
                backdrop: 'static'
            });
            return;
        }*/
       
        //if (!BaseCookie.getToken()) {
        //    $('#dialogLogin').modal({
        //        backdrop: 'static'
        //    });
        //    $('#dialogLogin').on('hidden.bs.modal', function (e) {
        //        JJWrite.getToken();
        //        if (JJWrite.token && JJWrite.token != JJWrite.tokenTmp()) {
        //            //登录后刷新右侧习题列表
        //            //JJWrite.Doing.loadPartRightQuestions();
        //        }
        //    });
        //    return;
        //}20160921
        
        window.clearInterval(xm_timer);        

        $('#jjWriteSubmit').attr('disabled',true);
        var pdata = {
            'content': strAnswer,
            'is_share':0,
            'question_id': questionId,
            "type":xm_type,
            "planDayId":xm_planDayId,
            "exerciseId":xm_exerciseId,
            "startTime":xm_startTime,
            "endTime":xm_endTime,
            "spend_time":xm_spendTime
        };

        var param = {
            //url: URL.baseURL5 + "articles",
            url: URL.xiaomaURL + "speakingswritings/results/"+xm_type,
            type: "POST",
            contentType: "application/json",
            headers: {
                Authorization: exerciseApi.xiaomaToken
            },
            data: JSON.stringify(pdata)
        };
        var promise = JJWrite.sendAjax(param);
        promise.then(function (json) {
            exerciseApi.updateListItem();
            json= $.parseJSON(json);
            xm_spendTime=0;
            if (json && json.error == 'no data for this question id') {
                alert("没有对应题ID!");
                return;
            } else {
                var params = {};
                //params.come = $('#jjResultContent').attr('come');
                params.questionId = questionId;
                params.type = 1; //只要不是0
                //设置当前题目为已做
                $.each(JJWrite.currentQuestions,function(i,item){
                    if(item.question_id.toString()==questionId){
                        item.has_answer=true;
                    }
                });
                JJWrite.Doing.showAnswerPage(params);
            }
        });
    };

    /**
     * 作文单词长度计算和限制最长字符长度
     */
    JJWrite.Doing.checkLengthNew = function (e) {
        var content = $(e.target).val();
        if(content){
            var newcontent=content.replace(/[\n\,\.\?\:\!\(\)\;\u4e00-\u9fa5]/g, " ");
            var contentArray=newcontent.split(" ");
            var newContentArray=[];
            for(var i in contentArray){
                if(contentArray[i]!=""){
                    newContentArray.push(contentArray[i]);
                }
            }
            $("#wordContent").html(newContentArray.length);
            $(e.target).val(content.replace(/[\u4e00-\u9fa5]/g, "")); //过滤中文
            if(newContentArray.length>700){
                //$(this).val(JJWrite.Doing.preWord);
            	$("#jj-tipCount").show();
            	return;
            }else if(newContentArray.length>680){
                JJWrite.Doing.preWord=$(this).val();
            }
        }
    };

    /**
     * 验证作文单词输入长度
     * @param e
     */
    JJWrite.Doing.validWordsCount = function (content,length,type){
        if(content){
            var newcontent=content.replace(/[\n\,\.\?\:\!\(\)\;\u4e00-\u9fa5]/g, " ");
            var contentArray=newcontent.split(" ");
            var newContentArray=[];
            for(var i in contentArray){
                if(contentArray[i]!=""){
                    newContentArray.push(contentArray[i]);
                }
            }
            if(type=="less" && newContentArray.length<=length){
                return true;
            }else if(type=="than" && newContentArray.length>=length){
                return true;
            }
        }
        return false;
    }

    /*重做*/
    JJWrite.Doing.doAgain = function () {
        var $jjContent = $('#jjResultContent');
        var params = {};
        params.questionId = $jjContent.attr("qid");
        params.type = 3;
        params.come = $jjContent.attr('come');
        JJWrite.Doing.showAnswerPage(params);
    };

    /*展开或收起结果*/
    JJWrite.Doing.expandOrCollapse = function () {
        var $this = $(this), expandId = $this.attr('expand_id');

        $this.hide().siblings().show();
        if ($this.text() == '展开') {
            $('span[expand_id="' + expandId + '"]').css({"display": "inline"});
        } else {
            $('span[expand_id="' + expandId + '"]').css({"display": "block"});
        }
    };

    /*导航条（机经预测或历年真题）*/
    JJWrite.Doing.navigatorTolist = function () {
        $('#leftDiv').hide();
        var come = $(this).attr('come');
        //机经预测
        if(come=='wjj'){
            $('#side661').click();
        }else{
            $('#side662').click();
        }
        $('#side').show();

    };

    /*视频播放*/
    JJWrite.Doing.playDemoVideo = function(source) {
        $('#playDemoVideo').modal({
            backdrop: 'static'
        });

        var content = '<script src="http://p.bokecc.com/player?vid=' + source
            + '&siteid=B86E9AC935D39444&autoStart=true&width=720&height=420&playerid=3B89CC3CB774B9A8&playertype=1" type="text/javascript"></script>';
        $("#divVideo").html(content)
    };


    //显示正在开发页面
    var toDoRender = function () {
        var param = {
            "tmplName": 'app/tmpl_todo',
            "tmplData": '',
            "afterRender": ''
        };

        var renderTemplate = function (param) {
            Render.render({
                wrap: param.wrap || JJWrite.$wrap,
                isAppend: false || param.isAppend,
                tmpl: {
                    tmplName: param.tmplName,
                    tmplData: param.tmplData
                },
                afterRender: param.afterRender
            })
        };
        renderTemplate(param);
    };
    function zeroFn(n){
        n=n<10?"0"+n:n;
        return n;
    };
    function getTime(){ 
    	return new Date($.ajax({url: window.xiaoma.basePath+"/gettime",async: false}).getResponseHeader("Date"));
    }
    function showHiddenAnalysisJJWrite(){
    	var $s_h = $(".jjWriteansTextSpre");
		var $analy = $(".jjWriteansText");
		if($analy.length>0){
			$.each($analy,function(index,value){
				var $analyText = $analy.eq(index).text().replace(/[\n|\r\n]/gi,"<br/>");//原数据
				var $hiddenText=$analy.eq(index).text().replace(/[\n|<br/>]/gi,"");//去掉换行后的数据
				$(value).html($analyText);
				if(value.innerHTML.length > 630){
					$(value).html($hiddenText.substring(0,630) + "...");
					$s_h.eq(index).css({"display":"","padding-left":"5px","cursor":"pointer"});							
						$s_h.eq(index).click(function(){
							if($(this).text() == "展开"){
								$(value).html($analyText);
								$(this).text("收起");
							}else{
								$(value).html($hiddenText.substring(0,630) + "..."); 
								$(this).text("展开")
							}
						})	
				}else{
					$s_h.eq(index).css({"display":"none"});
				}
				
			})
		}
    }

    var showJJWrite=function(questionId,planDayId,exerciseId,type,xmTitle){
        xm_questionId=questionId;
        xm_planDayId=planDayId;
        xm_exerciseId=exerciseId;
        xm_type=type;
        xm_title=xmTitle;
        var params = {};
        params.questionId = xm_questionId;
        params.type =0;//0显示答题页 1 显示结果页面
        JJWrite.Doing.showAnswerPage(params)
    }
    var gotoHisResult=function(questionId,planDayId,exerciseId,type,xmTitle){
        xm_questionId=questionId;
        xm_planDayId=planDayId;
        xm_exerciseId=exerciseId;
        xm_type=type;
        xm_title=xmTitle;
        var params = {};
        params.questionId = xm_questionId;
        params.type =2;//0显示答题页  1 提交答案显示结果页 2 直接显示结果页面  3再练一次
        JJWrite.Doing.showAnswerPage(params)
    }
    return {
        init: JJWrite.init,
        showJJWrite:showJJWrite,
        gotoHisResult:gotoHisResult
    };
});