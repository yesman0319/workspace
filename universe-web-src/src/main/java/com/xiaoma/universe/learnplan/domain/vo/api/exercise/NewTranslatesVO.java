package com.xiaoma.universe.learnplan.domain.vo.api.exercise;

import java.util.List;

public class NewTranslatesVO {
	private int status;
	private String groupName;
	private double rate;
	private double avgSpeed;
	private int pointLevel;
	private List<NewTranslateVO> result;
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public List<NewTranslateVO> getResult() {
		return result;
	}
	public void setResult(List<NewTranslateVO> result) {
		this.result = result;
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
	public int getPointLevel() {
		return pointLevel;
	}
	public void setPointLevel(int pointLevel) {
		this.pointLevel = pointLevel;
	}
	
	
}
