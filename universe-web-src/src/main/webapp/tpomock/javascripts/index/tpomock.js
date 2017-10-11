(function() {
    $.extend(xm, {
        //初始化页面
        initPage: function() {
            this.username = Utils.getCookie("username");
            //判断是否为登录状态
            xm.checkLoginStatus();
            //初始化数据
            xm.initForm();
            xm.bindEvent();
        },
        initForm: function() {
            $.ajax({
                type: 'GET',
                url: xm.baseURL + '/mkTpo/tpos.action',
                //url: xm.baseURL + "/tpo/service/mock/tpos",
                success: function(data) {
                    var main = $("#qieList");
                    var datastr = '';
                    for (var i = data.tpos.length - 1; i >= 0; i--) {
                        datastr += '<li class="fl cp" id="' + data.tpos[i].id + '">' +
                            '<h3 class="mainList-tip c9 f14">TPO</h3>' +
                            '<div class="mainList-content">' +
                            '<span class="qid-icon c0e auto f36">' + data.tpos[i].id + '' +
                            '</span>' +
                            '</div>' +
                            '<div class="test-box">' +
                            '<a href="javascript:;" class="startBtn-icon fb cf f18 auto">开始模考</a>' +
                            '</div>' +
                            '<div class="textMsg-box fs">' +
                            '<p class="fl">' +
                            '<span class="people-icon fl"></span>' +
                            '<span class="fl cd7">' + (data.tpos[i].haveDoneCount == null ? 0 : data.tpos[i].haveDoneCount) + '人</span>' +
                            '   <span class="fl">已考</span>' +
                            '   </p>' +
                            '<p class="fr">' +
                            '   <span class="correct-icon fl"></span>' +
                            '   <span class="fl c0f">' + (data.tpos[i].enrolmentRate == null ? '0%' : data.tpos[i].enrolmentRate) + '</span>' +
                            '<span class="fl">正确率</span>' +
                            '</p>' +
                            '</div>' +
                            '</li>'
                    }
                    main.append(datastr);
                    xm.dragdrop();
                    xm.listHover();
                }
            })
        },
        dragdrop: function() {
            var list = $('#qieList');
            var li = list.find('li')
            var close = $('.JS_type_close');
            var box = $('.JS_type_btn>a');
            var arr = [];
            var arrappend = ['readings', 'listenings', 'speakings', 'writings', ''];
            for (var i = 0, len = li.length; i < len; i++) {
                var el = li[i];
                el.onclick = function() {
                    id = this.id;
                    for (var i = 0, len = box.length; i < len; i++) {
                        arr.push(box[i].href);
                        //box[i].href = arr[i] + this.id + "&token=" + token + "=" + username+"&id="+userid;
                        box[i].href = arr[i] + this.id
                    }
                    xm.showWindow();
                };
            }
        },
        showWindow: function() {
            $('.JS_type_pop').show();
            $('.JS_mask').show();
            $('.JS_mask').css('height', $(document.body).height() + 'px');
            var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
            var win = $(".JS_type_pop");
            win.style.left = (document.documentElement.clientWidth - win.offsetWidth) / 2 + 'px';
            win.style.top = (document.documentElement.clientHeight - win.offsetHeight) / 2 + scrollTop + 'px';
        },
        listHover: function() {
            var List = document.getElementById('qieList'),
                ListLi = List.getElementsByTagName('li'),
                oldClass;
            for (var i = 0, len = ListLi.length; i < len; i++) {
                var el = ListLi[i];
                el.onmouseover = function() {
                    oldClass = this.className;
                    this.className += ' hover';
                }
                el.onmouseout = function() {
                    this.className = oldClass;
                }
            }
        },
        bindEvent: function() {
            $('.JS_type_close').on('click', function() {
                $('.JS_type_pop').hide();
                $('.JS_mask').hide();
            })
        },
    })
})();
