/**
 * 
 */
package com.xiaoma.universe.learnplan.domain.vo.api.exercise;

import java.util.List;

/**
 * @author xiaoma
 *
 */
public class WordQuestionsVO {
	
	private List<WordQuestionVO> rows;
	private int total;
	public List<WordQuestionVO> getRows() {
		return rows;
	}
	public void setRows(List<WordQuestionVO> rows) {
		this.rows = rows;
	}
	public int getTotal() {
		return total;
	}
	public void setTotal(int total) {
		this.total = total;
	}
	
	
}
