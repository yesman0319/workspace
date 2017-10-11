package com.xiaoma.universe.topic.controller;

import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.httpclient.HttpStatus;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xiaoma.rest.authentication.UniverseSession;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.common.utils.StringUtils;
import com.xiaoma.universe.common.utils.TimeHelper;
import com.xiaoma.universe.common.utils.UUIDUtil;
import com.xiaoma.universe.common.utils.WordFilterUtil;
import com.xiaoma.universe.common.utils.upyun.UploadImgUtil;
import com.xiaoma.universe.information.controller.BaseController;
import com.xiaoma.universe.livemanage.response.ListResult;
import com.xiaoma.universe.livemanage.service.LivelessionService;
import com.xiaoma.universe.topic.vo.ReplyVO;
import com.xiaoma.universe.topic.vo.TopicDetailVO;
import com.xiaoma.universe.topic.vo.TopicListVO;
import com.xiaoma.universe.topic.vo.VideoVO;
import com.xiaoma.universe.userlogin.controller.UserVO;
import com.xiaoma.universe.videomanage.model.vo.CourseForWebByIdVo;
import com.xiaoma.universe.videomanage.service.VideoCoursesService;

@Controller
@RequestMapping("/topic")
public class TopicController extends BaseController {

	private static Logger LOG = Logger.getLogger(TopicController.class);

	/**
	 * 减产用户是否被禁言
	 * 
	 * @Methods Name checkUserForbid
	 * @Create In 2016年12月27日 By dangxingfei@xiaoma.cn
	 * @param request
	 * @param response
	 *            void
	 */
	@RequestMapping(value = "/forbiduser", method = RequestMethod.POST)
	public void checkUserForbid(HttpServletRequest request, HttpServletResponse response) {
		UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
		JSONObject json = new JSONObject();
		if (user == null || user.getId() <= 0) {
			json.put("success", false);
			json.put("message", "用户没有登录");
			json.put("flag", "nologin");
			flushJson(json, response);
			return;
		}

		try {
			String url = LivelessionService.LIVELESSION_API_URL + "/topic/forbidusers";
			Map<String, String> headers = new HashMap<String, String>();
			headers.put("fromType", "web");
			headers.put("Authorization", "bearer " + user.getAccess_token());
			ResponseData responseData = ApiClient.get(url, headers);
			if (responseData.getCode() == HttpStatus.SC_OK) {
				json.put("success", true);
				if ("true".equals(responseData.getMessage())) {
					json.put("forbid", true);
				} else {
					json.put("forbid", false);
				}
				flushJson(json, response);
				return;
			}

			throw new Exception("获取用户是否禁言出现错误 , e = " + responseData.getBackData());

		} catch (Exception e) {
			e.printStackTrace();
			LOG.error(e.getMessage(), e);
			json.put("success", false);
			json.put("message", e.getMessage());
			json.put("flag", "error");
			flushJson(json, response);
			return;
		}

	}

