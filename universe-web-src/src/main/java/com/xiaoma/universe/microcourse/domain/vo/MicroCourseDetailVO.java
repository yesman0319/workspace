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
public class MicroCourseDetailVO {
	private int courseId; //课程id
	private String title;
	private int goodid; 
	private String introductionBase;//简单介绍
	private String introductionDetail;//详细介绍html
	private int learnPersonCount;//学习人数
	private String imageList;
	private String imageDetail;
	private int publishFlag;
	//课程下的所有多媒体
	private List<MicroMediaVO> audioList;
	private List<MicroMediaVO> videoList;

	private Date lastUpdateDate; //最后更新日期
	private String lastUpdateDateStr;  
	private MicroRecommendArticleVO recommendArticle;
	
	
	private MicroCourseUserStatusVO userStatus; 
	private  List<MicroArticleVO> articleList;
	private  List<MicroArticleVO> newArticleList;
	private GoodVO goodInfo = null;
	
	
	
	public int getPublishFlag() {
		return publishFlag;
	}
	public void setPublishFlag(int publishFlag) {
		this.publishFlag = publishFlag;
	}
	public List<MicroArticleVO> getNewArticleList() {
		return newArticleList;
	}
	public void setNewArticleList(List<MicroArticleVO> newArticleList) {
		this.newArticleList = newArticleList;
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
	public String getLastUpdateDateStr() {
		return lastUpdateDateStr;
	}
	public void setLastUpdateDateStr(String lastUpdateDateStr) {
		this.lastUpdateDateStr = lastUpdateDateStr;
	}
	public MicroRecommendArticleVO getRecommendArticle() {
		return recommendArticle;
	}
	public void setRecommendArticle(MicroRecommendArticleVO recommendArticle) {
		this.recommendArticle = recommendArticle;
	}
	public List<MicroMediaVO> getAudioList() {
		return audioList;
	}
	public void setAudioList(List<MicroMediaVO> audioList) {
		this.audioList = audioList;
	}
	public List<MicroMediaVO> getVideoList() {
		return videoList;
	}
	public void setVideoList(List<MicroMediaVO> videoList) {
		this.videoList = videoList;
	}
	public List<MicroArticleVO> getArticleList() {
		return articleList;
	}
	public void setArticleList(List<MicroArticleVO> articleList) {
		this.articleList = articleList;
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
	public String getIntroductionDetail() {
		return introductionDetail;
	}
	public void setIntroductionDetail(String introductionDetail) {
		this.introductionDetail = introductionDetail;
	}
	public int getLearnPersonCount() {
		return learnPersonCount;
	}
	public void setLearnPersonCount(int learnPersonCount) {
		this.learnPersonCount = learnPersonCount;
	}
	public MicroCourseUserStatusVO getUserStatus() {
		return userStatus;
	}
	public void setUserStatus(MicroCourseUserStatusVO userStatus) {
		this.userStatus = userStatus;
	}
	public GoodVO getGoodInfo() {
		return goodInfo;
	}
	public void setGoodInfo(GoodVO goodInfo) {
		this.goodInfo = goodInfo;
	} 
	 
	
}
