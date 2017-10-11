package com.xiaoma.universe.wordschallenge.model.po;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonInclude;
/**
 * 词汇
 */	
@JsonInclude(JsonInclude.Include.NON_NULL)
public class VocabularyQuestionPO implements Serializable {
	private Integer id;             
	private String sequenceNumber;
	private String content ;
	private String vocabularyGroupId;
	private Date createdAt;
	private Date updatedAt;      
	private String word;                     
	private String partOfSpeech;                
	private String meaning;              
	private Integer publishStatus;
	private WordsQuestionPO wordsQuestionPO;
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getSequenceNumber() {
		return sequenceNumber;
	}
	public void setSequenceNumber(String sequenceNumber) {
		this.sequenceNumber = sequenceNumber;
	}
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public String getVocabularyGroupId() {
		return vocabularyGroupId;
	}
	public void setVocabularyGroupId(String vocabularyGroupId) {
		this.vocabularyGroupId = vocabularyGroupId;
	}
	public Date getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}
	public Date getUpdatedAt() {
		return updatedAt;
	}
	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}
	public String getWord() {
		return word;
	}
	public void setWord(String word) {
		this.word = word;
	}
	public String getPartOfSpeech() {
		return partOfSpeech;
	}
	public void setPartOfSpeech(String partOfSpeech) {
		this.partOfSpeech = partOfSpeech;
	}
	public String getMeaning() {
		return meaning;
	}
	public void setMeaning(String meaning) {
		this.meaning = meaning;
	}
	public Integer getPublishStatus() {
		return publishStatus;
	}
	public void setPublishStatus(Integer publishStatus) {
		this.publishStatus = publishStatus;
	}
	public WordsQuestionPO getWordsQuestionPO() {
		return wordsQuestionPO;
	}
	public void setWordsQuestionPO(WordsQuestionPO wordsQuestionPO) {
		this.wordsQuestionPO = wordsQuestionPO;
	}
	
	
}
