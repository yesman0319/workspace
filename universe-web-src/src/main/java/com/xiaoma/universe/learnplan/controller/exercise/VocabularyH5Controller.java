package com.xiaoma.universe.learnplan.controller.exercise;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.xiaoma.universe.learnplan.service.VocabularyH5Service;

import net.sf.json.JSONArray;

/**
 * 词汇 
 * @author xiaoma
 *
 */
@Controller
@RequestMapping("/vocabulary/h5")
public class VocabularyH5Controller {


	
	private Logger logger = Logger.getLogger(VocabularyH5Controller.class);
	@Autowired
	private VocabularyH5Service vocabularyH5Service;
	
	@RequestMapping(value="/list",method=RequestMethod.GET)
	public String saveOrUpdateJSON(HttpServletResponse response,HttpServletRequest request,
			int sequenceNumber,Model model){
		try {
			//获取参数
			response.setStatus(HttpServletResponse.SC_OK);
			JSONArray vocabularyVOS = (JSONArray)vocabularyH5Service.getAll(request,sequenceNumber);
			model.addAttribute("rows",vocabularyVOS);
			return "h5/h5_vocabulary_share";
		}catch(Exception e){
			e.printStackTrace();
			logger.error(e.getMessage(), e);
			return "500";
		}
		
	}
}
