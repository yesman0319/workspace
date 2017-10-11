package com.xiaoma.universe.liveroom.aspect;

import java.lang.annotation.*;

@Target({ElementType.PARAMETER, ElementType.METHOD})  
@Documented  
public @interface CheckSilence {
	
	String description() default "";

}
