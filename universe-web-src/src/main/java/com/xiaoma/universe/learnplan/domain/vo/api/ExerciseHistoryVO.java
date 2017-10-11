package com.xiaoma.universe.learnplan.domain.vo.api;

import java.util.Date; 
public class ExerciseHistoryVO {
private Integer id;
	
	private String number;
	private Integer moduleId;
	private String moduleName;
	private Integer levelOne;
	private Integer levelTwo;
	private Integer levelThree;
	private String originName;
	private String moduleUuid;
	private String downLoadZip;
	private String kind;
	private String estimateTime;

	private Integer userId;
	private String userName;
	private String nickName;
	private Integer customPlanId;
	private Integer planDayExerciseId;
	private Integer planId;
	private String planName;
	private Integer planDayId;
	private Integer isDone;
	private Date startTime;//开始做题的时间
	private Date endTime;//结束做题的时间
	private Long perExerciseTime;//做题的时长
	private String userPicture;
	private Date createDate;
	private Date createTime;
	private Date updateTime;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	
	public Integer getModuleId() {
		return moduleId;
	}
	public void setModuleId(Integer moduleId) {
		this.moduleId = moduleId;
	}
	public String getModuleName() {
		return moduleName;
	}
	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}
	public Integer getLevelOne() {
		return levelOne;
	}
	public void setLevelOne(Integer levelOne) {
		this.levelOne = levelOne;
	}
	public Integer getLevelTwo() {
		return levelTwo;
	}
	public void setLevelTwo(Integer levelTwo) {
		this.levelTwo = levelTwo;
	}
	public Integer getLevelThree() {
		return levelThree;
	}
	public void setLevelThree(Integer levelThree) {
		this.levelThree = levelThree;
	}
	public String getOriginName() {
		return originName;
	}
	public void setOriginName(String originName) {
		this.originName = originName;
	}
	public String getModuleUuid() {
		return moduleUuid;
	}
	public void setModuleUuid(String moduleUuid) {
		this.moduleUuid = moduleUuid;
	}
	public String getDownLoadZip() {
		return downLoadZip;
	}
	public void setDownLoadZip(String downLoadZip) {
		this.downLoadZip = downLoadZip;
	}
	public String getKind() {
		return kind;
	}
	public void setKind(String kind) {
		this.kind = kind;
	}
	public String getEstimateTime() {
		return estimateTime;
	}
	public void setEstimateTime(String estimateTime) {
		this.estimateTime = estimateTime;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public Integer getCustomPlanId() {
		return customPlanId;
	}
	public void setCustomPlanId(Integer customPlanId) {
		this.customPlanId = customPlanId;
	}
	public Integer getPlanDayExerciseId() {
		return planDayExerciseId;
	}
	public void setPlanDayExerciseId(Integer planDayExerciseId) {
		this.planDayExerciseId = planDayExerciseId;
	}
	public Integer getPlanId() {
		return planId;
	}
	public void setPlanId(Integer planId) {
		this.planId = planId;
	}
	public Integer getPlanDayId() {
		return planDayId;
	}
	public void setPlanDayId(Integer planDayId) {
		this.planDayId = planDayId;
	}
	public Integer getIsDone() {
		return isDone;
	}
	public void setIsDone(Integer isDone) {
		this.isDone = isDone;
	}
	public Date getStartTime() {
		return startTime;
	}
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	public Date getEndTime() {
		return endTime;
	}
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	public Long getPerExerciseTime() {
		return perExerciseTime;
	}
	public void setPerExerciseTime(Long perExerciseTime) {
		this.perExerciseTime = perExerciseTime;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public String getUserPicture() {
		return userPicture;
	}
	public void setUserPicture(String userPicture) {
		this.userPicture = userPicture;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getNickName() {
		return nickName;
	}
	public void setNickName(String nickName) {
		this.nickName = nickName;
	}
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	public String getPlanName() {
		return planName;
	}
	public void setPlanName(String planName) {
		this.planName = planName;
	}
	
	/**
	 * 字符串时间戳
	 * 
	 * @return
	 */
	public String getTimeStr() {
		if (null == createTime) {
			return "1分钟前";
		}
		long l = new Date().getTime() - createTime.getTime();
		long day = l / (24 * 60 * 60 * 1000);

		if (day > 0) {
			if (day == 1) {
				return "昨天";
			} else {
				return day + "天前";
			}
		}
		long hour = (l / (60 * 60 * 1000) - day * 24);
		if (hour > 0) {
			return hour + "小时前";
		}
		long min = ((l / (60 * 1000)) - day * 24 * 60 - hour * 60);

		if (min > 0) {
			return min + "分钟前";
		}
		long s = (l / 1000 - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60);

		if (s > 0) {
			return s + "秒前";
		}
		
		return "1分钟前";
	}
	
}
