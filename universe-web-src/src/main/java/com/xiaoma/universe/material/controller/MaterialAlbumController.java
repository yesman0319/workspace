package com.xiaoma.universe.material.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.contant.Contant;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.material.model.MaterialAlbum;

/**
 * 素材专辑
 */
@Controller
@RequestMapping("/materialAlbum")
public class MaterialAlbumController {

	private Logger logger = Logger.getLogger(MaterialAlbumController.class);
	//***************************************************************************** 专辑 *******************************************************************************
		/**
		 * 素材 专辑
		 * sort_by:排序字段名
		 * order_by: desc or asc
		 */
		@RequestMapping(method = RequestMethod.GET)
		@ResponseBody
	    public JSONObject getMaterialAlbumPages(HttpServletRequest request,Integer current_page,Integer page_size, String keyWord,String sort_by,String order_by,MaterialAlbum materialAlbum){
			Map<String, String> headers = new HashMap<String, String>();
			JSONObject resultJson = null;
			try {
				StringBuffer requestURL = new StringBuffer(Contant.MATERIAL_ALBUM+"?1=1");
				if(sort_by != null && !sort_by.trim().equals("")){
					requestURL.append("&sort_by="+sort_by);
				}
				if(order_by != null && !order_by.trim().equals("")){
					requestURL.append("&order_by="+order_by);
				}
				if(current_page!=null){
					requestURL.append("&current_page="+current_page);
				}else{
					requestURL.append("&current_page=1");
				}
				
				if(page_size == null){
					requestURL.append("&page_size=20");
				}else{
					requestURL.append("&page_size="+page_size);
				}
				
				if(materialAlbum.getId() != null){
					requestURL.append("&id="+materialAlbum.getId());
				}
				if(materialAlbum.getAlbumName() != null){
					requestURL.append("&albumName="+materialAlbum.getAlbumName());
				}
				if(materialAlbum.getCreatePersion() != null){
					requestURL.append("&createPersion="+materialAlbum.getCreatePersion());
				}
	            ResponseData responseData = ApiClient.get(requestURL.toString(), headers); //调用远程后台接口
				if(responseData.getCode() == 200){
					//获取后台返回的所有数据
					resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
				}
			} catch (Exception e) {
				e.printStackTrace();
				logger.info("getMaterialAlbumPages 方法发生错误");
			}
			return resultJson;
		}
}
