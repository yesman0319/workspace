package com.xiaoma.universe.common.utils;

import java.io.File;
import java.net.URL;

import org.apache.commons.io.FileUtils;

public class Download {

   public static void main(String[] args) {
	     String res = downloadFromUrl("http://liantpo.b0.upaiyun.com/speaking/pic/blackman.jpg","C:/Users/Alex/Desktop/d");  
	        System.out.println(res);  
}
  
    public static String downloadFromUrl(String url,String dir) {  
  
        try {  
            URL httpurl = new URL(url);  
            String fileName = getFileNameFromUrl(url);  
            System.out.println(fileName);  
            File f = new File(dir + fileName);  
            FileUtils.copyURLToFile(httpurl, f);
            return dir+""+fileName;  
        } catch (Exception e) {  
            e.printStackTrace();  
            return "Fault!";  
        }   
    }  
      
    public static String getFileNameFromUrl(String url){  
        String name = new Long(System.currentTimeMillis()).toString() + ".X";  
        int index = url.lastIndexOf("/");  
        if(index > 0){  
            name = url.substring(index + 1);  
            if(name.trim().length()>0){  
                return name;  
            }  
        }  
        return name;  
    }  
}