	/**
	 * 帖子列表(分页获取)
	 * 
	 * @Methods Name getTopics
	 * @Create In 2016年12月27日 By dangxingfei@xiaoma.cn
	 * @param request
	 * @param response
	 * @param model
	 * @return String
	 */
	@RequestMapping(value = "/topics", method = RequestMethod.GET)
	public String getTopics(HttpServletRequest request, HttpServletResponse response, Model model, Integer page,
			Integer pageSize, Integer videoId, Integer nodeId) {

		// 页码数据
		page = (page == null || page <= 0) ? 1 : page;
		pageSize = (pageSize == null || pageSize <= 0) ? 20 : pageSize;

		try {
			if (videoId == null || videoId <= 0 || nodeId == null || nodeId <= 0) {
				throw new Exception("参数异常");
			}

			// 获取视频课的信息
			String url = LivelessionService.LIVELESSION_API_URL + "/courses/" + videoId + "?channel=web";
			Map<String, String> headers = new HashMap<String, String>();
			headers.put("fromType", "web");
			// headers.put("Authorization", "bearer
			// f8d680561e3b46fc92d48f01ce06c279");

			ResponseData responseData = ApiClient.get(url, headers, request, "");
			if (responseData.getCode() != HttpStatus.SC_OK) {
				throw new Exception("获得" + videoId + "课程失败");
			}
			JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
			CourseForWebByIdVo courseForWebByIdVo = JSON.parseObject(resultJson.getString("results"),
					CourseForWebByIdVo.class);
			if (courseForWebByIdVo == null || courseForWebByIdVo.getId() == null || courseForWebByIdVo.getId() <= 0) {
				throw new Exception("获得" + videoId + "课程失败");
			}

			VideoVO video = new VideoVO();
			video.setVideoId(courseForWebByIdVo.getId());
			video.setCoursesName(courseForWebByIdVo.getName());
			video.setCoverPhoto(courseForWebByIdVo.getCoverPhoto());
			video.setPrice(courseForWebByIdVo.getPrice());
			video.setGoodId(courseForWebByIdVo.getGoodId());
			video.setHasBuy(courseForWebByIdVo.getHasBuy());
			video.setTeacherId((courseForWebByIdVo.getTeacher() != null && courseForWebByIdVo.getTeacher().getId() > 0)
					? courseForWebByIdVo.getTeacher().getId() : 0);
			video.setTeacherName(
					(courseForWebByIdVo.getTeacher() != null && courseForWebByIdVo.getTeacher().getId() > 0)
							? courseForWebByIdVo.getTeacher().getNameCn() : "");
			video.setTotalClass(courseForWebByIdVo.getTotalClass() == null ? 0 : courseForWebByIdVo.getTotalClass());
			video.setTotalView(courseForWebByIdVo.getTotalView() == null ? 0 : courseForWebByIdVo.getTotalView());

			responseData = null;
			// 获取主题帖
			url = LivelessionService.LIVELESSION_API_URL + "/topics?nodeId=" + nodeId + "&page=" + page + "&rows="
					+ pageSize;
			responseData = ApiClient.get(url, headers, request, "");

			if (responseData.getCode() != HttpStatus.SC_OK || StringUtils.isEmpty(responseData.getBackData())) {
				throw new Exception("获得" + nodeId + "下的帖子出现失败，e = " + responseData.getBackData());
			}

			JSONObject topicJson = (JSONObject) JSONObject.parse(responseData.getBackData());
			if (topicJson == null) {
				throw new Exception("获得" + nodeId + "下的帖子出现失败，e = " + responseData.getBackData());
			}
			int counts = topicJson.getIntValue("counts");
			if (counts != 0) {
				List<TopicListVO> lists = JSON.parseArray(topicJson.getString("results"), TopicListVO.class);
				ListResult<TopicListVO> result = new ListResult<TopicListVO>(); // 分页
				result.setResults(lists);
				result.setCounts(counts);
				result.setPage(page);
				result.setRows(pageSize);
				model.addAttribute("datas", lists);
				model.addAllAttributes(ListResult.getPaging(result));
			}

			// 有没有被禁言
			UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
			model.addAttribute("forbid", (user != null && user.getId() > 0) ? isForbid(user.getAccess_token()) : false);

			model.addAttribute("video", video);
			model.addAttribute("videoId", videoId);
			model.addAttribute("nodeId", nodeId);

			return "topic/topic_list";
		} catch (Exception e) {
			e.printStackTrace();
			LOG.error(e.getMessage(), e);
			return "500";
		}

	}

