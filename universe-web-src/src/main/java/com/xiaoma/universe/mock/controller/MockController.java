package com.xiaoma.universe.mock.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xiaoma.universe.mock.model.MkTpoVo;
import com.xiaoma.universe.mock.service.MockService;

@RequestMapping("tpomock/html")
public class MockController {
    private static final Logger logger = LoggerFactory.getLogger(MockController.class);
    @Autowired 
    private MockService mockService;
    
   //模考首页跳转
	@RequestMapping(value="/index")
	public String index(Model model){
		List<MkTpoVo> tpolist =mockService.getTpoList();
		model.addAttribute("tpolist", tpolist);
		model.addAttribute("tpomockActive", "active");
	   return "mock/index";
	}

		//模考结果页跳转
		@RequestMapping(value="/result")
		public String result(Model model){
			model.addAttribute("tpomockActive", "active");
		   return "mock/result";
		}
	//模考请求做题的页面跳转
	@RequestMapping(value="/checkLogin")
	@ResponseBody
	public boolean checkLogin(HttpServletRequest request){
	  boolean flag = mockService.getLoginStatus(request);
	   return flag;
	}
	
	 //模考首页跳转
		@RequestMapping(value="/reading.html")
		public String reading(Model model){
			model.addAttribute("tpomockActive", "active");
		   return "mock/reading";
		}
		//模考首页跳转
		@RequestMapping(value="/writing.html")
		public String writing(Model model){
			model.addAttribute("tpomockActive", "active");
			return "mock/writing";
		}
		//模考首页跳转
		@RequestMapping(value="/complete.html")
		public String complete(Model model){
			model.addAttribute("tpomockActive", "active");
			return "mock/complete";
		}
		//模考首页跳转
		@RequestMapping(value="/speaking.html")
		public String speaking(Model model){
			model.addAttribute("tpomockActive", "active");
			return "mock/speaking";
		}
		//模考首页跳转
		@RequestMapping(value="/listening.html")
		public String listening(Model model){
			model.addAttribute("tpomockActive", "active");
			return "mock/listening";
		}
	
}
