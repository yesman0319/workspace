package com.xiaoma.universe.common.utils;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

import com.alibaba.fastjson.JSONObject;

public class MapUtil {
	
	
	public static Map<String,Object> toMap(Integer code,String message){
		return toMap(code, message,null);
	}
	public static Map<String,Object> toMap(Integer code,String message,Object result){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("status", code);
		map.put("message", message);
		if(result != null)
			map.put("result", result);
		return map;
	}
	public static Map<String,Object> toMap(Integer code,String message,Object result,String planName,String qSummary,String process,String expect,String hasDoneTime){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("status", code);
		map.put("message", message);
		map.put("questionSummary", qSummary);
		map.put("planName", planName);
		map.put("process", process);
		map.put("expect", expect);
		map.put("hasDoneTime", hasDoneTime);
		if(result != null)
			map.put("result", result);
		return map;
	}
	
	/**
	 * 返回接口map,带总记录条数
	* @param totalCount
	* @param message
	* @param result
	* @return
	* @Author: zongyannan
	* @Date: 2015年7月28日
	 */
	public static Map<String,Object> toMap4Page(Integer totalCount,String message,Object result){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("status", 0);//状态固定为成功
		map.put("totalCount", totalCount);//总记录数
		map.put("message", message);//提示信息
		if(result != null)
			map.put("result", result);//结果明细
		return map;
	}
	
	
	//返回的提示信息
	public static Map<String,Object> resultMap(Integer code,String message){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("code", code);
		map.put("msg", message);
		return map;
	} 
	
	//返回的提示信息
	public static Map<String,Object> resultMap(String key,Object value){
		Map<String, Object> map = new HashMap<String, Object>();
		map.put(key, value);
		return map;
	} 
	
	/**
	 * 对象转map
	 * @param obj
	 * @return
	 */
	public static Map<String, String> objectToMap(Object obj) {  
        if(obj == null){
        	return null;
        }
           JSONObject json = (JSONObject) JSONObject.toJSON(obj); 
            Map<String, String> result = new HashMap<String, String>(); 
            Set<String> set = json.keySet();
            String value = null; 
            System.out.println(json);
            for (String key : set) {
            	 value = json.getString(key); 
            	 if(StringUtils.isEmpty(value)){
            		 continue;
            	 }
            	 System.out.println(value);
                 result.put(key, value); 
			}
            return result; 
    } 
	
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}

}
