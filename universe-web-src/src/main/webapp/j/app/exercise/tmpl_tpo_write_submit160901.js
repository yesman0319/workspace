/**
 * Created by SaE on 2015/3/23.
 */
define(function () {
    return ['<div class="right-part2">',
        '    <div class="tpo-right-part1">',
        '        <p class="p3 gray">',
        '            <span>',
        '                <a href="#" class="bold bread-gray">正在练习</a>',
        '                <span class="sign1 bread-gray">></span>',
        '            </span>',
        '            <span>',
        '                <a href="#" class="tpounit bold bread-gray">TPO综合填空</a>',
        '                <span class="sign1 bread-gray">></span>',
        '            </span>',
        '            <span>',
        '                <a href="#" class="bold tpo-passage">第{{data.groupNumber}}题</a>',
        '            </span>',
        '            <span class="unit"><a href="javascript:void(0)" class="tpounit">选择题目</a></span>',
        //'          {{if !data.hideTestTimer}}',
        '            <span class="unit time-pos" id="timerspan" style=" visibility: hidden;"><img src="../../i/time.png">',
        '                <a id="testTimerA" style="cursor:pointer">计时',
        '                    <span id="testTimerShow"  {{if data.testTimerStatus=="hide"}} style="display:none"{{/if}}>:<span id="testTimer">{{data.currentTestTimeStr || "00:00:00"}}</span></span>',
        '                </a>',
        '            </span>',
        //'          {{/if}}',
        '        </p>',
        '        <hr class="mleft25"/>',
        '        <ul class="nav nav-tabs " role="tablist" id="myTab" style="border-bottom: none!important;  margin-left: 14px;">',
        '            <li role="presentation" id="reading_material" class="active bold">',
        '                <a href="#Integralgain" role="tab" data-toggle="tab" style="border: 1px solid #fff!important;">阅读材料</a>',
        '            </li>',
        '            <li role="presentation" id="test_content" class="bold">',
        '                <a href="#Integraluse" role="tab" data-toggle="tab" style="border: 1px solid #fff!important;">',
        '                   {{if data.questionType == 1}}关键词填空',
        '                   {{else if data.questionType == 2}}阅读填空',
        '                   {{else if data.questionType == 3}}听力填空',
        '                   {{else if data.questionType == 4}}模板填空',
        '                   {{/if}}',
        '                </a>',
        '            </li>',
        '        </ul>',
        '        <div class="tab-content tpo-write-tab ptop10">',
        '            <!-- 参考范文 -->',
        '            <div role="tabpanel" class="tab-pane active" id="Integralgain">',
        '                {{each data.material as value index}}',
        '                <div class="left25 tpo-write-p" >',
        '                    {{value}}',
        '                </div><br/>',
        '                {{/each}}',

        '            <div class="bold" style="margin-left: 14px;padding:10px 15px;">',
        '                <span style="border: 1px solid #fff!important;color: #509bfd;">听力材料</span>',
        '            </div>',
        '        <div class="tpo-bar" style="padding-top: 30px;">',
        '            <div class="audiojsZ " id="audiojs_wrapper0">',
        '                <audio id="myMusic" src="{{data.audio_url}}"',
        '                       preload="auto"></audio>',
        '                <div class="play-pauseZ">',
        '                    <p class="playZ"></p>',
        '                    <p class="pauseZ"></p>',
        '                    <p class="loadingZ"></p>',
        '                    <p class="errorZ"></p>',
        '                </div>',
        '                <div class="scrubberZ">',
        '                    <div class="progressZ" style="width: 0px;"></div>',
        '                    <div class="loadedZ" style="width: 0px;"></div>',
        '                </div>',
        '                <div class="timeZ">',
        '                    <em class="playedZ">00:00</em>|<strong class="durationZ">00:00</strong>',
        '                </div>',
        '                <div class="error-messageZ"></div>',
        '            </div>',
        '        </div>',
        '            </div>',
        '            <!-- 用户输入界面 -->',
        '            <div role="tabpanel" class="tab-pane" id="Integraluse">',
        '                <div id="divFill" class="left25 tpo-write-p">',
        '                </div>',
        '            </div>',
        '            <div class="alert alert-danger alert-dismissible" role="alert" style="position:absolute;left:245px;padding:25px;display:none;">',
        '               <button type="button" class="close closetip">',
        '               <span aria-hidden="true">&times;</span>',
        '               </button>',
        '               <strong style="margin-left:32px;">请先填写内容再提交！</strong><label id="lblError" style="margin-left:7px;"></label>',
        '            </div>',
        '            <div class="one-button2" style="clear: both;">',
        '                <button id="btnSubmitTpo" type="button" class="btn1 btn btn-primary disabled">提交</button>',
        '            </div>',
        '        </div>',
        '    </div>',
        '</div>'].join('');
});