/**
 * 
 */
package com.xiaoma.universe.microcourse.service;

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
import com.xiaoma.universe.learnplan.domain.vo.api.exercise.SpokensVO;
import com.xiaoma.universe.learnplan.domain.vo.api.exercise.TranslatesVO;
import com.xiaoma.universe.microcourse.domain.vo.MicroArticleDetailVO;
import com.xiaoma.universe.microcourse.domain.vo.MicroArticleShareReadVO;
import com.xiaoma.universe.microcourse.domain.vo.MicroArticleShareVO;
import com.xiaoma.universe.microcourse.domain.vo.MicroCourseDetailVO;
import com.xiaoma.universe.microcourse.domain.vo.MicroCoursesVO;
import com.xiaoma.universe.userlogin.controller.UserVO;  
/**
 * @author xiaoma
 *
 */
@Service("microCourseService")
public class MicroCourseService {

	private Logger logger = Logger.getLogger(MicroCourseService.class);
	
	public static String LEARN_API_URL = PropertiesUtils.getString("learn_api_url"); 
 
	public MicroCoursesVO getAllCourses(HttpServletRequest request,int page_size,int page){
		MicroCoursesVO VO = null;
		Map<String ,String> headers = getHeaders();  
		String url = LEARN_API_URL+"/microcourse/courses"; 
		if(page_size>0&& page>0){
			url = url+ "?page_size="+ page_size +"&page="+page;
		}
		
		ResponseData data = ApiClient.get(url, headers,request,ApiClient.FORMAT_DEFAULT);
		if(data.getCode()==200 || data.getCode()==201){
			try {
				VO = (MicroCoursesVO) JsonUtil.jsonToBean(data.getBackData(), MicroCoursesVO.class);
			} catch (Exception e) {
				VO = null;
				// TODO Auto-generated catch block
				e.printStackTrace();
				logger.error(e.getStackTrace().toString());
			}
		}
		return VO;
	}
	
   
	public MicroCourseDetailVO getCourseDetail(HttpServletRequest request,int courseId,boolean isFree){
		MicroCourseDetailVO VO = null;
		Map<String ,String> headers = getHeaders();
		String url = LEARN_API_URL+"/microcourse/courses/"+courseId;	
		if(isFree){
			url = url+"?free=1";
		}
		ResponseData data = ApiClient.get(url, headers,request,ApiClient.FORMAT_DEFAULT);
		if(data.getCode()==200 || data.getCode()==201){
			try {
				VO = (MicroCourseDetailVO) JsonUtil.jsonToBean(data.getBackData(), MicroCourseDetailVO.class);
			} catch (Exception e) {
				VO = null;
				// TODO Auto-generated catch block
				e.printStackTrace();
				logger.error(e.getStackTrace().toString());
			}
		}
		return VO;
	}
	
	public MicroArticleDetailVO getArticleDetail(HttpServletRequest request,int articleId){
		MicroArticleDetailVO VO = null;
		Map<String ,String> headers = getHeaders();
		String url = LEARN_API_URL+"/microcourse/article/"+articleId;		
		ResponseData data = ApiClient.get(url, headers,request,ApiClient.FORMAT_DEFAULT);
		if(data.getCode()==200 || data.getCode()==201){
			try {
				VO = (MicroArticleDetailVO) JsonUtil.jsonToBean(data.getBackData(), MicroArticleDetailVO.class);
			} catch (Exception e) {
				VO = null;
				// TODO Auto-generated catch block
				e.printStackTrace();
				logger.error(e.getStackTrace().toString());
			}
		}
		return VO;
	}
	

	public List<MicroArticleShareVO> getArticleShareUsers(HttpServletRequest request,int userid,int articleId){
		List<MicroArticleShareVO> dataBack = null;
		Map<String ,String> headers = getHeaders();
		String url = LEARN_API_URL+"/microarticle/share/users/"+ userid +"/"+articleId;
		ResponseData data = ApiClient.get(url, headers,request,ApiClient.FORMAT_DEFAULT);
		if(data.getCode()==200 || data.getCode()==201){
			try {
				dataBack =   (List<MicroArticleShareVO>) JsonUtil.jsonToList(data.getBackData(), MicroArticleShareVO.class);
			} catch (Exception e) {
				dataBack = null; 
				e.printStackTrace();
				logger.error(e.getStackTrace().toString());
			}
		}
		return dataBack;
	}
	
	public boolean articleShareRead(HttpServletRequest request,int userId,int articleId,String weixinUnionid,String weixinNickname,String weixinHeadimgurl){
 		
		if(userId<0 || articleId<0 || StringUtils.isBlank(weixinUnionid)){
			return false;
		}
		MicroArticleShareReadVO dataBack = null;
		String url = LEARN_API_URL+"/microarticle//share/read";

		Map<String ,String> headers = getHeaders(); 
		Map<String ,String> param = new HashMap<String ,String>();
		param.put("userId", ""+userId);
		param.put("articleId", ""+articleId);
		param.put("weixinUnionid", ""+weixinUnionid);
		if(StringUtils.isNotBlank(weixinNickname)){

			param.put("weixinNickname", weixinNickname);
		}
		if(StringUtils.isNotBlank(weixinHeadimgurl)){ 
			param.put("weixinHeadimgurl", weixinHeadimgurl);
		}

		ResponseData data = ApiClient.postJson(url, param,headers,request,ApiClient.FORMAT_DEFAULT);
		if(data.getCode()==200 || data.getCode()==201){
			try {
				dataBack =   (MicroArticleShareReadVO) JsonUtil.jsonToBean(data.getBackData(), MicroArticleShareReadVO.class);
				if(dataBack.getAcquisition()>0){
					return true;
				}
			} catch (Exception e) {
				dataBack = null; 
				e.printStackTrace();
				logger.error(e.getStackTrace().toString());
			}
		}
		return false;
	}
	
	public static Map<String ,String> getHeaders(){
		Map<String,String> headers = new HashMap<String,String>(); 
		headers.put("fromType", "web");
		return headers;
	} 
}
