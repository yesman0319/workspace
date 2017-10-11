'use strict'

define(function(){
    return [
        '<audio src="" id="selectionAudio">亲 您的浏览器不支持html5的audio标签</audio>',
        '<p class="bold mleft25">',
        	'<span class="pleft15">示例音频:<img src="../../i/i20.png" data-url="{{data.content.questionAudioUrl[0].url}}" class="pleft10 pointer selectAudioImg"></span>',
    		'<span class="font14 mright30 fr">{{data.current_count}}/{{data.group_count}}</span>',
    	'</p>',
        '<table class="table1 mleft25 tingli-table" cellpadding="0" cellspacing="0" style="display: none;">',
	        '{{each data.content.simpleChoices as value index}}',
	        '<tr>',
		        '<td class="td1 word-layout2">',
		        	'<span class="glyphicon glyphicon-ok choicehear voca-back pointer selectWord" data-choice="{{value.optionHead}}"></span>',
		        '</td>',
		        '<td class="volcabulary-space word-layout3">{{value.optionContent}}</td>',
	        '</tr>',
	        '{{/each}}',
        '</table>',
        '<div class="answer-show">',
			'<span>你的答案：<span id="user-anwser"></span></span>',
			'<span>正确答案：<span id="correct-anwser"></span></span>',
		'</div>',
        '{{if data.content.questionImgUrl.length}}',
		'<div class="question-img">',
			'<span>示例图片:</span>',
			'<img src="{{data.content.questionImgUrl[0].url}}"/>',
		'</div>',
		'{{/if}}',
		'<div class="button-box">',
			'<button disabled="disabled" type="button" class="btn btn-primary" id="nextSelectQuestion">下一题</button>',
		'</div>'
//      '{{if data.current_count == data.group_count}}',
//	        '<div class="one-button1" style="display: none;" id="word1SubmitDiv">',
//	        	'<button type="button" class="btn1 btn btn-primary active" id="word1Submit">提交</button>',
//	        '</div>',
//      '{{/if}}'
    ].join('')
})