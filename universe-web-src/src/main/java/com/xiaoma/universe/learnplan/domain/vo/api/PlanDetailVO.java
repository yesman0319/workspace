package com.xiaoma.universe.learnplan.domain.vo.api;

import java.util.List;

import com.xiaoma.rest.authentication.TeacherInfo;

public class PlanDetailVO {
	//卡片基本信息
	private int id; //计划ID
	private String name;//计划名称 
	private String planSummary;//计划简介 
	private String planSummaryShare;
	
	private String fitPeople;//试用人群 
	private int isPay;//是否需要付费
	private int learnNumber;//开启的人数统计
	private int totalDayNumber;//此计划的总天数 
	private int hasDone; //是否做过 1 做过
	private int totalExercises; //总的练习数目
	private int totalDay;//总天数
	private double localPrice;//价格
	private int liveProductId;
	private int courseId;
	private int audioCourseId;
	//图片
	private String imageWebList;
	private String imageWebDetail;
	private String imageAppList;
	private String imageAppDetail;
	private String imageWebColor;

	private int defaultFollowDayId;//默认的跟时间走的 learnDate是今天的dayId
	private int isFollowTime; 
	private int dayFollowNumber;//对应defaultFollowDayId

	private int isPublish;//0:未发布 ，1:发布
	private int planStatus; //状态
	private List<PlanDayInfoVO> planDays; 
	
	//节（天） 下的练习题
	private List<PlanDayExerciseVO> exercises; 

	private List<InformationVO> informations;
	
	private PlanUserStatisticVO userStatitic; //用户做题情况 
	
	private PlanGoodInfoVO  goodInfo;

	private List<VideosVO> videosVO;
	private List<AudiosVO> audios;
	private VideoUserStatus videoUserStatus;
	
	private TeacherInfo teacher; //教师情况
	
	public TeacherInfo getTeacher() {
		return teacher;
	}
	public void setTeacher(TeacherInfo teacher) {
		this.teacher = teacher;
	}
	public int getIsPublish() {
		return isPublish;
	}

	public void setIsPublish(int isPublish) {
		this.isPublish = isPublish;
	}

	public String getPlanSummaryShare() {
		return planSummaryShare;
	}

	public void setPlanSummaryShare(String planSummaryShare) {
		this.planSummaryShare = planSummaryShare;
	}

	public int getDefaultFollowDayId() {
		return defaultFollowDayId;
	}

	public void setDefaultFollowDayId(int defaultFollowDayId) {
		this.defaultFollowDayId = defaultFollowDayId;
	}

	public int getIsFollowTime() {
		return isFollowTime;
	}

	public void setIsFollowTime(int isFollowTime) {
		this.isFollowTime = isFollowTime;
	}

	public int getDayFollowNumber() {
		return dayFollowNumber;
	}

	public void setDayFollowNumber(int dayFollowNumber) {
		this.dayFollowNumber = dayFollowNumber;
	}

	public VideoUserStatus getVideoUserStatus() {
		return videoUserStatus;
	}

	public void setVideoUserStatus(VideoUserStatus videoUserStatus) {
		this.videoUserStatus = videoUserStatus;
	}

	 
	public List<VideosVO> getVideosVO() {
		return videosVO;
	}

	public void setVideosVO(List<VideosVO> videosVO) {
		this.videosVO = videosVO;
	}

	public int getCourseId() {
		return courseId;
	}

	public void setCourseId(int courseId) {
		this.courseId = courseId;
	}

	public int getLiveProductId() {
		return liveProductId;
	}

	public void setLiveProductId(int liveProductId) {
		this.liveProductId = liveProductId;
	}

	public int getPlanStatus() {
		return planStatus;
	}

	public void setPlanStatus(int planStatus) {
		this.planStatus = planStatus;
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

	public List<InformationVO> getInformations() {
		return informations;
	}

	public void setInformations(List<InformationVO> informations) {
		this.informations = informations;
	}

	public PlanGoodInfoVO getGoodInfo() {
		return goodInfo;
	}
 
	public double getLocalPrice() {
		return localPrice;
	}

	public void setLocalPrice(double localPrice) {
		this.localPrice = localPrice;
	}

	public void setGoodInfo(PlanGoodInfoVO goodInfo) {
		this.goodInfo = goodInfo;
	}
 
	public PlanDetailVO(){
		name = ""; 
		planSummary = "";
		fitPeople = "";  
	}
	
	
	
	public List<PlanDayInfoVO> getPlanDays() {
		return planDays;
	}



	public void setPlanDays(List<PlanDayInfoVO> planDays) {
		this.planDays = planDays;
	}



	public int getTotalDay() {
		return totalDay;
	}



	public PlanUserStatisticVO getUserStatitic() {
		return userStatitic;
	}



	public void setUserStatitic(PlanUserStatisticVO userStatitic) {
		this.userStatitic = userStatitic;
	}



	public void setTotalDay(int totalDay) {
		this.totalDay = totalDay;
	}



	public int getHasDone() {
		return hasDone;
	}


	public void setHasDone(int hasDone) {
		this.hasDone = hasDone;
	}


	public int getTotalExercises() {
		return totalExercises;
	}


	public void setTotalExercises(int totalExercises) {
		this.totalExercises = totalExercises;
	}
 
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}
 

	public String getPlanSummary() {
		return planSummary;
	}

	public void setPlanSummary(String planSummary) {
		this.planSummary = planSummary;
	}

	public String getFitPeople() {
		return fitPeople;
	}

	public void setFitPeople(String fitPeople) {
		this.fitPeople = fitPeople;
	}
 
	public int getIsPay() {
		return isPay;
	}

	public void setIsPay(int isPay) {
		this.isPay = isPay;
	}

	public int getLearnNumber() {
		return learnNumber;
	}

	public void setLearnNumber(int learnNumber) {
		this.learnNumber = learnNumber;
	}

	public int getTotalDayNumber() {
		return totalDayNumber;
	}

	public void setTotalDayNumber(int totalDayNumber) {
		this.totalDayNumber = totalDayNumber;
	}
 
	public List<PlanDayExerciseVO> getExercises() {
		return exercises;
	}

	public void setExercises(List<PlanDayExerciseVO> exercises) {
		this.exercises = exercises;
	}

	public List<AudiosVO> getAudios() {
		return audios;
	}

	public void setAudios(List<AudiosVO> audios) {
		this.audios = audios;
	}

	public int getAudioCourseId() {
		return audioCourseId;
	}

	public void setAudioCourseId(int audioCourseId) {
		this.audioCourseId = audioCourseId;
	}
	 
	
	
}
