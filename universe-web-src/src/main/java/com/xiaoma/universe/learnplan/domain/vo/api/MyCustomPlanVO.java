/**
 * 
 */
package com.xiaoma.universe.learnplan.domain.vo.api;

import java.util.Date;

/**
 * @author xiaoma
 */
public class MyCustomPlanVO {
	private Integer id;
	private Integer isDelete;
	private Date experienceEndTime;
	private Date experienceStartTime;
	private Date updateTime;
	private Date useEndTime;
	private Date useStartTime;
	private Integer userId;
	private int planId;
	private String name;
	private Integer isFollowTime;

	private int sequence;
	private int status;

	private String imageWebList;
	private String imageWebDetail;
	private String imageAppList;
	private String imageAppDetail;
	private String imageWebColor;
	private Date createTime;

	private MyUserStatitic userStatitic;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getIsDelete() {
		return isDelete;
	}

	public void setIsDelete(Integer isDelete) {
		this.isDelete = isDelete;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public Date getUseEndTime() {
		return useEndTime == null ? experienceEndTime : useEndTime;
	}

	public void setUseEndTime(Date useEndTime) {
		this.useEndTime = useEndTime;
	}

	public Date getUseStartTime() {
		return useStartTime == null ? experienceStartTime : useStartTime;
	}

	public void setUseStartTime(Date useStartTime) {
		this.useStartTime = useStartTime;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public int getPlanId() {
		return planId;
	}

	public void setPlanId(int planId) {
		this.planId = planId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getIsFollowTime() {
		return isFollowTime;
	}

	public void setIsFollowTime(Integer isFollowTime) {
		this.isFollowTime = isFollowTime;
	}

	public int getSequence() {
		return sequence;
	}

	public void setSequence(int sequence) {
		this.sequence = sequence;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
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

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public MyUserStatitic getUserStatitic() {
		return userStatitic;
	}

	public void setUserStatitic(MyUserStatitic userStatitic) {
		this.userStatitic = userStatitic;
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

}
