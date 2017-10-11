package com.xiaoma.universe.common.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.xiaoma.rest.authentication.UniverseSession;
import com.xiaoma.universe.userlogin.controller.UserVO;

public class UserInterceptor implements HandlerInterceptor{  


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
		String url = request.getRequestURI();
		if((userInfo==null||"".equals(userInfo.getAccess_token()))&&url.indexOf("logout")<0&&url.indexOf("index")<0&&url.indexOf("callback")<0&&url.indexOf("login")<0)
		{
			//不符合条件的，跳转到登录界面  

			String strBackUrl = "http://" + request.getServerName() //服务器地址
			+ ":" 
			+ request.getServerPort()           //端口号
			+ request.getContextPath()      //项目名称
			+ request.getServletPath()      //请求页面或其他地址
			+ (request.getQueryString()==null?"":"?" + request.getQueryString()); //参数
			UniverseSession.setAttribute("backUrlStr", strBackUrl);
			response.sendRedirect("/login");
			return false;  
		}
		request.setAttribute("userInfo", userInfo);
		return true;  
	}  

}  