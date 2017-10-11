package com.xiaoma.universe.videomanage.model.vo;

import java.io.Serializable;
import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.xiaoma.rest.authentication.TeacherInfo;
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CourseForWebByIdVo  implements Serializable {
	/** 
	 * @Fields serialVersionUID : TODO
	 */ 
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
    private String goodId;//对应的产品,是复数类型，可能对应多个产品
    private Integer createUser;//createUser
    private Long createTime;//createTime
    private Integer updateUser;//updateUser
    private Long updateTime;//updateTime
    private String price;//价格
    private String hasBuy;//是否已购买
    private String tips;//页面提示
    private String lessionName;//课名称
    private String lastPartId;//最后播放的集
    private String infoApp;//infoApp
    private String infoWeb;//infoWeb
    private String infoH5;//infoH5
    
    
    private TeacherInfo teacher; //教师情况
    
    
   	public TeacherInfo getTeacher() {
   		return teacher;
   	}
   	public void setTeacher(TeacherInfo teacher) {
   		this.teacher = teacher;
   	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getPremissionId() {
		return premissionId;
	}
	public void setPremissionId(Integer premissionId) {
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
	public String getGoodId() {
		return goodId;
	}
	public void setGoodId(String goodId) {
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
	
	public String getTips() {
		return tips;
	}
	public void setTips(String tips) {
		this.tips = tips;
	}
	public String getLastPartId() {
		return lastPartId;
	}
	public void setLastPartId(String lastPartId) {
		this.lastPartId = lastPartId;
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
