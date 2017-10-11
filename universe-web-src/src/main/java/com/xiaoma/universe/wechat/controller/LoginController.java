package com.xiaoma.universe.wechat.controller;

import java.beans.IntrospectionException;
import java.io.IOException;
import java.io.PrintWriter;
import java.lang.reflect.InvocationTargetException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.xiaoma.rest.authentication.CacheUserInfo;
import com.xiaoma.rest.authentication.UniverseSession;
import com.xiaoma.rest.authentication.UserInfo;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.api.JsonUtil;
import com.xiaoma.universe.common.utils.JxmlUtil;
import com.xiaoma.universe.common.utils.PropertiesUtils;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.common.utils.StringUtils;
import com.xiaoma.universe.common.utils.wechat.WeixinMessageDigestUtil;
import com.xiaoma.universe.userlogin.controller.UserVO;
import com.xiaoma.universe.wechat.model.dto.TWechatPush;
import com.xiaoma.universe.wechat.model.dto.TWechatSalePersons;
import com.xiaoma.universe.wechat.model.dto.TWechatShareLog;
import com.xiaoma.universe.wechat.model.dto.TWechatTowDimensionCode;
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
@RequestMapping("/wechat")
public class LoginController {
	private static final Logger logger = LoggerFactory.getLogger(LoginController.class);
	@Autowired
	private LoginService loginService;
	private static final  String key = "tf_count";
	private static final  String code_url = "redirect_uri_code";
	private static final  String coupon_url = "redirect_uri_coupon";
	private static final  String mall_url = "redirect_uri_mall";
	private static final  String redirect_uri_microcourse = "redirect_uri_microcourse";
	private static final  String redirect_url_words_challenge = "redirect_url_words_challenge";
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
	public String authority(HttpServletRequest request, HttpServletResponse response,Model model, @PathVariable("id") Integer id ,Integer shareId) {
		String backUrl = null;
		if(id==1)
		{
			backUrl = PropertiesUtils.getString(code_url);
		}
		else if(id==2)
		{
			backUrl = PropertiesUtils.getString(coupon_url);
		}
		else if(id==3)
		{
			backUrl = PropertiesUtils.getString(mall_url);
		}
		else if(id==4)
		{ 
			backUrl = PropertiesUtils.getString(redirect_uri_microcourse); 
		}
		else if(id==5)
		{ 
			backUrl = PropertiesUtils.getString(redirect_url_words_challenge)+"/"+shareId; 
		}

		String redisUrl = null;
		for(int i = 0;i<6;i++)
		{
			if(redisUrl==null||redisUrl.equals(""))
			{
				redisUrl =loginService.wechatCodeURL(request,backUrl);
				logger.debug("跳转地址:-----------");
				logger.debug(redisUrl);
			}
			else
			{
				break;
			}
		}
	    model.addAttribute("redisUrl", redisUrl);
	    
		return "wechat/authority";
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
	@RequestMapping("/index")
	public String loginInit(HttpServletRequest request, HttpServletResponse response,Model model,String errorMsg) {
		UserVO userInfo = (UserVO) UniverseSession.getAttribute("userInfo"); 
		String wechatcode = request.getParameter("code");
		if(errorMsg!=null&&!errorMsg.equals(""))
		{
			if(errorMsg.equals("0"))
			{
				model.addAttribute("errorMsg","手机号已被绑定");
			}
			else if(errorMsg.equals("1"))
			{
				model.addAttribute("errorMsg","手机验证失败");
			}
			return "redirect:/wechat/authority/1";
		}
		else
		{
			if(userInfo==null)
			{
				//进入绑定页
				model.addAttribute("wechatcode", wechatcode);
			}
			else
			{
				String openid =userInfo.getWeixin_openid();
				String unionid = userInfo.getWeixin_unionid();
				Integer userId = userInfo.getId();
				if(openid==null||openid.equals("")/*||unionid==null||unionid.equals("")*/)
				{
					//进入绑定页
					model.addAttribute("wechatcode", wechatcode);
				}
				else
				{
					//进入二维码页
					Integer count  = 0;
					TWechatTowDimensionCode tWechatTowDimensionCode = loginService.getTicketTwoCode(userId,openid,unionid,request);
					String myUrl  = "";
					String openId  = "";
					if(tWechatTowDimensionCode!=null&&tWechatTowDimensionCode.getId()!=null&&tWechatTowDimensionCode.getId()>0)
					{
						myUrl = tWechatTowDimensionCode.getMyUrl();
						openId = tWechatTowDimensionCode.getWechatOpenId();
						TWechatUsers tWechatUsers = loginService.getWeChatUser(openId,userInfo,request);
						count = tWechatUsers.getKillCount();
					}
					//查询通过我关注的人
					List<TWechatShareLog> listTWechatShareLog = new ArrayList<TWechatShareLog>();
					listTWechatShareLog = loginService.getTWechatShareLog(userId,openid,unionid,request);

					model.addAttribute("count", count);
					model.addAttribute("myUrl", myUrl);
					model.addAttribute("openId", openId);
					model.addAttribute("shareLog", listTWechatShareLog);
				}
			}
		}
		return "wechat/code";
	}
	
	
	@RequestMapping("/wordschallenge/login/{shareId}")
	public String wordsChallenge(HttpServletRequest request, HttpServletResponse response,Model model,@PathVariable Integer shareId) {
        //获得微信的openIdhe UnionId
		String openId = "";
		String unionId = "";
		String headImgUrl = "";
		String nickname = "";
		String sex = "";
		try { 
			//根据code获得openId
			String wechatcode = request.getParameter("code");
			logger.debug("微信授权，获取code："+wechatcode);
//			String wechatcode = "011wZg5k0V54Ml133V5k0RSk5k0wZg5N";
			openId = loginService.getOpenId(wechatcode,request);
			if(openId==null||openId.equals("")) {
				model.addAttribute("message", "请求地址失效");
				return "/500_wechat";
			}
			else {
				//根据openId获得unionId 
				TWechatUsers tWechatUsers = loginService.getWeChatUserForScope(openId,request);
				if(tWechatUsers==null||tWechatUsers.getOpenId()==null||tWechatUsers.getOpenId().equals("")) {
					return "redirect:/authority/5?shareId="+shareId;
				}
				unionId = tWechatUsers.getUnionId();
				if(unionId==null){
					unionId = "test"+ (new Date().getTime());
					tWechatUsers.setUnionId(unionId);
				}
				headImgUrl = tWechatUsers.getHeadImgUrl();
				nickname = tWechatUsers.getNickName();
				sex = tWechatUsers.getSex(); 
				HttpSession session = request.getSession();
				session.setAttribute("words_chanellage_unionId",unionId);
				session.setAttribute("words_chanellage_headImgUrl",headImgUrl);
				session.setAttribute("words_chanellage_nickname",nickname);
				session.setAttribute("words_chanellage_sex",sex);
				//
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e); 
		} 
		return "redirect:/h5/wordschallenge/share/"+shareId+"?hasDone=1";
			
	}
	
	
	@RequestMapping("/microcourse/login")
	public String microcourseLogin(HttpServletRequest request, HttpServletResponse response,Model model) {
	 
		try { 
	        //获得微信的openIdhe UnionId
			String openId = "";
			String unionId = "";
			String headImgUrl = "";
			String nickname = "";
			String sex = "";
			//根据code获得openId
			String wechatcode = request.getParameter("code");
			 
			openId = loginService.getOpenId(wechatcode,request);
			//根据openId获得unionId 
			TWechatUsers tWechatUsers = loginService.getWeChatUserForScope(openId,request);
			unionId = tWechatUsers.getUnionId();
			if(unionId==null){
				unionId = "test"+ (new Date().getTime());
				tWechatUsers.setUnionId(unionId);
			}
			headImgUrl = tWechatUsers.getHeadImgUrl();
			nickname = tWechatUsers.getNickName();
			sex = tWechatUsers.getSex(); 
			UniverseSession.setAttribute("microcourse_weixin_unionid",unionId);
			UniverseSession.setAttribute("microcourse_weixin",tWechatUsers); 
			
			Map<String, String> headers = new HashMap<String, String>();
	        
	        String url =  PropertiesUtils.getString("kaoshen_fastlogin_url");
 
		} catch (Exception e) {
			logger.error(e.getMessage(), e); 
		} 
		 
		Integer user = (Integer) UniverseSession.getAttribute("microcourse_weixin_user");
		Integer article = (Integer) UniverseSession.getAttribute("microcourse_weixin_article");
		
		return "redirect:/h5/microcourse/article/usershare/"+user+"/"+article;
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
			return "redirect:/wechat/authority/1";
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
//			
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
			tWechatUsers = loginService.getWeChatUserForScope(openId,request);
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
				user.setWeixin_openid(openId);
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
			return "redirect:/wechat/index?errorMsg="+errorMsg;
	}
	@RequestMapping(value ="/push", method = { RequestMethod.GET, RequestMethod.POST })
	public void push(HttpServletRequest request, HttpServletResponse response,Model model,String signature,String timestamp,String nonce,String echostr) {
		
        // xml请求解析  ，判断是否是微信请求
		String[] ArrTmp = { "token888", timestamp, nonce };
		Arrays.sort(ArrTmp);
		StringBuffer sb = new StringBuffer();
		for (int i = 0; i < ArrTmp.length; i++) {
			sb.append(ArrTmp[i]);
		}
		String pwd =WeixinMessageDigestUtil.getInstance().encipher(sb.toString());
		
		if (signature.equals(pwd)) {
			logger.info("微信消息推送 验证成功~!");
			TWechatPush tWechatPush  = new TWechatPush();
			UserInfo  userInfo  = new UserInfo();
			try {
				String pushXml = JxmlUtil.byte2String(request);
				if(("").equals(pushXml)){
					 try {
						 PrintWriter out = response.getWriter();
						 out.write(echostr);
						 out.close();
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
				}
//				logger.info("--------------------------------------------------"+pushXml);
//				String pushXml = "<xml><ToUserName>71400</ToUserName><FromUserName>oeYKfwXNB_3il3Gv9CDTqgPfB3t8</FromUserName><CreateTime>1433259128</CreateTime><MsgType>event</MsgType><Event>CLICK</Event><EventKey>ss123</EventKey></xml>";
//   			String pushXml = "<xml><ToUserName><![CDATA[gh_ad160e493ed5]]></ToUserName><FromUserName><![CDATA[oeYKfwXNB_3il3Gv9CDTqgPfB3t8]]></FromUserName><CreateTime>1481192912</CreateTime><MsgType><![CDATA[text]]></MsgType><Content><![CDATA[1]]></Content><MsgId>6361675116529795142</MsgId></xml>";
				Map<String,Object> map = JxmlUtil.parse(pushXml);
				tWechatPush = (TWechatPush)JxmlUtil.convertMap(TWechatPush.class, map);
				tWechatPush.setPushXml(pushXml);
				ResponseData responseData = loginService.push(tWechatPush);
				String event = tWechatPush.getEvent();
				String msgType = tWechatPush.getMsgType();
				if(event!=null&&!event.equals(""))
				{
					if(event.equals("subscribe"))
					{
						//关注公众号
						String FromUserName = tWechatPush.getFromUserName();
						String eventKey = tWechatPush.getEventKey();
						String ticket = tWechatPush.getTicket();
						TWechatShareLog tWechatShareLog = new TWechatShareLog();
						tWechatShareLog.setCreateTime(System.currentTimeMillis());
						//根据userId(secnId),查询用户openid和unionId
						if(ticket!=null&&!ticket.equals(""))
						{
							//根据tikcet查询是是的二维码
							TWechatTowDimensionCode tWechatTowDimensionCode = new TWechatTowDimensionCode();
							tWechatTowDimensionCode = loginService.getWeChatUser(ticket, request);
							Integer secnId = null;
							if(tWechatTowDimensionCode!=null&&tWechatTowDimensionCode.getUserId()>0)
							{
								secnId = tWechatTowDimensionCode.getUserId();
							}
							userInfo  = CacheUserInfo.getUserInfo(secnId);
							String fromOpenId = userInfo.getWeixin_openid();
							String fromUnionId = userInfo.getWeixin_unionid();
							tWechatShareLog.setFromOpenId(fromOpenId);
							tWechatShareLog.setFromUnionId(fromUnionId);
							//更新关注人数
							ResponseData responseConcern = loginService.updateConcern(String.valueOf(userInfo.getId()),FromUserName);
						}
							tWechatShareLog.setToOpenId(FromUserName);
							//根据openid查询unionid
							TWechatUsers tWechatUsers = loginService.getWeChatUserByOpenId(FromUserName,request);
							if(tWechatUsers!=null)
							{
								tWechatShareLog.setToUnionId(tWechatUsers.getUnionId());
								tWechatShareLog.setHeadImgUrl(tWechatUsers.getHeadImgUrl());
								tWechatShareLog.setNickName(tWechatUsers.getNickName());
								tWechatShareLog.setSex(tWechatUsers.getSex());
								tWechatShareLog.setSubscribeTime(tWechatUsers.getSubscribeTime());
							}
							//插入日志
							ResponseData responseDataLog = loginService.addLog(tWechatShareLog);
							logger.info("增加分享日志"+responseDataLog);
						    ResponseData pushcouponData = loginService.pushcoupon(request);
						    logger.info("增加发券日志"+pushcouponData);
						    //添加关注主动推送
						    String nickName = "";
						    if(userInfo!=null&&userInfo.getId()>0)
						    {
						    	nickName = userInfo.getWeixin_nickname();
						    }
						    String wechatNickName = tWechatUsers.getNickName();
							ResponseData responsePostRes = loginService.postResq(nickName,wechatNickName,tWechatPush.getToUserName(),tWechatPush.getFromUserName());
							
					}
					if(event.equals("SCAN"))
					{
						//进入公众号
					}
					if(event.equals("CLICK"))
					{
						//自定义菜单点击
						String eventKey = tWechatPush.getEventKey();
						//根据点击事件查询对应的配置文本
						ResponseData responsePostRes = loginService.clickResp(tWechatPush.getToUserName(),tWechatPush.getFromUserName(), eventKey);
						String repContent = responsePostRes.getBackData();
						logger.info("-------点击事件回复信息为："+repContent+"-----------------");
						 try {
							 PrintWriter out = response.getWriter();
							 out.write(repContent==null||repContent.equals("\"\"")?"":repContent);
							 out.close();
							} catch (IOException e) {
								// TODO Auto-generated catch block
								e.printStackTrace();
							}
					}
				}
				//判断回复
				if(("text").equals(msgType))
				{
					logger.debug("判断回复");
					String content = tWechatPush.getContent();
					ResponseData responsePostRes = loginService.postResp(tWechatPush.getToUserName(),tWechatPush.getFromUserName(), content);
					String repContent = responsePostRes.getBackData();
					logger.info("-------回复信息为："+repContent+"-----------------");
					 try {
						 PrintWriter out = response.getWriter();
						 out.write(repContent==null||repContent.equals("\"\"")?"":repContent);
						 out.close();
						} catch (IOException e) {
							// TODO Auto-generated catch block
							e.printStackTrace();
						}
				}
			} catch (IOException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IllegalAccessException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (InstantiationException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (InvocationTargetException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			} catch (IntrospectionException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}else {
			logger.info("微信消息推送验证失败~!");
		}

	}
	/**
	 * 随机分配老师
	 * @Title: saleRandom 
	 * @Description: TODO
	 * @param @param request
	 * @param @param response
	 * @param @param model
	 * @param @return    设定文件 
	 * @return String    返回类型 
	 * @throws
	 */
	@CrossOrigin(maxAge = 3600)
	@RequestMapping("/sale/random")
	@ResponseBody
	public TWechatSalePersons saleRandom(HttpServletRequest request, HttpServletResponse response,Model model) {
		TWechatSalePersons  tWechatSalePersons= loginService.saleRandom(request);
		logger.info("随机的老师为"+tWechatSalePersons.getUserName());
		response.setHeader("Access-Control-Allow-Origin", "*");
		return tWechatSalePersons;
	}	
}
