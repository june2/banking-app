package com.banking.api.auth.controller;

import com.banking.api.auth.constant.AuthConstant;
import com.banking.api.auth.dto.AuthReqDTO;
import com.banking.api.auth.service.AuthService;
import com.banking.api.user.model.User;
import com.banking.api.user.service.UserService;
import com.banking.common.Security;
import com.banking.handler.ResponseHandler;
import com.banking.jwt.JwtService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@Api(tags = {"Auth"})
@Slf4j
@RestController
@RequestMapping(value = AuthConstant.API_URI_PREFIX)
public class AuthController {

    @Autowired
    private AuthService authService;
    @Autowired
    private UserService userService;
    @Autowired
    private JwtService jwtService;

    @ApiOperation(value = "Create User", notes = "Create User", response = AuthReqDTO.class, httpMethod = "POST")
    @PostMapping("/signUp")
    public ResponseHandler create(@RequestBody AuthReqDTO req) {
        return ResponseHandler.builder().status("success").data(userService.create(
                User.builder().
                        email(req.getEmail()).
                        password(Security.encode(req.getPassword())).
                        build()).getEmail()).build();
    }

    @ApiOperation(value = "Login", notes = "Login", response = AuthReqDTO.class, httpMethod = "POST")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthReqDTO req) {
        try {
            User user = userService.findByEmail(req.getEmail());
            if (!Optional.ofNullable(user).isPresent()) throw new Error();
            if (!authService.authenticate(req.getPassword(), user.getPassword())) throw new Error();
            return ResponseEntity.ok(jwtService.getToken(user));
        } catch (Error err) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }
}
