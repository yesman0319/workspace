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
public class DifficultSentenceGroupVO { 
	private int id; 
	private String groupName;   
	
	private List<DifficultSentenceQuestionVO> questions;
	private DifficultSentenceResultsVO results;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public List<DifficultSentenceQuestionVO> getQuestions() {
		return questions;
	}
	public void setQuestions(List<DifficultSentenceQuestionVO> questions) {
		this.questions = questions;
	}
	public DifficultSentenceResultsVO getResults() {
		return results;
	}
	
	public void setResults(DifficultSentenceResultsVO results) {
		this.results = results;
	}
	
}
