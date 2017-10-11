window.onload = function() {
//  var playObject;
//  playObject = $("#jp-jplayer").jPlayer({
//      ready: function() {
//          $(this).jPlayer("setMedia", {
//              mp3: ""
//          });
//      },
//      preload: 'auto',
//      swfPath: "../swf",
//      supplied: "mp3"
//  });
//
//  function asplay(mp3url, time) {
//      var time = time || 0;
//      playObject.jPlayer("setMedia", {
//          mp3: mp3url
//      }).jPlayer("play", time);
//  }
//
//  function aspause() {
//      playObject.jPlayer("pause");
//  }
//
//  function asReplay() {
//      playObject.jPlayer("stop").jPlayer('play');
//  }

//  var Cursor = {
//      get: function(tbid) {
//          var sel = '';
//          if (document.all) {
//              var r = document.selection.createRange();
//              document.selection.empty();
//              sel = r.text;
//          } else {
//              var tb = document.getElementById(tbid);
//              // tb.focus();
//              var start = tb.selectionStart;
//              var end = tb.selectionEnd;
//              sel = tb.value.substring(start, end);
//          }
//          return sel;
//      },
//      set: function(tbid, pos) {
//          var ctrl = document.getElementById(tbid);
//          if (ctrl.setSelectionRange) {
//              ctrl.focus();
//              ctrl.setSelectionRange(pos, pos);
//          } else if (ctrl.createTextRange) {
//              var range = ctrl.createTextRange();
//              range.collapse(true);
//              range.moveEnd('character', pos);
//              range.moveStart('character', pos);
//              range.select();
//          }
//      },
//      insert: function(tbid, str) {
//          var tb = document.getElementById(tbid);
//          tb.focus();
//          if (document.all) {
//              var r = document.selection.createRange();
//              document.selection.empty();
//              r.text = str;
//              r.collapse();
//              r.select();
//          } else {
//              var newstart = tb.selectionStart + str.length;
//              tb.value = tb.value.substr(0, tb.selectionStart) + str + tb.value.substring(tb.selectionEnd);
//              tb.selectionStart = newstart;
//              tb.selectionEnd = newstart;
//          }
//      }
//  }

//  var timer5 = null,
//      timer20 = null;
//  // 写作音频检测continue按钮操作
//  var wTestAudioHandle = (function() {
//      var $continueBtn = $('#w-testAudio-continue');
//      $continueBtn.on('click', function() {
//          $('.Writing-testAudio').hide();
//          $('.Writing-testExplain').show();
//          $('#jp-jplayer1').remove();
//          $('.Writing-testExplain').find('.remind-box').append($('.LeftTime-box'));
//      });
//  }());
//
//  // 写作介绍continue按钮操作
//  var wTestExplainHandle = (function() {
//      var $continueBtn = $('#w-testExplain-continue');
//      $continueBtn.on('click', function() {
//          $('.Writing-testExplain').hide();
//          $('.Writing-sumup').show();
//          $('.Writing-sumup').find('.remind-box').append($('.LeftTime-box'));
//      });
//  }());
//
//  function hideWritingContent() {
//          var $elem = $('.Writing-sumup-content');
//          timer5 = setTimeout(function() {
//              $elem.hide();
//          }, 1000 * 300);
//      }
//      //跳过综合写作文字介绍
//  var continueWritingText = (function() {
//      var $btn = $('#continue-Writing-Text'),
//          $Writingsumup = $('.Writing-sumup');
//      $btn.on('click', function() {
//          $Writingsumup.hide();
//          $('.WritingPlay').show();
//          $('.WritingPlay').find('.remind-box').append($('.LeftTime-box'));
//          $('.Writing-sumup').removeClass('bj');
//          timer5 = null;
//      });
//  }());
//  //跳过综合写作音频播放
//  var continueWritingPlay = (function() {
//      var $btn = $('#continueWplay');
//      $btn.on('click', function() {
//          $('.WritingPlay').hide();
//          $('#sumupWriting').show();
//          $('#sumupWriting').find('.remind-box').append($('.LeftTime-box'));
//          aspause();
//          timer20 = setTimeout(function() {
//              $('#sumupWriting').hide();
//          }, 1000 * 1200);
//      });
//  }());
//  //跳过综合写作文章
//  var IntegratedWritingArticle = (function() {
//      var $btn = $('#continue-sp-Writing');
//      $btn.on('click', function() {
//          $('#sumupWriting').hide();
//          $('.autocephaly-testExplain').show();
//          $('.autocephaly-testExplain').find('.remind-box').append($('.LeftTime-box'));
//          timer20 = null;
//      });
//  }());
//
//  //跳过独立写作介绍页面
//  var continueAutocephaly = (function() {
//      var $btn = $('#autocephaly-continue');
//      $btn.on('click', function() {
//          $('.autocephaly-testExplain').hide();
//          $('#autocephalyWriting').show();
//          $('#autocephalyWriting').find('.remind-box').append($('.LeftTime-box'));
//      });
//
//  }())

    //Cursor操作
//  function CursorHandle(parent, area) {
//      var $parent = $(parent),
//          $copy = $parent.find('.js-copy'),
//          $cut = $parent.find('.js-cut'),
//          $paste = $parent.find('.js-paste'),
//          $count = $parent.find('.count'),
//          $area = $(area);
//      var str = '';
//      $copy.on('click', function() {
//          str = Cursor.get(area.substring(1));
//      });
//      $cut.on('click', function() {
//          str = Cursor.get(area.substring(1));
//          $area.val($area.val().replace(str, ''));
//      });
//      $paste.on('click', function() {
//          Cursor.insert(area.substring(1), str);
//      });
//      $area.keyup(function() {
//          var val = $.trim($(this).val()),
//              re = /[\s\.\,\?\!]+/g,
//              arr = $.trim(val.replace(re, ' ')).split(' '),
//              g = 0;
//          g = val == '' ? 0 : arr.length;
//          $count.html(g);
//      });
//  };
//  CursorHandle('#sumupWriting', '#js-writing-editor');
//  CursorHandle('#autocephalyWriting', '#autocephaly-writing-editor');

    //听力首页continue按钮操作
//  var ListeningIndexHandle = (function() {
//      $('#indexWrapBtn').on('click', function() {
//          $('.listening_indexWrap').hide();
//          //$('.listening_indexWrap').find('.jp-jplayer').jPlayer("stop");
//          $('.listening_introduce').show();
//
//          asplay("http://bbsnew.b0.upaiyun.com/listening_direction2.mp3");
//      });
//  }());

    //听力介绍页面continue按钮操作
//  var ListeningInstructionsHandle = (function() {
//      $('#introduceBtn').on('click', function() {
//          $('.listening_introduce').hide();
//          aspause();
//          $('.listening_wrap').show();
//          $('.listening_wrap').find('.remind-box').append($('.LeftTime-box'));
//          $('.abox').eq(0).show();
//      });
//  }());

    //听力题音频播放
//  var TopicAudioPlay = (function() {
//      $('.abox').each(function() {
//          var _that = $(this);
//          _that.find('.playIcon').on('click', function() {
//              asplay(_that.attr('audioUrl'));
//          });
//          $(this).find('.pauseIcon').bind('click', function() {
//              aspause();
//          });
//          $(this).find('.HhIcon').bind('click', function() {
//              asReplay()
//          });
//      });
//  }());

    //听力大类时间进度条音频播放
//  $.fn.audioPlay = function() {
//      var $playIcon = $(this).find('.play'),
//          $jplayer = $('#jp-jplayer'),
//          $progressBtn = $(this).find('.progressBtnIcon'),
//          $progressBox = $(this).find('.progress-box'),
//          $jdIcon = $(this).find('.jd'),
//          $duration = $(this).find('.duration'),
//          $currentTime = $(this).find('.currentTime'),
//          maxWidth = $progressBox.width() - $progressBtn.width(),
//          _that = $(this);
//      var time = 0;
//      $playIcon.toggle(function() {
//          $(this).addClass('pause');
//          asplay(_that.attr('audiourl'), time);
//      }, function() {
//          $(this).removeClass('pause');
//          aspause();
//      });
//      var curTime = 0;
//      var audioDurationinSeconds = 0;
//      $jplayer.bind($.jPlayer.event.timeupdate, function(event) {
//          curTime = event.jPlayer.status.currentTime;
//          audioDurationinSeconds = event.jPlayer.status.duration;
//          var p = curTime / audioDurationinSeconds;
//          $jdIcon.width(p * 100 + "%");
//          $progressBtn.css('left', parseInt(p * maxWidth, 10));
//          $currentTime.text($.jPlayer.convertTime(curTime));
//          time = parseInt(curTime, 10);
//          $duration.text($.jPlayer.convertTime(audioDurationinSeconds));
//      });
//  };
//  $('.player-main').each(function() {
//      $(this).audioPlay();
//  });

//  Dragdrop($('.Dragdrop-topic:eq(0)'));
//  Dragdrop($('.Dragdrop-topic:eq(1)'));
//  Dragdrop($('.Dragdrop-topic:eq(2)'));

    //阅读题切换
//  function ReadingSwitchPage() {
//      var $parent = $('.wrap');
//      $parent.each(function() {
//          $r_Next = $(this).find('.r_Next'),
//              $r_Blak = $(this).find('.r_Blak');
//          // $box = $('.box'),
//          // len = $box.length;
//
//          $r_Next.bind('click', function() {
//              index++;
//              btn();
//              $('.box').hide();
//              $('.box').eq(index).show();
//              $('.wrap').find('.title').html('Reading Passage ' + (parseInt($('.box').eq(index).attr('_index'), 10) + 1));
//              if ($('.box').eq(index).find('.fixedTitle')) {
//                  var str = $('.wrap .title').text();
//                  $('.wrap .title').html(str + '&nbsp;&nbsp;&nbsp;' + $('.box').eq(index).find('.fixedTitle').text());
//              }
//          });
//          $r_Blak.bind('click', function() {
//              index--;
//              btn();
//              $('.wrap').find('.title').html('Reading Passage ' + (parseInt($('.box').eq(index).attr('_index'), 10) + 1));
//              if ($('.box').eq(index).find('.fixedTitle')) {
//                  var str = $('.wrap .title').text();
//                  $('.wrap .title').html(str + '&nbsp;&nbsp;&nbsp;' + $('.box').eq(index).find('.fixedTitle').text());
//              }
//              $('.box').hide();
//              $('.box').eq(index).show();
//          });
//
//          function btn() {
//              if (index == $('.box').length) {
//                  $('.wrap').hide();
//                  $('.listening_indexWrap').show();
//                  asplay('http://bbsnew.b0.upaiyun.com/listening_direction1.mp3');
//              }
//              if (index > 0) {
//                  $r_Blak.removeClass('no');
//                  $('.blakMark').hide();
//              }
//              if (index == 0) {
//                  $r_Blak.addClass('no');
//                  $('.blakMark').show();
//              }
//              if (index < $('.box').length - 1) {
//                  $r_Next.removeClass('no');
//                  $('.nextMark').hide();
//              }
//          }
//      });
//  };
    //load加载完成隐藏loading图
//  $('.loadBox').hide();

};

