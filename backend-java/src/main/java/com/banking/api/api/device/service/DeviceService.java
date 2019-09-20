package com.banking.api.api.device.service;

import com.banking.api.api.device.model.Device;

import java.util.List;

public interface DeviceService {
    List<Device> findAll();
    void saveAll(List<Device> list);
}
