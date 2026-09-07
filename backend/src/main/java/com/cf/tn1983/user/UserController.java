package com.cf.tn1983.user;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/api/v1/user")
public class UserController {

    @GetMapping("/test")
    public String getMethodName(@RequestParam String k) {
        return "Hello World! " + k;
    }
    
}
