/**
 * 
 */
package com.xiaoma.universe.userlogin.controller;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import com.xiaoma.rest.authentication.UniverseSession;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.api.JsonUtil;
import com.xiaoma.universe.common.utils.DESUtil;
import com.xiaoma.universe.common.utils.PropertiesUtils;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.information.controller.InfoController;

/**
 * @author xiaoma
 *
 */
@Controller
@RequestMapping(value = "/")
public class UserLoginController {
	private static final Logger logger = LoggerFactory.getLogger(InfoController.class);

	// 加密的密钥
	public static final String DES_KEY = PropertiesUtils.getString("crypto_des_key");

	public static String USER_LOGIN_URL = PropertiesUtils.getString("auth_api_url");
	public static String USER_INFO_URL = PropertiesUtils.getString("auth_api_userinfo_url");
	public static String USER_LOG_OUT_URL = PropertiesUtils.getString("auth_api_logout_url");
	public static String USER_REGISTER_URL = PropertiesUtils.getString("auth_register_url");

	/**
	 * 登录系统 @Title: forwardLogin @Description: TODO @param @param
	 * model @param @param backurl @param @param request @param @return
	 * 设定文件 @return ModelAndView 返回类型 @throws
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/login")
	public ModelAndView forwardLogin(Model model, String backurl, HttpServletRequest request,
			HttpServletResponse response) {
		String backUrlStr = backurl;

		if (StringUtils.isBlank(backUrlStr)) {
			backUrlStr = (String) UniverseSession.getAttribute("backUrlStr");
		}

		if (StringUtils.isBlank(backUrlStr)) {
			backUrlStr = request.getHeader("referer");
		}

		if (StringUtils.isBlank(backUrlStr)) {
			backUrlStr = request.getScheme() + "://" + request.getServerName() // 服务器地址
					+ ":" + request.getServerPort() // 端口号
					+ request.getContextPath() + "/index.html"; // 项目名称
		}

		UniverseSession.setAttribute("backUrlStr", backUrlStr);
		String strBackUrl = request.getScheme() + "://" + request.getServerName() // 服务器地址
				+ ":" + request.getServerPort() // 端口号
				+ request.getContextPath(); // 项目名称
		
		
		//从cookie中获取分享id
		String referrerUserid = (String) UniverseSession.getAttribute("userIdInCookie")==null?"":(String) UniverseSession.getAttribute("userIdInCookie");
		
//		Cookie[] cookies = request.getCookies();//这样便可以获取一个cookie数组
//		for(Cookie cookie : cookies){
//		    String cookeiName = cookie.getName();// get the cookie name
//		    if("userIdInCookie".equals(cookeiName))
//		    {
//		    	referrerUserid = cookie.getValue(); // get the cookie value
//		    	break;
//		    }
//		}
		 
		
		
		Map<String, String> param = new HashMap<String, String>();
		String sessionId = "";//UniverseSession.getSessionId();
		param.put("sessionId", sessionId);
		param.put("backurl", strBackUrl + "/callback");
		param.put("token", "1");
		param.put("referrerUserid", referrerUserid);
		// return new ModelAndView(new RedirectView(USER_LOGIN_URL),param);
		// return new ModelAndView("redirect"+USER_LOGIN_URL);
		try {
			response.sendRedirect(USER_LOGIN_URL + "?sessionId=" + param.get("sessionId") + "&backurl="
					+ URLEncoder.encode(param.get("backurl"), "utf-8") + "&token=" + param.get("token")+"&referrerUserid="+referrerUserid);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null; // 不进行重定向
	}

	/**
	 * @return @throws IOException 登录返回 @Title: callBack @Description:
	 *         TODO @param @param model @param @param ticket @param @param
	 *         request @param @param response @param @return 设定文件 @return
	 *         ModelAndView 返回类型 @throws
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/callback")
	public ModelAndView callBack(Model model, String ticket, HttpServletRequest request, HttpServletResponse response) {
		String backUrlStr = (String) UniverseSession.getAttribute("backUrlStr");
		try {
			Map<String, String> headers = new HashMap<String, String>();
			Map<String, String> params = new HashMap<String, String>();
			String desticket = DESUtil.decrypt(DES_KEY, ticket);
			params.put("ticket", desticket);
			ResponseData data = ApiClient.post(USER_INFO_URL, params, headers);
			UserVO userInfo = (UserVO) JsonUtil.jsonToBean(data.getBackData(), UserVO.class);
			// 存放session
			UniverseSession.setAttribute("userInfo", userInfo);
			if (StringUtils.isBlank(backUrlStr)) {
				backUrlStr = request.getScheme() + "://" + request.getServerName() // 服务器地址
						+ ":" + request.getServerPort() // 端口号
						+ request.getContextPath() + "/index.html"; // 项目名称
			}
			UniverseSession.removeAttribute("backUrlStr");
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getStackTrace().toString());
		}
		return new ModelAndView(new RedirectView(backUrlStr));

	}

	/**
	 * 注册 @Title: register @Description: TODO @param @param model @param @param
	 * backurl @param @param request @param @return @param @throws Exception
	 * 设定文件 @return ModelAndView 返回类型 @throws
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/register")
	public ModelAndView register(Model model, String backurl, HttpServletRequest request) throws Exception {
		String backUrlStr = "";
		if (StringUtils.isEmpty(backurl)) {
			backUrlStr = request.getHeader("referer");
		} else {
			backUrlStr = backurl;
		}
		UniverseSession.setAttribute("backUrlStr", backUrlStr);
		String strBackUrl = request.getScheme() + "://" + request.getServerName() // 服务器地址
				+ ":" + request.getServerPort() // 端口号
				+ request.getContextPath(); // 项目名称
		Map<String, String> param = new HashMap<String, String>();
		String sessionId = UniverseSession.getSessionId();
		param.put("sessionId", sessionId);
		param.put("backurl", strBackUrl + "/register/callback");
		param.put("token", "1");
		return new ModelAndView(new RedirectView(USER_REGISTER_URL), param);
	}

	/**
	 * @return 注册返回 @Title: registerCallBack @Description: TODO @param @param
	 *         model @param @param ticket @param @param request @param @param
	 *         response @param @return 设定文件 @return ModelAndView 返回类型 @throws
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/register/callback")
	public ModelAndView registerCallBack(Model model, String ticket, HttpServletRequest request,
			HttpServletResponse response) {
		String backUrlStr = (String) UniverseSession.getAttribute("backUrlStr");
		try {
			Map<String, String> headers = new HashMap<String, String>();
			Map<String, String> params = new HashMap<String, String>();
			String desticket = DESUtil.decrypt(DES_KEY, ticket);
			params.put("ticket", desticket);
			ResponseData data = ApiClient.post(USER_INFO_URL, params, headers);
			UserVO userInfo = (UserVO) JsonUtil.jsonToBean(data.getBackData(), UserVO.class);
			// 存放session
			UniverseSession.setAttribute("userInfo", userInfo);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getStackTrace().toString());
		}
		return new ModelAndView(new RedirectView(backUrlStr));
	}

	/**
	 * 退出系统
	 * 
	 * @param session
	 *            Session
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/logout")
	public String logout(HttpServletRequest request) throws Exception {
		// 清除Session
		Map<String, String> headers = new HashMap<String, String>();
		Map<String, String> param = new HashMap<String, String>();
		String sessionId = UniverseSession.getSessionId();
		param.put("sessionId", sessionId);
		ResponseData data = ApiClient.post(USER_LOG_OUT_URL, param, headers, request, "");
		UniverseSession.removeAttribute("userInfo");
		request.getSession().removeAttribute("userInfo");
		return "redirect:index.html";
	}
}
