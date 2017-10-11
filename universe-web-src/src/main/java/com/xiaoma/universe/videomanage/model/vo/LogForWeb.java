package com.xiaoma.universe.videomanage.model.vo;

import java.io.Serializable;
import java.util.Date;

public class LogForWeb implements Serializable {

	private String name;// 视频集的名字
	private Integer sortNum;// 排序号
	private Integer courseId;// yztf_video_courses的主键
	private Integer groupId;// yztf_video_group的id
	private Integer partId;// yztf_video_part下的id
	private Integer sectionId;// yztf_video_sections的id
	private String imgUrl;// 封面地址
	private String courseName;// 课程名称
	private String groupName;// 组名称
	private String partName;// 集名称
	private String sectionName;// 小节名称
	private Integer userId;// 用户的id
	private Integer videoId;// 视频库的id
	private Integer lessionId;// 小节中的课的id
	private String lessionName;// 课名称
	private Long createTime;// createTime

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Integer getSortNum() {
		return sortNum;
	}

	public void setSortNum(Integer sortNum) {
		this.sortNum = sortNum;
	}

	public Integer getCourseId() {
		return courseId;
	}

	public void setCourseId(Integer courseId) {
		this.courseId = courseId;
	}

	public Integer getGroupId() {
		return groupId;
	}

	public void setGroupId(Integer groupId) {
		this.groupId = groupId;
	}

	public Integer getPartId() {
		return partId;
	}

	public void setPartId(Integer partId) {
		this.partId = partId;
	}

	public Integer getSectionId() {
		return sectionId;
	}

	public void setSectionId(Integer sectionId) {
		this.sectionId = sectionId;
	}

	public String getImgUrl() {
		return imgUrl;
	}

	public void setImgUrl(String imgUrl) {
		this.imgUrl = imgUrl;
	}

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

	public String getGroupName() {
		return groupName;
	}

	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}

	public String getPartName() {
		return partName;
	}

	public void setPartName(String partName) {
		this.partName = partName;
	}

	public String getSectionName() {
		return sectionName;
	}

	public void setSectionName(String sectionName) {
		this.sectionName = sectionName;
	}

	public Integer getUserId() {
		return userId;
	}

	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	public Integer getVideoId() {
		return videoId;
	}

	public void setVideoId(Integer videoId) {
		this.videoId = videoId;
	}

	public Integer getLessionId() {
		return lessionId;
	}

	public void setLessionId(Integer lessionId) {
		this.lessionId = lessionId;
	}

	public String getLessionName() {
		return lessionName;
	}

	public void setLessionName(String lessionName) {
		this.lessionName = lessionName;
	}

	public Long getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Long createTime) {
		this.createTime = createTime;
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

		long l = new Date().getTime() - createTime;
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
