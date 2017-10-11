package com.xiaoma.universe.videomanage.controller;

import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import com.alibaba.fastjson.JSONObject;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xiaoma.rest.authentication.UserInfo;
import com.xiaoma.rest.authentication.beans.annotation.TokenUser;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.contant.Contant;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.information.controller.BaseController;
import com.xiaoma.universe.information.model.obj.PageBean;
import com.xiaoma.universe.videomanage.model.vo.LiveMessage;

/**
 * @Title:消息Controller
 * @Description:
 * @author zhaijilong
 * @since 2017年05月03日
 * @version V1.0
 */
@Controller
@RequestMapping("/liveMessage")
public class LiveMessageController extends BaseController{

	private Logger logger = Logger.getLogger(LiveMessageController.class);

	/**
	 * 某个话题下消息列表
	 * 
	 * @return
	 */
	@RequestMapping(value = "/search", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> searchUser(Integer topicId, Integer userId, String msgTimeStart, String msgTimeEnd, Integer page, Integer pageSize, String order, @TokenUser UserInfo user) {
			Integer messageUserId = (null == user || user.getId() <= 0 || user.getUsername() == null) ? new Integer(userId) : user.getId();
			if (null == topicId || null == messageUserId || userId.intValue() <= 0)
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body((new net.sf.json.JSONObject().element("message", "参数有误")));
			
			JSONObject resultJson = null;
			Map<String, String> headers = new HashMap<String, String>();
			page = page == null?1:page;
			pageSize = pageSize==null?20:pageSize;
			try {
				StringBuffer requestURL = new StringBuffer(Contant.LIVE_ROOM_URL+"/liveMessage/search?userId="+messageUserId+"&topicId="+topicId+"&page="+page+"&pageSize="+pageSize);
				if(msgTimeStart!=null && !msgTimeStart.trim().equals("")){ 
					requestURL.append("&msgTimeStart="+msgTimeStart);
				}
				if(msgTimeEnd!=null && !msgTimeEnd.trim().equals("")){
					requestURL.append("&msgTimeEnd="+msgTimeEnd);
				}
				if(order !=null && !order.trim().equals("")){
					requestURL.append("&order="+order);
				}
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
	 * 某个话题下某个用户的消息
	 * 
	 * @return
	 */
	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> list(Integer topicId, Integer userId, @TokenUser UserInfo user) {
			Integer messageUserId = (null == user || user.getId() <= 0 || user.getUsername() == null) ? new Integer(userId) : user.getId();
			if (null == topicId || null == messageUserId || userId.intValue() <= 0)
				return ResponseEntity.status(HttpStatus.BAD_REQUEST).body((new net.sf.json.JSONObject().element("message", "参数有误")));
		
			JSONObject resultJson = null;
			Map<String, String> headers = new HashMap<String, String>();
			
			try {
				StringBuffer requestURL = new StringBuffer(Contant.LIVE_ROOM_URL+"/liveMessage?userId="+messageUserId+"&topicId="+topicId);
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
	 * 获取某个指定分类的信息
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	@ResponseBody
	public ResponseEntity<?> get(@PathVariable("id") Integer id) {
		if (null == id)
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body((new net.sf.json.JSONObject().element("message", "参数有误")));
	
		JSONObject resultJson = null;
		Map<String, String> headers = new HashMap<String, String>();
		
		try {
			StringBuffer requestURL = new StringBuffer(Contant.LIVE_ROOM_URL+"/liveMessage/"+id);
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
	 * 点赞
	 * 
	 * @param category
	 * @return
	 */
	@RequestMapping(value = "/top", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> top(Integer id) {
		try {
			
			Map<String, String> headers = new HashMap<String, String>();
			//header设置参数
			Map<String, String> params = new HashMap<String, String>();
			params.put("id",id==null?"0":String.valueOf(id));
			ResponseData responseData = ApiClient.post(Contant.LIVE_ROOM_URL+"/liveMessage/top",params,headers);
			if(responseData.getCode()==HttpServletResponse.SC_CREATED){
				return  ResponseEntity.status(HttpServletResponse.SC_OK).body((new net.sf.json.JSONObject().element("success", "操作成功")));
			}
		}catch (Exception e) {
			logger.debug(e.getMessage());
		}
		return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body((new net.sf.json.JSONObject().element("message", "点赞失败")));
	 }

		

	/**
	 * 设置消息已读
	 * 
	 * @param category
	 * @return
	 */
	@RequestMapping(value = "/read", method = RequestMethod.POST)
	@ResponseBody
	public ResponseEntity<?> read(Integer id, Integer userId, @TokenUser UserInfo user) {

	   Integer messageUserId = (null == user || user.getId() <= 0 || user.getUsername() == null) ? new Integer(userId) : user.getId();
	   if (null == messageUserId || userId.intValue() <= 0) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body((new net.sf.json.JSONObject().element("message", "参数有误")));
	   try {
			Map<String, String> headers = new HashMap<String, String>();
			Map<String, String> params = new HashMap<String, String>();
			params.put("id",id==null?"0":String.valueOf(id));
			params.put("userId", String.valueOf(messageUserId));
			
			ResponseData responseData = ApiClient.post(Contant.LIVE_ROOM_URL+"/liveMessage/read",params,headers);
			if(responseData.getCode()==HttpServletResponse.SC_CREATED){
				return  ResponseEntity.status(HttpServletResponse.SC_OK).body((new net.sf.json.JSONObject().element("success", "操作成功")));
			}
		}catch (Exception e) {
			logger.debug(e.getMessage());
		}
		return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body((new net.sf.json.JSONObject().element("message", "操作失败")));
	}

	
	/**
	 * 撤销消息
	 * 
	 * @param id
	 * @return
	 */
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	@ResponseBody
	public ResponseEntity<?> delete(@PathVariable("id") Integer id, HttpServletRequest request) {
		try {
			Map<String, String> headers = new HashMap<String, String>();
			ResponseData responseData = ApiClient.delete(Contant.LIVE_ROOM_URL+"/liveMessage/"+id, headers, request, null);
			if(responseData.getCode()==HttpServletResponse.SC_OK){
				return  ResponseEntity.status(HttpServletResponse.SC_OK).body((new net.sf.json.JSONObject().element("success", "操作成功")));
			}
		}catch (Exception e) {
			logger.debug(e.getMessage());
		}
		return  ResponseEntity.status(HttpStatus.BAD_REQUEST).body((new net.sf.json.JSONObject().element("message", "操作失败")));
	}

}