	/**
	 * @Methods Name saveTopic 发帖
	 * @Create In 2016年12月27日 By dangxingfei@xiaoma.cn
	 * @param request
	 * @param response
	 *            void
	 */
	@RequestMapping(value = "/topics", method = RequestMethod.POST)
	public void saveTopic(HttpServletRequest request, HttpServletResponse response, String content, String title,
			Integer nodeId) {
		UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
		JSONObject json = new JSONObject();
		if (user == null || user.getId() <= 0) {
			json.put("success", false);
			json.put("flag", "nologin");
			json.put("message", "没有登录");
			flushJson(json, response);
			return;
		}

		if (nodeId == null || nodeId <= 0) {
			json.put("success", false);
			json.put("flag", "error");
			json.put("message", "参数错误");
			flushJson(json, response);
			return;
		}

		// 检查标题
		if (StringUtils.isEmpty(title)) {
			json.put("success", false);
			json.put("flag", "error");
			json.put("message", "标题不能为空");
			flushJson(json, response);
			return;
		}

		try {
			long words = title.getBytes("GBK").length;
			if (words < 8 || words > 60) {
				json.put("success", false);
				json.put("flag", "error");
				json.put("message", "请输入4-30个字");
				flushJson(json, response);
				return;
			}

			if (WordFilterUtil.isContaintSensitiveWord(title)) {
				json.put("success", false);
				json.put("flag", "sensitive");
				json.put("position", "title");
				json.put("message", "标题中有敏感词");
				flushJson(json, response);
				return;
			}
			if (WordFilterUtil.isContaintSensitiveWord(content)) {
				json.put("success", false);
				json.put("flag", "sensitive");
				json.put("position", "content");
				json.put("message", "内容中有敏感词");
				flushJson(json, response);
				return;
			}
			if (!StringUtils.isEmpty(content)) {
				content = content.replaceAll("<div>", "");
				content = content.replaceAll("</div>", "<br>");
			}

			Map<String, String> param = new HashMap<>(); // 提交的参数
			param.put("nodeId", nodeId.toString());
			param.put("title", title);
			param.put("content", content);

			String url = LivelessionService.LIVELESSION_API_URL + "/topics"; // 请求的url

			Map<String, String> headers = new HashMap<String, String>();
			headers.put("fromType", "web");
			headers.put("Authorization", "bearer " + user.getAccess_token());

			ResponseData responseData = ApiClient.post(url, param, headers);
			if (responseData.getCode() == HttpStatus.SC_CREATED) {
				json.put("success", true);
				flushJson(json, response);
				return;
			}

			if (responseData.getCode() == HttpStatus.SC_FORBIDDEN) {
				json.put("success", false);
				json.put("flag", "forbid");
				json.put("message", "用户被禁言");
				flushJson(json, response);
				return;
			}

			json.put("success", false);
			json.put("flag", "error");
			json.put("message", responseData.getMessage());
			flushJson(json, response);
			return;

		} catch (Exception e) {
			e.printStackTrace();
			LOG.error(e.getMessage(), e);
			json.put("success", false);
			json.put("message", e.getMessage());
			json.put("flag", "error");
			flushJson(json, response);
			return;
		}
	}

	/**
	 * 删除主题帖
	 * 
	 * @Methods Name delTopic
	 * @Create In 2016年12月30日 By dangxingfei@xiaoma.cn
	 * @param request
	 * @param response
	 * @param topicId
	 *            void
	 */
	@RequestMapping(value = "/topics/{topicId}", method = RequestMethod.POST)
	public void delTopic(HttpServletRequest request, HttpServletResponse response,
			@PathVariable("topicId") Integer topicId) {
		JSONObject json = new JSONObject();
		UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");

		if (user == null || user.getId() <= 0) {
			json.put("success", false);
			json.put("flag", "nologin");
			json.put("message", "没有登录");
			flushJson(json, response);
			return;
		}

		if (topicId == null || topicId <= 0) {
			json.put("success", false);
			json.put("message", "topicId参数错误");
			flushJson(json, response);
			return;
		}

		try {
			Map<String, String> headers = new HashMap<String, String>();
			headers.put("fromType", "web");
			headers.put("Authorization", "bearer " + user.getAccess_token());
			String url = LivelessionService.LIVELESSION_API_URL + "/topics/" + topicId;
			ResponseData responseData = ApiClient.delete(url, headers, request, "");

			if (responseData.getCode() == HttpStatus.SC_NO_CONTENT) {
				json.put("success", true);
				json.put("message", "删除成功");
				flushJson(json, response);
				return;
			}
			if (responseData.getCode() == HttpStatus.SC_FORBIDDEN) {
				json.put("success", false);
				json.put("message", "无权删除");
				flushJson(json, response);
				return;
			}
			if (responseData.getCode() == HttpStatus.SC_UNAUTHORIZED) {
				json.put("success", false);
				json.put("flag", "nologin");
				json.put("message", "没有登录");
				flushJson(json, response);
				return;
			}

			throw new Exception("删除错误code =  " + responseData.getCode() + "，返回值 = " + responseData.getBackData());

		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			json.put("success", false);
			json.put("message", "系统错误");
			flushJson(json, response);
			return;
		}
	}

