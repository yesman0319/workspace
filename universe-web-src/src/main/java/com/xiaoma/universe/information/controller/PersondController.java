package com.xiaoma.universe.information.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.xiaoma.universe.information.model.obj.PageBean;
import com.xiaoma.universe.information.service.InfoService;
@Controller
@RequestMapping("/personal")
public class PersondController extends BaseController{
	 private static final Logger logger = LoggerFactory.getLogger(PersondController.class);
	 
	 @Autowired
	 private InfoService infoService;
	 
		@RequestMapping(value="/docs",method=RequestMethod.GET)
		public String permit(HttpServletRequest request,Model model,Integer page,Integer pageSize){
			if(page==null || page<1){
				page=1;
			}
			if(pageSize==null || pageSize<1){
				pageSize=20;
			}
				PageBean pageBean = infoService.getPageDownloadHistory(request,page,pageSize,null);
                model.addAttribute("page", pageBean.getPage());
                model.addAttribute("totalPage", pageBean.getTotalPage());
				model.addAttribute("dhlist", pageBean.getDhList());
				model.addAttribute("pageSize", pageSize);
				model.addAttribute("total", pageBean.getTotal());
				model.addAttribute("downloadHistory", "cur");
				model.addAttribute("pageActive", "pageActive");
		        return "personal/user_download_history";
		}
	
}
