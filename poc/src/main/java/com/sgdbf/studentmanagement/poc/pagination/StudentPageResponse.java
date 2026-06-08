package com.sgdbf.studentmanagement.poc.pagination;

import com.sgdbf.studentmanagement.poc.dto.UserResponseDto;

import java.util.List;

public class StudentPageResponse {
    private List<UserResponseDto> students;
    private int currentPage;
    private int totalPages;
    private int totalElements;

    public StudentPageResponse() {
    }

    public StudentPageResponse(List<UserResponseDto> students, int currentPage, int totalPages, int totalElements) {
        this.students = students;
        this.currentPage = currentPage;
        this.totalPages = totalPages;
        this.totalElements = totalElements;
    }

    public List<UserResponseDto> getStudents() {
        return students;
    }

    public void setStudents(List<UserResponseDto> students) {
        this.students = students;
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

    public int getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(int totalElements) {
        this.totalElements = totalElements;
    }
}
