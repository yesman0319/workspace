<%@ page contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/fmt" prefix="fmt"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions"%>
<!DOCTYPE html>
<html>
<head lang="en">
    <meta charset="UTF-8">
    <title>个人中心</title>
    <link rel="stylesheet" href="../css/common.css"/>
    <link rel="stylesheet" href="../css/userProfile.css"/>
    <link rel="stylesheet" href="../js/lib/jcrop/jquery.Jcrop.min.css"/>
</head>
<body>
<div class="header">
    <div class="width">
        <img class="fl logo" src="../i/logo.png" alt="精英计划"/>
        <ul class="fl nav">
            <li><a href="javascript:;">首页</a></li>
            <li><a href="live_course.html">直播</a></li>
            <li><a href="video_course.html">学习计划</a></li>
            <li><a href="javascript:;">资料</a></li>
            <li><a href="javascript:;">回放</a></li>
            <li><a href="javascript:;">FAQ</a></li>
        </ul>
        <div class="user_nav fr">
            <div class="user fl">
                <i class="no_message"></i>
                <span class="nickname">宇宙超人</span>
                <i class="level"></i>
            </div>
            <div class="message fl">
                <i class="icon_msg"></i>
                <span>消息</span>
                <span class="num_msg">26</span>
            </div>
        </div>
    </div>
