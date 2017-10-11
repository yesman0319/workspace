package com.xiaoma.universe.jijing.model;

import java.util.List;

public class MonthVO {

	private String month;
	@SuppressWarnings("rawtypes")
	private List jijingName;
	public String getmonth() {
		return month;
	}
	public void setmonth(String month) {
		this.month = month;
	}
	public List getJijingName() {
		return jijingName;
	}
	public void setJijingName(List jijingName) {
		this.jijingName = jijingName;
	}
	
}
