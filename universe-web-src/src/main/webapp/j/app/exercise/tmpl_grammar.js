'use strict'

define(function(){
  return [
      '<div class="right-part1">',
        '<p class="p1 bold black mleft25">',
	  		'<img src="../../i/list-pic.png" style="margin-left:-6px;margin-right:10px;">',
//	  		'<span onselectstart = "return false">语法第{{data.groupSeqNum}}单元({{data.groupType}})</span>',
					'<span>{{data.title}}</span>',
	  		'<span class="unit">',
	  			//'<a id="grammarUnit" href="#" >选择单元</a>',
	  			'<a id="grammarUnit" href="#" ></a>',
	  		'</span>',
	  		'{{if !data.hideTestTimer}}',
			'<span class="unit time-pos" id="timerspan"><img src="../../i/time.png"><a id="testTimerA" style="cursor:pointer;"><span id="timeBtnStaus" style="color:#00bb51">计时</span>',
	  				'<span id="testTimerShow" style="color:#00bb51;"  {{if data.testTimerStatus=="hide"}} style="display:none; color:#00bb51;"{{/if}}>:<span id="testTimer1" style="color:#00bb51">{{data.currentTestTimeStr || "00:00:00"}}</span></span>',
	  		'</a></span>',
	  		'{{/if}}',
	  		'</p>',
            '<hr class="mleft25">',
            '<p class="gram-p" style="overflow:hidden;">',
	            '<span class="bold num grammar-totalCount" onselectstart = "return false;" style="display: block;float:left;padding-right:0px;">{{data.questionSeqNum}}</span>',
	            '<span style="padding-left:10px;display: block;float:left; width:620px;" name="grammar-subject" id="grammar-subject">{{data.questionContent}}</span>',
            '</p>',
            '{{if data.questionTranslation}}',
            '<div class="translation-p" style="display:none">',
            	'<div class="bold grammar-totalCount" style="visibility:hidden; float:left;">{{data.questionSeqNum}}</div>',
	            '<div style="padding-left:10px;float:left; width:620px;" id="grammar-translation">{{data.questionTranslation}}</div>',
            '</div>',
            '{{else}}',      
            	'<div class="translation-p" style="display:none">',
	            	'<div class="bold grammar-totalCount" style="visibility:hidden; float:left;">{{data.questionSeqNum}}</div>',
		            '<div style="padding-left:10px;float:left; width:620px;" id="grammar-translation">暂无译文！</div>',
            	'</div>',
            '{{/if}}',
		    '{{if (data.groupType == "emphases") || (data.groupType == "重点")}}',
		    '<p style="clear:both;" class="p1 mleft25 black">请选单词完成语法点构成：</p>',
		    '{{else}}',
		     '<p  style="clear:both;" class="p1 mleft25 black">请找出各语法点对应的句子：</p>',
		    '{{/if}}',
		    '<p class="gram-p1 p2 black">{{data.questionTitle}}</p><textarea id="uinput" class="form-control grammer-textarea1" rows="3" placeholder="在题干中选中即可..."></textarea>',
		    '<p class="gram-p2">',
		    '<span><a id = "grammarAnswer" href="#" class="see">查看答案</a></span>',
		    '<span><a id = "grammarTranslation" href="#">查看译文</a></span>',
		    '</p>',
		    '<div id="grammarAnswerDiv" class="ans-grammer" style="display:none;">',
		      '<div class="arrow-up">',
		      '</div>',
		      '<div class="gram-p1 see-ans">',
		        '{{data.questionAnswer}}',
		      '</div>',
		    '</div>',
		    '<div class="one-button2">',
    		'{{if data.lastone}}',
    			'<button type="button" class="btn1 btn btn-primary active" id="recorded">提交</button>',
        	'{{else}}',
    			'<button type="button" class="btn1 btn btn-primary active" id="recorded">下一题</button>',
        	'{{/if}}',
			'</div>',
			'</div>'
  ].join('')
})