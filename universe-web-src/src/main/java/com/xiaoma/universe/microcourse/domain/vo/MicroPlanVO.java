/**
 * 
 */
package com.xiaoma.universe.microcourse.domain.vo;

import java.util.Date;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * @author xiaoma
 *
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class MicroPlanVO {
		private Integer planId; //计划ID
		private String planName;//计划名称 
		private Integer isPay;//是否需要付费
		//图片
		private String imageWebList;
		private String imageWebDetail;
		private String imageAppList;
		private String imageAppDetail;
		private String imageWebColor;
		
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
		
		
}
