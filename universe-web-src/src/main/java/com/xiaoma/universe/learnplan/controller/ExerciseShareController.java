package com.xiaoma.universe.learnplan.controller;

import java.net.URLEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.xiaoma.rest.authentication.UniverseSession;
import com.xiaoma.universe.common.contant.ShareExerciseTypeEnum;
import com.xiaoma.universe.h5.model.SpeakWriteH5VO;
import com.xiaoma.universe.h5.service.H5Service;
import com.xiaoma.universe.information.controller.BaseController;
import com.xiaoma.universe.learnplan.domain.vo.api.PlanDetailVO;
import com.xiaoma.universe.learnplan.service.PlanService;
import com.xiaoma.universe.livemanage.response.ListResult;
import com.xiaoma.universe.userlogin.controller.UserVO;

/**
 * 联系分享的接口
 * 
 * @author Administrator
 */
@Controller
@RequestMapping("/exercise")
public class ExerciseShareController extends BaseController {

	private static Logger logger = Logger.getLogger(ExerciseShareController.class);

	@Autowired
	private H5Service exerciseServie;

	@Autowired
	private PlanService planServie;

	/**
	 * 1机经口语 2 机经写作 3 独立口语 4独立写作 联系分享的数据
	 * 
	 * @param model
	 * @param plan_id
	 *            计划
	 * @param type
	 *            类型
	 * @param question_id
	 * @param exercise_id
	 * @param day_id
	 *            天数
	 * @param page
	 * @param page_size
	 * @param request
	 * @return
	 */
	@RequestMapping("/speakingswritings/{type}/{question_id}.html")
	public String exerciseShare(Model model, @PathVariable("type") Integer type,
			@PathVariable("question_id") Integer question_id, Integer day_id, Integer plan_id, Integer exercise_id,
			Integer page, Integer page_size, HttpServletRequest request) {
		try {
			if (type == null || StringUtils.isEmpty(ShareExerciseTypeEnum.getKeyByValue(type))) {
				throw new Exception("type类型错误");
			}
			if (question_id == null || question_id <= 0) {
				throw new Exception("question_id错误");
			}
//			if (exercise_id == null || exercise_id <= 0) {
//				throw new Exception("exercise_id错误");
//			}
//			if (plan_id == null || plan_id <= 0) {
//				throw new Exception("plan_id错误");
//			}
//			if (day_id == null || day_id <= 0) {
//				throw new Exception("day_id错误");
//			}
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
			model.addAttribute("dayId", day_id);
			model.addAttribute("exerciseId", exercise_id);
			model.addAttribute("planId", plan_id);
			model.addAttribute("type", type);
			model.addAttribute("questionId", question_id);
			model.addAttribute("uid", uid);
			model.addAttribute("page", page);

			// 获取计划详情
			PlanDetailVO plan = planServie.getPlanDetail(null, plan_id.toString());
			if (plan != null && plan.getId() == plan_id.intValue()) {
				model.addAttribute("plan", plan);
			}

			// 获取分享的题目
			SpeakWriteH5VO vo = exerciseServie.getSpeakWrite(uid, question_id, type, 0, page_size, page);
			if (vo == null) {
				String error = String.format("用户uid = %d，获取plan_id = %d，type = %d ，question_id = %d 的数据为null", uid,
						plan_id, type, question_id);
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
				return "learnplan/exercise_share_write";
			}

			// 听力的数据
			if (type == ShareExerciseTypeEnum.IndependenceSpeakings.getValue()
					|| type == ShareExerciseTypeEnum.MachineSpeakings.getValue()) {
				return "learnplan/exercise_share_speak";
			}

			return "500";
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return "500";
		}
	}

	/**
	 * 增加或者删除点赞
	 * 
	 * @Methods Name addOrCancelPraise
	 * @Create In 2016年10月13日 By dangxingfei@xiaoma.cn
	 * @param request
	 * @param response
	 * @param shareId
	 *            分享的id
	 * @param type
	 *            type类型（1点赞，2取消点赞） void
	 */
	@RequestMapping(value = "/praises", method = RequestMethod.POST)
	public void addOrCancelPraise(HttpServletRequest request, HttpServletResponse response, Integer shareId,
			Integer type) {
		if (shareId == null || shareId <= 0 || type == null || type <= 0 || (type != 1 && type != 2)) {
			flushText("error", response);
			return;
		}

		UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
		if (user == null || user.getId() <= 0) {
			flushText("nologin", response);
			return;
		}

		try {
			boolean success = planServie.addOrCancelPraise(shareId, type, user);
			flushText(success ? "success" : "error", response);
			return;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			flushText("error", response);
			return;
		}
	}

}
