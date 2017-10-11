package com.xiaoma.universe.common.api;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Properties;

import com.xiaoma.universe.common.utils.PropertiesUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.xiaoma.universe.common.contant.Contant;

public class ApiPropertiesUtils {
	
    private static final Logger logger = LoggerFactory.getLogger(ApiPropertiesUtils.class);
	  public static String  getString(String value) {
	    	try{
		    	 //取得根目录路径  
		         String rootPath=Contant.class.getResource("/").getPath(); 
		    	 Properties prop = new Properties();
				 InputStream in = ApiPropertiesUtils.class.getClassLoader().getResourceAsStream("api-client.properties");
		    	 // FileInputStream fis = new FileInputStream(rootPath+"/api-client.properties");
		    	 prop.load(in);
		    	 in.close();
				 return prop.getProperty(value).trim();
	    	}catch(Exception e){
	    		e.getStackTrace();
	    		logger.debug(e.getMessage());
	    	}
			return null;
	   }
}
