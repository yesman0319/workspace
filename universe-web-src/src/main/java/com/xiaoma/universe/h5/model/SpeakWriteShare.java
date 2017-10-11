package com.xiaoma.universe.h5.model;

import com.xiaoma.universe.common.utils.TimeUtil;

/**
 * 分享的时候的--机经口语 2 机经写作 3 独立口语 4独立写作
 * 
 * @author Administrator
 */
public class SpeakWriteShare {
	private String question; // 问题
	private String audio_length; // 音频时长 number
	private String avatar; // 头像 string
	private String content; // url或内容 string
	private String is_praise; // 是否点赞 number 0否，1点赞
	private String nickname; // 昵称 string
	private String praise_amount; // 点赞数量 number
	private String question_id; // number
	private String share_id; // number
	private String user_id; // 用户id
	private Long create_date; // 分享的时间
	private String timeStr; // 页面展示用
	private Integer commentCount; // 点评数量
	private Integer answerId; // 答案id
	private Integer spendTime; // 练习时长
	private Integer wordCount; // 个数
	private String spendTime2;// 练习时长字符形式，页面展示用

	public String getAudio_length() {
		return audio_length;
	}

	public void setAudio_length(String audio_length) {
		this.audio_length = audio_length;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getIs_praise() {
		return is_praise;
	}

	public void setIs_praise(String is_praise) {
		this.is_praise = is_praise;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public String getPraise_amount() {
		return praise_amount;
	}

	public void setPraise_amount(String praise_amount) {
		this.praise_amount = praise_amount;
	}

	public String getQuestion_id() {
		return question_id;
	}

	public void setQuestion_id(String question_id) {
		this.question_id = question_id;
	}

	public String getShare_id() {
		return share_id;
	}

	public void setShare_id(String share_id) {
		this.share_id = share_id;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getQuestion() {
		return question;
	}

	public void setQuestion(String question) {
		this.question = question;
	}

	public Long getCreate_date() {
		return create_date;
	}

	public void setCreate_date(Long create_date) {
		this.create_date = create_date;
	}

	/**
	 * 格式化时间值
	 * 
	 * @Methods Name getTimeStr
	 * @Create In 2016年10月14日 By dangxingfei@xiaoma.cn
	 * @return String
	 */
	public String getTimeStr() {
		if (null == this.create_date) {
			return "1分钟前";
		}

		long l = System.currentTimeMillis() - this.create_date;
		long day = l / (24 * 60 * 60 * 1000);

		if (day > 0) {
			if (day == 1) {
				return "昨天";
			} else {
				return day + "天前";
			}
		}
		long hour = (l / (60 * 60 * 1000) - day * 24);
		if (hour > 0) {
			return hour + "小时前";
		}
		long min = ((l / (60 * 1000)) - day * 24 * 60 - hour * 60);

		if (min > 0) {
			return min + "分钟前";
		}
		long s = (l / 1000 - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60);

		if (s > 0) {
			return s + "秒前";
		}
		return "1分钟前";
	}

	public void setTimeStr(String timeStr) {
		this.timeStr = timeStr;
	}

	public Integer getCommentCount() {
		return commentCount;
	}

	public void setCommentCount(Integer commentCount) {
		this.commentCount = commentCount;
	}

	public Integer getAnswerId() {
		return answerId;
	}

	public void setAnswerId(Integer answerId) {
		this.answerId = answerId;
	}

	public Integer getSpendTime() {
		return spendTime;
	}

	public void setSpendTime(Integer spendTime) {
		this.spendTime = spendTime;
	}

	public Integer getWordCount() {
		return wordCount;
	}

	public void setWordCount(Integer wordCount) {
		this.wordCount = wordCount;
	}

	public void setSpendTime2(String spendTime2) {
		this.spendTime2 = spendTime2;
	}

	/**
	 * 获取练习时间的字符串形式
	 * 
	 * @Methods Name getSpendTimeStr
	 * @Create In 2016年12月2日 By dangxingfei@xiaoma.cn
	 * @return String
	 */
	public String getSpendTime2() {
		if (this.spendTime == null || this.spendTime <= 0) {
			return "暂无";
		}
		return TimeUtil.intToTime2(this.spendTime);
	}

}
