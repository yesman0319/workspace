package com.xiaoma.universe.wordschallenge.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class WordsChallengeUserShareResults implements Serializable {
    private Integer id;
    private String weixinUnionid;
    private Integer shareId;
    private Integer questionId;
    private Integer isCorrect;
    private Long createdTime;
    private Long updatedTime;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getWeixinUnionid() {
		return weixinUnionid;
	}
	public void setWeixinUnionid(String weixinUnionid) {
		this.weixinUnionid = weixinUnionid;
	}
	public Integer getShareId() {
		return shareId;
	}
	public void setShareId(Integer shareId) {
		this.shareId = shareId;
	}
	public Integer getQuestionId() {
		return questionId;
	}
	public void setQuestionId(Integer questionId) {
		this.questionId = questionId;
	}
	public Integer getIsCorrect() {
		return isCorrect;
	}
	public void setIsCorrect(Integer isCorrect) {
		this.isCorrect = isCorrect;
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
