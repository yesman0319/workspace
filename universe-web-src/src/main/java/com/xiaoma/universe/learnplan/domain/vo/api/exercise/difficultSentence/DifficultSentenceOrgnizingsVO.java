package com.xiaoma.universe.learnplan.domain.vo.api.exercise.difficultSentence;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * 
 * @author xiaoma
 *	分句
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class DifficultSentenceOrgnizingsVO {
	public static int INPUT_TYPE=1;
	public static int INPUT_TYPE_NO=0;
	private String content; 
	private int type;  //0默认，1是分句
	
	public String getContent() {
		return content;
	}
	public void setContent(String content) {
		this.content = content;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	
}
