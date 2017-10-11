'use strict'

define(['lib/art/3.0'], function( Template) {

  var convJSON2Data =  function(json){
    var data, len = 0, errorList
      len = json && json.data && json.data.length || 0
      len?data = json.data: data=[]
      return data
  }

  var render =  function(param){
    if($.type(param.tmpl) == "string"){
      _render(param.wrap, param.tmpl)
      if($.type(param.afterRender) == "function"){
        param.afterRender()
      }
    }else{
      require([param.tmpl.tmplName],function(tmplStr){
        var renderData = {data: param.tmpl.tmplData || {}}
        _render(param.wrap, Template.compile(tmplStr)(renderData),param)
        if($.type(param.afterRender) == "function"){
          param.afterRender()
        }
      })
    }
  }

  var _render  = function($wrap, html,param){
    if(param['isAppend'] ) {
       $wrap.append(html)
    } else {
      $wrap.html(html)
    }
    
  }

  return {
    render: render,
    convJSON2Data: convJSON2Data
  }
})