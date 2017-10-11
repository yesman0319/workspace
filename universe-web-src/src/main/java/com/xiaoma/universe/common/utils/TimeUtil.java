package com.xiaoma.universe.common.utils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.apache.commons.lang.StringUtils;

public class TimeUtil {

	public static String NORMAL_PATTERN = "MM/dd/yyyy";

	public static String OTHER_PATTERN = "yyyy-MM-dd HH:mm:ss";

	public static void main(String[] args) throws ParseException {
		// Date date2 = string2Date("2015-08-31");
		// SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
		// Date date1 = sdf.parse("2015-10-01 00:00:00");
		// System.out.println(addMonth(date1, 1));

		// System.out.println(timeLongToString(45));
		// System.out.println(timeLongToString(60*60));
		// System.out.println(timeLongToString(62));
		// System.out.println(timeLongToString(60*60*24));
		System.out.println(DateBeaferNow(new Date()));
	}

	public static String convertMillisecondToStr(Long milliSecond, String pattern) {

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

	public static Date addDate(Date d, Integer day) {

		Calendar fromCal = Calendar.getInstance();
		fromCal.setTime(d);
		fromCal.add(Calendar.DATE, day);

		return fromCal.getTime();

	}

	/**
	 * 获取周一
	 * 
	 * @param d
	 *            当前时间
	 * @param num
	 *            推迟的周数，0本周，-1上周一，1下周一，依次类推
	 * @return
	 * @Author: zongyannan
	 * @Date: 2015年11月10日
	 */
	public static Date getMonday(Date d, Integer num) {
		Calendar fromCal = Calendar.getInstance();
		fromCal.add(Calendar.DATE, num * 7);
		// 想周几，这里就传几Calendar.MONDAY（TUESDAY...）
		fromCal.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
		return fromCal.getTime();
	}

	/**
	 * 给定日期增加 指定月份
	 * 
	 * @param sourceDate
	 * @param addMonth
	 * @return
	 * @Author: wangxingfei
	 * @Date: 2015年5月30日
	 */
	public static Date addMonth(Date sourceDate, Integer addMonth) {
		Calendar fromCal = Calendar.getInstance();
		fromCal.setTime(sourceDate);
		fromCal.add(Calendar.MONTH, addMonth);
		return fromCal.getTime();
	}

	public static boolean isOverdue(Date date) {
		if (date.getTime() <= new Date().getTime())
			return true;
		else
			return false;
	}

	/**
	 * 获取 date1 减去 date2 的 分钟数
	 * 
	 * @param date1
	 * @param date2
	 * @return
	 * @Author: wangxingfei
	 * @Date: 2015年5月23日
	 */
	public static Long sub2Min(Date date1, Date date2) {
		if (date1 == null || date2 == null)
			return 0L;
		return (date1.getTime() - date2.getTime()) / 1000 / 60;

	}

	/**
	 * 获取 date1 减去 date2 的 天数
	 * 
	 * @param date1
	 * @param date2
	 * @return
	 * @Author: wangxingfei
	 * @Date: 2015年6月24日
	 */
	public static Integer sub2Date(Date date1, Date date2) {
		if (date1 == null || date2 == null)
			return 0;
		return (int) ((date1.getTime() - date2.getTime()) / 1000 / 60 / 60 / 24);
	}

	/**
	 * 获取 起始日期和结束日期中的所有日期
	 * 
	 * @param startDate
	 *            起始日期 2015-05-23
	 * @param endDate
	 *            结束日期 2015-05-25
	 * @return 2015-05-23,2015-05-24,2015-05-25
	 * @Author: wangxingfei
	 * @Date: 2015年5月23日
	 */
	public static List<String> getSpaceDates(String startDate, String endDate) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		long start = string2Date(startDate).getTime();
		long end = string2Date(endDate).getTime();
		List<String> list = new ArrayList<String>();
		while (start <= end) {
			Date time = new Date(start);
			list.add(sdf.format(time));
			start += 1000 * 60 * 60 * 24;// 加一天
		}
		return list;
	}

	/**
	 * date转字符串
	 * 
	 * @param date
	 * @return yyyy-MM-dd
	 * @Author: wangxingfei
	 * @Date: 2015年5月23日
	 */
	public static String date2String(Date date) {
		if (date == null)
			return null;
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		return sdf.format(date);
	}

	/**
	 * date转字符串
	 * 
	 * @param date
	 * @return yyyy-MM-dd
	 * @Author: wangxingfei
	 * @Date: 2015年5月23日
	 */
	public static String date2String(Date date, String pattern) {
		if (date == null)
			return null;
		SimpleDateFormat sdf = new SimpleDateFormat(pattern);
		return sdf.format(date);
	}
	
	public static String getCurrentTime() {
		Date date = new Date();
		DateFormat format = new SimpleDateFormat(OTHER_PATTERN);
		String time = format.format(date);
		return time;
	}

