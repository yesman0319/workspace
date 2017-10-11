package com.xiaoma.universe.livemanage.controller;

import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xiaoma.rest.authentication.UniverseSession;
import com.xiaoma.universe.common.utils.PropertiesUtils;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.common.utils.StringUtils;
import com.xiaoma.universe.common.utils.TimeHelper;
import com.xiaoma.universe.information.controller.BaseController;
import com.xiaoma.universe.learnplan.domain.vo.api.PlanInfosVO;
import com.xiaoma.universe.learnplan.service.PlanService;
import com.xiaoma.universe.livemanage.model.BaseModel;
import com.xiaoma.universe.livemanage.model.BroadcastVO;
import com.xiaoma.universe.livemanage.model.LiveLessionDetailVO;
import com.xiaoma.universe.livemanage.model.LivelessionVO;
import com.xiaoma.universe.livemanage.response.ListResult;
import com.xiaoma.universe.livemanage.service.LivelessionService;
import com.xiaoma.universe.userlogin.controller.UserVO;

/**
 * 1、回放课程的视频列表
 * 2、直播课页面详情页面
 * 3、回播课详情页面
 * 4、今日直播的接口
 * 
 * @author Administrator
 */
@Controller
public class LivelessionController extends BaseController{

	private static Logger logger = Logger.getLogger(LivelessionController.class);
	
	private static String[] weekStrs = new String[] { "周日", "周一", "周二", "周三", "周四", "周五", "周六" };
	
	@Autowired
	private LivelessionService livelessionService;
	
	@Autowired
	private PlanService planService;
	
	//直播分享的参数(yztf&medium=web&campaign=直播课&campaignContent=uid1)
	private static String SHARE_STRING = "source=yztf&medium=%s&campaign=%s&campaignContent=%s";
	
	/**
	 * 获取回播的列表
	 * @param request
	 * @param response
	 * @param model
	 * @param pageModel
	 * @return
	 */
	@SuppressWarnings("unchecked")
	@RequestMapping("/replays")
	public String replay(HttpServletRequest request, HttpServletResponse response, Model model, BaseModel pageModel){
		
		
		 model.addAttribute("relayActive", "active");
		try {
			
			//获取推荐计划
			 PlanInfosVO plans = planService.getRecommendPlans();
			 if(plans != null && plans.getRows() != null && plans.getRows().size() > 0){
				 model.addAttribute("plans", plans.getRows());
			 }
			
			 //获取回放课程
			// pageModel.setRows(20);    //页面要求获取7天的数据，每天大约有4个直播课
			ListResult<?> result = livelessionService.getReplayList(pageModel);
			if(result == null || result.getResults() == null || result.getResults().size() <= 0){
				return "livemanage/replay_list";
			}
			
			//组装合适数据
			Map<String, List<LivelessionVO>> map = new LinkedHashMap<String, List<LivelessionVO>>();
			Map<String, String> weeks = new HashMap<String, String>();
			List<LivelessionVO> list = null;
			String dateStr = "";
			List<LivelessionVO> objs = (List<LivelessionVO>) result.getResults();
			for(LivelessionVO vo : objs){
				if(dateStr.equals(TimeHelper.date2String(vo.getStartTime(), "MM-dd"))){
					map.get(dateStr).add(vo);
					continue;
				}
				
				dateStr = TimeHelper.date2String(vo.getStartTime(), "MM-dd");
				list = new ArrayList<LivelessionVO>();
				list.add(vo);
				map.put(dateStr, list);
				
				//周几
				String day = weekStrs[TimeHelper.getDayOfWeek(vo.getStartTime()) - 1];
				weeks.put(dateStr, day);
			}
			
			model.addAttribute("datas", map);
			model.addAttribute("weeks", weeks);
			model.addAllAttributes(ListResult.getPaging(result));
			return "livemanage/replay_list";
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return "500";
		}

	}
	
