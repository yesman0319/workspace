package com.xiaoma.universe.topic.vo;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.xiaoma.universe.common.utils.TimeUtil;

/**
 * 主题帖的vo类
 * 
 * @Class Name TopicVO
 * @Author dangxingfei@xiaoma.cn
 * @Create In 2016年12月20日
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TopicDetailVO {
	private Integer topicId; // 帖子id
	private Integer nodeId;// 板块id
	private String title;// 帖子的标题
	private String content; // 帖子内容
	private List<String> images; // 帖子图片
	private String audioUrl; // 音频地址
	private Integer duration; // 音频时长
	private Integer floor; // 楼层
	private Date createTime; // 创建时间
	private String createTimeStr; // 创建时间的字符串格式
	private String nickName; // 发帖人的昵称
	private String avatar; // 头像
	private Boolean canDelete; // 是否能删除
	private Integer replyCount; // 回帖数量
	private Integer del; // 能否删除
	private String durationStr; // 音频的字符串

	@JsonIgnore
	private Integer userId;// 发帖人 userId
	@JsonIgnore
	private String image; // 图片字符串

	public Integer getTopicId() {
		return topicId;
	}

	public void setTopicId(Integer topicId) {
		this.topicId = topicId;
	}

	public Integer getNodeId() {
		return nodeId;
	}

	public void setNodeId(Integer nodeId) {
		this.nodeId = nodeId;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public Integer getReplyCount() {
		return replyCount;
	}

	public void setReplyCount(Integer replyCount) {
		this.replyCount = replyCount;
	}

	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public List<String> getImages() {
		return images;
	}

	public void setImages(List<String> images) {
		this.images = images;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getAudioUrl() {
		return audioUrl;
	}

	public void setAudioUrl(String audioUrl) {
		this.audioUrl = audioUrl;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Boolean getCanDelete() {
		return canDelete;
	}

	public void setCanDelete(Boolean canDelete) {
		this.canDelete = canDelete;
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

	public Integer getFloor() {
		return floor;
	}

	public void setFloor(Integer floor) {
		this.floor = floor;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
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
		return (m >= 10 ? m + "" : "0" + m) + ":" + (s >= 10 ? s + "\'\'" : "0" + s + "\'\'");
	}

	public void setDurationStr(String durationStr) {
		this.durationStr = durationStr;
	}
}
