package com.sgdbf.studentmanagement.poc.service;

import com.sgdbf.studentmanagement.poc.dto.BookRequestDto;
import com.sgdbf.studentmanagement.poc.dto.BookResponseDto;
import com.sgdbf.studentmanagement.poc.dto.BorrowRecordResponseDto;
import com.sgdbf.studentmanagement.poc.dto.FineDTO;
import com.sgdbf.studentmanagement.poc.entity.*;
import com.sgdbf.studentmanagement.poc.enums.Role;
import com.sgdbf.studentmanagement.poc.pagination.BookPageResponse;
import com.sgdbf.studentmanagement.poc.repository.*;
//import com.sgdbf.studentmanagement.poc.security.JwtUtil;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class BookService {

    private final BookRepository bookRepository;
    //    private final JwtUtil jwtUtil;
    private final BorrowRepository borrowRepository;
    private final FineRepository fineRepository;
    private final FineService fineService;
    private final UserRepository userRepository;
    private final BorrowRecordService borrowRecordService;

    public BookService(BookRepository bookRepository, BorrowRepository borrowRepository, FineRepository fineRepository, FineService fineService, UserRepository userRepository, BorrowRecordService borrowRecordService) {
        this.bookRepository = bookRepository;
        this.borrowRepository = borrowRepository;
        this.fineRepository = fineRepository;
        this.fineService = fineService;
        this.userRepository = userRepository;
        this.borrowRecordService = borrowRecordService;
    }

    public Book borrowBook(Long id, String userName) {
        User user = getStudent(userName);
        Book book = bookRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Book not found"));
        boolean isAlreadyBorrowedByStudent =
                borrowRepository
                        .existsByBookAndUserAndReturnDateIsNull(
                                book,
                                user
                        );

        if (isAlreadyBorrowedByStudent) {
            throw new RuntimeException(
                    "Book is already borrowed"
            );
        }

        if (book.getQuantity() <= 0) {
            throw new RuntimeException(
                    "Book is not available"
            );
        }

        if (!canStudentBorrowNewBook(user, userName)) {
            throw new RuntimeException(
                    "You cannot borrow book"
            );
        }

        book.setQuantity(book.getQuantity() - 1);
        bookRepository.save(book);
        createBorrowRecord(user, book);
        return book;
    }

    public void createBorrowRecord(User user, Book book) {
        BorrowRecord borrowRecord = new BorrowRecord();
        borrowRecord.setUser(user);
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
        int activeBooks = borrowRepository.countByUserAndReturnDateIsNull(user);

        if (activeBooks >= 3) {
            return false;
        }
        FineDTO fineData = fineService.getMyFines(username);
        double totalDue = fineData.getTotalAmount();

        if (totalDue > 0) {
            return false;
        }
        return true;
    }

    public void updateQuantity(Long id, int quantity) {
        Book book = bookRepository.findById(id).orElse(null);
        if (book != null) {
            book.setQuantity(quantity);
        }
        assert book != null;
        bookRepository.save(book);
    }

    public BookPageResponse getAll(Pageable pageable) {
        Page<Book> books = bookRepository.findAll(pageable);
        BookPageResponse response = new BookPageResponse();
        response.setBooks(
                books.getContent()
                        .stream()
                        .map(this::mapToDto)
                        .toList()
        );
        response.setCurrentPage(books.getNumber());
        response.setTotalPages(books.getTotalPages());
        response.setTotalElements((int) books.getTotalElements());
        return response;
    }


    public BookResponseDto getById(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Book not found"));

        return mapToDto(book);
    }


    public BookResponseDto save(BookRequestDto requestDto) {

        if (requestDto.getQuantity() < 0) {
            throw new RuntimeException("Invalid quantity");
        }
        Book book = mapToEntity(
                new Book(),
                requestDto
        );
        Book savedBook = bookRepository.save(book);
        return mapToDto(savedBook);
    }

    public BookResponseDto update(Long id, BookRequestDto requestDto) {

        Book book = bookRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Book not found"));
        Book updatedBook = mapToEntity(book, requestDto);
        updatedBook = bookRepository.save(updatedBook);

        return mapToDto(updatedBook);
    }

    public void delete(Long id) {
        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        boolean record = borrowRecordService.findByBookId(id);
        if (record) {
            throw new RuntimeException("You can not delete this book it is already borrowed");
        }
        bookRepository.delete(book);
    }

    public void returnBook(Long bookId, String userName) {
        User user = getStudent(userName);
        //  Step 1: Check fines FIRST
        FineDTO fineData = fineService.getMyFines(userName);
        double totalDue = fineData.getTotalAmount();

        if (totalDue > 0) {
            throw new RuntimeException("Please clear the pending due: " + totalDue + " Rs");
        }

        BorrowRecord record = getBorrowRecord(user, bookId);
        record.setReturnDate(LocalDate.now());
        Book book = record.getBook();
        book.setQuantity(book.getQuantity() + 1);
        borrowRepository.save(record);
        bookRepository.save(book);
    }

    public void renewBook(Long bookId, String userName) {

        User user = getStudent(userName);

        BorrowRecord record = getBorrowRecord(user, bookId);

        LocalDate today = LocalDate.now();

        //  Step 1: Check pending fines
        FineDTO fineData = fineService.getMyFines(userName);
        double totalDue = fineData.getTotalAmount();

        if (totalDue > 0 && today.isAfter(record.getDueDate())) {
            throw new RuntimeException("Please pay pending fine: " + totalDue + " Rs");
        }

        if (record.getRenewCount() >= 2) {
            throw new RuntimeException("Cannot renew more than 2 times");
        }

        if (today.isAfter(record.getDueDate())) {
            record.setIssueDate(today);
            record.setDueDate(today.plusDays(7));
        } else {
            record.setDueDate(record.getDueDate().plusDays(7));
        }
        record.setRenewCount(record.getRenewCount() + 1);
        borrowRepository.save(record);
    }

    public BorrowRecord getBorrowRecord(User user, Long bookId) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() ->
                        new RuntimeException("Book not found"));

        return borrowRepository
                .findByUserAndBookAndReturnDateIsNull(user, book);
    }

    private BookResponseDto mapToDto(Book book) {

        BookResponseDto dto = new BookResponseDto();

        dto.setId(book.getId());
        dto.setTitle(book.getTitle());
        dto.setAuthor(book.getAuthor());
        dto.setCategory(book.getCategory());
        dto.setDescription(book.getDescription());
        dto.setAvailable(book.isAvailable());
        dto.setQuantity(book.getQuantity());

        return dto;
    }

    private Book mapToEntity(Book book, BookRequestDto requestDto) {

        book.setTitle(requestDto.getTitle());
        book.setAuthor(requestDto.getAuthor());
        book.setCategory(requestDto.getCategory());
        book.setDescription(requestDto.getDescription());
        book.setAvailable(requestDto.isAvailable());
        book.setQuantity(requestDto.getQuantity());

        return book;
    }

//    public List<BorrowRecordResponseDto> getMyBorrowedBooks(String username) {
//
//        User user = getStudent(username);
//
//        List<BorrowRecord> records = borrowRepository.findByUserAndReturnDateIsNull(user);
//
//        return records.stream()
//                .map(this::mapBorrowRecordToDto)
//                .toList();
//    }
//
//    private BorrowRecordResponseDto mapBorrowRecordToDto(BorrowRecord record) {
//
//        BorrowRecordResponseDto dto = new BorrowRecordResponseDto();
//
//        dto.setId(record.getId());
//
//        dto.setBookId(record.getBook().getId());
//
//        dto.setBookTitle(record.getBook().getTitle());
//
//        dto.setAuthor(record.getBook().getAuthor());
//
//        dto.setIssueDate(record.getIssueDate());
//
//        dto.setDueDate(record.getDueDate());
//
//        dto.setReturnDate(record.getReturnDate());
//
//        dto.setRenewCount(record.getRenewCount());
//
//        dto.setStudentId(record.getUser().getId());
//
//        return dto;
//    }
}
