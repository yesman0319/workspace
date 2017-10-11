package com.xiaoma.universe.common.api;

import java.io.Serializable;
import java.util.Date;
 
public class AccessToken implements Serializable{

	private static final long serialVersionUID = 1L;
	  
	private String token_type;
	private String access_token;
	private String refresh_token; 
	private int expires_in;
	/** 
	 * 生成时间
	 */
	private Date create_dt;
	/** 
	 * 到期时间
	 */
	private Date expires_dt;
	 
	public String getToken_type() {
		return token_type;
	}
	public void setToken_type(String token_type) {
		this.token_type = token_type;
	}
	public String getAccess_token() {
		return access_token;
	}
	public void setAccess_token(String access_token) {
		this.access_token = access_token;
	}
	public String getRefresh_token() {
		return refresh_token;
	}
	public void setRefresh_token(String refresh_token) {
		this.refresh_token = refresh_token;
	}
	 
	public Date getCreate_dt() {
		return create_dt;
	}
	public void setCreate_dt(Date create_dt) {
		this.create_dt = create_dt;
	}
	public Date getExpires_dt() {
		return expires_dt;
	}
	public void setExpires_dt(Date expires_dt) {
		this.expires_dt = expires_dt;
	}
	public static long getSerialversionuid() {
		return serialVersionUID;
	}
	public int getExpires_in() {
		return expires_in;
	}
	public void setExpires_in(int expires_in) {
		this.expires_in = expires_in;
	}

}
