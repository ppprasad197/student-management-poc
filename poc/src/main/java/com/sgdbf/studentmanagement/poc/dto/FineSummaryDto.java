package com.sgdbf.studentmanagement.poc.dto;

import java.time.LocalDate;

public class FineSummaryDto {
    private double totalFine;

    private double paid;

    private double remaining;

    private LocalDate paidDate;

    public FineSummaryDto(double totalFine, double paid, double remaining, LocalDate paidDate) {
        this.totalFine = totalFine;
        this.paid = paid;
        this.remaining = remaining;
        this.paidDate = paidDate;
    }

    public FineSummaryDto() {

    }

    public double getTotalFine() {
        return totalFine;
    }

    public void setTotalFine(double totalFine) {
        this.totalFine = totalFine;
    }

    public double getPaid() {
        return paid;
    }

    public void setPaid(double paid) {
        this.paid = paid;
    }

    public double getRemaining() {
        return remaining;
    }

    public void setRemaining(double remaining) {
        this.remaining = remaining;
    }

    public LocalDate getPaidDate() {
        return paidDate;
    }

    public void setPaidDate(LocalDate paidDate) {
        this.paidDate = paidDate;
    }
}
