/**
 * 
 */
package com.xiaoma.universe.liveroom.service;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.utils.PropertiesUtils;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.userlogin.controller.UserVO;
import com.xiaoma.universe.wechat.model.dto.TWechatUsers;
/**
 * @author xiaoma
 *
 */
@Service("chatRoomService")
public class LiveRoomService {

	private Logger logger = Logger.getLogger(LiveRoomService.class);
	public static String WECHAT_URL = PropertiesUtils.getString("WECHAT_URL");
	
	/**
	 * 根据回调地址生成授权地址
	 * @Title: wechatCodeURL 
	 * @Description: TODO
	 * @param @param request
	 * @param @param backUrl
	 * @param @return    设定文件 
	 * @return String    返回类型 
	 * @throws
	 */
	public String wechatCodeURL(HttpServletRequest request,String backUrl)
	{
		String wechatUrl = WECHAT_URL + "/binding/authority?backUrl="+backUrl;
		Map<String,String> headers = new HashMap<String,String>();
		ResponseData responseData = ApiClient.get(wechatUrl, headers,request,"");
		if (responseData.getCode() != 200) {
			return null;
		}
		JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
		String redirect_uri = resultJson.getString("redisUrl");
		return redirect_uri;
	}
	
	/**
	 * 根据授权code获得用户id
	 * @Title: getOpenId 
	 * @Description: TODO
	 * @param @param wechatcode
	 * @param @param request
	 * @param @return    设定文件 
	 * @return String    返回类型 
	 * @throws
	 */
	public String  getOpenId(String wechatcode,HttpServletRequest request)
	{
		String wechatUrl = WECHAT_URL + "/binding/getWeChatOpenId?code="+wechatcode;
		Map<String,String> headers = new HashMap<String,String>();
		ResponseData responseData = ApiClient.get(wechatUrl, headers,request,"");
		if (responseData.getCode() != 200) {
			return null;
		}
		JSONObject resultJson=(JSONObject) JSONObject.parse(responseData.getBackData());
		String OpenId = resultJson.getString("openId");
		return OpenId;
	}
	
	/**
	 * 根据授权openid获得用户信息（关注用户）
	 * @Title: getWeChatUserByOpenId 
	 * @Description: TODO
	 * @param @param openId
	 * @param @param request
	 * @param @return    设定文件 
	 * @return TWechatUsers    返回类型 
	 * @throws
	 */
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
	
	/**
	 * 根据授权openId获得用户信息（非关注用户）
	 * @Title: getWeChatUserForScope 
	 * @Description: TODO
	 * @param @param openId
	 * @param @param request
	 * @param @return    设定文件 
	 * @return TWechatUsers    返回类型 
	 * @throws
	 */
	public TWechatUsers  getWeChatUserForScope(String openId,HttpServletRequest request)
	{
		String wechatUrl = WECHAT_URL + "/binding/getWeChatUserForScope?&openId="+openId;
		Map<String,String> headers = new HashMap<String,String>();
		ResponseData responseData = ApiClient.get(wechatUrl, headers,request,"");
		if (responseData.getCode() != 200) {
			return null;
		}
		TWechatUsers tWechatUsers =(TWechatUsers) JSONObject.parseObject(responseData.getBackData(),TWechatUsers.class);
		return tWechatUsers;
	}
	
