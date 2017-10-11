'use strict'

define(function(){
  return [
  '<div class="right-part1">',
    //'<p class="p1 bold black mleft25"><img src="../../i/list-pic.png" class="list-pic"><span>阅读词汇第<span id="volUnit"></span>单元</span><span class="unit"><a href="#" id="unitVol"></a></span></p>',
      '<p class="p1 bold black mleft25"><img src="../../i/list-pic.png" class="list-pic"><span>练习报告</span></p>',
    '<hr class="mleft25">',
    '{{if data.volErr.length}}',
      '<h4>练习结束！<img src="../../i/i2.png"></h4>',
      '<p style="padding-left:27px;">答错词汇：</p>',
      '{{each data.volErr as value index}}',
        '<div class="table W645">',

          '<ul class="wrong_font">',
              '<li class="vol-space3" >',
                  // '<span class="vol-space1">{{value.volErr.sequenceNumber}}.&nbsp;</span>',
                  '<span class="td1 vol-space4">{{value.volErr.prompt}}</span>',
                  '<span class="mleft25">{{value.volErr.explanation}}</span>',
              '</li>',
              '<li class="vol-space5">',
                  '<span class="all-blue vol_newwid">{{value.volErr.partOfSpeech}}</span>',
                  '<span class="mleft25 gray1">[{{value.volErr.symbols}}]</span>',
              '</li>',
          '</ul>',



        '</div>',
      '{{/each}}',
      '<div class="two-button">', 
      '<button type="button" class="btn btn-primary btn9" data-volUnit={{data.volUnit}} data-volGroupId={{data.volGroupId}} id="againVol">再来一遍</button>',
      '<button type="button" class="btn btn-primary btn2" data-volUnit={{data.volUnit}} data-volGroupId={{data.volGroupId}} id="errOnlyVolErr">重做错题</button>',
      //'<button type="button" class="btn btn-primary btn1 {{if data.canUnLocked!=1}}disabled{{/if}}" id="nextUnitVol">下一题</button>',
      '{{if !data.isFromPlan}}',
      '<button type="button" class="btn btn-primary btn1" id="showMorePlan">完成</button>',
      '{{/if}}',

      '</div>', 
    '{{else if data.volErr.length == 0}}',
      '<h4 class="h41">练习结束！错题已全部练完<img src="../../i/i2.png"></h4>', 
       '<div class="one-button">',
      '<button type="button" class="btn btn-primary btn9" data-volUnit={{data.volUnit}} data-volGroupId={{data.volGroupId}} id="againVol">再来一遍</button>',
      //'<button type="button" class="btn btn-primary active btn1 vol-space8 {{if data.canUnLocked!=1}}disabled{{/if}}" id="nextUnitVol">下一题</button>',
      '{{if !data.isFromPlan}}',
      '<button type="button" class="btn btn-primary btn1" id="showMorePlan">完成</button>',
      '{{/if}}',
      '</div>',
    '{{else}}',
    '{{/if}}',
  '</div>'
  ].join('')
})