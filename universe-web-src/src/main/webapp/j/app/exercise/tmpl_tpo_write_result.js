/**
 * Created by SaE on 2015/3/23.
 */
define(function () {
    return ['<div class="right-part1">',
        '<p class="p1 bold black mleft25"><img src="../../i/list-pic.png" style="margin-left:   -6px;margin-right:10px;"><span>练习报告</span></p>',
/*        '        <span><a href="#" class="bold bread-gray">正在练习</a><span class="sign1 bread-gray">></span></span>',
        '        <span>',
        '            <a href="#" class="tpounit bold bread-gray">TPO综合写作</a>',
        '            <span class="sign1 bread-gray">></span>',
        '        </span>',
        '        <span><a href="#" class="bold">第{{data.groupNumber}}题</a></span>',*/
      	//'        <span class="unit"><a href="javascript:void(0)" class="tpounit">选择题目</a></span>',
        //'    </p>',
        '    <hr class="mleft25"/>',
        '    <div class="practice-results">',
        '        <img src="../../i/i23.png" class="result-img1"/>',
        '        <div class="i25">',
        //'            <div class="hear-tage">',
        '               <p>',
        '                    {{if data.rate!=null}}',
        '                       {{if data.group_level == 0}}',
        '                               <img src="../../i/newimg-0.png" groupid="{{data.group_id}}" data-index="{{index}}" data-rate="{{data.rate}}" class="">',
        '                       {{else if data.group_level == 1}}',
        '                               <img src="../../i/newimg-4.png" groupid="{{data.group_id}}" data-index="{{index}}" data-rate="{{data.rate}}" class="">',
        '                       {{else if data.group_level == 2}}',
        '                               <img src="../../i/newimg-1.png" groupid="{{data.group_id}}" data-index="{{index}}" data-rate="{{data.rate}}" class="">',
        '                       {{else if data.group_level == 3}}',
        '                               <img src="../../i/newimg-2.png" groupid="{{data.group_id}}" data-index="{{index}}" data-rate="{{data.rate}}" class="">',
        '                       {{else if data.group_level == 4}}',
        '                               <img src="../../i/newimg-3.png" groupid="{{data.group_id}}" data-index="{{index}}" data-rate="{{data.rate}}" class="">',
        '                       {{/if}}',
        '                    {{/if}}',
        '               </p>',
        '             {{if data.isBest}}',
        '                   <span class="font12 re_orange">最好成绩：</span>',
        '             {{else}}',
        '                   <span class="font12 re_orange">本次成绩：</span>',
        '             {{/if}}',
        '                <span class="font12 re_orange mright10">正确率：{{data.rate}}%</span>',
        '              {{if null !=data.avgSpeed && "" != data.avgSpeed}}',
        '                   <span class="font12 marginTop re_orange mright10">平均速度：{{data.avgSpeed}}/空</span>',
        '               {{/if}}',
        '        </div>',
        '    </div>',
        '    <ul class="nav nav-tabs nav-write-tabs write-tab1" role="tablist" id="myTab">',
        '        <li role="presentation" class="active bold">',
        '            <a href="#Integralgain" role="tab" data-toggle="tab">我的作文</a>',
        '        </li>',
        '        <li role="presentation" class=" bold">',
        '            <a href="#Integraluse" role="tab" data-toggle="tab">查看答案</a>',
        '        </li>',
        '    </ul>',
        '    <div class="tab-content tpo-write-tab">',
        '        <!-- 我的作文 -->',
        '        <div role="tabpanel" class="tab-pane active" id="Integralgain">',
        '            <div id="divMyAnswer" class="left25 tpo-write-p"></div>',
        '        </div>',
        '        <!-- 查看答案-->',
        '        <div role="tabpanel" class="tab-pane" id="Integraluse">',
        '            <div id="divRightAnswer" class="left25 tpo-write-p"></div>',
        '        </div>',
        '        <div class="one-button2" style="clear: both;">',
        '            <button id="btnTpoAgain" type="button" class="btn2 btn btn-primary active">再练一遍</button>',
        //'          {{if !data.nextGroupStatus}}',
        //'            <button id="btnTpoNext" type="button" class="btn1 btn btn-primary {{if data.nextGroupStatus || data.enableNextBtn}}active{{else}}disabled{{/if}}{{if data.isLast}}active last-question{{/if}}">完成</button>',
        //'          {{/if}}',
            '{{if !data.isFromPlan}}',
            '<button type="button" class="btn btn-primary btn1" id="showMorePlan">完成</button>',
            '{{/if}}',
        '        </div>',
        '    </div>',
        '    <div style="clear:both;"></div>',
        '</div>'].join('');
});