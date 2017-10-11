package com.xiaoma.universe.wordschallenge.model;

import java.io.Serializable;

public class WordsChallengeTeacherInfo implements Serializable {
    private Integer id;
    private String teaUrl;
    private String name;
    private String phone;
    private Long updateTime;
    private String teaContent;
    
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getTeaUrl() {
		return teaUrl;
	}
	public void setTeaUrl(String teaUrl) {
		this.teaUrl = teaUrl;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public Long getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Long updateTime) {
		this.updateTime = updateTime;
	}
	public String getTeaContent() {
		return teaContent;
	}
	public void setTeaContent(String teaContent) {
		this.teaContent = teaContent;
	}


}
