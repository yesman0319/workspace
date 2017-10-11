package com.xiaoma.universe.shopping.model;

import java.io.Serializable;

import org.springframework.format.annotation.DateTimeFormat;

public class CouponRecord implements Serializable {
    private Integer id;
    private Integer couponId;
    private Integer shopkeeperId;
   
    private Integer userId;
    private Integer isUsed;
   
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private java.util.Date userTime;
    
    private String orderSn;
    
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private java.util.Date updateTime;
    
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private java.util.Date createTime;
    
    private String status;
    private String statusMessage;
    
    
    
    private String tag;
    private String couponName;
    private String couponTitle;
    private java.math.BigDecimal facePrice;
    private Integer discount;
    
    @DateTimeFormat(pattern="yyyy-MM-dd 00:00:00")
    private java.util.Date beginTime;
    
    @DateTimeFormat(pattern="yyyy-MM-dd 00:00:00")
    private java.util.Date endTime;
    
    private String logoUrl;
    
    private String includeType;
    
    private String goodIds;
    private String description;
    
    private String resultStatus;
    
    private String resultStatusMessage;
    
	public String getResultStatus() {
		return resultStatus;
	}
	public void setResultStatus(String resultStatus) {
		this.resultStatus = resultStatus;
	}
	public String getResultStatusMessage() {
		return resultStatusMessage;
	}
	public void setResultStatusMessage(String resultStatusMessage) {
		this.resultStatusMessage = resultStatusMessage;
	}
	public String getTag() {
		return tag;
	}
	public void setTag(String tag) {
		this.tag = tag;
	}
	public String getCouponName() {
		return couponName;
	}
	public void setCouponName(String couponName) {
		this.couponName = couponName;
	}
	public String getCouponTitle() {
		return couponTitle;
	}
	public void setCouponTitle(String couponTitle) {
		this.couponTitle = couponTitle;
	}
	public java.math.BigDecimal getFacePrice() {
		return facePrice;
	}
	public void setFacePrice(java.math.BigDecimal facePrice) {
		this.facePrice = facePrice;
	}
	public Integer getDiscount() {
		return discount;
	}
	public void setDiscount(Integer discount) {
		this.discount = discount;
	}
	public java.util.Date getBeginTime() {
		return beginTime;
	}
	public void setBeginTime(java.util.Date beginTime) {
		this.beginTime = beginTime;
	}
	public java.util.Date getEndTime() {
		return endTime;
	}
	public void setEndTime(java.util.Date endTime) {
		this.endTime = endTime;
	}
	public String getLogoUrl() {
		return logoUrl;
	}
	public void setLogoUrl(String logoUrl) {
		this.logoUrl = logoUrl;
	}
	public Integer getShopkeeperId() {
		return shopkeeperId;
	}
	public void setShopkeeperId(Integer shopkeeperId) {
		this.shopkeeperId = shopkeeperId;
	}

	public String getIncludeType() {
		return includeType;
	}
	public void setIncludeType(String includeType) {
		this.includeType = includeType;
	}
	
	public String getGoodIds() {
		return goodIds;
	}
	public void setGoodIds(String goodIds) {
		this.goodIds = goodIds;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}

    public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getCouponId() {
		return couponId;
	}
	public void setCouponId(Integer couponId) {
		this.couponId = couponId;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public Integer getIsUsed() {
		return isUsed;
	}
	public void setIsUsed(Integer isUsed) {
		this.isUsed = isUsed;
	}
	public java.util.Date getUserTime() {
		return userTime;
	}
	public void setUserTime(java.util.Date userTime) {
		this.userTime = userTime;
	}
	public String getOrderSn() {
		return orderSn;
	}
	public void setOrderSn(String orderSn) {
		this.orderSn = orderSn;
	}
	public java.util.Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(java.util.Date updateTime) {
		this.updateTime = updateTime;
	}
	public java.util.Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(java.util.Date createTime) {
		this.createTime = createTime;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getStatusMessage() {
		return statusMessage;
	}
	public void setStatusMessage(String statusMessage) {
		this.statusMessage = statusMessage;
	}

   
}
