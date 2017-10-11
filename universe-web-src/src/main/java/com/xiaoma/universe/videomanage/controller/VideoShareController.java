package com.xiaoma.universe.videomanage.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xiaoma.rest.authentication.UniverseSession;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.common.utils.TimeHelper;
import com.xiaoma.universe.learnplan.util.UserUtil;
import com.xiaoma.universe.livemanage.model.BroadcastVO;
import com.xiaoma.universe.livemanage.service.LivelessionService;
import com.xiaoma.universe.userlogin.controller.UserVO;
import com.xiaoma.universe.videomanage.model.app.CourseForAppById;
import com.xiaoma.universe.videomanage.model.app.PartsDetailForApp;
import com.xiaoma.universe.videomanage.service.VideoH5Service;

/**
 * 联系分享的接口
 * @author Administrator
 */
@Controller
@RequestMapping("/courses")
public class VideoShareController  {

	@Autowired
	private VideoH5Service  videoH5Service;
	
	@Autowired
	private LivelessionService livelessionService;
	
	@RequestMapping("/h5/{id}.html")
	public String videoShare(HttpServletRequest request, HttpServletResponse response, Model model,  @PathVariable("id") Integer id ){
		if(id==null||id<=0)
		{
			return "h5/h5_500";
		}
		CourseForAppById courseForAppById= videoH5Service.getVideoCourseById(id,request);
		model.addAttribute("videocourses",courseForAppById);
		UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
		model.addAttribute("nickname", UserUtil.getUserNickName(user));
		return "h5/h5_video_courses";
	}
	@RequestMapping("/h5/parts/{id}.html")
	public String videoFree(HttpServletRequest request, HttpServletResponse response, Model model,  @PathVariable("id") Integer partId,Integer goodId ,Integer status){
		//判断用户是否登录, 如果没有跳转到登录界面
		UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
		if(user == null || user.getId() <= 0){
			return "redirect:/h5/show/login.html?successURL=" + getSuccessURL(request);
		}
		if(partId==null||partId<=0)
		{
			return "h5/h5_500";
		}
		PartsDetailForApp partsDetailForApp= videoH5Service.getVideoPartById(partId,user,request);
		if(partsDetailForApp==null&&status!=null&&status==2)
		{
			return "redirect:/h5/product/pay/"+goodId;	
		}
		Integer lastWatchId = partsDetailForApp.getLastWatchLessionId();
		Integer videoId = partsDetailForApp.getLastWatchVideoId();
		//获取第一个视频的播放参数
		if(lastWatchId!=null && lastWatchId>0 && videoId != null && videoId > 0)
		{
			ResponseData res = livelessionService.getBroadcastDetail(videoId, lastWatchId, request);
			if(res.getCode() ==200){
				JSONObject result = (JSONObject) JSONObject.parse(res.getBackData());
				BroadcastVO vo = JSON.toJavaObject(result, BroadcastVO.class);
				if(vo != null && vo.getId().intValue() == videoId.intValue()){
					model.addAttribute("video", vo);
					model.addAttribute("type", vo.getType());
					model.addAttribute("onPlayLessionId", lastWatchId);
				}
			}
		}
		model.addAttribute("videoparts", partsDetailForApp);
		return "h5/h5_v_courses_play";
	}
	
