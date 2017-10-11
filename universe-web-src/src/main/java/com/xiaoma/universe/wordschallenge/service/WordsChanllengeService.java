package com.xiaoma.universe.wordschallenge.service;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.api.JsonUtil;
import com.xiaoma.universe.common.utils.PropertiesUtils;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.wordschallenge.model.WordsChallengeShares;
import com.xiaoma.universe.wordschallenge.model.WordsChallengeTeacherInfo;
import com.xiaoma.universe.wordschallenge.model.dto.WordsChallengeSharesDTO;
import com.xiaoma.universe.wordschallenge.model.dto.WordsChallengeUserRankDTO;
import com.xiaoma.universe.wordschallenge.model.dto.WordsChallengeUserResults;
import com.xiaoma.universe.wordschallenge.model.dto.WordsChallengeUserShareRateDTO;
/**
 * @author xiaoma
 *
 */
@Service("wordsChanllengeService")
public class WordsChanllengeService {

	private Logger logger = Logger.getLogger(WordsChanllengeService.class);
	
	public static String LEARN_API_URL = PropertiesUtils.getString("learn_api_url"); 
 
	
	public WordsChallengeSharesDTO getShareById(HttpServletRequest request,Integer shareId,String unionId,Integer hasDone){
		WordsChallengeSharesDTO VO = null;
		Map<String ,String> headers = getHeaders();  
		String url = LEARN_API_URL+"/wordsChallengeShares/h5/"+shareId+"?hasDone="+hasDone+"&unionId="+unionId; 
//		String url = "http://localhost:8080"+"/wordsChallengeShares/h5/"+shareId+"?unionId="+unionId; 
		ResponseData data = ApiClient.get(url, headers,request,ApiClient.FORMAT_DEFAULT);
		if(data.getCode()==200 || data.getCode()==201){
			try {
				VO = (WordsChallengeSharesDTO) JsonUtil.jsonToBean(data.getBackData(), WordsChallengeSharesDTO.class);
			} catch (Exception e) {
				VO = null;
				// TODO Auto-generated catch block
				e.printStackTrace();
				logger.error(e.getStackTrace().toString());
			}
		}
		return VO;
	}
	public WordsChallengeUserRankDTO getResult(HttpServletRequest request,Integer shareId,String unionId){
		WordsChallengeUserRankDTO VO = null;
		Map<String ,String> headers = getHeaders();  
		String url = LEARN_API_URL+"/wordsChallengeShares/h5/rank?shareId="+shareId+"&unionId="+unionId; 
		
		ResponseData data = ApiClient.get(url, headers,request,ApiClient.FORMAT_DEFAULT);
		if(data.getCode()==200 || data.getCode()==201){
			try {
				VO = (WordsChallengeUserRankDTO) JsonUtil.jsonToBean(data.getBackData(), WordsChallengeUserRankDTO.class);
			} catch (Exception e) {
				VO = null;
				// TODO Auto-generated catch block
				e.printStackTrace();
				logger.error(e.getStackTrace().toString());
			}
		}
		return VO;
	}
	
	public WordsChallengeUserShareRateDTO postResult(HttpServletRequest request,WordsChallengeUserResults wordsChallengeUserResults){
		WordsChallengeUserShareRateDTO VO = null;
		try {
			Map<String ,String> headers = getHeaders();  
			String url = LEARN_API_URL+"/wordsChallengeShares/h5/results"; 
//			String url = "http://localhost:8080"+"/wordsChallengeShares/h5/results"; 
			ResponseData data = ApiClient.postJsonData(url, JsonUtil.beanToJson(wordsChallengeUserResults), headers, null, ApiClient.connTimeout, ApiClient.readTimeout);
			if(data.getCode()==200 || data.getCode()==201){
				try {
					VO = (WordsChallengeUserShareRateDTO) JsonUtil.jsonToBean(data.getBackData(), WordsChallengeUserShareRateDTO.class);
				} catch (Exception e) {
					VO = null;
					// TODO Auto-generated catch block
					e.printStackTrace();
					logger.error(e.getStackTrace().toString());
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return VO;
	}
	
	
	
	public WordsChallengeShares getShareUrl(HttpServletRequest request){
		WordsChallengeShares VO = new WordsChallengeShares();
		Map<String ,String> headers = new HashMap<String ,String>();
		Map<String ,String> params = new HashMap<String ,String>();
		String url = LEARN_API_URL+"/wordsChallengeShares/h5/share";		
		ResponseData data = ApiClient.post(url, params, headers);
		String auth = request.getHeader("Authorization");
		if(StringUtils.isNotBlank(auth)){ 
			headers.put("Authorization", auth);
		}
		if(data.getCode()==200 || data.getCode()==201){
			try {
				VO = (WordsChallengeShares) JsonUtil.jsonToBean(data.getBackData(), WordsChallengeShares.class);
			} catch (Exception e) {
				VO = null;
				// TODO Auto-generated catch block
				e.printStackTrace();
				logger.error(e.getStackTrace().toString());
			}
		}
		return VO;
	}
	
	public WordsChallengeShares getShareUrl(HttpServletRequest request,Integer groupId,Integer userId){
		WordsChallengeShares VO = new WordsChallengeShares();
		Map<String ,String> headers = new HashMap<String ,String>();
		Map<String ,String> params = new HashMap<String ,String>();
		String url = LEARN_API_URL+"/wordsChallengeShares/h5/share/"+groupId+"?userId="+userId;	
		ResponseData data = ApiClient.post(url, params, headers);
		if(data.getCode()==200 || data.getCode()==201){
			try {
				VO = (WordsChallengeShares) JsonUtil.jsonToBean(data.getBackData(), WordsChallengeShares.class);
			} catch (Exception e) {
				VO = null;
				// TODO Auto-generated catch block
				e.printStackTrace();
				logger.error(e.getStackTrace().toString());
			}
		}
		return VO;
	}
	
	public WordsChallengeTeacherInfo getTeaRandom(HttpServletRequest request,Integer teaId,Integer rateId){
		WordsChallengeTeacherInfo VO = null;
		try {
			Map<String ,String> headers = getHeaders();  
			String url = LEARN_API_URL+"/wordsChallengeTeacherInfo/"+teaId+"?rateId="+rateId; 
//			String url = "http://localhost:8080"+"/wordsChallengeShares/h5/results"; 
			ResponseData data = ApiClient.get(url, headers);
			if(data.getCode()==200 || data.getCode()==201){
				try {
					VO = (WordsChallengeTeacherInfo) JsonUtil.jsonToBean(data.getBackData(), WordsChallengeTeacherInfo.class);
				} catch (Exception e) {
					VO = null;
					// TODO Auto-generated catch block
					e.printStackTrace();
					logger.error(e.getStackTrace().toString());
				}
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return VO;
	}
	
	public static Map<String ,String> getHeaders(){
		Map<String,String> headers = new HashMap<String,String>(); 
		headers.put("fromType", "web");
		return headers;
	} 
}
