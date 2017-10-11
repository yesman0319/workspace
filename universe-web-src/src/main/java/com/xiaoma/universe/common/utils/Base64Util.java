/**
 * 
 */
package com.xiaoma.universe.common.utils;

import org.apache.commons.codec.binary.Base64;
import org.apache.commons.lang.StringUtils;

/**
 * @author xiaoma
 *
 */
public class Base64Util {
	/**
     * @param bytes
     * @return
     */
    public static String decode(String value) { 
    	if(StringUtils.isEmpty(value)){
    		return "";
    	}
    	return new String(Base64.decodeBase64(value.getBytes()));
       
    }

    /**
     * 二进制数据编码为BASE64字符串
     *
     * @param bytes
     * @return
     * @throws Exception
     */
    public static String encode(String value) {
    	if(StringUtils.isEmpty(value)){
    		return "";
    	}
        return new String(Base64.encodeBase64(value.getBytes()));
    }
    
    /**
     * 二进制数据编码为BASE64字符串
     *
     * @param bytes
     * @return
     * @throws Exception
     */
    public static String encode(byte[] value) { 
        return new String(Base64.encodeBase64(value));
    }
    
    public static byte[] decodeString(String value) { 
    	if(StringUtils.isEmpty(value)){
    		return null ;
    	}
    	return Base64.decodeBase64(value);
       
    }

}
