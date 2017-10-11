'use strict'

require.config({
  baseUrl: '../j',
  paths: {
    jquery: 'lib/jquery/1.11.1',
    underscore: 'lib/underscore/1.7',
    render: 'common/render',
    uniqueAjax: 'common/uniqueAjax',
    responser: 'common/responser',
    $md5: 'common/jQuery.md5',
    xml2json: 'lib/xml2json',
    store: 'lib/store',
    bootstrap: 'lib/bootstrap',
    jplayer: 'lib/jplayer/2.8.0',
    baseFinal: 'app/baseFinal',
    baseCookie: 'app/baseCookie',
    cookie: 'common/cookie',
    valiForm: 'lib/valiForm/5.3.2',
    baseNavInfo: 'app/baseNavInfo'
  },
  shim: {
    'render': ['uniqueAjax'],
    'uniqueAjax': ['responser'],
    'jplayer': ['jquery'],
    'bootstrap': ['jquery'],
    'baseCookie': ['jquery', 'cookie'],
    'cookie': ['jquery'],
    // 'baseNavInfo': ['jquery', 'store', 'app/baseURL'],
    '$md5': ['jquery'],
    'valiForm': ['jquery'],
    'xml2json': ['jquery']
  }
})

require([
  'baseCookie',
  'app/jinjie/jinjie',
  'app/jinjie/tpoRead',
  'app/jinjie/tpoListen',
  'app/jinjie/speak',
  'app/jinjie/jijing_write',
  'app/jinjie/jijing_zonghe_write',
  'side/side',
  'jquery',
  'bootstrap',
  'app/baseFinal',
  'app/baseMessage',
  'app/baseURL',
  'app/baseNavInfo',
  'app/login/login',
  'app/baseNavClick',
  'app/baseFooter'
], function(BaseCookie, Jinjie,TpoRead, TpoListen,Speak,JJWrite,ZongHeWrite, Side, $, Bootstrap, Final, BaseMessage, URL, BaseNavInfo, Login) {
// ], function(BaseCookie, Jinjie, Side, $, Bootstrap, Final, BaseMessage, URL, BaseNavInfo, Login) {
  $.ajaxSetup({
    cache: false
  })
  //document.domain = "yuzhoutuofu.com";
  //Login.init()
  var tokenTmp;
  tokenTmp = BaseCookie.getToken();
  if ("" != tokenTmp && null != tokenTmp) {
    BaseMessage.init()
  }

  store.set("eleNav", "jinJieNav")
  //BaseNavInfo.highLightNav()

  Jinjie.init({ //TPO阅读
    wrap: "#content"
  })
  TpoListen.init({ //TPO阅读
      wrap: "#content"
    })
  Speak.init({//机经口语
    wrap: "#content"
  });
  //机经写作
  JJWrite.init({wrap:'#content'});

  //综合写作练习
  ZongHeWrite.init({wrap:'#content'});

    // Exercise.load({url: "/index"})
  Side.initJinJie({
    wrap: "#side",
    data: []
  })
})