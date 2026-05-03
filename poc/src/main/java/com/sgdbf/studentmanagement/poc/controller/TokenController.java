package com.sgdbf.studentmanagement.poc.controller;

//import com.sgdbf.studentmanagement.poc.security.JwtUtil;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

//@RestController
//public class TokenController {
//    private final JwtUtil jwtUtil;
//
//    public TokenController(JwtUtil jwtUtil) {
//        this.jwtUtil = jwtUtil;
//    }
//
//    @GetMapping("/token")
//    public Map<String, String> getToken(Authentication authentication) {
//        System.out.println("hello from token controller");
//        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
//        String token = jwtUtil.generateToken(userDetails.getUsername());
//        return Map.of("token", token);
//    }
//}
