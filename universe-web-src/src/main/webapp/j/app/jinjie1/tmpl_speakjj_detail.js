'use strict'

define(function(){
    return [
       '<div id="leftDiv" class="left-part">',

       '</div>',

       '<div class="right right-part3">',
       '<div class="rightsidebar h290">',
          '<p class="  jinjing-speak-p"><span id="groupTitle" class="bold" data="1月10/11日机经">1月10/11日机经11121</span></p>',
          '<div class="h200" id="rightitems">',
             '{{each data.questions as value index}}',
                '<hr class="jijing-hr" />',
                //'<p class="mleft25 h40 border-bto"><span class="num bold">{{value.question_sequence_number}}</span><a class="rightItem" data-question_id="{{value.question_id}}" sequence_number="{{value.question_sequence_number}}" content="{{value.question_content}}" href="#" type="1" category="wjj" score="0" answer_id="" sequence_number="1" >{{value.question_content.substr(0,40)+"..."}}</a></p>',
                '{{if data.questionTypeTag==3}}',
                '<p class="mleft25 h40 border-bto"><span class="num bold">{{value.question_sequence_number}}</span><a class=" speakjj-rightItem" data-question_id="{{value.question_id}}" sequence_number="{{value.question_sequence_number}}" content="{{value.content}}" href="#" type="1" category="wjj" score="0" answer_id="" sequence_number="1" >{{value.content.substr(0,40)+"..."}}</a></p>',
                '{{else}}',
                '<p class="mleft25 h40 border-bto"><span class="num bold">{{value.question_sequence_number}}</span><a class=" speakjj-rightItem" data-question_id="{{value.question_id}}" sequence_number="{{value.question_sequence_number}}" content="{{value.question_content}}" href="#" type="1" category="wjj" score="0" answer_id="" sequence_number="1" >{{value.question_content.substr(0,40)+"..."}}</a></p>',
                '{{/if}}',
            '{{/each}}',
          '</div>',
       '</div>',
        '</div>',

       '<div class="modal fade" id="audioPlayModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">',
          '<div class="modal-dialog jinjievideo-style" style="left: 0px;">',
               '<button type="button" class="close jinjievideo-close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>',
               '<div id="audioPlayDiv" style="height: 400px;"></div>',
          '</div>',
       '</div>',
        '<!--音频播放器-->',
        '<audio id="h5Player" autoplay="false" style="display: none;"/> ',
        '<!-- Loding遮盖层 -->',
        '<div id="fade" class="black_overlay">',
        '</div>',
        '<div id="MyDiv" class="white_content">',

        '<div class="img">',
        '<img src="../i/loading.gif">',
        '</div>',
        '</div>',
    ].join('')
})
