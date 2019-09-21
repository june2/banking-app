package com.banking.api.utilization.repository;

import com.banking.api.device.model.Device;
import com.banking.api.utilization.model.Utilization;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UtilizationRepository extends JpaRepository<Utilization, Long> {
    Utilization findTopByYearOrderByRateDesc(long year);
    Utilization findTopByDeviceOrderByRateDesc(Device device);
}
