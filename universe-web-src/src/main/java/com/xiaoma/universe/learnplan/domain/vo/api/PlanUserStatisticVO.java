/**
 * 
 */
package com.xiaoma.universe.learnplan.domain.vo.api;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude; 
 
public class PlanUserStatisticVO {
	private long totalDoneTime;//总的做题时间
	private int dayCount;//做题天数 
	private int finishExerciseCount;
	
	private Date experienceEndTime;
	private Date experienceStartTime;
	private Date firstUseTime;
	private int isDelete;
	private Date useEndTime;
	private Date useStartTime;
	private int userStatus;
	private Integer totalExerciseCount;
	private Integer estimateTime;

	
	private List<PlanDayInfoStatisticVO> DayStatitic;
	private PlanDayDefaultVisitVO planDayDefaultVisitVO;
	
	public int getIsDelete() {
		return isDelete;
	}
	public void setIsDelete(int isDelete) {
		this.isDelete = isDelete;
	}
	public PlanDayDefaultVisitVO getPlanDayDefaultVisitVO() {
		return planDayDefaultVisitVO;
	}
	public void setPlanDayDefaultVisitVO(PlanDayDefaultVisitVO planDayDefaultVisitVO) {
		this.planDayDefaultVisitVO = planDayDefaultVisitVO;
	}
	public Date getExperienceEndTime() {
		return experienceEndTime;
	}
	public void setExperienceEndTime(Date experienceEndTime) {
		this.experienceEndTime = experienceEndTime;
	}
	public Date getExperienceStartTime() {
		return experienceStartTime;
	}
	public void setExperienceStartTime(Date experienceStartTime) {
		this.experienceStartTime = experienceStartTime;
	}
	public Date getFirstUseTime() {
		return firstUseTime;
	}
	public void setFirstUseTime(Date firstUseTime) {
		this.firstUseTime = firstUseTime;
	}
	public Date getUseEndTime() {
		return useEndTime;
	}
	public void setUseEndTime(Date useEndTime) {
		this.useEndTime = useEndTime;
	}
	public Date getUseStartTime() {
		return useStartTime;
	}
	public void setUseStartTime(Date useStartTime) {
		this.useStartTime = useStartTime;
	}
	public int getUserStatus() {
		return userStatus;
	}
	public void setUserStatus(int userStatus) {
		this.userStatus = userStatus;
	}
	public int getDayCount() {
		return dayCount;
	}
	public void setDayCount(int dayCount) {
		this.dayCount = dayCount;
	}
 
	public long getTotalDoneTime() {
		return totalDoneTime;
	}
	public void setTotalDoneTime(long totalDoneTime) {
		this.totalDoneTime = totalDoneTime;
	}
	public int getFinishExerciseCount() {
		return finishExerciseCount;
	}
	public void setFinishExerciseCount(int finishExerciseCount) {
		this.finishExerciseCount = finishExerciseCount;
	}
	public List<PlanDayInfoStatisticVO> getDayStatitic() {
		return DayStatitic;
	}
	public void setDayStatitic(List<PlanDayInfoStatisticVO> dayStatitic) {
		DayStatitic = dayStatitic;
	}
	 
	public Integer getTotalExerciseCount() {
		return totalExerciseCount;
	}
	public void setTotalExerciseCount(Integer totalExerciseCount) {
		this.totalExerciseCount = totalExerciseCount;
	}
	public Integer getEstimateTime() {
		return estimateTime;
	}
	public void setEstimateTime(Integer estimateTime) {
		this.estimateTime = estimateTime;
	}
	public String getEstimateTimeStr() {
		if (null == estimateTime) {
			return "";
		}
		if (estimateTime > 60) {
			int hours = estimateTime / 60;
			int minutes = estimateTime % 60;
			String str = "";
			if (hours > 0)
				str += hours + "小时";
			if (minutes > 0)
				str += minutes + "分钟";

			return str;
		} else {
			return estimateTime + "分钟";
		}
	}
	
}
