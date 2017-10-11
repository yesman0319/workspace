package com.xiaoma.universe.videomanage.model.vo;

import java.io.Serializable;
import java.text.SimpleDateFormat;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class MyCoursesForWebVo implements Serializable{
	
	private Integer id;//课程id
	private Integer premissionId;//权限id
    private String name;//视频课程的名字
    private String coverPhoto;//封面
    private String info;//简介
    private String suitableCrow;//使用人群
    private Integer sortNum;//排序号
    private Integer totalClass;//包含多少个视频
    private Integer totalView;//总的观看数量
    private Integer publishStatus;//发否发布（0没有发布，1发布）
    private Integer isPay;//是否是付费（0免费，1付费）
    private Integer goodId;//对应的产品,是复数类型，可能对应多个产品
    private Integer createUser;//createUser
    private Long createTime;//createTime
    private Integer updateUser;//updateUser
    private Long updateTime;//updateTime
    private String totalTime;//总时长
    private String groupsName;//组名称
    private String partsName;//集名称
    private String sectionsName;//小节名称
    private String lessionName;//课名称
    private Integer partsId;//集id
    private String count;//观看过几个
    private Long lastWatch;//最后观看时间
    private Integer attrId;//商品属性id
    private Integer goodUseId;//商品使用属性id
    private String price;//价格
    private String infoApp;//infoApp
    private String infoWeb;//infoWeb
    private String infoH5;//infoWeb    
    private Integer isOverDue;//是否过期0：正常使用；1：过期
    
	public Integer getPremissionId() {
		return premissionId;
	}
	public void setPremissionId(Integer premissionId) {
		this.premissionId = premissionId;
	}
	public Integer getPartsId() {
		return partsId;
	}
	public void setPartsId(Integer partsId) {
		this.partsId = partsId;
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
	public String getCoverPhoto() {
		return coverPhoto;
	}
	public void setCoverPhoto(String coverPhoto) {
		this.coverPhoto = coverPhoto;
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
	public Integer getSortNum() {
		return sortNum;
	}
	public void setSortNum(Integer sortNum) {
		this.sortNum = sortNum;
	}
	public Integer getTotalClass() {
		return totalClass;
	}
	public void setTotalClass(Integer totalClass) {
		this.totalClass = totalClass;
	}
	public Integer getTotalView() {
		return totalView;
	}
	public void setTotalView(Integer totalView) {
		this.totalView = totalView;
	}
	public Integer getPublishStatus() {
		return publishStatus;
	}
	public void setPublishStatus(Integer publishStatus) {
		this.publishStatus = publishStatus;
	}
	public Integer getIsPay() {
		return isPay;
	}
	public void setIsPay(Integer isPay) {
		this.isPay = isPay;
	}
	public Integer getGoodId() {
		return goodId;
	}
	public void setGoodId(Integer goodId) {
		this.goodId = goodId;
	}
	public Integer getCreateUser() {
		return createUser;
	}
	public void setCreateUser(Integer createUser) {
		this.createUser = createUser;
	}
	public Long getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Long createTime) {
		this.createTime = createTime;
	}
	public Integer getUpdateUser() {
		return updateUser;
	}
	public void setUpdateUser(Integer updateUser) {
		this.updateUser = updateUser;
	}
	public Long getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Long updateTime) {
		this.updateTime = updateTime;
	}
	public String getTotalTime() {
		return totalTime;
	}
	public void setTotalTime(String totalTime) {
		this.totalTime = totalTime;
	}
	public String getGroupsName() {
		return groupsName;
	}
	public void setGroupsName(String groupsName) {
		this.groupsName = groupsName;
	}
	public String getPartsName() {
		return partsName;
	}
	public void setPartsName(String partsName) {
		this.partsName = partsName;
	}
	public String getSectionsName() {
		return sectionsName;
	}
	public void setSectionsName(String sectionsName) {
		this.sectionsName = sectionsName;
	}
	public String getLessionName() {
		return lessionName;
	}
	public void setLessionName(String lessionName) {
		this.lessionName = lessionName;
	}
	public String getCount() {
		return count;
	}
	public void setCount(String count) {
		this.count = count;
	}
	public String getLastWatch() {
		if(lastWatch!=null&&lastWatch>=0)
		{
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			String dateStr = sdf.format(new Date(lastWatch));
			return dateStr;
		}
		return null;
	}
	public void setLastWatch(Long lastWatch) {
		this.lastWatch = lastWatch;
	}
	public Integer getAttrId() {
		return attrId;
	}
	public void setAttrId(Integer attrId) {
		this.attrId = attrId;
	}
	public Integer getGoodUseId() {
		return goodUseId;
	}
	public void setGoodUseId(Integer goodUseId) {
		this.goodUseId = goodUseId;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	public String getInfoApp() {
		return infoApp;
	}
	public void setInfoApp(String infoApp) {
		this.infoApp = infoApp;
	}
	public String getInfoWeb() {
		return infoWeb;
	}
	public void setInfoWeb(String infoWeb) {
		this.infoWeb = infoWeb;
	}
	public String getInfoH5() {
		return infoH5;
	}
	public void setInfoH5(String infoH5) {
		this.infoH5 = infoH5;
	}
	public Integer getIsOverDue() {
		return isOverDue;
	}
	public void setIsOverDue(Integer isOverDue) {
		this.isOverDue = isOverDue;
	}
    
    
}
