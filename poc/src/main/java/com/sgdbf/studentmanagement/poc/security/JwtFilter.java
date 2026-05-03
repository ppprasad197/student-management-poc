package com.sgdbf.studentmanagement.poc.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;

//@Component
//public class JwtFilter extends OncePerRequestFilter {
//    @Autowired
//    private JwtUtil jwtUtil;
//
//    @Value("${spring.security.user.name}")
//    private String configuredUsername;
//
//    @Override
//    protected void doFilterInternal(HttpServletRequest request,
//                                    HttpServletResponse response,
//                                    FilterChain chain)
//            throws ServletException, IOException {
//
//        String path = request.getServletPath();
//
//        if (!path.startsWith("/user-details")) {
//            System.out.println("Path not matching for user-details");
//            chain.doFilter(request, response);
//            return;
//        }
//
//        String header = request.getHeader("Authorization");
//
//        if (header != null && header.startsWith("Bearer ")) {
//            String token = header.substring(7);
//            System.out.println("Header present : " + header);
//            try {
//                String username = jwtUtil.extractUsername(token);
//                System.out.println("Username : " + username);
//                if (username != null && username.equals(configuredUsername)
//                        && SecurityContextHolder.getContext().getAuthentication() == null) {
//
//                    if (jwtUtil.validateToken(token, username)) {
//                        UsernamePasswordAuthenticationToken auth =
//                                new UsernamePasswordAuthenticationToken(
//                                        username,
//                                        null,
//                                        Collections.emptyList()
//                                );
//                        SecurityContextHolder.getContext().setAuthentication(auth);
//                    }
//                }
//            } catch (Exception e) {
//                SecurityContextHolder.clearContext();
//            }
//        }
//        chain.doFilter(request, response);
//    }
//}
