/**
 * 
 */
package com.xiaoma.universe.learnplan.domain.vo.api;

import java.util.Date;

import com.xiaoma.rest.authentication.TeacherInfo;

/**
 * @author xiaoma
 *
 */
public class PlanInfoVO {
	public static final int IS_PUBLISH = 1;//已发布
	public static final int IS_NOT_PUBLISH = 0;//未发布


	public static final int IS_PUBLIC = 1;//1:公开
	public static final int IS_NOT_PUBLIC = 0;//0:未公开

	public static final int IS_FOLLOW_TIME = 1;//1：跟随时间
	public static final int IS_NOT_FOLLOW_TIME = 0;//0：未跟随时间，


	public static final int STANDARD_PLAN = 0;//0：标准计划，
	public static final int MY_PLAN = 1;//1：我的计划

	public static final int IS_PUBLIC_USE = 0;// 公用：0
	public static final int IS__NOT_PUBLIC_USE = 1;//定制：1

	public static final int IS_PAY =1;// 需要付费：1 
	public static final int IS_NOT_PAY = 0;//不需要付费：0

	public static final int IS_NOT_TEST = 0;//是测试手机号

	private int id;

	private String name;//计划名称

	private String planSummary;//计划简介

	private String fitPeople;//试用人群

	private int type;//区分 标准计划 和 我的计划 （0：标准计划，1：我的计划）

	private int planType;//区分 公用 还是定制， 公用：0，定制：1\r\n \r\n \r\n 定制计划 学生私有的专属计划

	private int isPublish;//是否发布的字段(0:未发布 ，1:发布)

	private int isPublic;//是否公开(0:未公开，1:公开)

	private int isFollowTime;//是否跟时间走（0：未跟随时间，1：跟随时间）

	private int isTest;//是否是测试

	private String goodName;//商品名称

	private int goodId;//商品id

	private int isPay;//是否需要付费
	private double localPrice;

	private int planAllDays;//计划总时间

	private Date planEndTime;//跟时间走的计划，卡片最后一天时间

	private Date planStartTime;//跟时间走的计划，卡片的第一天时间

	private int isLimitTime;//是否限定时间(0:否 1:是)

	private int yztfManagerId;//老师们 和 管理员  
	private int learnNumber;//开启的人数统计 
	private int totalDayNumber;//此计划的总天数 
	private String backgroudPic;//背景图 
	private Date createTime; 
	private Date updateTime;

	//图片
	private String imageWebList;
	private String imageWebDetail;
	private String imageAppList;
	private String imageAppDetail;
	private String imageWebColor;
	
	//计划下的总题数
	private int totalExerciseNumber;

	private TeacherInfo teacher; //教师情况
	
	public TeacherInfo getTeacher() {
		return teacher;
	}
	public void setTeacher(TeacherInfo teacher) {
		this.teacher = teacher;
	}
	public double getLocalPrice() {
		return localPrice;
	}
	public void setLocalPrice(double localPrice) {
		this.localPrice = localPrice;
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
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public int getPlanType() {
		return planType;
	}
	public void setPlanType(int planType) {
		this.planType = planType;
	}
	public int getIsPublish() {
		return isPublish;
	}
	public void setIsPublish(int isPublish) {
		this.isPublish = isPublish;
	}
	public int getIsPublic() {
		return isPublic;
	}
	public void setIsPublic(int isPublic) {
		this.isPublic = isPublic;
	}
	public int getIsFollowTime() {
		return isFollowTime;
	}
	public void setIsFollowTime(int isFollowTime) {
		this.isFollowTime = isFollowTime;
	}
	public int getIsTest() {
		return isTest;
	}
	public void setIsTest(int isTest) {
		this.isTest = isTest;
	}
	public String getGoodName() {
		return goodName;
	}
	public void setGoodName(String goodName) {
		this.goodName = goodName;
	}
	public int getGoodId() {
		return goodId;
	}
	public void setGoodId(int goodId) {
		this.goodId = goodId;
	}
	public int getIsPay() {
		return isPay;
	}
	public void setIsPay(int isPay) {
		this.isPay = isPay;
	}
	public int getPlanAllDays() {
		return planAllDays;
	}
	public void setPlanAllDays(int planAllDays) {
		this.planAllDays = planAllDays;
	}
	public Date getPlanEndTime() {
		return planEndTime;
	}
	public void setPlanEndTime(Date planEndTime) {
		this.planEndTime = planEndTime;
	}
	public Date getPlanStartTime() {
		return planStartTime;
	}
	public void setPlanStartTime(Date planStartTime) {
		this.planStartTime = planStartTime;
	}
	public int getIsLimitTime() {
		return isLimitTime;
	}
	public void setIsLimitTime(int isLimitTime) {
		this.isLimitTime = isLimitTime;
	}
	public int getYztfManagerId() {
		return yztfManagerId;
	}
	public void setYztfManagerId(int yztfManagerId) {
		this.yztfManagerId = yztfManagerId;
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
	public String getBackgroudPic() {
		return backgroudPic;
	}
	public void setBackgroudPic(String backgroudPic) {
		this.backgroudPic = backgroudPic;
	}
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	public int getTotalExerciseNumber() {
		return totalExerciseNumber;
	}
	public void setTotalExerciseNumber(int totalExerciseNumber) {
		this.totalExerciseNumber = totalExerciseNumber;
	}

}
