'use strict'

define(function(){
    return [
        '<div class="right-part1">',
        //'<p class="p1 bold black mleft25"><img src="../../i/list-pic.png" style="margin-left:-6px;margin-right:10px;"><span>第{{data.groupSeqNum}}单元结果</span><span class="unit"><a id="grammarUnit" href="#" ></a></span></p>',
        '<p class="p1 bold black mleft25"><img src="../../i/list-pic.png" style="margin-left:-6px;margin-right:10px;"><span>练习报告</span><span class="unit"><a id="grammarUnit" href="#" ></a></span></p>',
        '<hr class="mleft25">',
        '<div class="practice-result">',
        '<img src="../../i/i23.png" class="result-img1">',
        '<div class="i25 correctWrong">',
        '{{if null != data.avg_speed && "" != data.avg_speed}}',
        '{{if data.group_level == 0}}',
        '<p class="font12"><img src="../../i/newimg-0.png"></p>',
        '{{/if}}',
        '{{if data.group_level == 1}}',
        '<p class="font12"><img src="../../i/newimg-4.png"></p>',
        '{{/if}}',
        '{{if data.group_level == 2}}',
        '<p class="font12"><img src="../../i/newimg-1.png"></p>',

        '{{/if}}',
        '{{if data.group_level == 3}}',
        '<p class="font12"><img src="../../i/newimg-2.png"></p>',
        '{{/if}}',
        '{{if data.group_level == 4}}',
        '<p class="font12"><img src="../../i/newimg-3.png"></p>',
        '{{/if}}',
        '{{/if}}',
        '{{if data.isBest}}',
        '<span class="font12 re_orange">最好成绩：</span>',
        '{{else}}',
        '<span class="font12 re_orange">本次成绩：</span>',
        '{{/if}}',
        '<span class="font12 re_orange mright10">正确率：{{data.rate}}</span>',
        '{{if null != data.avg_speed && "" != data.avg_speed}}',
        '<span class="font12 marginTop re_orange mright10">平均速度：{{data.avg_speed}}s/词</span>',
        '{{/if}}',
        '</div>',
        '</div>',
        '<nav class="pagination4 center">',
        '{{each data.records as value index}}',
        '<span class="page">',
        '<a href="##" rel="prev" {{if value.isCorrect}}class="ball-blue"{{else}}class="bred"{{/if}}>{{value.questionSeqNum}}</a>',
        '</span>',
        '{{/each}}',
        '</nav>',
        '<div class="two-button2">',
        '<button type="button" class="btn9 btn btn-primary active " id="grammar-repeat" >再练一遍</button>',
        '<button type="button" class="btn2 btn btn-primary active" id="grammar-onlywrong">重做错题</button>',
        //'<button type="button" class="btn btn-primary btn1 {{if data.canUnLocked!=1}}disabled{{/if}}" id="grammar-nextUnit">下一单元</button>',
        '<button  id="grammar_done" class="btn btn-primary btn1">完成</button>',
        '</div>',


        '<div style="clear:both;"></div>',

        '</div>'

    ].join('')
})