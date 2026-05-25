package com.sgdbf.studentmanagement.poc.service;

import com.sgdbf.studentmanagement.poc.dto.BorrowRecordResponseDto;
import com.sgdbf.studentmanagement.poc.entity.BorrowRecord;
import com.sgdbf.studentmanagement.poc.enums.Role;
import com.sgdbf.studentmanagement.poc.repository.BorrowRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BorrowRecordService {
    private final BorrowRepository borrowRepository;

    public BorrowRecordService(BorrowRepository borrowRepository) {
        this.borrowRepository = borrowRepository;
    }

    public List<BorrowRecordResponseDto> getAllBorrowedBooksByStudents() {

        List<BorrowRecord> borrowRecords =
                borrowRepository.findAllByReturnDateIsNull();

        return borrowRecords.stream()
                .map(this::mapToDto)
                .toList();
    }

    private BorrowRecordResponseDto mapToDto(BorrowRecord borrowRecord) {

        BorrowRecordResponseDto dto = new BorrowRecordResponseDto();

        dto.setId(
                borrowRecord.getId()
        );

        dto.setBookId(
                borrowRecord.getBook().getId()
        );

        dto.setBookTitle(
                borrowRecord.getBook().getTitle()
        );

        dto.setAuthor(
                borrowRecord.getBook().getAuthor()
        );

        dto.setIssueDate(
                borrowRecord.getIssueDate()
        );

        dto.setDueDate(
                borrowRecord.getDueDate()
        );

        dto.setReturnDate(
                borrowRecord.getReturnDate()
        );

        dto.setRenewCount(
                borrowRecord.getRenewCount()
        );
        dto.setStudentId(borrowRecord.getUser() != null ? borrowRecord.getUser().getId() : null);
        return dto;
    }
}
