package com.xiaoma.universe.h5.model.vip;

import java.io.Serializable;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * vip卡
 * 
 * @Class Name VipCard
 * @Author dangxingfei@xiaoma.cn
 * @Create In 2017年2月8日
 */
public class VipCardDTO implements Serializable {
	private Integer id;
	private String cardNumber;
	private java.math.BigDecimal denomination;
	private Integer activeUser;
	private String activeStudentPhone;
	private String activationCode;
	private String buyUserIdentity;
	private String checkCode;
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getCardNumber() {
		return cardNumber;
	}
	public void setCardNumber(String cardNumber) {
		this.cardNumber = cardNumber;
	}
	public java.math.BigDecimal getDenomination() {
		return denomination;
	}
	public void setDenomination(java.math.BigDecimal denomination) {
		this.denomination = denomination;
	}
	public Integer getActiveUser() {
		return activeUser;
	}
	public void setActiveUser(Integer activeUser) {
		this.activeUser = activeUser;
	}
	public String getActiveStudentPhone() {
		return activeStudentPhone;
	}
	public void setActiveStudentPhone(String activeStudentPhone) {
		this.activeStudentPhone = activeStudentPhone;
	}
	public String getActivationCode() {
		return activationCode;
	}
	public void setActivationCode(String activationCode) {
		this.activationCode = activationCode;
	}
	public String getBuyUserIdentity() {
		return buyUserIdentity;
	}
	public void setBuyUserIdentity(String buyUserIdentity) {
		this.buyUserIdentity = buyUserIdentity;
	}
	public String getCheckCode() {
		return checkCode;
	}
	public void setCheckCode(String checkCode) {
		this.checkCode = checkCode;
	}

}
