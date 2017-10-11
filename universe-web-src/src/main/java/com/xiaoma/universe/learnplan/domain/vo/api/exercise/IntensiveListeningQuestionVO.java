/**
 * 
 */
package com.xiaoma.universe.learnplan.domain.vo.api.exercise;

import java.util.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonInclude;
 
 

/**
 * @author xiaoma
 *
 */

@JsonInclude(JsonInclude.Include.NON_NULL)
public class IntensiveListeningQuestionVO { 
	 
	private int id;
	private String tpo;
	private String name;
	private String audioUrl; 
	private int isFinish;
	
    private List<IntensiveListeningQuestionParagraphVO> paragraphList;
    
	public int getIsFinish() {
		return isFinish;
	}

	public void setIsFinish(int isFinish) {
		this.isFinish = isFinish;
	}

	public String getTpo() {
		return tpo;
	}

	public void setTpo(String tpo) {
		this.tpo = tpo;
	}

	public void setId(int id) {
		this.id = id;
	}

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

	 
	public String getAudioUrl() {
		return audioUrl;
	}

	public void setAudioUrl(String audioUrl) {
		this.audioUrl = audioUrl;
	}

	public List<IntensiveListeningQuestionParagraphVO> getParagraphList() {
		return paragraphList;
	}

	public void setParagraphList(List<IntensiveListeningQuestionParagraphVO> paragraphList) {
		this.paragraphList = paragraphList;
	}
	
}
