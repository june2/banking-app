package com.banking.api.utilization.controller;

import com.banking.api.utilization.constant.UtilizationConstant;
import com.banking.api.utilization.dto.DevicesResponse;
import com.banking.api.utilization.dto.UtilizationDTO;
import com.banking.api.utilization.dto.UtilizationResponse;
import com.banking.api.utilization.service.UtilizationService;
import com.banking.exception.ResourceNotFoundException;
import com.banking.handler.ResponseHandler;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@Api(tags = {"Utilization"})
@Slf4j
@RestController
@RequestMapping(value = UtilizationConstant.API_URI_PREFIX)
public class UtilizationController {

    @Autowired
    private UtilizationService utilizationService;

    @ApiOperation(value = "/Get Highest Device", notes = "Get Highest Device", response = UtilizationDTO.class, httpMethod = "GET")
    @RequestMapping("/getHighestDevice")
    public DevicesResponse findHighestDeviceByEachYear() {
        return DevicesResponse.builder().devices(utilizationService.findHighestDeviceByEachYear()).build();
    }

    @ApiOperation(value = "Get Highest Device", notes = "Get Highest Device", response = UtilizationDTO.class, httpMethod = "GET")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "year", value = "year", dataType = "long", required = true),
    })
    @RequestMapping("/getHighestDevice/:year")
    public UtilizationResponse findHighestDeviceByYear(@RequestParam long year) {
        return Optional.ofNullable(utilizationService.findHighestDeviceByYear(year)).map(res -> {
            return UtilizationResponse.builder().result(res).build();
        }).orElseThrow(() -> new ResourceNotFoundException("Rate", "year", year));
    }

    @ApiOperation(value = "Get Highest Device", notes = "Get Highest Device", response = UtilizationDTO.class, httpMethod = "GET")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "deviceId", value = "deviceId", dataType = "long", required = true),
    })
    @RequestMapping("/getHighestRate/:deviceId")
    public UtilizationResponse findHighestRateByDeviceId(@RequestParam long deviceId) {
        return Optional.ofNullable(utilizationService.findHighestRateByDeviceId(deviceId)).map(res -> {
            return UtilizationResponse.builder().result(res).build();
        }).orElseThrow(() -> new ResourceNotFoundException("Device", "deviceId", deviceId));
    }

    @ApiOperation(value = "Get Highest Device", notes = "Get Highest Device", response = UtilizationDTO.class, httpMethod = "GET")
    @RequestMapping("/predictRate")
    public ResponseHandler predictRateByDeviceId() {
        return new ResponseHandler("success", utilizationService.findAll());
    }
}
