package com.xiaoma.universe.videomanage.model.app;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.xiaoma.universe.information.model.BaseEntity;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PartsForApp extends BaseEntity implements Serializable {
    private String name;//视频集的名字
    private Integer sortNum;//排序号
    private Integer courseId;//yztf_video_courses的主键
    private Integer groupId;//yztf_video_group的id
    private String imgUrl;//封面地址
    private String info;//简介
    private String suitableCrow;//使用人群
    private Integer publishStatus;//发否发布（0没有发布，1发布）
    private Integer createUser;//createUser
    private Long createTime;//createTime
    private Integer updateUser;//updateUser
    private Long updateTime;//updateTime
    private String isFinish;//是否看完
    private String totalViews;//一共几个视频
    private String canSee;//是否可看（0:点击观看，1:点击试看，2：需要购买后观看）
    private Integer lastWatchId;//最后观看lessionId
    private Integer lastVideoId;//最后观看VideoId
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getSortNum() {
		return sortNum;
	}
	public void setSortNum(Integer sortNum) {
		this.sortNum = sortNum;
	}
	public Integer getCourseId() {
		return courseId;
	}
	public void setCourseId(Integer courseId) {
		this.courseId = courseId;
	}
	public Integer getGroupId() {
		return groupId;
	}
	public void setGroupId(Integer groupId) {
		this.groupId = groupId;
	}
	public String getImgUrl() {
		return imgUrl;
	}
	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}
	public String getInfo() {
		return info;
	}
	public void setInfo(String info) {
		this.info = info;
	}
	public String getSuitableCrow() {
		return suitableCrow;
	}
	public void setSuitableCrow(String suitableCrow) {
		this.suitableCrow = suitableCrow;
	}
	public Integer getPublishStatus() {
		return publishStatus;
	}
	public void setPublishStatus(Integer publishStatus) {
		this.publishStatus = publishStatus;
	}
	public Integer getCreateUser() {
		return createUser;
	}
	public void setCreateUser(Integer createUser) {
		this.createUser = createUser;
	}
	public Long getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Long createTime) {
		this.createTime = createTime;
	}
	public Integer getUpdateUser() {
		return updateUser;
	}
	public void setUpdateUser(Integer updateUser) {
		this.updateUser = updateUser;
	}
	public Long getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Long updateTime) {
		this.updateTime = updateTime;
	}
	public String getIsFinish() {
		return isFinish;
	}
	public void setIsFinish(String isFinish) {
		this.isFinish = isFinish;
	}
	public String getTotalViews() {
		return totalViews;
	}
	public void setTotalViews(String totalViews) {
		this.totalViews = totalViews;
	}
	public String getCanSee() {
		return canSee;
	}
	public void setCanSee(String canSee) {
		this.canSee = canSee;
	}
	public Integer getLastWatchId() {
		return lastWatchId;
	}
	public void setLastWatchId(Integer lastWatchId) {
		this.lastWatchId = lastWatchId;
	}
	public Integer getLastVideoId() {
		return lastVideoId;
	}
	public void setLastVideoId(Integer lastVideoId) {
		this.lastVideoId = lastVideoId;
	}
    
    
    

}
