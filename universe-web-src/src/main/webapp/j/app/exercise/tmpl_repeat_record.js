/**
 * Created by SaE on 2015/3/4.
 * 详细录音界面
 */
define(function () {
    return [
        '{{if data.en}}',
        '<div class="right-part1">',
        '    <p class="p3 gray">',
        '        <span><a href="#" class="bold bread-gray">正在练习</a><span class="sign1 bread-gray">&gt;</span></span>',
        '        <span><a href="#" class="bold bread-gray repeat-unit">复述</a><span class="sign1 bread-gray">&gt;</span></span>',
        '        <span><a href="#" class="bold bread-gray" id="showParentQues" group-id="{{data.groupId}}" group_number="{{data.groupNumber}}" >unit{{data.groupNumber}}</a></span><span class="sign1 bread-gray">&gt;</span>',
        '        <span><a href="#" class="bold">{{data.questionNumber}}</a></span>',
        '        <span class="unit"><a href="#" id="selectRepeatUnit">选择单元</a></span>',
        '    </p>',
        '    <hr class="mleft25">',
        '    <div class="left25 font13 repeat-div3" style="margin-bottom:10px;">',
        '        <span class="num repeat-num">{{data.questionNumber}}/{{data.questionCount}}<span class="caret2" id="nameSanJiao"></span></span>',
        '        <p class="repeat-senten ">',
        '            <a id="question_en" href="javascript:void(0)" class="sim-a en-senten senten" data-group-id="{{data.groupId}}" data-question-id="{{data.question_id}}">{{data.en}}</a>',
        '            <a class="repeat-p3 ch-senten senten">{{data.ch}}</a>',
        '        </p>',

        '        <a id="demoSound"><img id="demoSoundImg" src="../../i/dic-pic.png" class="dic-pic repeat-dic" style="cursor: pointer;"></a>',
        '        <p class="repeat-colortip" style="display:none;">',
        '            <span class="repeat-span"><a href="#" rel="prev" class="dic-ball-blue repeat-roundstyle"></a>很棒</span>',
        '            <span class="repeat-span"><a href="#" rel="prev" class="dic-borange repeat-roundstyle" style="background:#97caab;"></a>一般般</span>',
        '            <span class="repeat-span"><a href="#" rel="prev" class="dic-bred repeat-roundstyle"></a>未识别</span>',
        '        </p>',
        '    </div>',
        '    <div class="repeat-points" style="top:104px;margin-top:12px;display:none;">',
        '    <p class="rep-piece"></p>',
        '        {{each data.sequence_number_ids as value index}}',
        '        <a href="#" data-question-id="{{value}}" class="navlist {{if data.questionNumber==index}}point-round-style{{/if}}">{{index}}</a>',
        '        {{/each}}',
        '    </div>',

        '    <div class="repeat-round-pos">',
        '        <div data-showtype="btn_En_Ch" class="left25 bblue repeat-round"><span class="number2">中/英</span></div>',
        '        <div data-showtype="btn_Ch" class="left25 repeat-round"><span class="number2">中文</span></div>',
        '        <div data-showtype="btn_En" class="left25 repeat-round"><span class="number2">英文</span></div>',
        '    </div>',
        '    <div class="repeat-record" style="margin-top:25px;">',
        '        <p class="click-tip tip-record" style="padding-right:3px;">点击录音</p>',
        '        <p class="click-tip tip-play" style="display:none;" style="padding-right:3px;">点击播放</p>',
        '        <p class="click-tip tip-installfalsh" style="display:none;">为了更好的使用，请安装软件Adobe Flash Player 11.1.0及以上版本。</p>',
        '        <p class="click-tip tip-nomicrophone" style="display:none;">请插入麦克风,然后刷新页面</p>',
        '        <p class="click-tip tip-refresh" style="display:none;">刷新页面,然后允许使用麦克风</p>',
        '        <span class="mustPlayDemo repeat-totip font12">请在收听完示范音频后在开始录音</span>',
        '        <!--待录音--><a  id="btnWaitRecord" class="record"><img src="../../i/repeat-pic10.png" class="repeat-pic10 pointer"></a>',
        '        <!--点击这个按钮开始录音--><a  id="btnRecord" class="record"><img src="../../i/repeat-pic7.png" class="repeat-pic10 pointer"></a>',
        '        <!--录音中--><a  id="btnStopRecord" class="record"><img src="../../i/repeat-pic6.gif" style="padding-top: 0;margin-top:-5px;" class="repeat-pic10 pointer"></a>',
        '        <!--播放录音--><a  id="btnPlay" class="record"><img src="../../i/repeat-pic4.png" class="repeat-pic10 pointer" style="margin-left:5px;margin-top:3px;"></a>',
        '        <!--结束录音--><a  id="btnStopPlay" class="record"><img src="../../i/repeat-pic3.png" class="repeat-pic10"></a>',
        '        <!--评估中--><a  id="btnEvaluate" class="record"><img src="../../i/repeat-pic5.png" class="repeat-pic10 pointer"></a>',

        '        <img class="okpass ispass" src="../../i/repeat-pic9.png"><!--通过-->',
        '        <img class="nopass ispass" src="../../i/repeat-pic8.png"><!--未通过-->',
        '    </div>',
        '    <div class="two-button2">',
        '        <button type="button" class="btn9 btn btn-primary active" id="againRecord" disabled="">重录</button>',
        '        <button type="button" class="btn2 btn btn-default active " id="submitRecord" disabled="">提交</button>',
        '        <button type="button" class="btn1 btn btn-primary active" id="nextQuestion">下一题</button>',
        //'        <object type="application/x-shockwave-flash" id="recorderApp" name="recorderApp" style="position: absolute;" data="../j/lib/flashwavrecorder/recorder.swf" width="10" height="10">',
        //'           <param name="rate" value="11">',
        //'           <param name="flashvars" value="upload_image=../i/shangchuan.png">',
        //'        </object>',
        '    </div>',
        '    <div id="divMyVoice" style="display:none">',
        '        <audio id="html5Audio" src=""></audio>',
        '        <div id="divIEObject">',
        '            <object id="ieAudio" height="64" width="260" classid="CLSID:6BF52A52-394A-11d3-B153-00C04F79FAA6">',
        '                <param name="AutoStart" value="0">',
        '                <param name="url" value="">',
        '                <param name="enabled" value="true">',
        '                <param name="uiMode" value="none">',
        '            </object>',
        '        </div>',
        '    </div>',
        '<div class="alert alert-danger alert-dismissible" role="alert" style="position:absolute;top:236px;padding:25px;display:none;">' +
            '<button type="button" class="close closetip" >' +
                '<span aria-hidden="true">&times;</span>' +
            '</button>' +
            '<label id="lblError" style="margin-left:7px;"></label>' +
        '</div>',
        '</div>',
        '<form id="uploadForm" name="uploadForm" method="post" action="{{data.uploadUrl}}" enctype="mutltipart/form-data">',
        '    <input name="auth_token" id="auth_token" type="hidden" value="">',
        '    <input name="group_id" id="group_id" type="hidden" value="">',
        '    <input name="question_id" id="question_id" type="hidden" value="">',
        '</form>',
        '{{else}}',
        '<div class="right-part1">',
        '    <p class="p3 gray">',
        '        <span><a href="/html/chongci.html" class="bold bread-gray">正在练习</a><span class="sign1 bread-gray">&gt;</span></span>',
        '        <span><a href="/static/repeat/repeat-unit.html" class="bold bread-gray">复述</a><span class="sign1 bread-gray">&gt;</span></span>',
        '        <span><a id="go1" href="#" class="bold bread-gray">unit{{data.groupNumber}}</a></span><span class="sign1 bread-gray">&gt;</span>',
        '        <span><a id="go2" href="#" category="wjj" class="bold">{{data.questionNumber}}</a></span>',
        '        <span class="unit"><a href="#" id="selectRepeatUnit">选择单元</a></span>',
        '    </p>',
        '    <hr class="mleft25">',
        '    <div class="left25 font13 repeat-div" style="text-align: center;">暂无数据！</div>',
        '{{/if}}'
    ].join('');
});