	/**
	 * TODO
	 * 
	 * @Methods Name getReplys 回帖列表
	 * @Create In 2016年12月27日 By dangxingfei@xiaoma.cn
	 * @param request
	 * @param response
	 * @param model
	 * @param page
	 * @param pageSize
	 * @return String
	 */
	@RequestMapping(value = "/replys", method = RequestMethod.GET)
	public String getReplys(HttpServletRequest request, HttpServletResponse response, Model model, Integer page,
			Integer pageSize, Integer topicId, Integer videoId, Integer nodeId) {
		// 页码数据
		page = (page == null || page <= 0) ? 1 : page;
		pageSize = (pageSize == null || pageSize <= 0) ? 20 : pageSize;

		UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");

		Map<String, String> headers = new HashMap<String, String>();
		headers.put("fromType", "web");
		if (user != null && user.getId() > 0) {
			headers.put("Authorization", "bearer " + user.getAccess_token());
		}

		try {
			// 获取视频课的信息
			if (videoId == null || videoId <= 0 || topicId == null || topicId <= 0) {
				throw new Exception("参数异常");
			}

			// TODO 获取回帖信息
			String url = LivelessionService.LIVELESSION_API_URL + "/topic/replys?topicId=" + topicId + "&page=" + page
					+ "&rows=" + pageSize;
			ResponseData responseData = ApiClient.get(url, headers, request, "");
			if (responseData.getCode() == HttpStatus.SC_NOT_FOUND) {
				return "topic/reply_no";
			}

			if (responseData.getCode() != HttpStatus.SC_OK) {
				throw new Exception("获得" + topicId + "下的回帖失败，e = " + responseData.getBackData());
			}

			JSONObject topicDetailJson = JSONObject.parseObject(responseData.getBackData());
			if (topicDetailJson == null) {
				throw new Exception("获得" + topicId + "下的回帖回帖数据不存在");
			}

			// 回帖数据
			JSONObject replysJson = topicDetailJson.getJSONObject("replys");
			if (replysJson != null) {
				int counts = replysJson.getInteger("counts");
				model.addAttribute("counts", counts);
				if (counts > 0) {
					List<ReplyVO> lists = JSON.parseArray(replysJson.getString("results"), ReplyVO.class);
					if (lists != null && lists.size() > 0) {
						ListResult<ReplyVO> result = new ListResult<ReplyVO>();
						result.setResults(lists);
						result.setCounts(counts);
						result.setPage(page);
						result.setRows(pageSize);
						model.addAttribute("datas", lists);
						model.addAllAttributes(ListResult.getPaging(result));
					}
				}
			}

			replysJson.remove("replys");
			TopicDetailVO detail = JSONObject.toJavaObject(topicDetailJson, TopicDetailVO.class);

			// 获取视频课的信息
			url = VideoCoursesService.VIDEO_COURSE + "/courses/" + videoId + "?channel=web";

			responseData = ApiClient.get(url, headers, request, "");
			if (responseData.getCode() != HttpStatus.SC_OK) {
				throw new Exception("获得" + videoId + "课程失败");
			}
			JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
			CourseForWebByIdVo courseForWebByIdVo = JSON.parseObject(resultJson.getString("results"),
					CourseForWebByIdVo.class);
			if (courseForWebByIdVo == null || courseForWebByIdVo.getId() == null || courseForWebByIdVo.getId() <= 0) {
				throw new Exception("获得" + videoId + "课程失败");
			}

			VideoVO video = new VideoVO();
			video.setVideoId(courseForWebByIdVo.getId());
			video.setCoursesName(courseForWebByIdVo.getName());
			video.setCoverPhoto(courseForWebByIdVo.getCoverPhoto());
			video.setPrice(courseForWebByIdVo.getPrice());
			video.setGoodId(courseForWebByIdVo.getGoodId());
			video.setHasBuy(courseForWebByIdVo.getHasBuy());
			video.setTeacherId((courseForWebByIdVo.getTeacher() != null && courseForWebByIdVo.getTeacher().getId() > 0)
					? courseForWebByIdVo.getTeacher().getId() : 0);
			video.setTeacherName(
					(courseForWebByIdVo.getTeacher() != null && courseForWebByIdVo.getTeacher().getId() > 0)
							? courseForWebByIdVo.getTeacher().getNameCn() : "");
			video.setTotalClass(courseForWebByIdVo.getTotalClass() == null ? 0 : courseForWebByIdVo.getTotalClass());
			video.setTotalView(courseForWebByIdVo.getTotalView() == null ? 0 : courseForWebByIdVo.getTotalView());

			// 热门的讨论区
			if (nodeId != null && nodeId > 0) {
				model.addAttribute("nodeId", nodeId);
				List<TopicListVO> hotTopics = getHotTopic(nodeId);
				if (hotTopics != null && hotTopics.size() > 0) {
					model.addAttribute("hotTopics", hotTopics);
				}
			}

			// 判读是否禁言
			model.addAttribute("forbid", (user != null && user.getId() > 0) ? isForbid(user.getAccess_token()) : false);

			model.addAttribute("topicDeatil", detail);
			model.addAttribute("video", video);
			model.addAttribute("videoId", videoId);
			model.addAttribute("topicId", topicId);
			return "topic/reply_list";
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			return "500";
		}
	}

