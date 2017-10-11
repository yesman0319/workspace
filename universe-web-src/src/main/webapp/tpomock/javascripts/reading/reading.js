(function() {
    $.extend(xm, {
        initPage: function() {
            //解析URL
            xm.analysisUrl();
            //判断是否为登录状态
            xm.readIndex = 0;
            //防止重复提交表单变量
            xm.flag = false;
            //多选全局变量
            xm.str = "";
            // 声明阅读篇章总数
            xm.passageCount = 0;
        },
        analysisUrl: function(){
            url = window.location.href;
            xm.tpoId = Utils.getUrlParam(url, "tpoId");
            xm.seqNum=Utils.getUrlParam(url, "seqNum");
            xm.dayId=Utils.getUrlParam(url, "dayid")==null?0:Utils.getUrlParam(url, "dayid");
            xm.exerciseId = Utils.getUrlParam(url, "exerciseid")==null?0:Utils.getUrlParam(url, "exerciseid");
            if(xm.tpoId){
                $("title").text("TPO" + xm.seqNum + "阅读在线模拟--精英计划中心");
                $(".tpoTit").text(xm.seqNum);
                //初始化数据
                xm.initForm();
            }
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
        initForm: function() {
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
                                                } else if(value.answerType ==3){ // 插入题
                                                    replaceNum += "|&|" + value.replacePart[l].replaceNum;
                                                    replaceContent += "|&|" + value.replacePart[l].replaceContent;
                                                    break;
                                                }
                                            }
                                        } else {
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
                                            //dataStr += "<div id='" + value.id + "' class='main auto insert-topic box view-bj switch-box' replaceContent='" + replaceContent + "' replaceNum='" + replaceNum + "' _topic='" + i + "' radioAnswer='' choice_answer='" + value.answer + "'>" +
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
                                                            '<a class="target" href="javascript:;"></a>' +
                                                            '<a class="target" href="javascript:;"></a>' +
                                                            '<a class="target" href="javascript:;"></a>' +
                                                        '</li>' +
                                                        '<li>' +
                                                            '<p>Nonaggressive Stingless Bess</p>' +
                                                            '<a class="target" href="javascript:;"></a>' +
                                                            '<a class="target" href="javascript:;"></a>' +
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
                            Dragdrop($('.Dragdrop-topic:eq(0)'));
                            Dragdrop($('.Dragdrop-topic:eq(1)'));
                            Dragdrop($('.Dragdrop-topic:eq(2)'));
                            //绑定事件
                            xm.bindEvent();
                            xm.readClickChoose();
                        },
                        error: function(XMLHttpRequest, textStatus, errorThrown) {
                            console.log("XMLHttpRequest.status: " + XMLHttpRequest.status);
                            console.log("XMLHttpRequest.readyState: " + XMLHttpRequest.readyState);  
                            console.log("textStatus: " + textStatus);
                            console.log(123);
                        }
                    });
                },
                error: function(XMLHttpRequest, textStatus, errorThrown) {
                    console.log("XMLHttpRequest.status: " + XMLHttpRequest.status);
                    console.log("XMLHttpRequest.readyState: " + XMLHttpRequest.readyState);  
                    console.log("textStatus: " + textStatus);
                    console.log(321);
                }
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
                    var replaceNumArr = replaceNum.split("|&|");
                    var replaceContentArr = replaceContent.split("|&|");
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
                $r_Next = $(this).find('.JS_next'),
                    $r_Blak = $(this).find('.JS_back'),
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
                $r_Next.live('click', function() {
                    if ($(".wrap").find(".main").eq(xm.readIndex+1).hasClass("Dragdrop-topic")) {
                        $(".JS_viewtext").removeClass("f-dn");
                        $(".JS_viewtext").click(function() {
                            if($(".wrap").find(".main").eq(xm.readIndex).attr("_topic") == 0){
                                $(".wrap").find(".Reading").eq(0).show();
                                $(this).addClass("f-dn");
                                $(".JS_viewques").removeClass("f-dn");
                                $(".u-btn-fn").attr("disabled", true);
                            }
                            if($(".wrap").find(".main").eq(xm.readIndex).attr("_topic") == 1){
                                $(".wrap").find(".Reading").eq(1).show();
                                $(this).addClass("f-dn");
                                $(".JS_viewques").removeClass("f-dn");
                                $(".u-btn-fn").attr("disabled", true);
                            }
                            if($(".wrap").find(".main").eq(xm.readIndex).attr("_topic") == 2){
                                $(".wrap").find(".Reading").eq(2).show();
                                $(this).addClass("f-dn");
                                $(".JS_viewques").removeClass("f-dn");
                                $(".JS_next").hide();
                                $(".u-btn-fn").attr("disabled", true);
                            }
                        });
                        $(".JS_viewques").click(function() {
                            if($(".wrap").find(".main").eq(xm.readIndex).attr("_topic") == 0){
                                $(".wrap").find(".Reading").eq(0).hide();
                                $(this).addClass("f-dn");
                                $(".JS_viewtext").removeClass("f-dn");
                                $(".u-btn-fn").attr("disabled", false);
                            }
                            if($(".wrap").find(".main").eq(xm.readIndex).attr("_topic") == 1){
                                $(".wrap").find(".Reading").eq(1).hide();
                                $(this).addClass("f-dn");
                                $(".JS_viewtext").removeClass("f-dn");
                                $(".u-btn-fn").attr("disabled", false);
                            }
                            if($(".wrap").find(".main").eq(xm.readIndex).attr("_topic") == 2){
                                $(".wrap").find(".Reading").eq(2).hide();
                                $(this).addClass("f-dn");
                                $(".JS_viewtext").removeClass("f-dn");
                                $(".u-btn-fn").attr("disabled", false);
                            }
                        });
                    } else {
                        $(".JS_viewtext").addClass("f-dn");
                    }
                    // 清空拖放选择题答案数组
                    dragAnswerArr = [];
                    // 文章阅读是否完成判断
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
                        $(".JS_viewtext").removeClass("f-dn");
                    } else {
                        $(".JS_viewtext").addClass("f-dn");
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
                        $(".JS_review").attr("disabled",false);
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
                        $(".JS_review").attr("disabled",true);
                    }
                    xm.str = "";
                }
            });
        },
        bindEvent: function() {
            // 介绍页Continue按钮
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
            // 关闭弹窗
            $(".JS_pop_close").click(function() {
                if($(".wrap").css("display") != "none"){
                    startTime();
                }
                $(".m-pop-massage").hide();
                $(".m-pop-pause").hide();
                $(".mask-bg").hide();
                $(".JS_read_pause").html($(".JS_read_pause").html() == "暂停" ? "继续" : "暂停");
            });
            $(".JS_pop_timeout").click(function() {
                xm.readAnswerShow();
                $(".mask-bg").hide();
                $(".m-pop-timeout").hide();
                $(".wrap").hide();
                $(".read-result").removeClass("f-dn");
            });
            $(".JS_read_submit").on("click", function() {
                xm.readAnswerShow();
                $(".wrap").hide();
                $(".read-result").removeClass("f-dn");
            });
            $(".JS_read_result").click(function() {
                if (!xm.flag) {
                    xm.submit();
                    xm.flag = true;
                } else {
                    return;
                }
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
        readAnswerShow: function() {
            var resultRArr = [], // 阅读答题结果数组
                rightRArr = [], // 阅读正确答案数组
                errorRarr = []; // 阅读错误答案数组
            // 拖拽题答案
            xm.setDrapStr($('.Dragdrop-topic:eq(0)'));
            xm.setDrapStr($('.Dragdrop-topic:eq(1)'));
            xm.setDrapStr($('.Dragdrop-topic:eq(2)'));

            // 传给后台的数据
            var RBox = $('.wrap .switch-box');
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
            // 输出结果页
            for(var i = 0; i < RBox.length; i++){
                if(i>0 &&　i<14){
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
                if(i>=14 && i<28){
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
                if(i>=28 && i<=42){
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
            readingResult = {
                "readingAnswer": resultRArr, // 答案
                "tpoId": xm.tpoId, // tpoID
                "score": 20 * rightRArr.length, // 答题得分
                "rightCount": rightRArr.length, // 正确总数
                "totalCount": RBox.length, // 问题总数
                "type": 1, // 类型：1-阅读 2-听力 3-写作 4—口语 5-整套
                "dayId":xm.dayId,
                "exerciseId":xm.exerciseId
            };
        },
        submit: function() {
                $.ajax({
                    url: xm.baseURL + "/mkSingleAnswer/tpos/save/listeningandreadinganswer.action",
                    type: "POST",
                    contentType: 'application/json;charset=UTF-8',
                    data: JSON.stringify(readingResult),
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
            
        },
        setDrapStr: function(parent) {
            var dstr = '';
            var target = parent.find('.target');
            target.each(function() {
                dstr += $(this).attr('_options');
            })
            parent.attr('radioAnswer', dstr);
        }
    })
})();
