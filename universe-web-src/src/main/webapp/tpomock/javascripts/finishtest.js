(function() {
    $.extend(xm, {
        //初始化页面
        initPage: function() {
            this.rows = 10;
            this.page = 1;
            xm.initForm();
            xm.checkLoginStatus();
        },
        getParams: function() {
            var params = {};
            params.tpoId = Utils.getUrlParam(window.location.href, "tpoId");
            // params.score = 20;
            params.type = localStorage.type;
            return params;
        },
        initForm: function() {
            xm.initFormPage(1);
        },
        initFormPage: function(param) {
            var data = $.extend({
                page: xm.page,
                rows: xm.rows
            }, xm.getParams(), param);
            if (localStorage.type == 1) {
                $.ajax({
                    url: xm.baseURL + "/tpo/service/mock/tpos/readingorlistening/" + Utils.getCookie("userid") + "/results",
                    type: "POST",
                    contentType: 'application/json;charset=UTF-8',
                    data: JSON.stringify(data),
                    dataType: 'json',
                    success: function(data) {
                        if (data.rows && data.rows.length > 0) {
                            var main = $(".textResult-content");
                            var datastr = '';
                            datastr += '<div class="topic-wrap">' +
                                '<div class="topic-box auto">' +
                                '<div class="topic-list reading fl">' +
                                '<h3 class="topic-num fb c02">' + data.mockResult.totalCount + '</h3>' +
                                '<div class="topic-Carry">' +
                                '<p class="f24 carry tc"><span class="cfe">' + data.mockResult.rightCount + '</span> <span class="c3c">/ ' + data.mockResult.totalCount + '</span></p>' +
                                '</div>' +
                                '</div>' +
                                '<div class="topic-list hearing fr">' +
                                '   <h3 class="topic-num fb c00">0</h3>' +
                                '<div class="topic-Carry">' +
                                '   <p class="f24 carry tc"><span class="cfe">0</span> <span class="c3c">/ 0</span></p>' +
                                '</div>' +
                                '   </div>' +
                                '</div>' +
                                '   </div>' +
                                '       <h2 class="c9 record">TPO ' + data.mockResult.mkTpoId + '</h2>'
                            for (var i = 0; i < data.rows.length; i++) {
                                var type = "";
                                if (data.rows[i].questionType == 1) {
                                    type = "单选题"
                                } else if (data.rows[i].questionType == 2) {
                                    type = "多选题"
                                } else if (data.rows[i].questionType == 3) {
                                    type = "插入题"
                                } else if (data.rows[i].questionType == 4) {
                                    type = "拖拽题"
                                }
                                datastr += '<div class="table-wrap">' +
                                    '<div class="tr-list bjf9">' +
                                    '<div class="w90 fl">' +
                                    '<p class="tc f14 c02">阅读</p>' +
                                    '<span class="line"></span>' +
                                    '</div>' +
                                    '<div class="w231 fl">' +
                                    '<p class="tc f14 c23">passage' + data.rows[i].passageNum + '</p>' +
                                    '</div>' +
                                    '<div class="w133 fl">' +
                                    '<p class="f14 c23">第 ' + data.rows[i].questionNum + ' 题</p>' +
                                    '</div>' +
                                    '<div class="w154 fl">' +
                                    '<p class="f14 c02">' + type + '</p>' +
                                    '</div>' +
                                    '<div class="w191 fl">' +
                                    '<p class="f14 c9"><span class="c23"></span>' + ((data.rows[i].originalAnswer == null) ? "" : data.rows[i].originalAnswer) + ' ( 正确答案：<span class="cfe">' + data.rows[i].answer + '</span> )</p>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>'
                            }
                            // var page = 1;
                            // var rows = 10;
                            var total = data.mockResult.totalCount;
                            var pageSize = 10;
                            var getpage = parseInt((data.mockResult.totalCount+pageSize-1) / pageSize);
                            datastr += '<div class="page">' +
                                '<div class="page-box">' +
                                '<div class="fl listPage">' +
                                '<div class="pagination"><a class="previous_page" href="javascript:;">上一页</a>';
                            for (var j = 0; j < getpage; j++) {
                                // datastr += '<a href="../html/finishtest.html?tpoId=25&page='+(j+1)+'&rows=10">'+(j+1)+'</a>'
                                datastr += '<a href="javascript:;" class="get_page" data_id=' + (j + 1) + '>' + (j + 1) + '</a>'
                            }
                            // datastr += '<a class="next_page" rel="next" href="/tpomock/finishtest?page=2&amp;per_page=10&amp;tpo_mockresult_id=1648">下一页</a></div>'+
                            datastr += '<a class="next_page" rel="next" href="javascript:;">下一页</a></div>' +
                                '</div>' +
                                '<div class="fl goPage-wrap">' +
                                '共' + total + '条, 共' + getpage + '页, 当前第' + (xm.page = param.page ? param.page : xm.page) + '页.';
                            '</div>' +
                            '</div>' +
                            '</div>';
                            main.html(datastr);
                            xm.page = param.page ? param.page : xm.page
                        }
                        $(".get_page").eq(xm.page-1).addClass("active");
                        xm.bindEvent();
                    },
                    error: function(i) {
                        // alert("登录超时，请重新登录！");
                        // window.location.href = "login.html";
                    }
                });
            } else if (localStorage.type == 2) {
                $.ajax({
                    url: xm.baseURL + "/tpo/service/mock/tpos/readingorlistening/" + Utils.getCookie("userid") + "/results",
                    type: "POST",
                    contentType: 'application/json;charset=UTF-8',
                    data: JSON.stringify(data),
                    dataType: 'json',
                    // headers: {"token" : token},
                    success: function(data) {
                        if (data.rows && data.rows.length > 0) {
                            var main = $(".textResult-content");
                            var datastr = '';
                            datastr += '<div class="topic-wrap">' +
                                '<div class="topic-box auto">' +
                                '<div class="topic-list reading fl">' +
                                '<h3 class="topic-num fb c02">0</h3>' +
                                '<div class="topic-Carry">' +
                                '<p class="f24 carry tc"><span class="cfe">0</span> <span class="c3c">/0</span></p>' +
                                '</div>' +
                                '</div>' +
                                '<div class="topic-list hearing fr">' +
                                '<h3 class="topic-num fb c00">' + data.mockResult.totalCount + '</h3>' +
                                '<div class="topic-Carry">' +
                                '<p class="f24 carry tc"><span class="cfe">' + data.mockResult.rightCount + '</span> <span class="c3c">/ ' + data.mockResult.totalCount + '</span></p>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '</div>' +
                                '<h2 class="c9 record">TPO ' + data.mockResult.mkTpoId + '</h2>'
                            for (var i = 0; i < data.rows.length; i++) {
                                var type = "";
                                if (data.rows[i].questionType == 1) {
                                    type = "单选题"
                                } else if (data.rows[i].questionType == 2) {
                                    type = "多选题"
                                }
                                datastr += '<div class="table-wrap">' +
                                    '<div class="tr-list bjf9">' +
                                    '<div class="w90 fl">' +
                                    '<p class="tc f14 c00">听力</p>' +
                                    '<span class="line"></span>' +
                                    '</div>' +
                                    '<div class="w231 fl">' +
                                    '<p class="tc f14 c23">' + ((data.rows[i].subjectType == 1) ? "conversation" : "lecture") + data.rows[i].sectionCode + '</p>' +
                                    '</div>' +
                                    '<div class="w133 fl">' +
                                    '<p class="f14 c23">第 ' + data.rows[i].seq_num + ' 题</p>' +
                                    '</div>' +
                                    '<div class="w154 fl">' +
                                    '<p class="f14 c02">' + type + '</p>' +
                                    '</div>' +
                                    '<div class="w191 fl">' +
                                    '<p class="f14 c9"><span class="c23"></span>' + ((data.rows[i].originalAnswer == null) ? "" : data.rows[i].originalAnswer) + ' ( 正确答案：<span class="cfe">' + data.rows[i].answer + '</span> )</p>' +
                                    '</div>' +
                                    '</div>' +
                                    '</div>'
                            }
//                          var page = 1;
//                          var rows = 10;
                            var total = data.mockResult.totalCount;
                            var getpage = parseInt((data.mockResult.totalCount-1) / 10)+1;
                            datastr += '<div class="page">' +
                                '<div class="page-box">' +
                                '<div class="fl listPage">' +
                                '<div class="pagination"><a class="previous_page" href="javascript:;">上一页</a>';
                            for (var j = 0; j < getpage; j++) {
                                datastr += '<a href="javascript:;" class="get_page" data_id=' + (j + 1) + '>' + (j + 1) + '</a>'
                            }
                            datastr += '<a class="next_page" rel="next" href="javascript:;">下一页</a></div>' +
                                '   </div>' +
                                '<div class="fl goPage-wrap">' +
                                '   共' + total + '条, 共' + getpage + '页, 当前第' + (xm.page = param.page ? param.page : xm.page) + '页.';
                            '   </div>' +
                            '</div>' +
                            '   </div>';
                            main.html(datastr);
                            xm.page = param.page ? param.page : xm.page
                        }
                        $(".get_page").eq(xm.page-1).addClass("active");
                        xm.bindEvent();
                    },
                    error: function(i) {
                        // alert("登录超时，请重新登录！");
                        // window.location.href = "login.html";
                    }
                });
            } else if (localStorage.type == 5) {
                $.ajax({
                    url: xm.baseURL + "/tpo/service/mock/tpos/readingorlistening/" + Utils.getCookie("userid") + "/results",
                    type: "POST",
                    contentType: 'application/json;charset=UTF-8',
                    data: JSON.stringify(data),
                    dataType: 'json',
                    success: function(data) {
                        var main = $(".textResult-content");
                        var datastr = '';
                        if (data.rows && data.rows.length > 0) {
                            datastr += '<div class="topic-wrap">' +
                                '<div class="topic-box auto">' +
                                '<div class="topic-list reading fl">' +
                                '<h3 class="topic-num fb c02">' + data.readCount + '</h3>' +
                                '<div class="topic-Carry">' +
                                '<p class="f24 carry tc"><span class="cfe">' + data.readRightCount + '</span> <span class="c3c">/ ' + data.readCount + '</span></p>' +
                                '</div>' +
                                '</div>' +
                                '<div class="topic-list hearing fr">' +
                                '   <h3 class="topic-num fb c00">' + data.listenCount + '</h3>' +
                                '<div class="topic-Carry">' +
                                '   <p class="f24 carry tc"><span class="cfe">' + data.listeningRightCount + '</span> <span class="c3c">/ ' + data.listenCount + '</span></p>' +
                                '</div>' +
                                '   </div>' +
                                '</div>' +
                                '   </div>' +
                                '       <h2 class="c9 record">TPO ' + data.mockResult.mkTpoId + '</h2>'
                            for (var i = 0; i < data.rows.length; i++) {
                                var type = "";
                                if (data.rows[i].questionType == 1) {
                                    type = "单选题"
                                } else if (data.rows[i].questionType == 2) {
                                    type = "多选题"
                                } else if (data.rows[i].questionType == 3) {
                                    type = "插入题"
                                } else if (data.rows[i].questionType == 4) {
                                    type = "拖拽题"
                                }
                                var subjectType = ""
                                if (data.rows[i].subjectType == 1) {
                                    subjectType = "conversation" + data.rows[i].sectionCode;
                                } else if (data.rows[i].subjectType == 2) {
                                    subjectType = "lecture" + data.rows[i].sectionCode;
                                } else {
                                    subjectType = "passage" + data.rows[i].passageNum
                                }
                                var num = "";
                                if (data.rows[i].type == "阅读") {
                                    num = data.rows[i].questionNum;
                                } else {
                                    num = data.rows[i].seq_num;
                                }
                                datastr += '<div class="table-wrap">' +
                                    '<div class="tr-list bjf9">' +
                                    '<div class="w90 fl">' +
                                    '   <p class="tc f14 c02">' + data.rows[i].type + '</p>' +
                                    '<span class="line"></span>' +
                                    '</div>' +
                                    '<div class="w231 fl">' +
                                    '<p class="tc f14 c23">' + subjectType + '</p>' +
                                    '</div>' +
                                    '<div class="w133 fl">' +
                                    '<p class="f14 c23">第 ' + num + ' 题</p>' +
                                    '</div>' +
                                    '<div class="w154 fl">' +
                                    '   <p class="f14 c02">' + type + '</p>' +
                                    '   </div>' +
                                    '   <div class="w191 fl">' +
                                    '<p class="f14 c9"><span class="c23"></span>' + ((data.rows[i].originalAnswer == null) ? "" : data.rows[i].originalAnswer) + ' ( 正确答案：<span class="cfe">' + data.rows[i].answer + '</span> )</p>' +
                                    '   </div>' +
                                    '   </div>' +
                                    '</div>'
                            }
                            // var page = 1;
                            // var rows = 10;
                            var total = data.mockResult.totalCount;
                            var getpage = parseInt((data.mockResult.totalCount-1) / 10)+1;
                            datastr += '<div class="page">' +
                                '<div class="page-box">' +
                                '<div class="fl listPage">' +
                                '<div class="pagination"><a class="previous_page" href="javascript:;">上一页</a>';
                            for (var j = 0; j < getpage; j++) {
                                datastr += '<a href="javascript:;" class="get_page" data_id=' + (j + 1) + '>' + (j + 1) + '</a>'
                            }
                            datastr += '<a class="next_page" rel="next" href="javascript:;">下一页</a></div>' +
                                '   </div>' +
                                '<div class="fl goPage-wrap">' +
                                '   共' + total + '条, 共' + getpage + '页, 当前第' + (xm.page = param.page ? param.page : xm.page) + '页.';
                            '   </div>' +
                            '</div>' +
                            '   </div>';
                            main.html(datastr);
                            xm.page = param.page ? param.page : xm.page
                        }
                        $(".get_page").eq(xm.page-1).addClass("active");
                        xm.bindEvent();
                    },
                    error: function(i) {
                        // alert("登录超时，请重新登录！");
                        // window.location.href = "login.html";
                    }
                });
            }
        },
        bindEvent: function() {
            $(".next_page").on("click", function() {
                var page = parseInt(xm.page) + 1;
                if (page > 0) {
                    xm.initFormPage({
                        page: page
                    })
                }
            });
            $(".previous_page").on("click", function() {
                var page = parseInt(xm.page) - 1;
                if (page > 0) {
                    xm.initFormPage({
                        page: page
                    });
                }
            })
            $(".get_page").on("click", function() {
                var page = $(this).attr("data_id");
                if (page > 0) {
                    xm.initFormPage({
                        page: page
                    })
                }
            });
        }
    })
})()
