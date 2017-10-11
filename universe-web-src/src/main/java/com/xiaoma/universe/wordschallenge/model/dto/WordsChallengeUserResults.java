package com.xiaoma.universe.wordschallenge.model.dto;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class WordsChallengeUserResults implements Serializable {
    private String weixinNickname;          //微信用户名
    private String weixinHeadimgurl;        //微信头像
    private String weixinUnionid;           //微信唯一id
    private Integer shareId;                //分享id
    private String results;                 //答题结果;/*格式为*  id1-answer1;id2-answer2;*/
    private Double time;                    //答题时间（毫秒）
    
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
	public String getWeixinUnionid() {
		return weixinUnionid;
	}
	public void setWeixinUnionid(String weixinUnionid) {
		this.weixinUnionid = weixinUnionid;
	}
	public Integer getShareId() {
		return shareId;
	}
	public void setShareId(Integer shareId) {
		this.shareId = shareId;
	}
	public String getResults() {
		return results;
	}
	public void setResults(String results) {
		this.results = results;
	}
	public Double getTime() {
		return time;
	}
	public void setTime(Double time) {
		this.time = time;
	}
    
    
    
}
