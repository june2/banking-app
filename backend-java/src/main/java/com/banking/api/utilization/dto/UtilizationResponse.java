package com.banking.api.utilization.dto;

import io.swagger.annotations.ApiModel;
import lombok.*;

import java.io.Serializable;

@ApiModel(value = "Response Utilization result", description = "Response Utilization result")
@Getter
@Setter
@Builder
@Data
@NoArgsConstructor()
@AllArgsConstructor()
public class UtilizationResponse implements Serializable {
    private UtilizationResultDTO result;
}