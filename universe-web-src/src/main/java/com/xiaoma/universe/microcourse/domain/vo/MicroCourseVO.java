/**
 * 
 */
package com.xiaoma.universe.microcourse.domain.vo;

import java.util.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude; 

import net.sf.json.JSONObject;
/**
 * @author xiaoma
 *
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MicroCourseVO {
	private int courseId; //课程id
	private String title;
	private int goodid; 
	private String introductionBase;//简单介绍
	private String imageList;
	private String imageDetail;
	private int learnPersonCount;//学习人数
	private MicroCourseUserStatusVO userStatus;
//	private List<MicroCourseMedia> audioList;
//	private List<MicroCourseMedia> videoList;
	private GoodVO goodInfo = null;
	private Date lastUpdateDate; //最后更新日期
	private String lastUpdateDateStr;  
	private MicroRecommendArticleVO recommendArticle;
	
	
	public String getLastUpdateDateStr() {
		return lastUpdateDateStr;
	}
	public void setLastUpdateDateStr(String lastUpdateDateStr) {
		this.lastUpdateDateStr = lastUpdateDateStr;
	}
	public String getImageList() {
		return imageList;
	}
	public void setImageList(String imageList) {
		this.imageList = imageList;
	}
	public String getImageDetail() {
		return imageDetail;
	}
	public void setImageDetail(String imageDetail) {
		this.imageDetail = imageDetail;
	}
	public Date getLastUpdateDate() {
		return lastUpdateDate;
	}
	public void setLastUpdateDate(Date lastUpdateDate) {
		this.lastUpdateDate = lastUpdateDate;
	}
	public MicroRecommendArticleVO getRecommendArticle() {
		return recommendArticle;
	}
	public void setRecommendArticle(MicroRecommendArticleVO recommendArticle) {
		this.recommendArticle = recommendArticle;
	}
	public GoodVO getGoodInfo() {
		return goodInfo;
	}
	public void setGoodInfo(GoodVO goodInfo) {
		this.goodInfo = goodInfo;
	}
	public MicroCourseUserStatusVO getUserStatus() {
		return userStatus;
	}
	public void setUserStatus(MicroCourseUserStatusVO userStatus) {
		this.userStatus = userStatus;
	}
	public int getCourseId() {
		return courseId;
	}
	public void setCourseId(int courseId) {
		this.courseId = courseId;
	}
	 
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public int getGoodid() {
		return goodid;
	}
	public void setGoodid(int goodid) {
		this.goodid = goodid;
	}
	 
	public String getIntroductionBase() {
		return introductionBase;
	}
	public void setIntroductionBase(String introductionBase) {
		this.introductionBase = introductionBase;
	}
	public int getLearnPersonCount() {
		return learnPersonCount;
	}
	public void setLearnPersonCount(int learnPersonCount) {
		this.learnPersonCount = learnPersonCount;
	}
	 
		
	
}
