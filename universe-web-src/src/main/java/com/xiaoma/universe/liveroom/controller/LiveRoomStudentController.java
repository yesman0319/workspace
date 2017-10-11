/**
 * 
 */
package com.xiaoma.universe.liveroom.controller;

import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.xiaoma.rest.authentication.UniverseSession;
import com.xiaoma.rest.authentication.util.JsonUtil;
import com.xiaoma.rest.liveroom.CacheLiveRoom;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.contant.Contant;
import com.xiaoma.universe.common.utils.PropertiesUtils;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.liveroom.model.dto.LiveCourseDto;
import com.xiaoma.universe.liveroom.model.dto.LiveTopicDto;
import com.xiaoma.universe.liveroom.model.dto.LiveTopicsListDto;
import com.xiaoma.universe.liveroom.model.dto.StatusDto;
import com.xiaoma.universe.liveroom.model.vo.LiveCourseVo;
import com.xiaoma.universe.liveroom.service.LiveRoomService;
import com.xiaoma.universe.userlogin.controller.UserVO;
import com.xiaoma.universe.wechat.model.dto.TWechatUsers;
import com.xiaoma.universe.wechat.service.LoginService;

/**
 * @author xiaoma
 *
 */
@Controller 
@RequestMapping("/liveroom/student")
public class LiveRoomStudentController { 
	
	private static final Logger logger = LoggerFactory.getLogger(LiveRoomTeacherController.class);

	@Autowired
	private LiveRoomService liveRoomService; 
	@Autowired
	private LoginService loginService; 
	
	/**
	 * 登录页
	 * @Title: loginInit 
	 * @Description: TODO
	 * @param @param request
	 * @param @param response
	 * @param @param model
	 * @param @param errorMsg
	 * @param @return    设定文件 
	 * @return String    返回类型 
	 * @throws
	 */
	@RequestMapping("/index")
	public String loginInit(HttpServletRequest request, HttpServletResponse response,Model model,String errorMsg) {
		UserVO userInfo = (UserVO) UniverseSession.getAttribute("userInfo"); 
		String wechatcode = request.getParameter("code");
//		String wechatcode = "051hhRY11JZhOL13EpX11DWIY11hhRY2";
		if(userInfo==null||userInfo.getId()<0)
		{
			//进入绑定页
			model.addAttribute("imageCodeUrl", PropertiesUtils.getString("h5_fastlogin_image_code_url"));
			model.addAttribute("wechatcode", wechatcode);
			return "liveroom/liveroom";
		}
		else
		{
			//该用户是学生
			String message = "";
			StringBuffer requestUrl = new StringBuffer(); //获得学生列表
			requestUrl.append(Contant.GET_LIVE_ROOM_DETAIL_STU);
			try {
				Map<String, String> headers = new HashMap<String, String>();
//				headers.put("Authorization", "bearer 00cdc49b3f2b4166a01eef56d3ea5eed");
//				ResponseData responseData = ApiClient.get(requestUrl.toString(),headers);
				ResponseData responseData = ApiClient.get(requestUrl.toString(), headers,request,"");
				LiveTopicsListDto liveTopicsListDto = JSONObject.parseObject(responseData.getBackData(),LiveTopicsListDto.class);
				if(responseData.getCode()==200)
				{
					//返回成功
					int status = liveTopicsListDto.getStatus();
					if(status==0)
					{
						//已完成创建
						model.addAttribute("liveTopicVo", liveTopicsListDto);
					}
					else if(status==1)
					{
						model.addAttribute("errMsg", "请联系管理员创建直播间");
					}
				}
				else
				{
					message = liveTopicsListDto.getMessage();
					model.addAttribute("errMsg", message);
				}
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
	        	return "redirect:/chatroom/authority/1";
			} 
		}
		return "/chatroom/my-follow";
	}
	
