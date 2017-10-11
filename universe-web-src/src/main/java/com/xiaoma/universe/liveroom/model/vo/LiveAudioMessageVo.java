package com.xiaoma.universe.liveroom.model.vo;

import java.io.Serializable;

/**
 * @Title:Entity
 * @Description: TODO
 * @author Administrator
 * @since 2017年04月17日
 * @version V1.0  
 */
public class LiveAudioMessageVo  implements Serializable {
	/** 
	 * @Fields serialVersionUID : TODO
	 */ 
	private static final long serialVersionUID = 3669138258237442207L;
	private Integer id;
    private String wechatMediaId;//微信素材编号
    private Integer userId;//用户Id
    private Integer userName;//用户名
    private Integer roomId;//房间的id
    private Integer topicId;//预订课程的id
    private Integer isTransform;//０未开始，１转化中，2转化结束，3转化失败
    private Integer isPush;//０没有推送，１已经推送
    private String duration;//时长
    private String taskId;//又拍云任务id
    private String orgUrl;//原始地址
    private String pushUrl;//发送地址
    private java.util.Date createTime;//createTime
    private java.util.Date updateTime;//updateTime

	public LiveAudioMessageVo() {
		super();
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
	public String getWechatMediaId() {
		return wechatMediaId;
	}

	public void setWechatMediaId(String wechatMediaId) {
		this.wechatMediaId = wechatMediaId;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getUserName() {
		return userName;
	}

	public void setUserName(Integer userName) {
		this.userName = userName;
	}

	public Integer getRoomId() {
		return roomId;
	}

	public void setRoomId(Integer roomId) {
		this.roomId = roomId;
	}

	public Integer getTopicId() {
		return topicId;
	}

	public void setTopicId(Integer topicId) {
		this.topicId = topicId;
	}

	public Integer getIsTransform() {
		return isTransform;
	}

	public void setIsTransform(Integer isTransform) {
		this.isTransform = isTransform;
	}

	public Integer getIsPush() {
		return isPush;
	}

	public void setIsPush(Integer isPush) {
		this.isPush = isPush;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public String getTaskId() {
		return taskId;
	}

	public void setTaskId(String taskId) {
		this.taskId = taskId;
	}

	public String getOrgUrl() {
		return orgUrl;
	}

	public void setOrgUrl(String orgUrl) {
		this.orgUrl = orgUrl;
	}

	public String getPushUrl() {
		return pushUrl;
	}

	public void setPushUrl(String pushUrl) {
		this.pushUrl = pushUrl;
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
