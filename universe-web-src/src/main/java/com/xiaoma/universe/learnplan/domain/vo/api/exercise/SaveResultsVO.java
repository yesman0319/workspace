package com.xiaoma.universe.learnplan.domain.vo.api.exercise;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class SaveResultsVO {
	private double avg_speed;
	private String avg_speed_format;
	private int group_level;
	public double getAvg_speed() {
		return avg_speed;
	}
	public void setAvg_speed(double avg_speed) {
		this.avg_speed = avg_speed;
	}
	public String getAvg_speed_format() {
		return avg_speed_format;
	}
	public void setAvg_speed_format(String avg_speed_format) {
		this.avg_speed_format = avg_speed_format;
	}
	public int getGroup_level() {
		return group_level;
	}
	public void setGroup_level(int group_level) {
		this.group_level = group_level;
	} 
	
}
