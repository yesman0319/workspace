
/**
 * Created by SaE on 2015/7/28.
 * 综合写作批改-详细结果页-待选择老师
 */
define(function () {
    return [
        '<div class="main mid">',
        '    <div id="leftDiv" class="left-part">',
        '        <div class="h182 " >',
        '            <p class="p3 gray">',
        '                <span><a href="/html/chongci.html"  class="bold bread-gray  pointer">冲刺练习</a><span class="sign1 bread-gray">&gt;</span></span>',
        '                <span><a href="javascript:;" class="navparent bold bread-gray  pointer">写作批改</a></span><span class="sign1 bread-gray">&gt;</span>',
        '                <span><a href="javascript:;" class="nav-zhpigai bold bread-gray  pointer">综合写作批改</a></span><span class="sign1 bread-gray">&gt;</span>',
        '                <span><a class="bold tpo-passage">{{data.sequence_number}}</a></span>',
        '            </p>',
        '            <hr class="mleft25 hr_w725">',
        '            <div class="stepss mid">',
        '               <div class="cir_line">',
        '                   <span class="cirs mleft25 bgblue">1</span><span class="line lineblue"></span><span class="cirs bgblue">2</span><span class="line lineblue"></span><span class="cirs bgblue">3</span><span class="line"></span><span class="cirs">4</span><span class="line"></span><span class="cirs">5</span>',
        '               </div>',
        '               <div class="steps">',
        '                   <span class="fleft blue" style="margin-left:55px;">提交</span><span class="blue" style="margin-left:77px;">等待老师抢作业</span><span class="blue" style="margin-left:65px;">待选老师</span><span style="margin-left:90px;">待批改</span><span style="margin-left:92px;">获取成绩</span>',
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

        '           <div class="h202 user-content" >',
        '               <div>',
        '                   <p style="margin: 18px 0 0 27px;">我的作文',
        '                       <span style="float:right;margin-right:30px;color:#5499ff;text-decoration:none;">{{if data.spend_time}}<img src="../../i/time.png"/><span>写作时长：</span><span id="writeTimer" style="margin-right:10px;">{{data.spend_time}}</span>{{/if}}共：<span>{{data.wordCount}}</span>词</span>',
        '                   </p>',
        '                   <div class="divChoose">',
        '                       <hr class="mleft25 hr_w725">',
        '                       <p class="mleft25 gray font12">' +
        '                          <span id="spanTime" class="correct-ans">{{data.answer_created_at}}</span>',
        '                       </p>',
        '                       <p class="left25 jijingccwrite-p ">',
        '                           <span id="spanAnswer" style="display: block;word-break:break-all;">{{#data.answer_content}}</span>',
        '                       </p>',
        /*                      此处为选择老师模块，*/
        '                       <hr class="mleft25 hr_w725" style="clear:both;margin:15px 0px 15px 25px;" />',
        '                       <div style="position: relative;"><span class="mleft25 pos_had">已有<span>{{data.teachers.length}}</span>位老师抢作业，请选择1位</span>',
        '                           <button id="btnSaveTeacher" type="button" class="btn btn1 btn-primary" style="float:right;margin-right:20px;" >确认</button>',
        '                       </div>',
        '                       <div id="teacherPage">',
        '                       {{each data.teachers as teacher}}',
        '                          <table class="inf_list mleft25">',
        '                            <tr>',
        '                              <th class="img_linew teacher_info " teacherid="{{teacher.teacherId}}"><img  class="img_liimg" src="{{teacher.avatar}}" ><p class="font14 black mtop5" style="margin-bottom:0px;">{{teacher.nickName}}</p></th>',
        '                              <th class="">',
        '                                  <div class="date_t" style="height:22px;line-height:21px;">',
        '                                      <span class="mright20" style="float:left;">批改数量：<span>{{teacher.correctTotal}}</span></span>',
        '                                      <span>',
        '                                         <span class="black3" style="float:left;">综合评价：</span>',
        '                                         <span class="" style="float:left;">',
        '                                            <span class="commstar_pg commstar1" style="line-height: 22px;"><span class="commstar_pg commstar2 {{teacher.starClass}}"></span></span>',
        '                                         </span>',
        '                                      </span>',
        '                                  </div>',
        '                                  <div class="date_ts">',
        '                                      <span class="mright20">{{teacher.type==1 ?"口语老师":"写作老师"}}</span>手机号：<span >{{teacher.phone}}</span>',
        '                                  </div>',
        '                                  <div class="font_lidiv"><span class="width25">{{teacher.comment}}</span></div>',
        '                              </th>',
        '                              <th><div questionId="{{data.id}}" answerId="{{data.answer_id}}" teacherId="{{teacher.teacherId}}" class="radio_teacher type-radionew type-radi02 pointer"></div></th>',
        '                            </tr>',
        '                          </table>',
        '                       {{/each}}',
        '                       </div>',
        '                       <div style="float:right;width:40%;"><div id="pageSlide1" style="margin-top: 20px;"></div></div>',

        '                   </div>',
        '               </div>',
        '           </div>',

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