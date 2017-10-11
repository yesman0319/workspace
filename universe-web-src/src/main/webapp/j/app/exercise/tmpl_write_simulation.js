'use strict'

define(function(){
  return [
    '<div class="right-part2">',
     	'<ul class="nav nav-tabs" role="tablist" id="myTab">',
      '{{each data.groups as value index}}',
        '<li role="presentation" class="li-style1 bold {{if index == 0}}active{{/if}}"><a href="#" id="{{value.id}}" class="wslTab" role="tab" data-toggle="tab" style="text-align:center;">{{value.name}}</a></li>',
      '{{/each}}',
      '</ul>',

      '<div class="tab-content">',
        '<div role="tabpanel" class="tab-pane active" id="wslContent">',
          '{{each data.questions as val idx}}',
              '<p class="left25 top40 font13">',
                '<span class="num bold">{{val.sequence_number}}.</span>',
                '<a id="{{val.id}}" href="#" category="{{data.category}}" score="{{val.score}}" type="{{val.type}}" class="item sim-a" answer_id="{{val.answer_id}}" sequence_number="{{val.sequence_number}}">',
                  '{{val.content}}',
                '</a>',
                '{{if val.type == "1"}}',
                '<span class="team-score">-待批</span>',
              /*  '<hr class="hr-team">',*/
                '{{else if val.type == "2"}}',
                '<span class="team-score">-{{val.score}}分</span>',
                /*'<hr class="hr-team">',*/
                '{{/if}}',
              '</p>',
          '{{/each}}',
          '{{if data.flag}}',
            '<p class="center">登录之后，查看更多</p>',
             '<div class="one-loginbutton">',
            '<button type="button" class="btn btn1 btn-primary" id="btnLogin">登录</button>', 
            '</div>', 
          '{{/if}}',
        '</div>',
      '</div>',
    '</div>'
  ].join('')
})