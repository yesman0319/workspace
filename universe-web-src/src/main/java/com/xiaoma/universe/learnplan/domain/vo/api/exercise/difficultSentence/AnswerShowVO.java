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
public class AnswerShowVO { 
	private String content;
	private int is_correct;//1对，2错 其他都为错，0非比对内容
	
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public int getIs_correct() {
		return is_correct;
	}
	public void setIs_correct(int is_correct) {
		this.is_correct = is_correct;
	}
	
	
}
