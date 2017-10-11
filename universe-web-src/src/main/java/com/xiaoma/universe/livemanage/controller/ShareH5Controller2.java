package com.xiaoma.universe.livemanage.controller;

import java.net.URLDecoder;
import java.security.MessageDigest;
import java.util.Formatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.utils.GenerateQrCodeUtil;
import com.xiaoma.universe.common.utils.HttpClientUtil;
import com.xiaoma.universe.common.utils.PropertiesUtils;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.common.utils.StringUtils;
import com.xiaoma.universe.information.controller.BaseController;
import com.xiaoma.universe.learnplan.domain.vo.api.PlanDetailVO;
import com.xiaoma.universe.learnplan.service.PlanService;
import com.xiaoma.universe.livemanage.model.BroadcastVO;
import com.xiaoma.universe.livemanage.model.LiveLessionDetailVO;
import com.xiaoma.universe.livemanage.model.LivelessionVO;
import com.xiaoma.universe.livemanage.model.WxShareObj;
import com.xiaoma.universe.livemanage.service.LivelessionService;
import com.xiaoma.universe.userlogin.controller.UserVO;

@Controller
@RequestMapping("/h5/")
public class ShareH5Controller2 extends BaseController{/*

	private static Logger logger = Logger.getLogger(ShareH5Controller.class);

	@Autowired
	private LivelessionService livelessionService;

	@Autowired
	private PlanService planService;

	// * access_token，上一次获取的token值在2个小时内有效，会更改
	private static String ACCESS_TOKEN = "";

	// * jsapi_ticket 上一次获取的jsapi_ticket值在2个小时内有效，会更改
	private static String JSAPI_TICKET = "";

	// * expires_in 凭证有效时间(2个小时)
	private static final long EXPIRES_IN = 7200000;

	// * 上一次调用的token_TOKEN_URL的时间
	private static long TOKEN_LAST_REQUEST_TIME = 0;

	// 上一次调用的JSAPI_LAST_REQUEST_TIME的时间
	private static long JSAPI_LAST_REQUEST_TIME = 0;

	private static String APPID = "";
	private static String APP_SECRET = "";
	private static String TOKEN_URL = "";
	private static String JSAPI_TICKET_URL = "";

	static {
		APPID = PropertiesUtils.getString("WX_SHARE_APPID");
		APP_SECRET = PropertiesUtils.getString("WX_SHARE_APP_SECRET");
		TOKEN_URL = PropertiesUtils.getString("WX_SHARE_TOKEN_URL");
		JSAPI_TICKET_URL = PropertiesUtils.getString("WX_SHARE_JSAPI_TICKET_URL");
	}


	*//**
	 * 分享页面
	 * 内容包括昨天的回放课，今天的课程，明天的课程
	 * @param request
	 * @param model
	 * @return
	 *//*
	@RequestMapping("/livelessions.html")
	public String shareLivelessionAndVideos(HttpServletRequest request, Model model){

		try {
			Map<String, List<LivelessionVO>> results = livelessionService.getShareCourses();
			model.addAttribute("courseMap", results);
			return "h5/h5_livelession_list";
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
			return "500";
		}
	}

	*//**
	 * @param request
	 * @param model
	 * @param id   视频的id
	 * @param token   用户的 token
	 * @param productTypeId		产品的类型id
	 * @param status     直播还是回放（１回放，２直播）
	 * @return
	 *//*
	@RequestMapping("/livelession/{id}.html")
	public String shareLivelession(HttpServletRequest request, Model model, @PathVariable("id") Integer id, String token, Integer status){
		try {

			//判断用户是否登录, 如果没有跳转到登录界面
			UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
			if(user == null || user.getId() <= 0){
				model.addAttribute("successURL", getSuccessURL(request));
				return "h5/h5_login";
			}

			//获取相关的视频参数
			int productTypeId = 0;
			ResponseData responseData = null;
			if(status == 1){
				responseData = livelessionService.getBroadcastDetail(id, null, request);
			}else{
				responseData = livelessionService.getLivelessionDeatilById(id, request);
			}
			
			if(responseData == null){
				model.addAttribute("canSee", false);
				model.addAttribute("errorMsg", "系统异常，请联系管理员！");
				logger.error("h5播放详情页面出错,无法获取返回值！");
				return "h5/h5_lession_detail";
			}
			
			if(responseData.getCode() == 403){
				model.addAttribute("canSee", false);
				model.addAttribute("errorMsg", "用户没有权限观看，请联系客服购买！");
				return "h5/h5_lession_detail";
			}

			if(responseData.getCode() != 200){
				model.addAttribute("canSee", false);
				model.addAttribute("errorMsg", "系统异常，请联系管理员！");
				logger.error("h5播放详情页面出错，code = " + responseData.getCode() + "，message = " + responseData.getBackData());
				return "h5/h5_lession_detail";
			}
			
			JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
			if(status == 1){			//回放
				BroadcastVO detail = JSON.toJavaObject(resultJson, BroadcastVO.class);
				if(detail != null && detail.getId() != null && detail.getId() > 0){
					model.addAttribute("sign", detail.getBroadcastId());
					model.addAttribute("password", detail.getPassword());
					model.addAttribute("host", detail.getHost());
					model.addAttribute("status", 1);
					model.addAttribute("teacherName", detail.getTeacherName());
					model.addAttribute("startTime", detail.getStartTime());
					model.addAttribute("endTime", detail.getEndTime());
					model.addAttribute("courseName", detail.getName());
					productTypeId = detail.getProductTypeId();
				}

			}else if(status == 2){	//直播
				LiveLessionDetailVO detail = JSON.toJavaObject(resultJson, LiveLessionDetailVO.class);
				if(detail != null && detail.getId() != null && detail.getId() > 0){
					if(detail.getEndTime().getTime() < System.currentTimeMillis()){
						model.addAttribute("canSee", false);
						model.addAttribute("errorMsg", "直播已经结束。");
						return "h5/h5_lession_detail";
					}

					String playUrl = detail.getPlayUrl();
					if(!StringUtils.isEmpty(playUrl)){
						model.addAttribute("sign", playUrl.substring((playUrl.indexOf("-") + 1), playUrl.indexOf("?")));
					}
					model.addAttribute("password", detail.getRoomPwd());
					model.addAttribute("host", detail.getHost());
					model.addAttribute("status", detail.getStatus());
					model.addAttribute("teacherName", detail.getTeacherName());
					model.addAttribute("startTime", detail.getStartTime());
					model.addAttribute("endTime", detail.getEndTime());
					model.addAttribute("courseName", detail.getName());
					productTypeId = detail.getProductTypeId();
				}
			}else{
				model.addAttribute("canSee", false);
				model.addAttribute("errorMsg", "参数错误，请联系管理员。");
				return "h5/h5_lession_detail";
			}

			//相关的视频
			if( productTypeId <= 0){
				productTypeId = 43;
			}
			List<BroadcastVO> lists =  livelessionService.getRelatedBroadcast(productTypeId, 3);
			if(lists != null && lists.size() > 0){
				model.addAttribute("courseDetails", lists);
			}

			return "h5/h5_lession_detail";
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
			model.addAttribute("canSee", false);
			model.addAttribute("errorMsg", "系统异常，请联系管理员。");
			return "h5/h5_lession_detail";
		}
	}
	
	 *//**
	   * 生成二维码图片并直接以流的形式输出到页面
	   * @param code_url
	   * @param response
	   *//*
	  @RequestMapping("/qrcode.html")
	  @ResponseBody
	  public void getQRCode(String code_url,HttpServletResponse response,HttpServletRequest request){
	    try {
			String result = GenerateQrCodeUtil.encodeQrcode(code_url, response);
			if(result!= null && result.equals("error")){
				//如果失败，则再生成一次
				result = GenerateQrCodeUtil.encodeQrcode(code_url, response);
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage(), e);
		}
	 }


	@RequestMapping("/plan/share/{id}.html")
	public String sharePlanInfo(HttpServletRequest request, Model model, @PathVariable("id") Integer id, String token, Integer status){
		try { 
			//判断用户是否登录, 如果没有跳转到登录界面
//			UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
//			if(user == null || user.getId() <= 0){
//				model.addAttribute("successURL", getSuccessURL(request));
//				return "h5/h5_login";
//			}

			PlanDetailVO planDetail = planService.getPlanDetail(request, ""+id);
			model.addAttribute("plan", planDetail);
			return "h5/h5_plan_share";
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
			return "500";
		}
	}

	*//**
	 * 显示登录界面
	 * @param request
	 * @param response
	 * @return
	 *//*
	@RequestMapping("/show/login.html")
	public String showLogin(HttpServletRequest request, HttpServletResponse response){
		return "h5/h5_login";
	}

	*//**
	 * 登录h5
	 * @param request
	 * @param response
	 * @param model
	 * @param loginName			用户名
	 * @param password				密码
	 * @param successURL			成功的回掉地址
	 * @return
	 *//*
	@RequestMapping(value="/login.html", method=RequestMethod.POST)
	public String login(HttpServletRequest request, HttpServletResponse response, Model model,String loginName, String password, String successURL){

		//检验参数
		if (StringUtils.isEmpty(loginName)) {
			model.addAttribute("successURL", successURL);
			model.addAttribute("error", "登录名不能为空");
			return "/h5/h5_login";
		}
		if (StringUtils.isEmpty(password)) {
			model.addAttribute("successURL", successURL);
			model.addAttribute("error", "密码不能为空");
			return "/h5/h5_login";
		}

		if(StringUtils.isEmpty(successURL)){
			successURL = "/h5/show/login.html";
		}

		String loginUrl = PropertiesUtils.getString("auth_api_login_url");
		Map<String, String> paramMap = new HashMap<String, String>();
		paramMap.put("username", loginName);
		paramMap.put("password", password);
		paramMap.put("token", Integer.toString(1));
		try {
			Map<String, String> heaer = new HashMap<String, String>();
			ApiClient.initToken(heaer);
			ResponseData resData = HttpClientUtil.post(loginUrl, paramMap, heaer);
			
			if(resData.getCode() == 401){
				model.addAttribute("successURL", successURL);
				model.addAttribute("error", "用户名或密码错误！");
				return "/h5/h5_login";
			}
			if(resData.getCode() != 200 || StringUtils.isEmpty(resData.getBackData())){
				model.addAttribute("successURL", successURL);
				model.addAttribute("error", "登录异常，请联系管理员！");
				return "/h5/h5_login";
			}

			JSONObject resultJson = JSONObject.parseObject(resData.getBackData());
			if(resultJson.getJSONObject("result") == null){
				model.addAttribute("successURL", successURL);
				model.addAttribute("error", resultJson.getString("message"));
				return "/h5/h5_login";
			}

			UserVO userInfo =JSONObject.toJavaObject(resultJson.getJSONObject("result"), UserVO.class);
			if(userInfo == null || userInfo.getId() <= 0){
				model.addAttribute("successURL", successURL);
				model.addAttribute("error", "登录出错，请联系管理员！");
				return "/h5/h5_login";
			}

			//写入session
			UniverseSession.setAttribute("userInfo", userInfo);

			return "redirect:" + successURL;

		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			model.addAttribute("successURL", successURL);
			model.addAttribute("error", "登录出错，请联系管理员！");
			return "h5/login";
		}
	}



	*//**
	 * 分享的时候动态获取签名
	 * @param request
	 * @param response
	 *//*
	@RequestMapping("/sign.html")
	public void getDynamicsSign(HttpServletRequest request, HttpServletResponse response){
		JSONObject json = new JSONObject();
		try {
			String url = request.getParameter("share_url");
			if (StringUtils.isEmpty(url)) {
				json.put("success", false);
				flushJson(json, response);
				return;
			}

			url = URLDecoder.decode(url,"UTF-8");
			String nonce_str =  UUID.randomUUID().toString();
			String timestamp = Long.toString(System.currentTimeMillis() / 1000);
			String jsapi_ticket = getJsApiTicket();
			String string1;
			String signature = "";

			// 注意这里参数名必须全部小写，且必须有序
			string1 = "jsapi_ticket=" + jsapi_ticket + "&noncestr=" + nonce_str + "&timestamp=" + timestamp + "&url="
					+ url;

			//生成签名
			MessageDigest crypt = MessageDigest.getInstance("SHA-1");
			crypt.reset();
			crypt.update(string1.getBytes("UTF-8"));
			signature = byteToHex(crypt.digest());

			logger.info("signatrue = " + signature);

			WxShareObj share = new WxShareObj();
			share.setUrl(url);
			share.setSignature(signature);
			share.setTimestamp(timestamp);
			share.setNonceStr(nonce_str);
			share.setAppId(APPID);

			json.put("success", true);
			json.put("share", share);
			flushJson(json, response);
			return;

		} catch (Exception e) {
			e.printStackTrace();
			logger.error("分页分享数据，e = " + e.getMessage());
			json.put("success", false);
			flushJson(json, response);
			return;
		}
	}

	private static String byteToHex(final byte[] hash) {
		Formatter formatter = new Formatter();
		for (byte b : hash) {
			formatter.format("%02x", b);
		}
		String result = formatter.toString();
		formatter.close();
		return result;
	}

	*//**
	 * 获取token
	 * @Methods Name getToken
	 * @return String
	 *//*
	private String getToken() {
		if (StringUtils.isEmpty(ACCESS_TOKEN) || TOKEN_LAST_REQUEST_TIME <= 0) {
			return sendGetToken();
		}
		if ((System.currentTimeMillis() - TOKEN_LAST_REQUEST_TIME) < EXPIRES_IN) {
			//logger.info("----------------------------------------获取已经缓存的access_token----------------------------------------");
			return ACCESS_TOKEN;
		}else{
			return sendGetToken();
		}
	}

	*//**
	 * 调用微信JS接口的临时票据
	 * @param access_token
	 *            接口访问凭证
	 * @return
	 *//*
	private String getJsApiTicket() {

		if (StringUtils.isEmpty(JSAPI_TICKET) || JSAPI_LAST_REQUEST_TIME <= 0) {
			return sendGetJsApi();
		}
		if ((System.currentTimeMillis() - JSAPI_LAST_REQUEST_TIME) < EXPIRES_IN) {
			//logger.info("----------------------------------------获取已经缓存的 jsapi_ticket----------------------------------------");
			return JSAPI_TICKET;
		}else{
			return sendGetJsApi();
		}
	}

	*//**
	 * 发送请求获取ticket
	 * @return String
	 *//*
	private String sendGetJsApi() {

		//logger.info("----------------------------------------从Wei xin 端获取新的jsapi_ticket 值----------------------------------------");

		String requestUrl = JSAPI_TICKET_URL.replace("ACCESS_TOKEN", getToken());
		ResponseData result = HttpClientUtil.get(requestUrl);
		JSONObject jsonJsApi = null;
		if (result.getCode() >= 200 && result.getCode() < 300 && !StringUtils.isEmpty(result.getBackData())) {
			try {
				jsonJsApi = JSONObject.parseObject(result.getBackData());
				JSAPI_TICKET = jsonJsApi.getString("ticket");

			} catch (Exception e) {
				// 获取token失败
				logger.error("获取token失败 errcode:{} =  " + jsonJsApi.getInteger("errcode") + "errmsg:{} = "
						+ jsonJsApi.getString("errmsg"));
			}

			JSAPI_LAST_REQUEST_TIME = System.currentTimeMillis();

			return JSAPI_TICKET;
		}
		return "";
	}

	*//**
	 * 发送请求获取access_token
	 * @Methods Name sendGetToken
	 * @return String
	 *//*
	private String sendGetToken() {

		//LOGGER.info("----------------------------------------从Wei xin 端获取新的access_token----------------------------------------");
		String requestUrl = TOKEN_URL.replace("APPID", APPID).replace("APP_SECRET", APP_SECRET);
		ResponseData result = HttpClientUtil.get(requestUrl);
		JSONObject jsonToken = null;
		if (result.getCode() >= 200 && result.getCode() < 300 && !StringUtils.isEmpty(result.getBackData())) {
			try {
				jsonToken = JSONObject.parseObject(result.getBackData());
				ACCESS_TOKEN = jsonToken.getString("access_token");

			} catch (Exception e) {
				// 获取token失败
				logger.error("获取token失败 errcode:{} =  " + jsonToken.getInteger("errcode") + "errmsg:{} = "
						+ jsonToken.getString("errmsg"));
			}

			TOKEN_LAST_REQUEST_TIME = System.currentTimeMillis();

			return ACCESS_TOKEN;
		}
		return "";
	}

	
	*//**
	 * 句子翻译分享
	 * @return
	 *//*
	@RequestMapping("/translate/{groupId}.html")
	public String shareTranslate(@PathVariable("groupId") int groupId){
		try {
			
		} catch (Exception e) {
			// TODO: handle exception
		}
		return null;
	}
	

*/}
