<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>个人中心-下载记录</title>
      <%@include file="../include/pub.jsp"%>
    <link rel="stylesheet" href="${cdnPath}/css/common.css"/>
    <link rel="stylesheet" href="${cdnPath}/css/userProfile.css"/>
    <link rel="stylesheet" href="${cdnPath}/js/lib/Jcrop/jquery.Jcrop.min.css"/>
    <link rel="stylesheet" href="../stylesheets/public.css">
    <link rel="stylesheet" href="../../css/common.css"/>
    <style>
    *{color:#232323;}
    .s_tabs{top:39px;width:104px;min-height:123px;background:#f3f3f3;position:absolute;border:1px solid #d0d0d0;border-top:none;text-align:center;z-index:999;font-size:13px;}
    .s_tabs li{height:41px;line-height:41px;cursor:pointer;width:96px;}
    .pop_level2{margin-left:307px;margin-top:21px;background-color:#3b3b3b;color:#fff;}
    .s_tabs li:hover{background:#000;color:#509bfd !important;}
    .caret{margin-left:-43px;display:inline-block;width:0;height:0;margin-left:2px;vertical-align:middle;border-top:4px solid;border-right:4px solid transparent;border-left:4px solid transparent;}
    .back{position:absolute;background:rgb(0, 0, 0) none repeat scroll 0% 0%;width:55px;height:32px;line-height:31px;top:59px;float:right;left:1110px;}
    .tit{margin-right:20px;}
    .time_list{float:left;width:620px;}
    .time_list li{margin-right:60px;float:left;}
    .time_list li a{color:#232323;}
    /*分页样式*/
    .page{margin: 20px 340px 30px;height:30px;line-height:30px;}
    .page .first,.page .prev,.page .next,.page .last{display:block;float:left;margin-left:5px;height:28px;line-height:28px;text-align:center;width:48px;color:#232323;border:1px solid #dcdcdc;cursor:pointer;}
    .page .page_count,.page .cur_page{display:block;float:left;margin-left:10px;}
    .page .total_count{margin:0 5px;}
    .page .goTO{display:inline-block;margin:0 10px;height:18px;line-height:18px;text-align:center;width:28px;border:1px solid #dcdcdc;outline: none;color:#232323;}
    .page .ok{display:block;float:left;margin-top:5px;margin-left:10px;height:18px;line-height:18px;text-align:center;width:28px;border:1px solid #dcdcdc;color:#232323;}
</style>
</head>
<body>
<%@include file="../include/header.jsp"%>
<div class="layout">
    <div class="main">
		<%@include file="../include/leftMenu.jsp"%>
        <div class="right" id="right_box">
<div class="m-mock f-cb" >
	    <div class="mock-type f-cb">
	        <div class="mock-tit">做题记录</div>
	    </div>
	    <div id="content" style="height:710px;">
		    <div class="mock-topic f-cb">
         </div>
    </div>
       <div class="page">
        <span class="first">首页</span>
        <span class="prev">上一页</span>
        <span class="next">下一页</span>
        <span class="last">末页</span>
        <span class="page_count">共<span class="total_count"></span>页</span>
        <label class="cur_page">当前<input class="goTO" type="text" value=""/>页</label>
        <span class="oks">确定</span>
    </div>
    <div class="clear"></div>
  </div> 
<div class="g-read" style>
<!-- 整套结果页 -->
<div class="p-page p-result complete-result f-cb">
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
                       <!--  <p class="answer-info">你的作答共 <span class="word-count"></span> 个单词，用时 <span class="answer-time"></span></p> -->
                        <div class="write-answer"></div>
                    </div>
                    <div class="alone-box">
                        <h3 class="write-tit">Independent Writing Task 独立写作</h3>
                        <p class="write-ques"></p>
                      <!--   <p class="answer-info">你的作答共 <span class="word-count"></span> 个单词，用时 <span class="answer-time"></span></p> -->
                        <div class="write-answer"></div>
                    </div>
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
            <a class="JS_pop_continue" href=""><span>Continue</span></a>
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
        </div>
    </div>
</div>
<jsp:include page="../include/footer.jsp"></jsp:include>
<script type="text/javascript" src="${cdnPath}/js/lib/Jcrop/jquery.Jcrop.min.js"></script>
<script charset="utf-8" type="text/javascript" src="${cdnPath}/js/userProfile/userProfile.js"></script>
<script src="../javascripts/audio/jquery.jplayer.min.js?timestamp=" + new Date().getTime();></script>
<script src="../javascripts/index/jquery.easyui.min.js?timestamp=" + new Date().getTime();></script>
<script src="../javascripts/util.js?timestamp=" + new Date().getTime();></script>
<script src="../javascripts/base64.js?timestamp=" + new Date().getTime();></script>
<script src="../javascripts/xmbase.js?timestamp=" + new Date().getTime();></script>
<script src="../javascripts/complete/countdown.js?timestamp=" + new Date().getTime();></script>
<script src="../javascripts/index/result.js?timestamp=" + new Date().getTime();></script>
<script src="../javascripts/speaking/recorder.js?timestamp=" + new Date().getTime();></script>
<script src="../javascripts/complete/speak.js?timestamp=" + new Date().getTime();></script>
<script src="../javascripts/app.js?timestamp=" + new Date().getTime();></script>
<script>
    $(function(){
        xm.initPage();
    })
</script>
</body>
</html>