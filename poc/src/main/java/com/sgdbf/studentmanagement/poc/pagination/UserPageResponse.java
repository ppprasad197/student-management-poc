package com.sgdbf.studentmanagement.poc.pagination;

import com.sgdbf.studentmanagement.poc.dto.UserResponseDto;

import java.util.List;

public class UserPageResponse {
    private List<UserResponseDto> users;

    private int currentPage;

    private int totalPages;

    private long totalElements;

    public UserPageResponse(List<UserResponseDto> users, int currentPage, int totalPages, long totalElements) {
        this.users = users;
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
    }

    public List<UserResponseDto> getUsers() {
        return users;
    }

    public void setUsers(List<UserResponseDto> users) {
        this.users = users;
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public long getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(long totalElements) {
        this.totalElements = totalElements;
    }

    public UserPageResponse() {
    }
}
