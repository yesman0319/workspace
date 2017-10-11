package com.xiaoma.universe.microcourse.domain.vo;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude; 
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CourseForWebByIdVO  implements Serializable {
	/** 
	 * @Fields serialVersionUID : TODO
	 */ 
	protected int id;
	private String premissionId;//权限id
    private String name;//视频课程的名字
    private String coverPhoto;//封面
    private String info;//简介
    private String suitableCrow;//使用人群
    private int sortNum;//排序号
    private int totalClass;//包含多少个视频
    private int totalView;//总的观看数量
    private int publishStatus;//发否发布（0没有发布，1发布）
    private int isPay;//是否是付费（0免费，1付费）
    private String goodId;//对应的产品,是复数类型，可能对应多个产品
    private int createUser;//createUser
    private Long createTime;//createTime
    private int updateUser;//updateUser
    private Long updateTime;//updateTime
    private String price;//价格
    private String hasBuy;//是否已购买\
    private int lastPartId;//最后观看视频集
    private String tips;//页面提示
    private String lessionName ;//最后观看的视频
    private String infoApp;//infoApp
    private String infoWeb;//infoWeb
    private String infoH5;//infoH5
    
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getPremissionId() {
		return premissionId;
	}
	public void setPremissionId(String premissionId) {
		this.premissionId = premissionId;
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
	public int getSortNum() {
		return sortNum;
	}
	public void setSortNum(int sortNum) {
		this.sortNum = sortNum;
	}
	public int getTotalClass() {
		return totalClass;
	}
	public void setTotalClass(int totalClass) {
		this.totalClass = totalClass;
	}
	public int getTotalView() {
		return totalView;
	}
	public void setTotalView(int totalView) {
		this.totalView = totalView;
	}
	public int getPublishStatus() {
		return publishStatus;
	}
	public void setPublishStatus(int publishStatus) {
		this.publishStatus = publishStatus;
	}
	public int getIsPay() {
		return isPay;
	}
	public void setIsPay(int isPay) {
		this.isPay = isPay;
	}
	public String getGoodId() {
		return goodId;
	}
	public void setGoodId(String goodId) {
		this.goodId = goodId;
	}
	public int getCreateUser() {
		return createUser;
	}
	public void setCreateUser(int createUser) {
		this.createUser = createUser;
	}
	public Long getCreateTime() {
		return createTime;
	}
	public void setCreateTime(Long createTime) {
		this.createTime = createTime;
	}
	public int getUpdateUser() {
		return updateUser;
	}
	public void setUpdateUser(int updateUser) {
		this.updateUser = updateUser;
	}
	public Long getUpdateTime() {
		return updateTime;
	}
	public void setUpdateTime(Long updateTime) {
		this.updateTime = updateTime;
	}
	public String getPrice() {
		return price;
	}
	public void setPrice(String price) {
		this.price = price;
	}
	public String getHasBuy() {
		return hasBuy;
	}
	public void setHasBuy(String hasBuy) {
		this.hasBuy = hasBuy;
	}
	public int getLastPartId() {
		return lastPartId;
	}
	public void setLastPartId(int lastPartId) {
		this.lastPartId = lastPartId;
	}
	
	public String getTips() {
		return tips;
	}
	public void setTips(String tips) {
		this.tips = tips;
	} 
	public String getLessionName() {
		return lessionName;
	}
	public void setLessionName(String lessionName) {
		this.lessionName = lessionName;
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
	
    
}
