package com.banking.api.api.device.service;

import com.banking.api.api.device.model.Device;
import com.banking.api.api.device.repository.DeviceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DeviceServiceImpl implements DeviceService {

    @Autowired
    private DeviceRepository deviceRepository;

    @Override
    public List<Device> findAll() {
        return deviceRepository.findAll();
    }

    @Override
    public void saveAll(List<Device> list) {
        deviceRepository.saveAll(list);
    }
}
