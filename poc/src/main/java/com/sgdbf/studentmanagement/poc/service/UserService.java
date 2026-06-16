package com.sgdbf.studentmanagement.poc.service;

import com.sgdbf.studentmanagement.poc.dto.UserRequestDto;
import com.sgdbf.studentmanagement.poc.dto.UserResponseDto;
import com.sgdbf.studentmanagement.poc.entity.User;
import com.sgdbf.studentmanagement.poc.enums.Role;
import com.sgdbf.studentmanagement.poc.enums.UserStatus;
import com.sgdbf.studentmanagement.poc.pagination.StudentPageResponse;
import com.sgdbf.studentmanagement.poc.pagination.UserPageResponse;
import com.sgdbf.studentmanagement.poc.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public void save(UserRequestDto user) {

        if (userRepository.existsByUserName(user.getUserName())) {
            throw new RuntimeException("Username already exists");
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        User userToSave = new User();

        userToSave.setFirstName(user.getFirstName());
        userToSave.setLastName(user.getLastName());
        userToSave.setEmail(user.getEmail());
        userToSave.setUserName(user.getUserName());
        userToSave.setRole(user.getRole());
        userToSave.setUserStatus(UserStatus.PENDING);
        userToSave.setPassword(
                passwordEncoder.encode(user.getPassword())
        );

        userRepository.save(userToSave);
    }

    public void approveUser(Long id) {
        User user = getUserById(id);
        user.setUserStatus(UserStatus.APPROVED);
        userRepository.save(user);
    }

    public void rejectUser(Long id) {
        User user = getUserById(id);
        user.setUserStatus(UserStatus.REJECTED);
        userRepository.save(user);
    }


    public List<UserResponseDto> findByUserStatus(UserStatus userStatus) {
        List<User> users = userRepository.findByUserStatus(userStatus);
        return users.stream()
                .map(this::mapToResponseDto)
                .toList();
    }

    public void deleteUserById(Long id) {
        User user = getUserById(id);
        userRepository.delete(user);
    }

    @Transactional
    public UserResponseDto updateUser(Long id, UserRequestDto requestDto) {

        User existingUser = getUserById(id);

        if (requestDto.getEmail() != null
                && !requestDto.getEmail().equals(existingUser.getEmail())) {

            if (userRepository.existsByEmail(requestDto.getEmail())) {

                throw new RuntimeException("Email already exists");
            }

            existingUser.setEmail(requestDto.getEmail());
        }


        if (requestDto.getUserName() != null
                && !requestDto.getUserName().equals(existingUser.getUserName())) {

            if (userRepository.existsByUserName(requestDto.getUserName())) {

                throw new RuntimeException("Username already exists");
            }

            existingUser.setUserName(requestDto.getUserName());
        }


        if (requestDto.getFirstName() != null) {
            existingUser.setFirstName(requestDto.getFirstName());
        }

        if (requestDto.getLastName() != null) {
            existingUser.setLastName(requestDto.getLastName());
        }

        if (requestDto.getRole() != null) {
            existingUser.setRole(requestDto.getRole());
        }

        if (requestDto.getUserStatus() != null) {
            existingUser.setUserStatus(requestDto.getUserStatus());
        }


        if (requestDto.getPassword() != null
                && !requestDto.getPassword().isEmpty()) {

            existingUser.setPassword(
                    passwordEncoder.encode(requestDto.getPassword())
            );
        }

        User savedUser = userRepository.save(existingUser);

        return mapToResponseDto(savedUser);
    }

    private UserResponseDto mapToResponseDto(User user) {

        UserResponseDto dto = new UserResponseDto();
        dto.setId(user.getId());
        dto.setFirstName(user.getFirstName());
        dto.setLastName(user.getLastName());
        dto.setEmail(user.getEmail());
        dto.setUserName(user.getUserName());
        dto.setRole(user.getRole());
        dto.setUserStatus(user.getUserStatus());

        return dto;
    }

    public StudentPageResponse getAllStudents(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        Page<User> students =
                userRepository.findAllByRole(pageable, Role.STUDENT);

        StudentPageResponse studentPageResponse = new StudentPageResponse();

        studentPageResponse.setStudents(
                students.getContent()
                        .stream()
                        .map(this::mapToResponseDto)
                        .toList()
        );

        studentPageResponse.setCurrentPage(students.getNumber());
        studentPageResponse.setTotalPages(students.getTotalPages());
        studentPageResponse.setTotalElements((int) students.getTotalElements());
        return studentPageResponse;
    }

    public UserResponseDto getLoggedInUser(String name) {
        User user = userRepository.findByUserName(name).orElseThrow(() -> new RuntimeException("User not found"));
        return mapToResponseDto(user);
    }

    public UserPageResponse getAllUsers(int page, int size) {

        Pageable pageable = PageRequest.of(page, size);

        Page<User> users =
                userRepository.findByRoleNot(Role.STUDENT, pageable);

        UserPageResponse response =
                new UserPageResponse();

        response.setUsers(
                users.getContent()
                        .stream()
                        .map(this::mapToResponseDto)
                        .toList()
        );

        response.setCurrentPage(users.getNumber());
        response.setTotalPages(users.getTotalPages());
        response.setTotalElements(users.getTotalElements());

        return response;
    }

    private User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );
    }
}
