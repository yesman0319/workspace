package com.xiaoma.universe.shopping.model;

import java.io.Serializable;
import java.util.List;

//商品表
public class Good implements Serializable {
    private static final long serialVersionUID = -4679031620081556972L;
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
    private java.util.Date createTime;
    private java.util.Date onSaleTime;
    private java.util.Date offSaleTime;
    private String description;
    
    private List<GoodAttr> goodAttrList;  
   
    
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
	public java.util.Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(java.util.Date createTime) {
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
	public List<GoodAttr> getGoodAttrList() {
		return goodAttrList;
	}
	public void setGoodAttrList(List<GoodAttr> goodAttrList) {
		this.goodAttrList = goodAttrList;
	}
    
}
