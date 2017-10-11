package com.xiaoma.universe.common.utils.upyun;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.Map;
 


import com.alibaba.fastjson.JSONObject;

import com.xiaoma.universe.common.api.JsonUtil;
import com.xiaoma.universe.common.utils.PropertiesUtils;

public class UpYunUtils {

	/**
	 * 计算policy
	 *
	 * @param paramMap
	 * @return
	 */
	public static String getPolicy(Map<String, Object> paramMap) {
		String jsonStr;
		try {
			jsonStr = JsonUtil.beanToJson(paramMap); 
			return Base64Coder.encodeString(jsonStr);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		return null;
	}

	/**
	 * 计算签名
	 *
	 * @param policy
	 * @param secretKey
	 * @return
	 */
	public static String getSignature(String policy, String secretKey) {
		return md5(policy + "&" + secretKey);
	}

	/**
	 * 计算md5Ø
	 *
	 * @param string
	 * @return
	 */
	public static String md5(String string) {
		byte[] hash;
		try {
			hash = MessageDigest.getInstance("MD5").digest(string.getBytes("UTF-8"));
		} catch (UnsupportedEncodingException e) {
			throw new RuntimeException("UTF-8 is unsupported", e);
		} catch (NoSuchAlgorithmException e) {
			throw new RuntimeException("MessageDigest不支持MD5Util", e);
		}
		StringBuilder hex = new StringBuilder(hash.length * 2);
		for (byte b : hash) {
			if ((b & 0xFF) < 0x10)
				hex.append("0");
			hex.append(Integer.toHexString(b & 0xFF));
		}
		return hex.toString();
	}
	
	/**
	 * 计算防盗链签名
	 */
	
	public static String upt(String url){
		String token=PropertiesUtils.getString("download_token");
		String upyun=PropertiesUtils.getString("upyun_path");
		String uri = url.replace(upyun, "");
		long etime=System.currentTimeMillis()/1000+1200;
		String md5sign=token+"&"+etime+"&"+uri;
		String sign = md5(md5sign);
		String upt = sign.substring(12, 20)+etime;
		return upt;
	}
	
	public static void main(String[] args) {
		String url ="http://yztfadminstudents.b0.upaiyun.com/information/2016/08/22/1.doc";
		String upt = upt(url);
		System.out.println(upt);
	}
}
