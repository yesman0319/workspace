package com.xiaoma.universe.common.utils.jsonlib;

import java.text.SimpleDateFormat;
import java.util.Date;

import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonBeanProcessor;

public class DateToJsonBeanProcessor implements JsonBeanProcessor {

	public JSONObject processBean(Object bean, JsonConfig arg1) {
		JSONObject jsonObject;
		if (bean instanceof Date) {
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			String ds = sdf.format(bean);
			jsonObject = new JSONObject();
			jsonObject.element(bean.getClass().getSimpleName(), ds);
		} else {
			jsonObject = new JSONObject(true);
		}
		return jsonObject;
	}

}
