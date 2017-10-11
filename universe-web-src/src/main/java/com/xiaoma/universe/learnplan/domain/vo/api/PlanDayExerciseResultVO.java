package com.xiaoma.universe.learnplan.domain.vo.api;
import java.io.Serializable;

import javax.persistence.Id;
import javax.persistence.Transient;

import com.fasterxml.jackson.annotation.JsonInclude;
public class PlanDayExerciseResultVO implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = -3033070786053440249L;
	public static final Integer IS_DONE = 1;
	public static final Integer IS_NOT_DONE = 0;
	private Integer relation; 
	private Integer id; 
	private Integer dayId;
	
	private Integer isDone;
	private Integer isMustDo;
	private int isDoing;
	
	private Integer reachTheStandard;
	private String number;//
	private Integer moduleId;
	private String moduleName;//
	private Integer levelOne;//
	private Integer levelTwo;//
	private Integer levelThree;
	private String originName;
	private String moduleUuid;
	private String downLoadZip;
	private int kind;
	private String difficulty;
	private String estimateTime;

	
	public Integer getDayId() {
		return dayId;
	}
	public void setDayId(Integer dayId) {
		this.dayId = dayId;
	}
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public Integer getIsDone() {
		return isDone;
	}
	public void setIsDone(Integer isDone) {
		this.isDone = isDone;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public Integer getModuleId() {
		return moduleId;
	}
	public void setModuleId(Integer moduleId) {
		this.moduleId = moduleId;
	}
	public String getModuleName() {
		return moduleName;
	}
	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}
	public Integer getLevelOne() {
		return levelOne;
	}
	public void setLevelOne(Integer levelOne) {
		this.levelOne = levelOne;
	}
	public Integer getLevelTwo() {
		return levelTwo;
	}
	public void setLevelTwo(Integer levelTwo) {
		this.levelTwo = levelTwo;
	}
	public Integer getLevelThree() {
		return levelThree;
	}
	public void setLevelThree(Integer levelThree) {
		this.levelThree = levelThree;
	}
	public String getOriginName() {
		return originName;
	}
	public void setOriginName(String originName) {
		this.originName = originName;
	}
	public String getModuleUuid() {
		return moduleUuid;
	}
	public void setModuleUuid(String moduleUuid) {
		this.moduleUuid = moduleUuid;
	}
	public String getDownLoadZip() {
		return downLoadZip;
	}
	public void setDownLoadZip(String downLoadZip) {
		this.downLoadZip = downLoadZip;
	}
	
	public int getKind() {
		return kind;
	}
	public void setKind(int kind) {
		this.kind = kind;
	}
	public String getDifficulty() {
		return difficulty;
	}
	public void setDifficulty(String difficulty) {
		this.difficulty = difficulty;
	}
	public String getEstimateTime() {
		return estimateTime;
	}
	public void setEstimateTime(String estimateTime) {
		this.estimateTime = estimateTime;
	}
	public Integer getIsMustDo() {
		return isMustDo;
	}
	public void setIsMustDo(Integer isMustDo) {
		this.isMustDo = isMustDo;
	}
	public Integer getReachTheStandard() {
		return reachTheStandard;
	}
	public void setReachTheStandard(Integer reachTheStandard) {
		this.reachTheStandard = reachTheStandard;
	}
	public Integer getRelation() {
		return relation;
	}
	public void setRelation(Integer relation) {
		this.relation = relation;
	}
	public int getIsDoing() {
		return isDoing;
	}
	public void setIsDoing(int isDoing) {
		this.isDoing = isDoing;
	}
	
}
