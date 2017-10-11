/**
 * 
 */
package com.xiaoma.universe.microcourse.domain.vo;

import javax.persistence.Entity;
import javax.persistence.EntityResult;
import javax.persistence.FieldResult;
import javax.persistence.Id;
import javax.persistence.SqlResultSetMapping;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonInclude; 

/**
 * @author xiaoma
 *
 */ 
@SqlResultSetMapping  
(  
        name = "MicroMediaVO",  
        entities = {  
        		@EntityResult(
        				entityClass=MicroMediaVO.class,
        				fields={ 
        				@FieldResult(name="id",        column="id"),
        				@FieldResult(name="articleId",    column="articles_id"),
        				@FieldResult(name="articleTitle",    column="articles_title"),
        				@FieldResult(name="image",    column="image"),
        				@FieldResult(name="title",    column="title"),
        				@FieldResult(name="type",    column="type"),
        				@FieldResult(name="playUrl",    column="play_url"),
        				@FieldResult(name="articlesSequence",    column="articles_sequence")
        				            }
        				        )
        }  
)
@Entity
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MicroMediaVO {
	@Id
	private int id;
	private int articleId;
	private String articleTitle;
	private String title;
	private String image;
	private int type;
	private String playUrl;
	private int articlesSequence;
	private String fileSize;
	private int duration;
	@Transient
	private String durationStr;
	
	public String getFileSize() {
		return fileSize;
	}
	public void setFileSize(String fileSize) {
		this.fileSize = fileSize;
	}
	public int getDuration() {
		return duration;
	}
	public void setDuration(int duration) {
		this.duration = duration;
	}
	public String getDurationStr() {
		return durationStr;
	}
	public void setDurationStr(String durationStr) {
		this.durationStr = durationStr;
	}
	public int getArticlesSequence() {
		return articlesSequence;
	}
	public void setArticlesSequence(int articlesSequence) {
		this.articlesSequence = articlesSequence;
	}
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getArticleId() {
		return articleId;
	}
	public void setArticleId(int articleId) {
		this.articleId = articleId;
	}
	public String getArticleTitle() {
		return articleTitle;
	}
	public void setArticleTitle(String articleTitle) {
		this.articleTitle = articleTitle;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public String getPlayUrl() {
		return playUrl;
	}
	public void setPlayUrl(String playUrl) {
		this.playUrl = playUrl;
	} 
	
	
}
