'use strict'

define(function(){
    return [
       '<div id="leftDiv" class="left-part">',

       '</div>',

       '<div class="right right-part3">',
       '<div class="rightsidebar h290">',
          '<p class="jinjing-speak-p"><span id="groupTitle" class="bold" data="1月10/11日机经"></span></p>',
          '<div class="h200" id="rightitems">',
             '{{each data.questions as value index}}',
                '<hr class="jijing-hr" />',
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

        '<!--信息提示框-->',
        '<div class="modal fade" id="scoreLackModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">',
            '<div id="scoreLackModalDialog" class="modal-dialog">',
                '<div class="modal-content" style="width:354px;border: 1px solid #C2BFBF;border-top: 7px solid #509bfd;;">',
                    '<div class="modal-body" style="height:90px;vertical-align: middle">',
                        '<p class="feedback-title" style="position:static !important;text-align:center;font-size:14px; line-height:30px;">提交作业将消耗30积分，确认提交？</p>',
                    '</div>',
                    '<div class="one-button3">',
                        '<button type="button" class="btn btn-default btn-sm feedback-button3  " data-dismiss="modal" id="scoreLack_cancel">取消</button>',
                        '<button type="button" class="btn btn-primary btn-sm feedback-button2 btn1" id="scoreLack_saved" style="margin-right:15px;">确认</button>',
                    '</div>',
                '</div>',
            '</div>',
        '</div>',

        '<div class="modal fade" id="errorTip" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">',
            '<div class="modal-dialog">',
                '<div class="modal-content" style="width:354px;border: 1px solid #C2BFBF;border-top: 7px solid #509bfd;;">',

                    '<div class="modal-body" style="height:90px;line-height:90px;">',
                        '<p id="errorMsg" class="feedback-title" style="text-align:center;">您的积分不足，无法提交？</p>',
                    '</div>',
                    '<div class="one-button3">',
                        '<button type="button" class="btn btn-primary btn-sm feedback-button2 btn1" id="errorTip_sure" style="margin-right:80px;">确认</button>',
                    '</div>',
                '</div>',
            '</div>',
        '</div>',

        '<div class="modal fade in" id="payModel" tabindex="-1" role="dialog" style="display: none;">',
        '    <div class="modal-dialog" >',
        '       <div class="modal-content " style="width:354px;border: 1px solid #C2BFBF;border-top: 7px solid #509bfd;;" >',
        '           <div class="modal-body" style="height:90px;line-height:90px;" >',
        '               <p class="feedback-title" style="text-align:center;font-size:14px;" >已完成支付？</p>',
        '           </div>',
        '           <div style="text-align:center;">',
        '           <button type="button" data-dismiss="modal" class="btn btn-warning btn-sm " id="payFail">支付遇到问题</button>',
        '           <button type="button" data-dismiss="modal" class="btn btn-primary btn-sm  btn1" id="paySuccess">支付成功</button>',
        '           </div>',
        '       </div>',
        '    </div>',
        '</div>',
    ].join('')
})
