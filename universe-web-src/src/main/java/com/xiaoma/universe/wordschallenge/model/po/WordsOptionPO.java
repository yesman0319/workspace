package com.xiaoma.universe.wordschallenge.model.po;

import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class WordsOptionPO implements Serializable {
	private String options ;
	private String optionsWord;
	public String getOptions() {
		return options;
	}
	public void setOptions(String options) {
		this.options = options;
	}
	public String getOptionsWord() {
		return optionsWord;
	}
	public void setOptionsWord(String optionsWord) {
		this.optionsWord = optionsWord;
	}

	
}
