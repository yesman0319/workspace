package com.xiaoma.universe.topic.vo;

public class VideoVO {
	private Integer videoId; // id
	private String coverPhoto; // 封面
	private String coursesName; // 课程名称
	private Integer teacherId;// teacherId
	private String teacherName; // 讲师名称
	private String goodId;// 对应的产品,是复数类型，可能对应多个产品
	private String price;// 价格;
	private String hasBuy;// 是否已购买
	private Integer totalClass;// 包含多少个视频
	private Integer totalView;// 总的观看数量

	public Integer getVideoId() {
		return videoId;
	}

	public void setVideoId(Integer videoId) {
		this.videoId = videoId;
	}

	public String getCoverPhoto() {
		return coverPhoto;
	}

	public void setCoverPhoto(String coverPhoto) {
		this.coverPhoto = coverPhoto;
	}

	public String getCoursesName() {
		return coursesName;
	}

	public void setCoursesName(String coursesName) {
		this.coursesName = coursesName;
	}

	public Integer getTeacherId() {
		return teacherId;
	}

	public void setTeacherId(Integer teacherId) {
		this.teacherId = teacherId;
	}

	public String getTeacherName() {
		return teacherName;
	}

	public void setTeacherName(String teacherName) {
		this.teacherName = teacherName;
	}

	public String getGoodId() {
		return goodId;
	}

	public void setGoodId(String goodId) {
		this.goodId = goodId;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getHasBuy() {
		return hasBuy;
	}

	public void setHasBuy(String hasBuy) {
		this.hasBuy = hasBuy;
	}

	public Integer getTotalClass() {
		return totalClass;
	}

	public void setTotalClass(Integer totalClass) {
		this.totalClass = totalClass;
	}

	public Integer getTotalView() {
		return totalView;
	}

	public void setTotalView(Integer totalView) {
		this.totalView = totalView;
	}
}
