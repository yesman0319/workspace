/**
 * 
 */
package com.xiaoma.universe.learnplan.util;

import java.io.BufferedReader;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;

import com.xiaoma.universe.common.utils.TimeUtil;

import net.sf.json.JSONObject;

/**
 * @author xiaoma
 *
 */
public class LearnplanUtil {
	
	 /**
	  * 读取参数
	 * @param request
	 * @return
	 */
	public static String readReauestBodyString(HttpServletRequest request){
	        StringBuffer stringBuffer = new StringBuffer();
	        String line = null;
	        try {
	            BufferedReader reader = request.getReader();
	            while((line = reader.readLine()) != null) {
	            	stringBuffer.append(line);
	            }
	        }
	        catch(Exception e) {
	        	e.printStackTrace();
	        }
	        
	        return stringBuffer.toString();
	    }
	
	public static String getDateString(int year,int month,int day){
		String str = "";
		if(year>0){
			str = year+"";
		}
		if(month>0){
			str = str + (StringUtils.isBlank(str)?"":"/") + (month>=10?""+month:"0"+month);
		}
		
		if(day>0){
			str = str + (StringUtils.isBlank(str)?"":"/") + (day>=10?""+day:"0"+day);
		}
		
		if(StringUtils.isBlank(str)){
			str = "N/A";
		}
		return str;
	}
	
	public static String getDayNumNmme(int dayNum){
		return "第" + dayNum + "节";
	}
	public static String getStartEndTime(Date startTime,Date endTime){ 
		String startStr = "";
		if(startTime!=null){ 
			startStr = TimeUtil.date2String(startTime, "HH:mm");
		}
		String endStr = "";
		if(endStr!=null){ 

			endStr = TimeUtil.date2String(endTime, "HH:mm");
		}
		 
		return startStr + "-" + endStr;
	}
	public static String getLiveLessionName(String crategoryName,String name){
		String backName = "";
		if(!StringUtils.isBlank(crategoryName)){
			backName = "【"+ crategoryName +"】";
		}
		
		if(!StringUtils.isBlank(name)){
			backName = backName + " "+ name;
		}
		if(StringUtils.isBlank(backName)){
			backName = "暂无名称";
		}
		
		return backName;
	}
	public static String getActionName(int status){ 
		//状态（1回播，2直播，3今天未开始，4未开始）
		 if(status==1){
			 return "免费体验";
		 }
		 
		 if(status==2){
			 return "直播中";
		 }
		 
		 if(status==3){
			 return "未开始";
		 }
		 if(status==4){
			 return "未开始";
		 }
		 
		return  "立即体验";
	}
}
