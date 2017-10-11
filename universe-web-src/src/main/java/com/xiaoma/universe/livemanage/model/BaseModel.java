package com.xiaoma.universe.livemanage.model;

import com.xiaoma.universe.common.utils.StringUtils;

public class BaseModel {
	
	private int id;
	
	private int page;
	
	private int rows;
	
	private String sw;
	private String sw1;
	private String sw2;
	
	private String order;
	
	private String sort;
	
	private String beginTime;
	
	private String endTime;

	public int getPage() {
		if(page<=0){
			return 1;
		}
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getRows() {
		if(rows<=0){
			return 20;
		}
		if(rows>200){
			return 200;
		}
		return rows;
	}
	
	public int getRows2() {
		return rows;
	}

	public void setRows(int rows) {
		this.rows = rows;
	}

	public String getSw() {
		return sw== null?"":sw.trim();
	}

	public void setSw(String sw) {
		this.sw = sw;
	}
	

	public String getSw1() {
		return sw1== null?"":sw1.trim();
	}

	public void setSw1(String sw1) {
		this.sw1 = sw1;
	}

	public String getSw2() {
		return sw2== null?"":sw2.trim();
	}

	public void setSw2(String sw2) {
		this.sw2 = sw2;
	}

	public String getOrder() {
		if(order == null || order.equals("")){
			return "desc";
		}
		return order;
	}
	
	public String getOrder(String order) {
		return StringUtils.isEmpty(this.order)?order:this.order;
	}

	public void setOrder(String order) {
		this.order = order;
	}

	public String getSort() {
		if(sort == null || sort.equals("")){
			return "id";
		}
		return sort;
	}
	public String getSort(String def) {
		return sort==null?def:sort.trim();
	}

	public void setSort(String sort) {
		this.sort = sort;
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getBeginTime() {
		return beginTime;
	}

	public void setBeginTime(String beginTime) {
		this.beginTime = beginTime;
	}

	public String getEndTime() {
		if(!StringUtils.isEmpty(endTime)){
			return endTime + " 23:59:59";
		}
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
	}
	
}
