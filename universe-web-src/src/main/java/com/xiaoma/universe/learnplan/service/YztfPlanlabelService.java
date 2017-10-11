package com.xiaoma.universe.learnplan.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import org.springframework.stereotype.Service;

import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.api.JsonUtil;
import com.xiaoma.universe.common.contant.Contant;
import com.xiaoma.universe.common.utils.ResponseData;
import com.xiaoma.universe.learnplan.domain.vo.web.YztfPlanLabelPO;

/** 获取计划分类，标签 如：阅读，写作，口语，听力，等等
 * @author wanghongxia
 */
@Service
public class YztfPlanlabelService {
	public List<YztfPlanLabelPO> getMap(){
		String url = Contant.LEARNING_PLAN_LABEL;
		Map<String,String> header = new HashMap<String,String>();
		ResponseData data = ApiClient.get(url,header);
		JSONObject jb = JSONObject.fromObject(data.getBackData());
		JSONArray ja = jb.getJSONArray("rows");
		List<YztfPlanLabelPO> yztfPlanLabelList = new ArrayList<YztfPlanLabelPO>();
 		for(int i = 0;i<ja.size();i++){
 			JSONObject perObj = (JSONObject)ja.get(i);
 			YztfPlanLabelPO yztfPlanLabelPO;
			try {
				yztfPlanLabelPO = (YztfPlanLabelPO) JsonUtil.jsonToBean(perObj.toString(), YztfPlanLabelPO.class);
				yztfPlanLabelList.add(yztfPlanLabelPO);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return yztfPlanLabelList;
	}
	
}
