'use strict'

define(function(){
  return [
    '<div class="right-part1">',
    	'<p class="p1 bold black mleft25"><span>{{data[0].title}}</span></p>',
    	'<hr class="mleft25">',
      '{{each data as value index}}',
    	'<p class="left25 top40 font13">',
        '<span class="num bold">{{value.sequence_number}}.</span>',
        '<a id="{{value.id}}" href="#" type="{{value.type}}" category="{{value.category}}" score="{{value.score}}" class="item sim-a" answer_id="{{value.answer_id}}" sequence_number="{{value.sequence_number}}">',
        '{{value.content}}',
        '</a>',
        '{{if value.type == "1"}}',
        '<span class="team-score">-待批</span>',
        /*'<hr class="hr-team">',*/
        '{{else if value.type == "2"}}',
        '<span class="team-score">-{{value.score}}分</span>',
        /*'<hr class="hr-team">',*/
        '{{/if}}',
    	'</p>',
      '{{/each}}',
      '{{if data[0].flag}}',
          '<p class="center">登录之后，查看更多</p>',
           '<div class="one-loginbutton">',
          '<button type="button" class="btn btn1 btn-primary" id="btnLogin">登录</button>',
          '</div>',  
      '{{/if}}',
    '</div>'
  ].join('')
})