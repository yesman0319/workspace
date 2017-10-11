package com.xiaoma.universe.learnplan.domain.vo.api.exercise.difficultSentence;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class DifficultSentenceResultVO { 
	private int questionId;
	private AnswerComparedSplitRelultVO resultSplit;
	private AnswerComparedOrganizingResultVO resultOrganizing;
	
	public int getQuestionId() {
		return questionId;
	}
	public void setQuestionId(int questionId) {
		this.questionId = questionId;
	}
	public AnswerComparedSplitRelultVO getResultSplit() {
		return resultSplit;
	}
	public void setResultSplit(AnswerComparedSplitRelultVO resultSplit) {
		this.resultSplit = resultSplit;
	}
	public AnswerComparedOrganizingResultVO getResultOrganizing() {
		return resultOrganizing;
	}
	public void setResultOrganizing(AnswerComparedOrganizingResultVO resultOrganizing) {
		this.resultOrganizing = resultOrganizing;
	}
	 
	
	
}
