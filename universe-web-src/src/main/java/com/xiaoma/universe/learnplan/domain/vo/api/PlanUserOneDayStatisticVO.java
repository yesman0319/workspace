/**
 * 
 */
package com.xiaoma.universe.learnplan.domain.vo.api;
 

/**
 * @author xiaoma
 *
 */ 
public class PlanUserOneDayStatisticVO { 
	
	private long planTotalDoneTime;//总的做题时间
	private int planFinishDayCount;//做题天数 
	private int planTotalFinishExerciseCount;
	
	private int Dayfinish;
	
	private long DayHasDoneTime;
	private int DaydoneExerciseCount;
	private int userStatus;
	private int isDelete;
	
	public int getIsDelete() {
		return isDelete;
	}
	public void setIsDelete(int isDelete) {
		this.isDelete = isDelete;
	}
	public int getUserStatus() {
		return userStatus;
	}
	public void setUserStatus(int userStatus) {
		this.userStatus = userStatus;
	}
	private PlanDayDefaultVisitVO planDayDefaultVisitVO;
	
	public int getDayfinish() {
		return Dayfinish;
	}
	public void setDayfinish(int dayfinish) {
		Dayfinish = dayfinish;
	}
	public long getDayHasDoneTime() {
		return DayHasDoneTime;
	}
	
	public long getPlanTotalDoneTime() {
		return planTotalDoneTime;
	}
	public void setPlanTotalDoneTime(long planTotalDoneTime) {
		this.planTotalDoneTime = planTotalDoneTime;
	}
	 
	public int getPlanFinishDayCount() {
		return planFinishDayCount;
	}
	public void setPlanFinishDayCount(int planFinishDayCount) {
		this.planFinishDayCount = planFinishDayCount;
	}
	public int getPlanTotalFinishExerciseCount() {
		return planTotalFinishExerciseCount;
	}
	public void setPlanTotalFinishExerciseCount(int planTotalFinishExerciseCount) {
		this.planTotalFinishExerciseCount = planTotalFinishExerciseCount;
	}
 
	public void setDayHasDoneTime(long dayHasDoneTime) {
		DayHasDoneTime = dayHasDoneTime;
	}
	public int getDaydoneExerciseCount() {
		return DaydoneExerciseCount;
	}
	public void setDaydoneExerciseCount(int daydoneExerciseCount) {
		DaydoneExerciseCount = daydoneExerciseCount;
	}
	public PlanDayDefaultVisitVO getPlanDayDefaultVisitVO() {
		return planDayDefaultVisitVO;
	}
	public void setPlanDayDefaultVisitVO(PlanDayDefaultVisitVO planDayDefaultVisitVO) {
		this.planDayDefaultVisitVO = planDayDefaultVisitVO;
	}
	
    
}
