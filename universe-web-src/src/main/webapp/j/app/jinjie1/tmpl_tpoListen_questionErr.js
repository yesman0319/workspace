'use strict'

define(function(){
  return [
       // '<div class="left25 font13 repeat-div3">',
       // '<audio src="" id="audioAudio">亲 您的浏览器不支持html5的audio标签</audio>',
       //   '<span class="num repeat-num pointer" id="questionsTabToggle">{{data.currentQuestionIndex+1}}/{{data.questionsLength}}<span class="caret2 pointer" style="color: #929292;" id="nameSanJiao"></span></span>',
       //   '<div class="tpo-points1 " id="questionsTab" style="clear:both; display: none;">',
       //   '<p class="tpo-piece">',
       //   '</p>',
       //  // '<a href="#" class="point-round-style">1</a>',
       //  '{{each data.questionsNum as value index}}',
       //  '{{if data.currentQuestionIndex+1 == value}}',
       //    '<a href="###" class="questionPageTabErrTpoListen point-round-style" data-localIndex={{index}} data-pageNum={{value-1}}>{{value}}</a>',
       //  '{{else}}',
       //    '<a href="###" class="questionPageTabErrTpoListen" data-localIndex={{index}} data-pageNum={{value-1}}>{{value}}</a>',
       //  '{{/if}}',
       //  '{{/each}}',
       // '</div>',
       //   '<p class="tpo-senten"><a score="0" class="item sim-a" answer_i="" sequence_number="1">{{data.question.prompt}}</a>{{if data.question.rehearURL}}<img src="../../i/i20.png" data-url="{{data.question.rehearURL}}" class="pleft10 pointer audioImg">{{/if}}</p>',
       //    '{{if data.question.questionType == "sort"}}',
       //      '<table class="table1 mleft10 tpo-tablenew " cellpadding="0" cellspacing="0">',
       //      '{{each data.question.G as value index}}',
       //      '  <tr>',
       //      '   <td class="td1 pright5"><span class=" pointer" data-choice="0">{{value.identifier}}.</span></td>',
       //      '   <td class="">{{value.p}}</td>',
       //      '  </tr>',
       //      '{{/each}}',
       //      '</table>',
       //    '{{/if}}',
       //  '</div>',
         
       //   '{{if data.question.questionType == "single"}}',
       //    '<table class="table1 mleft25 tpo-table newtop" cellpadding="0" cellspacing="0" id="singMul">',
       //     '{{each data.question.simpleChoices as value index}}',
       //      '<tr>',
       //       '<td class="td1 word-layout2"><span class="tpo-choice-round pointer singleChoice showEnable newtop-top" data-answer="{{value.identifier}}">{{value.identifier}}</span><span class="tpo-choice-round showDisable newtop-top" style="display: none;">{{value.identifier}}</span></td>',
       //       '<td class="newtpo-table">{{value.choiceOption}}</td>',
       //      '</tr>',
       //     '{{/each}}',
       //    '</table> ',
       //   '{{/if}}',

       //   '{{if data.question.questionType == "multiple"}}',
       //     '<table class="table1 mleft25 tpo-table newtop" cellpadding="0" cellspacing="0" id="singMul">',
       //       '{{each data.question.simpleChoices as value index}}',
       //        '<tr>',
       //         '<td class="td1 word-layout2"><span class="tpo-choice-round pointer multipleChoice showEnable newtop-top" data-answer="{{value.identifier}}">{{value.identifier}}</span><span class="tpo-choice-round showDisable newtop-top" style="display: none;">{{value.identifier}}</span></td>',
       //         '<td class="newtpo-table">{{value.choiceOption}}</td>',
       //        '</tr>',
       //       '{{/each}}',
       //     '</table> ',
       //   '{{/if}}',

       //   '{{if data.question.questionType == "sort"}}',
       //   '<table class="table1 mleft25 tpo-table td_padding pleft10" cellpadding="0" cellspacing="0" id="sortTable">',
       //     '{{each data.question.simpleChoices as value index}}',
       //      '<tr class="sortTd">',
       //       '<td class="">{{index + 1}}</td>',             
       //       '{{each data.question.simpleChoices as val ind}}',
       //         '<td class="td1 word-layout2">',
       //           '<span class="tpo-choice-round pointer sortChoice" data-answer="{{val.identifier}}" data-choice="{{val.identifier}}">{{val.identifier}}</span>',
       //         '</td>',
       //       '{{/each}}',             
       //      '</tr>',
       //     '{{/each}}',
       //   '</table> ',
       //   '{{/if}}',

       //   '{{if data.question.questionType == "complex"}}',
       //      '<table border=1 class="tpo_result"  cellspacing="0" cellpadding="8px" id="complexTable">',
       //      '  <tr>',
       //      '    <th></th>',
       //      '   {{each data.question.simpleChoices as value index}}',
       //      '    <th class="" style="min-width: 90px;text-align: center;">{{value.choiceOption}}</th>',
       //      '   {{/each}}',
       //      '  </tr>',
       //      '   {{each data.question.G as value index}}',
       //      '    <tr class="complexTr">',
       //      '    <td class="tpo_tit">{{value.p}}</td>',
       //      '    {{each data.question.simpleChoices as val ind}}',
       //      '      <td class="tpo_con pointer complexChoiceListen" data-answer="{{val.identifier}}"></td>',
       //      '    {{/each}}',
       //      '    </tr>',
       //      '   {{/each}}',
       //      '</table> ',
       //   '{{/if}}',

       //  '<div>',
       //    '<a href="###" class="Previous tpo-page" id="preQuestionErrTpoListen" style="display: none;"><span class="arrow-left"></span></a>',
       //    '<a href="###" class="Next tpo-page" id="nextQuestionErrTpoListen"><span class="arrow-right"></span></a>',
       //  '</div>'
       '<div class="left25 font13">',
          '<audio src="" id="audioAudio">亲 您的浏览器不支持html5的audio标签</audio>',
          '<span class="num repeat-num pointer" id="questionsTabToggle">{{data.currentQuestionIndex+1}}/{{data.questionsLength}}<span class="caret2 pointer" style="color: #929292;" id="nameSanJiao"></span></span>',
            '<div class="tpo-points1 " id="questionsTab" style="clear:both; display: none;">',
                '<p class="tpo-piece">',
                '</p>',
                '{{each data.questionsNum as value index}}',
                '{{if data.currentQuestionIndex+1 == value}}',
                  '<a href="###" class="questionPageTabErrTpoListen point-round-style" data-localIndex={{index}} data-pageNum={{value-1}}>{{value}}</a>',
                '{{else}}',
                  '<a href="###" class="questionPageTabErrTpoListen" data-localIndex={{index}} data-pageNum={{value-1}}>{{value}}</a>',
                '{{/if}}',
                '{{/each}}',
            '</div>',

          '<div class="N_font_b fright mright25 mbot15 N_c_p">',
          '  <span class="mright10"><span class="N_tpoicon N_ticon_speak" style="cursor: auto;"></span><a class="all-blue font14 img_font_m" id="seeJiangjie">讲解</a></span>',
          '  <span><span class="N_tpoicon N_ticon_jx" style="cursor: auto;"></span><a class="all-blue font14 img_font_m" id="seeJieXiListenErr">解析</a></span>',
          '</div>              ',
        '</div>',



          '<div class="Ntpo_left_p">',
            '<p class=""><a score="0" class="item sim-a questionBrContent" style="text-decoration:none;" answer_i="" sequence_number="1">{{data.question.prompt}}</a>{{if data.question.rehearURL}}<img src="../../i/i20.png" data-url="{{data.question.rehearURL}}" class="pleft10 pointer audioImg">{{/if}}</p>',
            '{{if data.question.questionType == "directMultiple"}}',
              '<p class="blue509">choose {{data.question.correctCount}} answer.</p>',
            '{{/if}}',
            '{{if data.question.questionType == "sort"}}',
               '<div class="N_tpolisb mbot15 font12"><span class="absd"></span><span id="sortPlaceHolder">请按顺序选择：</span><span class="mright5" id="sortAnswerDiv"></span><a class="fright N_c_p" id="clearSort" style="color:#509bfd;margin-top: -2px;">清空</a><a id="clearSortHid" class="fright  N_c_p" style="display: none;color:#509bfd;margin-top: -2px;">清空</a></div>',
            '{{/if}}',
          // '        <table class="table1 N_tpo-table newtop " cellpadding="0" cellspacing="0" id="singMul">',
          // '         <tbody>',
          // '          <tr>',
          // '           <td class="td1 word-layout2">',
          // '            <span class="tpo-choice-round pointer singleChoice showEnable newtop-top" data-answer="A">A</span><span class="tpo-choice-round showDisable newtop-top" style="display: none;">A</span>',
          // '           </td>',
          // '           <td class="newtpo-table">It cannot hold rainwater for long periods of time.</td>',
          // '          </tr>',
          // '          <tr>',
          // '           <td class="td1 word-layout2">',
          // '            <span class="tpo-choice-round pointer singleChoice showEnable newtop-top" data-answer="B">B</span><span class="tpo-choice-round showDisable newtop-top" style="display: none;">B</span>',
          // '          </td>',
          // '           <td class="newtpo-table">It prevents most groundwater from circulating.</td>',
          // '          </tr>',
          // '          <tr><td class="td1 word-layout2"><span class="tpo-choice-round pointer singleChoice showEnable tpo-right newtop-top" data-answer="C">C</span><span class="tpo-choice-round showDisable newtop-top" style="display: none;">C</span></td><td class="newtpo-table">It has the capacity to store large amounts of water.</td></tr>',
          // '          <tr><td class="td1 word-layout2"><span class="tpo-choice-round tpo-mistake  pointer singleChoice  showEnable newtop-top" data-answer="D">D</span><span class="tpo-choice-round showDisable newtop-top" style="display: none;">D</span></td><td class="newtpo-table">It absorbs most of the water it contains from rivers.</td></tr>',
          // '         </tbody>',
          // '        </table>',
          //  '{{if data.question.questionType == "complex"}}',
          //  '<p class="tpo-senten tpo-complex-ques">{{data.question.G1.p}}</p>',
          //  '<p class="tpo-senten tpo-complex-choice" id="g1Answer">',
          //  '{{each data.question.simpleChoices as value index}}',
          //  '<span class="tpo-choice-round pointer complexChoice showEnable" data-answer="{{value.identifier}}">{{value.identifier}}</span><span class="tpo-choice-round showDisable" style="display: none;">{{value.identifier}}</span>',
          //  '{{/each}}',
          //  '</p>',

          //  '<p class="tpo-senten tpo-complex-ques">{{data.question.G2.p}}</p>',
          //  '<p class="tpo-senten tpo-complex-choice" id="g2Answer">',
          //  '{{each data.question.simpleChoices as value index}}',
          //  '<span class="tpo-choice-round pointer complexChoice showEnable" data-answer="{{value.identifier}}">{{value.identifier}}</span><span class="tpo-choice-round showDisable" style="display: none;">{{value.identifier}}</span>',
          //  '{{/each}}',
          //  '</p>',
          // '{{/if}}',

        // '</div>',
        //  '<table class="table1 N_tpo-table newtop " cellpadding="0" cellspacing="0" id="singMul">',
        //  '<tbody>',
        //  '{{if data.question.questionType == "single"}}',
        //  '{{each data.question.simpleChoices as value index}}',
        //   '<tr>',
        //    '<td class="td1 word-layout2"><span class="tpo-choice-round pointer singleChoice showEnable newtop-top" data-answer="{{value.identifier}}">{{value.identifier}}</span><span class="tpo-choice-round showDisable newtop-top" style="display: none;">{{value.identifier}}</span></td>',
        //    '<td class="newtpo-table">{{value.choiceOption}}</td>',
        //   '</tr>',
        //  '{{/each}}',
        //  '{{/if}}',

        //  '{{if data.question.questionType == "multiple"}}',
        //  '{{each data.question.simpleChoices as value index}}',
        //   '<tr>',
        //    '<td class="td1 word-layout2"><span class="tpo-choice-round pointer multipleChoice showEnable newtop-top" data-answer="{{value.identifier}}">{{value.identifier}}</span><span class="tpo-choice-round showDisable newtop-top" style="display: none;">{{value.identifier}}</span></td>',
        //    '<td class="newtpo-table">{{value.choiceOption}}</td>',
        //   '</tr>',
        //  '{{/each}}',
        //  '{{/if}}',

        //  '{{if data.question.questionType == "complex"}}',
        //  '{{each data.question.simpleChoices as value index}}',
        //   '<tr>',
        //    '<td class="td1 word-layout2">{{value.identifier}}</td>',
        //    '<td class="newtpo-table">{{value.choiceOption}}</td>',
        //   '</tr>',
        //  '{{/each}}',
        //  '{{/if}}',
        //  '</tbody>',
        // '</table>',



        '{{if data.question.questionType == "single"}}',
          '<table class="table1 N_tpo-table newtop" cellpadding="0" cellspacing="0" id="singMul">',
           '{{each data.question.simpleChoices as value index}}',
            '<tr>',
             '<td class="td1 word-layout2"><span class="tpo-choice-round pointer singleChoice showEnable newtop-top" data-answer="{{value.identifier}}">{{value.identifier}}</span><span class="tpo-choice-round showDisable newtop-top" data-answer="{{value.identifier}}" style="display: none;">{{value.identifier}}</span></td>',
             '<td class="newtpo-table">{{value.choiceOption}}</td>',
            '</tr>',
           '{{/each}}',
          '</table> ',
         '{{/if}}',

         '{{if data.question.questionType == "multiple"}}',
           '<table class="table1 N_tpo-table newtop" cellpadding="0" cellspacing="0" id="singMul">',
             '{{each data.question.simpleChoices as value index}}',
              // '<tr>',
              //  '<td class="td1 word-layout2"><span class="tpo-choice-round pointer multipleChoice showEnable newtop-top" data-answer="{{value.identifier}}">{{value.identifier}}</span><span class="tpo-choice-round showDisable newtop-top" style="display: none;">{{value.identifier}}</span></td>',
              //  '<td class="newtpo-table">{{value.choiceOption}}</td>',
              // '</tr>',
              '<tr>',
              ' <td class="td1 word-layout2">',
              '  <span class="N_tpo_c_square pointer multipleChoice showEnable " data-answer="{{value.identifier}}">{{value.identifier}}</span>',
              '  <span class="N_tpo_c_square_hide showDisable " data-answer="{{value.identifier}}" style="display: none;">{{value.identifier}}</span>',
              ' </td>',
              ' <td class="newtpo-table">{{value.choiceOption}}</td>',
              '</tr>',
             '{{/each}}',
           '</table> ',
         '{{/if}}',

         '{{if data.question.questionType == "directMultiple"}}',
            '<table class="table1 N_tpo-table newtop" cellpadding="0" cellspacing="0" id="singMul">',
             '{{each data.question.simpleChoices as value index}}',
              '<tr>',
              ' <td class="td1 word-layout2">',
              '  <span class="N_tpo_c_square pointer directMultipleChoiceErr showEnable " data-answer="{{value.identifier}}">{{value.identifier}}</span>',
              '  <span class="N_tpo_c_square_hide showDisable " data-answer="{{value.identifier}}" style="display: none;">{{value.identifier}}</span>',
              ' </td>',
              ' <td class="newtpo-table">{{value.choiceOption}}</td>',
              '</tr>',
             '{{/each}}',
           '</table> ',
          '{{/if}}',

         '{{if data.question.questionType == "sort"}}',
         // '<table class="table1 N_tpo-table newtop" cellpadding="0" cellspacing="0" id="sortTable">',
         //   '{{each data.question.simpleChoices as value index}}',
         //    '<tr class="sortTd">',
         //     '<td class="">{{index + 1}}</td>',             
         //     '{{each data.question.simpleChoices as val ind}}',
         //       '<td class="td1 word-layout2">',
         //         '<span class="tpo-choice-round pointer sortChoice" data-answer="{{val.identifier}}" data-choice="{{val.identifier}}">{{val.identifier}}</span>',
         //       '</td>',
         //     '{{/each}}',             
         //    '</tr>',
         //   '{{/each}}',
         // '</table> ',
            '<table class="table1 N_tpo-table newtop" cellpadding="0" cellspacing="0" id="sortTable">',
              '{{each data.question.G as value index}}',
              '  <tr>',
              '   <td class="td1 word-layout2">',
                    '<span class="tpo-choice-round pointer sortChoice showEnable newtop-top" data-answer="{{value.identifier}}" data-choice="{{value.identifier}}">{{value.identifier}}</span>',
                    '<span class="tpo-choice-round showDisable sortChoiceHid newtop-top tpo-choice" style="display: none;">{{value.identifier}}</span>',
              '   </td>',
              '   <td class="newtpo-table">{{value.p}}</td>',
              '  </tr>',
              '{{/each}}',
            '</table>',
         '{{/if}}',

         '{{if data.question.questionType == "complex"}}',
            '<table border=1 class="N_tpo_result mtop30"  cellspacing="0" cellpadding="8px" id="complexTable">',
            '  <tr>',
            '    <th style="width:121px;"></th>',
            '   {{each data.question.simpleChoices as value index}}',
            '    <th class="text-center" style="min-width:62px;">{{value.choiceOption}}</th>',
            '   {{/each}}',
            '  </tr>',
            '   {{each data.question.G as value index}}',
            '    <tr class="complexTr complexTd{{index}}">',
            '    <td class="tpo_tit">{{value.p}}</td>',
            '    {{each data.question.simpleChoices as val ind}}',
            '      <td class="tpo_con pointer complexChoiceListen" data-answer="{{val.identifier}}"></td>',
            '    {{/each}}',
            '    </tr>',
            '   {{/each}}',
            '</table> ',
            '<table border=1 class="N_tpo_result mtop30" style="display: none;" cellspacing="0" cellpadding="8px" id="complexTableHid">',
            '  <tr>',
            '    <th style="width:121px;"></th>',
            '   {{each data.question.simpleChoices as value index}}',
            '    <th class="text-center" style="min-width:62px;">{{value.choiceOption}}</th>',
            '   {{/each}}',
            '  </tr>',
            '   {{each data.question.G as value index}}',
            '    <tr class="complexTr complexTd{{index}}">',
            '    <td class="tpo_tit">{{value.p}}</td>',
            '    {{each data.question.simpleChoices as val ind}}',
            '      <td class="tpo_con_hid" data-answer="{{val.identifier}}"></td>',
            '    {{/each}}',
            '    </tr>',
            '   {{/each}}',
            '</table> ',
         '{{/if}}',

          '<div class="N_tpofont_jx font12" style="display:none;" id="tpoListenJieXi">',
          '   <hr class="N_tpohr" style="margin-top:0px;" />',
          '   <p class="">',
          '     <span class="pg_red mright10" id="yourAnswerDiv">你的答案 : <span class="" id="yourAnswer"></span></span>',
          '     <span  class="green6bc">正确答案 : <span>{{data.question.correctResponse}}</span></span>',
          '   </p>',
          '   <p class="N_tpo-points" style="">{{data.question.p}}</p>',
          ' </div>',
          ' <div>',
          '   <a href="###" class="N_before N_tpo-page" id="preQuestionErrTpoListen" style="display: block;"><span class="arrow-left"></span></a>',
          '   <a href="###" class="N_after N_tpo-page" id="nextQuestionErrTpoListen"><span class="arrow-right"></span></a>',
          ' </div>',
          '</div>',
          /**视频部分**/
       '<div class="modal fade" id="audioPlayModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">',
            // '<button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">&times;</span><span class="sr-only">Close</span></button>',
          '<div class="modal-dialog jinjievideo-style">',
                '<button type="button" class="mtop10 close jinjievideo-close" data-dismiss="modal"><img src="../../i/N_close.png" /></button>',
                '<ul class="N_viedo_tab" >',
                 '{{if data.question.audio.length < 10}}',
                  '{{each data.question.audio as value index}}',
                   '<li class="blue509" >',
                      '{{if index == 0}}',
                         '<span class=""><a class="jiexiAudio N_V_active N_tpoicons all-blue font14 img_font_m" data-source="{{value}}" data-index={{index}}>讲解{{index+1}}</a></span>',
                      '{{else}}',
                         '<span class=""><a class="jiexiAudio N_tpoicons all-blue font14 img_font_m" data-source="{{value}}" data-index={{index}}>讲解{{index+1}}</a></span>',
                      '{{/if}}',
                   '</li>',
                  '{{/each}}',
                 '{{else}}',
                   '<li class="blue509" >',
                       '<span class=""><a class="jiexiAudio N_V_active N_tpoicons all-blue font14 img_font_m" data-source="{{data.question.audio}}" data-index="0">讲解1</a></span>',
                   '</li>',
                 '{{/if}}',
                '</ul>',
                '<div id="audioPlayDiv" style="height: 400px;">',
                '</div>',
          '</div>',
        '</div>'
  ].join('')
})
