package com.banking.api.utilization.service;

import com.banking.api.utilization.model.Utilization;

import java.util.List;

public interface UtilizationService {
    List<Utilization> findAll();
    void clear();
}
