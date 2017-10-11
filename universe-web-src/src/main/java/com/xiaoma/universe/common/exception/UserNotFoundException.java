package com.xiaoma.universe.common.exception;



/**
 * import org.springframework.web.servlet.HandlerExceptionResolver;
 * 需要把MyException 注入到spring 容器，使用注解或者配置Bean实例
 * @author liwenping
 *
 */
public class UserNotFoundException extends RuntimeException {

    public UserNotFoundException(String message) {
        super(message);
    }

    public UserNotFoundException() {
    }
}
