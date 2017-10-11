define(['backbone',
        'app/baseURL',
        'baseCookie',
        'app/baseFinal',
        'text!app/pay/pay.html',
        'app/pay/model'
    ],
    function (Backbone, URL, BaseCookie, Final, tpl, model) {

        var IndexView = Backbone.View.extend({
            el: $("#divOrder"),
            statsTemplate: tpl,
            token: 'xiaoma',
            model: new model(),
            events: {
                "click .btnPay": "goPay",
                "click #userWalletPayBtn": "showUserWalletPay",
                "click #chkAgree": "chkUserAgree",
                "click #paySuccess": "paySuccess",
                "click #payFail": "payFail",
                "click #lnkAgree": "showProtocol"
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
            },
            initialize: function (from, orderNum) {
                var self = this;
                this.getToken();
                this.initLoginFn();//初始化登录页面链接

                this.model.on('change:actualAmount', function () {
                    this.render();
                }, this);
                this.model.getToken().load(from, orderNum);
            },

            //渲染视图
            render: function () {
                this.$el.html(_.template(tpl)(this.model.toJSON()));
                var userWalletObj = this.model.get('userWalletObj');
                if (userWalletObj) {
                    $("#userWalletPayDiv").show();
                    $("#useWalletPayAmountTip").html(userWalletObj.useAmount);
                    //钱包余额不足以全额支付 显示其他支付方式
                    if (userWalletObj.typeId == 2) {
                        $(".userWalletSurplusAmount").show();
                        $(".btnPay").addClass("disabled");
                    }
                }
                //如果未开通钱包 或者 钱包余额不足以全额支付 显示其他支付方式
                if (!userWalletObj || userWalletObj.typeId == 2) {
                    $('#divSmallMoney').show();
                }
            },
            goPay: function () {
                var self = this;

                if (!this.token || this.token == 'xiaoma') {
                    $('#dialogLogin').modal({
                        backdrop: 'static'
                    });
                    $('#dialogLogin').on('hidden.bs.modal', function (e) {
                        self.model.getToken();
                        self.getToken();
                        require(['app/baseMessage'], function (BaseMessage) {
                            BaseMessage.init();
                        });
                    });
                    return;
                }
                $('#payModel').modal({
                    backdrop: 'static'
                });
                $('#payModel').on('hidden.bs.modal', function (e) {
                });

                $('#orderNum').val(this.model.get('orderNum'));
                $('#token').val(this.token);
                $('#bank').val($('.platform input:checked').not(':hidden').val());
                //提交form表单
                $('#payForm').attr({
                    action: URL.baseURL1 + '/alipay/deposit.action'
                }).submit();

            },
            //显示钱包支付面板
            showUserWalletPay: function () {
                var self = this,
                    userWalletObj = this.model.get('userWalletObj'),
                    orderNum = this.model.get('orderNum'),
                    from = this.model.get('from');
                require(['widget/useWalletPay_widget/useWalletPayWidget'], function (useWalletPayWidget) {
                    useWalletPayWidget.init({
                        orderNumber: orderNum,
                        useWalletPayAmount: userWalletObj.useAmount
                    }, function (result) {
                        //result.status  0:订单钱包支付成功 1:订单异常 2.密码错误 3.密码正确，还需银行支付
                        //typeId 1:全额支付,2:部分钱包支付
                        if (userWalletObj.typeId == 1 && result.status == 0) {
                            //全额钱包支付
                            window.location.href = 'result.html#success/' + from + '/' + orderNum;
                        } else if (userWalletObj.typeId == 2 && result.status == 3) {
                            //部分钱包支付
                            $("#userWalletPayBtn").addClass("disabled");
                            $("#paymentBtn").removeClass("disabled");
                            self.hasWalletPay = true;
                        }
                    });
                });
            },

            chkUserAgree: function () {
                var userWalletObj = this.model.get('userWalletObj');
                if ($('#chkAgree').is(':checked')) {
                    //typeId 1:全额支付,2:部分钱包支付
                    if (userWalletObj && userWalletObj.typeId == 1) {
                        $("#userWalletPayBtn").removeClass("disabled");
                    } else if (userWalletObj && userWalletObj.typeId == 2) {
                        if (this.hasWalletPay) {
                            $("#paymentBtn").removeClass("disabled");
                        } else {
                            $("#userWalletPayBtn").removeClass("disabled");
                        }
                    } else {
                        $("#paymentBtn").removeClass("disabled");
                    }
                } else {
                    if (!$("#userWalletPayBtn").hasClass("disabled")) {
                        $("#userWalletPayBtn").addClass("disabled");
                    }
                    if (!$("#paymentBtn").hasClass("disabled")) {
                        $("#paymentBtn").addClass("disabled");
                    }
                }
            },
            paySuccess: function () {
                var orderNum = this.model.get('orderNum'),
                    from = this.model.get('from');
                this.model.getOrderStatus(orderNum, function (resp) {
                    $('.modal-backdrop').remove();
                    //0表示成功
                    if (resp.status == 0 && resp.result) {
                        //orderStatus:1已支付，2未支付，3已取消
                        if (resp.result.orderInfo.orderStatus == 1) {
                            window.location.href = 'result.html#success/' + from + '/' + orderNum;
                            return;
                        }
                    }
                    window.location.href = 'result.html#fail/' + from + '/' + orderNum;
                });
            },
            payFail: function () {
                var orderNum = this.model.get('orderNum'),
                    from = this.model.get('from');
                this.model.getOrderStatus(orderNum, function (resp) {
                    $('.modal-backdrop').remove();
                    //0表示成功
                    if (resp.status == 0 && resp.result) {
                        //orderStatus:1已支付，2未支付，3已取消
                        if (resp.result.orderInfo.orderStatus == 1) {
                            window.location.href = 'result.html#success/' + from + '/' + orderNum;
                            return;
                        }
                    }
                    window.location.href = 'result.html#fail/' + from + '/' + orderNum;
                });
            },
            showProtocol: function () {
                var orderNum = this.model.get('orderNum'),
                    from = this.model.get('from');
                //协议地址
                $('#iProtocol').attr('src', Final.PROTOCOL_URL + '?orderNum=' + orderNum);
                $('#protocolModel').modal({
                    backdrop: 'static'
                });
            }
        });

        return IndexView;
    });