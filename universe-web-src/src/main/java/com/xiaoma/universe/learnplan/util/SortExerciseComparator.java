/**
 * 
 */
package com.xiaoma.universe.learnplan.util;

import java.util.Comparator;

import com.xiaoma.universe.learnplan.domain.vo.api.PlanDayExerciseVO;
 

/**
 * @author xiaoma
 *
 */
public class SortExerciseComparator implements Comparator<PlanDayExerciseVO> {
 

	@Override
	public int compare(PlanDayExerciseVO lhs, PlanDayExerciseVO rhs) {
		//1 自己在最上边（时间降序） 2 其他人 点赞降序
		int sort = 0; 
		sort = lhs.getKind().compareTo(rhs.getKind());
		return sort; 
	}

}
