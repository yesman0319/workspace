/**
 * 
 */
package com.xiaoma.universe.liveroom.controller;

import java.io.IOException;
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
import com.xiaoma.rest.authentication.CacheUserInfo;
import com.xiaoma.rest.authentication.TeacherInfo;
import com.xiaoma.rest.authentication.UniverseSession;
import com.xiaoma.rest.authentication.util.JsonUtil;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.contant.Contant;
import com.xiaoma.universe.common.utils.JxmlUtil;
import com.xiaoma.universe.common.utils.MapUtil;
import com.xiaoma.universe.common.utils.PropertiesUtils;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.liveroom.model.dto.LiveCourseDto;
import com.xiaoma.universe.liveroom.model.dto.LiveRoomDetailDto;
import com.xiaoma.universe.liveroom.model.dto.LiveTopicDto;
import com.xiaoma.universe.liveroom.model.dto.StatusDto;
import com.xiaoma.universe.liveroom.model.upay.Root;
import com.xiaoma.universe.liveroom.model.vo.LiveAudioMessageVo;
import com.xiaoma.universe.liveroom.model.vo.LiveCourseVo;
import com.xiaoma.universe.liveroom.model.vo.LiveTopicVo;
import com.xiaoma.universe.liveroom.service.LiveRoomService;
import com.xiaoma.universe.userlogin.controller.UserVO;
import com.xiaoma.universe.wechat.model.dto.TWechatUsers;
import com.xiaoma.universe.wechat.service.LoginService;

/**
 * @author xiaoma
 *
 */
@Controller 
@RequestMapping("/liveroom/teacher")
public class LiveRoomTeacherController { 
	
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
			//判断用户是不是教师
			String phone = userInfo.getPhone();
			TeacherInfo teaUserInfo = CacheUserInfo.getTeacherByPhone(phone);
			if(teaUserInfo==null||teaUserInfo.getId()<=0)
			{
				//该用户不是老师
				model.addAttribute("errMsg", "您未获得开课权限，请联系管理员添加");
			}
			else
			{
				//该用户是老师
				UniverseSession.setAttribute("teaUserInfo", teaUserInfo);
				String message = "";
				StringBuffer requestUrl = new StringBuffer(); //获得直播课程列表
				requestUrl.append(Contant.GET_LIVE_ROOM_DETAIL);
				try {
					Map<String, String> headers = new HashMap<String, String>();
//					headers.put("Authorization", "bearer 00cdc49b3f2b4166a01eef56d3ea5eed");
//					ResponseData responseData = ApiClient.get(requestUrl.toString(),headers);
					ResponseData responseData = ApiClient.get(requestUrl.toString(), headers,request,"");
					LiveRoomDetailDto liveRoomDto = JSONObject.parseObject(responseData.getBackData(),LiveRoomDetailDto.class);
					if(responseData.getCode()==200)
					{
						//返回成功
						int status = liveRoomDto.getStatus();
						if(status==0)
						{
							//已完成创建
							model.addAttribute("liveRoomVo", liveRoomDto);
						}
						else if(status==1)
						{
							model.addAttribute("errMsg", "请联系管理员创建直播间");
						}
					}
					else
					{
						message = liveRoomDto.getMessage();
						model.addAttribute("errMsg", message);
					}
				} catch (Exception e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
		        	return "redirect:/chatroom/authority/1";
				} 
			}
		}
		return "/chatroom/my-liveroom";
