package com.xiaoma.universe.learnplan.controller.exercise;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xiaoma.rest.authentication.UserInfo;
import com.xiaoma.rest.authentication.beans.annotation.TokenUser;
import com.xiaoma.universe.common.utils.MapUtil;
import com.xiaoma.universe.learnplan.service.PreparationService;

@Controller
@RequestMapping("/preparation")
public class PreparationController {
	private Logger logger = Logger.getLogger(PreparationController.class);
	@Autowired
	private PreparationService preparationService;
	/**
	 * @param fromType
	 * @param token
	 * @param systemId
	 * @param groupId
	 * @param ifDo  0从来没有做过， 1代表更新操作
	 * @param request
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="/save",method=RequestMethod.POST)
	public Object saveOrUpdateJSON(HttpServletResponse response,HttpServletRequest request,
			@TokenUser UserInfo user,
			 String info){
		try {
			if(user == null){
				return MapUtil.toMap(1, "token对应用户不存在!");
			}
			//获取参数
			response.setStatus(HttpServletResponse.SC_OK);
			return preparationService.saveOrUpdateResult(request,user.getId(), info);
		}catch(Exception e){
			logger.error("saveOrUpdateJSON(), userid = " + user.getId() ,e);
			return MapUtil.toMap(1, "系统错误");
		}
		
	}
}
