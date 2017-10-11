package com.xiaoma.universe.videomanage.model.vo;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class PartsDetailForWeb  implements Serializable {
	private Integer id;//视频集id
    private String name;//视频集的名字
    private Integer sortNum;//排序号
    private Integer courseId;//yztf_video_courses的主键
    private Integer groupId;//yztf_video_group的id
    private String imgUrl;//封面地址
    private String info;//简介
    private String suitableCrow;//使用人群
    private Integer publishStatus;//是否发布（0没有发布，1发布）
    private Integer createUser;//createUser
    private Long createTime;//createTime
    private Integer updateUser;//updateUser
    private Long updateTime;//updateTime
    private Integer lastWatchId;//最后观看lessionId
    private Integer lastWatchVideoId;//最后观看videoId
    private String courseName;//课程名称
    private String groupName;//组名称
    
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
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
	
	public Integer getLastWatchId() {
		return lastWatchId;
	}
	public void setLastWatchId(Integer lastWatchId) {
		this.lastWatchId = lastWatchId;
	}
	
	public Integer getLastWatchVideoId() {
		return lastWatchVideoId;
	}
	public void setLastWatchVideoId(Integer lastWatchVideoId) {
		this.lastWatchVideoId = lastWatchVideoId;
	}
	public String getCourseName() {
		return courseName;
	}
	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
    
    
}
