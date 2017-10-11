/**
 * 
 */
package com.xiaoma.universe.learnplan.domain.vo.api;

import java.util.List;

/**
 * @author xiaoma
 *
 */
public class ExerciseHistoriesVO {
	private int total=0;
	private List<ExerciseHistoryVO> result;

	 
	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public List<ExerciseHistoryVO> getResult() {
		return result;
	}

	public void setResult(List<ExerciseHistoryVO> result) {
		this.result = result;
	}

	  
}
