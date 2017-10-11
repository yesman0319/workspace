/**
 * 
 */
package com.xiaoma.universe.learnplan.domain.vo.web;

/**
 * @author xiaoma
 *
 */
public class PlanLiveLessionVO {
	private int id;
	private String name;
	private boolean isPlaying = false;
	private String startEndTime;
	private String actionName;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public boolean isPlaying() {
		return isPlaying;
	}
	public void setPlaying(boolean isPlaying) {
		this.isPlaying = isPlaying;
	}
	public String getStartEndTime() {
		return startEndTime;
	}
	public void setStartEndTime(String startEndTime) {
		this.startEndTime = startEndTime;
	}
	public String getActionName() {
		return actionName;
	}
	public void setActionName(String actionName) {
		this.actionName = actionName;
	}
	 
	
}
