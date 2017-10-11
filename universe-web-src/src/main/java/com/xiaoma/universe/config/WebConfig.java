package com.xiaoma.universe.config; 

import java.util.ArrayList;
import java.util.List;


import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.http.converter.FormHttpMessageConverter;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.Jackson2ObjectMapperBuilder;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.http.converter.xml.MappingJackson2XmlHttpMessageConverter;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.multipart.support.StandardServletMultipartResolver;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.ContentNegotiationConfigurer;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.resource.VersionResourceResolver;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.JstlView;

import com.fasterxml.jackson.datatype.joda.JodaModule;
import com.fasterxml.jackson.datatype.jsr310.JavaTimeModule;
import com.fasterxml.jackson.module.paramnames.ParameterNamesModule;
import com.xiaoma.rest.framework.common.RestFrameworkConfiguration;
import com.xiaoma.rest.framework.spring.RestQuerySetHandlerMethodArgumentResolver;
import com.xiaoma.rest.framework.spring.RestResponseEntityExceptionHandler;
import com.xiaoma.universe.common.interceptor.UserArgumentResolver;
import com.xiaoma.universe.common.interceptor.UserInfoInterceptor;
import com.xiaoma.universe.common.interceptor.UserInterceptor;

/**
 * @author <a href="mailto:ergal@163.com">vincent.omg</a>
 * @version 1.0
 * @date 2017/7/11
 * @since 1.0
 */
@Configuration
@EnableWebMvc
public class WebConfig extends WebMvcConfigurerAdapter {

    /**
     * rest 的错误处理, 返回信息修改
     * @return
     */
    @Bean
    public RestResponseEntityExceptionHandler restResponseEntityExceptionHandler(){
        return new RestResponseEntityExceptionHandler();
    }

    @Bean
    public StandardServletMultipartResolver multipartResolver() {
        return new StandardServletMultipartResolver();
    }

    /*@Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("*//**")
     //.allowedOrigins("*")
     .allowedMethods("GET, PUT, POST, DELETE, OPTIONS");
     //.allowedHeaders("header1", "header2", "header3")
     //.exposedHeaders("header1", "header2")
     //.allowCredentials(false).maxAge(3600);
     }*/


    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/resources/**")
                .addResourceLocations("/resources/")
                .resourceChain(true).addResolver(
                new VersionResourceResolver().addContentVersionStrategy("/**"));
        //super.addResourceHandlers(registry);
    }

    @Bean
    @ConfigurationProperties("ssrf.paginator")
    public RestFrameworkConfiguration restConfig() {
        return new RestFrameworkConfiguration();
    }

    @Bean
    public RestQuerySetHandlerMethodArgumentResolver restQuerySetHandlerMethodArgumentResolver(){
        RestQuerySetHandlerMethodArgumentResolver restQuerySetHandlerMethodArgumentResolver = new RestQuerySetHandlerMethodArgumentResolver();
        restQuerySetHandlerMethodArgumentResolver.setRestConfig(restConfig());
        return restQuerySetHandlerMethodArgumentResolver;
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> argumentResolvers) {
//        argumentResolvers.add(restQuerySetHandlerMethodArgumentResolver());
        argumentResolvers.add(new UserArgumentResolver());
//        argumentResolvers.add(new PlatformSubTypeArgumentResolver());
//        argumentResolvers.add(new JsonDataArgumentResolver());
//        argumentResolvers.add(new RequestVersionResolver());

    }

    /*@Bean
    public MappingJackson2HttpMessageConverter customJackson2HttpMessageConverter() {
        MappingJackson2HttpMessageConverter jsonConverter = new MappingJackson2HttpMessageConverter();
        ObjectMapper objectMapper = new ObjectMapper();
        objectMapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
        jsonConverter.setObjectMapper(objectMapper);
        return jsonConverter;
    }*/

    @Bean
    public HttpMessageConverter customJackson2HttpMessageConverter(){
        Jackson2ObjectMapperBuilder builder = new Jackson2ObjectMapperBuilder()
                .indentOutput(true)
//                .dateFormat(new SimpleDateFormat("yyyy-MM-dd"))
                .modulesToInstall(new JodaModule())
                .modulesToInstall(new JavaTimeModule())
                .modulesToInstall(new ParameterNamesModule());
        MappingJackson2HttpMessageConverter messageConverter = new MappingJackson2HttpMessageConverter(builder.build());
        List<MediaType> supportedMediaTypes = new ArrayList<MediaType>();
        supportedMediaTypes.add(MediaType.TEXT_HTML);
        supportedMediaTypes.add(MediaType.APPLICATION_JSON_UTF8);
        messageConverter.setSupportedMediaTypes(supportedMediaTypes);
        return messageConverter;
    }

    @Override
    public void configureMessageConverters(List<HttpMessageConverter<?>> converters) {
        super.configureMessageConverters(converters);
        Jackson2ObjectMapperBuilder builder = new Jackson2ObjectMapperBuilder()
                .indentOutput(true)
//                .dateFormat(new SimpleDateFormat("yyyy-MM-dd"))
                .modulesToInstall(new JodaModule())
                .modulesToInstall(new JavaTimeModule())
                .modulesToInstall(new ParameterNamesModule());
        converters.add(customJackson2HttpMessageConverter());
        converters.add(new MappingJackson2XmlHttpMessageConverter(builder.xml().build()));
        converters.add(new FormHttpMessageConverter());
    }



    @Override
    public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
        configurer.defaultContentType(MediaType.TEXT_HTML);
    }

    @Override
    public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
        configurer.enable();
    }

    @Bean
    public ViewResolver jspViewResolver() {
        InternalResourceViewResolver viewResolver = new InternalResourceViewResolver();
        viewResolver.setViewClass(JstlView.class);
        viewResolver.setPrefix("/WEB-INF/jsp/");
        viewResolver.setSuffix(".jsp");
        return viewResolver;
    }

    /**
     * =============================== 拦截器 ====================================
     */

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(new UserInfoInterceptor())
                //添加需要验证登录用户操作权限的请求
                .addPathPatterns("/**");
                //排除不需要验证登录用户操作权限的请求
                //.excludePathPatterns("/userCtrl/*");
        registry.addInterceptor(new UserInterceptor())
                .addPathPatterns(
                        "/plan/user/**",
                        "/personal/**",
                        "/exercises/**");
    }
}
