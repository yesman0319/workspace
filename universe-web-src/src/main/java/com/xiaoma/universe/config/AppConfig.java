package com.xiaoma.universe.config;

import org.apache.commons.pool2.ObjectPool;
import org.apache.commons.pool2.impl.GenericObjectPool;
import org.apache.commons.pool2.impl.GenericObjectPoolConfig;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.task.TaskExecutor;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;
import org.springframework.web.client.RestTemplate;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;

import java.util.concurrent.ThreadPoolExecutor;

/**
 * @author <a href="mailto:ergal@163.com">vincent.omg</a>
 * @version 1.0
 * @date 2017/7/11
 * @since 1.0
 */
@Configuration
@EnableAsync
@EnableScheduling
public class AppConfig {

    /**
     * -------------------- redis config -------------------
     */

    @Value("${redis.host}")
    private String redisHost;

    @Value("${redis.port}")
    private int redisPort;

    @Value("${redis.timeout}")
    private int redisTimeout;

    @Value("${redis.password}")
    private String redisPassword;


    @Bean
    @ConfigurationProperties("redis.pool")
    public GenericObjectPoolConfig redisPoolConfig() {
        return new GenericObjectPoolConfig();
    }

    @Bean
    public JedisPool jedisPool(){
        JedisPoolConfig jedisPoolConfig = new JedisPoolConfig();
        GenericObjectPoolConfig gopc = redisPoolConfig();
        if(this.redisPassword.equals("")){
            this.redisPassword = null;
        }
        JedisPool jedisPool = new JedisPool(gopc, redisHost, redisPort, redisTimeout, redisPassword);
        return jedisPool;
    }


    @Bean
    public RestTemplate restTemplate(){
        return new RestTemplate();
    }


    /**
     * -------------------- 异步线程池 -------------------
     */

    @Bean
    public TaskExecutor taskExecutor() {
        ThreadPoolTaskExecutor executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(5);
        executor.setMaxPoolSize(10);
        executor.setQueueCapacity(100);
        executor.setKeepAliveSeconds(300);
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        return executor;
    }
}
