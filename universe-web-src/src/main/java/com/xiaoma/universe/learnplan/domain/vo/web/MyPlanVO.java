/**
 * 
 */
package com.xiaoma.universe.learnplan.domain.vo.web;

/**
 * @author xiaoma
 *
 */
public class MyPlanVO {
	private String id;
	private int planId;
	private String name;
	private String planSummary;
	private int isPay; 
	private double localPrice;
	private String listImage;
	private String ImageColor;
	private String currentDayId;
	private int currentDayNumber = 0;
	private String currentDayName = "";
	private String lastDoTime;
	private String lastDoTimeLong;
	private int userStatus;
	
	public int getPlanId() {
		return planId;
	}
	public void setPlanId(int planId) {
		this.planId = planId;
	}
	public String getLastDoTimeLong() {
		return lastDoTimeLong;
	}
	public void setLastDoTimeLong(String lastDoTimeLong) {
		this.lastDoTimeLong = lastDoTimeLong;
	}
	public String getLastDoTime() {
		return lastDoTime;
	}
	public void setLastDoTime(String lastDoTime) {
		this.lastDoTime = lastDoTime;
	}
	public int getUserStatus() {
		return userStatus;
	}
	public void setUserStatus(int userStatus) {
		this.userStatus = userStatus;
	}
	public int getCurrentDayNumber() {
		return currentDayNumber;
	}
	public void setCurrentDayNumber(int currentDayNumber) {
		this.currentDayNumber = currentDayNumber;
	}
	public String getCurrentDayId() {
		return currentDayId;
	}
	public void setCurrentDayId(String currentDayId) {
		this.currentDayId = currentDayId;
	}
	public String getCurrentDayName() {
		return currentDayName;
	}
	public void setCurrentDayName(String currentDayName) {
		this.currentDayName = currentDayName;
	}
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPlanSummary() {
		return planSummary;
	}
	public void setPlanSummary(String planSummary) {
		this.planSummary = planSummary;
	}
	public int getIsPay() {
		return isPay;
	}
	public void setIsPay(int isPay) {
		this.isPay = isPay;
	} 
	public double getLocalPrice() {
		return localPrice;
	}
	public void setLocalPrice(double localPrice) {
		this.localPrice = localPrice;
	}
	public String getListImage() {
		return listImage;
	}
	public void setListImage(String listImage) {
		this.listImage = listImage;
	}
	public String getImageColor() {
		return ImageColor;
	}
	public void setImageColor(String imageColor) {
		ImageColor = imageColor;
	}
	
	
}
