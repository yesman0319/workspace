package com.xiaoma.universe.wordschallenge.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class WordsChallengeShares implements Serializable {
    private Integer id;
    private Integer userId;
    private String userUrl;
    private Long createdTime;
    private Long updatedTime;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public String getUserUrl() {
		return userUrl;
	}
	public void setUserUrl(String userUrl) {
		this.userUrl = userUrl;
	}
	public Long getCreatedTime() {
		return createdTime;
	}
	public void setCreatedTime(Long createdTime) {
		this.createdTime = createdTime;
	}
	public Long getUpdatedTime() {
		return updatedTime;
	}
	public void setUpdatedTime(Long updatedTime) {
		this.updatedTime = updatedTime;
	}


    
}
