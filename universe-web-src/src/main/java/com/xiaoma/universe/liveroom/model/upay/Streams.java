package com.xiaoma.universe.liveroom.model.upay;

public class Streams {
	private int index;
	
	private int audio_channels;
	
	private int audio_samplerate;
	
	private int bitrate;
	
	private String codec_desc;
	
	private String codec;
	
	private double duration;
	
	private String type;
	
	public void setIndex(int index){
		this.index = index;
	}
	public int getIndex(){
		return this.index;
	}
	public void setAudio_channels(int audio_channels){
		this.audio_channels = audio_channels;
	}
	public int getAudio_channels(){
		return this.audio_channels;
	}
	public void setAudio_samplerate(int audio_samplerate){
		this.audio_samplerate = audio_samplerate;
	}
	public int getAudio_samplerate(){
		return this.audio_samplerate;
	}
	public void setBitrate(int bitrate){
		this.bitrate = bitrate;
	}
	public int getBitrate(){
		return this.bitrate;
	}
	public void setCodec_desc(String codec_desc){
		this.codec_desc = codec_desc;
	}
	public String getCodec_desc(){
		return this.codec_desc;
	}
	public void setCodec(String codec){
		this.codec = codec;
	}
	public String getCodec(){
		return this.codec;
	}
	public void setDuration(double duration){
		this.duration = duration;
	}
	public double getDuration(){
		return this.duration;
	}
	public void setType(String type){
		this.type = type;
	}
	public String getType(){
		return this.type;
	}

}