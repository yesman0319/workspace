package com.xiaoma.universe.livemanage.model;

public class LiveLessionDetailVO extends LivelessionVO {
	
    private String playUrl;	//播放地址
    
    private String roomNum; //房间号码
    
    private String roomPwd;  //房间密码
    
    private String host;
    
    private String serviceType;
    
    private String productTypeName;	//产品类型名称
    
    private String productTypeNameColor;  //产品类型的颜色值
	
	public String getPlayUrl() {
		return playUrl;
	}
	public void setPlayUrl(String playUrl) {
		this.playUrl = playUrl;
	}
	public String getRoomNum() {
		return roomNum;
	}
	public void setRoomNum(String roomNum) {
		this.roomNum = roomNum;
	}
	public String getRoomPwd() {
		return roomPwd;
	}
	public void setRoomPwd(String roomPwd) {
		this.roomPwd = roomPwd;
	}
	public String getHost() {
		return host;
	}
	public void setHost(String host) {
		this.host = host;
	}
	public String getServiceType() {
		return serviceType;
	}
	public void setServiceType(String serviceType) {
		this.serviceType = serviceType;
	}
	public String getProductTypeName() {
		return productTypeName;
	}
	public void setProductTypeName(String productTypeName) {
		this.productTypeName = productTypeName;
	}
	public String getProductTypeNameColor() {
		return productTypeNameColor;
	}
	public void setProductTypeNameColor(String productTypeNameColor) {
		this.productTypeNameColor = productTypeNameColor;
	}
}
