package com.xiaoma.universe.livemanage.service;

import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.contant.WeekEnum;
import com.xiaoma.universe.common.utils.PropertiesUtils;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.common.utils.StringUtils;
import com.xiaoma.universe.common.utils.TimeHelper;
import com.xiaoma.universe.livemanage.model.BaseModel;
import com.xiaoma.universe.livemanage.model.BroadcastVO;
import com.xiaoma.universe.livemanage.model.LivelessionVO;
import com.xiaoma.universe.livemanage.response.ListResult;
import com.xiaoma.universe.userlogin.controller.UserVO;

@Service("livelessionService")
public class LivelessionService {
	
	private Logger logger = Logger.getLogger(LivelessionService.class);
	
	public static final String LIVELESSION_API_URL = PropertiesUtils.getString("livelession_api_url");
	
	private  static final String user_api_info = PropertiesUtils.getString("user_api_info"); 

	/**
	 * 分页获取回放课程的数据
	 * @param model
	 * @param vo
	 * @return
	 */
	@SuppressWarnings({ "rawtypes", "unchecked" })
	public ListResult getReplayList(BaseModel model){

		
		String url = LIVELESSION_API_URL+"/videos/search/?page="+model.getPage() + "&rows=" + model.getRows();
		
		Map<String ,String> headers = getHeaders();
		ResponseData responseData = ApiClient.get(url, headers);
		if (responseData.getCode() != 200) {
			return null;
		}
		
		JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
		int counts = resultJson.getInteger("counts");
		List<LivelessionVO> lists = JSON.parseArray(resultJson.getString("results"), LivelessionVO.class);
		if(lists == null || lists.size() <= 0){
			return null;
		}
		
		ListResult result = new ListResult<>();
		result.setResults(lists);
		result.setCounts(counts);
		result.setPage(model.getPage());
		result.setRows(model.getRows());
		return result;
	}
	
	
	/**
	 * 获取首页直播列表
	 * @param vo
	 * @param model
	 * @return
	 */
	public List<LivelessionVO> getIndexLivelessions(Integer rows){
		if(rows == null || rows <= 0){
			rows = 3;
		}
		String url = LIVELESSION_API_URL+"/livelessions/?page=1&rows="+rows+"&position=web";
		//String url = "http://127.0.0.1/videos/livelessions/?page=1&rows="+rows+"&position=web";
		Map<String ,String> headers = getHeaders();
		ResponseData responseData = ApiClient.get(url, headers);
		if (responseData.getCode() != 200) {
			return null;
		}
		
		JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
		List<LivelessionVO> lists = JSON.parseArray(resultJson.getString("results"), LivelessionVO.class);
		if(lists == null || lists.size() <= 0){
			return null;
		}
		for(LivelessionVO vo : lists){
			vo.setPosition(getDateTimeStr(vo.getStartTime()));
		}
		return lists;
	}
	
	/**
	 * 获取周几
	 * @param date
	 * @return
	 */
	public String getDateTimeStr(Date date){
		Date todayZeroTime = TimeHelper.getZeroTimeDate();
		if(TimeHelper.sub2Date(TimeHelper.getZeroTimeDate(date),todayZeroTime) <= 0){
			return "今日";
		}
		int week = TimeHelper.getDayOfWeek(date) - 1;
		return WeekEnum.getKeyByValue(week);
	}
	
	
	/**
	 * 暂时id可以用  1
	 * 更具产品线获取对应的直播课
	 * @param id    计划中关联的直播课的产品线id
	 * @param rows   查询多少条
	 * @return
	 */
	public List<LivelessionVO> getLivelessionsByProductId(Integer id, Integer rows){
		if(id == null || id <= 0){
			return null;
		}
		if(rows == null || rows <= 0){
			rows = 3;
		}
		String url = LIVELESSION_API_URL+"/livelessions/?page=1&rows="+rows+"&position=index&productId=" + id;
		Map<String ,String> headers = getHeaders();
		ResponseData responseData = ApiClient.get(url, headers);
		if (responseData.getCode() != 200) {
			return null;
		}
		
		JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
		List<LivelessionVO> lists = JSON.parseArray(resultJson.getString("results"), LivelessionVO.class);
		if(lists == null || lists.size() <= 0){
			return null;
		}
		return lists;
	}
	
	
	
	
	private Map<String ,String> getHeaders(){
		Map<String,String> headers = new HashMap<String,String>();
		headers.put("Content-Type", "application/json");
		headers.put("fromType", "web");
		return headers;
	}


