package com.xiaoma.universe.mock.model;


public class MkTpoVo implements Comparable<MkTpoVo>{
	private Integer id;
	private String name;
	private Integer seqNum;
	private Integer examCount;
	private Integer supportPart;
	private String haveDoneCount;
	private String enrolmentRate;//正确率
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Integer getSeqNum() {
		return seqNum;
	}
	public void setSeqNum(Integer seqNum) {
		this.seqNum = seqNum;
	}
	public Integer getExamCount() {
		return examCount;
	}
	public void setExamCount(Integer examCount) {
		this.examCount = examCount;
	}
	public String getHaveDoneCount() {
		return haveDoneCount;
	}
	public void setHaveDoneCount(String haveDoneCount) {
		this.haveDoneCount = haveDoneCount;
	}
	public String getEnrolmentRate() {
		return enrolmentRate;
	}
	public void setEnrolmentRate(String enrolmentRate) {
		this.enrolmentRate = enrolmentRate;
	}
	public Integer getSupportPart() {
		return supportPart;
	}
	public void setSupportPart(Integer supportPart) {
		this.supportPart = supportPart;
	}
	
	  public int compareTo(MkTpoVo o) {  
	        // 先按age排序
	        if (this.id > o.getId()) {
	            return -1;
	        }
	        if (this.id < o.getId()) {
	            return 1;
	        }
	        return 0;  
	     }  
}
