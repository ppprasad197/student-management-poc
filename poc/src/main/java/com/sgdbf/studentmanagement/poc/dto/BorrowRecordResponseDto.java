package com.sgdbf.studentmanagement.poc.dto;

import java.time.LocalDate;

public class BorrowRecordResponseDto {
    private Long id;

    private Long bookId;

    private String bookTitle;

    private String author;

    private LocalDate issueDate;

    private LocalDate dueDate;

    private LocalDate returnDate;

    private int renewCount;

    public BorrowRecordResponseDto() {
    }

    public BorrowRecordResponseDto(Long id, Long bookId, String bookTitle, String author, LocalDate issueDate, LocalDate dueDate, LocalDate returnDate, int renewCount) {
        this.id = id;
        this.bookId = bookId;
        this.bookTitle = bookTitle;
        this.author = author;
        this.issueDate = issueDate;
        this.dueDate = dueDate;
        this.returnDate = returnDate;
        this.renewCount = renewCount;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getBookId() {
        return bookId;
    }

    public void setBookId(Long bookId) {
        this.bookId = bookId;
    }

    public String getBookTitle() {
        return bookTitle;
    }

    public void setBookTitle(String bookTitle) {
        this.bookTitle = bookTitle;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public LocalDate getIssueDate() {
        return issueDate;
    }

    public void setIssueDate(LocalDate issueDate) {
        this.issueDate = issueDate;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public LocalDate getReturnDate() {
        return returnDate;
    }

    public void setReturnDate(LocalDate returnDate) {
        this.returnDate = returnDate;
    }

    public int getRenewCount() {
        return renewCount;
    }

    public void setRenewCount(int renewCount) {
        this.renewCount = renewCount;
    }
}
