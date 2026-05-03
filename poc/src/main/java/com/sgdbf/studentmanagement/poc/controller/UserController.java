package com.sgdbf.studentmanagement.poc.controller;

import com.sgdbf.studentmanagement.poc.entity.User;
import com.sgdbf.studentmanagement.poc.enums.UserStatus;
import com.sgdbf.studentmanagement.poc.repository.UserRepository;
import com.sgdbf.studentmanagement.poc.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody User user) {
        userService.save(user);
        return ResponseEntity.ok("User created");
    }

    @GetMapping("/admin/pending-users")
    @PreAuthorize("hasRole('ADMIN')")
    public List<User> getPendingUsers() {
        return userRepository.findByUserStatus(UserStatus.PENDING);
    }

    @PostMapping("/admin/approve/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> approveUser(@PathVariable Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setUserStatus(UserStatus.APPROVED);

        userRepository.save(user);

        return ResponseEntity.ok("User approved");
    }

    @PostMapping("/admin/reject/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> rejectUser(@PathVariable Long id) {

        User user = userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setUserStatus(UserStatus.REJECTED);

        userRepository.save(user);

        return ResponseEntity.ok("User rejected");
    }
}
