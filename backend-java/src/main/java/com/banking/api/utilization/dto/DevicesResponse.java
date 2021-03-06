package com.banking.api.utilization.dto;

import io.swagger.annotations.ApiModel;
import lombok.*;

import java.io.Serializable;
import java.util.List;

@ApiModel(value = "Response Devices result", description = "Response Devices result")
@Getter
@Setter
@Data
@Builder
@NoArgsConstructor()
@AllArgsConstructor()
public class DevicesResponse implements Serializable {
    private List<UtilizationResultDTO> devices;
}