<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!doctype html>
<html lang="zh-cn">
<head>
<%@include file="../include/pub.jsp"%>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<title>TPO在线模拟--精英计划中心</title>
<link rel="stylesheet" href="../stylesheets/public.css" type="text/css" />
<link rel="stylesheet" href="../stylesheets/instructions.css" type="text/css" />
<script>
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "//hm.baidu.com/hm.js?22fe330b8bf5f3b6daef2ad6864536cc";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();
</script>
</head>

<body>
<!-- 口语准备页 -->
<div class="m-prepare speak-prepare">
    <div class="m-top">
        <a class="logo f-fl" href="/"><img src="../images/logo.png" alt=""></a>
        <div class="top-cnt f-fl">
            <h3 class="top-tit u-tit f-mbm">TPO <span class="tpoTit"></span>&nbsp;&nbsp;Speaking</h3>
            <a class="u-btn u-btn-fn2 u-btn-pause JS_speak_pause" href="javascript:;">暂停</a>
        </div>
        <div class="top-cnt f-fr">
            <div class="top-fn f-mbm f-fr">
                <a class="u-btn u-btn-continue JS_speak_prepare_continue" href="javascript:;">Continue</a>
                <div class="m-volume f-fr">
                    <a class="u-btn u-btn-fn u-btn-volume f-ti f-dn Volume" href="javascript:;">volume</a>
                    <div class="volume-box DragDrap-v-box">
                        <div class="volume-progress">
                            <div class="volume-range range"></div>
                            <div class="volume-icon drapIcon"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="clear"></div>
            <div class="top-time f-dn f-fr">
                <span class="time-txt f-fr" date-timestamp="3600000">60:00</span>
                <a class="u-btn u-btn-time f-fr JS_hidetime" href="javascript:;">HIDE TIME</a>
            </div>
        </div>
    </div>
    <div class="prepare-cnt f-tac">
        <img class="prepare-img" src="../images/img_01.png" alt="">
        <p class="prepare-txt">Now put on your headset</p>
    </div>
</div>
<!-- 口语说明页 -->
<div class="spoken_introduce">
    <div class="m-top">
        <a class="logo f-fl" href="/"><img src="../images/logo.png" alt=""></a>
        <div class="top-cnt f-fl">
            <h3 class="top-tit u-tit f-mbm">TPO <span class="tpoTit"></span>&nbsp;&nbsp;Speaking</h3>
            <a class="u-btn u-btn-fn2 u-btn-pause JS_speak_pause" href="javascript:;">暂停</a>
        </div>
        <div class="top-cnt f-fr">
            <div class="top-fn f-mbm f-fr">
                <a id="continueSpeaking" class="u-btn u-btn-continue" href="javascript:;">Continue</a>
                <div class="m-volume f-fr">
                    <a class="u-btn u-btn-fn u-btn-volume f-ti f-dn Volume" href="javascript:;">volume</a>
                    <div class="volume-box DragDrap-v-box">
                        <div class="volume-progress">
                            <div class="volume-range range"></div>
                            <div class="volume-icon drapIcon"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="clear"></div>
            <div class="top-time f-dn f-fr">
                <span class="time-txt f-fr" date-timestamp="3600000">60:00</span>
                <a class="u-btn u-btn-time f-fr JS_hidetime" href="javascript:;">HIDE TIME</a>
            </div>
        </div>
    </div>
    <div class="indexMain">
        <div class="indexMain-content auto">
            <h2 class="isc-title fw500 tc f24 c30">Speaking Section Directions</h2>
            <div class="content-text-wrap">
                <p class="f16">
                    In this Speaking practice test. YOU will be able to demonstrate your ability to speak about a variety of topics. You will answer six questions by speaking into a microphone. Answer each of the questions as completely as possible.In questions I and 2. you will speak about familiar topics. Your response will be scored on your ability to speak clearly and coherently about the topics.<br><br>
                    In questions 3 and 4. You will first read a short text. The text will go away and you will then listen to a talk on the same topic. You will then be asked a question about what you have read and heard You will need to combine appropriate information from the text and the talk to provide a complete answer to the question Your response will be scored on your ability to speak clearly and coherently and on your ability to accurately convey information about what you have read and heard In questions 5 and 6. you will listen to part of a conversation or a lecture. You will then be asked a question about what you have heard. Your response will be scored on your ability to speak clearly and coherently and on your ability to accurately convey information about what you heard. In questions 3 through 6. you may take notes while you read and while you listen to the conversations and lectures. You may use your notes to help prepare your response.<br><br>
                    Listen carefully to the directions for each question. The directions will not be written on the screen. For each question, you will be given a short time to prepare your response (15 to 30 seconds, depending on the question). A clock will show how much preparation time is remaining. When the preparation time is up. you will be told to begin your response. A clock will show how much response time is remaining. A message will appear on the screen when the response time has ended.<br><br>
                    In this practice test, you can click on Stop Recording to stop the recording of your response. You can also click on Playback Response to hear your recording. Once you have heard your response, you will have the opportunity to record your response again or confirm that you want to keep your response. In questions 3 through 6. you can click on Replay Talk if you want to listen to the conversations or lectures again. During this practice test, you may click the Pause icon at anytime. This will stop the test until you decide to continue. You may continue the test in a few minutes or at any time during the period that your test is activated.<br><br>
                    Please note that the Stop Recording. Playback Response. Replay Talk, and Pause icons are available only for this practice test. They will NOT be available during the actual test. If you do not use these functions, your experience will be closer to the actual TOEFL test experience. Performance on the Speaking Practice test is not necessarily a predictor of how you might perform during an actual TOEFL administration.<br><br>
                    <span class="f-fwb">Click on Continue to go on.</span>
                </p>
            </div>
        </div>
    </div>
