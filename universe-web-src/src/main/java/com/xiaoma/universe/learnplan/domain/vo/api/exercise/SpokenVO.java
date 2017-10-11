package com.xiaoma.universe.learnplan.domain.vo.api.exercise;

public class SpokenVO {
	private Integer groupId;
	private Integer questionId;
	private Integer questionSeq;
	private String en;
	private String audioUrl;
	private String userAudioUrl;

	
	public String getUserAudioUrl() {
		return userAudioUrl;
	}

	public void setUserAudioUrl(String userAudioUrl) {
		this.userAudioUrl = userAudioUrl;
	}

	public Integer getGroupId() {
		return groupId;
	}

	public void setGroupId(Integer groupId) {
		this.groupId = groupId;
	}

	public Integer getQuestionId() {
		return questionId;
	}

	public void setQuestionId(Integer questionId) {
		this.questionId = questionId;
	}

	public Integer getQuestionSeq() {
		return questionSeq;
	}

	public void setQuestionSeq(Integer questionSeq) {
		this.questionSeq = questionSeq;
	}

	public String getEn() {
		return en;
	}

	public void setEn(String en) {
		this.en = en;
	}

	public String getAudioUrl() {
		return audioUrl;
	}

	public void setAudioUrl(String audioUrl) {
		this.audioUrl = audioUrl;
	}

}
