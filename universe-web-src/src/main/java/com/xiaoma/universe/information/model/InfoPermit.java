package com.xiaoma.universe.information.model;

import java.io.Serializable;

/**
 * @Title:资料权限Entity
 * @Description: TODO
 * @author xiaoma
 * @since 2016年07月29日
 * @version V1.0  
 */
public class InfoPermit extends BaseEntity implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 4376338125144875042L;
	private Integer userId;//用户id
    private String userName;//用户姓名
    private Integer productId;//所在产品id
    private java.util.Date startTime;//开始时间
    private java.util.Date endTime;//结束时间
    private Integer downloadConut;//允许下载次数
    private Integer type;//类型，0,按时间1按次数
    private java.util.Date createTime;//记录创建时间

	public InfoPermit() {
		super();
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
    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }
    public java.util.Date getStartTime() {
        return startTime;
    }

    public void setStartTime(java.util.Date startTime) {
        this.startTime = startTime;
    }
    public java.util.Date getEndTime() {
        return endTime;
    }

    public void setEndTime(java.util.Date endTime) {
        this.endTime = endTime;
    }
    public Integer getDownloadConut() {
        return downloadConut;
    }

    public void setDownloadConut(Integer downloadConut) {
        this.downloadConut = downloadConut;
    }
    public Integer getType() {
        return type;
    }

    public void setType(Integer type) {
        this.type = type;
    }
    public java.util.Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(java.util.Date createTime) {
        this.createTime = createTime;
    }

}
