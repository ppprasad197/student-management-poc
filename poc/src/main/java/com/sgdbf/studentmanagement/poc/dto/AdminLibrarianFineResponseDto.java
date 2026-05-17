package com.sgdbf.studentmanagement.poc.dto;

import java.time.LocalDate;

public class AdminLibrarianFineResponseDto {
    private Long studentId;

    private String studentName;

    private String userName;

    private String bookName;

    private double fineAmount;

    private boolean paid;

    private LocalDate dueDate;

    private LocalDate returnDate;

    public AdminLibrarianFineResponseDto() {
    }

    public AdminLibrarianFineResponseDto(Long studentId, String studentName, String userName, String bookName, double fineAmount, boolean paid, LocalDate dueDate, LocalDate returnDate) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.userName = userName;
        this.bookName = bookName;
        this.fineAmount = fineAmount;
        this.paid = paid;
        this.dueDate = dueDate;
        this.returnDate = returnDate;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getBookName() {
        return bookName;
    }

    public void setBookName(String bookName) {
        this.bookName = bookName;
    }

    public double getFineAmount() {
        return fineAmount;
    }

    public void setFineAmount(double fineAmount) {
        this.fineAmount = fineAmount;
    }

    public boolean isPaid() {
        return paid;
    }

    public void setPaid(boolean paid) {
        this.paid = paid;
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
}
