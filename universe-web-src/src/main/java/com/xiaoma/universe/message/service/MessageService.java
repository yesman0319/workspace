/**
 * 
 */
package com.xiaoma.universe.message.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.ui.Model;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.api.JsonUtil;
import com.xiaoma.universe.common.utils.PropertiesUtils;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.learnplan.domain.vo.api.BuyPlanBackVO;
import com.xiaoma.universe.learnplan.domain.vo.api.CustomPlansVO;
import com.xiaoma.universe.learnplan.domain.vo.api.ExerciseHistoriesVO;
import com.xiaoma.universe.learnplan.domain.vo.api.MyPlanVo;
import com.xiaoma.universe.learnplan.domain.vo.api.PeoplePracticingVo;
import com.xiaoma.universe.learnplan.domain.vo.api.PlanDayDetailVO;
import com.xiaoma.universe.learnplan.domain.vo.api.PlanDetailVO;
import com.xiaoma.universe.learnplan.domain.vo.api.PlanInfosVO;
import com.xiaoma.universe.learnplan.domain.vo.api.PlanUsersVO;
import com.xiaoma.universe.learnplan.domain.vo.api.RecommendExerciseVO;
import com.xiaoma.universe.learnplan.domain.vo.api.exercise.NewTranslatesVO;
import com.xiaoma.universe.learnplan.domain.vo.api.exercise.PreparationVO;
import com.xiaoma.universe.learnplan.domain.vo.api.exercise.SpokensVO;
import com.xiaoma.universe.learnplan.domain.vo.api.exercise.TranslatesVO;
import com.xiaoma.universe.message.domain.MessageCount;
import com.xiaoma.universe.userlogin.controller.UserVO;  
/**
 * @author xiaoma
 *
 */
@Service("messageService")
public class MessageService {

	private Logger logger = Logger.getLogger(MessageService.class);
	
	public static String MESSAGE_API_URL = PropertiesUtils.getString("message_api_url"); 
 
	public int getUnReadMessagesCount(int userid){
		if(userid<=0)
			return 0; 
		
		int count=0;
		Map<String ,String> headers = getHeaders();  
		String url = MESSAGE_API_URL+"/message/unread/"+userid;
		ResponseData data = ApiClient.get(url, headers);
		if(data.getCode()==200 || data.getCode()==201){
			try {
				MessageCount countVO = (MessageCount) JsonUtil.jsonToBean(data.getBackData(), MessageCount.class);
				count = countVO.getCount();
			} catch (Exception e) {
				 
			}
		}
		return count;
	} 
	
	public static Map<String ,String> getHeaders(){
		Map<String,String> headers = new HashMap<String,String>(); 
		headers.put("fromType", "web");
		return headers;
	}

}
