package com.sgdbf.studentmanagement.poc.pagination;

import com.sgdbf.studentmanagement.poc.dto.BookResponseDto;

import java.util.List;

public class BookPageResponse {
    private List<BookResponseDto> books;
    private int totalElements;
    private int totalPages;
    private int currentPage;

    public BookPageResponse(List<BookResponseDto> books, int totalElements, int totalPages, int currentPage) {
        this.books = books;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.currentPage = currentPage;
    }

    public BookPageResponse() {
    }

    public List<BookResponseDto> getBooks() {
        return books;
    }

    public void setBooks(List<BookResponseDto> books) {
        this.books = books;
    }

    public int getTotalElements() {
        return totalElements;
    }

    public void setTotalElements(int totalElements) {
        this.totalElements = totalElements;
    }

    public int getTotalPages() {
        return totalPages;
    }

    public void setTotalPages(int totalPages) {
        this.totalPages = totalPages;
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }
}
