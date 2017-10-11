package com.xiaoma.universe.common.contant;

public enum WeekEnum {
	Sun("周日",0),
	Mon("周一",1),
	Tue("周二",2),
	Wed("周三",3),
	Thu("周四",4),
	Fri("周五",5),
	Sat("周六", 6);

	private String name;
	private int value;

	private WeekEnum(String name, int value){
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
		String weekStr = "";
		switch(value) {
		case 0:
			weekStr = Sun.getName();
			break;
		case 1:
			weekStr = Mon.getName();
			break;
		case 2:
			weekStr = Tue.getName();
			break;
		case 3:
			weekStr = Wed.getName();
			break;
		case 4:
			weekStr = Thu.getName();
			break;
		case 5:
			weekStr = Fri.getName();
			break;
		case 6:
				weekStr = Sat.getName();
			break;
		} 
		return weekStr;
	}
	
}