	/**
	 * 删除回帖
	 * 
	 * @Methods Name delTopic
	 * @Create In 2016年12月30日 By dangxingfei@xiaoma.cn
	 * @param request
	 * @param response
	 * @param topicId
	 *            void
	 */
	@RequestMapping(value = "/replys/{replyId}", method = RequestMethod.POST)
	public void delReply(HttpServletRequest request, HttpServletResponse response,
			@PathVariable("replyId") Integer replyId) {
		JSONObject json = new JSONObject();
		UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
		if (user == null || user.getId() <= 0) {
			json.put("success", false);
			json.put("flag", "nologin");
			json.put("message", "没有登录");
			flushJson(json, response);
			return;
		}

		if (replyId == null || replyId <= 0) {
			json.put("success", false);
			json.put("message", "replyId参数错误");
			flushJson(json, response);
			return;
		}

		try {
			Map<String, String> headers = new HashMap<String, String>();
			headers.put("fromType", "web");
			headers.put("Authorization", "bearer " + user.getAccess_token());
			String url = LivelessionService.LIVELESSION_API_URL + "/topic/replys/" + replyId;
			ResponseData responseData = ApiClient.delete(url, headers, request, "");

			System.out.println(responseData.getMessage());

			if (responseData.getCode() == HttpStatus.SC_NO_CONTENT) {
				json.put("success", true);
				json.put("message", "删除成功");
				flushJson(json, response);
				return;
			}
			if (responseData.getCode() == HttpStatus.SC_FORBIDDEN) {
				json.put("success", false);
				json.put("message", "无权删除");
				flushJson(json, response);
				return;
			}
			if (responseData.getCode() == HttpStatus.SC_UNAUTHORIZED) {
				json.put("success", false);
				json.put("flag", "nologin");
				json.put("message", "没有登录");
				flushJson(json, response);
				return;
			}
			if (responseData.getCode() != 500) {
				json.put("success", false);
				json.put("flag", "error");
				json.put("message", responseData.getBackData());
				flushJson(json, response);
				return;
			}

			throw new Exception("删除错误code =  " + responseData.getCode() + "，返回值 = " + responseData.getBackData());

		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			json.put("success", false);
			json.put("message", "系统错误");
			flushJson(json, response);
			return;
		}
	}

