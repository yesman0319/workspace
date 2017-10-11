package com.xiaoma.universe.h5.model;

import java.util.Date;

/**
 * 写作和口语的评论
 * @Class Name SpeakWriterCommen
 * @Author dangxingfei@xiaoma.cn
 * @Create In 2016年10月25日
 */
public class SpeakWriteComment {
	private Integer id;	//	
	
	private Integer answerId;	//	答案id		
	
	private Integer audioLength;	//	音频的长度		
	
	private String avatar;	//	点评头像	string	
	
	private String commentAudio;	//	点评音频		
	
	private String commentTxt;	//	点评文字		
	
	private Date createdAt;	//	点评时间		
	
	private Integer isMyself;	//	是否是自己的点评	(1是自己的)
	
	private String nickname;	//用户昵称		
	
	private Integer  questionId;	//问题id		
	
	private Integer role;	 //是否为老师 1是老师		
	
	private Integer type;	//类型		
	
	private Integer Integer; //

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getAnswerId() {
		return answerId;
	}

	public void setAnswerId(Integer answerId) {
		this.answerId = answerId;
	}

	public Integer getAudioLength() {
		return audioLength;
	}

	public void setAudioLength(Integer audioLength) {
		this.audioLength = audioLength;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public String getCommentAudio() {
		return commentAudio;
	}

	public void setCommentAudio(String commentAudio) {
		this.commentAudio = commentAudio;
	}

	public String getCommentTxt() {
		return commentTxt;
	}

	public void setCommentTxt(String commentTxt) {
		this.commentTxt = commentTxt;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Integer getIsMyself() {
		return isMyself;
	}

	public void setIsMyself(Integer isMyself) {
		this.isMyself = isMyself;
	}

	public String getNickname() {
		return nickname;
	}

	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public Integer getQuestionId() {
		return questionId;
	}

	public void setQuestionId(Integer questionId) {
		this.questionId = questionId;
	}

	public Integer getRole() {
		return role;
	}

	public void setRole(Integer role) {
		this.role = role;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public Integer getInteger() {
		return Integer;
	}

	public void setInteger(Integer integer) {
		Integer = integer;
	}
	
	

}
