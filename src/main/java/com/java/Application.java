package com.java;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.web.support.SpringBootServletInitializer;

/**
 * Author: 乐科
 * Date: 2020/2/15 14:47
 */
@SpringBootApplication(scanBasePackages = "com.java.*")
@MapperScan(basePackages = "com.java.mapper")
public class Application extends SpringBootServletInitializer {  //继承SpringBootServletInitializer是为了打包项目
    public static void main(String[] args) {
        SpringApplication.run(Application.class,args);
    }

    @Override//为了打包SpringBoot项目
    protected SpringApplicationBuilder configure(
            SpringApplicationBuilder builder) {
        return builder.sources(this.getClass());
    }
}
