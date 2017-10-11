package com.xiaoma.universe.h5.model;

import java.util.Date;

/**
 * @author Alex
 *
 */
public class CommentVO {
	private int id;
	private int type;
	private int userId;
	private int questionId;
	private int answerId;
	private Date createdAt;
	private String commentAudio;
	private String commentTxt;
	private String nickname;
	private String avatar;
	private int isMyself;
	private int audioLength;
	private int role;
	private String time;
	private String audioTime;
	private Integer beUserId;
	private Integer shareId;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getType() {
		return type;
	}
	public void setType(int type) {
		this.type = type;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public int getQuestionId() {
		return questionId;
	}
	public void setQuestionId(int questionId) {
		this.questionId = questionId;
	}
	public int getAnswerId() {
		return answerId;
	}
	public void setAnswerId(int answerId) {
		this.answerId = answerId;
	}
	public Date getCreatedAt() {
		return createdAt;
	}
	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
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
	public int getIsMyself() {
		return isMyself;
	}
	public void setIsMyself(int isMyself) {
		this.isMyself = isMyself;
	}
	public int getAudioLength() {
		return audioLength;
	}
	public void setAudioLength(int audioLength) {
		this.audioLength = audioLength;
	}
	public int getRole() {
		return role;
	}
	public void setRole(int role) {
		this.role = role;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public String getAudioTime() {
		return audioTime;
	}
	public void setAudioTime(String audioTime) {
		this.audioTime = audioTime;
	}
	public Integer getBeUserId() {
		return beUserId;
	}
	public void setBeUserId(Integer beUserId) {
		this.beUserId = beUserId;
	}
	public Integer getShareId() {
		return shareId;
	}
	public void setShareId(Integer shareId) {
		this.shareId = shareId;
	}
	
}
