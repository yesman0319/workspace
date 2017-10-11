package com.xiaoma.universe.h5.model;

import java.util.List;

/**
 * h5句子翻译的vo
 * @author Administrator
 *
 */
/**
 * @author Administrator
 *
 */
public class TranslateH5VO {
	private int groupUnitId; 
	private String groupName;
	private List<Translate> list;
	private String time;   //累计的时间
	private int days;    //坚持练习多少天
	public int getGroupUnitId() {
		return groupUnitId;
	}
	public void setGroupUnitId(int groupUnitId) {
		this.groupUnitId = groupUnitId;
	}
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public int getDays() {
		return days;
	}
	public void setDays(int days) {
		this.days = days;
	}
	public List<Translate> getList() {
		return list;
	}
	public void setList(List<Translate> list) {
		this.list = list;
	}
}
