package com.sgdbf.studentmanagement.poc.controller;

import com.sgdbf.studentmanagement.poc.dto.BookRequestDto;
import com.sgdbf.studentmanagement.poc.dto.BookResponseDto;
import com.sgdbf.studentmanagement.poc.entity.Book;
import com.sgdbf.studentmanagement.poc.service.BookService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
public class BookController {

    private final BookService bookService;

    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @PreAuthorize("hasAnyRole('ADMIN','STUDENT','LIBRARIAN')")
    @GetMapping
    public List<BookResponseDto> getAllBooks() {
        return bookService.getAll();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','STUDENT','LIBRARIAN')")
    public BookResponseDto getBook(@PathVariable Long id) {
        return bookService.getById(id);
    }

    @PostMapping
    @PreAuthorize("hasAnyRole('ADMIN','LIBRARIAN')")
    public BookResponseDto addBook(@Valid @RequestBody BookRequestDto requestDto) {
        return bookService.save(requestDto);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasAnyRole('ADMIN','LIBRARIAN')")
    public BookResponseDto updateBook(@PathVariable Long id, @Valid @RequestBody BookRequestDto requestDto) {
        System.out.println("Update book called : " + requestDto.getQuantity());
        return bookService.update(id, requestDto);
    }

    @PreAuthorize("hasAnyRole('ADMIN','LIBRARIAN')")
    @DeleteMapping("/{id}")
    public void deleteBook(@PathVariable Long id) {
        bookService.delete(id);
    }

    @PreAuthorize("hasAnyRole('STUDENT')")
    @PostMapping("/borrow/{id}")
    public ResponseEntity<?> borrowBook(@PathVariable Long id, Authentication authentication) {
        bookService.borrowBook(id, authentication.getName());
        return ResponseEntity.ok("Book borrowed successfully");
    }

    @PostMapping("/return/{id}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<?> returnBook(@PathVariable Long id,
                                        Authentication authentication) {
        bookService.returnBook(id, authentication.getName());
        return ResponseEntity.ok("Book returned successfully");
    }

    @PostMapping("/renew/{id}")
    @PreAuthorize("hasRole('STUDENT')")
    public ResponseEntity<?> renewBook(@PathVariable Long id, Authentication authentication) {
        bookService.renewBook(id, authentication.getName());
        return ResponseEntity.ok("Book renewed successfully");
    }
}
