/**
 * 
 */
package com.xiaoma.universe.learnplan.domain.vo.api.exercise;

import java.util.ArrayList;
import java.util.List;

import org.jadira.usertype.spi.utils.lang.StringUtils;

/**
 * @author xiaoma
 *
 */
public class IntensiveListeningQuestionSentenceVO { 
	private int sentenceId;
	private int paragraphNumber; //所属段落
	private int sentenceNumber; //第几句
	private double audioStart; //音频开始时间
	private double audioEnd; //音频开始时间
	
	private String contentEn;
	private String contentCn;
	private int isListened;
	

	private List<String> wordList = new ArrayList<String>();	
	
	public void initWordList(){
		String temp = contentEn.replaceAll("\\pP" , " ");
		String[] words = temp.split(" ");
		for(int i=0;i<words.length;i++){
			String word = words[i].replaceAll(" " , "");
			if(StringUtils.isNotEmpty(word)){ 
				wordList.add(word);
			}
		}
	}
	
	
	public int getIsListened() {
		return isListened;
	}


	public void setIsListened(int isListened) {
		this.isListened = isListened;
	}


	public int getSentenceId() {
		return sentenceId;
	}


	public void setSentenceId(int sentenceId) {
		this.sentenceId = sentenceId;
	}


	public List<String> getWordList() {
		return wordList;
	}


	public void setWordList(List<String> wordList) {
		this.wordList = wordList;
	}


	public int getSentenceNumber() {
		return sentenceNumber;
	}
	public void setSentenceNumber(int sentenceNumber) {
		this.sentenceNumber = sentenceNumber;
	}
	public int getParagraphNumber() {
		return paragraphNumber;
	}
	public void setParagraphNumber(int paragraphNumber) {
		this.paragraphNumber = paragraphNumber;
	}
  
	public double getAudioStart() {
		return audioStart;
	}
	public void setAudioStart(double audioStart) {
		this.audioStart = audioStart;
	}
	public double getAudioEnd() {
		return audioEnd;
	}
	public void setAudioEnd(double audioEnd) {
		this.audioEnd = audioEnd;
	}
	public String getContentEn() {
		return contentEn;
	}
	public void setContentEn(String contentEn) {
		this.contentEn = contentEn;
	}
	public String getContentCn() {
		return contentCn;
	}
	public void setContentCn(String contentCn) {
		this.contentCn = contentCn;
	}
	
	
}
