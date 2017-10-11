package com.xiaoma.universe.common.interceptor;

import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.xiaoma.rest.authentication.UniverseSession;
import com.xiaoma.universe.message.service.MessageService;
import com.xiaoma.universe.userlogin.controller.UserVO;

public class UserInfoInterceptor implements HandlerInterceptor{  
	
	@Autowired
	MessageService messageService;

	@Override  
	public void afterCompletion(HttpServletRequest request,  
			HttpServletResponse response, Object obj, Exception err)  
					throws Exception {  
	}  

	@Override  
	public void postHandle(HttpServletRequest request, HttpServletResponse response,  
			Object obj, ModelAndView mav) throws Exception {  
	}  

	@Override  
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response,  
			Object obj) throws Exception {   
		UserVO userInfo = (UserVO) UniverseSession.getAttribute("userInfo"); 
		request.getSession().setAttribute("messageCount", 0);
		if(userInfo!=null){
//			int messageCount = messageService.getUnReadMessagesCount(userInfo.getId());
//			request.getSession().setAttribute("messageCount", messageCount);
			request.getSession().setAttribute("userInfo", userInfo);
		} 
		/**
		 * 20170119  新增
		 * 根据地址截取来源用户的userId放入cookie
		 */
		Map<String,String[]> url = request.getParameterMap();
		String[] strArray = url.get("campaignContent");
		if(strArray!=null&&strArray.length>0)
		{
			StringBuffer sb = new StringBuffer();
			//带有参数
			for(String userIdInCookie:strArray)
			{
				sb.append(userIdInCookie.replaceAll("uid", ""));
				sb.append(",");
			}
			//将推荐人id放入cookie
//			Cookie cookie = new Cookie("userIdInCookie",sb.toString().substring(0,sb.toString().length()-1));
//			response.addCookie(cookie);
	        UniverseSession.setAttribute("userIdInCookie",sb.toString().substring(0,sb.toString().length()-1));
		}
		return true;  
	}  

}  