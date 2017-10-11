(function() {
    $.extend(xm, {
        initPage: function() {
            //解析URL
            xm.analysisUrl();
            //听力音频对象
            xm.playObject();
            xm.readIndex = 0;
            xm.listenAIndex = 0;
            xm.listenMainIndex = 0;
            xm.listenPart1 = 0;
            xm.listenPart2 = 0;
            //初始化
            $('.loadBox').hide();
            //防止重复提交表单变量
            xm.flag = false;
            //多选全局变量
            xm.str = "";
            // 声明阅读篇章总数
            xm.passageCount = 0;
            //写作全局变量
            xm.timer5 = null;
            xm.CursorHandle('#overall', '#js-writing-editor');
            xm.CursorHandle('#alone', '#autocephaly-writing-editor');
        },
        analysisUrl: function(){
            url = window.location.href;
            xm.seqNum=Utils.getUrlParam(url, "seqNum");
            xm.tpoId = Utils.getUrlParam(url, "tpoId");
            xm.dayId=Utils.getUrlParam(url, "dayid")==null?0:Utils.getUrlParam(url, "dayid");
            xm.exerciseId = Utils.getUrlParam(url, "exerciseid")==null?0:Utils.getUrlParam(url, "exerciseid");
            if(xm.tpoId){
                $("title").text("TPO" + xm.seqNum + "整套在线模拟--精英计划中心");
                $(".tpoTit").text(xm.seqNum);
                //初始化数据
                xm.initForm();
            }
        },
        initForm: function() {
            // 获取阅读数据
            $.ajax({
                type: "GET",
                url: xm.baseURL + "/mkReading/tpos/" + xm.tpoId + "/readings.action",
                dataType : "json",
                success: function(passages) {
                    $.ajax({
                        type: "GET",
                        url: xm.baseURL + "/mkReading/tpos/" + xm.tpoId + "/reading/questions.action",
                        dataType : "json",
                        success: function(questions) {
                            var dataStr = '';
                            // 计算阅读篇章总数
                            for(var i = 0; i < passages.readings.length; i++){
                                xm.passageCount += i;
                            }
                            // 将问题序号组建数组
                            var passageArr = new Array();
                            for(var k=0;k<passages.readings.length;k++){
                                passageArr[k]=new Array();
                                for(var j=0;j<questions.readingQuestions.length;j++){
                                    if (passages.readings[k].passageNum == questions.readingQuestions[j].passageNum) {
                                        passageArr[k][j]=j+1;
                                    } else if (passages.readings[k].passageNum < questions.readingQuestions[j].passageNum) {
                                        break;
                                    }
                                }
                            }
                            for (var i = 0; i < passages.readings.length; i++) {
                                var questionNum = 0;
                                var contentStr = "";
                                var count = 0;
                                // 每篇阅读文章问题总数count
                                for (var k = 0; k < questions.readingQuestions.length; k++) {
                                    if (passages.readings[i].passageNum == questions.readingQuestions[k].passageNum) {
                                        count++;
                                    } else if (passages.readings[i].passageNum < questions.readingQuestions[k].passageNum) {
                                        break;
                                    }
                                }
                                // 阅读问题总数
                                var questionCount = passageArr[2].length;
                                // 输出文章内容
                                for (var j in passages.readings[i].paragraphs) {
                                    contentStr += '<p _Paragraph="' + j + '">' + passages.readings[i].paragraphs[j] + '</p>';
                                }
                                // 输出查看文章页
                                dataStr += '<div class="main auto box Reading view-bj" _index="' + i + '">' +
                                    '<div class="main-bg">' +
                                    '<p class="top-chapter-num f-dn">Passage ' + (i + 1) + ' of ' + xm.passageCount + '</p>' +
                                    '</div>' +
                                    '<div class="main-content auto">' +
                                    '<div class="view-l-box fl" style="visibility: hidden;">' +
                                    '</div>' +
                                    '<div class="view-r-box fl">' +
                                    '<h2 class="f24 c3 Q-title tc">' + passages.readings[i].title + '</h2>'+
                                    '<div class="lh26 c3 f16 QuestionText rbox">';
                                    if(passages.readings[i].passageImg!=""){
                                    	dataStr += '<img src="'+passages.readings[i].passageImg+'"></img>';
                                    }
                                    dataStr += contentStr + '</div>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>';
                                // 循环输出所有问题
                                for (var k = 0; k < questions.readingQuestions.length; k++) {
                                    var value = questions.readingQuestions[k];
                                    var questionNum = passageArr[i][k];
                                    var replaceContent;
                                    var replaceNum;
                                    // 问题对应关键句/词
                                    for (var l = 0; l < value.replacePart.length; l++) {                                    	
                                        if(l >= 1){
                                            // 多段落标识
                                            for (var m in passages.readings[i].paragraphs) {
                                                // 如果replaceContent == null，整个段落为关键句
                                                if (value.replacePart[l].replaceContent == null && value.replacePart[l].replaceNum == m) {
                                                    replaceNum += "|&|" + value.replacePart[l].replaceNum;
                                                    replaceContent += "|&|" + "{{"+passages.readings[i].paragraphs[m]+"}}";
                                                    break;
                                                }else if(value.answerType ==3){
                                                	 replaceNum += "|&|" + value.replacePart[l].replaceNum;
                                                     replaceContent += "|&|" + value.replacePart[l].replaceContent;
                                                     break;	
                                                }
                                            }
                                        } else{
                                            for (var m in passages.readings[i].paragraphs) {
                                                replaceNum = value.replacePart[l].replaceNum;
                                                // 如果replaceContent == null，整个段落为关键句
                                                if (value.replacePart[l].replaceContent == null && value.replacePart[l].replaceNum == m) {
                                                    replaceContent = "{{"+passages.readings[i].paragraphs[m]+"}}";
                                                    break;
                                                }else{
                                                    replaceContent = value.replacePart[l].replaceContent;
                                                }
                                            }
                                        }
                                    }
                                    if (value.passageNum == passages.readings[i].passageNum) {
                                        if (value.answerType == 1) {
                                            dataStr += '<div id="' + value.id + '" class="main auto radio-topic box view-bj switch-box" type="' + value.answerType + '" replaceContent="' + replaceContent + '" replaceNum="' + replaceNum + '" _topic="' + i + '" radioAnswer="" choice_answer="' + value.answer + '">' +
                                                '<div class="main-bg">' +
                                                '<p class="top-question-num">Question ' + questionNum + ' of ' + questionCount + '</p>' +
                                                '</div>' +
                                                '<div class="main-content auto">' +
                                                '<div class="view-l-box fl">' +
                                                '<h2 class="Question-title">' +
                                                '</h2>' +
                                                '<p class="Question ln26 f16 c3">' + xm.replaceCurly(value.question) + '</p>' +
                                                '<ul class="optionsList">' +
                                                '<li class="f16 c3">' +
                                                '<span class="u-icon u-icon-radio" options="A"></span>' + value.optionA +
                                                '</li>' +
                                                '<li class="f16 c3">' +
                                                '<span class="u-icon u-icon-radio" options="B"></span>' + value.optionB +
                                                '</li>' +
                                                '<li class="f16 c3">' +
                                                '<span class="u-icon u-icon-radio" options="C"></span>' + value.optionC +
                                                '</li>' +
                                                '<li class="f16 c3">' +
                                                '<span class="u-icon u-icon-radio" options="D"></span>' + value.optionD +
                                                '</li>' +
                                                '</ul>' +
                                                '</div>' +
                                                '<div class="view-r-box fl">' +
                                                '<h2 class="fixedTitle">' + passages.readings[i].title + '</h2>'+
	                                            '<div class="lh26 c3 f16 QuestionText rbox">';
	                                            if(passages.readings[i].passageImg!=""){
	                                            	dataStr += '<img src="'+passages.readings[i].passageImg+'"></img>';
	                                            }
                                                dataStr += contentStr + '</div>' +
                                                '</div>' +
                                                '</div>' +
                                                '</div>';
                                        }
                                        if (value.answerType == 2) {
                                            dataStr += '<div id="' + value.id + '" class="main auto radio-topic box view-bj switch-box" type="' + value.answerType + '" replaceContent="' + replaceContent + '" replaceNum="' + replaceNum + '" _topic="' + i + '" radioAnswer="" choice_answer="' + value.answer + '">' +
                                                '<div class="main-bg">' +
                                                '<p class="top-question-num">Question ' + questionNum + ' of ' + questionCount + '</p>' +
                                                '</div>' +
                                                '<div class="main-content auto">' +
                                                '<div class="view-l-box fl">' +
                                                '<h2 class="Question-title">' +
                                                '</h2>' +
                                                '<p class="Question ln26 f16 c3">' + xm.replaceCurly(value.question) + '</p>' +
                                                '<ul class="optionsList">' +
                                                '<li class="f16 c3">' +
                                                '<span class="u-icon u-icon-radio" options="A"></span>' + value.optionA +
                                                '</li>' +
                                                '<li class="f16 c3">' +
                                                '<span class="u-icon u-icon-radio" options="B"></span>' + value.optionB +
                                                '</li>' +
                                                '<li class="f16 c3">' +
                                                '<span class="u-icon u-icon-radio" options="C"></span>' + value.optionC +
                                                '</li>' +
                                                '<li class="f16 c3">' +
                                                '<span class="u-icon u-icon-radio" options="D"></span>' + value.optionD +
                                                '</li>' +
                                                '</ul>' +
                                                '</div>' +
                                                '<div class="view-r-box fl">' +
                                                '<h2 class="fixedTitle">' + passages.readings[i].title + '</h2>'+
	                                            '<div class="lh26 c3 f16 QuestionText rbox">';
	                                            if(passages.readings[i].passageImg!=""){
	                                            	dataStr += '<img src="'+passages.readings[i].passageImg+'"></img>';
	                                            }
                                                dataStr += contentStr + '</div>' +
                                                '</div>' +
                                                '</div>' +
                                                '</div>';
                                        }
                                        if (value.answerType == 3) {
                                            dataStr += '<div id="' + value.id + '" class="main auto insert-topic box view-bj switch-box" replaceContent="' + replaceContent + '" replaceNum="' + replaceNum + '" _topic="' + i + '" radioAnswer="" choice_answer="' + value.answer + '">' +
                                                '<div class="main-bg">' +
                                                '<p class="top-question-num">Question ' + questionNum + ' of ' + questionCount + '</p>' +
                                                '</div>' +
                                                '<div class="main-content auto">' +
                                                '<div class="view-l-box fl">' +
                                                '<h2 class="Question-title">' +
                                                '</h2>' +
                                                '<p class="Question ln26 f16 c3">' + value.question.replace(/[\u2588]/, '<span class="insert"></span>') + '</p>' +
                                                '<p class="insertText ln26 f16 c3 fb">' + value.insertSentence + '</p>' +
                                                '</div>' +
                                                '<div class="view-r-box fl">' +
                                                '<h2 class="f24 c3 Q-title tc fixedTitle">' + passages.readings[i].title + '</h2>'+
	                                           '<div class="lh26 c3 f16 QuestionText rbox">';
	                                            if(passages.readings[i].passageImg!=""){
	                                            	dataStr += '<img src="'+passages.readings[i].passageImg+'"></img>';
	                                            }
                                                dataStr += contentStr + '</div>' +
                                                '</div>' +
                                                '</div>' +
                                                '</div>';
                                        }
                                        if (value.answerType == 4) {
                                            dataStr += '<div id="' + value.id + '" class="main auto Dragdrop-topic box view-bj switch-box" _topic="' + i + '" radioAnswer="" choice_answer="' + value.answer + '">' +
                                                '<div class="main-bg">' +
                                                '<p class="top-question-num">Question ' + questionNum + ' of ' + questionCount + '</p>' +
                                                '</div>' +
                                                '<div class="main-content auto">' +
                                                '<h2 class="Question-title">' +
                                                '</h2>' +
                                                '<p class="Question lh26 c3 f16 drapText">' + value.question + '</p>' +
                                                '<div class="textarea-box auto">' +
                                                '<textarea class="sort-target target mb12" _options="" readonly="readonly"></textarea>' +
                                                '<textarea class="sort-target target mb12" _options="" readonly="readonly"></textarea>' +
                                                '<textarea class="sort-target target" _options="" readonly="readonly"></textarea>' +
                                                '</div>' +
                                                '<h2 class="read-title f24 tc c3">Answer Choices</h2>' +
                                                '<div class="drapWrap">' +
                                                '<ul class="drapList">' +
                                                '<li style="position:relative;">' +
                                                '<div class="new_tf_back drag" id="A" index="0" text="' + value.optionA + '">' +
                                                '<div class="sn-box fl">A</div>' +
                                                '<div class="nt-box fl">' + value.optionA + '</div>' +
                                                '</div>' +
                                                '</li>' +
                                                '<li style="position:relative;">' +
                                                '<div class="new_tf_back drag" id="B" index="1" text="' + value.optionB + '">' +
                                                '<div class="sn-box fl">B</div>' +
                                                '<div class="nt-box fl">' + value.optionB + '</div>' +
                                                '</div>' +
                                                '</li>' +
                                                '<li style="position:relative;">' +
                                                '<div class="new_tf_back drag" id="C" index="2" text="' + value.optionC + '">' +
                                                '<div class="sn-box fl">C</div>' +
                                                '<div class="nt-box fl">' + value.optionC + '</div>' +
                                                '</div>' +
                                                '</li>' +
                                                '<li style="position:relative;">' +
                                                '<div class="new_tf_back drag" id="D" index="3" text="' + value.optionD + '">' +
                                                '<div class="sn-box fl">D</div>' +
                                                '<div class="nt-box fl">' + value.optionD + '</div>' +
                                                '</div>' +
                                                '</li>' +
                                                '<li style="position:relative;">' +
                                                '<div class="new_tf_back drag" id="E" index="4" text="' + value.optionE + '">' +
                                                '<div class="sn-box fl">E</div>' +
                                                '<div class="nt-box fl">' + value.optionE + '</div>' +
                                                '</div>' +
                                                '</li>' +
                                                '<li style="position:relative;">' +
                                                '<div class="new_tf_back drag" id="F" index="5" text="' + value.optionF + '">' +
                                                '<div class="sn-box fl">F</div>' +
                                                '<div class="nt-box fl">' + value.optionF + '</div>' +
                                                '</div>' +
                                                '</li>' +
                                                '</div>' +
                                                '</div>' +
                                                '</div>';
                                        }
                                        if (value.answerType == 5) {
                                            dataStr += '<div id="' + value.id + '" class="main auto Click-topic box view-bj switch-box" type="' + value.answerType + '" replaceContent="' + replaceContent + '" replaceNum="' + replaceNum + '" _topic="' + i + '" radioAnswer="" choice_answer="' + value.answer + '">' +
                                                '<div class="main-bg">' +
                                                '<p class="top-question-num">Question ' + questionNum + ' of ' + questionCount + '</p>' +
                                                '</div>' +
                                                '<div class="main-content auto">' +
                                                '<div class="view-l-box fl">' +
                                                '<h2 class="Question-title">' +
                                                '</h2>' +
                                                '<p class="Question ln26 f16 c3">' + xm.replaceCurly(value.question) + '</p>' +
                                                '<div class="tab-drag">' +
                                                    '<ul class="tab-hd f-cb">' +
                                                        '<li class="on">' +
                                                            '<p>Aggressive Stingless Bess</p>' +
                                                            '<a class="target"></a>' +
                                                            '<a class="target"></a>' +
                                                            '<a class="target"></a>' +
                                                        '</li>' +
                                                        '<li>' +
                                                            '<p>Nonaggressive Stingless Bess</p>' +
                                                            '<a class="target"></a>' +
                                                            '<a class="target"></a>' +
                                                        '</li>' +
                                                    '</ul>' +
                                                    '<div class="tab-bd">' +
                                                        '<ul class="tab-box">' +
                                                            '<li class="drag" id="A" index="0" text="' + value.optionA + '"><span class="sn-box">A</span>' + value.optionA + '</li>' +
                                                            '<li class="drag" id="B" index="1" text="' + value.optionB + '"><span class="sn-box">B</span>' + value.optionB + '</li>' +
                                                            '<li class="drag" id="C" index="2" text="' + value.optionC + '"><span class="sn-box">C</span>' + value.optionC + '</li>' +
                                                            '<li class="drag" id="D" index="3" text="' + value.optionD + '"><span class="sn-box">D</span>' + value.optionD + '</li>' +
                                                            '<li class="drag" id="E" index="4" text="' + value.optionE + '"><span class="sn-box">E</span>' + value.optionE + '</li>' +
                                                            '<li class="drag" id="F" index="5" text="' + value.optionF + '"><span class="sn-box">F</span>' + value.optionF + '</li>' +
                                                            '<li class="drag" id="G" index="6" text="' + value.optionG + '"><span class="sn-box">G</span>' + value.optionG + '</li>' +
                                                        '</ul>' +
                                                    '</div>' +
                                                '</div>' +
                                                '</div>' +
                                                '<div class="view-r-box fl">' +
                                                '<h2 class="fixedTitle">' + passages.readings[i].title + '</h2>'+
	                                            '<div class="lh26 c3 f16 QuestionText rbox">';
	                                            if(passages.readings[i].passageImg!=""){
	                                            	dataStr += '<img src="'+passages.readings[i].passageImg+'"></img>';
	                                            }
                                                dataStr += contentStr + '</div>' +
                                                '</div>' +
                                                '</div>' +
                                                '</div>';
                                        }
                                    }
                                }
                            }
                            $('.wrap').append(dataStr);
                            xm.readingRadioCheck();
                            xm.readingInsertHandle();
                            xm.Dragdrop($('.Dragdrop-topic:eq(0)'));
                            xm.Dragdrop($('.Dragdrop-topic:eq(1)'));
                            xm.Dragdrop($('.Dragdrop-topic:eq(2)'));
                            xm.readClickChoose();
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {   
                            console.log(XMLHttpRequest.status);  
                            console.log(XMLHttpRequest.readyState);  
                            console.log(textStatus);
                            console.log(123);
                        }
                    });
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {   
                    console.log(XMLHttpRequest.status);  
                    console.log(XMLHttpRequest.readyState);  
                    console.log(textStatus);
                    console.log(321);
                }
            });
            // 获取听力数据
            $.ajax({
                type: "GET",
                url: xm.baseURL+"/mkListening/tpos/"+xm.tpoId+"/listenings.action",
                dataType : "json",
                success: function(content){
                    $.ajax({
                        type: "GET",
                        url: xm.baseURL+"/mkListening/tpos/"+xm.tpoId+"/listening/questions.action",
                        dataType : "json",
                        success: function(questions){
                            var contentStr = '';
                            for( var i=0,len=content.listenings.length; i<len; i++){
                                var imgUrl = '';
                                var audioUrl = '';
                                var data = content.listenings[i]; // 第几道听力题
                                var count = 0;
                                // 每道听力题问题总数count
                                for (var k = 0; k < questions.listeningQuestions.length; k++) {
                                    if (data.id == questions.listeningQuestions[k].mkListeningId) {
                                        count++;
                                    }else if(data.id < questions.listeningQuestions[k].mkListeningId){
                                        break;
                                    }
                                }
                                contentStr += '<div class="player-main abox switch-box ' +  (((data.subjectType==1 && data.subjectCode==1)||(data.subjectType==2&&(data.subjectCode==1||data.subjectCode==2)))? "listenPart1" : "listenPart2") + '" audioUrl="'+data.audio+'" topicName="'+(((data.subjectType==1)?'conversation ':'lecture ')+data.subjectCode)+'">'+'<div class="audio-wrap tc">';
                                for (var g = 0; g < data.imgs.length; g++) {
                                    contentStr += '<img src="'+data.imgs[g].url+'" data_id="'+data.imgs[g].time+'" alt="" style="display:none;" />';
                                }
                                contentStr+='<div class="progress-wrap ">'+
                                                '<div class="m-progress">'+
                                                    '<div class="prog-box">'+
                                                        '<div class="prog-range"><i class="prog-icon"></i></div>'+
                                                    '</div>'+
                                                '</div>'+
                                            '</div>'+
                                            '<p class="f20"><span class="currentTime">00:00</span>/<span class="duration">00:00</span></p>'+
                                        '</div>'+
                                    '</div>';
                                var number = 0;
                                for (var j = 0; j < questions.listeningQuestions.length; j++) {
                                    var question = questions.listeningQuestions[j];
                                    if(data.id == question.mkListeningId){
                                        number++;
                                       if(question.questionType==3){
                                    	   contentStr+='<div type="'+question.questionType+'" belongTopicName="' + (((data.subjectType==1)?'conversation ':'lecture ')+data.subjectCode) + '" idenNum="' + (((data.subjectType==1 && data.subjectCode==1)||(data.subjectType==2&&(data.subjectCode==1||data.subjectCode==2)))?1:2) + '"' +'" id="'+question.id+'" class="audio-main autoPlaybox abox switch-box ' +  (((data.subjectType==1 && data.subjectCode==1)||(data.subjectType==2&&(data.subjectCode==1||data.subjectCode==2)))? "listenPart1" : "listenPart2") + '" audioUrl="'+question.audio+'"  choice_answer="'+question.answer+'" radioAnswer="">'+
                                           '<div class="main-bg listen-main-bg">' +
                                           '<p class="top-question-num"></p>' +                                            
                                           '</div>' +
                                           '<div class="audioMain-content auto">'+
                                               '<div class="audioView-l-box auto">'+
                                                   '<p class="f20 c3 topicText">'+question.question+'</p>'+
                                                   '<p class="answers-tips-yesno f20">Click in the correct box for each phrase</p>'+
                                                   '<div class="answers js-answers optionsList f-dn">'+
                                                   '<div class="p-th g-clearfix">'+
                                                   '<ul class="list">'+
                                                   '<li class="g-f16"><span class="split floatright">|</span><span class="g-g6" >Homogeneous</span></li>'+
                                                   '<li class="g-f16"><span class="g-g6">Heterogeneous</span></li>'+                                                    
                                                   '</ul>'+
                                                   '</div>'+
                                                   '<div class="p-tr g-clearfix">'+
                                                   '<ul class="list g-kmf-form answers-checkbox  radio">'+
                                                   '<li class="normal "><span class="g-formbg g-checkbox" _options="A"></span></li>'+
                                                   '<li class="normal "><span class="g-formbg g-checkbox" _options="A"></span></li>'+
                                                   '</ul>'+
                                                   '<span class="sub-question f20">'+question.optionA+'</span>'+
                                                   '</div>'+
                                                   '<div class="p-tr g-clearfix">'+
                                                   '<ul class="list g-kmf-form answers-checkbox  radio">'+
                                                   '<li class="normal "><span class="g-formbg g-checkbox" _options="B"></span></li>'+
                                                   '<li class="normal "><span class="g-formbg g-checkbox" _options="B"></span></li>'+
                                                   '</ul>'+
                                                   '<span class="sub-question f20">'+question.optionB+'</span>'+
                                                   '</div>'+
                                                   '<div class="p-tr g-clearfix">'+
                                                   '<ul class="list g-kmf-form answers-checkbox  radio">'+
                                                   '<li class="normal "><span class="g-formbg g-checkbox" _options="C"></span></li>'+
                                                   '<li class="normal "><span class="g-formbg g-checkbox" _options="C"></span></li>'+
                                                   '</ul>'+
                                                   '<span class="sub-question f20">'+question.optionC+'</span>'+
                                                   '</div>'+
                                                   '<div class="p-tr g-clearfix">'+
                                                   '<ul class="list g-kmf-form answers-checkbox  radio">'+
                                                   '<li class="normal "><span class="g-formbg g-checkbox" _options="D"></span></li>'+
                                                   '<li class="normal "><span class="g-formbg g-checkbox" _options="D"></span></li>'+
                                                   '</ul>'+
                                                   '<span class="sub-question f20">'+question.optionD+'</span>'+
                                                   '</div>'+   
                                                  '</div>'+
                                                       
                                                   /*'<ul class="optionsList f-dn">'+
                                                       '<li class="f20 c3">'+'<span _options="A" class="radioIcon cp"></span>'+question.optionA+'</li>'+
                                                       '<li class="f20 c3">'+'<span _options="B" class="radioIcon cp"></span>'+question.optionB+'</li>'+
                                                       '<li class="f20 c3">'+'<span _options="C" class="radioIcon cp"></span>'+question.optionC+'</li>'+
                                                       '<li class="f20 c3">'+'<span _options="D" class="radioIcon cp"></span>'+question.optionD+'</li>'+
                                                   '</ul>'+*/
                                               '</div>'+
                                               '<div class="audioView-r-box fr" style="display:none;">'+
                                                   '<div class="audio-img-box">'+
                                                       '<img src="'+data.imgs[0].url+'" class="audioImg" alt="" />'+
                                                   '</div>'+
                                                   '<div class="audio-btn-box">'+
                                                       '<div class="audioIcon-wrap">'+
                                                           '<a href="javascript:;" class="pauseIcon fl"></a>'+
                                                           '<a href="javascript:;" class="playIcon fl"></a>'+
                                                           '<a href="javascript:;" class="HhIcon fl"></a>'+
                                                       '</div>'+
                                                   '</div>'+
                                               '</div>'+
                                           '</div>'+
                                       '</div>';
                                       }else{
                                    	   contentStr+='<div type="'+question.questionType+'" belongTopicName="' + (((data.subjectType==1)?'conversation ':'lecture ')+data.subjectCode) + '" idenNum="' + (((data.subjectType==1 && data.subjectCode==1)||(data.subjectType==2&&(data.subjectCode==1||data.subjectCode==2)))?1:2) + '"' +'" id="'+question.id+'" class="audio-main autoPlaybox abox switch-box ' +  (((data.subjectType==1 && data.subjectCode==1)||(data.subjectType==2&&(data.subjectCode==1||data.subjectCode==2)))? "listenPart1" : "listenPart2") + '" audioUrl="'+question.audio+'"  choice_answer="'+question.answer+'" radioAnswer="">'+
                                           '<div class="main-bg listen-main-bg">' +
                                           '<p class="top-question-num"></p>' +
                                           '</div>' +
                                           '<div class="audioMain-content auto">'+
                                               '<div class="audioView-l-box auto">'+
                                                   '<p class="f20 c3 topicText">'+question.question+'</p>'+
                                                   '<ul class="optionsList f-dn">'+
                                                       '<li class="f20 c3">'+'<span _options="A" class="radioIcon cp"></span>'+question.optionA+'</li>'+
                                                       '<li class="f20 c3">'+'<span _options="B" class="radioIcon cp"></span>'+question.optionB+'</li>'+
                                                       '<li class="f20 c3">'+'<span _options="C" class="radioIcon cp"></span>'+question.optionC+'</li>'+
                                                       '<li class="f20 c3">'+'<span _options="D" class="radioIcon cp"></span>'+question.optionD+'</li>'+
                                                   '</ul>'+
                                               '</div>'+
                                               '<div class="audioView-r-box fr" style="display:none;">'+
                                                   '<div class="audio-img-box">'+
                                                       '<img src="'+data.imgs[0].url+'" class="audioImg" alt="" />'+
                                                   '</div>'+
                                                   '<div class="audio-btn-box">'+
                                                       '<div class="audioIcon-wrap">'+
                                                           '<a href="javascript:;" class="pauseIcon fl"></a>'+
                                                           '<a href="javascript:;" class="playIcon fl"></a>'+
                                                           '<a href="javascript:;" class="HhIcon fl"></a>'+
                                                       '</div>'+
                                                   '</div>'+
                                               '</div>'+
                                           '</div>'+
                                       '</div>';
                                       }
                                      
                                    }else if(data.id < question.mkListeningId){
                                        break;
                                    }
                                }
                            };
                            $(".listening_wrap").append(contentStr);
                            xm.asplay();
                            //音频快进
                            //document.getElementById('jp_audio_0').defaultPlaybackRate =2000;
                            xm.audioSwitchPage();
                            //听力题音频播放
                            $('.abox').each(function(){
                                var _that = $(this);
                                _that.find('.playIcon').on('click',function(){
                                    xm.asplay(_that.attr('audioUrl'));
                                });
                                $(this).find('.pauseIcon').bind('click',function(){
                                    xm.aspause();
                                });
                                $(this).find('.HhIcon').bind('click',function(){
                                    xm.asReplay();
                                });
                            });
                            xm.audioRadioHandle();
                            xm.replaceHeadset();
                            xm.volumeHandle('.listening_indexWrap','#jp-jplayer');
                            xm.volumeHandle('.listening_introduce','#jp-jplayer');
                            xm.volumeHandle('.listening_wrap','#jp-jplayer');
                            //绑定事件
                            xm.bindEvent();
                        }
                    })
                }
            });
            //获取口语
            $.ajax({
                type: "GET",
                url: xm.baseURL + "/mkSpeakingQuestion/tpos/" + xm.tpoId + "/speaking/questions.action",
                dataType : "json",
                success: function(speakingData) { 
                    var dataStr = '';
                    for (var i = 0, len = speakingData.speakingQuestions.length; i < len; i++) {
                        var data = speakingData.speakingQuestions[i];
                        var type = speakingData.speakingQuestions[i].seqNum;
                        dataStr += '<div class="speaking-wrap" topicid="' + data.id + '" type="' + type + '">' +
                            '<div class="m-top">'+
                                '<a class="logo f-fl" href="#"><img src="../images/logo.png" alt=""></a>'+
                                '<div class="top-cnt f-fl">'+
                                    '<h3 class="top-tit u-tit f-mbm">TPO <span class="tpoTit">' + xm.tpoId + '</span>&nbsp;&nbsp;Speaking</h3>'+
                                    '<a class="u-btn u-btn-fn2 u-btn-pause JS_speak_pause" href="javascript:;">暂停</a>'+
                                '</div>'+
                                '<div class="top-cte">' +
                                    '<p class="top-question-num">Question ' + type + ' of ' + speakingData.speakingQuestions.length + '</p>' +
                                '</div>' +
                                '<div class="top-cnt f-fr">'+
                                    '<div class="top-fn f-mbm f-fr">'+
                                        '<a class="u-btn u-btn-continue continueTopic" href="javascript:;">Continue</a>'+
                                        '<div class="m-volume f-fr">'+
                                            '<a class="u-btn u-btn-fn u-btn-volume f-ti Volume" href="javascript:;">volume</a>'+
                                            '<div class="volume-box DragDrap-v-box">'+
                                                '<div class="volume-progress">'+
                                                    '<div class="volume-range range"></div>'+
                                                    '<div class="volume-icon drapIcon"></div>'+
                                                '</div>'+
                                            '</div>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="clear"></div>'+
                                    '<div class="top-time f-dn f-fr">'+
                                        '<span class="time-txt f-fr" date-timestamp="3600000">60:00</span>'+
                                        '<a class="u-btn u-btn-time f-fr JS_hidetime" href="javascript:;">HIDE TIME</a>'+
                                    '</div>'+
                                '</div>'+
                            '</div>';
                        if (type == 1 || type == 2) {
                            dataStr += '<div class="topic-audio" audiourl="' + data.preQuestionAudio + '">' +
                                '<div class="img-wrap">' +
                                '<img class="topic-img" width="400" src="' + data.preQuestionImg + '" alt="" />' +
                                '<p class="s-audio-text f18 c3">播放Question' + data.seqNum + '题型介绍中，您可以点击右上角的Continue跳过</p>' +
                                '</div>' +
                                '</div>' +
                                '<div class="translate-content" audiourl="' + data.questionAudio + '">' +
                                '<div class="audio-info auto">' +
                                '<div class="audio-infomsg-main auto">' +
                                '<p class="audio-test-infomsg f18 c3 tl">' + data.question + '</p>' +
                                '</div>' +
                                '</div>' +
                                '<div class="audio-getReady">' +
                                '<div class="headset-icon"></div>' +
                                '<div class="getReady-time f18 cf">Preparation Time: ' + data.prepareTime + ' Seconds</div>' +
                                '<div class="getReady-time f18 cf">Response Time: ' + data.answerTime + ' Seconds</div>' +
                                '</div>' +
                                '<div class="audio-response" audiourl="' + data.prepareAudio + '">' +
                                '<div class="audio-recording-t">Prepare your response</div>' +
                                '<div class="audio-recording-m">00:<span class="time">' + data.prepareTime + '</span></div>' +
                                '<div class="audio-recording-b">' +
                                '<div class="audio-recording-run"></div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="audio-recording" audiourl="' + data.recordingAudio + '">' +
                                '<div class="audio-recording-t">Recording</div>' +
                                '<div class="audio-recording-m">00:<span class="time">' + data.answerTime + '</span></div>' +
                                '<div class="audio-recording-b">' +
                                '<div class="audio-recording-run"></div>' +
                                '</div>' +
                                '</div>' +
                                '<p class="audio-recording-upload"></p>' +
                                '</div>' +
                                '</div>';
                        } else if (type == 3 || type == 4) {
                            dataStr +='<div class="topic-audio" audiourl="' + data.preQuestionAudio + '">' +
                                '<div class="img-wrap">' +
                                '<img class="topic-img" width="400" src="' + data.preQuestionImg + '" alt="" />' +
                                '<p class="s-audio-text f18 c3">播放Question' + data.seqNum + '题型介绍中，您可以点击右上角的Continue跳过</p>' +
                                '</div>' +
                                '</div>' +
                                '<div class="translate-content" audiourl="' + data.preReadingAudio + '">' +
                                '<div class="infomsg-ready-2">' +
                                '<div class="get-time-show">' +
                                '<div class="get-time-top">Reading time : 00:<span class="timeOut">45</span></div>' +
                                '<div class="get-time-messag">' +
                                '<p style="" class="get-time-msgShow">' + data.readingContent + '</p>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="infomsg-ready-4" audiourl="' + data.dialogAudio + '">' +
                                '<div class="ill-body-main">' +
                                '<img src="' + data.dialogImg + '">' +
                                '</div>' +
                                
                                '<div class="m-progress jp-progress">'+
                                    '<div class="prog-box jp-seek-bar">'+
                                        '<div class="prog-range jp-play-bar"><i class="prog-icon"></i></div>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="update-time f20 c6">' +
                                    '<span class="jp-current-time">00:00</span><span class="total-time">/<em class="jp-total-time">00:00</em></span>' +
                                '</div>' +
                                
                                '</div>' +
                                '<div class="a_info" audiourl="' + data.questionAudio + '">' +
                                '<div class="audio-info auto">' +
                                '<div class="audio-infomsg-main auto">' +
                                '<p class="audio-test-infomsg f18 c3 tl">' + data.question + '</p>' +
                                '</div>' +
                                '</div>' +
                                '<div class="audio-getReady">' +
                                '<div class="headset-icon"></div>' +
                                '<div class="getReady-time f18 cf">Preparation Time: ' + data.prepareTime + ' Seconds</div>' +
                                '<div class="getReady-time f18 cf">Response Time: ' + data.answerTime + ' Seconds</div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="audio-response" audiourl="' + data.prepareAudio + '">' +
                                '<div class="audio-recording-t">Prepare your response</div>' +
                                '<div class="audio-recording-m">00:<span class="time">' + data.prepareTime + '</span></div>' +
                                '<div class="audio-recording-b">' +
                                '<div class="audio-recording-run"></div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="audio-recording" audiourl="' + data.recordingAudio + '">' +
                                '<div class="audio-recording-t">Recording</div>' +
                                '<div class="audio-recording-m">00:<span class="time">' + data.answerTime + '</span></div>' +
                                '<div class="audio-recording-b">' +
                                '<div class="audio-recording-run"></div>' +
                                '</div>' +
                                '</div>' +
                                '<p class="audio-recording-upload"></p>' +
                                '</div>' +
                                '</div>';
                        } else if (type == 5 || type == 6) {
                            dataStr += '<div class="topic-audio" audiourl="' + data.preQuestionAudio + '">' +
                                '<div class="img-wrap">' +
                                '<img class="topic-img" width="400" src="' + data.preQuestionImg + '" alt="" />' +
                                '<p class="s-audio-text f18 c3">播放Question' + data.seqNum + '题型介绍中，您可以点击右上角的Continue跳过</p>' +
                                '</div>' +
                                '</div>' +
                                '<div class="translate-content" audiourl="' + data.questionAudio + '">' +
                                '<div class="topic-audio" audiourl="' + data.preQuestionAudio + '">' +
                                '<div class="img-wrap">' +
                                '<img class="topic-img" width="400" src="' + data.preQuestionImg + '" alt="" />' +
                                '</div>' +
                                '</div>' +
                                '<div class="infomsg-ready-4" audiourl="' + data.dialogAudio + '">' +
                                '<div class="ill-body-main">' +
                                '<img src="' + data.dialogImg + '">' +
                                '</div>' +
                                
                                '<div class="m-progress jp-progress">'+
                                    '<div class="prog-box jp-seek-bar">'+
                                        '<div class="prog-range jp-play-bar"><i class="prog-icon"></i></div>'+
                                    '</div>'+
                                '</div>'+
                                '<div class="update-time f20 c6">' +
                                    '<span class="jp-current-time">00:00</span><span class="total-time">/<em class="jp-total-time">00:00</em></span>' +
                                '</div>' +
                                
                                '</div>' +
                                '<div class="a_info" audiourl="' + data.questionAudio + '">' +
                                '<div class="audio-info auto">' +
                                '<div class="audio-infomsg-main auto">' +
                                '<p class="audio-test-infomsg f18 c3 tl">' + data.question + '</p>' +
                                '</div>' +
                                '</div>' +
                                '<div class="audio-getReady">' +
                                '<div class="headset-icon"></div>' +
                                '<div class="getReady-time f18 cf">Preparation Time: ' + data.prepareTime + ' Seconds</div>' +
                                '<div class="getReady-time f18 cf">Response Time: ' + data.answerTime + ' Seconds</div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="audio-response" audiourl="' + data.prepareAudio + '">' +
                                '<div class="audio-recording-t">Prepare your response</div>' +
                                '<div class="audio-recording-m">00:<span class="time">' + data.prepareTime + '</span></div>' +
                                '<div class="audio-recording-b">' +
                                '<div class="audio-recording-run"></div>' +
                                '</div>' +
                                '</div>' +
                                '<div class="audio-recording" audiourl="' + data.recordingAudio + '">' +
                                '<div class="audio-recording-t">Recording</div>' +
                                '<div class="audio-recording-m">00:<span class="time">' + data.answerTime + '</span></div>' +
                                '<div class="audio-recording-b">' +
                                '<div class="audio-recording-run"></div>' +
                                '</div>' +
                                '</div>' +
                                '<p class="audio-recording-upload"></p>' +
                                '</div>' +
                                '</div>';
                        }

                        $('.speaking-topic').html(dataStr);
                        xm.volumeHandle('.spoken_introduce', '#jp-jplayer');
                        xm.volumeHandle('.spoken_test', '#jp-jplayer');
                        xm.volumeHandle('.speaking-topic', '#jp-jplayer');
                        $('.speaking-wrap').each(function() {
                            xm.volumeHandle('.' + $(this).attr('class'), '#jp-jplayer');
                        });
                        xm.speakSwitchPage();
                    }
                }
            })
            //获取写作题数据
            $.ajax({
                type: "GET",
                url: xm.baseURL + "/mkWritingQuestion/tpos/" + xm.tpoId + "/writing/questions.action",
                dataType : "json",
                success: function(data) { 
                    // 综合写作
                    var $paren = $('.Writing-sumup'),
                        $content = $('.l-content');
                    if(data.writingQuestions[0].txtImg!=""){
                    	$("#textImg").attr("src",data.writingQuestions[0].txtImg);
                    	$("#textImg").css("display","block");
                    }
                    $content.html(data.writingQuestions[0].readingContent.replace(/\n\n/g, '<br /><br />'));
                    var $audioWrap = $('.WritingPlay'),
                        $img = $audioWrap.find('.playImg');
                    $img.attr('src', data.writingQuestions[0].listeningImg);
                    $audioWrap.attr('audioUrl', data.writingQuestions[0].listeningAudio);
                    var $wrap = $('#overall'),
                        $head = $wrap.find('.head-content span'),
                        $columnText = $wrap.find('.column-text');
                    $wrap.attr("topicid", data.writingQuestions[0].id);
                    $wrap.attr("type", data.writingQuestions[0].type);
                    $head.html(data.writingQuestions[0].question + ".");
                    $columnText.html(data.writingQuestions[0].readingContent.replace(/\n\n/g, '<br /><br />'));
                    // 独立写作
                    var $wrap = $('#alone'),
                        $head = $wrap.find('.head-content span'),
                        $columnText = $wrap.find('.column-text');
                    $wrap.attr("topicid", data.writingQuestions[1].id);
                    $wrap.attr("type", data.writingQuestions[1].type);
                    $head.html(data.writingQuestions[1].question + ".");
                    $columnText.html(data.writingQuestions[1].listeningContent);
                    xm.volumeHandle('.Writing-sumup', '#jp-jplayer');
                    xm.volumeHandle('.WritingPlay','#jp-jplayer');
                    xm.volumeHandle('.Articlewriting','#jp-jplayer');
                }
            });
        },
        //匹配阅读单选题文字背景
        replaceCurly: function(str) {
            var newStr = str.replace(/\{\{/, '<span class="block">');
            return newStr.replace(/\}\}/, '</span> ');
        },
        //匹配阅读插入题
        replaceInsert: function(str) {
            return str.replace(/\{\{\w+\}\}/g, '<span class="insert cp"></span>');
        },
        //阅读拖拽
        Dragdrop: function(parent) {
            var Dragdrop = parent;
            var $drag = null;
            var $target = null;
            Dragdrop.each(function() {
                _that = $(this);
                $drag = $(this).find('.drag');
                $target = $(this).find('.target');
                var id = '';
                $drag.draggable({
                    revert: true,
                    cursor: 'move',
                    onDrop: function() {}
                });
                $drag.each(function() {
                    id += '#' + $(this).attr('id') + ',';
                });
                var idStr = id.substring(0, id.length - 1);
                $target.droppable({
                    accept: idStr,
                    onDrop: function(e, source) {
                        if (!$(this).text()) {
                            $(source).hide();
                            $(this).text($(source).attr('id') + ".  " + $(source).attr('text'));
                            $(this).addClass("f-csp");
                            $(this).attr('index', $(source).attr('index'));
                            $(this).attr('_options', $.trim($(source).find('.sn-box').text()));
                        }
                    }
                });
                $target.dblclick(function() {
                    var index = $(this).attr('index');
                    $(this).text('');
                    $(this).removeAttr('index');
                    $(this).attr('_options', "");
                    $drag.eq(index).fadeIn();
                });
            });
        },
        //勾选阅读单选双选题
        readingRadioCheck: function() {
            $('.radio-topic').each(function() {
                var $rightBox = $(this).find('.view-r-box'),
                    replaceNum = $(this).attr('replaceNum'),
                    replaceContent = $(this).attr('replaceContent'),
                    $p = $rightBox.find('p');
                if ($(this).attr('replaceNum').indexOf("|&|") >= 0 && $(this).attr('replaceContent').indexOf("|&|") >= 0) {
                    replaceNumArr = replaceNum.split("|&|");
                    replaceContentArr = replaceContent.split("|&|");
                    for(var i = 0; i < replaceNumArr.length; i++){
                        $p.each(function() {
                            if ($(this).attr('_paragraph') == replaceNumArr[i] && $.trim("{{"+$(this).text()+"}}") == $.trim(replaceContentArr[i])) {
                                var str = $(this).html();
                                $(this).html('<span class="tag">♦</span>' + str);
                            }
                        });
                    }
                } else {
                    $p.each(function() {
                        if ($(this).attr('_paragraph') == replaceNum && $.trim(replaceContent) !== '' && $.trim("{{"+$(this).text()+"}}") !== $.trim(replaceContent)) {
                            $(this).html(xm.replaceCurly(replaceContent));
                            var str = $(this).html();
                            $(this).html(str);
                        }
                        if ($(this).attr('_paragraph') == replaceNum && $.trim("{{"+$(this).text()+"}}") == $.trim(replaceContent)) {
                            var str = $(this).html();
                            $(this).html('<span class="tag">♦</span>' + str);
                        }
                    });
                }
                if ($(this).attr('type') == 1) {
                    $(this).find('.u-icon-radio').on('click', function() {
                        $(this).addClass('u-icon-radio-active');
                        $(this).parent().siblings().find('.u-icon-radio').removeClass('u-icon-radio-active').attr('choose', false);
                        $(this).parents('.radio-topic').attr('radioAnswer', $(this).attr('options'));
                    })
                } else {
                    $(this).find('.u-icon-radio').on('click', function() {
                        if (!$(this).hasClass('u-icon-radio-active')) {
                            $(this).addClass('u-icon-radio-active');
                            xm.str += $(this).attr('options');
                        }else{
                            $(this).removeClass('u-icon-radio-active');
                            xm.str = xm.str.replace($(this).attr('options'),'');
                        }
                        $(this).parents('.radio-topic').attr('radioAnswer', xm.str.split('').sort().join(''));
                    });
                }
                xm.rightScrollTop($rightBox);
            });
        },
        //阅读插入题操作
        readingInsertHandle: function() {
            $('.insert-topic').each(function() {
                var $rightBox = $(this).find('.view-r-box'),
                    replaceNum = $(this).attr('replaceNum'),
                    $insertText = $(this).find('.insertText'),
                    replaceContent = $(this).attr('replaceContent'),
                    sArr = ['A', 'B', 'C', 'D', 'E', 'F'],
                    _that = $(this);
                var $p = $rightBox.find('p');
                if (replaceNum.indexOf("|&|") >= 0 && replaceContent.indexOf("|&|") >= 0) {
                    var replaceNumArr = replaceNum.split("|&|");
                    var replaceContentArr = replaceContent.split("|&|");
                    for(var i = 0; i < replaceNumArr.length; i++){
                        $p.each(function() {
                            if ($(this).attr('_paragraph') == replaceNumArr[i]) {
                                $(this).html(xm.replaceInsert(replaceContentArr[i]));
                            }
                        });
                    }
                } else {
                    $p.each(function() {
                        if ($(this).attr('_paragraph') == replaceNum) {
                            $(this).html(xm.replaceInsert(replaceContent));
                        }
                    });
                }
                $insert = $p.find('.insert');
                for (var i = 0, len = sArr.length; i < len; i++) {
                    $insert.eq(i).attr('_options', sArr[i]);
                }
                $insert.each(function() {
                    $(this).bind('click', function() {
                        $rightBox.find('.insert').removeClass('no').html('');
                        $(this).addClass('no').html($insertText.text());
                        _that.attr('radioAnswer', $(this).attr('_options'));
                    });
                });
                xm.rightScrollTop($(this).find('.view-r-box'));
            });
        },
        //阅读右侧滚动条设置
        rightScrollTop: function(parent) {
            var block, insert;
            if (parent.find('.block').length > 0) {
                block = parent.find('.block');
                parent.scrollTop(block.offset().top - parent.offset().top - 130);
            } else if (parent.find('.insert').length > 0) {
                insert = parent.find('.insert:eq(0)');
                parent.scrollTop(insert.offset().top - parent.offset().top - 130);
            } else if (parent.find('.tag').length > 0) {
                tag = parent.find('.tag:eq(0)');
                parent.scrollTop(tag.offset().top - parent.offset().top - 130);
            } else if (parent.find('.block').length > 0 && parent.find('.tag').length > 0) {
                block = parent.find('.block');
                parent.scrollTop(block.offset().top - parent.offset().top - 130);
            } else if (parent.find('.insert').length > 0 && parent.find('.tag').length > 0) {
                insert = parent.find('.insert:eq(0)');
                parent.scrollTop(insert.offset().top - parent.offset().top - 130);
            }
        },
        //阅读题切换
        ReadingSwitchPage: function() {
            var $parent = $('.wrap');
            $parent.each(function() {
                $r_Next = $(this).find('.JS_read_next'),
                    $r_Blak = $(this).find('.JS_read_back'),
                    $box = $('.box'),
                    len = $('.box').length;
                if (xm.readIndex == 0) {
                    $('.top-chapter-num').removeClass("f-dn");
                    $('.top-question-num').addClass("f-dn");
                }
                // 文章阅读完成操作
                $(".Reading").find(".view-r-box").scroll(function() {
                    var scrollNum = $(this).scrollTop()>=$(this)[0].scrollHeight-$(this).height()-30;
                    if($(this).scrollTop()>=$(this)[0].scrollHeight-$(this).height()-30){
                        var $parent = $(this).parent().parent();
                        if($parent.attr("_index") == 0){
                            $("body").attr("pop1", "1");
                        }
                        if($parent.attr("_index") == 1){
                            $("body").attr("pop2", "2");
                        }
                        if($parent.attr("_index") == 2){
                            $("body").attr("pop3", "3");
                        }
                    }
                });
                $r_Next.bind('click', function() {
                    if ($(".wrap").find(".main").eq(xm.readIndex+1).hasClass("Dragdrop-topic")) {
                        $(".JS_read_viewtext").removeClass("f-dn");
                        $(".JS_read_viewtext").click(function() {
                            if($(".wrap").find(".main").eq(xm.readIndex).attr("_topic") == 0){
                                $(".wrap").find(".Reading").eq(0).show();
                                $(this).addClass("f-dn");
                                $(".JS_read_viewques").removeClass("f-dn");
                                $(".u-btn-fn").attr("disabled", true);
                            }
                            if($(".wrap").find(".main").eq(xm.readIndex).attr("_topic") == 1){
                                $(".wrap").find(".Reading").eq(1).show();
                                $(this).addClass("f-dn");
                                $(".JS_read_viewques").removeClass("f-dn");
                                $(".u-btn-fn").attr("disabled", true);
                            }
                            if($(".wrap").find(".main").eq(xm.readIndex).attr("_topic") == 2){
                                $(".wrap").find(".Reading").eq(2).show();
                                $(this).addClass("f-dn");
                                $(".JS_read_viewques").removeClass("f-dn");
                                $(".JS_read_next").hide();
                                $(".u-btn-fn").attr("disabled", true);
                            }
                        });
                        $(".JS_read_viewques").click(function() {
                            if($(".wrap").find(".main").eq(xm.readIndex).attr("_topic") == 0){
                                $(".wrap").find(".Reading").eq(0).hide();
                                $(this).addClass("f-dn");
                                $(".JS_read_viewtext").removeClass("f-dn");
                                $(".u-btn-fn").attr("disabled", false);
                            }
                            if($(".wrap").find(".main").eq(xm.readIndex).attr("_topic") == 1){
                                $(".wrap").find(".Reading").eq(1).hide();
                                $(this).addClass("f-dn");
                                $(".JS_read_viewtext").removeClass("f-dn");
                                $(".u-btn-fn").attr("disabled", false);
                            }
                            if($(".wrap").find(".main").eq(xm.readIndex).attr("_topic") == 2){
                                $(".wrap").find(".Reading").eq(2).hide();
                                $(this).addClass("f-dn");
                                $(".JS_read_viewtext").removeClass("f-dn");
                                $(".u-btn-fn").attr("disabled", false);
                            }
                        });
                    } else {
                        $(".JS_read_viewtext").addClass("f-dn");
                    }
                    // 清空拖放选择题答案数组
                    dragAnswerArr = [];
                    if ($(".Reading").eq(0).css("display") == "block") {
                        if($("body").attr("pop1") !== "1"){
                            stopTime();
                            $(".mask-bg").show();
                            $(".m-pop-massage").show();
                            $('.top-chapter-num').removeClass("f-dn");
                            $('.top-question-num').addClass("f-dn");
                            $(".JS_read_pause").html($(".JS_read_pause").html() == '暂停' ? "继续" : '暂停');
                            return;
                        }
                    } else if ($(".Reading").eq(1).css("display") == "block") {
                        if($("body").attr("pop2") !== "2"){
                            stopTime();
                            $(".mask-bg").show();
                            $(".m-pop-massage").show();
                            $('.top-chapter-num').removeClass("f-dn");
                            $('.top-question-num').addClass("f-dn");
                            $(".JS_read_pause").html($(".JS_read_pause").html() == '暂停' ? "继续" : '暂停');
                            return;
                        }
                    } else if ($(".Reading").eq(2).css("display") == "block") {
                        if($("body").attr("pop3") !== "3"){
                            stopTime();
                            $(".mask-bg").show();
                            $(".m-pop-massage").show();
                            $('.top-chapter-num').removeClass("f-dn");
                            $('.top-question-num').addClass("f-dn");
                            $(".JS_read_pause").html($(".JS_read_pause").html() == '暂停' ? "继续" : '暂停');
                            return;
                        }
                    }
                    if ($(".wrap .main").eq(xm.readIndex + 1).attr("_index") == 1 || $(".wrap .main").eq(xm.readIndex + 1).attr("_index") == 2) {
                        $('.top-question-num').addClass("f-dn");
                        $('.top-chapter-num').removeClass("f-dn");
                    }
                    xm.readIndex++;
                    btn();
                    $('.box').hide();
                    $('.box').eq(xm.readIndex).show();
                    $('.top-question-num').removeClass("f-dn");
                });
                $r_Blak.bind('click', function() {
                    if ($(".wrap").find(".main").eq(xm.readIndex-1).hasClass("Dragdrop-topic")) {
                        $(".JS_read_viewtext").removeClass("f-dn");
                    } else {
                        $(".JS_read_viewtext").addClass("f-dn");
                    }
                    if ($(".Reading").eq(0).css("display") == "block" || $(".Reading").eq(1).css("display") == "block" || $(".Reading").eq(2).css("display") == "block") {
                        $('.top-question-num').addClass("f-dn");
                        $('.top-chapter-num').removeClass("f-dn");
                    }
                    if ($(".wrap .main").eq(xm.readIndex - 1).attr("_index") == 0 || $(".wrap .main").eq(xm.readIndex - 1).attr("_index") == 1 || $(".wrap .main").eq(xm.readIndex - 1).attr("_index") == 2) {
                        $('.top-chapter-num').removeClass("f-dn");
                        $('.top-question-num').addClass("f-dn");
                    } else {
                        $('.top-chapter-num').addClass("f-dn");
                        $('.top-question-num').removeClass("f-dn");
                    }
                    xm.readIndex--;
                    btn();
                    $('.box').hide();
                    $('.box').eq(xm.readIndex).show();
                });

                function btn() {
                    if (xm.readIndex == $('.box').length - 1) {
                        $r_Next.hide();
                        $('.JS_read_submit').removeClass("f-dn");
                        return;
                    }
                    if (xm.readIndex > 0) {
                        $r_Blak.attr("disabled",false);
                        $(".JS_read_review").attr("disabled",false);
                        $r_Next.show();
                        $('.JS_read_submit').addClass("f-dn");
                    }
                    if (xm.readIndex == 0) {
                        $r_Blak.attr("disabled",true);
                        $r_Next.show();
                        $('.JS_read_submit').addClass("f-dn");
                    }
                    if (xm.readIndex < $('.box').length - 1) {
                        $r_Next.attr("disabled",false);
                        $r_Next.show();
                        $('.JS_read_submit').addClass("f-dn");
                    }
                    if (xm.readIndex == 15 || xm.readIndex == 30) {
                        $(".JS_read_review").attr("disabled",true);
                    }
                    xm.str = "";
                }
            });
        },
        // 听力模块 “()” 替换耳机图标
        replaceHeadset: function() {
            $(".autoPlaybox").find(".topicText").each(function() {
                if($(this).html().indexOf("()") >= 0){
                    var str = $(this).html();
                    $(this).html(str.replace(/\(\)|\（\）/, '<img style="vertical-align:bottom;" src="../images/icon_headset.png" alt="">'));
                }
            });
        },
        // 口语页面切换
        speakSwitchPage: function() {
            $(".JS_speak_prepare_continue").click(function() {
                $(".speak-prepare").hide();
                $(".spoken_introduce").show();
            });
        },
        // 口语答案提交播放器
        speakPlayer: function() {
            $("#jquery_jplayer_1").jPlayer({
                ready: function () {
                    $(this).jPlayer("setMedia", {
                        mp3: "http://universe1.b0.upaiyun.com" + recordArr[0]
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
                        mp3: "http://universe1.b0.upaiyun.com" + recordArr[1]
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
                        mp3: "http://universe1.b0.upaiyun.com" + recordArr[2]
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
                        mp3: "http://universe1.b0.upaiyun.com" + recordArr[3]
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
                        mp3: "http://universe1.b0.upaiyun.com" + recordArr[4]
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
                        mp3: "http://universe1.b0.upaiyun.com" + recordArr[5]
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
        bindEvent: function() {
            // 听力题目序号
            xm.listenPart1 = $(".audio-main[idenNum = 1]").length;
            xm.listenPart2 = $(".audio-main[idenNum = 2]").length;
            $(".audio-main[idenNum = 1]").each(function(index) {
                $(this).attr("index", index + 1);
            });
            $(".audio-main[idenNum = 2]").each(function(index) {
                $(this).attr("index", index + 1);
            });
            // 关闭弹窗操作
            $(".JS_pop_close").click(function() {
                if($(".g-read").css("display") != "none"){ // 阅读关闭弹窗
                    if($(".wrap").css("display") != "none"){
                        startTime();
                    }
                    $(".m-pop-massage").hide();
                    $(".m-pop-pause").hide();
                    $(".mask-bg").hide();
                    $(".JS_read_pause").html($(".JS_read_pause").html() == "暂停" ? "继续" : "暂停");
                } else if($(".g-listen").css("display") != "none") { // 听力关闭弹窗
                    if($(".listening_wrap").css("display") != "none"){
                        if($(".audio-main").css("display") != "none"){
                            startTime();
                        } else {
                            xm.asContplay();
                        }
                        for(var i = 0; i < $(".player-main").length; i++){
                            if($(".player-main").eq(i).css("display") == "block"){
                                if($(".player-main").eq(i).find(".duration").text() != "00:00" && $(".player-main").eq(i).find(".currentTime").text() == $(".player-main").eq(i).find(".duration").text()){
                                    startTime();
                                } else {
                                    xm.asContplay();
                                }
                            }
                        }
                    }
                    if($(".listening_indexWrap").css("display") != "none" || $(".listening_introduce").css("display") != "none"){
                        xm.asContplay();
                    }
                    $(".m-pop-massage").hide();
                    $(".m-pop-pause").hide();
                    $(".mask-bg").hide();
                    $(".JS_listen_pause").html($(".JS_listen_pause").html() == "暂停" ? "继续" : "暂停");
                } else if($(".g-speak").css("display") != "none") { // 口语关闭弹窗
                    xm.asContplay();
                    $(".m-pop-massage").hide();
                    $(".m-pop-pause").hide();
                    $(".mask-bg").hide();
                    $(".JS_speak_pause").html($(".JS_speak_pause").html() == "暂停" ? "继续" : "暂停");
                } else if($(".g-write").css("display") != "none") {
                    if($("#overall").css("display") == "block" || $("#alone").css("display") == "block" || $(".Writing-sumup").css("display") == "block"){ // 写作关闭弹窗
                        startTime();
                    } else if($(".WritingPlay").css("display") == "block"){
                        xm.asContplay();
                    }
                    $(".m-pop-finish").hide();
                    $(".m-pop-pause").hide();
                    $(".mask-bg").hide();
                    $(".JS_write_pause").html($(".JS_write_pause").html() == "暂停" ? "继续" : "暂停");
                }
            });
            // 阅读介绍页Continue按钮
            $('.JS_desc_continue').on('click', function() {
                $('.read-desc').hide();
                xm.ReadingSwitchPage();
                $('.wrap').css('visibility', 'visible');
                $('.wrap .main').each(function() {
                    $(this).hide();
                });
                $('.wrap .main').eq(0).show();
                reStartTime(".read-time .time-txt");
            });
            // 阅读提交按钮
            $(".JS_read_submit").on("click", function() {
                stopTime();
                $(".wrap").hide();
                $(".g-read").addClass("f-dn");
                $(".g-listen").removeClass("f-dn");
                $(".listen-prepare").removeClass("f-dn");
            });

            // 听力准备页continue按钮操作
            $(".JS_prepare_continue").click(function() {
                $(".listen-prepare").hide();
                $(".listening_indexWrap").show();
                xm.asplay("http://bbsnew.b0.upaiyun.com/listening_direction1.mp3");///
            });
            //听力说明页continue按钮操作
            $('#indexWrapBtn').on('click',function(){
                $('.listening_indexWrap').hide();
                $('.listening_introduce').show();///
                xm.asplay("http://bbsnew.b0.upaiyun.com/listening_direction2.mp3");
            });

            // 写作弹窗continue按钮操作
            $(".JS_pop_continue").click(function() {
                if($("#overall").css("display") == "block"){
                    $(".mask-bg").hide();
                    $(".m-pop-finish").hide();
                    $('#overall').hide();
                    $('.autocephaly-testExplain').show();
                } else if($("#alone").css("display") == "block"){
                    $(".mask-bg").hide();
                    $(".m-pop-finish").hide();
                    xm.answerShow();
                    $("#alone").hide();
                    //$(".g-write").addClass("f-dn");
                    $(".g-write").removeClass("f-dn");
                    $(".complete-result").removeClass("f-dn");
                }
            });
            // 写作准备页continue按钮操作
            $('#w-testAudio-continue').on('click', function() {
                $('.write-prepare').hide();
                $('.Writing-testExplain').show();
                $('#jp-jplayer1').remove();
            });
            // 写作说明页continue按钮操作
            $('#w-testExplain-continue').on('click', function() {
                $('.Writing-testExplain').hide();
                $('.Writing-sumup').show();
                reStartTime(".Writing-sumup .write-time .time-txt");
            });
            //综合写作文字阅读
            $('#continue-Writing-Text').on('click', function() {
                stopTime();
                $('.Writing-sumup').hide();
                $('.WritingPlay').show();
                xm.writeAudioPlay(6);
            });
            //综合写作音频播放
            $('#continueWplay').on('click', function() {
                if($(".WritingPlay").find(".duration").text() != "00:00" && $(".WritingPlay").find(".currentTime").text() == $(".WritingPlay").find(".duration").text()){
                    $('.WritingPlay').hide();
                    $('#overall').show();
                    reStartTime("#overall .write-time .time-txt");
                    xm.aspause();
                }
            });
            //跳过综合写作文章
            $('#continue-sp-Writing').on('click', function() {
                stopTime();
                $(".overall-box").find(".word-count").text($("#overall").find(".count").text());
                var timeArr = $("#overall").find(".time-txt").text().split(":");
                var spentTime = parseInt(timeArr[0]*60) + parseInt(timeArr[1]);
                var timeCount = 1200 - spentTime;
                var mins = format(Math.floor(timeCount / 60)),
                    secs = format(Math.floor(timeCount % 60));
                $(".overall-box").find(".answer-time").text(mins + ":" + secs);
                if($("#overall").find(".time-txt").text() != "00:00"){
                    $(".mask-bg").show();
                    $(".m-pop-finish").show();
                }
            });
            //跳过独立写作介绍页面
            $('#autocephaly-continue').on('click', function() {
                $this = $(this);
                $('.autocephaly-testExplain').hide();
                $('#alone').show();
                reStartTime("#alone .write-time .time-txt");
            });
            // 写作提交按钮操作
            $('.JS_write_submit').on('click',function(){
                
                // 写作答案展示
                stopTime();
                $(".alone-box").find(".word-count").text($("#alone").find(".count").text());
                var timeArr = $("#alone").find(".time-txt").text().split(":");
                var spentTime = parseInt(timeArr[0]*60) + parseInt(timeArr[1]);
                var timeCount = 1800 - spentTime;
                var mins = format(Math.floor(timeCount / 60)),
                    secs = format(Math.floor(timeCount % 60));
                $(".alone-box").find(".answer-time").text(mins + ":" + secs);
                if($("#alone").find(".time-txt").text() != "00:00"){
                    $(".mask-bg").show();
                    $(".m-pop-finish").show();
                } else {
                    xm.answerShow();
                    $("#alone").hide();
                    $(".g-write").addClass("f-dn");
                    $(".complete-result").removeClass("f-dn");
                }
            });
            // 超时操作
            $(".JS_pop_timeout").click(function() {
                xm.answerShow();
                $(".mask-bg").hide();
                $(".m-pop-timeout").hide();
                $("#alone").hide();
                $(".g-write").addClass("f-dn");
                $(".complete-result").removeClass("f-dn");
            });
            // 整套结果提交按钮
            $('.JS_complete_result').on('click',function(){
                if (!xm.flag) {
                    xm.submit();
                    xm.flag = true;
                }else {
                    return;
                }
            })
        },
        // set音频对象
        playObject: function(){
            xm.play = $("#jp-jplayer").jPlayer({
                ready: function () {
                    $(this).jPlayer("setMedia", {
                        mp3: ""
                    });
                },
                preload: 'auto',
                swfPath: "../swf",
                supplied: "mp3",
            });
        },
        // 听力大类音频播放结束执行操作
        asplayEndQues: function(mp3url, time) {
            var time = time || 0;
            xm.play.jPlayer("setMedia", {
                mp3: mp3url
            }).jPlayer("play", time);
            $("#jp-jplayer").bind($.jPlayer.event.ended, function(event) {
                $("#jp-jplayer").unbind($.jPlayer.event.ended);
                $($('.abox').eq(xm.listenAIndex)).find(".optionsList").removeClass("f-dn");
                $(".listen-time").removeClass("f-dn");
                startTime();
            });
        },
        // 听力问题音频播放
        asplayEnd: function(mp3url, time) {
            var time = time || 0;
            xm.play.jPlayer("setMedia", {
                mp3: mp3url
            }).jPlayer("play", time);
            $("#jp-jplayer").bind($.jPlayer.event.ended, function(event) {
                $("#jp-jplayer").unbind($.jPlayer.event.ended);
                xm.btn();
                $(".JS_listen_next").attr("disabled", true);
                $(".JS_listen_ok").attr("disabled", true);
                if($('.abox').eq(xm.listenAIndex).hasClass("listenPart1")){
                    var quesNum = $('.abox').eq(xm.listenAIndex).attr("index");
                    var contStr = "Question " + quesNum + " of " + xm.listenPart1;
                    $(".listen-main-bg .top-question-num").text(contStr);
                }
                if($('.abox').eq(xm.listenAIndex).hasClass("listenPart2")){
                    var quesNum = $('.abox').eq(xm.listenAIndex).attr("index");
                    var contStr = "Question " + quesNum + " of " + xm.listenPart2;
                    $(".listen-main-bg .top-question-num").text(contStr);
                }
                xm.asplayEndQues($('.abox').eq(xm.listenAIndex).attr("audiourl"));
            });
        },
        asplay: function(mp3url,time){
            var time = time || 0;
            xm.play.jPlayer("setMedia",{
                mp3:mp3url
            }).jPlayer("play",time);
        },
        aspause: function() {
            xm.play.jPlayer("pause");
            jpCountdown3.jPlayer("pause");
            jpCountdown4.jPlayer("pause");
            jpCountdown5.jPlayer("pause");
            jpCountdown6.jPlayer("pause");
        },
        asContplay: function(){
            xm.play.jPlayer("play");
            jpCountdown3.jPlayer("play");
            jpCountdown4.jPlayer("play");
            jpCountdown5.jPlayer("play");
            jpCountdown6.jPlayer("play");
        },
        asReplay: function(){
            xm.play.jPlayer("stop").jPlayer('play');
        },
        asStop: function(){
            xm.play.jPlayer("stop");
        },
        // 写作音频播放结束操作
        asWritePlayEnd: function(mp3url, time) {
            var time = time || 0;
            xm.play.jPlayer("setMedia", {
                mp3: mp3url
            }).jPlayer("play", time);
            $("#jp-jplayer").bind($.jPlayer.event.ended, function(event) {
                $("#jp-jplayer").unbind($.jPlayer.event.ended);
                $('.WritingPlay').hide();
                $('#overall').show();
                reStartTime("#overall .write-time .time-txt");
                xm.aspause();
            });
        },
        // 阅读拖拽题答案
        setDrapStr: function(parent) {
            var dstr = '';
            var target = parent.find('.target');
            target.each(function() {
                dstr += $(this).attr('_options');
            })
            parent.attr('radioAnswer', dstr);
        },
        // 音频设置单选题,多选题
        audioRadioHandle: function(){
            var aBox = $('.abox');
            for( var i=0; i<aBox.length; i++){
            	 if(aBox.eq(i).attr('type') == 1){//单选
                 	var span = aBox.eq(i).find('.radioIcon');
                     span.on('click',function(){
                         $(this).addClass('active');
                         $(this).parent().siblings().find('.radioIcon').removeClass('active');
                         $(this).parents('.abox').attr('radioAnswer',$(this).attr('_options'));
                         $(".JS_listen_next").attr("disabled", false);
                     });
                 }else if(aBox.eq(i).attr('type') == 2){//多选
                 	var span = aBox.eq(i).find('.radioIcon');
                     span.on('click', function(){
                         if(!$(this).hasClass('active')){
                             $(this).addClass('active');
                             xm.str += $(this).attr('_options');
                         }else{
                             $(this).removeClass('active');
                             xm.str = xm.str.replace($(this).attr('_options'),'');
                         }
                         $(this).parents('.abox').attr('radioAnswer', xm.str.split('').sort().join(''));
                         $(".JS_listen_next").attr("disabled", false);
                     });
                 }else{//type=3 新题型
                 	var span = aBox.eq(i).find('.g-checkbox  ');
                 	var xm_str1="",xm_str2="";
                 
                 	span.on('click',function(){
                 		var $par=$(this).parent();
                 		 if(!$par.hasClass('selected')){
                 			 $par.parent().find(".normal").removeClass('selected')
                 			 xm_str1 = xm_str1.replace($(this).attr('_options'),'');
                 			 xm_str2 = xm_str2.replace($(this).attr('_options'),'');
                              $par.addClass('selected');
                 			 if($par.index()==0){
                 				 xm_str1 += $(this).attr('_options');
                 			 }else{
                 				 xm_str2 += $(this).attr('_options');
                 			 }
                              
                         }else{
                         	$par.removeClass('selected');
                         	if($par.index()==0){
                         		xm_str1 = xm_str1.replace($(this).attr('_options'),'');
 	               			 }else{
 	               				xm_str2 = xm_str2.replace($(this).attr('_options'),'');
 	               			 }
                              
                         }                		
                 		xm.str=xm_str1.split('').sort().join('')+"/"+xm_str2.split('').sort().join('')
                         $(this).parents('.abox').attr('radioAnswer', xm.str);
                         $(".JS_listen_next").attr("disabled", false);
                 	})
                 }             
            }
        },
        // 听力翻页
        audioSwitchPage: function(){
            var $parent = $('.listening_wrap'),
                $a_Next = $parent.find('.JS_listen_next'),
                $a_Blak = $parent.find('.a_Blak'),
                $bMark = $parent.find('.blakMark'),
                $nMark = $parent.find('.nextMark'),
                $box = $parent.find('.abox'),
                len = $box.length;
            $(".JS_listen_ok").click(function() {
                stopTime();
                if($(".JS_listen_submit").hasClass("u-btn-next-active")){
                    $(".listening_wrap").hide();
                    $(".g-listen").addClass("f-dn");
                    $(".g-speak").removeClass("f-dn");
                    $(".speak-prepare").removeClass("f-dn");
                } else if($a_Next.hasClass("u-btn-next-active")){
                    if ($box.eq(xm.listenAIndex+1).attr("topicname") !== undefined && $('.player-main').eq(xm.listenMainIndex).css('display') == 'none') {
                        if ($box.eq(xm.listenAIndex+1).attr("topicname") == "conversation 2") {
                            stopTime();
                            $('.listening_wrap').hide();
                            $('.listening_introduce').show();
                            xm.asplay("http://bbsnew.b0.upaiyun.com/listening_direction2.mp3");
                        } else {
                            xm.listenAIndex++;
                            xm.btn();
                            $(".JS_listen_ok").hide();
                            xm.audioPlay(xm.listenMainIndex);
                        }
                    } else {
                        xm.listenAIndex++;
                        xm.btn();
                        $(".JS_listen_next").attr("disabled", true);
                        $(".JS_listen_ok").attr("disabled", true);
                        if($('.abox').eq(xm.listenAIndex).hasClass("listenPart1")){
                            var quesNum = $('.abox').eq(xm.listenAIndex).attr("index");
                            var contStr = "Question " + quesNum + " of " + xm.listenPart1;
                            $(".listen-main-bg .top-question-num").text(contStr);
                        }
                        if($('.abox').eq(xm.listenAIndex).hasClass("listenPart2")){
                            var quesNum = $('.abox').eq(xm.listenAIndex).attr("index");
                            var contStr = "Question " + quesNum + " of " + xm.listenPart2;
                            $(".listen-main-bg .top-question-num").text(contStr);
                        }
                        xm.asplayEndQues($box.eq(xm.listenAIndex).attr("audiourl"));
                    }
                }
            });
            // 听力Next按钮
            $a_Next.bind('click',function(){
                if (typeof($box.eq(xm.listenAIndex).attr('radioanswer')) != 'undefined' && $box.eq(xm.listenAIndex).attr('radioanswer') != '') {
                    $(this).addClass("u-btn-next-active");
                    $(this).attr("disabled", true);
                    $(".JS_listen_ok").attr("disabled", false);
                }
            });
            // 听力答题说明页continue按钮操作
            $('#introduceBtn').on('click',function(){
                if ($box.eq(xm.listenAIndex+1).attr("topicname") == "conversation 2" && $('.player-main').eq(xm.listenMainIndex).css('display') == 'none') {
                    if (typeof($box.eq(xm.listenAIndex).attr('radioanswer')) != 'undefined' && $box.eq(xm.listenAIndex).attr('radioanswer') != '') {
                        $('.listening_introduce').hide();
                        xm.asStop();
                        $a_Blak.addClass('no');
                        $bMark.show();
                        $('.player-main').eq(xm.listenMainIndex).show();
                        $box.eq(xm.listenAIndex).hide();
                        $('.listening_wrap').show();
                        $(".listen-time .time-txt").text($(".listen-time .time-txt").attr("date-timetxt"));
                        reStartTime(".listening_introduce .listen-time .time-txt");
                        stopTime();
                        xm.listenAIndex++;
                        $('#topicName').html($box.eq(xm.listenAIndex).attr('topicName'));
                        xm.btn();
                        $('.JS_listen_ok').hide();
                        xm.audioPlay(xm.listenMainIndex);
                    } else if($("body").attr("listen") == 1){
                        $('.listening_introduce').hide();
                        xm.asStop();
                        $('.player-main').eq(xm.listenMainIndex).show();
                        $box.eq(xm.listenAIndex).hide();
                        $('.listening_wrap').show();
                        $(".listen-time .time-txt").text($(".listen-time .time-txt").attr("date-timetxt"));
                        reStartTime(".listening_introduce .listen-time .time-txt");
                        stopTime();
                        xm.listenAIndex++;
                        $('#topicName').html($box.eq(xm.listenAIndex).attr('topicName'));
                        xm.btn();
                        $('.JS_listen_ok').hide();
                        xm.audioPlay(xm.listenMainIndex);
                    }
                } else {
                    $(".listening_introduce").hide();
                    $('.JS_listen_ok').hide();
                    $('.listening_wrap').show();
                    $('.abox').eq(0).show();
                    xm.asStop();
                    $(".listen-time .time-txt").text($(".listen-time .time-txt").attr("date-timetxt"));
                    reStartTime(".listening_introduce .listen-time .time-txt");
                    stopTime();
                    xm.audioPlay(0);
                }
            });
            // 听力提交按钮
            $('.JS_listen_submit').on('click',function(){
                if (typeof($box.eq(xm.listenAIndex).attr('radioanswer')) != 'undefined' && $box.eq(xm.listenAIndex).attr('radioanswer') != '') {
                    $(this).addClass("u-btn-next-active");
                    $(this).attr("disabled", true);
                    $(".JS_listen_ok").attr("disabled", false);
                }
            });
        },
        // 听力next操作
        btn: function(){
            var $parent = $('.listening_wrap'),
                $a_Next = $parent.find('.JS_listen_next'),
                $a_Blak = $parent.find('.a_Blak'),
                $bMark = $parent.find('.blakMark'),
                $nMark = $parent.find('.nextMark'),
                $box = $parent.find('.abox'),
                len = $box.length;
            $box.hide();
            $box.eq(xm.listenAIndex).show();
            //如果听力题到最后一题了
            if( xm.listenAIndex == len-1){
                $('.JS_listen_submit').removeClass("f-dn");
                $a_Next.hide();
                $a_Next.removeClass("u-btn-next-active");
                return;
            }
            if( xm.listenAIndex > 0){
                stopTime();
                $('.JS_listen_submit').addClass("f-dn");
                $a_Next.show();
                $('.JS_listen_ok').show();
                $a_Next.removeClass("u-btn-next-active");
            }
            if( xm.listenAIndex == 0 ){
                $('.JS_listen_submit').addClass("f-dn");
                $a_Next.show();
                $a_Next.removeClass("u-btn-next-active");
            }
            if( xm.listenAIndex < len-1 ){
                $('.JS_listen_submit').addClass("f-dn");
                $a_Next.attr("disabled",false);
                $a_Next.show();
                $a_Next.removeClass("u-btn-next-active");
            }
            xm.aspause();
            $('.play').removeClass('pause');
            $('#topicName').html($box.eq(xm.listenAIndex).attr('topicName'));
            xm.str = "";
        },
        //音量拖拽调节
        volumeHandle: function(parent,jPlayer){
            var $parent = $(parent),
                $VolumeBtn = $parent.find('.Volume'),
                $parent = $parent.find('.DragDrap-v-box'),
                $drapIcon = $parent.find('.drapIcon'),
                $volumeProgress = $parent.find('.volume-progress'),
                maxWidth = $volumeProgress.width() - $drapIcon.width(),
                $range = $parent.find('.range');
            $VolumeBtn.bind('click',function(event){
                if($parent.css("display") == "none"){
                    $parent.show();
                } else {
                    $parent.hide();
                }
                event.stopPropagation();
            });
            $parent.bind('click',function(event){
                event.stopPropagation();
            });
            $(document).bind('click',function(){
                $parent.hide();
            });
            $drapIcon.bind('mousedown',function(event){
                var offset = $drapIcon.offset(),
                    L = offset.left - $parent.offset().left;
                var disX = parseInt( event.clientX - L );
                $(document).bind('mousemove',function(event){
                    var Left = event.clientX - disX ;
                    if( Left <= 0){
                        Left = 0;
                    }else if( Left >= maxWidth ){
                        Left = maxWidth;
                    }
                    var snale = Left / maxWidth;
                    $drapIcon.css('left', + Left + 'px');
                    $range.css( 'width', Left + 'px');
                    $(jPlayer).jPlayer('volume',snale);
                });
                $(document).bind('mouseup',function(){
                    $(document).unbind("mousemove");
                });
                return false;
            });
        },
        //听力大类时间进度条音频播放
        audioPlay: function(index){
            var $this = $('.player-main').eq(index);
            var $imgCarousel = $this.find('.audio-wrap'),
                $playIcon = $this.find('.play'),
                $jplayer = $('#jp-jplayer'),
                $progressBox = $this.find('.prog-box'),
                $jdIcon = $this.find('.prog-range'),
                $duration = $this.find('.duration'),
                $currentTime = $this.find('.currentTime'),
                _that = $this;
            var time = 0;
            var $timeCarousel;
            if ($imgCarousel.find('img').eq(0).attr('data_id').indexOf(":")>0) {
                $timeCarousel = parseInt($imgCarousel.find('img').eq(0).attr('data_id').split(":")[0])*60+parseInt($imgCarousel.find('img').eq(0).attr('data_id').split(":")[1])
            }else{
                $timeCarousel = $imgCarousel.find('img').eq(0).attr('data_id');
            }
            if ($('.player-main').eq(index).css('display') != 'none') {
                xm.listenMainIndex++;
                xm.listenAIndex++;
                $(".listen-time").addClass("f-dn");
                xm.asplayEnd(_that.attr('audiourl'),time);
            }
            var curTime = 0;
            var audioDurationinSeconds = 0;
            if (curTime <= $timeCarousel) {
                $imgCarousel.find('img').eq(0).show();
                $imgCarousel.find('img').eq(0).siblings('img').hide();
            }
            $jplayer.bind($.jPlayer.event.timeupdate, function (event) {
                curTime = event.jPlayer.status.currentTime;
                audioDurationinSeconds = event.jPlayer.status.duration;
                var p = curTime / audioDurationinSeconds;
                $jdIcon.width(p  * 100 + "%");
                //$progressBtn.css('left',parseInt(p * maxWidth,10));
                $currentTime.text($.jPlayer.convertTime(curTime));
                time = parseInt(curTime,10);
                $duration.text($.jPlayer.convertTime(audioDurationinSeconds));
                //图片每隔$timeCarousel秒轮播else
                if (curTime >= $timeCarousel) {
                    for (var i = 0; i < $imgCarousel.find('img').length; i++) {
                        var times;
                        if ($imgCarousel.find('img').eq(i).attr('data_id').indexOf(":")>0) {
                            times = parseInt($imgCarousel.find('img').eq(i).attr('data_id').split(":")[0])*60+parseInt($imgCarousel.find('img').eq(i).attr('data_id').split(":")[1])
                        } else{
                            times = $imgCarousel.find('img').eq(i).attr('data_id');
                        }
                        if ($timeCarousel != times  && times > curTime) {
                            $imgCarousel.find('img').eq(i).show();
                            $imgCarousel.find('img').eq(i).siblings('img').hide();
                            $timeCarousel = times;
                            return;
                        }
                    }
                    return;
                }
            });
        },
        //听力大类时间进度条音频播放
        writeAudioPlay: function(index){
            var $this = $('.player-main').eq(index);
            var $imgCarousel = $this.find('.audio-wrap'),
                $playIcon = $this.find('.play'),
                $jplayer = $('#jp-jplayer'),
                $progressBox = $this.find('.prog-box'),
                $jdIcon = $this.find('.prog-range'),
                $duration = $this.find('.duration'),
                $currentTime = $this.find('.currentTime'),
                _that = $this;
            var time = 0;
            var $timeCarousel;
            if ($imgCarousel.find('img').eq(0).attr('data_id').indexOf(":")>0) {
                $timeCarousel = parseInt($imgCarousel.find('img').eq(0).attr('data_id').split(":")[0])*60+parseInt($imgCarousel.find('img').eq(0).attr('data_id').split(":")[1])
            }else{
                $timeCarousel = $imgCarousel.find('img').eq(0).attr('data_id');
            }
            if ($('.player-main').eq(index).css('display') != 'none') {
                xm.asWritePlayEnd(_that.attr('audiourl'),time);
            }
            var curTime = 0;
            var audioDurationinSeconds = 0;
            if (curTime <= $timeCarousel) {
                $imgCarousel.find('img').eq(0).show();
                $imgCarousel.find('img').eq(0).siblings('img').hide();
            }
            $jplayer.bind($.jPlayer.event.timeupdate, function (event) {
                curTime = event.jPlayer.status.currentTime;
                audioDurationinSeconds = event.jPlayer.status.duration;
                var p = curTime / audioDurationinSeconds;
                $jdIcon.width(p  * 100 + "%");
                $currentTime.text($.jPlayer.convertTime(curTime));
                time = parseInt(curTime,10);
                $duration.text($.jPlayer.convertTime(audioDurationinSeconds));
                //图片每隔$timeCarousel秒轮播else
                if (curTime >= $timeCarousel) {
                    for (var i = 0; i < $imgCarousel.find('img').length; i++) {
                        var times;
                        if ($imgCarousel.find('img').eq(i).attr('data_id').indexOf(":")>0) {
                            times = parseInt($imgCarousel.find('img').eq(i).attr('data_id').split(":")[0])*60+parseInt($imgCarousel.find('img').eq(i).attr('data_id').split(":")[1])
                        } else{
                            times = $imgCarousel.find('img').eq(i).attr('data_id');
                        }
                        if ($timeCarousel != times  && times > curTime) {
                            $imgCarousel.find('img').eq(i).show();
                            $imgCarousel.find('img').eq(i).siblings('img').hide();
                            $timeCarousel = times;
                            return;
                        }
                    }
                    return;
                }
            });
        },
        hideWritingContent: function() {
            var $elem = $('.Writing-sumup-content');
            xm.timer5 = setTimeout(function() {
                $elem.hide();
            }, 1000 * 300);
        },
        get: function(tbid) {
            var sel = '';
            if (document.all) {
                var r = document.selection.createRange();
                document.selection.empty();
                sel = r.text;
            } else {
                var tb = document.getElementById(tbid);
                var start = tb.selectionStart;
                var end = tb.selectionEnd;
                sel = tb.value.substring(start, end);
            }
            return sel;
        },
        set: function(tbid, pos) {
            var ctrl = document.getElementById(tbid);
            if (ctrl.setSelectionRange) {
                ctrl.focus();
                ctrl.setSelectionRange(pos, pos);
            } else if (ctrl.createTextRange) {
                var range = ctrl.createTextRange();
                range.collapse(true);
                range.moveEnd('character', pos);
                range.moveStart('character', pos);
                range.select();
            }
        },
        insert: function(tbid, str) {
            var tb = document.getElementById(tbid);
            tb.focus();
            if (document.all) {
                var r = document.selection.createRange();
                document.selection.empty();
                r.text = str;
                r.collapse();
                r.select();
            } else {
                var newstart = tb.selectionStart + str.length;
                tb.value = tb.value.substr(0, tb.selectionStart) + str + tb.value.substring(tb.selectionEnd);
                tb.selectionStart = newstart;
                tb.selectionEnd = newstart;
            }
        },
        //Cursor操作:写作的复制，剪切，粘贴
        CursorHandle: function(parent, area) {
            var $parent = $(parent),
                $copy = $parent.find('.js-copy'),
                $cut = $parent.find('.js-cut'),
                $paste = $parent.find('.js-paste'),
                $count = $parent.find('.count'),
                $area = $(area);
            var str = '';
            $copy.on('click', function() {
                str = xm.get(area.substring(1));
            });
            $cut.on('click', function() {
                str = xm.get(area.substring(1));
                $area.val($area.val().replace(str, ''));
                var val = $.trim($area.val()),
                re = /[\s\.\,\?\!]+/g,
                arr = $.trim(val.replace(re, ' ')).split(' '),
                g = 0;
	            g = val == '' ? 0 : arr.length;
	            $count.html(g);
            });
            $paste.on('click', function() {
                xm.insert(area.substring(1), str);
                
                var val = $.trim($area.val()),
                re = /[\s\.\,\?\!]+/g,
                arr = $.trim(val.replace(re, ' ')).split(' '),
                g = 0;
	            g = val == '' ? 0 : arr.length;
	            $count.html(g);
            });
            $area.keyup(function() {
                var val = $.trim($(this).val()),
                    re = /[\s\.\,\?\!]+/g,
                    arr = $.trim(val.replace(re, ' ')).split(' '),
                    g = 0;
                g = val == '' ? 0 : arr.length;
                $count.html(g);
            });
            $area.bind("contextmenu",function(e){
        		return false;
            });
        },
        readClickChoose: function() {
            function tabSlider2(objCell, titCell, mainCell, trigger, vis, interTime){
                var _this = this;
                    _this.obj = objCell;
                    _this.hd = titCell || ".hd";
                    _this.bd = mainCell || ".bd";
                    _this.trigger = trigger || "mouseover";
                    _this.count = vis || 2;
                    _this.time = interTime || null;
                    _this.n = 0;
                $(_this.obj + " " + _this.bd).eq(0).show().siblings().hide();
                this.slider = function(){
                    $(_this.obj + " " + _this.hd).bind(_this.trigger, function(event){
                        $(this).addClass("on").siblings().removeClass("on");
                        var index = $(_this.obj + " " + _this.hd).index(this);
                        $(_this.obj + " " + _this.bd).eq(index).show().siblings().hide();
                        _this.n = index;
                    })
                }
                this.addhover = function(){
                    $(_this.obj).hover(function(){clearInterval(t)}, function(){t = setInterval(_this.autoplay, _this.time)});
                }
                this.autoplay = function(){
                    _this.n = _this.n >= (_this.count-1) ? 0 : ++_this.n;
                    $(_this.obj + " " + _this.hd).eq(_this.n).trigger(_this.trigger);
                }
                this.init = function(){
                    this.slider();
                    _this.time && (this.addhover(), t = setInterval(this.autoplay, _this.time));
                }
                this.init();
            }
            new tabSlider2(".tab-drag", ".tab-hd li", ".tab-bd ul", "click");
            // 声明点击选择题答案数组
            var clickAnswerArr = new Array(),
                clickAnswerStr;
                clickAnswerArr[0] = new Array();
                clickAnswerArr[1] = new Array();
            $(".tab-bd .drag").click(function() {
                var index = $(this).index();
                for(var i = 0; i < $(".tab-hd .on").find("a").length; i++){
                    if($(".tab-hd .on").find("a").eq(i).text() == ""){
                        $(".tab-hd .on").find("a").eq(i).text($(this).attr("id"));
                        $(".tab-hd .on").find("a").eq(i).attr("index", $(this).attr("index"));
                        $(this).addClass("f-dn");
                        for(var j = 0; j < $(".tab-hd li").length; j++){
                            if($(".tab-hd .on").index() == j){
                                clickAnswerArr[j][i] = $.trim($(".tab-hd .on").find("a").eq(i).text());
                                break;
                            }
                        }
                        clickAnswerStr = clickAnswerArr[0].join("") + "/" + clickAnswerArr[1].join("");
                        $(this).closest(".Click-topic").attr("radioanswer", clickAnswerStr);
                        break;
                    }
                }
            });
            $(".tab-hd").find("a").dblclick(function() {
                if($(this).text() != ""){
                    for(var i = 0; i < $(".tab-hd li").length; i++){
                        if($(this).parent().index() == i){
                            clickAnswerArr[i].splice($.inArray($(this).text(), clickAnswerArr[i]), 1, "");
                        }
                    }
                    var index = $(this).attr("index");
                    $(this).text("");
                    clickAnswerStr = clickAnswerArr[0].join("") + "/" + clickAnswerArr[1].join("");
                    $(this).closest(".Click-topic").attr("radioanswer", clickAnswerStr);
                    $(this).removeAttr("index");
                    $(".tab-bd .drag").eq(index).removeClass("f-dn");
                }
            });
        },
        answerShow: function() {
            var resultRArr = [], // 阅读答题结果数组
                rightRArr = [], // 阅读正确答案数组
                errorRarr = [], // 阅读错误答案数组
                resultLArr = [], // 听力答题结果数组
                rightLArr = [], // 听力正确答案数组
                errorLarr = [], // 听力错误答案数组
                resultSArr = [], // 口语答题结果数组
                speakCcntStr = "", // 口语答案内容结构
                resultWArr = [], // 写作答题结果数组
                RBox = $(".wrap .switch-box"), // 阅读题容器
                LBox = $(".listening_wrap .audio-main"), // 听力题容器
                SBox = $(".speaking-topic .speaking-wrap"), // 口语题容器
                WBox = $(".Articlewriting"), // 写作题容器
                integratedWBox = $(".alone-box"),
                independentWBox = $(".overall-box");
            // 传给后台的数据
            // 阅读答案数据
            // 拖拽题答案
            xm.setDrapStr($('.Dragdrop-topic:eq(0)'));
            xm.setDrapStr($('.Dragdrop-topic:eq(1)'));
            xm.setDrapStr($('.Dragdrop-topic:eq(2)'));
            for (var i = 0; i < RBox.length; i++) {
                if (RBox.eq(i).attr('radioAnswer') === RBox.eq(i).attr('choice_answer')) {
                    rightRArr.push(i);
                    resultRArr.push({
                        "readingListeningType": 1, // 阅读还是听力：1-阅读 2-听力
                        "mkQuestionTit": RBox.eq(i).find(".Question").text(), // 问题题目标题
                        "mkQuestionId": RBox.eq(i).attr('id'), // 问题 ID
                        "isRight": 1,
                        "originalAnswer": RBox.eq(i).attr('radioAnswer'), // 用户答案
                        "rightAnswer": RBox.eq(i).attr('choice_answer') // 正确答案
                    });
                } else {
                    errorRarr.push(i);
                    resultRArr.push({
                        "readingListeningType": 1,
                        "mkQuestionTit": RBox.eq(i).find(".Question").text(),
                        "mkQuestionId": RBox.eq(i).attr('id'),
                        "isRight": "0",
                        "originalAnswer": RBox.eq(i).attr('radioAnswer'),
                        "rightAnswer": RBox.eq(i).attr('choice_answer')
                    });
                }
            }
            for(var i = 0; i < RBox.length; i++){
                if(i < 14){
                    var contStr = "";
                    contStr += "<tr>" +
                               "<td class='f-tal'>" + resultRArr[i].mkQuestionTit + "</td>";
                               if(resultRArr[i].originalAnswer!=resultRArr[i].rightAnswer){
                              	 contStr+= "<td style='color:red'>" + resultRArr[i].originalAnswer + "</td>";
                               }else{
                              	 contStr+= "<td>" + resultRArr[i].originalAnswer + "</td>";
                               }
                               contStr+="<td>" + resultRArr[i].rightAnswer + "</td>" +
                               "</tr>";
                    $(".read-table-01 tbody").append(contStr);
                }
                if(i >= 14 && i < 28){
                    var contStr = "";
                    contStr += "<tr>" +
                               "<td class='f-tal'>" + resultRArr[i].mkQuestionTit + "</td>";
                               if(resultRArr[i].originalAnswer!=resultRArr[i].rightAnswer){
                              	 contStr+= "<td style='color:red'>" + resultRArr[i].originalAnswer + "</td>";
                               }else{
                              	 contStr+= "<td>" + resultRArr[i].originalAnswer + "</td>";
                               }
                               contStr+="<td>" + resultRArr[i].rightAnswer + "</td>" +
                               "</tr>";
                    $(".read-table-02 tbody").append(contStr);
                }
                if(i >= 28 && i < 42){
                    var contStr = "";
                    contStr += "<tr>" +
                               "<td class='f-tal'>" + resultRArr[i].mkQuestionTit + "</td>";
                               if(resultRArr[i].originalAnswer!=resultRArr[i].rightAnswer){
                              	 contStr+= "<td style='color:red'>" + resultRArr[i].originalAnswer + "</td>";
                               }else{
                              	 contStr+= "<td>" + resultRArr[i].originalAnswer + "</td>";
                               }
                               contStr+="<td>" + resultRArr[i].rightAnswer + "</td>" +
                               "</tr>";
                    $(".read-table-03 tbody").append(contStr);
                }
            }

            // 听力答案数据
            for( var j = 0; j < LBox.length; j++ ){
                if( LBox.eq(j).attr('radioAnswer') === LBox.eq(j).attr('choice_answer') ){
                    rightLArr.push( j );
                    resultLArr.push({
                        "readingListeningType": 2,
                        "mkQuestionTit": LBox.eq(j).find(".topicText").text(),
                        "mkQuestionId": LBox.eq(j).attr('id'),
                        "belongTopicName": LBox.eq(j).attr("belongtopicname"), // 问题归属 topicname
                        "isRight": 1,
                        "originalAnswer": LBox.eq(j).attr('radioAnswer'),
                        "rightAnswer": LBox.eq(j).attr('choice_answer')
                    });
                }else{
                    errorLarr.push(j);
                    resultLArr.push({
                        "readingListeningType": 2,
                        "mkQuestionTit": LBox.eq(j).find(".topicText").text(),
                        "mkQuestionId": LBox.eq(j).attr('id'),
                        "belongTopicName": LBox.eq(j).attr("belongtopicname"), // 问题归属 topicname
                        "isRight": 0,
                        "originalAnswer": LBox.eq(j).attr('radioAnswer'),
                        "rightAnswer": LBox.eq(j).attr('choice_answer')
                    });
                }
            }
            for(var i = 0; i < $(".autoPlaybox").length; i++){
                if(resultLArr[i].belongTopicName == "conversation 1"){
                    var contStr = "";
                    contStr += "<tr>" +
                               "<td class='f-tal'>" + resultLArr[i].mkQuestionTit + "</td>";
                               if(resultRArr[i].originalAnswer!=resultRArr[i].rightAnswer){
                              	 contStr+= "<td style='color:red'>" + resultRArr[i].originalAnswer + "</td>";
                               }else{
                              	 contStr+= "<td>" + resultRArr[i].originalAnswer + "</td>";
                               }
                               contStr+="<td>" + resultRArr[i].rightAnswer + "</td>" +
                               "</tr>";
                    $(".listen-table-01 tbody").append(contStr);
                }
                if(resultLArr[i].belongTopicName == "lecture 1"){
                    var contStr = "";
                    contStr += "<tr>" +
                               "<td class='f-tal'>" + resultLArr[i].mkQuestionTit + "</td>";
                                if(resultLArr[i].originalAnswer!=resultLArr[i].rightAnswer){
  			                   	 contStr+= "<td style='color:red'>" + resultLArr[i].originalAnswer + "</td>";
  			                    }else{
  			                   	 contStr+= "<td>" + resultLArr[i].originalAnswer + "</td>";
  			                    }
  			                    contStr+="<td>" + resultLArr[i].rightAnswer + "</td>" +
                               "</tr>";
                    $(".listen-table-02 tbody").append(contStr);
                }
                if(resultLArr[i].belongTopicName == "lecture 2"){
                    var contStr = "";
                    contStr += "<tr>" +
                               "<td class='f-tal'>" + resultLArr[i].mkQuestionTit + "</td>";
                               if(resultLArr[i].originalAnswer!=resultLArr[i].rightAnswer){
  			                   	 contStr+= "<td style='color:red'>" + resultLArr[i].originalAnswer + "</td>";
  			                    }else{
  			                   	 contStr+= "<td>" + resultLArr[i].originalAnswer + "</td>";
  			                    }
  			                    contStr+="<td>" + resultLArr[i].rightAnswer + "</td>" +
                               "</tr>";
                    $(".listen-table-03 tbody").append(contStr);
                }
                if(resultLArr[i].belongTopicName == "conversation 2"){
                    var contStr = "";
                    contStr += "<tr>" +
                               "<td class='f-tal'>" + resultLArr[i].mkQuestionTit + "</td>";
                               if(resultLArr[i].originalAnswer!=resultLArr[i].rightAnswer){
  			                   	 contStr+= "<td style='color:red'>" + resultLArr[i].originalAnswer + "</td>";
  			                    }else{
  			                   	 contStr+= "<td>" + resultLArr[i].originalAnswer + "</td>";
  			                    }
  			                    contStr+="<td>" + resultLArr[i].rightAnswer + "</td>" +
                               "</tr>";
                    $(".listen-table-04 tbody").append(contStr);
                }
                if(resultLArr[i].belongTopicName == "lecture 3"){
                    var contStr = "";
                    contStr += "<tr>" +
                               "<td class='f-tal'>" + resultLArr[i].mkQuestionTit + "</td>";
                               if(resultLArr[i].originalAnswer!=resultLArr[i].rightAnswer){
  			                   	 contStr+= "<td style='color:red'>" + resultLArr[i].originalAnswer + "</td>";
  			                    }else{
  			                   	 contStr+= "<td>" + resultLArr[i].originalAnswer + "</td>";
  			                    }
  			                    contStr+="<td>" + resultLArr[i].rightAnswer + "</td>" +
                               "</tr>";
                    $(".listen-table-05 tbody").append(contStr);
                }
                if(resultLArr[i].belongTopicName == "lecture 4"){
                    var contStr = "";
                    contStr += "<tr>" +
                               "<td class='f-tal'>" + resultLArr[i].mkQuestionTit + "</td>";
                               if(resultLArr[i].originalAnswer!=resultLArr[i].rightAnswer){
  			                   	 contStr+= "<td style='color:red'>" + resultLArr[i].originalAnswer + "</td>";
  			                    }else{
  			                   	 contStr+= "<td>" + resultLArr[i].originalAnswer + "</td>";
  			                    }
  			                    contStr+="<td>" + resultLArr[i].rightAnswer + "</td>" +
                               "</tr>";
                    $(".listen-table-06 tbody").append(contStr);
                }
            }

            // 口语答案数据
            for(var i = 0; i < recordArr.length; i++){
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
            for(var i = 0; i < recordArr.length; i++){
                resultSArr.push({
                    "mkType": 4, // 模考类型：1-阅读 2-听力 3-写作 4—口语 5-整套
                    "mkQuestionId": SBox.eq(i).attr('topicid'), // 问题 ID
                    "mkTpoId": xm.tpoId,
                    "speakUrl": recordArr[i] // 用户答案
                });
            }
            speakingResult = {
                "speakingAnswer": resultSArr, // 答案
                "tpoId": xm.tpoId, // tpoID
                "type": 5 // 类型：1-阅读 2-听力 3-写作 4—口语 5-整套
            };
            xm.speakPlayer();

            // 写作答案数据
            for (var i = 0; i < WBox.length; i++) {
                resultWArr.push({
                    "mkType": 3, // 模考类型：1-阅读 2-听力 3-写作 4—口语 5-整套
                    "mkQuestionTit": WBox.eq(i).find(".head-content").text(), // 问题题目标题
                    "mkQuestionId": WBox.eq(i).attr('topicid'), // 问题 ID
                    "mkQuestionType": WBox.eq(i).attr('type'), // 问题类型：1-独立 2-综合
                    "writeAnswer": WBox.eq(i).find(".writing-editor").val() // 用户答案
                });
            }
            for (var i = 0; i < WBox.length; i++) {
                if(resultWArr[i].mkQuestionType == 1){
                    independentWBox.find(".write-ques").html(resultWArr[i].mkQuestionTit);
                    independentWBox.find(".write-answer").html(resultWArr[i].writeAnswer);
                }
                if(resultWArr[i].mkQuestionType == 2){
                    integratedWBox.find(".write-ques").html(resultWArr[i].mkQuestionTit);
                    integratedWBox.find(".write-answer").html(resultWArr[i].writeAnswer);
                }
            }
            completeResult = {
                "readingAnswer": resultRArr,
                "listeningAnswer": resultLArr,
                "speakingAnswer": resultSArr,
                "writingAnswer": resultWArr,
                "score": 20 * rightRArr.length + 20 * rightLArr.length,
                "rightCount" : rightRArr.length + rightLArr.length,
                "totalCount" : RBox.length + LBox.length + SBox.length + WBox.length,
                "tpoId": xm.tpoId, // tpoID
                "type": 5, // 类型：1-阅读 2-听力 3-写作 4—口语 5-整套
                "dayId":xm.dayId,
                "exerciseId":xm.exerciseId
            };
        },
        submit: function() {
                $.ajax({
                    url: xm.baseURL + "/mkSingleAnswer/tpos/save/listeningandreadinganswer.action",
                    type: "POST",
                    contentType: 'application/json;charset=UTF-8',
                    data: JSON.stringify(completeResult),
                    dataType: 'json',
                    success: function(data) {
                        alert(data.message);
                        window.location.href = "index";

                    },
                    error: function(jqXHR, error, errorThrown){
    	                var status_code = jqXHR.status
    		                if(status_code==401)
    		                {
    		                	alert("未登录,不能保存");
    		                }
    		       }
                })
        }
    })
})();
