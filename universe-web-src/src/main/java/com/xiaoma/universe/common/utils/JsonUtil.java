package com.xiaoma.universe.common.utils;

import java.io.BufferedReader;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import net.sf.ezmorph.object.DateMorpher;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.CycleDetectionStrategy;
import net.sf.json.util.JSONUtils;

import org.apache.commons.lang.StringUtils;

import com.xiaoma.universe.common.utils.jsonlib.DateJsonBeanProcessor;
import com.xiaoma.universe.common.utils.jsonlib.DateJsonValueProcessor;
import com.xiaoma.universe.common.utils.jsonlib.DateToJsonBeanProcessor;
import com.xiaoma.universe.common.utils.jsonlib.DateToJsonValueProcessor;

public class JsonUtil {
	
	private JsonUtil() {};
	
	//可转换的日期格式，即Json串中可以出现以下格式的日期与时间
	private static void setDateFormat() {
		JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpher(new String[]{"yyyy-MM-dd", "yyyy-MM-dd HH:mm:ss",
				"MM/dd/yyyy HH:mm:ss", "MM/dd/yyyy"}));
	}
	
	/**
	 * 获得通用的JsonConfig
	 * @param excludes 排除的properties
	 * @return
	 */
	public static JsonConfig configJson(String[] excludes) {   
        JsonConfig jsonConfig = new JsonConfig();   
        if (excludes != null) jsonConfig.setExcludes(excludes);   
        jsonConfig.setIgnoreDefaultExcludes(false);   
        jsonConfig.setCycleDetectionStrategy(CycleDetectionStrategy.LENIENT);   
        jsonConfig.registerJsonBeanProcessor(Date.class, new DateJsonBeanProcessor()); 
        jsonConfig.registerJsonValueProcessor(Date.class, new DateJsonValueProcessor());
        return jsonConfig;   
    } 
	/**
	 * 获得通用的JsonConfig
	 * @param excludes 排除的properties
	 * @return
	 */
	public static JsonConfig configToJson(String[] excludes) {   
		JsonConfig jsonConfig = new JsonConfig();   
		if (excludes != null) jsonConfig.setExcludes(excludes);   
		jsonConfig.setIgnoreDefaultExcludes(false);   
		jsonConfig.setCycleDetectionStrategy(CycleDetectionStrategy.LENIENT);   
		jsonConfig.registerJsonBeanProcessor(Date.class, new DateToJsonBeanProcessor()); 
		jsonConfig.registerJsonValueProcessor(Date.class, new DateToJsonValueProcessor());
		return jsonConfig;   
	} 
	
	public static JsonConfig configJson() {
		return configJson(null);
	}
	
	/**
	 * javaObject to JsonObject
	 * @param javaObject
	 * @return
	 */
	public static JSONObject objToJson(Object javaObject) {
		return JSONObject.fromObject(javaObject, configToJson(null));
	}
	/**
	 * javaObject to JsonObject
	 * @param javaObject
	 * @return
	 */
	public static JSONObject obj2Json(Object javaObject) {
		return JSONObject.fromObject(javaObject, configJson());
	}
	
	/**
	 * @param javaObject
	 * @param excludes 需要排除的property
	 * 例如: new String[]{"case", "empty"}
	 * @return
	 */
	public static JSONObject obj2Json(Object javaObject, String[] excludes) {
		return JSONObject.fromObject(javaObject, configJson(excludes));
	}
	
	/**
	 * java object to JsonArray Object
	 * @param javaObject
	 * @return
	 */
	public static JSONArray obj2JsonArray(Object javaObject) {
		return JSONArray.fromObject(javaObject, configJson());
	}
	
	public static JSONArray obj2JsonArray(Object javaObject, String[] excludes) {
		return JSONArray.fromObject(javaObject, configJson(excludes));
	}
	
	public static <T> List<T> json2JavaList(String jsonString, Class<T> clazz) throws Exception {
		return json2List(jsonString, clazz, null);
	}
	
	/**
	 * 根据jsonString生成List的对象
	* @param jsonString
	* @param clazz	List包含的类
	* @param excludes	需要去掉的属性
	* @return
	* @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static <T> List<T> json2List(String jsonString, Class<T> clazz, String[] excludes) throws Exception {
		JSONArray ja = JSONArray.fromObject(jsonString, configJson(excludes));
		setDateFormat();
		Collection<T> c = JSONArray.toCollection(ja, clazz);
		if (c == null) {
			return null;
		}
		else {
			List<T> rl = new ArrayList<T>();
			rl.addAll(c);
			return rl;
		}
	}
	
	/**
	 * 将json字符串装换为对应的java对象
	 * @param jsonString
	 * @param clazz
	 * @param excludes
	 * @return
	 * @throws Exception
	 */
	@SuppressWarnings("unchecked")
	public static <T> T json2Obj(String jsonString, Class<T> clazz, String[] excludes) throws Exception {
		JSONObject jo = JSONObject.fromObject(jsonString, configJson(excludes));
		setDateFormat();
		return (T)JSONObject.toBean(jo, clazz);
	}
	
	public static <T> T json2Obj(String jsonString, Class<T> clazz) throws Exception {
		return json2Obj(jsonString, clazz, null);
	}
	/**
	 * 把对象转化成json
	 * 
	 * @param obj
	 * @return
	 */
	public static String toJson(Object obj) {

		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.registerJsonValueProcessor(Date.class, new DateToJsonValueProcessor());
		JSONObject jsonObj = JSONObject.fromObject(obj, jsonConfig);

		return jsonObj.toString();

	}
	/**
	 * 把json转化成对象
	 * 
	 * @param json
	 * @param clazz
	 * @return
	 */
	public static <T> T getObjFromJson(String json, Class<T> clazz) {
		JSONObject jsonObj = JSONObject.fromObject(json);

		JsonConfig jsonConfig = new JsonConfig();
		jsonConfig.setRootClass(clazz);

		JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpherEx(new String[] { "yyyy-MM-dd HH:mm:ss:S", "yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd" }, (Date) null));
		
		@SuppressWarnings("unchecked")
		T entity = (T) JSONObject.toBean(jsonObj, jsonConfig);
		return entity;
	}
	
	 /**
	  * 读取参数
	 * @param request
	 * @return
	 */
	public static JSONObject readJSONString(HttpServletRequest request){
	        StringBuffer stringBuffer = new StringBuffer();
	        String line = null;
	        try {
	            BufferedReader reader = request.getReader();
	            while((line = reader.readLine()) != null) {
	            	stringBuffer.append(line);
	            }
	        }
	        catch(Exception e) {
	        }
	        
	        JSONObject json = null;
	        if(!StringUtils.isBlank(stringBuffer.toString())){
	        	json = JSONObject.fromObject(stringBuffer.toString());
	        }
	        return json;
	    }
	
	public static void main(String[] args) throws Exception{
		/*InterfaceLog log = new InterfaceLog();
		log.setCreateDate(new Date());
		String[] aa = {"id"};
		//system.out.println(obj2Json(log,aa));
		JSONObject obj = new JSONObject();
		obj.put("createDate", new Date());
		InterfaceLog log2 = json2Obj(obj.toString(), InterfaceLog.class);*/
		//system.out.println(log2.getCreateDate());
	}
}
