package com.xiaoma.universe.jijing.model;


public class PlanVO {
		private Integer planId; //计划ID
		private String planName;//计划名称
		private Integer isPay;//是否需要付费
		private Integer learnNumber;//开启的人数统计
		private double localPrice;//价格
		private double startPrice;//起价
		//图片
		private String imageWebList;
		private String imageWebDetail;
		private String imageAppList;
		private String imageAppDetail;
		private String imageWebColor;
		public Integer getPlanId() {
			return planId;
		}
		public void setPlanId(Integer planId) {
			this.planId = planId;
		}
		public String getPlanName() {
			return planName;
		}
		public void setPlanName(String planName) {
			this.planName = planName;
		}
		public Integer getIsPay() {
			return isPay;
		}
		public void setIsPay(Integer isPay) {
			this.isPay = isPay;
		}
		public Integer getLearnNumber() {
			return learnNumber;
		}
		public void setLearnNumber(Integer learnNumber) {
			this.learnNumber = learnNumber;
		}
		public double getLocalPrice() {
			return localPrice;
		}
		public void setLocalPrice(double localPrice) {
			this.localPrice = localPrice;
		}
		public double getStartPrice() {
			return startPrice;
		}
		public void setStartPrice(double startPrice) {
			this.startPrice = startPrice;
		}
		public String getImageWebList() {
			return imageWebList;
		}
		public void setImageWebList(String imageWebList) {
			this.imageWebList = imageWebList;
		}
		public String getImageWebDetail() {
			return imageWebDetail;
		}
		public void setImageWebDetail(String imageWebDetail) {
			this.imageWebDetail = imageWebDetail;
		}
		public String getImageAppList() {
			return imageAppList;
		}
		public void setImageAppList(String imageAppList) {
			this.imageAppList = imageAppList;
		}
		public String getImageAppDetail() {
			return imageAppDetail;
		}
		public void setImageAppDetail(String imageAppDetail) {
			this.imageAppDetail = imageAppDetail;
		}
		public String getImageWebColor() {
			return imageWebColor;
		}
		public void setImageWebColor(String imageWebColor) {
			this.imageWebColor = imageWebColor;
		}
		
}
