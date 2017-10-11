package com.xiaoma.universe.wechat.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.xiaoma.rest.authentication.UserInfo;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.utils.MapUtil;
import com.xiaoma.universe.common.utils.PropertiesUtils;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.userlogin.controller.UserVO;
import com.xiaoma.universe.wechat.model.dto.TWechatPush;
import com.xiaoma.universe.wechat.model.dto.TWechatSalePersons;
import com.xiaoma.universe.wechat.model.dto.TWechatShareLog;
import com.xiaoma.universe.wechat.model.dto.TWechatTowDimensionCode;
import com.xiaoma.universe.wechat.model.dto.TWechatUsers;

/**
 * 用户登录服务
 * 
 * @ClassName: LoginService
 * @Description: TODO
 * @author langjun
 * @date 2016年6月29日 下午6:24:38
 *
 */
@Service
public class LoginService {
	private static final Logger logger = LoggerFactory.getLogger(LoginService.class);

	
	public static String WECHAT_URL = PropertiesUtils.getString("WECHAT_URL");
	public String wechatCodeURL(HttpServletRequest request,String backUrl)
	{
		String wechatUrl = WECHAT_URL + "/binding/authority?backUrl="+backUrl;
		Map<String,String> headers = new HashMap<String,String>();
		logger.debug("请求微信地址----");
		logger.debug(wechatUrl);
		ResponseData responseData = ApiClient.get(wechatUrl, headers,request,"");
		if (responseData.getCode() != 200) {
			return null;
		}
		JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
		logger.debug("接受微信返回---");
		logger.debug(resultJson.toString());
		String redirect_uri = resultJson.getString("redisUrl");
		return redirect_uri;
	}
	
	public TWechatTowDimensionCode getTicketTwoCode(Integer userId,String openId,String unionid,HttpServletRequest request)
	{
		String wechatUrl = WECHAT_URL + "/binding/getTicketTwo?userid="+userId.toString()+"&openid="+openId+"&unionid="+unionid;
		Map<String,String> headers = new HashMap<String,String>();
		ResponseData responseData = ApiClient.get(wechatUrl, headers,request,"");
		if (responseData.getCode() != 200) {
			return null;
		}
		TWechatTowDimensionCode tWechatTowDimensionCode = (TWechatTowDimensionCode) JSONObject.parseObject(responseData.getBackData(), TWechatTowDimensionCode.class);
		return tWechatTowDimensionCode;
	}
	
	public String  getOpenId(String wechatcode,HttpServletRequest request)
	{
		String wechatUrl = WECHAT_URL + "/binding/getWeChatOpenId?code="+wechatcode;
		Map<String,String> headers = new HashMap<String,String>();
		logger.debug("微信地址，请求获取openId："+wechatUrl);
		ResponseData responseData = ApiClient.get(wechatUrl, headers,request,"");
		logger.debug("微信地址，返回获取openId：========");
		logger.debug(responseData.toString());
		if (responseData.getCode() != 200) {
			return null;
		}
		JSONObject resultJson=(JSONObject) JSONObject.parse(responseData.getBackData());
		String OpenId = resultJson.getString("openId");
		return OpenId;
	}
	
	public TWechatUsers  getWeChatUser(String openId,UserInfo user,HttpServletRequest request)
	{
		String wechatUrl = WECHAT_URL + "/binding/getWeChatUser?userid="+String.valueOf(user.getId())+"&openId="+openId;
		Map<String,String> headers = new HashMap<String,String>();
		ResponseData responseData = ApiClient.get(wechatUrl, headers,request,"");
		if (responseData.getCode() != 200) {
			return null;
		}
		TWechatUsers tWechatUsers =(TWechatUsers) JSONObject.parseObject(responseData.getBackData(),TWechatUsers.class);
		return tWechatUsers;
	}
	
