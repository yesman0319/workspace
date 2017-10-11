package com.xiaoma.universe.liveroom.model.dto;

import java.io.Serializable;

/**
 * @Title:Entity
 * @Description: TODO
 * @author Administrator
 * @since 2017年04月05日
 * @version V1.0  
 */
public class StatusDto implements Serializable {
	/** 
	 * @Fields serialVersionUID : TODO
	 */ 
	private static final long serialVersionUID = -6815065208833461250L;
	/** 
	 * @Fields serialVersionUID : TODO
	 */ 
    private String message;//返回信息
    private int status;//0：被禁言；1：未禁言;2:服务器问题

	public StatusDto() {
		super();
	}
	

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}


	@Override
	public String toString() {
		return "StatusDto [message=" + message + ", status=" + status + "]";
	}

}
