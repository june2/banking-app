package com.banking.api.utilization.dto;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@ApiModel(value = "Response Utilization result", description = "Response Utilization result")
@Getter
@Setter
@Builder
public class UtilizationResponse implements Serializable {
    private UtilizationResultDTO result;
}