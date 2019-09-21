package com.banking.api.utilization.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import io.swagger.annotations.ApiModel;
import lombok.*;

@ApiModel(value = "Utilization info", description = "Utilization info")
@Getter
@Setter
@Data
@Builder
@AllArgsConstructor()
@JsonInclude(JsonInclude.Include.NON_NULL)
public class UtilizationResultDTO {
    private String device_name;
    private Integer device_id;
    private Integer year;
    private Float rate;
}