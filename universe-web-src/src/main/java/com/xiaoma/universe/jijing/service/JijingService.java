package com.xiaoma.universe.jijing.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Service;

import com.alibaba.druid.support.json.JSONUtils;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.api.JsonUtil;
import com.xiaoma.universe.common.contant.Contant;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.information.model.Category;
import com.xiaoma.universe.jijing.model.GroupQuestionVO;
import com.xiaoma.universe.jijing.model.JijingQuestionVO;
import com.xiaoma.universe.jijing.model.PageJijingGroup;

@Service("jijingService")
public class JijingService {

	public PageJijingGroup getJijingGroup() throws Exception {
		Map<String, String> headers = getHeaders();
		ResponseData responseData = ApiClient.get(Contant.JIJING_GROUP, headers);
		if (responseData.getCode() != 200) {
			return null;
		}
		PageJijingGroup page = (PageJijingGroup) JsonUtil.jsonToBean(responseData.getBackData(), PageJijingGroup.class);
        return page;
		
	}
	
	private Map<String, String> getHeaders() {
		Map<String, String> headers = new HashMap<String, String>();
		headers.put("Content-Type", "application/json");
		headers.put("fromType", "web");
		return headers;
	}

	public GroupQuestionVO getJijingQuestions(Integer year, Integer month,
			Integer type, Integer studyType, Integer page, Integer pageSize, HttpServletRequest request) throws Exception {
		Map<String, String> headers = getHeaders();
		String url=Contant.JIJING_QUESTIONS+"?year="+year+"&month="+month+"&type="+type+"&studyType="+studyType+"&page="+page+"&pageSize="+pageSize;
		ResponseData responseData = ApiClient.get(url, headers,request,null);
		if (responseData.getCode() != 200) {
			return null;
		}
		GroupQuestionVO que = (GroupQuestionVO) JsonUtil.jsonToBean(responseData.getBackData(), GroupQuestionVO.class);
        return que;
	}

}
