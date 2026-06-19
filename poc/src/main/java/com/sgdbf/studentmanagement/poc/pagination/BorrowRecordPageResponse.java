package com.sgdbf.studentmanagement.poc.pagination;

import com.sgdbf.studentmanagement.poc.dto.BookResponseDto;
import com.sgdbf.studentmanagement.poc.dto.BorrowRecordResponseDto;

import java.util.List;

public class BorrowRecordPageResponse {
    private List<BorrowRecordResponseDto> borrowRecords;
    private int totalElements;
    private int totalPages;
    private int currentPage;

    public BorrowRecordPageResponse() {
    }

    public BorrowRecordPageResponse(List<BorrowRecordResponseDto> borrowRecords, int totalElements, int totalPages, int currentPage) {
        this.borrowRecords = borrowRecords;
        this.totalElements = totalElements;
        this.totalPages = totalPages;
        this.currentPage = currentPage;
    }

    public List<BorrowRecordResponseDto> getBorrowRecords() {
        return borrowRecords;
    }

    public void setBorrowRecords(List<BorrowRecordResponseDto> borrowRecords) {
        this.borrowRecords = borrowRecords;
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
