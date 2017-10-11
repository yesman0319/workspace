package com.xiaoma.universe.learnplan.domain.vo.api;

public class PlanDayDefaultVisitVO {

	private int lastVisitDayId;//上次练习天的ID
	private int lastDayNumber;//上次 练习的天编号
	private String lastDayName;//上次 练习的节(天)名称
	private String lastPracticeTime;//上次练习时间
	private long lastTotalTime;//总共练习时间
	
	
	public int getLastDayNumber() {
		return lastDayNumber;
	}
	public void setLastDayNumber(int lastDayNumber) {
		this.lastDayNumber = lastDayNumber;
	}
	public int getLastVisitDayId() {
		return lastVisitDayId;
	}
	public void setLastVisitDayId(int lastVisitDayId) {
		this.lastVisitDayId = lastVisitDayId;
	}
	public String getLastDayName() {
		return lastDayName;
	}
	public void setLastDayName(String lastDayName) {
		this.lastDayName = lastDayName;
	}
	public String getLastPracticeTime() {
		return lastPracticeTime;
	}
	public void setLastPracticeTime(String lastPracticeTime) {
		this.lastPracticeTime = lastPracticeTime;
	}
	public long getLastTotalTime() {
		return lastTotalTime;
	}
	public void setLastTotalTime(long lastTotalTime) {
		this.lastTotalTime = lastTotalTime;
	}
	
}