	/**
	 * 根据直播id获取直播的详情
	 * @param id
	 * @return
	 */
	public ResponseData getLivelessionDeatilById(Integer id,HttpServletRequest request) {
		ResponseData responseData = null;
		if(id == null || id <= 0){
			 responseData = new ResponseData();
			 responseData.setCode(404);
			 responseData.setBackData("参数异常");
			return null;
		}
		
		String url = LIVELESSION_API_URL+"/livelessions/" + id;
		Map<String ,String> headers = getHeaders();
		 responseData = ApiClient.get(url, headers,request,"");
		 return responseData;
	}
	
	
	/**
	 * 获取当天的所有直播课
	 * @return
	 */
	public List<LivelessionVO> getTodayLivelessions(){
		String todayStr = TimeHelper.date2String(TimeHelper.getZeroTimeDate(),"yyyy-MM-dd");
		String url = LIVELESSION_API_URL+"/livelessions/?sort=lessions.start_time&order=asc&startTimeStr=" + todayStr + " 00:00:00&endTimeStr="+todayStr + " 23:59:59"; 
		url= url.replaceAll(" ", "%20");
		
		Map<String ,String> headers = getHeaders();
		ResponseData responseData = ApiClient.get(url, headers);
		if (responseData.getCode() != 200) {
			return null;
		}
		
		JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
		List<LivelessionVO> lists = JSON.parseArray(resultJson.getString("results"), LivelessionVO.class);
		if(lists == null || lists.size() <= 0){
			return null;
		}
		//Collections.reverse(lists);
		return lists;
	}


	/**
	 * 获取h5分享的列表直播列表
	 * @return
	 */
	public Map<String, List<LivelessionVO>> getShareCourses() {
		
		Map<String, List<LivelessionVO>> map = new LinkedHashMap<String, List<LivelessionVO>>();
		
			//昨天
				/*String previousTime = TimeHelper.date2String(TimeHelper.addDate(new Date(), -1));
				String preUrl = LIVELESSION_API_URL+"/videos/search/?startTimeStr=" + previousTime + " 00:00:00&endTimeStr="+previousTime + " 23:59:59"; 
				preUrl= preUrl.replaceAll(" ", "%20");
				Map<String ,String> headers = getHeaders();
				ResponseData responseData = ApiClient.get(preUrl, headers);
				if (responseData.getCode() != 200) {
					return null;
				}
				
				JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
				List<LivelessionVO> previousLists = JSON.parseArray(resultJson.getString("results"), LivelessionVO.class);
				if(previousLists != null && previousLists.size() > 0){
					map.put("昨天", previousLists);
				}*/
				
			//今天
			 List<LivelessionVO> todays = this.getTodayLivelessions();
			 if(todays != null && todays.size() > 0){
				 map.put("今天", todays);
			 }
			 
			 //明天
/*			 String tomorrowTime = TimeHelper.date2String(TimeHelper.addDate(new Date(), 1));
				String tomorrowUrl = LIVELESSION_API_URL+"/livelessions/?startTimeStr=" + tomorrowTime + " 00:00&endTimeStr="+tomorrowTime + " 23:59"; 
				tomorrowUrl= tomorrowUrl.replaceAll(" ", "%20");
				responseData = null;
				 responseData = ApiClient.get(tomorrowUrl, headers);
				if (responseData.getCode() != 200) {
					return null;
				}
				 resultJson = null;
				 resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
				List<LivelessionVO> tomorrowLists = JSON.parseArray(resultJson.getString("results"), LivelessionVO.class);
				if(tomorrowLists != null && tomorrowLists.size() > 0){
					map.put("明天", tomorrowLists);
				}*/
		return map;
	}
	
	
	/**
	 * 根据产品类型获取相关的回放视频
	 * @param productTypeId
	 * @param rows
	 * @return
	 */
	public List<BroadcastVO> getRelatedBroadcast(int productTypeId, int rows){
		
		String url = LIVELESSION_API_URL+"/videos/search/?productTypeId="+productTypeId + "&rows=" + rows;
		Map<String ,String> headers = getHeaders();
		ResponseData responseData = ApiClient.get(url, headers);
		if (responseData.getCode() != 200) {
			return null;
		}
		JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
		List<BroadcastVO> lists = JSON.parseArray(resultJson.getString("results"), BroadcastVO.class);
		if(lists == null || lists.size() <= 0){
			return null;
		}
		
		return lists;
	}
	
