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
  'app/chongci/chongci',
  'app/chongci/zonghe_pigai',
  'app/chongci/speak',
  'app/chongci/tpoRead',
  'app/chongci/tpoListen',
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
], function(BaseCookie, Chongci, ZongHePiGai, Speak, TpoRead, TpoListen, Side, $, Bootstrap, Final, BaseMessage, URL, BaseNavInfo, Login) {
  $.ajaxSetup({
    cache: false
  })
  //document.domain = "yuzhoutuofu.com";
 // Login.init()
  var tokenTmp;
  tokenTmp = BaseCookie.getToken();
  if ("" != tokenTmp && null != tokenTmp) {
    BaseMessage.init()
  }

  store.set("eleNav", "chongCiNav")
  //BaseNavInfo.highLightNav()

  Chongci.init({
    wrap: "#content"
  });

  ZongHePiGai.init({
    wrap: "#content"
  });

  Speak.init({ //机经口语
    wrap: "#content"
  });

  TpoRead.init({ //TPO阅读
    wrap: "#content"
  })
  TpoListen.init({ //TPO阅读
      wrap: "#content"
    })
  // Exercise.load({url: "/index"})
  Side.initChongCi({
    wrap: "#side",
    data: []
  })
})