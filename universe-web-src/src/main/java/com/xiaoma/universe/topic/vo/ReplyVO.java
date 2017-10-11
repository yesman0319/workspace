package com.xiaoma.universe.topic.vo;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.xiaoma.universe.common.utils.TimeUtil;

/**
 * 回帖的vo（若字段中有值是null,则字段不返回）
 * 
 * @Class Name ReplyVO
 * @Author dangxingfei@xiaoma.cn
 * @Create In 2016年12月21日
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ReplyVO {
	private Integer replyId; // 回帖主键
	private Integer topicId;// 帖子的id
	private Integer floor;// 楼层
	private String content;// 评论内容
	private List<String> images; // 图片的集合
	private String device;// 设备
	private java.util.Date createTime;// 评论时间
	private String createTimeStr; // 创建时间的字符串格式
	private Integer del; // 删除

	private String nickName; // 回复人昵称
	private String avatar; // 头像
	private Boolean canDelete; // 是否能删除

	private String audioUrl; // 音频
	private Integer duration; // 音频时长
	private String durationStr; // 音频的字符串

	@JsonIgnore
	private Integer userId;// 回复人的id
	@JsonIgnore
	private String image;
	@JsonIgnore
	private Integer pid;// 被回复的帖子的id
	@JsonIgnore
	private Integer toUid;// 被回复人的id
	@JsonIgnore
	private Integer toNickName;// 被回复人昵称
	@JsonIgnore
	private Integer toAvatar;// 被回复人头像
	@JsonIgnore
	private Integer type; // 回帖类型（1: 主题帖，2 : 回复贴）

	public Integer getTopicId() {
		return topicId;
	}

	public void setTopicId(Integer topicId) {
		this.topicId = topicId;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public Integer getPid() {
		return pid;
	}

	public void setPid(Integer pid) {
		this.pid = pid;
	}

	public Integer getToUid() {
		return toUid;
	}

	public void setToUid(Integer toUid) {
		this.toUid = toUid;
	}

	public Integer getToNickName() {
		return toNickName;
	}

	public void setToNickName(Integer toNickName) {
		this.toNickName = toNickName;
	}

	public Integer getToAvatar() {
		return toAvatar;
	}

	public void setToAvatar(Integer toAvatar) {
		this.toAvatar = toAvatar;
	}

	public Integer getFloor() {
		return floor;
	}

	public void setFloor(Integer floor) {
		this.floor = floor;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getDevice() {
		return device;
	}

	public void setDevice(String device) {
		this.device = device;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public java.util.Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(java.util.Date createTime) {
		this.createTime = createTime;
	}

	public Boolean getCanDelete() {
		return canDelete;
	}

	public void setCanDelete(Boolean canDelete) {
		this.canDelete = canDelete;
	}

	public Integer getReplyId() {
		return replyId;
	}

	public void setReplyId(Integer replyId) {
		this.replyId = replyId;
	}

	public List<String> getImages() {
		return images;
	}

	public void setImages(List<String> images) {
		this.images = images;
	}

	public String getAudioUrl() {
		return audioUrl;
	}

	public void setAudioUrl(String audioUrl) {
		this.audioUrl = audioUrl;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getCreateTimeStr() {
		Date now = new Date();
		Date date = this.createTime;

		if (TimeUtil.date2String(date, "yyyy").equals(TimeUtil.date2String(now, "yyyy"))) {
			return TimeUtil.date2String(date, "HH:mm");
		} else {
			return TimeUtil.date2String(date, "MM-dd");
		}
	}

	public void setCreateTimeStr(String createTimeStr) {
		this.createTimeStr = createTimeStr;
	}

	public Integer getDel() {
		return (this.canDelete != null && canDelete.booleanValue()) ? 1 : 0;
	}

	public void setDel(Integer del) {
		this.del = del;
	}

	public Integer getDuration() {
		return duration;
	}

	public void setDuration(Integer duration) {
		this.duration = duration;
	}

	public String getDurationStr() {
		if (duration == null || duration <= 0) {
			return "";
		}
		int m = duration / 60;
		if (m <= 0) {
			return duration >= 10 ? "00:" + duration + "\"" : "00:0" + duration + "\"";
		}
		int s = duration % 60;
		return (m >= 10 ? m + "" : "0" + m) + ":" + (s >= 10 ? s + "\"" : "0" + s + "\"");
	}

	public void setDurationStr(String durationStr) {
		this.durationStr = durationStr;
	}
}
