'use strict'

define(function(){
  return [
      '<div class="right-part1">',
        '<p class="p1 bold black mleft25"><img src="../../i/list-pic.png" style="margin-left:-6px;margin-right:10px;"><span>正在练习第{{data.groupSeqNum}}单元</span><span class="unit"><a id="grammarUnit" href="#" >选择单元</a></span><span class="time-pos"><img src="../../i/time.png"><a href="#">计时：00:00:00</a></span></p>',
            '<hr class="mleft25">',
            '<p class="gram-p">',
            '<span class="num bold">{{data.questionSeqNum}}.</span>{{data.questionContent}}',
            '</p>',

		    '<p class="gram-p1 p2 all-blue">{{data.questionTitle}}:</p><textarea readonly="readonly" class="form-control grammer-textarea1" rows="3">{{data.userInput}}</textarea> ',
		    '<p class="gram-p1 p2 all-blue">标 准 答 案:</p><div class="arrow-up"></div><div class="gram-p1 see-ans">{{data.questionAnswer}}</div>',
    		'<div class="two-button1">',
            '{{if data.lastone}}',
            '<button type="button" class="btn1 btn btn-primary active" id="grammar-next">查看成绩</button>',
            '{{else}}',
            '<button type="button" class="btn1 btn btn-primary active" id="grammar-next">下一题</button>',
            '{{/if}}',

    		/*'<button type="button" class="btn2 btn btn-default active grammer-button1" id="grammar-redo" >重做</button>',
    		'<div style="clear:both;"></div>',
			'</div>',*/
    		

    		'<button type="button" class="btn2 btn btn-default active" id="grammar-redo" >重做</button>',
    		  '</div>',
            '<div style="clear:both;"></div>',


            '</div>'
  ].join('')
})