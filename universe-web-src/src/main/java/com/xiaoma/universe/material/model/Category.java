package com.xiaoma.universe.material.model;

import java.io.Serializable;

public class Category implements Serializable {
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
