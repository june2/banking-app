package com.banking;

import com.banking.api.utilization.dto.DevicesResponse;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UtilizationTest {

    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    public void shouldGetResultSize8() {
        ResponseEntity<DevicesResponse> response = restTemplate.getForEntity("/api/utilizations/getHighestDevice", DevicesResponse.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

        DevicesResponse result = response.getBody();
        assertThat(result.getDevices().size()).isEqualTo(8);
    }
}