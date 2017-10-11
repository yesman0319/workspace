package com.xiaoma.universe.topic.vo;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.xiaoma.universe.common.utils.StringUtils;
import com.xiaoma.universe.common.utils.TimeHelper;
import com.xiaoma.universe.common.utils.TimeUtil;

/**
 * 主题帖的vo类
 * 
 * @Class Name TopicVO
 * @Author dangxingfei@xiaoma.cn
 * @Create In 2016年12月20日
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class TopicListVO {
	private Integer topicId; // 主键
	private Integer nodeId;// 板块id
	private String title;// 帖子的标题
	private String content; // 帖子的文本，isPreview = true才显示
	private List<String> images; // 帖子的图片，isPreview = true才显示
	private String nickName; // 发帖人的昵称
	private String avatar; // 发帖人头像
	private Integer isTop;// 是否置顶(0不置顶，1置顶)
	private String replyNickName; // 回帖人的昵称
	private String replyAvatar; // 回帖人头衔
	private Integer replyCount; // 回帖数量
	private Date replyTime;// 最后回复的时间
	private String replyTimeStr; // 最后回复时间的字符串
	private Date today; // 今天零点的时间

	@JsonIgnore
	private Integer userId;// 发帖人 userId
	@JsonIgnore
	private Date createTime; // 创建时间
	@JsonIgnore
	private String image; // 图片字符串
	// @JsonIgnore
	// private String audioUrl; // 帖子的音频，isPreview = true才显示
	@JsonIgnore
	private Integer isEssence;// 是否精华帖子（0否，1是）
	@JsonIgnore
	private Integer replyUid;
	@JsonIgnore
	private Boolean isPreview; // 是否预览图片和语音以及帖子的内容

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

	public Integer getIsTop() {
		return isTop;
	}

	public void setIsTop(Integer isTop) {
		this.isTop = isTop;
	}

	public Integer getIsEssence() {
		return isEssence;
	}

	public void setIsEssence(Integer isEssence) {
		this.isEssence = isEssence;
	}

	public Integer getReplyCount() {
		return replyCount;
	}

	public void setReplyCount(Integer replyCount) {
		this.replyCount = replyCount;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public Date getReplyTime() {
		return replyTime;
	}

	public void setReplyTime(Date replyTime) {
		this.replyTime = replyTime;
	}

	public Integer getReplyUid() {
		return replyUid;
	}

	public void setReplyUid(Integer replyUid) {
		this.replyUid = replyUid;
	}

	public String getReplyNickName() {
		return replyNickName;
	}

	public void setReplyNickName(String replyNickName) {
		this.replyNickName = replyNickName;
	}

	public List<String> getImages() {
		return images;
	}

	public void setImages(List<String> images) {
		this.images = images;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public Date getToday() {
		return TimeHelper.getZeroTimeDate();
	}

	public void setToday(Date today) {
		this.today = today;
	}

	public Boolean getIsPreview() {
		return isPreview;
	}

	public void setIsPreview(Boolean isPreview) {
		this.isPreview = isPreview;
	}

	public String getContent() {
		return StringUtils.cut(this.content, 50, "");
	}

	public void setContent(String content) {
		this.content = content;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public String getReplyAvatar() {
		return replyAvatar;
	}

	public void setReplyAvatar(String replyAvatar) {
		this.replyAvatar = replyAvatar;
	}

	public String getReplyTimeStr() {
		Date date = this.replyTime;

		if (TimeUtil.isToaday(replyTime)) {
			return TimeUtil.date2String(date, "HH:mm");
		} else {
			return TimeUtil.date2String(date, "MM-dd");
		}
	}

	public void setReplyTimeStr(String replyTimeStr) {
		this.replyTimeStr = replyTimeStr;
	}

}