	/**
	 * 学生登录首页
	 * 
	 * @Title: loginInit
	 * @Description: TODO
	 * @param @param request
	 * @param @param response
	 * @param @return 设定文件
	 * @return String 返回类型
	 * @throws
	 */
	@RequestMapping("/login")
	public String login(HttpServletRequest request, HttpServletResponse response,Model model, String checkCode, String phone, String backUrl,String wechatcode) {
		String errorMsg = "";
		if(phone==null||phone.equals(""))
		{
			return "redirect:/chatroom/authority/2";
		}
		JSONObject json = new JSONObject();
		try {
			
			//从cookie中获取分享id
//			String referrerUserid = (String) UniverseSession.getAttribute("userIdInCookie")==null?"":(String) UniverseSession.getAttribute("userIdInCookie");
//			Cookie[] cookies = request.getCookies();//这样便可以获取一个cookie数组
//			for(Cookie cookie : cookies){
//			    String cookeiName = cookie.getName();// get the cookie name
//			    if("userIdInCookie".equals(cookeiName))
//			    {
//			    	referrerUserid = cookie.getValue(); // get the cookie value
//			    	break;
//			    }
//			}
			
			
			Map<String, String> params = new HashMap<String, String>();
			params.put("phone", phone);
			params.put("code", checkCode);
	        //获得微信的openIdhe UnionId
			String openId = "";
			String unionId = "";
			String headImgUrl = "";
			String nickname = "";
			String sex = "";
			//根据code获得openId
			openId = liveRoomService.getOpenId(wechatcode,request);
			//根据openId获得unionId
			TWechatUsers tWechatUsers = new TWechatUsers();
			tWechatUsers = liveRoomService.getWeChatUserByOpenId(openId,request);
			unionId = tWechatUsers.getUnionId();
			headImgUrl = tWechatUsers.getHeadImgUrl();
			nickname = tWechatUsers.getNickName();
			sex = tWechatUsers.getSex();
			if(unionId==null||unionId.equals("")){
				unionId = UUID.randomUUID().toString();
			}
			params.put("unionid", unionId);
			params.put("headimgurl", headImgUrl);
			params.put("nickname", nickname);
			params.put("sex", sex);
			params.put("system_type", "web");
			params.put("openid", openId);
//			params.put("referrerUserid", referrerUserid);
			
			Map<String, String> headers = new HashMap<String, String>();
	        
	        String url =  PropertiesUtils.getString("kaoshen_fastlogin_url");

	        ResponseData data = ApiClient.postJson(url, params, headers);
	        if(data == null){
	        	logger.error("WeChat快速登录，返回的数据是null");
	        	return "redirect:/chatroom/authority/2";
	        }
	        
	        if(data.getCode() == 200){
	        	String result = data.getBackData();
	        	if(StringUtils.isEmpty(result)){
	        		logger.error("WeChat快速登录，返回的数据是空值 ");
	        		return "redirect:/chatroom/authority/2";
	        	}
	        	JSONObject resultJson = JSONObject.parseObject(result);
	        	UserVO user = (UserVO) JsonUtil.json2Obj(resultJson.getString("result"), UserVO.class); 
	        	if(user == null || user.getId() <= 0){
	        		logger.error("WeChat快速登录，返回的数据转换UserVO后，user的值有错误，返回的值 = " + result);
	        		return "redirect:/chatroom/authority/2";
	        	}
	        	UniverseSession.setAttribute("userInfo", user);
	        }
	        if(data.getCode() == 400){
	        	errorMsg = "1";//登录失败
	        	return "redirect:/chatroom/authority/2";
	        }
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			json.put("success", false);
			json.put("message", "系统错误请稍后重试");
		}
			return "redirect:/liveroom/student/index";
	}
	
