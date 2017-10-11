/**
 * 
 */
package com.xiaoma.universe.learnplan.domain.vo.api;

import java.util.Date;

/**
 * @author xiaoma
 *
 */
public class PlanDayInfoStatisticVO {
	private int dayId;
	private int finish;
	private long hasDoneTime;
	private int doneExerciseCount;
	 
	public int getDayId() {
		return dayId;
	}
	public void setDayId(int dayId) {
		this.dayId = dayId;
	}
	public long getHasDoneTime() {
		return hasDoneTime;
	}
	public void setHasDoneTime(long hasDoneTime) {
		this.hasDoneTime = hasDoneTime;
	}
	public int getDoneExerciseCount() {
		return doneExerciseCount;
	}
	public void setDoneExerciseCount(int doneExerciseCount) {
		this.doneExerciseCount = doneExerciseCount;
	}
	public int getFinish() {
		return finish;
	}
	public void setFinish(int finish) {
		this.finish = finish;
	}
 
	
}
