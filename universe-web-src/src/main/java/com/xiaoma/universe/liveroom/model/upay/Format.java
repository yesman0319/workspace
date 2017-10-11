package com.xiaoma.universe.liveroom.model.upay;

public class Format {
	private double duration;
	
	private String fullname;
	
	private int bitrate;
	
	private int filesize;
	
	private String format;
	
	public void setDuration(double duration){
		this.duration = duration;
	}
	public double getDuration(){
		return this.duration;
	}
	public void setFullname(String fullname){
		this.fullname = fullname;
	}
	public String getFullname(){
		return this.fullname;
	}
	public void setBitrate(int bitrate){
		this.bitrate = bitrate;
	}
	public int getBitrate(){
		return this.bitrate;
	}
	public void setFilesize(int filesize){
		this.filesize = filesize;
	}
	public int getFilesize(){
		return this.filesize;
	}
	public void setFormat(String format){
		this.format = format;
	}
	public String getFormat(){
		return this.format;
	}

}