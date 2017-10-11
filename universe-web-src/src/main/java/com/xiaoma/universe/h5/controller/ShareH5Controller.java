package com.xiaoma.universe.h5.controller;

import java.net.URLDecoder;
import java.security.MessageDigest;
import java.util.ArrayList;
import java.util.Formatter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang.StringEscapeUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xiaoma.rest.authentication.CacheUserInfo;
import com.xiaoma.rest.authentication.UniverseSession;
import com.xiaoma.rest.authentication.UserInfo;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.contant.ShareExerciseTypeEnum;
import com.xiaoma.universe.common.utils.BigDecimalUtils;
import com.xiaoma.universe.common.utils.GenerateQrCodeUtil;
import com.xiaoma.universe.common.utils.HttpClientUtil;
import com.xiaoma.universe.common.utils.PropertiesUtils;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.common.utils.StringUtils;
import com.xiaoma.universe.h5.model.SpeakWriteCommentVO;
import com.xiaoma.universe.h5.model.SpeakWriteH5VO;
import com.xiaoma.universe.h5.model.SpeakWriteShare;
import com.xiaoma.universe.h5.model.SpokenH5VO;
import com.xiaoma.universe.h5.model.TranslateH5VO;
import com.xiaoma.universe.h5.model.vip.VipCardDTO;
import com.xiaoma.universe.h5.service.H5Service;
import com.xiaoma.universe.information.controller.BaseController;
import com.xiaoma.universe.learnplan.domain.vo.api.AudiosVO;
import com.xiaoma.universe.learnplan.domain.vo.api.PlanDayDetailVO;
import com.xiaoma.universe.learnplan.domain.vo.api.PlanDayExerciseVO;
import com.xiaoma.universe.learnplan.domain.vo.api.PlanDetailVO;
import com.xiaoma.universe.learnplan.domain.vo.api.VideosVO;
import com.xiaoma.universe.learnplan.service.PlanService;
import com.xiaoma.universe.learnplan.util.UserUtil;
import com.xiaoma.universe.livemanage.model.BroadcastVO;
import com.xiaoma.universe.livemanage.model.LiveLessionDetailVO;
import com.xiaoma.universe.livemanage.model.LivelessionVO;
import com.xiaoma.universe.livemanage.model.WxShareObj;
import com.xiaoma.universe.livemanage.service.LivelessionService;
import com.xiaoma.universe.microcourse.domain.vo.CourseForWebByIdVO;
import com.xiaoma.universe.microcourse.domain.vo.MicroArticleDetailVO;
import com.xiaoma.universe.microcourse.domain.vo.MicroArticleShareVO;
import com.xiaoma.universe.microcourse.domain.vo.MicroArticleVO;
import com.xiaoma.universe.microcourse.domain.vo.MicroCourseDetailVO;
import com.xiaoma.universe.microcourse.domain.vo.MicroCourseUserStatusVO;
import com.xiaoma.universe.microcourse.domain.vo.MicroMediaVO;
import com.xiaoma.universe.microcourse.domain.vo.MicroPlanVO;
import com.xiaoma.universe.microcourse.service.MicroCourseService;
import com.xiaoma.universe.userlogin.controller.UserVO;
import com.xiaoma.universe.wechat.model.dto.TWechatUsers;
import com.xiaoma.universe.wordschallenge.model.WordsChallengeTeacherInfo;
import com.xiaoma.universe.wordschallenge.model.dto.WordsChallengeSharesDTO;
import com.xiaoma.universe.wordschallenge.model.dto.WordsChallengeUserRankDTO;
import com.xiaoma.universe.wordschallenge.model.dto.WordsChallengeUserResults;
import com.xiaoma.universe.wordschallenge.model.dto.WordsChallengeUserShareRateDTO;
import com.xiaoma.universe.wordschallenge.service.WordsChanllengeService;

@Controller
@RequestMapping("/h5/")
public class ShareH5Controller extends BaseController {

	private static Logger logger = Logger.getLogger(ShareH5Controller.class);

	@Autowired
	private LivelessionService livelessionService;

	@Autowired
	private PlanService planService;

	@Autowired
	private MicroCourseService microCourseService;

	@Autowired
	private WordsChanllengeService wordsChanllengeService;

	@Autowired
	private H5Service h5Service;

	// * access_token，上一次获取的token值在2个小时内有效，会更改
	private static String ACCESS_TOKEN = "";

	// * jsapi_ticket 上一次获取的jsapi_ticket值在2个小时内有效，会更改
	private static String JSAPI_TICKET = "";

	// * expires_in 凭证有效时间(2个小时)
	private static final long EXPIRES_IN = 7200000;

	// * 上一次调用的token_TOKEN_URL的时间
	private static long TOKEN_LAST_REQUEST_TIME = 0;

	// 上一次调用的JSAPI_LAST_REQUEST_TIME的时间
	private static long JSAPI_LAST_REQUEST_TIME = 0;

	private static String APPID = "";
	private static String APP_SECRET = "";
	private static String TOKEN_URL = "";
	private static String JSAPI_TICKET_URL = "";
	
	
	
	
	private static String ALIYUN_MQTT_SERVERURI = "";
	private static String ALIYUN_MQTT_PORT = "";
	private static String ALIYUN_MQTT_USETLS = "";
	private static String ALIYUN_MQTT_CLEANSESSION = "";
	private static String ALIYUN_MQTT_ACCESSKEY = "";
	private static String ALIYUN_MQTT_SECRETKEY = "";
	private static String ALIYUN_MQTT_PRODUCER_TOPIC_A = "";
	private static String ALIYUN_MQTT_PRODUCER_TOPIC_B = "";
	private static String ALIYUN_MQTT_PRODUCER_GROUPID_A = "";
	private static String ALIYUN_MQTT_PRODUCER_GROUPID_B = "";

	static {
		APPID = PropertiesUtils.getString("WX_SHARE_APPID");
		APP_SECRET = PropertiesUtils.getString("WX_SHARE_APP_SECRET");
		TOKEN_URL = PropertiesUtils.getString("WX_SHARE_TOKEN_URL");
		JSAPI_TICKET_URL = PropertiesUtils.getString("WX_SHARE_JSAPI_TICKET_URL");
		ALIYUN_MQTT_SERVERURI = PropertiesUtils.getString("aliyun_mqtt_serverURI");
		ALIYUN_MQTT_PORT = PropertiesUtils.getString("aliyun_mqtt_port");
		ALIYUN_MQTT_USETLS = PropertiesUtils.getString("aliyun_mqtt_useTLS");
		ALIYUN_MQTT_CLEANSESSION = PropertiesUtils.getString("aliyun_mqtt_cleansession");
		ALIYUN_MQTT_ACCESSKEY = PropertiesUtils.getString("aliyun_mqtt_AccessKey");
		ALIYUN_MQTT_SECRETKEY = PropertiesUtils.getString("aliyun_mqtt_SecretKey");
		ALIYUN_MQTT_PRODUCER_TOPIC_A = PropertiesUtils.getString("aliyun_mqtt_producer_topic_a");
		ALIYUN_MQTT_PRODUCER_TOPIC_B = PropertiesUtils.getString("aliyun_mqtt_producer_topic_b");
		ALIYUN_MQTT_PRODUCER_GROUPID_A = PropertiesUtils.getString("aliyun_mqtt_producer_GroupId_a");
		ALIYUN_MQTT_PRODUCER_GROUPID_B = PropertiesUtils.getString("aliyun_mqtt_producer_GroupId_b");
	
	}

