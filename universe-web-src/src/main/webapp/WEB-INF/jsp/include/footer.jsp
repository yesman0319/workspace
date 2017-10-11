<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<div class="footer1">
    <div class="link">
        <div class="width">
            <div class="f_link">
                <div class="fl l1">
                    <img src="<c:url value="/i/f_link.png"/>" alt="精英计划"/>
                    <ul class="f_link_list">
                        <li><a href="#">关于我们&nbsp;&nbsp;about us</a></li>
                        <li><a href="<c:url value="/protocol.html?type=1"/>" target="_blank">使用协议&nbsp;&nbsp;Use protocol</a></li>
                        <li><a href="#">常见问题&nbsp;&nbsp;Common problem</a></li>
                        <li><a href="#">联系我们&nbsp;&nbsp;Contact us</a></li>
                    </ul>
                </div>
                <div class="fl l2">
                    <img src="<c:url value="/i/f_universe.png"/>" alt="精英计划"/>
                    <%-- <div class="f_ios fl">
                        <span>iphone</span>
                        <img src="<c:url value="/i/f_code_ios.png"/>" alt="精英计划IOS下载"/>
                    </div>
                    <div class="f_ad fl">
                        <span>Android</span>
                        <img src="<c:url value="/i/f_code_ad.png"/>" alt="精英计划Android下载"/>
                    </div> --%>
                    <div class="f_ios fl">
                        <span>iphone/Android</span>
                        <img src="<c:url value="/i/f_code_ios.png"/>" alt="精英计划IOS下载"/>                   
                    </div>
                </div>
                <div class="fl l3">
                    <img src="<c:url value="/i/f_followme.png"/>" alt="精英计划社区"/>
                    <ul class="f_icon_list">
                        <%-- <li><a href=""><img src="<c:url value="/i/f_icon1.png"/>" alt=""/></a></li>
                        <li><a href=""><img src="<c:url value="/i/f_icon2.png"/>" alt=""/></a></li>
                        <li style="margin-right:0;"><a href=""><img src="<c:url value="/i/f_icon3.png"/>" alt=""/></a></li> --%>
                        <li><a href="" class="footer_WeChat"><img src="<c:url value="/i/f_icon4.png"/>" alt=""/>
                        <div id="footer_dLoad">
                            <img src="<c:url value="/i/footer_dLoad.jpg"/>" alt="关注微信公众号"/>
                            <p>扫描二维码</p>
                            <p>关注精英计划微信公众号</p>
                        </div>
                        </a></li>
                        <li><a href="http://jq.qq.com/?_wv=1027&k=2AZInl7" target="_blank"><img src="<c:url value="/i/f_icon5.png"/>" alt="关注qq群"/></a></li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
    <div class="mid"><p class="width">© 2014 小马过河 京ICP备14009560号-3 京公网安备11010802016914号</p></div>
</div>