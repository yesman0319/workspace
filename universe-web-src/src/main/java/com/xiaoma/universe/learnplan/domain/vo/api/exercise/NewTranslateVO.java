package com.xiaoma.universe.learnplan.domain.vo.api.exercise;

public class NewTranslateVO {
	private Integer groupId;
	private Integer questionId;
	private Integer questionSequenceNumber;
	private String english;
	private String chinese;
	private String tip;
	private String userAnswer;
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
	public Integer getQuestionSequenceNumber() {
		return questionSequenceNumber;
	}
	public void setQuestionSequenceNumber(Integer questionSequenceNumber) {
		this.questionSequenceNumber = questionSequenceNumber;
	}
	public String getEnglish() {
		return english;
	}
	public void setEnglish(String english) {
		this.english = english;
	}
	public String getChinese() {
		return chinese;
	}
	public void setChinese(String chinese) {
		this.chinese = chinese;
	}
	public String getTip() {
		return tip;
	}
	public void setTip(String tip) {
		this.tip = tip;
	}
	public String getUserAnswer() {
		return userAnswer;
	}
	public void setUserAnswer(String userAnswer) {
		this.userAnswer = userAnswer;
	}
	
}
