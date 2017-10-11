/**
 * 
 */
package com.xiaoma.universe.learnplan.domain.vo.api.exercise;

import java.util.List;

import com.xiaoma.universe.common.utils.BigDecimalUtils;

/**
 * @author xiaoma
 *
 */
public class IntensiveListeningQuestionParagraphVO {
	private int paragraphNumber; //第几段
	private String paragraphNumberStr;
	private double audioStart; //音频开始时间
	private double audioEnd; //音频开始时间
    private List<IntensiveListeningQuestionSentenceVO> sentenceList;
    
    
	public String getParagraphNumberStr() {

		return BigDecimalUtils.intToChinaString(paragraphNumber);
	}
	public void setParagraphNumberStr(String paragraphNumberStr) {
		this.paragraphNumberStr = paragraphNumberStr;
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
	public List<IntensiveListeningQuestionSentenceVO> getSentenceList() {
		return sentenceList;
	}
	public void setSentenceList(List<IntensiveListeningQuestionSentenceVO> sentenceList) {
		this.sentenceList = sentenceList;
	}
     
}
