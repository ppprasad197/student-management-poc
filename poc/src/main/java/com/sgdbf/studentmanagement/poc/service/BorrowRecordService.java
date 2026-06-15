package com.sgdbf.studentmanagement.poc.service;

import com.sgdbf.studentmanagement.poc.dto.BorrowRecordResponseDto;
import com.sgdbf.studentmanagement.poc.entity.BorrowRecord;
import com.sgdbf.studentmanagement.poc.enums.Role;
import com.sgdbf.studentmanagement.poc.repository.BorrowRepository;
import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@Service
public class BorrowRecordService {
    private final BorrowRepository borrowRepository;
    private final BookService bookService;

    public BorrowRecordService(BorrowRepository borrowRepository, BookService bookService) {
        this.borrowRepository = borrowRepository;
        this.bookService = bookService;
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

    public ByteArrayInputStream exportMyBorrowedBooks(String username) throws IOException {
        List<BorrowRecordResponseDto> books = bookService.getMyBorrowedBooks(username);
        Workbook workbook = new XSSFWorkbook();
        Sheet sheet = workbook.createSheet("My Borrowed Books");

        Row header = sheet.createRow(0);

        header.createCell(0).setCellValue("Book Title");
        header.createCell(1).setCellValue("Author");
        header.createCell(2).setCellValue("Issue Date");
        header.createCell(3).setCellValue("Due Date");
        header.createCell(4).setCellValue("Renew Count");
        header.createCell(5).setCellValue("Student Id");
        header.createCell(6).setCellValue("Return Date");

        int rowNum = 1;

        for (BorrowRecordResponseDto book : books) {
            Row row = sheet.createRow(rowNum++);
            row.createCell(0).setCellValue(book.getBookTitle());
            row.createCell(1).setCellValue(book.getAuthor());
            row.createCell(2).setCellValue(book.getIssueDate().toString());
            row.createCell(3).setCellValue(book.getDueDate().toString());
            row.createCell(4).setCellValue(book.getRenewCount());
            row.createCell(5).setCellValue(book.getStudentId());
            row.createCell(6).setCellValue(book.getReturnDate());
        }

        ByteArrayOutputStream out = new ByteArrayOutputStream();
        workbook.write(out);
        workbook.close();
        return new ByteArrayInputStream(out.toByteArray());
    }
}
