package com.xiaoma.universe.jijing.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class GroupQuestionVO {
	private Integer page;
	private Integer pageSize;
	private Integer total;
	private Integer totalPage;
	private String nextPage;
	private String beforePage;
	private List<JijingNewGroupPO> groups;
	private List<JijingQuestionVO> questions;
	public Integer getPage() {
		return page;
	}
	public void setPage(Integer page) {
		this.page = page;
	}
	public Integer getPageSize() {
		return pageSize;
	}
	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}
	public Integer getTotal() {
		return total;
	}
	public void setTotal(Integer total) {
		this.total = total;
	}
	public Integer getTotalPage() {
		return totalPage;
	}
	public void setTotalPage(Integer totalPage) {
		this.totalPage = totalPage;
	}
	public String getNextPage() {
		return nextPage;
	}
	public void setNextPage(String nextPage) {
		this.nextPage = nextPage;
	}
	public String getBeforePage() {
		return beforePage;
	}
	public void setBeforePage(String beforePage) {
		this.beforePage = beforePage;
	}
	public List<JijingNewGroupPO> getGroups() {
		return groups;
	}
	public void setGroups(List<JijingNewGroupPO> groups) {
		this.groups = groups;
	}
	public List<JijingQuestionVO> getQuestions() {
		return questions;
	}
	public void setQuestions(List<JijingQuestionVO> questions) {
		this.questions = questions;
	}
	

	
	
}
