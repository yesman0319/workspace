package com.xiaoma.universe.common.utils;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

public class TimeHelper {

	public static String NORMAL_PATTERN = "MM/dd/yyyy";
	
	public static String OTHER_PATTERN = "yyyy-MM-dd HH:mm:ss";

	public static String convertMillisecondToStr(Long milliSecond,
			String pattern) {

		if (milliSecond == null) {
			return "";
		}

		Date date = new Date(milliSecond);
		SimpleDateFormat sdf = new SimpleDateFormat(pattern);

		return sdf.format(date);
	}

	public static Date convertM2D(Long mill) {
		if (mill == null) {
			return null;
		}

		return new Date(mill);
	}

	public static Long getZeroMill() {
		Date date = new Date();
		Calendar calendar = Calendar.getInstance();
		
		calendar.setTime(date);
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
		
		return calendar.getTime().getTime();
	}
	
	public static Date addDate(Date d, Integer day){ 
		
		Calendar fromCal=Calendar.getInstance();
		fromCal.setTime(d);
		fromCal.add(Calendar.DATE, day);
		  
        return fromCal.getTime();  
  
    }
	
	/**
	 * 获取周一
	* @param d 当前时间
	* @param num 推迟的周数，0本周，-1上周一，1下周一，依次类推
	* @return
	* @Author: zongyannan
	* @Date: 2015年11月10日
	 */
	public static Date getMonday(Date d, Integer num){
		 Calendar fromCal = Calendar.getInstance();
		 fromCal.add(Calendar.DATE, num*7);
		  //想周几，这里就传几Calendar.MONDAY（TUESDAY...）
		 fromCal.set(Calendar.DAY_OF_WEEK,Calendar.MONDAY);
		  return fromCal.getTime();
	}
	
	/**
	 * 给定日期增加 指定月份
	* @param sourceDate
	* @param addMonth
	* @return
	* @Author: wangxingfei
	* @Date: 2015年5月30日
	 */
	public static Date addMonth(Date sourceDate, Integer addMonth){ 
		Calendar fromCal=Calendar.getInstance();
		fromCal.setTime(sourceDate);
		fromCal.add(Calendar.MONTH, addMonth);
        return fromCal.getTime();  
    }  
	
	public static boolean isOverdue(Date date){
		if(date.getTime()<=new Date().getTime())
			return true;
		else
			return false;
	}
	
	/**
	 * 获取 date1 减去 date2 的 分钟数
	* @param date1
	* @param date2
	* @return
	* @Author: wangxingfei
	* @Date: 2015年5月23日
	 */
	public static Long sub2Min(Date date1, Date date2) {
		if(date1==null || date2==null) return 0L;
		return (date1.getTime()-date2.getTime())/1000/60;
		
	}
	
	/**
	 * 获取 date1 减去 date2 的 天数
	* @param date1
	* @param date2
	* @return
	* @Author: wangxingfei
	* @Date: 2015年6月24日
	 */
	public static Integer sub2Date(Date date1, Date date2) {
		if(date1==null || date2==null) return 0;
		return (int) ((date1.getTime()-date2.getTime())/1000/60/60/24);
	}
	
	public static void main(String[] args) throws ParseException{
		Date date2 = string2Date("2015-08-31");
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		Date date1 = sdf.parse("2015-10-01 00:00:00");
		System.out.println(addMonth(date1, 1));
	}
	
	/**
	 * 获取 起始日期和结束日期中的所有日期
	* @param startDate	起始日期	2015-05-23
	* @param endDate	结束日期	2015-05-25
	* @return	2015-05-23,2015-05-24,2015-05-25
	* @Author: wangxingfei
	* @Date: 2015年5月23日
	 */
	public static List<String> getSpaceDates(String startDate, String endDate){
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		long start = string2Date(startDate).getTime();
		long end = string2Date(endDate).getTime();
		List<String> list = new ArrayList<String>();
		while(start<=end){
			Date time=new Date(start);
			list.add(sdf.format(time));
			start += 1000 * 60 * 60 * 24;//加一天
		}
		return list; 
	}
	
	/**
	 * date转字符串
	* @param date
	* @return	yyyy-MM-dd
	* @Author: wangxingfei
	* @Date: 2015年5月23日
	 */
	public static String date2String(Date date){
		if(date==null) return null;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		return sdf.format(date);
	}
	/**
	 * date转字符串
	 * @param date
	 * @return	yyyy-MM-dd
	 * @Author: wangxingfei
	 * @Date: 2015年5月23日
	 */
	public static String date2String(Date date,String pattern){
		if(date==null) return null;
		SimpleDateFormat sdf = new SimpleDateFormat(pattern);
		return sdf.format(date);
	}
	
	/**
	 * 字符串转date
	* @param str	yyyy-MM-dd
	* @return
	* @Author: wangxingfei
	* @Date: 2015年5月23日
	 */
	public static Date string2Date(String str){
		return string2Date(str,"yyyy-MM-dd");
	}
	
	/**
	 * 字符串转date
	* @param str	字符串
	* @param format	格式化
	* @return
	* @Author: wangxingfei
	* @Date: 2015年6月26日
	 */
	public static Date string2Date(String str,String format){
		if(str==null) return null; 
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		try {
			return sdf.parse(str);
		} catch (ParseException e) {
		}
		return null;
	}
	
	/**
	 * 获取 当前日期 是周几
	* @param date
	* @return	周日:1,周一:2
	* @Author: wangxingfei
	* @Date: 2015年5月23日
	 */
	public static int getDayOfWeek(Date date){
		if(date==null) return 0;
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		return calendar.get(Calendar.DAY_OF_WEEK);
	}
	
	/**
	 * 获取没有时分秒的 当前年月日
	* @return
	* @Author: wangxingfei
	* @Date: 2015年5月23日
	 */
	public static Date getZeroTimeDate() {
		return getZeroTimeDate(new Date());
	}
	
	/**
	 * 将日期转换为 没有时分秒的日期
	* @return
	* @Author: wangxingfei
	* @Date: 2015年5月23日
	 */
	public static Date getZeroTimeDate(Date date) {
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		calendar.set(Calendar.HOUR_OF_DAY, 0);
		calendar.set(Calendar.MINUTE, 0);
		calendar.set(Calendar.SECOND, 0);
		calendar.set(Calendar.MILLISECOND, 0);
		return calendar.getTime();
	}
	
	/** 
	 *  
	 * @param 要转换的毫秒数 
	 * @return 该毫秒数转换为   hours * minutes * 后的格式 
	 * @author fy.zhang 
	 */  
	public static String formatDuring(long mss) {    
	    long hours = mss/ (1000 * 60 * 60);  
	    long minutes = (mss % (1000 * 60 * 60)) / (1000 * 60); 
	    if(hours==0){
	    	return minutes + "分钟 ";
	    	
	    }else{
	       return hours + "小时 "+ minutes + "分钟 ";
	    }
	}  
}
