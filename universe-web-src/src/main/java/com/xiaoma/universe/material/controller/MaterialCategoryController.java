package com.xiaoma.universe.material.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.xiaoma.universe.common.interceptor.UserVo;
import com.xiaoma.universe.material.service.MaterialCategoryService;
import com.xiaoma.universe.userlogin.controller.UserVO;

@Controller
@RequestMapping("/material/category")
public class MaterialCategoryController {
	@Autowired
	private MaterialCategoryService materialCategoryService;
	
	private static final Logger logger = LoggerFactory.getLogger(MaterialCategoryController.class);
	
	@RequestMapping(method=RequestMethod.GET)
	@ResponseBody
	public JSONObject list(HttpServletRequest request,Model model,Integer page_size,Integer current_page,String name){
		current_page = current_page == null?1:current_page;
		page_size = page_size==null?20:page_size;
		JSONObject jsonObject = materialCategoryService.getCateList(request,page_size,current_page,name);
		return jsonObject;
	}
}
