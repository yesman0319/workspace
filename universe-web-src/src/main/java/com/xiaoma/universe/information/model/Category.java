package com.xiaoma.universe.information.model;

import java.io.Serializable;

/**
 * @Title:资料分类Entity
 * @Description: TODO
 * @author xiaoma
 * @since 2016年07月29日
 * @version V1.0  
 */
public class Category extends BaseEntity implements Serializable {
    /**
	 * 
	 */
	private static final long serialVersionUID = 993603088587077563L;
	private String name;//名称
    private String description;//描述
    private String imgageUrl;//图片URL
    private Integer position;//排序

	public Category() {
		super();
	}
	
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
    public String getImgageUrl() {
        return imgageUrl;
    }

    public void setImgageUrl(String imgageUrl) {
        this.imgageUrl = imgageUrl;
    }
    public Integer getPosition() {
        return position;
    }

    public void setPosition(Integer position) {
        this.position = position;
    }

}
