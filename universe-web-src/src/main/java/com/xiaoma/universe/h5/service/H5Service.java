package com.xiaoma.universe.h5.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.utils.MapUtil;
import com.xiaoma.universe.common.utils.PropertiesUtils;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.common.utils.StringUtils;
import com.xiaoma.universe.common.utils.TimeHelper;
import com.xiaoma.universe.h5.model.SpeakWriteComment;
import com.xiaoma.universe.h5.model.SpeakWriteCommentVO;
import com.xiaoma.universe.h5.model.SpeakWriteH5VO;
import com.xiaoma.universe.h5.model.SpeakWriteShare;
import com.xiaoma.universe.h5.model.Spoken;
import com.xiaoma.universe.h5.model.SpokenH5VO;
import com.xiaoma.universe.h5.model.Translate;
import com.xiaoma.universe.h5.model.TranslateH5VO;
import com.xiaoma.universe.h5.model.vip.VipCardDTO;

/**
 * 与h5相关的逻辑处理
 * 
 * @author Administrator
 */
@Service("h5Service")
public class H5Service {

	private Logger logger = Logger.getLogger(H5Service.class);

	/**
	 * 句子翻译h5页面对应的
	 * 
	 * @param groupId
	 * @param uid
	 * @return
	 */
	public TranslateH5VO getUserTranslateListByGroupId(int groupId, int uid) {
		String url = PropertiesUtils.getString("learn_api_url") + "/translate/question/lists.action?groupId=" + groupId
				+ "&userId=" + uid;
		Map<String, String> headers = getHeaders();
		ResponseData responseData = ApiClient.get(url, headers);

		if (responseData.getCode() != 200) {
			return null;
		}

		JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
		Integer code = resultJson.getInteger("status");
		if (code == null || code == 1) {
			return null;
		}
		String result = resultJson.getString("result");
		if (StringUtils.isEmpty(result)) {
			return null;
		}

		List<Translate> lists = JSON.parseArray(result, Translate.class);
		if (lists == null || lists.size() <= 0) {
			return null;
		}

		TranslateH5VO vo = new TranslateH5VO();
		vo.setList(lists);

		String groupName = resultJson.getString("groupName");
		if (!StringUtils.isEmpty(groupName)) {
			vo.setGroupName(groupName.replace("Unit", ""));
		}

		vo.setGroupUnitId(groupId);

		// 获取分享的数据
		// {"message":"获取成功","result":{"practicedDays":0,"totalExerciseTime":0},"status":0}
		url = PropertiesUtils.getString("learn_api_url") + "/app/share/exercise?userId=" + uid;
		responseData = ApiClient.get(url, headers);
		if (responseData.getCode() != 200) {
			return vo;
		}

		resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
		if (resultJson.containsKey("totalExerciseTime")) {
			Long totalTime = Long.parseLong(
					(resultJson.getString("totalExerciseTime") == null ? 0 : resultJson.getString("totalExerciseTime"))
							.toString());
			String time = TimeHelper.formatDuring(totalTime);
			vo.setTime(time);
		}
		if (resultJson.containsKey("practicedDays")) {
			vo.setDays(resultJson.getInteger("practicedDays") == null ? 0 : resultJson.getInteger("practicedDays"));
		}

		return vo;
	}

	private Map<String, String> getHeaders() {
		Map<String, String> headers = new HashMap<String, String>();
		headers.put("Content-Type", "application/json");
		headers.put("fromType", "web");
		return headers;
	}

	/**
	 * 根据用户id和groupId获取口语练习的结果
	 * 
	 * @param uid
	 * @param groupId
	 * @return
	 */
	public SpokenH5VO getUserSpokenByGroupId(Integer uid, Integer groupId) {

		String url = PropertiesUtils.getString("learn_api_url") + "/speakingexercise/question/lists.action?groupId="
				+ groupId + "&userId=" + uid;
		Map<String, String> headers = getHeaders();
		headers.put("systemId", "1");
		ResponseData responseData = ApiClient.get(url, headers);

		if (responseData.getCode() != 200) {
			return null;
		}

		JSONObject resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
		Integer code = resultJson.getInteger("status");
		if (code == null || code == 1) {
			return null;
		}
		String result = resultJson.getString("result");
		if (StringUtils.isEmpty(result)) {
			return null;
		}

		List<Spoken> lists = JSON.parseArray(result, Spoken.class);
		if (lists == null || lists.size() <= 0) {
			return null;
		}

		SpokenH5VO vo = new SpokenH5VO();
		vo.setList(lists);

		String groupName = resultJson.getString("groupName");
		if (!StringUtils.isEmpty(groupName)) {
			vo.setGroupName(groupName.replace("Unit", ""));
		}

		vo.setGroupId(groupId);

		// 获取分享的数据
		// {"message":"获取成功","result":{"practicedDays":0,"totalExerciseTime":0},"status":0}
		url = PropertiesUtils.getString("learn_api_url") + "/app/share/exercise?userId=" + uid;
		responseData = ApiClient.get(url, headers);
		if (responseData.getCode() != 200) {
			return vo;
		}

		resultJson = (JSONObject) JSONObject.parse(responseData.getBackData());
		if (resultJson.containsKey("totalExerciseTime")) {
			Long totalTime = Long.parseLong(
					(resultJson.getString("totalExerciseTime") == null ? 0 : resultJson.getString("totalExerciseTime"))
							.toString());
			String time = TimeHelper.formatDuring(totalTime);
			vo.setTime(time);
		}
		if (resultJson.containsKey("practicedDays")) {
			vo.setDays(resultJson.getInteger("practicedDays") == null ? 0 : resultJson.getInteger("practicedDays"));
		}
		return vo;

	}

