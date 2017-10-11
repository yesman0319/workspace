package com.xiaoma.universe.videomanage.model.vo;

import java.io.Serializable;

import com.xiaoma.universe.information.model.BaseEntity;

/**
 * @Title:消息Entity
 * @Description: TODO
 * @author zuotong
 * @since 2017年04月14日
 * @version V1.0  
 */
public class LiveMessage extends BaseEntity implements Serializable {
    private String topic;//话题
    private Integer topicId;//话题Id
    private java.util.Date createTime;//生成时间
    private Integer userType;//用户类型
    private Integer userId;//用户ID
    private String userName;//用户名称
    private String avatar;//用户头像
    private Integer msgid;//消息ID
    private java.util.Date msgTime;//消息时间
    private String msgType;//消息类型
    private String content;//消息体
    private String analContent;//解析消息体
    private Integer cancel;//撤销
    private Integer top;//点赞数量
    private Integer read;//是否已读

	public LiveMessage() {
		super();
	}
	
    public String getTopic() {
        return topic;
    }

    public void setTopic(String topic) {
        this.topic = topic;
    }
    public Integer getTopicId() {
        return topicId;
    }

    public void setTopicId(Integer topicId) {
        this.topicId = topicId;
    }
    public java.util.Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(java.util.Date createTime) {
        this.createTime = createTime;
    }
    public Integer getUserType() {
        return userType;
    }

    public void setUserType(Integer userType) {
        this.userType = userType;
    }
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }
    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
    public Integer getMsgid() {
        return msgid;
    }

    public void setMsgid(Integer msgid) {
        this.msgid = msgid;
    }
    public java.util.Date getMsgTime() {
        return msgTime;
    }

    public void setMsgTime(java.util.Date msgTime) {
        this.msgTime = msgTime;
    }
    public String getMsgType() {
        return msgType;
    }

    public void setMsgType(String msgType) {
        this.msgType = msgType;
    }
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
    public String getAnalContent() {
        return analContent;
    }

    public void setAnalContent(String analContent) {
        this.analContent = analContent;
    }
    public Integer getCancel() {
        return cancel;
    }

    public void setCancel(Integer cancel) {
        this.cancel = cancel;
    }
    public Integer getTop() {
        return top;
    }

    public void setTop(Integer top) {
        this.top = top;
    }

	public Integer getRead() {
		return read;
	}

	public void setRead(Integer read) {
		this.read = read;
	}

}
