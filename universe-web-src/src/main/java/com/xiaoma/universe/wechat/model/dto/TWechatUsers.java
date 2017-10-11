package com.xiaoma.universe.wechat.model.dto;

import java.io.Serializable;

/**
 * @Title:Entity
 * @Description: TODO
 * @author Administrator
 * @since 2016年11月23日
 * @version V1.0  
 */
public class TWechatUsers implements Serializable {
	private Integer id;
    private String openId;//openId
    private String unionId;//unionId
    private String nickName;//nickName
    private String event;//event
    private String sex;//sex
    private String language;//language
    private String city;//city
    private String province;//province
    private String country;//country
    private String headImgUrl;//headImgUrl
    private String subscribeTime;//subscribeTime
    private String remark;//remark
    private String groupid;//groupid
    private Long createTime;//createTime
    private Integer shareCount;//shareCount
    private Integer killCount;

	public TWechatUsers() {
		super();
	}
	
    public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }
    public String getUnionId() {
        return unionId;
    }

    public void setUnionId(String unionId) {
        this.unionId = unionId;
    }
    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }
    public String getEvent() {
        return event;
    }

    public void setEvent(String event) {
        this.event = event;
    }
    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }
    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }
    public String getProvince() {
        return province;
    }

    public void setProvince(String province) {
        this.province = province;
    }
    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }
    public String getHeadImgUrl() {
        return headImgUrl;
    }

    public void setHeadImgUrl(String headImgUrl) {
        this.headImgUrl = headImgUrl;
    }
    public String getSubscribeTime() {
        return subscribeTime;
    }

    public void setSubscribeTime(String subscribeTime) {
        this.subscribeTime = subscribeTime;
    }
    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }
    public String getGroupid() {
        return groupid;
    }

    public void setGroupid(String groupid) {
        this.groupid = groupid;
    }
    public Long getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Long createTime) {
        this.createTime = createTime;
    }
    public Integer getShareCount() {
        return shareCount;
    }

    public void setShareCount(Integer shareCount) {
        this.shareCount = shareCount;
    }

	public Integer getKillCount() {
		return killCount;
	}

	public void setKillCount(Integer killCount) {
		this.killCount = killCount;
	}

    
}
