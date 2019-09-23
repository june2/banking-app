package com.banking.api.auth.service;

public interface AuthService {
    boolean authenticate(String password, String encPassword);
}
