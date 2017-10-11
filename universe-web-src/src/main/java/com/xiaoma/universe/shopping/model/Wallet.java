package com.xiaoma.universe.shopping.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

import org.springframework.format.annotation.DateTimeFormat;

/**
 * @Title:钱包Entity
 * @Description:
 * @author xiaoma
 * @since 2016年12月19日
 * @version V1.0
 */
public class Wallet implements Serializable {
	private static final long serialVersionUID = -6906435710643529757L;
	private Integer id;
	private Integer userId;// 用户id
	private String userName;// 用户名
	private String password;// 钱包密码
	private BigDecimal amount;// 金额
	private BigDecimal balance;//余额
	private String mobile;// 手机号
	private Integer userType;// 用户类型,0=学生，1=老师
	private Integer status;// 状态：0=冻结，1=激活
	private Integer withdrawal;// 提现：0=否，1=是
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private java.util.Date createDate;// 开通时间
	@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	private java.util.Date updateDate;// 更新时间	
	private List<Good> goods;

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

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
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

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public Integer getUserType() {
		return userType;
	}

	public void setUserType(Integer userType) {
		this.userType = userType;
	}

	public Integer getStatus() {
		return status;
	}

	public void setStatus(Integer status) {
		this.status = status;
	}

	public Integer getWithdrawal() {
		return withdrawal;
	}

	public void setWithdrawal(Integer withdrawal) {
		this.withdrawal = withdrawal;
	}

	public java.util.Date getCreateDate() {
		return createDate;
	}

	public void setCreateDate(java.util.Date createDate) {
		this.createDate = createDate;
	}

	public java.util.Date getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(java.util.Date updateDate) {
		this.updateDate = updateDate;
	}

	public List<Good> getGoods() {
		return goods;
	}

	public void setGoods(List<Good> goods) {
		this.goods = goods;
	}

}
