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
<body class="bjef">
<div class="g-read">
    <!-- 阅读说明页 -->
    <div class="m-desc read-desc">
        <div class="m-top">
            <a class="logo f-fl" href="/"><img src="../images/logo.png" alt=""></a>
            <div class="top-cnt f-fl">
                <h3 class="top-tit u-tit f-mbm">TPO <span class="tpoTit"></span>&nbsp;&nbsp;Reading</h3>
                <a class="u-btn u-btn-fn2 u-btn-pause JS_read_pause" href="javascript:;">暂停</a>
            </div>
            <div class="top-cnt f-fr">
                <div class="top-fn f-mbm f-fr">
                    <a class="u-btn u-btn-continue JS_desc_continue" href="javascript:;">Continue</a>
                </div>
                <div class="clear"></div>
                <div class="top-time read-time f-fr f-dn">
                    <p class="time-txt f-fr" date-timestamp="3600">60:00</p>
                    <a class="u-btn u-btn-time f-fr JS_hidetime" href="javascript:;">HIDE TIME</a>
                </div>
            </div>
        </div>
        <div class="main-bg"></div>
        <h3 class="desc-tit f-mtw">Reading Directions</h3>
        <div class="desc-cnt">
            <p class="desc-txt">In this part of the Reading section, you will read 3 passages. In the test you will have 60 minutes to read the passage and answer the questions.</p>
            <p class="desc-txt">Most questions are worth 1 point but the last question in this set is worth more than 1 point. The directions indicate how many points you may receive.</p>
            <p class="desc-txt">Some passages include a word or phrase that is underlined in blue. Click on the word or phrase to see a definition or an explanation.</p>
            <p class="desc-txt">When you want to move to the next question, click on Next. You may skip questions and go back to them later if you want to return to previous questions, click on Back.</p>
            <p class="desc-txt">You can click on Review at any time and the review screen will show you which questions you have answered and which you have not answered. From this review screen, you may go directly to any question you have already seen in the Reading section.</p>
            <p class="desc-txt f-fwb">Click on Continue to go on</p>
        </div>
    </div>
    <!-- 阅读答题页 -->
    <div class="wrap">
        <div class="m-top">
            <a class="logo f-fl" href="/"><img src="../images/logo.png" alt=""></a>
            <div class="top-cnt f-fl">
                <h3 class="top-tit u-tit f-mbm">TPO <span class="tpoTit">1</span>&nbsp;&nbsp;Reading</h3>
                <a class="u-btn u-btn-fn2 u-btn-pause JS_read_pause" href="javascript:;">暂停</a>
            </div>
            <div class="top-cnt f-fr">
                <div class="top-fn f-mbm f-fr">
                    <a class="u-btn u-btn-fn u-btn-next f-ti f-dn JS_read_submit" href="javascript:;">submit</a>
                    <a class="u-btn u-btn-fn u-btn-next f-ti JS_read_next" href="javascript:;">next</a>
                    <a class="u-btn u-btn-fn u-btn-back f-ti JS_read_back" href="javascript:;" disabled>back</a>
                    <a class="u-btn u-btn-fn u-btn-review f-ti JS_read_review f-dn" href="javascript:;" disabled>review</a>
                    <a class="u-btn u-btn-viewText f-ti f-dn JS_read_viewtext" href="javascript:;">view text</a>
                    <a class="u-btn u-btn-viewQues f-ti f-dn JS_read_viewques" href="javascript:;">view question</a>
                </div>
                <div class="clear"></div>
                <div class="top-time read-time f-fr">
                    <p class="time-txt f-fr" date-timestamp="3600">60:00</p>
                    <a class="u-btn u-btn-time f-fr JS_hidetime" href="javascript:;">HIDE TIME</a>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="g-listen f-dn">
    <!-- 听力准备页 -->
    <div class="m-prepare listen-prepare f-dn">
        <div class="m-top">
            <a class="logo f-fl" href="/"><img src="../images/logo.png" alt=""></a>
            <div class="top-cnt f-fl">
                <h3 class="top-tit u-tit f-mbm">TPO <span class="tpoTit"></span>&nbsp;&nbsp;Listening</h3>
                <a class="u-btn u-btn-fn2 u-btn-pause JS_listen_pause" href="javascript:;">暂停</a>
            </div>
            <div class="top-cnt f-fr">
                <div class="top-fn f-mbm f-fr">
                    <a class="u-btn u-btn-continue JS_prepare_continue" href="javascript:;">Continue</a>
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
            </div>
        </div>
        <div class="prepare-cnt f-tac">
            <img class="prepare-img" src="../images/img_01.png" alt="">
            <p class="prepare-txt">Now put on your headset</p>
        </div>
    </div>
    <!-- 听力说明页 -->
    <div class="listening_indexWrap">
        <div class="m-top">
            <a class="logo f-fl" href="/"><img src="../images/logo.png" alt=""></a>
            <div class="top-cnt f-fl">
                <h3 class="top-tit u-tit f-mbm">TPO <span class="tpoTit"></span>&nbsp;&nbsp;Listening</h3>
                <a class="u-btn u-btn-fn2 u-btn-pause JS_listen_pause" href="javascript:;">暂停</a>
            </div>
            <div class="top-cnt f-fr">
                <div class="top-fn f-mbm f-fr">
                    <a id="indexWrapBtn" class="u-btn u-btn-continue" href="javascript:;">Continue</a>
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
            </div>
        </div>
        <div class="indexMain">
            <div class="indexMain-content auto">
                <h2 class="isc-title fw500 tc f24 c30" id="listening_Title">Listening Section Directions</h2>
                <div class="content-text-wrap">
                    <p class="f16" id="listening_Text">
                        This test measures your ability to understand conversations and lectures in English.<br /><br />
                        The Listening section is divided into 2 separately timed parts. In each part you will listen to 1 conversation and 2 lectures. You will hear each conversation or lecture only one time.After each conversation or lecture, you will answer some questions about it. The questions typically are about the main idea and supporting details. Some questions ask about a speaker’s purpose or attitude. Answer the questions based on what is stated or implied by the speakers.<br /><br />
                        You may take notes while you listen. You may use your notes to help you answer the questions. Your notes will not be scored. If you need to change the volume while you listen, click on the Volume icon at the top of the screen.<br /><br />
                        In some questions, you will see this icon: <img style="vertical-align:bottom;" src="../images/icon_headset.png" alt="" /> This means that you will hear, but not see, part of the question.<br /><br />
                        Some of the questions have special directions. These directions appear in a gray box on the screen.<br /><br />
                        Most questions are worth 1 point. If a question is worth more than 1 point, it will have special directions that indicate how many points you can receive.<br /><br />
                        You must answer each question. After you answer, click on Next. Then click on OK to confirm your answer and go on to the next question. After you click on OK, you cannot return to previous questions.<br /><br />
                        If you are using the Untimed Mode, you may return to previous questions and you may listen to each conversation and lecture again. Remember that prior exposure to the conversations, lectures, and questions could lead to an increase in your section scores and may not reflect a score you would get when seeing them for the first time<br /><br />
                        During this practice test, you may click the Pause icon at any time. This will stop the test until you decide to continue. You may continue the test in a few minutes or at any time during the period that your test is activated.<br /><br />
                        In an actual test, and if you are using Timed Mode, a clock at the top of screen will show you how much time is remaining. The clock will not count down while you are listening. The clock will count down only while you are answering the questions.
                    </p>
                </div>
            </div>
        </div>
    </div>
    <!-- 听力答题说明页 -->
    <div class="listening_introduce">
        <div class="m-top">
            <a class="logo f-fl" href="/"><img src="../images/logo.png" alt=""></a>
            <div class="top-cnt f-fl">
                <h3 class="top-tit u-tit f-mbm">TPO <span class="tpoTit"></span>&nbsp;&nbsp;Listening</h3>
                <a class="u-btn u-btn-fn2 u-btn-pause JS_listen_pause" href="javascript:;">暂停</a>
            </div>
            <div class="top-cnt f-fr">
                <div class="top-fn f-mbm f-fr">
                    <a id="introduceBtn" class="u-btn u-btn-continue" href="javascript:;">Continue</a>
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
                <div class="top-time listen-time f-fr f-dn">
                    <p class="time-txt f-fr" date-timestamp="600" date-timetxt="10:00">10:00</p>
                    <a class="u-btn u-btn-time f-fr JS_hidetime" href="javascript:;">HIDE TIME</a>
                </div>
            </div>
        </div>
        <div class="indexMain">
            <div class="indexMain-content auto">
                <h2 class="isc-title fw500 tc f24 c30" id="listening_Title">Listening Directions</h2>
                <div class="content-text-wrap">
                    <p class="f16" id="listening_Text">
                        In this part you will listen to 1 conversation and 2 lectures.<br /><br />
                        You must answer each question. After you answer, click on Next. Then click on OK to confirm your answer and go on to the next question. After you click on OK. you cannot return to previous questions. If you are using the Untimed Mode, you may return to previous questions.<br /><br />
                        You will now begin this part of the Listening section. In an actual test, you will have 10 minutes to answer the questions.<br /><br />
                        <span class="f-fwb">Click on Continue to go on.</span>
                    </p>
                </div>
            </div>
        </div>
        <div id="jquery_jplayer1"></div>
    </div>
    <!-- 听力答题页 -->
    <div class="listening_wrap">
        <div class="m-top">
            <a class="logo f-fl" href="/"><img src="../images/logo.png" alt=""></a>
            <div class="top-cnt f-fl">
                <h3 class="top-tit u-tit f-mbm">TPO <span class="tpoTit"></span>&nbsp;&nbsp;Listening</h3>
                <a class="u-btn u-btn-fn2 u-btn-pause JS_listen_pause" href="javascript:;">暂停</a>
            </div>
            <div class="top-cnt f-fr">
                <div class="top-fn f-mbm f-fr">
                    <a class="u-btn u-btn-fn u-btn-next f-ti f-dn JS_listen_submit" href="javascript:;">submit</a>
                    <a class="u-btn u-btn-fn u-btn-next f-ti JS_listen_next" href="javascript:;">next</a>
                    <a class="u-btn u-btn-fn u-btn-ok f-ti JS_listen_ok" href="javascript:;">ok</a>
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
                <div class="top-time listen-time f-fr f-dn">
                    <p class="time-txt f-fr" date-timestamp="600" date-timetxt="10:00">10:00</p>
                    <a class="u-btn u-btn-time f-fr JS_hidetime" href="javascript:;">HIDE TIME</a>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="g-speak f-dn">
    <!-- 口语准备页 -->
    <div class="m-prepare speak-prepare f-dn">
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
                    <span class="time-txt f-fr" date-timestamp="3600">60:00</span>
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
                    <span class="time-txt f-fr" date-timestamp="3600">60:00</span>
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
</div>

