/**
 * 
 */
package com.xiaoma.universe.common.api;

import java.text.SimpleDateFormat;
import java.util.List;

import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.JavaType;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import net.sf.json.JSONObject;

/**
 * @author xiaoma
 *
 */
public class JsonUtil {
	private static final String UTF = null;

	public static Object jsonToBean(String json,Class<?> type) throws Exception{
		ObjectMapper objectMapper = new ObjectMapper (); 
		objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		try {
			return objectMapper.readValue(json, type);
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		} 
	}
	
	
	
	public static  String beanToJson(Object obj) throws Exception{
		try {
			ObjectMapper objectMapper = new ObjectMapper (); 
			String json =objectMapper.writeValueAsString(obj);
			return json;
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		} 
	}
	
	public static  JSONObject  jsonToObject(String value) throws Exception{
		return JSONObject.fromObject(value);
	}
	
	public static Object jsonToList(String json,Class<?> type) throws Exception{
		ObjectMapper objectMapper = new ObjectMapper (); 
		objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
		SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		objectMapper.setDateFormat(dateFormat);
		try {
			JavaType javaType = objectMapper.getTypeFactory().constructParametricType(List.class, type); 
			return objectMapper.readValue(json, javaType);
		} catch (Exception e) {
			throw new Exception(e.getMessage());
		} 
	} 
	 
}