//音量拖拽调节
//function volumeHandle(parent, jPlayer) {
//      var $parent = $(parent),
//          $VolumeBtn = $parent.find('.Volume'),
//          $parent = $parent.find('.DragDrap-v-box'),
//          $drapIcon = $parent.find('.drapIcon'),
//          $volumeProgress = $parent.find('.volume-progress'),
//          maxWidth = $volumeProgress.width() - $drapIcon.width(),
//          $range = $parent.find('.range');
//      $VolumeBtn.bind('click', function(event) {
//          $parent.show();
//          event.stopPropagation();
//      });
//      $parent.bind('click', function(event) {
//          event.stopPropagation();
//      });
//      $(document).bind('click', function() {
//          $parent.hide();
//      });
//      $drapIcon.bind('mousedown', function(event) {
//          var offset = $drapIcon.offset(),
//              L = offset.left - $parent.offset().left;
//          var disX = parseInt(event.clientX - L);
//
//          $(document).bind('mousemove', function(event) {
//              var Left = event.clientX - disX;
//              if (Left <= 0) {
//                  Left = 0;
//              } else if (Left >= maxWidth) {
//                  Left = maxWidth;
//              }
//              var snale = Left / maxWidth;
//              $drapIcon.css('left', +Left + 'px');
//              $range.css('width', Left + 'px');
//              $(jPlayer).jPlayer('volume', snale);
//          });
//          $(document).bind('mouseup', function() {
//              $(document).unbind("mousemove");
//          });
//          return false;
//      });
//  }
    //阅读拖拽

//function Dragdrop(parent) {
//  var Dragdrop = parent,
//      $drag,
//      $target;
//  Dragdrop.each(function() {
//      _that = $(this);
//      $drag = $(this).find('.drag');
//      $target = $(this).find('.target');
//      var id = '';
//      $drag.draggable({
//          revert: true,
//          cursor: 'move',
//          onDrop: function() {}
//      });
//      $drag.each(function() {
//          id += '#' + $(this).attr('id') + ',';
//      });
//      var idStr = id.substring(0, id.length - 1);
//      $target.droppable({
//          accept: idStr,
//          onDrop: function(e, source) {
//              if (!$(this).text()) {
//                  $(source).hide();
//                  $(this).text($(source).attr('text'));
//                  $(this).attr('index', $(source).attr('index'));
//                  $(this).attr('_options', $.trim($(source).find('.sn-box').text()));
//              }
//          }
//      });
//      $target.click(function() {
//          var index = $(this).attr('index');
//          $(this).text('');
//          $drag.eq(index).fadeIn();
//      });
//  });
//}