	/**
	 * 
	 * @Title: getWeChatUser 
	 * @Description: TODO
	 * @param @param openId
	 * @param @param user
	 * @param @param request
	 * @param @return    设定文件 
	 * @return TWechatUsers    返回类型 
	 * @throws
	 */
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
//	public TWechatTowDimensionCode getTicketTwoCode(Integer userId,String openId,String unionid,HttpServletRequest request)
//	{
//		String wechatUrl = WECHAT_URL + "/binding/getTicketTwo?userid="+userId.toString()+"&openid="+openId+"&unionid="+unionid;
//		Map<String,String> headers = new HashMap<String,String>();
//		ResponseData responseData = ApiClient.get(wechatUrl, headers,request,"");
//		if (responseData.getCode() != 200) {
//			return null;
//		}
//		TWechatTowDimensionCode tWechatTowDimensionCode = (TWechatTowDimensionCode) JSONObject.parseObject(responseData.getBackData(), TWechatTowDimensionCode.class);
//		return tWechatTowDimensionCode;
//	}
//	

//	
//	
//	
//	public ResponseData  push(TWechatPush tWechatPush)
//	{
//		String wechatUrl = WECHAT_URL + "/binding/push";
//		Map<String, String> params = (Map<String, String>) MapUtil.objectToMap(tWechatPush);
//		Map<String, String> headers = new HashMap<String, String>();
//		ResponseData responseData = ApiClient.post( wechatUrl, params, headers);
//		return responseData;
//	}
//	
//	public ResponseData  addLog(TWechatShareLog tWechatShareLog )
//	{
//		String wechatUrl = WECHAT_URL + "/tWechatShareLog";
//		Map<String, String> params = (Map<String, String>) MapUtil.objectToMap(tWechatShareLog);
//		Map<String, String> headers = new HashMap<String, String>();
//		ResponseData responseData = ApiClient.post( wechatUrl, params, headers);
//		return responseData;
//	}
//	
//	public ResponseData  postResq(String nickName,String wechatNickName,String formOpenId,String toOpenId)
//	{
//		String wechatUrl = WECHAT_URL + "/binding/postResq";
//		Map<String, String> params =  new HashMap<String, String>();
//		params.put("nickName", nickName);
//		params.put("wechatNickName", wechatNickName);
//		params.put("formOpenId", formOpenId);
//		params.put("toOpenId", toOpenId);
//		Map<String, String> headers = new HashMap<String, String>();
//		ResponseData responseData = ApiClient.post( wechatUrl, params, headers);
//		return responseData;
//	}
//	
//	public ResponseData  postResp(String formOpenId,String toOpenId,String content)
//	{
//		String wechatUrl = WECHAT_URL + "/binding/postResp";
//		Map<String, String> params =  new HashMap<String, String>();
//		params.put("formOpenId", formOpenId);
//		params.put("toOpenId", toOpenId);
//		params.put("content", content);
//		Map<String, String> headers = new HashMap<String, String>();
//		ResponseData responseData = ApiClient.post( wechatUrl, params, headers);
//		return responseData;
//	}
//	
//	public ResponseData  clickResp(String formOpenId,String toOpenId,String eventKey)
//	{
//		String wechatUrl = WECHAT_URL + "/binding/clickResp";
//		Map<String, String> params =  new HashMap<String, String>();
//		params.put("formOpenId", formOpenId);
//		params.put("toOpenId", toOpenId);
//		params.put("eventKey", eventKey);
//		Map<String, String> headers = new HashMap<String, String>();
//		ResponseData responseData = ApiClient.post( wechatUrl, params, headers);
//		return responseData;
//	}
//	
//	public ResponseData  addConcernLog(TWechatShareLog tWechatShareLog )
//	{
//		String wechatUrl = WECHAT_URL + "/tWechatShareLog";
//		Map<String, String> params = (Map<String, String>) MapUtil.objectToMap(tWechatShareLog);
//		Map<String, String> headers = new HashMap<String, String>();
//		ResponseData responseData = ApiClient.post( wechatUrl, params, headers);
//		return responseData;
//	}
//	public ResponseData  updateConcern(String  userId,String openId)
//	{
//		String wechatUrl = WECHAT_URL + "/tWechatUsers";
//		Map<String, String> params = new HashMap<String, String>();
//		params.put("userId", userId);
//		params.put("openId", openId);
//		Map<String, String> headers = new HashMap<String, String>();
//		ResponseData responseData = ApiClient.post( wechatUrl, params, headers);
//		return responseData;
//	}
//	
//	public TWechatTowDimensionCode  getWeChatUser(String ticket,HttpServletRequest request)
//	{
//		String wechatUrl = WECHAT_URL + "/tWechatTowDimensionCode/?ticket="+ticket;
//		Map<String,String> headers = new HashMap<String,String>();
//		ResponseData responseData = ApiClient.get(wechatUrl, headers,request,"");
//		if (responseData.getCode() != 200) {
//			return null;
//		}
//		TWechatTowDimensionCode tWechatTowDimensionCode =(TWechatTowDimensionCode) JSONObject.parseObject(responseData.getBackData(),TWechatTowDimensionCode.class);
//		return tWechatTowDimensionCode;
//	}
//	public List<TWechatShareLog> getTWechatShareLog(Integer userId,String openId,String unionid,HttpServletRequest request)
//	{
//		String wechatUrl = WECHAT_URL + "/tWechatShareLog?openId="+openId;
//		Map<String,String> headers = new HashMap<String,String>();
//		ResponseData responseData = ApiClient.get(wechatUrl, headers,request,"");
//		if (responseData.getCode() != 200) {
//			return null;
//		}
//		JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
//		List<TWechatShareLog> list =  JSONObject.parseArray(resultJson.getString("result"), TWechatShareLog.class);
//		return list;
//	}
//	public TWechatSalePersons saleRandom(HttpServletRequest request)
//	{
//		String wechatUrl = WECHAT_URL + "/tWechatSalePersons";
//		Map<String,String> headers = new HashMap<String,String>();
//		ResponseData responseData = ApiClient.get(wechatUrl, headers,request,"");
//		if (responseData.getCode() != 200) {
//			return null;
//		}
//		TWechatSalePersons tWechatSalePersons = (TWechatSalePersons) JSONObject.parseObject(responseData.getBackData(),TWechatSalePersons.class);
//		return tWechatSalePersons;
//	}
//	
//	public String getParam(String paramKey,HttpServletRequest request)
//	{
//		String wechatUrl = WECHAT_URL + "/tWechatParam?paramKey="+paramKey;
//		Map<String,String> headers = new HashMap<String,String>();
//		ResponseData responseData = ApiClient.get(wechatUrl, headers,request,"");
//		if (responseData.getCode() != 200) {
//			return null;
//		}
//		return responseData.getBackData().replace("\"", "");
//	}
//	
//	
//	public Integer getCountConcern(HttpServletRequest request)
//	{
//		String wechatUrl = WECHAT_URL + "/tWechatShareLog/all";
//		Map<String,String> headers = new HashMap<String,String>();
//		ResponseData responseData = ApiClient.get(wechatUrl, headers,request,"");
//		if (responseData.getCode() != 200) {
//			return null;
//		}
//		JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
//		Integer count = resultJson.getInteger("count");
//		return count;
//	}
//	
//	public ResponseData  pushcoupon(HttpServletRequest request)
//	{
//		String wechatUrl = WECHAT_URL + "/binding/pushcoupon";
//		Map<String,String> headers = new HashMap<String,String>();
//		ResponseData responseData = ApiClient.get(wechatUrl, headers,request,"");
//		return responseData;
//	}
}
