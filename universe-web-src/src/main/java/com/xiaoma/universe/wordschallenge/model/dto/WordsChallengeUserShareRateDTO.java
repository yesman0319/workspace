package com.xiaoma.universe.wordschallenge.model.dto;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.xiaoma.universe.wordschallenge.model.WordsChallengeUserShareRate;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class WordsChallengeUserShareRateDTO implements Serializable {
    private Integer id;
    private String weixinNickname;
    private String weixinHeadimgurl;
    private String weixinUnionid;
    private Integer shareId;
    private java.math.BigDecimal rate;
    private java.math.BigDecimal avgSpeed;
    private Integer score;
    private Integer rightCount;
    private Long createdTime;
    private Long updatedTime;
    private String message;
    private Integer precent;
    private Integer rank;
    private Integer teaId;
    private List<WordsChallengeUserShareRate> threeList;
    private List<WordsChallengeUserShareRate> otherList;
    
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
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public Integer getPrecent() {
		return precent;
	}
	public void setPrecent(Integer precent) {
		this.precent = precent;
	}
	public Integer getRank() {
		return rank;
	}
	public void setRank(Integer rank) {
		this.rank = rank;
	}
	public Integer getRightCount() {
		return rightCount;
	}
	public void setRightCount(Integer rightCount) {
		this.rightCount = rightCount;
	}
	public List<WordsChallengeUserShareRate> getThreeList() {
		return threeList;
	}
	public void setThreeList(List<WordsChallengeUserShareRate> threeList) {
		this.threeList = threeList;
	}
	public List<WordsChallengeUserShareRate> getOtherList() {
		return otherList;
	}
	public void setOtherList(List<WordsChallengeUserShareRate> otherList) {
		this.otherList = otherList;
	}
	public Integer getTeaId() {
		return teaId;
	}
	public void setTeaId(Integer teaId) {
		this.teaId = teaId;
	}
    
}