//		if(id==0){
//			//进入学生页面
//			return "/chatroom/host";
//		}
//		else{
//			//进入学生页面
//			return "/chatroom/audience";
//		}
	}
	
	/**
	 * 教师登录首页
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
			return "redirect:/chatroom/authority/1";
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
	        	return "redirect:/chatroom/authority/1";
	        }
	        
	        if(data.getCode() == 200){
	        	String result = data.getBackData();
	        	if(StringUtils.isEmpty(result)){
	        		logger.error("WeChat快速登录，返回的数据是空值 ");
	        		return "redirect:/chatroom/authority/1";
	        	}
	        	JSONObject resultJson = JSONObject.parseObject(result);
	        	UserVO user = (UserVO) JsonUtil.json2Obj(resultJson.getString("result"), UserVO.class); 
	        	if(user == null || user.getId() <= 0){
	        		logger.error("WeChat快速登录，返回的数据转换UserVO后，user的值有错误，返回的值 = " + result);
	        		return "redirect:/chatroom/authority/1";
	        	}
	        	UniverseSession.setAttribute("userInfo", user);
	        }
	        if(data.getCode() == 400){
	        	errorMsg = "1";//登录失败
	        	return "redirect:/chatroom/authority/1";
	        }
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			json.put("success", false);
			json.put("message", "系统错误请稍后重试");
		}
			return "redirect:/liveroom/teacher/index";
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
		UserVO userInfo = (UserVO) UniverseSession.getAttribute("userInfo"); 
		String message = "";
		StringBuffer requestUrl = new StringBuffer(); //获得直播课程列表
		requestUrl.append(Contant.GET_LIVE_TOPIC_LIST);
		requestUrl.append("/"+roomId+"/"+courseId+"/"+topicId);
		try {
			Map<String, String> headers = new HashMap<String, String>();
//			headers.put("Authorization", "bearer 00cdc49b3f2b4166a01eef56d3ea5eed");
//			ResponseData responseData = ApiClient.get(requestUrl.toString(),headers);
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
					model.addAttribute("userInfo", userInfo);
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
			}
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
        	return "redirect:/chatroom/authority/1";
		} 
		return "chatroom/host";//返回教师页面
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
//			headers.put("Authorization", "bearer 00cdc49b3f2b4166a01eef56d3ea5eed");
//			ResponseData responseData = ApiClient.get(requestUrl.toString(),headers);
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
	

	/**
	 * 上传图片
	 * @Title: uploadImg 
	 * @Description: TODO
	 * @param @param request
	 * @param @param response
	 * @param @param model
	 * @param @param mediaId
	 * @param @return    设定文件 
	 * @return String    返回类型 
	 * @throws
	 */
	@RequestMapping(value="/uploadimg", method = RequestMethod.GET )
	@ResponseBody
	public String uploadImg(HttpServletRequest request, HttpServletResponse response,Model model,String mediaId)
	{
		String imgUrl = loginService.getMedia(request, mediaId);
		return imgUrl;
	}
	
	/**
	 * 上传音频
	 * @Title: uploadaudio 
	 * @Description: TODO
	 * @param @param request
	 * @param @param response
	 * @param @param model
	 * @param @param liveAudioMessageVo
	 * @param @return    设定文件 
	 * @return StatusDto    返回类型 
	 * @throws
	 */
	@RequestMapping(value="/uploadaudio", method = RequestMethod.GET )
	@ResponseBody
	public StatusDto uploadaudio(HttpServletRequest request, HttpServletResponse response,Model model,LiveAudioMessageVo liveAudioMessageVo)
	{
		StatusDto statusDto = new StatusDto();
		Map<String, String> headers = new HashMap<String, String>();
        StringBuffer requestUrl =  new StringBuffer();
        requestUrl.append(Contant.UPLOAD_AUDIO);
//		headers.put("Authorization", "bearer 00cdc49b3f2b4166a01eef56d3ea5eed");
		Map<String, String> params = MapUtil.objectToMap(liveAudioMessageVo);
		ResponseData responseData = ApiClient.post(requestUrl.toString(),params,headers);
		if(responseData.getCode()==200)
		{
			statusDto.setStatus(0);
			statusDto.setMessage("上传成功，转换中");
			//调用开始转换
		}
		else{
			statusDto.setStatus(2);
			statusDto.setMessage("上传失败");
			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
		}
		return statusDto;
	}
	
	/**
	 * 回调发送
	 * @Title: uploadaudioback 
	 * @Description: TODO
	 * @param @param request
	 * @param @param response
	 * @param @param model
	 * @param @param liveAudioMessageVo
	 * @param @return    设定文件 
	 * @return StatusDto    返回类型 
	 * @throws
	 */
	@RequestMapping(value="/uploadaudio/back", method = RequestMethod.POST )
	@ResponseBody
	public StatusDto uploadaudioback(HttpServletRequest request, HttpServletResponse response,Model model,LiveAudioMessageVo liveAudioMessageVo)
	{
		logger.info("又拍云音频处理成功~~!");
		try {
			String json = JxmlUtil.byte2String(request);
			Root root = JSONObject.parseObject(json, Root.class);
			System.out.println(root);
	        StringBuffer requestUrl =  new StringBuffer();
	        Map<String,String> headers = new HashMap<String,String>();
	        requestUrl.append(Contant.UPLOAD_AUDIO_BACK);
//			headers.put("Authorization", "bearer 00cdc49b3f2b4166a01eef56d3ea5eed");
			ResponseData responseData = ApiClient.postJsonData(requestUrl.toString(), json, headers,request,"");
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		StatusDto statusDto = new StatusDto();
//		Map<String, String> headers = new HashMap<String, String>();
//        StringBuffer requestUrl =  new StringBuffer();
//        requestUrl.append(Contant.UPLOAD_AUDIO_BACK);
//		headers.put("Authorization", "bearer 00cdc49b3f2b4166a01eef56d3ea5eed");
//		Map<String, String> params = MapUtil.objectToMap(liveAudioMessageVo);
//		ResponseData responseData = ApiClient.post(requestUrl.toString(),params,headers);
//		if(responseData.getCode()==200)
//		{
//			statusDto.setStatus(0);
//			statusDto.setMessage("上传成功，转换中");
//			//调用开始转换
//		}
//		else{
//			statusDto.setStatus(2);
//			statusDto.setMessage("上传失败");
//			response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
//		}
		return statusDto;
	
	}
	
	
	@RequestMapping(value="/endtopic/{topicId}", method = RequestMethod.GET )
	@ResponseBody
	public StatusDto endTopic(HttpServletRequest request, HttpServletResponse response,Model model,@PathVariable Integer topicId)
	{
		StatusDto statusDto = new StatusDto();
        StringBuffer requestUrl =  new StringBuffer();
        Map<String,String> headers = new HashMap<String,String>();
//        headers.put("Authorization", "bearer 00cdc49b3f2b4166a01eef56d3ea5eed" );
        requestUrl.append(Contant.GET_LIVE_TOPIC_LIST);
        requestUrl.append("/end/"+topicId);
		ResponseData responseData = ApiClient.get(requestUrl.toString(), headers,request,"");
		if(responseData.getCode()==200){
			statusDto.setStatus(0);
			statusDto.setMessage("关闭成功");
		}
		else{
			statusDto.setStatus(2);
			statusDto.setMessage(responseData.getBackData()==null||responseData.getBackData().equals("")?"内部错误":responseData.getBackData());
		}

		return statusDto;
	
	}
}
