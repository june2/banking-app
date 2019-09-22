package com.banking.api.utilization.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.annotations.ApiModel;
import lombok.*;

import java.math.BigInteger;

@ApiModel(value = "Utilization info", description = "Utilization info")
@Getter
@Setter
@Data
@Builder
@AllArgsConstructor()
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UtilizationResultDTO {
    private String device_name;
    private BigInteger device_id;
    private BigInteger year;
    private Float rate;
}