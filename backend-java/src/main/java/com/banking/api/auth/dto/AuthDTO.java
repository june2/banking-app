package com.banking.api.auth.dto;

import io.swagger.annotations.ApiModel;
import lombok.*;

import java.io.Serializable;

@ApiModel(value = "Device info", description = "Device info")
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AuthDTO implements Serializable {
    private String id;
    private String email;
    private String name;
}