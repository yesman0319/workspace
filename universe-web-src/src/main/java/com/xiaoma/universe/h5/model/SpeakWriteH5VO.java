package com.xiaoma.universe.h5.model;

import java.util.List;

/**
 *  分享的时候的--  1机经口语 2 机经写作 3 独立口语 4独立写作
 * @author Administrator
 */
public class SpeakWriteH5VO {
		private int question_id;
		private String content;		//内容
		private int type;		//类型
		private int counts;   //数据总量	number
		private String next; //下一页(空表示无)
		private String privious; //上页地址
		private String name;
		private String groupName;
		private String moduleName;
		private int sequence_number;		//第几题
		private List<SpeakWriteShare> list;
		public int getCounts() {
			return counts;
		}
		public void setCounts(int counts) {
			this.counts = counts;
		}
		public String getNext() {
			return next;
		}
		public void setNext(String next) {
			this.next = next;
		}
		public String getPrivious() {
			return privious;
		}
		public void setPrivious(String privious) {
			this.privious = privious;
		}
		public String getName() {
			return name;
		}
		public void setName(String name) {
			this.name = name;
		}
		public int getQuestion_id() {
			return question_id;
		}
		public void setQuestion_id(int question_id) {
			this.question_id = question_id;
		}
		public List<SpeakWriteShare> getList() {
			return list;
		}
		public void setList(List<SpeakWriteShare> list) {
			this.list = list;
		}
		public int getType() {
			return type;
		}
		public void setType(int type) {
			this.type = type;
		}
		public String getContent() {
			return content;
		}
		public void setContent(String content) {
			this.content = content;
		}
		public String getGroupName() {
			return groupName;
		}
		public void setGroupName(String groupName) {
			this.groupName = groupName;
		}
		public int getSequence_number() {
			return sequence_number;
		}
		public void setSequence_number(int sequence_number) {
			this.sequence_number = sequence_number;
		}
		public String getModuleName() {
			return moduleName;
		}
		public void setModuleName(String moduleName) {
			this.moduleName = moduleName;
		}
		
}
