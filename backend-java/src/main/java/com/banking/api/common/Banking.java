package com.banking.api.common;

import com.banking.api.api.device.model.Device;
import com.banking.api.api.device.service.DeviceService;
import com.banking.api.api.utilization.model.Utilization;
import com.banking.api.api.utilization.service.UtilizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.io.BufferedReader;
import java.io.FileReader;
import java.util.List;

@Transactional
@Configuration
public class Banking {

    private int batchSize = 20;

    @PersistenceContext
    private EntityManager em;

    @Autowired
    private DeviceService deviceService;
    @Autowired
    private UtilizationService utilizationService;

    @Bean
    public void init() {
        try {
            clearData();
            loadCSV(System.getProperty("user.dir") + "/src/main/files/data.csv");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void clearData() {
        List<Device> list = deviceService.findAll();
    }

    private void loadCSV(String path) throws Exception {
        BufferedReader csvReader = new BufferedReader(new FileReader(path));
        String line;
        int index = 0;
        while ((line = csvReader.readLine()) != null) {
            String[] values = line.split(",");
            if (index == 0) {
                for (int i = 2; i < values.length; i++) {
                    em.persist(Device.builder().deviceName(values[i]).build());
                    if (i % batchSize == 0) {
                        batchFlush();
                    }
                }
                batchFlush();
            } else {
                for (int i = 1; i < values.length; i++) {
                    em.persist(Utilization.builder()
//                            .rate(Float.parseFloat(values[i]))
                                    .year(Long.parseLong(values[0]))
                                    .device(Device.builder().deveicId(1L).build())
                                    .build()
                    );
                    if (i % batchSize == 0) {
                        batchFlush();
                    }
                }
                batchFlush();
            }
            index++;
        }
        csvReader.close();
    }

    private void batchFlush() {
        // Flush a batch of inserts and release memory.
        em.flush();
        em.clear();
    }
}