<div class="g-write f-dn">
    <!-- 写作准备页 -->
    <div class="m-prepare write-prepare f-dn">
        <div class="m-top">
            <a class="logo f-fl" href="/"><img src="../images/logo.png" alt=""></a>
            <div class="top-cnt f-fl">
                <h3 class="top-tit u-tit f-mbm">TPO <span class="tpoTit"></span>&nbsp;&nbsp;Writing</h3>
                <a class="u-btn u-btn-fn2 u-btn-pause JS_write_pause" href="javascript:;">暂停</a>
            </div>
            <div class="top-cnt f-fr">
                <div class="top-fn f-mbm f-fr">
                    <a id="w-testAudio-continue" class="u-btn u-btn-continue" href="javascript:;">Continue</a>
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
            </div>
        </div>
        <div class="prepare-cnt f-tac">
            <img class="prepare-img" src="../images/img_01.png" alt="">
            <p class="prepare-txt">Now put on your headset</p>
        </div>
    </div>
    <!-- 综合写作说明页 -->
    <div class="Writing-testExplain">
        <div class="m-top">
            <a class="logo f-fl" href="/"><img src="../images/logo.png" alt=""></a>
            <div class="top-cnt f-fl">
                <h3 class="top-tit u-tit f-mbm">TPO <span class="tpoTit"></span>&nbsp;&nbsp;Writing</h3>
                <a class="u-btn u-btn-fn2 u-btn-pause JS_write_pause" href="javascript:;">暂停</a>
            </div>
            <div class="top-cnt f-fr">
                <div class="top-fn f-mbm f-fr">
                    <a id="w-testExplain-continue" class="u-btn u-btn-continue" href="javascript:;">Continue</a>
                </div>
            </div>
        </div>
        <div class="indexMain">
            <div class="indexMain-content auto">
                <h2 class="isc-title fw500 tc f24 c30">Writing Directions</h2>
                <div class="content-text-wrap">
                    <p class="f16">
                        For this task, you will read a passage about an academic topic. A clock at the top of the screen will show how much time you have to read. You may take notes on the passage while you read. The passage will then be removed and you will listen to a lecture about the same topic. While you listen, you may also take notes. You will be able to see the reading passage again when it is time for you to write. You may use your notes to help you answer the question.<br><br>
                        In an actual test, you will then have 20 minutes to write a response to a question that asks you about the relationship between the lecture you heard and the reading passage. Try to answer the question as completely as possible using informationfrom the reading passage and lecture. The question does not ask you to express your personal opinion. Typically, an effective response will be 150 to 225 words.<br><br>
                        Your response will be judged on the quality of your writing and on the completeness and accuracy of the content.<br><br>
                        Now you will see the reading passage for minutes. Remember that it will be available to you again when you write. Immediately after the reading time ends, the lecture will begin, so keep your headset on until the lecture is over.<br><br>
                        <span class="f-fwb">Click on Continue to go on.</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <!-- 综合写作文章阅读 -->
    <div class="Writing-sumup bj">
        <div class="m-top">
            <a class="logo f-fl" href="/"><img src="../images/logo.png" alt=""></a>
            <div class="top-cnt f-fl">
                <h3 class="top-tit u-tit f-mbm">TPO <span class="tpoTit"></span>&nbsp;&nbsp;Writing</h3>
                <a class="u-btn u-btn-fn2 u-btn-pause JS_write_pause" href="javascript:;">暂停</a>
            </div>
            <div class="top-cnt f-fr">
                <div class="top-fn f-mbm f-fr">
                    <a id="continue-Writing-Text" class="u-btn u-btn-fn u-btn-next f-ti" href="javascript:;">next</a>
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
                <div class="top-time write-time f-fr">
                    <p class="time-txt f-fr" date-timestamp="180" date-timetxt="03:00">03:00</p>
                    <a class="u-btn u-btn-time f-fr JS_hidetime" href="javascript:;">HIDE TIME</a>
                </div>
            </div>
        </div>
        <div class="Writing-sumup-content">
            <div class="Writing-left fl">
                 <img id="textImg" style="display:none" src=""></img>
                <div class="l-content f14">
                </div>
            </div>
            <div class="Writing-right fl">
            </div>
        </div>
    </div>
    <!-- 综合写作音频播放 -->
    <div class="WritingPlay player-main">
        <div class="m-top">
            <a class="logo f-fl" href="/"><img src="../images/logo.png" alt=""></a>
            <div class="top-cnt f-fl">
                <h3 class="top-tit u-tit f-mbm">TPO <span class="tpoTit"></span>&nbsp;&nbsp;Writing</h3>
                <a class="u-btn u-btn-fn2 u-btn-pause JS_write_pause" href="javascript:;">暂停</a>
            </div>
            <div class="top-cnt f-fr">
                <div class="top-fn f-mbm f-fr">
                    <a id="continueWplay" class="u-btn u-btn-fn u-btn-next f-ti" href="javascript:;">next</a>
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
            </div>
        </div>
        <div class="Writing-player">
            <div class="audio-wrap tc">
                <img class="playImg" src="" data_id="00:00" alt="" />
                <div class="progress-wrap ">
                    <div class="m-progress">
                        <div class="prog-box">
                            <div class="prog-range"><i class="prog-icon"></i></div>
                        </div>
                    </div>
                </div>
                <p class="f20"><span class="currentTime">00:00</span>/<span class="duration">00:00</span></p>
            </div>
        </div>
    </div>
    
    <!-- 综合文章写作 -->
    <div class="Articlewriting" id="overall">
        <div class="m-top">
            <a class="logo f-fl" href="/"><img src="../images/logo.png" alt=""></a>
            <div class="top-cnt f-fl">
                <h3 class="top-tit u-tit f-mbm">TPO <span class="tpoTit"></span>&nbsp;&nbsp;Writing</h3>
                <a class="u-btn u-btn-fn2 u-btn-pause JS_write_pause" href="javascript:;">暂停</a>
            </div>
            <div class="top-cnt f-fr">
                <div class="top-fn f-mbm f-fr">
                    <a id="continue-sp-Writing" class="u-btn u-btn-fn u-btn-next f-ti" href="javascript:;">next</a>
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
                <div class="top-time write-time f-fr">
                    <p class="time-txt f-fr" date-timestamp="1200" date-timetxt="20:00">20:00</p>
                    <a class="u-btn u-btn-time f-fr JS_hidetime" href="javascript:;">HIDE TIME</a>
                </div>
            </div>
        </div>
        <div class="decs-content"><b>Directions: </b>You have 20 minutes to plan and write your response. Your response will be judged on the basis of the quality of your writing and on how well your response presents the points in the lecture and their relationship to the reading passage. Typically an effective response will be 300 words at least.</div>
        <div class="head-content"><b>Question: </b><span></span></div>
        <div class="Article-content">
            <div class="column fl">
                <p class="f16 column-text"></p>
            </div>
            <div class="column fl">
                <div class="col-wrapper">
                    <div class="writing-buttons">
                        <a href="javascript:;" class="btn-writing js-copy">Copy</a>
                        <a href="javascript:;" class="btn-writing js-cut">Cut</a>
                        <a href="javascript:;" class="btn-writing js-paste">Paste</a>
                        <a href="javascript:;" class="btn-writing js-count">Word Count:<span class="count">0</span></a>
                    </div>
                    <div class="writing-area">
                        <textarea name="content" class="writing-editor" id="js-writing-editor"></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- 独立写作说明页 -->
    <div class="autocephaly-testExplain">
        <div class="m-top">
            <a class="logo f-fl" href="/"><img src="../images/logo.png" alt=""></a>
            <div class="top-cnt f-fl">
                <h3 class="top-tit u-tit f-mbm">TPO <span class="tpoTit"></span>&nbsp;&nbsp;Writing</h3>
                <a class="u-btn u-btn-fn2 u-btn-pause JS_write_pause" href="javascript:;">暂停</a>
            </div>
            <div class="top-cnt f-fr">
                <div class="top-fn f-mbm f-fr">
                    <a id="autocephaly-continue" class="u-btn u-btn-continue" href="javascript:;">Continue</a>
                </div>
            </div>
        </div>
        <div class="indexMain">
            <div class="indexMain-content auto">
                <h2 class="isc-title fw500 tc f24 c30">Writing Directions</h2>
                <div class="content-text-wrap">
                    <p class="f16">
                        For this task, you will write an essay in response to a question that asks you to state, explain, and support your opinion on an issue. In an actual test, you will have 30 minutes to write your essay.<br><br>
                        Typically, an effective essay will contain a minimum of 300 words. Your essay will be judged on the quality of your writing. This includes the development of your ideas, the organization of your essay, and the quality and accuracy of the language you use to express your ideas.<br><br>
                        Now you will see the reading passage for minutes. Remember that it will be available to you again when you write. Immediately after the reading time ends, the lecture will begin, so keep your headset on until the lecture is over.<br><br>
                        <span class="f-fwb">Click on Continue to go on.</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
    <!-- 独立文章写作 -->
    <div class="Articlewriting" id="alone">
        <div class="m-top">
            <a class="logo f-fl" href="/"><img src="../images/logo.png" alt=""></a>
            <div class="top-cnt f-fl">
                <h3 class="top-tit u-tit f-mbm">TPO <span class="tpoTit"></span>&nbsp;&nbsp;Writing</h3>
                <a class="u-btn u-btn-fn2 u-btn-pause JS_write_pause" href="javascript:;">暂停</a>
            </div>
            <div class="top-cnt f-fr">
                <div class="top-fn f-mbm f-fr">
                    <a class="u-btn u-btn-fn u-btn-next f-ti JS_write_submit" href="javascript:;">submit</a>
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
                <div class="top-time write-time f-fr">
                    <p class="time-txt f-fr" date-timestamp="1800" date-timetxt="30:00">30:00</p>
                    <a class="u-btn u-btn-time f-fr JS_hidetime" href="javascript:;">HIDE TIME</a>
                </div>
            </div>
        </div>
        <div class="Article-content">
            <div class="column fl">
                <div class="decs-content"><b>Directions: </b>You have 30 minutes to plan and write your response. Your response will be judged on the basis of the quality of your writing and on how well your response presents the points in the lecture and their relationship to the reading passage. Typically an effective response will be 300 words at least.</div>
                <div class="head-content"><b>Question: </b><span></span></div>
            </div>
            <div class="column fl">
                <div class="col-wrapper">
                    <div class="writing-buttons">
                        <a href="javascript:;" class="btn-writing js-copy">Copy</a>
                        <a href="javascript:;" class="btn-writing js-cut">Cut</a>
                        <a href="javascript:;" class="btn-writing js-paste">Paste</a>
                        <a href="javascript:;" class="btn-writing js-count">Word Count:<span class="count">0</span></a>
                    </div>
                    <div class="writing-area">
                        <textarea name="content" class="writing-editor" id="autocephaly-writing-editor"></textarea>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- 整套结果页 -->
