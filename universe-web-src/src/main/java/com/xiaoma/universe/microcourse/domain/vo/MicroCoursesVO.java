/**
 * 
 */
package com.xiaoma.universe.microcourse.domain.vo;

import java.util.List;

/**
 * @author xiaoma
 *
 */
public class MicroCoursesVO {
	private long counts;

	private String next;

	private String privious;

	private List<MicroCourseVO> results;

	public long getCounts() {
		return counts;
	}

	public void setCounts(long counts) {
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

	public List<MicroCourseVO> getResults() {
		return results;
	}

	public void setResults(List<MicroCourseVO> results) {
		this.results = results;
	}


}
