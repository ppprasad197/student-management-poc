package com.sgdbf.studentmanagement.poc.dto;

import com.sgdbf.studentmanagement.poc.enums.Role;
import com.sgdbf.studentmanagement.poc.enums.UserStatus;

public class UserResponseDto {
    private String firstName;
    private String lastName;
    private String email;
    private String userName;
    private Role role;
    private UserStatus userStatus;

    public UserResponseDto() {
    }

    public UserResponseDto(String firstName, String lastName, String email, String userName, Role role, UserStatus userStatus) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.userName = userName;
        this.role = role;
        this.userStatus = userStatus;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public UserStatus getUserStatus() {
        return userStatus;
    }

    public void setUserStatus(UserStatus userStatus) {
        this.userStatus = userStatus;
    }
}
