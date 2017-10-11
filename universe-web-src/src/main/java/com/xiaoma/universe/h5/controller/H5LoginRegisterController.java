package com.xiaoma.universe.h5.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.alibaba.fastjson.JSONObject;
import com.xiaoma.rest.authentication.UniverseSession;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.utils.HttpClientUtil;
import com.xiaoma.universe.common.utils.PropertiesUtils;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.common.utils.StringUtils;
import com.xiaoma.universe.information.controller.BaseController;
import com.xiaoma.universe.userlogin.controller.UserVO;

/**
 * h5登录注册
 * 
 * @author Administrator
 *
 */
@Controller
public class H5LoginRegisterController extends BaseController {

	private static Logger logger = Logger.getLogger(H5LoginRegisterController.class);

	/**
	 * 显示快速登录界面
	 * @param model
	 * @param request
	 * @param response
	 * @param backUrl
	 * @return
	 */
	@RequestMapping("/h5/show/fastlogin.html")
	public String showFastLoginView(Model model, HttpServletRequest request, HttpServletResponse response,
			String backUrl) {
		try {
			model.addAttribute("imageCodeUrl", PropertiesUtils.getString("h5_fastlogin_image_code_url"));
			model.addAttribute("backUrl", backUrl);
			return "h5/h5_fast_login";
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return "h5/h5_500";
		}
	}