	/**
	 * 判断用户对某个直播课的权限
	 * @param request
	 * @param response
	 * @param id
	 * @param model
	 */
	@RequestMapping("/livelession/permission/{id}.html")
	public void getLivelessionPermission(HttpServletRequest request, HttpServletResponse response, @PathVariable("id")Integer id, Model model){
		JSONObject json = new JSONObject();
		try {
			if(id == null || id <= 0){
				json.put("message", "id参数不正确");
				flushJson(json, response);
				return ;
			}
			
			//判断用户是否登录
			UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
			if(user == null || user.getId() <= 0){
				json.put("message", "用户没有登录");
				flushJson(json, response);
				return ;
			}
			
			ResponseData responseData = livelessionService.getLivelessionDeatilById(id, request);
			if(responseData == null){
				throw new Exception("服务器返回的数据为空");
			}
			
			//判断权限
			if(responseData.getCode() == 403){
				json.put("hasPermission", false);
				json.put("message", "用户没有权限");
				flushJson(json, response);
				return ;
			}
			
			if(responseData.getCode() == 401){
				json.put("message", "用户没有登录");
				flushJson(json, response);
				return ;
			}
			
			if(responseData.getCode() == 400){
				logger.info("服务器返回的数据出错，code = " + responseData.getCode() + "，message--" + responseData.getBackData());
				throw new Exception("服务器返回的数据出错，code = " + responseData.getCode() + "，message--" + responseData.getBackData());
			}
			
			json.put("hasPermission", true);
			flushJson(json, response);
			return ;
			
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			json.put("message", "系统错误，请稍后重试");
			flushJson(json, response);
			return ;
		}
	}
	
	/**
	 * 获取直播信息
	 * @param request
	 * @param response
	 * @param id
	 * @return
	 */
	@RequestMapping("/live/{id}.html")
	public String showLivelession(HttpServletRequest request, HttpServletResponse response, @PathVariable("id")Integer id, Model model){
		
		try {
			if(id == null || id <= 0){
				return "404";
			}
			//判断用户是否登录
			UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
			if(user == null || user.getId() <= 0){
				String backurl = request.getRequestURI();
				return "forward:/login?backurl="+backurl; 
			}
			
			//查询详情
			ResponseData responseData = livelessionService.getLivelessionDeatilById(id, request);
			if(responseData == null){
				throw new Exception("服务器返回的直播参数的数据是空值");
			}
			
			//没有登录
			if(responseData.getCode() == 401){
				String backurl = request.getRequestURI();
				return "forward:/login?backurl="+backurl; 
			}
			
			//参数错误
			if(responseData.getCode() == 400){
				logger.info("服务器返回的数据出错，code = " + responseData.getCode() + "，message--" + responseData.getBackData());
				return "404";
			}
			
			
			//查询今日直播课列表
			 List<LivelessionVO> lists = livelessionService.getTodayLivelessions();
			 
			//判断权限
			if(responseData.getCode() == 403){
				for(LivelessionVO vo : lists){
					if(vo.getId().intValue() == id.intValue()){
						model.addAttribute("planId", vo.getPlanId());
						model.addAttribute("planName", vo.getPlanName());
						 model.addAttribute("detail", vo);
						 break;
					}
				}
				model.addAttribute("lists", lists);
				model.addAttribute("permission","no");
				return  "livemanage/live_lession";
			}
			
			if(responseData.getCode() != 200){
				throw new Exception("服务器返回的数据出错，code = " + responseData.getCode() + "，message--" + responseData.getBackData());
			}
			
			//解析参数
			JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
			LiveLessionDetailVO detail = JSON.toJavaObject(resultJson, LiveLessionDetailVO.class);
			
			if(detail == null || detail.getId() == null || detail.getId() <= 0){
				return "404";
			}
			
			//播放brocastId
			String playUrl = detail.getPlayUrl();
			if(!StringUtils.isEmpty(playUrl)){
				if(playUrl.contains("?token")){
					model.addAttribute("sign", playUrl.substring((playUrl.indexOf("-") + 1), playUrl.indexOf("?")));
				}else{
					model.addAttribute("sign", playUrl.substring((playUrl.indexOf("-") + 1), playUrl.length()));
				}
			}
			 
			 model.addAttribute("user", user);
			 model.addAttribute("detail", detail);
			 model.addAttribute("lists", lists);
			 model.addAttribute("permission","yes");
			 model.addAttribute("listCampaign",URLEncoder.encode("今日直播列表","UTF-8"));
			 model.addAttribute("detailCampaign",URLEncoder.encode(detail.getName()+"直播课","UTF-8"));
			     
			 return "livemanage/live_lession";
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return "500";
		}
	}
	
