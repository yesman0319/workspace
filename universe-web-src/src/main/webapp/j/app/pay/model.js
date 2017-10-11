define(['backbone', 'app/baseURL', 'app/baseFinal'], function (Backbone, URL, Final) {
    var TheCourse = Backbone.Model.extend({
        defaults: {
            token: 'xiaoma',
            orderNum: '',
            amount: -1,
            privilege: -1,
            actualAmount: -1,
            fromType: 0,
            list: [],
            userWalletObj: {},
            from:''
        },
        getToken: function () {
            this.token = $.cookie(Final.TOEFL_TOKEN);
            if ("" == this.token || null == this.token) {
                this.token = "xiaoma";
            }
            return this;
        },
        load: function (from, orderNum, callback) {
            this.getOrderInfo(from, orderNum, callback);
        },
        getOrderInfo: function (from, orderNum, callback) {
            var self = this;
            var param = {
                url: URL.URL + "m_order/detail.action",
                headers: {
                    token: self.token,
                    fromType: "web",
                    systemId: Final.systemId.tuoFu
                },
                type: "post",
                data: {
                    orderNum: orderNum
                },
                success: function (model, response, options) {
                    if (response.status == 0) {
                        self.setData(response.result, from);
                        if (typeof callback == 'function') callback(response);
                    }
                    else {
                        console.log(response.message)
                    }
                },
                error: function () {
                }
            };
            this.fetch(param);
        },
        //获取订单状态
        getOrderStatus: function (orderNum, callback) {
            var self = this;
            var param = {
                url: URL.URL + "m_order/detail.action",
                headers: {
                    token: self.token,
                    fromType: "web",
                    systemId: Final.systemId.tuoFu
                },
                type: "post",
                data: {
                    token: self.token,
                    orderNum: orderNum
                },
                success: function (model, response, options) {
                    if (typeof callback == 'function') callback(response);
                },
                error: function () {
                }
            };
            this.fetch(param);
        },
        goPay: function (callback) {
            var self = this;
            var param = {
                url: URL.URL + "m_order/add_sprints.action",
                headers: {
                    token: self.token,
                    fromType: "web",
                    systemId: Final.systemId.tuoFu
                },
                type: "post",
                data: {
                    productId: self.get('submitProductId')
                },
                success: function (model, response, options) {
                    if (typeof callback == 'function') callback(response);
                },
                error: function () {
                }
            };
            this.fetch(param);
        },
        setData: function (data, from) {
            this.set({
                actualAmount: data.orderInfo.actualAmount,
                from: from,
                orderNum: data.orderInfo.orderNum,
                amount: data.orderInfo.amount,
                privilege: data.orderInfo.privilege,
                fromType: data.orderInfo.fromType,
                list: data.list,
                userWalletObj: data.userWalletObj
            });
        }

    });
    return TheCourse;
});