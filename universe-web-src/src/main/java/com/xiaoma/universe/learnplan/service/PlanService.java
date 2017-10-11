/**
 * 
 */
package com.xiaoma.universe.learnplan.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
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
import com.xiaoma.universe.learnplan.domain.vo.api.exercise.difficultSentence.DifficultSentenceGroupVO;
import com.xiaoma.universe.userlogin.controller.UserVO;  
/**
 * @author xiaoma
 *
 */
@Service("planService")
public class PlanService {

	private Logger logger = Logger.getLogger(PlanService.class);

	public static String PLAN_API_URL = PropertiesUtils.getString("learn_api_url");
	public static String AUTH_API = PropertiesUtils.getString("auth_api"); 
	public static String AUTH_MARKER = "difficultSentence"; 
	 
	public int getMaker(int user_id ){
		PlanInfosVO plansVO = null;
		Map<String ,String> headers = getHeaders();  
		String url = AUTH_API+"/mark/"+user_id +"/"+AUTH_MARKER+"/1";
		 
		ResponseData data = ApiClient.get(url, headers);
		if(data.getCode()==200 || data.getCode()==201){
			JSONObject resultJson = (JSONObject) JSONObject.parse(data.getBackData());
			int value = resultJson.getIntValue("result");
			return value;
		}
		return 0;
	}
	
	public PlanInfosVO getAllPlan(HttpServletRequest request,int page_size,int page,Integer labelId,String newType,String hotType){
		PlanInfosVO plansVO = null;
		Map<String ,String> headers = getHeaders();  
		String url = PLAN_API_URL+"/app/plan?page_size="+ page_size +"&page="+page;
		if(labelId != null && labelId >0){
			url+="&labelId="+labelId;
		}
		if(StringUtils.isNotBlank(newType)){
			url+="&newType="+newType;
		}
		if(StringUtils.isNotBlank(hotType)){
			url+="&hotType="+hotType;
		}
		ResponseData data = ApiClient.get(url, headers,request,ApiClient.FORMAT_DEFAULT);
		if(data.getCode()==200 || data.getCode()==201){
			try {
				plansVO = (PlanInfosVO) JsonUtil.jsonToBean(data.getBackData(), PlanInfosVO.class);
			} catch (Exception e) {
				plansVO = null;
				// TODO Auto-generated catch block
				e.printStackTrace();
				logger.error(e.getStackTrace().toString());
			}
		}
		return plansVO;
	}
	

	public boolean deleteExerciseHistory(HttpServletRequest request,Model model,String planid,String dayid,String exerciseid){
		Map<String ,String> headers = getHeaders();  
		Map<String ,String> params = new HashMap<String ,String>();
		params.put("planId", planid);
		params.put("planDayId", dayid);
		params.put("planDayExerciseId", exerciseid); 
		ResponseData data = ApiClient.postJson(PLAN_API_URL+"/app/history/delete",params,headers,request,ApiClient.FORMAT_DEFAULT);
		if(data.getCode()==200 || data.getCode()==201){
			 return true;
		} else{
			logger.error(data.getBackData());
		}
		return false;
	}
	
	public CustomPlansVO getAllMyPlan(HttpServletRequest request,int page_size,int page,Integer userId){
		CustomPlansVO plansVO = null;
		Map<String ,String> headers = getHeaders();  
		String url = PLAN_API_URL+"/app/my/plans?page_size="+ page_size +"&page="+page;
		ResponseData data = null;
		if(null == userId){
			data =  ApiClient.get(url, headers,request,ApiClient.FORMAT_DEFAULT);
		}else{
			headers.put("Fromtype", "web");
			data = ApiClient.get(url+"&userId="+userId, headers);
		}
		if(data.getCode()==200 || data.getCode()==201){
			try {
				plansVO = (CustomPlansVO) JsonUtil.jsonToBean(data.getBackData(), CustomPlansVO.class);
			} catch (Exception e) {
				plansVO = null;
				// TODO Auto-generated catch block
				e.printStackTrace();
				logger.error(e.getStackTrace().toString());
			}
		}
		return plansVO;
	}
	