	/**
	 * 获取回放详情
	 * @param id
	 * @param request
	 * @return
	 */
	public BroadcastVO getPlayBackDeatilById(Integer id,HttpServletRequest request) {
		if(id == null || id <= 0){
			return null;
		}
		
		String url = LIVELESSION_API_URL+"/videos/genseecc/" + id;
		Map<String ,String> headers = getHeaders();
		ResponseData responseData = ApiClient.get(url, headers,request,"");
		if (responseData.getCode() != 200) {
			return null;
		}
		
		JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
		BroadcastVO detail = JSON.toJavaObject(resultJson, BroadcastVO.class);
		if(detail == null || detail.getId() == null || detail.getId() <= 0){
			return null;
		}
		
		return detail;
	}


	/**
	 * 获取回放详情和CC视频详情
	 * @param id
	 * @param lessionId  视频课程中对应的最小单位的主键
	 * @return
	 */
	public ResponseData  getBroadcastDetail(Integer id, Integer lessionId,  HttpServletRequest request) {
		ResponseData responseData = null;
		if(id == null || id <= 0){
			 responseData = new ResponseData();
			 responseData.setCode(404);
			 responseData.setBackData("参数异常");
			return null;
		}
		
		String url = LIVELESSION_API_URL+"/videos/genseecc/" + id;
		if(lessionId != null && lessionId > 0){
			url += "?lessionId=" + lessionId.toString();
		}
		
		Map<String ,String> headers = getHeaders();
		 responseData = ApiClient.get(url, headers,request,"");
		
		return responseData;
		
	}
	
	
	/**
	 * 根据url获取对应的回放课程
	 * @param vo
	 * @return
	 */
	public List<LivelessionVO> getBroadcast(String url){
		Map<String ,String> headers = getHeaders();
		ResponseData responseData = ApiClient.get(url, headers);
		if (responseData.getCode() != 200) {
			return null;
		}
		
		JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
		List<LivelessionVO> list = JSON.parseArray(resultJson.getString("results"), LivelessionVO.class);
		return list;
	}


	/**
	*用户加入直播课时，展示互动访问推送房间内的人数
	 * @param params
	 */
	public void joinCourseNum(String classNo, int totalusernum) {
		if(StringUtils.isEmpty(classNo) || totalusernum <= 0){
			return;
		}
		
		String url = LIVELESSION_API_URL + "/livelessions/gensees/?classNo="+classNo + "&totalusernum=" + totalusernum;;
		//String url = "http://127.0.0.1/video-center-api/livelessions/gensees/?classNo="+classNo + "&totalusernum=" + totalusernum;;
		
		Map<String ,String> headers = getHeaders();
		ResponseData responseData = ApiClient.get(url, headers);
		logger.info("直播人数人数推送返回的结果，responseData = " + responseData.getCode() + "，message = " + responseData.getBackData());
		if(responseData.getCode() == 200){
			logger.info("有新用户加入直播，当前观看直播的最大的人数是 ：" + responseData.getBackData());
		}
		
	}


	/**
	 * 更新用户昵称
	 * @param user
	 */
	public boolean updateUserNickname(UserVO user) {
		Map<String, String> paramMap = new HashMap<String, String>();
		paramMap.put("id", String.valueOf(user.getId()));
		paramMap.put("nickname", user.getNickname());
		
		Map<String ,String> headers = new HashMap<String, String>();
		headers.put("fromType", "web");
		ResponseData responseData = ApiClient.post(user_api_info + "/update", paramMap, headers);
		if(responseData.getCode() == 200){
			return true;
		}
		return false;
	}
	
	
}