<div class="p-page p-result complete-result f-cb f-dn">
    <div class="g-hd">
        <div class="m-top">
            <a class="logo f-fl" href="/"><img src="../images/logo.png" alt=""></a>
            <div class="top-cnt f-fl">
                <h3 class="top-tit u-tit f-mbm">TPO <span class="tpoTit"></span>&nbsp;&nbsp;Complete</h3>
            </div>
            <div class="top-cnt f-fr">
                <div class="top-fn f-mbm f-fr">
                    <a class="u-btn u-btn-fn u-btn-submit JS_complete_result" href="javascript:;">提交</a>
                </div>
            </div>
        </div>
    </div>
    <div class="g-bd">
        <div class="m-result">
            <ul class="result-hd">
                <li class="hd-read on"><em></em>阅读</li>
                <li class="hd-listen"><em></em>听力</li>
                <li class="hd-speak"><em></em>口语</li>
                <li class="hd-write"><em></em>写作</li>
            </ul>
            <div class="result-bd">
                <div class="tab-box read-tab">
                    <ul class="box-hd">
                        <li class="on">Passage 1</li>
                        <li>Passage 2</li>
                        <li>Passage 3</li>
                    </ul>
                    <div class="box-bd">
                        <table class="result-table read-table read-table-01">
                            <thead>
                                <tr>
                                    <th>题目</th>
                                    <th class="f-w80">你的答案</th>
                                    <th class="f-w80">正确答案</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                        <table class="result-table read-table read-table-02">
                            <thead>
                                <tr>
                                    <th>题目</th>
                                    <th class="f-w80">你的答案</th>
                                    <th class="f-w80">正确答案</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                        <table class="result-table read-table read-table-03">
                            <thead>
                                <tr>
                                    <th>题目</th>
                                    <th class="f-w80">你的答案</th>
                                    <th class="f-w80">正确答案</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="tab-box listen-tab">
                    <ul class="box-hd">
                        <li class="on">Part 1</li>
                        <li>Part 2</li>
                    </ul>
                    <div class="box-bd">
                        <div class="listen-box">
                            <h3 class="table-tit">Conversation 1</h3>
                            <table class="result-table listen-table listen-table-01">
                                <thead>
                                    <tr>
                                        <th>题目</th>
                                        <th class="f-w80">你的答案</th>
                                        <th class="f-w80">正确答案</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                            <h3 class="table-tit">Lecture 1</h3>
                            <table class="result-table listen-table listen-table-02">
                                <thead>
                                    <tr>
                                        <th>题目</th>
                                        <th class="f-w80">你的答案</th>
                                        <th class="f-w80">正确答案</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                            <h3 class="table-tit">Lecture 2</h3>
                            <table class="result-table listen-table listen-table-03">
                                <thead>
                                    <tr>
                                        <th>题目</th>
                                        <th class="f-w80">你的答案</th>
                                        <th class="f-w80">正确答案</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                        <div class="listen-box">
                            <h3 class="table-tit">Conversation 2</h3>
                            <table class="result-table listen-table listen-table-04">
                                <thead>
                                    <tr>
                                        <th>题目</th>
                                        <th class="f-w80">你的答案</th>
                                        <th class="f-w80">正确答案</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                            <h3 class="table-tit">Lecture 3</h3>
                            <table class="result-table listen-table listen-table-05">
                                <thead>
                                    <tr>
                                        <th>题目</th>
                                        <th class="f-w80">你的答案</th>
                                        <th class="f-w80">正确答案</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                            <h3 class="table-tit">Lecture 4</h3>
                            <table class="result-table listen-table listen-table-06">
                                <thead>
                                    <tr>
                                        <th>题目</th>
                                        <th class="f-w80">你的答案</th>
                                        <th class="f-w80">正确答案</th>
                                    </tr>
                                </thead>
                                <tbody>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="tab-box speak-tab">
                </div>
                <div class="tab-box write-tab">
                    <div class="overall-box">
                        <h3 class="write-tit">Integrated Writing Task 综合写作</h3>
                        <p class="write-ques"></p>
                        <p class="answer-info">你的作答共 <span class="word-count"></span> 个单词，用时 <span class="answer-time"></span></p>
                        <div class="write-answer"></div>
                    </div>
                    <div class="alone-box">
                        <h3 class="write-tit">Independent Writing Task 独立写作</h3>
                        <p class="write-ques"></p>
                        <p class="answer-info">你的作答共 <span class="word-count"></span> 个单词，用时 <span class="answer-time"></span></p>
                        <div class="write-answer"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- Loading 页 -->
