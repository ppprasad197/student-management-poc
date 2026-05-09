package com.sgdbf.studentmanagement.poc.service;

import com.sgdbf.studentmanagement.poc.dto.FineDTO;
import com.sgdbf.studentmanagement.poc.entity.*;
import com.sgdbf.studentmanagement.poc.enums.Role;
import com.sgdbf.studentmanagement.poc.repository.*;
//import com.sgdbf.studentmanagement.poc.security.JwtUtil;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Map;

@Service
public class BookService {

    private final BookRepository bookRepository;
    //    private final JwtUtil jwtUtil;
    private final BorrowRepository borrowRepository;
    private final FineRepository fineRepository;
    private final FineService fineService;
    private final UserRepository userRepository;

    public BookService(BookRepository bookRepository, BorrowRepository borrowRepository, FineRepository fineRepository, FineService fineService, UserRepository userRepository) {
        this.bookRepository = bookRepository;
        this.borrowRepository = borrowRepository;
        this.fineRepository = fineRepository;
        this.fineService = fineService;
        this.userRepository = userRepository;
    }

    public Book borrowBook(Long id, String userName) {

        User user = getStudent(userName);

        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        // ✅ Step 1: Check availability
        if (book.getQuantity() <= 0) {
            throw new RuntimeException("Book is not available");
        }

        // ✅ Step 2: Validate borrow rules FIRST
        if (!canStudentBorrowNewBook(user, userName)) {
            throw new RuntimeException("You cannot borrow book");
        }

        // ✅ Step 3: Reduce quantity
        book.setQuantity(book.getQuantity() - 1);
        bookRepository.save(book);

        // ✅ Step 4: Create borrow record
        createBorrowRecord(user, book);

        System.out.println("Logged in user's username : " + userName);

        return book;
    }

    public void createBorrowRecord(User user, Book book) {

        BorrowRecord borrowRecord = new BorrowRecord();
        borrowRecord.setBook(book);
        borrowRecord.setIssueDate(LocalDate.now());
        borrowRecord.setDueDate(LocalDate.now().plusDays(7));
        borrowRecord.setReturnDate(null);
        borrowRecord.setRenewCount(0);

        borrowRepository.save(borrowRecord);
    }

    public User getStudent(String username) {
        return userRepository.findByUserNameAndRole(username, Role.STUDENT);
    }

    public boolean canStudentBorrowNewBook(User user, String username) {

        // ✅ Rule 1: Max 3 active books
        int activeBooks = borrowRepository.countByUserAndReturnDateIsNull(user);

        if (activeBooks >= 3) {
            System.out.println("Maximum books already borrowed");
            return false;
        }

        // ✅ Rule 2: Fine check (use existing method)
        FineDTO fineData = fineService.getMyFines(username);

        double totalDue = fineData.getTotalAmount();

        // ❌ Block if ANY fine pending
        if (totalDue > 0) {
            System.out.println("Pending fine: " + totalDue);
            return false;
        }

        return true;
    }

    public void updateQuantity(Long id, int quantity) {
        Book book = bookRepository.findById(id).orElse(null);
        if (book != null) {
            book.setQuantity(quantity);
        }
        bookRepository.save(book);
    }

    public List<Book> getAll() {
        return bookRepository.findAll();
    }


    public Book getById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));
    }


    public Book save(Book book) {
        if (book.getQuantity() < 0) {
            throw new RuntimeException("Invalid quantity");
        }
        return bookRepository.save(book);
    }


    public Book update(Long id, Book updatedBook) {
        Book book = getById(id);

        book.setBookName(updatedBook.getBookName());
        book.setQuantity(updatedBook.getQuantity());

        return bookRepository.save(book);
    }

    public void delete(Long id) {
        Book book = getById(id);
        bookRepository.delete(book);
    }

    public void returnBook(Long bookId, String userName) {

        User user = getStudent(userName);

        // ✅ Step 1: Check fines FIRST
        FineDTO fineData = fineService.getMyFines(userName);
        double totalDue = fineData.getTotalAmount();

        if (totalDue > 0) {
            throw new RuntimeException("Please clear the pending due: " + totalDue + " Rs");
        }

        // ✅ Step 2: Fetch borrow record
        BorrowRecord record = getBorrowRecord(user, bookId);

        // ✅ Step 3: Return book
        record.setReturnDate(LocalDate.now());

        // ✅ Step 4: Increase quantity
        Book book = record.getBook();
        book.setQuantity(book.getQuantity() + 1);

        // ✅ Step 5: Save
        borrowRepository.save(record);
        bookRepository.save(book);
    }

    public void renewBook(Long bookId, String userName) {

        User user = getStudent(userName);

        BorrowRecord record = getBorrowRecord(user, bookId);

        LocalDate today = LocalDate.now();

        // ✅ Step 1: Check pending fines
        FineDTO fineData = fineService.getMyFines(userName);
        double totalDue = fineData.getTotalAmount();

        if (totalDue > 0) {
            throw new RuntimeException("Please pay pending fine: " + totalDue + " Rs");
        }

        // ✅ Step 2: Prevent renewal if overdue
        if (today.isAfter(record.getDueDate())) {
            throw new RuntimeException("Cannot renew overdue book. Please return and clear fine first and your due is : " + totalDue);
        }

        // ✅ Step 3: Renewal limit
        if (record.getRenewCount() >= 2) {
            throw new RuntimeException("Cannot renew more than 2 times");
        }

        // ✅ Step 4: Extend due date
        record.setDueDate(record.getDueDate().plusDays(7));
        record.setRenewCount(record.getRenewCount() + 1);

        borrowRepository.save(record);
    }

    public BorrowRecord getBorrowRecord(User user, Long bookId) {
        return borrowRepository
                .findByUserAndBookAndReturnDateIsNull(user, getById(bookId));
    }
}
