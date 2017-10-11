package com.xiaoma.universe.material.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.json.JSONArray;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.contant.Contant;
import com.xiaoma.universe.common.utils.ResponseData;

@Service("materialCategoryService")
public class MaterialCategoryService {

	@SuppressWarnings("unchecked")
	public JSONObject getCateList(HttpServletRequest request,
			Integer pageSize, Integer page,String name) {
		Map<String, String> headers = new HashMap<String, String>();
		JSONObject jsonObject = null;
		if(pageSize==null){
			pageSize=20;
		}
		if(page==null){
			page=1;
		}
		String url="";
		if(name==null){
			url=Contant.MATERIAL_CATEGORY+"/search?pageSize="+pageSize+"&page="+page+"&sortby=id&order=DESC&islike=false";
		}else{
			url=Contant.MATERIAL_CATEGORY+"/search?pageSize="+pageSize+"&page="+page+"&name="+name+"&sortby=id&order=DESC&islike=true";
		}
		ResponseData responseData = ApiClient.get(url.toString(), headers);  //调用远程后台接口
		if(responseData.getCode()==HttpServletResponse.SC_OK){
			jsonObject = (JSONObject) JSONObject.parse(responseData.getBackData());
		}
		return jsonObject;
	}
}
