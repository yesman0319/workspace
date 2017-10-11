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
public class DifficultSentenceResultsVO { 
	private double avg_speed = 0.0; 
	private double rate = 0.0;
	private int group_id; 
	private List<DifficultSentenceResultVO> questionresults;
	
	public double getAvg_speed() {
		return avg_speed;
	}
	public void setAvg_speed(double avg_speed) {
		this.avg_speed = avg_speed;
	}
	public double getRate() {
		return rate;
	}
	public void setRate(double rate) {
		this.rate = rate;
	}
	public int getGroup_id() {
		return group_id;
	}
	public void setGroup_id(int group_id) {
		this.group_id = group_id;
	}
	public List<DifficultSentenceResultVO> getQuestionresults() {
		return questionresults;
	}
	public void setQuestionresults(List<DifficultSentenceResultVO> questionresults) {
		this.questionresults = questionresults;
	} 
	
	
	
}
