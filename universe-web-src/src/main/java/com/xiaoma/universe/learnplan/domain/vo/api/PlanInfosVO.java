/**
 * 
 */
package com.xiaoma.universe.learnplan.domain.vo.api;

import java.util.List;

import com.xiaoma.universe.learnplan.domain.vo.web.YztfPlanLabelPO;

/**
 * @author xiaoma
 *
 */
public class PlanInfosVO {
	private int total=0;
	private List<PlanInfoVO> rows;
	private List<YztfPlanLabelPO> labels;

	 
	public int getTotal() {
		return total;
	}

	public void setTotal(int total) {
		this.total = total;
	}

	public List<PlanInfoVO> getRows() {
		return rows;
	}

	public void setRows(List<PlanInfoVO> rows) {
		this.rows = rows;
	}

	public List<YztfPlanLabelPO> getLabels() {
		return labels;
	}

	public void setLabels(List<YztfPlanLabelPO> labels) {
		this.labels = labels;
	}

	 
}