	/**
	 * @Methods Name saveReply 回帖
	 * @Create In 2016年12月27日 By dangxingfei@xiaoma.cn
	 * @param request
	 * @param response
	 *            void
	 */
	@RequestMapping(value = "/replys", method = RequestMethod.POST)
	public void saveReply(HttpServletRequest request, HttpServletResponse response, String content, Integer topicId) {
		UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
		JSONObject json = new JSONObject();
		if (user == null || user.getId() <= 0) {
			json.put("success", false);
			json.put("flag", "nologin");
			json.put("message", "没有登录");
			flushJson(json, response);
			return;
		}
		if (topicId == null || topicId <= 0) {
			json.put("success", false);
			json.put("flag", "error");
			json.put("message", "参数错误");
			flushJson(json, response);
			return;
		}

		// 检查
		if (StringUtils.isEmpty(content)) {
			json.put("success", false);
			json.put("flag", "error");
			json.put("message", "内容不能为空");
			flushJson(json, response);
			return;
		}

		if (WordFilterUtil.isContaintSensitiveWord(content)) {
			json.put("success", false);
			json.put("flag", "sensitive");
			json.put("message", "内容包含敏感词，请检查重发");
			flushJson(json, response);
			return;
		}

		content = content.replaceAll("<div>", "");
		content = content.replaceAll("</div>", "<br>");

		try {

			Map<String, String> param = new HashMap<>(); // 提交的参数
			param.put("topicId", topicId.toString());
			param.put("content", content);

			String url = LivelessionService.LIVELESSION_API_URL + "/topic/replys"; // 请求的url

			Map<String, String> headers = new HashMap<String, String>();
			headers.put("fromType", "web");
			headers.put("Authorization", "bearer " + user.getAccess_token());

			ResponseData responseData = ApiClient.post(url, param, headers);
			if (responseData.getCode() == HttpStatus.SC_CREATED) {
				json.put("success", true);
				flushJson(json, response);
				return;
			}

			json.put("success", false);
			json.put("flag", "error");
			json.put("message", responseData.getMessage());
			flushJson(json, response);
			return;

		} catch (Exception e) {
			e.printStackTrace();
			LOG.error(e.getMessage(), e);
			json.put("success", false);
			json.put("message", e.getMessage());
			json.put("flag", "error");
			flushJson(json, response);
			return;
		}
	}

	/**
	 * 图片上传
	 * 
	 * @Methods Name uploadImg
	 * @Create In 2017年1月3日 By dangxingfei@xiaoma.cn
	 * @param myfiles
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 *             Map<String,Object>
	 */
	@RequestMapping("/upload")
	@ResponseBody
	public Map<String, Object> uploadImg(@RequestParam MultipartFile[] myfiles, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		MultipartHttpServletRequest mReq = null;
		MultipartFile file = null;
		HashMap<String, Object> map = new HashMap<String, Object>();

		UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
		if (user == null || user.getId() <= 0) {
			map.put("success", "error");
			map.put("message", "当前用户没有登录");
		}

		if (isForbid(user.getAccess_token())) {
			map.put("success", "error");
			map.put("message", "当前用户被禁言，不能上传图片");
		}

		try {

			mReq = (MultipartHttpServletRequest) request;
			file = mReq.getFile("upfile");

			// 得到图片的二进制数据，以二进制封装得到数据，具有通用性
			byte[] data = readInputStream(file.getInputStream());
			String fileName = file.getOriginalFilename();
			Long fileSize = file.getSize();
			if (fileSize > 5 * 1024 * 1024) {
				map.put("success", "error");
				map.put("flag", "large");
				return map;
			}

			String uploadPath = request.getParameter("uploadPath");

			String uuid = UUIDUtil.getUUID().toUpperCase();
			String date = TimeHelper.date2String(new Date(), "yyyyMMdd");
			String prefix = fileName.substring(fileName.lastIndexOf(".") + 1);
			String filename = date + "/" + uuid + "." + prefix;
			String img = UploadImgUtil.uploadImgWithPath(data, uploadPath, filename);
			map.put("url", img);
			map.put("success", "success");
			Thread.sleep(2000);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			map.put("success", "error");
			map.put("url", "");
			map.put("message", e.getMessage());
		}
		return map;
	}