<div class="loadBox">
    <div class="loadMark"></div>
    <img src="../images/big_load.gif" class="lodaImg" width="300" height="201" alt="" />
</div>
<!-- 遮罩层 -->
<div class="mask-bg"></div>
<!-- 阅读文章提示 -->
<div class="m-pop m-pop-massage">
    <div class="pop-hd">
        <i class="pop-tit-icon"></i>
        <h3 class="pop-tit">Massage！</h3>
        <i class="pop-close JS_pop_close"></i>
    </div>
    <div class="pop-bd">
        <div class="pop-icon"></div>
        <div class="pop-cnt">You should use the scroll bar to read the whole passage before you begin to answer the question. However, the passage will appear again with each question.</div>
        <div class="pop-btn">
            <a class="JS_pop_close" href="javascript:;"><span>ok</span></a>
        </div>
    </div>
</div>
<!-- 暂停提示 -->
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
<!-- 写作时间未到提示 -->
<div class="m-pop m-pop-finish">
    <div class="pop-hd">
        <i class="pop-tit-icon"></i>
        <h3 class="pop-tit">Finish warning！</h3>
        <i class="pop-close JS_pop_close"></i>
    </div>
    <div class="pop-bd">
        <div class="pop-icon"></div>
        <div class="pop-cnt">You still have time to work on this section. As long as there is time remaining, you will be able to review your response and continue to work on it. Click on Return to go back to the current question. Click on Continue to leave this section. Once you leave this section, you will NOT be able to return to it.</div>
        <div class="pop-btn">
            <a class="JS_pop_close" href="javascript:;"><span>Return</span></a>
            <a class="JS_pop_continue" href="javascript:;"><span>Continue</span></a>
        </div>
    </div>
</div>
<!-- 练习超时提示 -->
<div class="m-pop m-pop-02 m-pop-timeout">
    <div class="pop-hd">
        <i class="pop-tit-icon"></i>
        <h3 class="pop-tit">练习超时！</h3>
        <i class="pop-close JS_pop_timeout"></i>
    </div>
    <div class="pop-bd">
        <div class="pop-cnt"><div class="pop-icon"></div>练习超时！</div>
        <div class="pop-btn">
            <a class="JS_pop_timeout" href="javascript:;"><span>确认</span></a>
        </div>
    </div>
</div>

<!-- 音频容器 -->
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
<script src="../javascripts/index/jquery.easyui.min.js"></script>
<script src="../javascripts/util.js"></script>
<script src="../javascripts/base64.js"></script>
<script src="../javascripts/xmbase.js"></script>
<script src="../javascripts/complete/countdown.js"></script>
<script src="../javascripts/complete/complete.js"></script>
<script src="../javascripts/speaking/recorder.js"></script>
<script src="../javascripts/complete/speak.js"></script>
<script src="../javascripts/app.js"></script>
<script>
$(function(){
    xm.initPage();
})
</script>
</body>
</html>