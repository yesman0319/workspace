package com.xiaoma.universe.liveroom.model.upay;

import java.util.List;
public class Info {
	private List<Streams> streams ;
	
	private Format format;
	
	public void setStreams(List<Streams> streams){
		this.streams = streams;
	}
	public List<Streams> getStreams(){
		return this.streams;
	}
	public void setFormat(Format format){
		this.format = format;
	}
	public Format getFormat(){
		return this.format;
	}

}