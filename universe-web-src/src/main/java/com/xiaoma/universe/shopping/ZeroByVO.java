package com.xiaoma.universe.shopping;

public class ZeroByVO {
//	data:{"code":code,"goodId":'${good.id}',"attrId":selectedAttrId,
//	"outOrderId":'${outOrderId}',"callBack": '${callBack}',
//	"recommentPersion":recommentPersion,"learnStartTime":selectedLearnStartTime,"totalPrice":totalPrice,"couponId":checkedCouponId},

	private int code;
	private int goodId;
	private String attrId;
	private String outOrderId;
	private String callBack;
	private String recommentPersion;
	private String learnStartTime;
	private String totalPrice;
	private int couponId;
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public int getGoodId() {
		return goodId;
	}
	public void setGoodId(int goodId) {
		this.goodId = goodId;
	}
	public String getAttrId() {
		return attrId;
	}
	public void setAttrId(String attrId) {
		this.attrId = attrId;
	}
	public String getOutOrderId() {
		return outOrderId;
	}
	public void setOutOrderId(String outOrderId) {
		this.outOrderId = outOrderId;
	}
	public String getCallBack() {
		return callBack;
	}
	public void setCallBack(String callBack) {
		this.callBack = callBack;
	}
	public String getRecommentPersion() {
		return recommentPersion;
	}
	public void setRecommentPersion(String recommentPersion) {
		this.recommentPersion = recommentPersion;
	}
	public String getLearnStartTime() {
		return learnStartTime;
	}
	public void setLearnStartTime(String learnStartTime) {
		this.learnStartTime = learnStartTime;
	}
	public String getTotalPrice() {
		return totalPrice;
	}
	public void setTotalPrice(String totalPrice) {
		this.totalPrice = totalPrice;
	}
	public int getCouponId() {
		return couponId;
	}
	public void setCouponId(int couponId) {
		this.couponId = couponId;
	}
	
}
