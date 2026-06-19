package com.sgdbf.studentmanagement.poc.controller;

import com.sgdbf.studentmanagement.poc.dto.BorrowRecordResponseDto;
import com.sgdbf.studentmanagement.poc.pagination.BorrowRecordPageResponse;
import com.sgdbf.studentmanagement.poc.service.BookService;
import com.sgdbf.studentmanagement.poc.service.BorrowRecordService;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.ByteArrayInputStream;
import java.io.IOException;
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
    public List<BorrowRecordResponseDto> getMyBorrowedBooks(Authentication authentication) {
        return borrowRecordService.getMyBorrowedBooks(authentication.getName());
    }

    //Books borrowed and not returned by students
    @GetMapping("/getBorrowedBooks")
    @PreAuthorize("hasAnyRole('LIBRARIAN','ADMIN')")
    public List<BorrowRecordResponseDto> getBorrowedBooks(Authentication authentication) {
        return borrowRecordService.getAllBorrowedBooksByStudents();
    }

    //All borrowed books
    @GetMapping("/getAllBorrowedBooks")
    @PreAuthorize("hasAnyRole('LIBRARIAN','ADMIN')")
    public BorrowRecordPageResponse getAllBorrowedBooks(@PageableDefault(page = 0, size = 5) Pageable pageable) {
        return borrowRecordService.getAllBorrowedBooks(pageable);
    }

    @GetMapping("/export")
    @PreAuthorize("hasAnyRole('LIBRARIAN','ADMIN','STUDENT')")
    public ResponseEntity<Resource> exportBorrowedBooks(Authentication authentication) throws IOException {
        ByteArrayInputStream excel = borrowRecordService.exportMyBorrowedBooks(authentication.getName());
        InputStreamResource file = new InputStreamResource(excel);
        return ResponseEntity.ok()
                .header(
                        HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=" + authentication.getName() + "-borrowed-books.xlsx"
                )
                .contentType(
                        MediaType.parseMediaType(
                                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                        )
                )
                .body(file);
    }
}
