package com.xiaoma.universe.information.model.obj;

import java.util.List;

import com.xiaoma.universe.information.model.Info;



public class InfoVo {
	    private Integer id;
	    private String name;//name
	    private String description;//description
	    private String imgageUrl;//imgageUrl
        private List<Info> infoList;
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
		public List<Info> getInfoList() {
			return infoList;
		}
		public void setInfoList(List<Info> infoList) {
			this.infoList = infoList;
		}

}
