package com.xiaoma.universe.information.model;

import java.io.Serializable;
import java.util.Date;

/**
 * @Title:资料Entity
 * @Description: TODO
 * @author Alex
 * @since 2016年08月23日
 * @version V1.0  
 */
/**
 * @author Alex
 *
 */
public class Info extends BaseEntity implements Serializable {
    private String name;//资料名称
    private String fileUrl;//文件展示URL
    private String downloadUrl;//文件下载URL
    private String fileSize;//文件大小
    private String fileContentType;//文件类型
    private Integer categoryId;//资料分类
    private String planIds;//学习计划ids
    private String labels;//标签
    private String description;//描述
    private Integer download;//下载次数
    private Integer year;//上传时间-年
    private Integer month;//上传时间-月
    private Integer day;//上传时间-日
    private Integer top;//今日首推
    private Integer position;//位置
    private String createBy;//创建人
    private Date createTime;//创建时间
    private String updateBy;//修改人
    private Date updateTime;//修改时间
    private Integer type;//类型，是否免费0收费1免费
    private String productIds;//资料相关联的产品Ids
    private Integer browse;//browse

	public Info() {
		super();
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getFileUrl() {
		return fileUrl;
	}

	public void setFileUrl(String fileUrl) {
		this.fileUrl = fileUrl;
	}

	public String getDownloadUrl() {
		return downloadUrl;
	}

	public void setDownloadUrl(String downloadUrl) {
		this.downloadUrl = downloadUrl;
	}

	public String getFileSize() {
		return fileSize;
	}

	public void setFileSize(String fileSize) {
		this.fileSize = fileSize;
	}

	public String getFileContentType() {
		return fileContentType;
	}

	public void setFileContentType(String fileContentType) {
		this.fileContentType = fileContentType;
	}

	public Integer getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(Integer categoryId) {
		this.categoryId = categoryId;
	}

	public String getPlanIds() {
		return planIds;
	}

	public void setPlanIds(String planIds) {
		this.planIds = planIds;
	}

	public String getLabels() {
		return labels;
	}

	public void setLabels(String labels) {
		this.labels = labels;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Integer getDownload() {
		return download;
	}

	public void setDownload(Integer download) {
		this.download = download;
	}

	public Integer getYear() {
		return year;
	}

	public void setYear(Integer year) {
		this.year = year;
	}

	public Integer getMonth() {
		return month;
	}

	public void setMonth(Integer month) {
		this.month = month;
	}

	public Integer getDay() {
		return day;
	}

	public void setDay(Integer day) {
		this.day = day;
	}

	public Integer getTop() {
		return top;
	}

	public void setTop(Integer top) {
		this.top = top;
	}

	public Integer getPosition() {
		return position;
	}

	public void setPosition(Integer position) {
		this.position = position;
	}

	public String getCreateBy() {
		return createBy;
	}

	public void setCreateBy(String createBy) {
		this.createBy = createBy;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}
	
//	public void setCreateTime(Long createTime) {
//		this.createTime = new Date(createTime);
//	}
	public String getUpdateBy() {
		return updateBy;
	}

	public void setUpdateBy(String updateBy) {
		this.updateBy = updateBy;
	}

	public Date getUpdateTime() {
		return updateTime;
	}
	
//	public void setUpdateTime(Long updateTime) {
//
//		this.updateTime = new Date(updateTime);
//	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public Integer getType() {
		return type;
	}

	public void setType(Integer type) {
		this.type = type;
	}

	public String getProductIds() {
		return productIds;
	}

	public void setProductIds(String productIds) {
		this.productIds = productIds;
	}

	public Integer getBrowse() {
		return browse;
	}

	public void setBrowse(Integer browse) {
		this.browse = browse;
	}
	
   
}
