define(['backbone','app/baseURL','app/baseFinal'], function (Backbone, URL,Final) {
    var User = Backbone.Model.extend({
        defaults: {
            token:'xiaoma',
            name:'',
            phone:''
        },
        getToken: function () {
            this.token = $.cookie(Final.TOEFL_TOKEN);
            if ("" == this.token || null == this.token) {
                this.token = "xiaoma";
            }
            return this;
        },
        load: function (callback) {
            this.getUser(callback);
        },
        //获取用户信息
        getUser: function (callback) {
            var self = this;
            var param = {
                url: URL.URL + 'm_order/getUserInfo.action',
                headers:{
                    token:self.token,
                    fromType: "web",
                    systemId:Final.systemId.tuoFu
                },
                type: 'post',
                data: {
                    token: self.token
                },
                success: function (model,resp,options) {
                    if(resp.status==0){
                        self.set({
                            name:resp.result.name,
                            phone:resp.result.phone
                        });
                    }

                }
            };
            this.fetch(param);
        },
        //保存用户信息
        saveUser: function (callback) {
            var self = this;
            var param = {
                url: URL.URL + 'm_order/addUserInfo.action',
                headers:{
                    token:self.token,
                    fromType: "web",
                    systemId:Final.systemId.tuoFu
                },
                type: 'post',
                data: {
                    token: self.token,
                    userName: self.get('name'),
                    phone: self.get('phone')
                },
                success: function (model,resp,options) {
                    if(typeof callback =='function') callback(response);
                }
            };
            this.fetch(param);
        }
    });
    return User;
});