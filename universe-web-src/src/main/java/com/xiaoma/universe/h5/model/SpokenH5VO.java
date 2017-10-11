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
public class SpokenH5VO {
	private int groupId; 
	private String groupName;
	private List<Spoken> list;
	private String time;   //累计的时间
	private int days;    //坚持练习多少天

	public int getGroupId() {
		return groupId;
	}
	public void setGroupId(int groupId) {
		this.groupId = groupId;
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
	public List<Spoken> getList() {
		return list;
	}
	public void setList(List<Spoken> list) {
		this.list = list;
	}
}
