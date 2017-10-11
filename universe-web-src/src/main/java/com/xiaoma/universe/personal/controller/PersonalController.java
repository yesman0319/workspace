package com.xiaoma.universe.personal.controller;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.alibaba.fastjson.JSONObject;
import com.xiaoma.rest.authentication.UniverseSession;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.interceptor.UserVo;
import com.xiaoma.universe.common.paging.YzPagingInfo;
import com.xiaoma.universe.common.utils.Base64Util;
import com.xiaoma.universe.common.utils.PropertiesUtils;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.common.utils.TimeHelper;
import com.xiaoma.universe.common.utils.UUIDUtil;
import com.xiaoma.universe.common.utils.upyun.UploadImgUtil;
import com.xiaoma.universe.livemanage.model.BaseModel;
import com.xiaoma.universe.personal.service.PersonalService;
import com.xiaoma.universe.userlogin.controller.UserVO;
import com.xiaoma.universe.videomanage.model.vo.MyCoursesForWebVo;

@Controller
@RequestMapping(value="/personal")
public class PersonalController {
	@Autowired
	PersonalService personalService;
	public static String USER_INFO_UPDATE = PropertiesUtils.getString("auth_api_userinfo_update_url");
	public static String USER_SEND_MARK = PropertiesUtils.getString("auth_api_send_mark_url");
	public static String USER_SEND_PMARK = PropertiesUtils.getString("auth_api_send_pmark_url");
	public static String USER_UPDATE_PW= PropertiesUtils.getString("auth_api_update_pw_url");
	public static String AUTH_API_BINDING_PHONE= PropertiesUtils.getString("auth_api_binding_phone_url");
	/**
	 * 个人中心--课程
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
	@RequestMapping(value="/videocourse" , method=RequestMethod.GET)
	public String getMyVideoCourse(HttpServletRequest request, HttpServletResponse response, Model model, Integer page_size,Integer page,@UserVo UserVO userInfo)
	{
		if(page_size==null){
			page_size = YzPagingInfo.PAGE_SIZE_DEFAULT;
		}
		
		if(page==null){
			page = 1;
		}
		model.addAttribute("videocourseActive","cur");
		
		Map<String,Object> map= personalService.getMyVideoCourse(page_size,page,request);
		List<MyCoursesForWebVo> list = (List<MyCoursesForWebVo>) map.get("list");
		Integer total=  (Integer) map.get("total");
		model.addAttribute("list", list);
		YzPagingInfo paddingInfo = new YzPagingInfo(request,total);
		model.addAttribute("paddingInfo",paddingInfo);
		return "/personal/user_video_courses";
	}
	/**
	 * 进入用户设置
	 * @Title: userInfo 
	 * @Description: TODO
	 * @param @param request
	 * @param @param response
	 * @param @param model
	 * @param @param pageModel
	 * @param @param userInfo
	 * @param @return    设定文件 
	 * @return String    返回类型 
	 * @throws
	 */
	@RequestMapping(value="/userinfo" , method=RequestMethod.GET)
	public String userInfo(HttpServletRequest request, HttpServletResponse response, Model model, BaseModel pageModel,@UserVo UserVO userInfo)
	{
		String type = request.getParameter("type");
		request.setAttribute("type", type);
		return "/personal/user_info";
	}
	
	/**
	 * 修改昵称
	 * @Title: updateProfile 
	 * @Description: TODO
	 * @param @param request
	 * @param @param response
	 * @param @param model
	 * @param @param pageModel
	 * @param @return    设定文件 
	 * @return String    返回类型 
	 * @throws
	 */
	@RequestMapping(value="/updateProfile" , method=RequestMethod.GET)
	@ResponseBody
	public Map<String,Object> updateProfile(HttpServletRequest request, HttpServletResponse response, Model model, BaseModel pageModel,@UserVo UserVO userInfo)
	{
		Map<String,Object> map = new HashMap<String,Object>();
		Integer userId = userInfo.getId();
		Integer code = -1;
		String message = "";
		String nickName = request.getParameter("nickname");
		Map<String,String> headers = new HashMap<String,String>();
		Map<String,String> params = new HashMap<String,String>();
		params.put("id", userId.toString());
		params.put("nickname", nickName);
		ResponseData responseData = ApiClient.post(USER_INFO_UPDATE, params,headers,request,"ajax");
		JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
		if(responseData.getCode()==200)
		{
			code = 0;
			userInfo.setNickname(nickName); 
			UniverseSession.setAttribute("userInfo", userInfo);
		}
		else
		{
			message =resultJson.getString("message");
		}
		map.put("code", code);
		map.put("message", message);
		return map;
	}
	
