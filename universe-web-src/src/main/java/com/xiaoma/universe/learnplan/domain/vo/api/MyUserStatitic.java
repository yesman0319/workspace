package com.xiaoma.universe.learnplan.domain.vo.api;

public class MyUserStatitic {
	private Integer totalDoneTime;

	private Integer dayCount;

	private Integer finishExerciseCount;

	private Integer userStatus;

	private Integer estimateTime;

	private Integer totalExerciseCount;

	private Integer isDelete;

	public Integer getTotalDoneTime() {
		return totalDoneTime;
	}

	public void setTotalDoneTime(Integer totalDoneTime) {
		this.totalDoneTime = totalDoneTime;
	}

	public Integer getDayCount() {
		return dayCount;
	}

	public void setDayCount(Integer dayCount) {
		this.dayCount = dayCount;
	}

	public Integer getFinishExerciseCount() {
		return finishExerciseCount;
	}

	public void setFinishExerciseCount(Integer finishExerciseCount) {
		this.finishExerciseCount = finishExerciseCount;
	}

	public Integer getUserStatus() {
		return userStatus;
	}

	public void setUserStatus(Integer userStatus) {
		this.userStatus = userStatus;
	}

	public Integer getEstimateTime() {
		return estimateTime;
	}

	public void setEstimateTime(Integer estimateTime) {
		this.estimateTime = estimateTime;
	}

	public Integer getTotalExerciseCount() {
		return totalExerciseCount;
	}

	public void setTotalExerciseCount(Integer totalExerciseCount) {
		this.totalExerciseCount = totalExerciseCount;
	}

	public Integer getIsDelete() {
		return isDelete;
	}

	public void setIsDelete(Integer isDelete) {
		this.isDelete = isDelete;
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
