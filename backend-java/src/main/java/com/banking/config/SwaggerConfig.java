package com.banking.config;

import com.google.common.collect.Lists;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiKey;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.sql.Timestamp;

@Configuration
@EnableSwagger2
public class SwaggerConfig {

    public static final String AUTHORIZATION_HEADER = "Authorization";

    @Bean
    public Docket api01() {
        return new Docket(DocumentationType.SWAGGER_2)
                .groupName("Banking-1.0")
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.banking"))
                .paths(PathSelectors.ant("/api/**"))
                .build()
                .apiInfo(new ApiInfoBuilder()
                                .version("1.0")
                                .title("Banking app API")
                                .build())
                .securitySchemes(Lists.newArrayList(apiKey()))
                .useDefaultResponseMessages(false).directModelSubstitute(Timestamp.class, Long.class);
    }

    private ApiKey apiKey() {
        return new ApiKey("bearer", AUTHORIZATION_HEADER, "header");
    }
}
