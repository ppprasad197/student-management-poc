package com.sgdbf.studentmanagement.poc.repository;

import com.sgdbf.studentmanagement.poc.dto.UserResponseDto;
import com.sgdbf.studentmanagement.poc.entity.User;
import com.sgdbf.studentmanagement.poc.enums.Role;
import com.sgdbf.studentmanagement.poc.enums.UserStatus;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUserName(String username);

    List<User> findByUserStatus(UserStatus status);

    boolean existsByUserName(String userName);

    boolean existsByEmail(String email);

    User findByUserNameAndRole(String userName, Role role);

    Page<User> findAllByRole(Pageable pageable, Role role);

    Page<User> findByRoleNot(Role role, Pageable pageable);

}
