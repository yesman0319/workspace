/**
 * 
 */
package com.xiaoma.universe.learnplan.domain.vo.web;

import java.util.Date;
import java.util.List;

import com.xiaoma.universe.learnplan.domain.vo.api.VideoUserStatus;
import com.xiaoma.universe.learnplan.domain.vo.api.VideosVO;

/**
 * @author xiaoma
 *
 */
public class PlanDetailInfoVO {
	private String id;
	private String name;
	private String planSummary;
	private String planSummaryShare;
	private int isPay;
	private String teacherName; 
	private String teacherAvatar ; 
	private boolean isDone = false;
	private int totalDay; //总天数
	private int hasDoneDay;//已做天数
	private int totalExercises;//总题
	private int hasDoneExercises;//已做天数 
	private int audioCourseId;
	private int learnPersonsCount;
	private String hasDoneTime; 
	private double localPrice;
	private String bigImage;
	private String ImageColor;
	private int isPublish;//是否下架
	private String currentDayId;
	private int currentDayNumber = 0;
	private String currentDayName = "";
	private String lastDoTime;
	private boolean delete = false;

	private Date experienceEndTime;
	private Date experienceStartTime;
	private Date firstUseTime;

	private Date useEndTime;
	private Date useStartTime;
	private int userStatus; //
	
	
	private int defaultFollowDayId;//默认的跟时间走的 learnDate是今天的dayId
	private int isFollowTime; 
	private int dayFollowNumber;//对应defaultFollowDayId

	

	private List<VideosVO> VideosVO;
	private  VideoUserStatus videoUserStatus;
	
	
	
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
		return VideosVO;
	}
	public void setVideosVO(List<VideosVO> videosVO) {
		VideosVO = videosVO;
	}
	public boolean isDelete() {
		return delete;
	}
	public void setDelete(boolean delete) {
		this.delete = delete;
	}
	public String getCurrentDayId() {
		return currentDayId;
	}
	public void setCurrentDayId(String currentDayId) {
		this.currentDayId = currentDayId;
	}
	public int getCurrentDayNumber() {
		return currentDayNumber;
	}
	public void setCurrentDayNumber(int currentDayNumber) {
		this.currentDayNumber = currentDayNumber;
	}
	public String getCurrentDayName() {
		return currentDayName;
	}
	public void setCurrentDayName(String currentDayName) {
		this.currentDayName = currentDayName;
	}
	public String getLastDoTime() {
		return lastDoTime;
	}
	public void setLastDoTime(String lastDoTime) {
		this.lastDoTime = lastDoTime;
	}
	public String getBigImage() {
		return bigImage;
	}
	public void setBigImage(String bigImage) {
		this.bigImage = bigImage;
	}
	public String getImageColor() {
		return ImageColor;
	}
	public void setImageColor(String imageColor) {
		ImageColor = imageColor;
	}
	public int getIsPay() {
		return isPay;
	}
	public void setIsPay(int isPay) {
		this.isPay = isPay;
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
	public double getLocalPrice() {
		return localPrice;
	}
	public void setLocalPrice(double localPrice) {
		this.localPrice = localPrice;
	}
	 
	public int getLearnPersonsCount() {
		return learnPersonsCount;
	}
	public void setLearnPersonsCount(int learnPersonsCount) {
		this.learnPersonsCount = learnPersonsCount;
	}
	public boolean isDone() {
		return isDone;
	}
	public void setDone(boolean isDone) {
		this.isDone = isDone;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
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
	public String getTeacherName() {
		return teacherName;
	}
	public void setTeacherName(String teacherName) {
		this.teacherName = teacherName;
	}
	 
	public String getTeacherAvatar() {
		return teacherAvatar;
	}
	public void setTeacherAvatar(String teacherAvatar) {
		this.teacherAvatar = teacherAvatar;
	}
	public int getTotalDay() {
		return totalDay;
	}
	public void setTotalDay(int totalDay) {
		this.totalDay = totalDay;
	}
	public int getTotalExercises() {
		return totalExercises;
	}
	public void setTotalExercises(int totalExercises) {
		this.totalExercises = totalExercises;
	}
	public int getHasDoneDay() {
		return hasDoneDay;
	}
	public void setHasDoneDay(int hasDoneDay) {
		this.hasDoneDay = hasDoneDay;
	}
	public int getHasDoneExercises() {
		return hasDoneExercises;
	}
	public void setHasDoneExercises(int hasDoneExercises) {
		this.hasDoneExercises = hasDoneExercises;
	}
	public String getHasDoneTime() {
		return hasDoneTime;
	}
	public void setHasDoneTime(String hasDoneTime) {
		this.hasDoneTime = hasDoneTime;
	}
	public int getAudioCourseId() {
		return audioCourseId;
	}
	public void setAudioCourseId(int audioCourseId) {
		this.audioCourseId = audioCourseId;
	}
    
	
	
}
