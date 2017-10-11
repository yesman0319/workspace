package com.xiaoma.universe.h5.controller;

import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.xiaoma.rest.authentication.UniverseSession;
import com.xiaoma.universe.common.paging.YzPagingInfo;
import com.xiaoma.universe.common.utils.TimeUtil;
import com.xiaoma.universe.h5.model.CommentVO;
import com.xiaoma.universe.h5.model.CommentVOP;
import com.xiaoma.universe.h5.model.SpeakWriteH5VO;
import com.xiaoma.universe.h5.model.SpeakWriteShare;
import com.xiaoma.universe.h5.service.CommentService;
import com.xiaoma.universe.h5.service.H5Service;
import com.xiaoma.universe.information.service.InfoService;
import com.xiaoma.universe.learnplan.domain.vo.api.PlanDetailVO;
import com.xiaoma.universe.userlogin.controller.UserVO;

@Controller
public class CommentController {
     private static Logger logger = Logger.getLogger(CommentController.class);
     
     @Autowired
     private InfoService infoService;
     @Autowired
     private CommentService commentService;
 	 @Autowired
 	 private H5Service h5Service;
     
     @RequestMapping(value="/comment/{type}/{answerId}",method=RequestMethod.GET)
     public String CommentList(Model model,HttpServletRequest request,@PathVariable("type") Integer type,@PathVariable("answerId") Integer answerId,Integer planId,
    		 Integer page,Integer page_size,Integer questionId,Integer shareId){
    		if(page==null || page<1){
    			page=1;
    		}
    		if(page_size==null || page_size<0){
    			page_size=6;
    		}
    	 try{
    		 UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
    		 if(user!=null){
        	     model.addAttribute("headpig", user.getAvatar());
        	 }else{
        		 model.addAttribute("headpig", "");
        	 }
    		CommentVOP comp= commentService.getCommentList(type,answerId,page,page_size,request);
    		YzPagingInfo paddingInfo = new YzPagingInfo(request,comp.getTotal(),page_size);
			model.addAttribute("paddingInfo",paddingInfo);
			List<CommentVO> commenlist = comp.getCommentList();
			for (CommentVO commentVO : commenlist) {
				String str= commentVO.getCommentTxt().replaceAll("(\r\n|\r|\n|\n\r)", "<br>");
				commentVO.setCommentTxt(str);
			}
    		model.addAttribute("commentList", comp.getCommentList());
    		SpeakWriteH5VO vo = h5Service.getSpeakWrite(0, questionId, type, shareId, 20, 1);
    		model.addAttribute("quegroup", vo);
    		if(vo!=null){
    			List<SpeakWriteShare> list = vo.getList();
    			if(list.size()>0){
    				SpeakWriteShare question = list.get(0);
    				String content = question.getContent().replaceAll("(\r\n|\r|\n|\n\r)", "<br>");
    				question.setContent(content);
    				question.setSpendTime2(TimeUtil.intToTime2(question.getSpendTime()));
    				model.addAttribute("question", list.get(0));
    				if(null!=list.get(0).getCreate_date())
    				model.addAttribute("shareTime", TimeUtil.DateBeaferNow(new Date(list.get(0).getCreate_date())));
    			}else{
    				model.addAttribute("question", null);
    			}
    		}
    		 //关联的计划
            if(planId!=null){
                List<PlanDetailVO> plans = infoService.getPlanByIds(request,planId.toString());
               if(plans.size()>0){
            	   PlanDetailVO plan = plans.get(0);
            	   model.addAttribute("plan", plan);
               }
            }
            model.addAttribute("type", type);
            model.addAttribute("answerId", answerId);
            model.addAttribute("questionId", questionId);
            model.addAttribute("shareId", shareId);
    		}catch(Exception e){
    			logger.debug(e +"信息："+e.getMessage());
    			model.addAttribute("message", e.getMessage());
    			return "500";
    		}
    	 if(type==1 || type==3){
    		 return "learnplan/speak_comment"; 
    	 }
    	 if(type==2 || type==4){
    		 return "learnplan/write_comment";
    	 }
    	 return "500";
     }
     
     @RequestMapping(value="/comment",method=RequestMethod.POST)
     @ResponseBody
     public String commentSave(Model model,HttpServletRequest request,CommentVO commentVo){
    	 UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
    	 if(user==null){
    		 return "login";
    	 }
    	String flag = commentService.saveComment(request,commentVo);
    	 return flag;
     }
     @RequestMapping(value="/comment/{id}",method=RequestMethod.DELETE)
     @ResponseBody
     public String commentSave(Model model,HttpServletRequest request,@PathVariable("id") Integer id){
         String flag = commentService.deleteById(request,id);
    	 return flag;
     }
}