	/**
	 * 分享页面 内容包括昨天的回放课，今天的课程，明天的课程
	 * 
	 * @param request
	 * @param model
	 * @return
	 */
	@RequestMapping("/livelessions.html")
	public String shareLivelessionAndVideos(HttpServletRequest request, Model model) {

		try {
			System.out.println(request.getQueryString());
			Map<String, List<LivelessionVO>> results = livelessionService.getShareCourses();
			model.addAttribute("courseMap", results);
			return "h5/h5_livelession_list";
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return "h5/h5_500";
		}
	}

	/**
	 * @param request
	 * @param model
	 * @param id
	 *            视频的id
	 * @param token
	 *            用户的 token
	 * @param productTypeId
	 *            产品的类型id
	 * @param status
	 *            直播还是回放（１回放，２直播）
	 * @return
	 */
	@RequestMapping("/livelession/{id}.html")
	public String shareLivelession(HttpServletRequest request, Model model, @PathVariable("id") Integer id,
			String token, Integer status) {
		try {

			// 判断用户是否登录, 如果没有跳转到登录界面
			UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
			if (user == null || user.getId() <= 0) {
				return "redirect:/h5/show/login.html?successURL=" + getSuccessURL(request);
			}

			// 获取相关的视频参数
			int productTypeId = 0;
			ResponseData responseData = null;
			if (status == 1) {
				responseData = livelessionService.getBroadcastDetail(id, null, request);
			} else {
				responseData = livelessionService.getLivelessionDeatilById(id, request);
			}

			if (responseData == null) {
				model.addAttribute("canSee", false);
				model.addAttribute("errorMsg", "系统异常，请联系管理员！");
				logger.error("h5播放详情页面出错,无法获取返回值！");
				return "h5/h5_lession_detail";
			}

			if (responseData.getCode() == 401) {
				return "redirect:/h5/show/login.html?successURL=" + getSuccessURL(request);
			}

			if (responseData.getCode() == 403) {
				model.addAttribute("canSee", false);
				model.addAttribute("errorMsg", "用户没有权限观看，请联系客服购买！");
				return "h5/h5_lession_detail";
			}

			if (responseData.getCode() != 200) {
				throw new Exception(
						"h5播放详情页面出错，code = " + responseData.getCode() + "，message = " + responseData.getBackData());
			}

			JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
			if (status == 1) { // 回放
				BroadcastVO detail = JSON.toJavaObject(resultJson, BroadcastVO.class);
				if (detail != null && detail.getId() != null && detail.getId() > 0) {
					model.addAttribute("sign", detail.getBroadcastId());
					model.addAttribute("password", detail.getPassword());
					model.addAttribute("host", detail.getHost());
					model.addAttribute("status", 1);
					model.addAttribute("teacherName", detail.getTeacherName());
					model.addAttribute("startTime", detail.getStartTime());
					model.addAttribute("endTime", detail.getEndTime());
					model.addAttribute("courseName", detail.getName());
					productTypeId = detail.getProductTypeId();
				}

			} else if (status == 2) { // 直播
				LiveLessionDetailVO detail = JSON.toJavaObject(resultJson, LiveLessionDetailVO.class);
				if (detail != null && detail.getId() != null && detail.getId() > 0) {
					if (detail.getEndTime().getTime() < System.currentTimeMillis()) {
						model.addAttribute("canSee", false);
						model.addAttribute("errorMsg", "直播已经结束。");
						return "h5/h5_lession_detail";
					}

					String playUrl = detail.getPlayUrl();
					if (!StringUtils.isEmpty(playUrl)) {
						model.addAttribute("sign", playUrl.substring((playUrl.indexOf("-") + 1), playUrl.indexOf("?")));
					}
					model.addAttribute("password", detail.getRoomPwd());
					model.addAttribute("host", detail.getHost());
					model.addAttribute("status", detail.getStatus());
					model.addAttribute("teacherName", detail.getTeacherName());
					model.addAttribute("startTime", detail.getStartTime());
					model.addAttribute("endTime", detail.getEndTime());
					model.addAttribute("courseName", detail.getName());
					productTypeId = detail.getProductTypeId();
				}
			} else {
				throw new Exception("h5播放详情页面出错，参数 status = " + status);
			}

			// 相关的视频
			if (productTypeId <= 0) {
				productTypeId = 43;
			}
			List<BroadcastVO> lists = livelessionService.getRelatedBroadcast(productTypeId, 3);
			if (lists != null && lists.size() > 0) {
				model.addAttribute("courseDetails", lists);
			}

			return "h5/h5_lession_detail";
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			model.addAttribute("canSee", false);
			model.addAttribute("errorMsg", "系统异常，请联系管理员。");
			return "h5/h5_lession_detail";
		}
	}

