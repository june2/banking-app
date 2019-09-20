package com.banking.api.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class IndexController {
    @GetMapping("/")
    public String swaggerUiRedirect(){
        return "redirect:swagger-ui.html";
    }
}