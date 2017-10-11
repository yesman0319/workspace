package com.xiaoma.universe.topic.vo;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * 板块的vo类
 * 
 * @Class Name NodeVO
 * @Author dangxingfei@xiaoma.cn
 * @Create In 2016年12月20日
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class NodeVO {
	private Integer nodeId;
	private String title;// 板块的名称
	private Integer topicCount;// 板块下的帖子的数量
	private Boolean hasNoRead; // 是否有未读的帖子或者评论

	@JsonIgnore
	private Integer pid;// 父节点
	@JsonIgnore
	private String description;// 板块的描述
	@JsonIgnore
	private String slug;// 板块的英文简写
	@JsonIgnore
	private String pic;// 图片地址

	public Integer getNodeId() {
		return nodeId;
	}

	public void setNodeId(Integer nodeId) {
		this.nodeId = nodeId;
	}

	public Integer getPid() {
		return pid;
	}

	public void setPid(Integer pid) {
		this.pid = pid;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getSlug() {
		return slug;
	}

	public void setSlug(String slug) {
		this.slug = slug;
	}

	public String getPic() {
		return pic;
	}

	public void setPic(String pic) {
		this.pic = pic;
	}

	public Integer getTopicCount() {
		return topicCount;
	}

	public void setTopicCount(Integer topicCount) {
		this.topicCount = topicCount;
	}

	public Boolean getHasNoRead() {
		return hasNoRead;
	}

	public void setHasNoRead(Boolean hasNoRead) {
		this.hasNoRead = hasNoRead;
	}
}
