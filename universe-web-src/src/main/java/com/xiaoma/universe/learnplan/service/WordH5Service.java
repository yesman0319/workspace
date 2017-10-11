package com.xiaoma.universe.learnplan.service;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.api.JsonUtil;
import com.xiaoma.universe.common.utils.PropertiesUtils;
import com.xiaoma.universe.common.utils.ResponseData;

import net.sf.json.JSONObject;
@Service
public class WordH5Service {
	public static String PLAN_API_URL = PropertiesUtils.getString("learn_api_url"); 
	private Logger logger = Logger.getLogger(WordH5Service.class);
	public Object getAll(HttpServletRequest request, int groupId) {
		Map<String ,String> headers = getHeaders(); 
		ResponseData data = ApiClient.get(PLAN_API_URL+"/word/batch?groupId="+groupId, headers,request,ApiClient.FORMAT_DEFAULT);
		Object wordVO = null;
		try {
			System.out.println(data.getBackData());
			JSONObject jb = JsonUtil.jsonToObject(data.getBackData());
			if(jb.containsKey("rows")){
				return jb.getJSONArray("rows");
			}
		} catch (Exception e) {
			wordVO = null; 
			e.printStackTrace();
			logger.error(e.getStackTrace().toString());
		} 
		return wordVO;
	}
	public static Map<String ,String> getHeaders(){
		Map<String,String> headers = new HashMap<String,String>(); 
		headers.put("fromType", "web");
		return headers;
	}
}
