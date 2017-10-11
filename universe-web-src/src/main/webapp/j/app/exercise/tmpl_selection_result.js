'use strict'

define(function(){
  return [
   '<div class="right-part1">',
	    '<p class="p1 bold black mleft25"><img src="../../i/list-pic.png" style="margin-left:-6px;margin-right:10px;"><span>练习报告</span><span class="unit"><a id="selectUnit" href="#" ></a></span></p>',
	    '<hr class="mleft25" />',
	    '<div class="family-song" >',
	      	'<div style="text-align: center;" margin-bottom:30px;">',
				'{{if data.rate < 50}}',
					'<img src="../../i/i23.png">',
				'{{else if data.rate >= 50 && data.rate <= 80 }}',
		       		'<img src="../../i/i22.png">',
	       		'{{else if data.rate > 80 && data.rate < 100 }}',
	       			'<img src="../../i/i21.png">',
	       		'{{else if data.rate == 100}}',
	       			'<img src="../../i/i24.png" style="width:100%;">',
	   			'{{/if}}',
		       	'<div class="i25">',
			        '{{if null != data.avg_speed && "" != data.avg_speed}}',
			            '{{if data.group_level == 0}}',
			              	'<p class="font12"><img src="../../i/newimg-0.png"></p>',
			            '{{else if data.group_level == 1}}',
			              	'<p class="font12"><img src="../../i/newimg-4.png"></p>',
			            '{{else if data.group_level == 2}}',
			              	'<p class="font12"><img src="../../i/newimg-1.png"></p>',
			            '{{else if data.group_level == 3}}',
			              	'<p class="font12"><img src="../../i/newimg-2.png"></p>',
			            '{{else if data.group_level == 4}}',
			              	'<p class="font12"><img src="../../i/newimg-3.png"></p>',
			            '{{/if}}',
			        '{{/if}}',
				        '<span class="font12 re_orange">本次练习：</span>',
				        '<span class="font12 re_orange  mright10">正确率：{{data.rate}}%</span>',
			        '{{if null != data.avg_speed && "" != data.avg_speed}}',
			          	'<span class="font12 marginTop re_orange  mright10">平均速度：{{data.avg_speed}}/题</span>',
			        '{{/if}}',
		       	'</div>',
		    '</div>',
	  	'</div>',
			'<nav class="pagination4 center" style="margin-top:50px;">',
		   	'{{each data.records as value index}}',
			    '<span class="page">',
			   		'<a href="##" rel="prev" {{if !value.isError}}class="ball-blue"{{else}}class="bred"{{/if}}>{{value.question.sequence_number_order}}</a>',
			   	'</span>',
		  	'{{/each}}',
	  	'</nav>',
     	'<div class="two-button2">',
	      	'<button type="button" class="btn btn-primary active btn9" data-volunit="1" data-volgroupid="1" id="againSelection">再来一遍</button>',
	      	'{{if data.errWords.length}}',
	      		'<button type="button" class="btn btn-primary active btn2" data-group_level="{{data.group_level}}" data-volunit="1" data-volgroupid="1" id="errOnlySelection">重做错题</button>',
	      	'{{else}}',
		      	'{{if !data.isFromPlan}}',
		      		'<button type="button" class="btn btn-primary btn1" id="showMorePlan">完成</button>',
		      	'{{/if}}',
	      	'{{/if}}',
    	'</div>',
    '</div>'
  ].join('')
})