package com.sgdbf.studentmanagement.poc.service;

import com.sgdbf.studentmanagement.poc.entity.BorrowRecord;
import com.sgdbf.studentmanagement.poc.entity.Fine;
import com.sgdbf.studentmanagement.poc.entity.Student;
import com.sgdbf.studentmanagement.poc.entity.User;
import com.sgdbf.studentmanagement.poc.repository.BorrowRepository;
import com.sgdbf.studentmanagement.poc.repository.FineRepository;
import com.sgdbf.studentmanagement.poc.repository.StudentRepository;
import com.sgdbf.studentmanagement.poc.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FineService {
    private final FineRepository fineRepository;
    private final BorrowRepository borrowRepository;
    private final UserRepository userRepository;

    public FineService(FineRepository fineRepository, BorrowRepository borrowRepository, UserRepository userRepository) {
        this.fineRepository = fineRepository;
        this.borrowRepository = borrowRepository;
        this.userRepository = userRepository;
    }

    public void payFine(double amount, String username) {

        if (amount <= 0) {
            throw new RuntimeException("Invalid amount");
        }

        User user = getUser(username);
        Student student = user.getStudent();

        Map<String, Object> fineData = getMyFines(username);
        List<Map<String, Object>> fines = (List<Map<String, Object>>) fineData.get("fines");

        double totalDue = Double.parseDouble(fineData.get("amount").toString());

        if (totalDue == 0) {
            throw new RuntimeException("No fine to pay");
        }

        if (amount > totalDue) {
            throw new RuntimeException("Extra amount provided");
        }

        for (Map<String, Object> fineMap : fines) {

            if (amount == 0) break;

            double fineAmount = Double.parseDouble(fineMap.get("fine").toString());
            BorrowRecord record = (BorrowRecord) fineMap.get("borrowRecord");

            // Check if Fine already exists
            Fine fine = fineRepository
                    .findByStudentAndBorrowRecord(student, record)
                    .orElseGet(() -> {
                        Fine newFine = new Fine();
                        newFine.setStudent(student);
                        newFine.setBorrowRecord(record);
                        newFine.setAmount(fineAmount);
                        newFine.setPaidAmount(0);
                        newFine.setPaid(false);
                        return newFine;
                    });

            double remaining = fine.getAmount() - fine.getPaidAmount();

            if (remaining <= 0) continue;

            double payable;

            if (amount >= remaining) {
                payable = remaining;
                fine.setPaidAmount(fine.getAmount());
                fine.setPaid(true);
                amount -= remaining;
            } else {
                payable = amount;
                fine.setPaidAmount(fine.getPaidAmount() + amount);
                amount = 0;
            }

            fine.setLastPaymentDate(LocalDate.now());

            fineRepository.save(fine);
        }
    }

    public User getUser(String username) {
        return userRepository.findByUserName(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public Map<String, Object> getMyFines(String username) {

        User user = getUser(username);
        Student student = user.getStudent();

        List<BorrowRecord> records = borrowRepository.findByStudent(student);

        List<Map<String, Object>> fines = new ArrayList<>();

        double totalAmount = 0;

        LocalDate today = LocalDate.now();

        for (BorrowRecord record : records) {

            LocalDate dueDate = record.getDueDate();
            LocalDate returnDate = record.getReturnDate();

            long daysLate = 0;


            if (returnDate != null && returnDate.isAfter(dueDate)) {
                daysLate = ChronoUnit.DAYS.between(dueDate, returnDate);
            } else if (returnDate == null && today.isAfter(dueDate)) {
                daysLate = ChronoUnit.DAYS.between(dueDate, today);
            }

            if (daysLate > 0) {

                double totalFine = daysLate * 10.0;


                Fine existingFine = fineRepository
                        .findByStudentAndBorrowRecord(student, record)
                        .orElse(null);

                double paidAmount = 0;
                boolean isPaid = false;

                if (existingFine != null) {
                    paidAmount = existingFine.getPaidAmount();
                    isPaid = existingFine.isPaid();
                }

                double remaining = totalFine - paidAmount;


                if (remaining <= 0) continue;

                Map<String, Object> fineData = new HashMap<>();
                fineData.put("book", record.getBook().getBookName());
                fineData.put("dueDate", dueDate);
                fineData.put("returnDate", returnDate);
                fineData.put("daysLate", daysLate);
                fineData.put("fine", totalFine);
                fineData.put("paidAmount", paidAmount);
                fineData.put("remaining", remaining);

                fineData.put("borrowRecord", record);

                fines.add(fineData);

                totalAmount += remaining;
            }
        }

        Map<String, Object> response = new HashMap<>();
        response.put("fines", fines);
        response.put("amount", totalAmount);

        return response;
    }

    public Map<String, Double> getFineSummary(Authentication authentication) {

        String username = authentication.getName();

        User user = getUser(username);

        List<Fine> fines = fineRepository.findByStudent(user.getStudent());

        double total = 0;
        double paid = 0;

        for (Fine fine : fines) {
            total += fine.getAmount();
            paid += fine.getPaidAmount();
        }

        double remaining = total - paid;

        Map<String, Double> summary = new HashMap<>();
        summary.put("totalFine", total);
        summary.put("paid", paid);
        summary.put("remaining", remaining);

        return summary;
    }


//    public void generateFineIfLate(List<BorrowRecord> record) {
//
//        if (record.getReturnDate() == null) return;
//
//        if (record.getReturnDate().isAfter(record.getDueDate())) {
//
//            long daysLate = ChronoUnit.DAYS.between(
//                    record.getDueDate(),
//                    record.getReturnDate()
//            );
//
//            double fineAmount = daysLate * 10;
//
//            Fine fine = new Fine();
//            fine.setStudent(record.getStudent());
//            fine.setBorrowRecord(record);
//            fine.setAmount(fineAmount);
//            fine.setPaidAmount(0);
//            fine.setPaid(false);
//            fine.setLastPaymentDate(null);
//
//            fineRepository.save(fine);
//        }
//    }

    public double generateFineIfLate(List<BorrowRecord> records) {

        LocalDate today = LocalDate.now();
        double totalFineAmount = 0;

        for (BorrowRecord record : records) {
            if (record.getReturnDate() == null && today.isAfter(record.getDueDate())) {
                double daysLate = ChronoUnit.DAYS.between(
                        record.getDueDate(),
                        today
                );
                double fineAmount = daysLate * 10;
                Fine fine = new Fine();
                fine.setStudent(record.getStudent());
                fine.setBorrowRecord(record);
                fine.setAmount(fineAmount);
                fine.setPaidAmount(0);
                fine.setPaid(false);
                fine.setLastPaymentDate(null);

                fineRepository.save(fine);
                totalFineAmount += fineAmount;
            }
        }

        return totalFineAmount;
    }

//    public boolean canStudentBorrow(Student student) {
//
//        List<Fine> fines = fineRepository.findByStudent(student);
//
//        double total = 0;
//        double paid = 0;
//
//        for (Fine fine : fines) {
//            total += fine.getAmount();
//            paid += fine.getPaidAmount();
//        }
//
//        if (total == 0) return true;
//
//        return paid >= (total * 0.5); // at least 50% paid
//    }

}