	/**
	 * 判断用户对某个直播课的权限
	 * @param request
	 * @param response
	 * @param id
	 * @param model
	 */
	@RequestMapping("/replay/permission/{id}.html")
	public void getReplayPermission(HttpServletRequest request, HttpServletResponse response, @PathVariable("id")Integer id, Model model){
		JSONObject json = new JSONObject();
		try {
			if(id == null || id <= 0){
				json.put("message", "id参数不正确");
				flushJson(json, response);
				return ;
			}
			
			//判断用户是否登录
			UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
			if(user == null || user.getId() <= 0){
				json.put("message", "用户没有登录");
				json.put("code", 401);
				flushJson(json, response);
				return ;
			}
			
			ResponseData responseData = livelessionService.getBroadcastDetail(id, null, request);
			if(responseData == null){
				throw new Exception("服务器返回的数据为空");
			}
			
			if(responseData.getCode() == 401){
				json.put("message", "用户没有登录");
				json.put("code", 401);
				flushJson(json, response);
				return ;
			}
			
			if(responseData.getCode() == 400){
				logger.info("服务器返回的数据出错，code = " + responseData.getCode() + "，message--" + responseData.getBackData());
				throw new Exception("服务器返回的数据出错，code = " + responseData.getCode() + "，message--" + responseData.getBackData());
			}
			
			//判断权限
			if(responseData.getCode() == 403){
				json.put("code", 403);
				json.put("message", "用户没有权限");
				flushJson(json, response);
				return ;
			}
			
			json.put("code", 200);
			flushJson(json, response);
			return ;
			
		} catch (Exception e) {
			logger.error(e.getMessage(),e);
			json.put("message", "系统错误，请稍后重试");
			json.put("code", 500);
			flushJson(json, response);
			return ;
		}
	}
	
	
	
