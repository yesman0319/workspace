package com.xiaoma.universe.liveroom.model.dto;

import java.io.Serializable;

import com.xiaoma.universe.common.utils.TimeHelper;

/**
 * @Title:Entity
 * @Description: TODO
 * @author Administrator
 * @since 2017年04月05日
 * @version V1.0  
 */
public class LiveTopicDto  implements Serializable {
	/** 
	 * @Fields serialVersionUID : TODO
	 */ 
	private static final long serialVersionUID = 5813547254651208656L;
	private Integer id;//话题id
	private int type;//0：独立存在；1：有上级系列课
    private Integer roomId;//直播间ID
    private String  roomName;//直播间名称
    private String avatar;//直播间头像
    private Integer teaId;//教师id
    private String  teaName;//教师名称
    private Integer courseId;//直播系列课ID
    private String courseName;//直播系列课名称
    private String backImgUrl;//直播话题背景图片
    private String name;//直播话题名称
    private int liveStatus;//直播话题状态0：未开始；1：正在直播；2：结束直播
    private String mainTitle;//直播话题标题
    private String subTitle;//直播话题副标题
    private String introduction;//直播话题简介
    private String firstContent;//直播话题首发信息
    private int viewNum;//观看人数
    private int viewTime;//观看人次
    private int fansNum;//粉丝人数
    private java.util.Date startTime;//开始时间
    private java.util.Date endTime;//结束时间
    private java.util.Date createTime;//创建时间
    private java.util.Date updateTime;//updateTime
    private String message;//返回信息
    private int status;//0：正常返回；1：未创建；2：返回失败，查看信息


	public LiveTopicDto() {
		super();
	}


	public Integer getId() {
		return id;
	}


	public String getRoomName() {
		return roomName;
	}


	public String getStartTime() {
		return TimeHelper.date2String(startTime, TimeHelper.OTHER_PATTERN);
	}


	public void setStartTime(java.util.Date startTime) {
		this.startTime = startTime;
	}


	public String getAvatar() {
		return avatar;
	}


	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}


	public void setRoomName(String roomName) {
		this.roomName = roomName;
	}


	public Integer getTeaId() {
		return teaId;
	}


	public void setTeaId(Integer teaId) {
		this.teaId = teaId;
	}


	public String getTeaName() {
		return teaName;
	}


	public void setTeaName(String teaName) {
		this.teaName = teaName;
	}


	public String getCourseName() {
		return courseName;
	}


	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public int getType() {
		return type;
	}


	public void setType(int type) {
		this.type = type;
	}


	public Integer getRoomId() {
		return roomId;
	}


	public void setRoomId(Integer roomId) {
		this.roomId = roomId;
	}


	public Integer getCourseId() {
		return courseId;
	}


	public void setCourseId(Integer courseId) {
		this.courseId = courseId;
	}


	public String getBackImgUrl() {
		return backImgUrl;
	}


	public void setBackImgUrl(String backImgUrl) {
		this.backImgUrl = backImgUrl;
	}


	public String getName() {
		return name;
	}


	public void setName(String name) {
		this.name = name;
	}


	public int getLiveStatus() {
		return liveStatus;
	}


	public void setLiveStatus(int liveStatus) {
		this.liveStatus = liveStatus;
	}


	public String getMainTitle() {
		return mainTitle;
	}


	public void setMainTitle(String mainTitle) {
		this.mainTitle = mainTitle;
	}


	public String getSubTitle() {
		return subTitle;
	}


	public void setSubTitle(String subTitle) {
		this.subTitle = subTitle;
	}


	public String getIntroduction() {
		return introduction;
	}


	public void setIntroduction(String introduction) {
		this.introduction = introduction;
	}


	public String getFirstContent() {
		return firstContent;
	}


	public void setFirstContent(String firstContent) {
		this.firstContent = firstContent;
	}


	public int getViewNum() {
		return viewNum;
	}


	public void setViewNum(int viewNum) {
		this.viewNum = viewNum;
	}


	public int getViewTime() {
		return viewTime;
	}


	public void setViewTime(int viewTime) {
		this.viewTime = viewTime;
	}


	public int getFansNum() {
		return fansNum;
	}


	public void setFansNum(int fansNum) {
		this.fansNum = fansNum;
	}


//	public java.util.Date getStartTime() {
//		return startTime;
//	}
//
//
//	public void setStartTime(java.util.Date startTime) {
//		this.startTime = startTime;
//	}


	public java.util.Date getEndTime() {
		return endTime;
	}


	public void setEndTime(java.util.Date endTime) {
		this.endTime = endTime;
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


	public String getMessage() {
		return message;
	}


	public void setMessage(String message) {
		this.message = message;
	}


	public int getStatus() {
		return status;
	}


	public void setStatus(int status) {
		this.status = status;
	}



}
