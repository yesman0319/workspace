package com.xiaoma.universe.learnplan.domain.vo.api;

import java.util.List;

/**
 * 我的计划
 * 
 * @Title:
 * @Description: TODO
 * @author xiaoma
 * @since 2016年9月6日
 * @version V1.0
 */
public class MyPlanVo {
	private Integer hasDoneNumber;// 已做题数
	private Integer hasDoneTime;// 已做时间

	private Integer insistDays;// 坚持天数
	private Integer takePartInPlanNumber;// 参与计划
	private Integer exerciseDays;//练习天数
	private List<MyCustomPlanVO> customPlanVOS;// 计划详情
	
	private Integer userDefaultPlanId;  //用户默认的计划ID

	public Integer getUserDefaultPlanId() {
		return userDefaultPlanId;
	}

	public void setUserDefaultPlanId(Integer userDefaultPlanId) {
		this.userDefaultPlanId = userDefaultPlanId;
	}

	public void setHasDoneTimeStr(String hasDoneTimeStr) {
		this.hasDoneTimeStr = hasDoneTimeStr;
	}

	public Integer getHasDoneNumber() {
		return null == hasDoneNumber ? 0 : hasDoneNumber;
	}

	public void setHasDoneNumber(Integer hasDoneNumber) {
		this.hasDoneNumber = hasDoneNumber;
	}

	public Integer getHasDoneTime() {
		return null == hasDoneTime ? 0 : hasDoneTime;
	}

	public void setHasDoneTime(Integer hasDoneTime) {
		this.hasDoneTime = hasDoneTime;
	}

	public Integer getInsistDays() {
		return null == insistDays ? 0 : insistDays;
	}

	public void setInsistDays(Integer insistDays) {
		this.insistDays = insistDays;
	}

	public List<MyCustomPlanVO> getCustomPlanVOS() {
		return customPlanVOS;
	}

	public void setCustomPlanVOS(List<MyCustomPlanVO> customPlanVOS) {
		this.customPlanVOS = customPlanVOS;
	}

	public Integer getTakePartInPlanNumber() {
		return null == takePartInPlanNumber ? 0 : takePartInPlanNumber;
	}

	public void setTakePartInPlanNumber(Integer takePartInPlanNumber) {
		this.takePartInPlanNumber = takePartInPlanNumber;
	}
	public Integer getExerciseDays() {
		return exerciseDays;
	}

	public void setExerciseDays(Integer exerciseDays) {
		this.exerciseDays = exerciseDays;
	}



	private String hasDoneTimeStr;
	public Integer getHasDoneTimeNum() {
		this.hasDoneTimeStr = "分";
		hasDoneTime = hasDoneTime / 1000;
		if (hasDoneTime < 60) { // 秒
			return 0;
		}
		hasDoneTime = hasDoneTime / 60;
		if (hasDoneTime < 60) { // 分
			return hasDoneTime;
		} else {
			this.hasDoneTimeStr = "时";
			return hasDoneTime / 60; // 时
		}
	}

	public String getHasDoneTimeStr() {
		return hasDoneTimeStr;
	}

}
