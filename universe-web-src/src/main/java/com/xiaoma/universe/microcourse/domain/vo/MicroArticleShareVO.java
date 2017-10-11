/**
 * 
 */
package com.xiaoma.universe.microcourse.domain.vo;

import java.util.Date;

import javax.persistence.Column;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * @author xiaoma
 *
 */

@JsonInclude(JsonInclude.Include.NON_NULL)
public class MicroArticleShareVO {
	private int shareId;
	private int userId; // 分享人用户id
	private int articleId; 
	private String weixinUnionid; 
	private String weixinNickname; 
	private String weixinHeadimgurl;
	private Date createTime;
	
	
	public Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	
	public int getShareId() {
		return shareId;
	}
	public void setShareId(int shareId) {
		this.shareId = shareId;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public int getArticleId() {
		return articleId;
	}
	public void setArticleId(int articleId) {
		this.articleId = articleId;
	}
	public String getWeixinUnionid() {
		return weixinUnionid;
	}
	public void setWeixinUnionid(String weixinUnionid) {
		this.weixinUnionid = weixinUnionid;
	}
	public String getWeixinNickname() {
		return weixinNickname;
	}
	public void setWeixinNickname(String weixinNickname) {
		this.weixinNickname = weixinNickname;
	}
	public String getWeixinHeadimgurl() {
		return weixinHeadimgurl;
	}
	public void setWeixinHeadimgurl(String weixinHeadimgurl) {
		this.weixinHeadimgurl = weixinHeadimgurl;
	}
	
	
}
