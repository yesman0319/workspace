package com.xiaoma.universe.videomanage.model.vo;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LessionsDetailForWeb  implements Serializable {
	private Integer id;//视频课程的id
    private String name;//视频课程的名字
    private Integer videoId;//视频库的id
    private String duration;//时长
    private String canSee;//是否可看
    private String hasSee;//是否已经看过
    private String id1;//
    
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
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
	public String getId1() {
		return id1;
	}
	public void setId1(String id1) {
		this.id1 = id1;
	}
    
}
