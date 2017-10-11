/**
 * 
 */
package com.xiaoma.universe.learnplan.domain.vo.api.exercise;

import java.util.List;

/**
 * @author xiaoma
 *
 */
public class TranslatesVO {
	private int status;
	private String groupName;
	private List<TranslateVO> result;
	
	
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public List<TranslateVO> getResult() {
		return result;
	}
	public void setResult(List<TranslateVO> result) {
		this.result = result;
	} 
	
}
