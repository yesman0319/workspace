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
<!-- 听力准备页 -->
<div class="m-prepare listen-prepare">
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
<!-- 听力答案页 -->
<div class="p-page p-result listen-result f-cb f-dn">
    <div class="g-hd">
        <div class="m-top">
            <a class="logo f-fl" href="/"><img src="../images/logo.png" alt=""></a>
            <div class="top-cnt f-fl">
                <h3 class="top-tit u-tit f-mbm">TPO <span class="tpoTit"></span>&nbsp;&nbsp;Listening</h3>
            </div>
            <div class="top-cnt f-fr">
                <div class="top-fn f-mbm f-fr">
                    <a class="u-btn u-btn-fn u-btn-submit JS_listen_result" href="javascript:;">提交</a>
                </div>
            </div>
        </div>
    </div>
    <div class="g-bd">
        <div class="m-result">
            <ul class="result-hd">
                <li class="hd-listen on"><em></em>听力</li>
            </ul>
            <div class="result-bd">
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
            </div>
        </div>
    </div>
</div>
<!-- 遮罩层 -->
<div class="mask-bg"></div>
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
<!-- Loading 页 -->
<div class="loadBox">
    <div class="loadMark"></div>
    <img src="../images/big_load.gif" class="lodaImg" width="300" height="201" alt="" />
</div>
<!-- 音频容器 -->
<div id="jp-jplayer"></div>

<script src="../javascripts/index/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="${cdnPath}/js/lib/jquery/jquery.cookie.js"></script>
<script src="../javascripts/audio/jquery.jplayer.min.js"></script>
<script src="../javascripts/util.js"></script>
<script src="../javascripts/xmbase.js"></script>
<script src="../javascripts/hearing/countdown.js"></script>
<script src="../javascripts/hearing/hearing.js"></script>
<script src="../javascripts/app.js"></script>
<script>
$(function(){
    xm.initPage();
})
</script>
</body>
</html>