	/**
	 * 获取分享的(1 机经口语 2 机经写作 3 独立口语 4独立写作) 的数据
	 * 
	 * @param uid
	 * @param question_id
	 * @param type
	 * @return
	 */
	public SpeakWriteH5VO getSpeakWrite(int userId, int question_id, int type, int share_id, int page_size, int page){
		Map<String,String> headers = new HashMap<String,String>();
		//headers.put("Authorization", "bearer 99837967dd194d09b724fbf38aa7c148");
		
		//题目的信息
		String url_question =  PropertiesUtils.getString("learn_api_url") + "/speakingswritings/questions/"+type+"/"+question_id+"?userId="+userId;
		ResponseData responseData = ApiClient.get(url_question, headers);
		if (responseData.getCode() != 200) {
			return null;
		}
		JSONObject json = JSONObject.parseObject(responseData.getBackData());
		if (json == null) {
			return null;
		}
		SpeakWriteH5VO vo = new SpeakWriteH5VO();
		vo.setContent(json.getString("content"));
		vo.setGroupName(json.getString("group_name"));
		vo.setSequence_number(json.getIntValue("sequence_number"));
		vo.setType(type);
		vo.setQuestion_id(question_id);

		// 分享的记录
		json = null;
		responseData = null;
		String url_share = PropertiesUtils.getString("learn_api_url") + "/speakingswritings/shares/" + type + "/"
				+ question_id + "?page_size=" + page_size + "&page=" + page + "&userId=" + userId;
		if (share_id > 0) { // 单条分享记录
			url_share = PropertiesUtils.getString("learn_api_url") + "/speakingswritings/shares/" + type + "/"
					+ question_id + "?share_id=" + share_id + "&userId=" + userId;
		}
		responseData = ApiClient.get(url_share, headers);
		if (responseData.getCode() != 200) {
			return null;
		}

		String result = responseData.getBackData();
		if (StringUtils.isEmpty(result)) {
			return null;
		}
		result = result.replace("\\n", "<br>");

		json = JSONObject.parseObject(result);
		if (json == null) {
			return vo;
		}

		vo.setModuleName(json.getString("moduleName"));
		List<SpeakWriteShare> lists = JSON.parseArray(json.getString("results"), SpeakWriteShare.class);
		vo.setList(lists);
		vo.setNext(json.getString("next"));
		vo.setPrivious(json.getString("privious"));
		vo.setCounts(json.getIntValue("counts"));
		return vo;
	}

	/**
	 * 获取谋道题目的评论
	 * 
	 * @Methods Name getSpeakWriteComments
	 * @Create In 2016年10月25日 By dangxingfei@xiaoma.cn
	 * @param answerId
	 *            问题的id
	 * @param page
	 *            第几页
	 * @param pageSize
	 *            每页的分页条数
	 * @param type
	 *            那种列席（type共有1,2,3,4）
	 * @return SpeakWriteCommentVO
	 */
	public SpeakWriteCommentVO getSpeakWriteComments(String accessToken, Integer answerId, Integer page,
			Integer pageSize, Integer type) {
		SpeakWriteCommentVO vo = null;
		Map<String, String> headers = new HashMap<String, String>();
		if (!StringUtils.isEmpty(accessToken)) {
			headers.put("Authorization", "bearer " + accessToken);
		}
		String url = PropertiesUtils.getString("learn_api_url") + "/speakingswritings/comment/" + type + "/" + answerId
				+ "?page=" + page + "&pageSize=" + pageSize;
		ResponseData responseData = ApiClient.get(url, headers);
		if (responseData.getCode() != 200) {
			return null;
		}

		JSONObject json = JSONObject.parseObject(responseData.getBackData());
		if (json == null) {
			return null;
		}

		vo = new SpeakWriteCommentVO();
		vo.setPage(json.getInteger("page"));
		vo.setPageSize(pageSize);
		vo.setTotal(json.getInteger("total"));
		vo.setTotalPage(json.getInteger("totalPage"));

		String conmmentStrs = json.getString("commentList");
		if (StringUtils.isEmpty(conmmentStrs)) {
			return vo;
		}

		// 获取评价列表
		List<SpeakWriteComment> list = JSONObject.parseArray(conmmentStrs, SpeakWriteComment.class);
		vo.setComments(list);

		return vo;
	}

