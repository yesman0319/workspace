package com.xiaoma.universe.shopping.model;

import java.io.Serializable;

import org.springframework.format.annotation.DateTimeFormat;

/**
 * 商品属性表
 * @author zhai
 */
public class GoodAttr implements Serializable {    
	private static final long serialVersionUID = 2834008222659426609L;
	private Integer id;
    private Integer goodId;
    private Integer typeAttrId;
    private String attrValue;
    private java.math.BigDecimal marketPrice; //市场价格， 原价
    private java.math.BigDecimal price;       //折后价格，实际卖价
    private String imgUrl;
    
    @DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
    private java.util.Date createTime;
    
	private String deviceType;//设备类型,DeviceType
    
    private String productIdentifier;
    
    private String supportPaymentTypes;
	
    public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getGoodId() {
		return goodId;
	}
	public void setGoodId(Integer goodId) {
		this.goodId = goodId;
	}
	public Integer getTypeAttrId() {
		return typeAttrId;
	}
	public void setTypeAttrId(Integer typeAttrId) {
		this.typeAttrId = typeAttrId;
	}
	public String getAttrValue() {
		return attrValue;
	}
	public void setAttrValue(String attrValue) {
		this.attrValue = attrValue;
	}
	public java.math.BigDecimal getPrice() {
		return price;
	}
	public void setPrice(java.math.BigDecimal price) {
		this.price = price;
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
	public java.math.BigDecimal getMarketPrice() {
		return marketPrice;
	}
	public void setMarketPrice(java.math.BigDecimal marketPrice) {
		this.marketPrice = marketPrice;
	}
	public String getDeviceType() {
		return deviceType;
	}
	public void setDeviceType(String deviceType) {
		this.deviceType = deviceType;
	}
	public String getProductIdentifier() {
		return productIdentifier;
	}
	public void setProductIdentifier(String productIdentifier) {
		this.productIdentifier = productIdentifier;
	}
	public String getSupportPaymentTypes() {
		return supportPaymentTypes;
	}
	public void setSupportPaymentTypes(String supportPaymentTypes) {
		this.supportPaymentTypes = supportPaymentTypes;
	}

}
