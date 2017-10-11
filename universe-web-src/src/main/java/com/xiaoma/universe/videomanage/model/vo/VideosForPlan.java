package com.xiaoma.universe.videomanage.model.vo;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * @Title:视频Entity
 * @Description: TODO
 * @author Administrator
 * @since 2016年08月04日
 * @version V1.0  
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class VideosForPlan  implements Serializable {
	private static final long serialVersionUID = 4851096852393585322L;
	
	public static final int IS_PAY_FREE_YES = 0;			//免费cc回放课
	public static final int IS_PAY_FREE_NO= 1;			//付费cc回放课
	
	public static final int IS_GENSEE = 1; //展示互动的视频
	public static final int IS_CC = 2; //展示互动的视频
	
	@JsonInclude
	private Integer id;//视频id
    private Integer lessionId;//视频课的id
	private Integer videoId;//视频的id
    private String name;//视频课程的名字
    private Integer type;//视频类型（1回放课程，2 cc视频）
    private Integer productId;//回播课中的产品id
    private Integer categoryId;//分类id
    private Integer productTypeId;//产品类型id
    private Long startTime;//回播课的开始时间
    private Long endTime;//yztf_video_sections的id
    private String imgUrl;//图片地址
    private String playUrl;//播放地址
    private Integer teacherId;//teacherId
    private String teacherName;//老师的名称
    private Integer subjectType;//科目类型（0基础，1强化，2进阶）
    private String subjectName;//科目名称
    private String description;//简介
    private String duration;//时长
    private Integer status;//状态（0无效，1有效）
    private Integer viewNum;//观看次数
    private Integer createUser;//createUser
    private Long createTime;//createTime
    private Integer updateUser;//updateUser
    private Long updateTime;//updateTime
    private String canSee;//是否可观看(1：有权观看:0：无权观看:2：可以试看)
    private String hasSee;//是否看过(:0：未看过:1：已看过)
    private Integer isPay;
    private String tips;

    
    
	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public Integer getLessionId() {
		return lessionId;
	}

	public void setLessionId(Integer lessionId) {
		this.lessionId = lessionId;
	}

	public Integer getVideoId() {
		return videoId;
	}

	public void setVideoId(Integer videoId) {
		this.videoId = videoId;
	}

	public String getCanSee() {
		return canSee;
	}

	public void setCanSee(String canSee) {
		this.canSee = canSee;
	}

	public VideosForPlan() {
		super();
	}
	
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }
    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }
    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }
    public Integer getProductTypeId() {
        return productTypeId;
    }

    public void setProductTypeId(Integer productTypeId) {
        this.productTypeId = productTypeId;
    }
    public Long getStartTime() {
        return startTime;
    }

    public void setStartTime(Long startTime) {
        this.startTime = startTime;
    }
    public Long getEndTime() {
        return endTime;
    }

    public void setEndTime(Long endTime) {
        this.endTime = endTime;
    }
    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }
    public String getPlayUrl() {
        return playUrl;
    }

    public void setPlayUrl(String playUrl) {
        this.playUrl = playUrl;
    }
    public Integer getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(Integer teacherId) {
        this.teacherId = teacherId;
    }
    public String getTeacherName() {
        return teacherName;
    }

    public void setTeacherName(String teacherName) {
        this.teacherName = teacherName;
    }
    public Integer getSubjectType() {
        return subjectType;
    }

    public void setSubjectType(Integer subjectType) {
        this.subjectType = subjectType;
    }
    public String getSubjectName() {
        return subjectName;
    }

    public void setSubjectName(String subjectName) {
        this.subjectName = subjectName;
    }
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }
    public Integer getStatus() {
        return status;
    }

    public void setStatus(Integer status) {
        this.status = status;
    }
    public Integer getViewNum() {
        return viewNum;
    }

    public void setViewNum(Integer viewNum) {
        this.viewNum = viewNum;
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

	public Integer getIsPay() {
		return isPay;
	}

	public void setIsPay(Integer isPay) {
		this.isPay = isPay;
	}

	public String getHasSee() {
		return hasSee;
	}

	public void setHasSee(String hasSee) {
		this.hasSee = hasSee;
	}

	public String getTips() {
		return tips;
	}

	public void setTips(String tips) {
		this.tips = tips;
	}
	
}
