package com.xiaoma.universe.common.utils;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.xiaoma.universe.common.contant.Contant;

/**
 * 从cookie中获取token
 * @author zhaijilong
 */
public class GetTokenFromCooklie {  
	
	
	/**
     * 根据名字先获取cookie,再获取token值
     * @param request
     * @param name cookie名字
     * @return
     */
    public static String getCookieByName(HttpServletRequest request,String cookieName){
        Map<String,Cookie> cookieMap = ReadCookieMap(request);
        //String name = "TOEFL_TOKEN";
        if(cookieMap.containsKey(cookieName)){
            Cookie cookie = (Cookie)cookieMap.get(cookieName);
            return cookie.getValue();
        }else{
            return null;
        }   
    }
      
    /**
     * 将cookie封装到Map里面
     * @param request
     * @return
     */
    private static Map<String,Cookie> ReadCookieMap(HttpServletRequest request){  
        Map<String,Cookie> cookieMap = new HashMap<String,Cookie>();
        Cookie[] cookies = request.getCookies();
        if(null!=cookies){
            for(Cookie cookie : cookies){
            	//System.out.println("cookieName = "+cookie.getName()+"; cookieValue = "+cookie.getValue());
                cookieMap.put(cookie.getName(), cookie);
            }
        }
        return cookieMap;
    }    
  
    public static void setCookie(HttpServletResponse response, String name, String value) {
        if(value == null){
        	value = "";	
        }            
        Cookie cookie = new Cookie(name, value);
        cookie.setDomain(Contant.DOMAIN_NAME);
        cookie.setPath("/");
        cookie.setMaxAge(60 * 60 * 24);
        response.addCookie(cookie);
    }
    
    public static void setCookie(HttpServletResponse response, String name, String value, int expiry) {
        if(value == null){
        	value = "";	
        }            
        Cookie cookie = new Cookie(name, value);
        cookie.setDomain(Contant.DOMAIN_NAME);
        cookie.setPath("/");
        if(expiry!=-1)
        cookie.setMaxAge(60 * 60 * 24);
        response.addCookie(cookie);
    }
    
}
