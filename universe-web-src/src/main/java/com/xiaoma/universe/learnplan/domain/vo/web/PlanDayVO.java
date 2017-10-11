/**
 * 
 */
package com.xiaoma.universe.learnplan.domain.vo.web;

/**
 * @author xiaoma
 *
 */
public class PlanDayVO {
	private int id;
	private String dayNumName;
	private String dayName;
	private String timeString;
	private String exercisesString;
	private boolean unlock;
	private int iconType;
	
	
	public int getIconType() {
		return iconType;
	}
	public void setIconType(int iconType) {
		this.iconType = iconType;
	}
	public boolean isUnlock() {
		return unlock;
	}
	public void setUnlock(boolean unlock) {
		this.unlock = unlock;
	}
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getDayNumName() {
		return dayNumName;
	}
	public void setDayNumName(String dayNumName) {
		this.dayNumName = dayNumName;
	}
	public String getDayName() {
		return dayName;
	}
	public void setDayName(String dayName) {
		this.dayName = dayName;
	}
	public String getTimeString() {
		return timeString;
	}
	public void setTimeString(String timeString) {
		this.timeString = timeString;
	}
	public String getExercisesString() {
		return exercisesString;
	}
	public void setExercisesString(String exercisesString) {
		this.exercisesString = exercisesString;
	}
	
}
