package com.sgdbf.studentmanagement.poc.service;

import com.sgdbf.studentmanagement.poc.dto.FineDTO;
import com.sgdbf.studentmanagement.poc.entity.Book;
import com.sgdbf.studentmanagement.poc.entity.BorrowRecord;
import com.sgdbf.studentmanagement.poc.entity.Fine;
import com.sgdbf.studentmanagement.poc.entity.Student;
import com.sgdbf.studentmanagement.poc.repository.BookRepository;
import com.sgdbf.studentmanagement.poc.repository.BorrowRepository;
import com.sgdbf.studentmanagement.poc.repository.FineRepository;
import com.sgdbf.studentmanagement.poc.repository.StudentRepository;
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
    private final StudentRepository studentRepository;
    private final BorrowRepository borrowRepository;
    private final FineRepository fineRepository;
    private final FineService fineService;

    public BookService(BookRepository bookRepository,
                       StudentRepository studentRepository, BorrowRepository borrowRepository, FineRepository fineRepository, FineService fineService) {
        this.bookRepository = bookRepository;
        this.studentRepository = studentRepository;
        this.borrowRepository = borrowRepository;
        this.fineRepository = fineRepository;
        this.fineService = fineService;
    }

    public Book borrowBook(Long id, Authentication authentication) {

        String userName = authentication.getName();
        Student student = getStudent(userName);

        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        // ✅ Step 1: Check availability
        if (book.getQuantity() <= 0) {
            throw new RuntimeException("Book is not available");
        }

        // ✅ Step 2: Validate borrow rules FIRST
        if (!canStudentBorrowNewBook(student, userName)) {
            throw new RuntimeException("You cannot borrow book");
        }

        // ✅ Step 3: Reduce quantity
        book.setQuantity(book.getQuantity() - 1);
        bookRepository.save(book);

        // ✅ Step 4: Create borrow record
        createBorrowRecord(student, book);

        System.out.println("Logged in user's username : " + userName);

        return book;
    }

    public void createBorrowRecord(Student student, Book book) {

        BorrowRecord borrowRecord = new BorrowRecord();
        borrowRecord.setStudent(student);
        borrowRecord.setBook(book);
        borrowRecord.setIssueDate(LocalDate.now());
        borrowRecord.setDueDate(LocalDate.now().plusDays(7));
        borrowRecord.setReturnDate(null);
        borrowRecord.setRenewCount(0);

        borrowRepository.save(borrowRecord);
    }

    public Student getStudent(String username) {
        return studentRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    public boolean canStudentBorrowNewBook(Student student, String username) {

        // ✅ Rule 1: Max 3 active books
        int activeBooks = borrowRepository.countByStudentAndReturnDateIsNull(student);

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

    public void returnBook(Long bookId, Authentication authentication) {

        String username = authentication.getName();
        Student student = getStudent(username);

        // ✅ Step 1: Check fines FIRST
        FineDTO fineData = fineService.getMyFines(username);
        double totalDue = fineData.getTotalAmount();

        if (totalDue > 0) {
            throw new RuntimeException("Please clear the pending due: " + totalDue + " Rs");
        }

        // ✅ Step 2: Fetch borrow record
        BorrowRecord record = getBorrowRecord(student, bookId);

        // ✅ Step 3: Return book
        record.setReturnDate(LocalDate.now());

        // ✅ Step 4: Increase quantity
        Book book = record.getBook();
        book.setQuantity(book.getQuantity() + 1);

        // ✅ Step 5: Save
        borrowRepository.save(record);
        bookRepository.save(book);
    }

    public void renewBook(Long bookId, Authentication authentication) {

        String username = authentication.getName();
        Student student = getStudent(username);

        BorrowRecord record = getBorrowRecord(student, bookId);

        LocalDate today = LocalDate.now();

        // ✅ Step 1: Check pending fines
        FineDTO fineData = fineService.getMyFines(username);
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

    public BorrowRecord getBorrowRecord(Student student, Long bookId) {
        return borrowRepository
                .findByStudentAndBookAndReturnDateIsNull(student, getById(bookId))
                .orElseThrow(() -> new RuntimeException("No active borrow found"));
    }
}
