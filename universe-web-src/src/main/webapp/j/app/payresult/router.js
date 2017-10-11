define(['backbone'],function(){
    var MyRouter = Backbone.Router.extend({
        // Hash maps for routes
        routes: {
            "": "index",
            "success/:tag/:ordernum": "paySuccess",
            "fail/:tag": "defaultFail",
            "fail/:tag/:ordernum": "payFail",
            "*error": "fourOfour"
        },
        index: function () {
            var app = new Fail.FailView('changxue');
            this.switchView(app);
        },
        leftSideMapping: function () {
        },
        paySuccess: function (tag, ordernum) {
            if (!tag) {
                tag = 'haoke';
            }
            require(['app/payresult/pay_success'],function(Succ){
                var app = new Succ.SuccessView(tag, ordernum);
                this.switchView(app);
            });
        },
        defaultFail: function (tag) {
            if (!tag) {
                tag = 'haoke';
            }
            var app = new Fail.FailView(tag, 0);
            this.switchView(app);
        },
        payFail: function (tag, ordernum) {
            var self=this;
            if (!tag) {
                tag = 'haoke';
            }
            require(['app/payresult/pay_fail'],function(Fail){
                var app = new Fail.FailView(tag, ordernum);
                self.switchView(app);
            });
        },
        switchView: function (view) {
            if (this.currentView) {
                this.currentView.off();
                this.currentView.stopListening();
                this.currentView.undelegateEvents();
            }
            this.currentView = view;
        },
        fourOfour: function (error) {
            // 404 page
        }
    });
    var router = new MyRouter();
    return router;
});