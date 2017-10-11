package com.xiaoma.universe.wechat.model.dto;

import java.io.Serializable;

/**
 * @Title:Entity
 * @Description: TODO
 * @author Administrator
 * @since 2016年11月25日
 * @version V1.0  
 */
public class TWechatSalePersons implements Serializable {
	private Integer id;
    private String userName;//userName
    private Integer phone;//phone
    private String avatar;//avatar
    private String email;//email
    private String wechatAvatarUrl;//wechatAvatarUrl
    private Long createTime;//createTime
    private Long updateTime;//updateTime

	public TWechatSalePersons() {
		super();
	}
	
	
    public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
    public Integer getPhone() {
        return phone;
    }

    public void setPhone(Integer phone) {
        this.phone = phone;
    }
    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    public String getWechatAvatarUrl() {
        return wechatAvatarUrl;
    }

    public void setWechatAvatarUrl(String wechatAvatarUrl) {
        this.wechatAvatarUrl = wechatAvatarUrl;
    }
    public Long getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Long createTime) {
        this.createTime = createTime;
    }
    public Long getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Long updateTime) {
        this.updateTime = updateTime;
    }

}
