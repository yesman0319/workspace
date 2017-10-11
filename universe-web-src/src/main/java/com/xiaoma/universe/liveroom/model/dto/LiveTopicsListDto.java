package com.xiaoma.universe.liveroom.model.dto;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.xiaoma.universe.liveroom.model.vo.LiveTopicVo;

/**
 * @Title:Entity
 * @Description: TODO
 * @author Administrator
 * @since 2017年04月05日
 * @version V1.0  
 */
@JsonInclude(JsonInclude.Include.NON_NULL)
public class LiveTopicsListDto  implements Serializable {
	/** 
	 * @Fields serialVersionUID : TODO
	 */ 
	private static final long serialVersionUID = -2525885975721878659L;
	/** 
	 * @Fields serialVersionUID : TODO
	 */ 
	/** 
	 * @Fields serialVersionUID : TODO
	 */ 
	private List<LiveTopicVo> list;
    private String message;//返回信息
    private int status;//0：正常返回；1：未创建；2：返回失败，查看信息

	public LiveTopicsListDto() {
		super();
	}
	
	public List<LiveTopicVo> getList() {
		return list;
	}


	public void setList(List<LiveTopicVo> list) {
		this.list = list;
	}


	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "LiveTopicsListDto [list=" + list + ", message=" + message + ", status=" + status + "]";
	}
	
	
}
