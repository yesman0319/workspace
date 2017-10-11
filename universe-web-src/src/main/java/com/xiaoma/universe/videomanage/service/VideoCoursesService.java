package com.xiaoma.universe.videomanage.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.exception.InnerHandleException;
import com.xiaoma.universe.common.utils.PropertiesUtils;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.livemanage.model.BroadcastVO;
import com.xiaoma.universe.livemanage.service.LivelessionService;
import com.xiaoma.universe.videomanage.model.vo.CourseForWebByIdVo;
import com.xiaoma.universe.videomanage.model.vo.LessionsDetailForWeb;
import com.xiaoma.universe.videomanage.model.vo.LogForWeb;
import com.xiaoma.universe.videomanage.model.vo.PartsDetailForWeb;
import com.xiaoma.universe.videomanage.model.vo.PartsForWeb;
import com.xiaoma.universe.videomanage.model.vo.VideoCourses;
import com.xiaoma.universe.videomanage.model.vo.VideoGroups;
import com.xiaoma.universe.videomanage.model.vo.VideoSections;
import com.xiaoma.universe.videomanage.model.vo.VideosForPlan;

@Service("videoCoursesService")
public class VideoCoursesService{
	
	public static String VIDEO_COURSE = PropertiesUtils.getString("videocourse_api_url");
	private static Logger logger = Logger.getLogger(VideoCoursesService.class);
	
	@Autowired
	private LivelessionService livelessionService;
	
	/**
	 * 根据id获得课程
	 * @Title: getVideoCourseById 
	 * @Description: TODO
	 * @param @param id
	 * @param @return    设定文件 
	 * @return List<CourseForWebByIdVo>    返回类型 
	 * @throws
	 */
	public Map<String,Object> getVideoCourseById(Integer id,HttpServletRequest request) {
	    String lastPartsId = "";//最后播放的集
		Map<String,Object> map = new HashMap<String,Object>();
		String url = VIDEO_COURSE+"/courses/"+id+"?channel=web";
		Map<String,String> headers = new HashMap<String,String>();
		ResponseData responseData = ApiClient.get(url, headers,request,"");
		if (responseData.getCode() != 200) {
			throw new InnerHandleException("获得"+id+"课程失败");
		}
		JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());

