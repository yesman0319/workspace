package com.xiaoma.universe.material.model;

import java.io.Serializable;

/**
 * 素材引用
 */
public class MaterialQuote implements Serializable {
    private Integer id;
    private Integer materialId;
    private String materialName;
    private Integer topicId;
    private String topicTitle;
    private java.util.Date quoteTime;
    private String users;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getMaterialId() {
		return materialId;
	}
	public void setMaterialId(Integer materialId) {
		this.materialId = materialId;
	}
	public String getMaterialName() {
		return materialName;
	}
	public void setMaterialName(String materialName) {
		this.materialName = materialName;
	}
	public Integer getTopicId() {
		return topicId;
	}
	public void setTopicId(Integer topicId) {
		this.topicId = topicId;
	}
	public String getTopicTitle() {
		return topicTitle;
	}
	public void setTopicTitle(String topicTitle) {
		this.topicTitle = topicTitle;
	}
	public java.util.Date getQuoteTime() {
		return quoteTime;
	}
	public void setQuoteTime(java.util.Date quoteTime) {
		this.quoteTime = quoteTime;
	}
	public String getUsers() {
		return users;
	}
	public void setUsers(String users) {
		this.users = users;
	}

    
}
