package com.xiaoma.universe.learnplan.domain.vo.api;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class PlanDayIsLockVO {

	private Integer whichDay;
	private Integer isLock;//是否解锁 0：否，1是
	public Integer getWhichDay() {
		return whichDay;
	}
	public void setWhichDay(Integer whichDay) {
		this.whichDay = whichDay;
	}
	public Integer getIsLock() {
		return isLock;
	}
	public void setIsLock(Integer isLock) {
		this.isLock = isLock;
	}
	
}
