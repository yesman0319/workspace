package com.xiaoma.universe.liveroom.model.vo;

import java.io.Serializable;

/**
 * @Title:Entity
 * @Description: TODO
 * @author Administrator
 * @since 2017年04月05日
 * @version V1.0  
 */
public class LiveCourseVo implements Serializable {
    /** 
	 * @Fields serialVersionUID : TODO
	 */ 
	private static final long serialVersionUID = -3193043765976151796L;
	private Integer id;
	private Integer roomId;//直播间ID
    private String backImgUrl;//直播系列课背景图片
    private String name;//直播系列课名称
    private String introduction;//直播系列课简介
    private int topicNum;//直播系列课话题个数
    private int viewTime;//观看人次
    private int viewNum;//观看人数
    private int fansNum;//粉丝人数
    private java.util.Date createTime;//创建时间
    private java.util.Date updateTime;//updateTime

	public LiveCourseVo() {
		super();
	}

	
	public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public Integer getRoomId() {
		return roomId;
	}

	public void setRoomId(Integer roomId) {
		this.roomId = roomId;
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

	public String getIntroduction() {
		return introduction;
	}

	public void setIntroduction(String introduction) {
		this.introduction = introduction;
	}

	public int getTopicNum() {
		return topicNum;
	}

	public void setTopicNum(int topicNum) {
		this.topicNum = topicNum;
	}

	public int getViewTime() {
		return viewTime;
	}

	public void setViewTime(int viewTime) {
		this.viewTime = viewTime;
	}

	public int getViewNum() {
		return viewNum;
	}

	public void setViewNum(int viewNum) {
		this.viewNum = viewNum;
	}

	public int getFansNum() {
		return fansNum;
	}

	public void setFansNum(int fansNum) {
		this.fansNum = fansNum;
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
