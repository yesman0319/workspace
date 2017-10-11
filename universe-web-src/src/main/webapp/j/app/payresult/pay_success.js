'use strict';
/**
 * 支付成功
 */
define(['require', 'app/baseURL', 'baseCookie', 'backbone', 'app/baseFinal']
    , function (require, URL, BaseCookie, Backbone, BaseFinal) {
        //命名空间单体对象
        var BaoFen = {
            token: '',
            getToken: function () {
                BaseCookie.get();
                BaoFen.token = BaseCookie.getToken();
                if (!BaoFen.token) {
                    BaoFen.token = "xiaoma";
                }
                return BaoFen.token;
            },
            //获得链接里的参数
            getUrlParam: function (url, name) {
                var pattern = new RegExp("[?&]" + name + "=([^&^#]+)", "g");
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
        };
        ////订单Model
        //var Order = Backbone.Model.extend({
        //    //默认值
        //    defaults: function () {
        //        return {};
        //    },
        //    //初始化的时候判断，如果设置的属性值非法就设为默认值
        //    initialize: function () {
        //    },
        //    //查询全日制快速购买订单信息
        //    getFullTimeQuickOrderInfo: function (orderNum, callback) {
        //        var that = this;
        //        var param = {
        //            url: URL.baseURL10 + 'web/qp/getOrderFt.action',
        //            type: 'post',
        //            data: {
        //                token: BaoFen.token,
        //                orderNum: orderNum
        //            },
        //            success: function (model, resp, options) {
        //                if (typeof callback == 'function') {
        //                    callback(resp);
        //                }
        //            }
        //        };
        //        this.fetch(param);
        //    }
        //});

        var SuccessView = Backbone.View.extend({
            el: ".content",
            //template: _.template(),
            events: {
                "click #goBack": "goBack",
                "click #lookCourse": "lookCourse"
            },
            initialize: function (tag, orderNum) {
                BaoFen.getToken();
                this.tag = tag;
                this.showResult();
            },
            showResult: function () {
                var self = this;
                /*huiyuan:'huiyuan',
                 chongci:'chongci',
                 haoke:'haoke',
                 jichuban:'jichuban',
                 qianghuaban:'qianghuaban',
                 nayiye:'nayiye',
                 baofen:'baofen',
                 quanrizhi:'quanrizhi'*/
                if (this.tag == 'haoke') {
                    require(['text!app/payresult/success.html'], function (strTemp) {
                        var strHtml = _.template(strTemp)({});
                        self.$el.html(strHtml);
                    });
                } else if (this.tag == 'jichuban') {
                    require(['text!app/payresult/success.html'], function (strTemp) {
                        var strHtml = _.template(strTemp)({});
                        self.$el.html(strHtml);
                    });
                } else if (this.tag == 'nayiye') {
                    require(['text!app/payresult/success.html'], function (strTemp) {
                        var strHtml = _.template(strTemp)({});
                        self.$el.html(strHtml);
                    });
                } else {
                    require(['text!app/payresult/success.html'], function (strTemp) {
                        var strHtml = _.template(strTemp)({});
                        self.$el.html(strHtml);
                    });
                }

            },
            goBack: function () {
                if (this.tag == 'haoke') {
                    window.location.href = 'courselist.html';
                } else if (this.tag == 'jichuban') {
                    window.location.href = 'courselist.html';
                } else if (this.tag == 'nayiye') {
                    window.location.href = 'courselist.html';
                } else {
                    window.location.href = 'courselist.html';
                }
            },
            //查看课程
            lookCourse: function () {
                window.location.href = '../../html/mycourse.html?tag=' + this.tag;
            }
        });

        return {
            "SuccessView": SuccessView
        };

    });
