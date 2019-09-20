package com.banking.api.api.utilization.controller;

import com.banking.api.api.utilization.constant.UtilizationConstant;
import com.banking.api.api.utilization.dto.UtilizationDTO;
import com.banking.api.api.utilization.service.UtilizationService;
import com.banking.api.handler.ResponseHandler;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(tags = {"Utilization"})
@Slf4j
@RestController
@RequestMapping(value = UtilizationConstant.API_URI_PREFIX)
public class UtilizationController {

    @Autowired
    private UtilizationService utilizationService;

    @ApiOperation(value = "Find All Utilizationㄴ",notes = "Find All Utilizations",response = UtilizationDTO.class, httpMethod = "GET")
    @RequestMapping("/")
    public ResponseHandler findAll() {
        return new ResponseHandler("success", utilizationService.findAll());
    }
}
