/**
 * 
 */
package com.xiaoma.universe.learnplan.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.apache.commons.lang.StringUtils;
 
import com.xiaoma.universe.userlogin.controller.UserVO;

/**
 * @author xiaoma
 *
 */
public class UserUtil {
	public static String getUserNickName(UserVO user){
		if(user==null)
			return "";
		String nickName = user.getNickname();
		if(!StringUtils.isBlank(nickName)){ 
			//return nickName;
		}  
		else if(StringUtils.isBlank(nickName)){  
			nickName = user.getPhone();
		} 
		else if(StringUtils.isBlank(nickName)) { 
			nickName = user.getEmail();
		}
		else if(StringUtils.isBlank(nickName)){ 
			nickName = user.getUsername();
		} 
		
		if(isMobileNO(nickName)){ 
			nickName = hideMobiles(nickName);
		}
		
		if(isEmail(nickName)){ 
			nickName = hideEmail(nickName);
		}
		
		return nickName;
	}

	public static String hideMobiles(String mobiles){
		if(mobiles==null)
			return null;
		return mobiles.replaceAll("(\\d{3})\\d{4}(\\d{4})","$1****$2"); 
	}
	
	public static String hideEmail(String email){
		if(email==null)
			return null;
		String[] names = email.split("@");
		int len = names[0].length();
		String regex = "";
		if(len>4 && names.length==2){ 
			return "****" + names[0].substring(4, names[0].length())+"@" + names[1];
		}else{ 
			return "****"+email; 
		}
	}
	
	public static boolean isEmail(String email){     
		String str="^([a-zA-Z0-9]*[-_]?[a-zA-Z0-9]+)*@([a-zA-Z0-9]*[-_]?[a-zA-Z0-9]+)+[\\.][A-Za-z]{2,3}([\\.][A-Za-z]{2})?$";
		Pattern p = Pattern.compile(str);     
		Matcher m = p.matcher(email);     
		return m.matches();     
	} 

	public static boolean isMobileNO(String mobiles) {
		Pattern p = Pattern.compile("^((13[0-9])|(15[^4,\\D])|(18[0-9]))\\d{8}$");
		Matcher m = p.matcher(mobiles);
		return m.matches();
		}
	
//	public static void main(String[] args) {
//		
//		
//		
//		UserInfo user  = new UserInfo();
//		
//		user.setNickname("sfssfsdf@aaaa.com");
//		System.out.println(getUserNickName(user));
//		
//		user.setNickname("1@aaaa.com");
//		System.out.println(getUserNickName(user));
//		
//		user.setNickname("13691092732");
//		System.out.println(getUserNickName(user));
//	}
	
}
