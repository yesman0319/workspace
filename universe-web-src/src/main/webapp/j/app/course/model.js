define(['backbone', 'app/baseURL', 'app/baseFinal'], function (Backbone, URL, Final) {
    var CourseList = Backbone.Model.extend({
        defaults: {
            token: 'xiaoma',
            productTypeId: 0,
            //result: [],
            courseList: []
        },
        getToken: function () {
            this.token = $.cookie(Final.TOEFL_TOKEN);
            if ("" == this.token || null == this.token) {
                this.token = "xiaoma";
            }
            return this;
        },
        load: function (callback) {
            this.getCourseList(function () {
                if (typeof callback == 'function')callback();
            });
        },

        getCourseList: function (callback) {
            var self = this;
            var param = {
                url: URL.baseURL15 + "course/coursePlayBack.action",
                // url: URL.baseURL15 + "course/coursePlayBack.action",
                // url: 'http://192.168.0.117/yuzhoutuofu/course/coursePlayBack.action',
                headers: {
                    token: self.token
                },
                type: "get",
                success: function (model, response, options) {
                    if (response.status == 0) {
                        self.set({courseList: self.orderList(response.result)});
                        if (callback) callback();
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
        orderList: function (list) {
            var map={'43':'平日基础班','44':'周末强化班','48':'模考班','49':'点题班','50':'寒暑假班'};
            var newList=[];

            for(var k in list){
                newList.push({id:k,name:map[k],child:list[k]});
            }
            newList = newList.sort(function(before,after){
                return before.id-after.id;
            });
            return newList;
        }
    });
    return CourseList;
});