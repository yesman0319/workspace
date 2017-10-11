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
        /*'                <span><a href="/html/jinjie.html" class="bold bread-gray pointer">全部练习</a><span class="sign1 bread-gray">&gt;</span></span>',
        '                <span><a href="javascript:;" class="bold bread-gray navzhlist pointer">{{data.cText}}</a></span><span class="sign1 bread-gray">&gt;</span>',
        '                <span><a class="bold tpo-passage">第{{data.question_sequence_number}}题</a></span>', ------ 20160926*/
       	'                <span class="bold bread-gray">{{data.title}}</span>',
        '            </p>',
        '            <hr class="mleft25">',
      /*  '            <p class="left25 sentence bold">',
        '                <span id="jjResultContent" qid="{{data.question_id}}" class="bold" style="padding-right:5px;">综合写作练习 </span>{{data.question_sequence_number}}' ,
        '            </p>',*/
        '            <div class="audiojsZ newaudio" id="audiojs_wrapper0">',
        '                <audio id="myMusic" src="{{data.audio_url}}" preload="auto"></audio>',
        '                <div class="play-pauseZ">',
        '                    <p class="playZ"></p>',
        '                    <p class="pauseZ"></p>',
        '                    <p class="loadingZ"></p>',
        '                    <p class="errorZ"></p>',
        '                </div>',
        '                <div class="newscrubberZ scrubberZ">',
        '                    <div class="progressZ" style="width: 0px;"></div>',
        '                    <div class="loadedZ" style="width:20px;"></div>',
        '                </div>',
        '                <div class="timeZ">',
        '                    <em class="playedZ">00:00</em>|',
        '                    <strong class="durationZ">00:00</strong>',
        '                </div>',
        '                <div class="error-messageZ"></div>',
        '                <div class="change-voice">',
        '                </div>',
        '                <div class="sound setsound" style="margin-left:0;margin-right: 30px;cursor:pointer;">',
        '                    <div class="play-voice" style="width:100%;"></div>',
        '                    <div class="voice-bigger"></div>',
        '                </div>',
        '            </div>',
        //'            <p class="left25 sentence" id="sentence" content="">',
        //'                <span class="bold" style="padding-right:5px;">{{data.question_sequence_number}}.</span>',
        //'                <span id="jjResultContent" qid="{{data.question_id}}" >{{data.question_content}}</span>',
        //'            </p>',
        //'        </div>',
        //'<div class="analysis h202" style="min-height:200px;">',
        '    <ul class="nav nav-tabs " role="tablist" id="myTab" style="border-bottom: none!important;">',
        
        ' {{if data.analysisVideo}}',
        ' <li role="presentation" class="bold active">',
        '    <a href="#Integralgain" role="tab" data-toggle="tab" style="border: 1px solid #fff!important;">讲解视频</a>',
        ' </li>',
        ' {{/if}}',
        ' {{if data.analysisText}}',
        '     <li role="presentation" class=" bold {{if !data.analysisVideo}}active{{/if}}"><a href="#Integraluse" role="tab" data-toggle="tab" style="border: 1px solid #fff!important;">文本范例</a></li>',
        '{{/if}}',
        
        '    </ul>',
        '    <div class="tab-content tpo-write-tab" style="min-height:100px;">',
        '        {{if data.analysisVideo}}',
        '        <!-- 讲解视频 -->',
        '        <div role="tabpanel" class="tab-pane active" id="exampleVideo">',
        '           {{if data.analysis}}',
        '            <div class="playthevideo  tpo-fun-round-video pointer" data-source="{{data.analysis}}">',
        '                <span class="tpo-span-style1" data-source="{{data.analysis}}">视频1</span>',
        '            </div>',
        '           {{/if}}',
        '        </div>',
        '        {{/if}}',
        '       {{if data.analysisText}}',
        '        <!-- 文本范例 -->',
        '        <div role="tabpanel" class="tab-pane {{if !data.analysisVideo}}active{{/if}}" id="exampleText">',
        '           {{if data.textAnalysis}}',
        '                    <p class="left25" style="margin-right: 25px; height:80px;line-height:20px;text-overflow: -o-ellipsis-lastline;overflow: hidden;text-overflow: ellipsis;display: -webkit-box;-webkit-line-clamp:4; -webkit-box-orient: vertical;">{{data.textAnalysis}}</p>',
        '                    <p class="spre" data-spre="0" style="padding-right: 12px;text-align: right;cursor: pointer;line-height: 40px;color: #6bc04b;">展开<span class="ic">&or;</span></p>',
        '           {{/if}}',
        '        </div>',
        '           {{/if}}',
        '    </div>',
        '</div>',
        '        <div class="h202">',
        '            <ul class="nav nav-tabs " role="tablist" id="myTab" style="border-bottom: none!important;">',
        '                <li role="presentation" class="active bold">',
        '                    <a href="#Integralgain" role="tab" data-toggle="tab" style="border: 1px solid #fff!important;">阅读材料</a>',
        '                </li>',
        '                <li role="presentation" class=" bold" id="startWrite">',
        '                    <a href="#Integraluse" role="tab" data-toggle="tab" style="border: 1px solid #fff!important;">写作文</a>',
        '                </li>',
        '            </ul>',
        '            <div class="tab-content tpo-write-tab" style="min-height:100px;padding-top:8px;">',
        '                <div role="tabpanel" class="tab-pane active" id="Integralgain">',
        '                    <p class="left25" style="margin-right: 25px;">{{data.question_content}}</p>',
        '                </div>',
        '                <div role="tabpanel" class="tab-pane" id="Integraluse">',
        '                   <div class="ans-div3">',
        '                       <p class="p4 bold">',
        '                          <span class="gray1" style="float:right;margin-right: 20px;">计时 <span id="writeSpendTime">00:00:00</span></span>',
        '                          <span class="gray1" style="float:right;margin-right: 25px;">单词数:<span id="wordContent">0</span></span>',
        '                       </p>',
        '                       <textarea id="jjWriteAnswer1" onpaste="return false" spellcheck="false" autocomplete="off" style="width:94%;" class="left25 form-control jijingwrite-tarea" rows="5" placeholder="请输入作文，150-500个单词"></textarea>',
        '                       <div class="one-button5" style="margin-top: 50px;margin-left: 0;">',
        '                           <button id="btnSubmits" type="button" class="btn1 btn btn-primary">保存</button>',
        '                       </div>',
        '                   </div>',
        '                </div>',
        '            </div>',
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
        '        <div class="modal-content" style="width:354px;border: 1px solid #C2BFBF;border-top: 7px solid #00bb51;">',
        '            <p id="tipResult" class="feedback-title2">请输入150-500个单词！</p>',
        '            <div class="one-button6">',
        '                <button type="button" data-dismiss="modal" class="btn btn-primary btn-sm feedback-button2 btn1" id="closeTip" style="margin-left:0;">确认</button>',
        '            </div>',
        '        </div>',
        '    </div>',
        '</div>',
        /*'    <div class="right-part3">',
        '        <div class="rightsidebar h290" style="height:434px;">',
        '            <p class="jinjing-speak-p"><span id="groupTitle" class="bold" >{{data.rightPartTitle}}</span></p>',
        '            <div class="h200" id="partRightList" style="height:392px;">',
        '                {{each data.questions as value index}}',
        '                <hr class="jijing-hr">',
        '                <p class="mleft25 h40 border-bto"><span class="num bold">{{value.question_sequence_number}}.</span>' +
        '                <a qid="{{value.question_id}}" href="#" class="zonghe" type="{{value.type}}"  >{{value.right_content}}</a></p>',
        '                {{/each}}',
        '            </div>',
        '        </div>',
        '    </div>', ------------20160905日去掉右侧目录栏*/
        '</div>'
    ].join('');
});