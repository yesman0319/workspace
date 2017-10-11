package com.xiaoma.universe.common.utils.upyun;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.xiaoma.universe.common.utils.StringUtils;

public class UploadImgUtil {
	private static final Logger LOG = LoggerFactory.getLogger(UploadImgUtil.class);
	private static final String BUCKET_NAME = "universestatic";
	private static final String OPERATOR_NAME = "universestatic";
	private static final String OPERATOR_PWD = "universestatic";
	private static final String URL = "http://" + BUCKET_NAME + ".b0.upaiyun.com";
	private static final String DIR_ROOT = "/avater/";

	public static String uploadImg(byte[] image, String imageName) throws IOException {
		UpYun upyun = new UpYun(BUCKET_NAME, OPERATOR_NAME, OPERATOR_PWD);
		upyun.setDebug(false);
		// 要传到upyun后的文件路径
		String filePath = DIR_ROOT + imageName;
		boolean result = upyun.writeFile(filePath, image, true);
		String url = null;
		if (result) {
			LOG.info("upload image successful");
			url = URL + filePath;
		}
		return url;
	}

	/**
	 * 自定义上传图片路径
	 * 
	 * @Methods Name uploadImgWithPath
	 * @Create In 2016年12月30日 By dangxingfei@xiaoma.cn
	 * @param image
	 * @param uploadPath
	 * @param imageName
	 * @return
	 * @throws IOException
	 *             String
	 */
	public static String uploadImgWithPath(byte[] image, String uploadPath, String imageName) throws IOException {
		UpYun upyun = new UpYun(BUCKET_NAME, OPERATOR_NAME, OPERATOR_PWD);
		upyun.setDebug(false);
		// 要传到upyun后的文件路径
		String filePath = (StringUtils.isEmpty(uploadPath) ? "/img/" : uploadPath) + imageName;
		boolean result = upyun.writeFile(filePath, image, true);
		String url = null;
		if (result) {
			LOG.info("upload image successful");
			url = URL + filePath;
		}
		return url;
	}

}
