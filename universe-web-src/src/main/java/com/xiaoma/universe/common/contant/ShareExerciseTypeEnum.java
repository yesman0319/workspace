package com.xiaoma.universe.common.contant;

/**
 * 分享练习的常量类型
 * @author Administrator
 */
public enum ShareExerciseTypeEnum {
	MachineSpeakings("机经口语",1),
	MachineWritings("机经写作",2),
	IndependenceSpeakings("独立口语",3),
	IndependenceWrittngs("独立写作",4);
	
	
	private String name;
	private int value;

	private ShareExerciseTypeEnum(String name, int value){
		this.name = name;
		this.value = value;
	}

	public String getName() {
		return name;
	}

	public int getValue() {
		return value;
	}

	
	/**
	 * 获取周几
	 * @param value
	 * @return
	 */
	public static String getKeyByValue(int value) {
		String name = "推荐练习";
		switch(value) {
		case 1:
			name = MachineSpeakings.getName();
			break;
		case 2:
			name = MachineWritings.getName();
			break;
		case 3:
			name = IndependenceSpeakings.getName();
			break;
		case 4:
			name = IndependenceWrittngs.getName();
			break;
		} 
		return name;
	}
	
}