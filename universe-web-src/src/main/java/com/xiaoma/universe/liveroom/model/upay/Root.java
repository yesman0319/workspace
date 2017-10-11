package com.xiaoma.universe.liveroom.model.upay;

import java.util.List;

public class Root {
	private Info info;
	
	private String bucket_name;
	
	private String description;
	
	private String task_id;
	
	private List<String> path ;
	
	private int status_code;
	
	private String signature;
	
	private int timestamp;
	
	public void setInfo(Info info){
		this.info = info;
	}
	public Info getInfo(){
		return this.info;
	}
	public void setBucket_name(String bucket_name){
		this.bucket_name = bucket_name;
	}
	public String getBucket_name(){
		return this.bucket_name;
	}
	public void setDescription(String description){
		this.description = description;
	}
	public String getDescription(){
		return this.description;
	}
	public void setTask_id(String task_id){
		this.task_id = task_id;
	}
	public String getTask_id(){
		return this.task_id;
	}
	public List<String> getPath() {
		return path;
	}
	public void setPath(List<String> path) {
		this.path = path;
	}
	public void setStatus_code(int status_code){
		this.status_code = status_code;
	}
	public int getStatus_code(){
		return this.status_code;
	}
	public void setSignature(String signature){
		this.signature = signature;
	}
	public String getSignature(){
		return this.signature;
	}
	public void setTimestamp(int timestamp){
		this.timestamp = timestamp;
	}
	public int getTimestamp(){
		return this.timestamp;
	}
}