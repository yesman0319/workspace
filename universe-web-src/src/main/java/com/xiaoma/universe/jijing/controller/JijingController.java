package com.xiaoma.universe.jijing.controller;

import java.lang.ProcessBuilder.Redirect;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.xiaoma.rest.authentication.UniverseSession;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.api.JsonUtil;
import com.xiaoma.universe.common.contant.ShareExerciseTypeEnum;
import com.xiaoma.universe.common.interceptor.UserVo;
import com.xiaoma.universe.common.paging.YzPagingInfo;
import com.xiaoma.universe.common.utils.BigDecimalUtils;
import com.xiaoma.universe.h5.model.SpeakWriteH5VO;
import com.xiaoma.universe.h5.service.H5Service;
import com.xiaoma.universe.jijing.model.GroupQuestionVO;
import com.xiaoma.universe.jijing.model.JijingQuestionVO;
import com.xiaoma.universe.jijing.model.PageJijingGroup;
import com.xiaoma.universe.jijing.service.JijingService;
import com.xiaoma.universe.learnplan.domain.vo.api.PlanDayDetailVO;
import com.xiaoma.universe.learnplan.domain.vo.api.PlanDayExerciseVO;
import com.xiaoma.universe.learnplan.domain.vo.api.PlanDetailVO;
import com.xiaoma.universe.learnplan.domain.vo.api.PlanUserOneDayStatisticVO;
import com.xiaoma.universe.learnplan.domain.vo.api.exercise.IntensiveListeningQuestionParagraphVO;
import com.xiaoma.universe.learnplan.domain.vo.api.exercise.IntensiveListeningQuestionSentenceVO;
import com.xiaoma.universe.learnplan.domain.vo.api.exercise.IntensiveListeningQuestionVO;
import com.xiaoma.universe.learnplan.domain.vo.api.exercise.NewTranslateVO;
import com.xiaoma.universe.learnplan.domain.vo.api.exercise.NewTranslatesVO;
import com.xiaoma.universe.learnplan.domain.vo.api.exercise.PreparationVO;
import com.xiaoma.universe.learnplan.domain.vo.api.exercise.SpokenVO;
import com.xiaoma.universe.learnplan.domain.vo.api.exercise.SpokensVO;
import com.xiaoma.universe.learnplan.domain.vo.api.exercise.TranslateVO;
import com.xiaoma.universe.learnplan.domain.vo.api.exercise.TranslatesVO;
import com.xiaoma.universe.learnplan.domain.vo.api.exercise.WordQuestionsVO;
import com.xiaoma.universe.learnplan.domain.vo.api.exercise.difficultSentence.DifficultSentenceGroupVO;
import com.xiaoma.universe.learnplan.service.PlanService;
import com.xiaoma.universe.learnplan.util.SortExerciseComparator;
import com.xiaoma.universe.livemanage.response.ListResult;
import com.xiaoma.universe.userlogin.controller.UserVO;


@Controller
@RequestMapping("jijing")
public class JijingController {
    Logger logger = Logger.getLogger(JijingController.class);
	@Autowired
	private JijingService jijingService;
	@Autowired
	private H5Service exerciseServie;
	@Autowired
	private PlanService planServie;
	
	@RequestMapping(method=RequestMethod.GET)
	public String jijing(HttpServletRequest request,Model model,Integer year,Integer month,Integer type,Integer studyType,
			Integer page,Integer page_size,@UserVo UserVO userInfo){
    try{
       if(userInfo==null){
    	   return "redirect:/login";
       }
	   PageJijingGroup group =   jijingService.getJijingGroup();
	   if(year==null){
		   year= group.getyData().get(0).getYear();
		   month=0;
		   type=1;
		   studyType=0;
	   }
	   if(page==null){
		   page=1;
	   }
	   if(page_size==null){
		   page_size=20;
	   }
	   GroupQuestionVO que = jijingService.getJijingQuestions(year,month,type,studyType,page,page_size,request);
	   model.addAttribute("ydata", group.getyData());
	   model.addAttribute("plans", group.getPlans());
	   List<JijingQuestionVO> list = que.getQuestions();
		if(que!=null){
			model.addAttribute("questions", que.getQuestions()); 
			System.out.println(que.getTotal());
			YzPagingInfo paddingInfo = new YzPagingInfo(request,que.getTotal());
			model.addAttribute("paddingInfo",paddingInfo);
		}
		model.addAttribute("year", year);
		model.addAttribute("month", month);
		model.addAttribute("type", type);
    }catch(Exception e){
		logger.error("信息发生错误：",e);
		model.addAttribute("message", e.getMessage());
		return "error";
	}
		return "/jijing/jijing_detail";
	}
	
