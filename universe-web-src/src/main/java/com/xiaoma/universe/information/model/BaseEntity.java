package com.xiaoma.universe.information.model;

import javax.persistence.MappedSuperclass;

/**
 * @Title: 统一定义id的entity基类
 * @Description: TODO
 * @author zuotong
 * @since 2016年7月4日
 * @version V1.0
 */
@MappedSuperclass
public abstract class BaseEntity {

	protected Integer id;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}
}
