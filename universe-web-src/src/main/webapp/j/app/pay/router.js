define(['backbone'], function () {

    var Router = Backbone.Router.extend({
        routes: {
            ":from/:orderNum": "index",
            "*error": "notFound"
        },
        initialize: function () {
        },
        basePath: "../j/app/pay/",
        index: function (from,orderNum) {

            require([this.basePath + 'pay',this.basePath+'user'], function (payView,userView) {
                new payView(from,orderNum);
                new userView();
            });
        },
        notFound: function (error) {
            console.log('404');
            location.hash = "";
        },
        switchView: function (view) {
            if (this.currentView) {
                this.currentView.off();
                this.currentView.stopListening();
                this.currentView.undelegateEvents();
            }
            this.currentView = view;
        }
    });

    var router = new Router();
    //router.on('route', function (route, params) {
    //    console.log('hash change', arguments);  //这里route是路由对应的方法名
    //});
    return router;
});