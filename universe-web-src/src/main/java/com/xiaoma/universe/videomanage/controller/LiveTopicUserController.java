package com.xiaoma.universe.videomanage.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.xiaoma.rest.authentication.UserInfo;
import com.xiaoma.rest.authentication.beans.annotation.TokenUser;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.contant.Contant;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.information.controller.BaseController;
import com.xiaoma.universe.videomanage.model.vo.LiveTopicUser;
 
/**
 * @Title:消息Controller
 * @Description: TODO
 * @author zuotong
 * @since 2017年04月18日
 * @version V1.0  
 */
@Controller
@RequestMapping("/liveTopicUser")
public class LiveTopicUserController extends BaseController{

	private Logger logger = Logger.getLogger(LiveTopicUserController.class);


	/**
	 * 列出所有分类
	 * @return
	 */
	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> list(Integer courseId,Integer topicId,Integer userId,Integer page,Integer pageSize, String order) {
		JSONObject resultJson = null;
		Map<String, String> headers = new HashMap<String, String>();
		try {
			
			StringBuffer requestURL = new StringBuffer(Contant.LIVE_ROOM_URL+"/liveTopicUser/search?1=1");
			if(courseId != null) requestURL.append("&courseId="+courseId);
			if(topicId != null) requestURL.append("&topicId="+topicId);
			if(userId != null) requestURL.append("&userId="+userId);
			if(order != null && !order.trim().equals("")) requestURL.append("&order="+order);
			page = page==null?1:page;
			pageSize = pageSize==null?20:pageSize;
			requestURL.append("&page="+page+"&pageSize="+pageSize);
			
			ResponseData responseData = ApiClient.get(requestURL.toString(), headers);  //调用远程后台接口
			if(responseData.getCode()==HttpServletResponse.SC_OK){
				resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
			}
	    } catch (Exception e) {
			e.printStackTrace();
		}
		return ResponseEntity.ok(resultJson);
	}

	/**
	 * 新建一个分类
	 * 
	 * @param category
	 * @return
	 */
	@RequestMapping(method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> save(LiveTopicUser liveTopicUser,@TokenUser UserInfo user) {	
		try {
			
			Integer messageUserId = (null == user || user.getId() <= 0) ? new Integer(liveTopicUser.getUserId()) : user.getId();
			if (liveTopicUser.getCourseId() == null || liveTopicUser.getTopicId() == null)
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new JSONObject().put("message", "参数有误！"));
			
			Map<String, String> headers = new HashMap<String, String>();
			//header设置参数
			Map<String, String> params = new HashMap<String, String>();
			params.put("courseId", String.valueOf(liveTopicUser.getCourseId()));
			params.put("topicId", String.valueOf(liveTopicUser.getTopicId()));
			params.put("userId", String.valueOf(messageUserId));
			
			ResponseData responseData = ApiClient.post(Contant.LIVE_ROOM_URL+"/liveTopicUser",params,headers);
			if(responseData.getCode()==HttpServletResponse.SC_CREATED){
				return  ResponseEntity.status(HttpServletResponse.SC_OK).body(new JSONObject().put("success", "操作成功"));
			}
		}catch (Exception e) {
			logger.debug(e.getMessage());
		}
		return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new JSONObject().put("message", "操作失败"));	
	}

	/**
	 * 获取某个指定分类的信息
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> get(@PathVariable("id") Integer id){		
		JSONObject resultJson = null;
		Map<String, String> headers = new HashMap<String, String>();
		try {
			StringBuffer requestURL = new StringBuffer(Contant.LIVE_ROOM_URL+"/liveTopicUser/"+id);
			ResponseData responseData = ApiClient.get(requestURL.toString(), headers);  //调用远程后台接口
			if(responseData.getCode()==HttpServletResponse.SC_OK){
				resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
			}
	    } catch (Exception e) {
			e.printStackTrace();
		}
		return ResponseEntity.ok(resultJson);		
	}

	/**
	 * 更新某个指定分类的信息（提供该分类的全部信息）
	 * 
	 * @param category
	 * @return
	 */
	@RequestMapping(value = "/{id}", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> update(@PathVariable("id") Integer id,LiveTopicUser liveTopicUser,@TokenUser UserInfo user) {	
    try {
			Integer messageUserId = (null == user || user.getId() <= 0) ? new Integer(liveTopicUser.getUserId()) : user.getId();
			if (id == null || liveTopicUser.getCourseId() == null || liveTopicUser.getTopicId() == null)
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new JSONObject().put("message", "参数有误！"));
			
			Map<String, String> headers = new HashMap<String, String>();
			//header设置参数
			Map<String, String> params = new HashMap<String, String>();
			params.put("courseId", String.valueOf(liveTopicUser.getCourseId()));
			params.put("topicId", String.valueOf(liveTopicUser.getTopicId()));
			params.put("userId", String.valueOf(messageUserId));
			
			ResponseData responseData = ApiClient.post(Contant.LIVE_ROOM_URL+"/liveTopicUser/"+id,params,headers);
			if(responseData.getCode()==HttpServletResponse.SC_CREATED){
				return  ResponseEntity.status(HttpServletResponse.SC_OK).body(new JSONObject().put("success", "操作成功"));
			}
		}catch (Exception e) {
			logger.debug(e.getMessage());
		}
		return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new JSONObject().put("message", "操作失败"));			
	}

	/**
	 * 删除
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public ResponseEntity<?> delete(@PathVariable("id") Integer id,@TokenUser UserInfo user,HttpServletRequest request) {	
		try {
			Map<String, String> headers = new HashMap<String, String>();
			ResponseData responseData = ApiClient.delete(Contant.LIVE_ROOM_URL+"/liveTopicUser/"+id, headers, request, null);
			if(responseData.getCode()==HttpServletResponse.SC_NO_CONTENT){
				return  ResponseEntity.status(HttpServletResponse.SC_OK).body(new JSONObject().put("success", "操作成功"));
			}
		}catch (Exception e) {
			logger.debug(e.getMessage());
		}
		return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new JSONObject().put("message", "操作失败"));		
	}
}