package com.sgdbf.studentmanagement.poc.service;

import com.sgdbf.studentmanagement.poc.entity.BorrowRecord;
import com.sgdbf.studentmanagement.poc.entity.Fine;
import com.sgdbf.studentmanagement.poc.entity.Student;
import com.sgdbf.studentmanagement.poc.entity.User;
import com.sgdbf.studentmanagement.poc.repository.FineRepository;
import com.sgdbf.studentmanagement.poc.repository.StudentRepository;
import com.sgdbf.studentmanagement.poc.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class FineService {
    private final FineRepository fineRepository;
    private final StudentRepository studentRepository;
    private final UserRepository userRepository;

    public FineService(FineRepository fineRepository, StudentRepository studentRepository, UserRepository userRepository) {
        this.fineRepository = fineRepository;
        this.studentRepository = studentRepository;
        this.userRepository = userRepository;
    }

    public void payFine(double amount, Authentication authentication) {

        String username = authentication.getName();

        User user = getUser(username);

//        Student student = user.getStudent();

//        List<Fine> fines = fineRepository.findByStudentAndPaidFalse(student);
        List<Fine> fines = getMyFines(authentication);
        for (Fine fine : fines) {

            double remaining = fine.getAmount() - fine.getPaidAmount();

            if (amount <= 0) {
                throw new RuntimeException("Invalid amount");
            }

            if (amount >= remaining) {
                fine.setPaidAmount(fine.getAmount());
                fine.setPaid(true);
                fine.setLastPaymentDate(LocalDate.now());
                amount -= remaining;
            } else {
                fine.setPaidAmount(fine.getPaidAmount() + amount);
                fine.setLastPaymentDate(LocalDate.now());
                amount = 0;
            }
            fineRepository.save(fine);
            if (amount == 0) break;
        }

        if (amount > 0) {
            throw new RuntimeException("Extra amount provided");
        }
    }

    public User getUser(String username) {
        return userRepository.findByUserName(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<Fine> getMyFines(Authentication authentication) {

        String username = authentication.getName();
        System.out.println(username);

        User user = getUser(username);

        List<Fine> myFines = fineRepository.findByStudentAndPaid(user.getStudent(), false);

        double amount = 0;
        for (Fine fine : myFines) {
            amount += fine.getAmount() - fine.getPaidAmount();
        }
        System.out.println(amount);
        return myFines;
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
