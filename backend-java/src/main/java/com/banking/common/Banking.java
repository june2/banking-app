package com.banking.common;

import com.banking.api.device.model.Device;
import com.banking.api.device.service.DeviceService;
import com.banking.api.utilization.model.Utilization;
import com.banking.api.utilization.service.UtilizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.io.BufferedReader;
import java.io.FileReader;

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
//            clearData();
//            loadCSV(System.getProperty("user.dir") + "/src/main/files/data.csv");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private void clearData() {
        utilizationService.clear();
        deviceService.clear();
    }

    private void loadCSV(String path) throws Exception {
        BufferedReader csvReader = new BufferedReader(new FileReader(path));
        String line;
        int index = 0;
        while ((line = csvReader.readLine()) != null) {
            String[] values = line.split(",");
            if (index == 0) {
                for (int i = 2; i < values.length; i++) {
                    em.persist(Device.builder().deviceId((long) (i - 1)).deviceName(values[i]).build());
                    if (i % batchSize == 0) {
                        batchFlush();
                    }
                }
                batchFlush();
            } else {
                for (int i = 2; i < values.length; i++) {
                    em.persist(Utilization.builder()
                            .rate(checkFloat(values[i]))
                            .year(Long.parseLong(values[0]))
                            .device(Device.builder().deviceId((long) (i - 1)).build())
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

    private float checkFloat(String val) {
        if (val.matches("-?\\d+(\\.\\d+)?")) {
            return Float.parseFloat(val);
        } else {
            return 0;
        }
    }
}