	/**
	 * 显示注册页面
	 * @param model
	 * @param request
	 * @param response
	 * @param backUrl
	 * @return
	 */
	@RequestMapping("/h5/show/register.html")
	public String showRegisterView(Model model, HttpServletRequest request, HttpServletResponse response, String backUrl) {
		try {
			model.addAttribute("backUrl", backUrl);
			model.addAttribute("imageCodeUrl", PropertiesUtils.getString("h5_fastlogin_image_code_url"));
			return "h5/h5_register";
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return "h5/h5_500";
		}
	}
	
	
	/**
	 * 快速登录
	 * @param request
	 * @param response
	 * @param checkCode      验证码
	 * @param phone    手机号
	 * @param backUrl   成功后返回的地址
	 * @return
	 */
	@RequestMapping("/h5/fastlogin.html")
	public void fastLogin(HttpServletRequest request, HttpServletResponse response, String checkCode, String phone, String backUrl){
		JSONObject json = new JSONObject();
		if(StringUtils.isEmpty(phone)){
			json.put("success", false);
			json.put("message", "手机号码不能为空");
			flushJson(json, response);
			return;
		}
		if(StringUtils.isEmpty(checkCode)){
			json.put("success", false);
			json.put("message", "验证码不能为空");
			flushJson(json, response);
			return;
		}
		if(StringUtils.isEmpty(backUrl)){
			json.put("success", false);
			json.put("message", "返回地址不能为空");
			flushJson(json, response);
			return;
		}
try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("phoneNum", phone);
			params.put("code", checkCode);
			
			
			//从cookie中获取分享id
			String referrerUserid = (String) UniverseSession.getAttribute("userIdInCookie")==null?"":(String) UniverseSession.getAttribute("userIdInCookie");
			params.put("referrerUserid", referrerUserid);
			
			
			Map<String, String> headers = new HashMap<String, String>();
	        headers.put("fromType", "web");
	        
	        String url =  PropertiesUtils.getString("h5_fastlogin_url");
	        ResponseData data = ApiClient.post(url, params, headers);
	        if(data == null){
	        	throw new Exception("h5快速登录，返回的数据是null");
	        }
	        
	        if(data.getCode() == 200){
	        	String result = data.getBackData();
	        	if(StringUtils.isEmpty(result)){
	        		throw new Exception("h5快速登录，返回的数据是空值 ");
	        	}
	        	JSONObject resultJson = JSONObject.parseObject(result);
	        	UserVO user = JSONObject.parseObject(resultJson.getString("result"), UserVO.class);
	        	if(user == null || user.getId() <= 0){
	        		throw new Exception("h5快速登录，返回的数据转换UserVO后，user的值有错误，返回的值 = " + result);
	        	}
	        	
	        	//放入session
	        	UniverseSession.setAttribute("userInfo", user);
	        	json.put("success", true);
	        	json.put("newUser", user.getNew_user() == UserVO.IS_NEW_REGISTER_YES ? "yes" : "no");
	        	if(user.getNew_user() == UserVO.IS_NEW_REGISTER_YES){
	        		JSONObject object = new JSONObject();
	        		object.put("mobile", phone);
	        		object.put("template", "101875");
	        		object.put("validateCode", phone.substring(5)); 			
	    			headers = new HashMap<String, String>();
	    			headers.put("Authorization", "bearer "+user.getAccess_token());
	    			headers.put("Content-Type", "application/json");	    			
	    			data = HttpClientUtil.postJson(PropertiesUtils.getString("SMS_SEND_URL"), object.toString(), headers);	
	    			System.out.println(data.getBackData());
	        	}
	        	json.put("backUrl", backUrl);
	        	json.put("user", user);
	        	flushJson(json, response);
	        	return;
	        }
	        
	        if(data.getCode() == 400){
	        	String result = data.getBackData();
	        	JSONObject resultJson = JSONObject.parseObject(result);
	        	json.put("success", false);
	        	json.put("message", resultJson.getString("message"));
	        	flushJson(json, response);
	        	return;
	        }
	        throw new Exception("h5快速登录出现错误，返回值：code = " + data.getCode() + "backData = " + data.getBackData());
			
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			json.put("success", false);
			json.put("message", "系统错误请稍后重试");
			flushJson(json, response);
			return;
		}
	}
	
	
	
	/**
	 * 注册
	 * @param request
	 * @param response
	 * @param checkCode   验证码
	 * @param phone  手机号
	 * @param password      密码
	 * @param backUrl   成功后跳转的地址
	 * @return
	 */
	@RequestMapping(value="/h5/register.html", method=RequestMethod.POST)
	public void register(HttpServletRequest request, HttpServletResponse response, String checkCode, String phone, String password, String backUrl){
	
		JSONObject json = new JSONObject();
		if(StringUtils.isEmpty(phone)){
			json.put("success", false);
			json.put("message", "手机号码不能为空");
			flushJson(json, response);
			return;
		}
		if(StringUtils.isEmpty(checkCode)){
			json.put("success", false);
			json.put("message", "验证码不能为空");
			flushJson(json, response);
			return;
		}
		if(StringUtils.isEmpty(password)){
			json.put("success", false);
			json.put("message", "密码不能为空");
			flushJson(json, response);
			return;
		}
		
		try {
			
			Map<String, String> params = new HashMap<String, String>();
			params.put("phone", phone);
			params.put("code", checkCode);
			params.put("password", password);
			params.put("token", "1");
			
			//从cookie中获取分享id
			String referrerUserid = (String) UniverseSession.getAttribute("userIdInCookie")==null?"":(String) UniverseSession.getAttribute("userIdInCookie");
			params.put("referrerUserid", referrerUserid);
			
			Map<String, String> headers = new HashMap<String, String>();
	        headers.put("fromType", "web");
	        
	        String url =  PropertiesUtils.getString("h5_register_url");
	        ResponseData data = ApiClient.post(url, params, headers);
	        if(data == null){
	        	throw new Exception("h5注册，返回的数据是null");
	        }
	        
	        if(data.getCode() == 200){
	        	String result = data.getBackData();
	        	if(StringUtils.isEmpty(result)){
	        		throw new Exception("h5注册，返回的数据是空值 ");
	        	}
	        	JSONObject resultJson = JSONObject.parseObject(result);
	        	UserVO user = JSONObject.parseObject(resultJson.getString("result"), UserVO.class);
	        	if(user == null || user.getId() <= 0){
	        		throw new Exception("h5注册，返回的数据转换UserVO后，user的值有错误，返回的值 = " + result);
	        	}
	        	
	        	//放入session
	        	UniverseSession.setAttribute("userInfo", user);
	        	json.put("success", true);
	        	json.put("backUrl", backUrl);
	        	json.put("user", user);
	        	flushJson(json, response);
	        	return;
	        }
	        
	        if(data.getCode() == 400){
	        	String result = data.getBackData();
	        	JSONObject resultJson = JSONObject.parseObject(result);
	        	json.put("success", false);
	        	json.put("message", resultJson.getString("message"));
	        	flushJson(json, response);
	        	return;
	        }
	        throw new Exception("h5注册出现错误，返回值：code = " + data.getCode() + "backData = " + data.getBackData());
			
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			json.put("success", false);
			json.put("message", "系统错误请稍后重试");
			flushJson(json, response);
			return;
		}
	}
	
	
	/**
	 * h5获取验证码
	 * @param request
	 * @param response
	 * @param phone
	 * @param type   1表示快速登录获取验证码  2表示注册获取验证码
	 */
	@RequestMapping("/h5/checkcode.html")
	public void getCheckCode(HttpServletRequest request, HttpServletResponse response, String phone, int type,String imagecode,String tag){
		JSONObject json = new JSONObject();
		if(StringUtils.isEmpty(phone)){
			json.put("success", false);
			json.put("message", "手机号码不能为空");
			flushJson(json, response);
			return;
		}
		
		if(StringUtils.isEmpty(imagecode)){
			json.put("success", false);
			json.put("message", "图片验证码不能为空");
			flushJson(json, response);
			return;
		}
		
		if(StringUtils.isEmpty(tag)){
			json.put("success", false);
			json.put("message", "图片验证码请求不正确");
			flushJson(json, response);
			return;
		}
		
		try {
			Map<String, String> params = new HashMap<String, String>();
			params.put("phoneNum", phone);
			params.put("tag", tag);
			params.put("imagecode", imagecode);
			
			Map<String, String> headers = new HashMap<String, String>();
	        headers.put("fromType", "web");
	        
	        String url = PropertiesUtils.getString("h5_fastlogin_send_code_url");
	        ResponseData data = ApiClient.post(url, params, headers);
	        if(data == null){
	        	throw new Exception("h5获取验证码，返回的数据是null, 获取验证码的类型 type = " + type);
	        }
	        
	        //TODO  注意注释
	        //data.setCode(200);
	        
	        if(data.getCode() == 200){
	        	json.put("success", true);
	        	flushJson(json, response);
	        	return;
	        }
	        if(data.getCode() == 400){
	        	String result = data.getBackData();
	        	JSONObject resultJson = JSONObject.parseObject(result);
	        	json.put("success", false);
	        	json.put("message", resultJson.getString("message"));
	        	flushJson(json, response);
	        	return;
	        }
	        throw new Exception("获取验证码的类型 type = " + type + ",h5获取验证码出现错误，返回值：code = " + data.getCode() + "backData = " + data.getBackData());
	        
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			json.put("success", false);
			json.put("message", "系统错误请稍后重试");
			flushJson(json, response);
			return;
		}
	}
	
}
