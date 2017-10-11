package com.xiaoma.universe.shopping.model;

import java.io.Serializable;

//商品使用时间
public class GoodUseTime implements Serializable {
   
	private Integer id;
    private Integer goodId;
    private Integer goodAttrId;
    private java.util.Date userTime;
	
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
	public Integer getGoodAttrId() {
		return goodAttrId;
	}
	public void setGoodAttrId(Integer goodAttrId) {
		this.goodAttrId = goodAttrId;
	}
	public java.util.Date getUserTime() {
		return userTime;
	}
	public void setUserTime(java.util.Date userTime) {
		this.userTime = userTime;
	}

}
