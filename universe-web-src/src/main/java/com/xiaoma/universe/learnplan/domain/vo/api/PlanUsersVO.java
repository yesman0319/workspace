/**
 * 
 */
package com.xiaoma.universe.learnplan.domain.vo.api;

import java.util.List;

/**
 * @author xiaoma
 *
 */
public class PlanUsersVO {
	private int counts;
	private String next;
	private String privious;
	
	private List<UserPlanVO> results;

	public int getCounts() {
		return counts;
	}

	public void setCounts(int counts) {
		this.counts = counts;
	}

	public String getNext() {
		return next;
	}

	public void setNext(String next) {
		this.next = next;
	}

	public String getPrivious() {
		return privious;
	}

	public void setPrivious(String privious) {
		this.privious = privious;
	}

	public List<UserPlanVO> getResults() {
		return results;
	}

	public void setResults(List<UserPlanVO> results) {
		this.results = results;
	}
	
	
}
