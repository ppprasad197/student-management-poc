package com.sgdbf.studentmanagement.poc.controller;

import com.sgdbf.studentmanagement.poc.dto.BorrowRecordResponseDto;
import com.sgdbf.studentmanagement.poc.service.BookService;
import com.sgdbf.studentmanagement.poc.service.BorrowRecordService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/borrowRecord")
public class BorrowRecordController {

    private final BookService bookService;
    private final BorrowRecordService borrowRecordService;

    public BorrowRecordController(BookService bookService, BorrowRecordService borrowRecordService) {
        this.bookService = bookService;
        this.borrowRecordService = borrowRecordService;
    }

    @GetMapping("/myBorrowedBooks")
    @PreAuthorize("hasRole('STUDENT')")
    public List<BorrowRecordResponseDto>
    getMyBorrowedBooks(Authentication authentication) {
        return bookService.getMyBorrowedBooks(
                authentication.getName()
        );
    }

    @GetMapping("/getAllBorrowedBooksByStudents")
    @PreAuthorize("hasAnyRole('LIBRARIAN','ADMIN')")
    public List<BorrowRecordResponseDto> getAllBorrowedBooksByStudents(Authentication authentication) {
        return borrowRecordService.getAllBorrowedBooksByStudents();
    }
}
