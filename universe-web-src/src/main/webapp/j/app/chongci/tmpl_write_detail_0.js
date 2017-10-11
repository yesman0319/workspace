'use strict';

define(function(){
    return [
        '<div class="main mid">',
        '<div id="leftDiv" class="left-part">',
        '<div class="content h182">',
        '<p class="p3 gray">',
        '{{if data.from == "exercise"}}',
        // '<a href="/html/exercise.html"><span>全部练习</span></a><span class="sign">></span><span><a id="go1" href="#">写作批改</a></span><span class="sign">></span><span><a id="go2" href="#" category="{{data.category}}">{{data.cText}}</a></span><span class="sign">></span><span>{{data.sequence_number}}</span>',
        '<a href="/html/chongci.html"><span>全部练习</span></a>' ,
        '<span class="sign">></span><span><a id="go1" href="#">写作批改</a></span>' ,
        '<span class="sign">></span><span><a id="go2" href="#" category="{{data.category}}">{{data.cText}}</a></span>' ,
        '<span class="sign">></span><span>{{data.sequence_number}}</span>' ,
        '<span style="float:right;margin-right:25px;color:#5499ff;text-decoration:none;"><img src="../../i/time.png"><span>计时：</span><span id="writeTimer">00:30:00</span></span>',
        '{{else}}',
        '<a href="/html/{{data.from}}.html">返回</a>',
        '{{/if}}',
        '</p>',
        '<hr class="mleft25 hr_w725">',
        '<p class="left25 sentence font13">',
        '<span class="bold" style="padding-right:5px;" id="jijing_question_id" category="{{data.category}}" from="{{data.from}}" jqid="{{data.id}}" jqSeqNum="{{data.sequence_number}}" qContent="{{data.content}}">{{data.sequence_number}}.</span>',
        '{{data.content}}',
        '</p>',
        '<p class="gram-p correct-p">',
        '<span><a id = "jijingSample" href="#" class="see">答题范例</a></span>',
        '</p>',

        '<div id="jijingSampleDiv" class="ans" style="display:none;">',
            '<div class="arrow-up"></div>',
            '<div id="sampleContent" class="gram-p1 see-sample">',
                'this is sample area',
            '</div>',
        '</div>',
        '</div>',
        '<div class="analysis h202">',
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

        '<div class="content h300">',
        '<div class="ans-div1" style="width: 746px;">',
        '<p class="p4 bold"><span class="correct-ans1">我的作文:</span></p>',
        '<span class="gray1" style="float:right;margin-top:-38px;">单词数:<span id="wordContent">0</span></span>',
        '<textarea id="articleAnswer" onpaste="return false" spellcheck="false" autocomplete="off" class="left25 form-control rewrite-tarea" style="width: 723px;background-color:rgb(246, 246, 246);" rows="5" placeholder="请输入作文，200-700个单词" ></textarea>',
        '</div>',
        '<div class="one-button3"  style="text-align:center;">',
        '<button id="articleSubmit" question_id="{{data.id}}" category="{{data.category}}" type="button" class="btn1 btn btn-primary" >批改/保存</button>',
        '</div>',
        '</div>',
        '</div>',

        '<div class="right-part3">',
        '<div class="rightsidebar h290">',
        '<p class="jinjing-speak-p" ><span id="groupTitle" class="bold" data="{{data.title}}">{{data.title}}</span></p>',
        '<div class="h200" id="rightitems">',
        '{{each data.questions as value index}}',
        '<hr class="jijing-hr">',
        '<p class="mleft25 h40 border-bto"><span class="num bold">{{value.sequence_number}}.</span>',
        '<a id="{{value.id}}" content="{{value.content}}" href="#" type="{{value.type}}" category="{{value.category}}" score="{{value.score}}" class="rightItem" answer_id="{{value.answer_id}}" sequence_number="{{value.sequence_number}}">',
        '{{value.content.substring(0,45)}}...',
        '</a>',
        '</p>',
        '{{/each}}',
        '</div>',
        '</div>',
        '</div>',
        '</div>',

        '<div class="modal fade" id="write_errorTip" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">',
        '<div class="modal-dialog">',
        '<div class="modal-content" style="width:354px;border: 1px solid #C2BFBF;border-top: 7px solid #509bfd;;">',

        '<div class="modal-body" style="height:90px;line-height:90px;">',
        '<p id="write_errorMsg" class="feedback-title" style="text-align:center;">您的积分不足，无法提交？</p>',
        '</div>',
        '<div style="margin: 0px auto 20px auto;text-align: center;">',
        '<button type="button" class="btn btn-primary btn-sm feedback-button2 btn1" id="write_errorTip_sure">确认</button>',
        '</div>',
        '</div>',
        '</div>',
        '</div>',
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
        '                    <button type="button" data-dismiss="modal" class="btn btn-default btn-sm feedback-button5" data-dismiss="modal" id="cancleSave">取消</button>',
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
        '           <button type="button" data-dismiss="modal" class="btn btn-warning btn-sm " id="payFail">支付遇到问题</button>',
        '           <button type="button" data-dismiss="modal" class="btn btn-primary btn-sm  btn1" id="paySuccess">支付成功</button>',
        '           </div>',
        '       </div>',
        '    </div>',
        '</div>'
    ].join('')
});