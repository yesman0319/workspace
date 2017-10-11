package com.xiaoma.universe.learnplan.domain.vo.web;

import java.util.Date;

public class WordVO {

	private int id;
	private String groupName;
	private int sequenceNumber;
	private String audioUrl;
	private String wordCh;
	private String wordEn;
	private String wordSymbol;
	private Date createTime;
	private Date updateTime;
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
	public String getAudioUrl() {
		return audioUrl;
	}
	public void setAudioUrl(String audioUrl) {
		this.audioUrl = audioUrl;
	}
	public String getWordCh() {
		return wordCh;
	}
	public void setWordCh(String wordCh) {
		this.wordCh = wordCh;
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
