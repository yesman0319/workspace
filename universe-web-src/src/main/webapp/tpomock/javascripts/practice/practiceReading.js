(function() {
    $.extend(xm, {
        initPage: function() {
            //判断是否为登录状态
            xm.checkLoginStatus();
            //解析URL
            xm.analysisUrl();
        },
        analysisUrl: function() {
            url = window.location.href;
            xm.mqId = Utils.getUrlParam(url, "tpo_question_id");
            xm.tpoId = Utils.getUrlParam(url, "tpo_id");
            xm.type = Utils.getUrlParam(url, "type");
            xm.passageNum = Utils.getUrlParam(url, "passageNum");
            //听力部分参数
            xm.sectionCode = Utils.getUrlParam(url, "sectionCode");
            xm.subjectType = Utils.getUrlParam(url, "subjectType");
            xm.subjectCode = Utils.getUrlParam(url, "subjectCode");
            if (xm.mqId) {
                //加载页面数据
                xm.initForm();
            }
        },
        getParams: function() {
            var params = {};
            if (xm.type == "TPO阅读") {
                params.type = 1;
                params.passageNum = xm.passageNum;
                params.questionNum = xm.mqId;
            } else {
                params.type = 2;
                params.sectionCode = xm.sectionCode;
                params.subjectType = xm.subjectType;
                params.subjectCode = xm.subjectCode;
                params.seqNum = xm.mqId;
            }
            params.tpoId = xm.tpoId;
            return params;
        },
        initForm: function() {
            var main = $(".main-content");
            var contentStr = "";
            if (xm.type == 'TPO阅读') {
                $.ajax({
                    url: xm.baseURL + "/tpo/service/mock/tpos/singleQuestion",
                    type: 'POST',
                    contentType: 'application/json;charset=UTF-8',
                    data: JSON.stringify(xm.getParams()),
                    success: function(data) {
                        contentStr += '<h2 class="fs f14 c23 crumb">' +
                            '<a href=""  class="c23">TPO 练习</a> > TPO ' + data.readingQuestion.mkTpoId + ' ' + data.readingQuestion.title +
                            '</h2>' +
                            '<div class="label-view fl mr12">' +
                            '<h3 class="f16 tc cf label-title">TPO 阅读</h3>'
                        for (var i = 0; i < data.passageAndQuestion.length; i++) {
                            contentStr += '<div class="TPO-box selection auto">' +
                                '<h3 class="f18 c3c fb select-title" data_id="' + data.passageAndQuestion[i].passageNum + '">Passage ' + data.passageAndQuestion[i].passageNum + '</h3>' +
                                '<ul class="select-list">';
                            for (var j = 0; j < data.passageAndQuestion[i].questionNums.length; j++) {
                                contentStr += '<li><a class="fs c3c tc f14" data_id="' + data.passageAndQuestion[i].questionNums[j] + '" href="practiceReading.html?tpo_question_id=' + data.passageAndQuestion[i].questionNums[j] + '&tpo_id=' + xm.tpoId + '&type=TPO阅读&passageNum=' + data.passageAndQuestion[i].passageNum + '">' + data.passageAndQuestion[i].questionNums[j] + '</a></li>';
                            }
                            contentStr += '</ul>' +
                                '</div>';
                        }
                        contentStr += '</div>' +
                            '<div class="content fr">' +
                            '<div class="fl options-box">' +
                            '<div class="option-wrap">' +
                            '   <h2 class="labelTitle">' +
                            '   <span class="fl">分类：</span>' +
                            '   <span class="cf fl labelIcon">' + data.readingQuestion.category + '</span>' +
                            '</h2>' +
                            '<p class="textTitle f14 c3">' + data.readingQuestion.questionNum + '.' + data.readingQuestion.question + '</p>' +
                            '<form action="" method="">' +
                            '<ul class="optionsList">' +
                            '<li class="f14 c3">' +
                            '<a class="radioIcon cp"></a>A.' + data.readingQuestion.optionA + '.' +
                            '<input type="radio" class="radioBtn">' +
                            '</li>' +
                            '<li class="f14 c3">' +
                            '<a class="radioIcon cp"></a>B.' + data.readingQuestion.optionB + '.' +
                            '<input type="radio" class="radioBtn">' +
                            '</li>' +
                            '<li class="f14 c3">' +
                            '<a class="radioIcon cp"></a>C.' + data.readingQuestion.optionC + '.' +
                            '<input type="radio" class="radioBtn">' +
                            '</li>' +
                            '<li class="f14 c3">' +
                            '<a class="radioIcon cp"></a>D.' + data.readingQuestion.optionD + '.' +
                            '<input type="radio" class="radioBtn">' +
                            '</li>' +
                            '</ul>' +
                            '</form>' +
                            '</div>' +
                            '<div class="viewAnswer cp">' +
                            '<p class="f12 cd7 tc">点击查看答案和解析</p>' +
                            '<span class="anIcon"></span>' +
                            '</div>' +
                            '<div class="text-box">' +
                            '<h2 class="t-title f14 c23 fs">文字解析：</h2>' +
                            '<p class="f14 fs answer">答案：<span class="cff fA">' + data.readingQuestion.answer + '</span></p>' +
                            '<p class="f14 c3">' + data.readingQuestion.analysis + '</p>' +
                            '<br>' +
                            '</div>' +
                            '</div>' +
                            '<div class="fl topic-box">' +
                            '<h2 class="labelTitle lb">' +
                            '<h2 class="labelTitle lb">' +
                            '<a class="fr labelIcon cf " href="javascript:;" id="ch">翻译</a>' +
                            '<a class="fr original labelIcon cf" href="javascript:;" id="en">原文</a>' +
                            '</h2>'
                        for (var i = 0; i < data.readingParagraph.contents.length; i++) {
                            contentStr += '<p class="f14 c3">' + data.readingParagraph.contents[i] + '</p>' +
                                '<p class="f14 c2 cn">' + data.readingParagraph.contentCns[i] + '</p>';
                        }
                        contentStr += '</div></div>';
                        main.html(contentStr);
                        xm.bindEvent();
                    }
                })
            } else {
                $.ajax({
                    url: xm.baseURL + "/tpo/service/mock/tpos/singleQuestion",
                    type: 'POST',
                    contentType: 'application/json;charset=UTF-8',
                    data: JSON.stringify(xm.getParams()),
                    success: function(data) {
                        contentStr += '<h2 class="fs f14 c23 crumb">' +
                            '<a href=""  class="c23">TPO 练习</a> > TPO ' + xm.tpoId + '&nbsp;Section' + data.listenAndQuestion.sectionCode + (data.listenAndQuestion.subjectType == 1 ? '&nbsp;Conversation' : '&nbsp;Lecture') + data.listenAndQuestion.subjectCode +
                            '</h2>' +
                            '<div class="label-view fl mr12">' +
                            '<h3 class="f16 tc cf label-title">TPO 听力</h3>';
                        for (var i = 0; i < data.sectionSubject.length; i++) {
                            contentStr += '<div class="TPO-box selection auto">' +
                                '<h2 class="f18 c3c fb select-title">Section ' + data.sectionSubject[i].sectionCode + '</h2>' +
                                '<div>' +
                                '<h3 class="f14 tc tm">' + (data.sectionSubject[i].subjectType == 1 ? 'Conversation' : 'Lecture') + data.sectionSubject[i].subjectCode + '</h3>' +
                                '<ul class="select-list">';
                            for (var j = 0; j < data.sectionSubject[i].seqNums.length; j++) {
                                contentStr += '<li><a class="fs c3c tc f14" data_id="' + data.sectionSubject[i].seqNums[j] + '" href="../html/practiceReading.html?type=TPO听力&tpo_id=' + xm.tpoId + '&sectionCode=' + data.sectionSubject[i].sectionCode + '&subjectType=' + data.sectionSubject[i].subjectType + '&subjectCode=' + data.sectionSubject[i].subjectCode + '&tpo_question_id=' + data.sectionSubject[i].seqNums[j] + '">' + data.sectionSubject[i].seqNums[j] + '</a></li>';
                            }
                            contentStr += '</ul>' +
                                '</div>' +
                                '</div>';
                        }
                        contentStr += '</div></div>';
                        contentStr += '<div class="view-r-box fr">' +
                            '<div class="audio-box mb12" audiourl=' + data.listenAndQuestion.listeningAudio + '>' +
                            '<div class="audioWrap">' +
                            '<div class="audio-img-box">' +
                            '<img alt="" src=' + data.listenAndQuestion.imgs[0].url + '>    ' +
                            '</div>' +
                            '<div class="audio-btn-box">' +
                            '<div class="audioIcon-wrap">' +
                            '<a class="pauseIcon fl" href="javascript:;"></a>' +
                            '<a class="playIcon fl" href="javascript:;"></a>' +
                            '<a class="HhIcon fl" href="javascript:;"></a>' +
                            '</div>' +
                            '</div>' +
                            '<div id="jq-jplayer"></div>' +
                            '</div>' +
                            '</div>' +
                            '<div class="tabAudio-box mb12">' +
                            '<ul class="tabList">' +
                            '<li class="fA f18 c23 cp active">' +
                            'Question' +
                            '</li>' +
                            '<li class="fs f14 c23 cp">' +
                            '文字解析' +
                            '</li>' +
                            '</ul>' +
                            '<div class="box" style="display:block;">' +
                            '<p class="Ttext f14 c3">' + data.listenAndQuestion.seqNum + '.' + data.listenAndQuestion.question + '</p>' +
                            '<ul class="optionsList">' +
                            '<li class="f14 c3">' +
                            '<a class="radioIcon cp"></a>A.' + data.listenAndQuestion.optionA +
                            '<input type="radio" class="radioBtn">' +
                            '</li>' +
                            '<li class="f14 c3">' +
                            '<input type="radio" class="radioBtn">' +
                            '<a class="radioIcon cp"></a>B.' + data.listenAndQuestion.optionB +
                            '</li>' +
                            '<li class="f14 c3">' +
                            '<a class="radioIcon cp"></a>C.' + data.listenAndQuestion.optionC +
                            '<input type="radio" class="radioBtn">' +
                            '</li>' +
                            '<li class="f14 c3">' +
                            '<a class="radioIcon cp"></a>D.' + data.listenAndQuestion.optionD +
                            '<input type="radio" class="radioBtn">' +
                            '</li>' +
                            '</ul>' +
                            '</div>' +
                            '<div class="box">' +
                            '<div class="answer-box">' +
                            '<h3 class="f14 fs answer">答案：<span class="cff fA">' + data.listenAndQuestion.answer + '</span></h3>' +
                            '<p class="f14 c3">' + data.listenAndQuestion.analysis + '</p>' +
                            '</div>' +
                            '</div>' +
                            '</div>' +

                            '</div>';
                        main.html(contentStr);
                        xm.bindEvent();
                    }
                })
            }
        },
        bindEvent: function() {
            //阅读  点击查看答案和解析
            $(".viewAnswer").bind('click', function() {
                $(".text-box").toggle();
            });
            //阅读  翻译
            $("#ch").bind('click', function() {
                $(this).addClass('original');
                $(this).siblings().removeClass('original');
                $(".cn").show();
            })
            $("#en").bind('click', function() {
                $(this).addClass('original');
                $(this).siblings().removeClass('original');
                $(".cn").hide();
            });
            //选中后高亮显示
            $(".TPO-box").each(function() {
                if ($(this).find('h3').attr("data_id") == xm.passageNum) {
                    $(this).find('.select-list a').each(function() {
                        if ($(this).attr("data_id") == xm.mqId) {
                            $(this).addClass('active');
                            $(this).siblings().removeClass('active');
                        }
                    })
                }
            });
            //听力  文字解析切换
            var $tabAudio = $('.tabAudio-box');
            $tabAudio.each(function() {
                var $li = $(this).find('.tabList li'),
                    $box = $(this).find('.box');
                $li.each(function() {
                    $(this).bind('click', function() {
                        $(this).addClass('active');
                        $(this).siblings().removeClass('active');
                        $box.eq($(this).index()).show().siblings('.box').hide();
                    });
                });
            });
            $('.optionsList').find('.radioIcon').on('click', function() {
                $(this).addClass('active');
                $(this).parent().siblings().find('.radioIcon').removeClass('active').attr('choose', false);
                //$(this).parents('.radio-topic').attr('radioAnswer',$(this).attr('options'));
            })

            // 音频开关键
            $("#jq-jplayer").jPlayer({
                ready: function() {
                    $(this).jPlayer("setMedia", {
                        mp3: ""
                    });
                },
                ended: function(event) {
                    $(this).jPlayer("stop");
                },
                swfPath: "/swf",
                supplied: "mp3"
            });
            $('.playIcon').bind('click', function() {
                $("#jq-jplayer").jPlayer('setMedia', {
                    mp3: $('.audio-box').attr('audiourl')
                }).jPlayer('play');
            });
            $('.pauseIcon').bind('click', function() {
                $("#jq-jplayer").jPlayer('pause');
            });
            $('.HhIcon').bind('click', function() {
                $("#jq-jplayer").jPlayer('stop').jPlayer('play');
            });
        }
    })
})();
