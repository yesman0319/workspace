package com.xiaoma.universe.wechat.model.dto;

import java.io.Serializable;

/**
 * @Title:Entity
 * @Description: TODO
 * @author Administrator
 * @since 2016年11月22日
 * @version V1.0  
 */
public class TWechatTowDimensionCode  implements Serializable {
	private Integer id ;
    private Integer userId;//userId
    private String wechatOpenId;//wechatOpenId
    private String wechatUnionId;//wechatUnionId
    private String ticket;//ticket
    private String expireSeconds;//expireSeconds
    private String myUrl;//myUrl
    private String url;//url
    private String yunUrl;//yunUrl
    private Long createTime;//createTime

	public TWechatTowDimensionCode() {
		super();
	}
	
    public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
    public String getWechatOpenId() {
        return wechatOpenId;
    }

    public void setWechatOpenId(String wechatOpenId) {
        this.wechatOpenId = wechatOpenId;
    }
    public String getWechatUnionId() {
        return wechatUnionId;
    }

    public void setWechatUnionId(String wechatUnionId) {
        this.wechatUnionId = wechatUnionId;
    }
    public String getTicket() {
        return ticket;
    }

    public void setTicket(String ticket) {
        this.ticket = ticket;
    }
    public String getExpireSeconds() {
        return expireSeconds;
    }

    public void setExpireSeconds(String expireSeconds) {
        this.expireSeconds = expireSeconds;
    }
    public String getMyUrl() {
        return myUrl;
    }

    public void setMyUrl(String myUrl) {
        this.myUrl = myUrl;
    }
    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }
    public String getYunUrl() {
        return yunUrl;
    }

    public void setYunUrl(String yunUrl) {
        this.yunUrl = yunUrl;
    }
    public Long getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Long createTime) {
        this.createTime = createTime;
    }

}
