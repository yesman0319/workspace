package com.xiaoma.universe.learnplan.domain.vo.api;

import java.util.Date;

/**
 * @Title: 获取所有的推荐的练习
 * @Description: TODO
 * @author xiaoma
 * @since 2016年9月7日
 * @version V1.0
 */
public class RecommendExerciseVO {
	private String backgroudPic;// 背景图
	private Integer category;// 分类 1 小范围 2 大范围
	private String content;// 内容
	private Integer groupId;// 组ID
	private String groupName;// 组名称
	private String imageAppDetail;
	private String imageAppList;
	private String imageWebColor;
	private String imageWebDetail;
	private String imageWebList;
	private Integer moduleId;// 模块id
	private String moduleName;// 模块名
	private Integer planId;// 计划ID
	private Integer planDayId;// 计划ID
	private Integer planDayExerciseId;
	private String planName;// 计划名称
	private Integer practicedPeople;// 练习人数
	private Integer questionId;// 问题ID
	private Date recommendTime;// 推荐时间
	private String sequenceNumber;// 排序
	private Integer totalDayNumber;// 卡片数量;
	
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

	public String getBackgroudPic() {
		return backgroudPic;
	}

	public void setBackgroudPic(String backgroudPic) {
		this.backgroudPic = backgroudPic;
	}

	public Integer getCategory() {
		return category;
	}

	public void setCategory(Integer category) {
		this.category = category;
	}
	
	public String getContent() {
		return content;
	}

	public void setContent(String content) {
		this.content = content;
	}

	public Integer getGroupId() {
		return groupId;
	}

	public void setGroupId(Integer groupId) {
		this.groupId = groupId;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getImageAppDetail() {
		return imageAppDetail;
	}

	public void setImageAppDetail(String imageAppDetail) {
		this.imageAppDetail = imageAppDetail;
	}

	public String getImageAppList() {
		return imageAppList;
	}

	public void setImageAppList(String imageAppList) {
		this.imageAppList = imageAppList;
	}

	public String getImageWebColor() {
		return imageWebColor;
	}

	public void setImageWebColor(String imageWebColor) {
		this.imageWebColor = imageWebColor;
	}

	public String getImageWebDetail() {
		return imageWebDetail;
	}

	public void setImageWebDetail(String imageWebDetail) {
		this.imageWebDetail = imageWebDetail;
	}

	public String getImageWebList() {
		return imageWebList;
	}

	public void setImageWebList(String imageWebList) {
		this.imageWebList = imageWebList;
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

	public Integer getPracticedPeople() {
		return practicedPeople;
	}

	public void setPracticedPeople(Integer practicedPeople) {
		this.practicedPeople = practicedPeople;
	}

	public Integer getQuestionId() {
		return questionId;
	}

	public void setQuestionId(Integer questionId) {
		this.questionId = questionId;
	}

	public Date getRecommendTime() {
		return recommendTime;
	}

	public void setRecommendTime(Date recommendTime) {
		this.recommendTime = recommendTime;
	}

	public String getSequenceNumber() {
		return sequenceNumber;
	}

	public void setSequenceNumber(String sequenceNumber) {
		this.sequenceNumber = sequenceNumber;
	}

	public Integer getTotalDayNumber() {
		return totalDayNumber;
	}

	public void setTotalDayNumber(Integer totalDayNumber) {
		this.totalDayNumber = totalDayNumber;
	}

}
