package com.xiaoma.universe.message.domain;
 
import java.util.List;
import java.util.Map;

import javax.persistence.Entity; 
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class ContentInfoVO {  
	private int clickTitleIndex;
	private int clickType;
	private String text;
	private List<String> titleList;
	private Map<String,String> extraData;
	public int getClickTitleIndex() {
		return clickTitleIndex;
	}
	public void setClickTitleIndex(int clickTitleIndex) {
		this.clickTitleIndex = clickTitleIndex;
	}
	public int getClickType() {
		return clickType;
	}
	public void setClickType(int clickType) {
		this.clickType = clickType;
	}
	public String getText() {
		return text;
	}
	public void setText(String text) {
		this.text = text;
	}
	public List<String> getTitleList() {
		return titleList;
	}
	public void setTitleList(List<String> titleList) {
		this.titleList = titleList;
	}
	public Map<String, String> getExtraData() {
		return extraData;
	}
	public void setExtraData(Map<String, String> extraData) {
		this.extraData = extraData;
	}
	
	
}
