package com.xiaoma.universe.common.utils;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @Description字符串公共操作类:字符转换 、判断是否为空，编码
 * @author Administrator
 */
public class StringUtils {
	
	public static String notNull(String s) {
		if (s == null)
			return "";
		else
			return s.trim();
	}
	public static String notNull(Integer s) {
		if (s == null)
			return "";
		else
			return String.valueOf(s);
	}
	public static Object notNull(Object s,String n) {
		if (s == null)
			return n;
		else if("".equals(s))
			return n;
		else
			return s;
	}
	public static String notNull(String str, String str1) {
		return (str == null || "".equals(str)) ? str1 : str;
	}
	public static String toString(Object s) {
		if(s==null){return "";}
		try {
			return String.valueOf(s);
		} catch (Exception e) {
			return "";
		}
	}
	public static String formaturl(String url) {
		if (isEmpty(url)) return url;
		return "http://" + url.replaceAll("^/+", "").replaceAll("^http[\\:|/]*", "");
	}
	
	/** 转换成整�??	 */
	public static int parseInt(String s,int i){
		try{
			return Integer.parseInt(s);
		}catch(Exception ex){return i;}
	}
	/** 转换成整�??	 */
	public static byte parseByte(String s,byte i){
		try{
			return Byte.parseByte(s);
		}catch(Exception ex){return i;}
	}
	/** 转换成Long	 */
	public static long parseLong(String s,int i){
		try{
			if(isEmpty(s)){
				return i;
			}
			return Long.parseLong(s);
		}catch(Exception ex){return i;}
	}
	public static int isNull(int i,int s){
		try {
			s = i;
		} catch (Exception e) {
		}
		return s;
	}
	//判断对象是否为null
	public static boolean isNull(Object obj){
		if(obj==null){
			return true;
		}else{
			return false;
		}
	}
	//判断对象是否为null
	public static boolean isNull(String s){
		if(s==null || s.trim().equals("")){
			return true;
		}else{
			return false;
		}
	}
	/** java unescape编码	 */
	public static String unescape(String src) {
		try {
			StringBuffer tmp = new StringBuffer();
			tmp.ensureCapacity(src.length());
			int lastPos = 0, pos = 0;
			char ch;
			while (lastPos < src.length()) {
				pos = src.indexOf("%", lastPos);
				if (pos == lastPos) {
					if (src.charAt(pos + 1) == 'u') {
						ch = (char) Integer.parseInt(src.substring(pos + 2, pos + 6), 16);
						tmp.append(ch);
						lastPos = pos + 6;
					} else {
						ch = (char) Integer.parseInt(src.substring(pos + 1, pos + 3), 16);
						tmp.append(ch);
						lastPos = pos + 3;
					}
				} else {
					if (pos == -1) {
						tmp.append(src.substring(lastPos));
						lastPos = src.length();
					} else {
						tmp.append(src.substring(lastPos, pos));
						lastPos = pos;
					}
				}
			}
			return tmp.toString();
		} catch (Exception e) {
			return null;
		}
	}
	/** java escape编码	 */
	public static String escape(String src) {
		int i;
		char j;
		StringBuffer tmp = new StringBuffer();
		tmp.ensureCapacity(src.length() * 6);
		for (i = 0; i < src.length(); i++) {
			j = src.charAt(i);
			if (Character.isDigit(j) || Character.isLowerCase(j) || Character.isUpperCase(j))
				tmp.append(j);
			else if (j < 256) {
				tmp.append("%");
				if (j < 16)
					tmp.append("0");
				tmp.append(Integer.toString(j, 16));
			} else {
				tmp.append("%u");
				tmp.append(Integer.toString(j, 16));
			}
		}
		return tmp.toString();
	}
	public static String gb2iso(String s) {
		if (s == null)
			return "";
		try {
			return new String(s.getBytes("GBK"), "ISO-8859-1").trim();
		} catch (Exception e) {
			return s;
		}
	}

	public static String iso2utf8(String s) {
		if (s == null)
			return "";
		try {
			return new String(s.getBytes("ISO-8859-1"), "UTF-8").trim();
		} catch (Exception e) {
			return s;
		}
	}

	public static String utf82iso(String s) {
		if (s == null)
			return "";
		try {
			return new String(s.getBytes("UTF-8"), "ISO-8859-1").trim();
		} catch (Exception e) {
			return s;
		}
	}
	
	public static String iso2gb(String s) {
		if (s == null)
			return "";
		try {
			return new String(s.getBytes("ISO-8859-1"), "GBK").trim();
		} catch (Exception e) {
			return s;
		}
	}

	public static String gb2utf8(String s) {
		if (s == null)
			return "";
		try {
			return new String(s.getBytes("GBK"), "utf-8").trim();
		} catch (Exception e) {
			return s;
		}
	}
	public static String trim(String a){
		if(a  == null){
			return null;
		}
		try {
			return a.trim();
		} catch (Exception e) {
			return "";
		}
	}
	
	/**
	 * 判断�??个字符串是否为空
	 */
	public static boolean isEmpty(String s) {
		return (s == null || s.trim().equals("")) ? true : false;
	}
	public static String cdata(String s) {
		if (s == null)
			return "";
		if(notNull(s).equals(""))
			return s;
		try {
			return "<![CDATA[" + s + "]]>";
		} catch (Exception e) {
			return s;
		}
	}
	