	/**
	 * 发送验证码
	 * 
	 * @Title: sendMark
	 * @Description: TODO
	 * @param @param request
	 * @param @param response
	 * @param @param username
	 * @param @param mark
	 * @param @return 设定文件
	 * @return Map<String,String> 返回类型
	 * @throws
	 */
	@RequestMapping("/sendmark")
	@ResponseBody
	public Map<String,Object> sendMark(HttpServletRequest request, HttpServletResponse response) {
		String phone = request.getParameter("phone");
		Map<String,Object> map = new HashMap<String,Object>();
		Map<String,String> headers = new HashMap<String,String>();
		String message = "";
		ResponseData responseData = ApiClient.get(USER_SEND_MARK+"?phoneNum="+phone,headers,request,"ajax");
		JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
		if(responseData.getCode()==200)
		{
			message = "success";
		}
		else
		{
			message =resultJson.getString("message");
		}
		map.put("message", message);
		return map;
	}
	
	/**
	 * 修改密码
	 * @Title: updatePassword 
	 * @Description: TODO
	 * @param @param request
	 * @param @param response
	 * @param @return    设定文件 
	 * @return Map<String,Object>    返回类型 
	 * @throws
	 */
	@RequestMapping("/updatePassword")
	@ResponseBody
	public Map<String,Object> updatePassword(HttpServletRequest request, HttpServletResponse response) {
		String phone = request.getParameter("phone");
		String nextPass = request.getParameter("nextPass");
		String codeNum = request.getParameter("codeNum");
		Map<String,Object> map = new HashMap<String,Object>();
		Map<String,String> headers = new HashMap<String,String>();
		Map<String,String> param = new HashMap<String,String>();
		param.put("code", codeNum);
		param.put("password", nextPass);
		param.put("phone", phone);
		String message = "";
		ResponseData responseData = ApiClient.post(USER_UPDATE_PW,param,headers,request,"ajax");
		JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
		if(responseData.getCode()==200)
		{
			message = "success";
		}
		else
		{
			message =resultJson.getString("message");
		}
		map.put("message", message);
		return map;
	}
	
	
	
	/**
	 * 发送phone验证码
	 * 
	 * @Title: sendMark
	 * @Description: TODO
	 * @param @param request
	 * @param @param response
	 * @param @param username
	 * @param @param mark
	 * @param @return 设定文件
	 * @return Map<String,String> 返回类型
	 * @throws
	 */
	@RequestMapping("/sendpmark")
	@ResponseBody
	public Map<String,Object> sendpmark(HttpServletRequest request, HttpServletResponse response) {
		String phone = request.getParameter("phone");
		Map<String,Object> map = new HashMap<String,Object>();
		Map<String,String> headers = new HashMap<String,String>();
		String message = "";
		ResponseData responseData = ApiClient.get(USER_SEND_PMARK+"?phoneNum="+phone,headers,request,"ajax");
		JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
		if(responseData.getCode()==200)
		{
			message = "success";
		}
		else
		{
			message =resultJson.getString("message");
		}
		map.put("message", message);
		return map;
	}
	