	/**
	 * 获取分享记录（单条或者多条）
	 * 
	 * @Methods Name getSpeakWrites
	 * @Create In 2016年10月27日 By dangxingfei@xiaoma.cn
	 * @param type
	 * @param question_id
	 * @param share_id
	 * @param page_size
	 * @param page
	 * @param userId
	 * @return List<SpeakWriteShare>
	 */
	public List<SpeakWriteShare> getSpeakWrites(int type, int question_id, int share_id, int page_size, int page,
			int userId) {

		// 分享的记录
		JSONObject json = null;
		ResponseData responseData = null;
		String url_share = PropertiesUtils.getString("learn_api_url") + "/speakingswritings/shares/" + type + "/"
				+ question_id + "?page_size=" + page_size + "&page=" + page + "&userId=" + userId;
		if (share_id > 0) { // 单条分享记录
			url_share = PropertiesUtils.getString("learn_api_url") + "/speakingswritings/shares/" + type + "/"
					+ question_id + "?share_id=" + share_id + "&userId=" + userId;
		}
		Map<String, String> headers = new HashMap<String, String>();
		responseData = ApiClient.get(url_share, headers);
		if (responseData.getCode() != 200) {
			return null;
		}

		String result = responseData.getBackData();
		if (StringUtils.isEmpty(result)) {
			return null;
		}
		// result =result.replace("\\n", "<br>");
		result = result.replace("\\n", "<br>");
		result = result.replace("\\r", result);

		json = JSONObject.parseObject(result);
		if (json == null) {
			return null;
		}
		List<SpeakWriteShare> lists = JSON.parseArray(json.getString("results"), SpeakWriteShare.class);
		return lists;
	}
	/**
	 * 根据vip卡号获得金额
	 * @Title: getbycardno 
	 * @Description: TODO
	 * @param @param cardno
	 * @param @return    设定文件 
	 * @return Map<String,Object>    返回类型 
	 * @throws
	 */
	public Map<String,Object> getbycardno(VipCardDTO vipCarddto)
	{
		Map<String,Object> map = new HashMap<String,Object>();
		JSONObject json = null;
		ResponseData responseData = null;
		String url = PropertiesUtils.getString("SHOPPING_HOST") + "/vipCard/activates/getCard?cardNumber="+vipCarddto.getCardNumber();
		Map<String, String> headers = new HashMap<String, String>();
		responseData = ApiClient.get(url, headers);
		if(responseData!=null&&responseData.getCode()==200)
		{
			String result = responseData.getBackData();
			json = JSONObject.parseObject(result);
			json = json.getJSONObject("vipCard");
			VipCardDTO vipCard = JSONObject.parseObject(json.toJSONString(), VipCardDTO.class);
			if(vipCard==null)
			{
				map.put("message", "数据为空");
			}
			else
			{
				//正常返回
				map.put("vipCard", vipCard);
				map.put("message", "ok");
			}
		}
		else
		{
			map.put("message", responseData.getMessage());
		}
		return map;
	}
	
	/**
	 * 根据卡号和激活码校验
	 * @Title: checkbycardno 
	 * @Description: TODO
	 * @param @param cardno
	 * @param @param activation
	 * @param @return    设定文件 
	 * @return Map<String,Object>    返回类型 
	 * @throws
	 */
	public Map<String,Object> checkbycardno(VipCardDTO vipCarddto)
	{
		Map<String,Object> map = new HashMap<String,Object>();
		ResponseData responseData = null;
		String url = PropertiesUtils.getString("SHOPPING_HOST") + "/vipCard/activates/checkCode?id="+vipCarddto.getId()+"&activationCode="+vipCarddto.getActivationCode();
		Map<String, String> headers = new HashMap<String, String>();
		responseData = ApiClient.get(url, headers);
		if(responseData!=null&&responseData.getCode()==200)
		{
			//正常返回
			map.put("message", "ok");
		}
		else
		{
			map.put("message", responseData.getMessage());
		}
		return map;
	}
	/**
	 * 
	 * @Title: usecard 
	 * @Description: TODO
	 * @param @param vipCard
	 * @param @return    设定文件 
	 * @return Map<String,Object>    返回类型 
	 * @throws
	 */
	public Map<String,Object> usecard(VipCardDTO vipCard )
	{
		Map<String,Object> map = new HashMap<String,Object>();
		ResponseData responseData = null;
		String url = PropertiesUtils.getString("SHOPPING_HOST") + "/vipCard/activates";
		Map<String, String> headers = new HashMap<String, String>();
		Map<String, String> params = (Map<String, String>) MapUtil.objectToMap(vipCard);
		responseData = ApiClient.post(url, params, headers);
		if(responseData!=null&&responseData.getCode()==200)
		{
			//正常返回
			map.put("message", "ok");
			map.put("vipCard", vipCard);
		}
		else
		{
			map.put("message", responseData.getMessage());
		}
		return map;
	}

	public static void main(String[] args) {
		String str = "\n\nFinally";
		System.out.println(str.replaceAll("(\r\n|\r|\n|\n\r)", "<br>"));
	}

}
