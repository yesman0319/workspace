(function() {
    $.extend(xm, {
        initPage: function() {
            //判断是否为登录状态
            xm.checkLoginStatus();
            //初始化数据
            xm.initForm();
            //绑定事件
            xm.bindEvent();
            xm.index = 0;
            //防止重复提交表单变量
            xm.flag = false;
            //多选全局变量
            xm.str = "";
            // 声明阅读篇章总数
            xm.passageCount = 0;
        },
        queryString: function(name) {
            name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
            var regexS = "[\\?&]" + name + "=([^&#]*)";
            var regex = new RegExp(regexS);
            var results = regex.exec(window.location.search);
            if (results == null) {
                return "";
            } else {
                return decodeURIComponent(results[1].replace(/\+/g, " "));
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
            $("title").text("TPO" + xm.queryString("tpoId") + "阅读在线模拟--精英计划中心");
            $(".tpoTit").text(xm.queryString("tpoId"));
            $("#mkTpoId").val(parseInt(xm.queryString("tpoId")));
            $.ajax({
                url: xm.baseURL + "/tpo/service/mock/tpos/" + parseInt(xm.queryString("tpoId")) + "/readings",
                success: function(passages) {
                    $.ajax({
                        url: xm.baseURL + "/tpo/service/mock/tpos/" + parseInt(xm.queryString("tpoId")) + "/reading/questions",
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
                            //document.write(passageArr);
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
                                var questionCount = xm.passageCount * count;
                                // 输出文章内容
                                for (var j in passages.readings[i].paragraphs) {
                                    contentStr += '<p _Paragraph="' + j + '">' + passages.readings[i].paragraphs[j] + '</p>';
                                }
                                // 输出查看文章页
                                /*dataStr += '<div class="main auto box Reading view-bj" _index="' + i + '">' +
                                    <div class="main-content auto">' +
                                    <div class="view-l-box fl" style="visibility: hidden;">' +
                                    </div>' +
                                    <div class="view-r-box fl">' +
                                    <h2 class="f24 c3 Q-title tc">' + passages.readings[i].title + '</h2>' +
                                    <div class="lh26 c3 f16 QuestionText rbox">' + contentStr + '</div>' +
                                    </div>' +
                                    </div>' +
                                    </div>';*/
                                dataStr += '<div class="m-ques main auto box Reading view-bj" _index="' + i + '">' +
                                        '<div class="ques-cnt f-cb">' +
                                            '<div class="ques-topic f-fl view-l-box"></div>' +
                                            '<div class="ques-desc f-fr view-r-box">' +
                                                '<h3 class="desc-tit">' + passages.readings[i].title + '</h3>' +
                                                contentStr +
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
                                        for (var m in passages.readings[i].paragraphs) {
                                            // 如果replaceContent == null，整个段落为关键句
                                            if (value.replacePart[l].replaceContent == null && value.replacePart[l].replaceNum == m) {
                                                replaceContent = "{{"+passages.readings[i].paragraphs[m]+"}}";
                                                break;
                                            }else{
                                                replaceContent = value.replacePart[l].replaceContent;
                                            }
                                            replaceNum = value.replacePart[l].replaceNum;
                                        }
                                    }
                                    if (value.passageNum == passages.readings[i].passageNum) {
                                        if (value.answerType == 1) {
                                            /*dataStr += '<div id="' + value.id + '" class="main auto radio-topic box view-bj switch-box" type="' + value.answerType + '" replaceContent="' + replaceContent + '" replaceNum="' + replaceNum + '" _topic="' + i + '" _index="' + i + '"  radioAnswer="" choice_answer="' + value.answer + '">' +
                                                '<div class="main-content auto">' +
                                                '<div class="view-l-box fl">' +
                                                '<h2 class="Question-title">' +
                                                '<span class="QuestionIcon f22 tc cf fb">Question ' + questionNum + ' of ' + questionCount + '</span>' +
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
                                                '<h2 class="fixedTitle">' + passages.readings[i].title + '</h2>' +
                                                '<div class="lh26 c3 f16 QuestionText rbox">' + contentStr + '</div>' +
                                                '</div>' +
                                                '</div>' +
                                                '</div>';*/
                                            
                                            dataStr += '<div class="m-ques main auto radio-topic box view-bj switch-box" id="' + value.id + '" type="' + value.answerType + '" replaceContent="' + replaceContent + '" replaceNum="' + replaceNum + '" _topic="' + i + '" _index="' + i + '" radioAnswer="" choice_answer="' + value.answer + '">' +
                                                '<div class="ques-cnt f-cb">' +
                                                    '<div class="ques-topic f-fl view-l-box">' +
                                                        '<p class="ques-num">Question ' + questionNum + ' of ' + questionCount + '</p>' +
                                                        '<p class="ques-tit">' + xm.replaceCurly(value.question) + '</p>' +
                                                        '<ul class="ques-list">' +
                                                            '<li><span class="u-icon u-icon-radio" options="A"></span>' + value.optionA + '</li>' +
                                                            '<li><span class="u-icon u-icon-radio" options="B"></span>' + value.optionB + '</li>' +
                                                            '<li><span class="u-icon u-icon-radio" options="C"></span>' + value.optionC + '</li>' +
                                                            '<li><span class="u-icon u-icon-radio" options="D"></span>' + value.optionD + '</li>' +
                                                        '</ul>' +
                                                    '</div>' +
                                                    '<div class="ques-desc f-fr view-r-box">' +
                                                        '<h3 class="desc-tit f-dn">' + passages.readings[i].title + '</h3>' +
                                                        contentStr +
                                                    '</div>' +
                                                '</div>' +
                                            '</div>';
                                        }
                                        if (value.answerType == 2) {
                                            /*dataStr += '<div id="' + value.id + '" class="main auto radio-topic box view-bj switch-box" type="' + value.answerType + '" replaceContent="' + replaceContent + '" replaceNum="' + replaceNum + '" _topic="' + i + '" _index="' + i + '" radioAnswer="" choice_answer="' + value.answer + '">' +
                                                '<div class="main-content auto">' +
                                                '<div class="view-l-box fl">' +
                                                '<h2 class="Question-title">' +
                                                '<span class="QuestionIcon f22 tc cf fb">Question ' + questionNum + ' of ' + questionCount + '</span>' +
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
                                                '<h2 class="fixedTitle">' + passages.readings[i].title + '</h2>' +
                                                '<div class="lh26 c3 f16 QuestionText rbox">' + contentStr + '</div>' +
                                                '</div>' +
                                                '</div>' +
                                                '</div>';*/
                                            dataStr += '<div class="m-ques main auto radio-topic box view-bj switch-box" id="' + value.id + '" type="' + value.answerType + '" replaceContent="' + replaceContent + '" replaceNum="' + replaceNum + '" _topic="' + i + '" _index="' + i + '" radioAnswer="" choice_answer="' + value.answer + '">' +
                                                '<div class="ques-cnt f-cb">' +
                                                    '<div class="ques-topic f-fl view-l-box">' +
                                                        '<p class="ques-num">Question ' + questionNum + ' of ' + questionCount + '</p>' +
                                                        '<p class="ques-tit">' + xm.replaceCurly(value.question) + '</p>' +
                                                        '<ul class="ques-list">' +
                                                            '<li><span class="u-icon u-icon-radio" options="A"></span>' + value.optionA + '</li>' +
                                                            '<li><span class="u-icon u-icon-radio" options="B"></span>' + value.optionB + '</li>' +
                                                            '<li><span class="u-icon u-icon-radio" options="C"></span>' + value.optionC + '</li>' +
                                                            '<li><span class="u-icon u-icon-radio" options="D"></span>' + value.optionD + '</li>' +
                                                        '</ul>' +
                                                    '</div>' +
                                                    '<div class="ques-desc f-fr view-r-box">' +
                                                        '<h3 class="desc-tit f-dn">' + passages.readings[i].title + '</h3>' +
                                                        contentStr +
                                                    '</div>' +
                                                '</div>' +
                                            '</div>';
                                        }
                                        if (value.answerType == 3) {
                                            /*dataStr += '<div id="' + value.id + '" class="main auto insert-topic box view-bj switch-box" replaceContent="' + replaceContent + '" replaceNum="' + replaceNum + '" _topic="' + i + '" _index="' + i + '" radioAnswer="" choice_answer="' + value.answer + '">' +
                                                '<div class="main-content auto">' +
                                                '<div class="view-l-box fl">' +
                                                '<h2 class="Question-title">' +
                                                '<span class="QuestionIcon f22 tc cf fb">Question ' + questionNum + ' of ' + questionCount + '</span>' +
                                                '</h2>' +
                                                '<p class="Question ln26 f16 c3">' + value.question.replace(/[\u2588]/, '<span class="insert"></span>') + '</p>' +
                                                '<p class="insertText ln26 f16 c3 fb">' + value.insertSentence + '</p>' +
                                                '</div>' +
                                                '<div class="view-r-box fl">' +
                                                '<h2 class="f24 c3 Q-title tc fixedTitle">' + passages.readings[i].title + '</h2>' +
                                                '<div class="lh26 c3 f16 QuestionText rbox">' + contentStr + '</div>' +
                                                '</div>' +
                                                '</div>' +
                                                '</div>';*/
                                            dataStr += '<div class="m-ques main auto insert-topic box view-bj switch-box" id="' + value.id + '" replaceContent="' + replaceContent + '" replaceNum="' + replaceNum + '" _topic="' + i + '" _index="' + i + '" radioAnswer="" choice_answer="' + value.answer + '">' +
                                                '<div class="ques-cnt f-cb">' +
                                                    '<div class="ques-topic f-fl view-l-box">' +
                                                        '<p class="ques-num">Question ' + questionNum + ' of ' + questionCount + '</p>' +
                                                        '<p class="ques-tit">' + value.question.replace(/[\u2588]/, '<span class="insert"></span>') + '</p>' +
                                                        '<p class="ques-insertTxt insertText">' + value.insertSentence + '</p>' +
                                                    '</div>' +
                                                    '<div class="ques-desc f-fr view-r-box">' +
                                                        '<h3 class="desc-tit f-dn">' + passages.readings[i].title + '</h3>' +
                                                        contentStr +
                                                    '</div>' +
                                                '</div>' +
                                            '</div>';
                                        }
                                        if (value.answerType == 4) {
                                            dataStr += '<div id="' + value.id + '" class="main auto Dragdrop-topic box view-bj switch-box" _topic="' + i + '" _index="' + i + '" radioAnswer="" choice_answer="' + value.answer + '">' +
                                                '<div class="main-content auto">' +

                                                '<h2 class="Question-title">' +
                                                '<span class="QuestionIcon f22 tc cf fb">Question ' + questionNum + ' of ' + questionCount + '</span>' +
                                                '</h2>' +
                                                '<p class="lh26 c3 f16 drapText">' + value.question + '</p>' +

                                                '<div class="textarea-box auto">' +
                                                '<textarea class="sort-target target mb12" _options="" readonly="readonly"></textarea>' +
                                                '<textarea class="sort-target target mb12" _options="" readonly="readonly"></textarea>' +
                                                '<textarea class="sort-target target" _options="" readonly="readonly"></textarea>' +
                                                '</div>' +
                                                '<h2 class="read-title f24 tc c3">Answer Choices</h2>' +
                                                '<div class="drapWrap">' +
                                                '<ul class="drapList">' +
                                                '<li>' +
                                                '<div class="new_tf_back drag" id="A" index="0" text="' + value.optionA + '">' +
                                                '<div class="sn-box fl">A</div>' +
                                                '<div class="nt-box fl">' + value.optionA + '</div>' +
                                                '</div>' +
                                                '</li>' +
                                                '<li>' +
                                                '<div class="new_tf_back drag" id="B" index="1" text="' + value.optionB + '">' +
                                                '<div class="sn-box fl">B</div>' +
                                                '<div class="nt-box fl">' + value.optionB + '</div>' +
                                                '</div>' +
                                                '</li>' +
                                                '<li>' +
                                                '<div class="new_tf_back drag" id="C" index="2" text="' + value.optionC + '">' +
                                                '<div class="sn-box fl">C</div>' +
                                                '<div class="nt-box fl">' + value.optionC + '</div>' +
                                                '</div>' +
                                                '</li>' +
                                                '<li>' +
                                                '<div class="new_tf_back drag" id="D" index="3" text="' + value.optionD + '">' +
                                                '<div class="sn-box fl">D</div>' +
                                                '<div class="nt-box fl">' + value.optionD + '</div>' +
                                                '</div>' +
                                                '</li>' +
                                                '<li>' +
                                                '<div class="new_tf_back drag" id="E" index="4" text="' + value.optionE + '">' +
                                                '<div class="sn-box fl">E</div>' +
                                                '<div class="nt-box fl">' + value.optionE + '</div>' +
                                                '</div>' +
                                                '</li>' +
                                                '<li>' +
                                                '<div class="new_tf_back drag" id="F" index="5" text="' + value.optionF + '">' +
                                                '<div class="sn-box fl">F</div>' +
                                                '<div class="nt-box fl">' + value.optionF + '</div>' +
                                                '</div>' +
                                                '</li>' +
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
                            xm.sheetHandle();
                            
                            // 获取窗口尺寸，返回数组
                            function getWindowSize() {
                                var size = null,
                                    sizeArr = new Array();
                                if(!Array.prototype.map){
                                    Array.prototype.map = function(fn,scope) {
                                        var result = [],ri = 0;
                                        for (var i = 0,n = this.length; i < n; i++){
                                            if(i in this){
                                                result[ri++]  = fn.call(scope ,this[i],i,this);
                                            }
                                        }
                                        return result;
                                    };
                                }
                                var size = ["Width","Height"].map(function(name){
                                    return window["inner"+name] || document.compatMode === "CSS1Compat" && document.documentElement[ "client" + name ] || document.body[ "client" + name ]
                                });
                                return sizeArr = size.toString().split(",");
                            }
                            
                            (function() {
                                if(!+"\v1" && !document.querySelector) { // for IE6 IE7
                                    document.body.onresize = resize;
                                } else {
                                    window.onresize = resize;
                                }
                                function resize() {
                                    winSize();
                                    return false;
                                }
                            } ());
                            function winSize() {
                                var wdSize,
                                    htSize,
                                    sizeArr = getWindowSize(),
                                    topHeight = $(".m-top").height();
                                wdSize = sizeArr[0],
                                htSize = sizeArr[1] - topHeight;
                                $(".m-ques").height(htSize);
                                $(".m-ques .ques-topic").height(htSize);
                                $(".m-ques .ques-desc").height(htSize);
                            }
                            winSize();
                        }
                    });
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
                $p.each(function() {
                    if ($(this).attr('_paragraph') == replaceNum && $.trim(replaceContent) !== '' && $.trim("{{"+$(this).text())+"}}" !== $.trim(replaceContent)) {
                        $(this).html(xm.replaceCurly(replaceContent));
                        var str = $(this).html();
                        $(this).html('<span class="tag">♦</span>' + str);
                    }
                    if ($(this).attr('_paragraph') == replaceNum && $.trim("{{"+$(this).text())+"}}" == $.trim(replaceContent)) {
                        var str = $(this).html();
                        $(this).html('<span class="tag">♦</span>' + str);
                    }
                });
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
                if (replaceNum > 0) {
                    var $p = $rightBox.find('p');
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
                        $(this).addClass('no').html($insertText.text()).siblings().removeClass('no').html('');
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
                //parent.find('.fixedTitle').css('top',parent.scrollTop());
            } else if (parent.find('.insert').length > 0) {
                insert = parent.find('.insert:eq(0)');
                parent.scrollTop(insert.offset().top - parent.offset().top - 130);
                //parent.find('.fixedTitle').css('top',parent.scrollTop());
            } else if (parent.find('.tag').length > 0) {
                tag = parent.find('.tag:eq(0)');
                parent.scrollTop(tag.offset().top - parent.offset().top - 130);
                //parent.find('.fixedTitle').css('top',parent.scrollTop());
            } else if (parent.find('.block').length > 0 && parent.find('.tag').length > 0) {
                block = parent.find('.block');
                parent.scrollTop(block.offset().top - parent.offset().top - 130);
            } else if (parent.find('.insert').length > 0 && parent.find('.tag').length > 0) {
                insert = parent.find('.insert:eq(0)');
                parent.scrollTop(insert.offset().top - parent.offset().top - 130);
            }
        },
        //答题卡
        sheetHandle: function() {
            /*var reList = $('.reList');
            var box = $('.box');
            $('.sheet-head').on('click', function() {
                $('.sheet-box').toggle();
            });
            var bStr = '';
            for (var i = 0, len = box.length; i < len; i++) {
                bStr += '<li><a href="javascript:;">' + (i + 1) + '</a></li>'
            }
            reList.eq(0).html(bStr);
            var $readingLi = $('.re-box').eq(0).find('li');
            var $readingBox = $('.wrap').find('.box');
            var len = $readingBox.length;
            $readingLi.on('click', function() {
                xm.index = $(this).index();
                $(this).parent('.sheet-box').hide();
                $('.sheet-box').hide();
                $readingBox.eq(xm.index).show().siblings('.box').hide();
                if (xm.index > 0) {
                    $('.r_Blak').removeClass('no');
                    $('.blakMark').hide();
                    $('.nextbox').show();
                    $('.submit').hide();
                }
                if (xm.index == 0) {
                    $('.r_Blak').addClass('no');
                    $('.blakMark').show();
                    $('.nextbox').show();
                    $('.submit').hide();
                }
                if (xm.index < len - 1) {
                    $('.r_Next').removeClass('no');
                    $('.nextMark').hide();
                    $('.nextbox').show();
                    $('.submit').hide();
                }
                if (xm.index == len - 1) {
                    $('.nextbox').hide();
                    $('.submit').show();
                }

                if ($readingBox.eq(xm.index).find('.fixedTitle')) {
                    $('.wrap .title').html('Reading Passage ' + (parseInt($readingBox.eq(xm.index).attr('_index'), 10) + 1) + '&nbsp;&nbsp;&nbsp;' + $readingBox.eq(xm.index).find('.fixedTitle').text());
                } else {
                    $('.wrap').find('.title').html('Reading Passage ' + (parseInt($readingBox.eq(xm.index).attr('_index'), 10) + 1));
                }
            });*/
        },
        //阅读题切换
        ReadingSwitchPage: function() {
            var $parent = $('.wrap');
            $parent.each(function() {
                $r_Next = $(this).find('.JS_next'),
                    $r_Blak = $(this).find('.JS_back'),
                    $box = $('.box'),
                    len = $('.box').length;
                if (xm.index == 0) {
                    $('.top-chapter-num').removeClass("f-dn");
                    $('.top-question-num').addClass("f-dn");
                }
                $r_Next.bind('click', function() {
                    $('.top-chapter-num').addClass("f-dn");
                    $('.top-question-num').removeClass("f-dn");
                    if (xm.index == 0 || xm.index == 15 || xm.index == 30) {
                        var scrollNum = $(".view-r-box").scrollTop()>=$(".view-r-box")[0].scrollHeight-$(".view-r-box").height();
                        if(!scrollNum){
                            stopTime();
                            $(".mask-bg").show();
                            $(".m-pop").show();
                            $('.top-chapter-num').removeClass("f-dn");
                            $('.top-question-num').addClass("f-dn");
                            return;
                        }
                    }
                    if (xm.index == 14 || xm.index == 29) {
                        $('.top-question-num').addClass("f-dn");
                        $('.top-chapter-num').removeClass("f-dn");
                        $('.top-chapter-num').html('Passage ' + (parseInt($('.box').eq(xm.index+1).attr('_index'), 10) + 1) + ' of ' + xm.passageCount);
                    }
                    xm.index++;
                    btn();
                    $('.box').hide();
                    $('.box').eq(xm.index).show();
                    /*$('.wrap').find('.title').html('Reading Passage ' + (parseInt($('.box').eq(xm.index).attr('_index'), 10) + 1));
                    if ($box.eq(xm.index).find('.fixedTitle')) {
                        var str = $('.wrap .title').text();
                        $('.wrap .title').html(str + '&nbsp;&nbsp;&nbsp;' + $('.box').eq(xm.index).find('.fixedTitle').text());
                    }*/
                });
                $r_Blak.bind('click', function() {
                    console.log(xm.index);
                    if (xm.index == 1 || xm.index == 16 || xm.index == 31) {
                        $('.top-question-num').addClass("f-dn");
                        $('.top-chapter-num').removeClass("f-dn");
                    }
                    if (xm.index == 15 || xm.index == 30) {
                        $('.top-chapter-num').addClass("f-dn");
                        $('.top-question-num').removeClass("f-dn");
                        $('.top-chapter-num').html('Passage ' + (parseInt($('.box').eq(xm.index-1).attr('_index'), 10) + 1) + ' of ' + xm.passageCount);
                    }
                    xm.index--;
                    btn();
                    $('.box').hide();
                    $('.box').eq(xm.index).show();
                });

                function btn() {
                    if (xm.index == $('.box').length - 1) {
                        $r_Next.hide();///
                        //$('.nextbox').hide();
                        $('.JS_submit').removeClass("f-dn");
                        return;
                    }
                    if (xm.index > 0) {
                        $r_Blak.attr("disabled",false);///
                        $(".JS_review").attr("disabled",false);///
                        $r_Next.show();///
                        $(".JS_viewtext").addClass("f-dn");///
                        //$r_Blak.removeClass('no');
                        //$('.blakMark').hide();
                        //$('.nextbox').show();
                        $('.JS_submit').addClass("f-dn");
                    }
                    if (xm.index == 0) {
                        $r_Blak.attr("disabled",true);///
                        $r_Next.show();///
                        $(".JS_viewtext").addClass("f-dn");///
                        //$r_Blak.addClass('no');
                        //$('.blakMark').show();
                        //$('.nextbox').show();
                        $('.JS_submit').addClass("f-dn");
                    }
                    if (xm.index < $('.box').length - 1) {
                        $r_Next.attr("disabled",false);///
                        $r_Next.show();///
                        //$r_Next.removeClass('no');
                        //$('.nextMark').hide();
                        //$('.nextbox').show();
                        $('.JS_submit').addClass("f-dn");
                    }
                    if (xm.index == 14 || xm.index == 29 || xm.index == 44) {
                        $(".JS_viewtext").removeClass("f-dn");///
                        $(".JS_viewtext").click(function() {
                            $('.indexWrap').show();
                            $('.indexWrap .JS_viewques').removeClass("f-dn");
                            $('.wrap').css('visibility', 'hidden');
                        });
                        $(".JS_viewques").click(function() {
                            $('.indexWrap').hide();
                            $('.wrap').css('visibility', 'visible');
                        });
                    } else {
                        $(".JS_viewtext").addClass("f-dn");///
                    }
                    if (xm.index == 15 || xm.index == 30 || xm.index == 45) {
                        $(".JS_review").attr("disabled",true);///
                    }
                    xm.str = "";
                }
            });
        },
        bindEvent: function() {
            // 介绍页Continue按钮
            $('.JS_desc_continue').on('click', function() {
                $('.p-desc').hide();
                xm.ReadingSwitchPage();
                $('.wrap').css('visibility', 'visible');
                startTime();
            });
            // 关闭弹窗
            $(".JS_pop_close").click(function() {
                startTime();
                $(".m-pop").hide();
                $(".mask-bg").hide();
            });
            $(".JS_submit").on("click", function() {
                if (!xm.flag) {
                    xm.submit();
                    xm.flag = true;
                } else {
                    return;
                }
            });
        },
        submit: function() {
            var body;
            var result = [];
            var readingArr = [],
                errorRarr = [],
                listeningArr = [],
                errorLarr = [];
            xm.setDrapStr($('.Dragdrop-topic:eq(0)'));
            xm.setDrapStr($('.Dragdrop-topic:eq(1)'));
            xm.setDrapStr($('.Dragdrop-topic:eq(2)'));
            //传给后台的数据
            var box = $('.wrap .switch-box');
            for (var i = 0; i < box.length; i++) {
                if (box.eq(i).attr('radioAnswer') === box.eq(i).attr('choice_answer')) {
                    readingArr.push(i);
                    result.push({
                        "readingListeningType": 1,
                        "mkQuestionId": box.eq(i).attr('id'),
                        "isRight": 1,
                        "originalAnswer": box.eq(i).attr('radioAnswer'),
                        "rightAnswer": box.eq(i).attr('choice_answer')
                    });
                } else {
                    errorRarr.push(i);
                    result.push({
                        "readingListeningType": 1,
                        "mkQuestionId": box.eq(i).attr('id'),
                        "isRight": "0",
                        "originalAnswer": box.eq(i).attr('radioAnswer'),
                        "rightAnswer": box.eq(i).attr('choice_answer')
                    });
                }
            }
            readingResult = {
                "readingAnswer": result,
                "tpoId": $("#mkTpoId").val(),
                "score": 20 * readingArr.length,
                "rightCount": readingArr.length,
                "totalCount": box.length,
                "type": 1,
            }
            body = {
                "tpoId": $("#mkTpoId").val(),
                "score": 20 * readingArr.length,
                "rightCount": readingArr.length,
                "totalCount": box.length
            };
            // $("#token").val(JSON.stringify(header));
            $('.databtn').val(JSON.stringify(result));
            // var href = window.location.href;
            // var token = href.split("&")[1].split("=")[1];
            // var userid = href.split("&")[3].split("=")[1];
            if (xm.isLogin) {
                $.ajax({
                    url: xm.baseURL + "/tpo/service/mock/tpos/save/" + Utils.getCookie("userid") + "/listeningandreadinganswer",
                    type: "POST",
                    contentType: 'application/json;charset=UTF-8',
                    data: JSON.stringify(readingResult),
                    dataType: 'json',
                    // headers: {"token" : token},
                    success: function(data) {
                        localStorage.totalCount = box.length;
                        localStorage.rightCount = readingArr.length;
                        localStorage.type = 1;
                        window.location.href = "finishtest.html?tpoId=" + $("#mkTpoId").val();
                    },
                    error: function(i) {}
                })
            } else {
                localStorage.tpoId = $("#mkTpoId").val();
                localStorage.obj = JSON.stringify(readingResult);
                localStorage.totalCount = box.length;
                localStorage.rightCount = readingArr.length;
                localStorage.type = 1;
                window.location.href = "login.html";
            }
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