/**
 * 
 */
package com.xiaoma.universe.common.paging;

import java.net.URISyntaxException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang.StringUtils;
import org.apache.http.NameValuePair;
import org.apache.http.client.utils.URIBuilder;


/**
 * @author xiaoma
 *
 */
public class YzPagingInfo {


	//分页大小
	public final static int PAGE_SIZE_DEFAULT = 20;

	//分页大小的参数名称
	public final static String PAGE_SIZE_PARAM_NAME = "page_size";

	//页码的参数名称
	public final static String PAGE_PARAM_NAME = "page";

	//分页的最大数量
	public final static int MAX_PAGE_SIZE = 200;
	
	//显示页索引大小 ,当前页面向前和向后的页数
	public final static int PAGE_INDEX_SIZE = 2;

	// 请求
	private HttpServletRequest request; 
	// 总数
	private Long total;

	// 每页大小
	private Integer pageSize;

	// 当前页
	private Integer currentPage;

	// 下一页
	private Integer nextPage;

	// 上一页
	private Integer previousPage;

	// 最后页
	private Integer lastPage;

	// 第一页
	private Integer firstPage;

	// 总页数
	private Integer totalPage;

	// 查询url 不包含页码
	private String queryUrl;

	// 当前页url
	private String currentUrl;

	// 上一页url
	private String previousUrl;

	// 下一页url
	private String nextUrl;


	private int page_count;
	
	private int startPage;
	private int endPage;
	
	
	
	public int getStartPage() {
		return startPage;
	}


	public int getEndPage() {
		return endPage;
	}


