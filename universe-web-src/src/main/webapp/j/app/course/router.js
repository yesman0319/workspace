define(['backbone'], function () {

    var Router = Backbone.Router.extend({
        routes: {
            "": "index",
            "*error": "notFound"
        },
        initialize: function () {
        },
        basePath: "../j/app/course/",
        index: function () {
            var url = this.basePath + 'index';
            require([url], function (IndexPage) {
                new IndexPage();
            });
        },
        notFound: function (error) {
            console.log('404');
            location.hash = "";
        }
    });

    var router = new Router();
    //router.on('route', function (route, params) {
    //    console.log('hash change', arguments);  //这里route是路由对应的方法名
    //});
    return router;
});