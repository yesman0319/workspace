/**
 * Created by SaE on 2015/4/9.
 * 机经写作-做题页
 */
define(function () {
    return [
        '<div class="main mid">',
        '    <div id="leftDiv" class="left-part left1052">',
        '        <div class="h182">',
        '            <p class="p3 titleP70">',
        //'                <span><a href="/html/jinjie.html" class="bold bread-gray pointer">全部练习</a><span class="sign1 bread-gray">&gt;</span></span>',
        //'                <span><a href="javascript:;" class="bold bread-gray navjjwrite pointer">机经写作</a></span><span class="sign1 bread-gray">&gt;</span>',
        ////'                <span><a href="javascript:;" class="bold bread-gray navjjlist pointer" come="{{data.come}}">{{data.cText}}</a></span><span class="sign1 bread-gray">&gt;</span>',
        //'                <span><a href="javascript:;" class="bold bread-gray navjjlist pointer">{{data.cText}}</a></span><span class="sign1 bread-gray">&gt;</span>',
        //'                <span><a class="bold tpo-passage">{{data.question_sequence_number}}</a></span>',
        '<span><img src="../../i/list-pic.png" style="margin-left:-6px;margin-right:10px;vertical-align: -6px;"></span>',
        '<span class="font18 defaultBlack">{{data.xm_title}}</span>',
        '                <span><a href="javascript:;" class=" pointer" id="share_btn" data-target="parentMenu">更多记录>></a></span>', /*9-5日 添加分享记录  按钮*/
        '            </p>',
        '            <hr class="mleft25 hr1000">',
        '            <p class="sentence font16" id="sentence" content="">',
        //'                <span class="bold" style="padding-right:5px;">{{data.question_sequence_number}}.</span>',
        //'                <span id="jjResultContent" qid="{{data.question_id}}" come="{{data.come}}" >{{data.question_content}}</span>',
        '                <span id="jjResultContent" qid="{{data.question_id}}" style="display: block;width:100%;padding: 0 15px;" >{{data.question_content}}</span>',
        '            </p>',
        '<div class="two-button">',
        ' <button id="jj_start_btn" class="btn btn1" style="margin-bottom:40px;">开始练习</button>',
        '</div>',
        '            <div class="ans-div3" id="ans-div3" style="display: none;">',
        '                <p class="p4">' +
        //'                   <span class="correct-ans1">我的答案:</span>',
        '                  <span class="defaultBlack" style="float:left;">单词个数：<span id="wordContent" class="all-blue">0</span></span>',
        '                  <span class="defaultBlack" style="float:left;margin-left: 25px;">',
        '                  <span>计时: <span id="testTimerjjWrite" class="all-blue">00:00:00</span></span>',
        '                  </span>',
        
        
        '                </p>',
        '                <textarea id="jjWriteAnswer" spellcheck="false" autocomplete="off" class="left25 form-control jijingwrite-tarea" rows="5" placeholder="请输入作文，200-700个单词"></textarea>',
        
        '                <div style="margin-top:25px;width:100%;height:32px;">',        
        '                 <button id="jjWriteSubmit" type="button" class="fr btn1 btn btn-primary feedback-button2" style="margin-bottom:25px;margin-right:25px;">保存</button>',
        '                 <span id="jj-tipCount" style="display:none;padding-left: 15px;float:right;margin-right: 15px;line-height:32px;">请输入200-700个词!</span>',
        '                </div>',
        '            </div>',
        '        </div>',

        '{{if (data.question_analysis.length>0||data.sample_content.length>0)}}',
        '<div class="h202 borderTpo">',
        ' <ul class="nav nav-tabs " role="tablist" id="myTab" style="padding-left:10px;padding-top:7px;border-bottom: none!important;height:58px;margin-bottom:-20px;">',
        
        ' {{if data.question_analysis.length>0}}',
        ' <li role="presentation" class="active">',
        '    <a href="#Integralgain" role="tab" data-toggle="tab" style="border: 1px solid #fff!important;font-size:16px;"><i class="jjWriteTabVeiod"></i>讲解视频</a>',
        ' </li>',
        ' {{/if}}',
        ' {{if data.sample_content.length>0}}',
        '     <li role="presentation" class="{{if data.question_analysis.length==0}}active{{/if}}"><a href="#Integraluse" role="tab" data-toggle="tab" style="border: 1px solid #fff!important;font-size:16px;"><i class="jjWriteTabText"></i>文本范例</a></li>',
        '{{/if}}',
        '</ul>',
        '<hr class="mleft25 hr1000">',
        '{{if (data.question_analysis.length>0||data.sample_content.length>0)}}',
        '<div class="tab-content tpo-write-tab" style="margin-top: -20px;min-height:100px;">', 
        '     {{if data.question_analysis.length>0}}',
        '     <!-- 讲解视频 -->',
        '     <div role="tabpanel" class="tab-pane active" id="Integralgain">',
        '         {{each data.question_analysis as value index}}',
        '           <div class="playthevideo  tpo-fun-round-video pointer" data-source="{{value}}">',
        '           <span class="tpo-span-style1" data-source="{{value}}">视频{{index+1}}</span>',
        '           </div>',
        '         {{/each}}',
        '     </div>',
        '    {{/if}}',
        '    {{if data.sample_content.length>0}}',
        '    <!-- 文本范例 -->',
        '    <div role="tabpanel" class="tab-pane {{if data.question_analysis.length==0}}active{{/if}}" id="Integraluse">',
        '    {{each data.sample_content as value index}}',
        '   {{if data.sample_content.length>1}}',
        '   <span style="padding-left:25px;color:#000;font-size:14px;line-height:24px;font-weight:bold;">范例{{index+1}}</span>',
        '   {{/if}}',
        '    <p style="padding:0 25px;">',
        '        <span class="jjWriteansText" style="line-height:22px;word-break:break-word;">{{#value}}</span>',
        '         <span class="jjWriteansTextSpre" style="color: #00b551;">展开</span>',
        '    </p>',
        '   {{/each}}',
        '  </div>',
        ' {{/if}}',
       
        '</div>',
        '</div>',
        '{{/if}}',
        '{{/if}}',

        '<div class="content h300 borderTpo">',      
        ' <span style="line-height:20px;margin-left:25px;color:#000;">我的回答</span>',
        '<hr class="mleft25 hr1000">',
        ' <div class="tpo_share" style="padding:0 25px;">',
        
        '{{if data.results.length&&data.results.length>0}}',
        '<div class="share" style="margin-top:20px;">',
        '{{each data.results as value index}}',
        '<div class="share_con" style="margin-bottom:20px;border-bottom:1px dashed #d5d5d5">',
        '<p><span>{{value.cur_created_at}}</span></p>',
	        '<p style="line-height:22px;">',
		        '<span class="jjWriteansText" style="word-break:break-word;">{{value.content}}</span>',
		        '<span class="jjWriteansTextSpre" style="color:#00b551;">展开</span>',
		    '</p>',   
			'<div style="margin:15px 0;height:30px;line-height:30px;position:relative;">',
			     '<span class="defaultBlack fl" style="display:inline-block;width:160px;">做题时长：{{value.spend_time}}</span><span class="defaultBlack fl" >单词个数：{{value.word_count}}</span>',
			    /* '{{if value.is_share==0}}',*/
			     '<span class="jjWrite-set_share fr all-blue pointer" style="display:{{if value.is_share==0}}block{{/if}}" data-question_id="{{data.question_id}}" data-result_id="{{value.result_id}}"><i class="jjWriteSetShare-icon"></i>发布</span>' +
			    /* '{{/if}}',*/
			    /* '{{if value.is_share==1}}',*/
			     '<span class="jjWrite-set_cancel fr all-blue pointer" style="display:{{if value.is_share==1}}block{{/if}}">已发布<i class="jjWriteSetShare-icon"></i></span>',
			     /*'{{/if}}',*/
			     '<span class="jjWrite-set_cancel-btn" data-question_id="{{data.question_id}}" data-result_id="{{value.result_id}}" >取消发布</span>',
			 '</div>',
			    
	        
        '</div>',
        '{{/each}}',
        '</div>',
        '{{else}}',
        '<p class="no_record" style="display:block;">您暂时还未开始做题~</p>',
        '{{/if}}',
        ' </div>',
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
        /*'    <div class="right-part3">',
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
         '    </div>',   -------------9-5日按需求去掉右侧目录栏 */
        '</div>'
    ].join('');
});