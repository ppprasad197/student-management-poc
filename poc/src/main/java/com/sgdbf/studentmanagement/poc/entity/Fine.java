package com.sgdbf.studentmanagement.poc.entity;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
public class Fine {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

//    @ManyToOne
//    private Student student;

    @ManyToOne
    private User user;

    @ManyToOne
    @JoinColumn(name = "borrow_record_id")
    private BorrowRecord borrowRecord;

    private double amount;

    private double paidAmount;

    private LocalDate paidDate;

    private boolean paid;

    public Fine() {
    }

    public Fine(Long id, User user, BorrowRecord borrowRecord, double amount, double paidAmount, LocalDate paidDate, boolean paid) {
        this.id = id;
        this.user = user;
        this.borrowRecord = borrowRecord;
        this.amount = amount;
        this.paidAmount = paidAmount;
        this.paidDate = paidDate;
        this.paid = paid;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

//    public Student getStudent() {
//        return student;
//    }
//
//    public void setStudent(Student student) {
//        this.student = student;
//    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public boolean isPaid() {
        return paid;
    }

    public void setPaid(boolean paid) {
        this.paid = paid;
    }

    public double getPaidAmount() {
        return paidAmount;
    }

    public void setPaidAmount(double paidAmount) {
        this.paidAmount = paidAmount;
    }

    public BorrowRecord getBorrowRecord() {
        return borrowRecord;
    }

    public void setBorrowRecord(BorrowRecord borrowRecord) {
        this.borrowRecord = borrowRecord;
    }

    public LocalDate getPaidDate() {
        return paidDate;
    }

    public void setPaidDate(LocalDate paidDate) {
        this.paidDate = paidDate;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}
