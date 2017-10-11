package com.xiaoma.universe.common.utils.upyun;

import java.text.SimpleDateFormat;
import java.util.Date;

import com.xiaoma.universe.common.utils.Base64Util;


public class UpyunSign {

	public static String timestamp = create_timestamp();
	public static String bucket = "universe1";

	private static String create_timestamp() {
		return Long.toString(System.currentTimeMillis() / 1000 + 1800);
	}

	// 将 s 进行 BASE64 编码
	public static String getBASE64(String s) {
		if (s == null)
			return null;
		return Base64Util.encode(s);
	}

	// 将 BASE64 编码的字符串 s 进行解码
	public static String getFromBASE64(String s) {
		if (s == null)
			return null;
		return Base64Util.decode(s);
	}

	public static String getPath() {
		try {
			String msg = "";
			Date date = new Date();
			SimpleDateFormat sdf = new SimpleDateFormat("/YYYY/MM/dd/");
			msg += sdf.format(date);
			System.out.println(msg.toString());
			return msg;
		} catch (Exception e) {
			return null;
		}

	}
}
