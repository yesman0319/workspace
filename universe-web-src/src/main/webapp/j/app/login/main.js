'use strict'

require.config({
  baseUrl: '../../j',
  urlArgs: "bust=" +  (new Date()).getTime(),
  paths: {
    jquery: 'lib/jquery/1.11.1',
    underscore: 'lib/underscore/1.7',
    render: 'common/render',
    uniqueAjax: 'common/uniqueAjax',
    responser: 'common/responser',
    xml2json: 'lib/xml2json',
    store: 'lib/store',
    valiForm: 'lib/valiForm/5.3.2',
    baseCookie: 'app/baseCookie',
    cookie: 'common/cookie',
    $md5: 'common/jQuery.md5'
  },
  shim: {
    'render': ['uniqueAjax'],
    'uniqueAjax': ['responser'],
    'jplayer': ['jquery'],
    'cookie': ['jquery'],
    'baseCookie': ['jquery', 'cookie'],
    '$md5': ['jquery'],
    'valiForm': ['jquery']
  }
})

require([
  'app/login/login',
  'jquery',
  'cookie'
], function(Login, $) {
  Login.init()
})