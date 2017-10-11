package com.xiaoma.universe.topic.vo;

/**
 * 通知vo
 * 
 * @Class Name NoticeVO
 * @Author dangxingfei@xiaoma.cn
 * @Create In 2016年12月21日
 */
public class NoticeVO {
	private Integer id; // 通知的id
	private String type;// 通知类型（帖子通知，回复贴通知，@通知）
	private Integer userId;// 用户id
	private Integer toUid;// 回复的用户id
	private Integer eventId;// 帖子或者回复贴的id
	private Integer isRead;// 是否看过(0未看，1看过）
	private java.util.Date createTime;// 更新时间
	private java.util.Date updateTime;// updateTime

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getToUid() {
		return toUid;
	}

	public void setToUid(Integer toUid) {
		this.toUid = toUid;
	}

	public Integer getEventId() {
		return eventId;
	}

	public void setEventId(Integer eventId) {
		this.eventId = eventId;
	}

	public Integer getIsRead() {
		return isRead;
	}

	public void setIsRead(Integer isRead) {
		this.isRead = isRead;
	}

	public java.util.Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(java.util.Date createTime) {
		this.createTime = createTime;
	}

	public java.util.Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(java.util.Date updateTime) {
		this.updateTime = updateTime;
	}

}