	@RequestMapping("/uploads")
	@ResponseBody
	public Map<String, Object> uploadFile(Object obj, HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		MultipartHttpServletRequest mReq = null;
		List<MultipartFile> files = null;
		HashMap<String, Object> map = new HashMap<String, Object>();

		UserVO user = (UserVO) UniverseSession.getAttribute("userInfo");
		user = new UserVO();
		user.setId(71416);
		if (user == null || user.getId() <= 0) {
			map.put("success", "error");
			map.put("message", "当前用户没有登录");
		}

		if (isForbid(user.getAccess_token())) {
			map.put("success", "error");
			map.put("message", "当前用户被禁言，不能上传图片");
		}

		try {

			mReq = (MultipartHttpServletRequest) request;
			files = mReq.getFiles("upfile");
			List<String> urls = new ArrayList<String>(files.size());

			for (MultipartFile file : files) {

				// 得到图片的二进制数据，以二进制封装得到数据，具有通用性
				byte[] data = readInputStream(file.getInputStream());
				String fileName = file.getOriginalFilename();
				Long fileSize = file.getSize();
				if (fileSize > 5 * 1024 * 1024) {
					map.put("success", "error");
					map.put("flag", "large");
					return map;
				}

				String uploadPath = request.getParameter("uploadPath");

				String uuid = UUIDUtil.getUUID().toUpperCase();
				String date = TimeHelper.date2String(new Date(), "yyyyMMdd");
				String prefix = fileName.substring(fileName.lastIndexOf(".") + 1);
				String filename = date + "/" + uuid + "." + prefix;
				String img = UploadImgUtil.uploadImgWithPath(data, uploadPath, filename);
				urls.add(img);
				Thread.sleep(2000);
			}
			map.put("success", "success");
			map.put("urls", urls);
		} catch (Exception e) {
			LOG.error(e.getMessage(), e);
			map.put("success", "error");
			map.put("url", "");
			map.put("message", e.getMessage());
		}
		return map;
	}

	public static byte[] readInputStream(InputStream inStream) throws Exception {
		ByteArrayOutputStream outStream = new ByteArrayOutputStream();
		// 创建一个Buffer字符串
		byte[] buffer = new byte[1024];
		// 每次读取的字符串长度，如果为-1，代表全部读取完毕
		int len = 0;
		// 使用一个输入流从buffer里把数据读取出来
		while ((len = inStream.read(buffer)) != -1) {
			// 用输出流往buffer里写入数据，中间参数代表从哪个位置开始读，len代表读取的长度
			outStream.write(buffer, 0, len);
		}
		// 关闭输入流
		inStream.close();
		// 把outStream里的数据写入内存
		return outStream.toByteArray();
	}

	/**
	 * 判断用户是否被禁言
	 * 
	 * @Methods Name isForbid
	 * @Create In 2016年12月30日 By dangxingfei@xiaoma.cn
	 * @param userToken
	 * @return boolean
	 */
	private boolean isForbid(String userToken) {
		if (StringUtils.isEmpty(userToken)) {
			return false;
		}

		try {
			String url = LivelessionService.LIVELESSION_API_URL + "/topic/forbidusers";
			Map<String, String> headers = new HashMap<String, String>();
			headers.put("fromType", "web");
			headers.put("Authorization", "bearer " + userToken);
			ResponseData responseData = ApiClient.get(url, headers);
			if (responseData.getCode() == HttpStatus.SC_OK) {
				if ("true".equals(responseData.getMessage())) {
					return true;
				} else {
					return false;
				}
			}

			throw new Exception("获取用户是否禁言出现错误 , e = " + responseData.getBackData());

		} catch (Exception e) {
			return false;
		}
	}

	/**
	 * 获取某个板块中最热的帖子
	 * 
	 * @Methods Name getHotTopic
	 * @Create In 2017年1月3日 By dangxingfei@xiaoma.cn
	 * @param nodeId
	 * @return List<TopicListVO>
	 */
	private List<TopicListVO> getHotTopic(Integer nodeId) {
		if (nodeId == null || nodeId <= 0) {
			return null;
		}

		String url = LivelessionService.LIVELESSION_API_URL + "/topics?nodeId=" + nodeId
				+ "&page=1&rows=4&sort=reply_count";
		Map<String, String> headers = new HashMap<String, String>();
		headers.put("fromType", "web");
		ResponseData responseData = ApiClient.get(url, headers);

		if (responseData.getCode() != HttpStatus.SC_OK || StringUtils.isEmpty(responseData.getBackData())) {
			return null;
		}

		JSONObject topicJson = (JSONObject) JSONObject.parse(responseData.getBackData());
		if (topicJson == null) {
			return null;
		}
		int counts = topicJson.getIntValue("counts");
		if (counts != 0) {
			List<TopicListVO> lists = JSON.parseArray(topicJson.getString("results"), TopicListVO.class);
			return lists;
		}
		return null;

	}

}
