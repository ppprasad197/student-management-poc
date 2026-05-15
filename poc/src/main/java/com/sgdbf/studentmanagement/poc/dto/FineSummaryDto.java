package com.sgdbf.studentmanagement.poc.dto;

public class FineSummaryDto {
    private double totalFine;

    private double paid;

    private double remaining;
    

    public FineSummaryDto(double totalFine, double paid, double remaining) {
        this.totalFine = totalFine;
        this.paid = paid;
        this.remaining = remaining;
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
}
