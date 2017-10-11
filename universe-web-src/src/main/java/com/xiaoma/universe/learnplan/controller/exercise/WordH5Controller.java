package com.xiaoma.universe.learnplan.controller.exercise;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.xiaoma.rest.authentication.CacheUserInfo;
import com.xiaoma.rest.authentication.UserInfo;
import com.xiaoma.universe.learnplan.service.WordH5Service;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
/**
 * 词汇预习h5页面
 * @author xiaoma
 *
 */
@Controller
@RequestMapping("/h5")
public class WordH5Controller {
	
	
	
	private Logger logger = Logger.getLogger(WordH5Controller.class);
	@Autowired
	private WordH5Service wordH5Service;
	
	public  String shareWord(HttpServletResponse response,HttpServletRequest request,int groupId,Integer userId,Model model){
		try {

			//获取参数 
			JSONArray wordVOS = (JSONArray)wordH5Service.getAll(request,groupId);
			model.addAttribute("rows",wordVOS);
			if(wordVOS!=null && wordVOS.size()>0){
				JSONObject jb = (JSONObject)wordVOS.get(0);
				model.addAttribute("groupName",jb.getString("groupName"));
				model.addAttribute("length",wordVOS.size());
			}
			if(userId != null){
				UserInfo user = CacheUserInfo.getUserInfo(userId);
				if(user != null){
					logger.info("userName--:"+user.getNickname());
					model.addAttribute("user",user);
				}
			}
			logger.info("userId--:"+userId);
			return "h5/h5_preview_share";
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e.getMessage(), e);
			return "500";
		}
	}
	
	@RequestMapping(value="/list/{groupId}",method=RequestMethod.GET)
	public String shareWord1(HttpServletResponse response,HttpServletRequest request,
			@PathVariable int groupId,Integer userId,Model model){
		
		return this.shareWord(response, request, groupId, userId, model);
		
	}
	
	@RequestMapping(value="/list",method=RequestMethod.GET)
	public String shareWord2(HttpServletResponse response,HttpServletRequest request,
			int groupId,Integer userId,Model model){

		return this.shareWord(response, request, groupId, userId, model);
	}
}
