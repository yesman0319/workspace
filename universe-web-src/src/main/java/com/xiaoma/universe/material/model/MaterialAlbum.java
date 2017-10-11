package com.xiaoma.universe.material.model;

import java.io.Serializable;

//素材 专辑 
public class MaterialAlbum implements Serializable {
    
	private Integer id;
    private String albumName;
    private String createPersion;
    private java.util.Date createTime;
    private String albumDescription;
    private Integer sortNum;
    
	public Integer getSortNum() {
		return sortNum;
	}
	public void setSortNum(Integer sortNum) {
		this.sortNum = sortNum;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getAlbumName() {
		return albumName;
	}
	public void setAlbumName(String albumName) {
		this.albumName = albumName;
	}
	public String getCreatePersion() {
		return createPersion;
	}
	public void setCreatePersion(String createPersion) {
		this.createPersion = createPersion;
	}
	public java.util.Date getCreateTime() {
		return createTime;
	}
	public void setCreateTime(java.util.Date createTime) {
		this.createTime = createTime;
	}
	public String getAlbumDescription() {
		return albumDescription;
	}
	public void setAlbumDescription(String albumDescription) {
		this.albumDescription = albumDescription;
	}
}
