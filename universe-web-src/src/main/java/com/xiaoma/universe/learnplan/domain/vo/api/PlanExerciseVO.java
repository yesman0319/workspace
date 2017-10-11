package com.xiaoma.universe.learnplan.domain.vo.api;
 
 
public class PlanExerciseVO {
	public static final int  IS_DONE = 1;
	public static final int  IS_NOT_DONE = 0;
	
	private int  id;
	private int  isDone;
	private String number;//
	private int  moduleId;
	private String moduleName;//
	private int  levelOne;//
	private int  levelTwo;//
	private int  levelThree;
	private String originName;
	private String moduleUuid;
	private String downLoadZip;
	private String kind;
	private String difficulty;
	private String estimateTime;
	
	public PlanExerciseVO(){
		number = "";
		isDone = 0;
		moduleName = "";
		originName = "";
		moduleUuid = "";
		downLoadZip = "";
		kind = "";
		difficulty = "";
		estimateTime = "";
	}
	public int  getId() {
		return id;
	}
	public void setId(int  id) {
		this.id = id;
	}
	public int  getIsDone() {
		return isDone;
	}
	public void setIsDone(int  isDone) {
		this.isDone = isDone;
	}
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public int  getModuleId() {
		return moduleId;
	}
	public void setModuleId(int  moduleId) {
		this.moduleId = moduleId;
	}
	public String getModuleName() {
		return moduleName;
	}
	public void setModuleName(String moduleName) {
		this.moduleName = moduleName;
	}
	public int  getLevelOne() {
		return levelOne;
	}
	public void setLevelOne(int  levelOne) {
		this.levelOne = levelOne;
	}
	public int  getLevelTwo() {
		return levelTwo;
	}
	public void setLevelTwo(int  levelTwo) {
		this.levelTwo = levelTwo;
	}
	public int  getLevelThree() {
		return levelThree;
	}
	public void setLevelThree(int  levelThree) {
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
	public String getKind() {
		return kind;
	}
	public void setKind(String kind) {
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
	
}
