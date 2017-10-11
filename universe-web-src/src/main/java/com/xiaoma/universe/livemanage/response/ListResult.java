package com.xiaoma.universe.livemanage.response;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class ListResult<T>{
    private long counts;

    private int page;

    private int rows;

    private List<T> results;
    
    public long getCounts() {
        return counts;
    }

    public void setCounts(long counts) {
        this.counts = counts;
    }

	public int getPage() {
		return page;
	}

	public void setPage(int page) {
		this.page = page;
	}

	public int getRows() {
		return rows;
	}

	public void setRows(int rows) {
		this.rows = rows;
	}

	public List<T> getResults() {
		return results;
	}

	public void setResults(List<T> results) {
		this.results = results;
	}
	
	/**
	 * 获取分页的参数
	 * @param result
	 * @return
	 */
	public static  Map<String, Object> getPaging(ListResult<?> result) {
		Map<String, Object> paging = new HashMap<String, Object>();
		if(result == null || result.getCounts() <= 0){
			paging.put("counts", 0);
			paging.put("totalPage", 0);
			paging.put("curPage", 0);
			paging.put("rows", 20);
			paging.put("page", 0);
			return paging;
		}
		
		int totalPage = 0;
		long counts = result.getCounts();
		int rows = result.getRows();
		//分页
		int remainder  = (int) (counts % rows) ;
		if(remainder == 0){
			totalPage = (int) (counts / rows);
		}else{
			totalPage = (int) (counts / rows + 1);
		}
		
		paging.put("counts", counts);
		paging.put("totalPage", totalPage);
		paging.put("curPage", result.getPage());
		paging.put("page",  result.getPage());
		paging.put("rows", rows);
		return paging;
	}
	
	
	
}