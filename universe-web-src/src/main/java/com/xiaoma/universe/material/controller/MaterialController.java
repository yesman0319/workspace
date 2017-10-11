package com.xiaoma.universe.material.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.information.controller.BaseController;
import com.xiaoma.universe.material.model.Material;
import com.xiaoma.universe.material.service.MaterialCategoryService;
import com.xiaoma.universe.material.service.MaterialService;

/**
 * 素材 相关 类
 */
@Controller
@RequestMapping("/material")
public class MaterialController extends BaseController{
	private static final Logger logger = LoggerFactory.getLogger(MaterialController.class);
	
	@Autowired
	private MaterialService materialService;
	
	@Autowired
	private MaterialCategoryService materialCategoryService;
	
	//**********************************************************************素材*****************************************************************************
	/*
	 *分页获取素材类
	 * sort_by 字段名
	 * order_by 正序（asc）或 倒序（desc）
	 */ 
	@RequestMapping(method = RequestMethod.GET)
	@ResponseBody
	public JSONObject getMaterialList(HttpServletRequest request,Integer page_size,Integer current_page,String keyWord,String sort_by,String order_by,Material material){
		JSONObject resultJson = null;
		Map<String, String> headers = new HashMap<String, String>();
		current_page = current_page == null?1:current_page;
		page_size = page_size==null?20:page_size;
		try {
			page_size = page_size==null?20:page_size;
			current_page = current_page == null?1:current_page;

			String requestURL = materialService.createCallUrl(material,page_size,current_page,sort_by,order_by);
			ResponseData responseData = ApiClient.get(requestURL.toString(), headers);  //调用远程后台接口
			if(responseData.getCode()==HttpServletResponse.SC_OK){
				resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
			}
	    } catch (Exception e) {
			e.printStackTrace();
		}
		return resultJson;
	}
}
