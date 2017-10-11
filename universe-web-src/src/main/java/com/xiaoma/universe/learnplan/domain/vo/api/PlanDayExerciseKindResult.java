package com.xiaoma.universe.learnplan.domain.vo.api;
import java.io.Serializable;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonInclude;

@JsonInclude(JsonInclude.Include.NON_NULL)  
public class PlanDayExerciseKindResult implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = -226640311768459770L;
	private Integer kind;
	private String name;
	private int estimateTime;
	private List<PlanDayExerciseResultVO> exerciseList;
	public Integer getKind() {
		return kind;
	}
	public void setKind(Integer kind) {
		this.kind = kind;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<PlanDayExerciseResultVO> getExerciseList() {
		return exerciseList;
	}
	public void setExerciseList(List<PlanDayExerciseResultVO> exerciseList) {
		this.exerciseList = exerciseList;
	}
	public int getEstimateTime() {
		return estimateTime;
	}
	public void setEstimateTime(int estimateTime) {
		this.estimateTime = estimateTime;
	}
	
	
}
