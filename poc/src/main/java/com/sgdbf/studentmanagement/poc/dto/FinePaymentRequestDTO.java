package com.sgdbf.studentmanagement.poc.dto;

public class FinePaymentRequestDTO {
    private double amount;

    public FinePaymentRequestDTO() {
    }

    public FinePaymentRequestDTO(double amount) {
        this.amount = amount;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }
}
