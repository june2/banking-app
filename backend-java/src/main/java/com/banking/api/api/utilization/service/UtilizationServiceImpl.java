package com.banking.api.api.utilization.service;

import com.banking.api.api.utilization.model.Utilization;
import com.banking.api.api.utilization.repository.UtilizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UtilizationServiceImpl implements UtilizationService {

    @Autowired
    private UtilizationRepository utilizationRepository;

    @Override
    public List<Utilization> findAll() {
        return utilizationRepository.findAll();
    }
}
