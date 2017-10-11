/**
 * 
 */
package com.xiaoma.universe.learnplan.service;

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
import com.xiaoma.universe.common.utils.StringUtils;
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
import com.xiaoma.universe.learnplan.domain.vo.api.exercise.IntensiveListeningQuestionVO;
import com.xiaoma.universe.learnplan.domain.vo.api.exercise.SpokensVO;
import com.xiaoma.universe.learnplan.domain.vo.api.exercise.TranslatesVO;
import com.xiaoma.universe.learnplan.domain.vo.api.exercise.WordQuestionsVO;
import com.xiaoma.universe.userlogin.controller.UserVO;  
/**
 * @author xiaoma
 *
 */
@Service("exerciseService")
public class ExerciseService {

	private Logger logger = Logger.getLogger(ExerciseService.class);

	public static String LEARN_API_URL = PropertiesUtils.getString("learn_api_url"); 

	public WordQuestionsVO getWordQuestion(HttpServletRequest request,String groupId,int page,int page_size){
		String pageString ="";
		if(page>0 && page_size>0){
			pageString = String.format("&page=%d&page_size=%d", page,page_size);
		}
		
		Map<String ,String> headers = getHeaders(); 
		ResponseData data = ApiClient.get(LEARN_API_URL+"/word/batch?groupId="+ groupId +pageString, headers,request,ApiClient.FORMAT_DEFAULT);
		WordQuestionsVO words = null;
		try {
			words = (WordQuestionsVO) JsonUtil.jsonToBean(data.getBackData(), WordQuestionsVO.class);
		} catch (Exception e) {
			words = null; 
			e.printStackTrace();
			logger.error(e.getStackTrace().toString());
		} 

		return words;
	}

	public IntensiveListeningQuestionVO getIntensiveListenQuestion(HttpServletRequest request,String questionId){
		  
		Map<String ,String> headers = getHeaders(); 
		ResponseData data = ApiClient.get(LEARN_API_URL+"/intensivelistening/questions/"+ questionId, headers,request,ApiClient.FORMAT_DEFAULT);
		IntensiveListeningQuestionVO question = null;
		try {
			question = (IntensiveListeningQuestionVO) JsonUtil.jsonToBean(data.getBackData(), IntensiveListeningQuestionVO.class);
		} catch (Exception e) {
			question = null; 
			e.printStackTrace();
			logger.error(e.getStackTrace().toString());
		} 

		return question;
	}

	public static Map<String ,String> getHeaders(){
		Map<String,String> headers = new HashMap<String,String>(); 
		headers.put("fromType", "web");
		return headers;
	}

}
