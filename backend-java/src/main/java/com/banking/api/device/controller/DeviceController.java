package com.banking.api.device.controller;

import com.banking.api.device.constant.DeviceConstant;
import com.banking.api.device.dto.DeviceDTO;
import com.banking.api.device.dto.DevicesResponse;
import com.banking.api.device.service.DeviceService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = {"Device"})
@Slf4j
@RestController
@RequestMapping(value = DeviceConstant.API_URI_PREFIX)
public class DeviceController {

    @Autowired
    private DeviceService deviceService;

    @ApiOperation(value = "Find All Devices", notes = "Find All Devices", response = DeviceDTO.class, httpMethod = "GET")
    @RequestMapping("")
    public DevicesResponse findAll() {
        return DevicesResponse.builder().devices(deviceService.findAll()).build();
    }
}
