package com.xiaoma.universe.userlogin.service;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.HashMap;
import java.util.Map;

import com.xiaoma.universe.common.api.ApiClient;
import com.xiaoma.universe.common.utils.PropertiesUtils;
import com.xiaoma.universe.userlogin.controller.UserVO;

public class UserLoginService {
	 public static Map<String, Object> pojo2Map(Object obj)  throws Exception{  
		 Map<String, Object> map = new HashMap<String, Object>();
         Class<?> clazz = obj.getClass();
         Field[] fields = clazz.getDeclaredFields();
         for (Field field : fields) {
            PropertyDescriptor pd = new PropertyDescriptor(field.getName(), clazz);
            Method getMethod = pd.getReadMethod();
            Object o = getMethod.invoke(obj);
            map.put(field.getName(), o);
        }
         return map;
	 }  
	 
	//Map 转 java 对象
	   public static Object map2Object(Map<String, Object> map, Class<?> beanClass) throws Exception {    
	        if (map == null)  
	            return null;  
	  
	        Object obj = beanClass.newInstance();  
	  
	        org.apache.commons.beanutils.BeanUtils.populate(obj, map);  
	  
	        return obj;  
	    }
}