	/**
	 * 观看回放课
	 * @param request
	 * @param response
	 * @param id
	 */
	@RequestMapping("/replays/{id}.html")
	public String showBroadcast(HttpServletRequest request, HttpServletResponse response, @PathVariable("id")Integer id, Model model){
		model.addAttribute("relayActive", "active");

		try {
			//判断用户是否登录
			UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
			if(user == null || user.getId() <= 0){
				String backurl = request.getRequestURI();
				return "forward:/login?backurl="+backurl; 
			}		
			
			//查询回放课
			ResponseData responseData = livelessionService.getBroadcastDetail(id, null, request);
			if(responseData == null){
				throw new Exception("服务器返回的数据是空值");
			}
			
			if(responseData.getCode() == 403){
				model.addAttribute("returnUrl","/replay.html");
				return "warning";
			}
			
			if(responseData.getCode() == 401){
				String backurl = request.getRequestURI();
				return "forward:/login?backurl="+backurl; 
			}
			
			if(responseData.getCode() == 400){
				logger.info("服务器返回的数据出错，code = " + responseData.getCode() + "，message--" + responseData.getBackData());
				return "404";
			}
			
			if(responseData.getCode() != 200){
				throw new Exception("服务器返回的数据出错，code = " + responseData.getCode() + "，message--" + responseData.getBackData());
			}
			
			//播放参数详情
			JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
			BroadcastVO detail = JSON.toJavaObject(resultJson, BroadcastVO.class);
			if(detail == null || detail.getId() == null || detail.getId() <= 0){
				return "404";
			}
			model.addAttribute("broadcast", detail);
			model.addAttribute("detailCampaign", URLEncoder.encode(detail.getName()+"回放课","UTF-8"));
			
			//查询对应的当天的回放课程
			String dateTime = TimeHelper.date2String(detail.getStartTime());
			String url =  PropertiesUtils.getString("livelession_api_url") + "/videos/search/?startTimeStr=" + dateTime + " 00:00:00&endTimeStr="+dateTime + " 23:59:59"; 
			url= url.replaceAll(" ", "%20");
			 List<LivelessionVO> lists = livelessionService.getBroadcast(url);
			 if(lists != null && lists.size() > 0){
				 model.addAttribute("lists", lists);
			 }
			 model.addAttribute("dateTime", dateTime);
			 model.addAttribute("user", user);
			 return "livemanage/replay_broadcast";
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return "500";
		}
	}
	
	
	/**
	 * 更改加入直播的人数
	 * @param request
	 * @param response
	 */
	@RequestMapping("/livelession/join.html")
	public void joinCourseNum(HttpServletRequest request, HttpServletResponse response){
		Map<String,String> params = new HashMap<String,String>();
				@SuppressWarnings("rawtypes")
				Map requestParams = request.getParameterMap();
				
				//2、解析参数
				@SuppressWarnings("rawtypes")
				Iterator iter = requestParams.keySet().iterator();
				
				while(iter.hasNext()){
					String name = (String) iter.next();
					String [] values = (String[]) requestParams.get(name);
					String valueStr = "";
					for(int i=0; i< values.length; i++){
						valueStr = (i == values.length - 1) ? valueStr + values[i] : valueStr + values[i] + ",";
					}
					params.put(name, valueStr);
				}
				
				logger.info("人数推送--------------------" + params.get("Action") + "，totalusernum = " + params.get("totalusernum"));
				
				if("101".equals(params.get("Action"))){
					String classNo = params.get("ClassNo");
					if(params.containsKey("totalusernum")){
						int totalusernum = Integer.valueOf(params.get("totalusernum"));
						if(!StringUtils.isEmpty(classNo) && totalusernum > 0){
							livelessionService.joinCourseNum(classNo, totalusernum);
						}
					}
				}
	}
	
	// /user/app/userinfo/update?id=2&avatar=2&phone=2&email=2&nickname=2&role=2
	/**
	 * 增加用户昵称
	 * @param request
	 * @param response
	 * @param nickname
	 */
	@RequestMapping("/livelession/nickname.html")
	public void updateUserNickname(HttpServletRequest request, HttpServletResponse response, String nickname){
		JSONObject json = new JSONObject();
		try {
			if(StringUtils.isEmpty(nickname)){
				json.put("success", false);
				flushJson(json, response);
				return;
			}
			
			UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
			if(user == null || user.getId() <= 0){
				json.put("success", false);
				flushJson(json, response);
				return;
			}
			
			user.setNickname(nickname);
			 boolean flag = livelessionService.updateUserNickname(user);
			 
			if(flag){
				UniverseSession.setAttribute("userInfo", user);
				json.put("success", true);
				json.put("user", user);
				flushJson(json, response);
				return;
			}
			
			json.put("success", false);
			flushJson(json, response);
			return;
			
		} catch (Exception e) {
			logger.error(e.getMessage() ,e);
			json.put("success", false);
			flushJson(json, response);
			return;
		}
	}
	
	public static void main(String[] args) {
		Date date=new Date(); // 创建日期对象
	    System.out.printf("全部日期和时间信息：%tc%n", date);//格式化输出日期或时间
	    System.out.printf("年-月-日格式：%tF%n", date);
	    System.out.printf("月/日/年格式：%tD%n", date);
	    System.out.printf("HH:MM:SS PM格式(12时制)：%tr%n", date);
	    System.out.printf("HH:MM:SS格式(24时制)：%tT%n", date);
	}
	
}
