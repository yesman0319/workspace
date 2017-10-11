package com.xiaoma.universe.h5.model;

import java.util.List;

/**
 * 写作和口语的评论
 * @Class Name SpeakWriterCommen
 * @Author dangxingfei@xiaoma.cn
 * @Create In 2016年10月25日
 */
public class SpeakWriteCommentVO {
	
	private Integer page	;   //当前页数	number	
	
	private Integer pageSize;	//分页大小	number	
	
	private Integer total;	//总条数	number	
	
	private Integer totalPage;  //总页数
	
	private List<SpeakWriteComment> comments;
	
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
	public List<SpeakWriteComment> getComments() {
		return comments;
	}
	public void setComments(List<SpeakWriteComment> comments) {
		this.comments = comments;
	}
	
	

}
