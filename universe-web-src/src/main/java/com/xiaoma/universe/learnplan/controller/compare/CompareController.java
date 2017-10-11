package com.xiaoma.universe.learnplan.controller.compare;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.contant.Contant;
import com.xiaoma.universe.common.utils.ResponseData;

import net.sf.json.JSONObject;
@Controller
@RequestMapping("/compare")
public class CompareController {

	private Logger logger = Logger.getLogger(CompareController.class);

	 
	/**
	 * 根据groupId获取题目
	 * @param fromType
	 * @param token
	 * @param systemId
	 * @param groupId
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="",method=RequestMethod.POST )
	public Object questions(HttpServletRequest request,HttpServletResponse response,String answer,String standardAnswer){
		Map<String ,String> headers = new HashMap<String,String>(); 
		Map<String,String> param = new HashMap<String,String>();
		param.put("answer", answer);
		param.put("standardAnswer", standardAnswer);
		try {
			ResponseData data = ApiClient.post(Contant.COMPARE_URL,param,headers,request,ApiClient.FORMAT_DEFAULT);
			if(data.getCode()==200 || data.getCode()==201){
				try {
					String backdata = data.getBackData();
					JSONObject jb = JSONObject.fromObject(backdata);
					return jb;
				} catch (Exception e) {
					e.printStackTrace();
				}
			} else{
				logger.error(data.getBackData());
				return null;
			}
			return null;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	
}
