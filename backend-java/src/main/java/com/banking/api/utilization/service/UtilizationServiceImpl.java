package com.banking.api.utilization.service;

import com.banking.api.device.model.Device;
import com.banking.api.utilization.dto.UtilizationResultDTO;
import com.banking.api.utilization.model.Utilization;
import com.banking.api.utilization.repository.UtilizationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.math.BigInteger;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UtilizationServiceImpl implements UtilizationService {

    @PersistenceContext
    private EntityManager manager;

    @Autowired
    private UtilizationRepository utilizationRepository;

    @Override
    public void clear() {
        utilizationRepository.deleteAll();
    }

    @Override
    public List<Utilization> findAll() {
        return utilizationRepository.findAll();
    }

    @Override
    public List<UtilizationResultDTO> findHighestDeviceByEachYear() {

        String sql = "SELECT a.device_name, a.device_id, b.year, b.rate FROM device a\n" +
                "          inner Join (\n" +
                "            SELECT * from utilization aa\n" +
                "            Inner join (\n" +
                "              SELECT year, MAX(rate) AS rate\n" +
                "              FROM utilization \n" +
                "              GROUP BY year\n" +
                "            )bb using (year, rate)\n" +
                "          ) b\n" +
                "          on a.device_id = b.device_id\n" +
                "          order by b.year";
        Query nativeQuery = manager.createNativeQuery(sql);
        List<Object[]> resultList = nativeQuery.getResultList();
        return Optional.ofNullable(resultList).map(list -> {
            return list.stream().map(item -> new UtilizationResultDTO(
                    (String) item[0],
                    (BigInteger) item[1],
                    (BigInteger) item[2],
                    (Float) item[3])).collect(Collectors.toList());
        }).orElse(null);
    }

    @Override
    public UtilizationResultDTO findHighestDeviceByYear(long year) {
        Utilization result = utilizationRepository.findTopByYearOrderByRateDesc(year);
        return Optional.ofNullable(result).map(obj -> {
            return UtilizationResultDTO
                    .builder()
                    .device_name(obj.getDevice().getDeviceName())
                    .rate(obj.getRate())
                    .year(BigInteger.valueOf(obj.getYear()))
                    .build();
        }).orElse(null);
    }

    @Override
    public UtilizationResultDTO findHighestRateByDeviceId(long deviceId) {
        Utilization result = utilizationRepository.findTopByDeviceOrderByRateDesc(
                Device.builder().deviceId(deviceId).build());
        return Optional.ofNullable(result).map(obj -> {
            return UtilizationResultDTO
                    .builder()
                    .device_name(obj.getDevice().getDeviceName())
                    .rate(obj.getRate())
                    .year(BigInteger.valueOf(obj.getYear()))
                    .build();
        }).orElse(null);
    }
}
