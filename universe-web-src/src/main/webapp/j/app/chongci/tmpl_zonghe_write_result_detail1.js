/**
 * Created by SaE on 2015/4/16.
 * 综合写作批改-详细结果页-已保存
 */
define(function () {
    return [
        '<div class="main mid">',
        '    <div id="leftDiv" class="left-part">',
        '        <div class="h182" >',
        '            <p class="p3 gray">',
        '                <span><a href="/html/chongci.html"  class="bold bread-gray  pointer">冲刺练习</a><span class="sign1 bread-gray">&gt;</span></span>',
        '                <span><a href="javascript:;" class="navparent bold bread-gray  pointer">写作批改</a></span><span class="sign1 bread-gray">&gt;</span>',
        '                <span><a href="javascript:;" class="nav-zhpigai bold bread-gray  pointer">综合写作批改</a></span><span class="sign1 bread-gray">&gt;</span>',
        '                <span><a class="bold tpo-passage">{{data.sequence_number}}</a></span>',
        '            </p>',
        '            <hr class="mleft25  hr_w725">',
        '            <div class="stepss mid">',
        '               <div class="cir_line">',
        '                   <span class="cirs mleft25 bgblue">1</span><span class="line "></span><span class="cirs ">2</span><span class="line"></span><span class="cirs">3</span><span class="line"></span><span class="cirs">4</span><span class="line"></span><span class="cirs">5</span>',
        '               </div>',
        '               <div class="steps">',
        '                   <span class="fleft blue" style="margin-left:55px;">提交</span><span class="" style="margin-left:77px;">等待老师抢作业</span><span style="margin-left:65px;">待选老师</span><span style="margin-left:90px;">待批改</span><span style="margin-left:92px;">获取成绩</span>',
        '               </div>',
        '            </div>',

        '            <p class="left25 sentence bold">',
        '                <span class="bold" style="padding-right:5px;">综合写作批改 </span>{{data.sequence_number}}</p>',
        '            <div class="audiojsZ newaudio" id="audiojs_wrapper0" style="margin-bottom:20px;">',
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
        '        </div>',
        '        <div class="one-button2">',
        '        </div>',
        '        <div id="showDetail" class="user-content">',

        '        <div class="h202 user-content" >',
        '            <div>',
        '                <p style="margin: 18px 0 0 27px;">我的作文',
        '                   <span style="float:right;margin-right:30px;color:#5499ff;text-decoration:none;">{{if data.spend_time}}<img src="../../i/time.png"/><span>写作时长：</span><span id="writeTimer" style="margin-right:10px;">{{data.spend_time}}</span>{{/if}}共：<span>{{data.wordCount}}</span>词</span>',
        '                </p>',
        '                <div>',
        '                    <hr class="mleft25  hr_w725">',
        '                    <p class="p4 gray font12"><span style="padding-right: 20px;font-weight: bold;">我的作文</span><span id="spanTime" class="correct-ans">{{data.answer_created_at}}</span></p>',
        '                    <p class="left25 jijingccwrite-p ">',
        '                        <span id="spanAnswer" style="display: block;">{{#data.answer_content}}</span>',
        '                    </p>',
        '                    <div id="hasSave" style="display:none;" class="left25 rewrite-percent detail-results">',
        '                        <span class="number pg_red">已保存</span>',
        '                    </div>',
        '                </div>',
        '                <div class="one-button2">',
        '                    <button id="btnPigaiSaved" qid="{{data.id}}" answer_id="{{data.answer_id}}" type="button" class="btn1 btn btn-primary">批改</button>',
        '                </div>',
        '            </div>',
        '        </div>',
        '<div class="modal fade in" id="waitPayModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" style="display: none;">',
        '    <div class="modal-dialog" >',
        '        <div class="modal-content" style="width:354px;border: 1px solid #C2BFBF;border-top: 7px solid #509bfd;">',
        '            <div class="modal-body">',
        '                <p id="txtShow" class="feedback-title1" style="padding-left:0;text-align: center;"></p>',
        '            </div>',
        '            <div style="text-align:center;margin: 10px auto 20px auto;">',
        '                <button type="button" data-dismiss="modal" class="btn btn-default btn-sm feedback-button5" data-dismiss="modal" id="cancleSave">取消</button>',
        '                <button type="button" data-dismiss="modal" class="btn btn-primary btn-sm  btn1" id="gotoPay">确认</button>',
        '            </div>',
        '        </div>',
        '    </div>',
        '</div>',
        '<div class="modal fade in" id="payModel" tabindex="-1" role="dialog" style="display: none;">',
        '    <div class="modal-dialog" >',
        '       <div class="modal-content"  style="width:354px;border: 1px solid #C2BFBF;border-top: 7px solid #509bfd;text-align:center;">',
        '           <div class="modal-body">',
        '               <p class="topaymodel" >已完成支付？</p>',
        '           </div>',
        '           <div style="text-align:center;margin:10px auto 20px auto;">',
        '           <button type="button" data-dismiss="modal" class="btn btn-warning btn-sm " id="payFail">支付遇到问题</button>',
        '           <button type="button" data-dismiss="modal" class="btn btn-primary btn-sm  btn1" id="paySuccess">支付成功</button>',
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

        '        </div>',
        '    </div>',

        '    <div class="right-part3">',
        '        <div class="rightsidebar h290" style="height: 406px;">',
        '            <p class="jinjing-speak-p"><span id="groupTitle" class="bold">{{data.title}}</span></p>',
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