</div>
<!-- 口语答题页 -->
<div class="speaking-topic">
</div>
<!-- 口语音频检测 -->
<div class="spoken_test">
    <div class="m-top">
        <a class="logo f-fl" href="/"><img src="../images/logo.png" alt=""></a>
        <div class="top-cnt f-fl">
            <h3 class="top-tit u-tit f-mbm">TPO <span class="tpoTit"></span>&nbsp;&nbsp;Speaking</h3>
            <a class="u-btn u-btn-fn2 u-btn-pause JS_speak_pause" href="javascript:;">暂停</a>
        </div>
        <div class="top-cnt f-fr">
            <div class="top-fn f-mbm f-fr">
                <a id="speakingBtn" class="u-btn u-btn-continue" href="javascript:;">Continue</a>
                <div class="m-volume f-fr">
                    <a class="u-btn u-btn-fn u-btn-volume f-ti Volume" href="javascript:;">volume</a>
                    <div class="volume-box DragDrap-v-box">
                        <div class="volume-progress">
                            <div class="volume-range range"></div>
                            <div class="volume-icon drapIcon"></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="clear"></div>
            <div class="top-time f-dn f-fr">
                <span class="time-txt f-fr" date-timestamp="3600000">60:00</span>
                <a class="u-btn u-btn-time f-fr JS_hidetime" href="javascript:;">HIDE TIME</a>
            </div>
        </div>
    </div>
    <div class="audio-wrap tc">
        <img alt="" src="../images/hearing.jpg">
        <h2 class="tc f30 c3 audio-title">Now put on your headset</h2>
        <div class="Test-audio auto">
            <a class="lbIcon fl" href="javascript:;"></a>
            <p class="f14 c6 tipText">音频播放正常，您可以点击播放按钮进行再次测试或通过Volume按键进行音量调整</p>
        </div>
        <div class="Test-recording auto">
            <a id="record" class="u-btn2" href="javascript:record()">录音</a>
            <a id="play" class="u-btn2 u-btn2-c2" href="javascript:play()">播放</a>
            <a id="stop" class="u-btn2 u-btn2-c3" href="javascript:stop()">暂停</a>
            <a id="upload" class="u-btn2 u-btn2-c4" href="javascript:upload()">上传</a>
            <span id="time">0:00</span>
        </div>
    </div>
</div>
<!-- 口语答案页 -->
<div class="p-page p-result speak-result f-cb f-dn">
    <div class="g-hd">
        <div class="m-top">
            <a class="logo f-fl" href="/"><img src="../images/logo.png" alt=""></a>
            <div class="top-cnt f-fl">
                <h3 class="top-tit u-tit f-mbm">TPO <span class="tpoTit"></span>&nbsp;&nbsp;Speaking</h3>
            </div>
            <div class="top-cnt f-fr">
                <div class="top-fn f-mbm f-fr">
                    <a class="u-btn u-btn-fn u-btn-submit JS_speak_result" href="javascript:;">提交</a>
                </div>
            </div>
        </div>
    </div>
    <div class="g-bd">
        <div class="m-result">
            <ul class="result-hd">
                <li class="hd-speak on"><em></em>口语</li>
            </ul>
            <div class="result-bd">
                <div class="tab-box speak-tab">
                </div>
            </div>
        </div>
    </div>
</div>
<!-- 遮罩层 -->
<div class="mask-bg"></div>
<div class="m-pop m-pop-02 m-pop-pause">
    <div class="pop-hd">
        <i class="pop-tit-icon"></i>
        <h3 class="pop-tit">练习暂停！</h3>
        <i class="pop-close JS_pop_close"></i>
    </div>
    <div class="pop-bd">
        <div class="pop-cnt"><div class="pop-icon"></div>暂时离开考试</div>
        <div class="pop-btn">
            <a class="JS_pop_close" href="javascript:;"><span>继续练习</span></a>
        </div>
    </div>
</div>
<div class="loadBox">
    <div class="loadMark"></div>
    <img src="../images/big_load.gif" class="lodaImg" width="300" height="201" alt="" />
</div>

<div id="jp-jplayer"></div>
<div id="jp-progress3" class="jp"></div>
<div id="jp-progress4" class="jp"></div>
<div id="jp-progress5" class="jp"></div>
<div id="jp-progress6" class="jp"></div>

<div id="jquery_jplayer_1"></div>
<div id="jquery_jplayer_2"></div>
<div id="jquery_jplayer_3"></div>
<div id="jquery_jplayer_4"></div>
<div id="jquery_jplayer_5"></div>
<div id="jquery_jplayer_6"></div>

<script src="../javascripts/index/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="${cdnPath}/js/lib/jquery/jquery.cookie.js"></script>
<script src="../javascripts/audio/jquery.jplayer.min.js"></script>
<script src="../javascripts/index/swfobject.js"></script>
<script src="../javascripts/util.js"></script>
<script src="../javascripts/xmbase.js"></script>
<script src="../javascripts/speaking/countdown.js"></script>
<script src="../javascripts/speaking/speaking.js"></script>
<script src="../javascripts/speaking/recorder.js"></script>
<script src="../javascripts/speaking/speak.js"></script>
<script src="../javascripts/app.js"></script>
<script>
$(function(){
    xm.initPage();
})

</script>
</body>
</html>
