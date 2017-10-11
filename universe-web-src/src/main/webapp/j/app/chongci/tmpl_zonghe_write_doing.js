/**
 * Created by SaE on 2015/4/16.
 * 综合写作批改
 */
define(function () {
    return [
        '<div class="main mid">',
        '    <div id="leftDiv" class="left-part">',
        '        <div class="h182">',
        '            <p class="p3 gray">',
        '                <span><a href="/html/chongci.html"  class="bold bread-gray  pointer">冲刺练习</a><span class="sign1 bread-gray">&gt;</span></span>',
        '                <span><a href="javascript:;" class="navparent bold bread-gray  pointer">写作批改</a></span><span class="sign1 bread-gray">&gt;</span>',
        '                <span><a href="javascript:;" class="nav-zhpigai bold bread-gray  pointer">综合写作批改</a></span><span class="sign1 bread-gray">&gt;</span>',
        '                <span><a class="bold tpo-passage">{{data.sequence_number}}</a></span>',
        '                <span style="float:right;margin-right:25px;color:#5499ff;text-decoration:none;"><img src="../../i/time.png"><span>计时：</span><span id="writeTimer">00:00:00</span></span>',
        '            </p>',
        '            <hr class="mleft25" style="width: 725px;">',
        '            <p class="left25 sentence bold">',
        '                <span class="bold" style="padding-right:5px;">综合写作批改 </span>{{data.sequence_number}}</p>',
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
        '        </div>',
        '<div class="analysis h202" style="min-height:200px;">',
        '    <ul class="nav nav-tabs " role="tablist" id="myTab" style="border-bottom: none!important;">',
        '        <li role="presentation" class="exampleText bold active">',
        '            <a href="#exampleText" role="tab" data-toggle="tab" style="border: 1px solid #fff!important;">答案范例</a>',
        '        </li>',
        '        <li role="presentation" class="exampleVideo bold">',
        '            <a href="#exampleVideo" role="tab" data-toggle="tab" style="border: 1px solid #fff!important;">讲解视频</a>',
        '        </li>',
        '    </ul>',
        '    <div class="tab-content tpo-write-tab" style="min-height:100px;">',
        '        <!-- 答案范例 -->',
        '        <div role="tabpanel" class="tab-pane active" id="exampleText">',
        '           {{if data.textAnalysis}}',
        '            <p class="left25" style="margin-right: 25px;">',
        '               {{data.textAnalysis}}',
        '            </p>',
        '           {{/if}}',
        '        </div>',
        '        <!-- 讲解视频 -->',
        '        <div role="tabpanel" class="tab-pane" id="exampleVideo">',
        '           {{if data.analysis}}',
        '            <div class="playthevideo  tpo-fun-round-video pointer" data-source="{{data.analysis}}">',
        '                <span class="tpo-span-style1" data-source="{{data.analysis}}">视频1</span>',
        '            </div>',
        '           {{/if}}',
        '        </div>',
        '    </div>',
        '</div>',
        '        <div class="h202" style="position: relative;padding-top: 10px;">',
        '            <ul class="nav nav-tabs" role="tablist" id="myTab" style="border-bottom:none;">',
        '                <li role="presentation" class="active bold">',
        '                    <a href="#Integralgain" role="tab" data-toggle="tab" style="border: 1px solid #fff!important;margin-left: 10px;">阅读材料</a>',
        '                </li>',
        '                <li role="presentation" class="bold">',
        '                    <a href="#Integraluse" role="tab" data-toggle="tab" style="border: 1px solid #fff!important;">写作文</a>',
        '                </li>',
        '            </ul>',
        '            <div class="tpo-write-tab tab-content" style="">',
        '                <div role="tabpanel" class="ans-div3 tab-pane active" id="Integralgain" style="margin-right: 20px;">',
        '                    <!-- 答案范例 -->',
        '                    <p class="left25">',
        '                    {{each data.content as value index}}',
        '                    <p class="left25" style="margin-top: -20px;">{{#value}}</p>',
        '                    {{/each}}',
        '                    </p>',
        '                </div>',
        '                <div role="tabpanel" class="ans-div3 tab-pane" id="Integraluse">',
        '                    <p style="display:none;" class="p4 bold"><span class="correct-ans1">我的作文:</span></p>',
        '                    <span class="gray1" style="position: absolute;top: 20px;right: 29px;">单词数:<span id="wordContent">0</span></span>',
        '                    <textarea id="zongheWriteAnswer" onpaste="return false" spellcheck="false" autocomplete="off" class="left25 form-control jijingwrite-tarea" rows="7" placeholder="请输入作文，150-500个单词"></textarea>',
        '                    <div class="one-button5" style="margin-top: 50px;margin-left: 0;">',
        '                        <button id="zongheWriteSubmit" type="button" qid="{{data.id}}" class="btn1 btn btn-primary">批改/保存</button>',
        '                    </div>',
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
        '    <div class="modal fade in" id="waitPayModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;">',
        '        <div class="modal-dialog" >',
        '            <div class="modal-content" style="width:354px;border: 1px solid #C2BFBF;border-top: 7px solid #509bfd;">',
        '                <div class="modal-body">',
        '                    <p id="txtShow" class="feedback-title1" style="padding-left:0;text-align: center;"></p>',
        '                </div>',
        '                <div style="text-align:center;margin: 10px auto 20px auto;">',
        '                    <button type="button" data-dismiss="modal" class="btn btn-default btn-sm feedback-button5" id="cancleSave">取消</button>',
        '                    <button type="button" data-dismiss="modal" class="btn btn-primary btn-sm  btn1" id="gotoPay">确认</button>',
        '                </div>',
        '            </div>',
        '        </div>',
        '    </div>',
        '<div class="modal fade in" id="payModel" tabindex="-1" role="dialog" style="display: none;">',
        '    <div class="modal-dialog" >',
        '       <div class="modal-content"  style="width:354px;border: 1px solid #C2BFBF;border-top: 7px solid #509bfd;text-align:center;">',
        '           <div class="modal-body">',
        '               <p class="topaymodel" >已完成支付？</p>',
        '           </div>',
        '           <div style="text-align:center;margin:10px auto 20px auto;">',
        '           <button type="button" data-dismiss="modal" class="btn btn-warning btn-sm " id="payFail1">支付遇到问题</button>',
        '           <button type="button" data-dismiss="modal" class="btn btn-primary btn-sm  btn1" id="paySuccess1">支付成功</button>',
        '           </div>',
        '       </div>',
        '    </div>',
        '</div>',
        '<div class="modal fade in" id="tipModel" tabindex="-1" role="dialog" aria-labelledby="" style="display: none;">',
        '    <div class="modal-dialog">',
        '        <div class="modal-content" style="width:354px;border: 1px solid #C2BFBF;border-top: 7px solid #509bfd;">',
        '            <p id="tipResult" class="feedback-title2" style="text-align: center;">请输入150-500个单词！</p>',
        '            <div class="one-button6">',
        '                <button type="button" data-dismiss="modal" class="btn btn-primary btn-sm feedback-button2 btn1" id="closeTip" style="margin-left:0;">确认</button>',
        '            </div>',
        '        </div>',
        '    </div>',
        '</div>',
        '    <div class="right-part3">',
        '        <div class="rightsidebar h290" style="height: 406px;">',
        '            <p class="jinjing-speak-p" style="text-align: center;padding-left: 0;"><span id="groupTitle" class="bold">{{data.title}}</span></p>',
        '            <div class="h200" id="partRightList" style="height: 365px;">',
        '                {{each data.questions as value index}}',
        '                <hr class="jijing-hr">',
        '                <p class="mleft25 h40 border-bto"><span class="num bold">{{value.sequence_number}}.</span>',
        '                <a qid="{{value.id}}" href="javascript:;" class="zonghewrite" type="{{value.type}}" >{{value.content}}</a></p>',
        '                {{/each}}',
        '            </div>',
        '        </div>',
        '    </div>',
        '</div>'
    ].join('');
});