package com.banking.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableAspectJAutoProxy
@SpringBootApplication
@EnableJpaAuditing
public class AppApplication {

    public static void main(String[] args) throws Exception {
        SpringApplication.run(AppApplication.class, args);
    }
}
