package com.xiaoma.universe.learnplan.domain.vo.api;

import java.util.Date;
import java.util.List;

import com.xiaoma.rest.authentication.TeacherInfo; 
public class PlanDayDetailVO {
	//卡片基本信息
	private Integer planId; //计划ID
	private String planName;//计划名称
	private String pianPicture;
	private Integer planIsPay;//是否需要付费
	private Integer planLearnNumber;//开启的人数统计
	private Integer planTotalDayNumber;//此计划的总天数
	private String planBackgroudPic;//背景图   
	private int planTotalExercises; //总的练习数目
	private int planTotalDay;//计划总天数 
	
	private int dayId;
	private String dayName;
	private int dayNumber;
	private Date learnDate;
	private long learnTimeLong;
	private String description;
	private int exerciseCount;
	private int isUnlock;
	private int defaultVisit;
	
	private int planStatus;//app页面底层按钮显示状态
	
	//图片
	private String imageWebList;
	private String imageWebDetail;
	private String imageAppList;
	private String imageAppDetail;
	private String imageWebColor;
	//节（天）的详情
	private List<PlanDayInfoVO> planDays; 
	//节（天） 下的练习题
	private List<PlanDayExerciseVO> exercises; 
	
	private List<PlanDayExerciseKindResult> planDayExerciseKindResultList;
	
	private PlanUserOneDayStatisticVO userStatitic; //用户做题情况  
	
	private TeacherInfo teacher; //教师情况
	
	public TeacherInfo getTeacher() {
		return teacher;
	}
	public void setTeacher(TeacherInfo teacher) {
		this.teacher = teacher;
	}
	public int getPlanStatus() {
		return planStatus;
	}


	public void setPlanStatus(int planStatus) {
		this.planStatus = planStatus;
	}


	public Integer getPlanId() {
		return planId;
	}


	public void setPlanId(Integer planId) {
		this.planId = planId;
	}


	public String getPlanName() {
		return planName;
	}


	public void setPlanName(String planName) {
		this.planName = planName;
	}


	public String getPianPicture() {
		return pianPicture;
	}


	public void setPianPicture(String pianPicture) {
		this.pianPicture = pianPicture;
	}


	public Integer getPlanIsPay() {
		return planIsPay;
	}


	public void setPlanIsPay(Integer planIsPay) {
		this.planIsPay = planIsPay;
	}


	public Integer getPlanLearnNumber() {
		return planLearnNumber;
	}


	public void setPlanLearnNumber(Integer planLearnNumber) {
		this.planLearnNumber = planLearnNumber;
	}


	public Integer getPlanTotalDayNumber() {
		return planTotalDayNumber;
	}


	public void setPlanTotalDayNumber(Integer planTotalDayNumber) {
		this.planTotalDayNumber = planTotalDayNumber;
	}


	public String getPlanBackgroudPic() {
		return planBackgroudPic;
	}


	public void setPlanBackgroudPic(String planBackgroudPic) {
		this.planBackgroudPic = planBackgroudPic;
	}


	public int getPlanTotalExercises() {
		return planTotalExercises;
	}


	public void setPlanTotalExercises(int planTotalExercises) {
		this.planTotalExercises = planTotalExercises;
	}


	public int getPlanTotalDay() {
		return planTotalDay;
	}


	public void setPlanTotalDay(int planTotalDay) {
		this.planTotalDay = planTotalDay;
	}


	public List<PlanDayExerciseVO> getExercises() {
		return exercises;
	}


	public void setExercises(List<PlanDayExerciseVO> exercises) {
		this.exercises = exercises;
	}


	public PlanUserOneDayStatisticVO getUserStatitic() {
		return userStatitic;
	}


	public void setUserStatitic(PlanUserOneDayStatisticVO userStatitic) {
		this.userStatitic = userStatitic;
	}


	public int getDayId() {
		return dayId;
	}


	public void setDayId(int dayId) {
		this.dayId = dayId;
	}


	public String getDayName() {
		return dayName;
	}


	public void setDayName(String dayName) {
		this.dayName = dayName;
	}


	public int getDayNumber() {
		return dayNumber;
	}


	public void setDayNumber(int dayNumber) {
		this.dayNumber = dayNumber;
	}


	public Date getLearnDate() {
		return learnDate;
	}


	public void setLearnDate(Date learnDate) {
		this.learnDate = learnDate;
	}


	public long getLearnTimeLong() {
		return learnTimeLong;
	}


	public void setLearnTimeLong(long learnTimeLong) {
		this.learnTimeLong = learnTimeLong;
	}


	public String getDescription() {
		return description;
	}


	public void setDescription(String description) {
		this.description = description;
	}


	public int getExerciseCount() {
		return exerciseCount;
	}


	public void setExerciseCount(int exerciseCount) {
		this.exerciseCount = exerciseCount;
	}


	public int getIsUnlock() {
		return isUnlock;
	}


	public void setIsUnlock(int isUnlock) {
		this.isUnlock = isUnlock;
	}


	public List<PlanDayInfoVO> getPlanDays() {
		return planDays;
	}


	public void setPlanDays(List<PlanDayInfoVO> planDays) {
		this.planDays = planDays;
	}

	public int getDefaultVisit() {
		return defaultVisit;
	}

	public void setDefaultVisit(int defaultVisit) {
		this.defaultVisit = defaultVisit;
	}


	public String getImageWebList() {
		return imageWebList;
	}


	public void setImageWebList(String imageWebList) {
		this.imageWebList = imageWebList;
	}


	public String getImageWebDetail() {
		return imageWebDetail;
	}


	public void setImageWebDetail(String imageWebDetail) {
		this.imageWebDetail = imageWebDetail;
	}


	public String getImageAppList() {
		return imageAppList;
	}


	public void setImageAppList(String imageAppList) {
		this.imageAppList = imageAppList;
	}


	public String getImageAppDetail() {
		return imageAppDetail;
	}


	public void setImageAppDetail(String imageAppDetail) {
		this.imageAppDetail = imageAppDetail;
	}


	public String getImageWebColor() {
		return imageWebColor;
	}


	public void setImageWebColor(String imageWebColor) {
		this.imageWebColor = imageWebColor;
	}
	public List<PlanDayExerciseKindResult> getPlanDayExerciseKindResultList() {
		return planDayExerciseKindResultList;
	}
	public void setPlanDayExerciseKindResultList(List<PlanDayExerciseKindResult> planDayExerciseKindResultList) {
		this.planDayExerciseKindResultList = planDayExerciseKindResultList;
	}
 
}
