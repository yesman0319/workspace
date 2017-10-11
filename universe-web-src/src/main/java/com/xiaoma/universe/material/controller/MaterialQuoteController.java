package com.xiaoma.universe.material.controller;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.druid.util.StringUtils;
import com.alibaba.fastjson.JSONObject;
import com.xiaoma.rest.authentication.UniverseSession;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.contant.Contant;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.common.utils.TimeUtil;
import com.xiaoma.universe.information.controller.BaseController;
import com.xiaoma.universe.material.model.MaterialQuote;
import com.xiaoma.universe.userlogin.controller.UserVO;

// 素材引用
@Controller
@RequestMapping("/materialQuote")
public class MaterialQuoteController extends BaseController{

	private Logger logger = Logger.getLogger(MaterialQuoteController.class);
	
	//***********************************************************素材 引用***********************************************************
		/**
		 * 素材 引用 列表 
		 */
		@RequestMapping(method = RequestMethod.GET)
		@ResponseBody
	    public JSONObject getMaterialQuotePages(HttpServletRequest request,Model model,Integer current_page,Integer page_size, String keyWord){
			Map<String, String> headers = new HashMap<String, String>();
			JSONObject resultJson = null;
			try {
				page_size = page_size==null?20:page_size;
				current_page = current_page == null?1:current_page;
				
				StringBuffer requestURL = new StringBuffer(Contant.MATERIAL_QUOTE);
				requestURL.append("?current_page="+current_page+"&page_size="+page_size);
				if(!StringUtils.isEmpty(keyWord)){
					requestURL.append("&materialName="+keyWord);
					model.addAttribute("keyWord", keyWord);
				}
				requestURL.append("&sortName=id");
	            ResponseData responseData = ApiClient.get(requestURL.toString(), headers); //调用远程后台接口
				if(responseData.getCode() == 200){
					//获取后台返回的所有数据
					resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
				}
			} catch (Exception e) {
				e.printStackTrace();
				logger.info("getMaterialQuotePages 方法 调用时 失败");
			}
			return resultJson;
		}
		
		//添加或修改
		@RequestMapping(method = RequestMethod.POST)
		@ResponseBody
		public void saveOrUpdate(HttpServletRequest request,MaterialQuote materialQuote,HttpServletResponse response){
			
			Map<String, String> headers = new HashMap<String, String>();
			Map<String, String> params = new HashMap<String, String>();
			
			//设置参数
			params.put("materialId", materialQuote.getMaterialId()==null?"0":materialQuote.getMaterialId().toString());
			params.put("materialName", materialQuote.getMaterialName());
			params.put("topicId", materialQuote.getTopicId()==null?"0":materialQuote.getTopicId().toString());
			params.put("topicTitle", materialQuote.getTopicTitle());
			
			UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
			params.put("users", user.getPhone());
			params.put("quoteTime", TimeUtil.getCurrentTime());
			
			ResponseData  data = ApiClient.post(Contant.MATERIAL_QUOTE,params,headers);
			if(data.getCode()==HttpServletResponse.SC_OK){
				JSONObject resultJson = (JSONObject) JSONObject.parse(data.getBackData());
				Integer reusltStatus = (Integer)resultJson.get("code");
				if(reusltStatus == 201){
					flushText("success", response);
				}
			}
			flushText("error", response);
		}
}
