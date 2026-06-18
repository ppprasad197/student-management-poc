package com.sgdbf.studentmanagement.poc.service;

import com.sgdbf.studentmanagement.poc.dto.AdminLibrarianFineResponseDto;
import com.sgdbf.studentmanagement.poc.dto.FineDTO;
import com.sgdbf.studentmanagement.poc.dto.FinePaymentResponseDTO;
import com.sgdbf.studentmanagement.poc.dto.FineSummaryDto;
import com.sgdbf.studentmanagement.poc.entity.BorrowRecord;
import com.sgdbf.studentmanagement.poc.entity.Fine;
import com.sgdbf.studentmanagement.poc.entity.User;
import com.sgdbf.studentmanagement.poc.enums.Role;
import com.sgdbf.studentmanagement.poc.repository.BorrowRepository;
import com.sgdbf.studentmanagement.poc.repository.FineRepository;
import com.sgdbf.studentmanagement.poc.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    public FinePaymentResponseDTO payFine(double amount, String username) {

        validatePaymentAmount(amount);
        FineDTO fineDTO = getMyFines(username);
        validatePendingFines(fineDTO);
        double totalDue = fineDTO.getTotalAmount();
        validateFullPayment(amount, totalDue);
        int savedCount = persistFines(fineDTO, username);
        FinePaymentResponseDTO response = new FinePaymentResponseDTO();
        response.setMessage("All fines cleared successfully");
        response.setTotalPaid(totalDue);
        response.setFinesCleared(savedCount);
        return response;
    }

    public FineDTO getMyFines(String username) {
        User user = getStudent(username);
        List<BorrowRecord> records = borrowRepository.findByUserAndReturnDateIsNull(user);
        return calculateFine(records);
    }

    public FineSummaryDto getFineSummary(String username) {

        User user = getUser(username);

        List<Fine> fines = fineRepository.findByUser(user);
        double total = 0;
        double paid = 0;

        for (Fine fine : fines) {
            total += fine.getAmount();
            paid += fine.getPaidAmount();
        }

        double remaining = total - paid;
        FineSummaryDto dto = new FineSummaryDto();
        dto.setTotalFine(total);
        dto.setPaid(paid);
        dto.setRemaining(remaining);
        return dto;
    }

    private FineDTO calculateFine(List<BorrowRecord> records) {

        List<FineDTO.FineItem> fineItems = new ArrayList<>();

        double totalAmount = 0;

        LocalDate today = LocalDate.now();

        for (BorrowRecord record : records) {
            if (fineRepository.existsByBorrowRecord(record)) {
                continue;
            }
            long daysLate = calculateLateDays(record, today);
            if (daysLate > 0) {
                double fineAmount = daysLate * 10.0;

                Optional<Fine> fineRecord = fineRepository.findByBorrowRecord(record);

                LocalDate paidDate = fineRecord.map(Fine::getPaidDate).orElse(null);

                FineDTO.FineItem item = mapFineItem(record, daysLate, fineAmount, paidDate);

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

    private long calculateLateDays(BorrowRecord record, LocalDate today) {
        LocalDate dueDate = record.getDueDate();

        LocalDate returnDate = record.getReturnDate();
        if (returnDate != null && returnDate.isAfter(dueDate)) {
            return ChronoUnit.DAYS.between(dueDate, returnDate);
        }
        if (returnDate == null && today.isAfter(dueDate)) {
            return ChronoUnit.DAYS.between(dueDate, today);
        }
        return 0;
    }

    private FineDTO.FineItem mapFineItem(BorrowRecord record, long daysLate, double fineAmount, LocalDate paidDate) {

        FineDTO.FineItem item = new FineDTO.FineItem();
        item.setBorrowRecordId(record.getId());
        item.setBookName(record.getBook().getTitle());
        item.setDueDate(record.getDueDate());
        item.setPaidDate(paidDate);
        item.setDaysLate(daysLate);
        item.setFineAmount(fineAmount);
        return item;
    }

    private int persistFines(FineDTO fineDTO, String username) {

        User user = getStudent(username);
        List<Fine> finesToSave = new ArrayList<>();

        for (FineDTO.FineItem item : fineDTO.getFines()) {
            BorrowRecord record = getBorrowRecord(item.getBorrowRecordId());
            boolean exists = fineRepository.existsByUserAndBorrowRecord(user, record);

            if (exists) {
                continue;
            }

            Fine fine = createFineEntity(user, record, item.getFineAmount());
            finesToSave.add(fine);
        }
        fineRepository.saveAll(finesToSave);
        return finesToSave.size();
    }

    private Fine createFineEntity(User user, BorrowRecord record, double amount) {

        Fine fine = new Fine();
        fine.setUser(user);
        fine.setBorrowRecord(record);
        fine.setAmount(amount);
        fine.setPaidAmount(amount);
        fine.setPaid(true);
        fine.setPaidDate(LocalDate.now());
        return fine;
    }

    private void validatePaymentAmount(double amount) {
        if (amount <= 0) {
            throw new RuntimeException("Invalid amount");
        }
    }

    private void validatePendingFines(FineDTO fineDTO) {
        if (fineDTO.getFines().isEmpty()) {
            throw new RuntimeException("No pending fines");
        }
    }

    private void validateFullPayment(double amount, double totalDue) {
        if (amount != totalDue) {
            throw new RuntimeException("You must pay full fine. Total due: " + totalDue);
        }
    }

    private User getStudent(String username) {
        return userRepository.findByUserNameAndRole(username, Role.STUDENT);
    }

    private User getUser(String username) {
        return userRepository.findByUserName(username).orElseThrow(() -> new RuntimeException("User not found"));
    }

    private BorrowRecord getBorrowRecord(Long borrowRecordId) {
        return borrowRepository.findById(borrowRecordId).orElseThrow(() -> new RuntimeException("Borrow record not found"));
    }

    public List<AdminLibrarianFineResponseDto> getAllStudentFines() {

        List<AdminLibrarianFineResponseDto> response = new ArrayList<>();
        LocalDate today = LocalDate.now();

        // STEP 1 -> Existing paid/generated fine
        List<Fine> fines = fineRepository.findAll();
        for (Fine fine : fines) {
            BorrowRecord record = fine.getBorrowRecord();
            if (record == null || record.getUser() == null) {
                continue;
            }
            response.add(mapToFineDto(record, fine.getAmount(), fine.isPaid(), fine));
        }

        // STEP 2 -> Current unpaid overdue fines

        List<BorrowRecord> records = borrowRepository.findAll();
        for (BorrowRecord record : records) {
            if (record.getUser() == null) {
                continue;
            }
            // Skip records that already have a Fine entity
            boolean fineExists = fineRepository.existsByBorrowRecord(record);

            if (fineExists) {
                continue;
            }

            LocalDate dueDate = record.getDueDate();
            LocalDate returnDate = record.getReturnDate();

            long daysLate = 0;

            // Returned late
            if (returnDate != null && returnDate.isAfter(dueDate)) {
                daysLate = ChronoUnit.DAYS.between(dueDate, returnDate);
            }

            // Still overdue
            else if (returnDate == null && today.isAfter(dueDate)) {
                daysLate = ChronoUnit.DAYS.between(dueDate, today);
            }

            if (daysLate <= 0) {
                continue;
            }

            double fineAmount = daysLate * 10;
            response.add(mapToFineDto(record, fineAmount, false, null));
        }

        return response;
    }


    private AdminLibrarianFineResponseDto mapToFineDto(BorrowRecord record, double fineAmount, boolean paid, Fine fineRecord) {

        AdminLibrarianFineResponseDto dto = new AdminLibrarianFineResponseDto();
        dto.setStudentId(record.getUser().getId());
        dto.setStudentName(record.getUser().getFirstName() + " " + record.getUser().getLastName());
        dto.setUserName(record.getUser().getUserName());
        dto.setBookName(record.getBook().getTitle());
        dto.setFineAmount(fineAmount);
        dto.setPaid(paid);
        dto.setDueDate(record.getDueDate());
        dto.setReturnDate(record.getReturnDate());
        dto.setPaidDate(fineRecord != null ? fineRecord.getPaidDate() : null);
        return dto;
    }

}
