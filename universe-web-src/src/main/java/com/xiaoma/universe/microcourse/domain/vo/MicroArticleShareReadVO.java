/**
 * 
 */
package com.xiaoma.universe.microcourse.domain.vo;

import javax.persistence.Column;

import com.fasterxml.jackson.annotation.JsonInclude;

/**
 * @author xiaoma
 *
 */

@JsonInclude(JsonInclude.Include.NON_NULL)
public class MicroArticleShareReadVO {
	private int acquisition;

	public int getAcquisition() {
		return acquisition;
	}

	public void setAcquisition(int acquisition) {
		this.acquisition = acquisition;
	}
	
	
}
