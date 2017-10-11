package com.xiaoma.universe.livemanage.model;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

/**
 * 回播
 * @author Administrator
 */
public class BroadcastVO {
	
	private Integer id;	//主键
	private String name;		//视频的名称
	private Integer type;	//类型
	private Integer isPay; //0免费，1付费
	
	private Date startTime;	//开始时间
	private Date endTime;		//结束时间
	
	private Integer productId;		//产品id
	private String productName;	//产品名称
	
	private Integer categoryId;	//分类id
	private String categoryName;		//分类名称
	
	private Integer productTypeId;		//产品类型id
	private String productTypeName;		//产品类型id
	private String productTypeNameColor;		//产品类型名称
	
	private String teacherName;		//老师名称
	private Long viewNum;		//观看数量
	private String duration;		//时长
	
	private Integer broadStatue;		//播放状态 1回放
	
	private String imgUrl;		//图片
	private String playUrl;		//播放地址
	
	
	private String host;		//展示互动域名
	private String password;		//密码
	private String broadcastId;		//根据type来判断（1展示互动，2cc视频）
	
	@JsonIgnore
	private String extraInfo;
	private Integer planId;		//回放课对应的计划id
	private String planName;	//计划名称
	

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

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public Integer getProductId() {
		return productId;
	}

	public void setProductId(Integer productId) {
		this.productId = productId;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public Integer getProductTypeId() {
		return productTypeId;
	}

	public void setProductTypeId(Integer productTypeId) {
		this.productTypeId = productTypeId;
	}

	public String getProductTypeName() {
		if(this.productTypeId == null){
			this.productTypeId = 0;
		}
		return getProductTypeName(productTypeId);
	}

	public void setProductTypeName(String productTypeName) {
		this.productTypeName = productTypeName;
	}

	public String getProductTypeNameColor() {
		if(this.productTypeId == null){
			this.productTypeId = 0;
		}
		return getProductTypeColor(productTypeId);
	}

	public void setProductTypeNameColor(String productTypeNameColor) {
		this.productTypeNameColor = productTypeNameColor;
	}

	public String getTeacherName() {
		return teacherName;
	}

	public void setTeacherName(String teacherName) {
		this.teacherName = teacherName;
	}

	public Long getViewNum() {
		return viewNum;
	}

	public void setViewNum(Long viewNum) {
		this.viewNum = viewNum;
	}

	public String getDuration() {
		return duration;
	}

	public void setDuration(String duration) {
		this.duration = duration;
	}

	public Integer getBroadStatue() {
		return broadStatue;
	}

	public void setBroadStatue(Integer broadStatue) {
		this.broadStatue = broadStatue;
	}

	public Integer getPlanId() {
		return planId;
	}

	public void setPlanId(Integer planId) {
		this.planId = planId;
	}



	public String getPlanName() {
		return planName;
	}

	public void setPlanName(String planName) {
		this.planName = planName;
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

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getBroadcastId() {
		return broadcastId;
	}

	public void setBroadcastId(String broadcastId) {
		this.broadcastId = broadcastId;
	}
	
	public String getExtraInfo() {
		return extraInfo;
	}

	public void setExtraInfo(String extraInfo) {
		this.extraInfo = extraInfo;
	}

	public String getProductTypeColor(int productTypeId){
		switch (productTypeId) {
		case 43:
			return "6cc5e9";
		case 44:
			return "465cc8";
		case 45:
			return "f6b439";
		case 46:
			return "00b551";
		case 47:
			return "bb70a8";
		case 48:
			return "d96565";
		default: return "d96565";
		}
	}
	
	public  String getProductTypeName(int productTypeId){
		switch (productTypeId) {
		case 43:
			return "基础";
		case 44:
			return "强化";
		case 45:
			return "大咖";
		case 46:
			return "假期";
		case 47:
			return "点题";
		case 48:
			return "模考";
		default: return "课程";
		}
	}

	public Integer getIsPay() {
		return isPay;
	}

	public void setIsPay(Integer isPay) {
		this.isPay = isPay;
	}
	
}
