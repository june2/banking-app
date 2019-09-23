package com.banking.api.user.service;

import com.banking.api.user.model.User;

public interface
UserService {
    User create(User user);
    User findByEmail(String email);
}
