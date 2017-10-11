package com.xiaoma.universe.videomanage.model.vo;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * @Title:Entity
 * @Description: TODO
 * @author Administrator
 * @since 2016年07月28日
 * @version V1.0  
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class VideoGroups implements Serializable {

	private Integer id;//组id
	private String name;//视频组的名字
    private Integer sortNum;//排序号
    private Integer courseId;//yztf_video_courses的主键
    private String info;//简介
    private String suitableCrow;//使用人群
    private Integer publishStatus;//发否发布（0没有发布，1发布）
    private Integer createUser;//createUser
    private Long createTime;//createTime
    private Integer updateUser;//updateUser
    private Long updateTime;//updateTime
    private List<PartsForWeb> listVideoParts;//组下集的列表

	public VideoGroups() {
		super();
	}
	
	
    public Integer getId() {
		return id;
	}


	public void setId(Integer id) {
		this.id = id;
	}


	public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public Integer getSortNum() {
        return sortNum;
    }

    public void setSortNum(Integer sortNum) {
        this.sortNum = sortNum;
    }
    public Integer getCourseId() {
        return courseId;
    }

    public void setCourseId(Integer courseId) {
        this.courseId = courseId;
    }
    public String getInfo() {
        return info;
    }

    public void setInfo(String info) {
        this.info = info;
    }
    public String getSuitableCrow() {
        return suitableCrow;
    }

    public void setSuitableCrow(String suitableCrow) {
        this.suitableCrow = suitableCrow;
    }
    public Integer getPublishStatus() {
        return publishStatus;
    }

    public void setPublishStatus(Integer publishStatus) {
        this.publishStatus = publishStatus;
    }
    public Integer getCreateUser() {
        return createUser;
    }

    public void setCreateUser(Integer createUser) {
        this.createUser = createUser;
    }
   
    public Integer getUpdateUser() {
        return updateUser;
    }

    public void setUpdateUser(Integer updateUser) {
        this.updateUser = updateUser;
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


	public List<PartsForWeb> getListVideoParts() {
		return listVideoParts;
	}


	public void setListVideoParts(List<PartsForWeb> listVideoParts) {
		this.listVideoParts = listVideoParts;
	}

	
}
