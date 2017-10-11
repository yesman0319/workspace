define(['backbone',
        'app/baseURL',
        'baseCookie',
        'app/baseFinal',
        'text!app/pay/user.html',
        'app/pay/modelUser'
    ],
    function (Backbone, URL, BaseCookie, Final, tpl, modelUser) {
        var regxPhone=/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;

        var userView = Backbone.View.extend({
            el: $("#divUser"),
            token: 'xiaoma',
            model: new modelUser(),
            events: {
                "click #btnSaveUser": "addUser",
                "focus #txtUserName,#txtPhone": "setBorder"
            },
            //渲染视图
            render: function () {
                this.$el.html(_.template(tpl)(this.model.toJSON()));
            },
            getToken: function () {
                this.token = $.cookie(Final.TOEFL_TOKEN);
                if ("" == this.token || null == this.token) {
                    this.token = "xiaoma";
                }
                return this.token;
            },
            initialize: function (productTypeId) {
                var self = this;
                this.getToken();

                this.model.on('change', function () {
                    this.render();
                    if(self.model.get('phone')){
                        $('.t-save').hide();
                        $('.t-modify').show();
                    }
                }, this);
                this.model.getToken().load();
            },
            animate: function () {
                $.fn.extend({
                    borderAnimate: function () {
                        return this.each(function () {
                            var that = this;
                            setTimeout(function () {
                                that.style.borderColor = 'red';
                                that.style.borderWidth = '2px';
                            }, 300);
                            setTimeout(function () {
                                that.style.borderColor = 'gray';
                                that.style.borderWidth = '1px';
                            }, 600);
                            setTimeout(function () {
                                that.style.borderColor = 'red';
                            }, 1000);
                        });
                    }
                });
            },
            setBorder: function (e) {
                $(e.currentTarget).css({"border-color": "#eee"});
            },
            addUser: function () {
                var self = this,
                    $name = $('#txtUserName'),
                    $phone = $('#txtPhone');

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
                if (!$.trim($name.val())) {
                    $name.borderAnimate();
                    return;
                }
                if (!regxPhone.test($.trim($phone.val() ))) {
                    $phone.borderAnimate();
                    return;
                }

                this.model.saveUser(function (response) {
                    if (response.status == 0) {
                        self.model.set({
                            name: $name.val(),
                            phone: $phone.val()
                        });

                        //钱包隐藏则银行卡的支付按钮起作用
                        if ($("#userWalletPayDiv").is(':hidden')) {
                            $('.btnPay').removeClass('disabled');
                        }
                        $('#userWalletPayBtn').removeAttr('disabled');
                    } else {
                        $('#tipMsg').text(response.message);
                        $('#msgModel').modal({
                            backdrop: 'static'
                        });
                    }
                });
            }
        });


        return userView;
    });