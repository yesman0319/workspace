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
        load: function (id,callback) {
            this.getCourseList(id,function () {
                if (typeof callback == 'function')callback();
            });
        },

        getCourseList: function (id,callback) {
            var self = this;
            var param = {
                // url: URL.baseURL15 + "/yztuofu/course/moreCoursePlayBack.action",
                url: URL.baseURL15 + "course/moreCoursePlayBack.action",
                headers: {
                    token: self.token
                },
                data:{productType:id},
                type: "get",
                success: function (model, response, options) {
                    if (response.status == 0) {
                        self.set({courseList: response.result});
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
        }
    });
    return CourseList;
});