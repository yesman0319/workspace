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
public class VideoSections implements Serializable {
	private Integer id;//视频小节id
    private String name;//视频小节的名字
    private Integer sortNum;//排序号
    private Integer courseId;//yztf_video_courses的主键
    private Integer groupId;//yztf_video_group的id
    private Integer partId;//yztf_video_part下的id
    private String info;//简介
    private String suitableCrow;//使用人群
    private Integer publishStatus;//发否发布（0没有发布，1发布）
    private Integer createUser;//createUser
    private Long createTime;//createTime
    private Integer updateUser;//updateUser
    private Long updateTime;//updateTime
    private List<LessionsDetailForWeb>  listLessionsDetailForWeb;

	public VideoSections() {
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
    public Integer getGroupId() {
        return groupId;
    }

    public void setGroupId(Integer groupId) {
        this.groupId = groupId;
    }
    public Integer getPartId() {
        return partId;
    }

    public void setPartId(Integer partId) {
        this.partId = partId;
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


	public List<LessionsDetailForWeb> getListLessionsDetailForWeb() {
		return listLessionsDetailForWeb;
	}


	public void setListLessionsDetailForWeb(List<LessionsDetailForWeb> listLessionsDetailForWeb) {
		this.listLessionsDetailForWeb = listLessionsDetailForWeb;
	}
	
}
