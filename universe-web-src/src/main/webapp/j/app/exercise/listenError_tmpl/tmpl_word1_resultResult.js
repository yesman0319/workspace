'use strict'

define(function(){
  return [
   '<div class="right-part1">',
   // '<p class="p1 bold black mleft25"><span>练词>听音辨词>Unit<span id="">{{data.group_sequence_number}}</span>练习报告</span><span class="unit"><a href="#" id="wordUnit1">选择单元</a></span></p>',
      '<p class="p1 bold black mleft25">练习报告</p>',
    '<hr class="mleft25" />',
    '{{if data.errorCount != 0}}',
    '<nav class="pagination4 center">',
       '{{each data.allErrWords as value index}}',
        '<span class="page">',
         /*'<a href="##" rel="prev" {{if !value.isError}}class="ball-blue"{{else}}class="bred"{{/if}}>{{value.question_sequence_number}}</a>',*/
      '<a href="##" rel="prev" {{if !value.isError}}class="ball-blue"{{else}}class="bred"{{/if}}>{{index+1}}</a>',
       '</span>',
      '{{/each}}',
      '</nav>',
    // '<div class="family-song">',
    //     '<div class="hear-judge family-yahei">',
    //      '<span>Unit {{data.group_sequence_number}}  对：{{data.correctCount}}  错：{{data.errorCount}}</span>',
    //     '</div>',
    //     '<div class="hear-wrongvoca" style="clear:both;">',
    //     '<p class="bold" style="margin-left:15px;margin-top: 34px;"><span class="word-position"><img src="../../i/list-pic.png" class="list-pic">答错词汇</span></p>',
    //     '<audio src="" id="audioAudio">亲 您的浏览器不支持html5的audio标签</audio>',
    //       '<ul class="hear-unit hear-misvoca">',
    //       '{{each data.errWords as value index}}',
    //         '{{if index % 2 == 0}}',
    //           '<li>',
    //             '<span class="hearvoca2">{{value.question_sequence_number}}.{{value.meaning}}</span>',
    //             '<span class="pleft10 hearvoca1 font12 tingli-mright6">单词<img src="../../i/i20.png" data-url="{{value.word_url}}" class="pleft10 pointer audioImg"></span>',
    //             '<span class="pleft10 hearvoca1 font12">例句<img src="../../i/i20.png" data-url="{{value.sentence_url}}" class="pleft10 pointer audioImg"></span>',
    //           '</li>',
    //         '{{/if}}',
    //         '{{if index % 2 == 1}}',
    //           '<li>',
    //             '<span class="hearvoca2">{{value.question_sequence_number}}. {{value.meaning}}</span>',
    //             '<span class="pleft10 hearvoca1 font12 tingli-mright6">单词<img src="../../i/i20.png" data-url="{{value.word_url}}" class="pleft10 pointer audioImg"></span>',
    //             '<span class="pleft10 hearvoca1 font12">例句<img src="../../i/i20.png" data-url="{{value.sentence_url}}" class="pleft10 pointer audioImg"></span>',
    //           '</li>',
    //         '{{/if}}',
    //         '{{/each}}',
    //      '</ul>',
    //   '</div>',
    '{{else}}',
    '<h4 class="h41">练习结束！错题已全部练完<img src="../../i/i2.png"></h4>',
    '{{/if}}',

   '{{if data.errorCount == 0}}',
     '<div class="two-button2">',
      '<button type="button" class="btn btn-primary active btn9" data-volunit="1" data-volgroupid="1" id="againWord1">再来一遍</button>',
      //'<button type="button" class="btn btn-primary btn1 {{if data.canUnLocked!=1}}disabled{{/if}}" id="nextUnitWord1">完成</button>',
      '{{if !data.isFromPlan}}',
      '<button type="button" class="btn btn-primary btn1" id="showMorePlan">完成</button>',
      '{{/if}}',
    '</div>',
   '{{/if}}',

   '{{if data.errorCount != 0}}',
     '<div class="two-button2">',
      '<button type="button" class="btn btn-primary active btn9" data-volunit="1" data-volgroupid="1" id="againWord1">再来一遍</button>',
      '<button type="button" class="btn btn-primary active btn2" data-volunit="1" data-volgroupid="1" id="errOnlyErrWord1Result">重做错题</button>',
      //'<button type="button" class="btn btn-primary btn1 {{if data.canUnLocked!=1}}disabled{{/if}}" id="nextUnitWord1">完成</button>',
      '{{if !data.isFromPlan}}',
      '<button type="button" class="btn btn-primary btn1" id="showMorePlan">完成</button>',
      '{{/if}}',
     ' </div>',
    '</div>',
   '{{/if}}',
   
  ].join('')
})