package com.sgdbf.studentmanagement.poc.dto;

import java.time.LocalDate;
import java.util.List;

public class FineDTO {
    private double totalAmount;
    private int totalFines;
    private List<FineItem> fines;

    public static class FineItem {
        private Long borrowRecordId;
        private String bookName;
        private LocalDate dueDate;
        private LocalDate returnDate;
        private long daysLate;
        private double fineAmount;

        public FineItem(Long borrowRecordId, String bookName, LocalDate dueDate, LocalDate returnDate, long daysLate, double fineAmount) {
            this.borrowRecordId = borrowRecordId;
            this.bookName = bookName;
            this.dueDate = dueDate;
            this.returnDate = returnDate;
            this.daysLate = daysLate;
            this.fineAmount = fineAmount;
        }

        public FineItem() {
        }

        public Long getBorrowRecordId() {
            return borrowRecordId;
        }

        public void setBorrowRecordId(Long borrowRecordId) {
            this.borrowRecordId = borrowRecordId;
        }

        public String getBookName() {
            return bookName;
        }

        public void setBookName(String bookName) {
            this.bookName = bookName;
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

        public long getDaysLate() {
            return daysLate;
        }

        public void setDaysLate(long daysLate) {
            this.daysLate = daysLate;
        }

        public double getFineAmount() {
            return fineAmount;
        }

        public void setFineAmount(double fineAmount) {
            this.fineAmount = fineAmount;
        }
    }

    public FineDTO() {
    }

    public FineDTO(double totalAmount, int totalFines, List<FineItem> fines) {
        this.totalAmount = totalAmount;
        this.totalFines = totalFines;
        this.fines = fines;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public int getTotalFines() {
        return totalFines;
    }

    public void setTotalFines(int totalFines) {
        this.totalFines = totalFines;
    }

    public List<FineItem> getFines() {
        return fines;
    }

    public void setFines(List<FineItem> fines) {
        this.fines = fines;
    }
}
