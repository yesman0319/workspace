package com.xiaoma.universe.learnplan.domain.vo.api.exercise;

import java.util.List;


public class NewSentenceTranslateDTO {
	private int groupId;
	private double rate;
	private double avgSpeed;
	private List<NewSentenceTranslateResultDTO> results;
	public int getGroupId() {
		return groupId;
	}
	public void setGroupId(int groupId) {
		this.groupId = groupId;
	}
	public double getRate() {
		return rate;
	}
	public void setRate(double rate) {
		this.rate = rate;
	}
	public double getAvgSpeed() {
		return avgSpeed;
	}
	public void setAvgSpeed(double avgSpeed) {
		this.avgSpeed = avgSpeed;
	}
	public List<NewSentenceTranslateResultDTO> getResults() {
		return results;
	}
	public void setResults(List<NewSentenceTranslateResultDTO> results) {
		this.results = results;
	}
	
}
