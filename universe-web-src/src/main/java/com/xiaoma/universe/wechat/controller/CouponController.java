package com.xiaoma.universe.wechat.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSONObject;
import com.xiaoma.rest.authentication.UniverseSession;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.api.JsonUtil;
import com.xiaoma.universe.common.utils.PropertiesUtils;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.common.utils.StringUtils;
import com.xiaoma.universe.userlogin.controller.UserVO;
import com.xiaoma.universe.wechat.model.dto.TWechatUsers;
import com.xiaoma.universe.wechat.service.LoginService;


/**
 * 用户登录
 * 
 * @ClassName: LoginController
 * @Description: TODO
 * @author langjun
 * @date 2016年6月28日 下午5:59:56
 *
 */
@Controller
@RequestMapping("/coupon")
public class CouponController {
	private static final Logger logger = LoggerFactory.getLogger(CouponController.class);
	@Autowired
	private LoginService loginService;
	
	/**
	 * 用户登录首页
	 * 
	 * @Title: loginInit
	 * @Description: TODO
	 * @param @param request
	 * @param @param response
	 * @param @return 设定文件
	 * @return String 返回类型
	 * @throws
	 */
	@RequestMapping("/index")
	public String loginInit(HttpServletRequest request, HttpServletResponse response,Model model,String errorMsg) {
		UserVO userInfo = (UserVO) UniverseSession.getAttribute("userInfo"); 
		Integer userId = null;
		if(userInfo!=null&&userInfo.getId()>0)
		{
			userId = userInfo.getId();
		}
		String wechatcode = request.getParameter("code");
		if(userInfo==null||userInfo.getId()<0)
		{
			//进入绑定页
			model.addAttribute("wechatcode", wechatcode);
			return "wechat/mycoupons";
		}
		else
		{
			return "redirect:/coupons?userId="+userId;
		}
	}
	/**
	 * 用户登录首页
	 * 
	 * @Title: loginInit
	 * @Description: TODO
	 * @param @param request
	 * @param @param response
	 * @param @return 设定文件
	 * @return String 返回类型
	 * @throws
	 */
	@RequestMapping("/login")
	public String login(HttpServletRequest request, HttpServletResponse response,Model model, String checkCode, String phone, String backUrl,String wechatcode) {
		String errorMsg = "";
		if(phone==null||phone.equals(""))
		{
			return "redirect:/wechat/authority/2";
		}
		JSONObject json = new JSONObject();
		try {
			
			//从cookie中获取分享id
			String referrerUserid = (String) UniverseSession.getAttribute("userIdInCookie")==null?"":(String) UniverseSession.getAttribute("userIdInCookie");
//			Cookie[] cookies = request.getCookies();//这样便可以获取一个cookie数组
//			for(Cookie cookie : cookies){
//			    String cookeiName = cookie.getName();// get the cookie name
//			    if("userIdInCookie".equals(cookeiName))
//			    {
//			    	referrerUserid = cookie.getValue(); // get the cookie value
//			    	break;
//			    }
//			}
			
			
			Map<String, String> params = new HashMap<String, String>();
			params.put("phone", phone);
			params.put("code", checkCode);
	        //获得微信的openIdhe UnionId
			String openId = "";
			String unionId = "";
			String headImgUrl = "";
			String nickname = "";
			String sex = "";
			//根据code获得openId
			openId = loginService.getOpenId(wechatcode,request);
			//根据openId获得unionId
			TWechatUsers tWechatUsers = new TWechatUsers();
			tWechatUsers = loginService.getWeChatUserByOpenId(openId,request);
			unionId = tWechatUsers.getUnionId();
			headImgUrl = tWechatUsers.getHeadImgUrl();
			nickname = tWechatUsers.getNickName();
			sex = tWechatUsers.getSex();
			params.put("unionid", unionId);
			params.put("headimgurl", headImgUrl);
			params.put("nickname", nickname);
			params.put("sex", sex);
			params.put("system_type", "web");
			params.put("openid", openId);
			params.put("referrerUserid", referrerUserid);
			
			Map<String, String> headers = new HashMap<String, String>();
	        
	        String url =  PropertiesUtils.getString("kaoshen_fastlogin_url");

	        ResponseData data = ApiClient.postJson(url, params, headers);
	        if(data == null){
	        	logger.error("WeChat快速登录，返回的数据是null");
	        }
	        
	        if(data.getCode() == 200){
	        	String result = data.getBackData();
	        	if(StringUtils.isEmpty(result)){
	        		logger.error("WeChat快速登录，返回的数据是空值 ");
	        	}
	        	JSONObject resultJson = JSONObject.parseObject(result);
	        	UserVO user = (UserVO) JsonUtil.jsonToBean(resultJson.getString("result"), UserVO.class); 
	        	if(user == null || user.getId() <= 0){
	        		logger.error("WeChat快速登录，返回的数据转换UserVO后，user的值有错误，返回的值 = " + result);
	        	}
				tWechatUsers = loginService.getWeChatUser(openId,user,request);
	        	UniverseSession.setAttribute("userInfo", user);
	        }
	        if(data.getCode() == 400){
	        	errorMsg = "1";//登录失败
	        }
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			json.put("success", false);
			json.put("message", "系统错误请稍后重试");
		}
			return "redirect:/coupon/index";
	}
}
