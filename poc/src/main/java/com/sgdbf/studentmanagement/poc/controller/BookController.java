package com.sgdbf.studentmanagement.poc.controller;

import com.sgdbf.studentmanagement.poc.entity.Book;
import com.sgdbf.studentmanagement.poc.service.BookService;
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
    public List<Book> getAllBooks() {
        return bookService.getAll();
    }

    @PreAuthorize("hasAnyRole('ADMIN','STUDENT','LIBRARIAN')")
    @GetMapping("/{id}")
    public Book getBook(@PathVariable Long id) {
        return bookService.getById(id);
    }

    @PreAuthorize("hasAnyRole('ADMIN','LIBRARIAN')")
    @PostMapping
    public Book addBook(@RequestBody Book book) {
        return bookService.save(book);
    }

    @PreAuthorize("hasAnyRole('ADMIN','LIBRARIAN')")
    @PutMapping("/{id}")
    public Book updateBook(@PathVariable Long id, @RequestBody Book book) {
        return bookService.update(id, book);
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
    public ResponseEntity<?> renewBook(@PathVariable Long id,
                                       Authentication authentication) {
        bookService.renewBook(id, authentication.getName());

        return ResponseEntity.ok("Book renewed successfully");
    }
}
