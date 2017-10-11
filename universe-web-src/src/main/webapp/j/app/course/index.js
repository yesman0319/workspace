define(['backbone',
        'app/baseURL',
        'baseCookie',
        'app/baseFinal',
        'text!app/course/list.html',
        'app/course/model'
    ],
    function (Backbone, URL, BaseCookie, Final, tpl, model) {

        var IndexView = Backbone.View.extend({
            el: $("#huifang"),
            statsTemplate: tpl,
            token: 'xiaoma',
            model: new model(),
            events: {
                "click .oneCourse": "showCourse"
            },
            detail: null,
            initialize: function (data) {
                this.initLoginFn();//初始化登录页面链接
                this.model.on('change', function () {
                    this.render();
                }, this);
                //this.model.on('change:productTypeId', function () {
                //    window.location.href = 'course.html#' + this.model.get("productTypeId");
                //}, this);
                this.model.getToken().load();
            },
            showCourse: function (event) {
                var productTypeId = parseInt($(event.currentTarget).attr("productTypeId"));
                this.model.set({productTypeId: productTypeId});
            },

            //渲染视图
            render: function () {
                var self = this;

                console.log(this.model.toJSON());
                this.$el.html(_.template(tpl)({data: this.model.toJSON()}));

            },

            getToken: function () {
                this.token = $.cookie(Final.TOEFL_TOKEN);
                if ("" == this.token || null == this.token) {
                    this.token = "xiaoma";
                }
                return this.token;
            },
            initLoginFn: function () {
                $(".regsiter").attr("href", "/html/register.html?fromurl=" + window.location.href);
                $("#registerNav").attr("href", "/html/register.html?fromurl=" + window.location.href);
                $("#loginNav").attr("href", "/html/login.html?fromurl=" + window.location.href);
            },
            getUrlParam: function (url, name) {
                var pattern = new RegExp("[?&]" + name + "=([^&]+)", "g");
                var matcher = pattern.exec(url);
                var items = null;
                if (null != matcher) {
                    try {
                        items = decodeURIComponent(decodeURIComponent(matcher[1]));
                    } catch (e) {
                        try {
                            items = decodeURIComponent(matcher[1]);
                        } catch (e) {
                            items = matcher[1];
                        }
                    }
                }
                return items;
            }
        });

        return IndexView;
    });