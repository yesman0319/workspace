package com.xiaoma.universe.learnplan.domain.vo.api;

import java.util.Date;

public class AudiosVO {
		private Integer id;   //音频名称
		private String name;  //音频类型，（）
		private Integer type;  //音频所在计划
		private Integer audioCourseId; //音频分类
		private String categroy; //音频图片
		private String imgUrl; //音频链接
		private String audioUrl;  //教师ID
		private Integer teacherId;  //教师名称
		private String teacherName;//科目类型 （0基础 1强化 2 进阶）
		private Integer subjectType;  //课程科目名称
		private String subjectName;  //描述
		private String description;  //音频的时间长度
		private String duration;  //听音频的人数
		private Integer viewNum;
		private Integer status;    //音频的状态1可用0不可用
		private Date createTime;
		private Date updateTime;
		public Integer getId() {
			return id;
		}
		public void setId(Integer id) {
			this.id = id;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public Integer getType() {
			return type;
		}
		public void setType(Integer type) {
			this.type = type;
		}
		public Integer getAudioCourseId() {
			return audioCourseId;
		}
		public void setAudioCourseId(Integer audioCourseId) {
			this.audioCourseId = audioCourseId;
		}
		public String getCategroy() {
			return categroy;
		}
		public void setCategroy(String categroy) {
			this.categroy = categroy;
		}
		public String getImgUrl() {
			return imgUrl;
		}
		public void setImgUrl(String imgUrl) {
			this.imgUrl = imgUrl;
		}
		public String getAudioUrl() {
			return audioUrl;
		}
		public void setAudioUrl(String audioUrl) {
			this.audioUrl = audioUrl;
		}
		public Integer getTeacherId() {
			return teacherId;
		}
		public void setTeacherId(Integer teacherId) {
			this.teacherId = teacherId;
		}
		public String getTeacherName() {
			return teacherName;
		}
		public void setTeacherName(String teacherName) {
			this.teacherName = teacherName;
		}
		public Integer getSubjectType() {
			return subjectType;
		}
		public void setSubjectType(Integer subjectType) {
			this.subjectType = subjectType;
		}
		public String getSubjectName() {
			return subjectName;
		}
		public void setSubjectName(String subjectName) {
			this.subjectName = subjectName;
		}
		public String getDescription() {
			return description;
		}
		public void setDescription(String description) {
			this.description = description;
		}
		public String getDuration() {
			return duration;
		}
		public void setDuration(String duration) {
			this.duration = duration;
		}
		public Integer getViewNum() {
			return viewNum;
		}
		public void setViewNum(Integer viewNum) {
			this.viewNum = viewNum;
		}
		public Integer getStatus() {
			return status;
		}
		public void setStatus(Integer status) {
			this.status = status;
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
}
