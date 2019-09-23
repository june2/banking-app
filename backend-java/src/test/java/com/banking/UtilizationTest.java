package com.banking;

import com.banking.api.user.model.User;
import com.banking.api.utilization.dto.DevicesResponse;
import com.banking.api.utilization.dto.UtilizationResponse;
import com.banking.jwt.JwtService;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.*;
import org.springframework.test.context.junit4.SpringRunner;

import static org.assertj.core.api.Assertions.assertThat;

@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class UtilizationTest {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private TestRestTemplate restTemplate;
    private String token;
    private HttpEntity<String> entity;

    @Before
    public void getToken() {
        token = jwtService.getToken(User.builder().email("test@test.com").password("string").build());
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", "Bearer " + token);
        entity = new HttpEntity<String>(null, headers);
    }

    @Test
    public void shouldGetResultSize8() {
        ResponseEntity<DevicesResponse> result = restTemplate.exchange("/api/utilizations/getHighestDevice", HttpMethod.GET, entity, DevicesResponse.class);
        assertThat(result.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(result.getBody().getDevices().size()).isEqualTo(8);
    }

    @Test
    public void shouldGetResult2017() {
        ResponseEntity<UtilizationResponse> result = restTemplate.exchange("/api/utilizations/getHighestRate/1", HttpMethod.GET, entity, UtilizationResponse.class);
        assertThat(result.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(result.getBody().getResult().getYear()).isEqualTo(2017);
    }

    @Test
    public void shouldGetResultRate() {
        ResponseEntity<UtilizationResponse> result = restTemplate.exchange("/api/utilizations/getHighestDevice/2011", HttpMethod.GET, entity, UtilizationResponse.class);
        assertThat(result.getStatusCode()).isEqualTo(HttpStatus.OK);
        assertThat(result.getBody().getResult().getRate()).isEqualTo(95.1f);
    }
}
