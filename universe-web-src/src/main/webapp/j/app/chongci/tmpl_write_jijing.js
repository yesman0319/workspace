'use strict';
/*
独立写作列表
*/
define(function(){
  return [
    '<div class="right-part2">',
    //'<p class="p1 bold black mleft25"><img src="../../i/list-pic.png" style="margin-left:-10px;margin-right:10px;"><span>{{data[0].title}}</span></p>',
    //'<hr class="mleft25">',
    //'<ul class="nav nav-tabs" role="tablist" id="myTab">',
    //  '{{each data.groups as value index}}',
    //    '<li role="presentation" class="li-style1 bold {{if index == 0}}active{{/if}}"><a href="#" id="{{value.group_id}}" class="lipadd yuceTab" role="tab" data-toggle="tab" style="text-align:center;">{{value.group_title}}</a></li>',
    //  '{{/each}}',
    //'</ul>',
    '<ul class="tabWrite tabs_new forecast_tabs" role="tablist" id="myTab">',
    '{{each data.groups as value index}}',
    '<li role="presentation" class="{{if index == 0}}current{{/if}}"><a href="#" id="{{value.group_id}}" class="yuceTab " style="width:140px;">{{value.group_title}}</a></li>',
    '{{/each}}',
    '</ul>',

    '<div class="tab-content jijing-tab-style">',
    '<div role="tabpanel" class="tab-pane active " id="yuceContent">',

    '{{each data as value index}}',
    '   {{if value.type==1}}',
    '   <p class="duliwrite left25 mleft20 font13 jj-speak-padding" id="{{value.id}}" type="{{value.type}}" category="wjj" score="{{value.score}}" answer_id="{{value.answer_id}}" sequence_number="{{value.sequence_number}}" style="padding-left:40px;">',
    '       {{if (value.category_fanwei==1)}}<span class="jjyc_bluebg"><span class="font14 jjyc_bgfont">大范围</span></span>',
    '       {{else if (value.category_fanwei==2)}}<span class="jjyc_bluebg"><span class="font14 jjyc_bgfont">大范围</span></span>{{/if}}',
    '       <span class="num bold sin_num">{{value.sequence_number}}</span>',
    '       <a href="#" category="wjj" class=" sim-width510" style="display:inline-block;width: 501px;margin-left:20px;">{{value.content}}</a>',
    '       <span class="fright pg_red">已保存</span>',
    '   </p>',
    '   {{else if value.type==2}}',
    '   <p class="duliwrite left25 mleft20 font13 jj-speak-padding" id="{{value.id}}" type="{{value.type}}" category="wjj" score="{{value.score}}" answer_id="{{value.answer_id}}" sequence_number="{{value.sequence_number}}" style="padding-left:40px;">',
    '       {{if (value.category_fanwei==1)}}<span class="jjyc_bluebg"><span class="font14 jjyc_bgfont">大范围</span></span>',
    '       {{else if (value.category_fanwei==2)}}<span class="jjyc_bluebg"><span class="font14 jjyc_bgfont">大范围</span></span>{{/if}}',
    '       <span class="num bold sin_num">{{value.sequence_number}}</span>',
    '       <a href="#" category="wjj" class=" sim-width510" style="display:inline-block;width: 501px;margin-left:20px;">{{value.content}}</a>',
    '       <span class="fright pg_red">等待老师抢作业</span>',
    '   </p>',
    '   {{else if value.type==3}}',
    '   <p class="duliwrite left25 mleft20 font13 jj-speak-padding" id="{{value.id}}" type="{{value.type}}" category="wjj" score="{{value.score}}" answer_id="{{value.answer_id}}" sequence_number="{{value.sequence_number}}" style="padding-left:40px;">',
    '       {{if (value.category_fanwei==1)}}<span class="jjyc_bluebg"><span class="font14 jjyc_bgfont">大范围</span></span>',
    '       {{else if (value.category_fanwei==2)}}<span class="jjyc_bluebg"><span class="font14 jjyc_bgfont">大范围</span></span>{{/if}}',
    '       <span class="num bold sin_num">{{value.sequence_number}}</span>',
    '       <a href="#" category="wjj" class=" sim-width510" style="display:inline-block;width: 501px;margin-left:20px;" >{{value.content}}</a>',
    '       <span class="fright pg_red">已有{{value.grap_amount}}位老师抢作业</span>',
    '   </p>',
    '   {{else if value.type==4}}',
    '   <p class="duliwrite left25 mleft20 font13 jj-speak-padding" id="{{value.id}}" type="{{value.type}}" category="wjj" score="{{value.score}}" answer_id="{{value.answer_id}}" sequence_number="{{value.sequence_number}}" style="padding-left:40px;">',
    '       {{if (value.category_fanwei==1)}}<span class="jjyc_bluebg"><span class="font14 jjyc_bgfont">大范围</span></span>',
    '       {{else if (value.category_fanwei==2)}}<span class="jjyc_bluebg"><span class="font14 jjyc_bgfont">大范围</span></span>{{/if}}',
    '       <span class="num bold sin_num">{{value.sequence_number}}</span>',
    '       <a href="#" category="wjj" class=" sim-width510" style="display:inline-block;width: 501px;margin-left:20px;" >{{value.content}}</a>',
    //'       <span class="left25 bgray round rewrite-percentnew " ><span class="number">待批改</span></span>',
    '       <span class="fright pg_red">待批改</span>',
    '   </p>',
    '   {{else if value.type==5}}',
    '   <p class="duliwrite left25 mleft20 font13  jj-speak-padding" id="{{value.id}}" type="{{value.type}}" category="wjj" score="{{value.score}}" answer_id="{{value.answer_id}}" sequence_number="{{value.sequence_number}}" style="padding-left:40px;">',
    '       {{if (value.category_fanwei==1)}}<span class="jjyc_bluebg"><span class="font14 jjyc_bgfont">大范围</span></span>',
    '       {{else if (value.category_fanwei==2)}}<span class="jjyc_bluebg"><span class="font14 jjyc_bgfont">大范围</span></span>{{/if}}',
    '       <span class="num bold sin_num">{{value.sequence_number}}</span>',
    '       <a href="#" category="wjj" class=" sim-width510" style="display:inline-block;width: 501px;margin-left:20px;" >{{value.content}}</a>',
    '       <span class="left25 b-blue round rewrite-percentnew " ><span class="number">{{value.score}}分</span></span>',
    '   </p>',
    '   {{else}}',
    '   <p class="duliwrite left25 mleft20 font13 jj-speak-padding" id="{{value.id}}" type="{{value.type}}" category="wjj" score="{{value.score}}" answer_id="{{value.answer_id}}" sequence_number="{{value.sequence_number}}" style="padding-left:40px;">',
    '       {{if (value.category_fanwei==1)}}<span class="jjyc_bluebg"><span class="font14 jjyc_bgfont">大范围</span></span>',
    '       {{else if (value.category_fanwei==2)}}<span class="jjyc_bluebg"><span class="font14 jjyc_bgfont">大范围</span></span>{{/if}}',
    '       <span class="num bold sin_num">{{value.sequence_number}}</span>',
    '       <a href="#" category="wjj" class="sim-a2" style="display:inline-block;width: 501px;margin-left:20px;" >{{value.content}}</a>{{if value.is_today_task}}<span class="orange left16">今日任务</span>{{/if}}',
    '   </p>',
    '   {{/if}}',
    '{{/each}}',
    '</div>',
    '</div>',

    '{{if data[0].flag}}',
    '<p class="center">登录之后，查看更多</p>',
    '<div class="one-loginbutton">',
    '<button type="button" class="btn btn1 btn-primary" id="btnLogin">登录</button>',
    '</div>',
    '{{/if}}',
    '</div>'
  ].join('')
});