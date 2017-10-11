package com.xiaoma.universe.information.controller;

import java.util.Iterator;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xiaoma.universe.common.utils.upyun.UpYunUtils;
import com.xiaoma.universe.information.model.Category;
import com.xiaoma.universe.information.model.Info;
import com.xiaoma.universe.information.model.Label;
import com.xiaoma.universe.information.model.obj.InfoDayRecommend;
import com.xiaoma.universe.information.model.obj.InfoVo;
import com.xiaoma.universe.information.model.obj.PageBean;
import com.xiaoma.universe.information.service.InfoService;
import com.xiaoma.universe.learnplan.domain.vo.api.PlanDetailVO;


@Controller
@RequestMapping(value="/docs")
public class InfoController extends BaseController{
    private static final Logger logger = LoggerFactory.getLogger(InfoController.class);
    
    @Autowired 
     private InfoService infoService;
    
    //资料首页
	@RequestMapping(value="")
	public String index(Model model){
		model.addAttribute("infoActive", "active");
      try{
		//获取资料分类
    	  List<Category> categoryList = infoService.getCategoryList();
		  model.addAttribute("categoryList", categoryList);
		  System.out.println(categoryList);
	
	     //获取资料标签
		 List<Label> labelList = infoService.getLabelList();
		 model.addAttribute("labelList", labelList);
		 System.out.println(labelList);

        //获取资料下分类前几条展示
	      List<InfoVo> infoVoList = infoService.getIndexInfos(5);
	      model.addAttribute("infoVolist", infoVoList);
	      
		//展示下载榜
	      List<Info> dinfoList = infoService.getInfoByDownLoad();
          model.addAttribute("dinfoList",dinfoList);

		//今日首推的下载资料
         InfoDayRecommend infoDayFist = infoService.getInfoDayFist();
         model.addAttribute("tcate", infoDayFist.getCategory());
         model.addAttribute("tinfo", infoDayFist.getInfo());
      }catch(Exception e){
    	  e.getStackTrace();
    	  logger.error(e.getMessage(),e);
      }
		return "info/info";
	}

	//资料类表页
	@RequestMapping(value="/list")
	public String info(Model model,String token,Integer categoryId,boolean islike,String name,String label,String sort,Integer page,Integer pageSize){
		if(sort==null){
			sort="download";
		}
		if(page==null || page<1){
			page=1;
		}
		if(pageSize==null || pageSize<0){
			pageSize=10;
		}
		try{
		
			//获取资料分类
	    	  List<Category> categoryList = infoService.getCategoryList();
			  model.addAttribute("categoryList", categoryList);
			  System.out.println(categoryList);
			  
	       //获取资料标签
			 List<Label> labelList = infoService.getLabelList();
			 model.addAttribute("labelList", labelList);
			 System.out.println(labelList);
			 
			//资料
			 PageBean pinfo = infoService.getInfoList(categoryId,islike,label,name,page,sort,pageSize);
	            model.addAttribute("page", pinfo.getPage());
                model.addAttribute("totalPage", pinfo.getTotalPage());
				model.addAttribute("infoList", pinfo.getInfoList());
				model.addAttribute("pageActive", "pageActive");
				
			//展示同类推荐榜
		      List<Info> dinfoList = infoService.getInfoByDownLoad();
	            model.addAttribute("dinfoList",dinfoList);
				model.addAttribute("name", name);
				model.addAttribute("label", label);
				model.addAttribute("islike", islike);
				model.addAttribute("categoryId", categoryId);
				model.addAttribute("sort",sort);
		    return "info/info_list";
	}catch(Exception e){
		logger.error("信息发生错误：",e);
		model.addAttribute("message", e.getMessage());
		return "error";
	}
	}
	
	
	@RequestMapping(value="/{id}")
	public String onlyinfo(HttpServletRequest request,Model model,String token,@PathVariable("id") Integer id){
		try{
	     Info info = infoService.getInfoById(id);
		 model.addAttribute("info",info);
		 Category cate = infoService.getCategoryById(info.getCategoryId());
		 model.addAttribute("cate", cate);
		//同类资料
	    PageBean pageb = infoService.getInfoList(info.getCategoryId(), false, null, null, 1,"download", 5);
	    List<Info> dinfoList = pageb.getInfoList();
	    Iterator<Info> iterator = dinfoList.iterator();
	     while(iterator.hasNext()){
	    	 Info f= iterator.next();
	    	 if(f.getId()==info.getId()){
	    		 iterator.remove();
	    	 }
	     }
        model.addAttribute("dinfoList",dinfoList);
        //关联的计划
        if(info.getPlanIds()!=null || info.getPlanIds()!=""){
            List<PlanDetailVO> plans = infoService.getPlanByIds(request,info.getPlanIds());
            model.addAttribute("plans", plans);
           Integer planId=0;
           boolean flag=false;
           if(plans.size()>0){
        	   planId= plans.get(0).getId();
        	   flag= plans.get(0).getPlanStatus()==13 || plans.get(0).getPlanStatus()==8?true:false;
           }
           model.addAttribute("planId", planId);
           model.addAttribute("flag", flag);
        }
        //展示链接权
        if(!info.getFileContentType().equals("rar")){
           String swt = UpYunUtils.upt(info.getFileUrl());
           model.addAttribute("swt", swt);
        }
		return "info/info_detail";	

	}catch(Exception e){
		e.printStackTrace();
		logger.error(e +"信息："+e.getMessage(),e);
		model.addAttribute("message", e.getMessage());
		return "error";
	}		
  }
	
	/**
	 * 查看是否有下载权限
	 * @param request
	 * @param id
	 * @return
	 */
	@RequestMapping(value="/permit",method=RequestMethod.GET)
	@ResponseBody
	public String permit(HttpServletRequest request,Integer id){
	    String permit = infoService.getPermit(request,id);
	     return permit;
	}
	
	/**
	 * 下载后相关数据的更新
	 * @param request
	 * @param id
	 * @param ip
	 * @return
	 */
	@RequestMapping(value="/up_save",method=RequestMethod.GET)
	@ResponseBody
	public String up_save(HttpServletRequest request,Integer id,String ip){
            String value = infoService.saveDownloadHistory(request,id,ip);
		    return value;	
	}
}
