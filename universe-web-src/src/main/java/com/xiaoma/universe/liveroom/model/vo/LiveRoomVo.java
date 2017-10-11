package com.xiaoma.universe.liveroom.model.vo;

import java.io.Serializable;

/**
 * @Title:Entity
 * @Description: TODO
 * @author Administrator
 * @since 2017年04月05日
 * @version V1.0  
 */
public class LiveRoomVo implements Serializable {
    /** 
	 * @Fields serialVersionUID : TODO
	 */ 
	private static final long serialVersionUID = -5056265510246040474L;
	private Integer id;
	private String avatar;//直播间头像
    private String title;//直播间标题
    private String name;//直播间名称
    private String introduction;//直播间简介
    private int viewTime;//观看人次
    private int viewNum;//观看人数
    private int fansNum;//粉丝人数
    private int coursesNum;//系列课数量
    private int topicsNum;//话题数量
    private Integer teaId;//教师id
    private String teaName;//教师名称
//    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private java.util.Date createTime;//创建时间
    private java.util.Date updateTime;//updateTime

	public LiveRoomVo() {
		super();
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
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

	public int getCoursesNum() {
		return coursesNum;
	}

	public void setCoursesNum(int coursesNum) {
		this.coursesNum = coursesNum;
	}

	public int getTopicsNum() {
		return topicsNum;
	}

	public void setTopicsNum(int topicsNum) {
		this.topicsNum = topicsNum;
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
