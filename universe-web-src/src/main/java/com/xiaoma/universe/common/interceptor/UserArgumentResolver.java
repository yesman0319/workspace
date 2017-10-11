package com.xiaoma.universe.common.interceptor;

import javax.servlet.http.HttpServletRequest;

import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.xiaoma.rest.authentication.UniverseSession;
import com.xiaoma.universe.userlogin.controller.UserVO;

public class UserArgumentResolver implements HandlerMethodArgumentResolver{

/**
 * 检查解析器是否支持解析该参数
 */
@Override
public boolean supportsParameter(MethodParameter parameter) {
	return parameter.getParameterAnnotation(UserVo.class) != null;  
}

@Override
public UserVO resolveArgument(MethodParameter parameter,
        ModelAndViewContainer mavContainer, NativeWebRequest webRequest,
        WebDataBinderFactory binderFactory) throws Exception {
        HttpServletRequest request= (HttpServletRequest) webRequest.getNativeRequest();
        //这里暂时把access_token对象放在session中
        UserVO userInfo=(UserVO)UniverseSession.getAttribute("userInfo");
        return userInfo;
    }
}
