package com.xiaoma.universe.shopping.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;

import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.dataformat.xml.annotation.JacksonXmlRootElement;

/**
 * @Title:钱包明细Entity
 * @Description:
 * @author xiaoma
 * @since 2016年12月19日
 * @version V1.0
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
@JacksonXmlRootElement(localName = "object") 
public class WalletDetail implements Serializable {
	private static final long serialVersionUID = -2618991443482902249L;
	private Integer id;
	private Integer userId;// 用户Id
	private Integer inout;// 0=in,1=out
	private BigDecimal amount;// 货币数量
	private BigDecimal balance;// 用户余额
	private Integer paymentType;//支付类型
	private Integer typeId;// 类型，0=订单，1=后台
	private String outTradeNo;
	private String transactionId;// 事物id
	private String detail;// 详情
	private String remark;// 备注
	private Integer opUserId;// 操作人Id
	@DateTimeFormat(pattern="yyyy-MM-dd HH:mm:ss")
	private Date createDate;// 创建时间
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getUserId() {
		return userId;
	}
	public void setUserId(Integer userId) {
		this.userId = userId;
	}
	public Integer getInout() {
		return inout;
	}
	public void setInout(Integer inout) {
		this.inout = inout;
	}
	public BigDecimal getAmount() {
		return amount;
	}
	public void setAmount(BigDecimal amount) {
		this.amount = amount;
	}
	public BigDecimal getBalance() {
		return balance;
	}
	public void setBalance(BigDecimal balance) {
		this.balance = balance;
	}
	
	public Integer getPaymentType() {
		return paymentType;
	}
	public void setPaymentType(Integer paymentType) {
		this.paymentType = paymentType;
	}
	public Integer getTypeId() {
		return typeId;
	}
	public void setTypeId(Integer typeId) {
		this.typeId = typeId;
	}

	public String getOutTradeNo() {
		return outTradeNo;
	}
	public void setOutTradeNo(String outTradeNo) {
		this.outTradeNo = outTradeNo;
	}
	public String getTransactionId() {
		return transactionId;
	}
	public void setTransactionId(String transactionId) {
		this.transactionId = transactionId;
	}
	public String getDetail() {
		return detail;
	}
	public void setDetail(String detail) {
		this.detail = detail;
	}
	public String getRemark() {
		return remark;
	}
	public void setRemark(String remark) {
		this.remark = remark;
	}
	public Integer getOpUserId() {
		return opUserId;
	}
	public void setOpUserId(Integer opUserId) {
		this.opUserId = opUserId;
	}
	public java.util.Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(java.util.Date createDate) {
		this.createDate = createDate;
	}

}
