/**
 * 
 */
package com.xiaoma.universe.learnplan.domain.vo.web;

import java.util.List;

import com.xiaoma.universe.learnplan.domain.vo.api.PlanDayExerciseVO;

/**
 * @author xiaoma
 *
 */
public class DayDetailVO {
	private int dayId;
	private int dayNumber;
	private int dayName;
	private int exerciseTotal;
	private int doneCount;
	private List<PlanDayExerciseVO> readingList;
	private List<PlanDayExerciseVO> listeningList; 
	private List<PlanDayExerciseVO> speakingList;
	private List<PlanDayExerciseVO> writingList;
	public int getDayId() {
		return dayId;
	}
	public void setDayId(int dayId) {
		this.dayId = dayId;
	}
	public int getDayNumber() {
		return dayNumber;
	}
	public void setDayNumber(int dayNumber) {
		this.dayNumber = dayNumber;
	}
	public int getDayName() {
		return dayName;
	}
	public void setDayName(int dayName) {
		this.dayName = dayName;
	}
	public int getExerciseTotal() {
		return exerciseTotal;
	}
	public void setExerciseTotal(int exerciseTotal) {
		this.exerciseTotal = exerciseTotal;
	}
	public int getDoneCount() {
		return doneCount;
	}
	public void setDoneCount(int doneCount) {
		this.doneCount = doneCount;
	}
	public List<PlanDayExerciseVO> getReadingList() {
		return readingList;
	}
	public void setReadingList(List<PlanDayExerciseVO> readingList) {
		this.readingList = readingList;
	}
	public List<PlanDayExerciseVO> getListeningList() {
		return listeningList;
	}
	public void setListeningList(List<PlanDayExerciseVO> listeningList) {
		this.listeningList = listeningList;
	}
	public List<PlanDayExerciseVO> getSpeakingList() {
		return speakingList;
	}
	public void setSpeakingList(List<PlanDayExerciseVO> speakingList) {
		this.speakingList = speakingList;
	}
	public List<PlanDayExerciseVO> getWritingList() {
		return writingList;
	}
	public void setWritingList(List<PlanDayExerciseVO> writingList) {
		this.writingList = writingList;
	} 
	 
}
