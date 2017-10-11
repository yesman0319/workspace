package com.xiaoma.universe.common.utils;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

public class RequestParams {
	
	/**
	 * 获得HttpServletRequest对象
	 * 
	 * @return HttpServletRequest
	 */
	protected static HttpServletRequest getRequest() {
		return ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
	}

	/**
	 * 获得HttpServletRequest参数和值Map对象
	 * 
	 * @return Map<String, Object>
	 */
	public static Map<String, Object> getParameterMap() {
		Map<String, Object> map = new HashMap<String, Object>();
		Map<String, String[]> parameterMap = getRequest().getParameterMap();
		for (Iterator<String> iterator = parameterMap.keySet().iterator(); iterator.hasNext();) {
			String key = iterator.next();
			String[] value = parameterMap.get(key);
			if(value != null && value.length > 0){
				map.put(key, StringUtils.join(value, ","));
			}
		}
		return map;
	}
}