	public YzPagingInfo(HttpServletRequest request,long total){

		try {
			this.request = request; 
			this.total = total; 

			// 当前页
			String pageStr = request.getParameter(PAGE_PARAM_NAME);
			if(pageStr != null){
				this.currentPage = Integer.parseInt(pageStr);
			} else {
				this.currentPage = 1;
			}

			//获取分页大小的参数名称
			String pageSizeStr = request.getParameter(PAGE_SIZE_PARAM_NAME);
			if(pageSizeStr != null){
				int pageSize = Integer.parseInt(pageSizeStr);
				this.pageSize = pageSize > MAX_PAGE_SIZE ? MAX_PAGE_SIZE : pageSize;
			} else {
				this.pageSize = PAGE_SIZE_DEFAULT;
			}
			
			String requestUrl = request.getRequestURL().toString();
			String queryUri = StringUtils.isEmpty(request.getQueryString()) ? "" : request.getQueryString();

			this.currentUrl = (requestUrl + "?" + queryUri);

			if(this.total == null || currentPage == null || pageSize == null) {

			}
			// 计算总页数
			this.totalPage =  (int) Math.ceil(Double.valueOf(this.total) / Double.valueOf(this.pageSize));
			
			// 设置第一页
			this.firstPage = 1;
			this.lastPage = this.totalPage;

			// 计算下一页 上一页
			// Integer nextPageNum = this.currentPage.equals(this.totalPage) ? null : this.currentPage + 1;
			//Integer previousPageNum = this.currentPage.equals(new Integer(1)) ? null : this.currentPage - 1;

			Integer nextPageNum = this.currentPage >= totalPage? null : this.currentPage + 1;
			Integer previousPageNum = this.currentPage <= 1 ? null : this.currentPage - 1;
			if(previousPageNum!=null && previousPageNum<1)
				previousPageNum = 1;
			
			if(nextPageNum!=null && nextPageNum > this.totalPage)
				nextPageNum = this.totalPage;

			String pageValue = this.request.getParameter(PAGE_PARAM_NAME);
			// 构建一个下一页
			URIBuilder urlb;
			urlb = new URIBuilder(this.currentUrl);

			if(nextPageNum != null) {
				// 设置下一页
				urlb.setParameter(PAGE_SIZE_PARAM_NAME, String.valueOf(this.pageSize));
				if (pageValue != null) {
					urlb.setParameter(PAGE_PARAM_NAME, String.valueOf(nextPageNum));
				} else {
					urlb.addParameter(PAGE_PARAM_NAME, String.valueOf(nextPageNum));
				}
				this.nextPage = nextPageNum;
				this.nextUrl = urlb.build().toURL().toString();
			}else{
				this.nextUrl = "";
			}
			// 上一页
			urlb = new URIBuilder(this.getCurrentUrl());
			if(previousPageNum != null) {
				// 设置下一页
				urlb.setParameter(PAGE_SIZE_PARAM_NAME, String.valueOf(this.pageSize));
				if (pageValue != null) {
					urlb.setParameter(PAGE_PARAM_NAME, String.valueOf(previousPageNum));
				} else {
					urlb.addParameter(PAGE_PARAM_NAME, String.valueOf(previousPageNum));
				}
				this.previousPage = previousPageNum;
				this.previousUrl = urlb.build().toURL().toString();
			}else{
				this.previousUrl = "";
			}
			
			// 开始页和结束页
			this.startPage = this.currentPage - YzPagingInfo.PAGE_INDEX_SIZE; 
			this.endPage = this.currentPage + YzPagingInfo.PAGE_INDEX_SIZE;  
			if(this.startPage<this.firstPage){
				this.endPage = this.endPage + (this.firstPage-this.startPage); 
				this.startPage = this.firstPage;
			}
			
			if(this.endPage>this.lastPage){
				this.endPage = this.lastPage;
			}

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public YzPagingInfo(HttpServletRequest request,long total,int page_size){

		try {
			this.request = request; 
			this.total = total; 

			// 当前页
			String pageStr = request.getParameter(PAGE_PARAM_NAME);
			if(pageStr != null){
				this.currentPage = Integer.parseInt(pageStr);
			} else {
				this.currentPage = 1;
			}

			//获取分页大小的参数名称
			String pageSizeStr = String.valueOf(pageSize);
			if(pageSizeStr != null){
				int pageSize = page_size;
				this.pageSize = pageSize > MAX_PAGE_SIZE ? MAX_PAGE_SIZE : pageSize;
			} else {
				this.pageSize = page_size;
			}
			
			String requestUrl = request.getRequestURL().toString();
			String queryUri = StringUtils.isEmpty(request.getQueryString()) ? "" : request.getQueryString();

			this.currentUrl = (requestUrl + "?" + queryUri);

			if(this.total == null || currentPage == null || pageSize == null) {

			}
			// 计算总页数
			this.totalPage =  (int) Math.ceil(Double.valueOf(this.total) / Double.valueOf(this.pageSize));
			
			// 设置第一页
			this.firstPage = 1;
			this.lastPage = this.totalPage;

			// 计算下一页 上一页
			// Integer nextPageNum = this.currentPage.equals(this.totalPage) ? null : this.currentPage + 1;
			//Integer previousPageNum = this.currentPage.equals(new Integer(1)) ? null : this.currentPage - 1;

			Integer nextPageNum = this.currentPage >= totalPage? null : this.currentPage + 1;
			Integer previousPageNum = this.currentPage <= 1 ? null : this.currentPage - 1;
			if(previousPageNum!=null && previousPageNum<1)
				previousPageNum = 1;
			
			if(nextPageNum!=null && nextPageNum > this.totalPage)
				nextPageNum = this.totalPage;

			String pageValue = this.request.getParameter(PAGE_PARAM_NAME);
			// 构建一个下一页
			URIBuilder urlb;
			urlb = new URIBuilder(this.currentUrl);

			if(nextPageNum != null) {
				// 设置下一页
				urlb.setParameter(PAGE_SIZE_PARAM_NAME, String.valueOf(this.pageSize));
				if (pageValue != null) {
					urlb.setParameter(PAGE_PARAM_NAME, String.valueOf(nextPageNum));
				} else {
					urlb.addParameter(PAGE_PARAM_NAME, String.valueOf(nextPageNum));
				}
				this.nextPage = nextPageNum;
				this.nextUrl = urlb.build().toURL().toString();
			}else{
				this.nextUrl = "";
			}
			// 上一页
			urlb = new URIBuilder(this.getCurrentUrl());
			if(previousPageNum != null) {
				// 设置下一页
				urlb.setParameter(PAGE_SIZE_PARAM_NAME, String.valueOf(this.pageSize));
				if (pageValue != null) {
					urlb.setParameter(PAGE_PARAM_NAME, String.valueOf(previousPageNum));
				} else {
					urlb.addParameter(PAGE_PARAM_NAME, String.valueOf(previousPageNum));
				}
				this.previousPage = previousPageNum;
				this.previousUrl = urlb.build().toURL().toString();
			}else{
				this.previousUrl = "";
			}
			
			// 开始页和结束页
			this.startPage = this.currentPage - YzPagingInfo.PAGE_INDEX_SIZE; 
			this.endPage = this.currentPage + YzPagingInfo.PAGE_INDEX_SIZE;  
			if(this.startPage<this.firstPage){
				this.endPage = this.endPage + (this.firstPage-this.startPage); 
				this.startPage = this.firstPage;
			}
			
			if(this.endPage>this.lastPage){
				this.endPage = this.lastPage;
			}

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
	public String getPageToUrl(int page){
		URIBuilder urlb;
		try {
			if(page < this.firstPage){
				return "";
			}
			if(page > this.lastPage){
				return "";
			}

			urlb = new URIBuilder(this.currentUrl); 
			urlb.setParameter(PAGE_SIZE_PARAM_NAME, String.valueOf(this.pageSize));
			urlb.setParameter(PAGE_PARAM_NAME, ""+page); 

			return urlb.build().toURL().toString();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		return null;
	}

	
	public String getUrlNoPage(){
		URIBuilder urlb;
		try { 
			urlb = new URIBuilder(this.currentUrl); 
			List<NameValuePair> list = urlb.getQueryParams();
			for(NameValuePair pair:list){
				if(pair.getName().equals(YzPagingInfo.PAGE_PARAM_NAME)){
					list.remove(pair);
					break;
				}
				
			}
			urlb.clearParameters();
			urlb.addParameters(list); 
			return urlb.build().toURL().toString();
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} 
		return null;
	}
	
	public HttpServletRequest getRequest() {
		return request;
	}


	public Long getTotal() {
		return total;
	}


	public Integer getPageSize() {
		return pageSize;
	}


	public Integer getCurrentPage() {
		return currentPage;
	}


	public Integer getNextPage() {
		return nextPage;
	}


	public Integer getPreviousPage() {
		return previousPage;
	}


	public Integer getLastPage() {
		return lastPage;
	}


	public Integer getFirstPage() {
		return firstPage;
	}


	public Integer getTotalPage() {
		return totalPage;
	}


	public String getQueryUrl() {
		return queryUrl;
	}


	public String getCurrentUrl() {
		return currentUrl;
	}


	public String getPreviousUrl() {
		return previousUrl;
	}


	public String getNextUrl() {
		return nextUrl;
	}


	public int getPage_count() {
		return page_count;
	}


}
