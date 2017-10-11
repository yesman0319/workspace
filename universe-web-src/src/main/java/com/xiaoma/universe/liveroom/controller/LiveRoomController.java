package com.xiaoma.universe.liveroom.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.xiaoma.universe.common.utils.PropertiesUtils;
import com.xiaoma.universe.liveroom.aspect.CheckSilence;
import com.xiaoma.universe.liveroom.service.LiveRoomService;

@RequestMapping("/liveroom")
public class LiveRoomController {
	private static final Logger logger = LoggerFactory.getLogger(LiveRoomController.class);

	@Autowired
	private LiveRoomService liveRoomService; 
	
	public static final String TEACHER_BACK_URL = "TEACHER_BACK_URL";//教师端回调地址
	public static final String STUDENT_BACK_URL = "STUDENT_BACK_URL";//学生端回调地址
	/**
	 * 微信授权
	 * @Title: forgetpw 
	 * @Description: TODO
	 * @param @param request
	 * @param @param response
	 * @param @return    设定文件 
	 * @return String    返回类型 
	 * @throws
	 */

	@RequestMapping("/authority/{id}")
	public String authority(HttpServletRequest request, HttpServletResponse response,Model model,@PathVariable("id") int id) {
		String backUrl = null;
		if(id==1)
		{
			//教师端
			backUrl = PropertiesUtils.getString(TEACHER_BACK_URL);
		}
		else if(id==2)
		{
			//学生端
			backUrl = PropertiesUtils.getString(STUDENT_BACK_URL);
		}
		String redisUrl = null;
		for(int i = 0;i<6;i++)
		{
			if(redisUrl==null||redisUrl.equals(""))
			{
				redisUrl =liveRoomService.wechatCodeURL(request,backUrl);
			}
			else
			{
				break;
			}
		}
	    model.addAttribute("redisUrl", redisUrl);
		return "wechat/authority";
	}	
}
