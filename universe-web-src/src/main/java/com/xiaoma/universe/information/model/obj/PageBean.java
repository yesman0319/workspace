package com.xiaoma.universe.information.model.obj;

import java.util.List;

import com.xiaoma.universe.information.model.DownloadHistory;
import com.xiaoma.universe.information.model.Info;

public class PageBean {
	private List<Info> infoList;
	private List<DownloadHistory> dhList;
	private Integer page;
	private Integer totalPage;
	private Integer total;
	public List<Info> getInfoList() {
		return infoList;
	}
	public void setInfoList(List<Info> infoList) {
		this.infoList = infoList;
	}
	public Integer getPage() {
		return page;
	}
	public void setPage(Integer page) {
		this.page = page;
	}
	public Integer getTotalPage() {
		return totalPage;
	}
	public void setTotalPage(Integer totalPage) {
		this.totalPage = totalPage;
	}
	public List<DownloadHistory> getDhList() {
		return dhList;
	}
	public void setDhList(List<DownloadHistory> dhList) {
		this.dhList = dhList;
	}
	public Integer getTotal() {
		return total;
	}
	public void setTotal(Integer total) {
		this.total = total;
	}
	

}
