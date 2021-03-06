'use strict'

define(function(){
    return [
        '<div class="h182">',
            '<p class="p3 gray">',
                '<span><a class="bold bread-gray speakjjUnit pointer" data-target="all">全部练习</a><span class="sign1 bread-gray">&gt;</span></span>',
                '<span><a class="bold bread-gray speakjjUnit pointer" data-target="parentMenu">口语批改</a></span><span class="sign1 bread-gray">&gt;</span>',
                '<span><a class="bold bread-gray speakjjUnit pointer speakjj-forcecast-gray" data-target="correction">综合口语批改</a></span><span class="sign1 bread-gray">&gt;</span>',
                '<span><a class="bold tpo-passage">{{data.question.question_sequence_number}}</a></span>',
                '<script type="text/javascript">$("#groupTitle").html("{{data.group_title}}")</script>',
            '</p>',
            '<hr class="mleft25 hr_w725" />',
        /*这块部分为提交流程图。*/

            '{{if data.answer_type==2}}',
            '<div class="stepss mid">',
            '<div class="cir_line  ">',
            '<span class="cirs mleft25 bgblue">1</span><span class="line lineblue"></span><span class="cirs  blue_cir">2</span><span class="line"></span><span class="cirs">3</span><span class="line"></span><span class="cirs">4</span><span class="line"></span><span class="cirs">5</span>',
            '</div>',
            '<div class="steps">',
            '<span class="fleft blue" style="margin-left:55px;">提交</span><span class="blue" style="margin-left:77px;">等待老师抢作业</span><span style="margin-left:65px;">待选老师</span><span style="margin-left:90px;">待批改</span><span style="margin-left:92px;">获取成绩</span>',
            '</div>',
            '</div>',
            '{{else if data.answer_type==3}}',
            '<div class="stepss mid">',
            '<div class="cir_line  ">',
            '<span class="cirs mleft25 bgblue">1</span><span class="line lineblue"></span><span class="cirs bgblue">2</span><span class="line lineblue"></span><span class="cirs  blue_cir">3</span><span class="line"></span><span class="cirs">4</span><span class="line"></span><span class="cirs">5</span>',
            '</div>',
            '<div class="steps">',
            '<span class="fleft blue" style="margin-left:55px;">提交</span><span class="blue" style="margin-left:77px;">等待老师抢作业</span><span  class="blue" style="margin-left:65px;">待选老师</span><span style="margin-left:90px;">待批改</span><span style="margin-left:92px;">获取成绩</span>',
            '</div>',
            '</div>',
            '{{else if data.answer_type==4}}',
            '<div class="stepss mid">',
            '<div class="cir_line  ">',
            '<span class="cirs mleft25 bgblue">1</span><span class="line lineblue"></span><span class="cirs bgblue">2</span><span class="line lineblue"></span><span class="cirs bgblue">3</span><span class="line lineblue"></span><span class="cirs  blue_cir">4</span><span class="line"></span><span class="cirs">5</span>',
            '</div>',
            '<div class="steps">',
            '<span class="fleft blue" style="margin-left:55px;">提交</span><span class="blue" style="margin-left:77px;">等待老师抢作业</span><span  class="blue" style="margin-left:65px;">待选老师</span><span  class="blue" style="margin-left:90px;">待批改</span><span style="margin-left:92px;">获取成绩</span>',
            '</div>',
            '</div>',
            '{{/if}}',
            '<p class="left25 sentence pr10" id="sentence">',
            '<span class="bold" style="padding-right:5px;" id="jijing_question_id" category="wjj" jqid="1627" from="exercise">{{data.question.question_sequence_number}}</span>',
            '{{data.question.content}}',
            '<audio src="{{data.question.audio_url}}" controls="controls" style="width:720px;height:50px;" id="audioAudio">亲 您的浏览器不支持html5的audio标签</audio>',
            '{{if data.question.material}}',
            '<p class="gram-p correct-p"><span><a id="jijingSampleTag" href="#" class="see font-blue ">阅读</a></span></p>',
                '<div id="jijingSampleDiv" class="ans" style="display: block;">',
                '<p class="left25 sentence pr10" id="" content="" style="width:93%;">{{data.question.material}}</p>',
                '</div>',
            '{{/if}}',
            '{{if data.question.analysis}}',
            '<div class="mleft10">',
            '<ul class="nav nav-tabs nav-write-tabs" role="tablist" id="myTab">',
            /*  '<li role="presentation" class="bold">',
             '<a class="tabItem" href="#" data-target="Integralgain" id="IntegralgainTab" role="tab" data-toggle="tab">答案范例</a>',
             '</li>',*/
            '<li role="presentation" class=" active">',
            '<a class="tabItem" href="#" data-target="Integraluse" id="IntegraluseTab" role="tab" data-toggle="tab">讲解视频</a>',
            '</li>',
            '</ul>',
            '<div id="tab_record" class="tab-content tpo-write-tab" >',
            '<span id="flashcontent"></span>',
            '<!-- 中部选项卡1-录音控件 -->',
            '<div role="tabpanel" class="tab-pane " id="Integralgain">',
            '<div class="left25 height90">',

            '</div>',
            '</div>',
            '<!-- 选项卡2-视频播放 -->',
            '<div role="tabpanel" class="tab-pane active" id="Integraluse">',
            '{{if data.question.analysis}}',
            '<div class="tpo-fun-round jijing-fun-round-video pointer audioPlay" data-source="{{data.question.analysis}}"><span class="tpo-span-style1" data-source="{{data.question.analysis}}">视频01</span></div>',
            '{{/if}}',
            '</div>',
            '</div>',
            '</div>',
            '{{/if}}',
        '</div>',


        '<div class="h202">',
        '<div>',
        '{{if data.answer_type==4 && data.currentAnswer}}',
            '<div class="mtop20 ">',
                '<div class="fleft teacher-img teacher_info"  teacherId="{{data.currentAnswer.teacher_id}}">',
                    '<img src="{{data.currentAnswer.teacher_avatar || \'http://newbbs.b0.upaiyun.com/avater/avater.png\'}}" style="width:100%;border-radius: 35px;">',
                '</div>',
                '<div class="fleft mleft10">',
                    '<span style="display: block;padding-top:5px;letter-spacing: 1px;">老师:<span>{{data.currentAnswer.teacher_nickname}}</span></span><span class="grey76 " style="">您于<span>{{data.currentAnswer.answer_created_at.substring(0, 19).replace("T", "&nbsp;&nbsp;")}}</span>确认了<span>{{data.currentAnswer.teacher_nickname}}</span>老师，请等待批改。</span>',
                '</div>',
                '<div style="clear:both;"></div>',
            '</div>',
        '{{/if}}',
        '<p class="p1 bold font14 left25 gray">我的练习记录</p>',
        '<div>',
        '{{if data.currentAnswer}}',
        '<hr class="mleft25 hr_w725" style="clear:both;margin:15px 0px 15px 25px;" />',
        '<p class="pleft27 gray font12">',
        '<span class="">{{data.currentAnswer.answer_created_at.substring(0, 19).replace("T", "&nbsp;&nbsp;")}}</span>',
        /*'<span class="rewrite-fsingle mright30"><span>{{data.currentAnswer.answer_created_at.substring(0, 19).replace("T", "&nbsp;&nbsp;")}} </span>提交&nbsp;&nbsp;',*/
        '{{if data.answer_type==2}}',
        '<span class="rewrite-fsingle mright30">等待老师抢作业</span>',
        '{{else if data.answer_type==4}}',
        //' <span class="rewrite-fsingle mright30">你的作业已经发送给 <span>{{data.teacherInfo ? data.teacherInfo.nickName : data.currentAnswer.teacher_nickname }}</span>老师，请等待Ta的批改</span></span>',
        '{{/if}}',
        '</p>',
        '<div class="left25">',

        '<div style="display:inline-block;">',
        '<img  class="img_liimg" src="{{data.userHeadPic}}">',
        '</div>',
        '<div style="display:inline-block;position: absolute;">',
        '<span class="font-right left45">{{data.currentAnswer.answer_audio_length+"\'"}}</span>',
        '<img class="soundPlay" data-audioUrl="{{data.currentAnswer.answer_audio_url}}" src="../../i/dic-pic.png"  style="cursor: pointer;">',
        '</div>',



        '</div>',

        '{{if data.answer_type==3}}',
        /*此处为选择老师模块*/
        '<hr class="mleft25 hr_w725" style="clear:both;margin:15px 0px 15px 25px;" />',
        '<div style="position: relative;"><span class="mleft25 pos_had">已有<span>{{data.currentAnswer.grap_amount}}</span>位老师抢作业，请选择1位</span><button id="speakjj_commitChooseTeacher" type="button" class="btn btn1 btn-primary" style="float:right;margin-right:20px;" >确认</button></div>',

        '<div>',
        '{{each data.teacherList as teacher}}',
        //'<ul class="inf_list mleft25">',
        //'<li class="img_li"><img  class="img_liimg teacher_info" teacherId="{{teacher.teacherId}}" src="{{teacher.avatar}}"></li>',
        //'<li class="font_li" style="padding: 5px;">',
        //' <div class="date_t"> <span class="font14 black mright20">{{teacher.nickName}}</span>  <span class="mright20">{{teacher.type==1 ?"口语":"写作"}}</span>手机号:<span >{{teacher.phone}}</span> </div>',
        //'<div class="font_lidiv"><span class="width25">{{teacher.comment}}</span></div>',
        //'</li>',
        //'<li class="font_li"><div data-answerId="{{data.currentAnswer.answer_id}}" data-teacherId="{{teacher.teacherId}}" class="dis_in type-radio type-radi02 robRadio pointer jjspeak_teacherRadio"></div></li>',
        //' <li style="clear: both;"></li>',
        //'</ul>',
        '                       <table class="inf_list mleft25">',
        '                            <tr>',
        '                              <th class="img_linew teacher_info " teacherid="{{teacher.teacherId}}"><img  class="img_liimg" src="{{teacher.avatar || \'http://newbbs.b0.upaiyun.com/avater/avater.png\'}}" ><p class="font14 black mtop5" style="margin-bottom:0px;">{{teacher.nickName}}</p></th>',
        '                              <th class="">',
        '                                  <div class="date_t" style="height:22px;line-height:21px;">',
        '                                      <span class="mright20" style="float:left;">批改数量：<span>{{teacher.correctTotal}}</span></span>',
        '                                      <span>',
        '                                         <span class="black3" style="float:left;">综合评价：</span>',
        '                                         <span class="" style="float:left;">',
        '                                            <span class="commstar_pg commstar1" style="line-height: 22px;"><span class="commstar_pg commstar2 {{data.parseClass(teacher.scoreFinal)}}"></span></span>',
        '                                         </span>',
        '                                      </span>',
        '                                  </div>',
        '                                  <div class="date_ts">',
        '                                      <span class="mright20">北京国贸</span><span class="mright20">{{teacher.type==1 ?"口语":"写作"}}</span>手机号：<span >{{teacher.phone}}</span>',
        '                                  </div>',
        '                                  <div class="font_lidiv"><span class="width25">{{teacher.comment}}</span></div>',
        '                              </th>',
        '                              <th><div data-questionId="{{data.id}}" data-answerId="{{data.currentAnswer.answer_id}}" data-teacherId="{{teacher.teacherId}}" class="radio_teacher type-radionew type-radi02 pointer jjspeak_teacherRadio"></div></th>',
        '                            </tr>',
        '                          </table>',
        '{{/each}}',
        '</div>',

        '<div style="float:right;width:40%;"><div  id="pageSlide" style="margin-top: 20px;"></div></div>',

        '</div>',
        '</div>',
        '{{/if}}',
        '{{/if}}',

        '</div>'
    ].join('')
})