	/**
	 * 字符串转date
	 * 
	 * @param str
	 *            yyyy-MM-dd
	 * @return
	 * @Author: wangxingfei
	 * @Date: 2015年5月23日
	 */
	public static Date string2Date(String str) {
		return string2Date(str, "yyyy-MM-dd");
	}

	/**
	 * 字符串转date
	 * 
	 * @param str
	 *            字符串
	 * @param format
	 *            格式化
	 * @return
	 * @Author: wangxingfei
	 * @Date: 2015年6月26日
	 */
	public static Date string2Date(String str, String format) {
		if (str == null)
			return null;
		SimpleDateFormat sdf = new SimpleDateFormat(format);
		try {
			return sdf.parse(str);
		} catch (ParseException e) {
		}
		return null;
	}

	/**
	 * 获取 当前日期 是周几
	 * 
	 * @param date
	 * @return 周日:1,周一:2
	 * @Author: wangxingfei
	 * @Date: 2015年5月23日
	 */
	public static int getDayOfWeek(Date date) {
		if (date == null)
			return 0;
		Calendar calendar = Calendar.getInstance();
		calendar.setTime(date);
		return calendar.get(Calendar.DAY_OF_WEEK);
	}

	/**
	 * 获取没有时分秒的 当前年月日
	 * 
	 * @return
	 * @Author: wangxingfei
	 * @Date: 2015年5月23日
	 */
	public static Date getZeroTimeDate() {
		return getZeroTimeDate(new Date());
	}

	/**
	 * 将日期转换为 没有时分秒的日期
	 * 
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

	public static boolean isSameDay(Date day1, Date day2) {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		String ds1 = sdf.format(day1);
		String ds2 = sdf.format(day2);
		if (ds1.equals(ds2)) {
			return true;
		} else {
			return false;
		}
	}

	public static String timeLongToString(long secondValue) {
		long day = 0;
		long hour = 0;
		long min = 0;
		long second = 0;
		long temp1 = secondValue % (60 * 60 * 24); // 计算小时
		long temp2 = temp1 % (60 * 60); // 计算分
		long temp3 = temp2 % 60; // 计算秒
		day = secondValue / (60 * 60 * 24);
		hour = temp1 / 60 / 60;
		min = temp2 / 60;
		String backStr = "";
		if (day > 0) {
			backStr = backStr + day + "天";
		}
		if (hour > 0) {
			backStr = backStr + hour + "小时";
		}
		if (day <= 0) {
			if (min > 0) {
				backStr = backStr + min + "分";
			}
			if (StringUtils.isBlank(backStr)) {
				if (temp3 > 0) {
					backStr = backStr + temp3 + "秒";
				}
			}
		}

		if (StringUtils.isBlank(backStr)) {
			backStr = "0秒";
		}
		return backStr;
	}

	public static String intToTime(int time) {
		String num = String.valueOf(time / 60);
		String ss = String.valueOf(time % 60);
		if (num.length() == 1 && ss.length() == 1) {
			return "0" + num + ":0" + ss + '"';
		} else if (num.length() == 1 && ss.length() > 1) {
			return "0" + num + ":" + ss + '"';
		} else if (num.length() > 0 && ss.length() == 1) {
			return num + ":0" + ss + '"';
		} else if (num.length() > 0 && ss.length() > 0) {
			return num + ":" + ss + '"';
		}
		return "00:00";
	}

	public static String intToTime2(int time) {
		if (time <= 0) {
			return "暂无";
		}
		String h = String.valueOf(time / 3600);
		String m = String.valueOf((time % 3600) / 60);
		String s = String.valueOf(time % 60);
		String spendTime = "";
		if (h.length() == 1) {
			spendTime += "0" + h;
		} else {
			spendTime += h;
		}
		if (m.length() == 1) {
			spendTime += ":0" + m;
		} else {
			spendTime += ":" + m;
		}
		if (s.length() == 1) {
			spendTime += ":0" + s;
		} else {
			spendTime += ":" + s;
		}
		return spendTime;
	}

	public static String DateBeaferNow(Date time) {
		long now = System.currentTimeMillis();
		long ago = time.getTime();
		long num = now - ago;
		long day = num / (1000 * 60 * 60 * 24);
		long hour = num / (1000 * 60 * 60);
		long mm = num / (1000 * 60);
		if (day > 0) {
			return day + "天前";
		}
		if (hour > 0) {
			return hour + "小时前";
		}
		if (mm > 0) {
			return mm + "分钟前";
		}
		return "刚刚";
	}

	/**
	 * 判断是不是当天
	 * 
	 * @Methods Name isToaday
	 * @Create In 2017年1月4日 By dangxingfei@xiaoma.cn
	 * @param date
	 * @return boolean
	 */
	public static boolean isToaday(Date date) {
		if (date == null) {
			return false;
		}
		if (getZeroTimeDate().getTime() - getZeroTimeDate(date).getTime() == 0) {
			return true;
		}
		return false;
	}

}
