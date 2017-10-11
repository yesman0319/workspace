/**
 * 
 */
package com.xiaoma.universe.learnplan.domain.vo.api;

import java.util.Date;

/**
 * @author xiaoma
 *
 */
public class VideoUserStatus {
	private Date endTime; 
	private int defaultLessionId;
	private int defaultVideoId;
	private int defaultCourseId;
	
	public int getDefaultCourseId() {
		return defaultCourseId;
	}
	public void setDefaultCourseId(int defaultCourseId) {
		this.defaultCourseId = defaultCourseId;
	}
	public Date getEndTime() {
		return endTime;
	}
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	public int getDefaultLessionId() {
		return defaultLessionId;
	}
	public void setDefaultLessionId(int defaultLessionId) {
		this.defaultLessionId = defaultLessionId;
	}
	public int getDefaultVideoId() {
		return defaultVideoId;
	}
	public void setDefaultVideoId(int defaultVideoId) {
		this.defaultVideoId = defaultVideoId;
	} 
	
	
}
