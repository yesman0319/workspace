package com.xiaoma.universe.personal.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.exception.InnerHandleException;
import com.xiaoma.universe.common.utils.PropertiesUtils;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.videomanage.model.vo.MyCoursesForWebVo;
@Service("personalService")
public class PersonalService {
	
	public static String VIDEO_COURSE = PropertiesUtils.getString("videocourse_api_url");
	/**
	 * 个人中心
	 * @Title: getMyVideoCourse 
	 * @Description: TODO
	 * @param @param request
	 * @param @param response
	 * @param @param model
	 * @param @param pageModel
	 * @param @return    设定文件 
	 * @return String    返回类型 
	 * @throws
	 */
	/**
	 * 个人中心我的课程
	 * @Title: getMyVideoCourse 
	 * @Description: TODO
	 * @param @param pageModel
	 * @param @return    设定文件 
	 * @return List<VideoCoursesVO>    返回类型 
	 * @throws
	 */
	public Map<String,Object> getMyVideoCourse(Integer page_size,Integer page,HttpServletRequest request) {
		Map<String,Object>  mapResult = new HashMap<String,Object> ();
		String url = VIDEO_COURSE+"/courses?page="+page+ "&rows=" +page_size+"&channel=web&queryType=my";
		Map<String,String> headers = new HashMap<String,String>();
		ResponseData responseData = ApiClient.get(url, headers,request,"");
		if (responseData.getCode() != 200) {
			throw new InnerHandleException("获得用户课程失败");
		}
		JSONObject json = (JSONObject) JSONObject.parse(responseData.getBackData());
		JSONObject resultJson = json.getJSONObject("results");
		List<MyCoursesForWebVo> lists = JSON.parseArray(resultJson.getString("list"), MyCoursesForWebVo.class);
		Integer total = resultJson.getInteger("total");
		mapResult.put("list", lists);
		mapResult.put("total", total);
		return mapResult;
	}
	
}
