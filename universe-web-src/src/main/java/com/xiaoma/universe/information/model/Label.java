package com.xiaoma.universe.information.model;

import java.io.Serializable;

/**
 * @Title:资料标签Entity
 * @Description: TODO
 * @author xiaoma
 * @since 2016年07月29日
 * @version V1.0  
 */
public class Label extends BaseEntity implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = -7204131866783259862L;
	private Integer categoryId;//资料分类
    private String name;//标签名称

	public Label() {
		super();
	}
	
    public Integer getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Integer categoryId) {
        this.categoryId = categoryId;
    }
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}