	/**
	 * 生成二维码图片并直接以流的形式输出到页面
	 * 
	 * @param code_url
	 * @param response
	 */
	@RequestMapping("/qrcode.html")
	@ResponseBody
	public void getQRCode(String code_url, HttpServletResponse response, HttpServletRequest request) {
		try {
			String result = GenerateQrCodeUtil.encodeQrcode(code_url, response);
			if (result != null && result.equals("error")) {
				// 如果失败，则再生成一次
				result = GenerateQrCodeUtil.encodeQrcode(code_url, response);
			}
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage(), e);
		}
	}

	@RequestMapping("/plan/share/{id}.html")
	public String sharePlanInfo(HttpServletRequest request, Model model, @PathVariable("id") Integer id, String token,
			Integer status) {
		try {
			// 判断用户是否登录, 如果没有跳转到登录界面
			UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
			// if(user == null || user.getId() <= 0){
			// model.addAttribute("successURL", getSuccessURL(request));
			// return "h5/h5_login";
			// }

			PlanDetailVO planDetail = planService.getPlanDetail(request, "" + id);
			PlanDayDetailVO dayDetailVO = planService.getOnDayExercises(request, id.toString(), "-1");

			List<PlanDayExerciseVO> exercises = dayDetailVO.getExercises();
			List<PlanDayExerciseVO> readingList = new ArrayList<PlanDayExerciseVO>();
			List<PlanDayExerciseVO> listeningList = new ArrayList<PlanDayExerciseVO>();
			List<PlanDayExerciseVO> speakingList = new ArrayList<PlanDayExerciseVO>();
			List<PlanDayExerciseVO> writingList = new ArrayList<PlanDayExerciseVO>();
			List<PlanDayExerciseVO> prepList = new ArrayList<PlanDayExerciseVO>();
			int readingTime = 0;
			int listeningTime = 0;
			int speakingTime = 0;
			int writingTime = 0;
			int prepTime = 0;
			if (exercises != null) {
				for (PlanDayExerciseVO exerciseVO : exercises) {

					if ("1".equals(exerciseVO.getKind())) {// 听力
						listeningList.add(exerciseVO);
						listeningTime = readingTime + (BigDecimalUtils.isNumber(exerciseVO.getEstimateTime())
								? Integer.valueOf(exerciseVO.getEstimateTime()) : 0);
					}
					if ("2".equals(exerciseVO.getKind())) {// 口语
						speakingList.add(exerciseVO);
						speakingTime = readingTime + (BigDecimalUtils.isNumber(exerciseVO.getEstimateTime())
								? Integer.valueOf(exerciseVO.getEstimateTime()) : 0);
					}
					if ("3".equals(exerciseVO.getKind())) {// 阅读
						readingList.add(exerciseVO);
						readingTime = readingTime + (BigDecimalUtils.isNumber(exerciseVO.getEstimateTime())
								? Integer.valueOf(exerciseVO.getEstimateTime()) : 0);
					}
					if ("4".equals(exerciseVO.getKind())) {// 写作
						writingList.add(exerciseVO);
						writingTime = readingTime + (BigDecimalUtils.isNumber(exerciseVO.getEstimateTime())
								? Integer.valueOf(exerciseVO.getEstimateTime()) : 0);
					}

					if ("5".equals(exerciseVO.getKind())) {// 预习
						prepList.add(exerciseVO);
						prepTime = prepTime + (BigDecimalUtils.isNumber(exerciseVO.getEstimateTime())
								? Integer.valueOf(exerciseVO.getEstimateTime()) : 0);
					}
				}
			}
			int audioStatus = 0;
			if (planDetail.getUserStatitic() != null) {
				audioStatus = planDetail.getUserStatitic().getUserStatus();
			}
			List<AudiosVO> audioList = planDetail.getAudios();
			List<VideosVO> videosVO = planDetail.getVideosVO();
			model.addAttribute("videoList", videosVO);
			model.addAttribute("readingTime", readingTime);
			model.addAttribute("listeningTime", listeningTime);
			model.addAttribute("speakingTime", speakingTime);
			model.addAttribute("writingTime", writingTime);
			model.addAttribute("prepTime", prepTime);
			model.addAttribute("readingList", readingList);
			model.addAttribute("listeningList", listeningList);
			model.addAttribute("speakingList", speakingList);
			model.addAttribute("writingList", writingList);
			model.addAttribute("prepList", prepList);
			model.addAttribute("audioList", audioList);
			model.addAttribute("audioStatus", audioStatus);
			model.addAttribute("user", user);
			model.addAttribute("nickname", UserUtil.getUserNickName(user));

			model.addAttribute("plan", planDetail);
			return "h5/h5_plan_share";
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
			return "h5/h5_500";
		}
	}

	@RequestMapping(value = "/plan/share/experience/{id}.html")
	public String planExperience(HttpServletRequest request, Model model, @PathVariable("id") String id) {
		UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
		try {
			// 判断用户是否登录, 如果没有跳转到登录界面

			if (user == null || user.getId() <= 0) {
				return "redirect:/h5/show/fastlogin.html?backUrl=" + getSuccessURL(request);
			}

			boolean succ = planService.experiencePlan(request, Integer.valueOf(id));

			if (!succ) {
				model.addAttribute("message", "开通免费体验失败，请稍后重试");
			}

			model.addAttribute("showExperienceTip", 1);
		} catch (Exception e) {
			e.getStackTrace();
			logger.debug(e.getStackTrace().toString());
		}

		try {
			PlanDetailVO planDetail = planService.getPlanDetail(request, "" + id);
			PlanDayDetailVO dayDetailVO = planService.getOnDayExercises(request, id.toString(), "-1");

			List<PlanDayExerciseVO> exercises = dayDetailVO.getExercises();
			List<PlanDayExerciseVO> readingList = new ArrayList<PlanDayExerciseVO>();
			List<PlanDayExerciseVO> listeningList = new ArrayList<PlanDayExerciseVO>();
			List<PlanDayExerciseVO> speakingList = new ArrayList<PlanDayExerciseVO>();
			List<PlanDayExerciseVO> writingList = new ArrayList<PlanDayExerciseVO>();
			int readingTime = 0;
			int listeningTime = 0;
			int speakingTime = 0;
			int writingTime = 0;

			if (exercises != null) {
				for (PlanDayExerciseVO exerciseVO : exercises) {

					if ("1".equals(exerciseVO.getKind())) {// 听力
						listeningList.add(exerciseVO);
						listeningTime = readingTime + (BigDecimalUtils.isNumber(exerciseVO.getEstimateTime())
								? Integer.valueOf(exerciseVO.getEstimateTime()) : 0);
					}
					if ("2".equals(exerciseVO.getKind())) {// 口语
						speakingList.add(exerciseVO);
						speakingTime = readingTime + (BigDecimalUtils.isNumber(exerciseVO.getEstimateTime())
								? Integer.valueOf(exerciseVO.getEstimateTime()) : 0);
					}
					if ("3".equals(exerciseVO.getKind())) {// 阅读
						readingList.add(exerciseVO);
						readingTime = readingTime + (BigDecimalUtils.isNumber(exerciseVO.getEstimateTime())
								? Integer.valueOf(exerciseVO.getEstimateTime()) : 0);
					}
					if ("4".equals(exerciseVO.getKind())) {// 写作
						writingList.add(exerciseVO);
						writingTime = readingTime + (BigDecimalUtils.isNumber(exerciseVO.getEstimateTime())
								? Integer.valueOf(exerciseVO.getEstimateTime()) : 0);
					}
				}
			}

			int audioStatus = 0;
			if (planDetail.getUserStatitic() != null) {
				audioStatus = planDetail.getUserStatitic().getUserStatus();
			}
			List<AudiosVO> audioList = planDetail.getAudios();
			List<VideosVO> videosVO = planDetail.getVideosVO();
			model.addAttribute("videoList", videosVO);
			model.addAttribute("readingTime", readingTime);
			model.addAttribute("listeningTime", listeningTime);
			model.addAttribute("speakingTime", speakingTime);
			model.addAttribute("writingTime", writingTime);
			model.addAttribute("readingList", readingList);
			model.addAttribute("listeningList", listeningList);
			model.addAttribute("speakingList", speakingList);
			model.addAttribute("writingList", writingList);
			model.addAttribute("audioList", audioList);
			model.addAttribute("audioStatus", audioStatus);
			model.addAttribute("plan", planDetail);
			model.addAttribute("user", user);
			model.addAttribute("nickname", UserUtil.getUserNickName(user));
		} catch (Exception e) {
			e.getStackTrace();
			logger.debug(e.getStackTrace().toString());
		}
		return "h5/h5_plan_share";
	}

	@RequestMapping("/plan/share/buy/{id}.html")
	public String planBuy(HttpServletRequest request, Model model, @PathVariable("id") Integer id, String token,
			Integer status) {
		try {
			// 判断用户是否登录, 如果没有跳转到登录界面
			UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
			if (user == null || user.getId() <= 0) {
				return "redirect:/h5/show/fastlogin.html?backUrl=" + getSuccessURL(request);
			}

			String back = planService.buyPlanH5(request, Integer.valueOf(id));
			return "redirect:" + back;
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
			return "h5/h5_500";
		}
	}

	@RequestMapping("/microcourse/courses/{courseId}")
	public String microCoursesDetail(HttpServletRequest request, @PathVariable("courseId") Integer courseId,
			Model model) {
		try {
			// 判断用户是否登录, 如果没有跳转到登录界面
			UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");

			MicroCourseDetailVO courseVO = microCourseService.getCourseDetail(request, courseId, false);

			List<MicroArticleVO> results = null;
			if (courseVO != null)
				results = courseVO.getArticleList();

			List<MicroArticleVO> newArticle = courseVO.getNewArticleList();

			model.addAttribute("courseVO", courseVO);
			model.addAttribute("newArticle", newArticle);
			model.addAttribute("results", courseVO.getArticleList());
			model.addAttribute("goodInfo", courseVO.getGoodInfo());
			MicroCourseUserStatusVO userStatus = courseVO.getUserStatus();
			if (userStatus.getStatus() != 1) {
				return "h5/microcourse/wei_course_info";
			}

			return "h5/microcourse/wei_course_detail_bought";
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
			return "h5/h5_500";
		}
	}

	@RequestMapping("/microcourse/courses/{courseId}/buy")
	public String microCoursesBuy(HttpServletRequest request, @PathVariable("courseId") Integer courseId, Model model) {
		try {
			// 判断用户是否登录, 如果没有跳转到登录界面
			UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
			if (user == null || user.getId() <= 0) {
				return "redirect:/h5/show/fastlogin.html?backUrl=" + getSuccessURL(request);
			}
			MicroCourseDetailVO courseVO = microCourseService.getCourseDetail(request, courseId, false);
			List<MicroArticleVO> results = null;
			if (courseVO != null)
				results = courseVO.getArticleList();

			List<MicroArticleVO> newArticle = courseVO.getNewArticleList();

			model.addAttribute("courseVO", courseVO);
			model.addAttribute("newArticle", newArticle);
			model.addAttribute("results", courseVO.getArticleList());
			model.addAttribute("goodInfo", courseVO.getGoodInfo());
			MicroCourseUserStatusVO userStatus = courseVO.getUserStatus();
			if (userStatus.getStatus() != 1) {
				return "redirect:/h5/product/pay/" + courseVO.getGoodid();
			}

			return "h5/microcourse/wei_course_detail_bought";
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
			return "h5/h5_500";
		}
	}

	@RequestMapping("/microcourse/courses/free/{courseId}")
	public String microCoursesFreeDetail(HttpServletRequest request, @PathVariable("courseId") Integer courseId,
			Model model) {
		try {
			// 判断用户是否登录, 如果没有跳转到登录界面
			UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");

			MicroCourseDetailVO courseVO = microCourseService.getCourseDetail(request, courseId, true);

			List<MicroArticleVO> results = null;
			if (courseVO != null)
				results = courseVO.getArticleList();
			model.addAttribute("courseVO", courseVO);
			model.addAttribute("results", results);
			return "h5/microcourse/wei_course_detail_free";
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
			return "h5/h5_500";
		}
	}

	@RequestMapping("/microcourse/article/{articleId}")
	public String microArticleDetail(HttpServletRequest request, @PathVariable("articleId") Integer articleId,
			Model model) {
		try {
			// 判断用户是否登录, 如果没有跳转到登录界面
			UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");

			MicroArticleDetailVO articleVO = microCourseService.getArticleDetail(request, articleId);

			MicroCourseUserStatusVO userStatus = articleVO.getUserStatus();
			if (articleVO.getIsFree() <= 0 && userStatus.getStatus() != 1) {
				return "redirect:/h5/microcourse/courses/" + articleVO.getCourseId();
			}

			List<MicroPlanVO> recommendPlanList = articleVO.getRecommendPlanList();
			List<CourseForWebByIdVO> recommendVideoList = articleVO.getRecommendVideoList();

			MicroMediaVO audioVO = null;
			if (articleVO.getAudioList() != null && articleVO.getAudioList().size() > 0)
				audioVO = articleVO.getAudioList().get(0);

			model.addAttribute("goodInfo", articleVO.getGoodInfo());
			model.addAttribute("userStatus", userStatus);
			model.addAttribute("goodInfo", articleVO.getGoodInfo());
			model.addAttribute("articleVO", articleVO);
			model.addAttribute("audioVO", audioVO);
			model.addAttribute("recommendPlanList", recommendPlanList);
			model.addAttribute("recommendVideoList", recommendVideoList);

			return "h5/microcourse/wei_article_details";
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
			return "h5/h5_500";
		}
	}

	@RequestMapping("/microcourse/article/usershare/{user}/{article}")
	public String microArticleDetailShare(HttpServletRequest request, @PathVariable("user") Integer user,
			@PathVariable("article") Integer article, Model model) {
		try {
			// 判断用户是否登录, 如果没有跳转到登录界面
			if (user == null || article == null) {
				return "h5/h5_500";
			}

			MicroArticleDetailVO articleVO = microCourseService.getArticleDetail(request, article);
			List<MicroArticleShareVO> userList = null;
			boolean haveRead = false;
			int numberUser = 0;
			UniverseSession.setAttribute("microcourse_weixin_user", user);
			UniverseSession.setAttribute("microcourse_weixin_article", article);
			if (articleVO.getIsFree() <= 0) {
				String microcourse_weixin_unionid = (String) UniverseSession.getAttribute("microcourse_weixin_unionid");
				if (StringUtils.isEmpty(microcourse_weixin_unionid)) {

					return "redirect:/wechat/authority/4";
				} else {
					userList = microCourseService.getArticleShareUsers(request, user, article);
				}
				if (userList != null) {
					for (MicroArticleShareVO shareUserVO : userList) {
						numberUser++;
						if (microcourse_weixin_unionid.equals(shareUserVO.getWeixinUnionid())) {
							haveRead = true;
							break;
						}
					}
				}
			} else {
				return "redirect:/h5/microcourse/article/" + article;
			}

			List<MicroPlanVO> recommendPlanList = articleVO.getRecommendPlanList();
			List<CourseForWebByIdVO> recommendVideoList = articleVO.getRecommendVideoList();

			MicroMediaVO audioVO = null;
			if (articleVO.getAudioList() != null && articleVO.getAudioList().size() > 0)
				audioVO = articleVO.getAudioList().get(0);

			model.addAttribute("goodInfo", articleVO.getGoodInfo());
			model.addAttribute("articleVO", articleVO);
			model.addAttribute("audioVO", audioVO);
			model.addAttribute("recommendPlanList", recommendPlanList);
			model.addAttribute("recommendVideoList", recommendVideoList);
			model.addAttribute("userinfo", CacheUserInfo.getUserInfo(user));
			model.addAttribute("userList", userList);
			model.addAttribute("numberUser", numberUser);
			model.addAttribute("userid", user);
			model.addAttribute("article", article);

			if (!haveRead) {
				return "h5/microcourse/wei_article_share";
			} else {
				return "h5/microcourse/wei_article_shareDetails";
			}

		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
			return "h5/h5_500";
		}
	}

	@RequestMapping("/microcourse/article/usershare/{user}/{article}/read")
	public String microArticleDetailShareRead(HttpServletRequest request, @PathVariable("user") Integer user,
			@PathVariable("article") Integer article, Model model) {
		try {
			// 判断用户是否登录, 如果没有跳转到登录界面
			if (user == null || article == null) {
				return "h5/h5_500";
			}
			TWechatUsers tWechatUsers = (TWechatUsers) UniverseSession.getAttribute("microcourse_weixin");
			if (tWechatUsers == null || StringUtils.isEmpty(tWechatUsers.getUnionId())) {
				return "redirect:/wechat/authority/4";
			}
			boolean succ = microCourseService.articleShareRead(request, user, article, tWechatUsers.getUnionId(),
					tWechatUsers.getNickName(), tWechatUsers.getHeadImgUrl());
			if (succ) {
				return "redirect:/h5/microcourse/article/usershare/" + user + "/" + article;
			} else {
				MicroArticleDetailVO articleVO = microCourseService.getArticleDetail(request, article);
				if (articleVO == null)
					return "h5/h5_500";

				MicroCourseDetailVO courseVO = microCourseService.getCourseDetail(request, articleVO.getCourseId(),
						true);
				List<MicroArticleVO> results = null;
				if (courseVO != null)
					results = courseVO.getArticleList();
				model.addAttribute("articleVO", articleVO);
				model.addAttribute("courseVO", courseVO);
				model.addAttribute("results", results);
				return "h5/microcourse/wei_article_shareEmpty";
			}

		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
			return "h5/h5_500";
		}
	}

	/**
	 * 显示登录界面
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping("/show/login.html")
	public String showLogin(HttpServletRequest request, HttpServletResponse response, Model model, String successURL) {
		model.addAttribute("successURL", successURL);
		return "h5/h5_login";
	}

	/**
	 * 登录h5
	 * 
	 * @param request
	 * @param response
	 * @param model
	 * @param loginName
	 *            用户名
	 * @param password
	 *            密码
	 * @param successURL
	 *            成功的回掉地址
	 * @return 400 名或密码错 401 密码错 403 禁用 500 系统错误
	 */
	@RequestMapping(value = "/login.html", method = RequestMethod.POST)
	public void login(HttpServletRequest request, HttpServletResponse response, Model model, String loginName,
			String password, String successURL) {
		JSONObject json = new JSONObject();
		json.put("success", false);
		// 检验参数
		if (StringUtils.isEmpty(loginName)) {
			json.put("successURL", successURL);
			json.put("error", "登录名不能为空");
			flushJson(json, response);
			return;
		}
		if (StringUtils.isEmpty(password)) {
			json.put("successURL", successURL);
			json.put("error", "密码不能为空");
			flushJson(json, response);
			return;
		}

		if (StringUtils.isEmpty(successURL)) {
			successURL = "/h5/show/login.html";
		}

		// 从cookie中获取分享id
		String referrerUserid = (String) UniverseSession.getAttribute("userIdInCookie") == null ? ""
				: (String) UniverseSession.getAttribute("userIdInCookie");
		// Cookie[] cookies = request.getCookies();//这样便可以获取一个cookie数组
		// for(Cookie cookie : cookies){
		// String cookeiName = cookie.getName();// get the cookie name
		// if("userIdInCookie".equals(cookeiName))
		// {
		// referrerUserid = cookie.getValue(); // get the cookie value
		// break;
		// }
		// }
		String loginUrl = PropertiesUtils.getString("auth_api_login_url");
		Map<String, String> paramMap = new HashMap<String, String>();
		paramMap.put("username", loginName);
		paramMap.put("password", password);
		paramMap.put("token", Integer.toString(1));
		paramMap.put("referrerUserid", referrerUserid);

		try {
			Map<String, String> heaer = new HashMap<String, String>();
			ApiClient.initToken(heaer);
			ResponseData resData = HttpClientUtil.post(loginUrl, paramMap, heaer);

			int code = resData.getCode();
			if (code == 400 || code == 403 || code == 401) {
				json.put("successURL", successURL);
				json.put("error", resData.getMessage());
				flushJson(json, response);
				return;
			}

			if (resData.getCode() != 200 || StringUtils.isEmpty(resData.getBackData())) {
				throw new Exception("h5登录出错，code = " + resData.getCode() + "，message = " + resData.getBackData());
			}

			JSONObject resultJson = JSONObject.parseObject(resData.getBackData());
			if (resultJson.getJSONObject("result") == null) {
				json.put("successURL", successURL);
				json.put("error", resultJson.getString("message"));
				flushJson(json, response);
				return;
			}

			UserVO userInfo = JSONObject.toJavaObject(resultJson.getJSONObject("result"), UserVO.class);
			if (userInfo == null || userInfo.getId() <= 0) {
				throw new Exception("h5登录，返回的数据转换UserVO后，user的值是null，返回的值 = " + resultJson.toJSONString());
			}

			// 写入session
			UniverseSession.setAttribute("userInfo", userInfo);

			json.put("success", true);
			json.put("successURL", successURL);
			json.put("user", userInfo);
			flushJson(json, response);
			return;
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			json.put("successURL", successURL);
			json.put("error", "登录出错，请联系管理员！");
			flushJson(json, response);
			return;
		}
	}

	/**
	 * 分享的时候动态获取签名
	 * 
	 * @param request
	 * @param response
	 */
	@RequestMapping("/sign.html")
	public void getDynamicsSign(HttpServletRequest request, HttpServletResponse response) {
		JSONObject json = new JSONObject();
		try {
			String url = request.getParameter("share_url");
			if (StringUtils.isEmpty(url)) {
				json.put("success", false);
				flushJson(json, response);
				return;
			}

			url = URLDecoder.decode(url, "UTF-8");
			String nonce_str = UUID.randomUUID().toString();
			String timestamp = Long.toString(System.currentTimeMillis() / 1000);
			String jsapi_ticket = getJsApiTicket();
			String string1;
			String signature = "";

			// 注意这里参数名必须全部小写，且必须有序
			string1 = "jsapi_ticket=" + jsapi_ticket + "&noncestr=" + nonce_str + "&timestamp=" + timestamp + "&url="
					+ url;

			// 生成签名
			MessageDigest crypt = MessageDigest.getInstance("SHA-1");
			crypt.reset();
			crypt.update(string1.getBytes("UTF-8"));
			signature = byteToHex(crypt.digest());

			// logger.info("signatrue = " + signature);

			WxShareObj share = new WxShareObj();
			share.setUrl(url);
			share.setSignature(signature);
			share.setTimestamp(timestamp);
			share.setNonceStr(nonce_str);
			share.setAppId(APPID);

			json.put("success", true);
			json.put("share", share);
			flushJson(json, response);
			return;

		} catch (Exception e) {
			e.printStackTrace();
			logger.error("分页分享数据，e = " + e.getMessage(), e);
			json.put("success", false);
			flushJson(json, response);
			return;
		}
	}

	private static String byteToHex(final byte[] hash) {
		Formatter formatter = new Formatter();
		for (byte b : hash) {
			formatter.format("%02x", b);
		}
		String result = formatter.toString();
		formatter.close();
		return result;
	}

	/**
	 * 获取token
	 * 
	 * @Methods Name getToken
	 * @return String
	 */
	private String getToken() {
		if (StringUtils.isEmpty(ACCESS_TOKEN) || TOKEN_LAST_REQUEST_TIME <= 0) {
			return sendGetToken();
		}
		if ((System.currentTimeMillis() - TOKEN_LAST_REQUEST_TIME) < EXPIRES_IN) {
			// logger.info("----------------------------------------获取已经缓存的access_token----------------------------------------");
			return ACCESS_TOKEN;
		} else {
			return sendGetToken();
		}
	}

	/**
	 * 调用微信JS接口的临时票据
	 * 
	 * @param access_token
	 *            接口访问凭证
	 * @return
	 */
	private String getJsApiTicket() {

		if (StringUtils.isEmpty(JSAPI_TICKET) || JSAPI_LAST_REQUEST_TIME <= 0) {
			return sendGetJsApi();
		}
		if ((System.currentTimeMillis() - JSAPI_LAST_REQUEST_TIME) < EXPIRES_IN) {
			// logger.info("----------------------------------------获取已经缓存的
			// jsapi_ticket----------------------------------------");
			return JSAPI_TICKET;
		} else {
			return sendGetJsApi();
		}
	}

	/**
	 * 发送请求获取ticket
	 * 
	 * @return String
	 */
	private String sendGetJsApi() {

		// logger.info("----------------------------------------从Wei xin
		// 端获取新的jsapi_ticket 值----------------------------------------");

		String requestUrl = JSAPI_TICKET_URL.replace("ACCESS_TOKEN", getToken());
		ResponseData result = HttpClientUtil.get(requestUrl);
		JSONObject jsonJsApi = null;
		if (result.getCode() >= 200 && result.getCode() < 300 && !StringUtils.isEmpty(result.getBackData())) {
			try {
				jsonJsApi = JSONObject.parseObject(result.getBackData());
				JSAPI_TICKET = jsonJsApi.getString("ticket");

			} catch (Exception e) {
				// 获取token失败
				logger.error("获取token失败 errcode:{} =  " + jsonJsApi.getInteger("errcode") + "errmsg:{} = "
						+ jsonJsApi.getString("errmsg"));
			}

			JSAPI_LAST_REQUEST_TIME = System.currentTimeMillis();

			return JSAPI_TICKET;
		}
		return "";
	}

	/**
	 * 发送请求获取access_token
	 * 
	 * @Methods Name sendGetToken
	 * @return String
	 */
	private String sendGetToken() {

		// LOGGER.info("----------------------------------------从Wei xin
		// 端获取新的access_token----------------------------------------");
		String requestUrl = TOKEN_URL.replace("APPID", APPID).replace("APP_SECRET", APP_SECRET);
		ResponseData result = HttpClientUtil.get(requestUrl);
		JSONObject jsonToken = null;
		if (result.getCode() >= 200 && result.getCode() < 300 && !StringUtils.isEmpty(result.getBackData())) {
			try {
				jsonToken = JSONObject.parseObject(result.getBackData());
				ACCESS_TOKEN = jsonToken.getString("access_token");

			} catch (Exception e) {
				// 获取token失败
				logger.error("获取token失败 errcode:{} =  " + jsonToken.getInteger("errcode") + "errmsg:{} = "
						+ jsonToken.getString("errmsg"));
			}

			TOKEN_LAST_REQUEST_TIME = System.currentTimeMillis();

			return ACCESS_TOKEN;
		}
		return "";
	}

	/**
	 * 句子翻译分享
	 * 
	 * @return
	 */
	@RequestMapping("/translate/{groupId}.html")
	public String shareTranslate(HttpServletRequest request, HttpServletResponse response,
			@PathVariable("groupId") Integer groupId, Integer uid, Model model) {
		if (groupId == null || groupId <= 0) {
			return "h5/h5_404";
		}
		if (uid == null || uid <= 0) {
			return "h5/h5_500";
		}

		try {
			TranslateH5VO vo = h5Service.getUserTranslateListByGroupId(groupId, uid);
			if (vo == null) {
				return "h5/h5_500";
			}

			model.addAttribute(vo);
			model.addAttribute("groupName", vo.getGroupName());
			model.addAttribute("translates", vo.getList());
			model.addAttribute("groupUnitId", groupId);
			model.addAttribute("time", vo.getTime());
			model.addAttribute("days", vo.getDays());

		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return "h5/h5_500";
		}
		return "h5/h5_translates";
	}

	/**
	 * 口语练习的接口分享
	 * 
	 * @param request
	 * @param response
	 * @param groupId
	 * @param uid
	 * @param model
	 * @return
	 */
	@RequestMapping("/spoken/{groupId}.html")
	public String shareSpoken(HttpServletRequest request, HttpServletResponse response,
			@PathVariable("groupId") Integer groupId, Integer uid, Model model, String share_title) {

		if (groupId == null || groupId <= 0) {
			return "h5/h5_404";
		}
		if (uid == null || uid <= 0) {
			return "h5/h5_500";
		}
		try {

			SpokenH5VO vo = h5Service.getUserSpokenByGroupId(uid, groupId);
			if (vo == null) {
				return "h5/h5_500";
			}

			model.addAttribute(vo);
			model.addAttribute("shareTitle", share_title);
			model.addAttribute("time", vo.getTime());
			model.addAttribute("days", vo.getDays());
			model.addAttribute("groupName", vo.getGroupName());
			model.addAttribute("spokens", vo.getList());
			model.addAttribute("groupId", vo.getGroupId());

		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return "h5/h5_500";
		}
		return "h5/h5_spoken";
	}

	@RequestMapping("/{showHtml}.html")
	public String showHtml(@PathVariable("showHtml") String showHtml) {
		return "h5/" + showHtml;
	}

	/**
	 * 独立口语和写作
	 * 
	 * @param type
	 *            1 机经口语 2 机经写作 3 独立口语 4独立写作
	 * @param question_id
	 * @param uid
	 *            分享时的用户的主键
	 * @param name
	 *            题目的名称
	 * @return
	 */
	@RequestMapping("/speakingswritings/{type}/{question_id}.html")
	public String speakingsWriteings(Model model, @PathVariable("type") int type,
			@PathVariable("question_id") int question_id, Integer uid, String share_title, HttpServletRequest request) {
		if (type != 1 && type != 2 && type != 3 && type != 4) {
			return "h5/h5_500";
		}
		if (question_id <= 0) {
			return "h5/h5_404";
		}

		// web段分享请求的时候可能uid是0

		if (uid == null || uid <= 0) {
			uid = 0;
		}

		try {
			SpeakWriteH5VO vo = h5Service.getSpeakWrite(uid, question_id, type, 0, 20, 1);
			if (vo == null) {
				return "h5/h5_404";
			}

			vo.setName(share_title);
			model.addAttribute("vo", vo);
			model.addAttribute("shareTitle",
					StringUtils.isEmpty(share_title) ? ShareExerciseTypeEnum.getKeyByValue(type) : share_title);
			model.addAttribute("shareUrl", getSuccessURL(request));
			model.addAttribute("type", type);
			model.addAttribute("title", ShareExerciseTypeEnum.getKeyByValue(type));

			if (type == 1 || type == 3) { // 独立口语
				return "h5/h5_practice_spoken";
			} else if (type == 2 || type == 4) { // 独立写作
				return "h5/h5_practice_writing";
			} else {
				return "h5/h5_500";
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return "h5/h5_500";
		}
	}

	/**
	 * 独立写作的某一个分享的具体内容
	 * 
	 * @Methods Name writeingDetail
	 * @Create In 2016年10月27日 By dangxingfei@xiaoma.cn
	 * @param model
	 * @param answerId
	 * @param questionId
	 * @param type
	 * @param shareId
	 * @param shareUrl
	 * @param shareTitle
	 * @return String
	 */
	@RequestMapping(value = "/writingdetail.html")
	public String writeingDetail(Model model, String question, int answerId, int questionId, int type, int shareId,
			String shareUrl, String shareTitle) {
		try {

			// 获取问题以及某条的分享
			List<SpeakWriteShare> lists = h5Service.getSpeakWrites(type, questionId, shareId, 1, 1, 0);
			if (lists == null || lists.size() <= 0) {
				throw new Exception("获取某条分享失败");
			}
			lists.get(0).setQuestion(question);

			String content = lists.get(0).getContent();
			content = StringEscapeUtils.unescapeJava(content);

			int wordCount = wordCount(content);
			model.addAttribute("wordCount", wordCount);

			// 获取评论
			String accessToken = null;
			UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
			if (user != null && user.getId() > 0 && !StringUtils.isEmpty(user.getAccess_token())) {
				accessToken = user.getAccess_token();
			}
			SpeakWriteCommentVO comment = h5Service.getSpeakWriteComments(accessToken, answerId, 1, 200, type); // 分页参数暂时设置为200
			if (comment != null) {
				model.addAttribute("comment", comment);
			}

			model.addAttribute("vo", lists.get(0));
			model.addAttribute("shareUrl", shareUrl);
			model.addAttribute("type", type);
			model.addAttribute("shareTitle", shareTitle);
			model.addAttribute("title",
					type == 1 ? "机经口语" : type == 2 ? "机经写作" : type == 3 ? "独立口语" : type == 4 ? "独立写作" : "推荐练习");
			return "h5/h5_practice_writing_detail";
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return "h5/h5_500";
		}
	}

	/**
	 * 口语（独立和机经）的详情包括评论
	 * 
	 * @Methods Name getSpeakingComments
	 * @Create In 2016年10月26日 By dangxingfei@xiaoma.cn
	 * @param request
	 * @param response
	 * @param type
	 *            类型
	 * @param answerId
	 *            答案的id
	 * @param videoUrl
	 *            录音地址
	 * @param videoLength
	 *            录音时间
	 * @return String
	 */
	@RequestMapping("/speaking/comments/{type}/{answerId}.html")
	public String getSpeakingComments(Model model, String videoUrl, Integer videoLength, String shareUrl,
			String shareTitle, HttpServletRequest request, HttpServletResponse response,
			@PathVariable("type") Integer type, @PathVariable Integer answerId) {

		if (type == null || (type != 1 && type != 3)) {
			return "h5/h5_500";
		}
		if (answerId == null || answerId <= 0 || StringUtils.isEmpty(videoUrl)) {
			return "h5/h5_404";
		}

		try {
			// 获取评论
			String accessToken = null;
			UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
			if (user != null && user.getId() > 0 && !StringUtils.isEmpty(user.getAccess_token())) {
				accessToken = user.getAccess_token();
			}
			// 分页参数暂时设置为200
			SpeakWriteCommentVO comment = h5Service.getSpeakWriteComments(accessToken, answerId, 1, 200, type);
			if (comment != null) {
				model.addAttribute("comment", comment);
			}

			model.addAttribute("shareUrl", shareUrl);
			model.addAttribute("type", type);
			model.addAttribute("shareTitle", shareTitle);
			model.addAttribute("videoUrl", videoUrl);
			model.addAttribute("videoLength", videoLength);
			model.addAttribute("title",
					type == 1 ? "机经口语" : type == 2 ? "机经写作" : type == 3 ? "独立口语" : type == 4 ? "独立写作" : "推荐练习");
			return "h5/h5_practice_spoken_detail";
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return "h5/h5_500";
		}
	}

	/**
	 * h5分享的回放课页面
	 * 
	 * @param request
	 * @param response
	 * @param id
	 * @param model
	 * @return
	 */
	@RequestMapping("/replay/{id}.html")
	public String replayBroadcast(HttpServletRequest request, HttpServletResponse response,
			@PathVariable("id") Integer id, Model model) {
		try {
			// 判断用户是否登录
			UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
			if (user == null || user.getId() <= 0) {
				return "redirect:/h5/show/login.html?successURL=" + getSuccessURL(request);
			}

			// 查询回放课
			ResponseData responseData = livelessionService.getBroadcastDetail(id, null, request);
			if (responseData == null) {
				throw new Exception("h5回放课程播放页面获取数据，服务器返回的数据是空值");
			}

			if (responseData.getCode() == 401) {
				return "redirect:/h5/show/login.html?successURL=" + getSuccessURL(request);
			}

			if (responseData.getCode() == 403) {
				model.addAttribute("returnUrl", "/replay.html");
				model.addAttribute("canSee", false);
				model.addAttribute("errorMsg", "用户没有权限观看！");
				return "h5/h5_lession_detail";
			}

			if (responseData.getCode() != 200) {
				throw new Exception(
						"服务器返回的数据出错，code = " + responseData.getCode() + "，message--" + responseData.getBackData());
			}

			// 播放参数详情
			JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
			BroadcastVO detail = JSON.toJavaObject(resultJson, BroadcastVO.class);
			if (detail == null || detail.getId() == null || detail.getId() <= 0) {
				return "h5/404";
			}

			model.addAttribute("sign", detail.getBroadcastId());
			model.addAttribute("password", detail.getPassword());
			model.addAttribute("host", detail.getHost());
			model.addAttribute("status", 1);
			model.addAttribute("teacherName", detail.getTeacherName());
			model.addAttribute("startTime", detail.getStartTime());
			model.addAttribute("endTime", detail.getEndTime());
			model.addAttribute("courseName", detail.getName());

			return "h5/h5_replay_broadcast";
		} catch (Exception e) {
			model.addAttribute("canSee", false);
			model.addAttribute("errorMsg", "系统异常，请联系管理员！");
			logger.error("h5回放详情页面出错,无法获取返回值！");
			return "h5/h5_replay_broadcast";
		}
	}

	/**
	 * 单个独立口语和写作 分享
	 * 
	 * @Methods Name shareOneSpeakingsWriteings
	 * @Create In 2016年10月14日 By dangxingfei@xiaoma.cn
	 * @param model
	 * @param type
	 *            1 机经口语 2 机经写作 3 独立口语 4独立写作
	 * @param question_id
	 * @param share_id
	 * @param uid
	 * @param share_title
	 * @param request
	 * @return String
	 */
	@RequestMapping("/speakingswritings/{type}/{question_id}/{share_id}.html")
	public String shareOneSpeakingsWriteings(Model model, @PathVariable("type") int type,
			@PathVariable("question_id") int question_id, @PathVariable("share_id") Integer share_id, Integer uid,
			String share_title, HttpServletRequest request) {
		if (type != 1 && type != 2 && type != 3 && type != 4) {
			return "h5/h5_500";
		}
		if (question_id <= 0) {
			return "h5/h5_404";
		}
		// web段分享请求的时候可能uid是0
		if (uid == null || uid <= 0) {
			uid = 0;
		}
		try {
			SpeakWriteH5VO vo = h5Service.getSpeakWrite(uid, question_id, type, share_id, 20, 1);
			if (vo == null) {
				return "h5/h5_404";
			}

			vo.setName(share_title);
			model.addAttribute("vo", vo);
			model.addAttribute("shareTitle",
					StringUtils.isEmpty(share_title) ? ShareExerciseTypeEnum.getKeyByValue(type) : share_title);
			model.addAttribute("shareUrl", getSuccessURL(request));
			model.addAttribute("type", type);
			model.addAttribute("title", ShareExerciseTypeEnum.getKeyByValue(type));

			if (type == 1 || type == 3) { // 独立口语
				return "h5/h5_practice_spoken";
			} else if (type == 2 || type == 4) { // 独立写作
				return "h5/h5_practice_writing";
			} else {
				return "h5/h5_500";
			}
		} catch (Exception e) {
			logger.error(e.getMessage(), e);
			return "h5/h5_500";
		}
	}

	@RequestMapping("/wordschallenge/share/{shareId}")
	public String getShareById(HttpServletRequest request, @PathVariable("shareId") Integer shareId, Model model,Integer hasDone) {
		try {
			HttpSession session = request.getSession();
			String unionId = (String) session.getAttribute("words_chanellage_unionId");
			String headImgUrl = (String) session.getAttribute("words_chanellage_headImgUrl");
			String nickname = (String) session.getAttribute("words_chanellage_nickname");
			String sex = (String) session.getAttribute("words_chanellage_sex");
			logger.debug("unionId="+unionId+"headImgUrl="+headImgUrl+"nickname="+nickname+"sex="+sex);
			if (unionId == null || unionId.equals("")) {
				return "redirect:/wechat/authority/5?shareId=" + shareId;
			}
			// String unionId = (String) request.getParameter("unionId");
			// String headImgUrl = (String) request.getParameter("headImgUrl");
			// String nickname = (String) request.getParameter("nickname");
			// String sex = (String) request.getParameter("sex");

			nickname = java.net.URLDecoder.decode(nickname, "UTF-8");
			WordsChallengeSharesDTO wordsChallengeSharesDTO = wordsChanllengeService.getShareById(request, shareId,
					unionId,hasDone);
			Integer userId = wordsChallengeSharesDTO.getUserId();
			UserInfo user = CacheUserInfo.getUserInfo(userId);
			model.addAttribute("sharevo", wordsChallengeSharesDTO);
			model.addAttribute("headImgUrl", headImgUrl);
			model.addAttribute("sex", sex);
			model.addAttribute("nickname", nickname);
			model.addAttribute("unionId", unionId);
			model.addAttribute("user", user);
			return "h5/vocab-challenge/vocab_challenge_doing";
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
			return "h5/h5_500";
		}
	}

	@RequestMapping("/wordschallenge/result")
	public String getResult(HttpServletRequest request, Integer shareId, String unionId, String headImgUrl, String sex,
			String nickname, Model model) {
		try {
			WordsChallengeUserRankDTO wordsChallengeUserRankDTO = wordsChanllengeService.getResult(request, shareId,
					unionId);
			model.addAttribute("rankvo", wordsChallengeUserRankDTO);
			model.addAttribute("headImgUrl", headImgUrl);
			model.addAttribute("nickname", nickname);
			return "h5/vocab-challenge/vocab_challenge_result";
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e.getMessage());
			return "h5/h5_500";
		}
	}

	@RequestMapping(value = "/wordschallenge/post/result", method = RequestMethod.POST)
	@ResponseBody
	public String postResult(HttpServletRequest request, Model model,
			WordsChallengeUserResults wordsChallengeUserResults) {
		WordsChallengeUserShareRateDTO wordsChallengeUserShareRateDTO = wordsChanllengeService.postResult(request,
				wordsChallengeUserResults);
		if (wordsChallengeUserShareRateDTO != null) {
			return "success";
		} else {
			return wordsChallengeUserShareRateDTO.getMessage();
		}
	}

	@RequestMapping(value = "/wordschallenge/gettearandom", method = RequestMethod.GET)
	@ResponseBody
	public WordsChallengeTeacherInfo getTeaRandom(HttpServletRequest request, Model model, Integer teaId,
			Integer rateId) {
		WordsChallengeTeacherInfo wordsChallengeTeacherInfo = wordsChanllengeService.getTeaRandom(request, teaId,
				rateId);
		return wordsChallengeTeacherInfo;
	}

	/**
	 * 进入提交页面 @Title: checkcard @Description: TODO @param @param
	 * request @param @param model @param @return 设定文件 @return String
	 * 返回类型 @throws
	 */
	@RequestMapping(value = "vip/checkcard", method = RequestMethod.GET)
	public String checkcard(HttpServletRequest request, Model model) {
		request.setAttribute("gopage", 1);
		return "wechat/vipcard";
	}

	/**
	 * 根基卡号获取明细 @Title: getbycardno @Description: TODO @param @param
	 * request @param @param model @param @param cardno @param @return
	 * 设定文件 @return Map<String,Object> 返回类型 @throws
	 */
	@RequestMapping(value = "vip/getbycardno", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> getbycardno(HttpServletRequest request, Model model, VipCardDTO vipCarddto) {
		Map<String, Object> result = new HashMap<String, Object>();
		result = h5Service.getbycardno(vipCarddto);
		result.put("gopage", 1);
		return result;
	}

	/**
	 * 根据卡号和激活码验证 @Title: checkbycardno @Description: TODO @param @param
	 * request @param @param model @param @param cardno @param @param
	 * activation @param @return 设定文件 @return Map<String,String> 返回类型 @throws
	 */
	@RequestMapping(value = "vip/checkbycardno", method = RequestMethod.GET)
	@ResponseBody
	public Map<String, Object> checkbycardno(HttpServletRequest request, Model model, VipCardDTO vipCarddto) {

		Map<String, Object> resultMap = new HashMap<String, Object>();
		resultMap = h5Service.checkbycardno(vipCarddto);
		return resultMap;
	}

	/**
	 * 提交验证 @Title: usecard @Description: TODO @param @param
	 * request @param @param model @param @param cardno @param @param
	 * activation @param @param creditno @param @param phone @param @param
	 * checkCode @param @return 设定文件 @return String 返回类型 @throws
	 */
	@RequestMapping(value = "vip/usecard", method = RequestMethod.POST)
	@ResponseBody
	public Map<String, Object> usecard(HttpServletRequest request, Model model, VipCardDTO vipCarddto) {
		Map<String, Object> resultMap = new HashMap<String, Object>();
		// 验证手机号和激活码
		String message = "";
		JSONObject json = new JSONObject();
		Map<String, String> params = new HashMap<String, String>();
		params.put("phoneNum", vipCarddto.getActiveStudentPhone());
		params.put("code", vipCarddto.getCheckCode());
		Map<String, String> headers = new HashMap<String, String>();
		headers.put("fromType", "web");

		String url = PropertiesUtils.getString("h5_fastlogin_url");
		ResponseData data = ApiClient.post(url, params, headers);
		if (data == null) {
			message = "h5快速登录，返回的数据是null";
			resultMap.put("message", message);
			resultMap.put("gopage", 1);
			return resultMap;
		}

		if (data.getCode() == 200) {
			String result = data.getBackData();
			if (StringUtils.isEmpty(result)) {
				message = "h5快速登录，返回的数据是空值 ";
				resultMap.put("message", message);
				resultMap.put("gopage", 1);
				return resultMap;
			}
			JSONObject resultJson = JSONObject.parseObject(result);
			UserVO user = JSONObject.parseObject(resultJson.getString("result"), UserVO.class);
			if (user == null || user.getId() <= 0) {
				message = "h5快速登录，返回的数据转换UserVO后，user的值有错误，返回的值 = " + result;
				resultMap.put("message", message);
				resultMap.put("gopage", 1);
				return resultMap;
			}
			vipCarddto.setActiveUser(user.getId());
		} else {
			message = "h5快速登录，有错误，返回的值 = " + data.getMessage();
			resultMap.put("message", message);
			resultMap.put("gopage", 1);
			return resultMap;
		}
		resultMap = h5Service.usecard(vipCarddto);
		resultMap.put("gopage", 2);

		return resultMap;
	}

	/**
	 * 获取字符串中的单词数量
	 * 
	 * @param s
	 * @return
	 */
	public int wordCount(String s) {
		int word = 0;
		int count = 0;
		for (int i = 0; i < s.length(); i++) {
			if (s.charAt(i) == ' ' || s.charAt(i) == '-') {
				word = 0;
			} else if (word == 0) {
				word = 1;
				count++;
			}
		}
		return count;
	}
	
	@RequestMapping("/live/alimessage.html")
	@ResponseBody
	public Map<String,String> getALiMessageConfig(HttpServletRequest request, Model model) {
		Map<String,String> result = new HashMap<String,String>();
		result.put("aliyun_mqtt_serverURI", PropertiesUtils.getString("aliyun_mqtt_serverURI"));
		result.put("aliyun_mqtt_port", PropertiesUtils.getString("aliyun_mqtt_port"));
		result.put("aliyun_mqtt_useTLS", PropertiesUtils.getString("aliyun_mqtt_useTLS"));
		result.put("aliyun_mqtt_cleansession", PropertiesUtils.getString("aliyun_mqtt_cleansession"));
		result.put("aliyun_mqtt_AccessKey", PropertiesUtils.getString("aliyun_mqtt_AccessKey"));
		result.put("aliyun_mqtt_SecretKey", PropertiesUtils.getString("aliyun_mqtt_SecretKey"));
		result.put("aliyun_mqtt_producer_topic_a", ALIYUN_MQTT_PRODUCER_TOPIC_A);
		result.put("aliyun_mqtt_producer_topic_b",ALIYUN_MQTT_PRODUCER_TOPIC_B);
		result.put("aliyun_mqtt_producer_GroupId_a", ALIYUN_MQTT_PRODUCER_GROUPID_A);
		result.put("aliyun_mqtt_producer_GroupId_b", ALIYUN_MQTT_PRODUCER_GROUPID_B);
		return result;
	}
}
