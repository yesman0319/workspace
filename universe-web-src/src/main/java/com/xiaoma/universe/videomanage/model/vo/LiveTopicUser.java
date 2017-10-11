package com.xiaoma.universe.videomanage.model.vo;

import java.io.Serializable;

import com.xiaoma.universe.information.model.BaseEntity;

/**
 * @Title:消息Entity
 * @Description: TODO
 * @author zuotong
 * @since 2017年04月18日
 * @version V1.0  
 */
public class LiveTopicUser extends BaseEntity implements Serializable {
    private Integer courseId;//系列ID
    private Integer topicId;//话题ID
    private Integer userId;//学生ID
    private java.util.Date createDate;//createDate

	public LiveTopicUser() {
		super();
	}
	
    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }
    public Integer getTopicId() {
        return topicId;
    }

    public void setTopicId(Integer topicId) {
        this.topicId = topicId;
    }
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }
    public java.util.Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(java.util.Date createDate) {
        this.createDate = createDate;
    }

}