	/**
	 * 用户字符过长，显示一部分
	 * @param s
	 * @param len
	 * @param f
	 * @return
	 */
	public static String cut(String s ,int len,String f){
		if(isEmpty(s)){
			return s;
		}
		if(s.length()<len){
			return s;
		}
		return s.substring(0,len)+f;
	}
	public static String cutReplaceHTML(String s ,int len,String f){
		if(isEmpty(s)){
			return s;
		}
		s = replaceHtml(s);
		if(s.length()<len){
			return s;
		}
		return s.substring(0,len)+f;
	}
	public static String replaceHtml(String html){ 
        try {
        	String regEx="<.+?>"; //表示标签 
            Pattern p=Pattern.compile(regEx); 
            Matcher m=p.matcher(html); 
            String s=m.replaceAll(""); 
            return s; 
		} catch (Exception e) {
			return html;
		}
    } 
	public static String cdata(Long s) {
		if (s == null)
			return "";
		try {
			return "<![CDATA[" + s + "]]>";
		} catch (Exception e) {
			return String.valueOf(s);
		}
	}
	/**
	 * 格式化字�??
	 * 
	 * @param str
	 * @param args
	 * @return String
	 */
	public static String format(String str, Object... args) {
		String result = str;
		java.util.regex.Pattern p = java.util.regex.Pattern.compile("\\{(\\d+)\\}");
		java.util.regex.Matcher m = p.matcher(str);
		while ( m.find() ) {
			int index = Integer.parseInt(m.group(1));
			if (index < args.length) {
				result = result.replace(m.group(), StringUtils.notNull(args[index], "").toString());
			}
		}
		return result;
	}
	public static String urlEncode(String url){
		if(url == null){
			return "";
		}
		try {
			return URLEncoder.encode(url,"utf-8");
		} catch (Exception e) {
			return url;
		}
	}
	public static String urlDecode(String url){
		if(url == null){
			return "";
		}
		try {
			return URLDecoder.decode(url, "utf-8");
		} catch (Exception e) {
			return url;
		}
	}
	/**
	 * 功能：编�??
	 * @param str
	 * @param enc
	 * @return
	 */
	public static String encode(String str,String enc){
		try {
			return URLEncoder.encode(str,enc);
		} catch (UnsupportedEncodingException e) {
			System.err.println(e);
			return "error_bianma";
		}
	}
	
	public static boolean equals(String a,String b){
		try {
			return a.trim().equals(b.trim());
		} catch (Exception e) {
			return false;
		}
	}
	
	public static String[] list2String(List<String> list){
		if(list==null || list.isEmpty()){
			return new String[]{};
		}else{
			String[] arr = new String[list.size()];
			for(int i =0;i<list.size();i++){
				arr[i] = list.get(i);
			}
			return arr;
		}
	}
	
	public static boolean startWith(String s ,String pre){
		try {
			return s.startsWith(pre);
		} catch (Exception e) {
		}
		return false;
	}
	public static boolean endtWith(String s ,String suffix){
		try {
			return s.endsWith(suffix);
		} catch (Exception e) {
		}
		return false;
	}
	public static String replace(String s,String oldChar,String newChar){
		try {
			return s.replace(oldChar, newChar);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return s;
	}
	
	/**
	 * 剪切文本。如果进行了剪切，则在文本后加上"..."
	 * 
	 * @param s
	 *            剪切对象�??
	 * @param len
	 *            编码小于256的作为一个字符，大于256的作为两个字符�??
	 * @return
	 */
	public static String textCut(String s, int len, String append) {
		if (s == null) {
			return null;
		}
		int slen = s.length();
		if (slen <= len) {
			return s;
		}
		// �??大计数（如果全是英文�??
		int maxCount = len * 2;
		int count = 0;
		int i = 0;
		for (; count < maxCount && i < slen; i++) {
			if (s.codePointAt(i) < 256) {
				count++;
			} else {
				count += 2;
			}
		}
		if (i < slen) {
			if (count > maxCount) {
				i--;
			}
			if (!isEmpty(append)) {
				if (s.codePointAt(i - 1) < 256) {
					i -= 2;
				} else {
					i--;
				}
				return s.substring(0, i) + append;
			} else {
				return s.substring(0, i);
			}
		} else {
			return s;
		}
	}
	
	/**将字符串逗号分隔转换成整形list*/
	public static List<Integer> getIntegerList(String ss){
		List<Integer> list = new ArrayList<Integer>();
		try {
			ss = notNull(ss);
			String[] arr = ss.split(",");
			if(arr!=null && arr.length>0){
				for(String s : arr){
					int in = parseInt(s, -1);
					if(in>0){
						list.add(in);
					}
				}
			}
		} catch (Exception e) {}
		return list;
	}
	
	 /** 
     * 将字节数组转换为十六进制字符�?? 
     *  
     * @param byteArray 
     * @return 
     */  
	public static String byteToStr(byte[] byteArray) {  
        String strDigest = "";  
        for (int i = 0; i < byteArray.length; i++) {  
            strDigest += byteToHexStr(byteArray[i]);  
        }  
        return strDigest;  
    }  
    
    /** 
     * 将字节转换为十六进制字符�?? 
     *  
     * @param mByte 
     * @return 
     */  
	public static String byteToHexStr(byte mByte) {  
        char[] Digit = { '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F' };  
        char[] tempArr = new char[2];  
        tempArr[0] = Digit[(mByte >>> 4) & 0X0F];  
        tempArr[1] = Digit[mByte & 0X0F];  
  
        String s = new String(tempArr);  
        return s;  
    }  
	
	public static boolean isMobileNO(String mobiles) {
		Pattern p = Pattern.compile("^((13[0-9])|(15[^4,\\D])|(18[0-9]))\\d{8}$");
		Matcher m = p.matcher(mobiles);
		return m.matches();
	}
	
	public static void main(String[] args) {
		String s ="http://kaoshi.chaoxing.com/curriculum/exercises_231.html";
		String oldChar ="chaoxing.com";
		String newChar = "test.xuexi365.net";
		System.out.println(replace(s, oldChar, newChar));
	}
}

