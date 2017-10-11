 'use strict'

 require.config({
   baseUrl: '../j',
   paths: {
     jquery: 'lib/jquery/1.11.1',
     underscore: 'lib/underscore/1.7',
     render: 'common/render',
     uniqueAjax: 'common/uniqueAjax',
     responser: 'common/responser',
     xml2json: 'lib/xml2json',
     store: 'lib/store',
     bootstrap: 'lib/bootstrap',
     baseFinal: 'app/baseFinal',
     $md5: 'common/jQuery.md5',
     valiForm: 'lib/valiForm/5.3.2',
     baseCookie: 'app/baseCookie',
     cookie: 'common/cookie'
   },
   shim: {
     'render': ['uniqueAjax'],
     'uniqueAjax': ['responser'],
     'baseCookie': ['jquery', 'cookie'],
     'cookie': ['jquery'],
     'bootstrap': ['jquery'],
     '$md5': ['jquery'],
     'valiForm': ['jquery'],
     'xml2json': ['jquery']
   }  
 })

 require([      
   'baseCookie',
   'app/faq/faq',
   'jquery',
   'bootstrap',  
   'app/baseMessage',
   'app/baseFinal',
   'app/baseURL',
   'app/baseNavInfo',
   'app/login/login',
   'app/baseNavClick',
   'app/baseFooter'
 ], function(BaseCookie, Faq, $, Bootstrap, BaseMessage, Final, URL, BaseNavInfo, Login) {
   document.domain = "yuzhoutuofu.com";
   Login.init()
   var tokenTmp;
   tokenTmp = BaseCookie.getToken();
   if ("" != tokenTmp && null != tokenTmp) {
     BaseMessage.init()
   }
   //require(['app/baseURL'])
   BaseCookie.get()
   store.set("eleNav", "homeNav")
   BaseNavInfo.highLightNav()
   // Faq.init()
 })