package com.xiaoma.universe.liveroom.aspect;  

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Pointcut;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.xiaoma.rest.authentication.UniverseSession;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.contant.Contant;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.liveroom.model.dto.LiveSilentDto;
import com.xiaoma.universe.liveroom.model.dto.StatusDto;
import com.xiaoma.universe.userlogin.controller.UserVO;

@Aspect  
@Component  
public  class CheckSilenceAspect {  

	//本地异常日志记录对象  
	private  static  final Logger logger = LoggerFactory.getLogger(CheckSilenceAspect.class);  
	//Controller层切点  
	@Pointcut("@annotation(com.xiaoma.universe.liveroom.aspect.CheckSilence)")
	public  void checkSilentAspect() {  
	}  

	/**
	 * 用户验证用户是否是教师
	 * @Title: doBefore 
	 * @Description: TODO
	 * @param @param joinPoint    设定文件 
	 * @return void    返回类型 
	 * @throws
	 */
	@Around("checkSilentAspect()")  
	public  Object  around(ProceedingJoinPoint pjd) {
		HttpServletResponse response = getHttpServletResponse();
		HttpServletRequest request = getHttpServletRequest();
		Integer userId = 0;
		Integer topicId = 0;
		Map<String, String[]> params = request.getParameterMap();  
		for (String key : params.keySet()) {  
			if("userId".equals(key)){
				userId = Integer.valueOf(params.get(key)[0]);
			}
			if("topicId".equals(key)){
				topicId = Integer.valueOf(params.get(key)[0]);
			}
		}
		
		StatusDto statusDto = new StatusDto();
		Boolean flag = false;
		Map<String, String> headers = new HashMap<String, String>();
		ResponseData data = ApiClient.get(Contant.LIVE_ROOM_CHECK_SLIENCE+"/"+userId+"/"+topicId, headers,request,"");  //调用远程后台接口
		if (data.getCode() != 200) {
			statusDto.setStatus(2);
			statusDto.setMessage("服务器问题");
		}
		else{
			String json = data.getBackData();
			flag = Boolean.valueOf(json);
			if(flag)
			{
				statusDto.setStatus(0);
				statusDto.setMessage("有权限发问");
			}
			else{
				statusDto.setStatus(1);
				statusDto.setMessage("无权限发问");
			}
		}
		//执行目标方法
		Object result = null;
		try {
			result = pjd.proceed();
		} catch (Throwable e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return result;
	}  

    public HttpServletResponse getHttpServletResponse(){
    	HttpServletResponse response = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getResponse();
        return response;
    }
    
    public HttpServletRequest getHttpServletRequest(){
    	HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
    	return request;
    }
}
