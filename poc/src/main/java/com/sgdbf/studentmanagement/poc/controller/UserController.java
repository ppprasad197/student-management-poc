package com.sgdbf.studentmanagement.poc.controller;

import com.sgdbf.studentmanagement.poc.dto.UserRequestDto;
import com.sgdbf.studentmanagement.poc.dto.UserResponseDto;
import com.sgdbf.studentmanagement.poc.entity.User;
import com.sgdbf.studentmanagement.poc.enums.UserStatus;
import com.sgdbf.studentmanagement.poc.repository.UserRepository;
import com.sgdbf.studentmanagement.poc.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/users")
    @PreAuthorize("hasAnyRole('ADMIN')")
    public ResponseEntity<List<UserResponseDto>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/students")
    @PreAuthorize("hasAnyRole('ADMIN','LIBRARIAN')")
    public ResponseEntity<List<UserResponseDto>> getAllStudents() {
        return ResponseEntity.ok(userService.getAllStudents());
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserRequestDto user) {
        userService.save(user);
        return ResponseEntity.ok("User created");
    }

    @GetMapping("/pendingUsers")
    @PreAuthorize("hasAnyRole('ADMIN','LIBRARIAN')")
    public List<UserResponseDto> getPendingUsers() {
        return userService.findByUserStatus(UserStatus.PENDING);
    }

    @PostMapping("/approveUser/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','LIBRARIAN')")
    public ResponseEntity<?> approveUser(@PathVariable Long id) {
        userService.approveUser(id);
        return ResponseEntity.ok("User approved");
    }

    @PostMapping("/reject/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','LIBRARIAN')")
    public ResponseEntity<?> rejectUser(@PathVariable Long id) {
        userService.rejectUser(id);
        return ResponseEntity.ok("User rejected");
    }

    @DeleteMapping("/delete/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','LIBRARIAN')")
    public ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUserById(id);
        return ResponseEntity.ok("User deleted");
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','LIBRARIAN')")
    public ResponseEntity<UserResponseDto> updateUser(@PathVariable Long id, @RequestBody UserRequestDto requestDto) {
        UserResponseDto response = userService.updateUser(id, requestDto);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/currentUser")
    public ResponseEntity<UserResponseDto> getLoggedInUser(Authentication authentication) {
        return ResponseEntity.ok(userService.getLoggedInUser(authentication.getName()));
    }
}
