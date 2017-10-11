package com.xiaoma.universe.livemanage.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.xiaoma.universe.common.utils.StringUtils;

public class LivelessionVO {
	
	@JsonIgnore
	private String position; //课程展示位置（index)
	
	private Integer id;	//直播课的id
	
    private String name; //直播课程的名字
    
    private Integer isPay;		//视频是否付费
    
    private Integer categoryId; //分类的id
    
    private String categoryName;
    
    private Integer productId; //产品的id
    
    private String productName;	//产品名称
    
    private Integer productTypeId;  //产品类型id
    
    private Integer teacherId; //主讲老师 ID
    
    private String teacherName; //主讲老师的名称
    
    private Integer status;			//直播课状态
    
    private java.util.Date startTime; //课程开始时间
    
    private java.util.Date endTime; //课程结束时间
    
    private Integer isBook; 	//是否预约(0，未预约，1已预约，2预约已经取消)
    
    private Integer userId;	//课程预约的人
    
    private Integer planId;	//计划的Id
    
    private String planName;		//计划的名称
    
    private Integer viewNum;	//观看人数
    
    @JsonIgnore
    private String extraInfo;	//直播课中的额外字段json类型的字符串
    
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
	public Integer getCategoryId() {
		if(categoryId == null){
			return 0;
		}
		return categoryId;
	}
	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}
	public String getCategoryName() {
		//if(StringUtils.isEmpty(this.categoryName)){
		if(StringUtils.isEmpty(this.categoryName)){
			return "";
		}
		return categoryName;
	}
	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}
	public Integer getProductId() {
		if(productId == null){
			return 0;
		}
		return productId;
	}
	public void setProductId(Integer productId) {
		this.productId = productId;
	}
	public String getProductName() {
		//if(productName == null || productName == ""){
		if(StringUtils.isEmpty(this.productName)){
			return "";
		}
		return productName;
	}
	public void setProductName(String productName) {
		this.productName = productName;
	}
	public Integer getTeacherId() {
		if(teacherId == null){
			return 0;
		}
		return teacherId;
	}
	public void setTeacherId(Integer teacherId) {
		this.teacherId = teacherId;
	}
	public String getTeacherName() {
		//if(teacherName == null || teacherName == ""){
		if(StringUtils.isEmpty(this.teacherName)){	
		return "";
		}
		return teacherName;
	}
	public void setTeacherName(String teacherName) {
		this.teacherName = teacherName;
	}
	public java.util.Date getStartTime() {
		return startTime;
	}
	public void setStartTime(java.util.Date startTime) {
		this.startTime = startTime;
	}
	public java.util.Date getEndTime() {
		return endTime;
	}
	public void setEndTime(java.util.Date endTime) {
		this.endTime = endTime;
	}
	public String getPosition() {
		return position;
	}
	public void setPosition(String position) {
		this.position = position;
	}
	public Integer getStatus() {
		return status;
	}
	public void setStatus(Integer status) {
		this.status = status;
	}
	public Integer getIsBook() {
		return isBook;
	}
	public void setIsBook(Integer isBook) {
		this.isBook = isBook;
	}
	public Integer getProductTypeId() {
		if(productTypeId == null){
			return 0;
		}
		return productTypeId;
	}
	public void setProductTypeId(Integer productTypeId) {
		this.productTypeId = productTypeId;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public void setPlanId(Integer planId) {
		this.planId = planId;
	}
	public void setPlanName(String planName) {
		this.planName = planName;
	}
	public String getExtraInfo() {
		return extraInfo;
	}
	public void setExtraInfo(String extraInfo) {
		this.extraInfo = extraInfo;
	}
	public Integer getPlanId() {
		return planId;
	}
	public String getPlanName() {
		return planName;
	}
	public Integer getIsPay() {
		return isPay;
	}
	public void setIsPay(Integer isPay) {
		this.isPay = isPay;
	}
	public Integer getViewNum() {
		return viewNum;
	}
	public void setViewNum(Integer viewNum) {
		this.viewNum = viewNum;
	}
	@Override
	public String toString() {
		return "LivelessionVO [id=" + id + ", name=" + name + ", isPay=" + isPay + ", status=" + status + ", planId="
				+ planId + ", planName=" + planName + "]";
	}
}
