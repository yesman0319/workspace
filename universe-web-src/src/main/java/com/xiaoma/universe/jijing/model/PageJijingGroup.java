package com.xiaoma.universe.jijing.model;

import java.util.List;

public class PageJijingGroup {

	private List years;
	private List<YearData> yData;
	private List<PlanVO> plans;
	public List getYears() {
		return years;
	}
	public void setYears(List years) {
		this.years = years;
	}
	public List<YearData> getyData() {
		return yData;
	}
	public void setyData(List<YearData> yData) {
		this.yData = yData;
	}
	public List<PlanVO> getPlans() {
		return plans;
	}
	public void setPlans(List<PlanVO> plans) {
		this.plans = plans;
	}

    
}