	/**
	 * 绑定手机
	 * @Title: bindingphone 
	 * @Description: TODO
	 * @param @param request
	 * @param @param response
	 * @param @return    设定文件 
	 * @return Map<String,Object>    返回类型 
	 * @throws
	 */
	@RequestMapping("/bindingphone")
	@ResponseBody
	public Map<String,Object> bindingphone(HttpServletRequest request, HttpServletResponse response,@UserVo UserVO userInfo) {
		String phone = request.getParameter("phone");
		String codeNum = request.getParameter("codeNum");
		Map<String,Object> map = new HashMap<String,Object>();
		Map<String,String> headers = new HashMap<String,String>();
		Map<String,String> param = new HashMap<String,String>();
		param.put("code", codeNum);
		param.put("phone", phone);
		param.put("userid", String.valueOf(userInfo.getId()));
		String message = "";
		ResponseData responseData = ApiClient.postJson(AUTH_API_BINDING_PHONE,param,headers,request,"ajax");
		JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
		if(responseData.getCode()==200)
		{
			message = "success";
			userInfo.setPhone(phone);
	    	UniverseSession.setAttribute("userInfo", userInfo);
	    	request.setAttribute("userInfo", userInfo);
		}
		else
		{
			message =resultJson.getString("message");
		}
		map.put("message", message);
		return map;
	}
	
	
	
	@RequestMapping("/ajaxFileUpload")
	@ResponseBody
	public Map<String,Object> ajaxFileUpload(@RequestParam MultipartFile[] myfiles, HttpServletRequest request, HttpServletResponse response) throws Exception {

		MultipartFile mf = myfiles[0];
		// 得到图片的二进制数据，以二进制封装得到数据，具有通用性
		byte[] data = readInputStream(mf.getInputStream());
		String fileName = mf.getOriginalFilename();
		Long fileSize = mf.getSize();
		HashMap<String, Object> map = new HashMap<String, Object>();
		if(fileSize>5*1024*1024)
		{
			map.put("result", "large");
			return map;
		}
		String uuid = UUIDUtil.getUUID();
		String date = TimeHelper.date2String(new Date(), "yyyyMMdd");
		String prefix=fileName.substring(fileName.lastIndexOf(".")+1);
		String filename = date+"/"+uuid+"."+prefix;
		String img = UploadImgUtil.uploadImg(data,filename);
		map.put("img", img);
		map.put("result", "success");
		return map;
	}
	
	@RequestMapping("/upyun")
	@ResponseBody
	public Map<String,Object> Upload( HttpServletRequest request, HttpServletResponse response,@UserVo UserVO userInfo) throws Exception {
		String w = request.getParameter("w");
		String h = request.getParameter("h");
		String x = request.getParameter("x");
		String y = request.getParameter("y");
		String img = request.getParameter("img");
		String url = img+cutImg( w, h, x, y);
		Integer userId = userInfo.getId();
		Integer code = -1;
		String message = "";
		Map<String,String> headers = new HashMap<String,String>();
		Map<String,String> params = new HashMap<String,String>();
		params.put("id", userId.toString());
		params.put("avatar", url);
		ResponseData responseData = ApiClient.post(USER_INFO_UPDATE, params,headers,request,"ajax");
		JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
		if(responseData.getCode()==200)
		{
			code = 0;
			userInfo.setAvatar(url);; 
			UniverseSession.setAttribute("userInfo", userInfo);
		}
		else
		{
			message =resultJson.getString("message");
		}
		Map<String,Object> map = new HashMap<String,Object>();
		map.put("code", code);
		map.put("message", message);
		return map;
	}

	public static String cutImg(String w,String h,String x,String y)
	{
		return "!/both/180x180/force/true/clip/"+w+"x"+h+"a"+x+"a"+y;
	}
	public static byte[] readInputStream(InputStream inStream) throws Exception {
		ByteArrayOutputStream outStream = new ByteArrayOutputStream();
		// 创建一个Buffer字符串
		byte[] buffer = new byte[1024];
		// 每次读取的字符串长度，如果为-1，代表全部读取完毕
		int len = 0;
		// 使用一个输入流从buffer里把数据读取出来
		while ((len = inStream.read(buffer)) != -1) {
			// 用输出流往buffer里写入数据，中间参数代表从哪个位置开始读，len代表读取的长度
			outStream.write(buffer, 0, len);
		}
		// 关闭输入流
		inStream.close();
		// 把outStream里的数据写入内存
		return outStream.toByteArray();

	}
}
