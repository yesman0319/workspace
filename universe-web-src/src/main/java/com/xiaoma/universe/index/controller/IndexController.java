package com.xiaoma.universe.index.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.support.SpringBootServletInitializer;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.xiaoma.rest.authentication.CacheUserInfo;
import com.xiaoma.rest.authentication.UserInfo;
import com.xiaoma.universe.common.interceptor.UserVo;
import com.xiaoma.universe.information.model.obj.InfoVo;
import com.xiaoma.universe.information.model.obj.PageBean;
import com.xiaoma.universe.information.service.InfoService;
import com.xiaoma.universe.learnplan.domain.vo.api.ExerciseHistoriesVO;
import com.xiaoma.universe.learnplan.domain.vo.api.PlanInfosVO;
import com.xiaoma.universe.learnplan.domain.vo.web.YztfPlanLabelPO;
import com.xiaoma.universe.learnplan.service.PlanService;
import com.xiaoma.universe.learnplan.service.YztfPlanlabelService;
import com.xiaoma.universe.livemanage.model.LivelessionVO;
import com.xiaoma.universe.livemanage.service.LivelessionService;
import com.xiaoma.universe.userlogin.controller.UserVO;
import com.xiaoma.universe.videomanage.model.vo.VideoCourses;
import com.xiaoma.universe.videomanage.service.VideoCoursesService;

@Controller
//@RequestMapping(value = "/index.html")
public class IndexController extends SpringBootServletInitializer {
	private static Logger logger = Logger.getLogger(IndexController.class);
	@Autowired
	private LivelessionService livelessionService;//直播课

	@Autowired
	private PlanService planService; //学习计划
	
	@Autowired
	private YztfPlanlabelService yztfPlanlabelService; //计划标签
	
	@Autowired
	private InfoService infoService; // 学习资料
	
	@Autowired
	private VideoCoursesService videoCoursesService;//视频课

	@RequestMapping(value = { "/", "/index.html" }, method = RequestMethod.GET)
	public String execute(Model model, HttpServletRequest request,@UserVo UserVO userInfo,Integer labelId) {
		model.addAttribute("defaultActive", "active");
		try {
			List<LivelessionVO> livelessionList = livelessionService.getIndexLivelessions(3);// 获取首页直播列表
			PlanInfosVO planInfosVO = planService.getAllPlan(request,288,1,labelId,null,null);//学习计划

			List<InfoVo> categoryList=infoService.getIndexInfos(5);	//资料			
			Map<String,Object> param =videoCoursesService.getListForIndex( 6,  1);//视频课
			List<VideoCourses> videoCourseList = (List<VideoCourses>) param.get("videocourses");
			List<YztfPlanLabelPO> yztfPlanLabelPOList = yztfPlanlabelService.getMap(); //获取计划分类，标签
			
			
			
			Integer counts = (Integer) param.get("total");
			if(counts!=null&&counts>6)
			{
				model.addAttribute("show", "0");	//显示更多
				model.addAttribute("videoCourseList", videoCourseList);		
			}
			else
			{
				model.addAttribute("show", "1");	//不显示更多
				model.addAttribute("videoCourseList", videoCourseList);		
			}
			
			model.addAttribute("labelId", labelId == null?0:labelId);
			model.addAttribute("userInfo", userInfo);
			model.addAttribute("yztfPlanLabelList", yztfPlanLabelPOList);
			model.addAttribute("livelessionList", livelessionList);
			model.addAttribute("planList", planInfosVO == null ? null : planInfosVO.getRows());				
			model.addAttribute("categoryList", categoryList);
			model.addAttribute("myPlanMap", null == userInfo ? null : planService.getMyPlanIndex(request,userInfo.getId()));//首页-统计+我的计划
			model.addAttribute("recommendExerciseList", planService.getRecommendExerciseIndex());//练习推荐
			model.addAttribute("peoplePracticingList", planService.getPeoplePracticingIndex(1,5));	//大家都在做
		}
		catch (Exception e) {
			logger.error(e.getMessage(), e);
			e.printStackTrace();
		}
		return "index";
	}
	
	@RequestMapping(value="/user/{userId}.html" , method=RequestMethod.GET)
	public String taUserCenter(Model model,HttpServletRequest request, @PathVariable("userId") Integer userId){			
		UserInfo taUserInfo = CacheUserInfo.getUserInfo(userId);
		if(null != taUserInfo){
			String nickName=taUserInfo.getNickname();
			if(StringUtils.isNotBlank(nickName)&&com.xiaoma.universe.common.utils.StringUtils.isMobileNO(nickName)){
				taUserInfo.setNickname(nickName.substring(0,3)+"****"+nickName.substring(7,nickName.length()));
			}
		}
		model.addAttribute("taUserInfo", taUserInfo);//用户		
		model.addAttribute("myPlanMap", planService.getMyPlanIndex(request,userId));//首页他的学习计划		
		model.addAttribute("planList", planService.getAllMyPlan(request,5,1,userId));//首页他的学习计划
		Map<String,Object> videoCourseMap = videoCoursesService.getLogForUser(userId, 1, 5);//观看的视频
		model.addAttribute("videoCourseList", videoCourseMap.get("list"));			
		ExerciseHistoriesVO exerciseHistoriesVO =planService.getExerciseWebHistory(request, 1, 5, userId);//练习记录
		model.addAttribute("exerciseHistoryList", null == exerciseHistoriesVO ? null : exerciseHistoriesVO.getResult());		
		PageBean pageBean = infoService.getPageDownloadHistory(null,1,5,userId);//下载历史		
		model.addAttribute("downloadHistoryList", null == pageBean ? null : pageBean.getDhList());		
		return "personal/user_center";
	}
	
	@RequestMapping(value="/protocol.html" , method=RequestMethod.GET)
	public String protocol(Model model){		
		return "protocol/protocol";
	}
	
}
