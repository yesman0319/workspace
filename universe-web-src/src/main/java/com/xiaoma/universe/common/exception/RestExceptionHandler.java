package com.xiaoma.universe.common.exception;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;
import org.springframework.web.servlet.view.RedirectView;

import com.xiaoma.rest.authentication.UniverseSession;

@ControllerAdvice
public class RestExceptionHandler extends ResponseEntityExceptionHandler  {    
	
	@Autowired
	private  HttpServletRequest httpRequest;
    @ExceptionHandler(value = { InnerHandleException.class })
    public final String handleVMWareException(InnerHandleException ex, WebRequest request) {
        return "/error";
    }    
    @ExceptionHandler(value = { UserNotFoundException.class })
    public final ModelAndView handlePowerException(UserNotFoundException ex, WebRequest request) {
    
    	String strBackUrl = "http://" + httpRequest.getServerName() //服务器地址
    			+ ":" 
    			+ httpRequest.getServerPort()           //端口号
    			+ httpRequest.getContextPath()      //项目名称
    			+ httpRequest.getServletPath()      //请求页面或其他地址
    			+ (httpRequest.getQueryString()==null?"":"?" + httpRequest.getQueryString()); //参数
    	UniverseSession.setAttribute("backUrlStr", strBackUrl);
    			
    	String path = request.getContextPath();
    	System.out.println(path);
        return new ModelAndView(new RedirectView("/login"));
    }
    @ExceptionHandler(value = { UserNotFoundAjaxException.class })
    public final ResponseEntity<?> handleVMWareException(UserNotFoundAjaxException ex, WebRequest request) {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.parseMediaType("application/json;charset=UTF-8"));
        return handleExceptionInternal(ex, ex.getMessage(), headers, HttpStatus.UNAUTHORIZED, request);
    }   
}