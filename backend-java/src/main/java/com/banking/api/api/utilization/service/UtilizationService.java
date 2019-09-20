package com.banking.api.api.utilization.service;

import com.banking.api.api.utilization.model.Utilization;

import java.util.List;

public interface UtilizationService {
    List<Utilization> findAll();
}