	public TWechatUsers  getWeChatUserForScope(String openId,HttpServletRequest request)
	{
		String wechatUrl = WECHAT_URL + "/binding/getWeChatUserForScope?&openId="+openId;
		Map<String,String> headers = new HashMap<String,String>();
		ResponseData responseData = ApiClient.get(wechatUrl, headers,request,"");
		if (responseData.getCode() != 200) {
			return null;
		}
		logger.debug("用openid换取用户的信息");
		logger.debug(responseData.toString());
		TWechatUsers tWechatUsers =(TWechatUsers) JSONObject.parseObject(responseData.getBackData(),TWechatUsers.class);
		return tWechatUsers;
	}
	public TWechatUsers  getWeChatUser(String openId,UserVO user,HttpServletRequest request)
	{
		String wechatUrl = WECHAT_URL + "/binding/getWeChatUser?userid="+String.valueOf(user.getId())+"&openId="+openId;
		Map<String,String> headers = new HashMap<String,String>();
		ResponseData responseData = ApiClient.get(wechatUrl, headers,request,"");
		if (responseData.getCode() != 200) {
			return null;
		}
		TWechatUsers tWechatUsers =(TWechatUsers) JSONObject.parseObject(responseData.getBackData(),TWechatUsers.class);
		return tWechatUsers;
	}
	public TWechatUsers  getWeChatUserByOpenId(String openId,HttpServletRequest request)
	{
		String wechatUrl = WECHAT_URL + "/binding/getWeChatUserByOpenId?&openId="+openId;
		Map<String,String> headers = new HashMap<String,String>();
		ResponseData responseData = ApiClient.get(wechatUrl, headers,request,"");
		if (responseData.getCode() != 200) {
			return null;
		}
		TWechatUsers tWechatUsers =(TWechatUsers) JSONObject.parseObject(responseData.getBackData(),TWechatUsers.class);
		return tWechatUsers;
	}
	
	public ResponseData  push(TWechatPush tWechatPush)
	{
		String wechatUrl = WECHAT_URL + "/binding/push";
		Map<String, String> params = (Map<String, String>) MapUtil.objectToMap(tWechatPush);
		Map<String, String> headers = new HashMap<String, String>();
		ResponseData responseData = ApiClient.post( wechatUrl, params, headers);
		return responseData;
	}
	
	public ResponseData  addLog(TWechatShareLog tWechatShareLog )
	{
		String wechatUrl = WECHAT_URL + "/tWechatShareLog";
		Map<String, String> params = (Map<String, String>) MapUtil.objectToMap(tWechatShareLog);
		Map<String, String> headers = new HashMap<String, String>();
		ResponseData responseData = ApiClient.post( wechatUrl, params, headers);
		return responseData;
	}
	
	public ResponseData  postResq(String nickName,String wechatNickName,String formOpenId,String toOpenId)
	{
		String wechatUrl = WECHAT_URL + "/binding/postResq";
		Map<String, String> params =  new HashMap<String, String>();
		params.put("nickName", nickName);
		params.put("wechatNickName", wechatNickName);
		params.put("formOpenId", formOpenId);
		params.put("toOpenId", toOpenId);
		Map<String, String> headers = new HashMap<String, String>();
		ResponseData responseData = ApiClient.post( wechatUrl, params, headers);
		return responseData;
	}
	
	public ResponseData  postResp(String formOpenId,String toOpenId,String content)
	{
		String wechatUrl = WECHAT_URL + "/binding/postResp";
		Map<String, String> params =  new HashMap<String, String>();
		params.put("formOpenId", formOpenId);
		params.put("toOpenId", toOpenId);
		params.put("content", content);
		Map<String, String> headers = new HashMap<String, String>();
		ResponseData responseData = ApiClient.post( wechatUrl, params, headers);
		return responseData;
	}
	
	public ResponseData  clickResp(String formOpenId,String toOpenId,String eventKey)
	{
		String wechatUrl = WECHAT_URL + "/binding/clickResp";
		Map<String, String> params =  new HashMap<String, String>();
		params.put("formOpenId", formOpenId);
		params.put("toOpenId", toOpenId);
		params.put("eventKey", eventKey);
		Map<String, String> headers = new HashMap<String, String>();
		ResponseData responseData = ApiClient.post( wechatUrl, params, headers);
		return responseData;
	}
	
	public ResponseData  addConcernLog(TWechatShareLog tWechatShareLog )
	{
		String wechatUrl = WECHAT_URL + "/tWechatShareLog";
		Map<String, String> params = (Map<String, String>) MapUtil.objectToMap(tWechatShareLog);
		Map<String, String> headers = new HashMap<String, String>();
		ResponseData responseData = ApiClient.post( wechatUrl, params, headers);
		return responseData;
	}
	public ResponseData  updateConcern(String  userId,String openId)
	{
		String wechatUrl = WECHAT_URL + "/tWechatUsers";
		Map<String, String> params = new HashMap<String, String>();
		params.put("userId", userId);
		params.put("openId", openId);
		Map<String, String> headers = new HashMap<String, String>();
		ResponseData responseData = ApiClient.post( wechatUrl, params, headers);
		return responseData;
	}
	
