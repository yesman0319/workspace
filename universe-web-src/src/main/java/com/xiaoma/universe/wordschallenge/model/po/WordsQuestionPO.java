package com.xiaoma.universe.wordschallenge.model.po;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class WordsQuestionPO implements Serializable {
	private String word;
	private String image;
	private List<WordsOptionPO> options ;
	public String getWord() {
		return word;
	}
	public void setWord(String word) {
		this.word = word;
	}
	public String getImage() {
		return image;
	}
	public void setImage(String image) {
		this.image = image;
	}
	public List<WordsOptionPO> getOptions() {
		return options;
	}
	public void setOptions(List<WordsOptionPO> options) {
		this.options = options;
	}
	
}
