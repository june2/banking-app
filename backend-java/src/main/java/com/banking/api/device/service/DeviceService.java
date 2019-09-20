package com.banking.api.device.service;

import com.banking.api.device.model.Device;

import java.util.List;

public interface DeviceService {
    List<Device> findAll();
    void saveAll(List<Device> list);
    void clear();
}
