package com.xiaoma.universe.information.model;

import java.io.Serializable;
import java.util.Date;

/**
 * @Title:资料下载记录Entity
 * @Description: TODO
 * @author xiaoma
 * @since 2016年07月29日
 * @version V1.0
 */
public class DownloadHistory extends BaseEntity implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 310370292525875602L;
	private Integer infoId;// 资料Id
	private String infoName;// 资料名称
	private String fileType;// 文件的类型word,ppt,pdf,rar
	private Integer categoryId;// 资料分类
	private String categoryName;// 资料分类名称
	private String ip;// ip地址
	private Integer userId;// 用户Id
	private String userName;// 用户名称
	private java.util.Date downloadTime;// 下载时间
	private String planId;// planId
	private String infoDescription;

	public DownloadHistory() {
		super();
	}

	public Integer getInfoId() {
		return infoId;
	}

	public void setInfoId(Integer infoId) {
		this.infoId = infoId;
	}

	public String getInfoName() {
		return infoName;
	}

	public void setInfoName(String infoName) {
		this.infoName = infoName;
	}

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
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

	public java.util.Date getDownloadTime() {
		return downloadTime;
	}

	public void setDownloadTime(java.util.Date downloadTime) {
		this.downloadTime = downloadTime;
	}

	public String getFileType() {
		return fileType;
	}

	public void setFileType(String fileType) {
		this.fileType = fileType;
	}

	public String getPlanId() {
		return planId;
	}

	public void setPlanId(String planId) {
		this.planId = planId;
	}

	public String getInfoDescription() {
		return infoDescription;
	}

	public void setInfoDescription(String infoDescription) {
		this.infoDescription = infoDescription;
	}

	/**
	 * 字符串时间戳
	 * 
	 * @return
	 */
	public String getTimeStr() {
		if (null == downloadTime) {
			return "1分钟前";
		}

		long l = new Date().getTime() - downloadTime.getTime();
		long day = l / (24 * 60 * 60 * 1000);

		if (day > 0) {
			if (day == 1) {
				return "昨天";
			} else {
				return day + "天前";
			}
		}
		long hour = (l / (60 * 60 * 1000) - day * 24);
		if (hour > 0) {
			return hour + "小时前";
		}
		long min = ((l / (60 * 1000)) - day * 24 * 60 - hour * 60);

		if (min > 0) {
			return min + "分钟前";
		}
		long s = (l / 1000 - day * 24 * 60 * 60 - hour * 60 * 60 - min * 60);

		if (s > 0) {
			return s + "秒前";
		}

		return "1分钟前";
	}

}