	@RequestMapping(value="/exercise")
	public String planExercise(HttpServletRequest request,Model model,Integer type,Integer questionId,String result,String page_size,String page,
			@UserVo UserVO user,String name,String country, String groupType){
		try{ 
			Object learnplan_show_tip =  UniverseSession.getAttribute("learnplan_show_tip");
			boolean show_tip = true;
			if(learnplan_show_tip!=null){
				show_tip = false;
			}else{
				UniverseSession.setAttribute("learnplan_show_tip", "show");
			}
			
			String token = ApiClient.getUserOrAppToken(request); 
			boolean islogin;
			if(user == null || user.getId() <= 0){ 
				islogin = false;
			}else{
				islogin = true;
				model.addAttribute("userId",user.getId());
			}
			int moduleID=0;
			String moduleName="";
			if(type==1){
				moduleName="机经口语";
				 moduleID = 17;
			}else if(type==2){
				moduleName="机经写作";
				 moduleID = 18;
			}
			String title="";
			if(StringUtils.isBlank(groupType)){
				title=name+" "+country;
			}else{
				title=name+" "+country+" "+groupType+"卷";
			}
			model.addAttribute("name", title);
			model.addAttribute("moduleName", moduleName);
			model.addAttribute("questionID", questionId);
            model.addAttribute("moduleID", moduleID);
			model.addAttribute("islogin",islogin);
			model.addAttribute("result",result);
			model.addAttribute("token", token);
			model.addAttribute("show_tip", show_tip);
			model.addAttribute("apiUrl",PlanService.PLAN_API_URL); 
			
		}catch(Exception e){
			e.getStackTrace();
			logger.debug( e.getStackTrace().toString()); 
		} 
		return "jijing/jijing_exercise";
	}
	
	@RequestMapping("/more/{type}/{question_id}.html")
	public String exerciseShare(Model model, @PathVariable("type") Integer type,
			@PathVariable("question_id") Integer question_id,String name,
			Integer page, Integer page_size, HttpServletRequest request) {
		try {
			if (type == null || StringUtils.isEmpty(ShareExerciseTypeEnum.getKeyByValue(type))) {
				throw new Exception("type类型错误");
			}
			if (question_id == null || question_id <= 0) {
				throw new Exception("question_id错误");
			}

			page = (page == null || page <= 0) ? 1 : page;
			page_size = (page_size == null || page_size <= 0) ? 20 : page_size;

			int uid = 0;
			UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
			if (user != null && user.getId() > 0) {
				uid = user.getId();
			}

			// 导航
			model.addAttribute("planActive", "active");

			// 做题跳转的参数
			model.addAttribute("type", type);
			model.addAttribute("questionId", question_id);
			model.addAttribute("uid", uid);
			model.addAttribute("page", page);
			model.addAttribute("name", name);


			// 获取分享的题目
			SpeakWriteH5VO vo = exerciseServie.getSpeakWrite(uid, question_id, type, 0, page_size, page);
			if (vo == null) {
				String error = String.format("用户uid = %d，获取plan_id = %d，type = %d ，question_id = %d 的数据为null", uid,
						null, type, question_id);
				throw new Exception(error);
			}
			model.addAttribute("vo", vo);

			// 分页
			ListResult<?> result = new ListResult<>();
			result.setCounts(vo.getCounts());
			result.setPage(page);
			result.setRows(page_size);
			model.addAllAttributes(ListResult.getPaging(result));
			String title = ShareExerciseTypeEnum.getKeyByValue(type);
			// 标题
			model.addAttribute("title", title);
			model.addAttribute("shareTitle", URLEncoder.encode(title, "UTF-8"));

			// 获取写作的数据
			if (type == ShareExerciseTypeEnum.IndependenceWrittngs.getValue()
					|| type == ShareExerciseTypeEnum.MachineWritings.getValue()) {
				return "jijing/jijing_share_write";
			}

			// 听力的数据
			if (type == ShareExerciseTypeEnum.IndependenceSpeakings.getValue()
					|| type == ShareExerciseTypeEnum.MachineSpeakings.getValue()) {
				return "jijing/jijing_share_speak";
			}

			return "500";
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return "500";
		}
	}
}
