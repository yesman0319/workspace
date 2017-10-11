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
                <a class="u-btn u-btn-fn u-btn-next f-ti JS_next" href="javascript:;">next</a>
                <a class="u-btn u-btn-fn u-btn-back f-ti JS_back" href="javascript:;" disabled>back</a>
                <a class="u-btn u-btn-fn u-btn-review f-ti JS_review f-dn" href="javascript:;" disabled>review</a>
                <a class="u-btn u-btn-viewText f-ti f-dn JS_viewtext" href="javascript:;">view text</a>
                <a class="u-btn u-btn-viewQues f-ti f-dn JS_viewques" href="javascript:;">view question</a>
            </div>
            <div class="clear"></div>
            <div class="top-time read-time f-fr">
                <p class="time-txt f-fr" date-timestamp="3600">60:00</p>
                <a class="u-btn u-btn-time f-fr JS_hidetime" href="javascript:;">HIDE TIME</a>
            </div>
        </div>
    </div>
</div>
<!-- 阅读答案页 -->
<div class="p-page p-result read-result f-cb f-dn">
    <div class="g-hd">
        <div class="m-top">
            <a class="logo f-fl" href="/"><img src="../images/logo.png" alt=""></a>
            <div class="top-cnt f-fl">
                <h3 class="top-tit u-tit f-mbm">TPO <span class="tpoTit"></span>&nbsp;&nbsp;Reading</h3>
            </div>
            <div class="top-cnt f-fr">
                <div class="top-fn f-mbm f-fr">
                    <a class="u-btn u-btn-fn u-btn-submit JS_read_result" href="javascript:;">提交</a>
                </div>
            </div>
        </div>
    </div>
    <div class="g-bd">
        <div class="m-result">
            <ul class="result-hd">
                <li class="hd-read on"><em></em>阅读</li>
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
<script src="../javascripts/util.js"></script>
<script src="../javascripts/base64.js"></script>
<script src="../javascripts/xmbase.js"></script>
<script src="../javascripts/reading/countdown.js"></script>
<script src="../javascripts/reading/dragdrop.js"></script>
<script src="../javascripts/reading/reading.js"></script>
<script src="../javascripts/app.js"></script>
<script>
$(function(){
    xm.initPage();
})
</script>
</body>
</html>