</div>
<div class="layout">
    <div class="main">
        <div class="leftSide fl">
            <div class="user_info ">
                <img class="avatar" src="../i/user/avatar_s.png" alt="头像"/>

                <div class="info fl mt10">
                    <span class="nickname">宇宙超人<i class="user_vip"></i></span>

                    <p class="mt8"><span class="due">7月8日到期</span><a class="re_pay" href="javascript:;">续费</a></p>

                    <p class="mt8"><i class="pen"></i><a class="change_psw" href="javascript:;">修改密码</a></p>
                </div>
            </div>
            <ul class="menu">
            	<li><a class="menu_list cur" href="#tab0"><i class="order"></i>我的订单</a></li>
                <li><a class="menu_list" href="#tab1"><i class="plan"></i>学习计划</a></li>
                <li><a class="menu_list" href="#tab2"><i class="video"></i>视频课程</a></li>
                <li><a class="menu_list" href="#tab3"><i class="practice"></i>练习历史</a></li>
                <li><a class="menu_list" href="#tab4"><i class="down_his"></i>下载历史</a></li>
                <li><a class="menu_list" href="#tab5"><i class="setting"></i>账户设置</a></li>
               
            </ul>
            <p class="exit">退出登录</p>
        </div>

        <div class="right" id="right_box">
        	<!--我的订单-->
            <div class="rightSide order_div fl" style="display:block;">
                <p class="location"><a class="user_href" href="javascript:;">个人中心</a>><a class="down_href"
                                                                                         href="javascript:;">我的订单</a>
                </p>
                	<div class="order_top">
						<a href="javascript:;" class="all_order">全部订单</a>
						<a href="javascript:;" class="waitfor_pay">代付款<span class="waitfor_pay_num">1</span></a>
					</div>
					<ol class="order_title">
						<li style="width: 254px;">商品详情</li>
						<li>金额</li>
						<li>状态</li>
						<li>操作</li>
					</ol>
					<div class="order_list">
						<div class="order_thead">
							<span class="order_time">2016-07-10&nbsp;12:00:00</span>
							<span style="color: #767676;font-size: 13px;">订单号:&nbsp;<span class="order_code">89898989</span></span>
						</div>
						<ol class="order_tbody">
							<li class="order_content">
								<a href="javascript:;" class="order_img"><img src="../i/plan_img2.png" /></a>
								<div class="desc">
									<h3>TPO模块计划</h3>
									<a href="javascript:;" class="test">
										<b style="background: url(../i/paper_icon.png) no-repeat center;"></b>
										&nbsp;800题
									</a>
								</div>
							</li>
							<li class="price">
								<i class="price_icon"></i>998
							</li>
							<li class="order_status">
								<h3 id="order_status">待付款</h3>
								<a href="javascript:;" class="order_detail">订单详情</a>
							</li>
							<li class="pay">
								<a href="javascript:;" class="pay_now">立即付款</a>
							</li>
						</ol>
					</div>
					<div class="order_list">
						<div class="order_thead">
							<span class="order_time">2016-07-10&nbsp;12:00:00</span>
							<span style="color: #767676;font-size: 13px;">订单号:&nbsp;<span class="order_code">89898989</span></span>
						</div>
						<ol class="order_tbody">
							<li class="order_content">
								<a href="javascript:;" class="order_img"><img src="../i/plan_img2.png" /></a>
								<div class="desc">
									<h3>TPO模块计划</h3>
									<a href="javascript:;" class="test">
										<b style="background: url(../i/paper_icon.png) no-repeat center;"></b>
										&nbsp;800题
									</a>
								</div>
							</li>
							<li class="price">
								<i class="price_icon"></i>998
							</li>
							<li class="order_status">
								<h3 id="order_status">已付款</h3>
								<a href="javascript:;" class="order_detail">订单详情</a>
							</li>
							<li class="pay">
								<a href="javascript:;" class="check_now">立即查看</a>
							</li>
						</ol>
					</div>
					<div class="order_list">
						<div class="order_thead">
							<span class="order_time">2016-07-10&nbsp;12:00:00</span>
							<span style="color: #767676;font-size: 13px;">订单号:&nbsp;<span class="order_code">89898989</span></span>
						</div>
						<ol class="order_tbody">
							<li class="order_content">
								<a href="javascript:;" class="order_img"><img src="../i/plan_img2.png" /></a>
								<div class="desc">
									<h3>TPO模块计划</h3>
									<a href="javascript:;" class="test">
										<b style="background: url(../i/paper_icon.png) no-repeat center;"></b>
										&nbsp;800题
									</a>
								</div>
							</li>
							<li class="price">
								<i class="price_icon"></i>998
							</li>
							<li class="order_status">
								<h3 id="order_status">待付款</h3>
								<a href="javascript:;" class="order_detail">订单详情</a>
							</li>
							<li class="pay">
								<a href="javascript:;" class="pay_now">立即付款</a>
							</li>
						</ol>
					</div>
					<div class="order_list">
						<div class="order_thead">
							<span class="order_time">2016-07-10&nbsp;12:00:00</span>
							<span style="color: #767676;font-size: 13px;">订单号:&nbsp;<span class="order_code">89898989</span></span>
						</div>
						<ol class="order_tbody">
							<li class="order_content">
								<a href="javascript:;" class="order_img"><img src="../i/plan_img2.png" /></a>
								<div class="desc">
									<h3>TPO模块计划</h3>
									<a href="javascript:;" class="test">
										<b style="background: url(../i/paper_icon.png) no-repeat center;"></b>
										&nbsp;800题
									</a>
								</div>
							</li>
							<li class="price">
								<i class="price_icon"></i>998
							</li>
							<li class="order_status">
								<h3 id="order_status">已付款</h3>
								<a href="javascript:;" class="order_detail">订单详情</a>
							</li>
							<li class="pay">
								<a href="javascript:;" class="check_now">立即查看</a>
							</li>
						</ol>
					</div>
					<div style="margin-top:20px;width:810px;text-align:center;">
                    <div class="page">
                        <span class="first">首页</span><span class="prev">上一页</span>
                        <ul class="page_list">
                            <li class="omit_left">...</li>
                            <li><a href="javascript:;">1</a></li>
                            <li><a href="javascript:;">2</a></li>
                            <li><a href="javascript:;">3</a></li>
                            <li><a href="javascript:;">4</a></li>
                            <li><a href="javascript:;">5</a></li>
                            <li class="omit_left">...</li>
                        </ul>
                        <span class="next">下一页</span><span class="last">末页</span>
                        <span class="page_count">共<span class="total_count">10</span>页</span>
                        <label class="cur_page">当前<input class="goTO" type="text" value="1"/>页</label>
                        <a class="ok" href="javascript:;">确定</a>
                    </div></div>
            </div>
            
            <!--学习计划-->
            <div class="rightSide plan_div fl" style="display:none;">
                <p class="location"><a class="user_href" href="javascript:;">个人中心</a>><a class="down_href"
                                                                                         href="javascript:;">学习计划</a>
                </p>

                <ul class="list">
					<li>
						<a href="javascript:;"><img src="../i/plan_img1.png" class="plan_img" /></a>
						<div class="desc">
							<div class="left">
								<h3 class="plan_title">基础提分计划</h3>
								<a href="javascript:;" class="test_time">
									<b style="background: url(../i/time_icon.png) no-repeat center;"></b>
									&nbsp;用时10分钟</a>
								<p><a href="javascript:;" class="continue">继续学习</a></p>
							</div>
							<div class="middle">
								<p class="price">
									<i class="rmb_icon"></i>
									120
								</p>
								<a href="javascript:;" class="study_progress">
									<b style="background: url(../i/plan_icon.png) no-repeat center;"></b>
									&nbsp;已学至&nbsp;第1节托福写作名言技巧</a>
							</div>
							<div class="right">
								<p class="delete"></p>
								<p class="date">
									上次练习时间&nbsp;:&nbsp;<span id="last_time">2016-07-05<span>
									<a href="javascript:;" class="buy_plan">加入计划</a>
								</p>
							</div>
						</div>	
					</li>
					<li>
						<a href="javascript:;"><img src="../i/plan_img2.png" class="plan_img" /></a>
						<div class="desc">
							<div class="left">
								<h3 class="plan_title">基础提分计划</h3>
								<a href="javascript:;" class="test_time">
									<b style="background: url(../i/time_icon.png) no-repeat center;"></b>
									&nbsp;用时10分钟</a>
								<p><a href="javascript:;" class="continue">继续学习</a></p>
							</div>
							<div class="middle">
								<p class="price">
									<i class="rmb_icon"></i>
									120
								</p>
								<a href="javascript:;" class="study_progress">
									<b style="background: url(../i/plan_icon.png) no-repeat center;"></b>
									&nbsp;已学至&nbsp;第1节托福写作名言技巧</a>
							</div>
							<div class="right">
								<p class="delete"></p>
								<p class="date">
									上次练习时间&nbsp;:&nbsp;<span id="last_time">2016-07-05<span>
									<a href="javascript:;" class="buy_plan">购买计划</a>
								</p>
							</div>
						</div>	
					</li>
					<li class="lastChild">
						<a href="javascript:;"><img src="../i/plan_img1.png" class="plan_img" /></a>
						<div class="desc">
							<div class="left">
								<h3 class="plan_title">基础提分计划</h3>
								<a href="javascript:;" class="test_time">
									<b style="background: url(../i/time_icon.png) no-repeat center;"></b>
									&nbsp;用时10分钟</a>
								<p><a href="javascript:;" class="continue">继续学习</a></p>
							</div>
							<div class="middle">
								<p class="price">
									<i class="rmb_icon"></i>
									120
								</p>
								<a href="javascript:;" class="study_progress">
									<b style="background: url(../i/plan_icon.png) no-repeat center;"></b>
									&nbsp;已学至&nbsp;第1节托福写作名言技巧</a>
							</div>
							<div class="right">
								<p class="delete"></p>
								<p class="date">
									上次练习时间&nbsp;:&nbsp;<span id="last_time">2016-07-05<span>
									<a href="javascript:;" class="add_plan">加入计划</a>
								</p>
							</div>
						</div>	
					</li>
				</ul>
				<div style="margin-top:20px;width:810px;text-align:center;">
                    <div class="page">
                        <span class="first">首页</span><span class="prev">上一页</span>
                        <ul class="page_list">
                            <li class="omit_left">...</li>
                            <li><a href="javascript:;">1</a></li>
                            <li><a href="javascript:;">2</a></li>
                            <li><a href="javascript:;">3</a></li>
                            <li><a href="javascript:;">4</a></li>
                            <li><a href="javascript:;">5</a></li>
                            <li class="omit_left">...</li>
                        </ul>
                        <span class="next">下一页</span><span class="last">末页</span>
                        <span class="page_count">共<span class="total_count">10</span>页</span>
                        <label class="cur_page">当前<input class="goTO" type="text" value="1"/>页</label>
                        <a class="ok" href="javascript:;">确定</a>
                    </div>
                  </div>
            </div>
            
            <!--视频课程-->
            <div class="rightSide video_div fl" style="display:none;">
                <p class="location"><a class="user_href" href="javascript:;">个人中心</a>><a class="down_href"
                                                                                         href="javascript:;">视频课程</a>
                </p>

               <ul class="list">
					<li>
						<a href="javascript:;"><img src="../i/video_img.png" class="plan_img" /></a>
						<div class="desc">
							<div class="left">
								<h3 class="plan_title">基础提分计划</h3>
								<a href="javascript:;" class="video_num">
									<b style="background: url(../i/video_icon.png) no-repeat center;"></b>
									&nbsp;已看<span id="video_num">0</span>个视频</a>
								<p><a href="javascript:;" class="continue">继续观看</a></p>
							</div>
							<div class="middle">
								<p class="price">
									<i class="rmb_icon"></i>
									120
								</p>
								<a href="javascript:;" class="study_progress">
									<b style="background: url(../i/plan_icon.png) no-repeat center;"></b>
									&nbsp;已学至&nbsp;第1节托福写作名言技巧</a>
							</div>
							<div class="right">
								<p class="delete"></p>
								<p class="date">
									上次观看时间&nbsp;:&nbsp;<span id="last_time">2016-07-05<span>
								</p>
							</div>
						</div>	
					</li>
					<li>
						<a href="javascript:;"><img src="../i/video_img.png" class="plan_img" /></a>
						<div class="desc">
							<div class="left">
								<h3 class="plan_title">基础提分计划</h3>
								<a href="javascript:;" class="video_num">
									<b style="background: url(../i/video_icon.png) no-repeat center;"></b>
									&nbsp;已看<span id="video_num">0</span>个视频</a>
								<p><a href="javascript:;" class="continue">继续观看</a></p>
							</div>
							<div class="middle">
								<p class="price">
									<i class="rmb_icon"></i>
									120
								</p>
								<a href="javascript:;" class="study_progress">
									<b style="background: url(../i/plan_icon.png) no-repeat center;"></b>
									&nbsp;已学至&nbsp;第1节托福写作名言技巧</a>
							</div>
							<div class="right">
								<p class="delete"></p>
								<p class="date">
									上次观看时间&nbsp;:&nbsp;<span id="last_time">2016-07-05<span>
								</p>
							</div>
						</div>	
					</li>
					<li class="lastChild">
						<a href="javascript:;"><img src="../i/video_img.png" class="plan_img" /></a>
						<div class="desc">
							<div class="left">
								<h3 class="plan_title">基础提分计划</h3>
								<a href="javascript:;" class="video_num">
									<b style="background: url(../i/video_icon.png) no-repeat center;"></b>
									&nbsp;已看<span id="video_num">0</span>个视频</a>
								<p><a href="javascript:;" class="continue">继续观看</a></p>
							</div>
							<div class="middle">
								<p class="price">
									<i class="rmb_icon"></i>
									120
								</p>
								<a href="javascript:;" class="study_progress">
									<b style="background: url(../i/plan_icon.png) no-repeat center;"></b>
									&nbsp;已学至&nbsp;第1节托福写作名言技巧</a>
							</div>
							<div class="right">
								<p class="delete"></p>
								<p class="date">
									上次观看时间&nbsp;:&nbsp;<span id="last_time">2016-07-05<span>
								</p>
							</div>
						</div>	
					</li>
				</ul>
				<div style="margin-top:20px;width:810px;text-align:center;">
                    <div class="page">
                        <span class="first">首页</span><span class="prev">上一页</span>
                        <ul class="page_list">
                            <li class="omit_left">...</li>
                            <li><a href="javascript:;">1</a></li>
                            <li><a href="javascript:;">2</a></li>
                            <li><a href="javascript:;">3</a></li>
                            <li><a href="javascript:;">4</a></li>
                            <li><a href="javascript:;">5</a></li>
                            <li class="omit_left">...</li>
                        </ul>
                        <span class="next">下一页</span><span class="last">末页</span>
                        <span class="page_count">共<span class="total_count">10</span>页</span>
                        <label class="cur_page">当前<input class="goTO" type="text" value="1"/>页</label>
                        <a class="ok" href="javascript:;">确定</a>
                    </div></div>
            </div>
            	
            <!--练习历史-->
            <div class="rightSide practice_div fl" style="display:none;">
                <p class="location"><a class="user_href" href="javascript:;">个人中心</a>><a class="down_href"
                                                                                         href="javascript:;">练习历史</a>
                </p>
				<ul class="list">
					<li>
						<div class="tingli_icon">
							<a href="javascript:;"><img src="../i/tingli_icon (1).png" /></a>
						</div>
						<div class="desc">
							<div class="left">
								<h3>TPO 听力 Passage1</h3>
								<a href="javascript:;" class="tifen_plan">
									<b style="background: url(../i/paper_icon.png) no-repeat center;"></b>
									&nbsp;基础提分计划</a>
							</div>
							<div class="middle">
								<a href="javascript:;" class="check_out">查看结果</a>
								<a href="javascript:;" class="delete_record">删除记录</a>
							</div>
							<div class="right">
								<span class="day">2016-07-25</span>&nbsp;<span class="time">12:36</span>
							</div>
						</div>	
					</li>
					<li>
						<div class="tingli_icon">
							<a href="javascript:;"><img src="../i/tingli_icon (1).png" /></a>
						</div>
						<div class="desc">
							<div class="left">
								<h3>TPO 听力 Passage1</h3>
								<a href="javascript:;" class="tifen_plan">
									<b style="background: url(../i/paper_icon.png) no-repeat center;"></b>
									&nbsp;基础提分计划</a>
							</div>
							<div class="middle">
								<a href="javascript:;" class="check_out">查看结果</a>
								<a href="javascript:;" class="delete_record">删除记录</a>
							</div>
							<div class="right">
								<span class="day">2016-07-25</span>&nbsp;<span class="time">12:36</span>
							</div>
						</div>	
					</li>
					<li>
						<div class="tingli_icon">
							<a href="javascript:;"><img src="../i/tingli_icon (1).png" /></a>
						</div>
						<div class="desc">
							<div class="left">
								<h3>TPO 听力 Passage1</h3>
								<a href="javascript:;" class="tifen_plan">
									<b style="background: url(../i/paper_icon.png) no-repeat center;"></b>
									&nbsp;基础提分计划</a>
							</div>
							<div class="middle">
								<a href="javascript:;" class="check_out">查看结果</a>
								<a href="javascript:;" class="delete_record">删除记录</a>
							</div>
							<div class="right">
								<span class="day">2016-07-25</span>&nbsp;<span class="time">12:36</span>
							</div>
						</div>	
					</li>
					<li>
						<div class="tingli_icon">
							<a href="javascript:;"><img src="../i/tingli_icon (1).png" /></a>
						</div>
						<div class="desc">
							<div class="left">
								<h3>TPO 听力 Passage1</h3>
								<a href="javascript:;" class="tifen_plan">
									<b style="background: url(../i/paper_icon.png) no-repeat center;"></b>
									&nbsp;基础提分计划</a>
							</div>
							<div class="middle">
								<a href="javascript:;" class="check_out">查看结果</a>
								<a href="javascript:;" class="delete_record">删除记录</a>
							</div>
							<div class="right">
								<span class="day">2016-07-25</span>&nbsp;<span class="time">12:36</span>
							</div>
						</div>	
					</li>
					<li>
						<div class="tingli_icon">
							<a href="javascript:;"><img src="../i/tingli_icon (1).png" /></a>
						</div>
						<div class="desc">
							<div class="left">
								<h3>TPO 听力 Passage1</h3>
								<a href="javascript:;" class="tifen_plan">
									<b style="background: url(../i/paper_icon.png) no-repeat center;"></b>
									&nbsp;基础提分计划</a>
							</div>
							<div class="middle">
								<a href="javascript:;" class="check_out">查看结果</a>
								<a href="javascript:;" class="delete_record">删除记录</a>
							</div>
							<div class="right">
								<span class="day">2016-07-25</span>&nbsp;<span class="time">12:36</span>
							</div>
						</div>	
					</li>
					<li class="lastChild">
						<div class="tingli_icon">
							<a href="javascript:;"><img src="../i/tingli_icon (1).png" /></a>
						</div>
						<div class="desc">
							<div class="left">
								<h3>TPO 听力 Passage1</h3>
								<a href="javascript:;" class="tifen_plan">
									<b style="background: url(../i/paper_icon.png) no-repeat center;"></b>
									&nbsp;基础提分计划</a>
							</div>
							<div class="middle">
								<a href="javascript:;" class="check_out">查看结果</a>
								<a href="javascript:;" class="delete_record">删除记录</a>
							</div>
							<div class="right">
								<span class="day">2016-07-25</span>&nbsp;<span class="time">12:36</span>
							</div>
						</div>	
					</li>
				</ul>	
                <div style="margin-top:20px;width:810px;text-align:center;">
                    <div class="page">
                        <span class="first">首页</span><span class="prev">上一页</span>
                        <ul class="page_list">
                            <li class="omit_left">...</li>
                            <li><a href="javascript:;">1</a></li>
                            <li><a href="javascript:;">2</a></li>
                            <li><a href="javascript:;">3</a></li>
                            <li><a href="javascript:;">4</a></li>
                            <li><a href="javascript:;">5</a></li>
                            <li class="omit_left">...</li>
                        </ul>
                        <span class="next">下一页</span><span class="last">末页</span>
                        <span class="page_count">共<span class="total_count">10</span>页</span>
                        <label class="cur_page">当前<input class="goTO" type="text" value="1"/>页</label>
                        <a class="ok" href="javascript:;">确定</a>
                    </div>
                   </div>
            </div>
            
            <!--下载历史-->
            <div class="rightSide down_his_div fl" style="display:none;">
                <p class="location"><a class="user_href" href="javascript:;">个人中心</a>><a class="down_href"
                                                                                         href="javascript:;">下载历史</a>
                </p>

                <div class="list">
                    <p class="h">
                        <span class="name fl">名称</span>
                        <span class="num fl">共计<span class="count">368</span>份资料</span>
                        <span class="down_date fr">下载时间</span>
                    </p>
                    <ul style="margin-top:-1px">
                        <li class="list_li"><i class="word"></i><a class="article" href="javascript:;">TPO真题TPO真题TPO真题托福经典加试题托福福经典加试题托福经典</a><span
                                class="up_date">2016-6-20</span></li>
                        <li class="list_li"><i class="word"></i><a class="article" href="javascript:;">TPO真题TPO真题TPO真题托福经典加试题托福福经典加试题托福经典</a><span
                                class="up_date">2016-6-18</span></li>
                        <li class="list_li"><i class="pdf"></i><a class="article" href="javascript:;">TPO真题TPO真题TPO真题托福经典加试题托福福经典加试题托福经典</a><span
                                class="up_date">2016-6-16</span></li>
                        <li class="list_li"><i class="pdf"></i><a class="article" href="javascript:;">TPO真题TPO真题TPO真题托福经典加试题托福福经典加试题托福经典</a><span
                                class="up_date">2016-6-03</span></li>
                        <li class="list_li"><i class="word"></i><a class="article" href="javascript:;">TPO真题TPO真题TPO真题托福经典加试题托福福经典加试题托福经典</a><span
                                class="up_date">2016-6-01</span></li>
                        <li class="list_li"><i class="ppt"></i><a class="article" href="javascript:;">TPO真题TPO真题TPO真题托福经典加试题托福福经典加试题托福经典</a><span
                                class="up_date">2016-5-16</span></li>
                        <li class="list_li"><i class="word"></i><a class="article" href="javascript:;">TPO真题TPO真题TPO真题托福经典加试题托福福经典加试题托福经典</a><span
                                class="up_date">2016-5-02</span></li>
                        <li class="list_li"><i class="ppt"></i><a class="article" href="javascript:;">TPO真题TPO真题TPO真题托福经典加试题托福福经典加试题托福经典</a><span
                                class="up_date">2016-4-20</span></li>
                        <li class="list_li"><i class="pdf"></i><a class="article" href="javascript:;">TPO真题TPO真题TPO真题托福经典加试题托福福经典加试题托福经典</a><span
                                class="up_date">2016-4-10</span></li>
                        <li class="list_li"><i class="ppt"></i><a class="article" href="javascript:;">TPO真题TPO真题TPO真题托福经典加试题托福福经典加试题托福经典</a><span
                                class="up_date">2016-3-20</span></li>

                    </ul>
                </div>
                <div style="margin-top:20px;width:810px;text-align:center;">
                    <div class="page">
                        <span class="first">首页</span><span class="prev">上一页</span>
                        <ul class="page_list">
                            <li class="omit_left">...</li>
                            <li><a href="javascript:;">1</a></li>
                            <li><a href="javascript:;">2</a></li>
                            <li><a href="javascript:;">3</a></li>
                            <li><a href="javascript:;">4</a></li>
                            <li><a href="javascript:;">5</a></li>
                            <li class="omit_left">...</li>
                        </ul>
                        <span class="next">下一页</span><span class="last">末页</span>
                        <span class="page_count">共<span class="total_count">10</span>页</span>
                        <label class="cur_page">当前<input class="goTO" type="text" value="1"/>页</label>
                        <a class="ok" href="javascript:;">确定</a>
                    </div></div>
            </div>
            
            <!--账户设置-->
            <div class="rightSide setting_div fl" style="display:none;">
                <p class="location"><a class="user_href" href="javascript:;">个人中心</a>><a class="setting_href"                                                                                         href="javascript:;">账户设置</a>
                </p>
                <div class="tab">
                    <ul class="tab_list">
                        <li class="cur_tab">基本资料</li>
                        <li>头像设置</li>
                        <li>账号密码</li>
                    </ul>
                </div>
                <div class="xx">
                    <!--基本资料-->
                    <div class="set xxx1" >
                        <div class=" fl" style="position:absolute;top: 62px; left: 55px;font-size:22px;">昵称</div>
                        <div class=" fl" style="position:absolute;top: 62px; left: 127px;font-size:22px;">宇宙超人
                            <div class=" fl tu" id="nnn"
                                 style="position:absolute;top: 5px; right: -80px; color: #cccccc;font-size:18px;text-decoration: underline;cursor:pointer;">
                                <img src="../i/user/pen.png"  style="position:absolute;left: -30px; top: 0px; width: 25px; height: 20px;"/>
                                修改
                            </div>
                        </div>
                        <div id="nnx" style="display: none">
                            <input class="input" id="nickname" value=""
                            style="width: 177px; top: 57px; left: 125px; font-size: 16px;" maxlength="10"/>

                            <div class="btnx"
                                 style="top: 52px; left: 325px; height: 40px; line-height: 40px;"
                                 onclick="updateProfile();">确认
                            </div>
                            <div class="btnx" id="bcancle"
                                 style="top: 52px; left: 445px; height: 40px; line-height: 40px;">取消
                            </div>
                        </div>

                        <div class="btnx" style="top: 407px; left: 135px; display: none">确认</div>
                        <div class="btnx" style="top: 407px; left: 255px; display: none">取消</div>
                    </div>
                    <!--头像设置-->
                    <div class="set" style="display:none;">
                        <div class="up">
                            <div class="up_ava fl"><i></i>上传头像</div>
                            <div class="up_area fl">
                                <h3>上传新头像</h3>
                                <p class="support">支持jpg、png、jpeg、bmp，图片大小5M以内</p>
                                <a class="btn ava_btn" href="javascript:;">更换头像</a>
                            </div>
                        </div>
                        <div class="show">
                            <div class="ava_big fl">
                                <!--<img src="../i/user/ava_l.png" alt="我的头像"/>-->
                                <img src="../i/user/ava_l.png" id="target" alt="[Jcrop Example]" />

                                <div id="preview-pane">
                                    <div class="preview-container">
                                        <img src="../i/user/ava_l.png" class="jcrop-preview" alt="Preview" />
                                    </div>
                                    <div class="preview-container1">
                                        <img src="../i/user/ava_l.png" class="jcrop-preview1" alt="Preview" />
                                    </div>
                                </div>
                            </div>
                            <div class="up_area fl">
                                <h3>预览效果</h3>
                                <!--<p class="pic">-->
                                    <!--<img src="../i/user/ava_m.png" alt="" class="fl ava_m"/>-->
                                    <!--<img src="../i/user/ava_s.png" alt="" class="fl ava_s"/>-->
                                <!--</p>-->
                                <div class="btns">
                                    <a href="javascript:;" id="save" class="btn fl save">保存</a>
                                    <a href="javascript:;" id="cancel" class="btn fl cancel">取消</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!--账号密码-->
                    <div class="set xxx2" style="display: none">
                        <div class=" gd t22 tl" style="top: 62px; left: 55px">手机号</div>
                        <div class=" gd t22 tl" style="top: 62px; left: 175px">15389898096</div>
                        <div class=" gd t22 tl" style="top: 122px; left: 55px">账号密码</div>
                        <div class=" gd t18 tl" id="mn1"
                             style="text-decoration: underline;top: 124px; left: 175px; color: #39c075;cursor:pointer;">
                            修改密码
                        </div>
                        <div class="x1" style="display: none">
                            <input class="input" id="codeNum"
                                   style="width: 96px; top: 117px; left: 175px; font-size: 16px;" placeholder="输入验证码"/>
                            <div class=" gd t18 tl" id="yzm"  style="top: 124px; left: 291px; color: #39c075;cursor:pointer;text-decoration: underline;">
                                发送验证码
                            </div>
                            <div class=" gd t18 tl" id="yzmm" style="top: 124px; left: 291px; color: #39c075; display: none"></div>
                            <input class="input" id="pass"  style="width: 198px; top: 167px; left: 175px; font-size: 16px;" type="password"  placeholder="输入新密码"/> <input class="input" id="nextPass" style="width: 198px; top: 217px; left: 175px; font-size: 16px;" type="password"  placeholder="再次输入"/>
                            <div class=" gd t18 tc" id="error" style="width: 200px; top: 264px; left: 175px; color: #F00;"></div>
                            <div class="btnx" style="top: 307px; left: 175px;" onclick="tijiao()">确认</div>
                            <div class="btnx" id="pcancle" style="top: 307px; left: 295px;">取消</div>
                        </div>
                    </div>
                </div>


            </div>
           
        </div>
    </div>
</div>
<%@include file="./include/footer.jsp"%>
<script type="text/javascript" src="${cdnPath}/js/lib/jquery/1.11.1.js"></script>
<script type="text/javascript" src="${cdnPath}/js/lib/Jcrop/jquery.Jcrop.min.js"></script>
<script charset="utf-8" type="text/javascript" src="${cdnPath}/js/userProfile/userProfile.js"></script>
<script type="text/javascript">
function turnPage(page){
	var value = $("#searchName").val();
	var cateId=$("#cateId").val();
	var label=$("#label").val();
	var sort=$("#sort").val();
	var islike=value==""?false:true;
	window.location.href="/universe-web/user/center?&page="+page+"#tab4";
}
</script>
</body>
</html>