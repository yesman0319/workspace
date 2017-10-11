package com.xiaoma.universe.wordschallenge.model;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class WordsChallengeUserShareRate implements Serializable {
    private Integer id;
    private String weixinNickname;
    private String weixinHeadimgurl;
    private String weixinUnionid;
    private Integer shareId;
    private java.math.BigDecimal rate;
    private java.math.BigDecimal avgSpeed;
    private Integer rightCount;
    private Integer score;
    private Long createdTime;
    private Long updatedTime;
    private Integer teaId;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getWeixinNickname() {
		return weixinNickname;
	}
	public void setWeixinNickname(String weixinNickname) {
		this.weixinNickname = weixinNickname;
	}
	public String getWeixinHeadimgurl() {
		return weixinHeadimgurl;
	}
	public void setWeixinHeadimgurl(String weixinHeadimgurl) {
		this.weixinHeadimgurl = weixinHeadimgurl;
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
	public java.math.BigDecimal getRate() {
		return rate;
	}
	public void setRate(java.math.BigDecimal rate) {
		this.rate = rate;
	}
	public java.math.BigDecimal getAvgSpeed() {
		return avgSpeed;
	}
	public void setAvgSpeed(java.math.BigDecimal avgSpeed) {
		this.avgSpeed = avgSpeed;
	}
	public Integer getScore() {
		return score;
	}
	public void setScore(Integer score) {
		this.score = score;
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
	public Integer getRightCount() {
		return rightCount;
	}
	public void setRightCount(Integer rightCount) {
		this.rightCount = rightCount;
	}
	public Integer getTeaId() {
		return teaId;
	}
	public void setTeaId(Integer teaId) {
		this.teaId = teaId;
	}

    
}
