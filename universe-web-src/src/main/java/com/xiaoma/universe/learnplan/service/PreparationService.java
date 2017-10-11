package com.xiaoma.universe.learnplan.service;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.utils.PropertiesUtils;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.learnplan.controller.exercise.NewSentenceTranslateController;

@Service("preparationService")
public class PreparationService {

	private Logger logger = Logger.getLogger(NewSentenceTranslateController.class);
	
	public static String PLAN_API_URL = PropertiesUtils.getString("learn_api_url"); 
	public static Map<String ,String> getHeaders(){
		Map<String,String> headers = new HashMap<String,String>(); 
		headers.put("fromType", "web");
		return headers;
	}
	public Object saveOrUpdateResult(HttpServletRequest request,int userId, String param) {
		
		Map<String ,String> headers = getHeaders();  
		try {
			ResponseData data = ApiClient.postJsonData(PLAN_API_URL+"/preparation/save",param,headers,request,ApiClient.FORMAT_DEFAULT);
			if(data.getCode()==200 || data.getCode()==201){
					return true;
			} else{
				logger.error(data.getBackData());
			}
			return false;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
	}

}
