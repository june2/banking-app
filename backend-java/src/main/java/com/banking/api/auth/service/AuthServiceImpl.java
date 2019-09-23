package com.banking.api.auth.service;

import com.banking.common.Security;
import org.springframework.stereotype.Service;

@Service
public class AuthServiceImpl implements AuthService {

    @Override
    public boolean authenticate(String password, String encPassword) {
        return Security.match(password, encPassword);
    }
}
