package com.sgdbf.studentmanagement.poc.service;

import com.sgdbf.studentmanagement.poc.dto.FineDTO;
import com.sgdbf.studentmanagement.poc.dto.FinePaymentResponseDTO;
import com.sgdbf.studentmanagement.poc.entity.BorrowRecord;
import com.sgdbf.studentmanagement.poc.entity.Fine;
import com.sgdbf.studentmanagement.poc.entity.Student;
import com.sgdbf.studentmanagement.poc.entity.User;
import com.sgdbf.studentmanagement.poc.enums.Role;
import com.sgdbf.studentmanagement.poc.repository.BorrowRepository;
import com.sgdbf.studentmanagement.poc.repository.FineRepository;
import com.sgdbf.studentmanagement.poc.repository.UserRepository;
import jakarta.transaction.Transactional;
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

    @Transactional
    public FinePaymentResponseDTO payFine(double amount, String username) {

        if (amount <= 0) {
            throw new RuntimeException("Invalid amount");
        }

        FineDTO fineDTO = getMyFines(username);

        if (fineDTO.getFines().isEmpty()) {
            throw new RuntimeException("No pending fines");
        }

        double totalDue = fineDTO.getTotalAmount();

        if (amount != totalDue) {
            throw new RuntimeException(
                    "You must pay full fine. Total due: " + totalDue
            );
        }

        // ✅ Delegate persistence
        int savedCount = persistFines(fineDTO, username);

        FinePaymentResponseDTO response = new FinePaymentResponseDTO();
        response.setMessage("All fines cleared successfully");
        response.setTotalPaid(totalDue);
        response.setFinesCleared(savedCount);

        return response;
    }

    private int persistFines(FineDTO fineDTO, String username) {

        User user = userRepository.findByUserNameAndRole(username, Role.STUDENT);

//        User user = getUser(username);
//        Student student = user.getStudent();

        List<Fine> finesToSave = new ArrayList<>();
        List<BorrowRecord> recordsToUpdate = new ArrayList<>();

        for (FineDTO.FineItem item : fineDTO.getFines()) {

            BorrowRecord record = borrowRepository.findById(item.getBorrowRecordId())
                    .orElseThrow(() -> new RuntimeException("Record not found"));

            // ✅ Prevent duplicate entries
            boolean exists = fineRepository
                    .existsByUserAndBorrowRecord(user, record);

            if (exists) {
                continue;
            }

            Fine fine = new Fine();
//            fine.setStudent(student);
            fine.setBorrowRecord(record);
            fine.setAmount(item.getFineAmount());
            fine.setPaid(true);
            fine.setPaidDate(LocalDate.now());
            finesToSave.add(fine);

            // optional
//            record.setFineCleared(true);
            recordsToUpdate.add(record);
        }

        fineRepository.saveAll(finesToSave);
        borrowRepository.saveAll(recordsToUpdate);

        return finesToSave.size();
    }

    public User getUser(String username) {
        return userRepository.findByUserName(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public FineDTO getMyFines(String username) {

        User user = userRepository.findByUserNameAndRole(username, Role.STUDENT);

//        User user = getUser(username);
//        Student student = user.getStudent();

        List<BorrowRecord> records =
                borrowRepository.findByUserAndReturnDateIsNull(user);

        List<FineDTO.FineItem> fineItems = new ArrayList<>();
        double totalAmount = 0;

        LocalDate today = LocalDate.now();

        for (BorrowRecord record : records) {

            // OPTIONAL: skip if already cleared
//            if (record.isFineCleared()) continue;

            if (fineRepository.existsByBorrowRecord(record))
                continue;

            LocalDate dueDate = record.getDueDate();
            LocalDate returnDate = record.getReturnDate();

            long daysLate = 0;

            if (returnDate != null && returnDate.isAfter(dueDate)) {
                daysLate = ChronoUnit.DAYS.between(dueDate, returnDate);
            } else if (returnDate == null && today.isAfter(dueDate)) {
                daysLate = ChronoUnit.DAYS.between(dueDate, today);
            }

            if (daysLate > 0) {

                double fineAmount = daysLate * 10.0;

                FineDTO.FineItem item = new FineDTO.FineItem();
                item.setBorrowRecordId(record.getId());
                item.setBookName(record.getBook().getBookName());
                item.setDueDate(dueDate);
                item.setReturnDate(returnDate);
                item.setDaysLate(daysLate);
                item.setFineAmount(fineAmount);

                fineItems.add(item);
                totalAmount += fineAmount;
            }
        }

        FineDTO response = new FineDTO();
        response.setFines(fineItems);
        response.setTotalAmount(totalAmount);
        response.setTotalFines(fineItems.size());

        return response;
    }

    public Map<String, Double> getFineSummary(String username) {
        User user = getUser(username);

        List<Fine> fines = fineRepository.findByUser(user);

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

//    public double generateFineIfLate(List<BorrowRecord> records) {
//
//        LocalDate today = LocalDate.now();
//        double totalFineAmount = 0;
//
//        for (BorrowRecord record : records) {
//            if (record.getReturnDate() == null && today.isAfter(record.getDueDate())) {
//                double daysLate = ChronoUnit.DAYS.between(
//                        record.getDueDate(),
//                        today
//                );
//                double fineAmount = daysLate * 10;
//                Fine fine = new Fine();
//                fine.setStudent(record.getStudent());
//                fine.setBorrowRecord(record);
//                fine.setAmount(fineAmount);
//                fine.setPaidAmount(0);
//                fine.setPaid(false);
//
//                fineRepository.save(fine);
//                totalFineAmount += fineAmount;
//            }
//        }
//
//        return totalFineAmount;
//    }

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
