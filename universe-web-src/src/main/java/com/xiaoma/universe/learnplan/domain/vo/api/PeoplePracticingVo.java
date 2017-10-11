package com.xiaoma.universe.learnplan.domain.vo.api;

import java.util.Date;

import org.apache.commons.lang.StringUtils;


/**
 * @Title:获取大家都在练习的 题用户
 * @Description: TODO
 * @author xiaoma
 * @since 2016年9月7日
 * @version V1.0
 */
public class PeoplePracticingVo {
	private Date createDate;
	private Date createTime;
	private Integer customPlanId;
	private String downLoadZip;
	private Date endTime;
	private String estimateTime;
	private Integer id;
	private Boolean isDone;
	private String kind;
	private Integer levelOne;
	private Integer levelTwo;
	private Integer moduleId;
	private String moduleName;// 模块名称
	private String moduleUuid;
	private String nickName;// 昵称
	private String number;
	private String originName;// 练习的名称
	private Integer perExerciseTime;
	private Integer planDayExerciseId;
	private Integer planDayId;
	private Integer planId;// 计划ID
	private Date startTime;
	private Date updateTime;// 更新时间
	private String userId;// 用户ID;
	private String userName;// 用户名
	private String userPicture;// 头像

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

	public Integer getCustomPlanId() {
		return customPlanId;
	}

	public void setCustomPlanId(Integer customPlanId) {
		this.customPlanId = customPlanId;
	}

	public String getDownLoadZip() {
		return downLoadZip;
	}

	public void setDownLoadZip(String downLoadZip) {
		this.downLoadZip = downLoadZip;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public String getEstimateTime() {
		return estimateTime;
	}

	public void setEstimateTime(String estimateTime) {
		this.estimateTime = estimateTime;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Boolean getIsDone() {
		return isDone;
	}

	public void setIsDone(Boolean isDone) {
		this.isDone = isDone;
	}

	public String getKind() {
		return kind;
	}

	public void setKind(String kind) {
		this.kind = kind;
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

	public String getModuleUuid() {
		return moduleUuid;
	}

	public void setModuleUuid(String moduleUuid) {
		this.moduleUuid = moduleUuid;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public String getNumber() {
		return number;
	}

	public void setNumber(String number) {
		this.number = number;
	}

	public String getOriginName() {
		return originName;
	}

	public void setOriginName(String originName) {
		this.originName = originName;
	}

	public Integer getPerExerciseTime() {
		return perExerciseTime;
	}

	public void setPerExerciseTime(Integer perExerciseTime) {
		this.perExerciseTime = perExerciseTime;
	}

	public Integer getPlanDayExerciseId() {
		return planDayExerciseId;
	}

	public void setPlanDayExerciseId(Integer planDayExerciseId) {
		this.planDayExerciseId = planDayExerciseId;
	}

	public Integer getPlanDayId() {
		return planDayId;
	}

	public void setPlanDayId(Integer planDayId) {
		this.planDayId = planDayId;
	}

	public Integer getPlanId() {
		return planId;
	}

	public void setPlanId(Integer planId) {
		this.planId = planId;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getUserPicture() {
		return userPicture;
	}

	public void setUserPicture(String userPicture) {
		this.userPicture = userPicture;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public  String getNickNameStr(){		
		if(StringUtils.isNotBlank(nickName)&&com.xiaoma.universe.common.utils.StringUtils.isMobileNO(nickName)){
			return nickName.substring(0,3)+"****"+nickName.substring(7,nickName.length());
		}else {
			return nickName;
		}		
	}
	/**
	 * 字符串时间戳
	 * 
	 * @return
	 */
	public String getTimeStr() {
		if (null == updateTime) {
			return "1分钟前";
		}

		long l = new Date().getTime() - updateTime.getTime();
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
