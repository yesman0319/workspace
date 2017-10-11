package com.xiaoma.universe.wordschallenge.model.dto;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.xiaoma.universe.wordschallenge.model.WordsChallengeUserShareRate;
import com.xiaoma.universe.wordschallenge.model.po.VocabularyQuestionPO;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class WordsChallengeSharesDTO implements Serializable {
    private Integer id;
    private Integer userId;
    private String userUrl;
    private Long createdTime;
    private Long updatedTime;
    private String message;
    private Integer hasDone;//是否做过0：做过；1没做过
    private List<VocabularyQuestionPO> listDetail;
    
    
    private Integer precent;
    private Integer rank;
    private Integer teaId;
    private Integer rateId;
    private List<WordsChallengeUserShareRate> threeList;
    private List<WordsChallengeUserShareRate> otherList;
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
	public String getMessage() {
		return message;
	}
	public void setMessage(String message) {
		this.message = message;
	}
	public List<VocabularyQuestionPO> getListDetail() {
		return listDetail;
	}
	public void setListDetail(List<VocabularyQuestionPO> listDetail) {
		this.listDetail = listDetail;
	}
	public Integer getHasDone() {
		return hasDone;
	}
	public void setHasDone(Integer hasDone) {
		this.hasDone = hasDone;
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
	public Integer getRateId() {
		return rateId;
	}
	public void setRateId(Integer rateId) {
		this.rateId = rateId;
	}
    

}