	public TWechatTowDimensionCode  getWeChatUser(String ticket,HttpServletRequest request)
	{
		String wechatUrl = WECHAT_URL + "/tWechatTowDimensionCode/?ticket="+ticket;
		Map<String,String> headers = new HashMap<String,String>();
		ResponseData responseData = ApiClient.get(wechatUrl, headers,request,"");
		if (responseData.getCode() != 200) {
			return null;
		}
		TWechatTowDimensionCode tWechatTowDimensionCode =(TWechatTowDimensionCode) JSONObject.parseObject(responseData.getBackData(),TWechatTowDimensionCode.class);
		return tWechatTowDimensionCode;
	}
	public List<TWechatShareLog> getTWechatShareLog(Integer userId,String openId,String unionid,HttpServletRequest request)
	{
		String wechatUrl = WECHAT_URL + "/tWechatShareLog?openId="+openId;
		Map<String,String> headers = new HashMap<String,String>();
		ResponseData responseData = ApiClient.get(wechatUrl, headers,request,"");
		if (responseData.getCode() != 200) {
			return null;
		}
		JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
		List<TWechatShareLog> list =  JSONObject.parseArray(resultJson.getString("result"), TWechatShareLog.class);
		return list;
	}
	public TWechatSalePersons saleRandom(HttpServletRequest request)
	{
		String wechatUrl = WECHAT_URL + "/tWechatSalePersons";
		Map<String,String> headers = new HashMap<String,String>();
		ResponseData responseData = ApiClient.get(wechatUrl, headers,request,"");
		if (responseData.getCode() != 200) {
			return null;
		}
		TWechatSalePersons tWechatSalePersons = (TWechatSalePersons) JSONObject.parseObject(responseData.getBackData(),TWechatSalePersons.class);
		return tWechatSalePersons;
	}
	
	public String getParam(String paramKey,HttpServletRequest request)
	{
		String wechatUrl = WECHAT_URL + "/tWechatParam?paramKey="+paramKey;
		Map<String,String> headers = new HashMap<String,String>();
		ResponseData responseData = ApiClient.get(wechatUrl, headers,request,"");
		if (responseData.getCode() != 200) {
			return null;
		}
		return responseData.getBackData().replace("\"", "");
	}
	
	
	public Integer getCountConcern(HttpServletRequest request)
	{
		String wechatUrl = WECHAT_URL + "/tWechatShareLog/all";
		Map<String,String> headers = new HashMap<String,String>();
		ResponseData responseData = ApiClient.get(wechatUrl, headers,request,"");
		if (responseData.getCode() != 200) {
			return null;
		}
		JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
		Integer count = resultJson.getInteger("count");
		return count;
	}
	
	public ResponseData  pushcoupon(HttpServletRequest request)
	{
		String wechatUrl = WECHAT_URL + "/binding/pushcoupon";
		Map<String,String> headers = new HashMap<String,String>();
		ResponseData responseData = ApiClient.get(wechatUrl, headers,request,"");
		return responseData;
	}
	
	public String getMedia(HttpServletRequest request,String mediaId)
	{
		String wechatUrl = WECHAT_URL + "/binding/getmedia?mediaId="+mediaId+"&type=jpg";
		Map<String,String> headers = new HashMap<String,String>();
		ResponseData responseData = ApiClient.get(wechatUrl, headers,request,"");
		String imgUrl = responseData.getBackData().replaceAll("\"", "");
		return imgUrl;
	}
	
	public String getAudioMedia(HttpServletRequest request,String mediaId)
	{
		String wechatUrl = WECHAT_URL + "/binding/getmedia?mediaId="+mediaId+"&type=jpg";
		Map<String,String> headers = new HashMap<String,String>();
		ResponseData responseData = ApiClient.get(wechatUrl, headers,request,"");
		String imgUrl = responseData.getBackData().replaceAll("\"", "");
		return imgUrl;
	}
}
