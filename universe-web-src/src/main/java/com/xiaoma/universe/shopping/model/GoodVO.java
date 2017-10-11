package com.xiaoma.universe.shopping.model;


import java.util.List;

import com.xiaoma.rest.authentication.TeacherInfo;

/**
 * 组合后的商品类（商品，商品属性，使用时间等信息），最终以Json形式返回给App或Web端
 * @author zhai
 */
public class GoodVO {
	private Integer id;
    private String goodName;
    private String tag;
    private java.math.BigDecimal marketPrice;
    private java.math.BigDecimal localPrice;
    private String isDiscount;
    private Integer typeId;
    private Integer categoryId;
    private Integer goodStatus;
    private String imgUrl;
    private Long createTime;
    private java.util.Date onSaleTime;
    private java.util.Date offSaleTime;
    private String description;
    private List<GoodAttr> goodAttrList; //商品属性
    private List<GoodUseTime> goodUseTimeList;//使用（或开始）时间
    private List<GoodTypeAttr> goodTypeAttrList;//商品类型属性 如：计划简介，适合对象，学习目标
    private Integer stockNum;   //库存量
    private String promotionMessage; //活动名称
    
    private String supportPaymentTypes; //用于的支付方式   1901支付宝 ，1902 微信
    
    private TeacherInfo teacherInfo;  //教师
    
	public String getSupportPaymentTypes() {
		return supportPaymentTypes;
	}
	public void setSupportPaymentTypes(String supportPaymentTypes) {
		this.supportPaymentTypes = supportPaymentTypes;
	}

	public TeacherInfo getTeacherInfo() {
		return teacherInfo;
	}

	public void setTeacherInfo(TeacherInfo teacherInfo) {
		this.teacherInfo = teacherInfo;
	}

	public Integer getStockNum() {
		return stockNum;
	}

	public void setStockNum(Integer stockNum) {
		this.stockNum = stockNum;
	}

	public String getPromotionMessage() {
		return promotionMessage;
	}

	public void setPromotionMessage(String promotionMessage) {
		this.promotionMessage = promotionMessage;
	}

	public List<GoodTypeAttr> getGoodTypeAttrList() {
   		return goodTypeAttrList;
   	}

   	public void setGoodTypeAttrList(List<GoodTypeAttr> goodTypeAttrList) {
   		this.goodTypeAttrList = goodTypeAttrList;
   	}
    
	public List<GoodAttr> getGoodAttrList() {
		return goodAttrList;
	}
	
	public void setGoodAttrList(List<GoodAttr> goodAttrList) {
		this.goodAttrList = goodAttrList;
	}
	public List<GoodUseTime> getGoodUseTimeList() {
		return goodUseTimeList;
	}
	public void setGoodUseTimeList(List<GoodUseTime> goodUseTimeList) {
		this.goodUseTimeList = goodUseTimeList;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getGoodName() {
		return goodName;
	}
	public void setGoodName(String goodName) {
		this.goodName = goodName;
	}
	public String getTag() {
		return tag;
	}
	public void setTag(String tag) {
		this.tag = tag;
	}
	public java.math.BigDecimal getMarketPrice() {
		return marketPrice;
	}
	public void setMarketPrice(java.math.BigDecimal marketPrice) {
		this.marketPrice = marketPrice;
	}
	public java.math.BigDecimal getLocalPrice() {
		return localPrice;
	}
	public void setLocalPrice(java.math.BigDecimal localPrice) {
		this.localPrice = localPrice;
	}
	public String getIsDiscount() {
		return isDiscount;
	}
	public void setIsDiscount(String isDiscount) {
		this.isDiscount = isDiscount;
	}
	public Integer getTypeId() {
		return typeId;
	}
	public void setTypeId(Integer typeId) {
		this.typeId = typeId;
	}
	public Integer getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}
	public Integer getGoodStatus() {
		return goodStatus;
	}
	public void setGoodStatus(Integer goodStatus) {
		this.goodStatus = goodStatus;
	}
	public String getImgUrl() {
		return imgUrl;
	}
	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}
	
	public Long getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Long createTime) {
		this.createTime = createTime;
	}

	public java.util.Date getOnSaleTime() {
		return onSaleTime;
	}
	public void setOnSaleTime(java.util.Date onSaleTime) {
		this.onSaleTime = onSaleTime;
	}
	public java.util.Date getOffSaleTime() {
		return offSaleTime;
	}
	public void setOffSaleTime(java.util.Date offSaleTime) {
		this.offSaleTime = offSaleTime;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
    
    
}
