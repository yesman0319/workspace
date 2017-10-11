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
public class QuestionComparedSplitVO { 
	private int questionId;
	private List<String> userAnswer;
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
	
}
