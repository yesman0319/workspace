/**
 * 
 */
package com.xiaoma.universe.learnplan.domain.vo.api;

import java.util.List;

/**
 * @author xiaoma
 *
 */
public class CustomPlansVO {
	private List<CustomPlanVO> rows;
	private int total;
	public List<CustomPlanVO> getRows() {
		return rows;
	}
	public void setRows(List<CustomPlanVO> rows) {
		this.rows = rows;
	}
	public int getTotal() {
		return total;
	}
	public void setTotal(int total) {
		this.total = total;
	}
	
	
}