	/**
	 * 获取话题
	 * @Title: getListCourseByTeacher 
	 * @Description: TODO
	 * @param @param request
	 * @param @param response
	 * @param @param model
	 * @param @param teaId
	 * @param @return    设定文件 
	 * @return String    返回类型 
	 * @throws
	 */
	@RequestMapping("/{roomId}/{courseId}/{topicId}")
	public String getTopic(HttpServletRequest request, HttpServletResponse response,Model model,@PathVariable("roomId") Integer roomId,@PathVariable("courseId") Integer courseId,@PathVariable("topicId") Integer topicId)
	{
		String message = "";
		StringBuffer requestUrl = new StringBuffer(); //获得直播课程列表
		requestUrl.append(Contant.GET_LIVE_TOPIC_LIST);
		requestUrl.append("/"+roomId+"/"+courseId+"/"+topicId);
		try {
			Map<String, String> headers = new HashMap<String, String>();
			ResponseData responseData = ApiClient.get(requestUrl.toString(),headers,request,"");
			LiveTopicDto liveTopicDto = JSONObject.parseObject(responseData.getBackData(),LiveTopicDto.class);
			if(responseData.getCode()==200)
			{
				//返回成功
				int status = liveTopicDto.getStatus();
				if(status==0)
				{
					//已完成创建
					model.addAttribute("liveTopicVo", liveTopicDto);					
					model.addAttribute("userInfo", (UserVO) UniverseSession.getAttribute("userInfo"));
					//判断该话题是否结束
					Integer liveType = liveTopicDto.getLiveStatus();
					if(liveType!=2){
						String topic = PropertiesUtils.getString("aliyun_mqtt_producer_topic_a");
						CacheLiveRoom.plusTopicViewNum(topic+"/"+roomId+"/"+topicId+"/");
					}
				}
				else if(status==1)
				{
					model.addAttribute("errMsg", "请联系管理员创建直播间");
				}
			}
			else
			{
				message = liveTopicDto.getMessage();
				model.addAttribute("errMsg", message);
	        	return "redirect:/chatroom/authority/1";
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
        	return "redirect:/chatroom/authority/1";
		} 
		return "chatroom/audience";//返回学生页面
	}
	
	
	/**
	 * 获取系列课
	 * @Title: getCourse 
	 * @Description: TODO
	 * @param @param request
	 * @param @param response
	 * @param @param model
	 * @param @param roomId
	 * @param @param courseId
	 * @param @return    设定文件 
	 * @return String    返回类型 
	 * @throws
	 */
	@RequestMapping("/{roomId}/{courseId}")
	public String getCourse(HttpServletRequest request, HttpServletResponse response,Model model,@PathVariable("roomId") Integer roomId,@PathVariable("courseId") Integer courseId)
	{
		String message = "";
		StringBuffer requestUrl = new StringBuffer(); //获得直播课程列表
		requestUrl.append(Contant.GET_LIVE_COURSE_LIST);
		requestUrl.append("/"+roomId+"/"+courseId);
		try {
			Map<String, String> headers = new HashMap<String, String>();
			ResponseData responseData = ApiClient.get(requestUrl.toString(), headers,request,"");
			LiveCourseDto liveCourseDto = JSONObject.parseObject(responseData.getBackData(),LiveCourseDto.class);
			if(responseData.getCode()==200)
			{
				//返回成功
				int status = liveCourseDto.getStatus();
				if(status==0)
				{
					//已完成创建
					String json = JsonUtil.toJson(liveCourseDto);
					LiveCourseVo liveCourseVo = JsonUtil.getObjFromJson(json, LiveCourseVo.class);
					model.addAttribute("liveCourseVo", liveCourseVo);
				}
				else if(status==1)
				{
					model.addAttribute("errMsg", "请联系管理员创建直播间");
				}
			}
			else
			{
				message = liveCourseDto.getMessage();
				model.addAttribute("errMsg", message);
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		return "chatroom/host";//返回教师页面
	}
	
	
	
	
	@RequestMapping(value="/getslient/{roomId}/{courseId}/{topicId}", method = RequestMethod.GET )
	@ResponseBody
	public StatusDto getSlient(HttpServletRequest request, HttpServletResponse response,Model model,@PathVariable("roomId") Integer roomId,@PathVariable("courseId") Integer courseId,@PathVariable("topicId") Integer topicId)
	{
		StatusDto  statusDto= new StatusDto();
 		UserVO userInfo = (UserVO) UniverseSession.getAttribute("userInfo"); 
		if(userInfo==null||userInfo.getId()<0){
			statusDto.setStatus(2);
			statusDto.setMessage("用户未登陆");
		}
		else{
			//判断该当前话题是否结束
			StringBuffer requestUrl = new StringBuffer(); //获得直播课程列表
			requestUrl.append(Contant.GET_LIVE_TOPIC_LIST);
			requestUrl.append("/"+roomId+"/"+courseId+"/"+topicId);
			Map<String, String> headers = new HashMap<String, String>();
			ResponseData responseData = ApiClient.get(requestUrl.toString(), headers,request,"");
			LiveTopicDto liveTopicDto = JSONObject.parseObject(responseData.getBackData(),LiveTopicDto.class);
			if(responseData.getCode()==200)
			{
				//返回成功
				int status = liveTopicDto.getStatus();
				if(status==0)
				{
					//已完成创建
					model.addAttribute("liveTopicVo", liveTopicDto);					
					model.addAttribute("userInfo", (UserVO) UniverseSession.getAttribute("userInfo"));
					//判断该话题是否结束
					Integer liveType = liveTopicDto.getLiveStatus();
					if(liveType==2){
						//结束
						statusDto.setStatus(3);
						statusDto.setMessage("直播已结束");
					}
					else {
						Integer userId = userInfo.getId();
				        requestUrl =  new StringBuffer();
				        headers = new HashMap<String,String>();
				        requestUrl.append(Contant.GET_LIVE_SILENT);
				        requestUrl.append("/"+userId);
				        requestUrl.append("/"+topicId);
//							headers.put("Authorization", "bearer 00cdc49b3f2b4166a01eef56d3ea5eed");
						responseData = ApiClient.get(requestUrl.toString(), headers,request,"");
						if(responseData.getCode()==200){
							boolean flag = Boolean.parseBoolean(responseData.getBackData());
							if(flag){
								//被禁言
								statusDto.setStatus(0);
								statusDto.setMessage("被禁言");
							}
							else{
								//未被禁言
								statusDto.setStatus(1);
								statusDto.setMessage("未禁言");
							}
						}
						else{
							statusDto.setStatus(2);
							statusDto.setMessage(responseData.getBackData());
						}
					}
				}
			}
		}
		return statusDto;
	}
}
