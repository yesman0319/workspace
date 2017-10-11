/**
 * 
 */
package com.xiaoma.universe.learnplan.domain.vo.api;

import java.util.Date;
 

/**
 * @author xiaoma
 *
 */
public class PlanDayInfoVO {
	private int dayId;
	private String dayName;
	private int planId;
	private int dayNumber;
	private Date learnDate;
	private long learnTimeLong;
	private String description;
	private int exerciseCount;
	private int isUnlock;
	private int free;//
	private int lockedNew;
	
	public int getLockedNew() {
		return lockedNew;
	}
	public void setLockedNew(int lockedNew) {
		this.lockedNew = lockedNew;
	}
	public int getFree() {
		return free;
	}
	public void setFree(int free) {
		this.free = free;
	}
	private int isReachTheStandard;//1 达标，0未达标
	private UnLockReasonVO lockedReason;
	
	public int getIsReachTheStandard() {
		return isReachTheStandard;
	}
	public void setIsReachTheStandard(int isReachTheStandard) {
		this.isReachTheStandard = isReachTheStandard;
	}
	public UnLockReasonVO getLockedReason() {
		return lockedReason;
	}
	public void setLockedReason(UnLockReasonVO lockedReason) {
		this.lockedReason = lockedReason;
	}
	public String getDayName() {
		return dayName;
	}
	public void setDayName(String dayName) {
		this.dayName = dayName;
	}
	public int getDayId() {
		return dayId;
	}
	public void setDayId(int dayId) {
		this.dayId = dayId;
	}
 
	public int getExerciseCount() {
		return exerciseCount;
	}
	public void setExerciseCount(int exerciseCount) {
		this.exerciseCount = exerciseCount;
	}
	public int getPlanId() {
		return planId;
	}
	public void setPlanId(int planId) {
		this.planId = planId;
	}
	public int getDayNumber() {
		return dayNumber;
	}
	public void setDayNumber(int dayNumber) {
		this.dayNumber = dayNumber;
	}
	public Date getLearnDate() {
		return learnDate;
	}
	public void setLearnDate(Date learnDate) {
		this.learnDate = learnDate;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public long getLearnTimeLong() {
		return learnTimeLong;
	}
	public void setLearnTimeLong(long learnTimeLong) {
		this.learnTimeLong = learnTimeLong;
	}
	public int getIsUnlock() {
		return isUnlock;
	}
	public void setIsUnlock(int isUnlock) {
		this.isUnlock = isUnlock;
	}
	 
	 
	
}
