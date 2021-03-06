/**
 * Created by SaE on 2015/4/9.
 * 机经写作-做题页
 */
define(function () {
    return [
        '<div class="main mid">',
        '    <div id="leftDiv" class="left-part">',
        '        <div class="h182">',
        '            <p class="p3 gray">',
        '                <span><a href="/html/jinjie.html" class="bold bread-gray pointer">全部练习</a><span class="sign1 bread-gray">&gt;</span></span>',
        '                <span><a href="javascript:;" class="bold bread-gray navjjwrite pointer">机经写作</a></span><span class="sign1 bread-gray">&gt;</span>',
        '                <span><a href="javascript:;" class="bold bread-gray navjjlist pointer" come="{{data.come}}">{{data.cText}}</a></span><span class="sign1 bread-gray">&gt;</span>',
        '                <span><a class="bold tpo-passage">{{data.question_sequence_number}}</a></span>',
        '            </p>',
        '            <hr class="mleft25">',
        '            <p class="left25 sentence" id="sentence" content="">',
        '                <span class="bold" style="padding-right:5px;">{{data.question_sequence_number}}.</span>',
        '                <span id="jjResultContent" qid="{{data.question_id}}" come="{{data.come}}" >{{data.question_content}}</span>',
        '            </p>',
        '        </div>',
        '        <div class="h202">',
        '            <ul class="nav nav-tabs " role="tablist" id="myTab" style="border-bottom: none!important;">',
        '                <li role="presentation" class="active bold">',
        '                    <a href="#Integralgain" role="tab" data-toggle="tab" style="border: 1px solid #fff!important;">答案范例</a>',
        '                </li>',
        '                <li role="presentation" class=" bold">',
        '                    <a href="#Integraluse" role="tab" data-toggle="tab" style="border: 1px solid #fff!important;">讲解视频</a>',
        '                </li>',
        '            </ul>',
        '            <div class="tab-content tpo-write-tab" style="min-height:100px;">',
        '                <!-- 答案范例 -->',
        '                <div role="tabpanel" class="tab-pane active" id="Integralgain">',
        '                    {{each data.sample_content as value index}}',
        '                    <p class="left25" style="margin-right: 25px;">{{#value}}</p>',
        '                    {{/each}}',
        '                </div>',
        '                <!-- 讲解视频 -->',
        '                <div role="tabpanel" class="tab-pane" id="Integraluse">',
        '                    {{each data.question_analysis as value index}}',
        '                       <div class="playthevideo  tpo-fun-round-video pointer" data-source="{{value}}">',
        '                       <span class="tpo-span-style1" data-source="{{value}}">视频{{index+1}}</span>',
        '                       </div>',
        '                    {{/each}}',
        '                </div>',
        '            </div>',
        '        </div>',
        '        <div class="content h300">',
        '            <div class="ans-div3">',
        '                <p class="p4 bold">' +
        '                   <span class="correct-ans1">我的答案:</span>' +
        '                   <span class="gray1" style="float:right;margin-right: 25px;">单词数:<span id="wordContent">0</span></span>',
        '                </p>',
        '                <textarea id="jjWriteAnswer" spellcheck="false" autocomplete="off" class="left25 form-control jijingwrite-tarea" rows="5" placeholder="请输入作文，200-700个单词"></textarea>',
        '                <div class="one-button5" style="margin-top: 50px;margin-left: 0;">',
        '                    <button id="jjWriteSubmit" type="button" class="btn1 btn btn-primary">保存</button>',
        '                </div>',
        '            </div>',
        '',
        '        </div>',
        '    </div>',
        '    <div class="modal fade" id="playDemoVideo" tabindex="-1" role="dialog" >',
        '        <div  class="modal-lg">',
        '            <div style="width:720px;height:26px;background:black;">',
        '            <button type="button" class="close jinjievideo-close" data-dismiss="modal">',
        '                <span >×</span><span class="sr-only">Close</span>',
        '            </button>',
        '            </div>',
        '            <div id="divVideo" style="width:720px;height:420px;background:black;"></div>',
        '        </div>',
        '    </div>',
        '<div class="modal fade in" id="tipModel" tabindex="-1" role="dialog" aria-labelledby="" style="display: none;">',
        '    <div class="modal-dialog">',
        '        <div class="modal-content" style="width:354px;border: 1px solid #C2BFBF;border-top: 7px solid #509bfd;">',
        '            <p id="tipResult" class="feedback-title2">请输入200-700个单词！</p>',
        '            <div class="one-button6">',
        '                <button type="button" data-dismiss="modal" class="btn btn-primary btn-sm feedback-button2 btn1" id="closeTip" style="margin-left:0;">确认</button>',
        '            </div>',
        '        </div>',
        '    </div>',
        '</div>',
        '    <div class="right-part3">',
        '        <div class="rightsidebar h290" style="height:434px;">',
        '            <p class="jinjing-speak-p"><span id="groupTitle" class="bold" >{{data.rightPartTitle}}</span></p>',
        '            <div class="h200" id="partRightList" style="height:392px;">',
        '                {{each data.questions as value index}}',
        '                <hr class="jijing-hr">',
        '                <p class="mleft25 h40 border-bto"><span class="num bold">{{value.question_sequence_number}}.</span>' +
        '                <a qid="{{value.question_id}}" href="#" class="jjwrite" type="{{value.has_answer?1:0}}" come="{{data.come}}" >{{value.question_content}}...</a></p>',
        '                {{/each}}',
        '            </div>',
        '        </div>',
        '    </div>',
        '</div>'
    ].join('');
});