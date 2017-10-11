package com.xiaoma.universe.message.domain;

import java.util.Date;
import java.util.List;
 

import com.fasterxml.jackson.annotation.JsonInclude;
import com.xiaoma.rest.framework.model.RestEntity;


@JsonInclude(JsonInclude.Include.NON_NULL)
public class MessageInfoVO   extends RestEntity {  
	/**
	 * 
	 */
	private static long serialVersionUID = 1L;
	private int userId;
	private int originType; 
	private String originName; 
	private String thirdpartyId; 
	 
	private ContentInfoVO contentInfo;
	 
	private Date createTime;
	 
	private Date updateTime;
	 

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public static void setSerialversionuid(long serialversionuid) {
		serialVersionUID = serialversionuid;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public void setContentInfo(ContentInfoVO contentInfo) {
		this.contentInfo = contentInfo;
	}

	public int getOriginType() {
		return originType;
	}

	public void setOriginType(int originType) {
		this.originType = originType;
	}

	public String getOriginName() {
		return originName;
	}

	public void setOriginName(String originName) {
		this.originName = originName;
	}

	public String getThirdpartyId() {
		return thirdpartyId;
	}

	public void setThirdpartyId(String thirdpartyId) {
		this.thirdpartyId = thirdpartyId;
	}

	public ContentInfoVO getContentInfo() {
		return contentInfo;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}
 
	
}
