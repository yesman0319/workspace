package com.xiaoma.universe.learnplan.domain.vo.api.exercise.difficultSentence;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.xiaoma.universe.common.api.JsonUtil;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class DifficultSentenceQuestionVO { 
	private int id; 
	private String name; 
	private Integer groupId; 
	private int sequenceNumber;  
	private String sentence; 
	private List<DifficultSentenceSegmentationVO> segmentationList;
	private List<String> segmentationChoiceList;
	 
	private String hint; 
	private String translation;
	
	public List<String> getSegmentationChoiceList() {
		return segmentationChoiceList;
	}

	public void setSegmentationChoiceList(List<String> segmentationChoiceList) {
		this.segmentationChoiceList = segmentationChoiceList;
	}

	public String getHint() {
		return hint;
	}

	public void setHint(String hint) {
		this.hint = hint;
	}

	public String getTranslation() {
		return translation;
	}

	public void setTranslation(String translation) {
		this.translation = translation;
	}

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getGroupId() {
		return groupId;
	}
	public void setGroupId(Integer groupId) {
		this.groupId = groupId;
	}
	public int getSequenceNumber() {
		return sequenceNumber;
	}
	public void setSequenceNumber(int sequenceNumber) {
		this.sequenceNumber = sequenceNumber;
	}
	public String getSentence() {
		return sentence;
	}
	public void setSentence(String sentence) {
		this.sentence = sentence;
	}
	public List<DifficultSentenceSegmentationVO> getSegmentationList() {
		return segmentationList;
	}
	public void setSegmentationList(List<DifficultSentenceSegmentationVO> segmentationList) {
		this.segmentationList = segmentationList;
	}  
	

}
