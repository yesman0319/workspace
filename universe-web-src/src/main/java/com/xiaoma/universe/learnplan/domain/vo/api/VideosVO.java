package com.xiaoma.universe.learnplan.domain.vo.api;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class VideosVO {
	@JsonInclude
	private int id;
	@JsonInclude
    private int lessionId;//视频课的id
	private int courseId; 
	private int videoId;//视频的id
    private String name;//视频课程的名字
    private int type;//视频类型（1回放课程，2 cc视频）
    private int productId;//回播课中的产品id
    private int categoryId;//分类id
    private int productTypeId;//产品类型id
    private Long startTime;//回播课的开始时间
    private Long endTime;//yztf_video_sections的id
    private String imgUrl;//图片地址
    private String playUrl;//播放地址
    private int teacherId;//teacherId
    private String teacherName;//老师的名称
    private int subjectType;//科目类型（0基础，1强化，2进阶）
    private String subjectName;//科目名称
    private String description;//简介
    private String duration;//时长
    private int status;//状态（0无效，1有效）
    private int viewNum;//观看次数
    private int createUser;//createUser
    private Long createTime;//createTime
    private int updateUser;//updateUser
    private Long updateTime;//updateTime
    private String canSee;//是否可观看(1：有权观看:0：无权观看:2：可以试看)
    private String hasSee;//是否看过(:0：未看过:1：已看过)
    private int isPay;
    
    
	public int getCourseId() {
		return courseId;
	}
	public void setCourseId(int courseId) {
		this.courseId = courseId;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public int getProductId() {
		return productId;
	}
	public void setProductId(int productId) {
		this.productId = productId;
	}
	public int getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(int categoryId) {
		this.categoryId = categoryId;
	}
	public int getProductTypeId() {
		return productTypeId;
	}
	public void setProductTypeId(int productTypeId) {
		this.productTypeId = productTypeId;
	}
	
	public Long getStartTime() {
		return startTime;
	}
	public void setStartTime(Long startTime) {
		this.startTime = startTime;
	}
	public Long getEndTime() {
		return endTime;
	}
	public void setEndTime(Long endTime) {
		this.endTime = endTime;
	}
	public String getImgUrl() {
		return imgUrl;
	}
	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}
	public String getPlayUrl() {
		return playUrl;
	}
	public void setPlayUrl(String playUrl) {
		this.playUrl = playUrl;
	}
	public int getTeacherId() {
		return teacherId;
	}
	public void setTeacherId(int teacherId) {
		this.teacherId = teacherId;
	}
	public String getTeacherName() {
		return teacherName;
	}
	public void setTeacherName(String teacherName) {
		this.teacherName = teacherName;
	}
	public int getSubjectType() {
		return subjectType;
	}
	public void setSubjectType(int subjectType) {
		this.subjectType = subjectType;
	}
	public String getSubjectName() {
		return subjectName;
	}
	public void setSubjectName(String subjectName) {
		this.subjectName = subjectName;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getDuration() {
		return duration;
	}
	public void setDuration(String duration) {
		this.duration = duration;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public int getViewNum() {
		return viewNum;
	}
	public void setViewNum(int viewNum) {
		this.viewNum = viewNum;
	}
	public int getCreateUser() {
		return createUser;
	}
	public void setCreateUser(int createUser) {
		this.createUser = createUser;
	}
	public Long getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Long createTime) {
		this.createTime = createTime;
	}
	public int getUpdateUser() {
		return updateUser;
	}
	public void setUpdateUser(int updateUser) {
		this.updateUser = updateUser;
	}
	public Long getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Long updateTime) {
		this.updateTime = updateTime;
	}
	public String getCanSee() {
		return canSee;
	}
	public void setCanSee(String canSee) {
		this.canSee = canSee;
	}
	public int getIsPay() {
		return isPay;
	}
	public void setIsPay(int isPay) {
		this.isPay = isPay;
	}
	public int getLessionId() {
		return lessionId;
	}
	public void setLessionId(int lessionId) {
		this.lessionId = lessionId;
	}
	public int getVideoId() {
		return videoId;
	}
	public void setVideoId(int videoId) {
		this.videoId = videoId;
	}
	public String getHasSee() {
		return hasSee;
	}
	public void setHasSee(String hasSee) {
		this.hasSee = hasSee;
	}
     
}
