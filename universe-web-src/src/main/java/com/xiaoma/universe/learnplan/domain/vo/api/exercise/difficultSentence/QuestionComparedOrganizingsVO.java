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
public class QuestionComparedOrganizingsVO { 
	private int questionId;
	private List<QuestionComparedOrganizingVO> userAnswer;
	
	public int getQuestionId() {
		return questionId;
	}
	public void setQuestionId(int questionId) {
		this.questionId = questionId;
	}
	public List<QuestionComparedOrganizingVO> getUserAnswer() {
		return userAnswer;
	}
	public void setUserAnswer(List<QuestionComparedOrganizingVO> userAnswer) {
		this.userAnswer = userAnswer;
	}
	
}
