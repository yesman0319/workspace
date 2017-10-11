package com.xiaoma.universe.microcourse.domain.vo;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude; 

/**
 * 微课程的文章
 * 
 * @Class Name MicroArticle
 * @Author dangxingfei@xiaoma.cn
 * @Create In 2016年12月6日
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MicroArticleVO {
  
	private int id;
	private String title;
	private String introductionBase; 
	private int learnPersonCount;//学习人数
	private int courseId;
	private int sequence;
	private String imageDetail;
	private String imageList;
	private String author; 
	private int isFree; // 是否付费（1免费 0收费） 
	private Date updateTime;
	private String updateTimeStr;
	private int userlearnCount;
	
//	
//	private List<MicroArticleMedia> audioList;
//	private List<MicroArticleMedia> videoList;
//	 
	
	
	public String getImageList() {
		return imageList;
	}




	public void setImageList(String imageList) {
		this.imageList = imageList;
	}




	public Date getUpdateTime() {
		return updateTime;
	}

	 


	public int getUserlearnCount() {
		return userlearnCount;
	}




	public void setUserlearnCount(int userlearnCount) {
		this.userlearnCount = userlearnCount;
	}




	public String getUpdateTimeStr() {
		return updateTimeStr;
	}



	public void setUpdateTimeStr(String updateTimeStr) {
		this.updateTimeStr = updateTimeStr;
	}



	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public int getLearnPersonCount() {
		return learnPersonCount;
	}

	public void setLearnPersonCount(int learnPersonCount) {
		this.learnPersonCount = learnPersonCount;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getIntroductionBase() {
		return introductionBase;
	}

	public void setIntroductionBase(String introductionBase) {
		this.introductionBase = introductionBase;
	}
 
	public int getCourseId() {
		return courseId;
	}

	public void setCourseId(int courseId) {
		this.courseId = courseId;
	}

	public int getSequence() {
		return sequence;
	}

	public void setSequence(int sequence) {
		this.sequence = sequence;
	}

	public String getImageDetail() {
		return imageDetail;
	}

	public void setImageDetail(String imageDetail) {
		this.imageDetail = imageDetail;
	}

 

	public String getAuthor() {
		return author;
	}

	public void setAuthor(String author) {
		this.author = author;
	}
 
	public int getIsFree() {
		return isFree;
	}

	public void setIsFree(int isFree) {
		this.isFree = isFree;
	}
}
