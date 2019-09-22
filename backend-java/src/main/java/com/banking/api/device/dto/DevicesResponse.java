package com.banking.api.device.dto;

import com.banking.api.device.model.Device;
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
    private List<Device> devices;
}