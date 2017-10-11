package com.xiaoma.universe.userlogin.controller;

import java.io.Serializable;

public class UserVO implements Serializable{
 
	//是否是新注册用户
	public static int IS_NEW_REGISTER_NO = 0;  //非
	public static int IS_NEW_REGISTER_YES = 1;//是
	 
	private int id=0;
	/** 
     * 唯一证书
     */
	private String ticket=""; 
	private String username=""; 
	/** 
	 * 昵称
	 */
	private String nickname="";
	
	/** 
	 * 头像
	 */
	private String avatar="";
	/** 
	 * 性别
	 */
	private int gender=0;
	private String phone="";
	private String  email="";
	private int  role=0;
	
	//认证信息
	private String access_token="";
	private String refresh_token=""; 
	private Integer expires_in=0;
	
	//是不是新注册用户
	private int new_user;
	private String weixin_openid="";
	private String weixin_unionid="";
	private int weixin_sex;
	private String weixin_nickname;
	private String weixin_headimgurl;
	
	
	public String getWeixin_openid() {
		return weixin_openid;
	}
	public void setWeixin_openid(String weixin_openid) {
		this.weixin_openid = weixin_openid;
	}
	public String getWeixin_unionid() {
		return weixin_unionid;
	}
	public void setWeixin_unionid(String weixin_unionid) {
		this.weixin_unionid = weixin_unionid;
	}
	public int getWeixin_sex() {
		return weixin_sex;
	}
	public void setWeixin_sex(int weixin_sex) {
		this.weixin_sex = weixin_sex;
	}
	public String getWeixin_nickname() {
		return weixin_nickname;
	}
	public void setWeixin_nickname(String weixin_nickname) {
		this.weixin_nickname = weixin_nickname;
	}
	public String getWeixin_headimgurl() {
		return weixin_headimgurl;
	}
	public void setWeixin_headimgurl(String weixin_headimgurl) {
		this.weixin_headimgurl = weixin_headimgurl;
	}
	public String getUsername() {
		return username;
	}
	public void setUsername(String username) {
		this.username = username;
	}
 
	public String getNickname() {
		return nickname;
	}
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}
	public String getAvatar() {
		return avatar;
	}
	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}
	public int getGender() {
		return gender;
	}
	public void setGender(int gender) {
		this.gender = gender;
	}
	public String getPhone() {
		return phone;
	}
	public void setPhone(String phone) {
		this.phone = phone;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	
    public String getTicket() {
        return ticket;
    }
    public void setTicket(String ticket) {
        this.ticket = ticket;
    }
   
    
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
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
	public Integer getExpires_in() {
		return expires_in;
	}
	public void setExpires_in(Integer expires_in) {
		this.expires_in = expires_in;
	}
	public int getRole() {
		return role;
	}
	public void setRole(int role) {
		this.role = role;
	}
	public int getNew_user() {
		return new_user;
	}
	public void setNew_user(int new_user) {
		this.new_user = new_user;
	}
	
}
