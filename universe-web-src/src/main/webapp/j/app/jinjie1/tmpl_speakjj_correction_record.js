'use strict'

define(function(){
    return [
       '<div class="h182">',
          '<p class="p3 gray">',
             '<span><a class="bold bread-gray speakjjUnit pointer" data-target="all">全部练习</a><span class="sign1 bread-gray">&gt;</span></span>',
             '<span><a class="bold bread-gray speakjjUnit pointer speakjj-forcecast-gray" data-target="correction">综合口语</a></span><span class="sign1 bread-gray">&gt;</span>',
             '<span><a class="bold tpo-passage">{{data.question.question_sequence_number}}</a></span>',
             '<script type="text/javascript">$("#groupTitle").html("{{data.group_title}}")</script>',
          '</p>',
          '<hr class="mleft25" />',
          '<p class="left25 sentence" id="sentence">',
          '<span class="bold" style="padding-right:5px;" id="jijing_question_id" category="wjj" jqid="1627" from="exercise">{{data.question.question_sequence_number}}</span>',
          '{{data.question.content}}',
            '<audio src="{{data.question.audio_url}}" controls="controls" style="width:720px;height:50px;" id="audioAudio">亲 您的浏览器不支持html5的audio标签</audio>',
        /*'<div class="audiojsZ newaudio " id="audiojs_wrapper0" style="margin-bottom:20px;">',

               '<audio id="myMusic" src="" preload="auto"></audio>',
               <div class="play-pauseZ">
                    <p class="playZ"></p>
                    <p class="pauseZ"></p>
                    <p class="loadingZ"></p>
                    <p class="errorZ"></p>
                    </div>
                    <div class="newscrubberZ scrubberZ">
                    <div class="progressZ" style="width: 11.781913694159087px;"></div>
                    <div class="loadedZ" style="width:375px;"></div>
                    </div>
                    <div class="timeZ">
                    <em class="playedZ">00:59</em>|
                    <strong class="durationZ">02:21</strong>
                    </div>

                    <div class="error-messageZ"></div>
                    <div class="change-voice">

                    </div>
                    <div class="sound">
                    <div class="play-voice " ></div>
                    <div class="voice-bigger"></div>
                </div>
            '</div>',*/
                '{{if data.question.material}}',
                '<p class="gram-p correct-p"><span><a id="jijingSampleTag" href="#" class="see font-blue ">阅读</a></span></p>',
                '<div id="jijingSampleDiv" class="ans" style="display: block;">',
                    '<p class="left25 sentence" id="" content="" style="width:93%;">{{data.question.material}}</p>',
                '</div>',
                '{{/if}}',
                '{{if data.question.analysis}}',
                '<div class="mleft10">',
                '<ul class="nav nav-tabs nav-write-tabs" role="tablist" id="myTab">',
                /*  '<li role="presentation" class="bold">',
                 '<a class="tabItem" href="#" data-target="Integralgain" id="IntegralgainTab" role="tab" data-toggle="tab">答案范例</a>',
                 '</li>',*/
                '<li role="presentation" class=" active">',
                '<a class="tabItem" href="#" data-target="Integraluse" id="IntegraluseTab" role="tab" data-toggle="tab">讲解视频</a>',
                '</li>',
                '</ul>',
                '<div id="tab_record" class="tab-content tpo-write-tab" >',
                '<span id="flashcontent"></span>',
                '<!-- 中部选项卡1-录音控件 -->',
                '<div role="tabpanel" class="tab-pane " id="Integralgain">',
                '<div class="left25 height90">',

                '</div>',
                '</div>',
                '<!-- 选项卡2-视频播放 -->',
                '<div role="tabpanel" class="tab-pane active" id="Integraluse">',
                '{{if data.question.analysis}}',
                '<div class="tpo-fun-round jijing-fun-round-video pointer audioPlay" data-source="{{data.question.analysis}}"><span class="tpo-span-style1" data-source="{{data.question.analysis}}">视频01</span></div>',
                '{{/if}}',
                '</div>',
                '</div>',
                '</div>',
                '{{/if}}',
       '</div>',
       '<div  class="h202">',
            '<div style="width: 100%;height:40px;"></div>',
         /* '<ul class="nav nav-tabs nav-write-tabs" role="tablist" id="myTab">',
             '<li role="presentation" class="active bold">',
                '<a class="tabItem" href="#" data-target="Integralgain" id="IntegralgainTab" role="tab" data-toggle="tab">答案范例</a>',
             '</li>',
             '<li role="presentation" class=" bold">',
               '<a class="tabItem" href="#" data-target="Integraluse" id="IntegraluseTab" role="tab" data-toggle="tab">讲解视频</a>',
             '</li>',
          '</ul>',*/
          '<div id="tab_record" class="tab-content tpo-write-tab" >',
                 '<span id="flashcontent"></span>',
                '<!-- 中部选项卡1-录音控件 -->',
                '<div role="tabpanel" class="tab-pane active" id="Integralgain">',

                   '<div class="repeat-record">',
                     '<p id="recordTimerP" style="display: none;"><span id="recordTimer">00:00</span>/<span id="recordTotalLength"></span></p>',
                     '<p id="recordTipP"><span id="recordTip">请点击开始录音</p>',
                      '<div><!--开始录音--><img id="startRecord" src="../../i/repeat-pic7.png" class="repeat-pic10 pointer">',
                      '<!--录音中--><img id="recording" style="padding-top:0px;margin-top:-5px;" src="../../i/repeat-pic6.gif" class="repeat-pic10 pointer">',
                      '<!--播放录音--><img id="playRecord" src="../../i/repeat-pic4.png" class="repeat-pic10 pointer">',
                      '<!--播放中--><img id="playingRecord" src="../../i/repeat-pic3.png" class="repeat-pic10"></div>',
                   '</div>',
                   '<div class="two-button2">',
                    '<button type="button" class="btn9 btn btn-primary active" id="speak-reRecord" disabled>重录</button>',
                    '<button type="button" class="btn1 btn btn-primary active" id="speak-saveRecord" disabled>保存</button>',

                      '<form id="uploadForm" name="uploadForm" method="post" action="{{data.uploadUrl}}" enctype="mutltipart/form-data">',
                      '    <input name="auth_token" id="auth_token" type="hidden" value="">',
                      '    <input name="audio_length" id="audio_length" type="hidden" value="">',
                      '    <input name="question_id" id="question_id" type="hidden" value="">',
                      '</form>',
                   '</div>',
                '</div>',
             /*   '<!-- 选项卡2-视频播放 -->',
                '<div role="tabpanel" class="tab-pane" id="Integraluse">',
                    '{{if data.question.question_analysis}}',
                         '<div class="tpo-fun-round jijing-fun-round-video pointer audioPlay" data-source="{{data.question.question_analysis}}"><span class="tpo-span-style1" data-source="{{data.question.question_analysis}}">视频01</span></div>',
                    '{{/if}}',
                '</div>',*/
          '</div>',
       '</div>',

/*        '<div class="modal fade" id="scoreLackModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">',
        '<div class="modal-dialog">',
        '<div class="modal-content" style="width:354px;border: 1px solid #C2BFBF;border-top: 7px solid #509bfd;;">',
        //'<div class="modal-header feedback-header">',
        //    '<span class="feedback-heading">提示</span>',
        //    '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>',
        //    '<!-- <h4 class="modal-title" id="myModalLabel">Modal title</h4> -->',
        //'</div>',
        '<div class="modal-body" style="height:90px;line-height:90px;">',
        '<p class="feedback-title" style="text-align:center;">提交作业将消耗30积分，确认提交？</p>',
        '</div>',
        '<div class="one-button3">',
        '<button type="button" class="btn btn-default btn-sm feedback-button3  " data-dismiss="modal" id="scoreLack_cancel">取消</button>',
        '<button type="button" class="btn btn-primary btn-sm feedback-button2 btn1" id="scoreLack_saved" style="margin-right:15px;">确认</button>',
        '</div>',
        '</div>',
        '</div>',
        '</div>',*/

    ].join('')
})
