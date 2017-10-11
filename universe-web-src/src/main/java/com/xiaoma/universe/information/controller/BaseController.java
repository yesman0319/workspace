package com.xiaoma.universe.information.controller;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.xiaoma.universe.common.utils.HttpClientUtils;

public class BaseController {
    private static final Logger logger = LoggerFactory.getLogger(BaseController.class);
	public static String access_token="";
	public static String token_type="";
	public static long expires_in=0;

    public static void token(){
		try {
			String token = HttpClientUtils.getToken();
			JSONObject json = JSONObject.parseObject(token);
			token_type = json.getString("token_type");
			access_token = json.getString("access_token");
			long time = Long.parseLong(json.getString("expires_in"));
			expires_in= new Date().getTime()+time;
		} catch (Exception e) {
			  e.getStackTrace();
	    	  logger.debug( e.getStackTrace().toString());
	    	  logger.debug(e.getMessage());
		}
	}
    
    public void flushJson(Object json, HttpServletResponse response){
		try {
			response.setCharacterEncoding("UTF-8");
			response.setContentType("application/json;charset=UTF-8");
			if(json instanceof String){
				response.getWriter().write((String)json);
			}else{
				response.getWriter().write(JSONObject.toJSONString(json,SerializerFeature.DisableCircularReferenceDetect));
			}
			response.getWriter().close();
		} catch (Exception e) {
		}
	}
	public void flushText(Object text, HttpServletResponse response){
		try {
			response.setCharacterEncoding("UTF-8");
			response.setContentType("text/html; charset=UTF-8");
			if(text instanceof String){
				response.getWriter().write((String)text);
			}else{
				response.getWriter().write(JSONObject.toJSONString(text,SerializerFeature.DisableCircularReferenceDetect));
			}
			response.getWriter().close();
		} catch (Exception e) {
		}
	}
	
	protected void writeAndFlush(boolean success, String errorMsg, HttpServletResponse response)
			throws IOException {
		Map<String, Object> map = writeResult(success, errorMsg, null);
		flushJson(JSONObject.toJSONString(map), response);
	}
	
	protected void writeAndFlush(boolean success, String errorMsg, Object data, HttpServletResponse response)
			throws IOException {
		Map<String, Object> map = writeResult(success, errorMsg, data);
		flushJson(JSONObject.toJSONString(map), response);
	}

	protected Map<String, Object> writeResult(boolean success, String errorMsg, Object data) {
		Map<String,Object> map=new HashMap<String,Object>();
		map.put("success", success);
		map.put("error_msg", errorMsg);
		if (data != null) {
			map.put("data", data);
		}
		return map;
	}
    
    protected String getSuccessURL(HttpServletRequest request) {	
		String port = String.valueOf(request.getServerPort());
		if ("80".equals(port)) {
			port = "";
		} else {
			port = ":" + port;
		}
		String successURL =request.getScheme() + "://" + request.getServerName() + port + request.getContextPath() + request.getServletPath();
		String queryString = request.getQueryString();
		if (null != queryString) {
			successURL = successURL + "?" + queryString;
		}
		/*try {
			successURL = URLEncoder.encode(successURL, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			logger.error("对当前请求的URL进行encode失败! url:" + successURL);
		}*/
		return successURL;

	}
	    
	
}
