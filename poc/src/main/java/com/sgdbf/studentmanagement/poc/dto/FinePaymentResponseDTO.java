package com.sgdbf.studentmanagement.poc.dto;

public class FinePaymentResponseDTO {
    private String message;
    private double totalPaid;
    private int finesCleared;

    public FinePaymentResponseDTO() {
    }

    public FinePaymentResponseDTO(String message, double totalPaid, int finesCleared) {
        this.message = message;
        this.totalPaid = totalPaid;
        this.finesCleared = finesCleared;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public double getTotalPaid() {
        return totalPaid;
    }

    public void setTotalPaid(double totalPaid) {
        this.totalPaid = totalPaid;
    }

    public int getFinesCleared() {
        return finesCleared;
    }

    public void setFinesCleared(int finesCleared) {
        this.finesCleared = finesCleared;
    }
}
