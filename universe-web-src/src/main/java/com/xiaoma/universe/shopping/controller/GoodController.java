package com.xiaoma.universe.shopping.controller;

import java.io.UnsupportedEncodingException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.xiaoma.rest.authentication.UniverseSession;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.contant.Contant;
import com.xiaoma.universe.common.interceptor.UserVo;
import com.xiaoma.universe.common.paging.YzPagingInfo;
import com.xiaoma.universe.common.utils.GenerateQrCodeUtil;
import com.xiaoma.universe.common.utils.GetTokenFromCooklie;
import com.xiaoma.universe.common.utils.MapUtil;
import com.xiaoma.universe.common.utils.ObjectMapUtil;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.information.controller.BaseController;
import com.xiaoma.universe.shopping.model.GoodVO;
import com.xiaoma.universe.userlogin.controller.UserVO;

/**
 * 商品 
 * 
 * @ClassName:OrderPaymentController
 * @author zhaijilong
 */
@Controller
@RequestMapping("/goods")
public class GoodController extends BaseController{

	private Logger logger = Logger.getLogger(GoodController.class);
	
	/**
	 * 进入商品分享列表页面
	 * @return  
	 */      
	@RequestMapping(value="/lists",method = RequestMethod.GET)
    public String getList(HttpServletRequest request,Model model,Integer page){
		
		String returnURL = "shopping/product_list"; 
		String callUrl = getSuccessURL(request);
        
		//-------判断用户是否登录, 如果没有跳转到登录界面-------
		UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
		if(user == null || user.getId() <= 0){
			String backurl = request.getRequestURI();
			return "forward:/login?backurl="+backurl; 
		}
		
		page = page == null?1:page;
		Map<String, String> headers = new HashMap<String, String>();
		ResponseData data = ApiClient.get(Contant.GOODS_LISTS_PAGES+"?current_page="+page+"&page_size=20&tag=1", headers,request,"");  //调用远程后台接口
		if (data.getCode() != 200) {
			model.addAttribute("error", "获取产品信息失败,请返回重新获取");
			return returnURL;
		}

		
		JSONObject resultJson = JSONObject.parseObject(data.getBackData());
		List<GoodVO> goodList =  null;
		try{
			goodList = JSONArray.parseArray(resultJson.get("goods").toString(),GoodVO.class);
		}catch(Exception e){
			e.printStackTrace();
		}
		
		YzPagingInfo paddingInfo = new YzPagingInfo(request,resultJson.getInteger("counts"));
		model.addAttribute("paddingInfo",paddingInfo);
		
		//model.addAttribute("page", page);
        model.addAttribute("totalPage", resultJson.getInteger("total_page"));
		model.addAttribute("goodList", goodList); 
		//model.addAttribute("userId", user.getId()); 
		return returnURL;
	}
}
