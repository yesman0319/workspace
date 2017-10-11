package com.xiaoma.universe.learnplan.domain.vo.api.exercise;

import java.util.Date;
import java.util.List;

import org.springframework.util.StringUtils;

public class WordQuestionVO {
	private int id;
	private String groupName;
	private int sequenceNumber;
	private String wordEn;
	private String wordSymbol;
	private List<String> wordCh;
	private String wordValue;
	private String audioUrl;
	private Date createTime;
	private Date updateTime;
	
	
	public String getWordValue() {
		wordValue = "";
		if(wordCh!=null && wordCh.size()>0){
			wordValue = StringUtils.collectionToDelimitedString(wordCh, " ");
		}
		return wordValue;
	}
 
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public int getSequenceNumber() {
		return sequenceNumber;
	}
	public void setSequenceNumber(int sequenceNumber) {
		this.sequenceNumber = sequenceNumber;
	}
	public String getWordEn() {
		return wordEn;
	}
	public void setWordEn(String wordEn) {
		this.wordEn = wordEn;
	}
	public String getWordSymbol() {
		return wordSymbol;
	}
	public void setWordSymbol(String wordSymbol) {
		this.wordSymbol = wordSymbol;
	}
	
	public List<String> getWordCh() {
		return wordCh;
	}
	public void setWordCh(List<String> wordCh) {
		this.wordCh = wordCh;
	}
	public String getAudioUrl() {
		return audioUrl;
	}
	public void setAudioUrl(String audioUrl) {
		this.audioUrl = audioUrl;
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
