package com.xiaoma.universe.h5.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

import com.alibaba.fastjson.JSONObject;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.api.JsonUtil;
import com.xiaoma.universe.common.contant.Contant;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.common.utils.TimeUtil;
import com.xiaoma.universe.h5.model.CommentVO;
import com.xiaoma.universe.h5.model.CommentVOP;
import com.xiaoma.universe.information.model.Info;
import com.xiaoma.universe.information.model.obj.PageBean;

@Service
public class CommentService {

	public CommentVOP getCommentList(Integer type, Integer answerId,
			Integer page, Integer pageSize, HttpServletRequest request) throws Exception {
		Map<String, String> headers = getHeaders();
		String infoUrl =Contant.COMMENT_API_URL+type+"/"+answerId+"?page="+page+"&pageSize="+pageSize;
		ResponseData responseData = ApiClient.get(infoUrl, headers,request,null);
		if (responseData.getCode() != 200) {
			return null;
		}
		CommentVOP cop = (CommentVOP) JsonUtil.jsonToBean(responseData.getBackData(), CommentVOP.class);
		List<CommentVO> list = cop.getCommentList();
		for (CommentVO vo : list) {
			String time = TimeUtil.intToTime(vo.getAudioLength());
			vo.setAudioTime(time);
			String beaferNow = TimeUtil.DateBeaferNow(vo.getCreatedAt());
			vo.setTime(beaferNow);
		}
		return cop;
	}

	public String deleteById(HttpServletRequest request, Integer id) {
		Map<String, String> headers = getHeaders();
		ResponseData responseData = ApiClient.delete(Contant.COMMENT_API_URL+id, headers,request,"ajax");
		if (responseData.getCode() != 200) {
			return "false";
		}
    	String str = JSONObject.toJSONString(responseData.getBackData());
        return "true";
	}
   
	private Map<String, String> getHeaders() {
		Map<String, String> headers = new HashMap<String, String>();
		headers.put("Content-Type", "application/json");
		headers.put("fromType", "web");
		return headers;
	}

	public String saveComment(HttpServletRequest request, CommentVO commentVo) {
		Map<String, String> headers = getHeaders();
		Map<String, String> params = new HashMap<String,String>();
		params.put("commentAudio", commentVo.getCommentAudio());
		params.put("commentTxt", commentVo.getCommentTxt());
		params.put("answerId", String.valueOf(commentVo.getAnswerId()));
		params.put("audioLength", String.valueOf(commentVo.getAudioLength()));
		params.put("type", String.valueOf(commentVo.getType()));
		params.put("questionId", String.valueOf(commentVo.getQuestionId()));
		params.put("beUserId", commentVo.getBeUserId().toString());
		params.put("shareId", commentVo.getShareId().toString());
		ResponseData responseData = ApiClient.postJson(Contant.COMMENT_API_URL, params, headers,request,"ajax");
		if (responseData.getCode() != 200) {
			return "false";
		}
    	String str = JSONObject.toJSONString(responseData.getBackData());
        return "true";
	}
}