		CourseForWebByIdVo courseForWebByIdVo = JSON.parseObject(resultJson.getString("results"), CourseForWebByIdVo.class);
		lastPartsId = courseForWebByIdVo.getLastPartId();
		JSONObject results= resultJson.getJSONObject("results");
		List<VideoCourses> listVideoCourses = JSON.parseArray(results.getString("listVideoCourses"), VideoCourses.class);
		List<VideoGroups> listVideoGroups = JSON.parseArray(results.getString("listVideoGroups"), VideoGroups.class);
		JSONObject mapVideoParts= results.getJSONObject("mapVideoParts");
		if(listVideoGroups!=null)
		{
			for(VideoGroups videoGroups:listVideoGroups)
			{
				Integer groupId = videoGroups.getId();
				List<PartsForWeb> videoParts = JSON.parseArray(mapVideoParts.getString(groupId.toString()), PartsForWeb.class);
				videoGroups.setListVideoParts(videoParts);
				if(videoParts!=null&&videoParts.size()>0)
				{
					if(lastPartsId==null||lastPartsId.equals(""))
					{
						for(PartsForWeb videoPart:videoParts)
						{
							//if(videoPart.getLastWatchId()!=null&&!videoPart.getLastWatchId().equals(""))
							if(videoPart.getLastWatchId()!=null&&videoPart.getLastWatchId() > 0)
							{
								lastPartsId = videoPart.getId().toString();
								break;
							}
						}
					}
					if(lastPartsId==null||lastPartsId.equals(""))
					{
						lastPartsId = videoParts.get(0).getId().toString();
					}
				}
			}
		}
		courseForWebByIdVo.setLastPartId(lastPartsId);
		map.put("videoCourses", courseForWebByIdVo);
		map.put("listVideoCourses", listVideoCourses);
		map.put("listVideoGroups", listVideoGroups);
		return map;
	}
	
	/**
	 * 选中集观看
	 * @Title: getContinueWatch 
	 * @Description: TODO
	 * @param @param id
	 * @param @param request
	 * @param @return    设定文件 
	 * @return Map<String,Object>    返回类型 
	 * @throws
	 */
	public Map<String,Object> getContinueWatchByParts(Integer courseId,Integer partId,HttpServletRequest request,String type,Integer videoid,Integer lessionid) {
		if(partId==null||partId<=0)
		{
			throw new InnerHandleException("继续观看"+partId+"视频集失败");
		}
		Map<String,Object> map = new HashMap<String,Object>();
		String url = VIDEO_COURSE+"/parts/"+partId+"?channel=web";
		
		Map<String,String> headers = new HashMap<String,String>();
		ResponseData responseData = ApiClient.get(url, headers,request,"");
		if (responseData.getCode() != 200) {
			throw new InnerHandleException("继续观看"+partId+"视频集失败");
		}
		JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());

		PartsDetailForWeb partsDetailForWeb = JSON.parseObject(resultJson.getString("results"), PartsDetailForWeb.class);
		JSONObject results= resultJson.getJSONObject("results");
		List<VideoSections> listVideoSections = JSON.parseArray(results.getString("listVideoSections"), VideoSections.class);
		JSONObject mapVideoLessions= results.getJSONObject("mapVideoLessions");
		Integer lastWatchId = partsDetailForWeb.getLastWatchId();
		Integer videoId = partsDetailForWeb.getLastWatchVideoId();
		if(listVideoSections!=null)
		{
			for(VideoSections videoSections:listVideoSections)
			{
				Integer sectionId = videoSections.getId();
				List<LessionsDetailForWeb> lessionsDetailForWebs = JSON.parseArray(mapVideoLessions.getString(sectionId.toString()), LessionsDetailForWeb.class);
				if(lessionsDetailForWebs!=null&&lessionsDetailForWebs.size()>0)
				{
					if(type!=null&&type.equals("isfree"))
					{
						for(LessionsDetailForWeb lessionsDetailForWeb:lessionsDetailForWebs)
						{
							if(("可以试看").equals(lessionsDetailForWeb.getCanSee()))
							{
								lastWatchId = lessionsDetailForWeb.getId();
								videoId = lessionsDetailForWeb.getVideoId();
								break;
							}
						}
					}
					if(type!=null&&(type.equals("iscommon")||type.equals("iscontinue"))&&(lastWatchId==null||lastWatchId<=0)&&(videoId==null||videoId<=0))
					{
						lastWatchId = lessionsDetailForWebs.get(0).getId();
						videoId = lessionsDetailForWebs.get(0).getVideoId();
					}
				}
				videoSections.setListLessionsDetailForWeb(lessionsDetailForWebs);
			}
		}
		if(videoId!=null&&videoId>0&&lessionid!=null&&lessionid>0)
		{
			videoId = videoid;
			lastWatchId = lessionid;
		}
		//获取第一个视频的播放参数
		if(lastWatchId!=null && lastWatchId>0 && videoId != null && videoId > 0)
		{
			partsDetailForWeb.setLastWatchId(lastWatchId);
			ResponseData res = livelessionService.getBroadcastDetail(videoId, lastWatchId, request);
			map.put("code", res.getCode());
			if(res.getCode() ==200){
				JSONObject result = (JSONObject) JSONObject.parse(res.getBackData());
				BroadcastVO vo = JSON.toJavaObject(result, BroadcastVO.class);
				if(vo != null && vo.getId().intValue() == videoId.intValue()){
					map.put("video", vo);
					map.put("type", vo.getType());
					map.put("onPlayLessionId", lastWatchId);
				}
			}
		}
		map.put("partsDetailForWeb", partsDetailForWeb);
		map.put("listVideoSections", listVideoSections);
		map.put("querytype", type);
		return map;
	}
	
	/**
	 * 免费加入
	 * @Title: freeJoin 
	 * @Description: TODO
	 * @param @param params
	 * @param @param request    设定文件 
	 * @return void    返回类型 
	 * @throws
	 */
	public String  freeJoin(Map<String,String> params,HttpServletRequest request) {
		String url = VIDEO_COURSE+"/permissions";
		Map<String,String> headers = new HashMap<String,String>();
		ResponseData responseData = ApiClient.post(url, params,headers,request,"ajax");
		if (responseData.getCode() != 200) {
			return "error";
		}
		return "success";
	}
	/**
	 * 购买课程
	 * @Title: buyCourses 
	 * @Description: TODO
	 * @param @param goodId
	 * @param @param userInfo
	 * @param @return    设定文件 
	 * @return String    返回类型 
	 * @throws
	 */
	public String buyCourses(String goodId,HttpServletRequest request) {
		String url = VIDEO_COURSE+"/permissions/addorder/"+goodId;
		Map<String,String> headers = new HashMap<String,String>();
		Map<String,String> params = new HashMap<String,String>();
		ResponseData responseData = ApiClient.post(url, params,headers,request,"ajax");
		JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
		String backUrl  = "";
		if (responseData.getCode() == 200) {
			backUrl = resultJson.getString("backUrl");
		}
		return backUrl;
	}
	/**
	 * 删除后加入
	 * @Title: delJoin 
	 * @Description: TODO
	 * @param @param premissionId
	 * @param @param userInfo    设定文件 
	 * @return void    返回类型 
	 * @throws
	 */
	public String delJoin(String premissionId,HttpServletRequest request) {
		Map<String,String> params = new HashMap<String,String>();
		params.put("id", premissionId);
		String url = VIDEO_COURSE+"/permissions/"+premissionId;
		Map<String,String> headers = new HashMap<String,String>();
		ResponseData responseData = ApiClient.put(url, params,headers,request,"ajax");
		if (responseData.getCode() != 200) {
			return "error";
		}
		return "success";
	}
	
	public String checkPremission(Integer premissionId,HttpServletRequest request) {
		Map<String,Object> params = new HashMap<String,Object>();
		params.put("id", premissionId);
		String url = VIDEO_COURSE+"/permissions/"+premissionId;
		Map<String,String> headers = new HashMap<String,String>();
		ResponseData responseData = ApiClient.get(url,headers,request,"ajax");
		JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
		if (responseData.getCode() != 200) {
			return "error";
		}
		else
		{
			JSONObject result = resultJson.getJSONObject("results");
			String status = result.getString("status");
			if(status!=null&&!status.equals(""))
			{
				if(status.equals("0"))
				{
					return "noBuy";
				}
				else
				{
					return "success";
				}
				
			}
			else
			{
				return "error";
			}
		}
	}
	/**
	 * 删除
	 * @Title: delJoin 
	 * @Description: TODO
	 * @param @param premissionId
	 * @param @param userInfo    设定文件 
	 * @return void    返回类型 
	 * @throws
	 */
	public String del(String courseId,HttpServletRequest request) {
		Map<String,String> params = new HashMap<String,String>();
		params.put("id", courseId);
		String url = VIDEO_COURSE+"/permissions/del/"+courseId;
		Map<String,String> headers = new HashMap<String,String>();
		ResponseData responseData = ApiClient.put(url, params,headers,request,"ajax");
		if (responseData.getCode() != 200) {
			return "error";
		}
		return "success";
	}
	/**
	 * 首页获取课程
	 * @Title: getListForIndex 
	 * @Description: TODO
	 * @param @return    设定文件 
	 * @return List<VideoCoursesVO>    返回类型 
	 * @throws
	 */
	public Map<String,Object> getListForIndex(Integer page_size,Integer page) {
		Map<String,Object> result = new HashMap<String,Object>();
		StringBuffer requestUrl = new StringBuffer();
		requestUrl.append(VIDEO_COURSE);
		requestUrl.append("/courses?page=" + page + "&rows=" + page_size);
		requestUrl.append("&queryType=list&channel=web&sort=sort_num&order=desc" );

		try {
			Map<String, String> headers = new HashMap<String, String>();
			ResponseData responseData = ApiClient.get(requestUrl.toString(), headers);

			if (responseData.getCode() == 200) {
				JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
				int counts = resultJson.getInteger("counts");
				List<VideoCourses> lists = JSON.parseArray(resultJson.getString("results"), VideoCourses.class);
				result.put("videocourses", lists);
				result.put("total", counts);
			}

		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage(), e);
		}
		return result;
	}
	/**
	 * 根据用户名获得其他用户日志
	 * @Title: getLogForUser 
	 * @Description: TODO
	 * @param @param userId
	 * @param @param page
	 * @param @param pageSize
	 * @param @return    设定文件 
	 * @return List<LogForWeb>    返回类型 
	 * @throws
	 */
	public Map<String,Object> getLogForUser(Integer userId,Integer page,Integer pageSize) {
		String url = VIDEO_COURSE+"/logs/user?userId="+userId+"&page="+page+"&pageSize="+pageSize;
		Map<String,String> headers = new HashMap<String,String>();
		ResponseData responseData = ApiClient.get(url, headers);
		List<LogForWeb> lists = new ArrayList<LogForWeb> ();
		 Map<String,Object> result = new HashMap<String,Object>();
		if (responseData.getCode() == 200||responseData.getCode() == 201) {
			JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
			lists = JSON.parseArray(resultJson.getString("list"), LogForWeb.class);
			Integer total = resultJson.getInteger("total");
			String message = resultJson.getString("message");
			result.put("list", lists);
			result.put("total", total);
			result.put("message", message);
		}
		return result;
	}
	/**
	 * 购买后回调
	 * @Title: delJoin 
	 * @Description: TODO
	 * @param @param premissionId
	 * @param @param userInfo    设定文件 
	 * @return void    返回类型 
	 * @throws
	 */
	public String buyCallBack(Map<String ,String> param ,HttpServletRequest request) {
		String localOrderSn = param.get("localOrderSn");
		String url = VIDEO_COURSE+"/permissions/buy/"+localOrderSn;
		Map<String,String> headers = new HashMap<String,String>();
		ResponseData responseData = ApiClient.post(url,param,headers,request,"ajax");
		if (responseData.getCode() == 200||responseData.getCode() == 201) {
			return "success";
		}
		return "error";
	}
	
	
	public Map<String,Object> planSee(Integer courseId,Integer lessionid,Integer videoId,HttpServletRequest request) {
		
		 Map<String,Object>  map = new HashMap<String,Object> ();
		String url = VIDEO_COURSE+"/courses/"+courseId+"?channel=plan";
		
		Map<String,String> headers = new HashMap<String,String>();
		ResponseData responseData = ApiClient.get(url, headers,request,"");
		if (responseData.getCode() != 200) {
			throw new InnerHandleException("查询课程"+courseId+"失败");
		}
		JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());

		List<VideosForPlan> videosForPlan = JSON.parseArray(resultJson.getString("results"), VideosForPlan.class);
		Integer lastWatchId = lessionid;//
		if(videoId!=null&&videoId>0&&lessionid!=null&&lessionid>0)
		{
			lastWatchId = lessionid;
		}
		//获取第一个视频的播放参数
		if(lastWatchId!=null && lastWatchId>0 && videoId != null && videoId > 0)
		{
			ResponseData res = livelessionService.getBroadcastDetail(videoId, lastWatchId, request);
			map.put("code", res.getCode());
			if(res.getCode() ==200){
				JSONObject result = (JSONObject) JSONObject.parse(res.getBackData());
				BroadcastVO vo = JSON.toJavaObject(result, BroadcastVO.class);
				if(vo != null && vo.getId().intValue() == videoId.intValue()){
					map.put("video", vo);
					map.put("type", vo.getType());
					map.put("onPlayLessionId", lastWatchId);
				}
			}
		}
		map.put("videosForPlan", videosForPlan);
		return map;
	}
	
}
