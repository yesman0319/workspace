/**
 * 
 */
package com.xiaoma.universe.microcourse.domain.vo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * @author xiaoma
 *
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MicroCourseUserStatusVO {
	private int delete; //是否删除 1删除
	private int status; //0 没订阅，1 已经订阅没过期，2 已经订阅没到使用时间3 订阅已经过期
	
	private Date startDate;
	private Date endDate;

	private Integer userlearnCount;
	
	
	public Integer getUserlearnCount() {
		return userlearnCount;
	}
	public void setUserlearnCount(Integer userlearnCount) {
		this.userlearnCount = userlearnCount;
	}
	public int getDelete() {
		return delete;
	}
	public void setDelete(int delete) {
		this.delete = delete;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	
	public Date getStartDate() {
		return startDate;
	}
	public void setStartDate(Date startDate) {
		this.startDate = startDate;
	}
	public Date getEndDate() {
		return endDate;
	}
	public void setEndDate(Date endDate) {
		this.endDate = endDate;
	}
	
	
}
