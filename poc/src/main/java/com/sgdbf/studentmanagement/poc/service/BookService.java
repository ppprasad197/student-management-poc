package com.sgdbf.studentmanagement.poc.service;

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
        Book book = bookRepository.findById(id).orElse(null);
        String userName = authentication.getName();
        if (book != null) {
            int quantity = book.getQuantity();
            if (quantity >= 1) {
                quantity = quantity - 1;
                updateQuantity(id, quantity);
            } else throw new RuntimeException("Book is not available");
            updateBorrowRecord(quantity, id, userName, authentication);
        }
        System.out.println("Logged in user's username : " + userName);
        return book;
    }

    public void updateBorrowRecord(int quantity, Long bookId, String userName, Authentication authentication) {

        Student student = getStudent(userName);

        if (canStudentBorrowNewBook(student, authentication)) {
            Book book = bookRepository.findById(bookId)
                    .orElseThrow(() -> new RuntimeException("Book not found"));

            BorrowRecord borrowRecord = new BorrowRecord();
            borrowRecord.setStudent(student);
            borrowRecord.setBook(book); // only if you added mapping

            borrowRecord.setIssueDate(LocalDate.now());
            borrowRecord.setDueDate(LocalDate.now().plusDays(7));
            borrowRecord.setReturnDate(null); // not returned yet

            borrowRepository.save(borrowRecord);
        } else throw new RuntimeException("You cannot borrow book");
    }

    public Student getStudent(String username) {
        return studentRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Student not found"));
    }

    public boolean canStudentBorrowNewBook(Student student, Authentication authentication) {

        // ✅ Rule 1: Max 3 active books
        int activeBooks = borrowRepository.countByStudentAndReturnDateIsNull(student);

        if (activeBooks >= 3) {
            System.out.println("Maximum Books has been borrowed");
            return false;
        }

        List<Fine> fines = fineService.getMyFines(authentication);

        double total = 0.0;
        double paid = 0.0;

        for (Fine fine : fines) {

            if (fine.isPaid()) {
                continue;
            }

            total += fine.getAmount();
            paid += fine.getPaidAmount();
        }

        // ✅ Apply rule AFTER loop
        if (total > 0) {
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

        BorrowRecord record = borrowRepository
                .findByStudentAndBookAndReturnDateIsNull(student, getById(bookId))
                .orElseThrow(() -> new RuntimeException("No active borrow found"));

        record.setReturnDate(LocalDate.now());

        // ✅ Increase quantity
        Book book = record.getBook();
        book.setQuantity(book.getQuantity() + 1);

        // ✅ Fine calculation
        if (record.getReturnDate().isAfter(record.getDueDate())) {
            long daysLate = ChronoUnit.DAYS.between(record.getDueDate(), record.getReturnDate());

            Fine fine = new Fine();
            fine.setStudent(student);
            fine.setAmount(daysLate * 5.0);
            fine.setPaidAmount(0);
            fine.setPaid(false);

            fineRepository.save(fine);
        }

        borrowRepository.save(record);
        bookRepository.save(book);
    }

    public void renewBook(Long bookId, Authentication authentication) {

        String username = authentication.getName();

        Student student = getStudent(username);

        BorrowRecord record = borrowRepository
                .findByStudentAndBookAndReturnDateIsNull(student, getById(bookId))
                .orElseThrow(() -> new RuntimeException("No active borrow found"));

        LocalDate today = LocalDate.now();

        //Calculating fine for student
        double applicableFine = 0.0;
        List<BorrowRecord> booksBorrowed = borrowRepository.findByStudentAndReturnDateIsNull(student);

//        for (BorrowRecord borrow : booksBorrowed) {
//            if (borrow.getDueDate().isBefore(today)) {
//                long daysBetween = ChronoUnit.DAYS.between(today, borrow.getDueDate());
//                applicableFine = applicableFine + 5 * daysBetween;
//            }
//        }

        //Generating fine if exceeded due date
        double fineAmount = fineService.generateFineIfLate(booksBorrowed);

        if (fineAmount > 0) throw new RuntimeException("You have to pay : " + fineAmount + " Rs");

        // Cannot renew if already returned
        if (record.getReturnDate() != null) {
            throw new RuntimeException("Book already returned");
        }

        //  Cannot renew if overdue AND fine not paid
//        if (today.isAfter(record.getDueDate())) {
//
//            List<Fine> fines = fineRepository.findByStudent(student);
//
//            double total = 0;
//            double paid = 0;
//
//            for (Fine fine : fines) {
//                if (!fine.isPaid()) {
//                    total += fine.getAmount();
//                    paid += fine.getPaidAmount();
//                }
//            }
//
//            if (total > 0 && paid < (total * 0.5)) {
//                throw new RuntimeException("Pay at least 50% fine before renewal");
//            }
//        }

        // Limit renew count (optional)
        // (add field in BorrowRecord: int renewCount)
        // if (record.getRenewCount() >= 2) throw error;

        if (record.getRenewCount() >= 2) {
            throw new RuntimeException("Cannot renew more than 2 times");
        }

        // Extend due date by 7 days
        record.setDueDate(record.getDueDate().plusDays(7));
        record.setRenewCount(record.getRenewCount() + 1);
        borrowRepository.save(record);
    }

}
