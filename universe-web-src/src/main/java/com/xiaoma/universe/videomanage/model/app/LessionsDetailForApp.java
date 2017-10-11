package com.xiaoma.universe.videomanage.model.app;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.xiaoma.universe.information.model.BaseEntity;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LessionsDetailForApp extends BaseEntity implements Serializable {
    private String name;//视频课程的名字
    private Integer videoId;//视频库的id
    private String duration;//时长
    private String canSee;//是否可看	（0:点击观看，1:点击试看，2：需要购买后观看）
    private String hasSee;//是否已经看过（0：已看过；1：未看过）
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getVideoId() {
		return videoId;
	}
	public void setVideoId(Integer videoId) {
		this.videoId = videoId;
	}
	public String getDuration() {
		return duration;
	}
	public void setDuration(String duration) {
		this.duration = duration;
	}
	public String getCanSee() {
		return canSee;
	}
	public void setCanSee(String canSee) {
		this.canSee = canSee;
	}
	public String getHasSee() {
		return hasSee;
	}
	public void setHasSee(String hasSee) {
		this.hasSee = hasSee;
	}
    
}
