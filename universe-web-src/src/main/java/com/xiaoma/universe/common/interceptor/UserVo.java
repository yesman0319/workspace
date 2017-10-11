package com.xiaoma.universe.common.interceptor;

import java.lang.annotation.*;

@Target({ElementType.PARAMETER})  
@Retention(RetentionPolicy.RUNTIME)  
@Documented  
public @interface UserVo {
	
	/**
	 * The URI template variable to bind to.
	 */
	String value() default "";
}
