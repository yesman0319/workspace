package com.xiaoma.universe.wechat.model.dto;

import java.io.Serializable;

/**
 * @Title:Entity
 * @Description: TODO
 * @author Administrator
 * @since 2016年11月22日
 * @version V1.0  
 */
public class TWechatShareLog  implements Serializable {
	private Integer id;
    private String fromOpenId;//fromOpenId
    private String fromUnionId;//fromUnionId
    private String toOpenId;//toOpenId
    private String toUnionId;//toUnionId
    private String nickName;//toUnionId
    private String sex;//toUnionId
    private String headImgUrl;//toUnionId
    private String subscribeTime;//toUnionId
    private Long createTime;//createTime

	public TWechatShareLog() {
		super();
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getFromOpenId() {
		return fromOpenId;
	}

	public void setFromOpenId(String fromOpenId) {
		this.fromOpenId = fromOpenId;
	}

	public String getFromUnionId() {
		return fromUnionId;
	}

	public void setFromUnionId(String fromUnionId) {
		this.fromUnionId = fromUnionId;
	}

	public String getToOpenId() {
		return toOpenId;
	}

	public void setToOpenId(String toOpenId) {
		this.toOpenId = toOpenId;
	}

	public String getToUnionId() {
		return toUnionId;
	}

	public void setToUnionId(String toUnionId) {
		this.toUnionId = toUnionId;
	}

	public String getNickName() {
		return nickName;
	}

	public void setNickName(String nickName) {
		this.nickName = nickName;
	}

	public String getSex() {
		return sex;
	}

	public void setSex(String sex) {
		this.sex = sex;
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

	public Long getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Long createTime) {
		this.createTime = createTime;
	}
	
	

}
