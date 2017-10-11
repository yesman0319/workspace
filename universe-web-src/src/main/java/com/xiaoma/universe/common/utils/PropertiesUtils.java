package com.xiaoma.universe.common.utils;

import java.io.FileInputStream;
import java.io.InputStream;
import java.util.Properties;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.xiaoma.universe.common.contant.Contant;

public class PropertiesUtils {
	
    private static final Logger logger = LoggerFactory.getLogger(PropertiesUtils.class);
	  public static String  getString(String value) {
	    	try{
		    	 //取得根目录路径  
		         String rootPath=Contant.class.getResource("/").getPath(); 
		    	 Properties prop = new Properties();
				 InputStream in = PropertiesUtils.class.getClassLoader().getResourceAsStream("system.properties");
		    	 // FileInputStream fis = new FileInputStream(rootPath+"/system.properties");
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
