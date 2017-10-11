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
<!-- 写作准备页 -->
<div class="m-prepare write-prepare">
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
        <img id="textImg" style="display:none" src=""></img>
        <div class="Writing-left fl">
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
            <div class="progress-wrap">
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
                    <textarea spellcheck="false" name="content" class="writing-editor" id="js-writing-editor"></textarea>
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
                    <textarea spellcheck="false" name="content" class="writing-editor" id="autocephaly-writing-editor"></textarea>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- 写作答案页 -->
<div class="p-page p-result write-result f-cb f-dn">
    <div class="g-hd">
        <div class="m-top">
            <a class="logo f-fl" href="/"><img src="../images/logo.png" alt=""></a>
            <div class="top-cnt f-fl">
                <h3 class="top-tit u-tit f-mbm">TPO <span class="tpoTit"></span>&nbsp;&nbsp;Writing</h3>
            </div>
            <div class="top-cnt f-fr">
                <div class="top-fn f-mbm f-fr">
                    <a class="u-btn u-btn-fn u-btn-submit JS_write_result" href="javascript:;">提交</a>
                </div>
            </div>
        </div>
    </div>
    <div class="g-bd">
        <div class="m-result">
            <ul class="result-hd">
                <li class="hd-write on"><em></em>写作</li>
            </ul>
            <div class="result-bd">
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
<div class="loadBox">
    <div class="loadMark"></div>
    <img src="../images/big_load.gif" class="lodaImg" width="300" height="201" alt="" />
</div>
<div id="jp-jplayer"></div>
<div id="jp-jplayer1"></div>

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

<script src="../javascripts/index/jquery-1.8.0.min.js"></script>
<script type="text/javascript" src="${cdnPath}/js/lib/jquery/jquery.cookie.js"></script>
<script src="../javascripts/index/jquery.easyui.min.js"></script>
<script src="../javascripts/audio/jquery.jplayer.min.js"></script>
<script src="../javascripts/index/swfobject.js"></script>
<script src="../javascripts/util.js"></script>
<script src="../javascripts/xmbase.js"></script>
<script src="../javascripts/writing/countdown.js"></script>
<script src="../javascripts/writing/writing.js"></script>
<script src="../javascripts/app.js"></script>
<script>
$(function(){
    xm.initPage();
})
</script>
</body>
</html>