	@RequestMapping("/h5/watch/{partId}/{lessionId}/{videoId}.html")
	public String videoWatch(HttpServletRequest request, HttpServletResponse response, Model model, @PathVariable("partId") Integer partId , @PathVariable("lessionId") Integer lessionId ,  @PathVariable("videoId") Integer videoId){
		//判断用户是否登录, 如果没有跳转到登录界面
		UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
		if(user == null || user.getId() <= 0){
			return "redirect:/h5/show/login.html?successURL=" + getSuccessURL(request);
		}
		if(partId==null||partId<=0||lessionId==null||lessionId<=0||videoId==null||lessionId<=0)
		{
			return "h5/h5_500";
		}
		PartsDetailForApp partsDetailForApp= videoH5Service.getVideoPartById(partId,user,request);
		if(partsDetailForApp==null)
		{
			return "h5/h5_500";	
		}
		//获取第一个视频的播放参数
		if(lessionId!=null && lessionId>0 && videoId != null && videoId > 0)
		{
			ResponseData res = livelessionService.getBroadcastDetail(videoId, lessionId, request);
			if(res.getCode() ==200){
				JSONObject result = (JSONObject) JSONObject.parse(res.getBackData());
				BroadcastVO vo = JSON.toJavaObject(result, BroadcastVO.class);
				if(vo != null && vo.getId().intValue() == videoId.intValue()){
					model.addAttribute("video", vo);
					model.addAttribute("type", vo.getType());
					model.addAttribute("onPlayLessionId", lessionId);
				}
			}
		}
		model.addAttribute("videoparts", partsDetailForApp);
		return "h5/h5_v_courses_play";
	}
	
	/**
	 * 免费加入
	 * @Title: freeJoin 
	 * @Description: TODO
	 * @param @param request
	 * @param @param response
	 * @param @param model
	 * @param @return    设定文件 
	 * @return String    返回类型 
	 * @throws
	 */
	@RequestMapping(value="/h5/freejoin", method=RequestMethod.GET)
	public String freeJoin(HttpServletRequest request, HttpServletResponse response, Model model )
	{
		UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
		if(user == null || user.getId() <= 0){
			return "redirect:/h5/show/login.html?successURL=" + getSuccessURL(request);
		}
		String courseId = request.getParameter("courseId");
		String goodId = request.getParameter("goodId");
		String useType = "1";//使用类型（1按时间，2按次数）
		String status = "1";//能否使用（0不能使用，1能使用）
		Map<String,String> params = new HashMap<String,String>();
		params.put("goodId", goodId);
		params.put("courseId", courseId);
		params.put("useType", useType);
		params.put("status", status);
		String result = videoH5Service.freeJoin(params,user,request);
		if(result==null||result.equals("error"))
		{
			return "h5/h5_500";	
		}
		return "redirect:/courses/h5/"+courseId+".html";
	}
	
	/**
	 * 删除加入
	 * @Title: delJoin 
	 * @Description: TODO
	 * @param @param request
	 * @param @param response
	 * @param @param model
	 * @param @return    设定文件 
	 * @return String    返回类型 
	 * @throws
	 */
	@RequestMapping(value="/h5/deljoin", method=RequestMethod.GET)
	public String delJoin(HttpServletRequest request, HttpServletResponse response, Model model)
	{
		UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
		if(user == null || user.getId() <= 0){
			return "redirect:/h5/show/login.html?successURL=" + getSuccessURL(request);
		}
		String premissionId = request.getParameter("premissionId");
		String courseId = request.getParameter("courseId");
		if(premissionId==null||premissionId.equals(""))
		{
			return "h5/h5_500";
		}
		String result = videoH5Service.delJoin(premissionId,user,request);
		if(result==null||result.equals("error"))
		{
			return "h5/h5_500";	
		}
		return "redirect:/courses/h5/"+courseId+".html";
	}
    protected String getSuccessURL(HttpServletRequest request) {	
		String port = String.valueOf(request.getServerPort());
		if ("80".equals(port)) {
			port = "";
		} else {
			port = ":" + port;
		}
		String successURL =request.getScheme() + "://" + request.getServerName() + port + request.getContextPath() + request.getServletPath();
		String queryString = request.getQueryString();
		if (null != queryString) {
			successURL = successURL + "?" + queryString;
		}
		/*try {
			successURL = URLEncoder.encode(successURL, "UTF-8");
		} catch (UnsupportedEncodingException e) {
			logger.error("对当前请求的URL进行encode失败! url:" + successURL);
		}*/
		return successURL;

	}

}
