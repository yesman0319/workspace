package com.xiaoma.universe.microcourse.domain.vo;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.EntityResult;
import javax.persistence.FieldResult;
import javax.persistence.Id;
import javax.persistence.SqlResultSetMapping;

import com.fasterxml.jackson.annotation.JsonInclude; 

/**
 * 微课程的文章
 * 
 * @Class Name MicroArticle
 * @Author dangxingfei@xiaoma.cn
 * @Create In 2016年12月6日
 */
@SqlResultSetMapping  
(  
        name = "MicroRecommendArticleVO",  
        entities = {  
        		@EntityResult(
        				entityClass=MicroRecommendArticleVO.class,
        				fields={ 
        				@FieldResult(name="id",        column="id"),
        				@FieldResult(name="title",    column="title"),
        				@FieldResult(name="isFree",    column="is_free"),
        				@FieldResult(name="courseId",    column="course_id"),
        				@FieldResult(name="updateTime",    column="update_time")
        				            }
        				        )
        }  
)
@Entity
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MicroRecommendArticleVO {

	@Id
	private int id;
	private String title; 
	private int isFree; // 是否付费（1免费 0收费） 
	private int courseId;
	private Date updateTime;
	
	
	public int getCourseId() {
		return courseId;
	}
	public void setCourseId(int courseId) {
		this.courseId = courseId;
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
	 
	public int getIsFree() {
		return isFree;
	}
	public void setIsFree(int isFree) {
		this.isFree = isFree;
	}
	public Date getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
	 
}
