package com.xiaoma.universe.videomanage.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.httpclient.HttpStatus;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSONObject;
import com.xiaoma.rest.authentication.UniverseSession;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.paging.YzPagingInfo;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.common.utils.StringUtils;
import com.xiaoma.universe.common.utils.TimeHelper;
import com.xiaoma.universe.livemanage.service.LivelessionService;
import com.xiaoma.universe.topic.vo.NodeVO;
import com.xiaoma.universe.userlogin.controller.UserVO;
import com.xiaoma.universe.videomanage.model.vo.CourseForWebByIdVo;
import com.xiaoma.universe.videomanage.model.vo.VideoCourses;
import com.xiaoma.universe.videomanage.service.VideoCoursesService;

@Controller
@RequestMapping(value = "/courses")
public class VideoCoursesController {
	@Autowired
	private VideoCoursesService videoCoursesService;
	private static Logger logger = Logger.getLogger(VideoCoursesController.class);

	/**
	 * 根据id获得课程 @Title: getVideoCourseById @Description: TODO @param @param
	 * request @param @param response @param @param model @param @param
	 * id @param @return 设定文件 @return String 返回类型 @throws
	 */
	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public String getVideoCourseById(HttpServletRequest request, HttpServletResponse response, Model model,
			@PathVariable("id") Integer id) {
		if (id == null || id <= 0) {
			return "500";
		}
		String hasDone = request.getParameter("hasDone");
		Map<String, Object> map = videoCoursesService.getVideoCourseById(id, request);
		model.addAttribute("videocourses", map.get("videoCourses"));
		model.addAttribute("listvideocourses", map.get("listVideoCourses"));
		model.addAttribute("listvideogroups", map.get("listVideoGroups"));
		model.addAttribute("hasDone", hasDone);
		String shareValue = "?source=weixin&medium=weixinfriend&campaign="
				+ ((CourseForWebByIdVo) map.get("videoCourses")).getName() + "课程";
		// 判断用户是否登录, 如果没有跳转到登录界面
		UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
		if (user != null) {
			shareValue = shareValue + "&campaignContent=uid" + user.getId();
		}
		try {
			model.addAttribute("shareValue", URLEncoder.encode(shareValue, "UTF-8"));

			// 获取对应的讨论区
			try {

				String url = LivelessionService.LIVELESSION_API_URL + "/topic/pn/2/"
						+ ((CourseForWebByIdVo) map.get("videoCourses")).getId() + "?productName="
						+ URLEncoder.encode(((CourseForWebByIdVo) map.get("videoCourses")).getName(), "utf-8");
				Map<String, String> headers = new HashMap<String, String>();
				headers.put("fromType", "web");
				ResponseData responseData = ApiClient.get(url, headers);
				if (responseData != null && responseData.getCode() == HttpStatus.SC_OK
						&& !StringUtils.isEmpty(responseData.getBackData())) {
					NodeVO node = JSONObject.parseObject(responseData.getBackData(), NodeVO.class);
					model.addAttribute("node", node);
				}
			} catch (Exception e) {
				e.printStackTrace();
				logger.error("获取 id = " + ((CourseForWebByIdVo) map.get("videoCourses")).getId() + "的视频的讨论区出现错误， e = "
						+ e.getMessage());
			}

		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return "videomanage/video_course";
	}

	/**
	 * 根据课程id和partid观看 @Title: getConyinueWatch @Description: TODO @param @param
	 * request @param @param response @param @param model @param @param
	 * id @param @return 设定文件 @return String 返回类型 @throws
	 */
	@RequestMapping(value = "/{courseId}/{partId}", method = RequestMethod.GET)
	public String getContinueWatch(HttpServletRequest request, HttpServletResponse response, Model model,
			@PathVariable("courseId") Integer courseId, @PathVariable("partId") Integer partId, Integer videoId,
			Integer lessionId) {
		String type = request.getParameter("type");
		Map<String, Object> map = videoCoursesService.getContinueWatchByParts(courseId, partId, request, type, videoId,
				lessionId);
		// model.addAttribute("partsDetailForWeb",
		// map.get("partsDetailForWeb"));
		// model.addAttribute("listVideoSections",
		// map.get("listVideoSections"));
		if (map == null) {
			return "500";
		}
		if (!map.containsKey("code")) {
			model.addAllAttributes(map);
			return "videomanage/video_course_play1";
		}
		int code = (int) map.get("code");
		if (code == 401) {
			String backurl = request.getRequestURI();
			return "forward:/login?backurl=" + backurl;
		}
		if (code == 403) {
			model.addAttribute("returnUrl", "/courses/" + courseId);
			return "warning";
		}
		if (code == 200) {
			model.addAllAttributes(map);
			return "videomanage/video_course_play1";
		}
		if (code == 400) {
			return "404";
		}
		return "500";
	}

	/**
	 * 免费加入 @Title: freeJoin @Description: TODO @param @param
	 * request @param @param response @param @param model @param @return
	 * 设定文件 @return String 返回类型 @throws
	 */
	@RequestMapping(value = "/freejoin", method = RequestMethod.GET)
	@ResponseBody
	public String freeJoin(HttpServletRequest request, HttpServletResponse response, Model model) {
		String courseId = request.getParameter("courseId");
		String goodId = request.getParameter("goodId");
		String useType = "1";// 使用类型（1按时间，2按次数）
		Long startTime = System.currentTimeMillis() - 6000;// 使用的开始时间
		Long endTime = TimeHelper.addMonth(new Date(startTime), 9999).getTime();// 使用的结束时间
		String status = "1";// 能否使用（0不能使用，1能使用）
		Long createTime = startTime;// createTime
		Map<String, String> params = new HashMap<String, String>();
		params.put("goodId", goodId);
		params.put("courseId", courseId);
		params.put("useType", useType);
		params.put("startTime", startTime.toString());
		params.put("endTime", endTime.toString());
		params.put("status", status);
		params.put("createTime", createTime.toString());

		String result = videoCoursesService.freeJoin(params, request);
		return result;
	}

	/**
	 * 购买课程 @Title: freeJoin @Description: TODO @param @param
	 * request @param @param response @param @param model @param @return
	 * 设定文件 @return String 返回类型 @throws
	 */
	@RequestMapping(value = "/buy", method = RequestMethod.GET)
	public String buyCourses(HttpServletRequest request, HttpServletResponse response, Model model) {
		String backUrl = "";
		String goodId = request.getParameter("goodId");
		backUrl = videoCoursesService.buyCourses(goodId, request);
		if (backUrl != null && !backUrl.equals("")) {
			return "redirect:" + backUrl + "&categoryType=4";
		} else {
			return "500";
		}
	}

	/**
	 * 删除加入 @Title: delJoin @Description: TODO @param @param
	 * request @param @param response @param @param model @param @return
	 * 设定文件 @return String 返回类型 @throws
	 */
	@RequestMapping(value = "/deljoin", method = RequestMethod.GET)
	@ResponseBody
	public String delJoin(HttpServletRequest request, HttpServletResponse response, Model model) {
		String premissionId = request.getParameter("premissionId");
		if (premissionId == null || premissionId.equals("")) {
			return "error";
		}
		String result = videoCoursesService.delJoin(premissionId, request);
		return result;
	}

	/**
	 * 个人中心删除 @Title: delJoin @Description: TODO @param @param
	 * request @param @param response @param @param model @param @return
	 * 设定文件 @return String 返回类型 @throws
	 */
	@RequestMapping(value = "/del", method = RequestMethod.GET)
	@ResponseBody
	public String del(HttpServletRequest request, HttpServletResponse response, Model model) {
		String courseId = request.getParameter("courseId");
		if (courseId == null || courseId.equals("")) {
			return "error";
		}
		String result = videoCoursesService.del(courseId, request);
		return result;
	}

	/**
	 * 查看订单 @Title: delJoin @Description: TODO @param @param
	 * request @param @param response @param @param model @param @return
	 * 设定文件 @return String 返回类型 @throws
	 */
	@RequestMapping(value = "/check/{premissionId}", method = RequestMethod.GET)
	@ResponseBody
	public String checkPremission(HttpServletRequest request, HttpServletResponse response, Model model,
			@PathVariable("premissionId") Integer premissionId) {
		// if(premissionId==null||premissionId.equals(""))
		if (premissionId == null || premissionId <= 0) {
			return "error";
		}
		String result = videoCoursesService.checkPremission(premissionId, request);
		return result;
	}

	@RequestMapping(value = "/session", method = RequestMethod.GET)
	@ResponseBody
	public String getSession(HttpServletRequest request, HttpServletResponse response) {
		UserVO userVO = (UserVO) request.getSession().getAttribute("userInfo");
		if (userVO == null) {
			return "error";
		} else {
			return "success";
		}
	}

	@RequestMapping(value = "/{planId}/{courseId}/{lessionId}/{videoId}", method = RequestMethod.GET)
	public String planSee(HttpServletRequest request, HttpServletResponse response, Model model,
			@PathVariable("planId") Integer planId, @PathVariable("courseId") Integer courseId,
			@PathVariable("lessionId") Integer lessionId, @PathVariable("videoId") Integer videoId, String planname) {
		Map<String, Object> map = videoCoursesService.planSee(courseId, lessionId, videoId, request);
		map.put("courseId", courseId);
		map.put("planId", planId);
		map.put("planname", planname);
		// 展示列表
		model.addAllAttributes(map);
		return "videomanage/video_course_play2";
	}

	@RequestMapping(value = { "/list", "/list.html" }, method = RequestMethod.GET)
	public String execute(HttpServletRequest request, HttpServletResponse response, Model model, Integer page_size,
			Integer page) {
		if (page_size == null) {
			page_size = YzPagingInfo.PAGE_SIZE_DEFAULT;
		}

		if (page == null) {
			page = 1;
		}

		Map<String, Object> param = videoCoursesService.getListForIndex(page_size, page);// 视频课
		List<VideoCourses> list = (List<VideoCourses>) param.get("videocourses");
		Integer total = (Integer) param.get("total");
		model.addAttribute("videoCourseList", list);
		YzPagingInfo paddingInfo = new YzPagingInfo(request, total);
		model.addAttribute("paddingInfo", paddingInfo);
		return "videomanage/video_course_list";
	}
}
