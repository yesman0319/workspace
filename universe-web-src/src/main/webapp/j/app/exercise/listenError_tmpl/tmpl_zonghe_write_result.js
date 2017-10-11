/**
 * Created by SaE on 2015/4/9.
 * 机经写作-用户做题记录列表页
 */
define(function () {
    return [
        '<div class="main mid">',
        '    <div id="leftDiv" class="left-part">',
        '        <div class="h182">',
        '            <p class="p3 gray">',
        '                <span><a href="/html/jinjie.html" class="bold bread-gray pointer">全部练习</a><span class="sign1 bread-gray">&gt;</span></span>',
        '                <span><a href="javascript:;" class="bold bread-gray navzhlist pointer" >{{data.cText}}</a></span><span class="sign1 bread-gray">&gt;</span>',
        '                <span><a class="bold tpo-passage">{{data.question_sequence_number}}</a></span>',
        '            </p>',
        '            <hr class="mleft25">',
        '            <p class="left25 sentence bold">',
        '                <span id="jjResultContent" qid="{{data.question_id}}" class="bold" style="padding-right:5px;">综合写作练习 </span>{{data.question_sequence_number}}' ,
        '            </p>',
        '            <div class="audiojsZ newaudio" id="audiojs_wrapper0">',
        '                <audio id="myMusic1" src="{{data.audio_url}}" preload="auto"></audio>',
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
        //'                <span class="bold" style="padding-right:5px;" >{{data.question_sequence_number}}.</span>',
        //'                <span id="jjResultContent" qid="{{data.question_id}}"  >{{data.question_content}}</span>',
        //'            </p>',
        '        </div>',
        //'        <div class="h202">',
        //'            <ul class="nav nav-tabs " role="tablist" id="myTab" style="border-bottom: none!important;">',
        //'                <li role="presentation" class="active bold">',
        //'                    <a href="#Integralgain" role="tab" data-toggle="tab" style="border: 1px solid #fff!important;">答案范例</a>',
        //'                </li>',
        //'                <li role="presentation" class=" bold">',
        //'                    <a href="#Integraluse" role="tab" data-toggle="tab" style="border: 1px solid #fff!important;">讲解视频</a>',
        //'                </li>',
        //'            </ul>',
        //'            <div class="tab-content tpo-write-tab" style="min-height:100px;">',
        //'                <!-- 答案范例 -->',
        //'                <div role="tabpanel" class="tab-pane active" id="Integralgain">',
        //'                    {{each data.sample_content as value index}}',
        //'                    <p class="left25" style="margin-right: 25px;">{{#value}}</p>',
        //'                    {{/each}}',
        //'                </div>',
        //'                <!-- 讲解视频 -->',
        //'                <div role="tabpanel" class="tab-pane" id="Integraluse">',
        //'                    {{each data.question_analysis as value index}}',
        //'                       <div class="playthevideo1  tpo-fun-round-video pointer" data-source="{{value}}">',
        //'                       <span class="tpo-span-style1" data-source="{{value}}">视频{{index+1}}</span>',
        //'                       </div>',
        //'                    {{/each}}',
        //'                </div>',
        //'            </div>',
        //'        </div>',
        '        <div class="one-button2">',
        '            <button type="button" class="btn btn-primary btn2" id="DoAgain">再练一次</button>',
        '            <button type="button" class="btn btn-primary btn2" id="btnNextQuestion1" qid="{{data.next_question_id}}" next_status="{{data.next_status}}">下一题</button>',
        '        </div>',
        '        <div class="h202">',
        '            <div>',
        '                <p class="p1 bold font14 left25 gray">我的练习记录</p>',
        '                <div>',
        '                    {{each data.answers as value index}}',
        '                    <hr class="mleft25">',
        '                    <p class="p4 gray font12" style="margin-bottom: 0;"><span class="correct-ans">{{value.answer_created_at.substring(0, 19).replace("T", "&nbsp;&nbsp;")}}</span></p>',
        '                    <p class="left25 jijingwrite-p"><span class="myjjcontent1" expand_id="{{index}}">{{value.answer_content}}</span></p>',
        '                    <p class="text-right blue jijingwrite-p50">',
        '                        <a expand_id="{{index}}" class="expand1 blue" href="javascript:;">展开<img src="../../i/jijing2.png" alt=""></a>',
        '                        <a expand_id="{{index}}" class="expand1 blue hid" href="javascript:;">收起<img src="../../i/jijing1.png" alt=""></a>',
        '                    </p>',
        '                    {{/each}}',
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
        '    <div class="right-part3">',
        '        <div class="rightsidebar h290" style="height:434px;">',
        '            <p class="jinjing-speak-p"><span id="groupTitle" class="bold" data="1月10/11日机经">{{data.rightPartTitle}}</span></p>',
        '            <div class="h200" id="partRightList" style="height:392px;">',
        '                {{each data.questions as value index}}',
        '                <hr class="jijing-hr">',
        '                <p class="mleft25 h40 border-bto"><span class="num bold">{{value.question_sequence_number}}.</span>',
        '                <a qid="{{value.question_id}}" href="#" class="zonghe" type="{{value.type}}" >{{value.right_content}}</a></p>',
        '                {{/each}}',
        '            </div>',
        '        </div>',
        '    </div>',
        '</div>'
    ].join('');
});