'use strict';

require.config({
    baseUrl: '../j',
    paths: {
        jquery: 'lib/jquery/1.11.1',
        underscore: 'lib/underscore/1.7',
        bootstrap: 'lib/bootstrap.min',
        baseCookie: 'app/baseCookie',
        cookie: 'common/cookie',
        $md5: 'common/jQuery.md5',
        valiForm: 'lib/valiForm/5.3.2',
        backbone: 'lib/backbone/backbone-min',
        text: 'lib/requirejs/text',
        BASEURL: 'app/baseURL'
    },
    shim: {
        'bootstrap': ['jquery'],
        'baseCookie': ['jquery', 'cookie'],
        'cookie': ['jquery'],
        'valiForm': ['jquery'],
        '$md5': ['jquery'],
        'backbone': ['underscore']
    }
});

require(
    ['require',
        'app/pay/router',
        'app/baseMessage',
        'app/baseNavInfo',
        'app/baseNavClick',
        'baseCookie',
        '../../j/app/login/login.js',
        'bootstrap',
        'app/baseFooter'],
    function (require, Router, BaseMessage, BaseNavInfo, BaseNavClick, BaseCookie, Login) {
        $.ajaxSetup({
            cache: false
        });

        Backbone.history.start();

    });

