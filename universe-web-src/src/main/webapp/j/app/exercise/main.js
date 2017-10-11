'use strict'

require.config({
  baseUrl: '../j',
  paths: {
    jquery: 'lib/jquery/1.11.1',
    underscore: 'lib/underscore/1.7',
//  render: 'common/render',
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
    baseNavInfo: 'app/baseNavInfo',
    audioControl: 'lib/audiojs/audio.min',
    BASEURL: 'app/baseURL'
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
    'xml2json': ['jquery'],
    'audioControl': {
      //deps: ['jquery'],
      exports: 'audiojs'
    }
  }
});

require([
  'baseCookie',
  'app/exercise/exercise',
  'app/exercise/volcabulary',
  'app/exercise/dictation',
  'app/exercise/listen_write_exercise', 
  'app/exercise/grammar',
  'app/exercise/writeCorrect',
  'app/exercise/listen',
  'app/exercise/selection',
  'app/exercise/history',
  'app/exercise/repeat',
  'app/exercise/tpo_write',
  'app/exercise/templateRewrite',
  'app/jinjie/jinjie',
  'app/jinjie/tpoRead',
  'app/jinjie/tpoListen',
  'app/jinjie/speak',
  'app/jinjie/jijing_write',
  'app/jinjie/jijing_zonghe_write',
  'jquery',
  'bootstrap',
  'app/exercise/rewrite',
  'app/baseFinal',
  'app/baseMessage',
  'app/baseURL',
  'app/baseNavInfo',
  'app/login/login',
  'app/baseNavClick',
  'app/baseFooter'
], function(BaseCookie, Exercise, Volcabulary, Dication, ListenWrite, Grammar, WriteCorrect, Listen,Selection, History, Repeats, TpoWrite, TemplateRewrite, Jinjie, TpoRead, TpoListen,Speak,JJWrite,ZongHeWrite, $, Bootstrap, Rewrite, Final, BaseMessage, URL, BaseNavInfo, Login) {
  $.ajaxSetup({
    cache: false
  });
  //document.domain = "yuzhoutuofu.com";
  //Login.init();
  var tokenTmp;
  tokenTmp = BaseCookie.getToken();
  if ("" != tokenTmp && null != tokenTmp) {
    BaseMessage.init()
  }
  // if(BaseCookie.get()) {
  var sideObj = {
    wrap: "#side",
    data: [{
        id: "side1",
        content: "练习历史"
      }, {
        id: "side8",
        content: "阅读词汇"
      }, {
        id: "side2",
        content: "语法"
      }, {
        id: "side3",
        content: "听写"
      }
      // , {
      //   id: "side4",
      //   content: "记忆复写"
      // }
    ]
  };
  store.set("eleNav", "exeNav");
  //BaseNavInfo.highLightNav();
  History.init({
    wrap: "#content"
  });
  Volcabulary.init({
    wrap: "#content"
  });
  Dication.init({
    wrap: "#content"
  });
  ListenWrite.init({
	    wrap: "#content"
  });
  Grammar.init({
    wrap: "#content"
  });
  WriteCorrect.init({
    wrap: "#content"
  });
  Listen.init({
    wrap: "#content"
  });
  Selection.init({
    wrap: "#content"
  });
  Rewrite.init({
    wrap: "#content"
  });
  Repeats.init({
    wrap: "#content"
  });
  TpoWrite.init({
    wrap: "#content"
  });
  TemplateRewrite.init({
    wrap: "#content"
  });
  //Side.init(sideObj);
  // store.set("eleNav", "exeNav")

/*进阶*/
  Jinjie.init({ //TPO阅读进阶
    wrap: "#content"
  })
  TpoListen.init({ //TPO听力(进阶、题型)
      wrap: "#content"
    })
    TpoRead.init({ //TPO阅读题型
      wrap: "#content"
    })
  Speak.init({//机经口语
    wrap: "#content"
  });
  //机经写作
  JJWrite.init({wrap:'#content'});

  //综合写作练习
	ZongHeWrite.init({wrap:'#content'});

  //20160908
	exerciseApi.Volcabulary=Volcabulary;//阅读词汇
	  exerciseApi.Grammar=Grammar;//语法
	  exerciseApi.Dication=Dication;//听写
	  exerciseApi.ListenWrite=ListenWrite;//听写测试模块 根据 Dication（听写）模块而修改添加的新模块
	  exerciseApi.Listen=Listen;//音义互辩
	  exerciseApi.Rewrite=Rewrite;//记忆复写
	  exerciseApi.TpoWrite=TpoWrite;//综合填空
      exerciseApi.TemplateRewrite=TemplateRewrite;//新增模板练习(记忆复写改版)
	  exerciseApi.Jinjie=Jinjie;//TPO阅读
	  exerciseApi.TpoRead=TpoRead;//TPO阅读题型
	  exerciseApi.TpoListen=TpoListen;//TPO听力
	  exerciseApi.Speak=Speak;//独立口语
	  exerciseApi.JJWrite=JJWrite;//独立写作
	  exerciseApi.ZongHeWrite=ZongHeWrite;//综合写作
	  exerciseApi.Selection=Selection;//普适性选择题
    // Exercise.load({url: "/index"})

  exerciseEventManager.dispatchEvent("mainLoadEnd");

});