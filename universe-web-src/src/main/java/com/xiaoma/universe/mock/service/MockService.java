package com.xiaoma.universe.mock.service;

import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import com.xiaoma.rest.authentication.UniverseSession;
import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.contant.Contant;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.common.utils.StringUtils;
import com.xiaoma.universe.mock.model.MkTpoVo;
import com.xiaoma.universe.userlogin.controller.UserVO;

public class MockService {

	public boolean getLoginStatus(HttpServletRequest request) {
		if(request==null)
			return false;
		String token="";
		UserVO userVO = (UserVO) UniverseSession.getAttribute("userInfo"); 
		if(userVO!=null)
		token = userVO.getAccess_token();
		//if(token!=null && token!="")
		if(!StringUtils.isEmpty(token))
			return true;
		return false;
	}

	@SuppressWarnings("unchecked")
	public List<MkTpoVo> getTpoList() {
		List<MkTpoVo> tpolist=null;
		Map<String, String> headers = getHeaders();
		ResponseData responseData = ApiClient.get(Contant.GET_TPO_LIST, headers);
		if (responseData.getCode() != 200) {
			return null;
		}
        net.sf.json.JSONObject resultJson = net.sf.json.JSONObject.fromObject(responseData.getBackData());
        net.sf.json.JSONArray array = net.sf.json.JSONArray.fromObject(resultJson.get("tpos"));
        tpolist = (List<MkTpoVo>) net.sf.json.JSONArray.toCollection(array, MkTpoVo.class);
        Collections.sort(tpolist);
        return tpolist;
	}

	private Map<String, String> getHeaders() {
		Map<String, String> headers = new HashMap<String, String>();
		headers.put("Content-Type", "application/json");
		headers.put("fromType", "web");
		return headers;
	}
}
