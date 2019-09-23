package com.banking.common;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class Security {

    private static BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public static String encode(String text) {
        return passwordEncoder.encode(text);
    }

    public static boolean match(String password, String encPassword) {
        return passwordEncoder.matches(password, encPassword);
    }
}