	public boolean experiencePlan(HttpServletRequest request,int planId){ 
		Map<String ,String> headers = getHeaders(); 
		try{
			ResponseData data = ApiClient.get(PLAN_API_URL+"/app/open/plan?planId="+planId, headers,request,ApiClient.FORMAT_DEFAULT);
			if(data.getCode()==200 || data.getCode()==201){
				 return true;
			}
		}catch(Exception e){
			//e.printStackTrace();
		}
		
		return false;
	}
	
	
	public String buyPlan(HttpServletRequest request,int planId){ 
		Map<String ,String> headers = getHeaders(); 
		Map<String ,String> params = new HashMap<String ,String>();
		params.put("planId", ""+planId);
		ResponseData data = ApiClient.postJson(PLAN_API_URL+"/app/pay", params, headers,request,ApiClient.FORMAT_DEFAULT);
		
		String redirectUrl = "";;
		if(data.getCode()==200 || data.getCode()==201){
			BuyPlanBackVO vo;
			try {
				vo = (BuyPlanBackVO) JsonUtil.jsonToBean(data.getBackData(), BuyPlanBackVO.class); 
				redirectUrl = vo.getRedirectUrl();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		//plansVO = (CustomPlansVO) JsonUtil.jsonToBean(data.getBackData(), CustomPlansVO.class);
		
		return redirectUrl;
	}
	public String buyPlanH5(HttpServletRequest request,int planId){ 
		Map<String ,String> headers = getHeaders(); 
		Map<String ,String> params = new HashMap<String ,String>();
		params.put("planId", ""+planId);
		ResponseData data = ApiClient.postJson(PLAN_API_URL+"/app/h/pay", params, headers,request,ApiClient.FORMAT_DEFAULT);
		
		String redirectUrl = "";;
		if(data.getCode()==200 || data.getCode()==201){
			BuyPlanBackVO vo;
			try {
				vo = (BuyPlanBackVO) JsonUtil.jsonToBean(data.getBackData(), BuyPlanBackVO.class); 
				redirectUrl = vo.getRedirectUrl();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		//plansVO = (CustomPlansVO) JsonUtil.jsonToBean(data.getBackData(), CustomPlansVO.class);
		
		return redirectUrl;
	}
	public boolean deletePlan(HttpServletRequest request,int planId){ 
		Map<String ,String> headers = getHeaders();  
		ResponseData data = ApiClient.delete(PLAN_API_URL+"/app/plan/"+planId, headers,request,ApiClient.FORMAT_DEFAULT);
		
		if(data.getCode()==200 || data.getCode()==201){
			 return true;
		}
		
		//plansVO = (CustomPlansVO) JsonUtil.jsonToBean(data.getBackData(), CustomPlansVO.class);
		
		return false;
	}
	
	public PlanDetailVO getPlanDetail(HttpServletRequest request,String planid){
		
		Map<String ,String> headers = getHeaders(); 
		headers.put("version", "242");
		ResponseData data = ApiClient.get(PLAN_API_URL+"/app/plan/"+planid, headers,request,ApiClient.FORMAT_DEFAULT);
		PlanDetailVO planDetail = null;
		try {
			System.out.println(data.getBackData());
			planDetail = (PlanDetailVO) JsonUtil.jsonToBean(data.getBackData(), PlanDetailVO.class);
		} catch (Exception e) {
			planDetail = null; 
			e.printStackTrace();
			logger.error(e.getStackTrace().toString());
		} 
		 
		return planDetail;
	}
	

	public PlanDayDetailVO getOnDayExercises(HttpServletRequest request,String planid,String dayId){

		Map<String ,String> headers = getHeaders(); 
		headers.put("version", "242");
		ResponseData data = ApiClient.get(PLAN_API_URL+"/app/plan/" + planid +"/" + dayId, headers,request,ApiClient.FORMAT_DEFAULT);
		PlanDayDetailVO planDayDetail = null;
		try {
			planDayDetail = (PlanDayDetailVO) JsonUtil.jsonToBean(data.getBackData(), PlanDayDetailVO.class);
		} catch (Exception e) {
			planDayDetail = null; 
			e.printStackTrace();
			logger.error(e.getStackTrace().toString());
		} 

		return planDayDetail;
	}

	public PlanUsersVO getPlanUsers(HttpServletRequest request,String planid){

		Map<String ,String> headers = getHeaders(); 
		ResponseData data = ApiClient.get(PLAN_API_URL+"/app/plan/"+planid+"/user?page=1&page_size=8", headers,request,ApiClient.FORMAT_DEFAULT);
		PlanUsersVO users = null;
		try {
			if(data.getCode()==200){
				users = (PlanUsersVO) JsonUtil.jsonToBean(data.getBackData(), PlanUsersVO.class);
			}
		} catch (Exception e) { 
			e.printStackTrace();
			logger.error(e.getStackTrace().toString());
		} 

		return users;
	}
	
	
	public ExerciseHistoriesVO getExerciseHistory(HttpServletRequest request,int page,int pageSize,Integer userId){

		Map<String ,String> headers = getHeaders();
		String url=PLAN_API_URL+"/web/history?page="+page+"&page_size="+pageSize;
		ResponseData data = null;
		if(null == userId){
			 ApiClient.get(url, headers,request,ApiClient.FORMAT_DEFAULT);			
		}else{
			data = ApiClient.get(url+"&userId="+userId, headers);
		}
		ExerciseHistoriesVO vo = null;
		try {
			if(data != null && data.getCode()==200){
				vo = (ExerciseHistoriesVO) JsonUtil.jsonToBean(data.getBackData(), ExerciseHistoriesVO.class);
			}
		} catch (Exception e) { 
			e.printStackTrace();
			logger.error(e.getStackTrace().toString());
		} 

		return vo;
	}
	
	public ExerciseHistoriesVO getExerciseWebHistory(HttpServletRequest request,int page,int pageSize,Integer userId){

		Map<String ,String> headers = getHeaders();
		String url=PLAN_API_URL+"/web/history?page="+page+"&page_size="+pageSize;
		ResponseData data = null;
		if(null == userId){
			 ApiClient.get(url, headers,request,ApiClient.FORMAT_DEFAULT);			
		}else{
			data = ApiClient.get(url+"&userId="+userId, headers);
		}
		ExerciseHistoriesVO vo = null;
		try {
			if(data != null && data.getCode()==200){
				vo = (ExerciseHistoriesVO) JsonUtil.jsonToBean(data.getBackData(), ExerciseHistoriesVO.class);
			}
		} catch (Exception e) { 
			e.printStackTrace();
			logger.error(e.getStackTrace().toString());
		} 

		return vo;
	}
	
	/**
	 * 获取推荐学习计划
	 * @return
	 */
	public PlanInfosVO getRecommendPlans(){
		PlanInfosVO plansVO = null;
		Map<String ,String> headers = getHeaders();
	 
		String url = PLAN_API_URL+"/app/plan?isRecommend=1";
		ResponseData data = ApiClient.get(url, headers);
		if(data.getCode()==200 || data.getCode()==201){
			try {
				plansVO = (PlanInfosVO) JsonUtil.jsonToBean(data.getBackData(), PlanInfosVO.class);
			} catch (Exception e) {
				plansVO = null;
				e.printStackTrace();
			}
		}
		return plansVO;
	}
	
	
	
	/**
	 * 首页-统计+我的计划
	 * @return
	 */
	public MyPlanVo getMyPlanIndex(HttpServletRequest request,Integer userId) {
		
		String url = PLAN_API_URL + "/app/home/page";
		Map<String ,String> headers = getHeaders();	
		ResponseData responseData = null;	
		if(null==userId){
			responseData = ApiClient.get(url, headers,request,"");
		}else{
			responseData=ApiClient.get(url+"?userId="+userId, headers);
		}
		if(responseData.getCode()==200){
			try {
				JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
				return (MyPlanVo) JsonUtil.jsonToBean(resultJson.getString("result"), MyPlanVo.class);
			} catch (Exception e) {				
				logger.error(e.getMessage());
			}
		}
		return null;
	}
	
	/**
	 * 首页-获取所有的推荐的练习
	 * @return
	 */
	public List<RecommendExerciseVO> getRecommendExerciseIndex() {
		String url = PLAN_API_URL + "/app/recommend/exercise";
		Map<String ,String> headers = getHeaders();
		
		ResponseData responseData = ApiClient.get(url, headers);
		if (responseData.getCode() == 200) {
			try {				
				JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
				return JSON.parseArray(resultJson.getString("result"), RecommendExerciseVO.class);						
			}
			catch (Exception e) {
				logger.error(e.getMessage());			
			}
		}	
		return null;
	}
	
	 
	public SpokensVO getEcerciseSpoken(String groupId,HttpServletRequest request) {
		String url = PLAN_API_URL + "/speakingexercise/question/lists.action?groupId=" + groupId;
		Map<String ,String> headers = getHeaders();
		
		ResponseData responseData = ApiClient.get(url, headers,request,ApiClient.FORMAT_DEFAULT);
		if(responseData.getCode()==200){
			try {
				return (SpokensVO) JsonUtil.jsonToBean(responseData.getBackData(), SpokensVO.class);
			} catch (Exception e) {				
				logger.error(e.getMessage());
			}
		}
		return null;
	}
	
	public TranslatesVO getEcerciseTranslate(String groupId,HttpServletRequest request) {
		String url = PLAN_API_URL + "/translate/question/lists.action?groupId=" + groupId;
		Map<String ,String> headers = getHeaders();
		
		ResponseData responseData = ApiClient.get(url, headers,request,ApiClient.FORMAT_DEFAULT);
		if(responseData.getCode()==200){
			try {
				return (TranslatesVO) JsonUtil.jsonToBean(responseData.getBackData(), TranslatesVO.class);
			} catch (Exception e) {				
				logger.error(e.getMessage());
			}
		}
		return null;
	}
	
	public SpokensVO saveEcerciseSpokenResult(String body,HttpServletRequest request) {
		String url = PLAN_API_URL + "/speakingexercise/result/save.action";
		Map<String ,String> headers = getHeaders();
		ResponseData responseData = ApiClient.postJsonData(url,body,headers,request,ApiClient.FORMAT_DEFAULT);
		if(responseData.getCode()==200){
			try {
				
				return (SpokensVO) JsonUtil.jsonToBean(responseData.getBackData(), SpokensVO.class);
			} catch (Exception e) {				
				logger.error(e.getMessage());
			}
		}
		return null;
	}
	
	
	public SpokensVO saveEcerciseTranslateResult(String body,HttpServletRequest request) {
		String url = PLAN_API_URL + "/translate/result/save.action";
		Map<String ,String> headers = getHeaders();
		ResponseData responseData = ApiClient.postJsonData(url,body,headers,request,ApiClient.FORMAT_DEFAULT);
		if(responseData.getCode()==200){
			try {
				
				return (SpokensVO) JsonUtil.jsonToBean(responseData.getBackData(), SpokensVO.class);
			} catch (Exception e) {				
				logger.error(e.getMessage());
			}
		}
		return null;
	}
	
	/**
	 * 首页-获取大家都在练习的 题用户
	 * @return
	 */
	public List<PeoplePracticingVo> getPeoplePracticingIndex(Integer page,Integer pageSize) {	
		String url = PLAN_API_URL + "/web/people/practicing?page="+page+"&page_size="+pageSize;
		Map<String ,String> headers = getHeaders();
		ResponseData responseData = ApiClient.get(url, headers);
		if (responseData.getCode() == 200) {
			try {				
				JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
				return JSON.parseArray(resultJson.getString("result"), PeoplePracticingVo.class);						
			}
			catch (Exception e) {
				logger.error(e.getMessage());			
			}
		}	
		return null;
		
	}
	
	public static Map<String ,String> getHeaders(){
		Map<String,String> headers = new HashMap<String,String>(); 
		headers.put("fromType", "web");
		return headers;
	}


	/**
	 * 增加或者取消点赞
	 * @Methods Name addOrCancelPraise
	 * @Create In 2016年10月13日 By dangxingfei@xiaoma.cn
	 * @param shareId
	 * @param type   type类型（1点赞，2取消点赞） 
	 * @param user
	 * @return boolean
	 */
	public boolean addOrCancelPraise(Integer shareId, Integer type, UserVO user) {
		String url = PLAN_API_URL + "/speakingswritings/praises/" + shareId.toString();
		Map<String ,String> headers = getHeaders();
		headers.put("Authorization", "bearer "+user.getAccess_token()); 
		
		ResponseData responseData  = null;
		//增加点赞
		if(type.intValue() == 1){
			 responseData = ApiClient.post(url, null, headers);
			 if (responseData.getCode() >= 200 && responseData.getCode() < 300) {
				 return true;
			 }
			 return false;
		}
		
		//删除点赞
		 responseData = ApiClient.delete(url, headers, null, null);
		 if (responseData.getCode() >= 200 && responseData.getCode() < 300) {
			 return true;
		 }
		 return false;
		
		
	}


	public NewTranslatesVO getNewTranslate(String groupId, HttpServletRequest request) {
		String url = PLAN_API_URL + "/new/sentence/lists?groupId=" + groupId;
		Map<String ,String> headers = getHeaders();
		
		ResponseData responseData = ApiClient.get(url, headers,request,ApiClient.FORMAT_DEFAULT);
		if(responseData.getCode()==200){
			try {
				return (NewTranslatesVO) JsonUtil.jsonToBean(responseData.getBackData(), NewTranslatesVO.class);
			} catch (Exception e) {				
				logger.error(e.getMessage());
			}
		}
		return null;
	}
	
	public DifficultSentenceGroupVO getExerciseDifficultSentence(String groupId, HttpServletRequest request) {
		String url = PLAN_API_URL + "/difficultSentence/groups/" + groupId;
		Map<String ,String> headers = getHeaders();
		
		ResponseData responseData = ApiClient.get(url, headers,request,ApiClient.FORMAT_DEFAULT);
		if(responseData.getCode()==200){
			try {
				return (DifficultSentenceGroupVO) JsonUtil.jsonToBean(responseData.getBackData(), DifficultSentenceGroupVO.class);
			} catch (Exception e) {				
				logger.error(e.getMessage());
			}
		}
		return null;
	}
	
	public PreparationVO getExercisePreview(String groupId, HttpServletRequest request) {
		String url = PLAN_API_URL + "/preparation/" + groupId;
		Map<String ,String> headers = getHeaders();
		
		ResponseData responseData = ApiClient.get(url, headers,request,ApiClient.FORMAT_DEFAULT);
		if(responseData.getCode()==200){
			try {
				return (PreparationVO) JsonUtil.jsonToBean(responseData.getBackData(), PreparationVO.class);
			} catch (Exception e) {				
				logger.error(e.getMessage());
			}
		}
		return null;
	}
	
}
