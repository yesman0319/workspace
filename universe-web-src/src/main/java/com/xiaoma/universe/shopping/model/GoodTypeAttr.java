package com.xiaoma.universe.shopping.model;

import java.io.Serializable;

//商品类型属性定义表
public class GoodTypeAttr implements Serializable {
    private Integer id;
    private Integer typeId;
    private String attrName;
    private String attrType;
    private String attrValues;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getTypeId() {
		return typeId;
	}
	public void setTypeId(Integer typeId) {
		this.typeId = typeId;
	}
	public String getAttrName() {
		return attrName;
	}
	public void setAttrName(String attrName) {
		this.attrName = attrName;
	}
	public String getAttrType() {
		return attrType;
	}
	public void setAttrType(String attrType) {
		this.attrType = attrType;
	}
	public String getAttrValues() {
		return attrValues;
	}
	public void setAttrValues(String attrValues) {
		this.attrValues = attrValues;
	}

    
}
