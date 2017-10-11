package com.xiaoma.universe.common.utils;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class HTMLUtils {

	private static final String regEx_script = "<script[^>]*?>[\\s\\S]*?<\\/script>"; // 定义script的正则表达式
	private static final String regEx_style = "<style[^>]*?>[\\s\\S]*?<\\/style>"; // 定义style的正则表达式
	private static final String regEx_html = "<[^>]+>"; // 定义HTML标签的正则表达式
	private static final String regEx_html_contain_img = "<(?!img)[^>]*>"; // 定义HTML标签的正则表达式
	private static final String regEx_html_contain_img_br = "</?(?!img|/?br)[^>]+>"; // 保留img和br标签

	/**
	 * html获取文本
	 * 
	 * @Methods Name html2Txt
	 * @Create In 2016年12月23日 By dangxingfei@xiaoma.cn
	 * @param htmlStr
	 * @return String
	 */
	public static String html2Txt(String htmlStr) {
		if (StringUtils.isEmpty(htmlStr)) {
			return "";
		}

		Pattern p_script = Pattern.compile(regEx_script, Pattern.CASE_INSENSITIVE);
		Matcher m_script = p_script.matcher(htmlStr);
		htmlStr = m_script.replaceAll(""); // 过滤script标签

		Pattern p_style = Pattern.compile(regEx_style, Pattern.CASE_INSENSITIVE);
		Matcher m_style = p_style.matcher(htmlStr);
		htmlStr = m_style.replaceAll(""); // 过滤style标签

		Pattern p_html = Pattern.compile(regEx_html, Pattern.CASE_INSENSITIVE);
		Matcher m_html = p_html.matcher(htmlStr);
		htmlStr = m_html.replaceAll(""); // 过滤html标签

		return htmlStr.trim(); // 返回文本字符串
	}

	/**
	 * 清理html文本，删除scritp 以及style
	 * 
	 * @Methods Name clearHtml
	 * @Create In 2016年12月28日 By dangxingfei@xiaoma.cn
	 * @param htmlStr
	 * @return String
	 */
	public static String clearHtml(String htmlStr) {
		if (StringUtils.isEmpty(htmlStr)) {
			return "";
		}

		Pattern p_script = Pattern.compile(regEx_script, Pattern.CASE_INSENSITIVE);
		Matcher m_script = p_script.matcher(htmlStr);
		htmlStr = m_script.replaceAll(""); // 过滤script标签

		Pattern p_style = Pattern.compile(regEx_style, Pattern.CASE_INSENSITIVE);
		Matcher m_style = p_style.matcher(htmlStr);
		htmlStr = m_style.replaceAll(""); // 过滤style标签

		return htmlStr.trim(); // 返回文本字符串
	}

	/**
	 * 从html中获取图片地址集合
	 * 
	 * @Methods Name getImagesFromHTML
	 * @Create In 2016年12月23日 By dangxingfei@xiaoma.cn
	 * @param htmlStr
	 * @return List<String>
	 */
	public static List<String> getImagesFromHTML(String htmlStr) {
		if (StringUtils.isEmpty(htmlStr)) {
			return new ArrayList<String>();
		}
		List<String> imageSrcList = new ArrayList<String>();
		Pattern p = Pattern.compile(
				"<img\\b[^>]*\\bsrc\\b\\s*=\\s*('|\")?([^'\"\n\r\f>]+(\\.jpg|\\.bmp|\\.eps|\\.gif|\\.mif|\\.miff|\\.png|\\.tif|\\.tiff|\\.svg|\\.wmf|\\.jpe|\\.jpeg|\\.dib|\\.ico|\\.tga|\\.cut|\\.pic)\\b)[^>]*>",
				Pattern.CASE_INSENSITIVE);
		Matcher m = p.matcher(htmlStr);
		String quote = null;
		String src = null;
		while (m.find()) {
			quote = m.group(1);
			// src=https://sms.reyo.cn:443/temp/screenshot/zY9Ur-KcyY6-2fVB1-1FSH4.png
			src = (quote == null || quote.trim().length() == 0) ? m.group(2).split("\\s+")[0] : m.group(2);
			imageSrcList.add(src);
		}
		return imageSrcList;
	}

	// s#<[/]*?(?!a|img|br|/a|table|/table|tr|/tr|td|/td)[^<>]*?>#abc#gmi
	/**
	 * 只保留文本和img标签
	 * 
	 * @Methods Name html2TxtContainImg
	 * @Create In 2017年1月3日 By dangxingfei@xiaoma.cn
	 * @param htmlStr
	 * @return String
	 */
	public static String html2TxtContainImg(String htmlStr) {
		if (StringUtils.isEmpty(htmlStr)) {
			return "";
		}

		Pattern p_script = Pattern.compile(regEx_script, Pattern.CASE_INSENSITIVE);
		Matcher m_script = p_script.matcher(htmlStr);
		htmlStr = m_script.replaceAll(""); // 过滤script标签

		Pattern p_style = Pattern.compile(regEx_style, Pattern.CASE_INSENSITIVE);
		Matcher m_style = p_style.matcher(htmlStr);
		htmlStr = m_style.replaceAll(""); // 过滤style标签

		// Pattern p_html = Pattern.compile(regEx_html_contain_img,
		// Pattern.CASE_INSENSITIVE);
		Pattern p_html = Pattern.compile(regEx_html_contain_img_br, Pattern.CASE_INSENSITIVE);
		Matcher m_html = p_html.matcher(htmlStr);
		htmlStr = m_html.replaceAll(""); // 过滤html标签

		return htmlStr.trim(); // 返回文本字符串
	}

	/**
	 * 包含文本和换行符以及图片
	 * 
	 * @Methods Name html2TxtContainImgAndBr
	 * @Create In 2017年1月3日 By dangxingfei@xiaoma.cn
	 * @param htmlStr
	 * @return String
	 */
	public static String html2TxtContainImgAndBr(String htmlStr) {
		if (StringUtils.isEmpty(htmlStr)) {
			return "";
		}

		Pattern p_script = Pattern.compile(regEx_script, Pattern.CASE_INSENSITIVE);
		Matcher m_script = p_script.matcher(htmlStr);
		htmlStr = m_script.replaceAll(""); // 过滤script标签

		Pattern p_style = Pattern.compile(regEx_style, Pattern.CASE_INSENSITIVE);
		Matcher m_style = p_style.matcher(htmlStr);
		htmlStr = m_style.replaceAll(""); // 过滤style标签

		Pattern p_html = Pattern.compile(regEx_html_contain_img_br, Pattern.CASE_INSENSITIVE);
		Matcher m_html = p_html.matcher(htmlStr);
		htmlStr = m_html.replaceAll(""); // 过滤html标签

		return htmlStr.trim(); // 返回文本字符串
	}

}
