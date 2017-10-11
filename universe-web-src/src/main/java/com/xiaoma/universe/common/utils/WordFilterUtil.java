package com.xiaoma.universe.common.utils;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

public class WordFilterUtil {
	public static int minMatchTYpe = 1; // 最小匹配规则
	public static int maxMatchType = 2; // 最大匹配规则
	@SuppressWarnings("rawtypes")
	public static HashMap sensitiveWordMap;

	// 添加敏感词

	public Map initKeyWord() {
		try {
			// 读取敏感词库
			Set<String> keyWordSet = readSensitiveWordFile();
			// 将敏感词库加入到HashMap中
			addSensitiveWordToHashMap(keyWordSet);
			// spring获取application，然后application.setAttribute("sensitiveWordMap",sensitiveWordMap);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return sensitiveWordMap;
	}

	/**
	 * 读取敏感词库中的内容，将内容添加到set集合中
	 * 
	 * @Methods Name readSensitiveWordFile
	 * @Create In 2017年1月4日 By dangxingfei@xiaoma.cn
	 * @return
	 * @throws Exception
	 *             Set<String>
	 */
	public static Set<String> readSensitiveWordFile() throws Exception {
		Set<String> set = null;

		InputStream is = WordFilterUtil.class.getResourceAsStream("/SensitiveWord.dict");
		InputStreamReader read = new InputStreamReader(is, "UTF-8");

		try {
			set = new HashSet<String>();
			BufferedReader bufferedReader = new BufferedReader(read);
			String txt = null;
			while ((txt = bufferedReader.readLine()) != null) { // 读取文件，将文件内容放入到set中
				set.add(txt);
			}
		} catch (Exception e) {
			throw new Exception("读取敏感词库文件不存在");
		} finally {
			read.close(); // 关闭文件流
		}
		return set;
	}

	/**
	 * 读取敏感词库，将敏感词放入HashSet中，构建一个DFA算法模型：<br>
	 * 中 = { isEnd = 0 国 = {<br>
	 * isEnd = 1 人 = {isEnd = 0 民 = {isEnd = 1} } 男 = { isEnd = 0 人 = { isEnd =
	 * 1 } } } } 五 = { isEnd = 0 星 = { isEnd = 0 红 = { isEnd = 0 旗 = { isEnd = 1
	 * } } } }
	 * 
	 * @Methods Name addSensitiveWordToHashMap
	 * @Create In 2017年1月4日 By dangxingfei@xiaoma.cn
	 * @param keyWordSet
	 *            void
	 */
	/**
	 * @Methods Name addSensitiveWordToHashMap
	 * @Create In 2017年1月4日 By dangxingfei@xiaoma.cn
	 * @param keyWordSet
	 *            void
	 */
	public static void addSensitiveWordToHashMap(Set<String> keyWordSet) {
		sensitiveWordMap = new HashMap(keyWordSet.size()); // 初始化敏感词容器，减少扩容操作
		String key = null;
		Map nowMap = null;
		Map<String, String> newWorMap = null;
		// 迭代keyWordSet
		Iterator<String> iterator = keyWordSet.iterator();
		while (iterator.hasNext()) {
			key = iterator.next(); // 关键字
			nowMap = sensitiveWordMap;
			for (int i = 0; i < key.length(); i++) {
				char keyChar = key.charAt(i); // 转换成char型
				Object wordMap = nowMap.get(keyChar); // 获取

				if (wordMap != null) { // 如果存在该key，直接赋值
					nowMap = (Map) wordMap;
				} else { // 不存在则，则构建一个map，同时将isEnd设置为0，因为他不是最后一个
					newWorMap = new HashMap<String, String>();
					newWorMap.put("isEnd", "0"); // 不是最后一个
					nowMap.put(keyChar, newWorMap);
					nowMap = newWorMap;
				}

				if (i == key.length() - 1) {
					nowMap.put("isEnd", "1"); // 最后一个
				}
			}
		}
	}

	/**
	 * 检查敏感字符
	 * 
	 * @Methods Name CheckSensitiveWord
	 * @Create In 2017年1月4日 By dangxingfei@xiaoma.cn
	 * @param txt
	 * @param beginIndex
	 * @param matchType
	 * @return int
	 */
	@SuppressWarnings({ "rawtypes" })
	public static int checkSensitiveWord(String txt, int beginIndex, int matchType) {
		boolean flag = false; // 敏感词结束标识位：用于敏感词只有1位的情况
		int matchFlag = 0; // 匹配标识数默认为0
		char word = 0;
		Map nowMap = sensitiveWordMap;
		for (int i = beginIndex; i < txt.length(); i++) {
			word = txt.charAt(i);
			nowMap = (Map) nowMap.get(word); // 获取指定key
			if (nowMap != null) { // 存在，则判断是否为最后一个
				matchFlag++; // 找到相应key，匹配标识+1
				if ("1".equals(nowMap.get("isEnd"))) { // 如果为最后一个匹配规则,结束循环，返回匹配标识数
					flag = true; // 结束标志位为true
					if (minMatchTYpe == matchType) { // 最小规则，直接返回,最大规则还需继续查找
						break;
					}
				}
			} else { // 不存在，直接返回
				break;
			}
		}
		if (matchFlag < 2 || !flag) { // 长度必须大于等于1，为词
			matchFlag = 0;
		}
		return matchFlag;
	}

	/**
	 * 判断文字是否包含敏感字符
	 * 
	 * @Methods Name isContaintSensitiveWord
	 * @Create In 2017年1月4日 By dangxingfei@xiaoma.cn
	 * @param txt
	 * @param matchType
	 *            匹配规则&nbsp;1：最小匹配规则，2：最大匹配规则
	 * @return boolean若包含返回true，否则返回false
	 */
	public static boolean isContaintSensitiveWord(String txt, int matchType) {
		boolean flag = false;
		for (int i = 0; i < txt.length(); i++) {
			int matchFlag = checkSensitiveWord(txt, i, matchType); // 判断是否包含敏感字符
			if (matchFlag > 0) { // 大于0存在，返回true
				flag = true;
			}
		}
		return flag;
	}

	/**
	 * 检查是否有过滤词
	 * 
	 * @Methods Name isContaintSensitiveWord
	 * @Create In 2016年12月27日 By dangxingfei@xiaoma.cn
	 * @param str
	 * @return boolean
	 */
	public static boolean isContaintSensitiveWord(String str) {
		if (StringUtils.isEmpty(str)) {
			return false;
		}
		str = HTMLUtils.html2Txt(str); // 删除html标签以及样式

		if (isContaintSensitiveWord(str, 1)) { // 原文匹配
			return true;
		}
		str = deleteStringMark(str); // 删除多余字符在匹配一次
		return isContaintSensitiveWord(str, 2);
	}

	/**
	 * 删除字符串中的标点符号和符号（比如数学符号、货币符号等）
	 * 
	 * @Methods Name deleteStringMark
	 * @Create In 2017年1月12日 By dangxingfei@xiaoma.cn
	 * @param str
	 *            void
	 */
	public static String deleteStringMark(String str) {
		if (StringUtils.isEmpty(str)) {
			return "";
		}
		str = str.replaceAll("[\\pP\\pS\\pZ\\pN‘’“”]", ""); // 删除字符串中的标点符号和符号（比如数学符号、货币符号等）
		str = str.replaceAll("[a-zA-Z]", ""); // 删除英文字符
		return str;
	}

	/**
	 * 初始化敏感词列表
	 * 
	 * @return
	 */
	static {

		try {
			Set<String> keyWordSet = readSensitiveWordFile();
			// 将敏感词库加入到HashMap中
			addSensitiveWordToHashMap(keyWordSet);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public static void main(String[] args) {
		String str = "+-=$￥￥------~^#$%^&*()_+!@$#$%~`|{}();:\"_thHa这只是个测试句子？！@#1…2…3…4…5￥6#7@8！，。、,./9！0";
		str = str.replaceAll("[\\pP\\pS\\pZ\\pN\\pC‘’“”]", "");
		str = str.replaceAll("[a-zA-Z]", "");
		System.out.println(str);
	}

}
