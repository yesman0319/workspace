(function() {
    $.extend(xm, {
        initPage: function() {
            xm.page = 1;
            xm.rows = 10;
            xm.tpoId = "";
            xm.type = "";
            xm.passageNum = "";
            xm.subjectCode = "";
            //判断是否为登录状态
            xm.checkLoginStatus();
            xm.initForm();
            xm.bindEvent();
        },
        initForm: function() {
            xm.tpoNumList(1);
        },
        getParams: function() {
            var params = {};
            if (xm.type == "") {
                params.type = 5;
            } else {
                params.type = xm.type;
            }
            params.tpoId = xm.tpoId;
            params.sectionCode = xm.passageNum;
            params.subjectTypeAndsubjectCode = xm.subjectCode;
            params.passageNum = xm.passageNum;
            return params;
        },
        tpoNumList: function(param) {
            var data = $.extend({
                page: xm.page,
                rows: xm.rows
            }, xm.getParams(), param);
            $.ajax({
                url: xm.baseURL + '/tpo/service/mock/tpos/allreadingandlistening',
                type: "POST",
                contentType: 'application/json;charset=UTF-8',
                data: JSON.stringify(data),
                dataType: 'json',
                success: function(data) {
                    var main = $(".main-content");
                    var datastr = '';
                    var Lbox = $(".main-head");
                    var list = '';
                    var sectiontype = "";
                    var passtype = '';
                    if (data.items && data.items.length > 0) {
                        list += '<h2 class="fs f14 c23 crumb">' +
                            '<a href="" class="c23">筛选条件</a> >' +
                            '</h2>' +
                            '<div class="main-head">' +
                            '<div class="Subjectclass bbd">' +
                            '<div class="title-box fl fs c9">' +
                            '科目：' +
                            '</div>' +
                            '<div class="select-box fl">' +
                            '<p class="SubjecBtn">';
                        if (xm.type == 1) {
                            list += '<a href="javascript:;" data_id="1" class="cf active" id="read">阅读</a>' +
                                '<a href="javascript:;" data_id="2" class="cf" id="listen">听力</a>';
                        } else if (xm.type == 2) {
                            list += '<a href="javascript:;" data_id="1" class="cf" id="read">阅读</a>' +
                                '<a href="javascript:;" data_id="2" class="cf active" id="listen">听力</a>';
                        } else {
                            list += '<a href="javascript:;" data_id="1" class="cf" id="read">阅读</a>' +
                                '<a href="javascript:;" data_id="2" class="cf" id="listen">听力</a>';
                        }
                        list += '</p>' +
                            '</div>' +
                            '</div>' +
                            '<div class="SerialNumClass bbd">' +
                            '<div class="title-box fl fs c9">TPO序号：</div>' +
                            '<div class="SerialNum-box fl">' +
                            '<p class="SerialNum">'
                        for (var i = 0; i < data.tpos.length; i++) {
                            if (xm.tpoId == data.tpos[i].id) {
                                list += '<a href="javascript:;" class="c6 f14 fl active" id="' + data.tpos[i].id + '">TPO' + data.tpos[i].id + '</a>'
                            } else {
                                list += '<a href="javascript:;" class="c6 f14 fl" id="' + data.tpos[i].id + '">TPO' + data.tpos[i].id + '</a>'
                            }
                        }
                        list += '</p></div></div>';
                        if (xm.type == 1) {
                            list += '<div class="Subjectclass bbd">' +
                                '<div class="title-box fl c9">Passage：</div>' +
                                '<div class="Subject-box fl">' +
                                '<p class="Passage read">';
                            if (xm.passageNum == 1) {
                                list += '<a href="javascript:;" class="c6 f14 active" data_id="1">Passage 1</a>' +
                                    '<a href="javascript:;" class="c6 f14" data_id="2">Passage 2</a>' +
                                    '<a href="javascript:;" class="c6 f14" data_id="3">Passage 3</a>';
                            } else if (xm.passageNum == 2) {
                                list += '<a href="javascript:;" class="c6 f14 " data_id="1">Passage 1</a>' +
                                    '<a href="javascript:;" class="c6 f14 active" data_id="2">Passage 2</a>' +
                                    '<a href="javascript:;" class="c6 f14" data_id="3">Passage 3</a>';
                            } else if (xm.passageNum == 3) {
                                list += '<a href="javascript:;" class="c6 f14 " data_id="1">Passage 1</a>' +
                                    '<a href="javascript:;" class="c6 f14 " data_id="2">Passage 2</a>' +
                                    '<a href="javascript:;" class="c6 f14 active" data_id="3">Passage 3</a>';
                            } else {
                                list += '<a href="javascript:;" class="c6 f14" data_id="1">Passage 1</a>' +
                                    '<a href="javascript:;" class="c6 f14" data_id="2">Passage 2</a>' +
                                    '<a href="javascript:;" class="c6 f14" data_id="3">Passage 3</a>';
                            }
                            list += '</p>' +
                                '</div>' +
                                '</div>';
                        } else if (xm.type == 2) {
                            list += '<div class="Subjectclass bbd">' +
                                '<div class="title-box fl fs c9">section编号：</div>' +
                                '<div class="Subject-box fl">' +
                                '<p class="Passage read">';
                            if (xm.passageNum == 1) {
                                list += '<a href="javascript:;" data_id="1" class="c6 f14 active">Section 1</a>' +
                                    '<a href="javascript:;" data_id="2" class="c6 f14">Section 2</a>';
                            } else if (xm.passageNum == 2) {
                                list += '<a href="javascript:;" data_id="1" class="c6 f14">Section 1</a>' +
                                    '<a href="javascript:;" data_id="2" class="c6 f14 active">Section 2</a>';
                            } else {
                                list += '<a href="javascript:;" data_id="1" class="c6 f14">Section 1</a>' +
                                    '<a href="javascript:;" data_id="2" class="c6 f14">Section 2</a>';
                            }
                            list += '</p>' +
                                '</div></div>';
                            if (xm.passageNum == 1) {
                                list += '<div class="Subjectclass bbd">' +
                                    '<div class="title-box fl fs c9">' +
                                    '听力分类：' +
                                    '</div>' +
                                    '<div class="Subject-box fl">' +
                                    '<p class="Passage listen">';
                                list += '<a href="javascript:;" class="c6 f14" data_id="1-">Conversation 1</a>';
                                list += '<a href="javascript:;" class="c6 f14" data_id="2-1">Lecture 1</a>' +
                                    '<a href="javascript:;" class="c6 f14" data_id="2-2">Lecture 2</a>'
                                list += '</p>' +
                                    '</div>' +
                                    '</div>'
                            } else if (xm.passageNum == 2) {
                                list += '<div class="Subjectclass bbd">' +
                                    '<div class="title-box fl fs c9">' +
                                    '听力分类：' +
                                    '</div>' +
                                    '<div class="Subject-box fl">' +
                                    '<p class="Passage listen">';
                                list += '<a href="javascript:;" class="c6 f14" data_id="1-">Conversation 1</a>';
                                list += '<a href="javascript:;" class="c6 f14" data_id="2-3">Lecture 3</a>' +
                                    '<a href="javascript:;" class="c6 f14" data_id="2-4">Lecture 4</a>';
                                list += '</p>' +
                                    '</div>' +
                                    '</div>'
                            }
                        }
                        list += '<div class="topicList-box">' +
                            '<h3 class="f14 fs c23 top-title">' +
                            '<span class="fl">题目列表</span>' +
                            '<span class="fr">共' + data.totalcount + '题</span>' +
                            '</h3>' +
                            '<ul class="topicList">';
                        for (var i = 0; i < data.items.length; i++) {
                            if (data.items[i].type == "TPO阅读") {
                                sectiontype = data.items[i].category;
                                passtype = "passage" + data.items[i].passageNum;
                            } else if (data.items[i].type == "TPO听力") {
                                sectiontype = "section" + data.items[i].sectionCode
                                passtype = data.items[i].subjectType == 1 ? "conversation" : "lecture" + data.items[i].subjectCode;
                            }
                            list += '<li class="bbd">' +
                                '<div class="fl serial-box">' +
                                '<a href="" class="cf numIcon fb">' +
                                'TPO<span class="f55">' + data.items[i].tpoId + '</span>' +
                                '</a>' +
                                '</div>' +
                                '<div class="topicText-box fl">' +
                                '   <p class="result-btn">' +
                                '<span class="active fl cf">' + data.items[i].type + '</span>' +
                                '<span class="fl cf">' + sectiontype + '</span>' +
                                '<span class="fl cf">' + passtype + '</span>';
                            if (data.items[i].type == "TPO阅读") {
                                list += '<span class="fl cf">第' + data.items[i].questionNum + '题</span>';
                            } else if (data.items[i].type == "TPO听力") {
                                list += '<span class="fl cf">第' + data.items[i].rlSeqNum + '题</span>';
                            }
                            list += '</p>' +
                                '<p class="f14  tt">' +
                                '<a href="/tpo_practice/practice?tpo_question_id=2474" class="c6">' + data.items[i].question +
                                '</a>' +
                                '</p>' +
                                '<div class="answer-box">' +
                                '<div class="fl parsing-box">'
                            if (data.items[i].type == "TPO阅读") {
                                list += '<a href="practiceReading.html?tpo_question_id=' + data.items[i].questionNum + '&tpo_id=' + data.items[i].tpoId + '&type=' + data.items[i].type + '&passageNum=' + data.items[i].passageNum + '" >';
                            } else {
                                list += '<a href="practiceReading.html?type=' + data.items[i].type + '&tpo_id=' + data.items[i].tpoId + '&sectionCode=' + data.items[i].sectionCode + '&subjectType=' + data.items[i].subjectType + '&subjectCode=' + data.items[i].subjectCode + '&tpo_question_id=' + data.items[i].rlSeqNum + '" >';
                            }
                            list += '<span class="fl cf6">解析</span>' +
                                '</a>' +
                                '</div>' +
                                '<div class="fr t-box">' +
                                '<p class="fl mr16">' +
                                '<span class="people-icon fl"></span>' +
                                '<span class="fl cd7">' + data.items[i].countPerson + '人</span>' +
                                '<span class="fl">已考</span>' +
                                '</p>' +
                                '<p class="fr">' +
                                '<span class="correct-icon fl"></span>' +
                                '<span class="fl c0f">' + data.items[i].enrolmentRate + '</span>' +
                                '<span class="fl">正确率</span>' +
                                '</p>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '</li>'
                        }
                        list += '</ul>' +
                            '</div>' +
                            '<div class="page">' +
                            '<div class="page-box">' +
                            '<div class="fl listPage">' +
                            '<div class="pagination">' +
                            '<span class="previous_page disabled">上一页</span>';
                        for (var i = 0; i < parseInt(data.totalcount / 10) + 1; i++) {
                            list += '<a rel="next" href="javascript:;">' + (i + 1) + '</a> ';
                        }
                        list += '<a class="next_page" rel="next" href="/tpo_practice?page=2&amp;per_page=6">下一页</a></div>' +
                            '</div>' +
                            '<div class="fl goPage-wrap">共' + data.totalcount + '条，共' + (parseInt(data.totalcount / 10) + 1) + '页，当前第' + (xm.page = param.page ? param.page : xm.page) + '页' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                        main.html(list);
                        $(".listen a").each(function() {
                            if (xm.subjectCode == $(this).attr("data_id")) {
                                $(this).addClass("active");
                            }
                        })
                        xm.page = param.page ? param.page : xm.page
                        $(".pagination").createPage({
                            pageCount: parseInt(data.totalcount / 10) + 1,
                            current: parseInt(xm.page),
                            backFn: function(p) {
                                main.html("");
                                var page = p;
                                xm.tpoNumList({
                                    page: page
                                })
                            }
                        })
                    }
                }
            });
        },
        bindEvent: function() {
            $(".SubjecBtn .cf").live("click", function() {
                xm.type = $(this).attr("data_id");
                xm.tpoNumList({
                    page: 1
                });
            });
            $(".SerialNum a").live("click", function() {
                xm.tpoId = $(this).attr("id");
                xm.tpoNumList({
                    page: 1
                });
            });
            $(".read a").live("click", function() {
                xm.passageNum = $(this).attr("data_id");
                xm.tpoNumList({
                    page: 1
                });
            });
            $(".listen a").live("click", function() {
                xm.subjectCode = $(this).attr("data_id");
                xm.tpoNumList({
                    page: 1
                });
            })
        }
    })
})();
