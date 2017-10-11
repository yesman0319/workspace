package com.xiaoma.universe.videomanage.service;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.exception.InnerHandleException;
import com.xiaoma.universe.common.utils.PropertiesUtils;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.userlogin.controller.UserVO;
import com.xiaoma.universe.videomanage.model.app.CourseForAppById;
import com.xiaoma.universe.videomanage.model.app.PartsDetailForApp;

/**
 * 与h5相关的逻辑处理
 * @author Administrator
 */
@Service("videoH5Service")
public class VideoH5Service {
	
	public static String VIDEO_COURSE = PropertiesUtils.getString("videocourse_api_url");

	private Logger logger = Logger.getLogger(VideoH5Service.class);
	
	/**
	 * 句子翻译h5页面对应的
	 * @param groupId
	 * @param uid
	 * @return
	 */
	public CourseForAppById getVideoCourseById( Integer id , HttpServletRequest request){
		CourseForAppById courseForAppById = new CourseForAppById();
		String url = VIDEO_COURSE+"/courses/"+id+"?channel=app";
		Map<String,String> headers = new HashMap<String,String>();
		ResponseData responseData = ApiClient.get(url, headers,request,"");
		if (responseData.getCode() != 200) {
			return null;
		}
		JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
		courseForAppById = JSON.parseObject(resultJson.getString("results"), CourseForAppById.class);
		return courseForAppById;
	}
	
	public PartsDetailForApp getVideoPartById( Integer partId ,UserVO user,HttpServletRequest request){
		PartsDetailForApp partsDetailForApp = new PartsDetailForApp();
		String url = VIDEO_COURSE+"/parts/"+partId+"?channel=app";
		Map<String,String> headers = new HashMap<String,String>();
		headers.put("Authorization", "bearer "+user.getAccess_token()); 
		ResponseData responseData = ApiClient.get(url, headers,request,"");
		if (responseData.getCode() != 200) {
			return null;
		}
		JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
		partsDetailForApp = JSON.parseObject(resultJson.getString("results"), PartsDetailForApp.class);
		return partsDetailForApp;
	}
	
	/**
	 * 免费加入
	 * @Title: freeJoin 
	 * @Description: TODO
	 * @param @param params
	 * @param @param request    设定文件 
	 * @return void    返回类型 
	 * @throws
	 */
	public String  freeJoin(Map<String,String> params,UserVO user,HttpServletRequest request) {
		String url = VIDEO_COURSE+"/permissions";
		Map<String,String> headers = new HashMap<String,String>();
		headers.put("Authorization", "bearer "+user.getAccess_token()); 
		ResponseData responseData = ApiClient.post(url, params,headers,request,"ajax");
		if (responseData.getCode() != 200) {
			return "error";
		}
		return "success";
	}
	
	/**
	 * 删除后加入
	 * @Title: delJoin 
	 * @Description: TODO
	 * @param @param premissionId
	 * @param @param userInfo    设定文件 
	 * @return void    返回类型 
	 * @throws
	 */
	public String delJoin(String premissionId,UserVO user,HttpServletRequest request) {
		Map<String,String> params = new HashMap<String,String>();
		params.put("id", premissionId);
		String url = VIDEO_COURSE+"/permissions/"+premissionId;
		Map<String,String> headers = new HashMap<String,String>();
		headers.put("Authorization", "bearer "+user.getAccess_token()); 
		ResponseData responseData = ApiClient.put(url, params,headers,request,"ajax");
		if (responseData.getCode() != 200) {
			return "error";
		}
		return "success";
	}
}
