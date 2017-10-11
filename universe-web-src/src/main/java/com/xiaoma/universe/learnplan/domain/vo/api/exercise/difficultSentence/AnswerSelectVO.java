/**
 * 
 */
package com.xiaoma.universe.learnplan.domain.vo.api.exercise.difficultSentence;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * @author xiaoma
 *
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class AnswerSelectVO { 
	 private int startIndex;
	 private int endIndex;
	public int getStartIndex() {
		return startIndex;
	}
	public void setStartIndex(int startIndex) {
		this.startIndex = startIndex;
	}
	public int getEndIndex() {
		return endIndex;
	}
	public void setEndIndex(int endIndex) {
		this.endIndex = endIndex;
	}
	 
	 
}
