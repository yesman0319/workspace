/**
 * 
 */
package com.xiaoma.universe.learnplan.domain.vo.api.exercise.difficultSentence;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * @author xiaoma
 *
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AnswerComparedSplitRelultVO { 
	private int questionId;
	private int isPass; //1 通过，其他为没通过
	private List<String> userAnswer;
	private List<AnswerShowVO> answers;
	private List<AnswerSelectVO> userSelects;
	
	
	public int getQuestionId() {
		return questionId;
	}
	public void setQuestionId(int questionId) {
		this.questionId = questionId;
	}
	public List<String> getUserAnswer() {
		return userAnswer;
	}
	public void setUserAnswer(List<String> userAnswer) {
		this.userAnswer = userAnswer;
	}
	public List<AnswerSelectVO> getUserSelects() {
		return userSelects;
	}
	public void setUserSelects(List<AnswerSelectVO> userSelects) {
		this.userSelects = userSelects;
	}
	public int getIsPass() {
		return isPass;
	}
	public void setIsPass(int isPass) {
		this.isPass = isPass;
	}
	public List<AnswerShowVO> getAnswers() {
		return answers;
	}
	public void setAnswers(List<AnswerShowVO> answers) {
		this.answers = answers;
	}
	
	
}
