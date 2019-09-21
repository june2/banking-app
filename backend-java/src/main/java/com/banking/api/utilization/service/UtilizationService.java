package com.banking.api.utilization.service;

import com.banking.api.utilization.dto.UtilizationResultDTO;
import com.banking.api.utilization.model.Utilization;

import java.util.List;

public interface UtilizationService {
    void clear();
    List<Utilization> findAll();
    List<UtilizationResultDTO> findHighestDeviceByEachYear();
    UtilizationResultDTO findHighestDeviceByYear(long year);
    UtilizationResultDTO findHighestRateByDeviceId(long deviceId);
}
