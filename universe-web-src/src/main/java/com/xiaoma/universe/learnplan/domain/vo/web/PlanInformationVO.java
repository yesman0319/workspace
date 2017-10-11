/**
 * 
 */
package com.xiaoma.universe.learnplan.domain.vo.web;

import java.util.Date;

/**
 * @author xiaoma
 *
 */
public class PlanInformationVO {
	private int planId; 	//计划id 
	private int informationId; //资料id
	private String name;     //名字  
	private int downloadCount; //下载次数
	private String uploadData;
	private String icon;
	
	public int getPlanId() {
		return planId;
	}
	public void setPlanId(int planId) {
		this.planId = planId;
	}
	public int getInformationId() {
		return informationId;
	}
	public void setInformationId(int informationId) {
		this.informationId = informationId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	  
	public int getDownloadCount() {
		return downloadCount;
	}
	public void setDownloadCount(int downloadCount) {
		this.downloadCount = downloadCount;
	}
	public String getUploadData() {
		return uploadData;
	}
	public void setUploadData(String uploadData) {
		this.uploadData = uploadData;
	}
	public String getIcon() {
		return icon;
	}
	public void setIcon(String icon) {
		this.icon = icon;
	} 
	
}
